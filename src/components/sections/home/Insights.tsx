import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { insightsContent } from "@/content/home";
import { cn } from "@/lib/utils";
import type { InsightCard } from "@/types";

/**
 * Desktop placement of each card. The heading stays pinned in the middle of
 * the screen while these cards scroll up past it.
 */
const placement = [
  "lg:top-[24%] lg:left-[5%] lg:w-[24vw] lg:max-w-[360px]",
  "lg:top-[34%] lg:right-[6%] lg:w-[26vw] lg:max-w-[380px]",
  "lg:top-[50%] lg:left-[14%] lg:w-[22vw] lg:max-w-[320px]",
  "lg:top-[60%] lg:right-[12%] lg:w-[22vw] lg:max-w-[320px]",
  "lg:top-[74%] lg:left-[36%] lg:w-[28vw] lg:max-w-[420px]",
];

export function Insights() {
  const { number, label, title, cta, cards } = insightsContent;

  return (
    <section
      aria-labelledby="insights-heading"
      className="relative overflow-clip bg-paper text-background lg:h-[280vh]"
    >
      <div className="flex flex-col items-center justify-center px-5 pt-24 pb-12 text-center lg:sticky lg:top-0 lg:h-svh lg:p-0">
        <SectionLabel number={number} tone="light">
          {label}
        </SectionLabel>
        <h2 id="insights-heading" className="mt-6 max-w-3xl text-5xl md:text-7xl">
          {title}
        </h2>
        <Button href={cta.href} variant="dark" className="mt-8">
          {cta.label}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>

      <ul className="relative z-10 grid gap-4 px-5 pb-24 sm:grid-cols-2 md:px-8 lg:absolute lg:inset-0 lg:block lg:p-0">
        {cards.map((card, index) => (
          <li key={index} className={cn("lg:absolute", placement[index])}>
            <InsightTile card={card} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Tag({ children, tone }: { children: React.ReactNode; tone: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-block self-start rounded-sm px-2 py-0.5 text-[0.7rem] font-medium",
        tone === "light" ? "bg-paper text-background" : "bg-background text-foreground",
      )}
    >
      {children}
    </span>
  );
}

function InsightTile({ card }: { card: InsightCard }) {
  const base =
    "group block overflow-hidden rounded-lg shadow-[0_30px_60px_-30px_rgba(20,16,13,0.45)] transition-transform duration-300 hover:-translate-y-1";

  if (card.kind === "image") {
    return (
      <Link href={card.href} className={cn(base, "relative aspect-[4/5] bg-surface")}>
        <Image
          src={card.image.src}
          alt={card.image.alt}
          fill
          sizes="(min-width: 1024px) 28vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
        <div className="absolute top-4 left-4">
          <Tag tone="light">{card.tag}</Tag>
        </div>
        <p className="absolute inset-x-5 bottom-5 font-display text-2xl leading-tight text-foreground">
          {card.title}
        </p>
      </Link>
    );
  }

  if (card.kind === "quote") {
    return (
      <Link
        href={card.href}
        className={cn(base, "flex aspect-[4/3] flex-col justify-between bg-accent p-6")}
      >
        <Tag tone="dark">{card.tag}</Tag>
        <p className="font-display text-2xl leading-snug text-accent-foreground md:text-3xl">
          {card.quote}
        </p>
      </Link>
    );
  }

  return (
    <Link
      href={card.href}
      className={cn(
        base,
        "flex aspect-[4/5] flex-col justify-between bg-[linear-gradient(170deg,var(--background)_40%,#7a3f1e)] p-6 text-foreground",
      )}
    >
      <Tag tone="light">{card.tag}</Tag>
      <div>
        <p className="font-display text-7xl font-semibold tracking-tight">{card.value}</p>
        <p className="mt-4 font-display text-xl leading-snug">{card.caption}</p>
      </div>
    </Link>
  );
}
