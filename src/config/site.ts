import type { SiteConfig } from "@/types";

/**
 * Global brand settings. Change the brand name, contact details and social
 * links here — every component reads from this file.
 */
export const siteConfig: SiteConfig = {
  name: "Resto Consultancy",
  logoLines: ["Resto", "Consultancy"],
  tagline: "Restaurant consulting for operators who plan to last.",
  description:
    "Resto Consultancy is a hospitality consultancy helping restaurant founders and groups plan, open and run venues that stay profitable long after opening night.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  foundedYear: 2010,
  contact: {
    email: "hello@restoconsultancy.example",
    phone: "+91 98765 43210",
    city: "Mumbai, India",
    address: "Studio 4, 21 Harbour Lane, Mumbai 400001",
  },
  socials: [
    { platform: "instagram", label: "Instagram", href: "https://instagram.com/" },
    { platform: "linkedin", label: "LinkedIn", href: "https://linkedin.com/" },
    { platform: "whatsapp", label: "WhatsApp", href: "https://wa.me/919876543210" },
  ],
};
