import type { KeyboardEvent } from 'react'
import { motion } from 'motion/react'
import type { Project } from '../../types'
import { ArrowUpRightIcon } from '../../icons'
import ProjectShot from './ProjectShot'
import { ScrollHeadline, ScrollImage, ScrollText } from './ScrollMotion'
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
    // lift on hover (motion ignores touch-emulated hover, so phones don't get stuck states)
    <motion.div className="h-full" whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
      {/* max was 0 (no tilt); 6 gives a subtle 3D tilt. Set it back to 0 to turn it off. */}
      <TiltCard max={6} className="h-full rounded-2xl border border-line bg-card transition-shadow duration-500 hover:shadow-2xl">
        <div
          role="button"
          tabIndex={0}
          aria-haspopup="dialog"
          aria-label={`Open ${title}`}
          onClick={(e) => open(e.currentTarget)}
          onKeyDown={onKey}
          className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <figure>
            <ScrollImage className="overflow-hidden">
              {/* hover zoom */}
              <div className="transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                <ProjectShot image={image} title={title} className="aspect-[16/10] w-full" />
              </div>
            </ScrollImage>
          </figure>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <h3 className="flex flex-wrap items-center gap-2 font-body text-xl font-medium leading-snug">
              <ScrollHeadline text={title} />
              {tag && (
                <span className="rounded-full bg-primary px-2.5 py-0.5 font-body text-xs font-bold uppercase leading-5 text-ink">
                  {tag}
                </span>
              )}
            </h3>

            {/* Short text only: clamped to 3 lines */}
            <ScrollText order={1} y={24}>
              <p className="line-clamp-3 text-base text-muted">{summary ?? description}</p>
            </ScrollText>

            <span className="mt-auto inline-flex items-center gap-1 pt-2 font-body text-sm font-bold uppercase text-accent">
              View details
              <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

// import type { KeyboardEvent } from "react";
// import { motion } from "motion/react";
// import type { Project } from "../../types";
// import { ArrowUpRightIcon } from "../../icons";
// import ProjectShot from "./ProjectShot";
// import { ScrollHeadline, ScrollImage, ScrollText } from "./ScrollMotion";
// import TiltCard from "./TiltCard";

// interface Props {
//   project: Project;
//   /** called with the card's position, so the pop-up can grow out of it */
//   onOpen: (project: Project, rect: DOMRect) => void;
// }

// /** The compact card used in grid view: image, title, short text. Click opens the full card. */
// export default function ProjectGridCard({ project, onOpen }: Props) {
//   const { title, description, summary, tag, image } = project;

//   const open = (el: HTMLElement) => onOpen(project, el.getBoundingClientRect());
//   const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
//     if (e.key === "Enter" || e.key === " ") {
//       e.preventDefault();
//       open(e.currentTarget);
//     }
//   };

//   return (
//     // Added `relative z-10 hover:z-50 focus-within:z-50` so the card jumps to the front of the stacking context
//     <motion.div
//       className="relative z-10 h-full hover:z-50 focus-within:z-50"
//       whileHover={{ y: -8 }}
//       transition={{ type: "spring", stiffness: 260, damping: 22 }}
//     >
//       <TiltCard
//         max={6}
//         className="h-full rounded-2xl border border-line bg-card transition-shadow duration-500 hover:shadow-2xl"
//       >
//         <div
//           role="button"
//           tabIndex={0}
//           aria-haspopup="dialog"
//           aria-label={`Open ${title}`}
//           onClick={(e) => open(e.currentTarget)}
//           onKeyDown={onKey}
//           // Note: If the image expansion gets cut off at the edges of the card, change `overflow-hidden` to `overflow-visible` here
//           className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
//         >
//           <figure>
//             {/* If your image zoom is still getting cut off, you may also need to remove overflow-hidden from ScrollImage */}
//             <ScrollImage className="overflow-hidden">
//               <div className="transition-transform duration-700 ease-out group-hover:scale-[1.06]">
//                 <ProjectShot
//                   image={image}
//                   title={title}
//                   className="aspect-[16/10] w-full"
//                 />
//               </div>
//             </ScrollImage>
//           </figure>

//           <div className="flex flex-1 flex-col gap-3 p-5">
//             <h3 className="flex flex-wrap items-center gap-2 font-body text-xl font-medium leading-snug">
//               <ScrollHeadline text={title} />
//               {tag && (
//                 <span className="rounded-full bg-primary px-2.5 py-0.5 font-body text-xs font-bold uppercase leading-5 text-ink">
//                   {tag}
//                 </span>
//               )}
//             </h3>

//             <ScrollText order={1} y={24}>
//               <p className="line-clamp-3 text-base text-muted">
//                 {summary ?? description}
//               </p>
//             </ScrollText>

//             <span className="mt-auto inline-flex items-center gap-1 pt-2 font-body text-sm font-bold uppercase text-accent">
//               View details
//               <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
//             </span>
//           </div>
//         </div>
//       </TiltCard>
//     </motion.div>
//   );
// }
