import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

interface MotionRevealProps {
  children: React.ReactNode
  delay?: number
}

export function MotionReveal({ children, delay = 0 }: MotionRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1], // Custom "soft" easing
        delay 
      }}
    >
      {children}
    </motion.div>
  )
}
