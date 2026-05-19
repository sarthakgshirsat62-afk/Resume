# Changelog

Significant architectural and product changes. Updated only for meaningful changes — not every commit.

---

## Format

```
## [Version or Date] — Short title

### Added
- New features or capabilities

### Changed
- Breaking or significant changes to existing behavior

### Architecture
- Structural decisions, new layers, tech additions

### Removed
- Features, libraries, or patterns removed
```

---

## [2025-05-14] — Project Initialization

### Added
- Initial documentation system created (`/docs/`)
- `CLAUDE.md` — AI development context file
- Defined complete project architecture (see `docs/architecture.md`)
- Defined full tech stack (see `docs/tech-stack.md`)
- Defined product vision and feature roadmap (see `docs/product.md`)
- Defined data models for resume, sections, and users (see `docs/data-models.md`)
- Defined API contract with Server Actions catalog (see `docs/api.md`)
- Defined state management strategy (see `docs/state-management.md`)
- Defined authentication approach with Better Auth (see `docs/auth.md`)
- Defined PDF export pipeline (see `docs/pdf-export.md`)
- Defined UI/UX principles and component library patterns
- Defined theming system with CSS custom properties
- Defined coding standards and naming conventions
- Defined dev workflow, branching, and CI setup
- Defined SEO and performance targets

### Architecture
- Framework: Next.js 15 App Router
- Database: PostgreSQL + Drizzle ORM
- Auth: Better Auth
- PDF: @react-pdf/renderer (client-side)
- State: TanStack Query (server) + Zustand (client)
- Styling: Tailwind CSS v4 + CSS variables
- Linting: Biome

---

<!-- 
  Add new entries at the top, below this comment.
  Use date format: YYYY-MM-DD
-->
