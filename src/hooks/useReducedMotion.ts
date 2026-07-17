import { useState, useEffect } from 'react'

const getInitialValue = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(getInitialValue)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}
