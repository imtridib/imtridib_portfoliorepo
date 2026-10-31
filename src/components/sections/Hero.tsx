// import Button from '../ui/Button'
// import Container from '../ui/Container'
// import SocialLinks from '../ui/SocialLinks'

// export default function Hero() {
//   return (
//     <section id="home" className="flex min-h-[906px] items-center border-b border-line pb-20 pt-[126px]">
//       <Container className="flex flex-col items-stretch justify-between gap-12 lg:flex-row lg:items-center">
//         <div className="flex flex-col gap-10 lg:flex-[0_1_544px]">
//           <div>
//             <h1 className="font-display text-[clamp(64px,8vw,101px)] font-normal leading-[0.9]">Hi, I am Tridib Chakraborty.</h1>
//             <p className="mt-2 text-muted">
//               An AI ML & AutomationEngineer passionate about building accessible and user friendly websites.
//             </p>
//           </div>
//           <div className="flex items-center gap-4">
//             <Button href="#about" withDot>About me</Button>
//             <SocialLinks round size={26} only={['LinkedIn', 'GitHub']} />
//           </div>
//         </div>

//         {/* <div className="relative aspect-[600/700] w-full max-w-[600px] overflow-hidden rounded-2xl bg-portrait lg:flex-[0_1_600px]">
//           <span className="absolute inset-0 grid place-items-center font-display text-[160px] leading-none text-black/10" aria-hidden="true">
//             RG
//           </span>
//           <img
//             src="/images/portrait.png"
//             alt="Portrait of Robert Garcia"
//             className="absolute bottom-0 left-0 h-[95%] w-full object-cover object-top"
//             onError={(e) => (e.currentTarget.style.display = 'none')}
//           />
//         </div> */}

//         {/* improvised */}

//         <div className="portrait-in group relative w-full max-w-[600px] lg:flex-[0_1_600px]">
//           {/* This wrapper lifts on hover, so the neon moves together with the card */}
//           <div className="relative transition-transform duration-500 ease-out group-hover:-translate-x-1 group-hover:-translate-y-2">
//             {/* neon layers (behind the card) */}
//             <span className="neon-halo" aria-hidden="true" />
//             <span className="neon-glow" aria-hidden="true" />
//             <span className="neon-ring" aria-hidden="true" />

//             {/* card */}
//             <div className="relative aspect-[600/700] overflow-hidden rounded-2xl bg-portrait">
//               <span
//                 className="absolute inset-0 grid place-items-center font-display text-[160px] leading-none text-black/10"
//                 aria-hidden="true"
//               >
//                 RG
//               </span>

//               <img
//                 src="/images/portrait.png"
//                 alt="Portrait of Robert Garcia"
//                 className="portrait-img absolute inset-0 h-full w-full object-cover object-[50%_15%] origin-[50%_35%] transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
//                 onError={(e) => (e.currentTarget.style.display = 'none')}
//               />

//               <span className="portrait-shine" aria-hidden="true" />
//             </div>
//           </div>
//         </div>
//       </Container>
//     </section>
//   )
// }


// improvised
import Button from '../ui/Button'
import Container from '../ui/Container'
import SocialLinks from '../ui/SocialLinks'
import { FileTextIcon } from '../../icons'

export default function Hero({ onOpenCv }: { onOpenCv: () => void })  {
  return (
    // <section id="home" className="flex min-h-[906px] items-center border-b border-line pb-20 pt-[126px]">
    <section id="home" className="border-b border-line pb-20 pt-[104px] lg:pt-[120px]">
      {/* two columns: text (wider) + a smaller portrait */}
      <Container className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col gap-10">
          <div>
            <h1 className="font-display text-[clamp(64px,8vw,101px)] font-normal leading-[0.9]">Hi, I am Tridib Chakraborty.</h1>
            <p className="mt-2 text-muted">
              An AI ML & Automation Engineer passionate about building accessible and user friendly websites.
            </p>
          </div>
          {/* <div className="flex items-center gap-4">
            <Button href="#projects" withDot>My Projects</Button>
            <SocialLinks round size={26} only={['LinkedIn', 'GitHub']} />
          </div> */}
                    <div className="flex flex-wrap items-center gap-4">
            <Button href="#projects" withDot>My Projects</Button>

            {/* Black button: opens the CV pop-up */}
            <button
              type="button"
              onClick={onOpenCv}
              aria-haspopup="dialog"
              className="inline-flex h-[54px] cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-transparent px-6 font-body text-base font-bold uppercase leading-none text-white transition-colors hover:border-accent hover:text-accent"
            >
              View CV
              <FileTextIcon className="h-4 w-4" />
            </button>

            <SocialLinks round size={26} only={['LinkedIn', 'GitHub']} />
          </div>
        </div>

        <div className="portrait-in group relative mx-auto w-full max-w-[380px]">
          {/* This wrapper lifts on hover, so the neon moves together with the card */}
          <div className="relative transition-transform duration-500 ease-out group-hover:-translate-x-1 group-hover:-translate-y-2">
            {/* neon layers (behind the card) */}
            <span className="neon-halo" aria-hidden="true" />
            <span className="neon-glow" aria-hidden="true" />
            <span className="neon-ring" aria-hidden="true" />

            {/* card */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-portrait">
              <span
                className="absolute inset-0 grid place-items-center font-display text-[110px] leading-none text-black/10"
                aria-hidden="true"
              >
                TC
              </span>

              <img
                src="/images/portrait.png"
                alt="Portrait of Tridib Chakraborty"
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