import type { CVContent } from "./types";

export const pl: CVContent = {
  locale: "pl",
  meta: {
    title: "Gustaw Beźnicki — Senior Software Engineer & Team Lead",
    description:
      "Senior Software Engineer wchodzący w rolę lidera inżynierii. 7+ lat w .NET i rozproszonych systemach chmurowych. Współzałożyciel B-B-Digital. Tech Lead w Lavamme.",
  },
  ui: {
    cvLabel: "Curriculum Vitae",
    year: "· 2026 ·",
    locationMeta: "Gdańsk / Zdalnie",
    scroll: "Przewiń",
    sectionsLabel: "Sekcje",
    contactLabel: "Kontakt",
    exportLabel: "Eksport",
    printAction: "→ Drukuj / Zapisz jako PDF",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    locationLabel: "Lokalizacja",
    recruiterNote:
      "Rekruterzy mile widziani — śmiało napisz do mnie e-mail lub wiadomość na LinkedIn.",
    techLabel: "Technologie:",
  },
  nav: [
    { id: "highlights", label: "Najważniejsze" },
    { id: "skills", label: "Umiejętności" },
    { id: "experience", label: "Doświadczenie" },
    { id: "education", label: "Edukacja" },
    { id: "certifications", label: "Certyfikaty" },
    { id: "languages", label: "Języki" },
    { id: "interests", label: "Zainteresowania" },
  ],
  sectionTitles: {
    highlights: "Najważniejsze",
    skills: "Umiejętności",
    experience: "Doświadczenie",
    education: "Edukacja",
    certifications: "Certyfikaty",
    languages: "Języki",
    interests: "Zainteresowania",
  },
  hero: {
    name: "Gustaw",
    surname: "Beźnicki",
    roleHtml:
      "<strong>Senior Software Engineer w KMD</strong> — buduje chmurową platformę do rozliczeń i bilingu oraz prowadzi sześcioosobowy, polsko-duński zespół. Siedem lat w rozproszonych systemach .NET. Po godzinach rozwija dwa własne przedsięwzięcia: <strong>B-B-Digital</strong> i <strong>Lavamme</strong>.",
    locationInline: "Gdańsk · Polska",
  },
  contact: {
    email: "gustaw.beznicki@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/gbeznicki/",
    linkedinLabel: "linkedin.com/in/gbeznicki",
    location: "Gdańsk / Zdalnie",
  },
  highlights: [
    {
      tag: "Inżynieria",
      html: "Siedem lat w .NET klasy enterprise — w <strong>bankowości</strong>, <strong>energetyce</strong>, <strong>e-commerce</strong> i <strong>logistyce</strong>.",
    },
    {
      tag: "Obecna rola",
      html: "Prowadzi <strong>sześcioosobowy, polsko-duński zespół inżynierów</strong> w KMD — odpowiada za architekturę, rozwija ludzi i reprezentuje zespół w rozmowach międzyzespołowych oraz z delivery managementem.",
    },
    {
      tag: "Wdrożenie AI",
      html: "<strong>Wprowadził AI do codziennej pracy zespołu</strong> — wspólne instrukcje dla Copilota, procesy kodowania oparte na agentach oraz wewnętrznego agenta tworzącego szkice dokumentów High-Level Design z luźnych notatek.",
    },
    {
      tag: "Własne projekty",
      html: "Po godzinach rozwija dwa własne przedsięwzięcia: <strong>B-B-Digital</strong> (zał. 2026) — produktowe usługi webowe dla polskich MŚP, oraz <strong>Lavamme</strong> (zał. 2024) — modowy e-commerce na Shopify.",
    },
    {
      tag: "Rozwój liderski",
      html: "<strong>Rok 2024 poświęcił na rozwój kompetencji liderskich</strong> — certyfikaty z NVC, efektywnej komunikacji i dynamiki zespołów polsko-duńskich.",
    },
  ],
  skills: [
    {
      category: "Przywództwo i komunikacja",
      lead: true,
      tags: [
        "Decyzje techniczne",
        "Mentoring i coaching",
        "1-na-1",
        "Koordynacja międzyzespołowa",
        "Współpraca przy backlogu",
        "Wdrażanie narzędzi AI",
        "NVC",
        "Komunikacja PL ↔ DK",
      ],
    },
    {
      category: "Backend",
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
        "Wzorce projektowe",
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
      category: "Dane i messaging",
      tags: ["MS SQL", "ElasticSearch", "Redis", "Kafka", "RabbitMQ"],
    },
    {
      category: "Jakość i monitoring",
      tags: [
        "Testy jednostkowe i integracyjne",
        "MSTest",
        "NUnit",
        "AutoFixture",
        "Moq",
        "FakeItEasy",
        "OpenTelemetry",
        "App Insights",
        "OpenSearch",
        "Logowanie strukturalne",
      ],
    },
    {
      category: "Frontend",
      tags: ["Angular", "TypeScript", "Astro", "Sanity CMS", "Tailwind CSS"],
    },
    {
      category: "Programowanie wspierane przez AI",
      lead: true,
      tags: ["Claude Code", "GitHub Copilot", "Własne skille i agenci"],
    },
  ],
  experience: [
    {
      period: "07 / 2025 — obecnie",
      pill: "Teraz",
      current: true,
      title: "Senior Software Engineer & Solution Expert",
      company: "<em>KMD Poland</em> · Warszawa",
      context:
        "Chmurowa platforma rozliczeniowo-bilingowa automatyzująca złożone procesy obliczeniowe dla klientów korporacyjnych. Sześcioosobowy zespół inżynierski działający w ramach większej, wielozespołowej struktury.",
      groups: [
        {
          label: "Inżynieria i przywództwo techniczne",
          items: [
            "Odpowiada za decyzje architektoniczne w kluczowych epikach zespołu — godząc poprawność techniczną z priorytetami biznesowymi",
            "Wprowadził narzędzia AI do codziennej pracy zespołu: wspólne instrukcje dla Copilota, procesy kodowania oparte na agentach oraz wewnętrznego agenta zamieniającego luźne notatki w szkice dokumentów High-Level Design",
            "Ściśle współpracuje z Product Ownerem przy ustalaniu zakresu funkcjonalności — przekłada luźne potrzeby biznesowe na user stories gotowe do realizacji przez zespół",
            "Wciąż pisze kod: backend na krytycznych ścieżkach platformy, a coraz częściej także mikrofrontendy w Angularze i TypeScripcie",
          ],
        },
        {
          label: "Ludzie i rozwój zespołu",
          items: [
            "Rozwija inżynierów w codziennej współpracy, a gdy ktoś potrzebuje więcej uwagi — podczas dedykowanych spotkań 1:1, w sprawach zarówno technicznych, jak i osobistych",
            "Odpowiada za wdrażanie nowych osób w zespole — wspólne programowanie i przeglądy platformy skracają czas potrzebny na pierwszy realny wkład w projekt",
            "Jest głównym technicznym punktem kontaktowym zespołu — w komunikacji międzyzespołowej oraz w rozmowach z delivery managementem o kierunku prac i dostępnych zasobach",
          ],
        },
      ],
      tech: ".NET 10 · C# · Azure (App Service, Functions, Event Grid, Key Vault, App Insights) · MSSQL · ElasticSearch · Redis · Kafka · CQRS · DDD · MediatR · Entity Framework · Angular · TypeScript · Docker · Helm · ArgoCD · GitHub Actions · OpenTelemetry · OpenSearch · MSTest · AutoFixture · Moq",
    },
    {
      period: "02 / 2023 — 06 / 2025",
      title: "Software Engineer",
      company: "<em>KMD Poland</em> · Warszawa",
      context: "Ta sama platforma — rozliczenia i biling. Zespół SCRUM liczący 5–7 osób.",
      bullets: [
        "Rozwijał funkcjonalności backendowe platformy rozliczeniowo-bilingowej",
        "Brał udział w zadaniach frontendowych, w miarę jak rosły kompetencje frontendowe zespołu",
        "Blisko współpracował z trzema bratnimi zespołami, dbając o solidną integrację i orkiestrację między serwisami",
      ],
      tech: ".NET/C# · Azure · MSSQL · CQRS · DDD · MediatR · Kafka · Entity Framework · MSTest · AutoFixture · Moq",
    },
    {
      period: "2026 — obecnie · Zdalnie",
      current: true,
      title: "Współzałożyciel i Tech Lead",
      company: "<em>B-B-Digital</em>",
      body: "Współzałożyciel software house’u tworzącego powtarzalne, produktowe strony internetowe dla przedstawicieli wolnych zawodów — prawników, lekarzy, architektów. Zaprojektował system szablonów white-label (Astro + Sanity CMS), który pozwala błyskawicznie wdrażać kolejnych klientów. Odpowiada za kierunek technologiczny, proces dostarczania i ustalanie zakresu współpracy z klientami.",
      tech: "Astro · Sanity CMS · TypeScript · Tailwind CSS · Cloudflare Pages",
    },
    {
      period: "03 / 2024 — obecnie · Zdalnie",
      current: true,
      title: "Współzałożyciel i Tech Lead",
      company: "<em>Lavamme</em>",
      body: "Współzałożyciel modowej marki e-commerce; od zera zbudował całą część technologiczną. Uruchomił sklep na Shopify wraz z integracjami płatności, logistyki i obsługi klienta. Mocno zaangażowany także po stronie biznesowej — produkt, marka, polityka cenowa, ścieżka klienta — rozwijając kompetencje komercyjne równolegle z inżynierskimi.",
    },
    {
      period: "04 / 2023 — 05 / 2024",
      title: "Trener programowania",
      company: "<em>ISA</em> · Łódź",
      body: "Uczył programowania w .NET w zespole trenerów — kursy, warsztaty i indywidualne konsultacje. Tworzył materiały dydaktyczne i prowadził zajęcia dla kursantów na różnych poziomach zaawansowania.",
      tech: "C# · ASP.NET · .NET Core · Entity Framework · Visual Studio",
    },
    {
      period: "08 / 2021 — 02 / 2023",
      title: "Software Engineer",
      company: "<em>Sii Poland</em> · Łódź",
      context:
        "Silnik e-commerce w modelu SaaS — architektura headless, mikroserwisy. Kierował pracami programistycznymi w 5-osobowym zespole SCRUM.",
      bullets: [
        "Dostarczał nowe funkcjonalności platformy",
        "Utrzymywał i optymalizował usługi legacy",
      ],
      tech: ".NET 6 · Docker · ElasticSearch · ArgoCD · MongoDB · MSSQL · Dapper · RabbitMQ · Azure DevOps",
    },
    {
      period: "04 / 2020 — 07 / 2021",
      title: "Programista .NET",
      company: "<em>BAKK</em> · Łódź",
      context:
        "Platforma do zarządzania długiem i pożyczkami — aplikacja desktopowa i Web API. Zespoły SCRUM liczące 5–8 osób.",
      bullets: [
        "Zbudował kluczowe moduły w C#, w tym system automatycznej wypłaty pożyczek (integracja z bankiem Santander) oraz Invoice OCR Web API",
        "Realizował funkcjonalności zgodne ze specyfikacją funkcjonalną i techniczną, rozbudowywał istniejące systemy i dbał o aktualność dokumentacji",
      ],
      tech: "ASP.NET MVC · ASP.NET WebApi · .NET Core · .NET 4.5–4.7 · T-SQL · Hangfire · Entity Framework 6/Core · Azure DevOps",
    },
    {
      period: "01 / 2020 — 03 / 2020",
      title: "Software Engineer",
      company: "<em>Unit4</em> · Wrocław",
      context: "Webowy i desktopowy system kadrowy (HR). 4-osobowy zespół SCRUM.",
      tech: "ASP.NET WebApi · .NET Core · .NET 4.5–4.7 · T-SQL · Entity Framework 6/Core · MS-Test",
    },
    {
      period: "03 / 2019 — 12 / 2019",
      title: "Software Engineer",
      company: "<em>Accenture Technology</em> · Łódź",
      context:
        "Bankowość internetowa i mobilna. 50-osobowy zespół ITIL, podzespoły 3–4-osobowe.",
      bullets: [
        "Realizował prace programistyczne zgodnie z wymaganiami systemu, wprowadził narzędzia automatyzacji w PowerShellu oraz prowadził testy regresyjne i wydajnościowe",
      ],
      tech: "ASP.NET WebApi · .NET 4.5–4.7 · T-SQL · Entity Framework 6 · MS-Test · Java · Android · PowerShell",
    },
    {
      period: "08 / 2018 — 02 / 2019",
      title: "Software Engineer",
      company: "<em>Rossmann SDP</em> · Łódź",
      body: "Analiza wymagań, projektowanie aplikacji, programowanie w .NET i MS-SQL oraz utrzymanie i wsparcie systemów legacy.",
      tech: ".NET 4.5–4.7 · C# · Visual Basic · T-SQL · DevExpress",
    },
  ],
  education: [
    {
      year: "2020",
      degree: "Inżynier · Systemy komputerowe",
      place: "Politechnika Łódzka",
      note: "Stypendium rektora dla najlepszych studentów (przyznane w listopadzie 2018)",
    },
    {
      year: "2016",
      degree: "Uniwersytet Medyczny w Łodzi",
      place: "Ukończone 5 semestrów",
    },
  ],
  certifications: [
    { year: "2026", name: "Claude Code 101", issuer: "Anthropic" },
    { year: "2026", name: "Introduction to Subagents", issuer: "Anthropic" },
    { year: "2024", name: "Efektywna komunikacja", issuer: "Umiejętności miękkie" },
    { year: "2024", name: "Porozumienie bez przemocy (NVC)", issuer: "Umiejętności miękkie" },
    { year: "2024", name: "Komunikacja w zespołach polsko-duńskich", issuer: "Umiejętności miękkie" },
    { year: "2022", name: "Domain-Driven Design & Event Storming", issuer: "Inżynieria" },
    { year: "2020", name: "Azure Fundamentals", issuer: "Microsoft" },
    { year: "2019", name: "Mikroserwisy w Spring Cloud i Dockerze", issuer: "Inżynieria" },
    { year: "2018", name: "Programowanie w C# / 20483", issuer: "Microsoft" },
    { year: "2018", name: "ITA 105 – OOP", issuer: "Microsoft" },
  ],
  languages: [
    { code: "PL", name: "Polski", level: "Ojczysty" },
    { code: "EN", name: "Angielski", level: "Zaawansowany" },
  ],
  interests:
    "Psychologia · Gotowanie · Psi behawioryzm · Bieganie · Siłownia · Książki i audiobooki",
  footer: {
    ctaHtml:
      'Masz ciekawy projekt do zrealizowania? <br> <a href="mailto:gustaw.beznicki@gmail.com">Porozmawiajmy →</a>',
    meta: "© 2026 · Gustaw Beźnicki · Stworzone w Gdańsku",
    githubUrl: "https://github.com/gustaw-beznicki",
    githubLabel: "github.com/gustaw-beznicki",
    linkedinUrl: "https://www.linkedin.com/in/gbeznicki/",
    linkedinLabel: "linkedin.com/in/gbeznicki",
  },
};
