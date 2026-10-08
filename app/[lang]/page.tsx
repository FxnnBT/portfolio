import { notFound } from "next/navigation"
import { About } from "@/components/about"
import { ContactBand } from "@/components/contact-band"
import { FynnworksBand } from "@/components/fynnworks-band"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { SiteHeader } from "@/components/site-header"
import { Skills } from "@/components/skills"
import { StatsBand } from "@/components/stats-band"
import { WorkList } from "@/components/work-list"
import { getDictionary, isLang } from "@/content/dictionaries"

/**
 * De volgorde is bewust wit → zwart → wit → zwart: elke sectie zet zich af
 * tegen de vorige. Zonder die afwisseling wordt het één lange kolom en voelt
 * de pagina leeg, hoeveel er ook op staat.
 */
export default async function HomePage({
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
      <SiteHeader lang={lang} dict={dict} otherHref={`/${other}`} />

      <main id="inhoud">
        <Hero dict={dict} lang={lang} />
        <StatsBand dict={dict} />
        <Services dict={dict} />
        <WorkList dict={dict} lang={lang} />
        <About dict={dict} lang={lang} />
        <FynnworksBand dict={dict} lang={lang} />
        <Skills dict={dict} lang={lang} />
        <ContactBand dict={dict} />
      </main>
    </>
  )
}
