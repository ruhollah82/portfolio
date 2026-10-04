import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface MotionRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

// Short, small, one-shot reveal. 12px / 450ms reads as "settling in";
// the previous 40px / 800ms read as slow and, on a long page, as lag.
export function MotionReveal({
  children,
  delay = 0,
  className,
}: MotionRevealProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
