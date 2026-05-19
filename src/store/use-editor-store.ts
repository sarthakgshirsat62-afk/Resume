"use client";

import { create } from "zustand";

interface EditorState {
  activeResumeId: string | null;
  activeSectionId: string | null;
  activeEntryId: string | null;
  isPanelCollapsed: boolean;
  isFocusMode: boolean;
  isSaving: boolean;
  lastSaved: Date | null;

  setActiveResumeId: (id: string | null) => void;
  setActiveSection: (id: string | null) => void;
  setActiveEntry: (id: string | null) => void;
  togglePanel: () => void;
  toggleFocusMode: () => void;
  setSaving: (isSaving: boolean) => void;
  setLastSaved: (date: Date) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  activeResumeId: null,
  activeSectionId: null,
  activeEntryId: null,
  isPanelCollapsed: false,
  isFocusMode: false,
  isSaving: false,
  lastSaved: null,

  setActiveResumeId: (id) => set({ activeResumeId: id }),
  setActiveSection: (id) => set({ activeSectionId: id, activeEntryId: null }),
  setActiveEntry: (id) => set({ activeEntryId: id }),
  togglePanel: () => set((s) => ({ isPanelCollapsed: !s.isPanelCollapsed })),
  toggleFocusMode: () => set((s) => ({ isFocusMode: !s.isFocusMode })),
  setSaving: (isSaving) => set({ isSaving }),
  setLastSaved: (date) => set({ lastSaved: date }),
}));
