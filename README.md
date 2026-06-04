# CV — gustawbeznicki.dev

Personal CV / résumé for **Gustaw Beźnicki**, Senior Software Engineer & Team Lead.

🔗 **Live:** https://gustawbeznicki.dev

Built with **Astro** + **Tailwind v4**, rendered to static HTML and served by a Cloudflare Worker.

## Features

- **Bilingual** — English (`/`) and Polish (`/pl`) as separate, fully rendered pages.
- **Typed content** — all copy lives in `src/content/{en,pl}.ts` behind one shared type; no CMS.
- **Print-ready** — a dedicated print stylesheet renders a clean A4 CV via the browser's *Save as PDF*.
- **Self-contained** — fonts are self-hosted (Fontsource); no third-party requests at runtime.
- **SEO** — per-language meta, canonical + hreflang alternates, Open Graph/Twitter, JSON-LD `Person`, sitemap.

## Project structure

```
src/pages/            index.astro (EN) + pl/index.astro (PL)
src/layouts/Base.astro    head, SEO, fonts, page composition
src/components/           one component per CV section
src/content/              types.ts + en.ts + pl.ts (the CV copy)
src/styles/global.css     Tailwind theme tokens + bespoke design + print sheet
src/scripts/enhance.ts    nav highlighting, fade-in, print button
worker/index.js           Cloudflare Worker: www → apex redirect + security headers
public/                   favicon, og-image, robots.txt
```

## Develop

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static output → dist/
npm run check     # type-check (astro check)
npx wrangler dev  # serve the built dist/ through the worker
```

Edit content in `src/content/en.ts` / `pl.ts`. Both implement the `CVContent` type in
`src/content/types.ts`, so adding a field is type-checked across both languages.

## Deployment

Hosted on **Cloudflare Workers**, deployed automatically by **GitHub Actions** on every push to
`main` (`npm ci` → `astro check` → `astro build` → `wrangler deploy`). The apex serves the CV; `www`
301-redirects to it. DNS and TLS are provisioned via Wrangler custom-domain routes.

See [`CLAUDE.md`](CLAUDE.md) for architecture, styling, and security details.
