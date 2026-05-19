# Product

Vision, features, roadmap, and scope for the SarthakResume project.

---

## Vision

A premium personal portfolio and resume platform — polished, fast, and SEO-optimized — that reflects Sarthak's professional identity and gives him full control over how his work is presented. Not a SaaS tool; a highly crafted personal site with resume builder capabilities.

---

## Target Audience

- Recruiters and hiring managers viewing the public resume/portfolio
- Sarthak (the owner) editing and managing content through the dashboard
- (Future) Other professionals discovering the site via blog or shared resume links

---

## Core Features (Phase 1 — MVP)

| Feature | Description | Status |
|---|---|---|
| Public resume page | Shareable, SEO-optimized `/resume` page with JSON-LD structured data | Planned |
| Resume editor | Private dashboard to edit all resume sections (drag-and-drop, rich text) | Planned |
| PDF export | One-click download of resume as PDF, client-side generation | Planned |
| Portfolio/projects page | Curated list of selected projects with descriptions and links | Planned |
| About page | Personal bio, skills summary, and contact info | Planned |
| Contact form | Email submission via React Email + Nodemailer | Planned |
| Dark/light mode | System-aware theme with manual toggle | Planned |
| Responsive design | Mobile-first, fully responsive across all breakpoints | Planned |
| Auth (owner-only) | Email/password + Google OAuth for Sarthak to access dashboard | Planned |

---

## Resume Sections (Editor)

| Section | Type | Notes |
|---|---|---|
| Personal Info | Fixed | Name, title, photo, location, email, links |
| Summary | Rich text | Professional summary paragraph |
| Experience | Repeatable | Company, role, dates, bullets (rich text) |
| Education | Repeatable | Institution, degree, dates, GPA optional |
| Skills | Tag-based | Grouped by category (Languages, Tools, etc.) |
| Projects | Repeatable | Title, description, links, tech stack tags |
| Certifications | Repeatable | Name, issuer, date, link |
| Awards | Repeatable | Name, issuer, date, description |
| Publications | Repeatable | Title, journal, date, link |
| Custom Section | Repeatable | User-defined title + rich text body |

---

## Phase 2 — Content Expansion

| Feature | Description |
|---|---|
| Blog | Markdown-based blog with tagging, SEO, and RSS feed |
| Case studies | Long-form project write-ups with image galleries |
| Multiple resume templates | 3-5 visual templates selectable in editor |
| Custom theme | Color palette picker per resume template |

---

## Phase 3 — Admin & AI

| Feature | Description |
|---|---|
| Admin dashboard | CMS-like interface for managing all site content (projects, blog posts, resume) |
| AI resume tailoring | Claude API integration — paste job description, get tailored resume bullets |
| AI cover letter | Generate cover letters from resume + job description |
| Analytics | Privacy-first (Plausible) — page views, PDF downloads, link clicks |

---

## Phase 4 — Platform Features

| Feature | Description |
|---|---|
| Multiple resume versions | Different resumes for different roles/industries |
| Resume sharing links | Unique public links per resume version |
| Downloadable DOCX | Word document export in addition to PDF |
| Print-optimized CSS | Browser print fallback for PDF |

---

## Scope Boundaries (What This Is NOT)

- Not a multi-user SaaS resume builder
- Not a template marketplace
- Not a job board or application tracker
- Not a social network or connection platform

---

## Design Philosophy

- **Premium over clever** — every detail (spacing, typography, micro-animation) should feel deliberate and high quality
- **Content first** — layout and design should serve the content, not compete with it
- **Fast by default** — performance is a feature; Lighthouse score target: 95+ across all metrics
- **Distraction-free editor** — the resume editor should be calm, focused, and efficient
