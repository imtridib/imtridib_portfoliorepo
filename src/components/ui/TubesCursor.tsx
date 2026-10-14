import { useEffect, useRef, useState } from 'react'

/** The small part of the library's API that we use. */
interface TubesApp {
  tubes: {
    setColors: (colors: string[]) => void
    setLightsColors: (colors: string[]) => void
  }
  three?: { minPixelRatio: number; maxPixelRatio: number; resize: () => void }
  dispose?: () => void
}

interface Props {
  /** colours of the three tubes */
  colors?: string[]
  /** colours of the four lights that tint the tubes */
  lightColors?: string[]
  /** click anywhere to shuffle the colours */
  changeColorsOnClick?: boolean
  /** show the effect only in dark mode (it looks best on a dark background) */
  darkOnly?: boolean
  className?: string
}

const DEFAULT_COLORS = ['#5e72e4', '#8965e0', '#f5365c']
const DEFAULT_LIGHTS = ['#21d4fd', '#b721ff', '#f4d03f', '#11cdef']

/** Vivid random colours (plain random hex often gives muddy, dark colours). */
function randomColors(count: number): string[] {
  return Array.from({ length: count }, () => {
    const h = Math.random() * 360
    const s = 0.9
    const l = 0.6
    const a = s * Math.min(l, 1 - l)
    const f = (n: number) => {
      const k = (n + h / 30) % 12
      const c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
      return Math.round(255 * c).toString(16).padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
  })
}

const isLightTheme = () => document.documentElement.getAttribute('data-theme') === 'light'

export default function TubesCursor({
  colors = DEFAULT_COLORS,
  lightColors = DEFAULT_LIGHTS,
  changeColorsOnClick = true,
  darkOnly = true,
  className = 'opacity-80',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Follow the site's dark/light switch
  const [visible, setVisible] = useState(() => !(darkOnly && isLightTheme()))
  useEffect(() => {
    if (!darkOnly) return
    const mo = new MutationObserver(() => setVisible(!isLightTheme()))
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => mo.disconnect()
  }, [darkOnly])

  useEffect(() => {
    if (!visible) return

    // A touch screen has no cursor, and some people ask for less motion: skip everything
    if (matchMedia('(hover: none)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    let app: TubesApp | null = null
    let onClick: (() => void) | null = null

    // Small delay so the canvas has its final size before the library measures it
    const timer = setTimeout(async () => {
      try {
        const mod = await import('threejs-components/build/cursors/tubes1.min.js')
        if (cancelled || !canvasRef.current) return

        app = mod.default(canvasRef.current, {
          tubes: { colors, lights: { intensity: 200, colors: lightColors } },
        }) as TubesApp

        // The library renders at 2x resolution by default. 1.5x looks the same and is lighter on the GPU.
        try {
          if (app.three) {
            app.three.minPixelRatio = 1
            app.three.maxPixelRatio = 1.5
            app.three.resize()
          }
        } catch {
          /* keep the library defaults */
        }

        if (changeColorsOnClick) {
          onClick = () => {
            app?.tubes.setColors(randomColors(3))
            app?.tubes.setLightsColors(randomColors(4))
          }
          window.addEventListener('click', onClick)
        }
      } catch (err) {
        console.error('Failed to load the tubes cursor:', err)
      }
    }, 100)

    return () => {
      cancelled = true
      clearTimeout(timer)
      if (onClick) window.removeEventListener('click', onClick)
      app?.dispose?.()
    }
    // colours are read once when the effect starts
  }, [visible]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible) return null

  // The library sizes the canvas to its PARENT, so the parent is a viewport-sized fixed layer.
  // -z-10 puts it behind all page content; pointer-events-none lets clicks pass through.
  return (
    <div className={`pointer-events-none fixed inset-0 -z-10 ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}