import { useEffect, useRef } from 'react'
import { ReactLenis, type LenisRef } from 'lenis/react'
import Snap from 'lenis/snap'
import { cancelFrame, frame } from 'motion/react'
import { useLocaleStore } from '@/stores/useLocaleStore'
import { useThemeStore } from '@/stores/useThemeStore'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Providers({ children }: { children: React.ReactNode }) {
  const locale = useLocaleStore((s) => s.locale)
  const theme = useThemeStore((s) => s.theme)
  const prefersReducedMotion = useReducedMotion()
  const lenisRef = useRef<LenisRef>(null)

  useActiveSection()

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr'
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [locale, theme])

  // sync لنیس با frame loop خود motion (رفع باگ پرش قبلی)
  useEffect(() => {
    if (prefersReducedMotion) return

    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp)
    }

    frame.update(update, true)
    return () => cancelFrame(update)
  }, [prefersReducedMotion])

  // snap کردن هر سکشن به تمام صفحه، با یک اسکرول
  useEffect(() => {
    if (prefersReducedMotion) return
    const lenis = lenisRef.current?.lenis
    if (!lenis) return

    const snap = new Snap(lenis, {
      type: 'lock',
      duration: 1,
      debounce: 700,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // ease-out cubic
    })

    const sections = document.querySelectorAll<HTMLElement>('section[id]')
    sections.forEach((el) => snap.addElement(el, { align: ['start'] }))

    return () => snap.destroy()
  }, [prefersReducedMotion])

  if (prefersReducedMotion) {
    return <>{children}</>
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ lerp: 0.1, duration: 1.2, autoRaf: false }}
    >
      {children}
    </ReactLenis>
  )
}
