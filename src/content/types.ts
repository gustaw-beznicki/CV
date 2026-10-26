export type Locale = "en" | "pl";

export interface NavItem {
  /** Matches the section element id, e.g. "highlights". */
  id: string;
  label: string;
}

export interface Highlight {
  tag: string;
  /** May contain inline <strong>. */
  html: string;
}

export interface SkillRow {
  category: string;
  tags: string[];
  /** Renders tags in the accent "lead" style (leadership / AI rows). */
  lead?: boolean;
}

export interface ExperienceGroup {
  label: string;
  items: string[];
}

export interface Experience {
  period: string;
  /** Optional badge shown next to the period (e.g. "Now"). */
  pill?: string;
  /** Highlights the timeline dot as an active role. */
  current?: boolean;
  title: string;
  /** May contain inline <em> for the company name. */
  company: string;
  /** Anchor id for in-page links (e.g. from the hero). */
  anchor?: string;
  context?: string;
  bullets?: string[];
  groups?: ExperienceGroup[];
  body?: string;
  /** Stack line content (label is supplied by ui.techLabel). */
  tech?: string;
}

export interface EduItem {
  year: string;
  degree: string;
  place: string;
  note?: string;
}

export interface CertItem {
  year: string;
  name: string;
  issuer: string;
}

export interface LanguageItem {
  code: string;
  name: string;
  level: string;
}

export interface CVContent {
  locale: Locale;
  meta: {
    title: string;
    description: string;
  };
  ui: {
    cvLabel: string;
    locationMeta: string;
    scroll: string;
    sectionsLabel: string;
    contactLabel: string;
    exportLabel: string;
    printAction: string;
    /** Prominent hero button label — opens print / Save as PDF. */
    downloadCta: string;
    /** Accessible name for the deer logo mark. */
    logoLabel: string;
    /** Label for the floating logo link that scrolls back to the top. */
    backToTop: string;
    /** Theme toggle labels (accessible name = the action). */
    themeToDark: string;
    themeToLight: string;
    emailLabel: string;
    linkedinLabel: string;
    locationLabel: string;
    recruiterNote: string;
    techLabel: string;
  };
  nav: NavItem[];
  sectionTitles: {
    highlights: string;
    skills: string;
    experience: string;
    education: string;
    certifications: string;
    languages: string;
    interests: string;
  };
  hero: {
    name: string;
    surname: string;
    /** May contain inline <strong>. */
    roleHtml: string;
    locationInline: string;
    /** Datasheet header: part number, e.g. "GB-01". */
    partNumber: string;
    /** Datasheet header: revision, e.g. "Rev. 2026". */
    revision: string;
    /** Title line under the name (mono kicker). */
    docTitle: string;
    /** Column headings of the key-parameters table. */
    specsHead: [string, string];
    /** Key parameters, rendered as "label ........ value". */
    specs: { label: string; value: string }[];
    /** Caption under the chip illustration. */
    figCaption: string;
    /** Footer strip of the datasheet frame. */
    pinLabel: string;
    sheetLabel: string;
  };
  contact: {
    email: string;
    linkedinUrl: string;
    linkedinLabel: string;
    location: string;
  };
  highlights: Highlight[];
  skills: SkillRow[];
  experience: Experience[];
  education: EduItem[];
  certifications: CertItem[];
  languages: LanguageItem[];
  /** Interests rendered as a single " · "-separated line. */
  interests: string;
  footer: {
    /** May contain inline <br> and an <a>. */
    ctaHtml: string;
    meta: string;
    githubUrl: string;
    githubLabel: string;
    linkedinUrl: string;
    linkedinLabel: string;
  };
  /** Copy for the self-hosted Silktide consent banner (CookieBanner.astro). */
  cookieBanner: {
    /** Intro prompt shown in the banner. Plain text (rendered inside <p>). */
    promptDescription: string;
    acceptAll: string;
    rejectNonEssential: string;
    preferences: string;
    /** Preferences modal. */
    prefsTitle: string;
    prefsDescription: string;
    prefsSave: string;
    /** Consent categories. */
    essentialLabel: string;
    essentialDescription: string;
    analyticsLabel: string;
    analyticsDescription: string;
  };
}
