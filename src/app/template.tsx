"use client";

import { motion } from "framer-motion";
import { type ReactNode, useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** True only for the very first render, so the initial page isn't hidden. */
let firstLoad = true;

/** Soft fade-and-rise when navigating between pages. */
export default function Template({ children }: { children: ReactNode }) {
  const reduceMotion = usePrefersReducedMotion();
  const animateIn = !firstLoad && !reduceMotion;

  useEffect(() => {
    firstLoad = false;
  }, []);

  return (
    <motion.div
      initial={animateIn ? { opacity: 0, y: 24 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
