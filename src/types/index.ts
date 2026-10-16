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
  /** short text for the grid card (falls back to description, clamped) */
  summary?: string
  tag?: string
  image?: string
  info: InfoItem[]
  /** tech stack, one item per entry, each starting with an emoji: '⚛️ React' */
  stack?: string[]
  liveUrl?: string
  codeUrl?: string
  youtubeUrl?: string
}


export interface SocialLink {
  label: string
  href: string
  icon: IconComponent
}


