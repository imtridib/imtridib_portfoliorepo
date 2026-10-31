import { FileTextIcon } from '../../icons'
import type { ResearchPaper } from '../../types'

interface Props {
  paper: ResearchPaper
  className?: string
}

/** Paper figure. Shows a neutral placeholder until the image file exists. The parent needs class "group" for the hover zoom. */
export default function ResearchThumb({ paper, className = '' }: Props) {
  return (
    <div
      className={`relative grid place-items-center overflow-hidden bg-[linear-gradient(135deg,var(--shot-a),var(--shot-b))] ${className}`}
    >
      <FileTextIcon className="h-8 w-8 text-line" />
      {paper.thumbnail && (
        <img
          src={paper.thumbnail}
          alt={`Figure from the paper: ${paper.title}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      )}
    </div>
  )
}
