import { useEffect, useRef } from 'react'

interface Props {
  /** size of one grid cell in px */
  cell?: number
  /** how far from the pointer cells light up (px) */
  radius?: number
  /** how long a lit cell takes to fade out (ms) */
  fadeMs?: number
  className?: string
}

/**
 * A fine grid behind the page. Cells light up where the pointer passes and fade out a moment later.
 * Colours come from the theme variables (--accent, --line), so dark and light mode work automatically.
 * It only does work while cells are glowing, so an idle page costs nothing.
 */
export default function GridPulse({ cell = 6, radius = 110, fadeMs = 900, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const grid = document.createElement('canvas') // the static grid lines, drawn once per resize/theme change
    const gctx = grid.getContext('2d')
    if (!gctx) return

    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let dpr = 1
    let cols = 0
    let rows = 0
    let accent = '#ffffff'
    let line = '#888888'
    const lit = new Map<number, number>() // cell index -> brightness (0 to 1)
    let prev: { x: number; y: number } | null = null
    let raf = 0
    let last = 0

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement)
      accent = cs.getPropertyValue('--accent').trim() || accent
      line = cs.getPropertyValue('--line').trim() || line
    }

    const drawGrid = () => {
      gctx.setTransform(1, 0, 0, 1, 0, 0)
      gctx.clearRect(0, 0, grid.width, grid.height)
      gctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      gctx.strokeStyle = line
      gctx.globalAlpha = 0.6
      gctx.lineWidth = 1
      gctx.beginPath()
      for (let x = 0; x <= w; x += cell) {
        gctx.moveTo(x + 0.5, 0)
        gctx.lineTo(x + 0.5, h)
      }
      for (let y = 0; y <= h; y += cell) {
        gctx.moveTo(0, y + 0.5)
        gctx.lineTo(w, y + 0.5)
      }
      gctx.stroke()
    }

    const render = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(grid, 0, 0)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = accent
      lit.forEach((v, idx) => {
        const cx = idx % cols
        const cy = Math.floor(idx / cols)
        ctx.globalAlpha = v * v * 0.5 // squared = a softer falloff
        ctx.fillRect(cx * cell + 1, cy * cell + 1, cell - 1, cell - 1)
      })
      ctx.globalAlpha = 1
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      cols = Math.ceil(w / cell)
      rows = Math.ceil(h / cell)
      for (const c of [canvas, grid]) {
        c.width = Math.round(w * dpr)
        c.height = Math.round(h * dpr)
      }
      lit.clear()
      drawGrid()
      render()
    }

    // Light up every cell within `radius` of the pointer; closer cells glow brighter
    const stamp = (x: number, y: number) => {
      const reach = Math.ceil(radius / cell)
      const c0 = Math.floor(x / cell)
      const r0 = Math.floor(y / cell)
      for (let cy = r0 - reach; cy <= r0 + reach; cy++) {
        for (let cx = c0 - reach; cx <= c0 + reach; cx++) {
          if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) continue
          const d = Math.hypot((cx + 0.5) * cell - x, (cy + 0.5) * cell - y)
          if (d > radius) continue
          const v = 1 - d / radius
          const idx = cy * cols + cx
          if (v > (lit.get(idx) ?? 0)) lit.set(idx, v)
        }
      }
    }

    const tick = (now: number) => {
      const dt = Math.min(now - last, 50)
      last = now
      const drop = dt / fadeMs
      lit.forEach((v, idx) => {
        const nv = v - drop
        if (nv <= 0) lit.delete(idx)
        else lit.set(idx, nv)
      })
      render()
      raf = lit.size ? requestAnimationFrame(tick) : 0 // sleeps when nothing is glowing
    }

    const kick = () => {
      if (!raf) {
        last = performance.now()
        raf = requestAnimationFrame(tick)
      }
    }

    const onMove = (e: PointerEvent) => {
      const x = e.clientX
      const y = e.clientY
      if (prev) {
        // fill in the path so fast movements leave a continuous trail
        const steps = Math.max(1, Math.ceil(Math.hypot(x - prev.x, y - prev.y) / (cell / 2)))
        for (let i = 1; i <= steps; i++) {
          stamp(prev.x + ((x - prev.x) * i) / steps, prev.y + ((y - prev.y) * i) / steps)
        }
      } else {
        stamp(x, y)
      }
      prev = { x, y }
      kick()
    }
    const onLeave = () => {
      prev = null
    }

    // Re-read the colours when the dark/light switch flips
    const mo = new MutationObserver(() => {
      readColors()
      drawGrid()
      render()
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    readColors()
    resize()
    window.addEventListener('resize', resize)
    if (!reduceMotion) {
      window.addEventListener('pointermove', onMove)
      document.documentElement.addEventListener('mouseleave', onLeave)
    }

    return () => {
      cancelAnimationFrame(raf)
      mo.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [cell, radius, fadeMs])

  // Behind all content; the soft mask fades the grid out towards the edges
  const mask = 'radial-gradient(ellipse 90% 80% at 50% 35%, #000 35%, transparent 100%)'
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-10 h-full w-full ${className}`}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    />
  )
}