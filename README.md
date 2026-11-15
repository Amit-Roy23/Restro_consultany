# Resto Consultancy — Website

Marketing / lead-generation site for a restaurant & hospitality consulting firm.
Dark, warm, editorial design: grainy lit-room backgrounds, oversized serif headlines,
a floating photo collage in the hero and a single muted-gold accent.

> **Current scope:** full home-page layout with placeholder copy and images (real
> content to come), plus stub inner pages.

## Home page sections

| Section        | File                                        | Behaviour                                                                                     |
| -------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Hero           | `components/sections/home/Hero.tsx`         | Desktop: photos drift outward on scroll while a showcase frame rises and grows to full screen |
| Ask Resto      | `components/sections/home/AskSection.tsx`   | Giant pinned wordmark with drifting dots; frosted question card scrolls over it               |
| Featured work  | `components/sections/home/FeaturedWork.tsx` | Case-study cards stack on top of each other (CSS sticky)                                      |
| How we help    | `components/sections/home/HowWeHelp.tsx`    | Problem → solution rows, floating "Ask" bar pinned to the bottom                              |
| Journal        | `components/sections/home/Insights.tsx`     | Pinned heading with cards scrolling past it                                                   |
| Call to action | `components/sections/home/CtaBand.tsx`      | Gold band with animated equaliser bars                                                        |
| Footer         | `components/layout/Footer.tsx`              | Gradient footer revealed from under the page on desktop                                       |
| Menu           | `components/layout/MenuOverlay.tsx`         | Full-screen menu: links, Ask box and suggested questions                                      |

The "Ask" boxes have no backend yet — they submit to `/contact?q=…`.
On phones and for visitors with "reduce motion" enabled, scroll effects fall back
to a static layout.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, `src/` dir, Cache Components)
- TypeScript (strict)
- Tailwind CSS v4 (tokens defined in `src/app/globals.css`)
- `next/font` — Fraunces (display serif) + Inter (body sans)
- `next/image`, `lucide-react`, Framer Motion (entrance animations only)
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

| What                                                      | File                       |
| --------------------------------------------------------- | -------------------------- |
| Brand name, logo lines, tagline, contact, socials         | `src/config/site.ts`       |
| Navbar / footer links, CTA, menu & footer UI strings      | `src/config/navigation.ts` |
| Home page copy (hero headline, text, CTAs, stats, images) | `src/content/home.ts`      |
| Stub page and 404 copy                                    | `src/content/pages.ts`     |
| Colors, fonts, type scale, radii, grain texture           | `src/app/globals.css`      |
| Font families                                             | `src/lib/fonts.ts`         |

Hero headline accents: in `src/content/home.ts` each headline line is a list of
segments; mark a segment with `accent: true` to render it in the gold italic.

Images live in `public/images/` (`hero/`, `projects/`, `insights/`). The current
files are generated placeholders — replace them with real photography (same
filenames, or update the paths in `src/content/home.ts`).

## Folder structure

```
public/
  images/             hero/, projects/, insights/ — generated placeholders
  icons/              Static icons
  favicon.ico
src/
  app/                Routes only — pages compose sections
    layout.tsx        Root layout: fonts, metadata, Navbar, Footer
    page.tsx          Home page
    globals.css       Tailwind import + design tokens
    not-found.tsx
    about/ services/ projects/ contact/   Stub pages
  components/
    layout/           Navbar, MenuOverlay, Footer
    sections/         Page sections (home/*, StubPage)
    ui/               Primitives: Button, Container, SectionLabel, Logo, AskForm,
                      SocialIcon, FloatingDots, EqualizerBars, Reveal
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
| `accent`            | `#C9A15B` |
| `accent-foreground` | `#14100D` |

Use them as Tailwind classes: `bg-surface`, `text-muted`, `border-border`,
`text-accent`, etc. Extra utilities: `text-hero` (fluid hero size), `eyebrow`
(small uppercase label) and `grain` (film-grain overlay).
