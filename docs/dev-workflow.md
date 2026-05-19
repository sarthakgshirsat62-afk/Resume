# Development Workflow

Local setup, scripts, branching strategy, PR conventions, and Claude Code workflow.

---

## Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL 15+ (local or via Docker)
- Biome VS Code extension (for editor formatting)

---

## Initial Setup

```bash
# Clone and install
pnpm install

# Copy environment variables
cp .env.example .env.local
# Fill in required values — see docs/deployment.md

# Set up database
pnpm db:push        # Push schema to DB (dev only — no migration files)
# OR
pnpm db:migrate     # Apply migrations (staging/prod)

# Start dev server
pnpm dev
```

---

## NPM Scripts

| Script | What it does |
|---|---|
| `pnpm dev` | Start Next.js dev server (localhost:3000) |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Biome lint check |
| `pnpm lint:fix` | Biome lint + auto-fix |
| `pnpm format` | Biome format check |
| `pnpm format:fix` | Biome format + auto-fix |
| `pnpm typecheck` | TypeScript type check (no emit) |
| `pnpm test` | Vitest unit tests |
| `pnpm test:watch` | Vitest watch mode |
| `pnpm test:coverage` | Vitest with coverage report |
| `pnpm db:generate` | Generate Drizzle migration from schema changes |
| `pnpm db:migrate` | Apply pending migrations |
| `pnpm db:push` | Push schema directly to DB (dev only) |
| `pnpm db:studio` | Open Drizzle Studio (visual DB browser) |
| `pnpm emails:preview` | Preview React Email templates in browser |

---

## Git Workflow

### Branching Strategy

```
main          ← production-ready, deployed to Vercel
  └── dev     ← integration branch (merge feature branches here first)
        └── feature/resume-templates
        └── feature/pdf-export
        └── fix/editor-autosave
        └── chore/upgrade-deps
```

### Branch Naming

| Prefix | Use case |
|---|---|
| `feature/` | New features |
| `fix/` | Bug fixes |
| `chore/` | Dependency upgrades, tooling, config |
| `docs/` | Documentation-only changes |
| `refactor/` | Code restructuring without behavior change |

### Commit Messages

```
<type>(<scope>): <short summary>

Types: feat, fix, chore, docs, refactor, test, style
Scope: optional, e.g. editor, pdf, auth, api

Examples:
feat(editor): add drag-and-drop section reordering
fix(pdf): resolve font registration timing issue
chore: upgrade react-pdf to v4.5
docs(api): document new section actions
```

---

## Pre-commit Hooks (Lefthook)

Runs automatically on `git commit`:
1. `biome check --write` — format + lint + fix staged files
2. TypeScript check of changed files

Runs automatically on `git push`:
1. Full typecheck (`pnpm typecheck`)
2. Unit tests (`pnpm test`)

---

## CI (GitHub Actions)

On every PR to `dev` or `main`:

1. Install dependencies
2. TypeScript check
3. Biome lint check
4. Unit tests
5. Build check

Deployment only triggers on merge to `main`.

---

## Claude Code Workflow

### Starting a Coding Session

1. Read `CLAUDE.md` (root)
2. Check `docs/INDEX.md` for relevant docs
3. Read the specific domain doc (e.g., `docs/resume-editor.md` if working on the editor)
4. Understand the data models from `docs/data-models.md` if the task touches data
5. Start coding

### During Implementation

- Run `pnpm typecheck` after changes to catch type errors early
- Run `pnpm lint:fix` to auto-fix linting issues before review
- Run `pnpm test` if the changed area has tests

### When to Update Docs

See `docs/INDEX.md` — "Documentation Update Rules" section.

### When to Ask Before Coding

- Task requires a new library not in `docs/tech-stack.md`
- Task requires a DB schema migration
- Task changes how auth works
- Task changes a public API contract or query key structure
- Folder structure would need to change

---

## Testing Conventions

### What to Test
- **Unit tests:** Pure utility functions, Zod schema validation, date formatters, string helpers
- **Component tests:** User-facing behavior (what the user sees and does), not implementation details
- **Integration tests (future):** Server Actions with a real test DB

### What NOT to Test
- Implementation details (component internals, store structure)
- Third-party library behavior
- Snapshot tests (brittle, high maintenance)
- Private/internal functions that are implicitly tested through public API

### File Placement
- `src/utils/date.test.ts` — colocated with the utility
- `src/components/resume/__tests__/section-experience.test.tsx` — in `__tests__/` subfolder

### Test Pattern
```ts
// Describe behavior in plain English
describe("formatDateRange", () => {
  it("shows 'Present' when endDate is null", () => {
    expect(formatDateRange("2021-06", null)).toBe("Jun 2021 — Present");
  });

  it("formats a completed date range", () => {
    expect(formatDateRange("2019-01", "2021-06")).toBe("Jan 2019 — Jun 2021");
  });
});
```

---

## Local Database

Two options for local PostgreSQL:

### Docker (recommended)
```bash
docker run -d \
  --name sarthak-resume-db \
  -e POSTGRES_PASSWORD=localpassword \
  -e POSTGRES_DB=sarthak_resume \
  -p 5432:5432 \
  postgres:15
```

### Neon (cloud dev)
Sign up at neon.tech, create a project, use the connection string as `DATABASE_URL`.
