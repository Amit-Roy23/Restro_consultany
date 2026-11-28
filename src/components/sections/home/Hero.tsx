"use client";

import {
  AnimatePresence,
  type MotionValue,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Languages, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

import {
  type LeadMode,
  LeadDialog,
  openLeadDialog,
} from "@/components/sections/home/LeadDialog";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VideoSlot } from "@/components/ui/VideoSlot";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIntro } from "@/components/layout/IntroProvider";
import { useContent } from "@/i18n/LanguageProvider";
import { languages } from "@/i18n/languages";

/**
 * Floating photo collage around the headline. Order matches
 * `heroContent.images`. `drift` is how far (px) each photo travels outward
 * while the visitor scrolls through the hero.
 */
const collage: { className: string; drift: [number, number] }[] = [
  {
    className:
      "left-[22%] top-0 hidden h-[15vh] w-[18vw] max-w-[300px] md:block lg:left-[24%]",
    drift: [-60, -260],
  },
  {
    className: "left-0 top-[30%] hidden h-[44vh] w-[14vw] max-w-[240px] lg:block",
    drift: [-320, -40],
  },
  {
    className: "right-0 top-[24%] hidden h-[34vh] w-[15vw] max-w-[260px] lg:block",
    drift: [320, -80],
  },
  {
    className: "-bottom-[8vh] left-[5%] hidden h-[22vh] w-[15vw] max-w-[260px] lg:block",
    drift: [-260, 160],
  },
  {
    className: "-bottom-[6vh] right-[3%] hidden h-[24vh] w-[19vw] max-w-[320px] lg:block",
    drift: [260, 200],
  },
];

export function Hero() {
  const { hero: heroContent, biz } = useContent();
  const { lead } = biz;
  const { eyebrow, headline, description, stats, scrollLabel, images, showcase } =
    heroContent;

  const sectionRef = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = usePrefersReducedMotion();
  const { done } = useIntro();
  const animate = isDesktop && !reduceMotion;

  // "Start your project" / "Free consultation" dialog.
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [leadMode, setLeadMode] = useState<LeadMode>("consult");
  const openLead = (next: LeadMode) => {
    flushSync(() => setLeadMode(next));
    openLeadDialog(dialogRef.current);
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  // A light spring so the collage and showcase glide rather than track the
  // scroll position frame-for-frame.
  const progress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 32,
    mass: 0.4,
    restDelta: 0.0005,
  });

  const textOpacity = useTransform(progress, [0.08, 0.38], [1, 0]);
  const textY = useTransform(progress, [0, 0.4], [0, -140]);
  const textScale = useTransform(progress, [0, 0.4], [1, 0.94]);

  const frameOpacity = useTransform(progress, [0.04, 0.14], [0, 1]);
  const frameY = useTransform(progress, [0.04, 0.72], ["64vh", "0vh"]);
  const frameScale = useTransform(progress, [0.12, 0.72], [0.3, 1]);
  const frameRadius = useTransform(progress, [0.12, 0.72], [36, 0]);
  const captionOpacity = useTransform(progress, [0.72, 0.85], [0, 1]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative"
      style={animate ? { height: "260vh" } : undefined}
    >
      <div
        className={cn(
          "grain flex flex-col overflow-hidden",
          animate ? "sticky top-0 h-svh" : "relative min-h-[100svh]",
          "bg-[radial-gradient(ellipse_70%_55%_at_85%_10%,rgba(201,164,92,0.20),transparent_65%),radial-gradient(ellipse_60%_60%_at_0%_100%,rgba(30,58,110,0.22),transparent_70%),radial-gradient(ellipse_at_center,#13233f,var(--background)_75%)]",
        )}
      >
        {/* Floating photo collage */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {images.map((image, index) => (
            <CollagePhoto
              key={image.src}
              image={image}
              index={index}
              className={collage[index]?.className}
              drift={collage[index]?.drift ?? [0, 0]}
              progress={progress}
              animate={animate}
            />
          ))}
        </div>

        <motion.div
          style={
            animate ? { opacity: textOpacity, y: textY, scale: textScale } : undefined
          }
          className="flex flex-1 flex-col"
        >
          <Container className="flex flex-1 flex-col items-center justify-center pt-[calc(var(--nav-height)+3rem)] pb-28 text-center md:pt-[calc(var(--nav-height)+5rem)] lg:pb-32">
            <Reveal delay={0.05}>
              <SectionLabel className="justify-center">{eyebrow}</SectionLabel>
            </Reveal>

            <motion.h1
              id="hero-heading"
              aria-label={headline
                .map((line) => line.map((part) => part.text).join(""))
                .join(" ")}
              className="mt-6 max-w-[14ch] text-hero font-semibold sm:max-w-none"
              initial={reduceMotion ? false : "hidden"}
              animate={done ? "visible" : "hidden"}
              variants={{
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
              }}
            >
              {headline.map((line, lineIndex) => (
                <span
                  key={lineIndex}
                  aria-hidden="true"
                  className="-mb-[0.1em] block overflow-hidden pb-[0.1em]"
                >
                  <motion.span
                    className="block origin-bottom-left"
                    variants={{
                      hidden: { y: "110%", rotate: 3 },
                      visible: {
                        y: "0%",
                        rotate: 0,
                        transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                  >
                    {line.map((segment, segmentIndex) =>
                      segment.accent ? (
                        <em
                          key={segmentIndex}
                          className="bg-gradient-to-r from-accent via-gold to-accent bg-clip-text pr-[0.06em] text-transparent italic"
                        >
                          {segment.text}
                        </em>
                      ) : (
                        <span key={segmentIndex}>{segment.text}</span>
                      ),
                    )}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <Reveal delay={0.55} className="mt-7 max-w-2xl">
              <p className="text-base text-pretty text-muted md:text-lg">{description}</p>
            </Reveal>

            <Reveal
              delay={0.7}
              className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
            >
              <Magnetic className="w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => openLead("project")}
                  className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-accent px-8 font-semibold text-accent-foreground shadow-[0_18px_40px_-14px_rgba(201,164,92,0.7)] transition-colors hover:bg-foreground sm:w-auto"
                >
                  {lead.startProject}
                  <ArrowRight
                    className="size-5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </button>
              </Magnetic>
              <button
                type="button"
                onClick={() => openLead("consult")}
                className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-full border border-foreground/25 bg-foreground/[0.04] px-8 font-semibold text-foreground backdrop-blur-md transition-colors hover:border-accent hover:text-accent sm:w-auto"
              >
                <span className="relative flex size-2.5">
                  <span className="absolute inset-0 rounded-full bg-accent motion-safe:animate-ping" />
                  <span className="relative size-2.5 rounded-full bg-accent" />
                </span>
                {lead.freeConsultation}
                <MessageCircle className="size-5" aria-hidden="true" />
              </button>
            </Reveal>

            <Reveal delay={0.8} className="mt-7 flex flex-col items-center gap-2">
              <p className="inline-flex items-center gap-2.5 rounded-full border border-foreground/10 bg-background/50 py-2 pr-5 pl-3 text-sm text-foreground/85 backdrop-blur-md">
                <span className="grid size-7 place-items-center rounded-full bg-accent/15 text-accent">
                  <Languages className="size-4" aria-hidden="true" />
                </span>
                <span>{lead.languagesLead}</span>
                <RotatingLanguage play={done && !reduceMotion} />
              </p>
              <p className="max-w-sm text-xs text-muted">{lead.languagesNote}</p>
            </Reveal>

            <Reveal delay={0.85} className="mt-10 w-full max-w-xl">
              <dl className="grid grid-cols-3 divide-x divide-border border-y border-border">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse gap-1 px-2 py-5">
                    <dt className="eyebrow text-muted">{stat.label}</dt>
                    <dd className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {!animate && (
              <Showcase
                video={showcase.video}
                poster={showcase.videoPoster}
                tiles={showcase.tiles}
                className="mt-14 aspect-[16/10] w-full overflow-hidden rounded-lg"
              />
            )}
          </Container>

          <div className="absolute inset-x-0 bottom-6 hidden flex-col items-center gap-3 text-muted [@media(min-width:768px)_and_(min-height:980px)]:flex">
            <span className="eyebrow text-[0.65rem]">{scrollLabel}</span>
            <span className="relative h-10 w-px overflow-hidden bg-border">
              <span className="absolute inset-0 animate-scroll-cue bg-accent motion-reduce:animate-none" />
            </span>
          </div>
        </motion.div>

        {/* Showcase frame that rises and grows to fill the screen (desktop only) */}
        {animate && (
          <motion.div
            aria-hidden="true"
            style={{
              opacity: frameOpacity,
              y: frameY,
              scale: frameScale,
              borderRadius: frameRadius,
            }}
            className="absolute inset-0 z-10 overflow-hidden will-change-transform"
          >
            <Showcase
              video={showcase.video}
              poster={showcase.videoPoster}
              tiles={showcase.tiles}
              className="absolute inset-0"
            />
            <motion.div
              style={{ opacity: captionOpacity }}
              className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-10"
            >
              <Container>
                <SectionLabel>{showcase.caption}</SectionLabel>
              </Container>
            </motion.div>
          </motion.div>
        )}
      </div>
      <LeadDialog dialogRef={dialogRef} mode={leadMode} />
    </section>
  );
}

/** Cycles through the languages' own names; width is reserved for the longest. */
function RotatingLanguage({ play }: { play: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!play) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % languages.length),
      2200,
    );
    return () => window.clearInterval(timer);
  }, [play]);

  const current = languages[index]!;

  return (
    <>
      <span className="sr-only">{languages.map((item) => item.native).join(", ")}</span>
      <span
        aria-hidden="true"
        className="relative inline-grid overflow-hidden text-center font-semibold text-accent"
      >
        {/* Invisible copies hold the width of the longest name. */}
        {languages.map((item) => (
          <span key={item.code} className="invisible col-start-1 row-start-1">
            {item.native}
          </span>
        ))}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={current.code}
            className="col-start-1 row-start-1"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {current.native}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  );
}

type CollagePhotoProps = {
  image: ImageAsset;
  index: number;
  className?: string;
  drift: [number, number];
  progress: MotionValue<number>;
  animate: boolean;
};

function CollagePhoto({
  image,
  index,
  className,
  drift,
  progress,
  animate,
}: CollagePhotoProps) {
  const x = useTransform(progress, [0, 0.5], [0, drift[0]]);
  const y = useTransform(progress, [0, 0.5], [0, drift[1]]);
  const opacity = useTransform(progress, [0.1, 0.45], [1, 0]);

  return (
    <motion.div
      style={animate ? { x, y, opacity } : undefined}
      className={cn("absolute", className)}
    >
      <ImageReveal
        delay={0.1 + index * 0.1}
        className="absolute inset-0 rounded-xl shadow-[0_30px_60px_-25px_rgba(0,0,0,0.8)]"
      >
        <Image
          src={image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 22vw, 30vw"
          className="object-cover opacity-90 brightness-[0.95] contrast-[1.06] saturate-[0.88]"
          preload={index === 0}
        />
        {/* Navy grade + gold hairline so mixed photos read as one set */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-[rgba(201,164,92,0.08)]" />
        <div className="absolute inset-0 rounded-[inherit] ring-1 ring-gold/30 ring-inset" />
      </ImageReveal>
    </motion.div>
  );
}

/** Showreel video when available, otherwise a mosaic of project photos. */
function Showcase({
  video,
  poster,
  tiles,
  className,
}: {
  video?: string;
  poster?: string;
  tiles: ImageAsset[];
  className?: string;
}) {
  return (
    <div className={cn("relative bg-background", className)}>
      <VideoSlot
        src={video}
        poster={poster ? { src: poster, alt: "" } : tiles[0]}
        fallback={
          <div className="grid h-full grid-cols-3 grid-rows-2 gap-1">
            {tiles.slice(0, 6).map((tile) => (
              <div key={tile.src} className="relative overflow-hidden">
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes="34vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        }
      />
    </div>
  );
}
