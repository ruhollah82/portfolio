import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 1600

// Deterministic, so the layout is identical on every load.
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

// One cheap sine displacement per vertex (the previous version evaluated
// nine sin/cos pairs per vertex, every frame).
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;

  void main() {
    float wave = sin(position.x * 0.9 + uTime * 0.25)
               * cos(position.y * 0.8 + uTime * 0.2) * 0.12;
    vec3 displaced = position + normalize(position) * wave;

    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    gl_PointSize = uSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    float alpha = smoothstep(0.5, 0.15, dist);
    gl_FragColor = vec4(uColor, alpha * uOpacity);
  }
`

const PALETTE: Record<'light' | 'dark', { color: string; opacity: number }> = {
  light: { color: '#2f4fa3', opacity: 0.45 },
  dark: { color: '#8fb0ff', opacity: 0.55 },
}

export function ParticleField({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null!)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const theta = pseudoRandom(i) * Math.PI * 2
      const phi = Math.acos(2 * pseudoRandom(i + 10000) - 1)
      const r = 3 + pseudoRandom(i + 20000) * 1.5
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  // Initial values only. After mount, uniforms are updated through the
  // material ref (mutating objects passed into hooks is not allowed).
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 0.07 },
      uColor: { value: new THREE.Color(PALETTE.light.color) },
      uOpacity: { value: PALETTE.light.opacity },
    }),
    []
  )

  useEffect(() => {
    const material = materialRef.current
    if (!material) return
    const p = isDark ? PALETTE.dark : PALETTE.light
    material.uniforms.uColor.value.set(p.color)
    material.uniforms.uOpacity.value = p.opacity
  }, [isDark])

  useFrame((state) => {
    const material = materialRef.current
    if (!material) return
    const t = state.clock.elapsedTime
    material.uniforms.uTime.value = t
    groupRef.current.rotation.y = t * 0.05
    groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.12
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={COUNT}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
        />
      </points>
    </group>
  )
}
