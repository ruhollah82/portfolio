import { useReducedMotion } from './useReducedMotion'

interface NavigatorWithHints extends Navigator {
  connection?: { saveData?: boolean }
  deviceMemory?: number
}

// The particle backdrop is decoration, so it only runs where it can run
// smoothly: no reduced-motion preference, a tablet/desktop-sized viewport,
// and hardware that isn't obviously constrained.
function canRunScene(): boolean {
  const nav = navigator as NavigatorWithHints
  if (!window.matchMedia('(min-width: 768px)').matches) return false
  if (nav.connection?.saveData) return false
  if ((nav.hardwareConcurrency ?? 8) < 4) return false
  if ((nav.deviceMemory ?? 8) < 4) return false
  return true
}

const capable = canRunScene()

export function useScene3D() {
  const prefersReducedMotion = useReducedMotion()
  return capable && !prefersReducedMotion
}
