import { useEffect } from 'react'
import { useLocaleStore } from '@/stores/useLocaleStore'
import { useThemeStore } from '@/stores/useThemeStore'
import { useActiveSection } from '@/hooks/useActiveSection'

// Scrolling is native. A scroll-hijacking library (smooth-scroll + forced
// section snapping) was removed: it added per-frame JS on the main thread,
// delayed input, and trapped users inside sections taller than the viewport.
export function Providers({ children }: { children: React.ReactNode }) {
  const locale = useLocaleStore((s) => s.locale)
  const theme = useThemeStore((s) => s.theme)

  useActiveSection()

  useEffect(() => {
    const root = document.documentElement
    root.lang = locale
    root.dir = locale === 'fa' ? 'rtl' : 'ltr'
    root.classList.toggle('dark', theme === 'dark')
  }, [locale, theme])

  return <>{children}</>
}
