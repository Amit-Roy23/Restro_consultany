import { cn } from "@/lib/utils";

type SectionLabelProps = {
  /** Optional index, rendered zero-padded: 1 → "01". */
  number?: number;
  /** `light` for use on paper/cream backgrounds. */
  tone?: "dark" | "light";
  children: React.ReactNode;
  className?: string;
};

export function SectionLabel({
  number,
  tone = "dark",
  children,
  className,
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 eyebrow",
        tone === "dark" ? "text-muted" : "text-ink-muted",
        className,
      )}
    >
      {number !== undefined && (
        <>
          <span className={tone === "dark" ? "text-accent" : "text-accent-deep"}>
            {String(number).padStart(2, "0")}
          </span>
          <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
        </>
      )}
      <span>{children}</span>
    </p>
  );
}
