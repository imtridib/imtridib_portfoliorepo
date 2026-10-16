import type { InfoItem } from '../../types'

interface Props {
  items: InfoItem[]
  /** shown as the last row, wrapping onto 2-3 lines */
  stack?: string[]
}

export default function InfoList({ items, stack }: Props) {
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

        {/* Tech stack: label on top, items flow like a paragraph underneath */}
        {stack && stack.length > 0 && (
          <li className="flex flex-col gap-2 border-t border-line py-4 font-body text-base font-medium leading-[1.6]">
            <span>Tech stack</span>
            <div className="flex flex-wrap gap-x-4 gap-y-1 font-normal text-muted">
              {stack.map((item) => (
                <span key={item} className="whitespace-nowrap">
                  {item}
                </span>
              ))}
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}
