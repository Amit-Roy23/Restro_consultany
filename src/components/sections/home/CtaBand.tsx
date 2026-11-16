"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EqualizerBars } from "@/components/ui/EqualizerBars";
import { Magnetic } from "@/components/ui/Magnetic";
import { TextReveal } from "@/components/ui/TextReveal";
import { useContent } from "@/i18n/LanguageProvider";

export function CtaBand() {
  const { cta: ctaBandContent } = useContent();
  const { title, body, cta } = ctaBandContent;

  return (
    <section
      aria-labelledby="cta-heading"
      className="relative flex min-h-[80svh] items-center overflow-hidden bg-accent text-accent-foreground"
    >
      {/* dotted texture in the top-right corner */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 h-1/2 w-1/2 bg-[radial-gradient(rgba(20,16,13,0.18)_1.5px,transparent_1.5px)] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)] [background-size:18px_18px]"
      />
      <Container className="relative py-32 text-center">
        <TextReveal
          id="cta-heading"
          text={title}
          className="mx-auto max-w-4xl text-5xl font-normal md:text-7xl"
        />
        <p className="mx-auto mt-6 max-w-xl text-lg text-accent-foreground/75">{body}</p>
        <Magnetic className="mt-10">
          <Button href={cta.href} variant="inverse" size="lg">
            {cta.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </Magnetic>
      </Container>
      <EqualizerBars className="absolute bottom-0 left-0 text-background/60" />
    </section>
  );
}
