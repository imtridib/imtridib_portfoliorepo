import type { InfoItem } from '../../types'

export default function InfoList({ items }: { items: InfoItem[] }) {
  return (
    <div>
      <h4 className="mb-4 font-body text-base font-semibold uppercase leading-6">Project info</h4>
      <ul className="border-b border-line">
        {items.map(({ label, value }) => (
          <li key={label} className="flex justify-between gap-2 border-t border-line py-4 font-body text-base font-medium leading-[1.6]">
            <span>{label}</span>
            <span className="text-right text-muted">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
