"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { type PointerEvent, useRef } from "react";

import { Container } from "@/components/ui/Container";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import type { TeamMember } from "@/content/team";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useContent } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

/**
 * "The faces behind Resto": staggered portraits that tilt toward the cursor,
 * with a torch-light spotlight over each photo and a giant outlined wordmark
 * drifting behind them as the section scrolls.
 */
export function TeamSection({ number }: { number?: number }) {
  const { team } = useContent();
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], ["8%", "-38%"]);

  return (
    <section
      ref={ref}
      id="team"
      aria-labelledby="team-heading"
      className="grain relative overflow-clip bg-background py-24 md:py-36"
    >
      {/* Outlined wordmark drifting behind the portraits */}
      <motion.p
        aria-hidden="true"
        style={{ x: reduceMotion ? 0 : drift }}
        className="pointer-events-none absolute top-[42%] left-0 font-display text-[22vw] leading-none font-bold whitespace-nowrap text-transparent select-none [-webkit-text-stroke:1px_rgba(217,120,42,0.22)]"
      >
        Resto • Resto • Resto
      </motion.p>

      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel number={number}>{team.label}</SectionLabel>
            <TextReveal
              id="team-heading"
              text={team.title}
              className="mt-6 text-5xl md:text-7xl lg:text-8xl"
            />
          </div>
          <Reveal inView delay={0.2} className="lg:col-span-4 lg:col-start-9">
            <p className="text-lg leading-relaxed text-foreground/75">{team.intro}</p>
          </Reveal>
        </div>

        <ul className="mt-20 grid gap-20 md:grid-cols-2 md:gap-10 lg:grid-cols-12">
          {team.members.map((member, index) => (
            <li
              key={member.image.src}
              className={cn(
                "lg:col-span-4",
                index % 2 === 0 ? "lg:col-start-2" : "md:mt-32 lg:col-start-8 lg:mt-48",
              )}
            >
              <PortraitCard member={member} index={index} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function PortraitCard({ member, index }: { member: TeamMember; index: number }) {
  const reduceMotion = usePrefersReducedMotion();

  // Cursor position over the photo, 0–1.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.4);
  const spring = { stiffness: 150, damping: 18, mass: 0.6 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), spring);
  const lightX = useTransform(px, (v) => `${v * 100}%`);
  const lightY = useTransform(py, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${lightX} ${lightY}, rgba(217,120,42,0.18) 0%, transparent 22%, rgba(20,16,13,0.55) 52%)`;

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || reduceMotion) return;
    const box = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - box.left) / box.width);
    py.set((event.clientY - box.top) / box.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.4);
  };

  const heading = member.name || member.role;

  return (
    <article className="group">
      <div className="[perspective:1200px]">
        <motion.div
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          style={reduceMotion ? undefined : { rotateX, rotateY }}
          className="relative"
        >
          <ImageReveal
            delay={index * 0.15}
            className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]"
          >
            <Image
              src={member.image.src}
              alt={member.image.alt}
              fill
              sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </ImageReveal>

          {/* Torch-light: only on devices with a real hover */}
          <motion.div
            aria-hidden="true"
            style={{ background: spotlight }}
            className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 [@media(hover:hover)]:group-hover:opacity-100"
          />

          {/* Index badge */}
          <span className="absolute top-5 left-5 grid size-12 place-items-center rounded-full bg-accent font-display text-lg font-semibold text-accent-foreground shadow-lg">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Role chip, floating slightly off the frame */}
          {member.name && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.15 }}
              className="absolute -bottom-5 left-6 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background/80 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-md md:-right-6 md:left-auto"
            >
              <span className="size-2 animate-pulse rounded-full bg-accent" />
              {member.role}
            </motion.span>
          )}
        </motion.div>
      </div>

      <div className="mt-12">
        <h3 className="relative inline-block font-display text-3xl leading-tight font-semibold md:text-4xl">
          {heading}
          <span
            aria-hidden="true"
            className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
          />
        </h3>

        {member.credentials.length > 0 && (
          <motion.ul
            className="mt-6 space-y-3 border-l border-border pl-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            {member.credentials.map((line) => (
              <motion.li
                key={line}
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-foreground/80 before:absolute before:top-[0.6em] before:-left-[1.45rem] before:size-2 before:rounded-full before:bg-accent"
              >
                {line}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </article>
  );
}
