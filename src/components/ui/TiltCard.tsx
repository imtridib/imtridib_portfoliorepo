import { useRef, type PointerEvent, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  /** maximum tilt in degrees. 0 = no tilt (hover lift and cursor glow only) */
  max?: number
}

/**
 * A card that lifts on hover, tilts towards the mouse and shows a glow that follows the cursor
 * (a soft spotlight inside + a bright edge). The visuals live in index.css (.tilt-card).
 * Mouse only: touch screens and reduced-motion users get a plain card.
 */
export default function TiltCard({ children, className = '', max = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    el.style.setProperty('--mx', `${x}px`) // where the glow sits
    el.style.setProperty('--my', `${y}px`)
    if (max > 0 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--ry', `${(x / r.width - 0.5) * 2 * max}deg`)
      el.style.setProperty('--rx', `${(0.5 - y / r.height) * 2 * max}deg`)
    }
  }

  const onEnter = (e: PointerEvent<HTMLDivElement>) => {
    if (ref.current && e.pointerType === 'mouse') ref.current.dataset.active = '1'
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.dataset.active = ''
    el.style.removeProperty('--rx')
    el.style.removeProperty('--ry')
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className={`tilt-card ${className}`}
    >
      {children}
      <span className="tilt-glow" aria-hidden="true" />
      <span className="tilt-ring" aria-hidden="true" />
    </div>
  )
}
