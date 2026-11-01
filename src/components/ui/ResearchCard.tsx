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
// import type { ResearchPaper } from '../../types'
// import ResearchActions from './ResearchActions'
// import ResearchThumb from './ResearchThumb'
// import TiltCard from './TiltCard'
// import { useEffect, useRef, useState } from 'react'

// /** Desktop layout: a visual card. The card itself is not a link, only the buttons at the bottom are. */
// export default function ResearchCard({ paper }: { paper: ResearchPaper }) {
//   const { title, category, tags, summary, authors, venue, year, publicationStatus } = paper
//   const meta = [year, venue].filter(Boolean).join(' · ')

//   const [expanded, setExpanded] = useState(false)
//   const [canExpand, setCanExpand] = useState(false)
//   const summaryRef = useRef<HTMLParagraphElement>(null)

//   useEffect(() => {
//     const element = summaryRef.current

//     if (element) {
//       setCanExpand(element.scrollHeight > element.clientHeight + 1)
//     }
//   }, [summary])

//   return (
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

//           <h3 className="font-body text-xl font-semibold leading-snug">
//             {title}
//           </h3>

//           {/* Summary with See More / See Less */}
//           <div>
//             <p
//               ref={summaryRef}
//               className={`text-base leading-relaxed text-muted ${
//                 expanded ? '' : 'line-clamp-3'
//               }`}
//             >
//               {summary}
//             </p>

//             {canExpand && (
//               <button
//                 type="button"
//                 onClick={() => setExpanded((prev) => !prev)}
//                 aria-expanded={expanded}
//                 className="mt-1 font-body text-sm font-semibold text-accent transition-colors hover:text-primary"
//               >
//                 {expanded ? 'See less' : 'See more'}
//               </button>
//             )}
//           </div>

//           {meta && (
//             <p className="text-sm text-muted">
//               {meta}
//             </p>
//           )}

//           {/* Authors on a separate line */}
//           {authors.length > 0 && (
//             <div className="border-t border-line pt-3">
//               <p className="mb-1.5 font-body text-xs font-semibold uppercase tracking-wider text-accent">
//                 Authors
//               </p>
//               <p className="text-sm leading-relaxed text-muted">
//                 {authors.join(' · ')}
//               </p>
//             </div>
//           )}

//           {tags.length > 0 && (
//             <ul className="flex flex-wrap gap-2">
//               {tags.map((t) => (
//                 <li
//                   key={t}
//                   className="rounded-md bg-tile px-2.5 py-1 font-body text-xs text-muted"
//                 >
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

// 3rd improvise
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FileTextIcon } from '../../icons'
import type { ResearchPaper } from '../../types'
import ResearchActions from './ResearchActions'
import TiltCard from './TiltCard'

// Rounded status / meta chips shown above the title
const CHIP =
  'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-body text-[13px] font-medium leading-none sm:text-sm'

// Shown only on devices that can really hover (used for the "Click to enlarge" hint)
const SHOW_ON_HOVER = 'opacity-0 transition-opacity duration-500 [@media(hover:hover)]:group-hover:opacity-100'

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="4.5" width="18" height="16" rx="3" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
    </svg>
  )
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" />
      <path d="m8 12.3 2.8 2.8L16.2 9.5" />
    </svg>
  )
}

/**
 * Wide editorial card: figure on the left, all paper details on the right.
 * Below 768px it stacks. The whole card animates in as one piece (see Research.tsx);
 * nothing inside it animates on its own.
 */
export default function ResearchCard({ paper }: { paper: ResearchPaper }) {
  const { title, category, tags, summary, authors, venue, year, publicationStatus, thumbnail } = paper

  const [expanded, setExpanded] = useState(false)
  const [canExpand, setCanExpand] = useState(false)
  const summaryRef = useRef<HTMLParagraphElement>(null)

  // Show "See more" only when the summary is actually cut off (re-checked when the width changes)
  useEffect(() => {
    const measure = () => {
      const el = summaryRef.current
      if (el && !expanded) setCanExpand(el.scrollHeight > el.clientHeight + 1)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [summary, expanded])

  // ---- full-size image (same behaviour as the Projects section) ----
  const [lightbox, setLightbox] = useState(false)
  const [lightboxVisible, setLightboxVisible] = useState(false)

  const openLightbox = () => {
    setLightbox(true)
    // start the transition after the lightbox has mounted
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setLightboxVisible(true))
    })
  }
  const closeLightbox = () => {
    setLightboxVisible(false)
    window.setTimeout(() => setLightbox(false), 300)
  }

  useEffect(() => {
    if (!lightbox) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  const isPublished = !!publicationStatus && /published/i.test(publicationStatus)

  return (
    <>
      <TiltCard
        max={0}
        className="tilt-slide group relative h-full overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--accent)_38%,transparent)] bg-card"
      >
        <div className="relative h-full">
          {/* restrained blue wash + corner highlight (decorative) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,color-mix(in_srgb,var(--accent)_7%,transparent),transparent_42%)]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 hidden h-20 w-20 md:block"
            style={{
              background: 'linear-gradient(225deg, color-mix(in srgb, var(--accent) 38%, transparent), transparent 60%)',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
            }}
          />


          <article className="relative grid gap-6 p-4 sm:p-5 md:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] md:items-center md:gap-9 md:p-6">
            {/* Figure: shown whole (object-contain) with breathing room; click to enlarge */}
            <div className="relative grid aspect-[4/3] w-full place-items-center overflow-hidden rounded-xl border border-line bg-[linear-gradient(135deg,var(--shot-a),var(--shot-b))]">
              <FileTextIcon className="h-8 w-8 text-line" />
              {thumbnail && (
                <button
                  type="button"
                  onClick={openLightbox}
                  aria-haspopup="dialog"
                  aria-label={`Show full-size figure: ${title}`}
                  className="absolute inset-0 cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <img
                    src={thumbnail}
                    alt={`Figure from the paper: ${title}`}
                    loading="lazy"
                    className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02] sm:inset-4 sm:h-[calc(100%-2rem)] sm:w-[calc(100%-2rem)] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                  <span className={`absolute bottom-2.5 right-2.5 rounded-full bg-black/65 px-3 py-1 font-body text-xs font-medium text-white ${SHOW_ON_HOVER}`}>
                    Click to enlarge
                  </span>
                </button>
              )}
            </div>

            {/* Details */}
            <div className="flex min-w-0 flex-col">
              {/* 1. category, year, venue, status */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-primary px-4 py-1.5 font-body text-[13px] font-bold uppercase leading-none text-ink sm:text-sm">
                  {category}
                </span>

                {year && (
                  <span className={`${CHIP} border-line text-fg`}>
                    <CalendarIcon className="h-4 w-4 text-accent" />
                    {year}
                  </span>
                )}

                {venue && <span className={`${CHIP} border-line text-fg`}>{venue}</span>}

                {publicationStatus && (
                  <span
                    className={`${CHIP} ${
                      isPublished
                        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
                        : 'border-line text-muted'
                    }`}
                  >
                    {isPublished && <CheckCircleIcon className="h-4 w-4" />}
                    {publicationStatus}
                  </span>
                )}
              </div>

              {/* 2. title */}
              <h3 className="mt-4 font-body text-[clamp(22px,2.4vw,32px)] font-semibold leading-[1.2] tracking-tight">
                {title}
              </h3>

              {/* 3. abstract, with See more / See less */}
              <div className="mt-3">
                <p
                  ref={summaryRef}
                  className={`text-base leading-relaxed text-muted ${expanded ? '' : 'line-clamp-3 md:line-clamp-2'}`}
                >
                  {summary}
                </p>

                {canExpand && (
                  <button
                    type="button"
                    onClick={() => setExpanded((prev) => !prev)}
                    aria-expanded={expanded}
                    className="mt-1 cursor-pointer font-body text-sm font-semibold text-accent transition-colors hover:text-primary"
                  >
                    {expanded ? 'See less' : 'See more'}
                  </button>
                )}
              </div>

              {/* 4. complete author list */}
              {authors.length > 0 && (
                <div className="mt-5 border-t border-line pt-4">
                  <p className="mb-1.5 font-body text-sm font-bold uppercase tracking-wide text-accent">Authors</p>
                  <p className="text-[15px] leading-relaxed text-fg sm:text-base">{authors.join(' · ')}</p>
                </div>
              )}

              {/* 5. highlights, dataset statistics, model tags */}
              {tags.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-line bg-tile px-3.5 py-1.5 font-body text-[13px] leading-none text-muted sm:text-sm"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              )}

              {/* 6. Read Paper / DOI (and Code / Details when the paper has them) */}
              <div className="mt-4">
                <ResearchActions paper={paper} />
              </div>
            </div>
          </article>
        </div>
      </TiltCard>

      {/* Full-size figure. Portaled to <body> so the card's scroll animation can't break `position: fixed`. */}
      {lightbox &&
        thumbnail &&
        createPortal(
          <div
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 transition-opacity duration-300 ease-out sm:p-8 ${
              lightboxVisible ? 'opacity-100' : 'opacity-0'
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Full-size research figure"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close full-size image"
              className="absolute right-4 top-4 z-10 rounded-full border border-white/30 bg-black/60 px-4 py-2 text-sm text-white transition-opacity hover:bg-black"
            >
              Close ✕
            </button>

            <img
              src={thumbnail}
              alt={`Figure from the paper: ${title}`}
              className={`max-h-full max-w-full rounded-lg bg-white object-contain transition-transform duration-300 ease-out ${
                lightboxVisible ? 'scale-100' : 'scale-95'
              }`}
              onClick={(event) => event.stopPropagation()}
            />
          </div>,
          document.body,
        )}
    </>
  )
}