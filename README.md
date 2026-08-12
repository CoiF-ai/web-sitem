# Portfolio — a digital exhibition

An avant-garde, minimalist portfolio built with Next.js 14 (App Router), TypeScript,
Tailwind CSS, Framer Motion, React Three Fiber, and Lenis. Dark, monochrome,
Nordic-inspired — the site behaves like a quiet exhibition space with an
atmospheric, mouse-reactive WebGL fog living behind everything.

## Stack

- **Next.js 14** (App Router, Server Components, Server Actions)
- **TypeScript**
- **Tailwind CSS** for layout/typography utilities
- **Framer Motion** for scroll reveals, the magnetic language pill, and the custom cursor
- **React Three Fiber + drei + three.js** for the custom GLSL fog shader background
- **@studio-freight/lenis** for buttery smooth scrolling
- **i18n** — English/Turkish routing via `app/[locale]`, no external i18n library

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/en` or `/tr`
depending on your browser's language / a previously saved cookie.

## Project structure

```
app/
  layout.tsx            Root <html>/<body>, fonts, global CSS
  not-found.tsx          Fallback 404 (self-contained providers)
  actions/contact.ts      Server Action for the contact form
  [locale]/
    layout.tsx            Locale validation, dictionary load, global UI chrome
    page.tsx               Hero + Work + About/Contact + Footer
    not-found.tsx          "Lost in the fog" 404, denser mist
components/
  webgl/                  Fog shader material, R3F scene + canvas
  preloader/               0→100% shader-compile preloader
  cursor/                  Custom Framer Motion ring cursor
  i18n/                    Magnetic glass language pill
  layout/                  Corner mark + section nav, footer
  sections/                Hero, About/Contact, 404 content
  projects/                Server-fetched project showcase + cards + tags
  contact/                 Contact form (Server Action) + résumé link
  providers/               Lenis smooth-scroll + top-level app providers
context/                  Cursor / fog-density / loading / locale / lenis contexts
data/projects.json        Local project data (id, title, techStack, description, imagePath, liveLink)
lib/projects.ts           Typed accessor + locale-aware mapping for project data
dictionaries/{en,tr}.json  UI copy per locale
i18n/config.ts            Supported locales + helpers
middleware.ts             Locale detection & redirect for unprefixed routes
public/resume.pdf         Placeholder — replace with your real résumé
public/projects/*.svg     Placeholder project artwork — replace with real screenshots
```

## Editing content

- **Projects** — edit `data/projects.json`. Each entry has `id`, `title` /
  `description` (localized `{ en, tr }` objects), `techStack: string[]`,
  `imagePath`, and `liveLink`.
- **Copy / translations** — edit `dictionaries/en.json` and `dictionaries/tr.json`.
- **Résumé** — replace `public/resume.pdf` with your actual résumé (same filename,
  or update the `href` in `components/contact/resume-link.tsx`).
- **Contact form** — `app/actions/contact.ts` is a Server Action. It currently
  logs submissions to the server console (no database needed). Wire it up to an
  email provider or database of your choice.

## Notes

- The WebGL fog respects `prefers-reduced-motion` and disables postprocessing/Lenis
  accordingly.
- The custom cursor auto-disables on touch/coarse-pointer devices.
- 404 pages intensify the fog density via `FogProvider` for a "lost in the mist" feel.
