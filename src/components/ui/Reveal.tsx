"use client";

import { MotionConfig, motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Delay in seconds — use increasing values for a stagger. */
  delay?: number;
  /** Vertical offset in px the element rises from. */
  y?: number;
  className?: string;
};

/**
 * Small fade/slide-up entrance. With `reducedMotion="user"`, visitors who
 * prefer reduced motion get no movement (only a quick opacity fade), and the
 * server/client markup stays identical so hydration is clean.
 */
export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
