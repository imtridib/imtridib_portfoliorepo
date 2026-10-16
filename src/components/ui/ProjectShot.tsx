interface Props {
  image?: string
  title: string
  className?: string
}

/** The screenshot frame. Shows a placeholder until the image file exists. */
export default function ProjectShot({ image, title, className = '' }: Props) {
  return (
    <div
      className={`relative grid place-items-center overflow-hidden border-[var(--shot-border)] bg-[linear-gradient(135deg,var(--shot-a),var(--shot-b))] ${className}`}
    >
      <span className="font-display text-4xl text-line">Screenshot</span>
      {image && (
        <img
          src={image}
          alt={`${title} screenshot`}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      )}
    </div>
  )
}
