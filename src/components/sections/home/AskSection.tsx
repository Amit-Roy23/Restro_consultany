import Link from "next/link";

import { AskForm } from "@/components/ui/AskForm";
import { Container } from "@/components/ui/Container";
import { FloatingDots } from "@/components/ui/FloatingDots";
import { askContent } from "@/content/home";

/**
 * Huge "Ask" wordmark pinned in place while a frosted card of suggested
 * questions scrolls up over it (the card's backdrop blur softens the type).
 */
export function AskSection() {
  const { title, placeholder, submitLabel, suggestionsLabel, suggestions } = askContent;

  return (
    <section aria-labelledby="ask-heading" className="relative bg-background">
      <div className="grain sticky top-0 flex h-svh items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_60%_50%_at_20%_80%,rgba(150,70,35,0.28),transparent_70%),radial-gradient(ellipse_50%_50%_at_85%_20%,rgba(217,120,42,0.16),transparent_70%)]">
        <FloatingDots />
        <h2
          id="ask-heading"
          className="px-5 text-center font-display text-[clamp(4rem,15vw,14rem)] leading-none font-bold tracking-[-0.05em] text-accent"
        >
          {title}
        </h2>
      </div>

      <Container className="relative z-10 -mt-[48svh] pb-[24svh]">
        <div className="mx-auto max-w-xl rounded-[28px] border border-foreground/10 bg-surface/35 p-4 shadow-2xl backdrop-blur-2xl sm:p-6">
          <p className="mb-4 text-center eyebrow text-muted">{suggestionsLabel}</p>
          <ul className="flex flex-col gap-2.5">
            {suggestions.map((suggestion) => (
              <li key={suggestion}>
                <Link
                  href={`/contact?q=${encodeURIComponent(suggestion)}`}
                  className="block rounded-full border border-foreground/10 bg-background/40 px-6 py-4 text-center text-sm text-foreground/90 transition-colors hover:border-accent hover:text-accent"
                >
                  {suggestion}
                </Link>
              </li>
            ))}
          </ul>
          <div className="my-6 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
          <AskForm
            id="section"
            placeholder={placeholder}
            submitLabel={submitLabel}
            size="lg"
          />
        </div>
      </Container>
    </section>
  );
}
