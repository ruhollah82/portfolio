import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ParticleName } from './ParticleName'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function Scene() {
  // <-- Changed to 'export default'
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  if (prefersReducedMotion) {
    return (
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <h1 className="text-foreground/10 text-6xl font-bold select-none md:text-8xl">
          Ruhollah
        </h1>
      </div>
    )
  }

  return (
    <motion.div className="absolute inset-0 z-0" style={{ opacity }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, Math.min(window.devicePixelRatio, 2)]}
        frameloop="demand"
        gl={{ antialias: false, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <ParticleName />
        </Suspense>
      </Canvas>
    </motion.div>
  )
}
