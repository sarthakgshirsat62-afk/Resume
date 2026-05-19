# Coding Standards

TypeScript rules, naming conventions, import order, and code style. Enforced by Biome.

---

## TypeScript

### Strictness
- `strict: true` — no exceptions
- `noImplicitAny: true` — never use `any`. Use `unknown` + type guards for truly unknown types.
- `exactOptionalPropertyTypes: true` — `{ foo?: string }` means `foo` is `string | undefined`, not also `null`
- `noUncheckedIndexedAccess: true` — array/object index access returns `T | undefined`

### Type Patterns
```ts
// ✓ Infer from Zod schemas
type Resume = z.infer<typeof resumeSchema>;

// ✓ Use Pick/Omit for derivations
type ResumePreview = Pick<Resume, "id" | "title" | "updatedAt">;

// ✗ Don't write duplicate manual types
interface Resume { id: string; title: string; ... }  // if schema already defines it

// ✓ Use type-only imports
import type { Resume } from "@/schemas/resume";

// ✗ Don't assert types with `as`
const resume = data as Resume;  // ← use Zod parse or a type guard instead
```

### Null vs Undefined
- Nullable DB fields → `T | null` (match Drizzle's inference)
- Optional function params → `T | undefined` (use `?` param syntax)
- Never use `null` for "empty" states in component props — use `undefined`

---

## Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Files (React component) | `kebab-case.tsx` | `section-experience.tsx` |
| Files (non-component) | `kebab-case.ts` | `use-editor-store.ts` |
| React components | `PascalCase` | `SectionExperience` |
| Hook functions | `use` + `PascalCase` | `useEditorStore` |
| Regular functions | `camelCase` | `formatDate` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_SECTIONS = 20` |
| Zod schemas | `camelCase` + `Schema` | `resumeSectionSchema` |
| Inferred Zod types | `PascalCase` | `ResumeSection` |
| Server Actions | `camelCase` verb | `updateResumeTitle` |
| Query keys | `camelCase` | `queryKeys.resume(id)` |
| CSS custom props | `--kebab-case` | `--color-primary` |
| Env variables | `UPPER_SNAKE_CASE` | `DATABASE_URL` |

---

## File Length

- Soft limit: **200 lines**
- Hard limit: **300 lines** — split if exceeded
- One component per file (small helper sub-components colocated in the same file are OK if < 30 lines)
- One Zod schema per file is fine; multiple related schemas in one file is OK

---

## Import Order (enforced by Biome)

```ts
// 1. Type imports first
import type { ReactNode } from "react";
import type { Resume } from "@/schemas/resume";

// 2. Node built-ins (rare in frontend)
// import { readFile } from "fs/promises";

// 3. Third-party packages
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

// 4. Internal — lib/utils
import { cn } from "@/utils/cn";
import { queryKeys } from "@/lib/query-keys";

// 5. Internal — components
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/resume/section-header";

// 6. Relative (same folder)
import { ExperienceForm } from "./experience-form";
```

---

## Comments

- **Default: no comments.** Well-named code explains itself.
- Add a comment only when the **WHY** is non-obvious: a hidden constraint, a subtle invariant, a workaround for a known library bug.
- Never document *what* the code does (that's what the code is for).
- Never add `// TODO`, `// FIXME`, or `// HACK` in committed code — address them or open an issue.

```ts
// ✓ Explains a non-obvious invariant
// react-pdf Font.register() must be called before any render, not lazily
Font.register({ family: "Inter", ... });

// ✗ Explains what the code obviously does
// Set the title
resume.title = newTitle;

// ✗ Documents a caller
// Used by ExperienceForm
export function formatDateRange(...) { ... }
```

---

## Function Style

- Prefer named function declarations for React components (better stack traces):
  ```ts
  // ✓
  export function SectionExperience({ section }: Props) { ... }
  
  // ✗ (for components — fine for utilities)
  export const SectionExperience = ({ section }: Props) => { ... }
  ```
- Prefer named exports over default exports (except Next.js page/layout files where default is required).
- Arrow functions for: callbacks, hooks, utility functions.

---

## Component Props

```ts
// ✓ Inline props type (for small components)
export function Badge({ label, variant = "default" }: { label: string; variant?: "default" | "outline" }) {
  ...
}

// ✓ Named type (when reused or complex)
interface SectionHeaderProps {
  title: string;
  isVisible?: boolean;
  onToggle?: () => void;
}
export function SectionHeader({ title, isVisible = true, onToggle }: SectionHeaderProps) { ... }

// ✗ Using `React.FC<>` — no longer recommended
const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => { ... }
```

---

## Error Handling

```ts
// ✓ Throw descriptive errors in Server Actions
if (!session) throw new Error("Unauthorized");
if (!resume) throw new Error(`Resume ${resumeId} not found`);

// ✓ Use try/catch in async utilities
const result = await someOperation().catch((err) => {
  console.error("Failed to do X:", err);
  return null;
});

// ✗ Swallow errors silently
try { ... } catch { }   // ← at minimum log the error
```

---

## Async/Await

- Always use `async/await`. No `.then()` chains.
- `Promise.all()` for concurrent independent async operations.
- Never `await` in a loop — use `Promise.all(arr.map(async (item) => ...))`.

---

## Tailwind Class Order

Biome enforces Tailwind class ordering automatically. Conceptual order:
1. Layout (display, position, flex/grid)
2. Sizing (w, h, min/max)
3. Spacing (m, p)
4. Typography (text, font, leading)
5. Colors (bg, text color, border color)
6. Borders (border, rounded)
7. Effects (shadow, opacity)
8. Transitions/animation
9. Responsive variants
10. State variants (hover:, focus:, dark:)

---

## Environment Variables

- All env vars are typed and validated at startup via `src/lib/env.ts` (using Zod + t3-oss/env-nextjs pattern).
- Never access `process.env.X` directly in application code — always import from `env.ts`.
- Client-side vars must be prefixed `NEXT_PUBLIC_`.
- Document all vars in `docs/deployment.md`.

```ts
// src/lib/env.ts
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(32),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
});
```
