import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLocaleStore } from '@/stores/useLocaleStore'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { sampleTextPoints } from './sampleTextPoints'

// Pre-calculate points outside the component
const enPoints = sampleTextPoints('Ruhollah', 'Vazirmatn Variable', 120, 4000)
const faPoints = sampleTextPoints('روح‌الله', 'Vazirmatn Variable', 120, 4000)

export function ParticleName() {
  const locale = useLocaleStore((s) => s.locale)
  const prefersReducedMotion = useReducedMotion()
  const pointsRef = useRef<THREE.Points>(null!)

  // Determine target positions based on locale
  const targetPositions =
    locale === 'fa' ? faPoints.positions : enPoints.positions

  // Initialize current positions with EN points (or FA if starting in FA)
  // We use useMemo to create a stable array for the initial render
  const initialPositions = useMemo(() => {
    return new Float32Array(
      locale === 'fa' ? faPoints.positions : enPoints.positions
    )
  }, [locale]) // Added locale dependency

  // Use a ref to track the "working" array that we update in useFrame
  // This avoids triggering React re-renders
  const workingPositions = useRef<Float32Array>(
    new Float32Array(initialPositions)
  )

  useFrame((state) => {
    if (prefersReducedMotion || !pointsRef.current) return

    const geometry = pointsRef.current.geometry
    const positions = geometry.attributes.position.array as Float32Array

    // Simple lerp for morphing
    const lerpFactor = 0.05

    for (let i = 0; i < workingPositions.current.length; i++) {
      // Interpolate current position toward target
      workingPositions.current[i] +=
        (targetPositions[i] - workingPositions.current[i]) * lerpFactor

      // Add idle drift (gentle noise)
      if (i % 3 !== 2) {
        workingPositions.current[i] +=
          Math.sin(state.clock.elapsedTime + i) * 0.002
      }

      // Update the actual geometry attribute
      positions[i] = workingPositions.current[i]
    }

    geometry.attributes.position.needsUpdate = true

    // Gentle rotation
    pointsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
  })

  if (prefersReducedMotion) {
    return null
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        {/* 
          Using 'args' satisfies the TypeScript requirement for BufferAttribute.
          Args: [array, itemSize]
        */}
        <bufferAttribute
          attach="attributes-position"
          args={[initialPositions, 3]}
          count={enPoints.count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#eab308"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
