import type { NavItem } from '../types'
import { BriefcaseIcon, FileTextIcon, HomeIcon, MailIcon, UserIcon } from '../icons'

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'projects', label: 'Projects', icon: BriefcaseIcon },
  { id: 'research', label: 'Research & Thesis', icon: FileTextIcon },
  { id: 'about', label: 'About', icon: UserIcon },
  { id: 'contact', label: 'Contact', icon: MailIcon },

]

export const cvLink = {
  label: 'Download My CV',
  href: '/cv/Tridib-Chakraborty-CV.pdf',
  fileName: 'Tridib-Chakraborty-CV.pdf', // the name the visitor's browser saves it as
}

export const sectionIds = navItems.map((n) => n.id)
