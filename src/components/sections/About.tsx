import Container from '../ui/Container'
import LinkArrow from '../ui/LinkArrow'

export default function About() {
  return (
    <section id="about" className="border-b border-line py-[120px]">
      <Container className="flex flex-col justify-between gap-12 lg:flex-row">
        <h2 className="font-display text-[clamp(64px,8vw,101px)] font-normal leading-[0.9]">About me</h2>
        <div className="flex flex-col items-start gap-4 lg:flex-[0_1_704px]">
          <h3 className="font-body text-[26px] font-medium leading-[1.4] sm:text-[32px]">
            I am a front-end developer based in Sydney. Has Mechanical Engineering background.
          </h3>
          <p className="text-muted">
            I am a front-end developer based in Sydney looking for exciting opportunities. Has Mechanical Engineering
            background. Likes to focus on accessibility when developing. Passionate and curious about solving problems.
            Currently, I’m exploring Reactjs, Webflow and a bit of Designing. While I am not programming, I enjoy playing
            football, photography and playing Valorant. Learning more to improve skill.
          </p>
          <div className="mt-8">
            <LinkArrow href="#contact" icon={null}>Get in touch</LinkArrow>
          </div>
        </div>
      </Container>
    </section>
  )
}
