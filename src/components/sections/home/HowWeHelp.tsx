import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { AskForm } from "@/components/ui/AskForm";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { askContent, howWeHelpContent } from "@/content/home";

/** Problem → solution rows, with a floating ask bar pinned to the bottom. */
export function HowWeHelp() {
  const { number, label, title, intro, items } = howWeHelpContent;

  return (
    <section
      aria-labelledby="help-heading"
      className="grain bg-background py-24 md:py-32"
    >
      <Container>
        <SectionLabel number={number}>{label}</SectionLabel>
        <h2 id="help-heading" className="mt-6 max-w-4xl text-5xl text-accent md:text-7xl">
          {title}
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-muted">{intro}</p>

        <ul className="mt-16 border-b border-border">
          {items.map((item) => (
            <li key={item.problem} className="border-t border-border">
              <Link
                href={item.href}
                className="group grid gap-4 py-8 md:grid-cols-[1.1fr_1fr_auto] md:items-center md:gap-10"
              >
                <p className="font-display text-xl leading-snug text-foreground/85 md:text-2xl">
                  {item.problem}
                </p>
                <p className="font-medium text-foreground transition-colors group-hover:text-accent">
                  {item.solution}
                </p>
                <span className="inline-flex size-11 items-center justify-center rounded-md border border-border text-foreground transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="sticky bottom-6 z-20 mx-auto mt-16 max-w-lg rounded-[24px] border border-foreground/10 bg-surface/60 p-3 shadow-2xl backdrop-blur-xl">
          <p className="px-4 pt-1 pb-3 eyebrow text-muted">{askContent.label}</p>
          <AskForm
            id="help"
            placeholder={askContent.placeholder}
            submitLabel={askContent.submitLabel}
          />
        </div>
      </Container>
    </section>
  );
}
