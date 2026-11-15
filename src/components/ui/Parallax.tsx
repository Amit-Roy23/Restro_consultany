"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type ParallaxProps = {
  children: ReactNode;
  /** Pixels travelled up (positive) or down (negative) across the viewport. */
  distance?: number;
  className?: string;
};

/** Gentle scroll parallax for desktop; static on touch screens and reduced motion. */
export function Parallax({ children, distance = 80, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 });
  const y = useTransform(smooth, [0, 1], [distance, -distance]);

  return (
    <motion.div
      ref={ref}
      style={isDesktop && !reduceMotion ? { y } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}
