/**
 * English source text for the whole site. Every other language file has the
 * same shape (checked by TypeScript). Brand, client and project names are not
 * translated and live in src/content.
 */
export const en = {
  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    projects: "Projects",
    contact: "Contact",
    bookConsultation: "Book Consultation",
    terms: "Terms",
    privacy: "Privacy",
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuTitle: "Menu",
    menuNavLabel: "Site navigation",
    footerNavLabel: "Footer navigation",
    explore: "Explore",
    contactHeading: "Contact",
    rightsReserved: "All rights reserved.",
    language: "Language",
    promoTitle: "Planning a restaurant, hotel or cloud kitchen?",
    promoCta: "Talk to us",
  },
  site: {
    tagline: "Food & beverage consultants for restaurants, hotels and cloud kitchens.",
  },
  intro: {
    loadingLabel: "Loading Resto Consultancy",
    tagline: "Food & beverage consultants · Since 2011",
  },
  welcome: {
    title: "Welcome to Resto Mate Easy",
    subtitle: "We connect with you in your own language.",
    chooseLanguage: "Choose your language",
    ideaTitle: "Tell us your café or restaurant idea",
    ideaBody: "We'll help you plan it step by step.",
    projectsLabel: "successful projects completed",
    citiesTitle: "We are available across India",
    cities: [
      "Ahmedabad",
      "Surat",
      "Vadodara",
      "Kochi",
      "Coimbatore",
      "Mysuru",
      "Goa",
      "Patna",
      "Ranchi",
      "Jamshedpur",
      "Guwahati",
      "Indore",
      "Bhopal",
      "Raipur",
      "Dehradun",
      "Srinagar",
      "Siliguri",
    ],
    budgetLines: ["Your budget.", "Your business.", "Your brand."],
    budgetBody:
      "Tell us your investment budget and business vision. We'll help you build a business model that fits your goals.",
    buildButton: "Build my business model",
    next: "Next",
    back: "Back",
    skip: "Skip to website",
  },
  hero: {
    eyebrow: "Food & Beverage Consultants · Since 2011",
    headline: [
      [{ text: "Restaurants, hotels" }],
      [{ text: "& kitchens that work" }],
      [{ text: "from " }, { text: "day one.", accent: true }],
    ] as { text: string; accent?: boolean }[][],
    description:
      "We set up fully functional food & beverage businesses — from kitchen layout and menu planning to sourcing, SOPs, staffing and handover.",
    secondaryCta: "See our projects",
    statProjects: "Projects",
    statBrands: "Brands",
    statCountries: "Countries",
    scroll: "Scroll",
    showcaseCaption: "Restaurants · Lounges · Hotels · Kitchens",
  },
  ask: {
    title: "Ask Resto",
    placeholder: "Ask us anything…",
    submit: "Send question",
    suggestionsLabel: "Not sure where to start? Try one of these.",
    suggestions: [
      "Can you set up my restaurant from scratch?",
      "What does a kitchen layout with SOP include?",
      "Do you work with hotels and resorts?",
      "Can you help with menu planning and costing?",
    ],
  },
  about: {
    label: "Who we are",
    title: "Expert food & beverage consultants, from first plan to handover.",
    paragraphs: [
      "We help our clients set up fully functional food & beverage businesses. Our team has extensive experience in developing, launching and supporting many national and international start-ups, with end-to-end consulting — from sourcing raw materials to testing and manufacturing the product.",
      "We are a passionate, dedicated team providing hospitality solutions to prestigious clients. We offer technical and advisory support and work alongside architects and other consultants to deliver a product in line with the owner's vision and budget — and we're flexible enough to bring them on board as your project needs.",
    ],
    founderRole: "Founder, Resto Consultancy",
    marketCaption: "Projected CAGR of India's F&B market, 2019–2024 (Market Study)",
    marketBody:
      "Behind the success of food & beverage companies sit accurate, impeccable consultations — guidance on quality, productivity and process safety. Every new entrant needs a robust process plan, sound raw-material sourcing and the right ingredients in the right ratios.",
    philosophy:
      "We're inspired by clients who value creative design and want a competitive edge. We combine strategic thinking and creative insight with market trends and economic evaluation — so intuition and experience come together in an authentic brand story.",
  },
  services: {
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
    cta: "All services",
  },
  projects: {
    label: "Projects",
    title: "Hotels, restaurants and kitchens we've delivered.",
    intro:
      "635+ projects across India and Bangladesh — here are some of them, from 3-star hotels and island resorts to Bengali restaurants, banquets and cloud kitchens.",
    featured: [
      {
        type: "Premium 3-star hotel · 54 keys",
        summary:
          "A 54-key premium three-star hotel on the coast at New Digha, West Bengal.",
      },
      {
        type: "Bengali restaurant · 92 + 54 covers",
        summary:
          "A 92-cover Bengali restaurant in Kolkata, followed by a 54-cover outlet in Dhaka. The brand now runs four outlets in Kolkata and one in Dhaka.",
      },
      {
        type: "Bengali restaurant & café · 40 + 20 covers",
        summary:
          "A 40-cover Bengali restaurant in Delhi and a 20-cover Bengali café in Noida for India's only multinational ethnic food & lifestyle brand inspired by Bengali culture.",
      },
      {
        type: "Cloud kitchen",
        summary:
          "A delivery-first cloud kitchen in Patuli, Garia — biryani, chaap and more.",
      },
    ],
    listHeading: "Featured projects",
    list: [
      "55 keys · 3-star hotel",
      "Restaurant & banquet",
      "200-cover multi-cuisine resto-bar",
      "92-cover Bengali restaurant",
      "54-cover Bengali restaurant",
      "Multi-cuisine restaurant & 500-cover banquet",
      "Cloud kitchen",
      "54 keys · Premium 3-star hotel",
      "Cloud kitchen",
      "Island resort",
      "40-cover Bengali restaurant · 20-cover Bengali café",
      "60-cover restaurant with 150-cover banquet",
    ],
    moreCta: "See the full gallery",
  },
  clients: {
    label: "Professional association",
    title: "Brands we've worked with.",
    intro:
      "From four-star hotels and Asia's largest lounge to bakery chains with 180+ outlets — the hospitality names we've partnered with.",
    groupTitles: [
      "Hotels & resorts",
      "Restaurants, lounges & bars",
      "Bakery & patisserie",
      "Cloud kitchens & FMCG",
    ],
    otherSectors:
      "Beyond hospitality, our clients include salon, kitchen-appliance and fashion brands — EyeCatcher, Häfele, Maaya, Adore India and many others.",
  },
  wall: {
    label: "Kitchens, people & press",
    title: "From our kitchens to the front page.",
    cta: "View the gallery",
    pressTag: "In the press",
    pressTitle: "Our work, across print and TV",
    aashirvaadTitle: "Food styling for Aashirvaad Mishti Doi",
    shootsTag: "Press shoots",
    shootsQuote:
      "Shoots for ABP (Anandabazar Patrika) at Monotel and Howard Johnson, Kolkata.",
    trainingTag: "Training",
    trainingTitle: "Training the floor team before opening",
    statTag: "Since 2011",
    statCaption: "projects delivered across India and Bangladesh.",
    bhojTitle: "First look: the fourth Bhoj Company outlet",
    afraaTitle: "Ambuja Neotia's Afraa Lounge",
    kitchensTag: "Kitchens",
    kitchensTitle: "A kitchen line, ready for service",
    brunchTitle: "Celebration cakes for 180+ outlets",
  },
  cta: {
    title: "Planning a restaurant, hotel or cloud kitchen? Let's talk.",
    body: "Tell us what you're building and we'll take it from there.",
    button: "Book a consultation",
  },
  pages: {
    about: {
      label: "About",
      title: "A passionate team of food & beverage consultants.",
      intro:
        "Since 2011 we've helped owners turn an idea, a site and a budget into a running restaurant, hotel or kitchen.",
    },
    services: {
      label: "Services",
      title: "From kitchen layout to handover.",
      intro:
        "Restaurant set-up, kitchen operations, staffing, franchise and brand support — planned, budgeted and documented as SOPs your team can follow.",
    },
    projects: {
      label: "Projects",
      title: "Our work, in kitchens, dining rooms and the press.",
      intro:
        "Projects completed since 2011, plus photos from the kitchens we've set up, the teams we've trained and the brands we've worked with.",
    },
    contact: {
      label: "Contact",
      title: "Tell us what you're building.",
      intro:
        "A new restaurant, a hotel F&B outlet, a banquet or a cloud kitchen — ask us anything and we'll get back to you.",
    },
  },
  contact: {
    askHeading: "Ask Resto",
    detailsHeading: "Reach us",
    detailsPending: "Phone, email and office address will be published here shortly.",
    stepsHeading: "What happens next",
    steps: [
      "We read your question and look at the property, concept and budget.",
      "We suggest the right scope — layout, menu, SOPs, staffing or a full set-up.",
      "We plan, budget and work with your architects through to handover.",
    ],
  },
  gallery: {
    label: "Gallery",
    title: "Photos from our projects and partners.",
    kitchen: "Kitchens we've set up",
    interior: "Dining rooms & interiors",
    training: "Training & teams",
    team: "Our people",
    creative: "Food styling & creatives for our clients",
    press: "In the press",
  },
  notFound: {
    label: "404",
    title: "This table isn't on the floor plan.",
    intro: "The page you're looking for has moved or never existed.",
    cta: "Back to home",
  },
};

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : T extends object
      ? { [K in keyof T]: Widen<T[K]> }
      : T;

/** Shape every translation must follow. */
export type Messages = Widen<typeof en>;
