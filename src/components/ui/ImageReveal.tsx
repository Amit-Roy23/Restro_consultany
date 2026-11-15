"use client";

import { type Variants, motion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const curtain: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: { clipPath: "inset(0% 0% 0% 0%)" },
};

const settle: Variants = {
  hidden: { scale: 1.25 },
  visible: { scale: 1 },
};

/**
 * Curtain reveal for images: the frame wipes open from the bottom while the
 * picture inside settles from a slight zoom.
 *
 * The in-view check sits on an unclipped outer wrapper — a fully clipped
 * element never counts as "visible" to IntersectionObserver.
 */
export function ImageReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={cn("relative", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.div
        variants={curtain}
        transition={{ duration: reduceMotion ? 0 : 1.3, delay, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 overflow-hidden rounded-[inherit]"
      >
        <motion.div
          variants={settle}
          transition={{
            duration: reduceMotion ? 0 : 1.8,
            delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative h-full w-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
