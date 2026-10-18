import { createContext, useContext, useEffect, useRef } from 'react'
import { motion, useAnimate, useInView } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const EASE = [0.22, 1, 0.36, 1] as const
const VIEWPORT_MARGIN = '0px 0px -10% 0px'

interface RevealStyleProps {
  /** Start offset in px. Keep it small: long travel reads as lag. */
  y?: number
  /** Start blur in px (0 = no blur). Try 6 on headings and short blocks only. */
  blur?: number
}

interface MotionRevealProps extends RevealStyleProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

/**
 * Same short, one-shot reveal as before (12px / 450ms), with an optional blur
 * that "racks into focus" like the getartcraft.com reveals. Blur is off by
 * default so existing sections look exactly as they did.
 */
export function MotionReveal({
  children,
  delay = 0,
  className,
  y = 12,
  blur = 0,
}: MotionRevealProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const hidden = blur > 0
    ? { opacity: 0, y, filter: `blur(${blur}px)` }
    : { opacity: 0, y }
  const shown = blur > 0
    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
    : { opacity: 1, y: 0 }

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, margin: VIEWPORT_MARGIN }}
      transition={{ duration: 0.45, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Group: children appear as a wave across the row, not all at once.   */
/* The delay comes from each child's real horizontal position, so it   */
/* follows the reading direction (left→right in EN, right→left in FA). */
/* ------------------------------------------------------------------ */

interface GroupContextValue {
  groupRef: React.RefObject<HTMLDivElement | null>
  spread: number
}

const GroupContext = createContext<GroupContextValue | null>(null)

interface RevealGroupProps {
  children: React.ReactNode
  className?: string
  /** Total seconds between the first and last column of the group. */
  spread?: number
}

export function RevealGroup({
  children,
  className,
  spread = 0.18,
}: RevealGroupProps) {
  const groupRef = useRef<HTMLDivElement>(null)
  return (
    <GroupContext.Provider value={{ groupRef, spread }}>
      <div ref={groupRef} className={className}>
        {children}
      </div>
    </GroupContext.Provider>
  )
}

export function RevealItem({
  children,
  className,
  y = 12,
  blur = 0,
}: Omit<MotionRevealProps, 'delay'>) {
  const prefersReducedMotion = useReducedMotion()
  const group = useContext(GroupContext)
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const inView = useInView(scope, { once: true, margin: VIEWPORT_MARGIN })

  useEffect(() => {
    if (prefersReducedMotion || !inView || !scope.current) return

    let delay = 0
    const groupEl = group?.groupRef.current
    if (groupEl) {
      const g = groupEl.getBoundingClientRect()
      const e = scope.current.getBoundingClientRect()
      const rtl = getComputedStyle(groupEl).direction === 'rtl'
      const offset = rtl ? g.right - e.right : e.left - g.left
      delay = g.width > 0 ? (Math.max(0, offset) / g.width) * group!.spread : 0
    }

    const shown =
      blur > 0
        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
        : { opacity: 1, y: 0 }
    animate(scope.current, shown, { duration: 0.45, ease: EASE, delay })
  }, [inView, prefersReducedMotion, animate, scope, group, blur])

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      ref={scope}
      className={className}
      style={{
        opacity: 0,
        transform: `translateY(${y}px)`,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
      }}
    >
      {children}
    </div>
  )
}
