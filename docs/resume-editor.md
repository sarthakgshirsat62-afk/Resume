# Resume Editor

Resume builder workflow, section architecture, data flow, and live preview behavior.

---

## Editor Layout

Three-panel layout at `/dashboard/resumes/[id]/edit`:

```
┌─────────────────────────────────────────────────────────────┐
│  Editor Header: [Resume Title] [Template] [Save] [Export]   │
├──────────────┬───────────────────────────┬──────────────────┤
│   Sidebar    │      Canvas (Preview)     │  Properties      │
│              │                           │  Panel           │
│  Sections    │   ┌─────────────────┐    │                  │
│  ─────────   │   │                 │    │  Form for the    │
│  • Summary   │   │   Live Resume   │    │  selected        │
│  • Exp (3)   │   │   Preview       │    │  section or      │
│  • Education │   │   (A4 scale)    │    │  entry           │
│  • Skills    │   │                 │    │                  │
│  • Projects  │   └─────────────────┘    │                  │
│  + Add       │                           │                  │
└──────────────┴───────────────────────────┴──────────────────┘
```

- **Sidebar** — section list (drag-reorderable), add/remove sections
- **Canvas** — live preview of the resume in the selected template (A4 proportions, scrollable)
- **Properties Panel** — form fields for the selected section or entry, collapsible

---

## Section Architecture

Every resume is composed of **typed sections**. The section type determines:
- Which form component renders in the Properties Panel
- Which renderer component renders in the Canvas
- How the data is stored (which Zod schema validates it)

### Section Types

| Type | Form Component | Renderer Component |
|---|---|---|
| `personalInfo` | `PersonalInfoForm` | `PersonalInfoSection` |
| `experience` | `ExperienceForm` | `ExperienceSection` |
| `education` | `EducationForm` | `EducationSection` |
| `skills` | `SkillsForm` | `SkillsSection` |
| `projects` | `ProjectsForm` | `ProjectsSection` |
| `certifications` | `CertificationsForm` | `CertificationsSection` |
| `custom` | `CustomSectionForm` | `CustomSection` |

### Adding a New Section Type

To add a new section type (e.g., `publications`):
1. Add Zod schema to `src/schemas/resume.ts`
2. Add form component to `src/components/editor/publications-form.tsx`
3. Add renderer component to `src/components/resume/section-publications.tsx`
4. Add PDF renderer to `src/components/pdf/pdf-section-publications.tsx`
5. Register in the section type switch in `section-form.tsx` and `resume-renderer.tsx`
6. Update `data-models.md`

---

## Data Flow

### Reading Resume Data
```
Page load (/dashboard/resumes/[id]/edit)
  → Server Component fetches resume via Drizzle
  → Passes to QueryClient as initial data (prefetched)
  → Editor Client Components read from TanStack Query cache
  → useEditorStore initialized with resumeId
```

### Editing a Field
```
User types in a form input
  → React Hook Form tracks value (no re-render of canvas)
  → 1s debounce timer starts
  → On debounce: form.watch() triggers useEffect
  → updateSectionData Server Action called
  → Optimistic update: queryClient.setQueryData immediately
  → Server confirms write
  → "Saved" indicator shown in header
```

### Reordering Sections
```
User drags section in sidebar
  → @dnd-kit/sortable handles drag
  → onDragEnd: reorderSections Server Action called
  → Optimistic update in TanStack Query cache
  → Canvas re-renders with new order
```

### Adding an Entry (e.g., new Experience)
```
User clicks "+ Add Experience"
  → addEntry Server Action called with { sectionId, type: "experience" }
  → Returns new blank entry with generated ID
  → TanStack Query cache updated
  → New entry selected in editor (activates Properties Panel for it)
  → Form renders empty fields for the new entry
```

---

## Live Preview Behavior

The canvas shows a real-time preview using the same `ResumeRenderer` component used on the public page.

- **Sync:** Canvas reads from the same TanStack Query cache. Optimistic updates mean the preview updates before the server confirms.
- **Scale:** The A4 preview is CSS-scaled to fit the canvas width while maintaining A4 proportions. The actual A4 size is preserved for PDF accuracy.
- **Performance:** The canvas re-renders only when the specific section data changes (TanStack Query selector optimization).

```ts
// Scale the A4 page to fit the canvas container
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

// In the canvas component:
const scale = canvasWidth / (A4_WIDTH_PX);
// Applied as: style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
```

---

## Auto-Save

- **Trigger:** 1 second after the last keystroke in any form field
- **Indicator:** "Saving..." → "Saved ✓" in the editor header
- **No save button** — users should never need to manually save
- **On unmount:** If the user navigates away with unsaved changes (< 1s), a final save is triggered via `useEffect` cleanup

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl+Z` | Undo last change (section-level undo via Zustand history) |
| `Ctrl+Shift+Z` | Redo |
| `Ctrl+P` | Download PDF |
| `Escape` | Deselect active section / close panel |
| `F` | Toggle focus mode |

---

## Rich Text Editor

Used for: Summary, Experience description, Project description, Custom sections.

**Library:** Tiptap (built on ProseMirror)

**Supported formatting:**
- Bold, italic, underline
- Bullet list, ordered list
- Hyperlinks
- No: headers (resume sections handle hierarchy), no images in body text

**Output format:** HTML string, stored in `data.description` / `data.content` fields.

**Display:** The `RichTextDisplay` component renders sanitized HTML. Uses `DOMPurify` on the client to sanitize before rendering with `dangerouslySetInnerHTML`.

**PDF:** HTML string is parsed by `react-pdf-html` to render in the PDF context.
