
import { skillGroups } from '../../data/skills'
import Container from '../ui/Container'
import TiltCard from '../ui/TiltCard'

export default function Skills() {
  return (
    <section id="skills" className="border-b border-line py-14 sm:py-20">
      <Container>
        <h2 className="font-display text-[clamp(42px,6vw,76px)] font-normal leading-none">
          Skills
        </h2>

        <p className="mt-2 max-w-[640px] text-sm leading-relaxed text-muted sm:text-base">
          Focused on AI, machine learning and automation engineering, from the model all the way to deployment.
        </p>

        <div className="mt-10 flex flex-col gap-10 sm:mt-14 sm:gap-14">
          {skillGroups.map((group) => (
            <div key={group.title} className="border-t border-line pt-6 sm:pt-8">
              <div className="mb-5 flex flex-wrap items-center gap-3 sm:mb-6">
                <h3 className="font-display text-[clamp(26px,3.4vw,40px)] font-normal leading-tight">
                  {group.title}
                </h3>

                {group.focus && (
                  <span className="rounded-full border border-accent px-3 py-1 font-body text-[10px] font-bold uppercase leading-4 text-accent sm:text-xs">
                    Core focus
                  </span>
                )}
              </div>

              <ul className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {group.skills.map(({ name, icon: Icon }) => (
                  <li key={name} className="min-w-0">
                    <TiltCard
                      max={0}
                      className="tilt-slide h-full min-w-0 rounded-xl border border-line bg-card"
                    >
                      <div className="flex min-h-[68px] min-w-0 items-center gap-2.5 p-3 sm:gap-3 sm:p-3.5">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-tile text-accent sm:h-10 sm:w-10">
                          <Icon
                            className="h-5 w-5"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        </span>

                        <span className="min-w-0 flex-1 break-words [overflow-wrap:anywhere] font-body text-sm font-medium leading-snug sm:text-[15px]">
                          {name}
                        </span>
                      </div>
                    </TiltCard>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
