import { navCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { img } from "@/content/gallery";
import type {
  AboutContent,
  AskContent,
  ClientsContent,
  CtaBandContent,
  HeroContent,
  ProjectsContent,
  ServicesContent,
  WallContent,
} from "@/types";

/*
 * All copy below comes from the Resto Consultancy company profile.
 * Video slots: add a file to /public/videos and set its `video` / `src`.
 */

/* ------------------------------------------------------------------ */
/* Hero                                                               */
/* ------------------------------------------------------------------ */

export const heroContent: HeroContent = {
  eyebrow: `Food & Beverage Consultants · Since ${siteConfig.foundedYear}`,
  headline: [
    [{ text: "Restaurants, hotels" }],
    [{ text: "& kitchens that work" }],
    [{ text: "from " }, { text: "day one.", accent: true }],
  ],
  description:
    "We set up fully functional food & beverage businesses — from kitchen layout and menu planning to sourcing, SOPs, staffing and handover.",
  primaryCta: navCta,
  secondaryCta: { label: "See our projects", href: "/projects" },
  stats: [
    { value: "11", label: "Projects" },
    { value: "30+", label: "Brands" },
    { value: "2", label: "Countries" },
  ],
  scrollLabel: "Scroll",
  images: [
    img("/images/team/hospitality-team.jpg"),
    img("/images/team/chef-brigade.jpg"),
    img("/images/interiors/interior-01.jpg"),
    img("/images/kitchens/kitchen-03.jpg"),
    img("/images/training/training-01.jpg"),
  ],
  showcase: {
    caption: "Restaurants · Lounges · Hotels · Kitchens",
    // Mood footage: a 9 s muted loop cut from supplied lounge footage.
    video: "/videos/hero.mp4",
    videoPoster: "/videos/hero-poster.jpg",
    tiles: [
      img("/images/interiors/interior-02.jpg"),
      img("/images/kitchens/kitchen-01.jpg"),
      img("/images/interiors/interior-03.jpg"),
      img("/images/training/training-02.jpg"),
      img("/images/interiors/interior-04.jpg"),
      img("/images/kitchens/kitchen-05.jpg"),
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Ask                                                                */
/* ------------------------------------------------------------------ */

export const askContent: AskContent = {
  label: "Ask Resto",
  title: "Ask Resto",
  placeholder: "Ask us anything…",
  submitLabel: "Send question",
  suggestionsLabel: "Not sure where to start? Try one of these.",
  suggestions: [
    "Can you set up my restaurant from scratch?",
    "What does a kitchen layout with SOP include?",
    "Do you work with hotels and resorts?",
    "Can you help with menu planning and costing?",
  ],
};

/* ------------------------------------------------------------------ */
/* About                                                              */
/* ------------------------------------------------------------------ */

export const aboutContent: AboutContent = {
  number: 1,
  label: "Who we are",
  title: "Expert food & beverage consultants, from first plan to handover.",
  paragraphs: [
    "We help our clients set up fully functional food & beverage businesses. Our team has extensive experience in developing, launching and supporting many national and international start-ups, with end-to-end consulting — from sourcing raw materials to testing and manufacturing the product.",
    "We are a passionate, dedicated team providing hospitality solutions to prestigious clients. We offer technical and advisory support and work alongside architects and other consultants to deliver a product in line with the owner's vision and budget — and we're flexible enough to bring them on board as your project needs.",
  ],
  founder: {
    name: "", // TODO: founder's name is not in the profile
    role: "Founder, Resto Consultancy",
    image: img("/images/team/founder.jpg"),
  },
  video: {
    src: undefined, // e.g. "/videos/about.mp4"
    poster: img("/images/team/chef-brigade-2.jpg"),
  },
  market: {
    value: "7.2%",
    caption: "Projected CAGR of India's F&B market, 2019–2024 (Market Study)",
    body: "Behind the success of food & beverage companies sit accurate, impeccable consultations — guidance on quality, productivity and process safety. Every new entrant needs a robust process plan, sound raw-material sourcing and the right ingredients in the right ratios.",
  },
  philosophy:
    "We're inspired by clients who value creative design and want a competitive edge. We combine strategic thinking and creative insight with market trends and economic evaluation — so intuition and experience come together in an authentic brand story.",
};

/* ------------------------------------------------------------------ */
/* Services                                                           */
/* ------------------------------------------------------------------ */

export const servicesContent: ServicesContent = {
  number: 2,
  label: "What we do",
  title: "Everything it takes to open — and keep running.",
  intro:
    "End-to-end food & beverage consulting, organised the way a property actually comes together.",
  groups: [
    {
      title: "Restaurant set-up & SOPs",
      summary: "From the first floor plan to handing over a running property.",
      items: [
        "Kitchen and restaurant layout with SOP",
        "Food & beverage menu planning",
        "Menu-wise kitchen equipment & utensils procurement",
        "Food & beverage budgeting",
        "Menu, mocktail & cocktail trials",
        "Final presentation of food",
        "Standardised vendor management",
        "Overall staff budgeting",
        "Housekeeping materials as per SOP",
        "Housekeeping operations as per SOP",
        "Handover once the property is operational",
      ],
    },
    {
      title: "Kitchen operations",
      summary: "Systems that keep the kitchen consistent, safe and costed.",
      items: [
        "Food receiving",
        "Segregation of food products",
        "Storage facilities development",
        "Daily food & beverage operations as per SOP",
        "Food & beverage inventory",
        "Food & beverage costing",
      ],
    },
    {
      title: "Business & growth support",
      summary:
        "People, spaces, brands and partnerships — support that carries on long after opening day.",
      items: [
        "Manpower support",
        "Staff training & management",
        "Layout & interior support",
        "Auditing",
        "Handling leased properties",
        "Franchise support",
        "Brand support",
        "Property management on a profit-sharing basis",
      ],
    },
  ],
  cta: { label: "All services", href: "/services" },
};

/* ------------------------------------------------------------------ */
/* Projects                                                           */
/* ------------------------------------------------------------------ */

export const projectsContent: ProjectsContent = {
  number: 3,
  label: "Projects",
  title: "Hotels, restaurants and kitchens we've delivered.",
  intro:
    "Eleven projects across India and Bangladesh — from 3-star hotels and island resorts to Bengali restaurants, banquets and cloud kitchens.",
  featured: [
    {
      name: "Hotel Daltin",
      type: "Premium 3-star hotel · 54 keys",
      location: "New Digha, West Bengal",
      year: "2021",
      summary:
        "A 54-key premium three-star hotel on the coast at New Digha, West Bengal.",
      image: img("/images/creatives/hotel-daltin-57.jpg"),
    },
    {
      name: "The Bhoj Company",
      type: "Bengali restaurant · 92 + 54 covers",
      location: "Kolkata & Dhaka",
      year: "2017–18",
      summary:
        "A 92-cover Bengali restaurant in Kolkata, followed by a 54-cover outlet in Dhaka. The brand now runs four outlets in Kolkata and one in Dhaka.",
      image: img("/images/creatives/the-bhoj-company-71.jpg"),
    },
    {
      name: "Bangla Canvas",
      type: "Bengali restaurant & café · 40 + 20 covers",
      location: "Delhi & Noida",
      year: "2023",
      summary:
        "A 40-cover Bengali restaurant in Delhi and a 20-cover Bengali café in Noida for India's only multinational ethnic food & lifestyle brand inspired by Bengali culture.",
      image: img("/images/creatives/bangla-canvas-99.jpg"),
    },
    {
      name: "Kaftaan",
      type: "Cloud kitchen",
      location: "Patuli, Garia, Kolkata",
      year: "2019",
      summary:
        "A delivery-first cloud kitchen in Patuli, Garia — biryani, chaap and more.",
      image: img("/images/creatives/kaftaan-110.jpg"),
    },
  ],
  listHeading: "Projects completed",
  list: [
    {
      year: "2011",
      name: "Venky Residency",
      details: "55 keys · 3-star hotel",
      location: "Kakinada, Andhra Pradesh",
      image: img("/images/interiors/interior-04.jpg"), // TODO: placeholder — replace with a photo of this project
    },
    {
      year: "2014",
      name: "Master Chefs Restaurant & Qazi Banquet",
      details: "Restaurant & banquet",
      location: "Sodepur, West Bengal",
      image: img("/images/team/chef-brigade.jpg"), // TODO: placeholder — replace with a photo of this project
    },
    {
      year: "2016",
      name: "Belini",
      details: "200-cover multi-cuisine resto-bar",
      location: "G S Road, Guwahati, Assam",
      image: img("/images/interiors/interior-01.jpg"), // TODO: placeholder — replace with a photo of this project
    },
    {
      year: "2017",
      name: "The Bhoj Company",
      details: "92-cover Bengali restaurant",
      location: "Kolkata, West Bengal",
      image: img("/images/creatives/the-bhoj-company-71.jpg"),
    },
    {
      year: "2018",
      name: "The Bhoj Company",
      details: "54-cover Bengali restaurant",
      location: "Dhaka, Bangladesh",
      image: img("/images/creatives/the-bhoj-company-72.jpg"),
    },
    {
      year: "2018",
      name: "Daruchini",
      details: "Multi-cuisine restaurant & 500-cover banquet",
      location: "Khardah, West Bengal",
      image: img("/images/interiors/interior-03.jpg"), // TODO: placeholder — replace with a photo of this project
    },
    {
      year: "2019",
      name: "Kaftaan",
      details: "Cloud kitchen",
      location: "Patuli, Garia, Kolkata",
      image: img("/images/creatives/kaftaan-110.jpg"),
    },
    {
      year: "2021",
      name: "Hotel Daltin",
      details: "54 keys · Premium 3-star hotel",
      location: "New Digha, West Bengal",
      image: img("/images/creatives/hotel-daltin-57.jpg"),
    },
    {
      year: "2022",
      name: "My Chef",
      details: "Cloud kitchen",
      location: "Thakur Village, Mumbai",
      image: img("/images/kitchens/kitchen-03.jpg"), // TODO: placeholder — replace with a photo of this project
    },
    {
      year: "2022",
      name: "Narkelkunja Island Resort",
      details: "Island resort",
      location: "Agartala, Tripura",
      image: img("/images/interiors/interior-02.jpg"), // TODO: placeholder — replace with a photo of this project
    },
    {
      year: "2023",
      name: "Bangla Canvas",
      details: "40-cover Bengali restaurant · 20-cover Bengali café",
      location: "Delhi & Noida",
      image: img("/images/creatives/bangla-canvas-99.jpg"),
    },
    {
      year: "2024",
      name: "Raj Darbar",
      details: "60-cover restaurant with 150-cover banquet",
      location: "Ruby, West Bengal",
      image: img("/images/kitchens/kitchen-05.jpg"), // TODO: placeholder — replace with a photo of this project
    },
  ],
  moreCta: { label: "See the full gallery", href: "/projects" },
};

/* ------------------------------------------------------------------ */
/* Clients                                                            */
/* ------------------------------------------------------------------ */

export const clientsContent: ClientsContent = {
  number: 4,
  label: "Professional association",
  title: "Brands we've worked with.",
  intro:
    "From four-star hotels and Asia's largest lounge to bakery chains with 180+ outlets — the hospitality names we've partnered with.",
  groups: [
    {
      title: "Hotels & resorts",
      names: [
        "Allita Hotels & Resorts (4-star)",
        "Hotel Monotel (4-star) — a unit of Haldiram",
        "Hotel De Sovrani (3-star) — a unit of D.C. Paul",
        "Hotel Daltin (premium 3-star)",
        "Hotel Marigold (3-star budget)",
        "Hotel La Mishika",
      ],
    },
    {
      title: "Restaurants, lounges & bars",
      names: [
        "Ambuja Neotia — Sonar Tori, The Orient, Afraa Lounge, Conclave at Afraa, Loafer's Cafe",
        "Speciality Group — Mainland China, Riyasaat, Hoppipola, Haka, Oh! Calcutta",
        "The Bhoj Company — 4 outlets in Kolkata, 1 in Dhaka",
        "Club Fenicia — Asia's largest lounge",
        "BJ's Sports Lounge & Cafe",
        "Lords & Barons",
        "Miss Ginko",
        "Red Kitchen & Lounge",
        "Opium — Kolkata's oldest rock bar",
        "Bangla Canvas — New Delhi, Noida & Kolkata",
        "Lusscibo World Cuisine",
      ],
    },
    {
      title: "Bakery & patisserie",
      names: [
        "Mio Amore — Asia's largest bakery chain",
        "Brunch Italino — 180+ outlets",
        "Bleubury — patisserie & gifting studio",
      ],
    },
    {
      title: "Cloud kitchens & FMCG",
      names: [
        "Moti Mahal Delux",
        "Kaftaan",
        "My Chef",
        "Desi Chullah",
        "My Fishwala — fresh fish delivery",
        "Aashirvaad by ITC Limited",
      ],
    },
  ],
  otherSectors:
    "Beyond hospitality, our clients include salon, kitchen-appliance and fashion brands — EyeCatcher, Häfele, Maaya, Adore India and many others.",
};

/** Short names for the scrolling marquee in the clients section. */
export const clientMarquee: string[][] = [
  [
    "Mainland China",
    "Oh! Calcutta",
    "Allita",
    "Monotel",
    "Club Fenicia",
    "The Bhoj Company",
    "Afraa Lounge",
    "Sonar Tori",
    "Aashirvaad",
  ],
  [
    "Mio Amore",
    "Brunch Italino",
    "Bangla Canvas",
    "Hoppipola",
    "Haka",
    "Riyasaat",
    "De Sovrani",
    "Bleubury",
    "Moti Mahal Delux",
  ],
];

/* ------------------------------------------------------------------ */
/* Wall (cards scrolling past a pinned heading)                       */
/* ------------------------------------------------------------------ */

export const wallContent: WallContent = {
  number: 5,
  label: "Kitchens, people & press",
  title: "From our kitchens to the front page.",
  cta: { label: "View the gallery", href: "/projects" },
  cards: [
    {
      kind: "image",
      tag: "In the press",
      title: "Our work, across print and TV",
      image: img("/images/press/press-01.jpg"),
      href: "/projects",
    },
    {
      kind: "image",
      tag: "Aashirvaad by ITC",
      title: "Food styling for Aashirvaad Mishti Doi",
      image: img("/images/creatives/aashirvaad-itc-44.jpg"),
      href: "/projects",
    },
    {
      kind: "quote",
      tag: "Press shoots",
      quote:
        "Shoots for ABP (Anandabazar Patrika) at Monotel and Howard Johnson, Kolkata.",
      href: "/projects",
    },
    {
      kind: "image",
      tag: "Training",
      title: "Training the floor team before opening",
      image: img("/images/training/training-01.jpg"),
      href: "/projects",
    },
    {
      kind: "stat",
      tag: "Since 2011",
      value: "11",
      caption: "hotels, restaurants and kitchens delivered across India and Bangladesh.",
      href: "/projects",
    },
    {
      kind: "image",
      tag: "The Bhoj Company",
      title: "First look: the fourth Bhoj Company outlet",
      image: img("/images/press/press-08.jpg"),
      href: "/projects",
    },
    {
      kind: "image",
      tag: "Afraa Lounge",
      title: "Ambuja Neotia's Afraa Lounge",
      image: img("/images/creatives/afraa-lounge-68.jpg"),
      href: "/projects",
    },
    {
      kind: "image",
      tag: "Kitchens",
      title: "A kitchen line, ready for service",
      image: img("/images/kitchens/kitchen-03.jpg"),
      href: "/projects",
    },
    {
      kind: "image",
      tag: "Brunch Italino",
      title: "Celebration cakes for 180+ outlets",
      image: img("/images/creatives/brunch-italino-95.jpg"),
      href: "/projects",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Closing call to action                                             */
/* ------------------------------------------------------------------ */

export const ctaBandContent: CtaBandContent = {
  title: "Planning a restaurant, hotel or cloud kitchen? Let's talk.",
  body: "Tell us what you're building and we'll take it from there.",
  cta: { label: "Book a consultation", href: "/contact" },
};
