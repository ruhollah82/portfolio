import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import type { MotionValue } from 'motion/react'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const COUNT = 4000

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

// همون فرمول noise قبلی، فقط پورت‌شده به GLSL
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform float uSize;
  attribute vec3 color;
  varying vec3 vColor;

  float noise3D(vec3 p) {
    return sin(p.x * 1.2 + p.y * 0.8) * cos(p.y * 1.1 + p.z * 0.9) * sin(p.z * 1.3 + p.x * 0.7);
  }

  void main() {
    vColor = color;

    float noiseScale = 0.3;
    float noiseStrength = 0.4 + uScroll * 0.3;
    vec3 np = position * noiseScale;

    float nx = noise3D(vec3(np.x, np.y, uTime * 0.3)) * noiseStrength;
    float ny = noise3D(vec3(np.y, np.z, uTime * 0.3)) * noiseStrength;
    float nz = noise3D(vec3(np.z, np.x, uTime * 0.3)) * noiseStrength;

    float expansion = 1.0 + uScroll * 0.8;
    vec3 displaced = position * expansion + vec3(nx, ny, nz);

    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    gl_PointSize = uSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float dist = length(uv);
    float alpha = smoothstep(0.5, 0.2, dist);
    gl_FragColor = vec4(vColor, alpha * uOpacity);
  }
`

interface ParticleFieldProps {
  scrollYProgress: MotionValue<number>
}

export function ParticleField({ scrollYProgress }: ParticleFieldProps) {
  const prefersReducedMotion = useReducedMotion()
  const groupRef = useRef<THREE.Group>(null!)

  // این هنوز یه بار روی CPU حساب می‌شه (موقع mount)، نه هر فریم — مشکلی نداره
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)

    const lapis = new THREE.Color('#5b8def')
    const gold = new THREE.Color('#eab308')

    for (let i = 0; i < COUNT; i++) {
      const theta = pseudoRandom(i) * Math.PI * 2
      const phi = Math.acos(2 * pseudoRandom(i + 10000) - 1)
      const r = 3 + pseudoRandom(i + 20000) * 1.5

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      const t = (y + 5) / 10
      const color = lapis.clone().lerp(gold, t)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, colors }
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uSize: { value: 0.04 },
      uOpacity: { value: 0.7 },
    }),
    []
  )

  useFrame((state) => {
    if (prefersReducedMotion || !groupRef.current) return

    const time = state.clock.elapsedTime
    const scroll = scrollYProgress.get()

    // چرخش کل گروه هزینه‌ی ناچیزی داره (یه ترنسفرم، نه ۴۰۰۰ تا)
    groupRef.current.rotation.y = time * 0.08 + scroll * Math.PI * 1.5
    groupRef.current.rotation.x = Math.sin(time * 0.05) * 0.15

    // فقط ۴ تا عدد آپدیت می‌شه، نه کل بافر موقعیت
    uniforms.uTime.value = time
    uniforms.uScroll.value = scroll
    uniforms.uSize.value = 0.04 + scroll * 0.03
    uniforms.uOpacity.value = 0.7 - scroll * 0.3
  })

  if (prefersReducedMotion) return null

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={COUNT}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
            count={COUNT}
          />
        </bufferGeometry>
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
