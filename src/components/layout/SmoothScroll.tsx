"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { setLenis } from "@/lib/smoothScroll";

/**
 * Inertia ("buttery") wheel scrolling for desktop. Touch devices keep native
 * scrolling, and visitors who prefer reduced motion get the browser default.
 * Native scroll position is preserved, so CSS sticky and Framer Motion's
 * useScroll keep working unchanged.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.085,
      wheelMultiplier: 0.9,
      anchors: true,
      stopInertiaOnNavigate: true,
    });
    setLenis(lenis);

    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
