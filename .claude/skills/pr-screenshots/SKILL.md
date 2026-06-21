---
name: pr-screenshots
description: >-
  Capture before/after screenshots of the CV (EN `/` and PL `/pl`) and attach
  them to the PR. THIS IS A BLOCKING STEP — use it whenever you open OR update a
  pull request whose diff changes anything VISIBLE in the rendered page:
  components, styles/global.css, content copy in en.ts/pl.ts/companies.ts, new
  UI (e.g. the cookie banner), layout, fonts, or print sheet. If the change is
  visible in a browser, screenshots are required before the PR is considered
  done. Skip ONLY for purely non-visual changes (worker headers, CI, docs,
  types with no render effect).
---

# PR screenshots for the CV

This repo ships screenshots with every visually-relevant PR (see prior commits
"Add PR screenshots …"). They live in `.pr-screenshots/` and are committed on the
PR branch, then embedded in the PR body.

## When to take them

Take screenshots **before finalizing the PR** if the diff touches any of:

- `src/components/*.astro`, `src/layouts/*.astro`, `src/pages/**`
- `src/styles/global.css` (including the print sheet)
- `src/content/en.ts` / `pl.ts` / `companies.ts` (visible copy)
- fonts, images, or any new on-page UI (banners, modals, toggles)

For a new/changed **overlay** (cookie banner, modal), capture both its default
state and any opened panel (e.g. the preferences modal), in **both languages**.

## How to capture

Playwright is already a dev dependency and its Chromium is installed.

```sh
pnpm run build                       # screenshots run against the built site
pnpm run preview &                   # serves dist/ — note the port it prints
# capture (auto-detects the preview port from the running server if omitted):
BASE=http://localhost:<port> pnpm exec node .claude/skills/pr-screenshots/scripts/shoot.mjs
```

By default `shoot.mjs` writes full-page screenshots of `/` and `/pl` to
`.pr-screenshots/` as `page-en.png` / `page-pl.png`. Flags:

- `--routes /,/pl` — routes to capture (comma-separated)
- `--out .pr-screenshots` — output directory
- `--selector "#stcm-wrapper > .stcm-loaded"` — crop to one element instead of
  full page (use for overlays; the banner prompt gets the `stcm-loaded` class
  after its slide-in animation finishes)
- `--prefix cookie-banner` — output filename prefix

Verify each PNG with the Read tool before committing — dark-on-dark UI can be
present but hard to see; a cropped element screenshot is clearer for overlays.

## Attach to the PR

1. `git add .pr-screenshots/<files>` and commit on the PR branch, then push.
2. Embed in the PR body via the raw URL pinned to the **commit SHA**, not the branch:
   `![EN](https://raw.githubusercontent.com/<owner>/<repo>/<full-sha>/.pr-screenshots/<file>.png)`
   Use the SHA (`git rev-parse HEAD`), because GitHub's image proxy (Camo) caches by URL — if
   you re-capture and the branch URL is unchanged, the PR keeps showing the **stale** image. A
   fresh SHA URL busts the cache and is immutable. Re-pin the URLs each time you push new shots.

## Notes

- `astro preview` applies no CSP, so client JS (the banner init) runs freely —
  fine for screenshots. The real CSP is enforced by `worker/index.js`.
- Each capture uses a fresh browser context, so consent/localStorage is clean
  and the banner prompt shows on load.
