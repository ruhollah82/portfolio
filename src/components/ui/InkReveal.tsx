import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface InkRevealProps {
  /** Returns a tile image (data URI / URL) rasterised at `px` x `px` pixels. */
  layer: (px: number) => string
  /** Tile size in CSS px. */
  tile: number
  /** Brush life in ms. */
  lifetime?: number
  /** Play one automatic stroke on load so visitors discover the effect. */
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
const R_VARY = 0.45
const STEP = 10
const MAX_STAMPS = 160

// The paint shows mostly in the lower part of the hero so text stays legible.
const FADE_MASK = 'linear-gradient(to top, #000 22%, transparent 88%)'
const maskStyle = {
  maskImage: FADE_MASK,
  WebkitMaskImage: FADE_MASK,
} as const

function useFinePointer() {
  const query = '(hover: hover) and (pointer: fine)'
  const [fine, setFine] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setFine(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return fine
}

/**
 * Cursor "paints" a tiled artwork into an otherwise empty hero (the mimo.xiaomi.com
 * idea). Drop it as the first child of a `position: relative` <section>: it
 * listens on that section, never blocks clicks, and draws a canvas over it.
 *
 * Canvas technique: soft wobbly ink dots are drawn as alpha, then `source-in`
 * paints the pre-tiled artwork only where ink exists. Dots grow and fade out.
 * Touch / reduced-motion visitors get a calm static band of the same artwork.
 */
export function InkReveal({
  layer,
  tile,
  lifetime = 900,
  sweep = true,
}: InkRevealProps) {
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const interactive = fine && !reduced
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!interactive) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const target = canvas?.closest('section') ?? canvas?.parentElement
    if (!canvas || !ctx || !target) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const stamps: Stamp[] = []
    const layerCanvas = document.createElement('canvas')
    let ready = false
    let w = 0
    let h = 0
    let rEnd = 110
    let raf = 0
    let sweepRaf = 0
    let running = false
    let last: { x: number; y: number } | null = null

    // Pre-tile the artwork once per size/theme so each frame is a single drawImage.
    const img = new Image()
    const buildLayer = () => {
      layerCanvas.width = canvas.width
      layerCanvas.height = canvas.height
      const lctx = layerCanvas.getContext('2d')
      if (!lctx || !img.naturalWidth) return
      const tw = img.naturalWidth
      for (let y = 0; y < layerCanvas.height; y += tw) {
        for (let x = 0; x < layerCanvas.width; x += tw) {
          lctx.drawImage(img, x, y, tw, tw)
        }
      }
      ready = true
    }
    img.onload = buildLayer
    img.src = layer(Math.round(tile * dpr))

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      rEnd = Math.min(150, Math.max(90, w * 0.09))
      if (img.complete) buildLayer()
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

    const frame = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, w, h)

      for (let i = stamps.length - 1; i >= 0; i--) {
        const t = (now - stamps[i].born) / lifetime
        if (t >= 1) {
          stamps.splice(i, 1)
          continue
        }
        const ease = 1 - Math.pow(1 - t, 3)
        ink(stamps[i], R_START + (stamps[i].rmax - R_START) * ease, 1 - t * t)
      }

      if (ready) {
        ctx.globalCompositeOperation = 'source-in'
        ctx.drawImage(layerCanvas, 0, 0, w, h)
        ctx.globalCompositeOperation = 'source-over'
      }

      if (stamps.length) raf = requestAnimationFrame(frame)
      else running = false
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(frame)
    }

    const local = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const onMove = (e: Event) => {
      const pe = e as PointerEvent
      if (pe.pointerType !== 'mouse') return
      cancelAnimationFrame(sweepRaf)
      const p = local(pe)
      stampAlong(p.x, p.y)
      start()
    }
    const onEnter = (e: Event) => {
      last = null
      onMove(e)
    }
    const onLeave = () => {
      last = null
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    target.addEventListener('pointerenter', onEnter)
    target.addEventListener('pointermove', onMove)
    target.addEventListener('pointerleave', onLeave)

    if (sweep) {
      const DELAY = 900
      const DURATION = 1500
      const t0 = performance.now() + DELAY
      const tick = (now: number) => {
        const t = (now - t0) / DURATION
        if (t >= 1) return
        if (t >= 0) {
          stampAlong(w * (0.08 + 0.84 * t), h * (0.8 + 0.07 * Math.sin(t * Math.PI * 3)))
          start()
        }
        sweepRaf = requestAnimationFrame(tick)
      }
      sweepRaf = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(sweepRaf)
      ro.disconnect()
      target.removeEventListener('pointerenter', onEnter)
      target.removeEventListener('pointermove', onMove)
      target.removeEventListener('pointerleave', onLeave)
    }
  }, [interactive, layer, tile, lifetime, sweep])

  if (!interactive) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 opacity-40"
        style={{
          ...maskStyle,
          backgroundImage: `url("${layer(tile)}")`,
          backgroundSize: `${tile}px ${tile}px`,
        }}
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full"
      style={maskStyle}
    />
  )
}
