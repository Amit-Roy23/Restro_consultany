import { navCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import type { HeroContent } from "@/types";

export const heroContent: HeroContent = {
  eyebrow: `Hospitality Consultancy · Since ${siteConfig.foundedYear}`,
  headline: [
    [{ text: "We build restaurants" }],
    [{ text: "that are still " }, { text: "profitable", accent: true }],
    [{ text: "in year two." }],
  ],
  description:
    "Concept, kitchen, menu engineering and operations — we sit beside founders from the first sketch to the hundredth service, so the numbers hold up after the launch buzz fades.",
  primaryCta: navCta,
  secondaryCta: { label: "See our work", href: "/projects" },
  stats: [
    { value: "150+", label: "Projects" },
    { value: "12", label: "Cities" },
    { value: "15", label: "Years" },
  ],
  scrollLabel: "Scroll",
  images: [
    { src: "/images/hero/kitchen-pass.jpg", alt: "Warm lights over a busy kitchen pass" },
    {
      src: "/images/hero/dining-room.jpg",
      alt: "A softly lit dining room before service",
    },
    { src: "/images/hero/chef-table.jpg", alt: "Candlelight at a chef's table" },
    { src: "/images/hero/bar-counter.jpg", alt: "Glowing bottles behind a bar counter" },
    {
      src: "/images/hero/tasting-menu.jpg",
      alt: "Amber light across a tasting-menu service",
    },
  ],
};
