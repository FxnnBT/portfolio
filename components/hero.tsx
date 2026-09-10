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
        {/* Het enige stukje kleuraccent op de pagina: een groen puntje dat zegt
            dat er iets te halen valt. Dat is de reden dat iemand hier is. */}
        <p className="label-caps inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full rounded-full bg-emerald-500/70" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-600" />
          </span>
          {dict.hero.badge}
        </p>

        <h1 className="display mx-auto mt-8 max-w-4xl">
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
