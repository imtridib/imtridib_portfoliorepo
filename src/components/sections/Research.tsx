import Container from '../ui/Container'

export default function Research() {
  return (
    <section id="research" className="border-b border-line py-20 pb-[140px] lg:pb-20">
      <Container>
        <h2 className="font-display text-[clamp(52px,6vw,76px)] font-normal leading-none">Research &amp; Thesis Papers</h2>
        <p className="mt-2 max-w-[600px] text-muted">
          Selected research papers and thesis work.
        </p>
        {/* TODO: add your papers here (e.g. map over a typed array in src/data/papers.ts) */}
      </Container>
    </section>
  )
}
