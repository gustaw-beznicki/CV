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
src/components/*.astro                   one component per CV section (+ CookieBanner.astro)
src/content/types.ts                     CVContent interface — source of truth for shape
src/content/en.ts | pl.ts               all copy, fully typed against CVContent
src/content/companies.ts                 company/brand names (single source, interpolated into both locales)
src/content/links.ts                     URLs + contact constants (email, socials, company links — single source)
src/styles/global.css                    @theme tokens + bespoke design system + ~500-line print sheet
src/scripts/enhance.ts                   IntersectionObserver nav highlight, fade-in, print button
worker/index.js                          www→apex redirect + /_a Umami proxy + security headers (CSP, HSTS, …)
public/vendor/silktide/                  self-hosted cookie-consent banner (Silktide, MIT, pinned)
docs/                                     cookie analysis + umami-deployment.md (Raspberry Pi guide)
wrangler.jsonc                           worker entry + assets dir; run_worker_first: true
.github/workflows/ci.yml                 type-check + build on PRs to main
.github/workflows/deploy.yml             type-check + build + wrangler deploy on push to main
```

The worker sits in front of every request (`run_worker_first: true`) — it handles the `www` redirect and injects headers, then falls through to static assets.

## Editing content

**Edit only `en.ts` / `pl.ts` / `companies.ts` / `links.ts` — never components.**

The `CVContent` type in `types.ts` is the safety net: add a field there and TS flags both language files until both are filled in.

Fields ending in `Html` (`roleHtml`, highlight `html`, `company`, footer `ctaHtml`) are rendered with `set:html` and may contain inline tags (`<strong>`, `<em>`, `<a>`). All other fields are escaped — use real Unicode (`—`, `'`), not HTML entities.

Company/venture brand names live in `companies.ts`; URLs and contact constants (email, LinkedIn/GitHub, company links) live in `links.ts`. Both are interpolated into both locale files via template literals. Locations (`· Warsaw` / `· Warszawa`) stay in the per-language files.

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

`worker/index.js` sets CSP + HSTS/nosniff/frame/referrer/permissions headers and reverse-proxies the Umami tracker under `/_a/` (`proxyAnalytics`). **If you add any external resource** (script, font, image CDN, API), widen the matching CSP directive in the worker or the browser will block it. The CSP is strict `'self'`-only except `'unsafe-inline'` (inline JSON-LD + the consent-banner `init()` + inline style attrs) and `data:` images.

## Cookies & consent

The site sets **no cookies**. `CookieBanner.astro` mounts the self-hosted [Silktide Consent Manager](https://github.com/silktide/consent-manager) (MIT, pinned in `public/vendor/silktide/<version>/`), which stores only a consent record in `localStorage`. Banner copy is the typed `cookieBanner` block in `en.ts`/`pl.ts`. Categories: `essential` + `analytics` (off by default).

**Analytics**: self-hosted **Umami** (cookieless), on a Raspberry Pi behind a Cloudflare Tunnel. The worker reverse-proxies `/_a/script.js` + `/_a/api/send` to `UMAMI_HOST` (a worker secret), so it's first-party and the CSP stays `'self'`. The tracker is injected **only** by the analytics category's `onAccept` in `CookieBanner.astro` (default off); website id via `PUBLIC_UMAMI_WEBSITE_ID` (build-time). To add another consent-gated script, attach it to its category in `CookieBanner.astro` (use `onAccept`/`onReject` when it needs `data-*` attrs — Silktide's `scripts` array can't carry them) and prefer a first-party proxy over widening the CSP. Full rationale: [docs/cookies-technical.md](docs/cookies-technical.md), [docs/analiza-cookies-prawna.md](docs/analiza-cookies-prawna.md), [docs/umami-deployment.md](docs/umami-deployment.md).
