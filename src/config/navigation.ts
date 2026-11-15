import type { Cta, NavItem } from "@/types";

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export const navCta: Cta = { label: "Book Consultation", href: "/contact" };

export const legalNav: NavItem[] = [
  { label: "Terms", href: "#" },
  { label: "Privacy", href: "#" },
];

/** UI strings used by the navigation chrome (menu, footer headings). */
export const navStrings = {
  skipToContent: "Skip to content",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  mainNavLabel: "Main navigation",
  mobileNavLabel: "Mobile navigation",
  footerNavLabel: "Footer navigation",
  menuTitle: "Menu",
  footerLinksHeading: "Explore",
  footerContactHeading: "Contact",
  footerSocialHeading: "Follow",
  rightsReserved: "All rights reserved.",
};
