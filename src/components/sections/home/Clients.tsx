import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { clientMarquee, clientsContent } from "@/content/home";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";

/** Scrolling marquee of brand names plus the full grouped client list. */
export function Clients() {
  const { number, label, title, intro, groups, otherSectors } = clientsContent;

  return (
    <section
      aria-labelledby="clients-heading"
      className="grain overflow-hidden bg-background py-24 md:py-32"
    >
      <Container>
        <SectionLabel number={number}>{label}</SectionLabel>
        <TextReveal
          id="clients-heading"
          text={title}
          className="mt-6 max-w-4xl text-5xl md:text-7xl"
        />
        <p className="mt-6 max-w-2xl text-lg text-muted">{intro}</p>
      </Container>

      <div aria-hidden="true" className="mt-16 flex flex-col gap-4 md:gap-6">
        {clientMarquee.map((row, rowIndex) => (
          <div key={rowIndex} className="flex overflow-hidden">
            <div
              className={cn(
                "flex shrink-0 animate-marquee items-center motion-reduce:animate-none",
                rowIndex % 2 === 1 && "[animation-direction:reverse]",
              )}
            >
              {[...row, ...row].map((name, index) => (
                <span
                  key={`${name}-${index}`}
                  className={cn(
                    "flex items-center gap-8 pr-8 font-display text-4xl font-semibold tracking-tight whitespace-nowrap md:gap-12 md:pr-12 md:text-7xl",
                    rowIndex % 2 === 0 ? "text-foreground" : "text-accent",
                  )}
                >
                  {name}
                  <span className="size-2 rounded-full bg-current opacity-50 md:size-3" />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Container>
        <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, index) => (
            <Reveal key={group.title} inView delay={index * 0.1}>
              <h3 className="eyebrow font-sans text-accent">{group.title}</h3>
              <ul className="mt-5 flex flex-col gap-3 text-sm leading-relaxed text-foreground/85">
                {group.names.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <p className="mt-14 max-w-3xl border-t border-border pt-8 text-muted">
          {otherSectors}
        </p>
      </Container>
    </section>
  );
}
