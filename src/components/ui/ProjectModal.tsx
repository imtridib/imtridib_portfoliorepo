import { useEffect, useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '../../types'
import { XIcon } from '../../icons'
import ProjectCard from './ProjectCard'

interface Props {
  project: Project | null
  /** the grid card that was clicked: the pop-up grows out of it and shrinks back into it */
  fromRect: DOMRect | null
  onClose: () => void
}

const EASE = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

/** A clip-path that shows only the area where the clicked card was */
function clipFrom(from: DOMRect, to: DOMRect) {
  const top = Math.max(0, from.top - to.top)
  const left = Math.max(0, from.left - to.left)
  const right = Math.max(0, to.right - from.right)
  const bottom = Math.max(0, to.bottom - from.bottom)
  return `inset(${top}px ${right}px ${bottom}px ${left}px round 16px)`
}
const FULL = 'inset(0px 0px 0px 0px round 16px)'

export default function ProjectModal({ project, fromRect, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const closing = useRef(false)
  const fromRef = useRef(fromRect)
  fromRef.current = fromRect
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  const open = project !== null

  // Animate the close, then tell the parent to unmount us
  const close = () => {
    if (closing.current) return
    closing.current = true
    const panel = panelRef.current
    const backdrop = backdropRef.current
    if (!panel || !backdrop || reduceMotion()) {
      onCloseRef.current()
      return
    }
    const from = fromRef.current
    const to = panel.getBoundingClientRect()
    backdrop.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: 'ease-in', fill: 'forwards' })
    const anim = panel.animate(
      from
        ? [{ clipPath: FULL, opacity: 1 }, { clipPath: clipFrom(from, to), opacity: 0.4 }]
        : [{ opacity: 1 }, { opacity: 0, transform: 'translateY(24px) scale(0.97)' }],
      { duration: 350, easing: EASE, fill: 'forwards' },
    )
    anim.onfinish = () => onCloseRef.current()
  }
  const closeRef = useRef(close)
  closeRef.current = close

  // Open animation: the card's area expands into the full pop-up
  useLayoutEffect(() => {
    if (!open) return
    closing.current = false
    const panel = panelRef.current
    const backdrop = backdropRef.current
    if (!panel || !backdrop || reduceMotion()) return
    backdrop.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: 'ease-out' })
    const from = fromRef.current
    if (from) {
      const to = panel.getBoundingClientRect()
      panel.animate(
        [{ clipPath: clipFrom(from, to), opacity: 0.4 }, { clipPath: FULL, opacity: 1 }],
        { duration: 450, easing: EASE },
      )
    } else {
      panel.animate(
        [{ opacity: 0, transform: 'translateY(24px) scale(0.97)' }, { opacity: 1, transform: 'none' }],
        { duration: 350, easing: EASE },
      )
    }
  }, [open])

  // Scroll lock, Esc to close, focus handling
  useEffect(() => {
    if (!open) return
    const prevFocus = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeRef.current()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      prevFocus?.focus()
    }
  }, [open])

  if (!project) return null

  return createPortal(
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-6">
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onMouseDown={close}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="relative flex max-h-[90dvh] w-full max-w-[1100px] flex-col overflow-hidden rounded-2xl border border-line bg-bg shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)]"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-3 sm:px-8">
          <span className="font-body text-sm font-semibold uppercase tracking-wide text-muted">Project details</span>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            aria-label="Close project"
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-y-auto p-5 sm:p-10">
          <ProjectCard project={project} />
        </div>
      </div>
    </div>,
    document.body,
  )
}
