import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { ProjectGrid } from "@/components/work-list"
import { getDictionary, isLang, LANGS } from "@/content/dictionaries"
import { orderedProjects } from "@/lib/content"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const dict = getDictionary(lang)

  return {
    title: dict.nav.work,
    description: dict.work.intro,
    alternates: {
      canonical: `/${lang}/werk`,
      languages: Object.fromEntries(LANGS.map((l) => [l, `/${l}/werk`])),
    },
  }
}

/** Alle projecten. De homepage toont er een selectie van en linkt hierheen. */
export default async function WorkPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const dict = getDictionary(lang)
  const other = lang === "nl" ? "en" : "nl"

  return (
    <>
      <SiteHeader lang={lang} dict={dict} otherHref={`/${other}/werk`} />

      <main
        id="inhoud"
        className="band bg-band py-16 text-band-fg sm:py-24"
      >
        <div className="shell">
          <h1 className="heading">
            {dict.work.pageLead}{" "}
            <span className="accent">{dict.work.pageAccent}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-band-muted sm:text-lg">
            {dict.work.intro}
          </p>

          <ProjectGrid projects={orderedProjects()} dict={dict} lang={lang} />
        </div>
      </main>
    </>
  )
}
