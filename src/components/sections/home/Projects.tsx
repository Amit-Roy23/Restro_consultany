import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VideoSlot } from "@/components/ui/VideoSlot";
import { projectsContent } from "@/content/home";

type ProjectsProps = {
  showCta?: boolean;
  showHeading?: boolean;
};

/** Featured projects as stacking cards, followed by the full project list. */
export function Projects({ showCta = true, showHeading = true }: ProjectsProps) {
  const { number, label, title, intro, featured, listHeading, list, moreCta } =
    projectsContent;

  return (
    <section
      aria-labelledby="projects-heading"
      className="bg-foreground py-24 text-background md:py-32"
    >
      <Container>
        <SectionLabel number={number} tone="light">
          {label}
        </SectionLabel>
        <h2
          id="projects-heading"
          className={showHeading ? "mt-6 max-w-4xl text-5xl md:text-7xl" : "sr-only"}
        >
          {title}
        </h2>
        {showHeading && <p className="mt-6 max-w-2xl text-lg text-ink-muted">{intro}</p>}

        <ol className="mt-16 md:mt-20">
          {featured.map((project, index) => (
            <li
              key={project.name}
              className="sticky mb-[8vh] last:mb-0"
              style={{ top: `calc(var(--nav-height) + ${index * 1.25}rem)` }}
            >
              <article className="grid overflow-hidden rounded-lg border border-background/10 bg-paper shadow-[0_-20px_60px_-30px_rgba(20,16,13,0.35)] lg:min-h-[70vh] lg:grid-cols-12">
                <div className="flex flex-col justify-between gap-10 p-7 md:p-12 lg:col-span-6">
                  <div>
                    <p className="eyebrow text-accent-deep">{project.year}</p>
                    <h3 className="mt-3 font-sans text-4xl font-bold tracking-[-0.035em] md:text-5xl">
                      {project.name}
                    </h3>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-ink-muted">
                      <span className="rounded-sm bg-background/[0.06] px-2.5 py-1">
                        {project.type}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3.5" aria-hidden="true" />
                        {project.location}
                      </span>
                    </div>
                    <p className="mt-5 font-display text-2xl leading-snug md:text-3xl">
                      {project.summary}
                    </p>
                  </div>
                </div>
                <div className="relative min-h-[300px] bg-background lg:col-span-6">
                  {project.video ? (
                    <VideoSlot src={project.video.src} poster={project.video.poster} />
                  ) : (
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </div>
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-24">
          <h3 className="eyebrow font-sans text-ink-muted">{listHeading}</h3>
          <ol className="mt-6 border-b border-background/15">
            {list.map((item) => (
              <li
                key={`${item.year}-${item.name}-${item.location}`}
                className="grid gap-1 border-t border-background/15 py-5 md:grid-cols-[5rem_1.2fr_1fr_1fr] md:items-baseline md:gap-6"
              >
                <span className="font-display text-lg text-accent-deep">{item.year}</span>
                <span className="font-sans text-lg font-semibold tracking-tight">
                  {item.name}
                </span>
                <span className="text-sm text-ink-muted">{item.details}</span>
                <span className="text-sm text-ink-muted">{item.location}</span>
              </li>
            ))}
          </ol>
        </div>

        {showCta && (
          <Button href={moreCta.href} variant="dark" className="mt-12">
            {moreCta.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        )}
      </Container>
    </section>
  );
}
