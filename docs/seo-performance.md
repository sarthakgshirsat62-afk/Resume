# SEO & Performance

SEO metadata strategy, structured data, Core Web Vitals targets, and image optimization.

---

## SEO Strategy

### Metadata API (Next.js)

Every public page exports a `generateMetadata` function:

```ts
// app/(public)/resume/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resume = await getPublicResume(params.slug);
  return {
    title: `${resume.personalInfo.fullName} — Resume`,
    description: resume.personalInfo.summary.slice(0, 160),
    openGraph: {
      title: `${resume.personalInfo.fullName} — Resume`,
      description: resume.personalInfo.summary.slice(0, 160),
      type: "profile",
      url: `${env.NEXT_PUBLIC_APP_URL}/resume/${params.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${resume.personalInfo.fullName} — Resume`,
    },
  };
}
```

### Root Metadata (layout.tsx)

```ts
export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: "Sarthak — Software Engineer",
    template: "%s | Sarthak",
  },
  description: "...",
  robots: { index: true, follow: true },
};
```

---

## Structured Data (JSON-LD)

The public resume page includes JSON-LD for rich search results:

```ts
// In the resume page component (Server Component)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: resume.personalInfo.fullName,
  jobTitle: resume.personalInfo.headline,
  email: resume.personalInfo.email,
  url: env.NEXT_PUBLIC_APP_URL,
  sameAs: [
    resume.personalInfo.linkedin,
    resume.personalInfo.github,
  ].filter(Boolean),
};

// In the JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

---

## Sitemap

Auto-generated using Next.js `sitemap.ts`:

```ts
// src/app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/portfolio`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.5 },
    // Add resume slug if public
    { url: `${base}/resume/${publicSlug}`, changeFrequency: "weekly", priority: 0.9 },
    // One entry per file in content/blog/ — see getAllPosts() in docs/blog.md
    ...blogPosts.map((post) => ({ url: `${base}/blog/${post.slug}`, changeFrequency: "monthly", priority: 0.6 })),
  ];
}
```

---

## Robots.txt

```ts
// src/app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/dashboard/", "/api/"] },
    ],
    sitemap: `${env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  };
}
```

---

## Core Web Vitals Targets

| Metric | Target | Notes |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | Hero image must be `priority` in Next/Image |
| FID / INP | < 200ms | Avoid blocking work on interaction |
| CLS (Cumulative Layout Shift) | < 0.1 | All images need explicit width/height |
| TTFB | < 800ms | Vercel Edge + ISR caching |
| Lighthouse Score | 95+ all | Run locally with `next build && next start` |

---

## Image Optimization

Always use `next/image`:

```tsx
import Image from "next/image";

// For hero images — add priority to preload
<Image
  src="/images/profile.jpg"
  alt="Sarthak"
  width={400}
  height={400}
  priority          // ← for above-the-fold images
  className="rounded-full"
/>

// For portfolio thumbnails — lazy loaded by default
<Image
  src={project.thumbnailUrl}
  alt={project.name}
  width={800}
  height={450}
  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
/>
```

**Rules:**
- Never use `<img>` — always `next/image`
- Always provide `width` and `height` (prevents CLS)
- Use `priority` only for images above the fold
- Use `sizes` prop for responsive images

---

## Font Optimization

```ts
// src/app/layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});
```

- `display: "swap"` — text visible during font load (prevents invisible text)
- `variable` — exposes font as a CSS variable used in `tokens.css`
- Self-hosted via `next/font/google` — fonts loaded from Vercel edge, not Google's servers

---

## Bundle Optimization

- **Dynamic imports** for heavy libraries:
  ```ts
  const { generatePdf } = await import("../utils/generate-pdf");  // PDF lib
  ```
- **React Server Components** for static content — zero client JS for server-rendered sections
- **Code splitting** is automatic per route in Next.js App Router
- Monitor bundle size with `@next/bundle-analyzer` if needed

---

## Caching Strategy

| Content | Strategy | Revalidation |
|---|---|---|
| Homepage | Static (SSG) | On deploy |
| Resume public page | ISR | `revalidate: 3600` (1 hour) |
| Portfolio page | Static (SSG) | On deploy |
| Blog listing + post pages | Static (SSG) | On deploy — new posts appear on the next build |
| About page | Static (SSG) | On deploy |
| Dashboard pages | No cache (dynamic) | — |
| API routes | No cache | — |

```ts
// For ISR in a Server Component
export const revalidate = 3600;  // seconds
```
