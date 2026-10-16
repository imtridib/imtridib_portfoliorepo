import type { Project } from '../../types'
import { GithubIcon, YoutubeIcon } from '../../icons'
import InfoList from './InfoList'
import LinkArrow from './LinkArrow'
import ProjectShot from './ProjectShot'
import TiltCard from './TiltCard'

interface Props {
  project: Project
  /** put the image card on the RIGHT (large screens). Projects.tsx alternates this. */
  reverse?: boolean
}

export default function ProjectCard({ project, reverse = false }: Props) {
  const { title, description, tag, image, info, stack, liveUrl, codeUrl, youtubeUrl } = project

  return (
    <article
      className={`flex flex-col items-stretch gap-12 lg:items-center ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
    >
      {/* Image card: hover lift + tilt + cursor glow */}
      <TiltCard className="grid aspect-square w-full max-w-[600px] place-items-center rounded-xl bg-card lg:w-1/2 lg:flex-none">
        {tag && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-bg px-4 py-2 font-body text-sm font-medium">{tag}</span>
        )}
        <ProjectShot image={image} title={title} className="aspect-[486/347] w-[81%] rounded-xl border-2" />
      </TiltCard>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-8">
        <div>
          <h3 className="font-body text-[26px] font-medium leading-[1.4] sm:text-[32px]">{title}</h3>
          <p className="mt-4 text-muted">{description}</p>
        </div>

        <InfoList items={info} stack={stack} />

        {/* Each link only appears if the project has it */}
        <div className="flex flex-wrap gap-6">
          {liveUrl && <LinkArrow href={liveUrl}>View project</LinkArrow>}
          {codeUrl && <LinkArrow href={codeUrl} icon={GithubIcon}>View code</LinkArrow>}
          {youtubeUrl && <LinkArrow href={youtubeUrl} icon={YoutubeIcon}>YouTube</LinkArrow>}
        </div>
      </div>
    </article>
  )
}
