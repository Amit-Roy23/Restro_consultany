"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import Image from "next/image";
import { type PointerEvent, useState } from "react";
import { createPortal } from "react-dom";

import { Reveal } from "@/components/ui/Reveal";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import type { ProjectListItem } from "@/types";

const PREVIEW_W = 340;
const PREVIEW_H = 240;

/**
 * Project rows with a floating photo that follows the cursor. Moving between
 * rows slides a vertical strip of photos to the hovered project (slot-machine
 * style); the frame tilts with the cursor's horizontal speed.
 * Touch screens (no hover) get a small thumbnail in each row instead.
 */
export function HoverImageList({ items }: { items: ProjectListItem[] }) {
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduceMotion = usePrefersReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  // Cursor position (viewport coordinates), smoothed with a spring.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const follow = { stiffness: 260, damping: 28, mass: 0.6 };
  const x = useSpring(pointerX, follow);
  const y = useSpring(pointerY, follow);

  // Tilt with horizontal speed.
  const velocityX = useVelocity(x);
  const tilt = useSpring(useTransform(velocityX, [-2500, 0, 2500], [-14, 0, 14]), {
    stiffness: 200,
    damping: 24,
  });

  // Photo strip position: slides to the active row.
  const stripTarget = useMotionValue(0);
  const strip = useSpring(stripTarget, { stiffness: 180, damping: 26, mass: 0.7 });
  const stripY = useTransform(strip, (value) => `${-value * 100}%`);

  const onMove = (event: PointerEvent<HTMLOListElement>) => {
    // Offset so the photo sits just right of and above the cursor.
    pointerX.set(event.clientX + 28);
    pointerY.set(event.clientY - PREVIEW_H / 2);
  };

  const onEnterRow = (index: number, event: PointerEvent<HTMLLIElement>) => {
    if (active === null) {
      // Appear in place (no slide across the whole strip from row 0).
      pointerX.jump(event.clientX + 28);
      pointerY.jump(event.clientY - PREVIEW_H / 2);
      x.jump(event.clientX + 28);
      y.jump(event.clientY - PREVIEW_H / 2);
      strip.jump(index);
    }
    stripTarget.set(index);
    setActive(index);
  };

  return (
    <>
      <ol
        className="group/list mt-6 border-b border-background/15"
        onPointerMove={canHover ? onMove : undefined}
        onPointerLeave={() => setActive(null)}
      >
        {items.map((item, index) => (
          <li
            key={`${item.year}-${item.name}-${item.location}`}
            onPointerEnter={canHover ? (event) => onEnterRow(index, event) : undefined}
            className={cn(
              "border-t border-background/15 transition-opacity duration-500",
              canHover && "group-hover/list:opacity-35 hover:!opacity-100",
            )}
          >
            <Reveal
              inView
              y={16}
              delay={(index % 4) * 0.05}
              className={cn(
                "grid gap-1 py-5 md:grid-cols-[5rem_1.2fr_1fr_1fr] md:items-baseline md:gap-6",
                !canHover && "grid-cols-[3.5rem_1fr] items-center gap-x-4",
              )}
            >
              {!canHover && (
                <span className="relative row-span-4 aspect-square w-14 self-start overflow-hidden rounded-sm bg-background/10 md:hidden">
                  <Image
                    src={item.image.src}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </span>
              )}
              <span className="font-display text-lg text-accent-deep">{item.year}</span>
              <span
                className={cn(
                  "font-sans text-lg font-semibold tracking-tight transition-[color,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  active === index && "translate-x-3 text-accent-deep",
                )}
              >
                {item.name}
              </span>
              <span className="text-sm text-ink-muted">{item.details}</span>
              <span className="text-sm text-ink-muted">{item.location}</span>
            </Reveal>
          </li>
        ))}
      </ol>

      {canHover &&
        createPortal(
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed top-0 left-0 z-40"
            style={{ x, y, rotate: reduceMotion ? 0 : tilt }}
          >
            <AnimatePresence>
              {active !== null && (
                <motion.div
                  key="preview"
                  initial={{
                    opacity: 0,
                    scale: 0.6,
                    clipPath: "inset(50% 50% 50% 50% round 12px)",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    clipPath: "inset(0% 0% 0% 0% round 12px)",
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.6,
                    clipPath: "inset(50% 50% 50% 50% round 12px)",
                  }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden rounded-xl bg-background shadow-[0_30px_80px_-20px_rgba(20,16,13,0.6)]"
                  style={{ width: PREVIEW_W, height: PREVIEW_H }}
                >
                  <motion.div style={{ y: stripY }} className="h-full w-full">
                    {items.map((item, index) => (
                      <div
                        key={`${item.name}-${index}`}
                        className="relative h-full w-full"
                      >
                        <Image
                          src={item.image.src}
                          alt=""
                          fill
                          sizes={`${PREVIEW_W}px`}
                          loading="eager"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </motion.div>
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-background/85 to-transparent px-4 pt-8 pb-3 text-xs text-foreground">
                    <span className="font-medium">
                      {active !== null && items[active]?.name}
                    </span>
                    <span className="text-foreground/70">
                      {active !== null && items[active]?.year}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>,
          document.body,
        )}
    </>
  );
}
