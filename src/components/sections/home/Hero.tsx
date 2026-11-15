"use client";

import {
  type MotionValue,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VideoSlot } from "@/components/ui/VideoSlot";
import { heroContent } from "@/content/home";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

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
  const {
    eyebrow,
    headline,
    description,
    primaryCta,
    secondaryCta,
    stats,
    scrollLabel,
    images,
    showcase,
  } = heroContent;

  const sectionRef = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useReducedMotion();
  const animate = isDesktop && !reduceMotion;

  const { scrollYProgress: progress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
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
          "bg-[radial-gradient(ellipse_70%_55%_at_85%_10%,rgba(217,120,42,0.20),transparent_65%),radial-gradient(ellipse_60%_60%_at_0%_100%,rgba(150,70,35,0.22),transparent_70%),radial-gradient(ellipse_at_center,#1c1612,var(--background)_75%)]",
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

            <Reveal delay={0.15} className="mt-6">
              <h1
                id="hero-heading"
                className="max-w-[14ch] text-hero font-semibold sm:max-w-none"
              >
                {headline.map((line, lineIndex) => (
                  <span key={lineIndex} className="block">
                    {line.map((segment, segmentIndex) =>
                      segment.accent ? (
                        <em key={segmentIndex} className="text-accent italic">
                          {segment.text}
                        </em>
                      ) : (
                        <span key={segmentIndex}>{segment.text}</span>
                      ),
                    )}
                  </span>
                ))}
              </h1>
            </Reveal>

            <Reveal delay={0.3} className="mt-7 max-w-2xl">
              <p className="text-base text-pretty text-muted md:text-lg">{description}</p>
            </Reveal>

            <Reveal
              delay={0.42}
              className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
            >
              <Button href={primaryCta.href} size="lg" className="w-full sm:w-auto">
                {primaryCta.label}
              </Button>
              <Button
                href={secondaryCta.href}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                {secondaryCta.label}
              </Button>
            </Reveal>

            <Reveal delay={0.55} className="mt-14 w-full max-w-xl">
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
    </section>
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
      <Reveal
        delay={0.15 + index * 0.08}
        y={16}
        className="absolute inset-0 overflow-hidden rounded-sm"
      >
        <Image
          src={image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 22vw, 30vw"
          className="object-cover opacity-80"
          preload={index === 0}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
      </Reveal>
    </motion.div>
  );
}

/** Showreel video when available, otherwise a mosaic of project photos. */
function Showcase({
  video,
  tiles,
  className,
}: {
  video?: string;
  tiles: ImageAsset[];
  className?: string;
}) {
  return (
    <div className={cn("relative bg-background", className)}>
      <VideoSlot
        src={video}
        poster={tiles[0]}
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
