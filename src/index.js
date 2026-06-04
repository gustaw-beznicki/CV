// Serves the static CV. Redirects www.gustawbeznicki.dev -> gustawbeznicki.dev
// so the apex is the single canonical URL, and adds security headers to every
// response.
const CANONICAL_HOST = "gustawbeznicki.dev";

// Content-Security-Policy notes:
//  - 'unsafe-inline' is required for script-src/style-src because the page uses
//    an inline <script>, inline style="" attributes, and an inline onclick.
//    There is no user-generated content or third-party JS, so the XSS surface is
//    minimal. Google Fonts needs googleapis (CSS) + gstatic (font files); the
//    background noise SVG is a data: image.
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
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
