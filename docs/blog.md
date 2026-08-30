# Blog

How blog posts are authored, stored, and rendered.

---

## Content Model

Every post is a single Markdown file in `content/blog/`, named `<slug>.md`. The filename (minus `.md`) is the post's URL slug.

```
content/blog/
├── hello-world.md      → /blog/hello-world
└── my-second-post.md   → /blog/my-second-post
```

Each file starts with a YAML frontmatter block, validated against `blogFrontmatterSchema` in `src/schemas/blog.ts`:

```md
---
title: "Your Title"
date: "2026-09-01"
description: "One or two sentences for the listing preview and SEO description."
---

Your content here, in Markdown.
```

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Post title, shown on the listing and post page |
| `date` | Yes | `YYYY-MM-DD`. Used for sort order and the displayed date |
| `description` | No | Listing preview + meta description. Falls back to an auto-generated excerpt (first ~160 characters of the post body) if omitted |

An invalid or missing required field throws at build time (via `blogFrontmatterSchema.parse`) rather than failing silently.

---

## Publishing Workflow

1. Add a new `.md` file to `content/blog/`.
2. Commit and push to `main`.
3. Vercel rebuilds the site — the post appears on `/blog` and at `/blog/<slug>` automatically.

To remove a post, delete the file and push — it disappears from both the listing and its own URL (404) on the next deploy.

No code change, no manual listing update, and no database is involved. This is a build-time static pipeline, not a live filesystem watch — a post only appears in production once its commit has been deployed.

---

## Rendering Pipeline

Implemented in `src/features/blog/utils/posts.ts`:

1. `getPostSlugs()` — lists `content/blog/*.md`, strips the extension.
2. `getAllPosts()` — reads every post's frontmatter (via `gray-matter`) and excerpt, sorted by `date` descending. Used by the listing page and `sitemap.ts`. Does not render Markdown to HTML (keeps the listing page fast).
3. `getPostBySlug(slug)` — reads one post's frontmatter and body, and converts the Markdown body to HTML via `remark` + `remark-gfm` (GitHub-flavored tables/strikethrough) + `remark-html`. Used only by the post page.

## Routes

- `src/app/(public)/blog/page.tsx` — listing page, newest first, using `PostCard` (`src/components/blog/post-card.tsx`).
- `src/app/(public)/blog/[slug]/page.tsx` — single post. Uses `generateStaticParams` (SSG — one page per file at build time) and `generateMetadata` (per-post SEO). Calls `notFound()` for a slug with no matching file.

## Styling

Post HTML is rendered inside an element with the `.blog-prose` class (`src/app/globals.css`), which styles headings, links, lists, code blocks, blockquotes, and tables using the site's existing design tokens — no `@tailwindcss/typography` dependency was added.

## Trust Boundary

Post HTML is inserted via `dangerouslySetInnerHTML` without sanitization. This is safe only because posts are authored solely by the site owner through files committed to the repo — not submitted by site visitors or any external system. If posts ever become externally submitted, add `rehype-sanitize` to the pipeline before that ships.

---

## Comments and Reactions

Unlike posts, comments and thumbs up/down votes are **not** files — they're stored in Postgres (via Drizzle, `blog_comments` / `blog_votes` tables, added in `drizzle/0000_breezy_stone_men.sql`) since they're visitor-submitted and need to update without a redeploy. This is the one part of the blog that isn't build-time static; comment/vote pages still render statically, then hydrate client-side.

### Reactions (thumbs up/down)

- One vote per post per visitor, toggleable. Clicking the same direction again removes the vote; clicking the other direction switches it.
- Visitors are identified by a random UUID generated on first visit and stored in `localStorage` (`src/features/blog/hooks/use-visitor-id.ts`) — no account, no cookie, no session. Clearing site data resets a visitor's vote.
- `VotePanel` (`src/components/blog/vote-panel.tsx`) renders server-fetched aggregate counts immediately (no "0/0" flash), then fills in the visitor's own vote state after mount once `visitorId` resolves.

### Comments

- Anonymous: a commenter supplies a display name and optional (never publicly shown) email — no sign-in.
- One level of replies: a comment can be replied to, but a reply cannot itself be replied to. Enforced server-side in `addComment` (`src/features/blog/actions.ts`) — replying to a reply throws.
- Publish instantly, no approval queue. The owner can delete any comment (and its replies, in the same transaction) from `/dashboard/comments`.
- A hidden honeypot field on the comment form silently no-ops the submission if filled — the only spam defense beyond owner moderation. There is no rate limiting or CAPTCHA.

### Resilience

The post page treats comments/votes as an enhancement, not a dependency: `getCommentThreads` and `getVoteSummary` failures (e.g. the database being unreachable) are caught in `src/app/(public)/blog/[slug]/page.tsx` and fall back to empty/zeroed state, logged via `console.error`. A database outage degrades the comments/votes section — it never takes down the post itself.

### Setup Required

These tables are not part of any table Better Auth manages automatically. Before comments/votes work in a given environment:

1. Ensure `DATABASE_URL` points at a reachable Postgres instance.
2. Run `pnpm db:migrate` (applies `drizzle/0000_breezy_stone_men.sql` — note this is currently the **first** migration for the whole project, so it also creates the pre-existing `users`/`resumes`/etc. tables if they don't exist yet).
