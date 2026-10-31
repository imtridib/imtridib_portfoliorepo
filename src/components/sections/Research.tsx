import { useMemo, useState } from 'react'
import { research } from '../../data/research'
import Container from '../ui/Container'
import ResearchCard from '../ui/ResearchCard'
import ResearchRow from '../ui/ResearchRow'

export default function Research() {
  const [category, setCategory] = useState('All')

  // Filter tabs come from the papers themselves: a category with no papers never shows up
  const categories = useMemo(() => ['All', ...Array.from(new Set(research.map((p) => p.category)))], [])
  const shown = category === 'All' ? research : research.filter((p) => p.category === category)

  return (
    <section id="research" className="border-b border-line py-20 pb-[140px] lg:pb-20">
      <Container>
        <p className="font-ui text-sm font-medium uppercase tracking-[0.18em] text-accent">Research &amp; Publications</p>
        <h2 className="mt-3 max-w-[18ch] font-display text-[clamp(44px,6vw,76px)] font-normal leading-none">
          Research that solves real problems.
        </h2>
        <p className="mt-4 max-w-[560px] text-muted">
          Exploring applied AI, computer vision, and intelligent systems through research and experimentation.
        </p>

        {categories.length > 2 && (
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
        )}

        <div className="mt-12">
          {shown.length === 0 ? (
            <p className="py-12 text-center text-muted">No publications in this category yet.</p>
          ) : (
            <>
              {/* Wider than 768px: visual cards. Pure CSS switch, no JavaScript device detection. */}
              <ul className="hidden grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-6 min-[769px]:grid">
                {shown.map((p) => (
                  <li key={p.id} className="h-full">
                    <ResearchCard paper={p} />
                  </li>
                ))}
              </ul>

              {/* 768px and below: compact list */}
              <ul className="min-[769px]:hidden">
                {shown.map((p) => (
                  <li key={p.id}>
                    <ResearchRow paper={p} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </Container>
    </section>
  )
}
