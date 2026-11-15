import { navCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import type {
  AskContent,
  CtaBandContent,
  FeaturedWorkContent,
  HeroContent,
  HowWeHelpContent,
  ImageAsset,
  InsightsContent,
} from "@/types";

/* ------------------------------------------------------------------ */
/* Hero                                                               */
/* ------------------------------------------------------------------ */

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

/** Images that cross-fade inside the hero's growing showcase frame. */
export const heroShowcase: ImageAsset[] = [
  { src: "/images/projects/fine-dining.jpg", alt: "A fine-dining room we helped open" },
  { src: "/images/projects/cafe-chain.jpg", alt: "A café chain interior" },
  { src: "/images/projects/hotel-bar.jpg", alt: "A hotel bar after our redesign" },
];

/* ------------------------------------------------------------------ */
/* Ask                                                                */
/* ------------------------------------------------------------------ */

export const askContent: AskContent = {
  label: "Ask Restro",
  title: "Ask Restro",
  placeholder: "Ask us anything…",
  submitLabel: "Send question",
  suggestionsLabel: "Not sure where to start? Try one of these.",
  suggestions: [
    "What does a restaurant consultant actually do?",
    "How much does it cost to open a restaurant?",
    "Show me work relevant to my concept…",
    "How is Restro different from a typical agency?",
  ],
};

/* ------------------------------------------------------------------ */
/* Featured work                                                      */
/* ------------------------------------------------------------------ */

export const featuredWorkContent: FeaturedWorkContent = {
  number: 1,
  label: "Featured work",
  title: "We fix the problems that sink restaurants.",
  intro:
    "We don't start with the décor. We start with the people eating, cooking and serving — their habits, their constraints, and what's quietly eating into the margin.",
  readMoreLabel: "Read the case study",
  projects: [
    {
      client: "Regional Café Chain",
      sector: "Quick service",
      summary:
        "Fourteen outlets, fourteen different menus and food costs drifting past 40%. We rebuilt the menu, the prep system and the supplier list — food cost is now under 29%.",
      image: { src: "/images/projects/cafe-chain.jpg", alt: "Café chain counter" },
      href: "/projects",
    },
    {
      client: "Coastal Fine Dining",
      sector: "Fine dining",
      summary:
        "A chef with a brilliant tasting menu and a room that was half empty on weekdays. We reworked pricing, service flow and the weekday offer until the books balanced.",
      image: { src: "/images/projects/fine-dining.jpg", alt: "Fine-dining room" },
      href: "/projects",
    },
    {
      client: "Multi-brand Cloud Kitchen",
      sector: "Delivery",
      summary:
        "Six delivery brands out of one kitchen, and none of them profitable. We merged the prep lines, cut the SKUs by half and relaunched two brands that now carry the site.",
      image: { src: "/images/projects/cloud-kitchen.jpg", alt: "Cloud kitchen line" },
      href: "/projects",
    },
    {
      client: "Boutique Hotel Group",
      sector: "Hotel F&B",
      summary:
        "Three hotel bars treated as an afterthought. We gave each a concept, a cocktail programme and a team structure — beverage revenue tripled in the first year.",
      image: { src: "/images/projects/hotel-bar.jpg", alt: "Hotel bar" },
      href: "/projects",
    },
  ],
  industryPrompt: { label: "Show me work in my segment…", href: "/projects" },
  moreCta: { label: "See more work", href: "/projects" },
};

/* ------------------------------------------------------------------ */
/* How we help                                                        */
/* ------------------------------------------------------------------ */

export const howWeHelpContent: HowWeHelpContent = {
  number: 2,
  label: "How we help",
  title: "You're running something complicated.",
  intro:
    "We've stood behind the pass before. The problems usually sound something like this.",
  items: [
    {
      problem: "“We're busy every night, but somehow there's never any money left.”",
      solution:
        "We find where the margin leaks — menu, waste, labour, rent — and plug it.",
      href: "/services",
    },
    {
      problem: "“We have the idea and the site. We don't know what comes next.”",
      solution:
        "We turn a concept into a costed plan, a kitchen layout and an opening date.",
      href: "/services",
    },
    {
      problem: "“Our kitchen is slow and the tickets keep backing up.”",
      solution: "We redesign stations, prep and flow so the pass runs on time.",
      href: "/services",
    },
    {
      problem: "“Staff leave every three months and we're always training.”",
      solution: "We build the hiring, training and SOPs that make good people stay.",
      href: "/services",
    },
    {
      problem: "“We want to open a second outlet without breaking the first.”",
      solution: "We systemise what works so it can be repeated in a new city.",
      href: "/services",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Insights (the "what we're into" wall)                              */
/* ------------------------------------------------------------------ */

export const insightsContent: InsightsContent = {
  number: 3,
  label: "Journal",
  title: "What we're cooking up right now.",
  cta: { label: "Read the journal", href: "/about" },
  cards: [
    {
      kind: "image",
      tag: "Menu lab",
      title: "Why your best-selling dish might be losing you money",
      image: {
        src: "/images/insights/menu-lab.jpg",
        alt: "Plates on a test kitchen pass",
      },
      href: "/about",
    },
    {
      kind: "quote",
      tag: "Client story",
      quote: "They spoke chef and they spoke spreadsheet. That's rare.",
      href: "/about",
    },
    {
      kind: "stat",
      tag: "Research",
      value: "6 of 10",
      caption:
        "new restaurants never see their third birthday. Here's what the other four do.",
      href: "/about",
    },
    {
      kind: "image",
      tag: "People",
      title: "Inside our kitchen-design workshop",
      image: { src: "/images/insights/team.jpg", alt: "Team planning a kitchen layout" },
      href: "/about",
    },
    {
      kind: "image",
      tag: "Openings",
      title: "Opening night checklist, 30 days out",
      image: {
        src: "/images/insights/opening-night.jpg",
        alt: "A restaurant on opening night",
      },
      href: "/about",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Closing call to action                                             */
/* ------------------------------------------------------------------ */

export const ctaBandContent: CtaBandContent = {
  title: "Got a hard problem on the floor? We're listening.",
  body: "Tell us what you're facing and we'll take it from there.",
  cta: { label: "Get in touch", href: "/contact" },
};
