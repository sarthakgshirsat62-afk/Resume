# Folder Structure

Directory layout, file naming conventions, and colocation rules.

---

## Root Layout

```
SarthakResume/
├── CLAUDE.md                    # AI context — read first every session
├── docs/                        # All project documentation
├── content/                     # Owner-authored content (not code)
│   └── blog/                    # Blog posts — one Markdown file per post
├── public/                      # Static assets (favicon, OG images, fonts)
│   ├── fonts/
│   ├── images/
│   └── icons/
├── src/                         # All application source code
├── drizzle/                     # Drizzle migrations output
├── emails/                      # React Email templates
├── biome.json                   # Linting + formatting config
├── next.config.ts               # Next.js config
├── tailwind.config.ts           # Tailwind config
├── tsconfig.json                # TypeScript config
├── package.json
└── .env.local                   # Never committed — see deployment.md for vars
```

---

## `src/` Directory

```
src/
├── app/                         # Next.js App Router
│   ├── (public)/                # Route group: no auth required
│   │   ├── page.tsx             # Homepage
│   │   ├── resume/
│   │   │   └── page.tsx         # Public resume view (static, single resume — no [slug] yet)
│   │   ├── portfolio/
│   │   │   └── page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx         # Blog listing — newest first
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Single post, statically generated per file in content/blog/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   ├── (auth)/                  # Route group: auth pages
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── dashboard/               # Protected — requires auth
│   │   ├── layout.tsx           # Dashboard shell (sidebar, nav)
│   │   ├── page.tsx             # Dashboard home
│   │   ├── resumes/
│   │   │   ├── page.tsx         # Resume list
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   │           └── page.tsx # Resume editor
│   │   └── comments/
│   │       └── page.tsx         # Moderation — delete any blog comment/reply
│   ├── api/                     # Route Handlers
│   │   └── auth/
│   │       └── [...all]/
│   │           └── route.ts     # Better Auth catch-all handler
│   ├── layout.tsx               # Root layout (providers, fonts, metadata)
│   ├── globals.css              # Global styles + Tailwind base
│   └── not-found.tsx
│
├── components/                  # Shared, reusable UI components
│   ├── ui/                      # shadcn/ui generated primitives (DO NOT edit directly)
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── common/                  # Site-wide layout and navigation components
│   │   ├── site-header.tsx
│   │   ├── site-footer.tsx
│   │   ├── nav-link.tsx
│   │   └── theme-toggle.tsx
│   ├── resume/                  # Resume rendering components (public view)
│   │   ├── resume-data.ts       # Static resume content — shared with pdf/pdf-document.tsx
│   │   ├── resume-view.tsx      # Renders the resume as HTML on /resume
│   │   └── download-resume-button.tsx  # "Download PDF" button (client)
│   ├── editor/                  # Editor-specific UI (dashboard only)
│   │   ├── editor-shell.tsx
│   │   ├── section-panel.tsx
│   │   ├── section-form.tsx
│   │   └── ...
│   ├── blog/                    # Blog listing/post UI
│   │   ├── post-card.tsx        # Listing card — title, date, excerpt
│   │   ├── vote-panel.tsx       # Thumbs up/down widget (client)
│   │   ├── comment-section.tsx  # Top-level comment list + new-comment form (client)
│   │   ├── comment-item.tsx     # One comment + its replies + reply form (client)
│   │   ├── comment-form.tsx     # Shared comment/reply form, RHF + Zod (client)
│   │   └── delete-comment-button.tsx  # Owner-only moderation delete (client)
│   └── pdf/                     # react-pdf components (PDF export only)
│       ├── pdf-document.tsx     # Whole resume as one PDF (see docs/pdf-export.md)
│       └── pdf-styles.ts
│
├── features/                    # Feature modules — colocated logic
│   ├── resume-editor/           # All logic specific to the resume editor
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── types.ts
│   ├── pdf-export/
│   │   ├── hooks/use-pdf-export.ts    # Drives export: loading state, download, error toast
│   │   └── utils/generate-pdf.tsx     # Renders <PdfDocument /> to a Blob (dynamically imported)
│   ├── blog/
│   │   ├── utils/posts.ts       # Reads content/blog/, parses frontmatter, renders Markdown → HTML
│   │   ├── utils/comments.ts    # Reads blog_comments from Postgres (Server Component use only)
│   │   ├── hooks/use-visitor-id.ts  # Anonymous per-browser id (localStorage) for votes/comments
│   │   ├── actions.ts           # Server Actions: addComment, deleteComment, castVote, getVoteSummary
│   │   └── types.ts
│   └── auth/
│       ├── hooks/
│       └── guards.tsx
│
├── hooks/                       # Shared custom hooks (used in 2+ features)
│   ├── use-media-query.ts
│   ├── use-local-storage.ts
│   └── use-debounce.ts
│
├── lib/                         # Third-party wrappers and singletons
│   ├── auth.ts                  # Better Auth client instance
│   ├── db.ts                    # Drizzle DB client
│   ├── query-client.ts          # TanStack Query client config
│   └── query-keys.ts            # Centralized query key constants
│
├── schemas/                     # Zod schemas — single source of truth for data shapes
│   ├── resume.ts                # Resume + section schemas
│   ├── user.ts
│   ├── contact.ts
│   ├── blog.ts                  # Blog post frontmatter schema
│   └── shared.ts                # Reusable sub-schemas (dateRange, richText, etc.)
│
├── store/                       # Zustand stores (client-side UI state only)
│   ├── use-editor-store.ts
│   ├── use-ui-store.ts
│   └── use-theme-store.ts
│
├── styles/                      # Global styles and design tokens
│   ├── tokens.css               # CSS custom properties (design tokens)
│   └── typography.css           # Prose typography overrides
│
├── types/                       # Shared TypeScript types (not inferred from Zod)
│   └── next.d.ts                # Next.js type augmentations
│
└── utils/                       # Pure utility functions
    ├── cn.ts                    # clsx + tailwind-merge helper
    ├── date.ts
    └── string.ts
```

---

## Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Files (components) | `kebab-case.tsx` | `section-experience.tsx` |
| Files (non-component) | `kebab-case.ts` | `use-editor-store.ts` |
| Component names | `PascalCase` | `SectionExperience` |
| Hook names | `use` + `camelCase` | `useEditorStore` |
| Zod schemas | `camelCase` + `Schema` | `resumeSectionSchema` |
| Inferred types | `PascalCase` | `type ResumeSection = z.infer<typeof resumeSectionSchema>` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_SECTIONS` |
| CSS custom properties | `--kebab-case` | `--color-primary` |
| CSS classes (BEM-like) | Use Tailwind only | — |

---

## Colocation Rules

- Feature-specific hooks → `src/features/[feature]/hooks/`
- Shared hooks (2+ features) → `src/hooks/`
- Feature-specific utils → `src/features/[feature]/utils/`
- Shared utils → `src/utils/`
- Component-specific types → inline in the component file (if small) or `types.ts` in the feature folder
- Global shared types → `src/types/`

---

## Barrel Export Policy

- **No** `index.ts` barrel files unless the folder has 5+ public exports consumed across 3+ other files.
- Import directly: `import { Button } from "@/components/ui/button"` not `from "@/components/ui"`.
- **Why:** Barrel files cause circular dependency issues and make tree-shaking less reliable.

---

## Path Aliases

Configured in `tsconfig.json`:

```json
{
  "@/*": ["src/*"]
}
```

Always use `@/` for internal imports. Never use relative paths that traverse more than one directory level (`../../`).
