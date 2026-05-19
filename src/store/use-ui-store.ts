"use client";

import { create } from "zustand";

interface UIState {
  isMobileMenuOpen: boolean;
  isDashboardSidebarOpen: boolean;
  activeModal: string | null;

  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
  toggleDashboardSidebar: () => void;
  openModal: (id: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isDashboardSidebarOpen: true,
  activeModal: null,

  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  toggleDashboardSidebar: () =>
    set((s) => ({ isDashboardSidebarOpen: !s.isDashboardSidebarOpen })),
  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
}));
