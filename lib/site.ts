/**
 * Eén plek voor je eigen gegevens. Alles wat elders in de site je naam, adres
 * of een profiel noemt, komt hier vandaan.
 */
export const SITE = {
  name: "Fynn Tervoort",
  /**
   * Zonder slash op het eind. Gebruikt voor canonical-URL's, hreflang, sitemap
   * en OG-tags.
   *
   * Dit is het adres waarop de site straks publiek staat, niet het adres van
   * het Node-proces zelf (dat luistert op poort 5200 — zie
   * deploy/portfolio.service). Wat ertussen zit regelt iemand anders.
   */
  url: "https://portfolio.fynntervoort.com",
  email: "info@fynnworks.nl",
  github: "https://github.com/FxnnBT",
  linkedin: "https://www.linkedin.com/in/fynn-tervoort-7243a8386/",
  /** Het bedrijf dat je zelf hebt opgezet. */
  company: "https://fynnworks.nl",
} as const

/**
 * TODO: vul je echte geboortedatum in (jaar, maand, dag).
 *
 * Er staat nu een datum die vandaag 17 oplevert, maar op je echte verjaardag
 * klopt hij dan niet. Alleen het jaar aftrekken is niet genoeg: dan word je op
 * 1 januari een jaar ouder in plaats van op je verjaardag.
 */
const BIRTH_DATE = { year: 2009, month: 1, day: 1 }

/**
 * Leeftijd afgeleid in plaats van hardgecodeerd — anders staat er over een jaar
 * stilletjes iets onwaars op je site, en dat is precies het soort detail waar
 * een stagebegeleider over valt.
 *
 * Let op: de site is statisch, dus dit wordt berekend bij `npm run build`. Rol
 * je een jaar niet uit, dan blijft de oude leeftijd staan.
 */
export function age(now = new Date()): number {
  const years = now.getFullYear() - BIRTH_DATE.year
  const hadBirthday =
    now.getMonth() + 1 > BIRTH_DATE.month ||
    (now.getMonth() + 1 === BIRTH_DATE.month && now.getDate() >= BIRTH_DATE.day)
  return hadBirthday ? years : years - 1
}

export const SCHOOL = {
  name: "Mediacollege Amsterdam",
  program: { nl: "Software Developer", en: "Software Developer" },
  /** TODO: klopt dit? Pas het leerjaar aan als je verder bent. */
  level: { nl: "mbo niveau 4", en: "vocational level 4" },
} as const
