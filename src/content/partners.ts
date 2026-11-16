/** "Our trusted brand partners" — logos supplied by the client (PDF, Nov 2026). */
export type BrandPartner = {
  name: string;
  src: string;
  width: number;
  height: number;
  /** Tile colour, sampled from the logo's own background so it blends in. */
  bg: string;
  /** `cover` for photos, `contain` for logos. */
  fit: "contain" | "cover";
};

export const brandPartners: BrandPartner[] = [
  {
    name: "Tulips Ooty Resorts",
    src: "/images/partners/tulips-ooty-resorts.jpg",
    width: 225,
    height: 225,
    bg: "#ffffff",
    fit: "contain",
  },
  {
    name: "Tulip Holidays",
    src: "/images/partners/tulip-holidays.jpg",
    width: 969,
    height: 430,
    bg: "#000000",
    fit: "contain",
  },
  {
    name: "Space Circle",
    src: "/images/partners/space-circle.jpg",
    width: 470,
    height: 425,
    bg: "#ffffff",
    fit: "contain",
  },
  {
    name: "Daltin Hotels, New Digha",
    src: "/images/partners/daltin-hotels.jpg",
    width: 447,
    height: 447,
    bg: "#ffffff",
    fit: "contain",
  },
  {
    name: "Lazy Dog Pizza Co.",
    src: "/images/partners/lazy-dog-pizza.jpg",
    width: 512,
    height: 512,
    bg: "#000000",
    fit: "contain",
  },
  {
    name: "Wow! Momo",
    src: "/images/partners/wow-momo.jpg",
    width: 225,
    height: 225,
    bg: "#f9d215",
    fit: "contain",
  },
  {
    name: "Mio Amore",
    src: "/images/partners/mio-amore.jpg",
    width: 554,
    height: 554,
    bg: "#ffffff",
    fit: "contain",
  },
  {
    name: "Shalimar's",
    src: "/images/partners/shalimars.jpg",
    width: 447,
    height: 447,
    bg: "#ffffff",
    fit: "contain",
  },
  {
    name: "FloraForge Vegan Kitchen",
    src: "/images/partners/floraforge.jpg",
    width: 1240,
    height: 826,
    bg: "#fff8f5",
    fit: "contain",
  },
  {
    name: "Aripana",
    src: "/images/partners/aripana.jpg",
    width: 1191,
    height: 877,
    bg: "#3f0303",
    fit: "contain",
  },
  {
    name: "Thangabali South Indian Restaurant",
    src: "/images/partners/thangabali.jpg",
    width: 900,
    height: 500,
    bg: "#ffc317",
    fit: "contain",
  },
  {
    name: "Travancore Restaurant",
    src: "/images/partners/travancore.jpg",
    width: 447,
    height: 447,
    bg: "#ffffff",
    fit: "contain",
  },
  {
    name: "Khola Baranda",
    src: "/images/partners/khola-baranda.jpg",
    width: 225,
    height: 225,
    bg: "#ffffff",
    fit: "contain",
  },
  {
    name: "Hyatt Regency",
    src: "/images/partners/hyatt-regency.jpg",
    width: 527,
    height: 582,
    bg: "#fcffff",
    fit: "contain",
  },
  {
    name: "Suto",
    src: "/images/partners/suto.jpg",
    width: 588,
    height: 285,
    bg: "#000000",
    fit: "contain",
  },
  {
    name: "Fortune \u2014 Member ITC Hotels' Group",
    src: "/images/partners/fortune.jpg",
    width: 496,
    height: 220,
    bg: "#ffffff",
    fit: "contain",
  },
  {
    name: "Borgos Resort & Spa",
    src: "/images/partners/borgos.jpg",
    width: 447,
    height: 447,
    bg: "#f2eeeb",
    fit: "contain",
  },
  {
    name: "Kolkata \u2014 Good Coffee",
    src: "/images/partners/kolkata-good-coffee.jpg",
    width: 554,
    height: 554,
    bg: "#785553",
    fit: "cover",
  },
  {
    name: "Coffee Cafe",
    src: "/images/partners/coffee-cafe.jpg",
    width: 554,
    height: 554,
    bg: "#ffffff",
    fit: "contain",
  },
];
