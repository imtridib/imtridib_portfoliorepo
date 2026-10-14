/**
 * A soft, slowly drifting aurora behind the page. Pure CSS (see the "Aurora" block in index.css),
 * so it needs no JavaScript or canvas and costs almost nothing. Colours switch with dark/light mode.
 */
export default function Aurora({ className = '' }: { className?: string }) {
  return (
    <div className={`aurora ${className}`} aria-hidden="true">
      <span className="aurora-blob a" />
      <span className="aurora-blob b" />
      <span className="aurora-blob c" />
      <span className="aurora-blob d" />
    </div>
  )
}