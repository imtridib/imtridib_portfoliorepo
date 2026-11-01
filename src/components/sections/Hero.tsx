
// // improvised
// import Button from "../ui/Button";
// import Container from "../ui/Container";
// import SocialLinks from "../ui/SocialLinks";
// import { FileTextIcon } from "../../icons";

// export default function Hero({ onOpenCv }: { onOpenCv: () => void }) {
//   return (
//     // <section id="home" className="flex min-h-[906px] items-center border-b border-line pb-20 pt-[126px]">
//     <section
//       id="home"
//       className="border-b border-line pb-20 pt-[104px] lg:pt-[120px]"
//     >
//       {/* two columns: text (wider) + a smaller portrait */}
//       <Container className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
//         <div className="flex flex-col gap-10">
//           <div>
//             <h1 className="font-display text-[clamp(64px,8vw,101px)] font-normal leading-[0.9]">
//               Hi, I am Tridib Chakraborty.
//             </h1>
//             <p className="mt-2 text-muted">
//               An AI ML & Automation Engineer passionate about building
//               accessible and user friendly websites.
//             </p>
//           </div>
//           {/* <div className="flex items-center gap-4">
//             <Button href="#projects" withDot>My Projects</Button>
//             <SocialLinks round size={26} only={['LinkedIn', 'GitHub']} />
//           </div> */}
//           <div className="flex flex-wrap items-center gap-4">
//             <Button href="#projects" withDot>
//               My Projects
//             </Button>

//             {/* Black button: opens the CV pop-up */}
//             <button
//               type="button"
//               onClick={onOpenCv}
//               aria-haspopup="dialog"
//               style={{
//                 color: "var(--accent)",
//                 borderColor: "var(--accent)",
//               }}
//               className="inline-flex h-[54px] cursor-pointer items-center gap-2 rounded-full border bg-transparent px-6 font-body text-base font-bold uppercase leading-none transition-shadow duration-300 hover:shadow-[0_0_18px_rgba(56,189,248,0.45)] dark:text-white dark:border-white/20"
//             >
//               View CV
//               <FileTextIcon className="h-4 w-4" />
//             </button>

//             <SocialLinks round size={26} only={["LinkedIn", "GitHub"]} />
//           </div>
//         </div>

//         <div className="portrait-in group relative mx-auto w-full max-w-[380px]">
//           {/* This wrapper lifts on hover, so the neon moves together with the card */}
//           <div className="relative transition-transform duration-500 ease-out group-hover:-translate-x-1 group-hover:-translate-y-2">
//             {/* neon layers (behind the card) */}
//             <span className="neon-halo" aria-hidden="true" />
//             <span className="neon-glow" aria-hidden="true" />
//             <span className="neon-ring" aria-hidden="true" />

//             {/* card */}
//             <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-portrait">
//               <span
//                 className="absolute inset-0 grid place-items-center font-display text-[110px] leading-none text-black/10"
//                 aria-hidden="true"
//               >
//                 TC
//               </span>

//               <img
//                 src="/images/portrait.png"
//                 alt="Portrait of Tridib Chakraborty"
//                 className="portrait-img absolute inset-0 h-full w-full object-cover object-[50%_15%] origin-[50%_35%] transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
//                 onError={(e) => (e.currentTarget.style.display = "none")}
//               />

//               <span className="portrait-shine" aria-hidden="true" />
//             </div>
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// }


import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Button from "../ui/Button";
import Container from "../ui/Container";
import SocialLinks from "../ui/SocialLinks";
import { FileTextIcon } from "../../icons";

// Expo-out curve: quick start, long soft landing
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Timing (seconds): tweak these to speed up or slow down the two animations
const HEADING_START = 0.2; // delay before the first word
const WORD_STEP = 0.12; // delay between words
const WORD_DURATION = 1.2; // how long each word takes to slide in

// Typewriter (summary)
const SUMMARY =
  "An AI ML & Automation Engineer passionate about building accessible and user friendly websites.";
const TYPE_START = 2.0; // seconds: the heading has fully landed by ~1.9s
const TYPE_BASE = 28; // ms per character, plus a random 0..TYPE_JITTER for a natural rhythm
const TYPE_JITTER = 40;
const TYPE_CURSOR_LINGER = 2500; // ms the blinking cursor stays after typing finishes (0 = remove at once)

/** "Hi, I am Tridib Chakraborty." revealed one word at a time: slide up + fade in. */
function HeadingWords({ text, reduce }: { text: string; reduce: boolean }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { opacity: 0, y: "0.6em" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: WORD_DURATION, delay: HEADING_START + i * WORD_STEP, ease: EASE }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

/**
 * Typewriter for the summary. The untyped part stays in the layout as invisible text and the
 * cursor takes no width, so the paragraph keeps its final size and line breaks from the start.
 */
function TypewriterText({ text, reduce }: { text: string; reduce: boolean }) {
  const [count, setCount] = useState(reduce ? text.length : 0);
  const [cursor, setCursor] = useState(false);

  useEffect(() => {
    if (reduce) {
      setCount(text.length);
      setCursor(false);
      return;
    }
    setCount(0);
    setCursor(false);

    let i = 0;
    let timer = 0;
    const tick = () => {
      i += 1;
      setCount(i);
      if (i >= text.length) {
        timer = window.setTimeout(() => setCursor(false), TYPE_CURSOR_LINGER);
        return;
      }
      const ch = text[i - 1];
      let delay = TYPE_BASE + Math.random() * TYPE_JITTER;
      if (ch === " ") delay += 25; // tiny pause between words
      if (ch === "," || ch === ".") delay += 220; // longer pause at punctuation
      timer = window.setTimeout(tick, delay);
    };
    timer = window.setTimeout(() => {
      setCursor(true);
      tick();
    }, TYPE_START * 1000);

    return () => window.clearTimeout(timer);
  }, [text, reduce]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {cursor && (
          <motion.span
            className="relative inline-block h-[1em] w-0 align-[-0.12em]"
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
          >
            <span className="absolute left-[1px] top-0 h-full w-[2px] rounded-full bg-[var(--accent)]" />
          </motion.span>
        )}
        <span className="invisible">{text.slice(count)}</span>
      </span>
    </>
  );
}

export default function Hero({ onOpenCv }: { onOpenCv: () => void }) {
  const reduce = !!useReducedMotion();

  return (
    // <section id="home" className="flex min-h-[906px] items-center border-b border-line pb-20 pt-[126px]">
    <section
      id="home"
      className="border-b border-line pb-20 pt-[104px] lg:pt-[120px]"
    >
      {/* two columns: text (wider) + a smaller portrait */}
      <Container className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col gap-10">
          <div>
            <h1
              aria-label="Hi, I am Tridib Chakraborty."
              className="font-display text-[clamp(64px,8vw,101px)] font-normal leading-[0.9]"
            >
              <HeadingWords text="Hi, I am Tridib Chakraborty." reduce={reduce} />
            </h1>
            <p className="mt-2 text-muted">
              <TypewriterText text={SUMMARY} reduce={reduce} />
            </p>
          </div>
          {/* <div className="flex items-center gap-4">
            <Button href="#projects" withDot>My Projects</Button>
            <SocialLinks round size={26} only={['LinkedIn', 'GitHub']} />
          </div> */}
          <div className="flex flex-wrap items-center gap-4">
            <Button href="#projects" withDot>
              My Projects
            </Button>

            {/* Black button: opens the CV pop-up */}
            <button
              type="button"
              onClick={onOpenCv}
              aria-haspopup="dialog"
              style={{
                color: "var(--accent)",
                borderColor: "var(--accent)",
              }}
              className="inline-flex h-[54px] cursor-pointer items-center gap-2 rounded-full border bg-transparent px-6 font-body text-base font-bold uppercase leading-none transition-shadow duration-300 hover:shadow-[0_0_18px_rgba(56,189,248,0.45)] dark:text-white dark:border-white/20"
            >
              View CV
              <FileTextIcon className="h-4 w-4" />
            </button>

            <SocialLinks round size={26} only={["LinkedIn", "GitHub"]} />
          </div>
        </div>

        <div className="portrait-in group relative mx-auto w-full max-w-[380px]">
          {/* This wrapper lifts on hover, so the neon moves together with the card */}
          <div className="relative transition-transform duration-500 ease-out group-hover:-translate-x-1 group-hover:-translate-y-2">
            {/* neon layers (behind the card) */}
            <span className="neon-halo" aria-hidden="true" />
            <span className="neon-glow" aria-hidden="true" />
            <span className="neon-ring" aria-hidden="true" />

            {/* card */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-portrait">
              <span
                className="absolute inset-0 grid place-items-center font-display text-[110px] leading-none text-black/10"
                aria-hidden="true"
              >
                TC
              </span>

              <img
                src="/images/portrait.png"
                alt="Portrait of Tridib Chakraborty"
                className="portrait-img absolute inset-0 h-full w-full object-cover object-[50%_15%] origin-[50%_35%] transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />

              <span className="portrait-shine" aria-hidden="true" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}