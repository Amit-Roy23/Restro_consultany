import { cn } from "@/lib/utils";

const BARS = Array.from({ length: 64 }, (_, i) => ({
  height: 30 + ((i * 37) % 70),
  delay: -((i * 0.13) % 1.6),
}));

/** Row of thin animated bars, like a sound meter — decoration only. */
export function EqualizerBars({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none flex h-16 items-end gap-[3px] md:h-24",
        className,
      )}
    >
      {BARS.map((bar, index) => (
        <span
          key={index}
          className="w-[2px] origin-bottom animate-eq bg-current motion-reduce:animate-none"
          style={{ height: `${bar.height}%`, animationDelay: `${bar.delay}s` }}
        />
      ))}
    </div>
  );
}
