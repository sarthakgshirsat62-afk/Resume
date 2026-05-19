# PDF Export

PDF generation pipeline, template system, supported formats, and limitations.

---

## Approach: Client-Side Generation

PDF export runs entirely in the browser using `@react-pdf/renderer`. No server round-trip, no Puppeteer, no headless browser.

**Trigger:** User clicks "Download PDF" button in the editor header or on the public resume page.

**Pipeline:**
```
User clicks Download
  → Load latest resume data (from TanStack Query cache)
  → Dynamically import PDFDocument component (code-split for bundle size)
  → Pass resume data to PDFDocument
  → @react-pdf/renderer renders to ArrayBuffer in browser
  → Blob URL created → <a> click triggered → file download
  → Blob URL revoked
```

---

## Code Structure

```
src/components/pdf/
├── pdf-document.tsx              # Root PDF document component
├── pdf-personal-info.tsx         # Personal info header
├── pdf-section-experience.tsx    # Experience section
├── pdf-section-education.tsx     # Education section
├── pdf-section-skills.tsx        # Skills section
├── pdf-section-projects.tsx      # Projects section
├── pdf-section-certifications.tsx
├── pdf-section-custom.tsx
└── pdf-styles.ts                 # Shared style objects for PDF

src/features/pdf-export/
├── hooks/
│   └── use-pdf-export.ts         # Hook that drives the export flow
└── utils/
    └── generate-pdf.ts           # Core pdf generation function
```

---

## PDF Component Rules

PDF components use `@react-pdf/renderer` primitives, not HTML:

| HTML | PDF Equivalent |
|---|---|
| `<div>` | `<View>` |
| `<p>`, `<span>` | `<Text>` |
| `<img>` | `<Image>` |
| `<a>` | `<Link>` |
| `className="..."` | `style={{ ... }}` (PDF style objects) |

**Critical constraints:**
- No Tailwind classes
- No CSS variables (resolve them to literal values at render time)
- No `useEffect`, `useState`, browser APIs
- Supported CSS is a subset — see @react-pdf/renderer docs for supported properties
- Flexbox is supported; CSS Grid is not
- Web fonts must be registered with `Font.register()`

---

## PDF Styles

All PDF styles are defined in `src/components/pdf/pdf-styles.ts` as StyleSheet objects:

```ts
import { StyleSheet } from "@react-pdf/renderer";

export const pdfStyles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 10,
    padding: "12mm 15mm",
    color: "#1a1a1a",
    lineHeight: 1.4,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
    borderBottom: "1pt solid #e5e7eb",
    paddingBottom: 3,
  },
  entryTitle: {
    fontSize: 11,
    fontWeight: "semibold",
  },
  // ...
});
```

**Template theming in PDF:** Each template exports its own `pdfStyles` object. The `PDFDocument` root component receives `templateId` and imports the appropriate styles.

---

## Font Registration

Fonts must be registered before any PDF render:

```ts
// src/features/pdf-export/utils/register-fonts.ts
import { Font } from "@react-pdf/renderer";

Font.register({
  family: "Inter",
  fonts: [
    { src: "/fonts/Inter-Regular.woff2" },
    { src: "/fonts/Inter-Medium.woff2", fontWeight: "medium" },
    { src: "/fonts/Inter-SemiBold.woff2", fontWeight: "semibold" },
    { src: "/fonts/Inter-Bold.woff2", fontWeight: "bold" },
  ],
});
```

Called once at the top of `generate-pdf.ts` before rendering.

---

## Page Setup

```ts
// A4 page in mm
<Page size="A4" style={pdfStyles.page}>
  ...
</Page>
```

- **Size:** A4 (210mm × 297mm)
- **Orientation:** Portrait only
- **Margins:** 12mm top/bottom, 15mm left/right (default template)
- **Bleed/crop marks:** Not required for personal resume

---

## Rich Text in PDF

Experience/project descriptions are stored as HTML strings. `react-pdf-html` parses HTML and renders to PDF-compatible elements:

```ts
import Html from "react-pdf-html";

<Html>{entry.description}</Html>
```

**Supported HTML tags:** `<p>`, `<strong>`, `<em>`, `<u>`, `<ul>`, `<ol>`, `<li>`, `<a>`

**Unsupported:** `<table>`, `<img>`, `<div>`, custom classes — sanitize before passing.

---

## Export Hook

```ts
// src/features/pdf-export/hooks/use-pdf-export.ts
export function usePdfExport(resumeId: string) {
  const { data: resume } = useResume(resumeId);
  const [isGenerating, setIsGenerating] = useState(false);

  const exportPdf = useCallback(async () => {
    if (!resume) return;
    setIsGenerating(true);
    try {
      const { generatePdf } = await import("../utils/generate-pdf");
      const blob = await generatePdf(resume);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${resume.title.replace(/\s+/g, "_")}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsGenerating(false);
    }
  }, [resume]);

  return { exportPdf, isGenerating };
}
```

---

## Supported Export Formats

| Format | Library | Status |
|---|---|---|
| PDF | @react-pdf/renderer | Phase 1 |
| JSON | Native JSON.stringify | Phase 1 (resume data backup) |
| DOCX | `docx` library | Phase 4 |
| Print CSS | Browser print | Phase 4 (fallback) |

---

## Performance Notes

- PDF generation blocks the main thread for ~1-3 seconds for a typical resume.
- Dynamically import `@react-pdf/renderer` (large bundle) — never in the main bundle.
- Show a progress indicator during generation (disable the button + show spinner).
- Consider moving to a Worker if generation time becomes problematic.
