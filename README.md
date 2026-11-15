# Resto Consultancy — Website

Lead-generation website for **Resto Consultancy**, food & beverage consultants for
restaurants, hotels, banquets and cloud kitchens. Dark, warm, editorial design in
the brand's brown and orange, with scroll-driven sections.

All copy, the logo and the photos come from the company profile document
(`RESTO_POWDER_POINT_1.docx`).

## Pages

| Route       | Contents                                                              |
| ----------- | --------------------------------------------------------------------- |
| `/`         | Hero, Ask, About, Services, Projects, Clients, Wall, call to action   |
| `/about`    | About, clients                                                        |
| `/services` | All service groups                                                    |
| `/projects` | Featured projects, full project list, gallery of every supplied photo |
| `/contact`  | Ask box, next steps, contact details (hidden until filled in)         |

## Home page sections

| Section        | File                                        | Behaviour                                                                             |
| -------------- | ------------------------------------------- | ------------------------------------------------------------------------------------- |
| Hero           | `components/sections/home/Hero.tsx`         | Desktop: photos drift outward while a showcase (mosaic or video) grows to full screen |
| Ask Resto      | `components/sections/home/AskSection.tsx`   | Giant pinned wordmark with drifting dots; frosted question card scrolls over it       |
| 01 Who we are  | `components/sections/home/AboutSection.tsx` | Story, founder portrait, market stat, philosophy, team video slot                     |
| 02 What we do  | `components/sections/home/Services.tsx`     | Three service groups as numbered rows; floating ask bar                               |
| 03 Projects    | `components/sections/home/Projects.tsx`     | Featured projects as stacking cards + full list of completed projects                 |
| 04 Clients     | `components/sections/home/Clients.tsx`      | Scrolling marquee of brand names + grouped client list                                |
| 05 Wall        | `components/sections/home/Wall.tsx`         | Pinned heading with photo, press and stat cards scrolling past                        |
| Call to action | `components/sections/home/CtaBand.tsx`      | Orange band with animated equaliser bars                                              |
| Footer         | `components/layout/Footer.tsx`              | Gradient footer revealed from under the page on desktop                               |
| Menu           | `components/layout/MenuOverlay.tsx`         | Full-screen menu: links, Ask box and suggested questions                              |

The "Ask" boxes have no backend yet — they submit to `/contact?q=…`.
On phones and for visitors with "reduce motion" enabled, scroll effects fall back
to a static layout.

## Adding the videos

Video slots show a photo until a file is set. Put the files in `public/videos/`
(MP4/H.264, ideally under ~8 MB each; the hero loop is `public/videos/hero.mp4`) and set them in `src/content/home.ts`:

| Slot                    | Field                                        |
| ----------------------- | -------------------------------------------- |
| Hero showreel           | `heroContent.showcase.video`                 |
| About / team video      | `aboutContent.video.src`                     |
| A featured project card | add `video: { src, poster }` to that project |

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

| Token               | Value     |
| ------------------- | --------- |
| `background`        | `#14100D` |
| `surface`           | `#1E1813` |
| `border`            | `#2E261F` |
| `foreground`        | `#F3EDE4` |
| `muted`             | `#A89B8C` |
| `accent`            | `#D9782A` |
| `accent-foreground` | `#14100D` |

Use them as Tailwind classes: `bg-surface`, `text-muted`, `border-border`,
`text-accent`, etc. Extra utilities: `text-hero` (fluid hero size), `eyebrow`
(small uppercase label) and `grain` (film-grain overlay).
