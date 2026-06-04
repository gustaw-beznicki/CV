# CV — gustawbeznicki.dev

Personal CV / résumé for **Gustaw Beźnicki**, Senior Software Engineer & Team Lead.

🔗 **Live:** https://gustawbeznicki.dev

A single self-contained static page — all markup, styling, and behaviour live in
[`public/index.html`](public/index.html). No build step, no dependencies.

## Features

- **Bilingual** — English / Polish, toggled client-side (`#pl` URL hash deep-links to Polish).
- **Print-ready** — a dedicated print stylesheet renders a clean A4 CV via the browser's
  *Save as PDF*.
- **Responsive** — single-column on mobile, sidebar layout on desktop.
- **Self-contained** — one HTML file; the only external resources are Google Fonts.

## Project structure

```
public/index.html          The entire site (HTML + CSS + JS)
src/index.js               Cloudflare Worker: www → apex redirect, then serve assets
wrangler.jsonc             Cloudflare Workers config
.github/workflows/deploy.yml   CI/CD — deploys on every push to main
```

## Local preview

It's a plain HTML file — open `public/index.html` in a browser, or serve the folder:

```sh
npx wrangler dev      # serves via the Worker (matches production)
# or any static server, e.g.
python -m http.server --directory public
```

Append `#pl` to the URL to load the Polish version.

## Deployment

Hosted on **Cloudflare Workers** and deployed automatically by **GitHub Actions** on every push
to `main` — there's no manual deploy step.

- Apex (`gustawbeznicki.dev`) serves the CV; `www` 301-redirects to the apex.
- DNS and TLS are provisioned automatically via Wrangler custom-domain routes.

See [`CLAUDE.md`](CLAUDE.md) for deployment internals and content-editing notes.

## Editing content

Content is authored in English in `public/index.html`. The Polish version is generated from the
`PL` translation object in the page's `<script>`. **When you change CV content, update both the
English markup and the matching Polish entry** — see `CLAUDE.md` for how the translation mapping
works.
