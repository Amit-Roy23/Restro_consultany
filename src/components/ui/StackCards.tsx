"use client";

import {
  type MotionValue,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  type CSSProperties,
  type ReactNode,
  createContext,
  useContext,
  useRef,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const ProgressContext = createContext<MotionValue<number> | null>(null);

/** List of sticky cards; earlier cards shrink and dim as later ones stack on top. */
export function StackList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <ProgressContext.Provider value={scrollYProgress}>
      <ol ref={ref} className={className}>
        {children}
      </ol>
    </ProgressContext.Provider>
  );
}

export function StackCard({
  index,
  total,
  children,
  className,
  style,
}: {
  index: number;
  total: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const progress = useContext(ProgressContext);
  const reduceMotion = usePrefersReducedMotion();
  const zero = useMotionValue(0);
  const source = progress ?? zero;
  const cardsAbove = total - 1 - index;
  const start = index / total;
  const scale = useTransform(source, [start, 1], [1, 1 - cardsAbove * 0.05]);
  const dim = useTransform(source, [start, 1], [0, cardsAbove * 0.12]);
  const animate = Boolean(progress) && !reduceMotion;

  return (
    <li className={className} style={style}>
      <motion.div
        style={animate ? { scale, transformOrigin: "50% 0%" } : undefined}
        className="relative"
      >
        {children}
        {animate && (
          <motion.div
            aria-hidden="true"
            style={{ opacity: dim }}
            className="pointer-events-none absolute inset-0 rounded-lg bg-background"
          />
        )}
      </motion.div>
    </li>
  );
}
