"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Hydration-safe reduced-motion check: `false` on the server and during
 * hydration, then the visitor's real preference. (Framer Motion's
 * useReducedMotion reads it during the first render, which makes the server
 * and client markup disagree.)
 */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
