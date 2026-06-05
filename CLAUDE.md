# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal CV for Gustaw Beźnicki, served at **<https://gustawbeznicki.dev>**. Small **Astro 5** site (Tailwind v4), built to static HTML and served by a Cloudflare Worker. English and Polish are **separate rendered pages** (`/` and `/pl`).

## Commands

```sh
pnpm install
pnpm run dev      # http://localhost:4321  (/ and /pl)
pnpm run check    # astro type-check (runs in CI on every PR)
pnpm run build    # → dist/
pnpm dlx wrangler dev  # serve dist/ through the worker locally (headers + redirect)
```

Package manager is **pnpm** (`pnpm@11.2.2`). Never use `npm` or `npx`.

## Architecture

```text
src/pages/index.astro | pl/index.astro   one page per locale
src/layouts/Base.astro                   <head>, SEO, JSON-LD, fonts
src/components/*.astro                   one component per CV section
src/content/types.ts                     CVContent interface — source of truth for shape
src/content/en.ts | pl.ts               all copy, fully typed against CVContent
src/content/companies.ts                 company/brand names (single source, interpolated into both locales)
src/styles/global.css                    @theme tokens + bespoke design system + ~500-line print sheet
src/scripts/enhance.ts                   IntersectionObserver nav highlight, fade-in, print button
worker/index.js                          www→apex redirect + security headers (CSP, HSTS, …)
wrangler.jsonc                           worker entry + assets dir; run_worker_first: true
.github/workflows/ci.yml                 type-check + build on PRs to main
.github/workflows/deploy.yml             type-check + build + wrangler deploy on push to main
```

The worker sits in front of every request (`run_worker_first: true`) — it handles the `www` redirect and injects headers, then falls through to static assets.

## Editing content

**Edit only `en.ts` / `pl.ts` / `companies.ts` — never components.**

The `CVContent` type in `types.ts` is the safety net: add a field there and TS flags both language files until both are filled in.

Fields ending in `Html` (`roleHtml`, highlight `html`, `company`, footer `ctaHtml`) are rendered with `set:html` and may contain inline tags (`<strong>`, `<em>`, `<a>`). All other fields are escaped — use real Unicode (`—`, `'`), not HTML entities.

Company/venture brand names live in `companies.ts` and are interpolated into both locale files via template literals. Locations (`· Warsaw` / `· Warszawa`) stay in the per-language files.

### Experience entry shape

Each `Experience` object uses **one** of three description fields:

| Field | When to use |
| ----- | ----------- |
| `bullets` | Simple list of past achievements |
| `groups` | Multiple labelled sections (current/senior roles) |
| `body` | Narrative prose (side ventures, short roles) |

`context` is a one-liner above any of those (team size, platform summary). `tech` is the stack line.

### Description writing style

Active voice · implied third person (no "I") · verb-first sentences. Present tense for current roles, past tense for past roles. Example: *"Owns architecture decisions…"* (current) / *"Delivered backend features…"* (past). Never use noun phrases without a verb.

## Styling

Tailwind v4 via `@tailwindcss/vite`. Design tokens are the `@theme` block in `global.css` (`--color-*`, `--font-*`). Semantic class names (`.hero`, `.exp-item`, `.section-title`, …) are load-bearing for both the print sheet and `enhance.ts` — don't rename them without updating both.

Fonts are self-hosted via Fontsource (imported in `Base.astro`). Do not add Google Fonts — it would require opening the CSP.

The print sheet hides the sidebar and footer CTA. Anything that must appear in a PDF export must live in the hero or another print-visible area.

## Deploy & security

Every push to `main` auto-deploys. CI runs `pnpm install --frozen-lockfile` → `pnpm run check` → `pnpm run build` → `wrangler deploy`. Wrangler is pinned to v4; all third-party actions are pinned to commit SHAs.

`worker/index.js` sets CSP + HSTS/nosniff/frame/referrer/permissions headers. **If you add any external resource** (script, font, image CDN, API), widen the matching CSP directive in the worker or the browser will block it. The CSP is `'self'`-only except `'unsafe-inline'` (inline JSON-LD + inline style attrs) and `data:` images.
