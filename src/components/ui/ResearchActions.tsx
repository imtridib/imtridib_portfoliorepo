import { ArrowUpRightIcon, BookOpenIcon, GithubIcon, LinkIcon } from '../../icons'
import type { IconComponent, ResearchPaper } from '../../types'

interface Action {
  label: string
  href: string
  icon: IconComponent
  external: boolean
}

/** Only links that exist are returned, so nothing broken is ever shown. */
function actionsFor(p: ResearchPaper): Action[] {
  const list: Action[] = []
  if (p.paperUrl) list.push({ label: 'Read Paper', href: p.paperUrl, icon: BookOpenIcon, external: true })
  if (p.doi) list.push({ label: 'DOI', href: p.doi, icon: LinkIcon, external: true })
  if (p.codeUrl) list.push({ label: 'View Code', href: p.codeUrl, icon: GithubIcon, external: true })
  if (p.detailsUrl) list.push({ label: 'View Details', href: p.detailsUrl, icon: ArrowUpRightIcon, external: false })
  return list
}

interface Props {
  paper: ResearchPaper
  /** taller tap targets for phones */
  touch?: boolean
}

export default function ResearchActions({ paper, touch = false }: Props) {
  const actions = actionsFor(paper)
  if (actions.length === 0) return null

  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-1">
      {actions.map(({ label, href, icon: Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`inline-flex items-center gap-1.5 font-body text-sm font-bold uppercase text-accent underline-offset-4 hover:underline ${
              touch ? 'min-h-[44px]' : 'py-1'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
            {external && <span className="sr-only"> (opens in a new tab)</span>}
          </a>
        </li>
      ))}
    </ul>
  )
}
