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
    year: string;
    locationMeta: string;
    scroll: string;
    sectionsLabel: string;
    contactLabel: string;
    exportLabel: string;
    printAction: string;
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
}
