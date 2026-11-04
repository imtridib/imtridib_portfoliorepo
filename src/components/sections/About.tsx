import { useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { about } from "../../data/about";
import Container from "../ui/Container";
import TiltCard from "../ui/TiltCard";

/* ---------- one-time reveal helpers (local to this file) ---------- */

const EASE = [0.22, 1, 0.36, 1] as const;
// once: true -> triggers the first time only; margin -> fires when ~10% inside the viewport
const VIEW = { once: true, margin: "0px 0px -10% 0px" } as const;

function RevealText({
  children,
  className,
  order = 0,
}: {
  children: ReactNode;
  className?: string;
  order?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, VIEW);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, ease: EASE, delay: order * 0.12 }}
    >
      {children}
    </motion.div>
  );
}

function RevealCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, VIEW);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 70, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: 0.9, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function RevealHeadline({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, VIEW);

  if (reduce) return <span>{text}</span>;

  const words = text.split(" ");
  return (
    <span ref={ref} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          <span className="inline-block overflow-hidden pb-[0.15em] -mb-[0.15em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: "0%", opacity: 1 } : undefined}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

/* ---------- section ---------- */

export default function About() {
  const { summary, paragraphs, degree, institution } = about;
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <section id="about" className="border-b border-line py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div>
          {/* plain heading: no animation */}
          <h2 className="font-display text-5xl font-normal sm:text-6xl">
            About me
          </h2>

          {/* summary line: words rise one after another, once */}
          <h3 className="mt-7 font-body text-2xl font-medium leading-snug">
            <RevealHeadline text={summary} />
          </h3>

          {/* paragraphs slide in one after another, once */}
          {}
          {/* paragraphs slide in one after another, once */}
          {paragraphs.map((text, i) => (
            <RevealText key={i} order={i + 1} className="mt-5">
              <p
                className="text-muted"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            </RevealText>
          ))}

          {degree && (
            <RevealText order={paragraphs.length + 1} className="mt-7">
              <p className="text-accent">{degree}</p>
            </RevealText>
          )}
        </div>

        {/* university card: rises into place once; keeps the tilt + cursor glow on hover */}
        <RevealCard>
          <TiltCard
            max={5}
            className="rounded-2xl border border-line bg-card p-8"
          >
            <a
              href={institution.url}
              target="_blank"
              rel="noreferrer"
              className="relative z-10 block"
            >
              <div className="rounded-xl bg-white p-5">
                {institution.logo && !logoFailed ? (
                  <img
                    src={institution.logo}
                    alt={`${institution.name} official logo`}
                    className="mx-auto h-auto max-h-44 w-full object-contain"
                    loading="lazy"
                    onError={() => setLogoFailed(true)}
                  />
                ) : (
                  // shown until the logo file exists
                  <p className="py-10 text-center font-body text-xl font-semibold text-black">
                    {institution.name}
                  </p>
                )}
              </div>
              <p className="mt-6 text-center text-sm text-muted">
                {institution.name}
                {institution.department && (
                  <>
                    <br />
                    {institution.department}
                  </>
                )}
              </p>
            </a>
          </TiltCard>
        </RevealCard>
      </Container>
    </section>
  );
}
