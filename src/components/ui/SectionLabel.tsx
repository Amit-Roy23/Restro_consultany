import { cn } from "@/lib/utils";

type SectionLabelProps = {
  /** Optional index, rendered zero-padded: 1 → "01". */
  number?: number;
  children: React.ReactNode;
  className?: string;
};

export function SectionLabel({ number, children, className }: SectionLabelProps) {
  return (
    <p className={cn("flex items-center gap-3 eyebrow text-muted", className)}>
      {number !== undefined && (
        <>
          <span className="text-accent">{String(number).padStart(2, "0")}</span>
          <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
        </>
      )}
      <span>{children}</span>
    </p>
  );
}
