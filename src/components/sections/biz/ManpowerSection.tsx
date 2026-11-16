"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { KineticWords } from "@/components/ui/KineticWords";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useContent } from "@/i18n/LanguageProvider";

/** Manpower & staffing: kinetic "Hire • Recruit • Deploy" and the staffing categories. */
export function ManpowerSection() {
  const { biz } = useContent();
  const { manpower: p } = biz;

  return (
    <section
      id="manpower"
      aria-labelledby="manpower-heading"
      className="grain relative scroll-mt-6 overflow-hidden bg-background py-24 md:py-32"
    >
      <Container>
        <h2 id="manpower-heading" className="sr-only">
          {p.label}
        </h2>
        <SectionLabel>{p.label}</SectionLabel>
        <KineticWords
          words={p.verbs}
          className="mt-8 text-[clamp(3rem,10vw,9rem)] leading-none tracking-[-0.04em]"
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <Reveal inView className="lg:col-span-7">
            <p className="text-lg text-foreground/80 md:text-xl">{p.body}</p>
          </Reveal>
          <div className="lg:col-span-4 lg:col-start-9">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-5 py-2.5 text-sm font-semibold tracking-wide uppercase">
              <MapPin className="size-4 text-accent" aria-hidden="true" />
              {p.coverage}
            </span>
          </div>
        </div>

        <h3 className="mt-20 eyebrow font-sans text-muted">{p.categoriesLabel}</h3>
        <ol className="mt-6 grid border-t border-border md:grid-cols-2 md:gap-x-10">
          {p.categories.map((category, index) => (
            <motion.li
              key={category}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: 0.7,
                delay: (index % 4) * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex items-baseline gap-5 border-b border-border py-5"
            >
              <span className="font-display text-xl text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-xl font-medium transition-[color,translate] duration-500 group-hover:translate-x-2 group-hover:text-accent md:text-2xl">
                {category}
              </span>
            </motion.li>
          ))}
        </ol>

        <p className="mt-16 font-display text-3xl leading-snug md:text-5xl">
          {p.tagline}
        </p>
      </Container>
    </section>
  );
}
