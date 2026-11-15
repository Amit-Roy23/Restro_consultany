"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Visitors who prefer reduced motion get no movement from any animation. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
