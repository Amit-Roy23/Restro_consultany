"use client";

import { type Variants, motion } from "framer-motion";

import { cn } from "@/lib/utils";

const line: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Stacked lines that rise from behind a mask, one after another. The in-view
 * trigger is on the (unclipped) wrapper, so masked lines always animate.
 */
export function LineReveal({
  lines,
  className,
  lastClassName,
}: {
  lines: string[];
  className?: string;
  /** Extra classes for the final line (e.g. accent colour). */
  lastClassName?: string;
}) {
  return (
    <motion.p
      aria-label={lines.join(" ")}
      className={cn("flex flex-col", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
    >
      {lines.map((text, index) => (
        <span
          key={text}
          aria-hidden="true"
          className="-mb-[0.1em] block overflow-hidden pb-[0.1em]"
        >
          <motion.span
            variants={line}
            className={cn("block", index === lines.length - 1 && lastClassName)}
          >
            {text}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
}
