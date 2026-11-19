import { img } from "@/content/gallery";
import type { Messages } from "@/i18n/messages/en";
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
 * Home page content = structure (images, links, names, years) defined here +
 * text from the active language (src/i18n/messages/*).
 * Video slots: add a file to /public/videos and set its `video` / `src`.
 */

export function buildHomeContent(m: Messages) {
  /* ------------------------------------------------------------------ */
  /* Hero                                                               */
  /* ------------------------------------------------------------------ */

  const heroContent: HeroContent = {
    eyebrow: m.hero.eyebrow,
    headline: m.hero.headline,
    description: m.hero.description,
    stats: [
      { value: "635+", label: m.hero.statProjects },
      { value: "30+", label: m.hero.statBrands },
      { value: "2", label: m.hero.statCountries },
    ],
  };

  /* ------------------------------------------------------------------ */
  /* Ask                                                                */
  /* ------------------------------------------------------------------ */

  const askContent: AskContent = {
    label: m.ask.title,
    title: m.ask.title,
    placeholder: m.ask.placeholder,
    submitLabel: m.ask.submit,
    suggestionsLabel: m.ask.suggestionsLabel,
    suggestions: m.ask.suggestions,
  };

  /* ------------------------------------------------------------------ */
  /* About                                                              */
  /* ------------------------------------------------------------------ */

  const aboutContent: AboutContent = {
    number: 1,
    label: m.about.label,
    title: m.about.title,
    paragraphs: m.about.paragraphs,
    founder: {
      name: "", // TODO: founder's name is not in the profile
      role: m.about.founderRole,
      image: img("/images/team/founder.jpg"),
    },
    video: {
      src: undefined, // e.g. "/videos/about.mp4"
      poster: img("/images/team/chef-brigade-2.jpg"),
    },
    market: {
      value: "7.2%",
      caption: m.about.marketCaption,
      body: m.about.marketBody,
    },
    philosophy: m.about.philosophy,
  };

  /* ------------------------------------------------------------------ */
  /* Services                                                           */
  /* ------------------------------------------------------------------ */

  const servicesContent: ServicesContent = {
    number: 3,
    label: m.services.label,
    title: m.services.title,
    intro: m.services.intro,
    groups: m.services.groups,
    cta: { label: m.services.cta, href: "/services" },
  };

  /* ------------------------------------------------------------------ */
  /* Projects                                                           */
  /* ------------------------------------------------------------------ */

  const projectsContent: ProjectsContent = {
    number: 4,
    label: m.projects.label,
    title: m.projects.title,
    intro: m.projects.intro,
    featured: [
      {
        name: "Hotel Daltin",
        type: m.projects.featured[0].type,
        location: "New Digha, West Bengal",
        year: "2021",
        summary: m.projects.featured[0].summary,
        image: img("/images/creatives/hotel-daltin-57.jpg"),
      },
      {
        name: "The Bhoj Company",
        type: m.projects.featured[1].type,
        location: "Kolkata & Dhaka",
        year: "2017–18",
        summary: m.projects.featured[1].summary,
        image: img("/images/creatives/the-bhoj-company-71.jpg"),
      },
      {
        name: "Bangla Canvas",
        type: m.projects.featured[2].type,
        location: "Delhi & Noida",
        year: "2023",
        summary: m.projects.featured[2].summary,
        image: img("/images/creatives/bangla-canvas-99.jpg"),
      },
      {
        name: "Kaftaan",
        type: m.projects.featured[3].type,
        location: "Patuli, Garia, Kolkata",
        year: "2019",
        summary: m.projects.featured[3].summary,
        image: img("/images/creatives/kaftaan-110.jpg"),
      },
    ],
    listHeading: m.projects.listHeading,
    list: [
      {
        year: "2011",
        name: "Venky Residency",
        details: m.projects.list[0],
        location: "Kakinada, Andhra Pradesh",
        image: img("/images/interiors/interior-04.jpg"), // TODO: placeholder — replace with a photo of this project
      },
      {
        year: "2014",
        name: "Master Chefs Restaurant & Qazi Banquet",
        details: m.projects.list[1],
        location: "Sodepur, West Bengal",
        image: img("/images/team/chef-brigade.jpg"), // TODO: placeholder — replace with a photo of this project
      },
      {
        year: "2016",
        name: "Belini",
        details: m.projects.list[2],
        location: "G S Road, Guwahati, Assam",
        image: img("/images/interiors/interior-01.jpg"), // TODO: placeholder — replace with a photo of this project
      },
      {
        year: "2017",
        name: "The Bhoj Company",
        details: m.projects.list[3],
        location: "Kolkata, West Bengal",
        image: img("/images/creatives/the-bhoj-company-71.jpg"),
      },
      {
        year: "2018",
        name: "The Bhoj Company",
        details: m.projects.list[4],
        location: "Dhaka, Bangladesh",
        image: img("/images/creatives/the-bhoj-company-72.jpg"),
      },
      {
        year: "2018",
        name: "Daruchini",
        details: m.projects.list[5],
        location: "Khardah, West Bengal",
        image: img("/images/interiors/interior-03.jpg"), // TODO: placeholder — replace with a photo of this project
      },
      {
        year: "2019",
        name: "Kaftaan",
        details: m.projects.list[6],
        location: "Patuli, Garia, Kolkata",
        image: img("/images/creatives/kaftaan-110.jpg"),
      },
      {
        year: "2021",
        name: "Hotel Daltin",
        details: m.projects.list[7],
        location: "New Digha, West Bengal",
        image: img("/images/creatives/hotel-daltin-57.jpg"),
      },
      {
        year: "2022",
        name: "My Chef",
        details: m.projects.list[8],
        location: "Thakur Village, Mumbai",
        image: img("/images/kitchens/kitchen-03.jpg"), // TODO: placeholder — replace with a photo of this project
      },
      {
        year: "2022",
        name: "Narkelkunja Island Resort",
        details: m.projects.list[9],
        location: "Agartala, Tripura",
        image: img("/images/interiors/interior-02.jpg"), // TODO: placeholder — replace with a photo of this project
      },
      {
        year: "2023",
        name: "Bangla Canvas",
        details: m.projects.list[10],
        location: "Delhi & Noida",
        image: img("/images/creatives/bangla-canvas-99.jpg"),
      },
      {
        year: "2024",
        name: "Raj Darbar",
        details: m.projects.list[11],
        location: "Ruby, West Bengal",
        image: img("/images/kitchens/kitchen-05.jpg"), // TODO: placeholder — replace with a photo of this project
      },
    ],
    moreCta: { label: m.projects.moreCta, href: "/projects" },
  };

  /* ------------------------------------------------------------------ */
  /* Clients                                                            */
  /* ------------------------------------------------------------------ */

  const clientsContent: ClientsContent = {
    number: 5,
    label: m.clients.label,
    title: m.clients.title,
    intro: m.clients.intro,
    groups: [
      {
        title: m.clients.groupTitles[0],
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
        title: m.clients.groupTitles[1],
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
        title: m.clients.groupTitles[2],
        names: [
          "Mio Amore — Asia's largest bakery chain",
          "Brunch Italino — 180+ outlets",
          "Bleubury — patisserie & gifting studio",
        ],
      },
      {
        title: m.clients.groupTitles[3],
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
    otherSectors: m.clients.otherSectors,
  };

  /** Short names for the scrolling marquee in the clients section. */
  const clientMarquee: string[][] = [
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

  const wallContent: WallContent = {
    number: 7,
    label: m.wall.label,
    title: m.wall.title,
    cta: { label: m.wall.cta, href: "/projects" },
    cards: [
      {
        kind: "image",
        tag: m.wall.pressTag,
        title: m.wall.pressTitle,
        image: img("/images/press/press-01.jpg"),
        href: "/projects",
      },
      {
        kind: "image",
        tag: "Aashirvaad by ITC",
        title: m.wall.aashirvaadTitle,
        image: img("/images/creatives/aashirvaad-itc-44.jpg"),
        href: "/projects",
      },
      {
        kind: "quote",
        tag: m.wall.shootsTag,
        quote: m.wall.shootsQuote,
        href: "/projects",
      },
      {
        kind: "image",
        tag: m.wall.trainingTag,
        title: m.wall.trainingTitle,
        image: img("/images/training/training-01.jpg"),
        href: "/projects",
      },
      {
        kind: "stat",
        tag: m.wall.statTag,
        value: "635+",
        caption: m.wall.statCaption,
        href: "/projects",
      },
      {
        kind: "image",
        tag: "The Bhoj Company",
        title: m.wall.bhojTitle,
        image: img("/images/press/press-08.jpg"),
        href: "/projects",
      },
      {
        kind: "image",
        tag: "Afraa Lounge",
        title: m.wall.afraaTitle,
        image: img("/images/creatives/afraa-lounge-68.jpg"),
        href: "/projects",
      },
      {
        kind: "image",
        tag: m.wall.kitchensTag,
        title: m.wall.kitchensTitle,
        image: img("/images/kitchens/kitchen-03.jpg"),
        href: "/projects",
      },
      {
        kind: "image",
        tag: "Brunch Italino",
        title: m.wall.brunchTitle,
        image: img("/images/creatives/brunch-italino-95.jpg"),
        href: "/projects",
      },
    ],
  };

  /* ------------------------------------------------------------------ */
  /* Closing call to action                                             */
  /* ------------------------------------------------------------------ */

  const ctaBandContent: CtaBandContent = {
    title: m.cta.title,
    body: m.cta.body,
    cta: { label: m.cta.button, href: "/contact" },
  };

  return {
    hero: heroContent,
    ask: askContent,
    about: aboutContent,
    services: servicesContent,
    projects: projectsContent,
    clients: clientsContent,
    clientMarquee,
    wall: wallContent,
    cta: ctaBandContent,
  };
}

export type HomeContent = ReturnType<typeof buildHomeContent>;
