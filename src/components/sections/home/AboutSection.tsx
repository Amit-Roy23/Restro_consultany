import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VideoSlot } from "@/components/ui/VideoSlot";
import { aboutContent } from "@/content/home";

/** Who we are: story, founder portrait, market context and a team video slot. */
export function AboutSection() {
  const { number, label, title, paragraphs, founder, video, market, philosophy } =
    aboutContent;
  const [lead, ...rest] = paragraphs;

  return (
    <section
      aria-labelledby="about-heading"
      className="bg-foreground py-24 text-background md:py-32"
    >
      <Container>
        <SectionLabel number={number} tone="light">
          {label}
        </SectionLabel>
        <h2 id="about-heading" className="mt-6 max-w-4xl text-5xl md:text-7xl">
          {title}
        </h2>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="font-display text-2xl leading-snug md:text-3xl">{lead}</p>
            {rest.map((paragraph) => (
              <p key={paragraph} className="mt-6 text-lg text-ink-muted">
                {paragraph}
              </p>
            ))}

            <blockquote className="mt-12 border-l-2 border-accent-deep pl-6 font-display text-xl leading-relaxed italic md:text-2xl">
              {philosophy}
            </blockquote>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5">
            <figure className="overflow-hidden rounded-lg bg-paper">
              <div className="relative aspect-square">
                <Image
                  src={founder.image.src}
                  alt={founder.image.alt}
                  fill
                  sizes="(min-width: 1024px) 36vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="px-6 py-5">
                {founder.name && (
                  <p className="font-sans text-lg font-semibold">{founder.name}</p>
                )}
                <p className="text-sm text-ink-muted">{founder.role}</p>
              </figcaption>
            </figure>

            <div className="rounded-lg bg-background p-7 text-foreground">
              <p className="font-display text-6xl font-semibold tracking-tight text-accent">
                {market.value}
              </p>
              <p className="mt-3 eyebrow text-muted">{market.caption}</p>
              <p className="mt-5 text-sm leading-relaxed text-foreground/80">
                {market.body}
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-16 aspect-[16/9] overflow-hidden rounded-lg md:aspect-[1017/400]">
          <VideoSlot
            src={video.src}
            poster={video.poster}
            sizes="(min-width: 1280px) 1200px, 100vw"
          />
        </div>
      </Container>
    </section>
  );
}
