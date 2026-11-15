export type NavItem = {
  label: string;
  href: string;
};

export type SocialPlatform = "instagram" | "linkedin" | "whatsapp";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  /** Wordmark split into stacked lines for the Logo component. */
  logoLines: string[];
  tagline: string;
  description: string;
  url: string;
  foundedYear: number;
  contact: {
    email: string;
    phone: string;
    city: string;
    address: string;
  };
  socials: SocialLink[];
};

export type Cta = {
  label: string;
  href: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type HeadlineSegment = {
  text: string;
  accent?: boolean;
};

export type ImageAsset = {
  src: string;
  alt: string;
};

export type HeroContent = {
  eyebrow: string;
  /** Each inner array is one visual line of the headline. */
  headline: HeadlineSegment[][];
  description: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  stats: Stat[];
  scrollLabel: string;
  images: ImageAsset[];
};

export type StubPageContent = {
  label: string;
  title: string;
  body: string;
};

export type AskContent = {
  label: string;
  title: string;
  placeholder: string;
  submitLabel: string;
  suggestionsLabel: string;
  suggestions: string[];
};

export type Project = {
  client: string;
  sector: string;
  summary: string;
  image: ImageAsset;
  href: string;
};

export type FeaturedWorkContent = {
  number: number;
  label: string;
  title: string;
  intro: string;
  projects: Project[];
  industryPrompt: Cta;
  moreCta: Cta;
  readMoreLabel: string;
};

export type HelpItem = {
  problem: string;
  solution: string;
  href: string;
};

export type HowWeHelpContent = {
  number: number;
  label: string;
  title: string;
  intro: string;
  items: HelpItem[];
};

export type InsightCard =
  | { kind: "image"; tag: string; title: string; image: ImageAsset; href: string }
  | { kind: "quote"; tag: string; quote: string; href: string }
  | { kind: "stat"; tag: string; value: string; caption: string; href: string };

export type InsightsContent = {
  number: number;
  label: string;
  title: string;
  cta: Cta;
  cards: InsightCard[];
};

export type CtaBandContent = {
  title: string;
  body: string;
  cta: Cta;
};

export type MenuPromo = {
  title: string;
  cta: Cta;
};
