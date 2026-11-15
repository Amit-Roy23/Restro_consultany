import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Cta, StubPageContent } from "@/types";

type StubPageProps = {
  content: StubPageContent;
  cta?: Cta;
};

/** Placeholder layout shared by pages that are not built yet. */
export function StubPage({ content, cta }: StubPageProps) {
  return (
    <section className="grain flex min-h-[80svh] items-center bg-[radial-gradient(ellipse_60%_50%_at_90%_0%,rgba(201,161,91,0.14),transparent_70%)]">
      <Container className="pt-[calc(var(--nav-height)+4rem)] pb-24 md:pb-32">
        <SectionLabel>{content.label}</SectionLabel>
        <h1 className="mt-6 max-w-4xl text-5xl md:text-7xl">{content.title}</h1>
        <p className="mt-6 max-w-xl text-lg text-muted">{content.body}</p>
        {cta && (
          <Button href={cta.href} variant="outline" className="mt-10">
            {cta.label}
          </Button>
        )}
      </Container>
    </section>
  );
}
