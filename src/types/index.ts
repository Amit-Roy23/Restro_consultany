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
