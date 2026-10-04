import { Canvas } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { ParticleField } from './ParticleField'
import { useThemeStore } from '@/stores/useThemeStore'

export default function Scene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const isDark = useThemeStore((s) => s.theme === 'dark')

  // Stop rendering entirely once the hero is off-screen. Previously the canvas
  // kept drawing at full rate for the whole page, which competed with scrolling.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
    >
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      >
        <ParticleField isDark={isDark} />
      </Canvas>
    </div>
  )
}
