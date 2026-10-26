import { companies } from "./companies";
import { links } from "./links";
import type { CVContent } from "./types";

export const en: CVContent = {
  locale: "en",
  meta: {
    title: "Gustaw Beźnicki - Senior Backend Engineer",
    description:
      "Senior backend engineer with 7+ years in distributed .NET systems. Cloud settlement & billing for major Danish energy companies. Remote from Poland.",
  },
  ui: {
    cvLabel: "Curriculum Vitae",
    locationMeta: "Gdańsk / Remote",
    scroll: "Scroll",
    sectionsLabel: "Sections",
    contactLabel: "Contact",
    exportLabel: "Export",
    printAction: "→ Print / Save as PDF",
    downloadCta: "Download CV (PDF)",
    logoLabel: "Gustaw Beźnicki - deer logo",
    backToTop: "Back to top",
    themeToDark: "Switch to dark theme",
    themeToLight: "Switch to light theme",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    locationLabel: "Location",
    recruiterNote:
      "Recruiters welcome - feel free to drop me an email or a LinkedIn DM anytime.",
    summaryLabel: "Summary",
    techLabel: "Stack:",
  },
  nav: [
    { id: "highlights", label: "Highlights" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "certifications", label: "Certifications" },
    { id: "languages", label: "Languages" },
    { id: "interests", label: "Interests" },
  ],
  sectionTitles: {
    highlights: "Highlights",
    skills: "Skills",
    experience: "Experience",
    education: "Education",
    certifications: "Certifications",
    languages: "Languages",
    interests: "Interests",
  },
  hero: {
    name: "Gustaw",
    surname: "Beźnicki",
    roleHtml: `<strong>Senior backend engineer</strong> with 7+ years building distributed .NET systems in banking, energy and e-commerce. At ${companies.kmd}, works on a cloud settlement and billing platform for major Danish energy companies, handling several million metering points per tenant, with a current focus on master data and data processing. Experienced in event-driven architecture, CQRS/DDD and turning complex business rules into reliable systems. Works daily in English in a cross-border Polish-Danish team; available until 2 PM ET.`,
    locationInline: "Gdańsk, Poland · Remote",
    partNumber: "GB-01",
    revision: "Rev. 2026",
    docTitle:
      "Senior Backend Engineer | Distributed Billing & Settlement Systems | .NET, Azure, Kafka",
    specsHead: ["Parameter", "Value"],
    specs: [
      { label: "Experience", value: "7 yrs · distributed .NET" },
      { label: "Domains", value: "Billing · banking · energy · e-com" },
      { label: "Team", value: "6 engineers · PL / DK" },
      { label: "Core stack", value: ".NET · Azure · Kafka · Angular" },
      { label: "Ventures", value: `${companies.bnb} · ${companies.lavamme}` },
      { label: "Languages", value: "PL native · EN C1" },
    ],
    figCaption: "Fig. 1 - GB-01, front elevation",
    pinLabel: "Pin 1",
    sheetLabel: "Sheet 1 / 1",
  },
  contact: {
    email: links.email,
    linkedinUrl: links.linkedin.url,
    linkedinLabel: links.linkedin.label,
    location: "Gdańsk, Poland · Remote",
  },
  highlights: [
    {
      tag: "Engineering",
      html: "Seven years of enterprise .NET - across <strong>banking</strong>, <strong>energy</strong>, <strong>e-commerce</strong>, and <strong>logistics</strong>.",
    },
    {
      tag: "Current Role",
      html: "Works on a <strong>cloud settlement &amp; billing platform for major Danish energy companies</strong> - several million metering points per tenant, focused on master data and data processing.",
    },
    {
      tag: "AI Adoption",
      html: "<strong>Built an internal agent that drafts High-Level Design documents from rough notes</strong>, cutting preparation from 5-8 days to 1-2 days. Introduced shared Copilot instructions and agentic coding workflows to the team. After hours, runs a <strong>self-hosted AI assistant</strong> as a private project - an always-on agent with tool use, semantic long-term memory, and tiered models under a hard cost cap.",
    },
    {
      tag: "Side Ventures",
      html: `Two ventures alongside the day job: <strong>${companies.bnb}</strong>, a productized web service for Polish SMBs (co-founded 2026), and <strong>${companies.lavamme}</strong>, a Shopify-based fashion e-commerce (co-founded 2024).`,
    },
    {
      tag: "Continuous Learning",
      html: "<strong>Leadership &amp; communication</strong> training (2024), <strong>AI tooling</strong> (2025-2026).",
    },
  ],
  skills: [
    {
      category: "Architecture",
      tags: [
        "Distributed systems",
        "Event-driven",
        "CQRS",
        "DDD",
        "Microservices",
        "SOLID",
      ],
    },
    {
      category: "Backend",
      tags: [
        "C#",
        ".NET 10",
        "ASP.NET Core",
        "Entity Framework Core",
        "MediatR",
        "Dapper",
      ],
    },
    {
      category: "Cloud & Platform",
      tags: [
        "Azure (App Service, Functions, Event Grid, Key Vault, App Insights)",
        "Docker",
        "Helm",
        "ArgoCD",
        "GitHub Actions",
        "Azure DevOps",
      ],
    },
    {
      category: "Data & Messaging",
      tags: ["Kafka", "RabbitMQ", "MS SQL", "ElasticSearch", "Redis"],
    },
    {
      category: "Quality & Observability",
      tags: [
        "Unit & integration testing (MSTest, NUnit)",
        "OpenTelemetry",
        "OpenSearch",
        "Structured logging",
      ],
    },
    {
      category: "Frontend",
      tags: ["Angular", "TypeScript", "Astro", "Tailwind CSS"],
    },
    {
      category: "AI-Assisted Dev",
      lead: true,
      tags: ["Claude Code", "GitHub Copilot", "Custom agents & skills"],
    },
    {
      category: "Collaboration",
      lead: true,
      tags: [
        "Mentoring",
        "Onboarding",
        "PO collaboration",
        "Cross-team coordination",
        "PL ↔ DK communication",
      ],
    },
  ],
  experience: [
    {
      period: "02 / 2023 - Present",
      current: true,
      title: "Senior .NET Developer",
      positions: [
        {
          title: "Senior .NET Developer",
          period: "07 / 2025 - Present",
          pill: "Now",
        },
        {
          title: ".NET Developer",
          period: "02 / 2023 - 06 / 2025",
          note: "promoted to Senior",
        },
      ],
      company: `<a href="${links.companies.kmd}" target="_blank" rel="noopener noreferrer"><em>${companies.kmdFull}</em></a> · Remote, Poland`,
      context:
        "Cloud settlement & billing platform for major Danish energy companies. Six-person team within a wider multi-team setup.",
      bullets: [
        "Built an internal AI agent that drafts High-Level Design documents from rough notes, cutting HLD preparation from 5-8 days to 1-2 days (~75-80% faster); introduced shared Copilot instructions and agentic coding workflows to the team.",
        "Automated the meter change process in coordination with three sibling teams, replacing manual data changes across 3 domains and saving customers 10-20 hours of manual operations per month.",
        "Drive architecture decisions for major epics, balancing technical correctness against business priorities.",
        "Ship backend code on the platform's critical paths (.NET 10, Kafka, CQRS/DDD) and Angular/TypeScript microfrontends.",
        "Work with the Product Owner to turn business requests into engineer-ready user stories.",
        "Mentor teammates and run onboarding for new joiners through pairing and platform walkthroughs.",
      ],
      tech: ".NET 10 · C# · Azure (App Service, Functions, Event Grid, Key Vault, App Insights) · MS SQL · ElasticSearch · Redis · Kafka · CQRS · DDD · MediatR · Entity Framework Core · Angular · TypeScript · Docker · Helm · ArgoCD · GitHub Actions · OpenTelemetry · OpenSearch · MSTest",
    },
    {
      period: "2026 - Present · Remote",
      current: true,
      title: "Co-founder & Tech Lead",
      company: `<a href="${links.companies.bnb}" target="_blank" rel="noopener noreferrer"><em>${companies.bnb}</em></a>`,
      anchor: "exp-bnb",
      body: "Co-founded a software house building productized websites for Polish independent professionals - lawyers, doctors, architects. Designed the white-label template system (Astro + Sanity CMS) that ships per-client deployments fast. Owns tech direction, delivery framework, and client scoping.",
      tech: "Astro · Sanity CMS · TypeScript · Tailwind CSS · Cloudflare Pages",
    },
    {
      period: "03 / 2024 - Present · Remote",
      current: true,
      title: "Co-founder & Tech Lead",
      company: `<a href="${links.companies.lavamme}" target="_blank" rel="noopener noreferrer"><em>${companies.lavamme}</em></a>`,
      anchor: "exp-lavamme",
      body: "Co-founded a fashion e-commerce brand and built the tech side from scratch. Delivered the Shopify storefront with payments, logistics, and customer-experience integrations. Stayed close to the business too - product, brand, pricing, customer journey - picking up commercial ownership alongside engineering.",
    },
    {
      period: "04 / 2023 - 05 / 2024",
      title: "Programming Trainer (part-time)",
      company: `<a href="${links.companies.isa}" target="_blank" rel="noopener noreferrer"><em>${companies.isa}</em></a> · Łódź`,
      body: "Taught .NET development alongside a team of trainers - courses, workshops, and one-to-one guidance. Built curriculum materials and ran sessions for students at varying skill levels.",
      tech: "C# · ASP.NET · .NET Core · Entity Framework · Visual Studio",
    },
    {
      period: "08 / 2021 - 02 / 2023",
      title: "Software Engineer",
      company: `<a href="${links.companies.sii}" target="_blank" rel="noopener noreferrer"><em>${companies.sii}</em></a> · Łódź`,
      bullets: [
        "Delivered features on a headless e-commerce SaaS engine built on microservices (.NET 6, ElasticSearch, RabbitMQ, MongoDB, Docker, ArgoCD).",
        "Maintained and optimised legacy services within a five-person Scrum team.",
      ],
    },
    {
      period: "2018 - 2021",
      title: "Earlier Experience",
      company: `.NET roles at ${companies.bakk}, ${companies.accenture}, ${companies.unit4} and ${companies.rossmann}`,
      bullets: [
        "Built an automated loan disbursement module integrated with Santander Bank, and an invoice OCR Web API (BAKK).",
        "Developed internet and mobile banking features and introduced PowerShell automation for regression and performance testing (Accenture).",
      ],
    },
  ],
  education: [
    {
      year: "2020",
      degree: "Bachelor of Engineering · Computer Systems",
      place: "Lodz University of Technology",
      note: "Rector's scholarship for outstanding students (awarded November 2018)",
    },
  ],
  certifications: [
    { year: "2026", name: "Claude Code 101", issuer: "Anthropic" },
    { year: "2026", name: "Introduction to Subagents", issuer: "Anthropic" },
    {
      year: "2022",
      name: "Domain-Driven Design & Event Storming",
      issuer: "Engineering",
    },
  ],
  languages: [
    { code: "PL", name: "Polish", level: "Native" },
    { code: "EN", name: "English", level: "C1 - daily working language" },
  ],
  interests:
    "Psychology · Cooking · Dog behaviour · Running · Strength training · Books & audiobooks",
  footer: {
    ctaHtml: `Got something interesting to build? <br> <a href="mailto:${links.email}">Let's talk →</a>`,
    meta: "© 2026 · Gustaw Beźnicki · Crafted in Gdańsk",
    githubUrl: links.github.url,
    githubLabel: links.github.label,
    linkedinUrl: links.linkedin.url,
    linkedinLabel: links.linkedin.label,
  },
  cookieBanner: {
    promptDescription:
      "This site keeps things simple and private: it sets no cookies, and loads anonymous, self-hosted analytics only if you allow it.<br><small>No cookies at all? Yes, really - open “Read the fine print” for the full story.</small>",
    acceptAll: "Accept all",
    rejectNonEssential: "Reject non-essential",
    preferences: "Read the fine print",
    prefsTitle: "The fine print (with jokes)",
    prefsDescription:
      "Plot twist: there really are no cookies. None. This site doesn't bake any - no tracking, no crumbs, no third parties peeking over your shoulder. The only thing on your device is your answer to this banner, so it never nags you again. Most people just smash a button and run, so - genuine respect for reading this far. 🍪",
    prefsSave: "Save & close",
    essentialLabel: "Essential",
    essentialDescription:
      "The keep-the-lights-on setting: remembers your choice here and literally nothing else. Can't be switched off, or this banner would forget you and pop up forever.",
    analyticsLabel: "Analytics",
    analyticsDescription:
      "Self-hosted Umami, counting page views so I can see which projects people actually open. Cookieless, anonymous, and served from my own domain - the data never leaves a Raspberry Pi humming on my shelf. Off until you flip it. And hey: you read a cookie banner to the end, so you're officially in the top 1% of the internet.",
  },
};
