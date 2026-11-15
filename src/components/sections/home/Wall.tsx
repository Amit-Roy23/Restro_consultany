import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { wallContent } from "@/content/home";
import { cn } from "@/lib/utils";
import type { WallCard } from "@/types";

/** How far each card drifts, so neighbours move at different speeds. */
const drift = [140, 60, 180, 90, 150, 50, 170, 110, 70];

/**
 * Desktop placement of each card. The heading stays pinned in the middle of
 * the screen while these cards scroll up past it.
 */
const placement = [
  "lg:top-[13%] lg:left-[5%] lg:w-[22vw] lg:max-w-[340px]",
  "lg:top-[19%] lg:right-[6%] lg:w-[20vw] lg:max-w-[320px]",
  "lg:top-[30%] lg:left-[30%] lg:w-[20vw] lg:max-w-[300px]",
  "lg:top-[38%] lg:right-[16%] lg:w-[21vw] lg:max-w-[320px]",
  "lg:top-[47%] lg:left-[8%] lg:w-[20vw] lg:max-w-[300px]",
  "lg:top-[56%] lg:right-[4%] lg:w-[22vw] lg:max-w-[340px]",
  "lg:top-[65%] lg:left-[26%] lg:w-[20vw] lg:max-w-[300px]",
  "lg:top-[73%] lg:left-[4%] lg:w-[19vw] lg:max-w-[300px]",
  "lg:top-[80%] lg:right-[18%] lg:w-[21vw] lg:max-w-[320px]",
];

export function Wall() {
  const { number, label, title, cta, cards } = wallContent;

  return (
    <section
      aria-labelledby="wall-heading"
      className="relative overflow-clip bg-paper text-background lg:h-[360vh]"
    >
      <div className="flex flex-col items-center justify-center px-5 pt-24 pb-12 text-center lg:sticky lg:top-0 lg:h-svh lg:p-0">
        <SectionLabel number={number} tone="light">
          {label}
        </SectionLabel>
        <h2 id="wall-heading" className="mt-6 max-w-3xl text-5xl md:text-7xl">
          {title}
        </h2>
        <Button href={cta.href} variant="dark" className="mt-8">
          {cta.label}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>

      <ul className="relative z-10 grid gap-4 px-5 pb-24 sm:grid-cols-2 md:px-8 lg:absolute lg:inset-0 lg:block lg:p-0">
        {cards.map((card, index) => (
          <li
            key={index}
            className={cn("lg:absolute", placement[index % placement.length])}
          >
            <Parallax distance={drift[index % drift.length]}>
              <WallTile card={card} />
            </Parallax>
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

function WallTile({ card }: { card: WallCard }) {
  const base =
    "group block overflow-hidden rounded-lg shadow-[0_30px_60px_-30px_rgba(20,16,13,0.45)] transition-transform duration-300 hover:-translate-y-1";

  if (card.kind === "image") {
    return (
      <Link href={card.href} className={cn(base, "relative aspect-[4/5] bg-surface")}>
        <Image
          src={card.image.src}
          alt={card.image.alt}
          fill
          sizes="(min-width: 1024px) 24vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
        <div className="absolute top-4 left-4">
          <Tag tone="light">{card.tag}</Tag>
        </div>
        <p className="absolute inset-x-5 bottom-5 font-display text-xl leading-tight text-foreground md:text-2xl">
          {card.title}
        </p>
      </Link>
    );
  }

  if (card.kind === "quote") {
    return (
      <Link
        href={card.href}
        className={cn(
          base,
          "flex aspect-[4/3] flex-col justify-between gap-6 bg-accent p-6",
        )}
      >
        <Tag tone="dark">{card.tag}</Tag>
        <p className="font-display text-2xl leading-snug text-accent-foreground">
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
        "flex aspect-[4/5] flex-col justify-between bg-[linear-gradient(170deg,var(--background)_40%,#7a3412)] p-6 text-foreground",
      )}
    >
      <Tag tone="light">{card.tag}</Tag>
      <div>
        <p className="font-display text-8xl font-semibold tracking-tight">{card.value}</p>
        <p className="mt-4 font-display text-xl leading-snug">{card.caption}</p>
      </div>
    </Link>
  );
}
