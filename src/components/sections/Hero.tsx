import Button from '../ui/Button'
import Container from '../ui/Container'
import SocialLinks from '../ui/SocialLinks'

export default function Hero() {
  return (
    <section id="home" className="flex min-h-[906px] items-center border-b border-line pb-20 pt-[126px]">
      <Container className="flex flex-col items-stretch justify-between gap-12 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-10 lg:flex-[0_1_544px]">
          <div>
            <h1 className="font-display text-[clamp(64px,8vw,101px)] font-normal leading-[0.9]">Hi, I am Tridib Chakraborty.</h1>
            <p className="mt-2 text-muted">
              An AI ML & AutomationEngineer passionate about building accessible and user friendly websites.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button href="#about" withDot>About me</Button>
            <SocialLinks round size={26} only={['LinkedIn', 'GitHub']} />
          </div>
        </div>

        {/* <div className="relative aspect-[600/700] w-full max-w-[600px] overflow-hidden rounded-2xl bg-portrait lg:flex-[0_1_600px]">
          <span className="absolute inset-0 grid place-items-center font-display text-[160px] leading-none text-black/10" aria-hidden="true">
            RG
          </span>
          <img
            src="/images/portrait.png"
            alt="Portrait of Robert Garcia"
            className="absolute bottom-0 left-0 h-[95%] w-full object-cover object-top"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        </div> */}

        {/* improvised */}

        <div className="portrait-in group relative w-full max-w-[600px] lg:flex-[0_1_600px]">
          {/* This wrapper lifts on hover, so the neon moves together with the card */}
          <div className="relative transition-transform duration-500 ease-out group-hover:-translate-x-1 group-hover:-translate-y-2">
            {/* neon layers (behind the card) */}
            <span className="neon-halo" aria-hidden="true" />
            <span className="neon-glow" aria-hidden="true" />
            <span className="neon-ring" aria-hidden="true" />

            {/* card */}
            <div className="relative aspect-[600/700] overflow-hidden rounded-2xl bg-portrait">
              <span
                className="absolute inset-0 grid place-items-center font-display text-[160px] leading-none text-black/10"
                aria-hidden="true"
              >
                RG
              </span>

              <img
                src="/images/portrait.png"
                alt="Portrait of Robert Garcia"
                className="portrait-img absolute inset-0 h-full w-full object-cover object-[50%_15%] origin-[50%_35%] transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />

              <span className="portrait-shine" aria-hidden="true" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
