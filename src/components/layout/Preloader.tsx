"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useIntro } from "@/components/layout/IntroProvider";
import { siteConfig } from "@/config/site";
import { introContent } from "@/content/intro";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { INTRO_KEY } from "@/lib/intro";

const COLUMNS = 5;
const EASE = [0.76, 0, 0.24, 1] as const;
const RING = 2 * Math.PI * 46;

/**
 * First-visit loading screen (once per browser session).
 * The counter runs to ~85 on a timer, waits for the page's assets to finish
 * loading (capped), completes, then the screen lifts away in staggered
 * columns while the hero animates in underneath.
 */
export function Preloader() {
  const { finish } = useIntro();
  const reduceMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [word, setWord] = useState(0);

  const count = useMotionValue(0);
  const label = useTransform(count, (value) =>
    String(Math.round(value)).padStart(3, "0"),
  );
  const bar = useTransform(count, [0, 100], [0, 1]);
  const ring = useTransform(count, [0, 100], [RING, 0]);

  useEffect(() => {
    // Already played this session: the inline <head> script set the flag and
    // CSS keeps the loader hidden, so just release the entrance animations.
    if (document.documentElement.dataset.intro === "seen") {
      finish();
      return;
    }

    window.scrollTo(0, 0);
    document.documentElement.classList.add("is-loading");
    let cancelled = false;

    const pageLoaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });
    const cap = new Promise<void>((resolve) => setTimeout(resolve, 4000));

    const run = async () => {
      await animate(count, 85, { duration: 1.8, ease: [0.33, 1, 0.68, 1] });
      await Promise.race([pageLoaded, cap]);
      await animate(count, 100, { duration: 0.5, ease: "easeOut" });
      if (cancelled) return;
      setLeaving(true);
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {
        // storage unavailable (private mode) — the intro just plays again
      }
      // Start the hero as the curtain begins to lift.
      setTimeout(() => {
        document.documentElement.classList.remove("is-loading");
        finish();
      }, 450);
      setTimeout(() => setVisible(false), 1400);
    };
    run();

    const ticker = setInterval(
      () => setWord((current) => (current + 1) % introContent.words.length),
      420,
    );

    return () => {
      cancelled = true;
      clearInterval(ticker);
      document.documentElement.classList.remove("is-loading");
    };
  }, [count, finish]);

  if (!visible) return null;

  return (
    <div
      className="preloader fixed inset-0 z-[100]"
      role="status"
      aria-live="polite"
      aria-label={introContent.loadingLabel}
    >
      {/* Curtain columns */}
      <div aria-hidden="true" className="absolute inset-0 flex">
        {Array.from({ length: COLUMNS }, (_, index) => (
          <motion.div
            key={index}
            className="h-full flex-1 border-b-2 border-accent bg-surface"
            style={{ marginRight: -1 }}
            initial={{ y: "0%" }}
            animate={leaving ? { y: reduceMotion ? "0%" : "-100%" } : { y: "0%" }}
            transition={{ duration: 0.9, delay: 0.25 + index * 0.07, ease: EASE }}
          />
        ))}
      </div>
      {reduceMotion && leaving && (
        <motion.div
          className="absolute inset-0 bg-background"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}

      {/* Content */}
      <motion.div
        aria-hidden="true"
        className="grain absolute inset-0 flex flex-col bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(217,120,42,0.14),transparent_70%)]"
        animate={leaving ? { opacity: 0, y: -60 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="flex flex-1 flex-col items-center justify-center gap-8 px-5">
          {/* Logo with progress ring */}
          <div className="relative size-36 md:size-44">
            <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="var(--border)"
                strokeWidth="1"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={RING}
                style={{ strokeDashoffset: ring }}
              />
            </svg>
            <motion.div
              className="absolute inset-[22%]"
              initial={{ clipPath: "inset(100% 0% 0% 0%)", y: 20, rotate: -8 }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", y: 0, rotate: 0 }}
              transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
            >
              <Image
                src="/brand/resto-mark-light.png"
                alt=""
                fill
                sizes="120px"
                preload
                className="object-contain"
              />
            </motion.div>
          </div>

          {/* Wordmark */}
          <p className="flex gap-[0.3em] font-display text-4xl font-bold tracking-[-0.03em] md:text-6xl">
            {siteConfig.logoLines.map((line, lineIndex) => (
              <span
                key={line}
                className="-mb-[0.12em] inline-flex overflow-hidden pb-[0.12em]"
              >
                {line.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    className={lineIndex === 0 ? "text-accent" : "text-foreground"}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.9,
                      delay: 0.45 + lineIndex * 0.2 + charIndex * 0.035,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </p>

          {/* Word ticker */}
          <div className="flex items-center gap-2 eyebrow text-muted">
            <span>{introContent.tickerPrefix}</span>
            <span className="relative inline-block h-5 w-28 overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.span
                  key={word}
                  className="absolute inset-x-0 top-0 leading-5 text-foreground"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {introContent.words[word]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
        </div>

        {/* Footer row: tagline + counter */}
        <div className="flex items-end justify-between gap-6 px-5 pb-8 md:px-10 md:pb-10">
          <p className="max-w-[16rem] eyebrow text-muted">{introContent.tagline}</p>
          <motion.span className="font-display text-6xl leading-none font-semibold tracking-tight text-foreground tabular-nums md:text-8xl">
            {label}
          </motion.span>
        </div>
        <motion.div className="h-[2px] origin-left bg-accent" style={{ scaleX: bar }} />
      </motion.div>
    </div>
  );
}
