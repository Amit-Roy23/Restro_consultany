"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Languages, MessageCircle } from "lucide-react";
import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

import { useIntro } from "@/components/layout/IntroProvider";
import {
  type LeadMode,
  LeadDialog,
  openLeadDialog,
} from "@/components/sections/home/LeadDialog";
import { Magnetic } from "@/components/ui/Magnetic";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useContent } from "@/i18n/LanguageProvider";
import { languages } from "@/i18n/languages";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * First screen: a "grand entrance" — champagne-gold Art Deco sunburst and
 * arch over deep espresso, drifting candle-light and gold dust. No photos,
 * so it reads the same on laptop and phone. Two calls to action open the
 * project / free-consultation dialog, and a rotating line says which
 * languages the team consults in.
 */
export function Hero() {
  const { hero, biz } = useContent();
  const { lead } = biz;
  const { done } = useIntro();
  const reduceMotion = usePrefersReducedMotion();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mode, setMode] = useState<LeadMode>("consult");

  const open = (next: LeadMode) => {
    // Render the right form before the dialog appears.
    flushSync(() => setMode(next));
    openLeadDialog(dialogRef.current);
  };

  // Entrance choreography, held until the intro has finished.
  const show = (delay: number, y = 24) => ({
    initial: reduceMotion ? false : { opacity: 0, y },
    animate: done ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1.1, delay, ease: EASE },
  });

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-background"
    >
      <Backdrop play={done} reduceMotion={reduceMotion} />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-[calc(var(--nav-height)+0.5rem)] pb-6 text-center md:px-10 md:pt-[calc(var(--nav-height)+1rem)]">
        {/* Crest */}
        <motion.div
          {...show(0.05, 12)}
          className="relative grid size-12 place-items-center md:size-16"
        >
          <span className="absolute inset-0 rounded-full border border-gold/50" />
          <span className="absolute -inset-2 rounded-full border border-dashed border-gold/25 motion-safe:animate-[spin_40s_linear_infinite]" />
          <span className="absolute inset-0 rounded-full bg-gold/10 blur-xl" />
          <Image
            src="/brand/resto-mark-light.png"
            alt=""
            width={531}
            height={598}
            preload
            className="relative h-6 w-auto md:h-8"
          />
        </motion.div>

        <motion.p
          {...show(0.15, 12)}
          className="mt-5 flex items-center gap-3 eyebrow text-[0.62rem] text-gold md:text-xs"
        >
          <span aria-hidden="true" className="hidden h-px w-10 bg-gold/60 md:block" />
          {hero.eyebrow}
          <span aria-hidden="true" className="hidden h-px w-10 bg-gold/60 md:block" />
        </motion.p>

        <motion.h1
          id="hero-heading"
          aria-label={hero.headline
            .map((line) => line.map((part) => part.text).join(""))
            .join(" ")}
          className="mt-4 max-w-[16ch] font-display text-[clamp(2.15rem,1.2rem+4.6vw,5.25rem)] leading-[1.02] font-semibold tracking-[-0.03em] sm:max-w-none"
          initial={reduceMotion ? false : "hidden"}
          animate={done ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
          }}
        >
          {hero.headline.map((line, lineIndex) => (
            <span
              key={lineIndex}
              aria-hidden="true"
              className="reveal-mask -mb-[0.1em] block overflow-hidden pb-[0.1em]"
            >
              <motion.span
                className="block"
                variants={{
                  hidden: { y: "110%" },
                  visible: { y: "0%", transition: { duration: 1.3, ease: EASE } },
                }}
              >
                {line.map((segment, segmentIndex) =>
                  segment.accent ? (
                    <em
                      key={segmentIndex}
                      className="bg-gradient-to-r from-gold via-[#f1d7a6] to-accent bg-clip-text text-transparent italic"
                    >
                      {segment.text}
                    </em>
                  ) : (
                    <span key={segmentIndex}>{segment.text}</span>
                  ),
                )}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          {...show(0.65)}
          className="mt-5 max-w-2xl text-[0.95rem] text-pretty text-foreground/70 md:text-lg"
        >
          {hero.description}
        </motion.p>

        {/* Calls to action */}
        <motion.div
          {...show(0.8)}
          className="mt-7 flex w-full max-w-md flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row"
        >
          <Magnetic className="w-full sm:w-auto">
            <button
              type="button"
              onClick={() => open("project")}
              className="group relative inline-flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-accent px-8 font-semibold text-accent-foreground shadow-[0_18px_40px_-14px_rgba(217,120,42,0.7)] transition-colors hover:bg-foreground sm:w-auto"
            >
              {/* light sweep */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 -left-1/2 w-1/3 bg-white/35 blur-md motion-safe:animate-[sweep_4.5s_ease-in-out_2s_infinite]"
              />
              <span className="relative">{lead.startProject}</span>
              <ArrowRight
                className="relative size-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </Magnetic>
          <button
            type="button"
            onClick={() => open("consult")}
            className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-full border border-gold/60 bg-background/40 px-8 font-semibold text-foreground backdrop-blur-md transition-colors hover:border-gold hover:bg-gold hover:text-background sm:w-auto"
          >
            <span className="relative flex size-2.5">
              <span className="absolute inset-0 rounded-full bg-gold motion-safe:animate-ping" />
              <span className="relative size-2.5 rounded-full bg-gold group-hover:bg-background" />
            </span>
            {lead.freeConsultation}
            <MessageCircle className="size-5" aria-hidden="true" />
          </button>
        </motion.div>

        {/* Languages we consult in */}
        <motion.div {...show(0.95)} className="mt-6 flex flex-col items-center gap-2">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-foreground/10 bg-background/50 py-2 pr-5 pl-3 text-sm text-foreground/85 backdrop-blur-md">
            <span className="grid size-7 place-items-center rounded-full bg-gold/15 text-gold">
              <Languages className="size-4" aria-hidden="true" />
            </span>
            <span>{lead.languagesLead}</span>
            <RotatingLanguage play={done && !reduceMotion} />
          </p>
          <p className="max-w-sm text-xs text-muted">{lead.languagesNote}</p>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.dl
        {...show(1.1, 16)}
        className="relative z-10 mx-auto mb-7 grid w-[min(34rem,calc(100%-3rem))] grid-cols-3 border-t border-gold/20 md:mb-10"
      >
        {hero.stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col-reverse items-center gap-0.5 pt-3"
          >
            <dt className="eyebrow text-[0.65rem] text-muted">{stat.label}</dt>
            <dd className="font-display text-2xl font-semibold text-foreground md:text-3xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </motion.dl>

      <LeadDialog dialogRef={dialogRef} mode={mode} />
    </section>
  );
}

/** Cycles through the languages' own names; width is reserved for the longest. */
function RotatingLanguage({ play }: { play: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!play) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % languages.length),
      2200,
    );
    return () => window.clearInterval(timer);
  }, [play]);

  const current = languages[index]!;

  return (
    <>
      <span className="sr-only">{languages.map((item) => item.native).join(", ")}</span>
      <span
        aria-hidden="true"
        className="relative inline-grid overflow-hidden text-center font-semibold text-gold"
      >
        {/* Invisible copies hold the width of the longest name. */}
        {languages.map((item) => (
          <span key={item.code} className="invisible col-start-1 row-start-1">
            {item.native}
          </span>
        ))}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={current.code}
            className="col-start-1 row-start-1"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {current.native}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Backdrop                                                            */
/* ------------------------------------------------------------------ */

/** Sunburst rays fanning down from above the top edge. */
const RAYS = Array.from({ length: 29 }, (_, i) => {
  const angle = ((14 + (i * 152) / 28) * Math.PI) / 180;
  return {
    x: Math.round(500 + Math.cos(angle) * 1500),
    y: Math.round(-120 + Math.sin(angle) * 1500),
    strong: i % 2 === 0,
  };
});

/** Fixed positions for the gold dust (deterministic: no hydration mismatch). */
const DUST = [
  { left: "8%", bottom: "6%", size: 3, duration: 16, delay: 0, sway: 18 },
  { left: "16%", bottom: "22%", size: 2, duration: 12, delay: 4, sway: -14 },
  { left: "24%", bottom: "4%", size: 2, duration: 18, delay: 7, sway: 22 },
  { left: "33%", bottom: "14%", size: 3, duration: 15, delay: 2, sway: -20 },
  { left: "41%", bottom: "2%", size: 2, duration: 13, delay: 9, sway: 12 },
  { left: "52%", bottom: "10%", size: 2, duration: 17, delay: 5, sway: -16 },
  { left: "60%", bottom: "3%", size: 3, duration: 14, delay: 1, sway: 20 },
  { left: "68%", bottom: "18%", size: 2, duration: 16, delay: 8, sway: -12 },
  { left: "76%", bottom: "7%", size: 3, duration: 12, delay: 3, sway: 16 },
  { left: "84%", bottom: "15%", size: 2, duration: 18, delay: 6, sway: -22 },
  { left: "91%", bottom: "5%", size: 2, duration: 15, delay: 10, sway: 14 },
  { left: "47%", bottom: "26%", size: 2, duration: 13, delay: 11, sway: -10 },
];

/** Diamond ornaments sitting on the frame's corners. */
const CORNERS = [
  "-top-1 -left-1",
  "-top-1 -right-1",
  "-bottom-1 -left-1",
  "-bottom-1 -right-1",
];

function Backdrop({ play, reduceMotion }: { play: boolean; reduceMotion: boolean }) {
  const draw = (delay: number) => ({
    initial: reduceMotion ? false : { pathLength: 0, opacity: 0 },
    animate: play ? { pathLength: 1, opacity: 1 } : undefined,
    transition: { duration: 2.6, delay, ease: [0.65, 0, 0.35, 1] as const },
  });

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {/* Candle-light glows */}
      <div className="absolute -top-[20%] left-1/2 h-[80%] w-[110%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(207,162,94,0.28),transparent)] motion-safe:animate-breathe" />
      <div className="absolute -bottom-[25%] -left-[20%] h-[70%] w-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(217,120,42,0.22),transparent)] [--gx:8%] [--gy:-6%] motion-safe:animate-glow" />
      <div className="absolute -right-[20%] -bottom-[15%] h-[65%] w-[65%] rounded-full bg-[radial-gradient(closest-side,rgba(150,70,35,0.28),transparent)] [--gx:-7%] [--gy:-5%] motion-safe:animate-glow motion-safe:[animation-delay:-9s]" />

      {/* Art Deco sunburst (softer on small screens) */}
      <div className="absolute inset-0 opacity-50 md:opacity-100">
        <motion.svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMin slice"
          className="absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom,black_10%,transparent_78%)]"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.08 }}
          animate={play ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 3, ease: EASE }}
          style={{ transformOrigin: "50% 0%" }}
        >
          <defs>
            <linearGradient id="hero-ray" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f1d7a6" stopOpacity="0.55" />
              <stop offset="1" stopColor="#cfa25e" stopOpacity="0" />
            </linearGradient>
          </defs>
          {RAYS.map((ray, index) => (
            <line
              key={index}
              x1="500"
              y1="-120"
              x2={ray.x}
              y2={ray.y}
              stroke="url(#hero-ray)"
              strokeWidth={ray.strong ? 1.1 : 0.5}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </motion.svg>
      </div>

      {/* Grand arch framing the headline */}
      <svg
        viewBox="0 0 600 1000"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-1/2 h-[88%] w-[min(92vw,760px)] -translate-x-1/2"
      >
        <defs>
          <linearGradient id="hero-arch" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f1d7a6" stopOpacity="0.7" />
            <stop offset="0.7" stopColor="#cfa25e" stopOpacity="0.25" />
            <stop offset="1" stopColor="#cfa25e" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M8 1000 V300 A292 292 0 0 1 592 300 V1000"
          fill="none"
          stroke="url(#hero-arch)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          {...draw(0.2)}
        />
        <motion.path
          d="M30 1000 V306 A270 270 0 0 1 570 306 V1000"
          fill="none"
          stroke="url(#hero-arch)"
          strokeWidth="0.6"
          strokeDasharray="2 6"
          vectorEffect="non-scaling-stroke"
          {...draw(0.5)}
        />
      </svg>

      {/* Gold dust */}
      {!reduceMotion &&
        DUST.map((mote, index) => (
          <span
            key={index}
            className="absolute animate-rise rounded-full bg-[#f1d7a6] opacity-0 shadow-[0_0_8px_2px_rgba(241,215,166,0.45)]"
            style={
              {
                left: mote.left,
                bottom: mote.bottom,
                width: mote.size,
                height: mote.size,
                animationDelay: `${mote.delay}s`,
                "--duration": `${mote.duration}s`,
                "--sway": `${mote.sway}px`,
                "--peak": mote.size > 2 ? 0.85 : 0.55,
              } as CSSProperties
            }
          />
        ))}

      {/* Hairline frame with Deco corners, like a menu card */}
      <div className="absolute inset-3 rounded-[1.25rem] border border-gold/20 md:inset-6 md:rounded-[1.75rem]">
        {CORNERS.map((corner) => (
          <span
            key={corner}
            className={`absolute size-2 rotate-45 border border-gold/60 bg-background ${corner}`}
          />
        ))}
      </div>

      {/* Vignette + film grain */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(10,8,6,0.65))]" />
      <div className="grain absolute inset-0" />
    </div>
  );
}
