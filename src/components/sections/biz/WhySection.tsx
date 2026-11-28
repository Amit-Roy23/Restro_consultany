"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useContent } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

/** Sticker styling per card: tilt + colourway. */
const STICKERS = [
  { rotate: -2.5, tone: "bg-background text-foreground", span: "lg:col-span-2" },
  { rotate: 2, tone: "bg-accent text-accent-foreground", span: "" },
  { rotate: -1.5, tone: "bg-white text-background", span: "" },
  { rotate: 1.5, tone: "bg-white text-background", span: "" },
  { rotate: -2, tone: "bg-[#13244a] text-foreground", span: "" },
  { rotate: 2.5, tone: "bg-background text-foreground", span: "" },
  { rotate: -1, tone: "bg-accent text-accent-foreground", span: "" },
];

/** "Why Resto Consultancy?" — playful sticker cards and a 99 → 1 problem counter. */
export function WhySection({ number = 6 }: { number?: number }) {
  const { biz } = useContent();
  const { why } = biz;

  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="relative overflow-hidden bg-foreground py-24 text-background md:py-32"
    >
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <SectionLabel number={number} tone="light">
              {why.label}
            </SectionLabel>
            <TextReveal
              id="why-heading"
              text={`${why.title} 🤣`}
              className="mt-6 text-4xl md:text-6xl"
            />
          </div>
          <ProblemCounter label={why.problemsLeft} />
        </div>

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {why.items.map((item, index) => {
            const sticker = STICKERS[index % STICKERS.length]!;
            return (
              <motion.li
                key={item.title}
                className={cn(sticker.span)}
                initial={{ opacity: 0, y: 70, rotate: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, rotate: sticker.rotate, scale: 1 }}
                whileHover={{ rotate: 0, scale: 1.03, y: -6 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                  delay: (index % 4) * 0.08,
                }}
              >
                <article
                  className={cn(
                    "group flex h-full flex-col gap-4 rounded-2xl p-7 shadow-[0_25px_50px_-25px_rgba(6,12,26,0.6)]",
                    sticker.tone,
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="inline-block origin-bottom text-5xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12"
                  >
                    {item.emoji}
                  </span>
                  <h3 className="text-2xl leading-tight md:text-[1.7rem]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-80 md:text-base">
                    {item.body}
                  </p>
                </article>
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

/** Counts down from 99 to 1 when it comes into view. */
function ProblemCounter({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduceMotion = usePrefersReducedMotion();
  const value = useMotionValue(99);
  const text = useTransform(value, (current) => String(Math.round(current)));

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      value.set(1);
      return;
    }
    const controls = animate(value, 1, { duration: 2.6, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return (
    <div
      ref={ref}
      className="flex shrink-0 items-center gap-4 self-start rounded-2xl border border-background/15 bg-paper px-6 py-4 lg:self-end"
    >
      <motion.span className="font-display text-6xl leading-none font-bold text-accent-deep tabular-nums">
        {text}
      </motion.span>
      <span className="max-w-[7rem] eyebrow text-ink-muted">{label}</span>
    </div>
  );
}
