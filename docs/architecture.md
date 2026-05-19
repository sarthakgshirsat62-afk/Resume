# Architecture

System design, data flow, and key architectural decisions for the SarthakResume project.

---

## System Overview

```
Browser
  │
  ├─── Public Pages (SSR/SSG)          ← Server Components, no JS overhead
  │      resume/[slug]                  ← Shareable resume page
  │      portfolio/                     ← Projects showcase
  │      about/, contact/
  │
  ├─── Editor (Client-side SPA feel)   ← Zustand + TanStack Query
  │      /dashboard/resumes/[id]/edit   ← Resume builder
  │
  └─── Auth Pages                      ← Better Auth handlers
         /login, /register, /callback
         
         ↓ Server Actions / Route Handlers ↓
         
Next.js Server
  ├─── Server Actions (mutations)
  ├─── Route Handlers (REST-like, for auth callbacks / webhooks)
  └─── Drizzle ORM → PostgreSQL
```

---

## Rendering Strategy

| Route | Strategy | Reason |
|---|---|---|
| `/` (homepage) | SSG | Static, no personalization |
| `/resume/[slug]` | ISR (1hr revalidate) | Public share page, needs SEO |
| `/portfolio` | SSG | Static project list |
| `/dashboard/**` | CSR behind auth | Editor requires interactivity |
| `/api/**` | Route Handler | Auth callbacks, webhooks |

**Rule:** Prefer Server Components by default. Add `"use client"` only when the component needs interactivity (`useState`, `useEffect`, event handlers, browser APIs).

---

## Data Flow

### Resume Editor Flow
```
User action (add section, edit text)
  → Zustand editor store (optimistic UI update)
  → React Hook Form (validation via Zod)
  → Server Action (mutation)
  → Drizzle ORM (DB write)
  → TanStack Query invalidation
  → UI re-syncs from server
```

### Public Resume View Flow
```
Request to /resume/[slug]
  → Next.js Server Component
  → Drizzle query (server-side)
  → ResumeRenderer component (Server Component)
  → HTML with JSON-LD metadata for SEO
  → Hydration: only interactive parts (theme toggle, PDF download button)
```

### PDF Export Flow
```
User clicks "Download PDF"
  → Client-side: load resume data from TanStack Query cache
  → Pass to PDFDocument component (@react-pdf/renderer)
  → Render to Blob in browser
  → Trigger file download
  (No server round-trip for PDF generation)
```

---

## Layer Definitions

### Presentation Layer (`src/components/`, `src/app/`)
- React components and Next.js pages/layouts
- No business logic — only rendering and user interaction wiring
- Server Components fetch their own data via Drizzle (no prop-drilling data down)

### Feature Layer (`src/features/`)
- Colocated feature modules: hooks, utils, types, sub-components specific to one feature
- Example: `src/features/resume-editor/` contains everything specific to the editor

### Schema Layer (`src/schemas/`)
- All Zod schemas — single source of truth for data shapes
- TypeScript types are inferred from schemas via `z.infer<>`
- Reused in: forms (validation), server actions (input parsing), DB (Drizzle-Zod)

### Data Layer (`src/db/`)
- Drizzle schema, migrations, and query helpers
- No business logic — pure data access
- All queries return typed results (inferred from Drizzle schema)

### Store Layer (`src/store/`)
- Zustand stores for client-side UI state only
- Never stores data that belongs in the server (user profile, resume data)
- Used for: editor panel state, modal visibility, active section, theme selection

---

## Monolith-First Policy

This project starts as a **single Next.js application**. There is no separate API server, no separate frontend app, and no microservices. Extract only when there is demonstrated need (e.g., when PDF generation becomes compute-intensive enough to warrant a separate worker).

Current coupling points that would need to change if ever extracted:
- Server Actions (would become API route calls)
- Drizzle direct DB access (would become repository pattern behind an API)

---

## Key Architectural Decisions

### ADR-001: Next.js App Router over Pages Router
- **Decision:** App Router
- **Reason:** React Server Components eliminate JS for read-heavy pages; Metadata API simplifies SEO; layouts are composable
- **Trade-off:** Newer patterns, more complex mental model for caching behavior

### ADR-002: Server Actions for mutations
- **Decision:** Server Actions instead of REST API routes for mutations
- **Reason:** Type-safe end-to-end without boilerplate; co-located with schemas; no separate API layer to maintain
- **Trade-off:** Harder to test in isolation than pure HTTP handlers; limited to Next.js

### ADR-003: Client-side PDF generation
- **Decision:** `@react-pdf/renderer` in the browser
- **Reason:** No server infrastructure needed; instant generation; no Puppeteer/headless browser dependency
- **Trade-off:** Slightly larger JS bundle; limited CSS support compared to browser print

### ADR-004: Drizzle over Prisma
- **Decision:** Drizzle ORM
- **Reason:** SQL-like queries with full TypeScript inference; no Prisma Client generation step; lighter weight
- **Trade-off:** Less mature ecosystem; fewer community resources

### ADR-005: Better Auth over NextAuth
- **Decision:** Better Auth
- **Reason:** Modern TypeScript-first API; built-in passkey support; better session management; OAuth provider support
- **Trade-off:** Newer library; smaller community than NextAuth

### ADR-006: Biome over ESLint + Prettier
- **Decision:** Biome
- **Reason:** Single tool, faster CI, consistent opinions, no config conflicts
- **Trade-off:** Some ESLint rules/plugins not available in Biome
