import { SCHOOL, SITE } from "../lib/site.ts"

export const LANGS = ["nl", "en"] as const
export type Lang = (typeof LANGS)[number]

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value)
}

/**
 * Alle teksten van de site, Nederlands en Engels naast elkaar. Eén bestand, zodat
 * een vertaling nooit half kan blijven staan — lib/content.test.ts controleert
 * dat beide objecten exact dezelfde keys hebben.
 *
 * Koppen zijn opgesplitst in `lead` en `accent`: het accent wordt cursief gezet.
 * Eén woordgroep per kop, anders is het geen accent meer. Dat opsplitsen gebeurt
 * hier en niet in de component, want in het Engels valt de klemtoon vaak op een
 * ander woord dan in het Nederlands.
 *
 * Projectteksten staan hier niet: die horen bij het project zelf, in
 * content/projects.ts.
 */
const nl = {
  meta: {
    title: `${SITE.name} — software developer`,
    description:
      "Ik ben Fynn Tervoort, 17, software developer in opleiding aan het Mediacollege Amsterdam en oprichter van fynnworks. Dit is wat ik bouw.",
  },
  nav: {
    label: "Hoofdnavigatie",
    skip: "Naar inhoud",
    work: "Werk",
    about: "Over",
    services: "Wat ik doe",
    fynnworks: "fynnworks",
    skills: "Skills",
    contact: "Contact",
    cv: "CV",
    cta: "Neem contact op",
    otherLang: "EN",
    otherLangLabel: "Switch to English",
    menu: "Menu",
    menuOpen: "Menu openen",
    menuClose: "Menu sluiten",
  },
  hero: {
    lead: "Ik bouw websites die",
    accent: "blijven draaien.",
    sub: `${SCHOOL.program.nl} in opleiding aan het ${SCHOOL.name}, en oprichter van fynnworks. Ik bouw sites voor ondernemers en zet ze van begin tot eind zelf online.`,
    primary: "Bekijk mijn werk",
    secondary: "Neem contact op",
    marqueeLabel: "Waar ik mee werk",
  },
  stats: {
    lead: "Zelf gebouwd,",
    accent: "zelf opgeleverd.",
    body: "Ik lever niet een map met bestanden op en wens de klant succes. Domein, hosting, mail, HTTPS: ik regel het geheel, en daarna blijf ik degene die het onderhoudt. Klantsites zet ik bij een hostingpartij; mijn eigen sites draaien op een Raspberry Pi die ik zelf beheer, want daar leer ik het meest van.",
    items: [
      { value: "17", caption: "Jaar oud" },
      { value: "2026", caption: "Eigen bedrijf sinds" },
      { value: "3", caption: "Sites live gezet" },
    ],
  },
  services: {
    lead: "Wat ik",
    accent: "doe",
    intro:
      "Geen lijst van alles waar ik ooit een tutorial van heb gevolgd. Dit is waar ik echt aan werk.",
    items: [
      {
        title: "Websites bouwen",
        body: "Van een wachtpagina tot een volledige bedrijfssite. Ik schrijf de HTML en CSS zelf, zodat er niets in zit wat er niet hoeft te zitten.",
      },
      {
        title: "Werken met klanten",
        body: "Uitzoeken wat een klant echt nodig heeft in plaats van wat hij als eerste noemt, en dat verschil kunnen uitleggen zonder vakjargon.",
      },
      {
        title: "Online zetten",
        body: "Domein, hosting, DNS en HTTPS. De klant krijgt een werkende site op een eigen adres, niet een zipbestand met de opdracht het zelf uit te zoeken.",
      },
      {
        title: "Onderhoud",
        body: "Teksten en foto's bijwerken, dingen repareren die stukgaan, en zorgen dat een site over een jaar nog steeds doet wat hij moet doen.",
      },
    ],
  },
  work: {
    lead: "Geselecteerd",
    accent: "werk",
    intro:
      "Klantwerk, schoolopdrachten en eigen projecten. Bij elk project staat wat de opdracht was, hoe ik het aanpakte en wat ik ervan geleerd heb.",
    read: "Lees het proces",
    visit: "Bekijk de site",
    repo: "Broncode",
    all: "Alle projecten",
    pageLead: "Alle",
    pageAccent: "projecten",
    kinds: {
      werk: "Klantwerk",
      school: "School",
      eigen: "Eigen project",
    },
  },
  about: {
    lead: "Over",
    accent: "mij",
    body: [
      "Ik ben %AGE% en zit op het %SCHOOL%, waar ik %PROGRAM% doe. Programmeren begon als iets wat ik naast school deed en werd het snelste onderdeel van mijn week.",
      "Naast school run ik fynnworks, mijn eigen webbureau, ingeschreven bij de KvK. Ik bouw daar betaalde sites voor ondernemers: theatermakers, winkels. Dat leert me dingen die een schoolopdracht niet leert. Een deadline die van iemand anders is, een klant die iets anders bedoelt dan hij zegt, en een site die ook nog moet werken als ik er niet naar kijk.",
    ],
    facts: {
      age: "Leeftijd",
      school: "Opleiding",
      based: "Woonplaats",
      basedValue: "Amsterdam",
      company: "Eigen bedrijf",
      internship: "Stage",
      internshipValue: "Beschikbaar",
    },
  },
  // Prijzen en beloftes komen letterlijk van fynnworks.nl (C:ynnworks,
  // content/dictionaries.ts). Verandert daar iets, pas het dan hier ook aan.
  fynnworks: {
    label: "fynnworks — mijn webbureau",
    lead: "Studentenprijzen,",
    accent: "geen studentenwerk.",
    body: "Via fynnworks bouw ik landingspagina's, bedrijfssites en webshops voor zzp en mkb. Geen bureautarief: je praat direct met degene die het bouwt, en je ziet het ontwerp voordat er één regel code staat.",
    vatNote: "Richtprijzen, inclusief btw.",
    items: [
      {
        name: "Landingspagina",
        price: "vanaf €550",
        body: "Eén pagina die één ding doet: bezoekers omzetten in aanvragen. Binnen twee weken live.",
      },
      {
        name: "Multi-page site",
        price: "vanaf €1.450",
        body: "Meerdere pagina's, een duidelijk verhaal en een structuur waar je jaren mee vooruit kunt.",
      },
      {
        name: "Maatwerk",
        price: "op aanvraag",
        body: "Webshop, boekingssysteem, portaal met inlog. Alles wat verder gaat dan een brochure.",
      },
    ],
    cta: "Naar fynnworks.nl",
  },
  skills: {
    lead: "Wat ik",
    accent: "al kan",
    intro:
      "Geen balkjes of sterren. Bij elke techniek staat in welk project ik hem gebruikt heb, zodat je het zelf kunt nakijken.",
    used: "Gebruikt in",
    groups: {
      frontend: "Frontend",
      backend: "Backend",
      server: "Server en tools",
    },
  },
  contact: {
    lead: "Laten we iets",
    accent: "bouwen.",
    intro:
      "Stage, een project of gewoon een vraag? Stuur hieronder een bericht of zoek me op via LinkedIn. Ik reageer meestal dezelfde dag.",
    email: "E-mail",
    github: "GitHub",
    linkedin: "LinkedIn",
    company: "fynnworks",
    companyNote: "Mijn webbureau",
    form: {
      name: "Naam",
      message: "Bericht",
      submit: "Verstuur",
      sending: "Versturen…",
      sent: "Verstuurd. Je hoort snel van me.",
      privacy: "Je naam en e-mailadres gebruik ik alleen om je te antwoorden.",
      orMail: "Liever zelf mailen?",
      errors: {
        invalid: "Vul je naam, een geldig e-mailadres en een bericht van minstens 10 tekens in.",
        rate: "Je hebt net al een paar berichten gestuurd. Probeer het over een uur opnieuw, of mail me direct.",
        server: `Versturen lukte niet. Mail me direct op ${SITE.email}.`,
      },
    },
  },
  project: {
    back: "Terug naar werk",
    brief: "De opdracht",
    process: "Aanpak",
    learned: "Wat ik ervan leerde",
    stack: "Gebruikt",
    year: "Jaar",
    kind: "Soort",
    next: "Volgende project",
  },
  cv: {
    description: `Het cv van ${SITE.name}: ervaring, opleiding en skills.`,
    role: `${SCHOOL.program.nl} in opleiding · oprichter van fynnworks`,
    location: "Amsterdam",
    download: "Download pdf",
    profile: "Profiel",
    profileBody: `${SCHOOL.program.nl} in opleiding aan het ${SCHOOL.name} en oprichter van fynnworks. Ik bouw websites en zet ze van begin tot eind zelf online: domein, hosting, mail en HTTPS. Daarna blijf ik degene die ze onderhoudt.`,
    experience: "Ervaring",
    education: "Opleiding",
    skills: "Skills",
    languages: "Talen",
    languagesBody: "Nederlands, Engels",
    // Geen looptijden als "(2 jaar 7 maanden)": die kloppen een maand later al
    // niet meer.
    jobs: [
      {
        role: "Oprichter en eigenaar",
        org: "fynnworks",
        place: "Amsterdam",
        period: "sep 2026 – heden",
        body: "Ingeschreven bij de KvK. Ik bouw betaalde sites voor ondernemers, zoals theatermakers en winkels, zet ze online en onderhoud ze.",
      },
      {
        role: "Afwasser",
        org: "NAP Amsterdam",
        place: "Amsterdam",
        period: "apr 2024 – heden",
      },
      {
        role: "Zeilinstructeur (zelfstandig)",
        org: "Zeilschool IJburg",
        place: "Amsterdam",
        period: "apr 2022 – heden",
      },
    ],
    schools: [
      {
        role: `${SCHOOL.program.nl}, ${SCHOOL.level.nl}`,
        org: SCHOOL.name,
        period: "aug 2025 – dec 2028",
      },
      {
        role: "Mavo, Techniek",
        org: "Berlage Lyceum",
        period: "aug 2022 – jun 2025",
      },
    ],
  },
  footer: {
    rights: "Alle rechten voorbehouden.",
    built: "Gebouwd met Next.js, draait op een Raspberry Pi.",
  },
}

/** Vorm en keys van de dictionary. `nl` is de bron. */
export type Dict = typeof nl

// Type-annotatie in plaats van `as const`: mist er hier een key of staat er een
// key te veel, dan valt de build om op precies die regel.
const en: Dict = {
  meta: {
    title: `${SITE.name} — software developer`,
    description:
      "I am Fynn Tervoort, 17, a software development student at Mediacollege Amsterdam and founder of fynnworks. This is what I build.",
  },
  nav: {
    label: "Main navigation",
    skip: "Skip to content",
    work: "Work",
    about: "About",
    services: "What I do",
    fynnworks: "fynnworks",
    skills: "Skills",
    contact: "Contact",
    cv: "CV",
    cta: "Get in touch",
    otherLang: "NL",
    otherLangLabel: "Schakel over naar Nederlands",
    menu: "Menu",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
  hero: {
    lead: "I build websites that",
    accent: "stay up.",
    sub: `${SCHOOL.program.en} student at ${SCHOOL.name} and founder of fynnworks. I build sites for small businesses and take them all the way to live myself.`,
    primary: "See my work",
    secondary: "Get in touch",
    marqueeLabel: "What I work with",
  },
  stats: {
    lead: "Built myself,",
    accent: "shipped myself.",
    body: "I do not hand over a folder of files and wish the client luck. Domain, hosting, mail, HTTPS: I arrange the whole thing, and afterwards I am the one maintaining it. Client sites go to a hosting provider; my own sites run on a Raspberry Pi I manage myself, because that is where I learn the most.",
    items: [
      { value: "17", caption: "Years old" },
      { value: "2026", caption: "Own business since" },
      { value: "3", caption: "Sites shipped" },
    ],
  },
  services: {
    lead: "What I",
    accent: "do",
    intro:
      "Not a list of everything I once followed a tutorial for. This is what I actually work on.",
    items: [
      {
        title: "Building websites",
        body: "From a holding page to a full business site. I write the HTML and CSS myself, so nothing ends up in there that does not need to be.",
      },
      {
        title: "Working with clients",
        body: "Working out what a client actually needs rather than what they mention first, and being able to explain that difference without jargon.",
      },
      {
        title: "Taking it live",
        body: "Domain, hosting, DNS and HTTPS. The client gets a working site at their own address, not a zip file and instructions to figure it out.",
      },
      {
        title: "Maintenance",
        body: "Updating copy and images, fixing what breaks, and making sure a site still does its job a year from now.",
      },
    ],
  },
  work: {
    lead: "Selected",
    accent: "work",
    intro:
      "Client work, school assignments and personal projects. Each project describes the brief, how I approached it, and what I took away from it.",
    read: "Read the process",
    visit: "Visit the site",
    repo: "Source code",
    all: "All projects",
    pageLead: "All",
    pageAccent: "projects",
    kinds: {
      werk: "Client work",
      school: "School",
      eigen: "Personal project",
    },
  },
  about: {
    lead: "About",
    accent: "me",
    body: [
      "I am %AGE% and study %PROGRAM% at %SCHOOL%. Programming started as something I did next to school and quickly became the fastest part of my week.",
      "Alongside school I run fynnworks, my own web studio, registered with the Dutch chamber of commerce. I build paid sites for small businesses there: theatre makers, shops. That teaches me things a school assignment cannot. A deadline that belongs to someone else, a client who means something other than what they say, and a site that has to keep working when nobody is watching it.",
    ],
    facts: {
      age: "Age",
      school: "Education",
      based: "Based in",
      basedValue: "Amsterdam",
      company: "Own business",
      internship: "Internship",
      internshipValue: "Available",
    },
  },
  fynnworks: {
    label: "fynnworks — my web studio",
    lead: "Student rates,",
    accent: "not student work.",
    body: "Through fynnworks I build landing pages, business sites and web shops for freelancers and small businesses. No agency rate: you talk directly to the person building it, and you see the design before a single line of code exists.",
    vatNote: "Indicative prices, including VAT.",
    items: [
      {
        name: "Landing page",
        price: "from €550",
        body: "One page doing one job: turning visitors into enquiries. Live within two weeks.",
      },
      {
        name: "Multi-page site",
        price: "from €1,450",
        body: "Multiple pages, a clear story, and a structure that lasts you years.",
      },
      {
        name: "Custom build",
        price: "on request",
        body: "Web shop, booking system, portal with logins. Anything beyond a brochure.",
      },
    ],
    cta: "Visit fynnworks.nl",
  },
  skills: {
    lead: "What I",
    accent: "can do",
    intro:
      "No progress bars or star ratings. Each technology lists the projects I used it in, so you can check for yourself.",
    used: "Used in",
    groups: {
      frontend: "Frontend",
      backend: "Backend",
      server: "Server and tools",
    },
  },
  contact: {
    lead: "Let us build",
    accent: "something.",
    intro:
      "An internship, a project or just a question? Send a message below or find me on LinkedIn. I usually reply the same day.",
    email: "Email",
    github: "GitHub",
    linkedin: "LinkedIn",
    company: "fynnworks",
    companyNote: "My web studio",
    form: {
      name: "Name",
      message: "Message",
      submit: "Send",
      sending: "Sending…",
      sent: "Sent. You will hear from me soon.",
      privacy: "I only use your name and email address to reply to you.",
      orMail: "Rather email yourself?",
      errors: {
        invalid: "Please enter your name, a valid email address and a message of at least 10 characters.",
        rate: "You have just sent a few messages. Try again in an hour, or email me directly.",
        server: `Sending failed. Please email me directly at ${SITE.email}.`,
      },
    },
  },
  project: {
    back: "Back to work",
    brief: "The brief",
    process: "Approach",
    learned: "What I took away",
    stack: "Used",
    year: "Year",
    kind: "Type",
    next: "Next project",
  },
  cv: {
    description: `The CV of ${SITE.name}: experience, education and skills.`,
    role: `${SCHOOL.program.en} student · founder of fynnworks`,
    location: "Amsterdam",
    download: "Download pdf",
    profile: "Profile",
    profileBody: `${SCHOOL.program.en} student at ${SCHOOL.name} and founder of fynnworks. I build websites and take them all the way to live myself: domain, hosting, mail and HTTPS. Afterwards I am the one who maintains them.`,
    experience: "Experience",
    education: "Education",
    skills: "Skills",
    languages: "Languages",
    languagesBody: "Dutch, English",
    jobs: [
      {
        role: "Founder and owner",
        org: "fynnworks",
        place: "Amsterdam",
        period: "Sep 2026 – present",
        body: "Registered with the Dutch chamber of commerce. I build paid sites for small businesses, such as theatre makers and shops, take them live and maintain them.",
      },
      {
        role: "Dishwasher",
        org: "NAP Amsterdam",
        place: "Amsterdam",
        period: "Apr 2024 – present",
      },
      {
        role: "Sailing instructor (freelance)",
        org: "Zeilschool IJburg",
        place: "Amsterdam",
        period: "Apr 2022 – present",
      },
    ],
    schools: [
      {
        role: `${SCHOOL.program.en}, ${SCHOOL.level.en}`,
        org: SCHOOL.name,
        period: "Aug 2025 – Dec 2028",
      },
      {
        role: "Mavo (pre-vocational secondary), Technology",
        org: "Berlage Lyceum",
        period: "Aug 2022 – Jun 2025",
      },
    ],
  },
  footer: {
    rights: "All rights reserved.",
    built: "Built with Next.js, running on a Raspberry Pi.",
  },
}

const dictionaries: Record<Lang, Dict> = { nl, en }

export function getDictionary(lang: Lang): Dict {
  return dictionaries[lang]
}

/**
 * De losse namen in de marquee onder de hero. Staan hier en niet in de
 * dictionary omdat ze in beide talen identiek zijn — een tweetalige lijst van
 * "HTML" en "PHP" is alleen maar een plek waar iets uit de pas kan lopen.
 */
export const MARQUEE = [
  "HTML",
  "CSS",
  "PHP",
  "JavaScript",
  "TypeScript",
  "MySQL",
  "Git",
  "Linux",
  "Raspberry Pi",
  "Next.js",
] as const

/**
 * De skills-sectie, per groep. Net als de marquee in beide talen gelijk; alleen
 * de groepstitels staan in de dictionary. Welke projecten bij een techniek
 * horen wordt afgeleid uit `stack` in content/projects.ts, dus een naam moet
 * daar letterlijk hetzelfde gespeld zijn. lib/content.test.ts bewaakt dat.
 */
export const SKILLS = {
  frontend: ["HTML", "CSS", "JavaScript", "TypeScript", "Next.js", "Tailwind"],
  backend: ["PHP", "Node", "MySQL"],
  server: ["Linux", "Raspberry Pi", "systemd", "Git"],
} as const satisfies Record<keyof Dict["skills"]["groups"], readonly string[]>
