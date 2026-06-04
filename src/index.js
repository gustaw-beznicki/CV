// Serves the static CV. Redirects www.gustawbeznicki.dev -> gustawbeznicki.dev
// so the apex is the single canonical URL.
const CANONICAL_HOST = "gustawbeznicki.dev";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname !== CANONICAL_HOST && url.hostname.endsWith(CANONICAL_HOST)) {
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
