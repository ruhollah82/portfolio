import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

interface InkRevealProps {
  /** Full-colour image that the cursor "paints" back in. */
  src: string
  alt: string
  className?: string
  /** Cover-fit focal point, 0..1 (same as object-position). */
  focus?: [number, number]
  /** Play one automatic brush stroke on load so visitors discover the effect. */
  sweep?: boolean
}

interface Stamp {
  x: number
  y: number
  born: number
  seed: number
  rmax: number
}

const R_START = 8
const R_VARY = 0.45 // per-dot size randomness
const LIFETIME = 650 // ms: a dot grows and fades over this time
const STEP = 10 // px between dots along the cursor path
const MAX_STAMPS = 120
const DEFAULT_FOCUS: [number, number] = [0.5, 0.2]

const fineHover = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

function useFinePointer() {
  const [fine, setFine] = useState(fineHover)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const onChange = () => setFine(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return fine
}

/**
 * Greyscale portrait that turns to colour wherever the cursor passes.
 * Touch devices and reduced-motion users just get the normal colour image.
 *
 * How it works (same idea as the mimo.xiaomi.com hero): a canvas draws soft,
 * wobbly "ink dots" along the pointer path, then `source-in` paints the
 * colour image only where the dots are. Dots grow (easeOutCubic) and fade out.
 */
export function InkReveal({
  src,
  alt,
  className,
  focus = DEFAULT_FOCUS,
  sweep = true,
}: InkRevealProps) {
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const interactive = fine && !reduced
  const [fx, fy] = focus

  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!interactive) return
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!wrap || !canvas || !ctx) return

    const img = new Image()
    img.decoding = 'async'
    img.src = src

    const stamps: Stamp[] = []
    let w = 0
    let h = 0
    let dpr = 1
    let rEnd = 100
    let raf = 0
    let sweepRaf = 0
    let running = false
    let last: { x: number; y: number } | null = null

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      w = rect.width
      h = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      rEnd = Math.max(80, Math.min(w, h) * 0.4)
    }

    const addStamp = (x: number, y: number) => {
      if (stamps.length >= MAX_STAMPS) stamps.shift()
      stamps.push({
        x,
        y,
        born: performance.now(),
        seed: Math.random() * Math.PI * 2,
        rmax: rEnd * (1 - R_VARY + Math.random() * R_VARY),
      })
    }

    const stampAlong = (x: number, y: number) => {
      if (!last) {
        addStamp(x, y)
      } else {
        const dx = x - last.x
        const dy = y - last.y
        const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / STEP))
        for (let i = 1; i <= steps; i++) {
          addStamp(last.x + (dx * i) / steps, last.y + (dy * i) / steps)
        }
      }
      last = { x, y }
    }

    // One ink dot: soft radial alpha with an irregular, wobbling outline.
    const ink = (s: Stamp, r: number, alpha: number) => {
      const g = ctx.createRadialGradient(s.x, s.y, r * 0.25, s.x, s.y, r)
      g.addColorStop(0, `rgba(0,0,0,${0.95 * alpha})`)
      g.addColorStop(0.55, `rgba(0,0,0,${0.88 * alpha})`)
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      const segs = 32
      for (let i = 0; i <= segs; i++) {
        const a = (i / segs) * Math.PI * 2
        const wob =
          0.78 +
          0.14 * Math.sin(a * 3 + s.seed) +
          0.08 * Math.sin(a * 7 + s.seed * 2.1) +
          0.05 * Math.sin(a * 13 + s.seed * 0.7)
        const px = s.x + Math.cos(a) * r * wob
        const py = s.y + Math.sin(a) * r * wob
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.fill()
    }

    const drawCover = () => {
      if (!img.complete || !img.naturalWidth) return
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight)
      const dw = img.naturalWidth * scale
      const dh = img.naturalHeight * scale
      ctx.drawImage(img, (w - dw) * fx, (h - dh) * fy, dw, dh)
    }

    const frame = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, w, h)

      for (let i = stamps.length - 1; i >= 0; i--) {
        const t = (now - stamps[i].born) / LIFETIME
        if (t >= 1) {
          stamps.splice(i, 1)
          continue
        }
        const ease = 1 - Math.pow(1 - t, 3)
        ink(stamps[i], R_START + (stamps[i].rmax - R_START) * ease, 1 - t * t)
      }

      // Keep the colour image only where ink exists.
      ctx.globalCompositeOperation = 'source-in'
      drawCover()
      ctx.globalCompositeOperation = 'source-over'

      if (stamps.length) {
        raf = requestAnimationFrame(frame)
      } else {
        running = false
      }
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(frame)
    }

    const local = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const cancelSweep = () => cancelAnimationFrame(sweepRaf)

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      cancelSweep()
      const p = local(e)
      stampAlong(p.x, p.y)
      start()
    }
    const onEnter = (e: PointerEvent) => {
      last = null
      onMove(e)
    }
    const onLeave = () => {
      last = null
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    wrap.addEventListener('pointerenter', onEnter)
    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerleave', onLeave)

    // One gentle S-shaped stroke so the effect is discoverable.
    if (sweep) {
      const DURATION = 1100
      const delay = 700
      const t0 = performance.now() + delay
      const tick = (now: number) => {
        const t = (now - t0) / DURATION
        if (t >= 1) return
        if (t >= 0) {
          const x = w * (0.12 + 0.76 * t)
          const y = h * (0.7 - 0.4 * t + 0.1 * Math.sin(t * Math.PI * 3))
          stampAlong(x, y)
          start()
        }
        sweepRaf = requestAnimationFrame(tick)
      }
      sweepRaf = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(raf)
      cancelSweep()
      ro.disconnect()
      wrap.removeEventListener('pointerenter', onEnter)
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
    }
  }, [interactive, src, fx, fy, sweep])

  return (
    <div ref={wrapRef} className={cn('relative overflow-hidden', className)}>
      <img
        src={src}
        alt={alt}
        decoding="async"
        fetchPriority="high"
        style={{ objectPosition: `${fx * 100}% ${fy * 100}%` }}
        className={cn(
          'size-full object-cover transition-[filter] duration-500',
          interactive && 'grayscale'
        )}
      />
      {interactive && (
        <canvas
          ref={canvasRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 size-full"
        />
      )}
    </div>
  )
}
