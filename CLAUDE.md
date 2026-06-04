# CLAUDE.md

Guidance for working in this repo.

## What this is

A single-page personal CV for Gustaw Beźnicki, served at **https://gustawbeznicki.dev**.
It is a self-contained static site — all HTML, CSS, and JS live in `public/index.html`.
There is **no build step**.

## Layout

- `public/index.html` — the entire site (markup + embedded `<style>` + embedded `<script>`).
- `src/index.js` — Cloudflare Worker entry. Redirects any non-apex host (e.g. `www`) to
  the apex, then serves static assets via the `ASSETS` binding.
- `wrangler.jsonc` — Cloudflare config.
- `.github/workflows/deploy.yml` — CD pipeline.

## Deployment (Cloudflare Workers + GitHub Actions)

- **Every push to `main` auto-deploys** via `cloudflare/wrangler-action`. There is no manual
  deploy step — just commit and push.
- The action defaults to Wrangler 3, which **cannot** do assets-only deploys. We pin
  `wranglerVersion: "4"` in the workflow — do not remove this.
- Secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are configured as GitHub repo secrets.
- Domains are bound via `routes` with `"custom_domain": true` (apex + www). This makes Wrangler
  auto-provision the DNS records **and** TLS certs. Do **not** use plain routes (`pattern/*`) —
  those require a pre-existing proxied DNS record and silently fail to resolve without one.
- `"workers_dev": false` keeps the CV off the `*.workers.dev` URL, so it's reachable only via
  the custom domain.
- The worker name is `cv`. The live site **is** that worker — never delete it thinking it's a
  stale test deploy.
- Static assets must live under `public/` (the `assets.directory`). Do not set the assets
  directory to repo root — CI installs `node_modules` there and the deploy fails on oversized
  files.

To verify a deploy: `gh run watch --repo gustaw-beznicki/CV <run-id>`, then HTTP-check the domain
(`curl -i`, not `ping` — Cloudflare's proxy doesn't answer ICMP). DNS can be confirmed via
DoH: `curl -H "accept: application/dns-json" "https://1.1.1.1/dns-query?name=gustawbeznicki.dev&type=A"`.

## Bilingual content (EN / PL)

- The page is authored in **English** in the HTML. Polish is applied client-side by the `PL`
  object inside the `<script>` at the bottom of `public/index.html`.
- `PL.singles` maps a CSS selector → translated `innerHTML` (first match only).
- `PL.lists` maps a selector → an **array** of translations applied to matched elements **in DOM
  order**. The array index must line up with the element order — if you add/remove/reorder a
  `.exp-item`, `.highlight`, `.skill-tag`, etc., update the corresponding array or translations
  will shift onto the wrong elements.
- When editing CV content, update **both** the English HTML and the matching PL entry.
- Translate Polish **idiomatically**, reading whole sentences — not word-for-word. Avoid
  needless anglicisms (e.g. prefer *dostępne zasoby* over *kapacyta*, *ustalanie zakresu* over
  *scoping*, *Ojczysty* over *Natywny*). Keep widely-used industry terms that Polish engineers
  actually say (backend, frontend, Tech Lead, CQRS, etc.).

## Security

- `src/index.js` sets security headers (CSP, HSTS, nosniff, frame/referrer/permissions
  policies) on every response. **If you add an external resource** (a new font host, a script,
  an image CDN, an API call), you must widen the matching CSP directive in `src/index.js` or the
  browser will block it. The CSP currently allows Google Fonts (`googleapis`/`gstatic`), inline
  styles/scripts (`'unsafe-inline'`), and `data:` images.
- GitHub Actions in `deploy.yml` are **pinned to commit SHAs** with a `# vN` comment. When
  bumping a version, update the SHA, not just the comment. Dependabot opens these PRs weekly.
- `main` has lightweight branch protection: force-pushes and deletion are blocked, but direct
  pushes are allowed (the deploy flow). Secret scanning + push protection are on — a push
  containing a detected secret will be rejected.

## Print / PDF

- A `@media print` block restyles the page into a classic A4 CV (browser "Save as PDF").
- The sidebar and the footer CTA are **hidden in print**. Anything that must appear on the PDF
  (e.g. contact channels) has to live in the hero or another print-visible area, not only the
  sidebar.
