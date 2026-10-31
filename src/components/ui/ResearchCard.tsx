// import type { ResearchPaper } from '../../types'
// import ResearchActions from './ResearchActions'
// import ResearchThumb from './ResearchThumb'
// import TiltCard from './TiltCard'
// import { useEffect, useRef, useState } from 'react'

// /** Desktop layout: a visual card. The card itself is not a link, only the buttons at the bottom are. */
// export default function ResearchCard({ paper }: { paper: ResearchPaper }) {
//   const { title, category, tags, summary, authors, venue, year, publicationStatus } = paper
//   const meta = [year, venue].filter(Boolean).join(' · ')
// const [expanded, setExpanded] = useState(false)
// const [canExpand, setCanExpand] = useState(false)
// const summaryRef = useRef<HTMLParagraphElement>(null)

// useEffect(() => {
//   const element = summaryRef.current

//   if (element) {
//     setCanExpand(element.scrollHeight > element.clientHeight + 1)
//   }
// }, [summary])

//   return (
//     // tilt-slide = a plain lift (no tilt), with the same cursor glow as the project cards
//     <TiltCard max={0} className="tilt-slide group h-full overflow-hidden rounded-2xl border border-line bg-card">
//       <article className="flex h-full flex-col">
//         <ResearchThumb paper={paper} className="aspect-video w-full" />

//         <div className="flex flex-1 flex-col gap-4 p-6">
//           <div className="flex flex-wrap items-center gap-2">
//             <span className="rounded-full bg-primary px-3 py-1 font-body text-xs font-bold uppercase leading-4 text-ink">
//               {category}
//             </span>
//             {venue && (
//               <span className="rounded-full border border-line px-3 py-1 font-body text-xs font-medium leading-4 text-muted">
//                 {venue}
//               </span>
//             )}
//             {publicationStatus && (
//               <span className="rounded-full border border-line px-3 py-1 font-body text-xs font-medium leading-4 text-muted">
//                 {publicationStatus}
//               </span>
//             )}
//           </div>

//           <h3 className="font-body text-xl font-semibold leading-snug">{title}</h3>
//           <p ref={summaryRef} className="line-clamp-3 text-base text-muted">
//             {summary}
//           </p>
//           {meta && (
//   <p className="text-sm text-muted">
//     {meta}
//   </p>
// )}

// {authors.length > 0 && (
//   <div className="border-t border-line pt-3">
//     <p className="mb-1.5 font-body text-xs font-semibold uppercase tracking-wider text-accent">
//       Authors
//     </p>
//     <p className="text-sm leading-relaxed text-muted">
//       {authors.join(' · ')}
//     </p>
//   </div>
// )}

//           {tags.length > 0 && (
//             <ul className="flex flex-wrap gap-2">
//               {tags.map((t) => (
//                 <li key={t} className="rounded-md bg-tile px-2.5 py-1 font-body text-xs text-muted">
//                   {t}
//                 </li>
//               ))}
//             </ul>
//           )}

//           <div className="mt-auto pt-2">
//             <ResearchActions paper={paper} />
//           </div>
//         </div>
//       </article>
//     </TiltCard>
//   )
// }

// 2nd improvise
import type { ResearchPaper } from '../../types'
import ResearchActions from './ResearchActions'
import ResearchThumb from './ResearchThumb'
import TiltCard from './TiltCard'
import { useEffect, useRef, useState } from 'react'

/** Desktop layout: a visual card. The card itself is not a link, only the buttons at the bottom are. */
export default function ResearchCard({ paper }: { paper: ResearchPaper }) {
  const { title, category, tags, summary, authors, venue, year, publicationStatus } = paper
  const meta = [year, venue].filter(Boolean).join(' · ')

  const [expanded, setExpanded] = useState(false)
  const [canExpand, setCanExpand] = useState(false)
  const summaryRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const element = summaryRef.current

    if (element) {
      setCanExpand(element.scrollHeight > element.clientHeight + 1)
    }
  }, [summary])

  return (
    <TiltCard max={0} className="tilt-slide group h-full overflow-hidden rounded-2xl border border-line bg-card">
      <article className="flex h-full flex-col">
        <ResearchThumb paper={paper} className="aspect-video w-full" />

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary px-3 py-1 font-body text-xs font-bold uppercase leading-4 text-ink">
              {category}
            </span>

            {venue && (
              <span className="rounded-full border border-line px-3 py-1 font-body text-xs font-medium leading-4 text-muted">
                {venue}
              </span>
            )}

            {publicationStatus && (
              <span className="rounded-full border border-line px-3 py-1 font-body text-xs font-medium leading-4 text-muted">
                {publicationStatus}
              </span>
            )}
          </div>

          <h3 className="font-body text-xl font-semibold leading-snug">
            {title}
          </h3>

          {/* Summary with See More / See Less */}
          <div>
            <p
              ref={summaryRef}
              className={`text-base leading-relaxed text-muted ${
                expanded ? '' : 'line-clamp-3'
              }`}
            >
              {summary}
            </p>

            {canExpand && (
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                aria-expanded={expanded}
                className="mt-1 font-body text-sm font-semibold text-accent transition-colors hover:text-primary"
              >
                {expanded ? 'See less' : 'See more'}
              </button>
            )}
          </div>

          {meta && (
            <p className="text-sm text-muted">
              {meta}
            </p>
          )}

          {/* Authors on a separate line */}
          {authors.length > 0 && (
            <div className="border-t border-line pt-3">
              <p className="mb-1.5 font-body text-xs font-semibold uppercase tracking-wider text-accent">
                Authors
              </p>
              <p className="text-sm leading-relaxed text-muted">
                {authors.join(' · ')}
              </p>
            </div>
          )}

          {tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <li
                  key={t}
                  className="rounded-md bg-tile px-2.5 py-1 font-body text-xs text-muted"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto pt-2">
            <ResearchActions paper={paper} />
          </div>
        </div>
      </article>
    </TiltCard>
  )
}

