import { useEffect } from 'react'
import { useLocaleStore } from '@/stores/useLocaleStore'
import { useThemeStore } from '@/stores/useThemeStore'

export function Providers({ children }: { children: React.ReactNode }) {
  const locale = useLocaleStore((s) => s.locale)
  const theme = useThemeStore((s) => s.theme)

  useEffect(() => {
    // Sync DOM on mount/hydration
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr'
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [locale, theme])

  return <>{children}</>
}
