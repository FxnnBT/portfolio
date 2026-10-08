import { ArrowUpRight } from "lucide-react"
import { Marquee } from "@/components/marquee"
import { type Dict, type Lang, MARQUEE } from "@/content/dictionaries"

/**
 * Gecentreerde hero. De kop staat op gewicht 400 en niet vet: op deze
 * lettergrootte doet de schaal het werk al, en zwaar erbovenop maakt hem
 * schreeuwerig in plaats van groot.
 */
export function Hero({ dict, lang }: { dict: Dict; lang: Lang }) {
  return (
    <section className="pt-16 sm:pt-24">
      <div className="shell text-center">
        {/* Geen "beschikbaar voor stage"-pilletje met groen puntje hierboven:
            dat staat op elke template-site. Stage staat bij de feiten onder
            "Over mij". */}
        <h1 className="display mx-auto max-w-4xl">
          {dict.hero.lead} <span className="accent">{dict.hero.accent}</span>
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {dict.hero.sub}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href={`/${lang}#werk`} className="pill pill-solid">
            {dict.hero.primary}
            <ArrowUpRight className="size-4" />
          </a>
          <a href={`/${lang}#contact`} className="pill pill-outline">
            {dict.hero.secondary}
          </a>
        </div>
      </div>

      <div className="mt-16 sm:mt-24">
        <Marquee items={MARQUEE} label={dict.hero.marqueeLabel} />
      </div>
    </section>
  )
}
