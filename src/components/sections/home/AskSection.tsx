"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import { AskForm } from "@/components/ui/AskForm";
import { Container } from "@/components/ui/Container";
import { FloatingDots } from "@/components/ui/FloatingDots";
import { TextReveal } from "@/components/ui/TextReveal";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useContent } from "@/i18n/LanguageProvider";

/**
 * Scroll sequence:
 * 1. "Ask Resto" rises in letter by letter and holds, fully readable.
 * 2. Scrolling on, the frosted question card glides up from below while the
 *    wordmark steps back (scales down, blurs and dims) behind it.
 * Reduced motion: the wordmark and the card are simply stacked.
 */
export function AskSection() {
  const { ask: askContent } = useContent();
  const { title, placeholder, submitLabel, suggestionsLabel, suggestions } = askContent;
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const animate = !reduceMotion;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  // Phase 1 (0 → 0.3): title alone. Phase 2 (0.3 → 0.7): card arrives.
  const titleScale = useTransform(progress, [0.3, 0.7], [1, 0.9]);
  const titleBlur = useTransform(progress, [0.3, 0.7], [0, 10]);
  const titleOpacity = useTransform(progress, [0.3, 0.7], [1, 0.45]);
  const titleFilter = useMotionTemplate`blur(${titleBlur}px)`;

  const cardY = useTransform(progress, [0.28, 0.7], ["75vh", "0vh"]);
  const cardOpacity = useTransform(progress, [0.28, 0.45], [0, 1]);
  const cardScale = useTransform(progress, [0.28, 0.7], [0.9, 1]);
  const cardRotate = useTransform(progress, [0.28, 0.7], [4, 0]);

  const card = (
    <div className="pointer-events-auto mx-auto w-full max-w-xl rounded-[28px] border border-foreground/10 bg-surface/40 p-4 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-6">
      <p className="mb-4 text-center eyebrow text-muted">{suggestionsLabel}</p>
      <ul className="flex flex-col gap-2.5">
        {suggestions.map((suggestion) => (
          <li key={suggestion}>
            <Link
              href={`/contact?q=${encodeURIComponent(suggestion)}`}
              className="block rounded-full border border-foreground/10 bg-background/40 px-6 py-4 text-center text-sm text-foreground/90 transition-[color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              {suggestion}
            </Link>
          </li>
        ))}
      </ul>
      <div className="my-6 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <AskForm
        id="section"
        placeholder={placeholder}
        submitLabel={submitLabel}
        size="lg"
      />
    </div>
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="ask-heading"
      className="relative bg-background"
      style={animate ? { height: "280vh" } : undefined}
    >
      <div
        className={cn(
          "grain overflow-hidden bg-[radial-gradient(ellipse_60%_50%_at_20%_80%,rgba(30,58,110,0.28),transparent_70%),radial-gradient(ellipse_50%_50%_at_85%_20%,rgba(201,164,92,0.16),transparent_70%)]",
          animate ? "sticky top-0 h-svh" : "relative py-28",
        )}
      >
        <FloatingDots />

        <div
          className={cn(
            "flex items-center justify-center px-5",
            animate ? "absolute inset-0" : "relative",
          )}
        >
          <motion.div
            style={
              animate
                ? { scale: titleScale, opacity: titleOpacity, filter: titleFilter }
                : undefined
            }
            className="will-change-transform"
          >
            <TextReveal
              as="h2"
              id="ask-heading"
              text={title}
              by="char"
              stagger={0.05}
              className="text-center font-display text-[clamp(4rem,15vw,14rem)] leading-none font-bold tracking-[-0.05em] text-accent"
            />
          </motion.div>
        </div>

        {animate ? (
          <div className="pointer-events-none absolute inset-0 flex items-center px-5">
            <motion.div
              style={{
                y: cardY,
                opacity: cardOpacity,
                scale: cardScale,
                rotate: cardRotate,
              }}
              className="w-full will-change-transform"
            >
              {card}
            </motion.div>
          </div>
        ) : (
          <Container className="relative mt-12">{card}</Container>
        )}
      </div>
    </section>
  );
}
