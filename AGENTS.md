# AGENTS.md

Guidance for AI agents working in this repo.

## What this is

A personal CV for Gustaw Beźnicki, served at **https://gustawbeznicki.dev**. Small **Astro 5** site (Tailwind v4), built to static HTML and served by a Cloudflare Worker. Content is typed and lives in the repo; English and Polish are **separate rendered pages** (`/` and `/pl`).

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
src/content/companies.ts        single source of truth for company/venture brand names
src/styles/global.css           @import "tailwindcss" + @theme tokens + bespoke design + print
src/scripts/enhance.ts          IntersectionObserver nav highlight + fade-in + print button
worker/index.js                 Cloudflare Worker: www→apex redirect + security headers
public/                         favicon.png, og-image.png, robots.txt (static passthrough)
docs/adr/                       architecture decision records
wrangler.jsonc                  main: worker/index.js, assets.directory: ./dist
.github/workflows/ci.yml        CI: type-check + build on PRs to main
.github/workflows/deploy.yml    CI: build + deploy on push to main
```

## Local development

```sh
pnpm install
pnpm run dev      # http://localhost:4321  (/ and /pl)
pnpm run build    # → dist/
pnpm run check    # astro type-check
pnpm dlx wrangler dev  # serve the built dist/ through the worker (headers + redirect)
```

Package manager is **pnpm** (pinned to `pnpm@11.2.2` in `package.json`). Never use `npm` or `npx` here.

## Editing content

- All copy is in `src/content/en.ts` and `src/content/pl.ts`, both implementing `CVContent` from `types.ts`. **Edit content there, never in the components.** Add a field to the type and TS will flag both language files until you fill it in.
- Fields whose name ends in `Html` (e.g. `roleHtml`, highlight `html`, `company`, footer `ctaHtml`) are rendered with `set:html` — they may contain `<strong>`, `<em>`, `<a>`. Plain fields are escaped — use real Unicode (`—`, `'`), not HTML entities.
- Translate Polish idiomatically, not word-for-word.
- **Company / venture brand names** are defined once in `src/content/companies.ts` and interpolated into both language files. Edit a name there — it updates EN + PL and every usage at once. Locations (`· Warsaw` / `· Warszawa`) stay in the per-language files.

## Description style

All experience bullets and body paragraphs use: **active voice · implied third person · verb-first sentences** · past tense for past roles, present tense for current roles. Match this style exactly when editing.

## Styling

- Tailwind v4 via `@tailwindcss/vite`; design tokens are the `@theme` block in `global.css` (colors `--color-*`, fonts `--font-*`).
- Semantic class names (`.hero`, `.exp-item`, `.section-title`, …) are load-bearing for the print stylesheet and `enhance.ts` — don't rename without updating both.
- Fonts are **self-hosted** via Fontsource (imported in `Base.astro`). Do not add Google Fonts — it would force the CSP open.
- The print sheet hides the sidebar and footer CTA; anything that must appear in the PDF must live in the hero or another print-visible area.

## Deploy & security

- **Every push to `main` auto-deploys.** `deploy.yml` runs `pnpm install --frozen-lockfile` → `pnpm run check` → `pnpm run build` → `wrangler deploy`. Wrangler pinned to v4; all third-party actions pinned to commit SHAs.
- **PRs to `main` trigger `ci.yml`** (type-check + build only, no deploy).
- `worker/index.js` sets CSP + HSTS/nosniff/frame/referrer/permissions headers. **If you add an external resource**, widen the matching CSP directive there or the browser will block it. CSP is `'self'`-only except `'unsafe-inline'` (inline JSON-LD + inline style attrs) and `data:` images.
