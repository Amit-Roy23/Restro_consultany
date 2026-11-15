import type { StubPageContent } from "@/types";

const comingSoon = "This page is being prepared. Check back soon.";

export const stubPages = {
  about: { label: "About", title: "About us", body: comingSoon },
  services: { label: "Services", title: "Services", body: comingSoon },
  projects: { label: "Projects", title: "Projects", body: comingSoon },
  contact: { label: "Contact", title: "Contact", body: comingSoon },
} satisfies Record<string, StubPageContent>;

export const notFoundContent = {
  label: "404",
  title: "This table isn't on the floor plan.",
  body: "The page you're looking for has moved or never existed.",
  cta: { label: "Back to home", href: "/" },
};
