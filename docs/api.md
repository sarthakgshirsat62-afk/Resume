# API

API route handlers, Server Actions, request/response contracts, and error handling.

---

## API Architecture

This project uses **Server Actions** as the primary mutation layer. Route Handlers (`src/app/api/`) are reserved for:
- Auth callbacks (Better Auth catch-all handler)
- Webhooks from external services
- Public endpoints that need standard HTTP semantics (RSS feed, sitemap)
- Future: public API for resume data (if an external integration is needed)

---

## Server Actions

All mutations are Server Actions defined alongside their feature. They are colocated with the feature or in a `actions.ts` file.

### Conventions

```ts
// Pattern for all Server Actions
"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function updateResumeTitle(input: { resumeId: string; title: string }) {
  // 1. Authenticate
  const session = await auth.getSession();
  if (!session) throw new Error("Unauthorized");

  // 2. Validate input
  const { resumeId, title } = z.object({
    resumeId: z.string().uuid(),
    title: z.string().min(1).max(256),
  }).parse(input);

  // 3. Authorize (ensure user owns the resource)
  const resume = await db.query.resumes.findFirst({
    where: (r, { eq, and }) => and(eq(r.id, resumeId), eq(r.userId, session.user.id)),
  });
  if (!resume) throw new Error("Not found");

  // 4. Mutate
  await db.update(resumes).set({ title, updatedAt: new Date() }).where(eq(resumes.id, resumeId));
}
```

### Return Pattern

Server Actions return one of:
- `void` (for fire-and-forget mutations called with `startTransition`)
- `{ data: T }` (for mutations that return a created/updated record)
- `{ error: string }` (for handled errors — not thrown)

Thrown errors are caught by the client via `try/catch` in the mutation wrapper and shown as toast notifications.

---

## Route Handlers

### Auth

```
POST /api/auth/[...all]    ← Better Auth catch-all (handles /login, /callback, /logout, etc.)
```

### Resume Public Data

```
GET /api/resumes/[slug]    ← Public resume data for share page (bypasses session check, respects isPublic flag)
```

### Contact

```
POST /api/contact          ← Contact form submission → sends email via Nodemailer
```

---

## Server Action Catalog

### Resume Actions

| Action | Input | Description |
|---|---|---|
| `createResume` | `{ title: string }` | Creates a new resume for the current user |
| `deleteResume` | `{ resumeId: string }` | Deletes resume and all its sections |
| `updateResumeMeta` | `{ resumeId, title?, isPublic?, templateId?, themeColor?, fontFamily? }` | Updates resume metadata |
| `duplicateResume` | `{ resumeId: string }` | Clones a resume with all sections |

### Section Actions

| Action | Input | Description |
|---|---|---|
| `addSection` | `{ resumeId, type, title }` | Adds a new section of given type |
| `deleteSection` | `{ sectionId: string }` | Removes section from resume |
| `updateSectionData` | `{ sectionId, data: unknown }` | Updates section content (validated by Zod per type) |
| `reorderSections` | `{ resumeId, orderedIds: string[] }` | Updates order of all sections |
| `toggleSectionVisibility` | `{ sectionId: string }` | Toggles `isVisible` flag |

### Entry Actions (within repeatable sections)

| Action | Input | Description |
|---|---|---|
| `addEntry` | `{ sectionId, type }` | Adds blank entry to a section |
| `updateEntry` | `{ sectionId, entryId, data: unknown }` | Updates a single entry |
| `deleteEntry` | `{ sectionId, entryId }` | Removes an entry |
| `reorderEntries` | `{ sectionId, orderedIds: string[] }` | Reorders entries within a section |

### Contact Actions

| Action | Input | Description |
|---|---|---|
| `submitContactForm` | `ContactForm` | Validates + sends email |

### Blog Comment Actions

Defined in `src/features/blog/actions.ts`. No authentication for reads/creates — anonymous by design (see `/docs/auth.md`). `deleteComment` is owner-only.

| Action | Input | Description |
|---|---|---|
| `addComment` | `CreateCommentInput` | Validates postSlug exists; if replying, validates the parent is top-level (one level of nesting only). Silently no-ops if the honeypot field is filled |
| `deleteComment` | `{ commentId: string }` | Owner-only. Deletes the comment and any replies to it in one transaction |

### Blog Vote Actions

Also in `src/features/blog/actions.ts`. Anonymous — identified by a client-generated `visitorId`, not a session.

| Action | Input | Description |
|---|---|---|
| `getVoteSummary` | `{ postSlug, visitorId? }` | Returns `{ upvotes, downvotes, myVote }`. `myVote` is `0` when `visitorId` is omitted |
| `castVote` | `{ postSlug, visitorId, value: 1 \| -1 }` | Upserts the visitor's vote; casting the same value again removes it (toggle off) |

---

## Error Handling

### Hierarchy

```
1. Input validation error  → Zod parse throws  → caught, returns field errors
2. Auth error              → throw "Unauthorized" → client shows 401 toast
3. Not found               → throw "Not found"    → client shows 404 message
4. Server error            → unhandled throw      → Next.js error boundary catches
```

### Client-side consumption pattern

```ts
// In a React component using TanStack Query mutation
const mutation = useMutation({
  mutationFn: (data) => updateResumeTitle(data),
  onSuccess: () => {
    toast.success("Title updated");
    queryClient.invalidateQueries({ queryKey: queryKeys.resume(resumeId) });
  },
  onError: (error) => {
    toast.error(error.message ?? "Something went wrong");
  },
});
```

---

## Query Key Conventions

Defined in `src/lib/query-keys.ts`:

```ts
export const queryKeys = {
  resumes: ["resumes"] as const,
  resume: (id: string) => ["resumes", id] as const,
  resumePublic: (slug: string) => ["resumes", "public", slug] as const,
  user: ["user"] as const,
} as const;
```

Invalidation after mutation: always invalidate the affected key. Prefer `invalidateQueries` over `setQueryData` unless performance requires it.
