import { Reveal } from "@/components/reveal"
import type { Dict } from "@/content/dictionaries"

/**
 * Volvlak zwarte band. Dit is het scharnier van de pagina: zonder zo'n
 * onderbreking loopt alles als één lange witte kolom door en voelt de site leeg,
 * hoeveel tekst er ook in staat.
 *
 * `band` is de klasse waar globals.css de knopkleuren op omdraait.
 */
export function StatsBand({ dict }: { dict: Dict }) {
  return (
    <section className="band bg-band py-20 text-band-fg sm:py-28">
      <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h2 className="heading max-w-md">
            {dict.stats.lead} <span className="accent">{dict.stats.accent}</span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div>
            <p className="max-w-lg text-base leading-relaxed text-band-muted sm:text-lg">
              {dict.stats.body}
            </p>

            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
              {dict.stats.items.map((item) => (
                <div key={item.caption}>
                  <dt className="sr-only">{item.caption}</dt>
                  <dd>
                    <span className="stat block">{item.value}</span>
                    <span className="label mt-3 block !text-band-muted">
                      {item.caption}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
