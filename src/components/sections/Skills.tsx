import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { motion } from 'motion/react'
import { skillGroups } from '../../data/skills'
import { ChevronDownIcon } from '../../icons'
import type { SkillGroup } from '../../types'
import Container from '../ui/Container'
import {ScrollItem, ScrollStagger, ScrollText } from '../ui/ScrollMotion'
import TiltCard from '../ui/TiltCard'

type SkillIcon = SkillGroup['skills'][number]['icon']

// On phones only the first N groups show; the rest sit behind "See more". Desktop always shows all.
const MOBILE_GROUPS = 2

// Soft glow in the accent colour, used for hover (mouse) and touch
const GLOW = 'shadow-[0_0_20px_color-mix(in_srgb,var(--accent)_45%,transparent)]'
const HOVER = '[@media(hover:hover)]:hover'

/**
 * One skill: a fixed-size card (same width and height as all the others). Touching it lights it up for a moment, a mouse gets the same on hover.
 */
function SkillChip({ name, Icon }: { name: string; Icon: SkillIcon }) {
  const [lit, setLit] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const press = (e: PointerEvent) => {
    if (e.pointerType === 'mouse') return // mouse uses the CSS hover below
    window.clearTimeout(timer.current)
    setLit(true)
  }
  // keep the glow a moment after the finger lifts, so the tap is actually visible
  const release = () => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setLit(false), 650)
  }

  return (
    <motion.div
      className="h-full"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onPointerDown={press}
      onPointerUp={release}
      onPointerCancel={release}
      onPointerLeave={release}
    >
      <TiltCard
        max={0}
        className={`tilt-slide h-full min-w-0 rounded-xl border bg-card transition-[border-color,box-shadow] duration-300 ${
          lit ? `border-accent ${GLOW}` : `border-line ${HOVER}:border-accent ${HOVER}:${GLOW}`
        }`}
      >
        <div className="flex h-full min-h-[56px] items-center gap-2.5 p-2.5 sm:min-h-[68px] sm:gap-3 sm:p-3.5">
          <span
            className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors duration-300 sm:h-10 sm:w-10 ${
              lit ? 'bg-primary text-ink' : 'bg-tile text-accent'
            }`}
          >
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} aria-hidden="true" />
          </span>

          <span className="min-w-0 flex-1 line-clamp-2 break-words font-body text-[13px] font-medium leading-tight [overflow-wrap:anywhere] sm:line-clamp-none sm:text-[15px] sm:leading-snug">
            {name}
          </span>
        </div>
      </TiltCard>
    </motion.div>
  )
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const [expanded, setExpanded] = useState(false)

  const hasHidden = skillGroups.length > MOBILE_GROUPS

  const toggle = () => {
    if (expanded) {
      setExpanded(false)
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      setExpanded(true)
    }
  }

  return (
    <section ref={sectionRef} id="skills" className="border-b border-line py-12 sm:py-20">
      <Container>
        <h2 className="font-display text-[clamp(42px,6vw,76px)] font-normal leading-none">
          skills
        </h2>

        <ScrollText order={1}>
          <p className="mt-2 max-w-[640px] text-sm leading-relaxed text-muted sm:text-base">
            Focused on AI, machine learning and automation engineering, from the model all the way to deployment.
          </p>
        </ScrollText>

        <div className="mt-8 flex flex-col gap-8 sm:mt-14 sm:gap-14">
          {skillGroups.map((group, g) => (
            <ul
              // hidden groups remount on toggle so their scroll position is measured fresh
              key={g >= MOBILE_GROUPS ? `${group.title}-${expanded}` : group.title}
              // groups after the first two are hidden on phones until "See more" is pressed
              className={g >= MOBILE_GROUPS && !expanded ? 'hidden sm:block' : undefined}
            >
              <div className="border-t border-line pt-5 sm:pt-8">
                <div className="mb-4 flex flex-wrap items-center gap-2.5 sm:mb-6 sm:gap-3">
                  <h3 className="font-display text-[clamp(24px,3.4vw,40px)] font-normal leading-tight">
                    {group.title}
                  </h3>

                  {group.focus && (
                    <span className="rounded-full border border-accent px-3 py-1 font-body text-[10px] font-bold uppercase leading-4 text-accent sm:text-xs">
                      Core focus
                    </span>
                  )}
                </div>

                {/* every card is the same size: 2 columns on phones, more on wider screens */}
                <ScrollStagger className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-6">
                  {group.skills.map(({ name, icon }, i) => (
                    <li key={name} className="h-full min-w-0">
                      <ScrollItem index={i} className="h-full">
                        <SkillChip name={name} Icon={icon} />
                      </ScrollItem>
                    </li>
                  ))}
                </ScrollStagger>
              </div>
            </ul>
          ))}
        </div>

        {/* phones only */}
        {hasHidden && (
          <div className="mt-8 flex justify-center sm:hidden">
            <button
              type="button"
              aria-expanded={expanded}
              onClick={toggle}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-accent px-6 py-3 font-body text-sm font-bold uppercase text-accent transition-colors active:bg-primary active:text-ink"
            >
              {expanded ? 'See less' : 'See more'}
              <ChevronDownIcon className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </Container>
    </section>
  )
}
