"use client";

import { type Variants, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useIntro } from "@/components/layout/IntroProvider";

export type RevealSegment = { text: string; accent?: boolean };

type TextRevealProps = {
  /** Plain text, or segments when part of it is highlighted. */
  text?: string;
  segments?: RevealSegment[];
  as?: "h1" | "h2" | "h3" | "p" | "span";
  id?: string;
  className?: string;
  accentClassName?: string;
  /** Split into words (default) or individual letters. */
  by?: "word" | "char";
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
};

const tags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
};

const piece: Variants = {
  hidden: { y: "115%", rotate: 4 },
  visible: {
    y: "0%",
    rotate: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Masked text reveal: each word (or letter) slides up from behind its own
 * clipping line. Screen readers get the full text via aria-label.
 */
export function TextReveal({
  text,
  segments,
  as = "h2",
  id,
  className,
  accentClassName = "text-accent italic",
  by = "word",
  delay = 0,
  stagger,
  immediate = false,
}: TextRevealProps) {
  const { done } = useIntro();
  const Tag = tags[as];
  const parts: RevealSegment[] = segments ?? [{ text: text ?? "" }];
  const label = parts.map((part) => part.text).join("");
  const step = stagger ?? (by === "char" ? 0.035 : 0.07);

  const words = parts.flatMap((part) =>
    part.text
      .split(/(\s+)/)
      .filter(Boolean)
      .map((word) => ({ word, accent: part.accent })),
  );

  return (
    <Tag
      id={id}
      aria-label={label}
      className={className}
      initial="hidden"
      {...(immediate
        ? { animate: done ? "visible" : "hidden" }
        : { whileInView: "visible", viewport: { once: true, amount: 0.5 } })}
      variants={{
        visible: { transition: { staggerChildren: step, delayChildren: delay } },
      }}
    >
      {words.map(({ word, accent }, index) =>
        /^\s+$/.test(word) ? (
          <span key={index} aria-hidden="true">
            {" "}
          </span>
        ) : (
          <span
            key={index}
            aria-hidden="true"
            className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top whitespace-nowrap"
          >
            {by === "char" ? (
              word.split("").map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  variants={piece}
                  className={cn(
                    "inline-block origin-bottom-left",
                    accent && accentClassName,
                  )}
                >
                  {char}
                </motion.span>
              ))
            ) : (
              <motion.span
                variants={piece}
                className={cn(
                  "inline-block origin-bottom-left",
                  accent && accentClassName,
                )}
              >
                {word}
              </motion.span>
            )}
          </span>
        ),
      )}
    </Tag>
  );
}
