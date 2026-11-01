import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type UseScrollOptions,
} from 'motion/react'
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Scroll-scrubbed motion for the Projects section.
 * Every value is tied to scroll position (no `once`), so scrolling down advances an effect
 * and scrolling up plays it backwards, at any time after the page has loaded.
 */

// Smoothing applied to the raw scroll progress. Lower stiffness = floatier / more cinematic.
const SPRING = { stiffness: 110, damping: 28, mass: 0.5, restDelta: 0.001 }

// Scroll offsets are plain strings like 'start 0.9' (element's start meets 90% down the viewport)
const range = (from: string, to: string) => [from, to] as unknown as UseScrollOptions['offset']

function useProgress(ref: React.RefObject<HTMLElement | null>, offset: UseScrollOptions['offset']) {
  const { scrollYProgress } = useScroll({ target: ref, offset })
  return useSpring(scrollYProgress, SPRING)
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])
  return matches
}

/**
 * Whole card: rises and scales up as it enters; eases back (dims, shrinks slightly) as it leaves.
 * `order` shifts when the card finishes entering, so cards in the same row land one after another.
 * The blur-to-clear is desktop-only (mouse + wide screen) and is switched off completely once
 * the card has landed, so a card can never be left blurred.
 */
export function ScrollCard({
  children,
  className,
  order = 0,
}: {
  children: ReactNode
  className?: string
  order?: number
}) {
  const reduce = useReducedMotion()
  const blurOk = useMediaQuery('(min-width: 1024px) and (hover: hover)')
  const phone = useMediaQuery('(max-width: 767px)')
  const ref = useRef<HTMLDivElement>(null)

  // phones: finish entering earlier (cards are tall there)
  const enter = useProgress(ref, range('start end', `start ${(phone ? 0.85 : 0.62) - order * 0.06}`))
  const exit = useProgress(ref, range('end 0.4', 'end start'))

  const opacity = useTransform([enter, exit], ([a, b]: number[]) => a * (1 - b * 0.65))
  const y = useTransform([enter, exit], ([a, b]: number[]) => (1 - a) * 70 - b * 30)
  const scale = useTransform([enter, exit], ([a, b]: number[]) => (0.94 + 0.06 * a) * (1 - 0.03 * b))
  const filter = useTransform(enter, (a: number) => (a > 0.98 ? 'none' : `blur(${(1 - a) * 8}px)`))

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div ref={ref} className={className} style={blurOk ? { opacity, y, scale, filter } : { opacity, y, scale }}>
      {children}
    </motion.div>
  )
}

/**
 * Text block: slides up and fades in with scroll progress. `order` makes later blocks
 * in the same card start slightly later, so they arrive one after another as you scroll.
 */
export function ScrollText({
  children,
  className,
  order = 0,
  y = 36,
}: {
  children: ReactNode
  className?: string
  order?: number
  y?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const p = useProgress(ref, range(`start ${0.98 - order * 0.05}`, `start ${0.72 - order * 0.05}`))

  const opacity = useTransform(p, [0, 1], [0, 1])
  const offset = useTransform(p, [0, 1], [y, 0])

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div ref={ref} className={className} style={{ opacity, y: offset }}>
      {children}
    </motion.div>
  )
}

function ScrubWord({ word, progress, index, total }: { word: string; progress: MotionValue<number>; index: number; total: number }) {
  // words start staggered across the first 60% of the range, each takes 40%
  const start = (index / Math.max(total, 1)) * 0.6
  const y = useTransform(progress, [start, start + 0.4], ['110%', '0%'])
  const opacity = useTransform(progress, [start, start + 0.4], [0, 1])
  return (
    <span className="inline-block overflow-hidden pb-[0.15em] -mb-[0.15em] align-bottom">
      <motion.span className="inline-block" style={{ y, opacity }}>
        {word}
      </motion.span>
    </span>
  )
}

/** Headline: each word rises out of a mask as you scroll, and sinks back when you scroll up. */
export function ScrollHeadline({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const p = useProgress(ref, range('start 0.95', 'start 0.55'))

  if (reduce) return <span className={className}>{text}</span>

  const words = text.split(' ')
  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          <ScrubWord word={word} progress={p} index={i} total={words.length} />
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}

/**
 * Image frame: the frame wipes open as it enters, then the picture drifts (parallax)
 * and slowly zooms for as long as it is on screen. Scrolling back reverses all of it.
 * Give the parent `overflow-hidden`. Not used for video embeds.
 */
export function ScrollImage({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const reveal = useProgress(ref, range('start 0.98', 'start 0.55'))
  const pass = useProgress(ref, range('start end', 'end start')) // 0 -> 1 while the frame crosses the screen

  const clipPath = useTransform(reveal, [0, 1], ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'])
  // scale stays >= 1.06 so the +-3% drift never shows an empty edge
  const y = useTransform(pass, [0, 1], ['-3%', '3%'])
  const scale = useTransform(pass, [0, 1], [1.06, 1.14])

  if (reduce) return <div className={className}>{children}</div>

  return (
    <div ref={ref} className={className}>
      <motion.div className="h-full w-full" style={{ clipPath }}>
        <motion.div className="h-full w-full" style={{ y, scale }}>
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}

/**
 * A list whose items arrive one after another as the LIST scrolls into view.
 * One scroll tracker for the whole list; each <ScrollItem> just reads a slice of it,
 * so even a long list of chips stays cheap. Fully reversible.
 */
const StaggerContext = createContext<MotionValue<number> | null>(null)

export function ScrollStagger({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLUListElement>(null)
  const p = useProgress(ref, range('start 0.98', 'start 0.5'))

  if (reduce) return <ul className={className}>{children}</ul>

  return (
    <StaggerContext.Provider value={p}>
      <ul ref={ref} className={className}>
        {children}
      </ul>
    </StaggerContext.Provider>
  )
}

function StaggerItem({ progress, index, className, children }: { progress: MotionValue<number>; index: number; className?: string; children: ReactNode }) {
  // item i starts a little after item i-1 (capped so long lists still finish together)
  const start = Math.min(index * 0.05, 0.5)
  const end = start + 0.5
  const opacity = useTransform(progress, [start, end], [0, 1])
  const y = useTransform(progress, [start, end], [24, 0])
  const scale = useTransform(progress, [start, end], [0.9, 1])
  return (
    <motion.div className={className} style={{ opacity, y, scale }}>
      {children}
    </motion.div>
  )
}

/** One item inside <ScrollStagger>. */
export function ScrollItem({ index, className, children }: { index: number; className?: string; children: ReactNode }) {
  const progress = useContext(StaggerContext)
  if (!progress) return <div className={className}>{children}</div>
  return (
    <StaggerItem progress={progress} index={index} className={className}>
      {children}
    </StaggerItem>
  )
}
