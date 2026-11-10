import { ArrowUpRight } from "lucide-react"
import { Marquee } from "@/components/marquee"
import { Silk } from "@/components/silk"
import { type Dict, type Lang, MARQUEE } from "@/content/dictionaries"

/** Gecentreerde hero op het stippenraster met lichtvlekken (.backdrop). */
export function Hero({ dict, lang }: { dict: Dict; lang: Lang }) {
  return (
    <section className="backdrop relative isolate pt-16 sm:pt-24">
      {/* Het masker laat de golven onder de header en boven de marquee
          uitdoven, zodat er nergens een harde rand staat. */}
      <Silk className="absolute inset-0 -z-10 size-full [mask-image:linear-gradient(transparent,#000_18%,#000_50%,transparent_85%)]" />
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
