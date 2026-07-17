import { useEffect } from 'react'
import { ReactLenis } from 'lenis/react'
import { useLocaleStore } from '@/stores/useLocaleStore'
import { useThemeStore } from '@/stores/useThemeStore'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Providers({ children }: { children: React.ReactNode }) {
  const locale = useLocaleStore((s) => s.locale)
  const theme = useThemeStore((s) => s.theme)
  const prefersReducedMotion = useReducedMotion()

  useActiveSection()

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr'
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [locale, theme])

  // If reduced motion is preferred, render children directly without Lenis wrapper
  if (prefersReducedMotion) {
    return <>{children}</>
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      {children}
    </ReactLenis>
  )
}
