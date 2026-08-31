# Documentation Index

Central map of all project documentation. Every doc is listed here with a one-line summary of what it covers.

> **Rule:** If a doc is not in this index, it doesn't exist as far as Claude Code is concerned. Update this file whenever a new doc is added or removed.

---

## Core Reference

| File | What It Covers |
|---|---|
| [tech-stack.md](tech-stack.md) | All libraries, frameworks, and tools — with justification for each choice |
| [architecture.md](architecture.md) | System design, layers, data flow, and key architectural decisions |
| [product.md](product.md) | Product vision, feature list, roadmap, and scope boundaries |
| [folder-structure.md](folder-structure.md) | Directory layout, file naming conventions, and colocation rules |
| [coding-standards.md](coding-standards.md) | TypeScript rules, naming conventions, import order, and code style |

## UI & Frontend

| File | What It Covers |
|---|---|
| [ui-ux.md](ui-ux.md) | UX principles, layout system, responsive strategy, accessibility |
| [component-library.md](component-library.md) | Component categories, patterns, composition rules, and examples |
| [theming.md](theming.md) | Design tokens, CSS variables, color system, typography, spacing |

## Feature Domains

| File | What It Covers |
|---|---|
| [resume-editor.md](resume-editor.md) | Resume builder workflow, section architecture, data flow, live preview |
| [blog.md](blog.md) | Blog content model, publishing workflow, Markdown rendering pipeline |
| [blog-post-format.md](blog-post-format.md) | Copy-paste reference for writing a new post's frontmatter + Markdown |
| [pdf-export.md](pdf-export.md) | PDF generation pipeline, templates, supported formats |
| [auth.md](auth.md) | Authentication strategy, session management, protected routes |
| [data-models.md](data-models.md) | Zod schemas, database tables, TypeScript types, relations |
| [api.md](api.md) | API routes, request/response contracts, error handling |
| [state-management.md](state-management.md) | Server state (TanStack Query), client state (Zustand), form state |

## Operations

| File | What It Covers |
|---|---|
| [deployment.md](deployment.md) | Environments, env vars, deployment targets, CI/CD |
| [seo-performance.md](seo-performance.md) | SEO metadata strategy, Core Web Vitals, image optimization |
| [dev-workflow.md](dev-workflow.md) | Local setup, scripts, branching strategy, PR conventions |
| [changelog.md](changelog.md) | Significant architectural and product changes over time |

---

## Documentation Update Rules

Update a doc when:
- New feature added → update `product.md`, relevant domain doc
- New library added → update `tech-stack.md`
- Folder renamed/restructured → update `folder-structure.md`
- Schema/type changed → update `data-models.md`
- API route added/changed → update `api.md`
- Design token added/changed → update `theming.md`
- Deployment target changes → update `deployment.md`

Do NOT update docs for: bug fixes, style tweaks, test additions, or refactors that don't change public APIs.
