// import type { FormEvent } from 'react'
// import Button from '../ui/Button'
// import Container from '../ui/Container'
// import SocialLinks from '../ui/SocialLinks'

// const field =
//   'w-full rounded border border-transparent bg-card px-4 py-3 font-body text-lg text-fg focus:border-accent focus:outline-none'
// const label = 'flex w-full flex-col gap-2 font-body text-base font-medium leading-[1.6] text-muted'

// export default function Contact() {
//   const onSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     // TODO: send the form data to your backend or a form service
//   }

//   return (
//     <section id="contact" className="pb-[calc(160px_+_env(safe-area-inset-bottom,0px))] pt-20">
//       <Container className="flex flex-col gap-16 lg:flex-row lg:gap-6">
//         <div className="flex flex-1 flex-col justify-between gap-12">
//           <div>
//             <h2 className="mb-4 font-display text-[clamp(52px,6vw,76px)] font-normal leading-none">Let’s connect</h2>
//             <p className="text-muted">
//               Email me at{' '}
//               <a href="mailto:hello@example.com" className="border-b border-accent text-fg">hello@example.com</a>
//             </p>
//             <p className="text-muted">
//               or find me on <a href="#" className="border-b border-accent text-fg">LinkedIn</a>
//             </p>
//             <SocialLinks className="mt-10" />
//           </div>
//           <small className="font-body text-base font-medium leading-[1.6] text-muted">© 2023 Robert Garcia</small>
//         </div>

//         <form onSubmit={onSubmit} className="flex flex-1 flex-col items-start gap-6">
//           <label className={label}>
//             Name
//             <input className={field} type="text" name="name" placeholder="John Doe" required />
//           </label>
//           <label className={label}>
//             Email
//             <input className={field} type="email" name="email" placeholder="you@example.com" required />
//           </label>
//           <label className={label}>
//             Message
//             <textarea className={`${field} min-h-[156px] resize-y`} name="message" placeholder="Say hello" required />
//           </label>
//           <Button type="submit">Send</Button>
//         </form>
//       </Container>
//     </section>
//   )
// }


// improvised code



import Container from '../ui/Container'
import TiltCard from '../ui/TiltCard'
import { Mail, MessageCircle } from 'lucide-react'
import { socials } from '../../data/socials'

const contactLinks = [
  {
    title: 'Email',
    description: 'Send me an email',
    href: 'mailto:YOUR_EMAIL@example.com',
    icon: Mail,
  },
  {
    title: 'WhatsApp',
    description: 'Start a conversation',
    href: 'https://wa.me/YOUR_PHONE_NUMBER',
    icon: MessageCircle,
  },
  ...socials
    .filter((social) => ['LinkedIn', 'GitHub'].includes(social.label))
    .map((social) => ({
      title: social.label,
      description:
        social.label === 'LinkedIn'
          ? 'Connect professionally'
          : 'Explore my work',
      href: social.href,
      icon: social.icon,
    })),
]

export default function Contact() {
  return (
    <section id="contact" className="pt-20 pb-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">

          {/* Left Content */}
          <div className="flex flex-col items-start">
            <span className="mb-5 font-body text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              Get in Touch
            </span>

            <h2 className="mb-6 font-display text-[clamp(44px,4.5vw,64px)] font-bold uppercase leading-[0.95]">
              Let's Connect
            </h2>

            <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Have an engineering opportunity, a project to discuss,
              or an idea to share? I'd be glad to hear from you.
            </p>
          </div>

          {/* Right Contact Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {contactLinks.map((item) => {
              const Icon = item.icon

              return (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.title === 'Email' ? undefined : '_blank'}
                  rel={
                    item.title === 'Email'
                      ? undefined
                      : 'noopener noreferrer'
                  }
                  aria-label={`Connect via ${item.title}`}
                  className="block h-full"
                >
                  <TiltCard
                    max={5}
                    className="tilt-slide group h-full overflow-hidden rounded-2xl border border-line bg-card"
                  >
                    <article className="flex min-h-[155px] h-full flex-col justify-between gap-4 p-6 transition-colors duration-300 group-hover:bg-tile sm:p-6">

                      {/* Icon */}
                      <div className="flex h-9 w-9 shrink-0 items-center justify-start text-accent [&_svg]:!h-8 [&_svg]:!w-8 [&_svg]:!max-h-8 [&_svg]:!max-w-8">
                        <Icon
                          size={32}
                          strokeWidth={2}
                          className="shrink-0 transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>

                      {/* Text */}
                      <div>
                        <h3 className="mb-1.5 font-body text-lg font-semibold text-fg transition-colors duration-300 group-hover:text-accent sm:text-xl">
                          {item.title}
                          <span className="ml-1.5 text-base">↗</span>
                        </h3>

                        <p className="font-body text-sm leading-relaxed text-muted sm:text-base">
                          {item.description}
                        </p>
                      </div>

                    </article>
                  </TiltCard>
                </a>
              )
            })}
          </div>

        </div>
      </Container>
    </section>
  )
}


