/**
 * Alle projecten, in de volgorde waarin ze op de site staan.
 *
 * Eén type dekt klantwerk, schoolopdrachten en eigen projecten. De velden
 * `brief`, `process` en `learned` zijn optioneel: staan ze er, dan krijgt de
 * projectpagina de blokken Opdracht, Aanpak en Wat ik ervan leerde. Bij
 * schoolwerk vul je ze altijd in — dat is precies wat een examinator wil zien.
 *
 * Screenshots komen in public/work/ en heten <slug>.jpg. Lever ze aan op max
 * ~1600px breed: de beeldoptimalisatie staat uit (de Pi schaalt niets), dus wat
 * je erin stopt is wat de bezoeker downloadt.
 */

/** Een tekst die in beide talen bestaat. */
export type T = { nl: string; en: string }

export type ProjectKind = "werk" | "school" | "eigen"

export type Project = {
  slug: string
  kind: ProjectKind
  year: string
  title: T
  /** Eén of twee zinnen. Staat zowel in de lijst als bovenaan de detailpagina. */
  summary: T
  /** Wat je ervoor gebruikt hebt. Kort houden — het zijn tags, geen cv. */
  stack: string[]
  /** Live site, als die er is. */
  href?: string
  /** Publieke repo, als die er is. */
  repo?: string
  image?: string
  /** Precies één project uitlichten; meer en het is geen uitlichting meer. */
  featured?: boolean
  /** Toont een badge in plaats van een jaartal-afsluiting. */
  status?: T

  // ---- Verdieping. Zonder deze velden blijft de pagina bij de samenvatting.
  /** De opdracht of het probleem: waar begon dit? */
  brief?: T
  /** De stappen die je zette, op volgorde. */
  process?: T[]
  /** Reflectie: wat werkte, wat niet, wat doe je volgende keer anders. */
  learned?: T
}

export const projects: Project[] = [
  {
    slug: "fynnworks",
    kind: "eigen",
    year: "2026",
    featured: true,
    title: {
      nl: "fynnworks — mijn eigen webbureau",
      en: "fynnworks — my own web studio",
    },
    summary: {
      nl: "Op mijn zestiende een bedrijf ingeschreven en de site die klanten binnenhaalt zelf gebouwd: tweetalig, met contactformulier, klantbriefings en een beheerpagina waar ik werk en reviews vandaan beheer.",
      en: "I registered a business at sixteen and built the site that brings in the clients myself: bilingual, with a contact form, client briefings and an admin page where I manage work and reviews.",
    },
    stack: ["Next.js", "TypeScript", "Tailwind", "Node", "Linux", "Raspberry Pi"],
    href: "https://fynnworks.nl",
    image: "/work/fynnworks.jpg",
    brief: {
      nl: "Ik wilde websites bouwen voor ondernemers, maar zonder eigen site is er niets om naar te wijzen. De site moest dus twee dingen doen: laten zien wat ik kan, en het gesprek met een klant echt beginnen — niet alleen een mailadres tonen.",
      en: "I wanted to build websites for small businesses, but without a site of my own there is nothing to point at. So the site had to do two things: show what I can do, and actually start the conversation with a client instead of just listing an email address.",
    },
    process: [
      {
        nl: "Eerst de inhoud, daarna pas het ontwerp. Ik heb alle teksten in één bestand gezet met Nederlands en Engels naast elkaar, zodat een vertaling nooit half kan blijven staan.",
        en: "Content first, design second. I put every piece of copy in a single file with Dutch and English side by side, so a translation can never end up half-finished.",
      },
      {
        nl: "Contactformulier zelf gebouwd met een server action, validatie en een rate limit per IP. Spam wordt gemarkeerd, nooit geweigerd — een echte klant die ongelukkig formuleert mag niet stilletjes verdwijnen.",
        en: "Built the contact form myself with a server action, validation and a per-IP rate limit. Spam gets flagged, never rejected — a real client who phrases things oddly must not vanish silently.",
      },
      {
        nl: "Een briefingpagina achter een persoonlijke link: de klant vult daar rustig zijn wensen en beeldmateriaal in, in plaats van dat het over vijf WhatsApp-berichten verspreid raakt.",
        en: "A briefing page behind a personal link: the client fills in their wishes and images there at their own pace, instead of it being scattered over five WhatsApp messages.",
      },
      {
        nl: "Deployment op een Raspberry Pi bij mij thuis: systemd houdt het proces in de lucht en herstart het als het omvalt. Klantsites zet ik bij een hostingpartij, maar mijn eigen site beheer ik zelf — daar leer ik hoe een server echt werkt.",
        en: "Deployed on a Raspberry Pi at home: systemd keeps the process alive and restarts it when it falls over. Client sites go to a hosting provider, but I run my own site myself — that is where I learn how a server actually works.",
      },
    ],
    learned: {
      nl: "Dat het bouwen het makkelijke deel is. De moeilijke vragen waren juridisch en zakelijk: wat moet er wettelijk op een site van een bedrijf staan, wat kost mijn uur, wat beloof ik een klant precies. Daar bestaat geen documentatie voor die je even opzoekt. Technisch leerde ik het meest van de Pi — een proces dat op mijn laptop draait is nog geen dienst die blijft draaien.",
      en: "That building is the easy part. The hard questions were legal and commercial: what a business site is legally required to show, what my hour is worth, what exactly I promise a client. There is no documentation you can just look up for that. Technically the Pi taught me the most — a process running on my laptop is not yet a service that stays up.",
    },
  },
  {
    slug: "marcel-hensema",
    kind: "werk",
    year: "2026",
    title: {
      nl: "Site voor een theatermaker",
      en: "Site for a theatre maker",
    },
    summary: {
      nl: "Portfolio en speellijst voor een solo-theatermaker. Filmische hero, een speellijst die zichzelf bijwerkt en recensies uit de Volkskrant en Theaterkrant op de voorgrond.",
      en: "Portfolio and tour dates for a solo theatre performer. Cinematic hero, a self-updating schedule, and press quotes from de Volkskrant and Theaterkrant up front.",
    },
    // TODO: vervang door wat je hier echt gebruikt hebt (bijv. HTML, CSS, PHP).
    stack: ["TODO"],
    href: "https://marcelhensema.nl",
    image: "/work/marcel-hensema.jpg",
    brief: {
      nl: "Een theatermaker die zijn eigen voorstellingen speelt, had een plek nodig waar programmeurs en publiek in één oogopslag zien wat er speelt en waar. De oude situatie was een lijst die hij handmatig bijhield en dus altijd achterliep.",
      en: "A theatre maker performing his own shows needed a place where programmers and audiences can see at a glance what is playing and where. Previously it was a list he maintained by hand, and so it was always out of date.",
    },
    process: [
      {
        nl: "Uitgezocht wat er echt toe doet voor deze bezoeker. Dat bleek niet de biografie maar de vraag wanneer je kaartjes kunt kopen — dus de speellijst staat hoog en verleden data verdwijnen vanzelf.",
        en: "Worked out what actually matters to this visitor. That turned out to be not the biography but the question of when you can buy tickets — so the schedule sits high on the page and past dates drop off by themselves.",
      },
      {
        nl: "Recensiecitaten als ontwerpelement in plaats van als voetnoot: een quote uit de Volkskrant doet meer dan drie alinea's zelfgeschreven lof.",
        en: "Press quotes as a design element rather than a footnote: a line from a national newspaper does more than three paragraphs of self-written praise.",
      },
    ],
    learned: {
      nl: "Dat een klant zijn eigen site anders leest dan zijn publiek. Hij wilde zijn biografie bovenaan; de bezoeker kwam voor speeldata. Dat gesprek voeren — met argumenten in plaats van smaak — was lastiger dan het bouwen.",
      en: "That a client reads their own site differently than their audience does. He wanted his biography at the top; visitors came for tour dates. Having that conversation, with reasons instead of taste, was harder than the build.",
    },
  },
  {
    slug: "beldi-amsterdam",
    kind: "werk",
    year: "2026",
    status: { nl: "In aanbouw", en: "In progress" },
    title: {
      nl: "Webshop voor Marokkaanse waren",
      en: "Web shop for Moroccan goods",
    },
    summary: {
      nl: "Webshop voor tajines, muntthee, olijfzeep en textiel uit Marokko. De winkel is in aanbouw; er staat nu een wachtpagina die alvast mailadressen verzamelt voor de opening.",
      en: "Web shop for tagines, mint tea, olive soap and textiles from Morocco. The shop is in the works; a holding page is already collecting email addresses for launch day.",
    },
    // TODO: vervang door wat je hier echt gebruikt hebt (bijv. HTML, CSS, PHP).
    stack: ["TODO"],
    href: "https://beldiamsterdam.com",
    image: "/work/beldi-amsterdam.jpg",
    brief: {
      nl: "Een winkel die nog moet openen, maar wel nu al gevonden wil worden. In plaats van maanden wachten op een complete webshop staat er eerst een wachtpagina die mailadressen verzamelt, zodat er op de openingsdag al publiek is.",
      en: "A shop that has yet to open, but wants to be found already. Instead of waiting months for a full web shop, a holding page collects email addresses first, so there is an audience on opening day.",
    },
    learned: {
      nl: "Iets kleins dat vandaag live staat is meer waard dan iets compleets over drie maanden. TODO: aanvullen zodra de webshop zelf af is.",
      en: "Something small that is live today is worth more than something complete in three months. TODO: expand once the shop itself is finished.",
    },
  },
  {
    slug: "deze-site",
    kind: "eigen",
    year: "2026",
    title: {
      nl: "Deze site",
      en: "This site",
    },
    summary: {
      nl: "Tweetalige portfolio zonder formulier of database. Draait als systemd-service, naast fynnworks op dezelfde Raspberry Pi.",
      en: "A bilingual portfolio with no form and no database. Runs as a systemd service, alongside fynnworks on the same Raspberry Pi.",
    },
    stack: ["Next.js", "TypeScript", "Tailwind", "systemd", "Raspberry Pi"],
    brief: {
      nl: "Ik had een plek nodig die los staat van fynnworks: dat is het bedrijf, dit ben ik. Eén site die tegelijk mijn visitekaartje is en mijn schoolportfolio, zonder dat het één van beide half doet.",
      en: "I needed a place separate from fynnworks: that is the company, this is me. One site that is both my calling card and my school portfolio, without doing either of them halfway.",
    },
    process: [
      {
        nl: "Eerst geschrapt: geen contactformulier, geen database, geen beheerpagina. Alles wat er niet is kan ook niet stukgaan, en op een Pi die al een tweede site draait telt dat.",
        en: "Cut things first: no contact form, no database, no admin page. Whatever is not there cannot break, and on a Pi already running a second site that counts.",
      },
      {
        nl: "Eerste ontwerp was donker en zwaar. Dat werkte niet: het voelde leeg en het las als een template. Opnieuw begonnen met een lichte opzet, koppen op een licht gewicht in plaats van vet, en zwarte volvlaksecties om ritme in de pagina te brengen.",
        en: "The first design was dark and heavy. It did not work: it felt empty and read like a template. Started over with a light layout, headings at a light weight instead of bold, and full-bleed black sections to give the page rhythm.",
      },
      {
        nl: "Eén testbestand dat controleert wat echt stuk kan: dubbele slugs en teksten die wel in het Nederlands maar niet in het Engels bestaan. Dat is de fout die je zelf nooit ziet.",
        en: "One test file checking what can genuinely break: duplicate slugs, and text that exists in Dutch but not in English. That is the mistake you never spot yourself.",
      },
    ],
    learned: {
      nl: "Dat de vraag welke techniek ik gebruik bijna altijd de verkeerde eerste vraag is. Zodra ik opschreef wat de site móest doen, viel de helft van de techniek vanzelf af — en wat overblijft kan niet omvallen.",
      en: "That asking which technology to use is almost always the wrong first question. Once I wrote down what the site had to do, half the technology fell away by itself — and what remains cannot fall over.",
    },
  },
  {
    // ---------------------------------------------------------------------
    // TODO: vervang dit door een echte schoolopdracht. De structuur staat er
    // al; jij vult de teksten in. Zet een screenshot in public/work/ en
    // verwijs ernaar met `image`. Meer opdrachten? Kopieer dit hele blok.
    // Zolang er TODO in staat is het zichtbaar onaf — dat is bewust.
    // ---------------------------------------------------------------------
    slug: "schoolopdracht",
    kind: "school",
    year: "2026",
    title: {
      nl: "TODO — naam van de opdracht",
      en: "TODO — name of the assignment",
    },
    summary: {
      nl: "TODO: in één of twee zinnen wat je gebouwd hebt en voor wie.",
      en: "TODO: in one or two sentences, what you built and for whom.",
    },
    stack: ["TODO"],
    brief: {
      nl: "TODO: wat was de opdracht precies? Wie was de opdrachtgever of de doelgroep, en welke eisen kreeg je mee?",
      en: "TODO: what exactly was the assignment? Who was the client or target audience, and what requirements were you given?",
    },
    process: [
      {
        nl: "TODO: eerste stap — hoe begon je? Onderzoek, schetsen, een gesprek?",
        en: "TODO: first step — how did you start? Research, sketches, a conversation?",
      },
      {
        nl: "TODO: een keuze die je onderweg maakte, en waarom je die maakte.",
        en: "TODO: a decision you made along the way, and why you made it.",
      },
      {
        nl: "TODO: hoe heb je het getest of laten zien, en wat kwam daaruit?",
        en: "TODO: how did you test or present it, and what came out of that?",
      },
    ],
    learned: {
      nl: "TODO: wat ging er mis, wat werkte juist goed, en wat doe je een volgende keer anders? Wees concreet — dat je veel geleerd hebt zegt een examinator niets.",
      en: "TODO: what went wrong, what worked well, and what would you do differently next time? Be concrete — saying you learned a lot tells an examiner nothing.",
    },
  },
]
