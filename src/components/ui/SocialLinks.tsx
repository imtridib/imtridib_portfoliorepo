import { socials } from '../../data/socials'

interface Props {
  round?: boolean
  size?: number
  only?: string[]
  className?: string
}

export default function SocialLinks({ round = false, size = 32, only, className = '' }: Props) {
  const list = only ? socials.filter((s) => only.includes(s.label)) : socials
  return (
    <div className={`flex ${round ? 'gap-4' : 'gap-6'} text-accent ${className}`}>
      {list.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className={`hover:opacity-75 ${round ? 'grid h-[54px] w-[54px] place-items-center rounded-full bg-tile' : ''}`}
        >
          <Icon style={{ width: size, height: size }} />
        </a>
      ))}
    </div>
  )
}
