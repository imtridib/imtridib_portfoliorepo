import type { ResearchPaper } from '../../types'
import ResearchActions from './ResearchActions'
import ResearchThumb from './ResearchThumb'

/** Mobile layout: a compact row with a small thumbnail on the left. Same data as the desktop card. */
export default function ResearchRow({ paper }: { paper: ResearchPaper }) {
  const { title, category, summary, venue, year, authors } = paper
  const meta = [category, year, venue].filter(Boolean).join(' · ')

  return (
    <article className="group flex gap-4 border-t border-line py-5">
      <ResearchThumb paper={paper} className="aspect-[4/3] w-24 shrink-0 self-start rounded-lg" />

      <div className="min-w-0 flex-1">
        <p className="font-ui text-xs font-medium uppercase tracking-wide text-accent">{meta}</p>
        <h3 className="mt-1 break-words font-body text-base font-semibold leading-snug">{title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{summary}</p>
        {authors.length > 0 && <p className="mt-1 text-xs text-muted">{authors.join(', ')}</p>}
        <div className="mt-1">
          <ResearchActions paper={paper} touch />
        </div>
      </div>
    </article>
  )
}
