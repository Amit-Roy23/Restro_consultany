"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

/**
 * "Buy • Sell • Invest" style word rows: each word rises in, then a highlight
 * travels from word to word while the row is on screen. The in-view trigger
 * sits on the (unclipped) row so masked words always animate.
 */
export function KineticWords({
  words,
  className,
  activeClassName = "text-accent",
}: {
  words: string[];
  className?: string;
  activeClassName?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const reduceMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const timer = setInterval(
      () => setActive((value) => (value + 1) % words.length),
      1100,
    );
    return () => clearInterval(timer);
  }, [inView, reduceMotion, words.length]);

  return (
    <motion.p
      ref={ref}
      aria-label={words.join(" • ")}
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-1 font-display font-semibold",
        className,
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {words.map((word, index) => (
        <span key={word} aria-hidden="true" className="inline-flex items-center gap-x-4">
          {index > 0 && (
            <span className="size-[0.18em] rounded-full bg-current opacity-40" />
          )}
          <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em]">
            <motion.span
              className={cn(
                "inline-block transition-colors duration-500",
                active === index && activeClassName,
              )}
              variants={{
                hidden: { y: "110%" },
                visible: {
                  y: "0%",
                  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
        </span>
      ))}
    </motion.p>
  );
}
