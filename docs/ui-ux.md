# UI/UX Guidelines

UX principles, layout system, responsive strategy, and accessibility requirements.

---

## Design Principles

1. **Premium, not flashy** — Restrained use of animation and decoration. Quality through precision: spacing, typography, and hierarchy do the heavy lifting.
2. **Content first** — The design should direct attention to content (name, work, skills), not to itself.
3. **Calm editor** — The resume editor should feel focused and distraction-free. Side panels, not modals. Auto-save, not explicit save buttons.
4. **Progressive disclosure** — Show the most important things first. Reveal complexity only when needed.
5. **Consistent affordances** — Interactive elements look the same everywhere. Buttons, inputs, and links are immediately recognizable.

---

## Layout System

### Grid
- Base: 12-column grid using Tailwind's `grid-cols-12`
- Content max-width: `1280px` (`max-w-7xl`)
- Reading max-width: `720px` (`max-w-2xl`) for blog/about text
- Resume content width: `210mm` (A4) when in print/PDF view

### Spacing Scale
Defined as CSS variables (see `/docs/theming.md`). Only use the scale — no arbitrary spacing values like `mt-[13px]`.

### Breakpoints

| Name | Width | Usage |
|---|---|---|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Wide desktop |
| `2xl` | 1536px | Ultra-wide |

**Mobile-first:** All base styles are mobile. Use `md:`, `lg:` prefixes to enhance upward.

---

## Page Structure

### Public Pages (homepage, resume, portfolio)
```
<SiteHeader />               ← Fixed or sticky, transparent over hero
  <main>
    <HeroSection />          ← Full-viewport or large banner
    <ContentSection />       ← Standard padded sections
    ...
  </main>
<SiteFooter />
```

### Dashboard (editor)
```
<DashboardLayout>
  <Sidebar />                ← Left: section navigation, resume list
  <EditorCanvas />           ← Center: live preview (A4 proportions)
  <PropertiesPanel />        ← Right: form for selected section (collapsible)
</DashboardLayout>
```

---

## Navigation

- **Public:** Top navigation bar with links (Home, Resume, Portfolio, About, Contact) + theme toggle + CTA button
- **Dashboard:** Left sidebar with: resume list, section list (drag-reorderable), settings link
- **Mobile:** Hamburger menu for public nav; drawer for dashboard sidebar

---

## Typography Hierarchy

| Role | Tailwind Class | Use |
|---|---|---|
| Display | `text-5xl font-bold tracking-tight` | Hero name/headline |
| H1 | `text-4xl font-bold` | Page titles |
| H2 | `text-3xl font-semibold` | Section headings |
| H3 | `text-xl font-semibold` | Card titles, sub-sections |
| Body | `text-base` (16px) | General content |
| Body small | `text-sm` | Metadata, captions, labels |
| Caption | `text-xs` | Timestamps, tags |
| Mono | `font-mono text-sm` | Code, dates in resume |

Font stack: `var(--font-sans)` (Inter or Geist) for UI; `var(--font-serif)` (optional, for resume body text)

---

## Color Usage

See `/docs/theming.md` for token definitions.

| Role | Token | Usage |
|---|---|---|
| Primary action | `--color-primary` | Buttons, links, active states |
| Neutral | `--color-neutral-*` | Text, borders, backgrounds |
| Success | `--color-success` | Confirmations, save states |
| Warning | `--color-warning` | Alerts, draft indicators |
| Destructive | `--color-destructive` | Delete actions, errors |

**Dark mode:** All color tokens have light/dark variants. Never hardcode `#hex` values — always use tokens.

---

## Motion & Animation

- **Principle:** Motion should reinforce hierarchy, not add decoration.
- **Duration scale:** `150ms` (micro), `250ms` (default), `400ms` (page), `600ms` (hero)
- **Easing:** `ease-out` for enter, `ease-in` for exit
- **Reduce motion:** All animations respect `prefers-reduced-motion`. Use Tailwind's `motion-safe:` prefix.
- **Not animated:** Form inputs, data loading states (skeleton preferred over spin)

---

## Interactive States

Every interactive element must have clearly visible states:

| State | Implementation |
|---|---|
| Default | Base styles |
| Hover | `hover:` — subtle background or underline |
| Focus visible | `focus-visible:ring-2 focus-visible:ring-offset-2` |
| Active/pressed | `active:scale-95` or `active:opacity-80` |
| Disabled | `disabled:opacity-50 disabled:cursor-not-allowed` |
| Loading | Spinner inside button or skeleton overlay |

---

## Resume Editor UX

- **No save button** — auto-save on blur (debounced 1s). Show "Saving..." / "Saved" indicator in header.
- **Live preview** — right panel (or full width toggle) shows the rendered resume as you type.
- **Section reordering** — drag-and-drop via `@dnd-kit/sortable`. Handles must be clearly visible.
- **Add/remove sections** — "+" button in sidebar. Trash icon on each section row.
- **Undo** — `Ctrl+Z` support via Zustand action history (not browser history).
- **Focus mode** — collapse sidebar and properties panel for distraction-free writing.

---

## Accessibility

- **Color contrast:** WCAG AA minimum (4.5:1 for text, 3:1 for UI components)
- **Keyboard navigation:** All interactive elements reachable by Tab. Logical focus order.
- **ARIA:** Use Radix UI primitives — they handle ARIA roles, labels, and live regions.
- **Images:** All images must have meaningful `alt` text. Decorative images: `alt=""`
- **Forms:** Every input has an associated `<label>`. Error messages linked via `aria-describedby`.
- **Skip link:** `<a href="#main-content">Skip to main content</a>` as the first focusable element on public pages.
- **Semantic HTML:** Use `<main>`, `<nav>`, `<section>`, `<article>`, `<aside>` correctly. No `<div>` soup.

---

## Loading States

| Context | Pattern |
|---|---|
| Page load | Skeleton screens (never spinner for whole page) |
| Data fetch in component | Skeleton matching component shape |
| Form submission | Button shows spinner + disabled state |
| Auto-save | Subtle "Saving..." text in editor header |
| PDF generation | Progress indicator (PDF can take 1-3s) |

---

## Error States

- **Form errors:** Inline below each field, red text, icon. Never modal.
- **Network errors:** Toast notification (Sonner) — `error` variant, dismissible.
- **404:** Branded not-found page with navigation back to home.
- **Server errors:** Friendly error page with retry option.
- **Empty states:** Descriptive empty state with CTA (e.g., "No resume yet — create one").
