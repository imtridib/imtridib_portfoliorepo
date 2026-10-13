import { projects } from '../../data/projects'
import Container from '../ui/Container'
import ProjectCard from '../ui/ProjectCard'

export default function Projects() {
  return (
    <section id="projects" className="border-b border-line py-20 pb-[140px] lg:pb-20">
      <Container>
        <h2 className="font-display text-[clamp(52px,6vw,76px)] font-normal leading-none">Featured Projects</h2>
        <p className="mt-2 max-w-[600px] text-muted">
          Here are some of the selected projects that showcase my passion for front-end development.
        </p>
        <div className="mt-20 flex flex-col gap-20 lg:gap-[120px]">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </Container>
    </section>
  )
}
