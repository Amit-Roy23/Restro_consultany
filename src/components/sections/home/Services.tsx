import { ArrowRight } from "lucide-react";

import { AskForm } from "@/components/ui/AskForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { askContent, servicesContent } from "@/content/home";

type ServicesProps = {
  /** Show the "All services" link (home page only). */
  showCta?: boolean;
  /** Use the section title as the page's h2 (false when a PageHeader h1 is above). */
  showHeading?: boolean;
};

/** Service groups as numbered rows, with a floating ask bar pinned to the bottom. */
export function Services({ showCta = true, showHeading = true }: ServicesProps) {
  const { number, label, title, intro, groups, cta } = servicesContent;

  return (
    <section
      aria-labelledby="services-heading"
      className="grain bg-background py-24 md:py-32"
    >
      <Container>
        <SectionLabel number={number}>{label}</SectionLabel>
        <h2
          id="services-heading"
          className={
            showHeading ? "mt-6 max-w-4xl text-5xl text-accent md:text-7xl" : "sr-only"
          }
        >
          {title}
        </h2>
        {showHeading && <p className="mt-6 max-w-2xl text-lg text-muted">{intro}</p>}

        <ol className="mt-16 border-b border-border">
          {groups.map((group, index) => (
            <li
              key={group.title}
              className="grid gap-6 border-t border-border py-10 md:grid-cols-[4rem_1fr] lg:grid-cols-[4rem_1fr_1.5fr] lg:gap-10"
            >
              <span className="font-display text-2xl text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-3xl md:text-4xl">{group.title}</h3>
                <p className="mt-3 max-w-sm text-muted">{group.summary}</p>
              </div>
              <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 md:col-start-2 lg:col-start-auto">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-foreground/90"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        {showCta && (
          <Button href={cta.href} variant="outline" className="mt-12">
            {cta.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        )}

        <div className="sticky bottom-6 z-20 mx-auto mt-16 max-w-lg rounded-[24px] border border-foreground/10 bg-surface/60 p-3 shadow-2xl backdrop-blur-xl">
          <p className="px-4 pt-1 pb-3 eyebrow text-muted">{askContent.label}</p>
          <AskForm
            id="services"
            placeholder={askContent.placeholder}
            submitLabel={askContent.submitLabel}
          />
        </div>
      </Container>
    </section>
  );
}
