import { create } from 'zustand'

type SectionId = 'hero' | 'about' | 'skills' | 'projects' | 'contact'

interface UIState {
  activeSection: SectionId
  setActiveSection: (s: SectionId) => void
}

export const useUIStore = create<UIState>()((set) => ({
  activeSection: 'hero',
  setActiveSection: (s) => set({ activeSection: s }),
}))
