"use client";

import { type MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { type BrandPartner, brandPartners } from "@/content/partners";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useContent } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

/** Split the logos into three rows for the wall. */
const ROWS: BrandPartner[][] = [
  brandPartners.slice(0, 7),
  brandPartners.slice(7, 13),
  brandPartners.slice(13),
];

/**
 * "Our trusted brand partners": a tilted wall of logo tiles. Each row slides
 * in the opposite direction to its neighbour as the page scrolls; tiles lift
 * and name themselves on hover, and one tile invites the visitor's brand.
 */
export function BrandPartners() {
  const { biz } = useContent();
  const { partners } = biz;
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const forward = useTransform(scrollYProgress, [0, 1], ["-4%", "-30%"]);
  const backward = useTransform(scrollYProgress, [0, 1], ["-30%", "-4%"]);

  return (
    <section
      ref={ref}
      id="partners"
      aria-labelledby="partners-heading"
      className="relative overflow-clip bg-surface py-24 md:py-32"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel>{partners.label}</SectionLabel>
            <TextReveal
              id="partners-heading"
              text={partners.title}
              className="mt-6 text-5xl md:text-7xl"
            />
          </div>
          <Reveal inView delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <p className="text-lg leading-relaxed text-foreground/75">{partners.intro}</p>
          </Reveal>
        </div>
      </Container>

      {/* Names for screen readers; the wall below is decorative. */}
      <ul className="sr-only">
        {brandPartners.map((partner) => (
          <li key={partner.src}>{partner.name}</li>
        ))}
      </ul>
      <Link href="/contact" className="sr-only focus:not-sr-only">
        {partners.yourBrand} {partners.cta}
      </Link>

      <div
        aria-hidden="true"
        className="-my-16 mt-0 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)] py-24 [perspective:1600px] md:py-32"
      >
        <div
          className={cn(
            "flex flex-col gap-4 md:gap-6",
            !reduceMotion &&
              "lg:[transform:rotateX(16deg)_rotateZ(-4deg)] lg:[transform-style:preserve-3d]",
          )}
        >
          {ROWS.map((row, index) => (
            <Row
              key={index}
              partners={row}
              x={reduceMotion ? undefined : index % 2 === 0 ? forward : backward}
              invite={
                index === 1 ? { label: partners.yourBrand, cta: partners.cta } : undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({
  partners,
  x,
  invite,
}: {
  partners: BrandPartner[];
  x?: MotionValue<string>;
  invite?: { label: string; cta: string };
}) {
  // Repeat the row so it always overfills the screen while it slides.
  const loop = [...partners, ...partners, ...partners];
  // Lands near the centre of the screen mid-scroll.
  const invitePosition = partners.length;

  return (
    <motion.ul style={{ x }} className="flex w-max gap-4 md:gap-6">
      {loop.map((partner, index) => (
        <li key={`${partner.src}-${index}`} className="contents">
          {invite && index === invitePosition && <InviteTile {...invite} />}
          <LogoTile partner={partner} />
        </li>
      ))}
    </motion.ul>
  );
}

function LogoTile({ partner }: { partner: BrandPartner }) {
  return (
    <div className="group relative h-28 w-40 shrink-0 md:h-40 md:w-60">
      <div
        className="relative h-full w-full overflow-hidden rounded-2xl shadow-[0_20px_40px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:scale-[1.06] group-hover:shadow-[0_30px_60px_-20px_rgba(201,164,92,0.45)]"
        style={{ backgroundColor: partner.bg }}
      >
        <Image
          src={partner.src}
          alt=""
          fill
          sizes="(min-width: 768px) 240px, 160px"
          className={cn(
            partner.fit === "cover" ? "object-cover" : "object-contain p-3 md:p-4",
          )}
        />
      </div>
      <span className="pointer-events-none absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 translate-y-2 rounded-full bg-accent px-3 py-1 text-xs font-medium whitespace-nowrap text-accent-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {partner.name}
      </span>
    </div>
  );
}

function InviteTile({ label, cta }: { label: string; cta: string }) {
  return (
    <Link
      href="/contact"
      tabIndex={-1}
      className="group relative grid h-28 w-40 shrink-0 place-items-center overflow-hidden rounded-2xl border-2 border-dashed border-accent/70 bg-accent/10 p-4 text-center transition-colors duration-500 hover:bg-accent md:h-40 md:w-60"
    >
      <span className="flex flex-col items-center gap-2">
        <span className="font-display text-lg leading-tight font-semibold text-foreground transition-colors group-hover:text-accent-foreground md:text-2xl">
          {label}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold tracking-wide text-accent uppercase transition-colors group-hover:text-accent-foreground md:text-sm">
          {cta}
          <ArrowUpRight
            className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </span>
    </Link>
  );
}
