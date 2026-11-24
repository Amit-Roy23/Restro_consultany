"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Building2,
  Files,
  Flame,
  Leaf,
  type LucideIcon,
  Receipt,
  Store,
  Wine,
} from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { RotatingStamp } from "@/components/ui/RotatingStamp";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { siteConfig } from "@/config/site";
import { useContent } from "@/i18n/LanguageProvider";

const ICONS: LucideIcon[] = [
  BadgeCheck,
  Receipt,
  Store,
  Building2,
  Flame,
  Wine,
  Leaf,
  Files,
];

/** Pan-India licensing & compliance: kicker chips, licence cards, "All India" stamp. */
export function LicensingSection() {
  const { biz } = useContent();
  const { licensing: l } = biz;

  return (
    <section
      id="licensing"
      aria-labelledby="licensing-heading"
      className="scroll-mt-6 bg-paper py-24 text-background md:py-32"
    >
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-4xl">
            <SectionLabel tone="light">{l.label}</SectionLabel>
            <ul className="mt-6 flex flex-wrap gap-2">
              {l.kicker.map((word, index) => (
                <motion.li
                  key={word}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: index * 0.08,
                  }}
                  className="rounded-full bg-background px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-foreground uppercase"
                >
                  {word}
                </motion.li>
              ))}
            </ul>
            <TextReveal
              id="licensing-heading"
              text={l.title}
              className="mt-8 text-4xl md:text-6xl"
            />
            <Reveal inView>
              <p className="mt-8 max-w-3xl text-lg text-ink-muted">{l.body}</p>
            </Reveal>
          </div>
          <RotatingStamp
            text={`${l.coverage} • ${l.coverage} • `}
            className="size-44 shrink-0 text-accent-deep"
          >
            <Image
              src="/brand/resto-mark-gold.png"
              alt=""
              width={512}
              height={512}
              className="size-16 rounded-xl shadow-md"
            />
          </RotatingStamp>
        </div>

        <h3 className="mt-16 eyebrow font-sans text-ink-muted">{l.servicesLabel}</h3>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {l.services.map((service, index) => {
            const Icon = ICONS[index % ICONS.length]!;
            return (
              <motion.li
                key={service}
                initial={{ opacity: 0, y: 30, rotateX: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.7,
                  delay: (index % 4) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="[perspective:800px]"
              >
                <article className="group flex h-full flex-col justify-between gap-8 rounded-2xl border border-background/10 bg-white p-6 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(6,12,26,0.35)]">
                  <div className="flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-xl bg-accent/15 text-accent-deep transition-colors duration-500 group-hover:bg-accent group-hover:text-accent-foreground">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="font-display text-lg text-ink-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h4 className="font-sans text-lg leading-snug font-semibold">
                    {service}
                  </h4>
                </article>
              </motion.li>
            );
          })}
        </ol>

        <p className="mt-14 border-t border-background/15 pt-8 font-display text-2xl italic md:text-3xl">
          {siteConfig.name} — {l.tagline}
        </p>
      </Container>
    </section>
  );
}
