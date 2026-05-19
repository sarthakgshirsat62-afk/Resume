# State Management

Three distinct state layers, what belongs in each, and usage patterns.

---

## Three Layers

| Layer | Tool | What Goes Here |
|---|---|---|
| Server state | TanStack Query | Remote data — resumes, user profile, public data |
| Client UI state | Zustand | Editor panel state, modal visibility, active selections |
| Form state | React Hook Form | Input values, validation errors, dirty/touched state |

**Never mix layers.** Resume data from the server is not duplicated into Zustand. Form state is not stored in Zustand.

---

## Layer 1: Server State — TanStack Query

### Setup
`QueryClientProvider` wraps the app in the root layout. Client is configured in `src/lib/query-client.ts`.

```ts
// src/lib/query-client.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,    // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

### Data Fetching Pattern

All data fetching is encapsulated in custom hooks:

```ts
// src/features/resume-editor/hooks/use-resume.ts
export function useResume(resumeId: string) {
  return useQuery({
    queryKey: queryKeys.resume(resumeId),
    queryFn: () => fetchResume(resumeId),
    enabled: Boolean(resumeId),
  });
}
```

**Rules:**
- No raw `useQuery` in components — always through a custom hook
- No direct `fetch()` calls in components — always through a query hook
- Server Components that need data fetch directly via Drizzle — no TanStack Query
- TanStack Query is only used in Client Components

### Mutation Pattern

```ts
// src/features/resume-editor/hooks/use-update-resume-title.ts
export function useUpdateResumeTitle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: { resumeId: string; title: string }) =>
      updateResumeTitle(input),                         // Server Action
    onSuccess: (_, { resumeId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.resume(resumeId) });
    },
  });
}
```

### Optimistic Updates

Use optimistic updates for editor changes to avoid UI lag:

```ts
onMutate: async (newData) => {
  await queryClient.cancelQueries({ queryKey: queryKeys.resume(resumeId) });
  const previous = queryClient.getQueryData(queryKeys.resume(resumeId));
  queryClient.setQueryData(queryKeys.resume(resumeId), (old) => ({
    ...old,
    ...newData,
  }));
  return { previous };
},
onError: (_, __, context) => {
  // Rollback on error
  queryClient.setQueryData(queryKeys.resume(resumeId), context?.previous);
},
```

---

## Layer 2: Client UI State — Zustand

### Store Files

```
src/store/
├── use-editor-store.ts      # Resume editor UI state
├── use-ui-store.ts          # Global UI state (sidebar open, active modal)
└── use-theme-store.ts       # Theme selection for resume (not site theme)
```

### Editor Store

```ts
// src/store/use-editor-store.ts
interface EditorState {
  activeResumeId: string | null;
  activeSectionId: string | null;
  activeEntryId: string | null;
  isPanelCollapsed: boolean;
  isFocusMode: boolean;

  setActiveSection: (id: string | null) => void;
  setActiveEntry: (id: string | null) => void;
  togglePanel: () => void;
  toggleFocusMode: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  activeResumeId: null,
  activeSectionId: null,
  activeEntryId: null,
  isPanelCollapsed: false,
  isFocusMode: false,

  setActiveSection: (id) => set({ activeSectionId: id, activeEntryId: null }),
  setActiveEntry: (id) => set({ activeEntryId: id }),
  togglePanel: () => set((s) => ({ isPanelCollapsed: !s.isPanelCollapsed })),
  toggleFocusMode: () => set((s) => ({ isFocusMode: !s.isFocusMode })),
}));
```

### UI Store

```ts
// src/store/use-ui-store.ts
interface UIState {
  isSidebarOpen: boolean;
  activeModal: string | null;

  openSidebar: () => void;
  closeSidebar: () => void;
  openModal: (id: string) => void;
  closeModal: () => void;
}
```

### Zustand Rules

- **No server data in stores** — don't copy API response data into Zustand
- **No async actions** — use TanStack Query mutations for async work
- **Slices** — if a store grows past ~8 state fields, split into separate stores
- **Selectors** — use selector functions to avoid unnecessary re-renders:
  ```ts
  const isCollapsed = useEditorStore((s) => s.isPanelCollapsed);  // ✓
  const store = useEditorStore();                                   // ✗ re-renders on any change
  ```

---

## Layer 3: Form State — React Hook Form

### Setup Pattern

```ts
// In any form component
const form = useForm<ResumeMetaFormValues>({
  resolver: zodResolver(resumeMetaFormSchema),   // Zod validation
  defaultValues: {
    title: resume.title,
    templateId: resume.templateId,
  },
});
```

### Submission Pattern

```ts
const mutation = useUpdateResumeMeta();

const onSubmit = form.handleSubmit(async (values) => {
  await mutation.mutateAsync({ resumeId, ...values });
});
```

### Auto-save Pattern (for editor)

Debounced auto-save on form value changes:

```ts
const values = form.watch();

useEffect(() => {
  const handler = setTimeout(() => {
    if (form.formState.isDirty) {
      mutation.mutate(values);
    }
  }, 1000);
  return () => clearTimeout(handler);
}, [values]);
```

### Field Registration

Always use the `<Form>`, `<FormField>`, `<FormItem>`, `<FormLabel>`, `<FormControl>`, `<FormMessage>` components from shadcn/ui. They wire up ARIA correctly.

---

## Decision Tree

```
Does the data come from the server (DB, API)?
  YES → TanStack Query
  NO, is it form input?
    YES → React Hook Form
    NO, is it UI-only state (panel open, active selection)?
      YES → Zustand
      NO, is it local to one component?
        YES → useState
```
