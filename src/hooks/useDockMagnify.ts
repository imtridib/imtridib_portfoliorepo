import { useEffect, type RefObject } from 'react'

// Desktop vs phone feel. Phones push less so the end icons stay inside the bar.
const DESKTOP = { max: 1.45, radius: 120 } // max = size of the icon under the pointer, radius = px of influence
const PHONE = { max: 1.3, radius: 80 }


export function useDockMagnify(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const dock = ref.current
    if (!dock) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const small = matchMedia('(max-width: 640px)')
    const kids = Array.from(dock.children) as HTMLElement[]
    const isIcon = kids.map((el) => el.classList.contains('dock-item'))
    let centers: number[] = [] // resting centre x of every child
    let widths: number[] = [] // resting width of every child
    let scales: number[] = []
    let pointerX: number | null = null
    let raf = 0
    let last = 0

    const clear = () =>
      kids.forEach((el) => {
        el.style.removeProperty('--s')
        el.style.removeProperty('--tx')
      })

    const measure = () => {
      clear()
      const rects = kids.map((el) => el.getBoundingClientRect())
      centers = rects.map((r) => r.left + r.width / 2)
      widths = rects.map((r) => r.width)
      scales = kids.map(() => 1)
    }

    const targetFor = (i: number) => {
      if (pointerX === null || !isIcon[i]) return 1
      const { max, radius } = small.matches ? PHONE : DESKTOP
      const d = Math.abs(pointerX - centers[i])
      if (d >= radius) return 1
      return 1 + (max - 1) * (0.5 + 0.5 * Math.cos((Math.PI * d) / radius))
    }

    const tick = (now: number) => {
      const dt = Math.min(now - last, 32)
      last = now
      const k = 1 - Math.exp(-dt / 70) // smooth ease, frame-rate independent

      let moving = false
      scales = scales.map((s, i) => {
        const t = targetFor(i)
        if (Math.abs(t - s) > 0.001) moving = true
        return s + (t - s) * k
      })

      // Extra width each icon gains, and the push that keeps the gaps even
      const extra = scales.map((s, i) => (s - 1) * widths[i])
      const total = extra.reduce((a, b) => a + b, 0)
      let run = 0
      kids.forEach((el, i) => {
        const tx = run + extra[i] / 2 - total / 2
        run += extra[i]
        el.style.setProperty('--tx', `${tx.toFixed(2)}px`)
        if (isIcon[i]) el.style.setProperty('--s', scales[i].toFixed(4))
      })

      if (moving) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = 0
        if (pointerX === null) clear()
      }
    }

    const start = () => {
      if (!raf) {
        last = performance.now()
        raf = requestAnimationFrame(tick)
      }
    }

    // mouse, touch and pen all go through the same path
    const onMove = (e: PointerEvent) => {
      pointerX = e.clientX
      start()
    }
    const onRelease = () => {
      pointerX = null
      start()
    }
    // mouse stays "hovering" after pointerup, so only release touch/pen here
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') onRelease()
    }

    measure()
    dock.addEventListener('pointerdown', onMove) // so a plain tap magnifies too
    dock.addEventListener('pointermove', onMove)
    dock.addEventListener('pointerup', onUp)
    dock.addEventListener('pointercancel', onRelease)
    dock.addEventListener('pointerleave', onRelease)
    window.addEventListener('resize', measure)
    return () => {
      dock.removeEventListener('pointerdown', onMove)
      dock.removeEventListener('pointermove', onMove)
      dock.removeEventListener('pointerup', onUp)
      dock.removeEventListener('pointercancel', onRelease)
      dock.removeEventListener('pointerleave', onRelease)
      window.removeEventListener('resize', measure)
      cancelAnimationFrame(raf)
      clear()
    }
  }, [ref])
}