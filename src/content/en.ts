import type { CVContent } from "./types";
import { companies } from "./companies";

export const en: CVContent = {
  locale: "en",
  meta: {
    title: "Gustaw Beźnicki — Senior Software Engineer & Team Lead",
    description: `Senior Software Engineer transitioning into Engineering Leadership. 7+ years in .NET and distributed cloud systems. Co-founder of ${companies.bnb}. Tech Lead at ${companies.lavamme}.`,
  },
  ui: {
    cvLabel: "Curriculum Vitae",
    year: "· 2026 ·",
    locationMeta: "Gdańsk / Remote",
    scroll: "Scroll",
    sectionsLabel: "Sections",
    contactLabel: "Contact",
    exportLabel: "Export",
    printAction: "→ Print / Save as PDF",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    locationLabel: "Location",
    recruiterNote:
      "Recruiters welcome — feel free to drop me an email or a LinkedIn DM anytime.",
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
    roleHtml: `<strong>Senior Software Engineer at ${companies.kmd}</strong> — building a cloud settlement &amp; billing platform and leading a six-person Polish-Danish team. Seven years in distributed .NET systems. Two ventures on the side: <a href="#exp-bnb"><strong>${companies.bnb}</strong></a> and <a href="#exp-lavamme"><strong>${companies.lavamme}</strong></a>.`,
    locationInline: "Gdańsk · Poland",
  },
  contact: {
    email: "gustaw.beznicki@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/gbeznicki/",
    linkedinLabel: "linkedin.com/in/gbeznicki",
    location: "Gdańsk / Remote",
  },
  highlights: [
    {
      tag: "Engineering",
      html: "Seven years of enterprise .NET — across <strong>banking</strong>, <strong>energy</strong>, <strong>e-commerce</strong>, and <strong>logistics</strong>.",
    },
    {
      tag: "Current Role",
      html: "Leads a <strong>Polish-Danish team of six engineers</strong> at KMD — owns the architecture, coaches the team, and represents them in cross-team and delivery-management discussions.",
    },
    {
      tag: "AI Adoption",
      html: "<strong>Brought AI into the team's daily workflow</strong> — shared Copilot instructions, agentic coding workflows, and an in-house agent that drafts High-Level Design documents from rough notes.",
    },
    {
      tag: "Side Ventures",
      html: `Two ventures alongside the day job: <strong>${companies.bnb}</strong>, a productized web service for Polish SMBs (co-founded 2026), and <strong>${companies.lavamme}</strong>, a Shopify-based fashion e-commerce (co-founded 2024).`,
    },
    {
      tag: "Leadership Growth",
      html: "<strong>Spent 2024 building the leadership toolkit</strong> — certifications in NVC, effective communication, and Polish-Danish team dynamics.",
    },
  ],
  skills: [
    {
      category: "Leadership & Comms",
      lead: true,
      tags: [
        "Technical decision-making",
        "Mentoring & coaching",
        "1-on-1s",
        "Cross-team coordination",
        "Backlog collaboration",
        "AI tooling adoption",
        "NVC",
        "PL ↔ DK communication",
      ],
    },
    {
      category: "Backend Engineering",
      tags: [
        "C#",
        ".NET (4.5 – 10)",
        "ASP.NET",
        "Entity Framework",
        "MediatR",
        "Dapper",
        "CQRS",
        "DDD",
        "Event-driven",
        "SOLID",
        "Design Patterns",
      ],
    },
    {
      category: "Cloud / DevOps",
      tags: [
        "Azure App Service",
        "Azure Functions",
        "Event Grid",
        "Key Vault",
        "Docker",
        "Helm Charts",
        "ArgoCD",
        "GitHub Actions",
        "Azure DevOps Pipelines",
      ],
    },
    {
      category: "Data & Messaging",
      tags: ["MS SQL", "ElasticSearch", "Redis", "Kafka", "RabbitMQ"],
    },
    {
      category: "Quality & Observability",
      tags: [
        "Unit & integration testing",
        "MSTest",
        "NUnit",
        "AutoFixture",
        "Moq",
        "FakeItEasy",
        "OpenTelemetry",
        "App Insights",
        "OpenSearch",
        "Structured logging",
      ],
    },
    {
      category: "Frontend & Web",
      tags: ["Angular", "TypeScript", "Astro", "Sanity CMS", "Tailwind CSS"],
    },
    {
      category: "AI-Assisted Dev",
      lead: true,
      tags: ["Claude Code", "GitHub Copilot", "Custom skills & agents"],
    },
  ],
  experience: [
    {
      period: "07 / 2025 — Present",
      pill: "Now",
      current: true,
      title: "Senior Software Engineer & Solution Expert",
      company: `<em>${companies.kmdFull}</em> · Warsaw`,
      context:
        "Cloud settlement & billing platform automating complex calculation flows for enterprise clients. Six-person engineering team within a wider multi-team setup.",
      groups: [
        {
          label: "Engineering & Technical Leadership",
          items: [
            "Owns architecture decisions across the team's major epics — weighing technical correctness against business priorities",
            "Brought AI tooling into the team's daily workflow: shared Copilot instructions, agentic coding workflows, and an in-house agent that turns rough notes into draft High-Level Design documents",
            "Pairs with the Product Owner on feature scoping — turning loose business asks into engineer-ready user stories",
            "Still ships code: backend on the platform's critical paths, with growing time spent on Angular/TypeScript microfrontends",
          ],
        },
        {
          label: "People & Team Growth",
          items: [
            "Coaches engineers through everyday collaboration, with focused 1-on-1s when someone needs the dedicated time — across both technical and personal challenges",
            "Owns onboarding for new joiners — pair sessions and platform walkthroughs to shorten time-to-contribution",
            "Acts as the team's main technical contact across teams and in delivery-management conversations on direction and capacity",
          ],
        },
      ],
      tech: ".NET 10 · C# · Azure (App Service, Functions, Event Grid, Key Vault, App Insights) · MSSQL · ElasticSearch · Redis · Kafka · CQRS · DDD · MediatR · Entity Framework · Angular · TypeScript · Docker · Helm · ArgoCD · GitHub Actions · OpenTelemetry · OpenSearch · MSTest · AutoFixture · Moq",
    },
    {
      period: "02 / 2023 — 06 / 2025",
      title: "Software Engineer",
      company: `<em>${companies.kmdFull}</em> · Warsaw`,
      context: "Same platform — settlement & billing. 5–7 person SCRUM team.",
      bullets: [
        "Backend feature delivery on the settlement & billing platform",
        "Contributed to frontend tasks as the team's frontend capabilities grew",
        "Worked closely with three sibling teams to keep cross-service integration and orchestration solid",
      ],
      tech: ".NET/C# · Azure · MSSQL · CQRS · DDD · MediatR · Kafka · Entity Framework · MSTest · AutoFixture · Moq",
    },
    {
      period: "2026 — Present · Remote",
      current: true,
      title: "Co-founder & Tech Lead",
      company: `<em>${companies.bnb}</em>`,
      anchor: "exp-bnb",
      body: "Co-founded a software house building productized websites for Polish independent professionals — lawyers, doctors, architects. Designed the white-label template system (Astro + Sanity CMS) that ships per-client deployments fast. Owns tech direction, delivery framework, and client scoping.",
      tech: "Astro · Sanity CMS · TypeScript · Tailwind CSS · Cloudflare Pages",
    },
    {
      period: "03 / 2024 — Present · Remote",
      current: true,
      title: "Co-founder & Tech Lead",
      company: `<em>${companies.lavamme}</em>`,
      anchor: "exp-lavamme",
      body: "Co-founded a fashion e-commerce brand and built the tech side from scratch. Delivered the Shopify storefront with payments, logistics, and customer-experience integrations. Stayed close to the business too — product, brand, pricing, customer journey — picking up commercial ownership alongside engineering.",
    },
    {
      period: "04 / 2023 — 05 / 2024",
      title: "Programming Trainer",
      company: `<em>${companies.isa}</em> · Łódź`,
      body: "Taught .NET development alongside a team of trainers — courses, workshops, and one-to-one guidance. Built curriculum materials and ran sessions for students at varying skill levels.",
      tech: "C# · ASP.NET · .NET Core · Entity Framework · Visual Studio",
    },
    {
      period: "08 / 2021 — 02 / 2023",
      title: "Software Engineer",
      company: `<em>${companies.sii}</em> · Łódź`,
      context:
        "E-commerce SaaS engine — headless architecture, microservices. Led development in a 5-person SCRUM team.",
      bullets: [
        "Shipped new functionality across the platform",
        "Maintained and optimised legacy services",
      ],
      tech: ".NET 6 · Docker · ElasticSearch · ArgoCD · MongoDB · MSSQL · Dapper · RabbitMQ · Azure DevOps",
    },
    {
      period: "04 / 2020 — 07 / 2021",
      title: ".NET Developer",
      company: `<em>${companies.bakk}</em> · Łódź`,
      context:
        "Debt and loan management platform — desktop application + Web API. 5–8 person SCRUM teams.",
      bullets: [
        "Built key C# modules including an automatic loan disbursement system (Santander Bank integration) and an Invoice OCR Web API",
        "Delivered features against functional and technical specs, extended existing systems, and kept documentation current",
      ],
      tech: "ASP.NET MVC · ASP.NET WebApi · .NET Core · .NET 4.5–4.7 · T-SQL · Hangfire · Entity Framework 6/Core · Azure DevOps",
    },
    {
      period: "01 / 2020 — 03 / 2020",
      title: "Software Engineer",
      company: `<em>${companies.unit4}</em> · Wrocław`,
      context: "Web and desktop HR system. 4-person SCRUM team.",
      tech: "ASP.NET WebApi · .NET Core · .NET 4.5–4.7 · T-SQL · Entity Framework 6/Core · MS-Test",
    },
    {
      period: "03 / 2019 — 12 / 2019",
      title: "Software Engineer",
      company: `<em>${companies.accenture}</em> · Łódź`,
      context:
        "Internet Banking and Mobile Banking. 50-person ITIL team, 3–4 person subteams.",
      bullets: [
        "Delivered development work against system requirements, introduced PowerShell automation tooling, and ran regression and performance testing",
      ],
      tech: "ASP.NET WebApi · .NET 4.5–4.7 · T-SQL · Entity Framework 6 · MS-Test · Java · Android · PowerShell",
    },
    {
      period: "08 / 2018 — 02 / 2019",
      title: "Software Engineer",
      company: `<em>${companies.rossmann}</em> · Łódź`,
      body: "Requirements analysis, application design, .NET and MS-SQL development, legacy system maintenance and support.",
      tech: ".NET 4.5–4.7 · C# · Visual Basic · T-SQL · DevExpress",
    },
  ],
  education: [
    {
      year: "2020",
      degree: "Bachelor of Engineering · Computer Systems",
      place: "Technical University of Łódź",
      note: "President's stipend for outstanding students (awarded November 2018)",
    },
    {
      year: "2016",
      degree: "Medical University of Łódź",
      place: "5 semesters completed",
    },
  ],
  certifications: [
    { year: "2026", name: "Claude Code 101", issuer: "Anthropic" },
    { year: "2026", name: "Introduction to Subagents", issuer: "Anthropic" },
    { year: "2024", name: "Effective Communication", issuer: "Soft Skills" },
    { year: "2024", name: "Nonviolent Communication (NVC)", issuer: "Soft Skills" },
    { year: "2024", name: "Communication in Polish-Danish Teams", issuer: "Soft Skills" },
    { year: "2022", name: "Domain-Driven Design & Event Storming", issuer: "Engineering" },
    { year: "2020", name: "Azure Fundamentals", issuer: "Microsoft" },
    { year: "2019", name: "Microservices with Spring Cloud and Docker", issuer: "Engineering" },
    { year: "2018", name: "Programming in C# / 20483", issuer: "Microsoft" },
    { year: "2018", name: "ITA 105 – OOP", issuer: "Microsoft" },
  ],
  languages: [
    { code: "PL", name: "Polish", level: "Native" },
    { code: "EN", name: "English", level: "Advanced" },
  ],
  interests:
    "Psychology · Cooking · Dog behaviour · Running · Strength training · Books & audiobooks",
  footer: {
    ctaHtml:
      'Got something interesting to build? <br> <a href="mailto:gustaw.beznicki@gmail.com">Let\'s talk →</a>',
    meta: "© 2026 · Gustaw Beźnicki · Crafted in Gdańsk",
    githubUrl: "https://github.com/gustaw-beznicki",
    githubLabel: "github.com/gustaw-beznicki",
    linkedinUrl: "https://www.linkedin.com/in/gbeznicki/",
    linkedinLabel: "linkedin.com/in/gbeznicki",
  },
};
