import type { Messages } from "@/i18n/messages/en";
import type { Cta, MenuPromo, NavItem } from "@/types";

/** Navigation labels for the active language (hrefs are the same everywhere). */
export function buildNavigation(m: Messages) {
  const mainNav: NavItem[] = [
    { label: m.nav.home, href: "/" },
    { label: m.nav.about, href: "/about" },
    { label: m.nav.services, href: "/services" },
    { label: m.nav.projects, href: "/projects" },
    { label: m.nav.contact, href: "/contact" },
  ];

  const navCta: Cta = { label: m.nav.bookConsultation, href: "/contact" };

  const legalNav: NavItem[] = [
    { label: m.nav.terms, href: "#" },
    { label: m.nav.privacy, href: "#" },
  ];

  const menuPromo: MenuPromo = {
    title: m.nav.promoTitle,
    cta: { label: m.nav.promoCta, href: "/contact" },
  };

  const navStrings = {
    skipToContent: m.nav.skipToContent,
    openMenu: m.nav.openMenu,
    closeMenu: m.nav.closeMenu,
    menuTitle: m.nav.menuTitle,
    menuNavLabel: m.nav.menuNavLabel,
    footerNavLabel: m.nav.footerNavLabel,
    exploreHeading: m.nav.explore,
    footerContactHeading: m.nav.contactHeading,
    rightsReserved: m.nav.rightsReserved,
    language: m.nav.language,
  };

  return { mainNav, navCta, legalNav, menuPromo, navStrings };
}
