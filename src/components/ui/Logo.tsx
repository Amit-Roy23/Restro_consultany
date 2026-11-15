import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Hide the text and show the mark only. */
  markOnly?: boolean;
};

/** Brand mark (key + cloche "R") with the stacked wordmark. */
export function Logo({ className, markOnly = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        "group inline-flex items-center gap-3 text-foreground transition-colors hover:text-accent",
        className,
      )}
    >
      <Image
        src="/brand/resto-mark-light.png"
        alt=""
        width={531}
        height={598}
        className="h-11 w-auto transition-transform duration-300 group-hover:-rotate-6"
        preload
      />
      {!markOnly && (
        <span className="flex flex-col font-display text-[1.35rem] leading-[0.95] font-bold tracking-[-0.03em]">
          {siteConfig.logoLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </span>
      )}
    </Link>
  );
}
