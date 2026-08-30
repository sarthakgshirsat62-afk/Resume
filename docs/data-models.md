# Data Models

Zod schemas, database tables, TypeScript types, and relationships. This is the single source of truth for all data shapes.

---

## Principles

- All types are **inferred from Zod schemas** — never write `interface` or `type` manually for data shapes.
- Zod schemas live in `src/schemas/`. They are reused in forms, server actions, and Drizzle table definitions.
- Database tables use `drizzle-zod` to generate insert/select schemas from Drizzle table definitions.

---

## User

```ts
// src/schemas/user.ts
export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  avatarUrl: z.string().url().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof userSchema>;
```

**DB table:** `users`
**Relations:** `users` → `resumes` (one-to-many)

---

## Resume

```ts
// src/schemas/resume.ts

export const resumeMetaSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  title: z.string().min(1).default("My Resume"),
  slug: z.string().min(1),              // URL-safe identifier
  isPublic: z.boolean().default(false),
  templateId: z.string().default("default"),
  themeColor: z.string().default("blue"),
  fontFamily: z.string().default("inter"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ResumeMeta = z.infer<typeof resumeMetaSchema>;
```

---

## Resume Sections

All section types follow this base shape, with a discriminated union for section-specific fields.

```ts
export const sectionBaseSchema = z.object({
  id: z.string().uuid(),
  resumeId: z.string().uuid(),
  type: z.string(),                     // discriminant field
  title: z.string(),                    // displayed section heading
  order: z.number().int().nonnegative(),
  isVisible: z.boolean().default(true),
});
```

### Personal Info
```ts
export const personalInfoSchema = sectionBaseSchema.extend({
  type: z.literal("personalInfo"),
  data: z.object({
    fullName: z.string().min(1),
    headline: z.string(),               // "Senior Software Engineer at Acme"
    email: z.string().email(),
    phone: z.string().optional(),
    location: z.string().optional(),
    website: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    photoUrl: z.string().url().optional().nullable(),
    summary: z.string(),                // rich text HTML
  }),
});
```

### Experience Entry
```ts
export const experienceEntrySchema = z.object({
  id: z.string().uuid(),
  company: z.string().min(1),
  role: z.string().min(1),
  location: z.string().optional(),
  startDate: z.string(),               // "2021-06" — YYYY-MM
  endDate: z.string().optional(),      // null = present
  isCurrent: z.boolean().default(false),
  description: z.string(),             // rich text HTML
  highlights: z.array(z.string()),     // bullet points
});

export const experienceSectionSchema = sectionBaseSchema.extend({
  type: z.literal("experience"),
  entries: z.array(experienceEntrySchema),
});
```

### Education Entry
```ts
export const educationEntrySchema = z.object({
  id: z.string().uuid(),
  institution: z.string().min(1),
  degree: z.string(),
  fieldOfStudy: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  isCurrent: z.boolean().default(false),
  gpa: z.string().optional(),
  description: z.string().optional(),
});

export const educationSectionSchema = sectionBaseSchema.extend({
  type: z.literal("education"),
  entries: z.array(educationEntrySchema),
});
```

### Skills
```ts
export const skillGroupSchema = z.object({
  id: z.string().uuid(),
  category: z.string(),               // "Languages", "Tools", "Frameworks"
  skills: z.array(z.string()),
  level: z.enum(["beginner", "intermediate", "advanced", "expert"]).optional(),
});

export const skillsSectionSchema = sectionBaseSchema.extend({
  type: z.literal("skills"),
  groups: z.array(skillGroupSchema),
});
```

### Projects
```ts
export const projectEntrySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string(),
  url: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  techStack: z.array(z.string()),
  highlights: z.array(z.string()),
});

export const projectsSectionSchema = sectionBaseSchema.extend({
  type: z.literal("projects"),
  entries: z.array(projectEntrySchema),
});
```

### Certifications
```ts
export const certificationEntrySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  issuer: z.string().min(1),
  date: z.string().optional(),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  url: z.string().url().optional(),
});

export const certificationsSectionSchema = sectionBaseSchema.extend({
  type: z.literal("certifications"),
  entries: z.array(certificationEntrySchema),
});
```

### Custom Section
```ts
export const customSectionSchema = sectionBaseSchema.extend({
  type: z.literal("custom"),
  content: z.string(),                 // rich text HTML
});
```

### Full Resume (Union)
```ts
export const resumeSectionSchema = z.discriminatedUnion("type", [
  personalInfoSchema,
  experienceSectionSchema,
  educationSectionSchema,
  skillsSectionSchema,
  projectsSectionSchema,
  certificationsSectionSchema,
  customSectionSchema,
]);

export type ResumeSection = z.infer<typeof resumeSectionSchema>;

export const fullResumeSchema = resumeMetaSchema.extend({
  sections: z.array(resumeSectionSchema),
});

export type FullResume = z.infer<typeof fullResumeSchema>;
```

---

## Database Tables (Drizzle)

```ts
// src/db/schema.ts

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  name: varchar("name", { length: 256 }).notNull(),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const resumes = pgTable("resumes", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  title: varchar("title", { length: 256 }).notNull().default("My Resume"),
  slug: varchar("slug", { length: 256 }).notNull(),
  isPublic: boolean("is_public").notNull().default(false),
  templateId: varchar("template_id", { length: 64 }).notNull().default("default"),
  themeColor: varchar("theme_color", { length: 64 }).notNull().default("blue"),
  fontFamily: varchar("font_family", { length: 64 }).notNull().default("inter"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const resumeSections = pgTable("resume_sections", {
  id: uuid("id").primaryKey().defaultRandom(),
  resumeId: uuid("resume_id").references(() => resumes.id, { onDelete: "cascade" }).notNull(),
  type: varchar("type", { length: 64 }).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  order: integer("order").notNull().default(0),
  isVisible: boolean("is_visible").notNull().default(true),
  data: jsonb("data").notNull().default({}),   // section-type-specific data
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

**Note:** Section data is stored as `jsonb` for flexibility. The Zod discriminated union validates it at the application layer.

```ts
export const blogComments = pgTable("blog_comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  postSlug: varchar("post_slug", { length: 256 }).notNull(),  // no FK — posts are files, not DB rows
  parentId: uuid("parent_id"),                                 // null = top-level; app layer enforces one level of nesting
  authorName: varchar("author_name", { length: 80 }).notNull(),
  authorEmail: varchar("author_email", { length: 256 }),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogVotes = pgTable("blog_votes", {
  id: uuid("id").primaryKey().defaultRandom(),
  postSlug: varchar("post_slug", { length: 256 }).notNull(),
  visitorId: uuid("visitor_id").notNull(),
  value: integer("value").notNull(),   // 1 or -1
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  // unique index on (postSlug, visitorId) — one vote per visitor per post
});
```

---

## Blog Comment

```ts
// src/schemas/blog.ts
export const createCommentInputSchema = z.object({
  postSlug: z.string().min(1),
  parentId: z.string().uuid().optional(),   // one level of nesting only — a reply's parent must itself be top-level
  authorName: z.string().trim().min(1).max(80),
  authorEmail: z.string().trim().email().optional().or(z.literal("")),  // never displayed publicly
  body: z.string().trim().min(1).max(2000),
  honeypot: z.string().optional().or(z.literal("")),  // spam trap — must stay empty
});

export type CreateCommentInput = z.infer<typeof createCommentInputSchema>;
```

**DB table:** `blog_comments`
**Identity:** No account required — `authorName`/`authorEmail` are free-text supplied by the commenter, not linked to `users`. See `/docs/auth.md` for why this is a deliberate exception to the owner-only auth model.
**Moderation:** Comments publish instantly. The owner can delete any comment (and its replies) from `/dashboard/comments`.

---

## Blog Vote (thumbs up/down)

```ts
// src/schemas/blog.ts
export const castVoteInputSchema = z.object({
  postSlug: z.string().min(1),
  visitorId: z.string().uuid(),   // anonymous, browser-generated — stored in localStorage, not tied to a user account
  value: z.union([z.literal(1), z.literal(-1)]),
});
```

**DB table:** `blog_votes`
**Uniqueness:** One row per `(post_slug, visitor_id)` — enforced by a unique index. Casting the same vote again removes it (toggle off); casting the opposite vote updates it.
**Note:** `visitorId` is a random UUID generated client-side on first visit — not an authenticated identity. Clearing browser storage resets a visitor's vote state. This is an intentional low-stakes tradeoff, not a bug.

---

## Contact Form

```ts
export const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(5).max(200),
  message: z.string().min(20).max(2000),
});

export type ContactForm = z.infer<typeof contactFormSchema>;
```

No DB persistence — submitted via Server Action → Nodemailer.
