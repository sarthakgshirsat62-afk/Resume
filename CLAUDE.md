# CLAUDE.md — AI Development Context for SarthakResume

This file is the **primary context document** for Claude Code. Read it at the start of every session before touching any code. It defines the rules, architecture principles, and workflow conventions for this project.

---

## Project Overview

A modern, premium personal portfolio and resume website. Inspired by Reactive Resume's architecture and UX quality, but scoped to a personal brand — not a SaaS product. The goal is a polished, performant, SEO-optimized site with a built-in resume editor, downloadable PDFs, and future extensibility into blog/case studies/admin/AI features.

**Owner:** Sarthak  
**Primary doc hub:** `/docs/` — all architectural, product, and workflow decisions live here.

---

## How Claude Should Use This Project

### On Every Session Start
1. Read this file (`CLAUDE.md`) fully.
2. Check `/docs/INDEX.md` to orient yourself on what exists.
3. If the task touches a specific domain (auth, PDF export, UI components, etc.), read the relevant `/docs/*.md` file before coding.
4. If user mentions a feature area with no doc, **ask before inventing** conventions.

### Coding Rules
- **Never** introduce a new library without checking `/docs/tech-stack.md` first. If you believe a new dep is needed, flag it to the user.
- **Never** create new folders that contradict `/docs/folder-structure.md`.
- **Never** define new component patterns that contradict `/docs/component-library.md`.
- **Always** follow naming conventions in `/docs/coding-standards.md`.
- **Always** use the design tokens and CSS variables defined in `/docs/theming.md`. Do not hardcode colors or spacing.
- **Always** write TypeScript — no `.js` files in `src/`.
- **Never** add speculative features, abstractions, or TODOs for "future use." Build exactly what is requested.
- **Never** add comments that explain *what* the code does — only add a comment when the *why* is non-obvious.

### When to Update Documentation
Docs should be updated **only** when:
- A new major feature is added (new route, new section type, new integration)
- Architecture changes (new package, monorepo restructure, new layer)
- API/data contracts change (schema changes, new endpoints, renamed types)
- Design system evolves (new tokens, component variants, layout changes)
- Deployment or environment config changes
- Auth strategy changes

**Do NOT update docs for:**
- Bug fixes
- Style tweaks
- Refactors that don't change public APIs or conventions
- Small component additions that follow existing patterns
- Test additions

### Documentation Discipline
- Write docs in the present tense describing what *is*, not what *will be*.
- Keep each doc focused — don't mix architecture with implementation details.
- Use tables and bullet points; avoid walls of prose.
- If you're unsure whether a doc needs updating, **ask the user** rather than silently rewriting it.

---

## Architecture Principles

1. **Component-first** — UI is composed from small, single-purpose components. No god components.
2. **Colocation** — feature-specific logic (hooks, types, utils) lives next to the feature, not in global folders.
3. **Schema-driven** — all data shapes are defined with Zod schemas before implementation. No `any`.
4. **Type-safe end-to-end** — from DB schema → API → client, types flow without manual casting.
5. **CSS variables for theming** — no hardcoded colors/spacing in components. Use design tokens.
6. **Progressive enhancement** — core content is server-rendered and crawlable. Interactivity layers on top.
7. **Separation of concerns** — data fetching, presentation, and business logic are distinct layers.
8. **No premature abstraction** — three similar components before extracting a shared one.

---

## Tech Stack Summary

Full details in `/docs/tech-stack.md`. Quick reference:

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + CSS Variables |
| UI Components | shadcn/ui (Radix UI + Tailwind) |
| Icons | Phosphor Icons |
| State (server) | TanStack Query v5 |
| State (client) | Zustand |
| Forms | React Hook Form + Zod |
| Database | PostgreSQL + Drizzle ORM |
| Auth | Better Auth |
| PDF Export | react-pdf (renderer) |
| Email | React Email + Nodemailer |
| Linting | Biome |
| Testing | Vitest + Testing Library |
| Deployment | Vercel (frontend) + Railway/Supabase (DB) |

---

## Folder Structure Summary

Full details in `/docs/folder-structure.md`. Quick reference:

```
src/
  app/               # Next.js App Router pages and layouts
  components/        # Shared UI components
    ui/              # Base primitives (shadcn generated)
    common/          # Layout, nav, footer
    resume/          # Resume-specific components
    editor/          # Resume editor components
  features/          # Feature modules (colocated logic)
  hooks/             # Shared custom hooks
  lib/               # Third-party wrappers and initializers
  schemas/           # Zod schemas (single source of truth for types)
  store/             # Zustand stores
  styles/            # Global CSS, design tokens
  types/             # Shared TypeScript type definitions
  utils/             # Pure utility functions
docs/                # All project documentation (this system)
public/              # Static assets
```

---

## Coding Standards Summary

Full details in `/docs/coding-standards.md`.

- File names: `kebab-case.tsx`
- Component names: `PascalCase`
- Hook names: `useCamelCase`
- Zod schemas: `camelCaseSchema` (e.g., `resumeSectionSchema`)
- Store files: `use-x-store.ts`
- Exports: named exports preferred; default exports only for Next.js pages/layouts
- No barrel `index.ts` files unless the folder has 5+ public exports
- Max file length: ~300 lines — split if larger
- Imports: types first, then external, then internal (enforced by Biome)

---

## What This Project Is NOT

- Not a SaaS product (no multi-tenant architecture needed now)
- Not an open-source template (no need for extensive configuration options)
- Not a CMS (content is code-managed, not database-driven, until the admin feature is built)
- Not a microservices system (monolith-first, extract only when there's clear need)

---

## Escalation Rules

When you encounter any of the following, **stop and ask the user** before proceeding:
- Uncertainty about the correct data model for a new feature
- A task that would require adding a library not in the current stack
- A task that touches authentication or payment flows
- A task that would require a schema migration
- Any destructive operation (delete, drop table, remove route)

---

## Docs Index Quick Link

→ See `/docs/INDEX.md` for the full documentation map.
