import { motion, useInView, useReducedMotion, type HTMLMotionProps } from 'motion/react'
import { useRef, type ReactNode } from 'react'

// Expo-out style curve: fast start, long soft landing (the "Locomotive / Cuberto" feel)
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// One knob for overall pace: 1 = original, higher = slower and smoother
export const SLOW = 1.5

// Fires slightly before the element is fully on screen, once only
const VIEWPORT = { once: true, amount: 0.15, margin: '0px 0px -8% 0px' } as const

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'children' | 'transition'> {
  children: ReactNode
  /** seconds before starting; use it to stagger siblings */
  delay?: number
  /** start offset in px (slides up into place) */
  y?: number
  /** start scale (1 = none) */
  scale?: number
  /** start blur in px (0 = no blur, cheaper for text) */
  blur?: number
  duration?: number
}


export function Reveal({
  children,
  className,
  delay = 0,
  y = 48,
  scale = 0.96,
  blur = 10,
  duration = 0.9,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale, ...(blur ? { filter: `blur(${blur}px)` } : {}) }}
      whileInView={{ opacity: 1, y: 0, scale: 1, ...(blur ? { filter: 'blur(0px)' } : {}) }}
      viewport={VIEWPORT}
      transition={{ duration: duration * SLOW, delay: delay * SLOW, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Text variant: small slide-up + opacity only (no blur, no scale). */
export function RevealText({ y = 22, duration = 0.7, ...props }: RevealProps) {
  return <Reveal y={y} scale={1} blur={0} duration={duration} {...props} />
}


export function ImageReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  // The observed wrapper is never clipped, so scroll detection always works.
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15, margin: '0px 0px -8% 0px' })

  if (reduce) return <div className={className}>{children}</div>

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="h-full w-full"
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={inView ? { clipPath: 'inset(0 0 0% 0)' } : undefined}
        transition={{ duration: 1.1 * SLOW, delay: delay * SLOW, ease: EASE }}
      >
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.25 }}
          animate={inView ? { scale: 1 } : undefined}
          transition={{ duration: 1.5 * SLOW, delay: delay * SLOW, ease: EASE }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}


export function HeadlineReveal({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3, margin: '0px 0px -8% 0px' })

  if (reduce) return <span className={className}>{text}</span>

  const words = text.split(' ')
  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          {/* mask: padding/negative margin keeps descenders (g, y, p) from being clipped */}
          <span className="inline-block overflow-hidden pb-[0.15em] -mb-[0.15em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              animate={inView ? { y: '0%', opacity: 1 } : undefined}
              transition={{ duration: 1.1 * SLOW, delay: (delay + i * 0.08) * SLOW, ease: EASE }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}
