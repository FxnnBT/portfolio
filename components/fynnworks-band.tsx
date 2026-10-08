import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import type { Dict, Lang } from "@/content/dictionaries"
import { SITE } from "@/lib/site"

/**
 * Het bedrijf naast de persoon. Staat direct na "Over mij", waar fynnworks al
 * genoemd wordt: wie daar denkt "zo iemand zoek ik", ziet hier meteen wat het
 * kost en waar het te regelen is. Zelfde opbouw als de stats-band — kop links,
 * inhoud rechts — zodat het bij de portfolio hoort en geen ingeplakte advertentie
 * wordt.
 */
export function FynnworksBand({ dict, lang }: { dict: Dict; lang: Lang }) {
  const copy = dict.fynnworks

  return (
    <section
      id="fynnworks"
      aria-labelledby="fynnworks-titel"
      className="band scroll-mt-[4.5rem] bg-band py-20 text-band-fg sm:py-28"
    >
      <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div>
            <p className="label-caps !text-band-muted">{copy.label}</p>
            <h2 id="fynnworks-titel" className="heading mt-5 max-w-md">
              {copy.lead} <span className="accent">{copy.accent}</span>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-band-muted sm:text-lg">
              {copy.body}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={SITE.company}
                target="_blank"
                rel="noopener noreferrer"
                className="pill pill-solid"
              >
                {copy.cta}
                <ArrowUpRight className="size-4" />
              </a>
              <a href={`/${lang}#contact`} className="pill pill-outline">
                {dict.nav.cta}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div>
            <ul className="border-t border-band-line">
              {copy.items.map((item) => (
                <li key={item.name} className="border-b border-band-line py-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-xl tracking-tight sm:text-2xl">
                      {item.name}
                    </h3>
                    <span className="label !text-band-fg">{item.price}</span>
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-band-muted sm:text-base">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
            {/* Verplicht naast een prijs: wat de klant uiteindelijk betaalt. */}
            <p className="label mt-5 !text-band-muted">{copy.vatNote}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
