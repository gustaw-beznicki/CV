# CLAUDE.md

Guidance for working in this repo.

## What this is

A personal CV for Gustaw Beźnicki, served at **https://gustawbeznicki.dev**. It's a small
**Astro** site (Tailwind v4), built to static HTML and served by a Cloudflare Worker. Content is
typed and lives in the repo; English and Polish are **separate rendered pages** (`/` and `/pl`).

## Layout

```
src/pages/index.astro          English page  (imports content/en.ts)
src/pages/pl/index.astro       Polish page   (imports content/pl.ts)
src/layouts/Base.astro         <head>/SEO/JSON-LD/fonts + composes the page
src/components/*.astro          Hero, Sidebar, Highlights, Skills, Experience,
                                Education, Certifications, Languages, Interests,
                                Footer, LanguageSwitcher
src/content/types.ts            CVContent type (shared shape for both languages)
src/content/en.ts | pl.ts       the actual CV copy, typed
src/styles/global.css           @import "tailwindcss" + @theme tokens + bespoke design + print
src/scripts/enhance.ts          IntersectionObserver nav highlight + fade-in + print button
worker/index.js                 Cloudflare Worker: www→apex redirect + security headers
public/                         favicon.png, og-image.png, robots.txt (static passthrough)
wrangler.jsonc                  main: worker/index.js, assets.directory: ./dist
.github/workflows/deploy.yml    CI: build then deploy on push to main
```

## Editing content

- All copy is in `src/content/en.ts` and `src/content/pl.ts`, both implementing the `CVContent`
  type in `types.ts`. **Edit content there, never in the components.** Add a field to the type and
  TS will flag both language files until you fill it in — that's the safety net that replaced the
  old fragile selector→array translation map.
- Fields whose name ends in `Html` (e.g. `roleHtml`, highlight `html`, `company`, footer `ctaHtml`)
  are rendered with `set:html` because they contain inline tags (`<strong>`, `<em>`, `<a>`). Plain
  fields are escaped — use real Unicode (`—`, `’`) in them, not HTML entities.
- Translate Polish idiomatically (see git history / the existing `pl.ts`), not word-for-word.

## Styling

- Tailwind v4 via `@tailwindcss/vite`; design tokens are the `@theme` block in `global.css`
  (colors `--color-*`, fonts `--font-*`). The bespoke visual system and the ~500-line A4 **print
  sheet** live in `global.css` keyed to semantic class names (`.hero`, `.exp-item`, `.section-title`,
  …). Those class names are load-bearing for both the print stylesheet and `enhance.ts` — don't
  rename them without updating both.
- Fonts are **self-hosted** via Fontsource (imported in `Base.astro`). Fraunces uses `full.css`
  for the `opsz`/`SOFT` variable axes. Do not re-add Google Fonts — it would force the CSP back open.
- The print sheet hides the sidebar and footer CTA, so anything that must appear in the PDF has to
  live in the hero or another print-visible area.

## Deploy & security

- **Every push to `main` auto-deploys.** CI (`deploy.yml`) runs `npm ci` → `astro check` →
  `astro build` → `wrangler deploy`. Wrangler is pinned to v4; actions are pinned to commit SHAs.
- `worker/index.js` adds the CSP + HSTS/nosniff/frame/referrer/permissions headers. **If you add an
  external resource** (script, font host, image CDN, API), widen the matching CSP directive there or
  the browser blocks it. The CSP is now `'self'`-only except `'unsafe-inline'` (inline JSON-LD +
  inline style attrs) and `data:` images.
- `main` has lightweight branch protection (force-push + deletion blocked, direct push allowed).
  Secret scanning + push protection are on.

## Local development

```sh
npm install
npm run dev       # http://localhost:4321  (/ and /pl)
npm run build     # → dist/
npx wrangler dev  # serve the built dist/ through the worker (headers + redirect)
```
