"use client";

import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { FloatingDots } from "@/components/ui/FloatingDots";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { useContent } from "@/i18n/LanguageProvider";

type PageKey = "about" | "services" | "projects" | "contact" | "notFound";

/** Opening block for inner pages: label, h1 and intro on the dark grain. */
export function PageHeader({ page, children }: { page: PageKey; children?: ReactNode }) {
  const { pageHeaders, notFoundContent } = useContent();
  const content = page === "notFound" ? notFoundContent : pageHeaders[page];

  return (
    <section className="grain relative overflow-hidden bg-[radial-gradient(ellipse_60%_60%_at_90%_0%,rgba(217,120,42,0.2),transparent_70%)]">
      <FloatingDots className="opacity-60" />
      <Container className="relative pt-[calc(var(--nav-height)+5rem)] pb-20 md:pb-28">
        <SectionLabel>{content.label}</SectionLabel>
        <TextReveal
          as="h1"
          immediate
          delay={0.1}
          text={content.title}
          className="mt-6 max-w-5xl text-5xl md:text-8xl"
        />
        <Reveal delay={0.45}>
          <p className="mt-8 max-w-2xl text-lg text-muted md:text-xl">{content.intro}</p>
        </Reveal>
        {children}
      </Container>
    </section>
  );
}
