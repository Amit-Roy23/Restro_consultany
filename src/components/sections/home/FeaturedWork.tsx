import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { featuredWorkContent } from "@/content/home";

/** Light section with case-study cards that stack on top of each other on scroll. */
export function FeaturedWork() {
  const {
    number,
    label,
    title,
    intro,
    projects,
    readMoreLabel,
    industryPrompt,
    moreCta,
  } = featuredWorkContent;

  return (
    <section
      aria-labelledby="work-heading"
      className="bg-foreground py-24 text-background md:py-32"
    >
      <Container>
        <SectionLabel number={number} tone="light">
          {label}
        </SectionLabel>
        <h2 id="work-heading" className="mt-6 max-w-4xl text-5xl md:text-7xl">
          {title}
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-ink-muted">{intro}</p>

        <ol className="mt-16 md:mt-20">
          {projects.map((project, index) => (
            <li
              key={project.client}
              className="sticky mb-[8vh] last:mb-0"
              style={{ top: `calc(var(--nav-height) + ${index * 1.25}rem)` }}
            >
              <article className="grid overflow-hidden rounded-lg border border-background/10 bg-paper shadow-[0_-20px_60px_-30px_rgba(20,16,13,0.35)] lg:min-h-[72vh] lg:grid-cols-12">
                <div className="flex flex-col justify-between gap-10 p-7 md:p-12 lg:col-span-5">
                  <h3 className="font-sans text-4xl font-bold tracking-[-0.035em] md:text-5xl">
                    {project.client}
                  </h3>
                  <div>
                    <span className="inline-block rounded-sm bg-background/[0.06] px-2.5 py-1 text-xs font-medium text-ink-muted">
                      {project.sector}
                    </span>
                    <p className="mt-5 font-display text-2xl leading-snug font-normal tracking-[-0.01em] md:text-3xl">
                      {project.summary}
                    </p>
                    <Link
                      href={project.href}
                      className="group mt-8 inline-flex items-center gap-2 text-sm font-medium"
                    >
                      {readMoreLabel}
                      <span className="inline-flex size-8 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform group-hover:translate-x-1">
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="relative min-h-[280px] lg:col-span-7">
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Link
            href={industryPrompt.href}
            className="rounded-full border border-background/15 px-6 py-3 text-sm text-ink-muted transition-colors hover:border-background hover:text-background"
          >
            {industryPrompt.label}
          </Link>
          <Button href={moreCta.href} variant="dark">
            {moreCta.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
