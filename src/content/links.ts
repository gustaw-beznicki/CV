/**
 * Single source of truth for URLs and contact constants.
 *
 * Shared across both locales, same pattern as companies.ts. Edit a value here
 * and it updates everywhere it appears — contact block, footer, and the
 * experience timeline — in both en.ts and pl.ts.
 */
export const links = {
  email: "contact@gustawbeznicki.dev",
  linkedin: {
    url: "https://www.linkedin.com/in/gustawbeznicki/",
    label: "linkedin.com/in/gustawbeznicki",
  },
  github: {
    url: "https://github.com/gustaw-beznicki",
    label: "github.com/gustaw-beznicki",
  },
  /** Company / venture links used in experience-entry headings. */
  companies: {
    kmd: "https://www.kmd.net/career/locations-poland",
    bnb: "https://bbdigital.pl/",
    lavamme: "https://lavamme.com",
    isa: "https://infoshareacademy.com/",
    sii: "https://sii.pl",
    bakk: "https://bakk.com/kariera/",
    unit4: "https://unit4.com",
    accenture: "https://accenture.com",
    rossmann: "https://kariera.rossmann.pl/pracuj-w-it",
  },
} as const;
