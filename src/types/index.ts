import type { ComponentType, SVGProps } from 'react'

export type Theme = 'dark' | 'light'
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

export interface NavItem {
  id: string
  label: string
  icon: IconComponent
}

export interface InfoItem {
  label: string
  value: string
}

export interface Project {
  id: string
  title: string
  description: string
  tag?: string
  image?: string
  info: InfoItem[]
  liveUrl?: string
  codeUrl?: string
}

export interface SocialLink {
  label: string
  href: string
  icon: IconComponent
}
