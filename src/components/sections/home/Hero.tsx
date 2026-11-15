import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { heroContent } from "@/content/home";
import { cn } from "@/lib/utils";

/**
 * Placement of the floating photo collage around the headline. Order matches
 * `heroContent.images`. Purely presentational, so it lives with the section.
 */
const collage = [
  // top, partially tucked under the navbar
  "left-[22%] top-0 hidden h-[15vh] w-[18vw] max-w-[300px] md:block lg:left-[24%]",
  // left edge, middle
  "left-0 top-[30%] hidden h-[44vh] w-[14vw] max-w-[240px] lg:block",
  // right edge, upper
  "right-0 top-[24%] hidden h-[34vh] w-[15vw] max-w-[260px] lg:block",
  // bottom left, cut off by the section edge
  "-bottom-[8vh] left-[5%] hidden h-[22vh] w-[15vw] max-w-[260px] lg:block",
  // bottom right, cut off by the section edge
  "-bottom-[6vh] right-[3%] hidden h-[24vh] w-[19vw] max-w-[320px] lg:block",
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
  } = heroContent;

  return (
    <section
      aria-labelledby="hero-heading"
      className={cn(
        "grain relative flex min-h-[100svh] flex-col overflow-hidden",
        // warm, uneven glow — the "lit room" behind the type
        "bg-[radial-gradient(ellipse_70%_55%_at_85%_10%,rgba(201,161,91,0.20),transparent_65%),radial-gradient(ellipse_60%_60%_at_0%_100%,rgba(150,70,35,0.22),transparent_70%),radial-gradient(ellipse_at_center,#1c1612,var(--background)_75%)]",
      )}
    >
      {/* Floating photo collage */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {images.map((image, index) => (
          <Reveal
            key={image.src}
            delay={0.15 + index * 0.08}
            y={16}
            className={cn("absolute overflow-hidden rounded-sm", collage[index])}
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
        ))}
      </div>

      <Container className="flex flex-1 flex-col items-center justify-center pt-[calc(var(--nav-height)+3rem)] pb-28 text-center md:pt-[calc(var(--nav-height)+5rem)] lg:pb-24">
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
      </Container>

      <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-3 text-muted">
        <span className="eyebrow text-[0.65rem]">{scrollLabel}</span>
        <span className="relative h-10 w-px overflow-hidden bg-border">
          <span className="absolute inset-0 animate-scroll-cue bg-accent motion-reduce:animate-none" />
        </span>
      </div>
    </section>
  );
}
