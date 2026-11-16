"use client";

import { motion } from "framer-motion";
import { Handshake, KeyRound, Rocket, Store, Tag } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { KineticWords } from "@/components/ui/KineticWords";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { useContent } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import { LineReveal } from "@/components/ui/LineReveal";

const ICONS = [Store, Tag, KeyRound, Handshake, Rocket];

/** Business & franchise opportunities: kinetic verbs, services bento, approach. */
export function OpportunitiesSection() {
  const { biz } = useContent();
  const { opportunities: o } = biz;

  return (
    <section
      id="opportunities"
      aria-labelledby="opportunities-heading"
      className="grain relative overflow-hidden bg-background py-24 md:py-32"
    >
      <Container>
        <SectionLabel>{o.label}</SectionLabel>
        <KineticWords
          words={o.verbs}
          className="mt-8 text-[clamp(2.4rem,7vw,6.5rem)] leading-none tracking-[-0.03em]"
        />
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <TextReveal
            id="opportunities-heading"
            text={o.title}
            className="text-3xl md:text-5xl lg:col-span-6"
          />
          <div className="space-y-5 text-lg text-foreground/80 lg:col-span-5 lg:col-start-8">
            {o.intro.map((paragraph) => (
              <Reveal key={paragraph} inView>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <h3 className="mt-20 eyebrow font-sans text-muted">{o.servicesLabel}</h3>
        <ol className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {o.services.map((service, index) => {
            const Icon = ICONS[index % ICONS.length]!;
            return (
              <motion.li
                key={service.title}
                className={cn(index < 2 ? "lg:col-span-3" : "lg:col-span-2")}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.8,
                  delay: (index % 3) * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <article className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-2xl border border-border bg-surface/60 p-7 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-accent">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-4xl text-accent">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    <span className="grid size-12 place-items-center rounded-full bg-accent/15 text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-accent-foreground">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display text-2xl leading-tight font-semibold md:text-3xl">
                      {service.title}
                    </h4>
                    <p className="mt-3 text-foreground/75">{service.body}</p>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </ol>

        <div className="mt-24 grid gap-10 border-t border-border pt-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-muted">{o.approachLabel}</p>
            <Reveal inView>
              <p className="mt-5 font-display text-2xl leading-snug italic md:text-3xl">
                {o.approach}
              </p>
            </Reveal>
          </div>
          <LineReveal
            lines={o.tagline}
            className="font-display text-4xl leading-[1.05] font-semibold md:text-6xl lg:col-span-6 lg:col-start-7"
            lastClassName="text-accent"
          />
        </div>
      </Container>
    </section>
  );
}
