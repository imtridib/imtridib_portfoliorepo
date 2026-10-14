import { useEffect, useRef } from 'react'

interface Props {
  /** how strongly the ring is pulled towards the mouse (higher = snappier) */
  stiffness?: number
  /** how quickly the wobble dies out (lower = bouncier) */
  damping?: number
}

// Things that make the ring grow
const INTERACTIVE = 'a, button, [role="button"], label, select, summary, [data-cursor="hover"]'
// Places where the normal text cursor is needed, so ours hides
const TEXT_FIELD = 'input, textarea, [contenteditable="true"]'

export default function SpringCursor({ stiffness = 220, damping = 20 }: Props) {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    // Only for devices with a real mouse, and only if motion is welcome
    const hasMouse = matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!hasMouse || reduceMotion) return

    document.documentElement.classList.add('spring-cursor-on') // hides the native arrow (see index.css)

    const mouse = { x: -100, y: -100 }
    const pos = { x: -100, y: -100, vx: 0, vy: 0 } // the ring: position + velocity
    const scale = { v: 1, vel: 0 } // the ring size is a spring too
    let hovering = false
    let pressed = false
    let seen = false
    let raf = 0
    let last = 0

    const show = (on: boolean) => {
      const v = on ? '1' : ''
      ring.dataset.show = v
      dot.dataset.show = v
    }

    const placeDot = () => {
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%) scale(${pressed ? 0.6 : 1})`
    }

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30)
      last = now

      // spring physics: pull towards the mouse, minus friction
      pos.vx += (stiffness * (mouse.x - pos.x) - damping * pos.vx) * dt
      pos.vy += (stiffness * (mouse.y - pos.y) - damping * pos.vy) * dt
      pos.x += pos.vx * dt
      pos.y += pos.vy * dt

      const target = pressed ? 0.8 : hovering ? 1.7 : 1
      scale.vel += (300 * (target - scale.v) - 24 * scale.vel) * dt
      scale.v += scale.vel * dt

      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${scale.v})`

      const settled =
        Math.abs(mouse.x - pos.x) < 0.1 &&
        Math.abs(mouse.y - pos.y) < 0.1 &&
        Math.abs(pos.vx) < 0.1 &&
        Math.abs(pos.vy) < 0.1 &&
        Math.abs(target - scale.v) < 0.002 &&
        Math.abs(scale.vel) < 0.01
      raf = settled ? 0 : requestAnimationFrame(tick) // sleeps when nothing is moving
    }

    const kick = () => {
      if (!raf) {
        last = performance.now()
        raf = requestAnimationFrame(tick)
      }
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (!seen) {
        seen = true // first move: appear in place instead of flying in from the corner
        pos.x = mouse.x
        pos.y = mouse.y
      }
      const target = e.target as Element | null
      const overIframe = !!target?.closest?.('iframe') // the PDF viewer: let the browser cursor take over
      const overField = !!target?.closest?.(TEXT_FIELD)
      show(!overIframe && !overField)
      hovering = !!target?.closest?.(INTERACTIVE)
      placeDot()
      kick()
    }
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      pressed = true
      placeDot()
      kick()
    }
    const onUp = () => {
      pressed = false
      placeDot()
      kick()
    }
    const onLeaveWindow = () => show(false)

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    document.documentElement.addEventListener('mouseleave', onLeaveWindow)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow)
      document.documentElement.classList.remove('spring-cursor-on')
    }
  }, [stiffness, damping])

  return (
    <>
      <div ref={ringRef} className="spring-cursor spring-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="spring-cursor spring-cursor-dot" aria-hidden="true" />
    </>
  )
}