import { Download } from "lucide-react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { getDictionary, isLang, LANGS, SKILLS } from "@/content/dictionaries"
import { SITE } from "@/lib/site"

/**
 * Het cv als webpagina én als pdf. De pdf's in public/cv/ zijn geprint vanaf
 * precies deze pagina (zie de print:-klassen en @page in globals.css). Pas je
 * de cv-teksten in de dictionary aan, print ze dan opnieuw — zie README.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}

  return {
    title: "CV",
    description: getDictionary(lang).cv.description,
    alternates: {
      canonical: `/${lang}/cv`,
      languages: Object.fromEntries(LANGS.map((l) => [l, `/${l}/cv`])),
    },
  }
}

type Entry = { role: string; org: string; period: string; place?: string; body?: string }

export default async function CvPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const dict = getDictionary(lang)
  const other = lang === "nl" ? "en" : "nl"

  const links = [
    { href: `mailto:${SITE.email}`, label: SITE.email },
    ...[SITE.url, SITE.company, SITE.linkedin, SITE.github].map((href) => ({
      href,
      label: href.replace(/^https?:\/\/(www\.)?/, ""),
    })),
  ]

  return (
    <>
      <SiteHeader lang={lang} dict={dict} otherHref={`/${other}/cv`} />

      <main
        id="inhoud"
        className="bg-paper-soft py-10 sm:py-16 print:bg-paper print:py-0"
      >
        <div className="shell print:max-w-none print:!px-0">
          <div className="mx-auto flex max-w-[52rem] justify-end print:hidden">
            <a
              href={`/cv/fynn-tervoort-cv-${lang}.pdf`}
              download
              className="pill pill-solid"
            >
              <Download className="size-4" />
              {dict.cv.download}
            </a>
          </div>

          {/* Op het scherm een vel papier op een zachte achtergrond; bij het
              printen is het vel de pagina zelf. */}
          <article className="mx-auto mt-6 max-w-[52rem] rounded-[var(--radius-card)] border border-line bg-paper px-6 py-10 sm:px-12 sm:py-14 print:m-0 print:max-w-none print:rounded-none print:border-0 print:p-0">
            <header className="pb-8 sm:flex sm:items-start sm:justify-between sm:gap-8 print:pb-5">
              {/* Niet lazy: de pdf wordt in één keer geprint, en dan moet de
                  foto er al staan. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/fynn.jpg"
                alt={dict.about.photoAlt}
                width={800}
                height={1000}
                className="mb-6 aspect-[4/5] w-28 shrink-0 rounded-2xl object-cover sm:order-2 sm:mb-0 sm:w-32"
              />
              <div>
                <h1 className="text-5xl leading-none tracking-[-0.04em] sm:text-6xl print:!text-5xl">
                  Fynn <span className="accent">Tervoort</span>
                </h1>
                <p className="mt-4 text-lg text-muted">{dict.cv.role}</p>
                <ul className="label mt-6 flex flex-wrap gap-x-5 gap-y-1.5">
                  <li>{dict.cv.location}</li>
                  {links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="transition-colors hover:text-ink">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </header>

            <Row title={dict.cv.profile}>
              <p className="leading-relaxed text-muted">{dict.cv.profileBody}</p>
            </Row>

            <Row title={dict.cv.experience}>
              <Entries items={dict.cv.jobs} />
            </Row>

            <Row title={dict.cv.education}>
              <Entries items={dict.cv.schools} />
            </Row>

            <Row title={dict.cv.skills}>
              <dl className="space-y-2">
                {Object.entries(SKILLS).map(([key, names]) => (
                  <div key={key} className="grid grid-cols-[8rem_1fr] gap-x-3">
                    <dt>
                      {dict.skills.groups[key as keyof typeof SKILLS]}
                    </dt>
                    <dd className="text-muted">{names.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </Row>

            <Row title={dict.cv.languages}>
              <p>{dict.cv.languagesBody}</p>
            </Row>
          </article>
        </div>
      </main>
    </>
  )
}

/** Kop links in mono, inhoud rechts — hetzelfde raster als de projectpagina's. */
function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-line py-7 sm:grid-cols-[9rem_1fr] sm:gap-8 print:py-3.5">
      <h2 className="label-caps pt-1">{title}</h2>
      <div className="text-[0.9375rem]">{children}</div>
    </section>
  )
}

function Entries({ items }: { items: readonly Entry[] }) {
  return (
    <ol className="space-y-5 print:space-y-3.5">
      {items.map((item) => (
        <li key={item.org} className="break-inside-avoid">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="text-lg tracking-tight">{item.role}</h3>
            <span className="label">{item.period}</span>
          </div>
          <p className="text-muted">
            {item.org}
            {item.place ? ` · ${item.place}` : null}
          </p>
          {item.body ? (
            <p className="mt-1.5 leading-relaxed text-muted">{item.body}</p>
          ) : null}
        </li>
      ))}
    </ol>
  )
}
