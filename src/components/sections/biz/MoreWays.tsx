"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  Handshake,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useContent } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const CARDS = [
  { href: "/opportunities", icon: Handshake, tone: "bg-accent text-accent-foreground" },
  { href: "/opportunities#buy-sell", icon: Store, tone: "bg-foreground text-background" },
  { href: "/services#management", icon: TrendingUp, tone: "bg-surface text-foreground" },
  { href: "/services#licensing", icon: BadgeCheck, tone: "bg-[#13244a] text-foreground" },
  { href: "/services#manpower", icon: Users, tone: "bg-accent text-accent-foreground" },
];

/**
 * "More ways we help": on desktop the section pins and the cards slide
 * sideways as you scroll; on touch screens it is a swipeable row.
 */
export function MoreWays() {
  const { biz } = useContent();
  const { more } = biz;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = usePrefersReducedMotion();
  const pinned = isDesktop && !reduceMotion;
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (!pinned) return;
    const measure = () => {
      const track = trackRef.current;
      if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 80));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pinned, more.cards.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="more-heading"
      className="relative bg-background"
      style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined}
    >
      <div
        className={cn(
          "grain flex flex-col justify-center overflow-hidden py-24",
          pinned && "sticky top-0 h-svh py-0",
        )}
      >
        <Container>
          <SectionLabel>{more.label}</SectionLabel>
          <TextReveal
            id="more-heading"
            text={more.title}
            className="mt-6 text-4xl md:text-6xl"
          />
        </Container>

        <motion.div
          ref={trackRef}
          style={pinned ? { x } : undefined}
          className={cn(
            "mt-14 flex gap-5 px-5 md:px-8 lg:px-10",
            !pinned && "snap-x snap-mandatory overflow-x-auto pb-4",
          )}
        >
          {more.cards.map((card, index) => {
            const meta = CARDS[index % CARDS.length]!;
            const Icon = meta.icon;
            return (
              <Link
                key={card.title}
                href={meta.href}
                className={cn(
                  "group relative flex h-[22rem] w-[19rem] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-2 md:w-[24rem]",
                  meta.tone,
                )}
              >
                <span
                  aria-hidden="true"
                  className="absolute -right-6 -bottom-10 font-display text-[11rem] leading-none font-bold opacity-10"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="grid size-12 place-items-center rounded-full bg-current/10">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <div className="relative">
                  <h3 className="text-3xl leading-tight">{card.title}</h3>
                  <p className="mt-3 text-sm opacity-75">{card.line}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                    {more.explore}
                    <ArrowUpRight
                      className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
