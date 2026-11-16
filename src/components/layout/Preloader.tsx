"use client";

import {
  type MotionValue,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";

import { useIntro } from "@/components/layout/IntroProvider";
import { siteConfig } from "@/config/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useContent } from "@/i18n/LanguageProvider";

type Stage = "drawing" | "reveal" | "split";

const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * First-visit loading screen (once per browser session), built on the
 * cloche from the logo:
 * 1. The cloche draws itself in a fine line — the drawing is the progress.
 * 2. Steam rises while the page finishes loading (capped at 4 s).
 * 3. The cloche lifts away, revealing the "Resto" wordmark on the plate.
 * 4. The plate line stretches across the screen and the screen splits open
 *    along it (top half up, bottom half down) to reveal the site.
 */
export function Preloader() {
  const { intro: introContent } = useContent();
  const { finish, showWelcome } = useIntro();
  const reduceMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);
  const [stage, setStage] = useState<Stage>("drawing");

  const progress = useMotionValue(0);
  const seamProgress = useTransform(progress, [0, 1], [0, 0.32]);

  useEffect(() => {
    // Already played this session: the inline <head> script set the flag and
    // CSS keeps the loader hidden, so just release the entrance animations.
    if (document.documentElement.dataset.intro === "seen") {
      finish();
      return;
    }

    window.scrollTo(0, 0);
    document.documentElement.classList.add("is-loading");
    const timers: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;
    const wait = (ms: number) =>
      new Promise<void>((resolve) => timers.push(setTimeout(resolve, ms)));

    const pageLoaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });

    const run = async () => {
      await animate(progress, 0.85, { duration: 1.5, ease: [0.33, 1, 0.68, 1] });
      await Promise.race([pageLoaded, wait(4000)]);
      await animate(progress, 1, { duration: 0.35, ease: "easeOut" });
      if (cancelled) return;

      setStage("reveal");
      await wait(1150);
      if (cancelled) return;

      setStage("split");
      showWelcome(); // the welcome journey renders underneath and is revealed by the split
      await wait(420);
      await wait(1100);
      if (!cancelled) setVisible(false);
    };
    run();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [progress, finish, showWelcome]);

  if (!visible) return null;

  const splitting = stage === "split";
  const halfTransition = { duration: 1, delay: 0.4, ease: EASE_IN_OUT };

  return (
    <div
      className="preloader fixed inset-0 z-[100] overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label={introContent.loadingLabel}
    >
      {/* Top half: cloche + wordmark sitting on the seam */}
      <motion.div
        aria-hidden="true"
        className="grain absolute inset-x-0 top-0 flex h-1/2 items-end justify-center bg-background bg-[radial-gradient(ellipse_55%_70%_at_50%_100%,rgba(217,120,42,0.16),transparent_70%)]"
        animate={splitting && !reduceMotion ? { y: "-100%" } : { y: "0%" }}
        transition={halfTransition}
      >
        <div className="relative h-[min(40vh,320px)] w-[min(88vw,600px)]">
          <Cloche progress={progress} stage={stage} reduceMotion={reduceMotion} />
          <Wordmark show={stage !== "drawing"} />
        </div>
      </motion.div>

      {/* Bottom half: subtitle under the seam */}
      <motion.div
        aria-hidden="true"
        className="grain absolute inset-x-0 bottom-0 flex h-1/2 flex-col items-center bg-background bg-[radial-gradient(ellipse_55%_70%_at_50%_0%,rgba(217,120,42,0.16),transparent_70%)] pt-6 md:pt-8"
        animate={splitting && !reduceMotion ? { y: "100%" } : { y: "0%" }}
        transition={halfTransition}
      >
        <motion.p
          className="font-sans text-sm font-medium tracking-[0.6em] text-foreground uppercase md:text-base"
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={
            stage === "drawing"
              ? { opacity: 0, letterSpacing: "0.2em" }
              : { opacity: 1, letterSpacing: "0.6em" }
          }
          transition={{ duration: 1.1, delay: 0.35, ease: EASE_OUT }}
        >
          {siteConfig.logoLines[1]}
        </motion.p>
        <motion.p
          className="mt-4 eyebrow text-muted"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
        >
          {introContent.tagline}
        </motion.p>
      </motion.div>

      {/* The seam: grows with loading progress… */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 h-px origin-center bg-accent"
        style={{ scaleX: seamProgress }}
        animate={{ opacity: splitting ? 0 : 1 }}
        transition={{ duration: 0.3, delay: 0.45 }}
      />
      {/* …then a second line sweeps across the full width right before the split */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 h-px origin-center bg-accent"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={
          splitting ? { scaleX: 1, opacity: [1, 1, 0] } : { scaleX: 0, opacity: 1 }
        }
        transition={{
          scaleX: { duration: 0.45, ease: EASE_IN_OUT },
          opacity: { duration: 1.2, times: [0, 0.55, 1] },
        }}
      />

      {reduceMotion && splitting && (
        <motion.div
          className="absolute inset-0 bg-background"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      )}
    </div>
  );
}

/** Line-drawn cloche from the logo; lifts off once loading completes. */
function Cloche({
  progress,
  stage,
  reduceMotion,
}: {
  progress: MotionValue<number>;
  stage: Stage;
  reduceMotion: boolean;
}) {
  const dome = useTransform(progress, [0, 0.75], [0, 1]);
  const handle = useTransform(progress, [0.55, 0.85], [0, 1]);
  const shine = useTransform(progress, [0.7, 1], [0, 1]);
  const lifted = stage !== "drawing";

  return (
    <motion.svg
      viewBox="0 0 200 112"
      fill="none"
      className="absolute inset-x-0 bottom-0 mx-auto w-[78%] overflow-visible text-accent"
      initial={false}
      animate={
        lifted
          ? reduceMotion
            ? { opacity: 0 }
            : { y: "-55%", x: "18%", rotate: 14, opacity: 0 }
          : { y: "0%", x: "0%", rotate: 0, opacity: 1 }
      }
      transition={{ duration: 0.9, ease: EASE_IN_OUT }}
      style={{ transformOrigin: "85% 100%" }}
    >
      {/* Steam (loops while waiting) */}
      {!lifted &&
        [80, 100, 120].map((x, index) => (
          <motion.path
            key={x}
            d={`M${x} 18 C${x - 6} 10 ${x + 6} 4 ${x} -6`}
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0, y: 6 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0, 0.8, 0], y: [6, 0, -8] }}
            transition={{
              duration: 1.6,
              delay: 1.1 + index * 0.25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      {/* Handle */}
      <motion.path
        d="M100 32 V25 M94 25 H106 M96 25 a4 4 0 0 1 8 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ pathLength: handle }}
      />
      {/* Dome */}
      <motion.path
        d="M18 106 C18 60 54 32 100 32 C146 32 182 60 182 106"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ pathLength: dome }}
      />
      {/* Shine */}
      <motion.path
        d="M44 88 C48 68 62 54 80 47"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.6}
        style={{ pathLength: shine }}
      />
      {/* Rim */}
      <motion.path
        d="M8 106 H192"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ pathLength: dome }}
      />
    </motion.svg>
  );
}

/** "Resto" rising letter by letter from the plate once the cloche lifts. */
function Wordmark({ show }: { show: boolean }) {
  const word = siteConfig.logoLines[0] ?? siteConfig.name;
  return (
    <p className="absolute inset-x-0 bottom-0 flex justify-center overflow-hidden pb-1 font-display text-[clamp(5rem,17vw,11rem)] leading-[0.9] font-bold tracking-[-0.045em] text-accent">
      {word.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: "105%" }}
          animate={{ y: show ? "0%" : "105%" }}
          transition={{ duration: 0.9, delay: 0.25 + index * 0.06, ease: EASE_OUT }}
        >
          {char}
        </motion.span>
      ))}
    </p>
  );
}
