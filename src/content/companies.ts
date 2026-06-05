/**
 * Single source of truth for company / venture brand names.
 *
 * Shared across both locales (proper nouns are not translated). Edit a name
 * here and it updates everywhere it appears — meta, hero, highlights, and the
 * experience timeline — in both en.ts and pl.ts.
 */
export const companies = {
  kmd: "KMD",
  kmdFull: "KMD Poland", // experience entries use the longer form
  bnb: "B&B Digital",
  lavamme: "Lavamme",
  isa: "ISA",
  sii: "Sii Poland",
  bakk: "BAKK",
  unit4: "Unit4",
  accenture: "Accenture Technology",
  rossmann: "Rossmann SDP",
} as const;
