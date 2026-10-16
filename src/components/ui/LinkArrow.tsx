import type { ReactNode } from 'react'
import { ArrowUpRightIcon } from '../../icons'
import type { IconComponent } from '../../types'

interface Props {
  href: string
  children: ReactNode
  icon?: IconComponent | null
}

export default function LinkArrow({ href, children, icon: Icon = ArrowUpRightIcon }: Props) {
  const external = /^https?:\/\//.test(href) // real web links open in a new tab, in-page links (#about) don't
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="inline-flex items-center gap-1 border-b-2 border-accent pb-0.5 font-body text-base font-bold uppercase leading-6 text-accent"
    >
      {children}
      {Icon && <Icon className="h-6 w-6" />}
    </a>
  )
}
