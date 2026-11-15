import { cn } from "@/lib/utils";

/** Deterministic pseudo-random generator so server and client markup match. */
function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

const rand = seeded(42);
const DOTS = Array.from({ length: 34 }, () => ({
  top: rand() * 100,
  left: rand() * 100,
  size: 3 + rand() * 5,
  dx: (rand() - 0.5) * 60,
  dy: (rand() - 0.5) * 60,
  delay: -rand() * 14,
  opacity: 0.45 + rand() * 0.55,
}));

/** Softly drifting accent-coloured particles for dark backgrounds. */
export function FloatingDots({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {DOTS.map((dot, index) => (
        <span
          key={index}
          className="absolute animate-drift rounded-full bg-accent motion-reduce:animate-none"
          style={
            {
              top: `${dot.top}%`,
              left: `${dot.left}%`,
              width: dot.size,
              height: dot.size,
              opacity: dot.opacity,
              animationDelay: `${dot.delay}s`,
              "--dx": `${dot.dx}px`,
              "--dy": `${dot.dy}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
