# CV — gustawbeznicki.dev

<img src="public/profile.png" alt="Gustaw Beznicki" width="120" align="right" style="border-radius:8px; margin-left:16px;" />

**Gustaw Beznicki** — Senior Software Engineer & Team Lead  
📍 Gdansk, Poland &nbsp;·&nbsp; 🌐 [gustawbeznicki.dev](https://gustawbeznicki.dev) &nbsp;·&nbsp; 💼 [LinkedIn](https://www.linkedin.com/in/gustawbeznicki/)

[![CI](https://github.com/gustaw-beznicki/CV/actions/workflows/ci.yml/badge.svg)](https://github.com/gustaw-beznicki/CV/actions/workflows/ci.yml)
[![Deploy](https://github.com/gustaw-beznicki/CV/actions/workflows/deploy.yml/badge.svg)](https://github.com/gustaw-beznicki/CV/actions/workflows/deploy.yml)

This repository is the source code for my personal CV website. I built it myself rather than using a template or a CV-builder -- both because I enjoy the craft and because the site itself is a small demonstration of how I approach software: typed, tested in CI, deployed automatically, and thoughtfully secured.

---

## For recruiters & hiring managers

You don't need to read any code to get value from this section.

### What is this?

A bilingual CV website (English at `/`, Polish at `/pl`) that I maintain as a living document. It's deployed to the web and also prints cleanly to a PDF straight from the browser — no separate export step needed.

### Why build it instead of using a template?

A few reasons:

- **Full ownership** — I can update it in minutes, deploy with a git push, and the change is live globally within seconds.
- **No vendor lock-in** — the content is plain TypeScript, the output is static HTML. No CMS subscription, no proprietary format.
- **A working example** — it's one thing to list "CI/CD, TypeScript, cloud deployment" on a CV; it's another to have those things operating on the CV itself. Every pull request runs type-checking and a build check before it can merge.

### What does it show about how I work?

| Practice | Where you can see it |
|---|---|
| Typed, documented contracts | `src/content/types.ts` — one interface drives both language files; a missing field is a compile error |
| Separation of concerns | Content lives in `.ts` files; presentation lives in components; never mixed |
| Single source of truth | Company names defined once in `companies.ts`, interpolated everywhere |
| Automated quality gates | CI runs type-check + build on every PR; deployment is gated on both passing |
| Security by default | Strict CSP, HSTS, no third-party requests; privacy-first analytics behind a first-party proxy |
| Considered architecture | `docs/adr/` contains Architecture Decision Records explaining the *why* behind key choices |
| Privacy & compliance | Cookie-consent flow with legal analysis documented in `docs/` |

### Stack summary (non-technical)

The site is a collection of static HTML files generated at build time — meaning there's no server doing work when someone visits. Files are served by Cloudflare's global network, which makes it fast worldwide. A small edge script handles redirects and adds security headers. There's no database, no user accounts, and no cookies by default.

---

## For engineers & technical reviewers

### Tech stack

| Layer | Technology |
|---|---|
| Framework | [Astro 5](https://astro.build) (static output, zero client JS by default) |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite`; design tokens in `@theme` block |
| Language | TypeScript throughout; `strict` mode |
| Edge runtime | Cloudflare Workers (`worker/index.js`) |
| CI/CD | GitHub Actions — type-check + build on PRs; build + deploy on `main` |
| Analytics | Self-hosted [Umami](https://umami.is) (cookieless), reverse-proxied first-party via the worker |
| Package manager | pnpm (pinned to `pnpm@11.2.2`) |

### Project structure

```
src/
  pages/              index.astro (EN) · pl/index.astro (PL)
  layouts/Base.astro  <head>, SEO, JSON-LD, fonts, page composition
  components/         one .astro component per CV section
  content/
    types.ts          CVContent interface — single source of truth for content shape
    en.ts · pl.ts     all copy, fully typed against CVContent
    companies.ts      brand names interpolated into both locale files
  styles/global.css   @theme tokens + design system + ~500-line print stylesheet
  scripts/enhance.ts  IntersectionObserver nav highlight, fade-in, print button

worker/index.js       www→apex redirect · /_a Umami proxy · CSP/HSTS/security headers
public/               favicon, og-image, robots.txt (static passthrough)
docs/
  adr/                Architecture Decision Records
  cookies-technical.md
  umami-deployment.md
wrangler.jsonc        Worker entry + assets dir; run_worker_first: true
```

### Getting started

```sh
pnpm install
pnpm run dev          # dev server → http://localhost:4321  (/ and /pl live)
pnpm run check        # astro type-check (same check CI runs)
pnpm run build        # static build → dist/
pnpm dlx wrangler dev # serve dist/ through the worker (tests headers + redirect locally)
```

### Content editing

All copy lives in `src/content/en.ts` and `src/content/pl.ts`. Both implement `CVContent` from `types.ts` — add a field to the interface and TypeScript will flag both files until each is filled in.

Fields ending in `Html` (e.g. `roleHtml`, `ctaHtml`) are rendered with `set:html` and may contain `<strong>`, `<em>`, `<a>`. All other fields are plain-text escaped — use real Unicode (`—`, `'`) rather than HTML entities.

Company and brand names are defined once in `companies.ts` and interpolated via template literals, so renaming a company updates every occurrence in both languages at once.

### CI / deployment

- **PRs to `main`** → `ci.yml` runs `pnpm run check` + `pnpm run build`. Both must pass before merge.
- **Push to `main`** → `deploy.yml` runs the same checks, then `wrangler deploy`. Live in seconds.
- All third-party GitHub Actions are pinned to commit SHAs.
- Wrangler is pinned to v4.

### Security highlights

The worker injects a strict Content Security Policy on every response — `'self'`-only, with `'unsafe-inline'` scoped only to inline JSON-LD and the consent-banner initialiser. No external scripts, no CDN fonts, no remote image sources. HSTS is set with a long `max-age`. The Umami analytics script is proxied first-party under `/_a/` so the CSP never needs to be widened for it.

See [`SECURITY.md`](SECURITY.md) for the vulnerability reporting policy.

---

*Built with the assistance of [GitHub Copilot](https://github.com/features/copilot) and [Claude Code](https://claude.ai/code) — AI pair-programming tools used throughout development for code generation, review, and refactoring.*
