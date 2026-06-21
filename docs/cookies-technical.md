# Cookies & client-side storage — technical analysis

**Site:** <https://gustawbeznicki.dev> · **Stack:** Astro 5 static build, served by a Cloudflare
Worker (`worker/index.js`, `run_worker_first: true`).
**Audience:** engineers. For the legal/compliance view see
[analiza-cookies-prawna.md](./analiza-cookies-prawna.md) (Polish).

## TL;DR

- The site sets **no cookies** and writes **no first-party `localStorage`/`sessionStorage`**
  of its own.
- The only persistent client-side storage is the **consent banner's own preference record**,
  written to `localStorage` (not a cookie) — see [Consent storage](#consent-storage).
- **Analytics**: self-hosted **Umami** (cookieless), loaded **only after analytics consent**
  and reverse-proxied first-party under `/_a/`. No GA, no pixels, no third-party embeds. The
  previously-present **LinkedIn profile badge** (the one third-party script that could set
  cookies) **has been removed**.
- All fonts are self-hosted (Fontsource → local `.woff2`). No Google Fonts.
- The Content-Security-Policy is strict `'self'`-only (plus `'unsafe-inline'` for inline
  `style=""` attributes / the inline JSON-LD + banner init, and `data:` images).

## What runs in the browser

| Mechanism | Present? | Notes |
| --------- | -------- | ----- |
| First-party cookies | No | No `Set-Cookie` from the worker, no `document.cookie` anywhere. |
| First-party `localStorage`/`sessionStorage` | Consent banner (+ Umami opt-out flag) | Consent record; `umami.disabled` only if analytics is rejected after being loaded. |
| Analytics | **Umami, consent-gated** | Self-hosted, cookieless; loads only after opt-in. See [Analytics](#analytics-umami). |
| Tracking pixels / beacons | No | None. |
| Third-party scripts | No | LinkedIn badge removed; Umami is served first-party, not third-party. |
| Forms / `fetch` / `XHR` | Only Umami `POST /_a/api/send` | After consent; same-origin (proxied). CSP `form-action 'none'`. |
| Cloudflare Worker observability | Server-side only | Request logs/metrics in the CF dashboard. Sets **no** client cookie. |

Client JS is limited to [`src/scripts/enhance.ts`](../src/scripts/enhance.ts) (IntersectionObserver
nav highlight, fade-ins, print button), the consent banner init, and — after consent — the Umami
tracker. Only Umami sends data, and only page-view counts (no personal data).

## Analytics (Umami)

Privacy-friendly, **cookieless** analytics, **self-hosted** on a Raspberry Pi 4 behind a
Cloudflare Tunnel. Full deploy guide: [umami-deployment.md](./umami-deployment.md).

- **First-party proxy.** The CV worker reverse-proxies `/_a/script.js` and `/_a/api/send` to the
  Umami instance (`UMAMI_HOST` var/secret) — see `proxyAnalytics` in
  [`worker/index.js`](../worker/index.js). The tracker derives its collect endpoint from its own
  script path, so `/_a/script.js` posts to `/_a/api/send` automatically. Because it's same-origin,
  the **CSP stays strict `'self'`** and ad-blockers don't drop it.
- **Consent-gated.** The tracker is injected only by the analytics category's `onAccept` in
  [`src/components/CookieBanner.astro`](../src/components/CookieBanner.astro) (default off). On
  reject it is removed and `umami.disabled` is set. It is **not** loaded via Silktide's `scripts`
  array because that can't carry the required `data-website-id` attribute.
- **Config.** Website id via `PUBLIC_UMAMI_WEBSITE_ID` (build-time, public; placeholder until set);
  upstream via the `UMAMI_HOST` worker secret. Local/CI builds no-op gracefully (empty script,
  `204` on send) when `UMAMI_HOST` is unset.
- **Storage.** Umami sets no cookies; it reads `localStorage` only for its `umami.disabled` flag.

## The change: LinkedIn badge removal

The LinkedIn profile badge loaded `https://platform.linkedin.com/badges/js/profile.js`, which
renders inside a LinkedIn-hosted iframe and can drop LinkedIn cookies **before** any consent.
It was the sole consent-relevant element on the site.

Removed in:

- [`src/components/Sidebar.astro`](../src/components/Sidebar.astro) — the `.sidebar-li-badge` block.
- [`src/layouts/Base.astro`](../src/layouts/Base.astro) — the badge `<script>` tag.
- [`src/styles/global.css`](../src/styles/global.css) — the now-unused `.sidebar-li-badge` rule.

The plain LinkedIn **link** in the contact block stays — it is an outbound `<a>` that sets no
cookies until the user navigates to LinkedIn.

Because the badge is gone, the CSP no longer needs any LinkedIn host. The worker CSP was
tightened back to `'self'`-only (see below).

## Content-Security-Policy (after change)

Defined in [`worker/index.js`](../worker/index.js) and applied to every response:

```
default-src 'self';
base-uri 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
font-src 'self';
img-src 'self' data:;
connect-src 'self';
frame-src 'none';
form-action 'none';
frame-ancestors 'none';
object-src 'none';
upgrade-insecure-requests
```

`'unsafe-inline'` remains on `script-src` (inline JSON-LD + the inline banner `init()` call) and
`style-src` (inline `style=""` attributes used across components). The self-hosted Silktide JS/CSS
load from `'self'`, so no external host is whitelisted.

Other headers (unchanged): HSTS `max-age=63072000; includeSubDomains`, `X-Content-Type-Options:
nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, a
restrictive `Permissions-Policy`, and `Cross-Origin-Opener-Policy: same-origin`.

> **If you ever add an external resource** (analytics, a font CDN, an image host, an API), the
> browser will block it until you widen the matching CSP directive in `worker/index.js`. Add the
> origin to the specific directive (`script-src`, `connect-src`, `img-src`, …) — never loosen
> `default-src`.

## Consent banner

[Silktide Consent Manager](https://github.com/silktide/consent-manager) **v2.0.0**, MIT-licensed,
**self-hosted** — no CDN. Pinned files live in
[`public/vendor/silktide/v2.0.0/`](../public/vendor/silktide/v2.0.0/) (`*.js`, `*.css`, `LICENSE`)
and are served from the site's own origin.

Verified properties of the vendored build:

- Uses **`localStorage` only** — no `document.cookie`.
- Makes **zero external network requests** (the only `silktide.com` references are a clickable
  credit link and source comments).
- Injects no inline `<style>`; all styling comes from the external CSS file via `stcm-`-prefixed
  classes and `#stcm-wrapper` CSS variables.

### Integration

- [`src/components/CookieBanner.astro`](../src/components/CookieBanner.astro) renders the
  self-hosted `<link>` + `<script>` and an inline `window.silktideConsentManager.init({...})` call.
- Banner copy is fully localized via the typed `cookieBanner` block in
  [`src/content/types.ts`](../src/content/types.ts), populated in `en.ts` and `pl.ts`. The EN page
  (`/`) and PL page (`/pl`) each render their own language (the site has no client-side i18n).
- Wired into [`src/layouts/Base.astro`](../src/layouts/Base.astro).

### Consent categories

| id | label | required | default | Gates |
| -- | ----- | -------- | ------- | ----- |
| `essential` | Essential | yes | on | The consent record itself. Cannot be rejected. |
| `analytics` | Analytics | no | **off** | The self-hosted Umami tracker (`onAccept`/`onReject`). |

The `Social media` category was intentionally **not** added: the only social embed (the badge)
was removed, so it would gate nothing.

> **No cookies are set at all** — by anyone, including Umami. The analytics opt-in gates a
> cookieless tracker (no device storage beyond an opt-out flag). The banner is thus stricter than
> ePrivacy strictly requires for cookieless analytics; see the legal memo.

### Consent storage

Silktide writes the user's choice to `localStorage` under the `silktide-consent-manager` key
(suffixed if a `namespace` is configured). This is a strictly-necessary record of the user's own
preference; it carries no identifier and is read only to decide whether to show the prompt.

## Adding another gated script later (pattern)

Umami is the live example (analytics category, `onAccept`/`onReject` in
[`src/components/CookieBanner.astro`](../src/components/CookieBanner.astro)). For any further
consent-gated script, do **not** add it to the page directly — attach it to the matching category:

```js
{
  id: 'analytics',
  label: '…',            // from content.cookieBanner
  description: '…',
  defaultValue: false,
  // Option A — declarative injection (Silktide loads on accept, removes on revoke via reload).
  //   Note: only carries url/load/type/crossorigin/integrity — NOT custom data-* attributes.
  scripts: [{ url: 'https://example.com/analytics.js', load: 'async' }],
  // Option B — run code on accept/reject (use this when you need data-* attrs, as Umami does):
  onAccept() { /* inject / init */ },
  onReject() { /* remove / disable */ },
}
```

If the script is **third-party** (not proxied first-party like Umami), also widen the CSP in
`worker/index.js`: add the origin to `script-src` and its data endpoint to `connect-src`. Prefer
the first-party `/_a/`-style proxy where possible to keep the CSP `'self'`.

## Updating Silktide

Pinned at **v2.0.0** (`git tag v2.0.0`, commit `e01dee8`). To update: clone the new tag, copy
`silktide-consent-manager.{js,css}` + `LICENSE` into a new `public/vendor/silktide/<version>/`
folder, update the paths in `CookieBanner.astro`, and re-verify the config keys against that
version's `README.md` (the v2 API is `window.silktideConsentManager.init({ consentTypes: [...] })`).

## Verification checklist

1. `pnpm run check` — type-check passes (the `cookieBanner` field is required in both locales).
2. `pnpm run build && pnpm dlx wrangler dev`, then on `/` and `/pl`:
   - Banner shows, localized; Accept / Reject / Preferences work; choice persists across reloads.
   - Network tab: **no** request to `platform.linkedin.com` / `licdn.com`; Silktide JS/CSS and all
     fonts load from the site's own origin.
   - Console: no CSP violations.
   - Response headers: CSP contains no external host.
   - Application → Local Storage: only the Silktide consent key; **no cookies** under Storage → Cookies.
   - Analytics: with `UMAMI_HOST` unset, `GET /_a/script.js` → `200` empty and `POST /_a/api/send`
     → `204`. Enabling Analytics in the banner injects `<script src="/_a/script.js">`; rejecting
     removes it and sets `umami.disabled`.
3. `grep -ri "googleapis\|gstatic" src dist` returns nothing (fonts are local).
