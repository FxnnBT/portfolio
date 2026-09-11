import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import type { Dict } from "@/content/dictionaries"

/**
 * Genummerde rijen in plaats van kaarten: nummer links in mono, titel in het
 * midden, uitleg rechts. Een kaartenraster zou hier vier gelijke blokjes
 * opleveren zonder enige rangorde; deze vorm leest als een lijst met gewicht.
 */
export function Services({ dict }: { dict: Dict }) {
  return (
    <section
      id="diensten"
      aria-labelledby="diensten-titel"
      className="scroll-mt-[4.5rem] bg-paper-soft py-20 sm:py-28"
    >
      <div className="shell">
        <SectionHeading
          id="diensten-titel"
          lead={dict.services.lead}
          accent={dict.services.accent}
          intro={dict.services.intro}
        />

        <ul className="mt-14 border-t border-line">
          {dict.services.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={Math.min(i, 3) * 70}>
              <div className="group grid items-baseline gap-3 border-b border-line py-8 sm:grid-cols-[4rem_1fr] sm:gap-8 sm:py-10 lg:grid-cols-[4rem_1fr_28rem]">
                <span className="label accent">
                  #{String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl tracking-tight transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 sm:text-2xl">
                  {item.title}
                </h3>
                <p className="max-w-prose text-sm leading-relaxed text-muted sm:text-base">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
