import type { Cta, MenuPromo, NavItem } from "@/types";

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

/** Small promo card shown at the bottom of the menu overlay. */
export const menuPromo: MenuPromo = {
  title: "Opening a restaurant this year?",
  cta: { label: "Talk to us", href: "/contact" },
};

/** UI strings used by the navigation chrome (menu, footer headings). */
export const navStrings = {
  skipToContent: "Skip to content",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  menuTitle: "Menu",
  menuNavLabel: "Site navigation",
  footerNavLabel: "Footer navigation",
  exploreHeading: "Explore",
  footerContactHeading: "Contact",
  rightsReserved: "All rights reserved.",
};
