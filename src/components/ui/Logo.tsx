import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        "inline-flex flex-col font-display text-[1.6rem] leading-[0.9] font-bold tracking-[-0.04em] text-foreground transition-colors hover:text-accent",
        className,
      )}
    >
      {siteConfig.logoLines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </Link>
  );
}
