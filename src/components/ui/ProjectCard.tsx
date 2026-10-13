import type { Project } from '../../types'
import { GithubIcon } from '../../icons'
import InfoList from './InfoList'
import LinkArrow from './LinkArrow'

export default function ProjectCard({ project }: { project: Project }) {
  const { title, description, tag, image, info, liveUrl, codeUrl } = project

  return (
    <article className="flex flex-col items-stretch gap-12 lg:flex-row lg:items-center">
      {/* Image card */}
      <div className="relative grid aspect-square w-full max-w-[600px] place-items-center rounded-xl bg-card lg:w-1/2 lg:flex-none">
        {tag && (
          <span className="absolute left-4 top-4 rounded-full bg-bg px-4 py-2 font-body text-sm font-medium">{tag}</span>
        )}
        <div className="relative grid aspect-[486/347] w-[81%] place-items-center overflow-hidden rounded-xl border-2 border-[var(--shot-border)] bg-[linear-gradient(135deg,var(--shot-a),var(--shot-b))]">
          <span className="font-display text-4xl text-line">Screenshot</span>
          {image && (
            <img
              src={image}
              alt={`${title} screenshot`}
              className="absolute inset-0 h-full w-full object-cover"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-8">
        <div>
          <h3 className="font-body text-[26px] font-medium leading-[1.4] sm:text-[32px]">{title}</h3>
          <p className="mt-4 text-muted">{description}</p>
        </div>
        <InfoList items={info} />
        <div className="flex flex-wrap gap-6">
          {liveUrl && <LinkArrow href={liveUrl}>View project</LinkArrow>}
          {codeUrl && <LinkArrow href={codeUrl} icon={GithubIcon}>View code</LinkArrow>}
        </div>
      </div>
    </article>
  )
}
