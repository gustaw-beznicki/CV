import { companies } from "./companies";
import { links } from "./links";
import type { CVContent } from "./types";

export const pl: CVContent = {
  locale: "pl",
  meta: {
    title: "Gustaw Beźnicki - Senior Backend Engineer",
    description:
      "Senior backend engineer z ponad 7-letnim doświadczeniem w rozproszonych systemach .NET. Chmurowa platforma rozliczeń i bilingu dla dużych duńskich firm energetycznych. Praca zdalna z Polski.",
  },
  ui: {
    cvLabel: "Curriculum Vitae",
    locationMeta: "Gdańsk / Zdalnie",
    scroll: "Przewiń",
    sectionsLabel: "Sekcje",
    contactLabel: "Kontakt",
    exportLabel: "Eksport",
    printAction: "→ Drukuj / Zapisz jako PDF",
    downloadCta: "Pobierz CV (PDF)",
    logoLabel: "Gustaw Beźnicki - logo z jeleniem",
    backToTop: "Wróć na górę",
    themeToDark: "Włącz ciemny motyw",
    themeToLight: "Włącz jasny motyw",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    locationLabel: "Lokalizacja",
    recruiterNote:
      "Rekruterzy mile widziani - śmiało wyślij mi e-mail lub wiadomość na LinkedIn.",
    summaryLabel: "Podsumowanie",
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
    roleHtml: `<strong>Senior backend engineer</strong> z ponad 7-letnim doświadczeniem w budowaniu rozproszonych systemów .NET w bankowości, energetyce i e-commerce. W ${companies.kmd} pracuje przy chmurowej platformie rozliczeń i bilingu dla dużych duńskich firm energetycznych, która obsługuje kilka milionów punktów pomiarowych na jednego klienta (tenant); obecnie zajmuje się danymi podstawowymi (master data) i przetwarzaniem danych. Zna architekturę zdarzeniową i CQRS/DDD oraz potrafi przekładać złożone reguły biznesowe na niezawodne systemy. Na co dzień pracuje po angielsku w polsko-duńskim zespole; dostępny do 14:00 ET.`,
    locationInline: "Gdańsk, Polska · Zdalnie",
    partNumber: "GB-01",
    revision: "Rew. 2026",
    docTitle:
      "Senior Backend Engineer | Distributed Billing & Settlement Systems | .NET, Azure, Kafka",
    specsHead: ["Parametr", "Wartość"],
    specs: [
      { label: "Doświadczenie", value: "7 lat · rozproszony .NET" },
      { label: "Branże", value: "Biling · bankowość · energetyka · e-com" },
      { label: "Zespół", value: "6 inżynierów · PL / DK" },
      { label: "Stack", value: ".NET · Azure · Kafka · Angular" },
      {
        label: "Projekty własne",
        value: `${companies.bnb} · ${companies.lavamme}`,
      },
      { label: "Języki", value: "PL ojczysty · EN C1" },
    ],
    figCaption: "Rys. 1 - GB-01, rzut z przodu",
    pinLabel: "Pin 1",
    sheetLabel: "Arkusz 1 / 1",
  },
  contact: {
    email: links.email,
    linkedinUrl: links.linkedin.url,
    linkedinLabel: links.linkedin.label,
    location: "Gdańsk, Polska · Zdalnie",
  },
  highlights: [
    {
      tag: "Inżynieria",
      html: "Siedem lat w .NET klasy enterprise - w <strong>bankowości</strong>, <strong>energetyce</strong>, <strong>e-commerce</strong> i <strong>logistyce</strong>.",
    },
    {
      tag: "Obecna rola",
      html: "Pracuje przy <strong>chmurowej platformie rozliczeń i bilingu dla dużych duńskich firm energetycznych</strong> - kilka milionów punktów pomiarowych na jednego klienta (tenant), obecnie głównie dane podstawowe i przetwarzanie danych.",
    },
    {
      tag: "Wdrożenie AI",
      html: "<strong>Zbudował wewnętrznego agenta, który z luźnych notatek tworzy szkice dokumentów High-Level Design</strong>, i skrócił ich przygotowanie z 5-8 dni do 1-2 dni. Wprowadził w zespole wspólne instrukcje dla Copilota i procesy kodowania z agentami. Po godzinach prowadzi prywatny projekt: <strong>samohostowanego asystenta AI</strong> - działającego non stop agenta z narzędziami, semantyczną pamięcią długoterminową i warstwowanym doborem modeli pod twardym limitem kosztów.",
    },
    {
      tag: "Własne projekty",
      html: `Po godzinach rozwija dwa własne przedsięwzięcia: <strong>${companies.bnb}</strong> (zał. 2026) - produktyzowane usługi webowe dla polskich MŚP, oraz <strong>${companies.lavamme}</strong> (zał. 2024) - modowy e-commerce na Shopify.`,
    },
    {
      tag: "Ciągły rozwój",
      html: "Szkolenia z <strong>przywództwa i komunikacji</strong> (2024), <strong>narzędzia AI</strong> (2025-2026).",
    },
  ],
  skills: [
    {
      category: "Architektura",
      tags: [
        "Systemy rozproszone",
        "Event-driven",
        "CQRS",
        "DDD",
        "Mikroserwisy",
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
      category: "Chmura i platforma",
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
      category: "Dane i kolejki komunikatów",
      tags: ["Kafka", "RabbitMQ", "MS SQL", "ElasticSearch", "Redis"],
    },
    {
      category: "Jakość i monitoring",
      tags: [
        "Testy jednostkowe i integracyjne (MSTest, NUnit)",
        "OpenTelemetry",
        "OpenSearch",
        "Logowanie strukturalne",
      ],
    },
    {
      category: "Frontend",
      tags: ["Angular", "TypeScript", "Astro", "Tailwind CSS"],
    },
    {
      category: "Programowanie z AI",
      lead: true,
      tags: ["Claude Code", "GitHub Copilot", "Własni agenci i skille"],
    },
    {
      category: "Współpraca",
      lead: true,
      tags: [
        "Mentoring",
        "Wdrażanie nowych osób",
        "Współpraca z PO",
        "Koordynacja międzyzespołowa",
        "Komunikacja PL ↔ DK",
      ],
    },
  ],
  experience: [
    {
      period: "02 / 2023 - obecnie",
      current: true,
      title: "Senior .NET Developer",
      positions: [
        {
          title: "Senior .NET Developer",
          period: "07 / 2025 - obecnie",
          pill: "Teraz",
        },
        {
          title: ".NET Developer",
          period: "02 / 2023 - 06 / 2025",
          note: "awans na Seniora",
        },
      ],
      company: `<a href="${links.companies.kmd}" target="_blank" rel="noopener noreferrer"><em>${companies.kmdFull}</em></a> · Zdalnie, Polska`,
      context:
        "Chmurowa platforma rozliczeń i bilingu dla dużych duńskich firm energetycznych. Sześcioosobowy zespół w ramach większej, wielozespołowej struktury.",
      bullets: [
        "Zbudował wewnętrznego agenta AI, który z luźnych notatek tworzy szkice dokumentów High-Level Design. Przygotowanie HLD skróciło się z 5-8 dni do 1-2 dni (o ok. 75-80%). Wprowadził w zespole wspólne instrukcje dla Copilota i procesy kodowania z agentami.",
        "Zautomatyzował proces zmiany licznika we współpracy z trzema pokrewnymi zespołami. Zastąpił ręczne zmiany danych w 3 domenach, co oszczędza klientom 10-20 godzin ręcznej obsługi miesięcznie.",
        "Podejmuje decyzje architektoniczne przy dużych epikach, godząc poprawność techniczną z priorytetami biznesowymi.",
        "Pisze kod na krytycznych ścieżkach platformy (.NET 10, Kafka, CQRS/DDD) oraz mikrofrontendy w Angularze i TypeScripcie.",
        "Pracuje z Product Ownerem nad tym, by potrzeby biznesowe zamieniać w user stories gotowe do realizacji.",
        "Mentoruje kolegów i prowadzi wdrożenie nowych osób: wspólne programowanie i omówienie platformy.",
      ],
      tech: ".NET 10 · C# · Azure (App Service, Functions, Event Grid, Key Vault, App Insights) · MS SQL · ElasticSearch · Redis · Kafka · CQRS · DDD · MediatR · Entity Framework Core · Angular · TypeScript · Docker · Helm · ArgoCD · GitHub Actions · OpenTelemetry · OpenSearch · MSTest",
    },
    {
      period: "2026 - obecnie · Zdalnie",
      current: true,
      title: "Współzałożyciel i Tech Lead",
      company: `<a href="${links.companies.bnb}" target="_blank" rel="noopener noreferrer"><em>${companies.bnb}</em></a>`,
      anchor: "exp-bnb",
      body: "Współzałożył software house tworzący powtarzalne, produktyzowane strony internetowe dla przedstawicieli wolnych zawodów - prawników, lekarzy, architektów. Zaprojektował system szablonów white-label (Astro + Sanity CMS), który pozwala błyskawicznie wdrażać kolejnych klientów. Odpowiada za kierunek technologiczny, proces dostarczania i ustalanie zakresu współpracy z klientami.",
      tech: "Astro · Sanity CMS · TypeScript · Tailwind CSS · Cloudflare Pages",
    },
    {
      period: "03 / 2024 - obecnie · Zdalnie",
      current: true,
      title: "Współzałożyciel i Tech Lead",
      company: `<a href="${links.companies.lavamme}" target="_blank" rel="noopener noreferrer"><em>${companies.lavamme}</em></a>`,
      anchor: "exp-lavamme",
      body: "Współzałożył modową markę e-commerce; od zera zbudował całą część technologiczną. Uruchomił sklep na Shopify wraz z integracjami płatności, logistyki i obsługi klienta. Pozostał blisko strony biznesowej - produkt, marka, polityka cenowa, ścieżka klienta - rozwijając kompetencje komercyjne równolegle z inżynierskimi.",
    },
    {
      period: "04 / 2023 - 05 / 2024",
      title: "Trener programowania (część etatu)",
      company: `<a href="${links.companies.isa}" target="_blank" rel="noopener noreferrer"><em>${companies.isa}</em></a> · Łódź`,
      body: "Uczył programowania w .NET w zespole trenerów - kursy, warsztaty i indywidualne konsultacje. Tworzył materiały dydaktyczne i prowadził zajęcia dla kursantów na różnych poziomach zaawansowania.",
      tech: "C# · ASP.NET · .NET Core · Entity Framework · Visual Studio",
    },
    {
      period: "08 / 2021 - 02 / 2023",
      title: "Software Engineer",
      company: `<a href="${links.companies.sii}" target="_blank" rel="noopener noreferrer"><em>${companies.sii}</em></a> · Łódź`,
      bullets: [
        "Rozwijał funkcjonalności silnika e-commerce w modelu SaaS (architektura headless, mikroserwisy: .NET 6, ElasticSearch, RabbitMQ, MongoDB, Docker, ArgoCD).",
        "Utrzymywał i optymalizował usługi legacy w pięcioosobowym zespole Scrum.",
      ],
    },
    {
      period: "2018 - 2021",
      title: "Wcześniejsze doświadczenie",
      company: `Role .NET w ${companies.bakk}, ${companies.accenture}, ${companies.unit4} i ${companies.rossmann}`,
      bullets: [
        "Zbudował moduł automatycznej wypłaty pożyczek zintegrowany z bankiem Santander oraz invoice OCR Web API (BAKK).",
        "Rozwijał funkcje bankowości internetowej i mobilnej oraz wprowadził automatyzację w PowerShellu do testów regresyjnych i wydajnościowych (Accenture).",
      ],
    },
  ],
  education: [
    {
      year: "2020",
      degree: "Inżynier · Systemy komputerowe",
      place: "Politechnika Łódzka",
      note: "Stypendium rektora dla najlepszych studentów (przyznane w listopadzie 2018)",
    },
  ],
  certifications: [
    { year: "2026", name: "Claude Code 101", issuer: "Anthropic" },
    { year: "2026", name: "Introduction to Subagents", issuer: "Anthropic" },
    {
      year: "2022",
      name: "Domain-Driven Design & Event Storming",
      issuer: "Inżynieria",
    },
  ],
  languages: [
    { code: "PL", name: "Polski", level: "Ojczysty" },
    { code: "EN", name: "Angielski", level: "C1 - język pracy na co dzień" },
  ],
  interests:
    "Psychologia · Gotowanie · Psia behawiorystyka · Bieganie · Siłownia · Książki i audiobooki",
  footer: {
    ctaHtml: `Masz ciekawy projekt do zrealizowania? <br> <a href="mailto:${links.email}">Porozmawiajmy →</a>`,
    meta: "© 2026 · Gustaw Beźnicki · Stworzone w Gdańsku",
    githubUrl: links.github.url,
    githubLabel: links.github.label,
    linkedinUrl: links.linkedin.url,
    linkedinLabel: links.linkedin.label,
  },
  cookieBanner: {
    promptDescription:
      "Ta strona stawia na prostotę i prywatność: nie używa plików cookie, a anonimową analitykę na własnym serwerze uruchamia tylko za Twoją zgodą.<br><small>W ogóle bez ciasteczek? Tak, serio - kliknij „Pokaż drobny druk”, żeby poznać szczegóły.</small>",
    acceptAll: "Akceptuj wszystkie",
    rejectNonEssential: "Odrzuć nieobowiązkowe",
    preferences: "Pokaż drobny druk",
    prefsTitle: "Drobny druk (z puentą)",
    prefsDescription:
      "Niespodzianka: tu naprawdę nie ma żadnych ciasteczek. Zero. Ta strona ich nie piecze - nie śledzi, nie zostawia okruszków i nikt nie zagląda Ci przez ramię. Na Twoim urządzeniu zapisuje się tylko Twoja odpowiedź z tego banera, żeby ten komunikat nie wyskakiwał w kółko. Większość po prostu klika pierwszy lepszy przycisk i znika - więc szacun, że to czytasz. 🍪",
    prefsSave: "Zapisz i zamknij",
    essentialLabel: "Niezbędne",
    essentialDescription:
      "Ustawienie „żeby w ogóle działało”: pamięta tylko Twój wybór z tego banera i nic więcej. Nie da się go wyłączyć - inaczej baner miałby amnezję i witałby Cię bez końca.",
    analyticsLabel: "Analityka",
    analyticsDescription:
      "Analityka Umami na własnym serwerze - liczy odsłony, żebym wiedział, które projekty faktycznie otwieracie. Bez ciasteczek, anonimowo, prosto z mojej domeny: dane nie opuszczają Raspberry Pi szumiącego na mojej półce. Wyłączona, dopóki jej nie włączysz. A skoro czytasz nawet baner o ciasteczkach - oficjalnie należysz do 1% najbardziej dociekliwych internautów.",
  },
};
