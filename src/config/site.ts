import type { SiteConfig } from "@/types";

/**
 * Global brand settings. Every component reads from this file.
 *
 * TODO (not yet supplied): phone, address, city and social links. Empty values
 * are hidden on the site until they are filled in.
 */
export const siteConfig: SiteConfig = {
  name: "Resto Consultancy",
  logoLines: ["Resto", "Consultancy"],
  tagline: "Food & beverage consultants for restaurants, hotels and cloud kitchens.",
  description:
    "Resto Consultancy sets up fully functional food & beverage businesses — restaurants, hotels, banquets and cloud kitchens — from kitchen layout and menu planning to SOPs, staffing and handover.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  foundedYear: 2011,
  contact: {
    email: "restoconsultancyofficial@gmail.com",
    phone: "",
    city: "",
    address: "",
    /** WhatsApp for the Restaurant Business Solutions (Buy & Sell) page. */
    businessWhatsapp: "+91 91010 46487",
  },
  // Add the official profiles here; icons appear in the footer automatically.
  // e.g. { platform: "instagram", label: "Instagram", href: "https://instagram.com/…" }
  // Platforms: instagram, facebook, youtube, linkedin, whatsapp (href "https://wa.me/91…").
  socials: [],
};
