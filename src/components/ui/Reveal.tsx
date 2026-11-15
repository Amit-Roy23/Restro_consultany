"use client";

import { MotionConfig, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useIntro } from "@/components/layout/IntroProvider";

type RevealProps = {
  children: ReactNode;
  /** Delay in seconds — use increasing values for a stagger. */
  delay?: number;
  /** Vertical offset in px the element rises from. */
  y?: number;
  /** Animate when scrolled into view instead of on page load. */
  inView?: boolean;
  className?: string;
};

/**
 * Fade/slide-up entrance. With `reducedMotion="user"`, visitors who prefer
 * reduced motion get no movement (only a quick opacity fade), and the
 * server/client markup stays identical so hydration is clean.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  inView = false,
  className,
}: RevealProps) {
  const { done } = useIntro();
  const transition = { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] as const };
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        {...(inView
          ? {
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.3 },
            }
          : { animate: done ? { opacity: 1, y: 0 } : { opacity: 0, y } })}
        transition={transition}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
