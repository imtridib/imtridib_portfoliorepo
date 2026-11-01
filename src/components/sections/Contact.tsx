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



// import Container from '../ui/Container'
// import TiltCard from '../ui/TiltCard'
// import { Mail, MessageCircle } from 'lucide-react'
// import { socials } from '../../data/socials'

// const contactLinks = [
//   {
//     title: 'Email',
//     description: 'Send me an email',
//     href: 'mailto:YOUR_EMAIL@example.com',
//     icon: Mail,
//   },
//   {
//     title: 'WhatsApp',
//     description: 'Start a conversation',
//     href: 'https://wa.me/YOUR_PHONE_NUMBER',
//     icon: MessageCircle,
//   },
//   ...socials
//     .filter((social) => ['LinkedIn', 'GitHub'].includes(social.label))
//     .map((social) => ({
//       title: social.label,
//       description:
//         social.label === 'LinkedIn'
//           ? 'Connect professionally'
//           : 'Explore my work',
//       href: social.href,
//       icon: social.icon,
//     })),
// ]

// export default function Contact() {
//   return (
//     <section id="contact" className="pt-20 pb-32">
//       <Container>
//         <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">

//           {/* Left Content */}
//           <div className="flex flex-col items-start">
//             <span className="mb-5 font-body text-sm font-semibold uppercase tracking-[0.16em] text-accent">
//               Get in Touch
//             </span>

//             <h2 className="mb-6 font-display text-[clamp(44px,4.5vw,64px)] font-bold uppercase leading-[0.95]">
//               Let's Connect
//             </h2>

//             <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
//               Have an engineering opportunity, a project to discuss,
//               or an idea to share? I'd be glad to hear from you.
//             </p>
//           </div>

//           {/* Right Contact Cards */}
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//             {contactLinks.map((item) => {
//               const Icon = item.icon

//               return (
//                 <a
//                   key={item.title}
//                   href={item.href}
//                   target={item.title === 'Email' ? undefined : '_blank'}
//                   rel={
//                     item.title === 'Email'
//                       ? undefined
//                       : 'noopener noreferrer'
//                   }
//                   aria-label={`Connect via ${item.title}`}
//                   className="block h-full"
//                 >
//                   <TiltCard
//                     max={5}
//                     className="tilt-slide group h-full overflow-hidden rounded-2xl border border-line bg-card"
//                   >
//                     <article className="flex min-h-[155px] h-full flex-col justify-between gap-4 p-6 transition-colors duration-300 group-hover:bg-tile sm:p-6">

//                       {/* Icon */}
//                       <div className="flex h-9 w-9 shrink-0 items-center justify-start text-accent [&_svg]:!h-8 [&_svg]:!w-8 [&_svg]:!max-h-8 [&_svg]:!max-w-8">
//                         <Icon
//                           size={32}
//                           strokeWidth={2}
//                           className="shrink-0 transition-transform duration-300 group-hover:scale-110"
//                         />
//                       </div>

//                       {/* Text */}
//                       <div>
//                         <h3 className="mb-1.5 font-body text-lg font-semibold text-fg transition-colors duration-300 group-hover:text-accent sm:text-xl">
//                           {item.title}
//                           <span className="ml-1.5 text-base">↗</span>
//                         </h3>

//                         <p className="font-body text-sm leading-relaxed text-muted sm:text-base">
//                           {item.description}
//                         </p>
//                       </div>

//                     </article>
//                   </TiltCard>
//                 </a>
//               )
//             })}
//           </div>

//         </div>
//       </Container>
//     </section>
//   )
// }


// 2nd improvised code
// import Container from '../ui/Container'
// import TiltCard from '../ui/TiltCard'
// // ⚠ change this path to wherever your scroll-animation file lives
// import { ScrollCard, ScrollText } from '../ui/ScrollMotion'
// import { Mail, MessageCircle } from 'lucide-react'
// import { socials } from '../../data/socials'

// const contactLinks = [
//   {
//     title: 'Email',
//     description: 'Send me an email',
//     href: 'mailto:YOUR_EMAIL@example.com',
//     icon: Mail,
//   },
//   {
//     title: 'WhatsApp',
//     description: 'Start a conversation',
//     href: 'https://wa.me/YOUR_PHONE_NUMBER',
//     icon: MessageCircle,
//   },
//   ...socials
//     .filter((social) => ['LinkedIn', 'GitHub'].includes(social.label))
//     .map((social) => ({
//       title: social.label,
//       description:
//         social.label === 'LinkedIn'
//           ? 'Connect professionally'
//           : 'Explore my work',
//       href: social.href,
//       icon: social.icon,
//     })),
// ]

// export default function Contact() {
//   return (
//     <section id="contact" className="pt-20 pb-32">
//       <Container>
//         <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">

//           {/* Left Content */}
//           <div className="flex flex-col items-start">
//             <span className="mb-5 font-body text-sm font-semibold uppercase tracking-[0.16em] text-accent">
//               Get in Touch
//             </span>

//             <h2 className="mb-6 font-display text-[clamp(44px,4.5vw,64px)] font-bold uppercase leading-[0.95]">
//               Let's Connect
//             </h2>

//             {/* paragraph: slides up and fades in with scroll */}
//             <ScrollText>
//               <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
//                 Have an engineering opportunity, a project to discuss,
//                 or an idea to share? I'd be glad to hear from you.
//               </p>
//             </ScrollText>
//           </div>

//           {/* Right Contact Cards */}
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//             {contactLinks.map((item, i) => {
//               const Icon = item.icon

//               return (
//                 // order = column position, so the two cards in a row land one after the other
//                 <ScrollCard key={item.title} order={i % 2} className="h-full">
//                   <a
//                     href={item.href}
//                     target={item.title === 'Email' ? undefined : '_blank'}
//                     rel={item.title === 'Email' ? undefined : 'noopener noreferrer'}
//                     aria-label={`Connect via ${item.title}`}
//                     className="block h-full"
//                   >
//                     <TiltCard
//                       max={5}
//                       className="tilt-slide group h-full overflow-hidden rounded-2xl border border-line bg-card"
//                     >
//                       <article className="flex min-h-[155px] h-full flex-col justify-between gap-4 p-6 transition-colors duration-300 group-hover:bg-tile sm:p-6">

//                         {/* Icon */}
//                         <div className="flex h-9 w-9 shrink-0 items-center justify-start text-accent [&_svg]:!h-8 [&_svg]:!w-8 [&_svg]:!max-h-8 [&_svg]:!max-w-8">
//                           <Icon
//                             size={32}
//                             strokeWidth={2}
//                             className="shrink-0 transition-transform duration-300 group-hover:scale-110"
//                           />
//                         </div>

//                         {/* Text */}
//                         <div>
//                           <h3 className="mb-1.5 font-body text-lg font-semibold text-fg transition-colors duration-300 group-hover:text-accent sm:text-xl">
//                             {item.title}
//                             <span className="ml-1.5 text-base">↗</span>
//                           </h3>

//                           <p className="font-body text-sm leading-relaxed text-muted sm:text-base">
//                             {item.description}
//                           </p>
//                         </div>

//                       </article>
//                     </TiltCard>
//                   </a>
//                 </ScrollCard>
//               )
//             })}
//           </div>

//         </div>
//       </Container>
//     </section>
//   )
// }

// 3rd improvised code
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import Container from '../ui/Container'
import TiltCard from '../ui/TiltCard'
import { Mail, MessageCircle } from 'lucide-react'
import { socials } from '../../data/socials'

/* ---------- one-time motion helpers (local to this file) ---------- */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
// once: true -> plays the first time only, then holds its final state
const VIEW = { once: true, margin: '0px 0px -12% 0px' } as const

// Cards: one after another (slower)
const CARD_STEP = 0.35 // seconds between each card
const CARD_DURATION = 1.4 // how long each card takes to land

// Typewriter (faster)
const PARAGRAPH =
  "Have an engineering opportunity, a project to discuss, or an idea to share? I'd be glad to hear from you."
const TYPE_BASE = 12 // ms per character
const TYPE_JITTER = 16 // random extra 0..16 ms
const TYPE_CURSOR_LINGER = 2000 // ms the cursor stays after typing ends (0 = remove at once)

function RevealCard({ children, index }: { children: ReactNode; index: number }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, VIEW)

  if (reduce) return <div className="h-full">{children}</div>

  return (
    <motion.div
      ref={ref}
      className="h-full"
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: CARD_DURATION, ease: EASE, delay: index * CARD_STEP }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Types the paragraph once, when it first scrolls into view.
 * The untyped part stays in the layout as invisible text, so the paragraph keeps
 * its final size and line breaks from the start (no layout jump).
 */
function TypewriterParagraph({ text, className }: { text: string; className?: string }) {
  const reduce = !!useReducedMotion()
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, VIEW)
  const [count, setCount] = useState(reduce ? text.length : 0)
  const [cursor, setCursor] = useState(false)

  useEffect(() => {
    if (reduce) {
      setCount(text.length)
      return
    }
    if (!inView) return

    setCursor(true)
    let i = 0
    let timer = 0
    const tick = () => {
      i += 1
      setCount(i)
      if (i >= text.length) {
        timer = window.setTimeout(() => setCursor(false), TYPE_CURSOR_LINGER)
        return
      }
      const ch = text[i - 1]
      let delay = TYPE_BASE + Math.random() * TYPE_JITTER
      if (ch === ' ') delay += 10 // tiny pause between words
      if (ch === ',' || ch === '.' || ch === '?') delay += 120 // longer pause at punctuation
      timer = window.setTimeout(tick, delay)
    }
    timer = window.setTimeout(tick, 250)

    return () => window.clearTimeout(timer)
  }, [inView, reduce, text])

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {cursor && (
          <motion.span
            className="relative inline-block h-[1em] w-0 align-[-0.12em]"
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
          >
            <span className="absolute left-[1px] top-0 h-full w-[2px] rounded-full bg-[var(--accent)]" />
          </motion.span>
        )}
        <span className="invisible">{text.slice(count)}</span>
      </span>
    </p>
  )
}

/* ---------- data ---------- */

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

/* ---------- section ---------- */

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

            {/* paragraph: typewriter, plays once when it first appears */}
            <TypewriterParagraph
              text={PARAGRAPH}
              className="max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            />
          </div>

          {/* Right Contact Cards: arrive one by one, then stay */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {contactLinks.map((item, i) => {
              const Icon = item.icon

              return (
                <RevealCard key={item.title} index={i}>
                  <a
                    href={item.href}
                    target={item.title === 'Email' ? undefined : '_blank'}
                    rel={item.title === 'Email' ? undefined : 'noopener noreferrer'}
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
                </RevealCard>
              )
            })}
          </div>

        </div>
      </Container>
    </section>
  )
}