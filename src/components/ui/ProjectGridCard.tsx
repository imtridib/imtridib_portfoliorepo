import type { KeyboardEvent } from 'react'
import type { Project } from '../../types'
import { ArrowUpRightIcon } from '../../icons'
import ProjectShot from './ProjectShot'
import TiltCard from './TiltCard'

interface Props {
  project: Project
  /** called with the card's position, so the pop-up can grow out of it */
  onOpen: (project: Project, rect: DOMRect) => void
}

/** The compact card used in grid view: image, title, short text. Click opens the full card. */
export default function ProjectGridCard({ project, onOpen }: Props) {
  const { title, description, summary, tag, image } = project

  const open = (el: HTMLElement) => onOpen(project, el.getBoundingClientRect())
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      open(e.currentTarget)
    }
  }

  return (
    <TiltCard max={0} className="h-full rounded-2xl border border-line bg-card">
      <div
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label={`Open ${title}`}
        onClick={(e) => open(e.currentTarget)}
        onKeyDown={onKey}
        className="flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        <figure>
          <ProjectShot image={image} title={title} className="aspect-[16/10] w-full" />
        </figure>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="flex flex-wrap items-center gap-2 font-body text-xl font-medium leading-snug">
            {title}
            {tag && (
              <span className="rounded-full bg-primary px-2.5 py-0.5 font-body text-xs font-bold uppercase leading-5 text-ink">
                {tag}
              </span>
            )}
          </h3>

          {/* Short text only: clamped to 3 lines */}
          <p className="line-clamp-3 text-base text-muted">{summary ?? description}</p>

          <span className="mt-auto inline-flex items-center gap-1 pt-2 font-body text-sm font-bold uppercase text-accent">
            View details
            <ArrowUpRightIcon className="h-4 w-4" />
          </span>
        </div>
      </div>
    </TiltCard>
  )
}
