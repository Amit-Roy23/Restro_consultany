import type { PageHeaderContent } from "@/types";

export const pageHeaders = {
  about: {
    label: "About",
    title: "A passionate team of food & beverage consultants.",
    intro:
      "Since 2011 we've helped owners turn an idea, a site and a budget into a running restaurant, hotel or kitchen.",
  },
  services: {
    label: "Services",
    title: "From kitchen layout to handover.",
    intro:
      "Restaurant set-up, kitchen operations, staffing, franchise and brand support — planned, budgeted and documented as SOPs your team can follow.",
  },
  projects: {
    label: "Projects",
    title: "Our work, in kitchens, dining rooms and the press.",
    intro:
      "Projects completed since 2011, plus photos from the kitchens we've set up, the teams we've trained and the brands we've worked with.",
  },
  contact: {
    label: "Contact",
    title: "Tell us what you're building.",
    intro:
      "A new restaurant, a hotel F&B outlet, a banquet or a cloud kitchen — ask us anything and we'll get back to you.",
  },
} satisfies Record<string, PageHeaderContent>;

export const contactPage = {
  askHeading: "Ask Resto",
  detailsHeading: "Reach us",
  /** Shown while no contact details are configured in src/config/site.ts. */
  detailsPending: "Phone, email and office address will be published here shortly.",
  stepsHeading: "What happens next",
  steps: [
    "We read your question and look at the property, concept and budget.",
    "We suggest the right scope — layout, menu, SOPs, staffing or a full set-up.",
    "We plan, budget and work with your architects through to handover.",
  ],
};

export const galleryPage = {
  number: 4,
  label: "Gallery",
  title: "Photos from our projects and partners.",
  sections: [
    { category: "kitchen", title: "Kitchens we've set up" },
    { category: "interior", title: "Dining rooms & interiors" },
    { category: "training", title: "Training & teams" },
    { category: "team", title: "Our people" },
    { category: "creative", title: "Food styling & creatives for our clients" },
    { category: "press", title: "In the press" },
  ],
} as const;

export const notFoundContent = {
  label: "404",
  title: "This table isn't on the floor plan.",
  intro: "The page you're looking for has moved or never existed.",
  cta: { label: "Back to home", href: "/" },
};
