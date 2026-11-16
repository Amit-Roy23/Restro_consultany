"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ArrowLeft, ArrowRight, Check, MapPin } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { useIntro } from "@/components/layout/IntroProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { type LanguageCode, languages } from "@/i18n/languages";
import { useContent, useLanguage } from "@/i18n/LanguageProvider";
import { getLenis } from "@/lib/smoothScroll";
import { INTRO_KEY } from "@/lib/intro";
import { cn } from "@/lib/utils";

const STEPS = 5;
/** Steps 1–3 move on by themselves after this long (ms). */
const AUTO_ADVANCE = 5200;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

const FLOATING_PHOTOS = [
  {
    src: "/images/creatives/aashirvaad-itc-45.jpg",
    className: "left-[6%] top-[18%] w-40 md:w-52 -rotate-6",
  },
  {
    src: "/images/creatives/the-bhoj-company-72.jpg",
    className: "right-[7%] top-[14%] w-36 md:w-48 rotate-6",
  },
  {
    src: "/images/creatives/oh-calcutta-78.jpg",
    className: "left-[10%] bottom-[14%] w-36 md:w-44 rotate-3",
  },
  {
    src: "/images/creatives/kaftaan-111.jpg",
    className: "right-[9%] bottom-[16%] w-40 md:w-52 -rotate-3",
  },
];

/**
 * Welcome journey shown once per session after the loading screen:
 * 0 language → 1 your idea → 2 635+ projects → 3 cities → 4 budget + CTA.
 * Picking a language switches the whole site to it.
 */
export function WelcomeFlow() {
  const { stage, finish } = useIntro();
  const open = stage === "welcome";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="welcome"
          className="fixed inset-0 z-[90]"
          initial={{ y: "0%" }}
          exit={{
            y: "-100%",
            borderBottomLeftRadius: "40% 12%",
            borderBottomRightRadius: "40% 12%",
          }}
          transition={{ duration: 1.1, ease: EASE_IN_OUT }}
          style={{ overflow: "hidden" }}
        >
          <WelcomeSteps onDone={finish} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function WelcomeSteps({ onDone }: { onDone: () => void }) {
  const { welcome } = useContent();
  const { lang, setLanguage, hasChosen } = useLanguage();
  const reduceMotion = usePrefersReducedMotion();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const dialogRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (next: number) => {
      if (next < 0 || next >= STEPS) return;
      setDirection(next > step ? 1 : -1);
      setStep(next);
    },
    [step],
  );

  const close = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      // storage unavailable
    }
    document.documentElement.classList.remove("is-loading");
    getLenis()?.start();
    window.scrollTo(0, 0);
    onDone();
  }, [onDone]);

  /**
   * "Build my business model". The client will define what this opens;
   * for now it takes the visitor into the website.
   */
  const onBuildModel = close;

  const chooseLanguage = async (code: LanguageCode) => {
    await setLanguage(code);
    setTimeout(() => go(1), 450);
  };

  // Steps 1–3 advance on their own.
  useEffect(() => {
    if (step < 1 || step > 3) return;
    const timer = setTimeout(() => go(step + 1), AUTO_ADVANCE);
    return () => clearTimeout(timer);
  }, [step, go]);

  // Keyboard: ← / → between steps (the language step needs a choice first).
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" && (step > 0 || hasChosen)) go(step + 1);
      if (event.key === "ArrowLeft") go(step - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, go, hasChosen]);

  // Move focus into the dialog when a step appears.
  useEffect(() => {
    const timer = setTimeout(() => {
      dialogRef.current
        ?.querySelector<HTMLElement>("[data-autofocus]")
        ?.focus({ preventScroll: true });
    }, 700);
    return () => clearTimeout(timer);
  }, [step]);

  const canNext = step < STEPS - 1 && (step > 0 || hasChosen);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={welcome.title}
      data-lenis-prevent
      className="grain relative flex h-full flex-col overflow-y-auto bg-background bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(217,120,42,0.13),transparent_70%)]"
    >
      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between gap-4 px-5 pt-5 md:px-10 md:pt-7">
        <div className="flex items-center gap-3">
          <Image
            src="/brand/resto-mark-light.png"
            alt=""
            width={531}
            height={598}
            className="h-9 w-auto"
          />
          <span className="font-display text-lg font-semibold tracking-tight">
            Resto Mate Easy
          </span>
        </div>
        {step > 0 && (
          <button
            type="button"
            onClick={close}
            className="text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            {welcome.skip}
          </button>
        )}
      </div>

      {/* Progress segments */}
      <div className="relative z-10 mt-5 grid grid-cols-5 gap-1.5 px-5 md:px-10">
        {Array.from({ length: STEPS }, (_, index) => (
          <div
            key={index}
            className="h-[3px] overflow-hidden rounded-full bg-foreground/15"
          >
            <motion.div
              key={`${index}-${step}`}
              className="h-full origin-left bg-accent"
              initial={{ scaleX: index < step ? 1 : 0 }}
              animate={{ scaleX: index <= step ? 1 : 0 }}
              transition={
                index === step && step >= 1 && step <= 3
                  ? { duration: AUTO_ADVANCE / 1000, ease: "linear" }
                  : { duration: 0.5, ease: EASE_OUT }
              }
            />
          </div>
        ))}
      </div>

      {/* Food photos drifting around the "idea" step */}
      <AnimatePresence>{step === 1 && <FloatingPhotos key="photos" />}</AnimatePresence>

      {/* Step body */}
      <div className="relative flex flex-1 items-center justify-center px-5 py-10 md:px-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.section
            key={step}
            custom={direction}
            className="relative w-full"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: 60 * direction, filter: "blur(8px)" }
            }
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: -60 * direction, filter: "blur(8px)" }
            }
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            {step === 0 && (
              <LanguageStep current={hasChosen ? lang : null} onChoose={chooseLanguage} />
            )}
            {step === 1 && <IdeaStep />}
            {step === 2 && <ProjectsStep />}
            {step === 3 && <CitiesStep />}
            {step === 4 && <BudgetStep onBuild={onBuildModel} />}
          </motion.section>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div className="relative z-10 flex items-center justify-between gap-4 px-5 pb-6 md:px-10 md:pb-8">
        <button
          type="button"
          onClick={() => go(step - 1)}
          disabled={step === 0}
          className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-0"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {welcome.back}
        </button>
        <span className="font-display text-sm text-muted tabular-nums" aria-live="polite">
          {String(step + 1).padStart(2, "0")} / {String(STEPS).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={() => go(step + 1)}
          disabled={!canNext}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-0"
        >
          {welcome.next}
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Steps                                                              */
/* ------------------------------------------------------------------ */

function Rise({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

/** Step 0 — "Welcome" cycling through every script, then the language grid. */
function LanguageStep({
  current,
  onChoose,
}: {
  current: LanguageCode | null;
  onChoose: (code: LanguageCode) => void;
}) {
  const { welcome } = useContent();
  const [greeting, setGreeting] = useState(0);
  const [picked, setPicked] = useState<LanguageCode | null>(current);

  useEffect(() => {
    const timer = setInterval(
      () => setGreeting((value) => (value + 1) % languages.length),
      1400,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
      <div className="relative h-[1.3em] w-full overflow-hidden font-display text-[clamp(3rem,9vw,6.5rem)] leading-tight font-semibold text-accent">
        <AnimatePresence initial={false}>
          <motion.span
            key={greeting}
            className="absolute inset-x-0 top-0"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            {languages[greeting]?.welcome}
          </motion.span>
        </AnimatePresence>
      </div>
      <Rise delay={0.15}>
        <h2 className="mt-2 text-3xl md:text-5xl">{welcome.title}</h2>
      </Rise>
      <Rise delay={0.25}>
        <p className="mt-4 text-lg text-muted md:text-xl">{welcome.subtitle}</p>
      </Rise>
      <Rise delay={0.35} className="mt-10 w-full">
        <p className="mb-5 eyebrow text-muted">{welcome.chooseLanguage}</p>
        <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {languages.map((language, index) => {
            const selected = picked === language.code;
            return (
              <motion.li
                key={language.code}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.45 + index * 0.04, ease: EASE_OUT }}
              >
                <button
                  type="button"
                  lang={language.code}
                  aria-pressed={selected}
                  onClick={() => {
                    setPicked(language.code);
                    onChoose(language.code);
                  }}
                  className={cn(
                    "group relative flex w-full flex-col items-start gap-1 rounded-xl border px-4 py-3.5 text-left transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5",
                    selected
                      ? "border-accent bg-accent/15"
                      : "border-foreground/12 bg-surface/50 hover:border-accent/60",
                  )}
                >
                  <span className="text-lg font-semibold text-foreground">
                    {language.native}
                  </span>
                  <span className="text-xs text-muted">{language.english}</span>
                  <span
                    className={cn(
                      "absolute top-3 right-3 inline-flex size-5 items-center justify-center rounded-full bg-accent text-accent-foreground transition-[opacity,scale] duration-300",
                      selected ? "scale-100 opacity-100" : "scale-50 opacity-0",
                    )}
                  >
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </Rise>
    </div>
  );
}

function FloatingPhotos() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden md:block"
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      {FLOATING_PHOTOS.map((photo, index) => (
        <motion.div
          key={photo.src}
          className={cn(
            "absolute aspect-square overflow-hidden rounded-xl shadow-2xl",
            photo.className,
          )}
          initial={{ opacity: 0, scale: 0.7, y: 40 }}
          animate={{ opacity: 0.9, scale: 1, y: [0, -14, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 0.5 + index * 0.12 },
            scale: { duration: 0.9, delay: 0.5 + index * 0.12, ease: EASE_OUT },
            y: { duration: 6 + index, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Image src={photo.src} alt="" fill sizes="220px" className="object-cover" />
        </motion.div>
      ))}
    </motion.div>
  );
}

/** Step 1 — the visitor's idea, with food photos drifting around. */
function IdeaStep() {
  const { welcome } = useContent();
  return (
    <div className="relative mx-auto flex min-h-[55vh] max-w-4xl items-center justify-center text-center">
      <div className="relative">
        <Rise>
          <h2
            data-autofocus=""
            tabIndex={-1}
            className="text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[1.05] outline-none"
          >
            {welcome.ideaTitle}
          </h2>
        </Rise>
        <Rise delay={0.2}>
          <p className="mt-6 font-display text-2xl text-accent italic md:text-3xl">
            {welcome.ideaBody}
          </p>
        </Rise>
      </div>
    </div>
  );
}

/** Step 2 — 635+ counting up. */
function ProjectsStep() {
  const { welcome, clientMarquee } = useContent();
  const reduceMotion = usePrefersReducedMotion();
  const count = useMotionValue(reduceMotion ? 635 : 0);
  const rounded = useTransform(count, (value) => Math.round(value).toString());

  useEffect(() => {
    const controls = animate(count, 635, {
      duration: 2.2,
      delay: 0.3,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [count]);

  return (
    <div className="relative mx-auto flex min-h-[55vh] max-w-5xl flex-col items-center justify-center text-center">
      {/* Faint brand names drifting behind */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-[0.06]"
      >
        {clientMarquee.map((row, rowIndex) => (
          <div key={rowIndex} className="flex overflow-hidden">
            <div
              className={cn(
                "flex shrink-0 animate-marquee gap-10 pr-10 font-display text-6xl whitespace-nowrap motion-reduce:animate-none",
                rowIndex % 2 === 1 && "[animation-direction:reverse]",
              )}
            >
              {[...row, ...row].map((name, index) => (
                <span key={index}>{name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <h2 className="relative flex items-start font-display text-[clamp(6rem,22vw,16rem)] leading-none font-bold tracking-[-0.05em] text-foreground">
        <motion.span className="tabular-nums">{rounded}</motion.span>
        <motion.span
          className="mt-[0.12em] ml-[0.05em] text-[0.45em] leading-none text-accent"
          initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 2.1, ease: EASE_OUT }}
        >
          +
        </motion.span>
        <span className="sr-only"> 635+</span>
      </h2>
      <Rise delay={0.4}>
        <p
          data-autofocus=""
          tabIndex={-1}
          className="mt-4 eyebrow text-base text-muted outline-none md:text-lg"
        >
          {welcome.projectsLabel}
        </p>
      </Rise>
    </div>
  );
}

/** Step 3 — the cities, dropping in like map pins. */
function CitiesStep() {
  const { welcome } = useContent();
  return (
    <div className="relative mx-auto flex min-h-[55vh] max-w-5xl flex-col items-center justify-center text-center">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 font-display text-[clamp(8rem,30vw,22rem)] leading-none font-bold tracking-[-0.06em] text-foreground/[0.04] select-none"
      >
        INDIA
      </p>
      <Rise>
        <h2
          data-autofocus=""
          tabIndex={-1}
          className="relative text-[clamp(2.4rem,6vw,5rem)] leading-[1.05] outline-none"
        >
          {welcome.citiesTitle}
        </h2>
      </Rise>
      <ul className="relative mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5">
        {welcome.cities.map((city, index) => (
          <motion.li
            key={city}
            initial={{ opacity: 0, y: -24, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 18,
              delay: 0.35 + index * 0.07,
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-foreground/12 bg-surface/60 py-2 pr-4 pl-3 text-sm text-foreground backdrop-blur"
          >
            <MapPin className="size-3.5 text-accent" aria-hidden="true" />
            {city}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/** Step 4 — budget, business, brand + the call to action. */
function BudgetStep({ onBuild }: { onBuild: () => void }) {
  const { welcome } = useContent();
  return (
    <div className="mx-auto flex min-h-[55vh] max-w-4xl flex-col items-center justify-center text-center">
      <h2 className="flex flex-col font-display text-[clamp(2.8rem,7.5vw,6rem)] leading-[1.02] font-bold tracking-[-0.03em] uppercase">
        {welcome.budgetLines.map((line, index) => (
          <span key={line} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
            <motion.span
              className={cn(
                "block",
                index === welcome.budgetLines.length - 1 && "text-accent",
              )}
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.15 + index * 0.18, ease: EASE_OUT }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h2>
      <Rise delay={0.8}>
        <p className="mt-8 max-w-2xl text-lg text-muted md:text-xl">
          {welcome.budgetBody}
        </p>
      </Rise>
      <Rise delay={1}>
        <Magnetic className="mt-10">
          <button
            type="button"
            data-autofocus=""
            onClick={onBuild}
            className="group inline-flex h-16 items-center gap-3 rounded-full bg-accent px-9 text-base font-semibold tracking-wide text-accent-foreground uppercase shadow-[0_20px_60px_-15px_rgba(217,120,42,0.7)] transition-colors hover:bg-foreground"
          >
            {welcome.buildButton}
            <ArrowRight
              className="size-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </Magnetic>
      </Rise>
    </div>
  );
}
