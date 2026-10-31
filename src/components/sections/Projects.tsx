import { useRef, useState } from 'react'
import { projects } from '../../data/projects'
import { ChevronDownIcon, GridIcon, ListIcon } from '../../icons'
import type { Project, ProjectCategory } from '../../types'
import Container from '../ui/Container'
import ProjectCard from '../ui/ProjectCard'
import ProjectGridCard from '../ui/ProjectGridCard'
import ProjectModal from '../ui/ProjectModal'

type View = 'list' | 'grid'
type Filter = 'all' | ProjectCategory

// The text navbar under the heading. Delete the 'all' line if you only want the three category tabs.
const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ai-ml', label: 'AI/ML Projects' },
  { id: 'ai-automation', label: 'AI Automation' },
  { id: 'other', label: 'Others' },
]

// How many projects show before "See more"
const LIMIT: Record<View, number> = { list: 3, grid: 3 }

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

// function FilterNav({ filter, onChange }: { filter: Filter; onChange: (f: Filter) => void }) {
//   return (
//     <nav aria-label="Filter projects" className="mt-10 flex flex-wrap gap-x-8 gap-y-1 border-b border-line">
//       {FILTERS.map(({ id, label }) => (
//         <button
//           key={id}
//           type="button"
//           aria-pressed={filter === id}
//           onClick={() => onChange(id)}
//           className={`-mb-px cursor-pointer border-b-2 pb-3 pt-1 font-ui text-base font-medium transition-colors ${
//             filter === id ? 'border-accent text-accent' : 'border-transparent text-muted hover:text-fg'
//           }`}
//         >
//           {label}
//         </button>
//       ))}
//     </nav>
//   )
// }

function FilterNav({ filter, onChange }: { filter: Filter; onChange: (f: Filter) => void }) {
  return (
    <nav aria-label="Filter projects" className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-2">
      {FILTERS.map(({ id, label }) => {
        const active = filter === id
        return (
          <button
            key={id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(id)}
            className="group relative cursor-pointer px-1 pb-3 pt-1 font-body text-base"
          >
            {/* text: turns bold + highlighted on hover, and stays that way when selected */}
            <span
              className={`block transition-[font-weight,color] duration-200 motion-reduce:transition-none ${
                active ? 'font-bold text-accent' : 'font-medium text-muted group-hover:font-bold group-hover:text-accent'
              }`}
            >
              {label}
            </span>
            {/* invisible bold copy: reserves the bold width so the row never jumps when the text turns bold */}
            <span aria-hidden="true" className="invisible block h-0 overflow-hidden font-bold">
              {label}
            </span>
            {/* line that opens from the centre outwards */}
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 bottom-0 h-0.5 origin-center bg-accent transition-transform duration-300 motion-reduce:transition-none ${
                active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}
            />
          </button>
        )
      })}
    </nav>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [view, setView] = useState<View>('list')
  const [filter, setFilter] = useState<Filter>('all')
  const [expanded, setExpanded] = useState(false)
  const [selected, setSelected] = useState<{ project: Project; rect: DOMRect } | null>(null)

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter)
  const limit = LIMIT[view]
  const visible = expanded ? filtered : filtered.slice(0, limit)
  const canExpand = filtered.length > limit

  // Changing the layout or the filter always goes back to the short list
  const changeView = (v: View) => {
    setView(v)
    setExpanded(false)
  }
  const changeFilter = (f: Filter) => {
    setFilter(f)
    setExpanded(false)
  }
  const toggleExpanded = () => {
    if (expanded) {
      setExpanded(false)
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) // don't leave the reader stranded at the bottom
    } else {
      setExpanded(true)
    }
  }

  return (
    <section ref={sectionRef} id="projects" className="border-b border-line py-20 pb-[140px] lg:pb-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-[clamp(52px,6vw,76px)] font-normal leading-none">Featured Projects</h2>
            <p className="mt-2 max-w-[600px] text-muted">
              Here are some of the selected projects that showcase my passion for AI, machine learning and automation engineering.
            </p>
          </div>
          <ViewToggle view={view} onChange={changeView} />
        </div>

        <FilterNav filter={filter} onChange={changeFilter} />

        {/* key replays the fade-in whenever the layout or the filter changes */}
        <div key={`${view}-${filter}`} className="view-in mt-12">
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-muted">No projects in this category yet.</p>
          ) : view === 'list' ? (
            <div className="flex flex-col gap-20 lg:gap-[120px]">
              {visible.map((p, i) => (
                // projects revealed by "See more" fade in; odd ones put the image card on the right
                <div key={p.id} className={i >= limit ? 'view-in' : undefined}>
                  <ProjectCard project={p} reverse={i % 2 === 1} />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p, i) => (
                <div key={p.id} className={`h-full ${i >= limit ? 'view-in' : ''}`}>
                  <ProjectGridCard project={p} onOpen={(project, rect) => setSelected({ project, rect })} />
                </div>
              ))}
            </div>
          )}
        </div>

        {canExpand && (
          <div className="mt-14 flex flex-col items-center gap-3">
            <p className="font-body text-sm text-muted">
              Showing {visible.length} of {filtered.length}
            </p>
            <button
              type="button"
              aria-expanded={expanded}
              onClick={toggleExpanded}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-accent px-6 py-3 font-body text-sm font-bold uppercase text-accent transition-colors hover:bg-primary hover:text-ink"
            >
              {expanded ? 'See less' : 'See more'}
              <ChevronDownIcon className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}

        <ProjectModal project={selected?.project ?? null} fromRect={selected?.rect ?? null} onClose={() => setSelected(null)} />
      </Container>
    </section>
  )
}
