"use client";


import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { useContent } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import { LineReveal } from "@/components/ui/LineReveal";

/** Resto business management: business types drifting in two marquee rows. */
export function ManagementSection() {
  const { biz } = useContent();
  const { management: m } = biz;
  const half = Math.ceil(m.types.length / 2);
  const rows = [m.types.slice(0, half), m.types.slice(half)];

  return (
    <section
      id="management"
      aria-labelledby="management-heading"
      className="relative scroll-mt-6 overflow-hidden bg-[linear-gradient(160deg,var(--background)_0%,#22160f_55%,#4a2412_100%)] py-24 md:py-32"
    >
      <Container>
        <SectionLabel>{m.label}</SectionLabel>
        <TextReveal
          id="management-heading"
          text={m.title}
          className="mt-6 max-w-4xl text-4xl md:text-6xl"
        />
      </Container>

      <ul aria-label={m.types.join(", ")} className="mt-14 flex flex-col gap-4">
        {rows.map((row, rowIndex) => (
          <li key={rowIndex} aria-hidden="true" className="flex overflow-hidden">
            <div
              className={cn(
                "flex shrink-0 animate-marquee gap-4 pr-4 [animation-duration:38s] motion-reduce:animate-none",
                rowIndex === 1 && "[animation-direction:reverse]",
              )}
            >
              {[...row, ...row, ...row].map((type, index) => (
                <span
                  key={`${type}-${index}`}
                  className={cn(
                    "rounded-full border px-7 py-3 font-display text-2xl whitespace-nowrap md:text-4xl",
                    index % 3 === 0
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-foreground/15 text-foreground",
                  )}
                >
                  {type}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>

      <Container className="mt-20 grid gap-10 lg:grid-cols-12">
        <LineReveal
          lines={m.tagline}
          className="font-display text-5xl leading-[1.02] font-semibold md:text-7xl lg:col-span-7"
          lastClassName="text-accent italic"
        />
        <Reveal inView className="self-end lg:col-span-4 lg:col-start-9">
          <p className="text-lg text-foreground/80">{m.body}</p>
        </Reveal>
      </Container>
    </section>
  );
}
