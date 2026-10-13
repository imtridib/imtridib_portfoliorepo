import type { FormEvent } from 'react'
import Button from '../ui/Button'
import Container from '../ui/Container'
import SocialLinks from '../ui/SocialLinks'

const field =
  'w-full rounded border border-transparent bg-card px-4 py-3 font-body text-lg text-fg focus:border-accent focus:outline-none'
const label = 'flex w-full flex-col gap-2 font-body text-base font-medium leading-[1.6] text-muted'

export default function Contact() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: send the form data to your backend or a form service
  }

  return (
    <section id="contact" className="pb-[calc(160px_+_env(safe-area-inset-bottom,0px))] pt-20">
      <Container className="flex flex-col gap-16 lg:flex-row lg:gap-6">
        <div className="flex flex-1 flex-col justify-between gap-12">
          <div>
            <h2 className="mb-4 font-display text-[clamp(52px,6vw,76px)] font-normal leading-none">Let’s connect</h2>
            <p className="text-muted">
              Email me at{' '}
              <a href="mailto:hello@example.com" className="border-b border-accent text-fg">hello@example.com</a>
            </p>
            <p className="text-muted">
              or find me on <a href="#" className="border-b border-accent text-fg">LinkedIn</a>
            </p>
            <SocialLinks className="mt-10" />
          </div>
          <small className="font-body text-base font-medium leading-[1.6] text-muted">© 2023 Robert Garcia</small>
        </div>

        <form onSubmit={onSubmit} className="flex flex-1 flex-col items-start gap-6">
          <label className={label}>
            Name
            <input className={field} type="text" name="name" placeholder="John Doe" required />
          </label>
          <label className={label}>
            Email
            <input className={field} type="email" name="email" placeholder="you@example.com" required />
          </label>
          <label className={label}>
            Message
            <textarea className={`${field} min-h-[156px] resize-y`} name="message" placeholder="Say hello" required />
          </label>
          <Button type="submit">Send</Button>
        </form>
      </Container>
    </section>
  )
}
