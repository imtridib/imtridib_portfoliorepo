import { useMemo, useState } from 'react'
import { research } from '../../data/research'
import Container from '../ui/Container'
import ResearchCard from '../ui/ResearchCard'
import { ScrollCard, ScrollHeadline } from '../ui/ScrollMotion'

export default function Research() {
  const [category, setCategory] = useState('All')

  // Filter tabs come from the papers themselves: a category with no papers never shows up
  const categories = useMemo(() => ['All', ...Array.from(new Set(research.map((p) => p.category)))], [])
  const shown = category === 'All' ? research : research.filter((p) => p.category === category)

  return (
    <section id="research" className="border-b border-line py-20 pb-[140px] lg:pb-20">
      <Container>
        <div className="flex items-center gap-6">
          <h2 className="font-display text-[clamp(44px,6vw,76px)] font-normal leading-none">
            <ScrollHeadline text="Research" />{' '}
            <span className="text-accent">
              <ScrollHeadline text="Publications" />
            </span>
          </h2>
          {/* thin rule that runs out to the right edge, as in the reference */}
          <span aria-hidden="true" className="mt-3 hidden flex-1 border-t border-line sm:block" />
        </div>

        {/* <ScrollText order={1}> */}
          <p className="mt-4 max-w-[640px] text-base text-muted sm:text-lg">
            My published research papers in the field of AI, Computer Vision and Machine Learning.
          </p>
        {/* </ScrollText> */}

        {categories.length > 2 && (
          // <ScrollText order={2}>
            <div role="group" aria-label="Filter publications" className="mt-8 flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                  className={`min-h-[44px] cursor-pointer rounded-full border px-4 font-body text-sm font-medium transition-colors ${
                    category === c ? 'border-transparent bg-primary text-ink' : 'border-line text-muted hover:text-fg'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          // </ScrollText>
        )}

        <div className="mt-10 sm:mt-12">
          {shown.length === 0 ? (
            <p className="py-12 text-center text-muted">No publications in this category yet.</p>
          ) : (
            // one wide card per row; on phones the same cards simply stack their content
            <ul className="flex flex-col gap-6 sm:gap-8">
              {shown.map((p) => (
                <li key={p.id}>
                  <ScrollCard>
                    <ResearchCard paper={p} />
                  </ScrollCard>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  )
}