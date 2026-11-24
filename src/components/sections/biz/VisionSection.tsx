"use client";

import { motion } from "framer-motion";
import { Check, ChefHat, Coffee, Users, Wrench } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { useContent } from "@/i18n/LanguageProvider";

/** Node positions (% of the square) around the central hub. */
const NODES = [
  { x: 16, y: 18, icon: Coffee },
  { x: 84, y: 18, icon: ChefHat },
  { x: 16, y: 82, icon: Users },
  { x: 84, y: 82, icon: Wrench },
];

/**
 * Founder's vision: the statement on the left, and an animated "connected
 * ecosystem" on the right — four groups linked into one RestoMate hub.
 */
export function VisionSection({ number = 2 }: { number?: number }) {
  const { biz } = useContent();
  const { vision } = biz;

  return (
    <section
      id="vision"
      aria-labelledby="vision-heading"
      className="grain relative overflow-hidden bg-background py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_80%_50%,rgba(201,164,92,0.14),transparent_70%)]"
      />
      <Container className="relative grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionLabel number={number}>{vision.label}</SectionLabel>
          <TextReveal
            id="vision-heading"
            text={vision.title}
            className="mt-6 text-4xl md:text-6xl"
          />
          <Reveal inView delay={0.15}>
            <p className="mt-8 text-lg leading-relaxed text-foreground/80 md:text-xl">
              {vision.body}
            </p>
          </Reveal>
          <ul className="mt-10 flex flex-wrap gap-3">
            {vision.pillars.map((pillar, index) => (
              <motion.li
                key={pillar}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm text-foreground"
              >
                <Check className="size-4 text-accent" aria-hidden="true" />
                {pillar}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <Ecosystem hub={vision.hub} nodes={vision.nodes} />
        </div>
      </Container>
    </section>
  );
}

function Ecosystem({ hub, nodes }: { hub: string; nodes: string[] }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="absolute inset-0 overflow-visible"
      >
        {/* slow rotating orbit */}
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke="var(--border)"
          strokeWidth="0.3"
          strokeDasharray="1 2"
          className="origin-center animate-[spin_60s_linear_infinite] motion-reduce:animate-none"
        />
        {NODES.map((node, index) => (
          <g key={index}>
            <motion.line
              x1={node.x}
              y1={node.y}
              x2="50"
              y2="50"
              stroke="var(--accent)"
              strokeWidth="0.35"
              strokeOpacity="0.6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.3 + index * 0.15, ease: "easeInOut" }}
            />
            {/* pulse travelling to the hub */}
            <motion.circle
              r="0.9"
              fill="var(--accent)"
              initial={{ cx: node.x, cy: node.y, opacity: 0 }}
              animate={{ cx: [node.x, 50], cy: [node.y, 50], opacity: [0, 1, 0] }}
              transition={{
                duration: 2.4,
                delay: 1.5 + index * 0.6,
                repeat: Infinity,
                repeatDelay: 0.8,
                ease: "easeInOut",
              }}
            />
          </g>
        ))}
      </svg>

      {/* Hub */}
      <motion.div
        className="absolute top-1/2 left-1/2 grid size-[38%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-accent/50 bg-surface text-center shadow-[0_0_80px_-10px_rgba(201,164,92,0.55)]"
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 160, damping: 16, delay: 0.2 }}
      >
        <span className="absolute inset-0 animate-ping rounded-full border border-accent/30 [animation-duration:3s] motion-reduce:animate-none" />
        <div className="flex flex-col items-center gap-1.5 px-2">
          <Image
            src="/brand/resto-mark-light-gold.png"
            alt=""
            width={531}
            height={598}
            className="h-10 w-auto md:h-12"
          />
          <span className="font-display text-sm leading-tight font-semibold md:text-base">
            {hub}
          </span>
        </div>
      </motion.div>

      {/* Nodes */}
      {NODES.map((node, index) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={index}
            className="absolute flex w-[38%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-center"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 18,
              delay: 0.5 + index * 0.15,
            }}
          >
            <span className="grid size-11 place-items-center rounded-full bg-accent text-accent-foreground shadow-lg md:size-12">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <span className="text-xs leading-snug font-medium text-foreground/90 md:text-sm">
              {nodes[index]}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
