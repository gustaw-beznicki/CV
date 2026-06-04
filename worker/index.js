// Serves the static CV (Astro build output in ./dist). Redirects
// www.gustawbeznicki.dev -> gustawbeznicki.dev so the apex is the single
// canonical URL, and adds security headers to every response.
const CANONICAL_HOST = "gustawbeznicki.dev";

// Content-Security-Policy notes:
//  - Fonts are self-hosted (Fontsource) and JS is bundled to external files by
//    Astro, so no third-party hosts are needed.
//  - 'unsafe-inline' stays on style-src for inline style="" attributes and any
//    build-injected styles, and on script-src for the inline JSON-LD block.
//    There is no user-generated content or third-party JS, so the XSS surface
//    is minimal. The background noise SVG is a data: image.
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data:",
  "connect-src 'self'",
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

    if (url.hostname !== CANONICAL_HOST && url.hostname.endsWith(CANONICAL_HOST)) {
      url.hostname = CANONICAL_HOST;
      return withSecurityHeaders(Response.redirect(url.toString(), 301));
    }

    const response = await env.ASSETS.fetch(request);
    return withSecurityHeaders(response);
  },
};
