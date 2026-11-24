"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EqualizerBars } from "@/components/ui/EqualizerBars";
import { Magnetic } from "@/components/ui/Magnetic";
import { RotatingStamp } from "@/components/ui/RotatingStamp";
import { TextReveal } from "@/components/ui/TextReveal";
import { siteConfig } from "@/config/site";
import { useContent } from "@/i18n/LanguageProvider";

/** Closing band: the motto, a rotating "Restaurant Made Easy" stamp and the CTA. */
export function MottoBand() {
  const { biz, cta } = useContent();
  const { motto } = biz;

  return (
    <section
      aria-labelledby="motto-heading"
      className="relative overflow-hidden bg-accent py-28 text-accent-foreground md:py-36"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 h-1/2 w-1/2 bg-[radial-gradient(rgba(6,12,26,0.18)_1.5px,transparent_1.5px)] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)] [background-size:18px_18px]"
      />
      <Container className="relative grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="flex items-center gap-2 eyebrow text-accent-foreground/70">
            <Heart className="size-4 fill-current" aria-hidden="true" />
            {motto.label}
          </p>
          <h2
            id="motto-heading"
            aria-label={motto.lines.join(" ")}
            className="mt-6 text-5xl font-semibold md:text-8xl"
          >
            <TextReveal as="span" text={motto.lines[0] ?? ""} className="block" />
            <TextReveal
              as="span"
              text={motto.lines[1] ?? ""}
              delay={0.25}
              className="block text-background/80 italic"
            />
          </h2>
          <motion.p
            className="mt-8 text-lg md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="font-semibold">{siteConfig.name}</span> — {motto.slogan}
          </motion.p>
          <motion.p
            className="mt-2 text-base text-accent-foreground/75"
            initial={{ opacity: 0, rotate: -2 }}
            whileInView={{ opacity: 1, rotate: [0, -1.5, 1.5, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.8 }}
          >
            {motto.joke}
          </motion.p>
          <Magnetic className="mt-10">
            <Button href="/contact" variant="inverse" size="lg">
              {cta.cta.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </Magnetic>
        </div>
        <div className="flex justify-center lg:col-span-4 lg:justify-end">
          <RotatingStamp
            text={`${motto.slogan} • ${siteConfig.name} • `}
            className="size-56 text-background md:size-64"
          >
            <Image
              src="/brand/resto-mark-gold.png"
              alt=""
              width={512}
              height={512}
              className="size-20 rounded-2xl shadow-xl md:size-24"
            />
          </RotatingStamp>
        </div>
      </Container>
      <EqualizerBars className="absolute bottom-0 left-0 text-background/50" />
    </section>
  );
}
