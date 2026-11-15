export type NavItem = {
  label: string;
  href: string;
};

export type SocialPlatform = "instagram" | "linkedin" | "whatsapp" | "facebook";

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
  /** Leave a field empty ("") to hide it everywhere on the site. */
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
  width?: number;
  height?: number;
};

export type GalleryImage = ImageAsset & {
  width: number;
  height: number;
  category: "team" | "kitchen" | "interior" | "training" | "press" | "creative";
  /** Client brand shown on a creative. */
  brand?: string;
};

/**
 * A slot that shows a video once `src` is provided, and the poster image
 * (or poster mosaic) until then.
 */
export type VideoAsset = {
  /** e.g. "/videos/hero.mp4" — leave undefined until the video is ready. */
  src?: string;
  poster: ImageAsset;
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
  showcase: {
    caption: string;
    video?: string;
    /** First frame of the video, shown while it loads. */
    videoPoster?: string;
    /** Shown as a mosaic until the showcase video is added. */
    tiles: ImageAsset[];
  };
};

export type AskContent = {
  label: string;
  title: string;
  placeholder: string;
  submitLabel: string;
  suggestionsLabel: string;
  suggestions: string[];
};

export type AboutContent = {
  number: number;
  label: string;
  title: string;
  paragraphs: string[];
  founder: {
    /** Leave empty to hide the name line. */
    name: string;
    role: string;
    image: ImageAsset;
  };
  video: VideoAsset;
  market: {
    value: string;
    caption: string;
    body: string;
  };
  philosophy: string;
};

export type ServiceGroup = {
  title: string;
  summary: string;
  items: string[];
};

export type ServicesContent = {
  number: number;
  label: string;
  title: string;
  intro: string;
  groups: ServiceGroup[];
  cta: Cta;
};

export type FeaturedProject = {
  name: string;
  type: string;
  location: string;
  year: string;
  summary: string;
  image: ImageAsset;
  video?: VideoAsset;
};

export type ProjectListItem = {
  year: string;
  name: string;
  details: string;
  location: string;
};

export type ProjectsContent = {
  number: number;
  label: string;
  title: string;
  intro: string;
  featured: FeaturedProject[];
  listHeading: string;
  list: ProjectListItem[];
  moreCta: Cta;
};

export type ClientGroup = {
  title: string;
  names: string[];
};

export type ClientsContent = {
  number: number;
  label: string;
  title: string;
  intro: string;
  groups: ClientGroup[];
  otherSectors: string;
};

export type WallCard =
  | { kind: "image"; tag: string; title: string; image: ImageAsset; href: string }
  | { kind: "quote"; tag: string; quote: string; href: string }
  | { kind: "stat"; tag: string; value: string; caption: string; href: string };

export type WallContent = {
  number: number;
  label: string;
  title: string;
  cta: Cta;
  cards: WallCard[];
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

export type PageHeaderContent = {
  label: string;
  title: string;
  intro: string;
};
