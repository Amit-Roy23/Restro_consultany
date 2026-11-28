# Resto Consultancy — Website

Lead-generation website for **Resto Consultancy**, food & beverage consultants for
restaurants, hotels, banquets and cloud kitchens. Dark, warm, editorial design in
the brand's brown and orange, with scroll-driven sections.

All copy, the logo and the photos come from the company profile document
(`RESTO_POWDER_POINT_1.docx`).

## Pages

| Route            | Contents                                                                              |
| ---------------- | ------------------------------------------------------------------------------------- |
| `/`              | Hero, Ask, About, Vision, Services, More ways, Projects, Clients, Why us, Wall, Motto |
| `/about`         | About, team, founder's vision, clients, why us                                        |
| `/services`      | Service groups (turnkey), business management, licensing, manpower                    |
| `/opportunities` | Business & franchise opportunities, restaurant & café buy/sell inquiry form           |
| `/projects`      | Featured projects, full project list, gallery of every supplied photo                 |
| `/contact`       | Ask box, next steps, contact details (hidden until filled in)                         |

## Home page sections

| Section        | File                                        | Behaviour                                                                                                                                                                                          |
| -------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero           | `components/sections/home/Hero.tsx`         | Desktop: photos drift outward while a showcase (video) grows to full screen. **Start Your Project** / **Free Consultation** open `LeadDialog.tsx`; rotating line shows the languages we consult in |
| Ask Resto      | `components/sections/home/AskSection.tsx`   | Giant pinned wordmark with drifting dots; frosted question card scrolls over it                                                                                                                    |
| 01 Who we are  | `components/sections/home/AboutSection.tsx` | Story, founder portrait, market stat, philosophy, team video slot                                                                                                                                  |
| 02 What we do  | `components/sections/home/Services.tsx`     | Service groups as numbered rows; floating ask bar                                                                                                                                                  |
| 03 Projects    | `components/sections/home/Projects.tsx`     | Featured projects as stacking cards + full list of completed projects                                                                                                                              |
| 04 Clients     | `components/sections/home/Clients.tsx`      | Scrolling marquee of brand names + grouped client list                                                                                                                                             |
| 05 Wall        | `components/sections/home/Wall.tsx`         | Pinned heading with photo, press and stat cards scrolling past                                                                                                                                     |
| Call to action | `components/sections/home/CtaBand.tsx`      | Orange band with animated equaliser bars                                                                                                                                                           |
| Footer         | `components/layout/Footer.tsx`              | Gradient footer revealed from under the page on desktop                                                                                                                                            |
| Menu           | `components/layout/MenuOverlay.tsx`         | Full-screen menu: links, Ask box and suggested questions                                                                                                                                           |

Business sections live in `components/sections/biz/`: `VisionSection`
(animated ecosystem hub), `OpportunitiesSection`, `BuySellSection` (inquiry
form), `ManagementSection`, `LicensingSection`, `ManpowerSection`, `TeamSection` (people and photos in `src/content/team.ts`), `BrandPartners` (tilted logo wall; logos in `public/images/partners/`, list in `src/content/partners.ts`), `WhySection`
(sticker cards + 99 → 1 problem counter), `MoreWays` (horizontal card rail) and
`MottoBand` (motto with rotating "Restaurant Made Easy" stamp). Their text is the
`biz` namespace of the messages (`src/i18n/messages/biz/<code>.ts` for each
translation).

The **buy/sell inquiry form** has no backend yet: submitting opens the visitor's
email app with a pre-filled message (labels always in English) to
`restoconsultancyofficial@gmail.com` (`siteConfig.contact.email`).

Shared motion primitives (`components/ui/`): `TextReveal` (masked word/letter
reveals), `ImageReveal` (curtain wipe), `Reveal` (fade-up), `StackCards`
(shrinking stacked cards), `Parallax`, `Magnetic` (buttons follow the cursor);
page fade-in lives in `app/template.tsx`.

First-visit loader: `components/layout/Preloader.tsx` (copy in `src/content/intro.ts`)
plays once per browser session; entrance animations wait for it via
`IntroProvider`. `src/lib/bootScript.ts` runs in `<head>` before paint: it skips
the loader if it already played, and on a browser **reload** always sends the
visitor to the homepage at the top.

## Languages

After the loading screen, a **welcome journey** (`components/layout/WelcomeFlow.tsx`)
asks the visitor to pick one of 12 languages, then shows the idea, 635+ projects,
cities and budget steps. The **Build my business model** button currently opens
the website — replace `onBuildModel` in `WelcomeFlow.tsx` when the client decides
what it should do.

- All text lives in `src/i18n/messages/<code>.ts` (`en` is the source; every other
  file must match its shape — TypeScript enforces it). Brand, client and project
  names stay in `src/content`.
- Languages: English, Hindi, Bengali, Gujarati, Marathi, Tamil, Telugu, Kannada,
  Malayalam, Punjabi, Odia, Assamese (`src/i18n/languages.ts`). Translations were
  machine-written and should be reviewed by native speakers.
- Each language button on the welcome screen shows a colourful illustration of a
  famous sight from its state (`components/layout/StateArt.tsx`, hand-drawn SVG).
- The choice is saved in the browser and can be changed from the menu or footer.
  Each language's text loads only when chosen; Noto fonts per script load only
  when that script is on screen.

The "Ask" boxes have no backend yet — they submit to `/contact?q=…`.
On phones and for visitors with "reduce motion" enabled, scroll effects fall back
to a static layout.

## Adding the videos

Video slots show a photo until a file is set. Put the files in `public/videos/`
(MP4/H.264, ideally under ~8 MB each) and set them in `src/content/home.ts`:

| Slot                    | Field                                        |
| ----------------------- | -------------------------------------------- |
| About / team video      | `aboutContent.video.src`                     |
| A featured project card | add `video: { src, poster }` to that project |

The hero showreel loop is `public/videos/hero.mp4` (`heroContent.showcase.video`).

## Resto Hospiverse and videos

- **Resto Hospiverse** (`components/sections/biz/HospiverseSection.tsx`, home page,
  menu link `/#hospiverse`): international markets one per line with live local
  time (`src/content/hospiverse.ts` for codes and time zones; names in the
  messages), and an enquiry form (mailto, labels in English).
- **Founder & team videos** (`components/sections/biz/VideoStories.tsx`): set the
  files in `src/content/videos.ts`; until then the cards show "Video coming soon".

## Social links

Add the official profiles to `siteConfig.socials` in `src/config/site.ts`
(Instagram, Facebook, YouTube, LinkedIn, WhatsApp); the footer icons appear
automatically.

## Lead forms

**Start Your Project** and **Free Consultation** (hero) open a dialog with a
short form. There is no backend yet: sending opens the visitor's email app with
the details (labels in English) addressed to `siteConfig.contact.email`. Once
`siteConfig.contact.phone` is filled in, the dialog also shows **Chat on
WhatsApp** and **Call us** buttons for a direct conversation with a consultant.

## Still missing from the company profile

These fields are empty and hidden on the site until filled in
(`src/config/site.ts` and `src/content/home.ts`):

- Email, phone, office address and city
- Website URL and social media links
- Founder's name (the portrait is shown with the role only)

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, `src/` dir, Cache Components)
- TypeScript (strict)
- Tailwind CSS v4 (tokens defined in `src/app/globals.css`)
- `next/font` — Fraunces (display serif) + Inter (body sans)
- `next/image`, `lucide-react`, Framer Motion (entrances, scroll effects, parallax)
- Lenis — inertia smooth scrolling on desktop (off for touch and reduced motion)
- ESLint + Prettier (`prettier-plugin-tailwindcss`)

## Getting started

Requires Node.js 20.9+ and npm.

```bash
npm install
cp .env.example .env.local   # optional — sets the public site URL for metadata
npm run dev                  # http://localhost:3000
```

## Scripts

| Script                 | What it does                           |
| ---------------------- | -------------------------------------- |
| `npm run dev`          | Start the dev server                   |
| `npm run build`        | Production build (type-checks as well) |
| `npm run start`        | Serve the production build             |
| `npm run lint`         | Run ESLint                             |
| `npm run format`       | Format all files with Prettier         |
| `npm run format:check` | Check formatting without writing       |

## Where to edit content

You should rarely need to touch components to change words:

| What                                                         | File                       |
| ------------------------------------------------------------ | -------------------------- |
| Brand name, logo lines, tagline, contact, socials            | `src/config/site.ts`       |
| Navbar / footer links, CTA, menu & footer UI strings         | `src/config/navigation.ts` |
| All home page copy: hero, about, services, projects, clients | `src/content/home.ts`      |
| Every supplied photo (generated list, with categories)       | `src/content/gallery.ts`   |
| Inner page headers, contact page, gallery, 404 copy          | `src/content/pages.ts`     |
| Colors, fonts, type scale, radii, grain texture              | `src/app/globals.css`      |
| Font families                                                | `src/lib/fonts.ts`         |

Hero headline accents: in `src/content/home.ts` each headline line is a list of
segments; mark a segment with `accent: true` to render it in the orange italic.

Images live in `public/images/` (`team/`, `kitchens/`, `interiors/`, `training/`,
`press/`, `creatives/`) and are listed in `src/content/gallery.ts`. Content files
reference them with `img("/images/…")`, which fails the build if a path is wrong.
The logo is in `public/brand/` (`resto-mark.png` original tile,
`resto-mark-light.png` for dark backgrounds).

## Folder structure

```
public/
  brand/              Logo files
  images/             team/, kitchens/, interiors/, training/, press/, creatives/
  icons/              Static icons
  favicon.ico
src/
  app/                Routes only — pages compose sections
    layout.tsx        Root layout: fonts, metadata, Navbar, Footer
    page.tsx          Home page
    globals.css       Tailwind import + design tokens
    not-found.tsx
    about/ services/ projects/ contact/   Inner pages
  components/
    layout/           Navbar, MenuOverlay, Footer
    sections/         Page sections (home/*, PageHeader, GalleryGrid, ContactSection)
    ui/               Primitives: Button, Container, SectionLabel, Logo, AskForm,
                      SocialIcon, FloatingDots, EqualizerBars, VideoSlot, Reveal
  config/             Site + navigation config
  content/            Page copy
  lib/                utils (cn, isActivePath), fonts
  hooks/              useMediaQuery
  types/              Shared TypeScript types
```

### Conventions

- **Pages compose sections, sections compose `ui` components.**
- **No hard-coded copy in components** — text comes from `src/content` or `src/config`.
- Import with the `@/` alias (maps to `src/`).
- Animations go through `components/ui/Reveal.tsx`, which honours
  `prefers-reduced-motion`.

## Design tokens

Luxury palette (client request, Nov 2026): midnight navy, champagne gold, ivory and white.

| Token               | Value     | Role                         |
| ------------------- | --------- | ---------------------------- |
| `background`        | `#0A1428` | Midnight navy                |
| `surface`           | `#111E38` | Raised navy                  |
| `border`            | `#243352` | Hairlines on navy            |
| `foreground`        | `#F6F1E7` | Ivory (text, light sections) |
| `paper`             | `#FFFFFF` | White sections and cards     |
| `muted`             | `#A5AFC3` | Secondary text on navy       |
| `accent`            | `#C9A45C` | Champagne gold               |
| `gold`              | `#DCC08A` | Light gold ornaments         |
| `accent-deep`       | `#7D5C20` | Gold text on light sections  |
| `ink-muted`         | `#56607A` | Secondary text on light      |
| `accent-foreground` | `#0A1428` | Text on gold                 |

The site uses gold versions of the logo (`public/brand/resto-mark-light-gold.png`,
`resto-mark-gold.png`); the original orange files are kept next to them.

Use them as Tailwind classes: `bg-surface`, `text-muted`, `border-border`,
`text-accent`, etc. Extra utilities: `text-hero` (fluid hero size), `eyebrow`
(small uppercase label) and `grain` (film-grain overlay).
