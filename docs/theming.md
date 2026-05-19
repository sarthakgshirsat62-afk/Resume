# Theming

Design tokens, CSS variables, color system, typography, and spacing. The single source of truth for all visual decisions.

---

## Architecture

All design tokens are defined as CSS custom properties in `src/styles/tokens.css`.

Tailwind v4 consumes these tokens via `@theme` blocks — so Tailwind utility classes (e.g., `bg-primary`, `text-foreground`) map directly to CSS variables. This means:

- Changing a token in `tokens.css` affects all components automatically
- Dark mode is handled purely via CSS variables (no `dark:` class explosion)
- Resume templates can override specific tokens via scoped CSS

---

## Token File Structure

```css
/* src/styles/tokens.css */

@layer base {
  :root {
    /* Color tokens — light mode */
    --color-background: 0 0% 100%;
    --color-foreground: 240 10% 3.9%;
    ...

    /* Spacing */
    --spacing-xs: 0.25rem;
    ...
  }

  .dark {
    /* Color tokens — dark mode overrides */
    --color-background: 240 10% 3.9%;
    --color-foreground: 0 0% 98%;
    ...
  }
}
```

---

## Color System

Colors are defined in **HSL components** (not full HSL) so Tailwind can compose them with opacity modifiers.

### Semantic Color Tokens

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--color-background` | White | Near-black | Page background |
| `--color-foreground` | Near-black | Near-white | Primary text |
| `--color-card` | White | Dark slate | Card backgrounds |
| `--color-card-foreground` | Near-black | Near-white | Card text |
| `--color-primary` | Brand blue/indigo | Lighter variant | CTAs, links, active states |
| `--color-primary-foreground` | White | Near-black | Text on primary bg |
| `--color-secondary` | Light gray | Dark gray | Secondary actions |
| `--color-secondary-foreground` | Near-black | Near-white | Text on secondary bg |
| `--color-muted` | Very light gray | Dark muted | Subtle backgrounds |
| `--color-muted-foreground` | Medium gray | Light gray | Placeholder, metadata |
| `--color-accent` | Light tint | Dark tint | Hover backgrounds |
| `--color-accent-foreground` | Near-black | Near-white | Text on accent |
| `--color-border` | Light gray | Dark border | Dividers, input borders |
| `--color-input` | Light gray | Dark input | Input backgrounds |
| `--color-ring` | Primary | Primary | Focus ring |
| `--color-destructive` | Red | Lighter red | Delete/error actions |
| `--color-success` | Green | Lighter green | Success states |
| `--color-warning` | Amber | Lighter amber | Warning states |

### Neutral Scale

| Token | Value | Usage |
|---|---|---|
| `--neutral-50` | Near-white | Subtle backgrounds |
| `--neutral-100` | Light gray | Hover backgrounds |
| `--neutral-200` | Light border | Dividers |
| `--neutral-300` | Medium border | Input borders |
| `--neutral-400` | Placeholder | Disabled text |
| `--neutral-500` | Muted | Secondary text |
| `--neutral-600` | Body | Body text |
| `--neutral-700` | Strong | Heading text |
| `--neutral-800` | Near-black | High contrast |
| `--neutral-900` | Near-black | Maximum contrast |

---

## Typography Tokens

```css
:root {
  --font-sans: 'Inter Variable', system-ui, sans-serif;
  --font-serif: 'Lora', Georgia, serif;         /* optional, resume body */
  --font-mono: 'JetBrains Mono', monospace;

  /* Scale — follows Major Third (1.25x) */
  --text-xs:   0.75rem;   /* 12px */
  --text-sm:   0.875rem;  /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg:   1.125rem;  /* 18px */
  --text-xl:   1.25rem;   /* 20px */
  --text-2xl:  1.5rem;    /* 24px */
  --text-3xl:  1.875rem;  /* 30px */
  --text-4xl:  2.25rem;   /* 36px */
  --text-5xl:  3rem;      /* 48px */

  --leading-tight:  1.25;
  --leading-snug:   1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;

  --tracking-tight:  -0.025em;
  --tracking-normal: 0em;
  --tracking-wide:   0.025em;
}
```

---

## Spacing Tokens

```css
:root {
  --spacing-px: 1px;
  --spacing-0:  0;
  --spacing-1:  0.25rem;   /* 4px */
  --spacing-2:  0.5rem;    /* 8px */
  --spacing-3:  0.75rem;   /* 12px */
  --spacing-4:  1rem;      /* 16px */
  --spacing-5:  1.25rem;   /* 20px */
  --spacing-6:  1.5rem;    /* 24px */
  --spacing-8:  2rem;      /* 32px */
  --spacing-10: 2.5rem;    /* 40px */
  --spacing-12: 3rem;      /* 48px */
  --spacing-16: 4rem;      /* 64px */
  --spacing-20: 5rem;      /* 80px */
  --spacing-24: 6rem;      /* 96px */
}
```

Only use values from this scale. No arbitrary spacing like `p-[13px]`.

---

## Border Radius Tokens

```css
:root {
  --radius-none: 0;
  --radius-sm:   0.25rem;
  --radius-md:   0.375rem;   /* default for cards, inputs */
  --radius-lg:   0.5rem;     /* panels, modals */
  --radius-xl:   0.75rem;    /* large containers */
  --radius-full: 9999px;     /* pills, avatars */
}
```

---

## Shadow Tokens

```css
:root {
  --shadow-sm:  0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl:  0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
```

---

## Resume Template Theming

Individual resume templates can override color tokens via a scoped CSS class:

```css
/* Example: a resume with teal accent */
.template-teal {
  --color-primary: 172 66% 41%;
  --color-primary-foreground: 0 0% 100%;
}
```

The template wrapper applies `className="template-teal"` and all nested components pick up the override.

**Template theme properties (overridable per template):**
- `--resume-accent` — section heading color
- `--resume-sidebar-bg` — sidebar background (two-column templates)
- `--resume-body-font` — resume body font
- `--resume-heading-font` — resume heading font

---

## Dark Mode

- Dark mode uses the `.dark` class on `<html>` (managed by `next-themes`)
- All components use semantic tokens — they automatically adapt
- **Never** write `dark:text-white dark:bg-gray-900` in components. Use tokens.
- Test all components in both modes before shipping.

---

## Tailwind @theme Integration

In `tailwind.config.ts`, map CSS variables to Tailwind utilities:

```ts
// This means: bg-background → var(--color-background)
theme: {
  extend: {
    colors: {
      background: "hsl(var(--color-background))",
      foreground: "hsl(var(--color-foreground))",
      primary: {
        DEFAULT: "hsl(var(--color-primary))",
        foreground: "hsl(var(--color-primary-foreground))",
      },
      // ...
    },
  },
}
```
