import type { NavItem } from '../../../types'

export default function DockItem({ item, active }: { item: NavItem; active: boolean }) {
  const { id, label, icon: Icon } = item
  return (
    <a href={`#${id}`} className={`dock-item ${active ? 'active' : ''}`} data-label={label} aria-label={label}>
      <span className="dock-icon">
        <Icon />
      </span>
    </a>
  )
}
