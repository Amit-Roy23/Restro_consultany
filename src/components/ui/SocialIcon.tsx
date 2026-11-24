import type { SocialPlatform } from "@/types";

type SocialIconProps = {
  platform: SocialPlatform;
  className?: string;
};

/**
 * Minimal outline brand glyphs (lucide-react no longer ships brand logos).
 * Stroke-based so they match lucide's visual weight.
 */
export function SocialIcon({ platform, className }: SocialIconProps) {
  const common = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };

  switch (platform) {
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 10.5V16" />
          <circle cx="8" cy="7.6" r="0.6" fill="currentColor" />
          <path d="M11.5 16v-5.5M11.5 13a2.5 2.5 0 0 1 5 0v3" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.3z" />
          <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .8a4.5 4.5 0 0 1-2.2-2.2l.8-1-1-2z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <path d="M15 8h-1.5A2.5 2.5 0 0 0 11 10.5V21M8.5 13.5H14" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
          <path d="M10.5 9.5v5l4-2.5z" fill="currentColor" />
        </svg>
      );
  }
}
