import type { SiteConfig } from "@/types";

/**
 * Global brand settings. Every component reads from this file.
 *
 * TODO (missing from the company profile): email, phone, address, city and
 * social links. Empty values are hidden on the site until they are filled in.
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
    email: "",
    phone: "",
    city: "",
    address: "",
  },
  socials: [],
};
