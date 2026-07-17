import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface MotionRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function MotionReveal({
  children,
  delay = 0,
  className,
}: MotionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Custom "soft" easing
        delay,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
