# Umami analytics — self-hosted on a Raspberry Pi 4

Privacy-friendly, **cookieless** web analytics for <https://gustawbeznicki.dev>, run
on a Raspberry Pi 4 and exposed to the internet through a **Cloudflare Tunnel**. The
site loads the tracker **first-party** (reverse-proxied by the CV worker under `/_a/`)
and only **after analytics consent**.

```text
visitor ──▶ gustawbeznicki.dev/_a/script.js        (CV Cloudflare Worker)
        ──▶ gustawbeznicki.dev/_a/api/send   ─┐
                                              │  proxyAnalytics() → UMAMI_HOST
                                              ▼
                              Cloudflare Tunnel ──▶ Raspberry Pi (Docker)
                                                     ├─ umami  (Node app)
                                                     └─ postgres
```

Why this shape:

- **First-party** — the tracker is served from our own domain, so the CSP stays strict
  `'self'` and ad-blockers don't drop it.
- **Tunnel, not port-forwarding** — `cloudflared` makes an outbound connection; no open
  ports, no exposed home IP.
- **Cookieless** — Umami sets no cookies and stores no personal data; it only reads a
  local `umami.disabled` opt-out flag. See the cookie docs for the legal view.

## 1. Run Umami + Postgres on the Pi (Docker)

Raspberry Pi 4 (arm64, 64-bit OS) with Docker + Compose. Umami + Postgres need ~512 MB.

`~/umami/docker-compose.yml`:

```yaml
services:
  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    ports:
      - "127.0.0.1:3000:3000" # bind to localhost; the tunnel reaches it, not the LAN
    environment:
      DATABASE_URL: postgresql://umami:umami@db:5432/umami
      DATABASE_TYPE: postgresql
      APP_SECRET: REPLACE_WITH_A_LONG_RANDOM_STRING # openssl rand -hex 32
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: umami
      POSTGRES_USER: umami
      POSTGRES_PASSWORD: umami
    volumes:
      - umami-db:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U umami"]
      interval: 5s
      timeout: 5s
      retries: 10
    restart: unless-stopped
volumes:
  umami-db:
```

```sh
cd ~/umami && docker compose up -d
```

Umami is now on `http://127.0.0.1:3000` on the Pi. Default login is `admin` / `umami` —
**change the password immediately** in the dashboard.

> The image runs DB migrations on first boot. Back up the `umami-db` volume (`pg_dump`)
> — losing it loses all history.

## 2. Expose it with a Cloudflare Tunnel

Install `cloudflared` on the Pi and create a named tunnel pointing a hostname (e.g.
`umami.gustawbeznicki.dev`) at the local Umami:

```sh
cloudflared tunnel login
cloudflared tunnel create cv-umami
# ~/.cloudflared/config.yml
#   tunnel: cv-umami
#   credentials-file: /home/pi/.cloudflared/<tunnel-id>.json
#   ingress:
#     - hostname: umami.gustawbeznicki.dev
#       service: http://127.0.0.1:3000
#     - service: http_status:404
cloudflared tunnel route dns cv-umami umami.gustawbeznicki.dev
sudo cloudflared service install   # run as a service so it survives reboots
```

**Protect the dashboard, keep collection public.** In Cloudflare Zero Trust, add an
Access policy on `umami.gustawbeznicki.dev` but scope it so the API stays reachable —
restrict Access to the **login/dashboard paths only**, leaving `/script.js` and
`/api/send` public, or the browser can't send events. (The proxy below only ever calls
those two public paths.)

## 3. Point the site at it

The CV worker reverse-proxies `/_a/script.js` and `/_a/api/send` to `UMAMI_HOST`
(see [`worker/index.js`](../worker/index.js), `proxyAnalytics`).

1. **Create a website in Umami** (dashboard → Settings → Websites → Add) with domain
   `gustawbeznicki.dev`. Copy its **Website ID** (a UUID).
2. **Worker upstream** — set the tunnel URL as a secret (don't commit it):

   ```sh
   pnpm dlx wrangler secret put UMAMI_HOST
   # value: https://umami.gustawbeznicki.dev
   ```

   `wrangler.jsonc` keeps `UMAMI_HOST: ""` as the default so local/CI builds no-op.
3. **Website ID** — expose it at build time as `PUBLIC_UMAMI_WEBSITE_ID`. For the
   deploy workflow add it as a repository variable/secret and pass it to the build:

   ```yaml
   # .github/workflows/deploy.yml — build step
   env:
     PUBLIC_UMAMI_WEBSITE_ID: ${{ vars.PUBLIC_UMAMI_WEBSITE_ID }}
   ```

   Until set, the placeholder UUID ships and events are simply ignored by Umami.

## 4. Verify

- `curl -I https://gustawbeznicki.dev/_a/script.js` → `200`, `content-type: text/javascript`
  (empty body until `UMAMI_HOST` is set).
- On the live site: open the banner, **enable Analytics** → DevTools Network shows
  `GET /_a/script.js` and a `POST /_a/api/send` (204/200) on each page view, both
  same-origin. **Reject** → no further `/_a/api/send` calls.
- A visit appears in the Umami dashboard within a few seconds.
- No `Set-Cookie`; the only storage is the consent record and (if you ever opt out via
  Umami) the `umami.disabled` localStorage flag.

## Updating Umami

```sh
cd ~/umami && docker compose pull && docker compose up -d
```

Pin to a specific tag instead of `postgresql-latest` if you want reproducible deploys.
