// import { projects } from '../../data/projects'
// import Container from '../ui/Container'
// import ProjectCard from '../ui/ProjectCard'

// export default function Projects() {
//   return (
//     <section id="projects" className="border-b border-line py-20 pb-[140px] lg:pb-20">
//       <Container>
//         <h2 className="font-display text-[clamp(52px,6vw,76px)] font-normal leading-none">Featured Projects</h2>
//         <p className="mt-2 max-w-[600px] text-muted">
//           Here are some of the selected projects that showcase my passion for front-end development.
//         </p>
//         <div className="mt-20 flex flex-col gap-20 lg:gap-[120px]">
//           {projects.map((p) => (
//             <ProjectCard key={p.id} project={p} />
//           ))}
//         </div>
//       </Container>
//     </section>
//   )
// }

import { useState } from 'react'
import { projects } from '../../data/projects'
import { GridIcon, ListIcon } from '../../icons'
import type { Project } from '../../types'
import Container from '../ui/Container'
import ProjectCard from '../ui/ProjectCard'
import ProjectGridCard from '../ui/ProjectGridCard'
import ProjectModal from '../ui/ProjectModal'

type View = 'list' | 'grid'

function ViewToggle({ view, onChange }: { view: View; onChange: (v: View) => void }) {
  const base =
    'inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 font-body text-sm font-bold uppercase transition-colors'
  const on = 'bg-primary text-ink'
  const off = 'text-muted hover:text-fg'
  return (
    <div role="group" aria-label="Project layout" className="inline-flex rounded-full border border-line bg-card p-1">
      <button type="button" aria-pressed={view === 'list'} onClick={() => onChange('list')} className={`${base} ${view === 'list' ? on : off}`}>
        <ListIcon className="h-4 w-4" />
        List
      </button>
      <button type="button" aria-pressed={view === 'grid'} onClick={() => onChange('grid')} className={`${base} ${view === 'grid' ? on : off}`}>
        <GridIcon className="h-4 w-4" />
        Grid
      </button>
    </div>
  )
}

export default function Projects() {
  const [view, setView] = useState<View>('list')
  const [selected, setSelected] = useState<{ project: Project; rect: DOMRect } | null>(null)

  return (
    <section id="projects" className="border-b border-line py-20 pb-[140px] lg:pb-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-[clamp(52px,6vw,76px)] font-normal leading-none">Featured Projects</h2>
            <p className="mt-2 max-w-[600px] text-muted">
              Here are some of the selected projects that showcase my passion for front-end development.
            </p>
          </div>
          <ViewToggle view={view} onChange={setView} />
        </div>

        {/* key={view} replays the fade-in whenever the layout is switched */}
        <div key={view} className="view-in mt-16">
          {view === 'list' ? (
            <div className="flex flex-col gap-20 lg:gap-[120px]">
              {projects.map((p, i) => (
                // odd projects (2nd, 4th...) put the image card on the right
                <ProjectCard key={p.id} project={p} reverse={i % 2 === 1} />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectGridCard key={p.id} project={p} onOpen={(project, rect) => setSelected({ project, rect })} />
              ))}
            </div>
          )}
        </div>

        <ProjectModal project={selected?.project ?? null} fromRect={selected?.rect ?? null} onClose={() => setSelected(null)} />
      </Container>
    </section>
  )
}
