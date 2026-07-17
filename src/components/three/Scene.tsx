import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ParticleField } from './ParticleField'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function Scene() {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  if (prefersReducedMotion) {
    return (
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="bg-primary/10 h-64 w-64 rounded-full blur-3xl" />
      </div>
    )
  }

  return (
    <motion.div className="absolute inset-0 z-0" style={{ opacity, scale }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, Math.min(window.devicePixelRatio, 1.5)]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <ParticleField scrollYProgress={scrollYProgress} />
        </Suspense>
      </Canvas>
    </motion.div>
  )
}
