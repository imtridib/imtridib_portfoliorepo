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


// তার বদলে এই ম্যাজিক্যাল কালারগুলো বসিয়ে দিন:
// const DEFAULT_COLORS = ['#FFD700', '#00FFFF', '#FF00FF'] // গোল্ডেন, সায়ান, ম্যাজেন্টা
// const DEFAULT_LIGHTS = ['#FFFFFF', '#FFD700', '#4DEEEA', '#FF00FF'] // ম্যাজিক গ্লো

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

// Another Design sense


// import { useEffect, useRef, useState } from 'react'

// interface Props {
//   /** show the effect only in dark mode */
//   darkOnly?: boolean
//   className?: string
// }

// const isLightTheme = () => document.documentElement.getAttribute('data-theme') === 'light'

// export default function MagicWandCursor({
//   darkOnly = false, // ডিফল্ট false করে দেওয়া হয়েছে যাতে সব থিমে দেখা যায়
//   className = 'opacity-90',
// }: Props) {
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const [visible, setVisible] = useState(() => !(darkOnly && isLightTheme()))

//   useEffect(() => {
//     if (!darkOnly) return
//     const mo = new MutationObserver(() => setVisible(!isLightTheme()))
//     mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
//     return () => mo.disconnect()
//   }, [darkOnly])

//   useEffect(() => {
//     if (!visible) return
//     if (matchMedia('(hover: none)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return

//     const canvas = canvasRef.current
//     if (!canvas) return
//     const ctx = canvas.getContext('2d')
//     if (!ctx) return

//     let animationFrameId: number
//     const particles: Particle[] = []
    
//     // ম্যাজিক্যাল কালার প্যালেট (Patronus এবং Spells এর মতো)
//     const colors = ['#FFD700', '#00FFFF', '#FFFFFF', '#FF00FF', '#4DEEEA']

//     // স্ক্রিনের সাইজ অনুযায়ী ক্যানভাস সেট করা
//     const resize = () => {
//       canvas.width = window.innerWidth
//       canvas.height = window.innerHeight
//     }
//     window.addEventListener('resize', resize)
//     resize()

//     // পার্টিকেল (স্ফুলিঙ্গ) ক্লাস
//     class Particle {
//       x: number
//       y: number
//       size: number
//       color: string
//       speedX: number
//       speedY: number
//       life: number

//       constructor(x: number, y: number) {
//         this.x = x
//         this.y = y
//         this.size = Math.random() * 4 + 1 // স্ফুলিঙ্গের সাইজ
//         this.color = colors[Math.floor(Math.random() * colors.length)]
//         this.speedX = (Math.random() - 0.5) * 3 // ডানে-বামে ছড়ানোর স্পিড
//         this.speedY = (Math.random() - 0.5) * 3 // উপরে-নিচে ছড়ানোর স্পিড
//         this.life = 1 // জীবনকাল (১ মানে ১০০%)
//       }

//       update() {
//         this.x += this.speedX
//         this.y += this.speedY
//         this.speedY += 0.05 // হালকা অভিকর্ষ (স্ফুলিঙ্গগুলো একটু নিচে পড়বে)
//         this.size *= 0.93 // ধীরে ধীরে ছোট হবে
//         this.life -= 0.02 // ধীরে ধীরে মুছে যাবে
//       }

//       draw(ctx: CanvasRenderingContext2D) {
//         if (this.life <= 0) return
//         ctx.globalAlpha = this.life
//         ctx.fillStyle = this.color
        
//         // গ্লো ইফেক্ট (Glow)
//         ctx.shadowBlur = 15
//         ctx.shadowColor = this.color

//         ctx.beginPath()
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
//         ctx.fill()
//       }
//     }

//     // মাউস নড়াচড়া করলে পার্টিকেল তৈরি হবে
//     const handleMouseMove = (e: MouseEvent) => {
//       // প্রতিবার মাউস নাড়ালে ৩টি করে স্ফুলিঙ্গ বের হবে
//       for (let i = 0; i < 3; i++) {
//         particles.push(new Particle(e.clientX, e.clientY))
//       }
//     }

//     window.addEventListener('mousemove', handleMouseMove)

//     // অ্যানিমেশন লুপ
//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height)
//       ctx.globalCompositeOperation = 'screen' // ম্যাজিক্যাল ব্লেন্ড মোড

//       for (let i = 0; i < particles.length; i++) {
//         particles[i].update()
//         particles[i].draw(ctx)

//         // পার্টিকেল শেষ হয়ে গেলে মুছে ফেলা
//         if (particles[i].life <= 0 || particles[i].size <= 0.1) {
//           particles.splice(i, 1)
//           i--
//         }
//       }
//       animationFrameId = requestAnimationFrame(animate)
//     }
    
//     animate()

//     // ক্লিনআপ ফাংশন
//     return () => {
//       window.removeEventListener('resize', resize)
//       window.removeEventListener('mousemove', handleMouseMove)
//       cancelAnimationFrame(animationFrameId)
//     }
//   }, [visible])

//   if (!visible) return null

//   return (
//     <div className={`pointer-events-none fixed inset-0 -z-10 ${className}`} aria-hidden="true">
//       <canvas ref={canvasRef} className="block h-full w-full" />
//     </div>
//   )
// }