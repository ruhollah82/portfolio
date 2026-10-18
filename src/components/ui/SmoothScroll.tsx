import { useEffect } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Matches `scroll-padding-top: 4.5rem` in globals.css (fixed header height).
const HEADER_OFFSET = -72

/**
 * Inertial scrolling (the getartcraft.com feel): lerp 0.12, and in-page
 * anchor links (#projects, #contact...) glide with the same easing.
 * Renders nothing. Skipped entirely for prefers-reduced-motion.
 * Touch devices keep native scrolling (Lenis default).
 */
export function SmoothScroll() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({
      lerp: 0.12,
      autoRaf: true,
      anchors: { offset: HEADER_OFFSET },
    })
    return () => lenis.destroy()
  }, [reduced])

  return null
}
