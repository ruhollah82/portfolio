import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LocaleState {
  locale: 'fa' | 'en'
  setLocale: (l: 'fa' | 'en') => void
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: 'en',
      setLocale: (l) => {
        document.documentElement.lang = l
        document.documentElement.dir = l === 'fa' ? 'rtl' : 'ltr'
        set({ locale: l })
      },
    }),
    {
      name: 'locale-storage',
    }
  )
)
