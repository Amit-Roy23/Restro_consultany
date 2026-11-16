import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Circular badge with text running around a slowly rotating ring. */
export function RotatingStamp({
  text,
  children,
  className,
}: {
  text: string;
  children?: ReactNode;
  className?: string;
}) {
  const id = `stamp-${text.replace(/[^a-z0-9]/gi, "").slice(0, 16)}`;
  return (
    <div className={cn("relative grid size-36 place-items-center", className)}>
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="absolute inset-0 animate-[spin_18s_linear_infinite] motion-reduce:animate-none"
      >
        <defs>
          <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-current text-[15px] font-semibold tracking-[0.32em] uppercase">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <div className="relative">{children}</div>
    </div>
  );
}
