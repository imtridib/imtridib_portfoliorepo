import type { ReactNode } from 'react'
import { ArrowUpRightIcon } from '../../icons'

interface Props {
  children: ReactNode
  href?: string
  withDot?: boolean
  type?: 'button' | 'submit'
}

export default function Button({ children, href, withDot = false, type = 'button' }: Props) {
  const cls = `group inline-flex items-center gap-3 rounded-full bg-primary font-body text-base font-bold uppercase leading-none text-ink ${
    withDot ? 'py-1.5 pl-6 pr-1.5' : 'px-10 py-5'
  }`

  const content = (
    <>
      {children}
      {withDot && (
        <span className="relative grid h-[42px] w-[42px] place-items-center rounded-full transition-colors group-hover:bg-ink">
          <span className="h-2.5 w-2.5 rounded-full bg-ink transition-opacity group-hover:opacity-0" />
          <ArrowUpRightIcon className="absolute h-4 w-4 text-white opacity-0 transition-opacity group-hover:opacity-100" />
        </span>
      )}
    </>
  )

  return href ? (
    <a href={href} className={cls}>{content}</a>
  ) : (
    <button type={type} className={`${cls} cursor-pointer`}>{content}</button>
  )
}
