# Blog Post Format Reference

Attach this file in a prompt when asking for a new blog post, so the output matches
the format the site auto-reads. Do not save this file inside `content/blog/` —
only real posts belong there.

---

## File location & name

```
content/blog/your-post-slug.md
```

- Lives in `content/blog/`, nowhere else.
- Filename is **kebab-case** and becomes the URL: `my-first-post.md` → `/blog/my-first-post`.

## Required structure

```md
---
title: "Your Post Title"
date: "2026-08-31"
description: "One or two sentences shown in the listing preview and search results."
---

Your content here, written in Markdown.
```

| Frontmatter field | Required? | Rules |
|---|---|---|
| `title` | Yes | Any text, quoted |
| `date` | Yes | Exactly `YYYY-MM-DD` (e.g. `"2026-08-31"`) — anything else fails the build |
| `description` | No | If omitted, the listing preview auto-generates from the first ~160 characters of the body instead |

**Do not** repeat the title as a `# Heading` in the body — the page renders `title` separately already. Start the body directly with your first paragraph or a `##` subheading.

## Supported Markdown in the body

| Feature | Syntax |
|---|---|
| Subheadings | `##`, `###` (don't use a top-level `#`) |
| Bold / italic | `**bold**`, `*italic*` |
| Links | `[text](https://example.com)` |
| Lists | `- item` or `1. item` |
| Blockquote | `> quoted text` |
| Inline code | `` `code` `` |
| Code block | ` ```lang ` fenced block |
| Table (GFM) | standard `\| col \| col \|` pipe tables |
| Horizontal rule | `---` on its own line |

## Example of a valid post file

```md
---
title: "Why I Rebuilt My Resume Site"
date: "2026-08-31"
description: "A short retrospective on moving from a static resume to a full portfolio site."
---

A couple of months ago I decided my old resume PDF wasn't cutting it anymore.

## What changed

- Moved to a proper portfolio site
- Added a blog (this post is proof it works)
- Wired up a contact form

That's the short version — more detail below.
```

## Common mistakes that break the build

| Mistake | Why it fails |
|---|---|
| `date: "Aug 31, 2026"` or `date: 2026-08-31` (unquoted) | Must be a quoted string in exact `YYYY-MM-DD` form |
| Missing `title` or `date` | Both are required — the build throws rather than silently skipping the post |
| Saving the file outside `content/blog/` | Won't be picked up at all |
| Saving a non-post `.md` file (like this one) inside `content/blog/` | Gets parsed as a post and fails frontmatter validation |

## Publishing

Save the file, then commit and push to `main`. Vercel rebuilds and the post appears on `/blog` and at its own URL automatically — no code changes needed. Delete the file the same way to remove a post.
