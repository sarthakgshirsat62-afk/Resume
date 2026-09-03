# PDF Export

PDF generation pipeline, template system, supported formats, and limitations.

**Status:** Implemented for the public resume page (`/resume`) only. The resume there is
static, single-template content (`src/components/resume/resume-data.ts`) — not yet the
dynamic, DB-backed, multi-resume system `data-models.md` describes for the future editor.
When that editor ships, this pipeline needs to generalize (accept a resume ID, support
multiple templates); until then, the structure below is intentionally simpler than what
this doc originally specified.

---

## Approach: Client-Side Generation

PDF export runs entirely in the browser using `@react-pdf/renderer`. No server round-trip, no Puppeteer, no headless browser.

**Trigger:** User clicks "Download PDF" on the public resume page (`src/components/resume/download-resume-button.tsx`).

**Pipeline:**
```
User clicks Download
  → usePdfExport hook sets isGenerating
  → Dynamically import generate-pdf.tsx (code-split — keeps @react-pdf/renderer out of the main bundle)
  → generateResumePdf() renders <PdfDocument /> to a Blob in-browser
  → Blob URL created → <a> click triggered → file download ("<Name>_Resume.pdf")
  → Blob URL revoked
  → On failure: toast error, logged to console
```

---

## Code Structure

```
src/components/resume/
├── resume-data.ts                # Single source of truth for resume content —
│                                  # imported by both ResumeView (HTML) and PdfDocument (PDF)
└── download-resume-button.tsx    # Client button wiring usePdfExport to the UI

src/components/pdf/
├── pdf-document.tsx              # Whole resume as one PDF document (all sections inline —
│                                  # not split into one file per section; see note below)
└── pdf-styles.ts                 # StyleSheet objects mirroring resume-view.tsx's design

src/features/pdf-export/
├── hooks/
│   └── use-pdf-export.ts         # Drives the export flow: loading state, download, error toast
└── utils/
    └── generate-pdf.tsx          # Core pdf generation function (dynamically imported)
```

**Why one `pdf-document.tsx` instead of one file per section:** the original spec below
(section-by-section files, per-template `pdfStyles`, `templateId` routing) assumes a
dynamic multi-template, multi-resume system. The actual resume is one static page with a
fixed layout, so splitting it into 8 near-empty files would be premature structure with no
current benefit. Revisit this split if/when multiple resume templates are actually built.

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

All PDF styles are defined in `src/components/pdf/pdf-styles.ts` as StyleSheet objects, hand-matched to `resume-view.tsx`'s Tailwind design (emerald accent, muted body text, etc.) resolved to literal hex values — a PDF has no dark mode, so it always renders the light-mode palette, the same way the existing print CSS (`@media print` in `globals.css`) always forces a white background regardless of site theme.

```ts
import { StyleSheet } from "@react-pdf/renderer";

export const pdfStyles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 9.5, color: "#171717", padding: "14mm 16mm" },
  sectionTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", color: "#059669", /* ... */ },
  entryTitle: { fontSize: 10, fontFamily: "Helvetica-Bold" },
  // ...
});
```

**Template theming:** not yet applicable — see the "Status" note above. There's one style
object for the one template that exists.

---

## Font Registration

**Not used.** The implementation uses `@react-pdf/renderer`'s built-in standard fonts
(`Helvetica` / `Helvetica-Bold`) rather than registering Geist (the site's actual font,
via `next/font/google` — the "Inter" example previously in this doc didn't match what the
site uses) or any other web font. Reasoning:
- `next/font/google`-optimized files don't have a stable public URL to register from.
- Registering a font from an external CDN URL adds a runtime network dependency to PDF
  generation and a fragile hardcoded, versioned URL.
- Helvetica is visually close enough to Geist for this purpose, and guarantees the export
  always works offline with zero extra requests.

Revisit if exact font fidelity becomes a requirement — e.g. by self-hosting a Geist
`.ttf`/`.otf` file under `public/fonts/` and calling `Font.register()` with that local path.

---

## Page Setup

```ts
<Page size="A4" style={pdfStyles.page}>
  ...
</Page>
```

- **Size:** A4 (210mm × 297mm)
- **Orientation:** Portrait only
- **Margins:** 14mm top/bottom, 16mm left/right
- **Pagination:** `@react-pdf/renderer` paginates automatically; each experience/education/
  certification entry uses `wrap={false}` so a single entry never splits across a page break
- **Bleed/crop marks:** Not required for personal resume

---

## Rich Text in PDF

**Not applicable yet.** The current resume content (`resume-data.ts`) is plain strings, not
HTML — `react-pdf-html` isn't installed or needed. If experience/project descriptions ever
become rich text (matching the dynamic resume schema in `data-models.md`), reintroduce
`react-pdf-html` at that point rather than before.

---

## Export Hook

```ts
// src/features/pdf-export/hooks/use-pdf-export.ts
export function usePdfExport(fileName: string) {
  const [isGenerating, setIsGenerating] = useState(false);

  const exportPdf = useCallback(async () => {
    setIsGenerating(true);
    try {
      const { generateResumePdf } = await import("@/features/pdf-export/utils/generate-pdf");
      const blob = await generateResumePdf();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to generate resume PDF:", error);
      toast.error("Couldn't generate the PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [fileName]);

  return { exportPdf, isGenerating };
}
```

Unlike the original spec, this doesn't take a `resumeId` or read from TanStack Query — the
resume page has one static resume, so the hook just takes the file name to save as.

---

## Supported Export Formats

| Format | Library | Status |
|---|---|---|
| PDF | @react-pdf/renderer | **Shipped** (public resume page only) |
| JSON | Native JSON.stringify | Not built |
| DOCX | `docx` library | Phase 4 |
| Print CSS | Browser print | Phase 4 (fallback) |

---

## Performance Notes

- PDF generation blocks the main thread for ~1-3 seconds for a typical resume.
- Dynamically import `@react-pdf/renderer` (large bundle) — never in the main bundle.
- Show a progress indicator during generation (disable the button + show spinner).
- Consider moving to a Worker if generation time becomes problematic.
