// Serves the static CV (Astro build output in ./dist). Redirects
// www.gustawbeznicki.dev -> gustawbeznicki.dev so the apex is the single
// canonical URL, reverse-proxies the self-hosted Umami analytics tracker as
// first-party under /_a/, and adds security headers to every response.
const CANONICAL_HOST = "gustawbeznicki.dev";

// First-party analytics proxy. The Umami tracker is served from /_a/script.js
// and posts events to /_a/api/send; both are proxied to the self-hosted Umami
// instance (Raspberry Pi behind a Cloudflare Tunnel) named by the UMAMI_HOST
// var/secret. Keeping it first-party means the CSP stays strict 'self' and the
// tracker is not blocked as a third-party origin. See docs/umami-deployment.md.
const ANALYTICS_PREFIX = "/_a";
const ANALYTICS_ROUTES = new Set(["/script.js", "/api/send"]);

async function proxyAnalytics(request, url, env) {
  const sub = url.pathname.slice(ANALYTICS_PREFIX.length); // "/script.js" | "/api/send"
  if (!ANALYTICS_ROUTES.has(sub)) {
    return new Response("Not found", { status: 404 });
  }

  const host = (env.UMAMI_HOST || "").replace(/\/+$/, "");
  // Graceful no-op when UMAMI_HOST is unset (local/CI/preview): serve an empty
  // tracker and accept events silently so nothing errors before deploy.
  if (!host) {
    return sub === "/script.js"
      ? new Response("", {
          status: 200,
          headers: {
            "content-type": "text/javascript; charset=utf-8",
            "cache-control": "no-store",
          },
        })
      : new Response(null, { status: 204 });
  }

  const headers = new Headers();
  const ct = request.headers.get("content-type");
  const ua = request.headers.get("user-agent");
  if (ct) headers.set("content-type", ct);
  if (ua) headers.set("user-agent", ua);
  // Umami identifies visitors from the client IP + UA (hashed, no cookie).
  headers.set("x-forwarded-for", request.headers.get("cf-connecting-ip") || "");
  headers.set("x-forwarded-proto", "https");

  const body =
    request.method === "GET" || request.method === "HEAD"
      ? undefined
      : await request.text();

  const upstream = await fetch(`${host}${sub}`, {
    method: request.method,
    headers,
    body,
    redirect: "manual",
  });

  const out = new Headers(upstream.headers);
  if (sub === "/script.js") out.set("cache-control", "public, max-age=86400");
  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: out,
  });
}

// Content-Security-Policy notes:
//  - Everything is first-party: fonts are self-hosted (Fontsource), JS is
//    bundled to external files by Astro, the cookie-consent banner (Silktide,
//    MIT) is self-hosted under /vendor/silktide/, and the Umami analytics
//    tracker is reverse-proxied under /_a/ (see proxyAnalytics). No third-party
//    hosts are needed, so the policy is strict 'self'-only.
//  - 'unsafe-inline' stays on style-src for inline style="" attributes and any
//    build-injected styles, and on script-src for the inline JSON-LD block and
//    the inline consent-banner init() call. There is no user-generated content
//    or third-party JS, so the XSS surface is minimal. The background noise SVG
//    is a data: image.
//  - If you add any external resource (analytics, font/image CDN, API), widen
//    the matching directive below — never loosen default-src.
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data:",
  "connect-src 'self'",
  "frame-src 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = {
  "Content-Security-Policy": CSP,
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "accelerometer=(), autoplay=(), camera=(), display-capture=(), " +
    "encrypted-media=(), fullscreen=(self), geolocation=(), gyroscope=(), " +
    "magnetometer=(), microphone=(), midi=(), payment=(), usb=()",
  "Cross-Origin-Opener-Policy": "same-origin",
};

function withSecurityHeaders(response) {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(name, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (
      url.hostname !== CANONICAL_HOST &&
      url.hostname.endsWith(CANONICAL_HOST)
    ) {
      url.hostname = CANONICAL_HOST;
      return withSecurityHeaders(Response.redirect(url.toString(), 301));
    }

    if (url.pathname.startsWith(`${ANALYTICS_PREFIX}/`)) {
      return withSecurityHeaders(await proxyAnalytics(request, url, env));
    }

    const response = await env.ASSETS.fetch(request);
    return withSecurityHeaders(response);
  },
};
