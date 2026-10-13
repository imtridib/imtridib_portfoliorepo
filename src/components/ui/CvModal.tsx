import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cvLink } from '../../data/navItems'
import { DownloadIcon, XIcon } from '../../icons'

interface Props {
  open: boolean
  onClose: () => void
}

export default function CvModal({ open, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!open) return
    const prevFocus = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden' // stop the page behind from scrolling
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      prevFocus?.focus()
    }
  }, [open])

  if (!open) return null

  // Rendered into <body>: the dock uses backdrop-filter, which would otherwise trap a fixed modal inside it.
  return createPortal(
    <div
      className="cv-backdrop fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose() // click on the dark area closes
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Curriculum vitae"
        className="cv-panel flex h-[90dvh] w-full max-w-[920px] flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)]"
      >
        {/* Header: title on the left, Download + Close on the upper right */}
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
          <h2 className="font-display text-2xl font-normal leading-none sm:text-3xl">My CV</h2>
          <div className="flex items-center gap-2">
            <a
              href={cvLink.href}
              download={cvLink.fileName}
              aria-label="Download CV"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-body text-sm font-bold uppercase leading-none text-ink transition-opacity hover:opacity-90"
            >
              <DownloadIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Download</span>
            </a>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close CV"
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* PDF: the browser's own viewer, so every page scrolls up and down */}
        <iframe
          title="Robert Garcia CV"
          src={`${cvLink.href}#toolbar=0&navpanes=0&view=FitH`}
          className="block min-h-0 w-full flex-1 bg-white"
        />

        {/* Phone fallback: some mobile browsers only show page 1 inside an iframe */}
        <a
          href={cvLink.href}
          target="_blank"
          rel="noreferrer"
          className="border-t border-line px-4 py-2 text-center font-body text-sm text-muted hover:text-accent sm:hidden"
        >
          Can’t see all pages? Open in a new tab
        </a>
      </div>
    </div>,
    document.body,
  )
}