import Link from "next/link"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { type Dict, type Lang, SKILLS } from "@/content/dictionaries"
import { projects } from "@/content/projects"
import { hasDetail } from "@/lib/content"

/**
 * Geen niveaus of percentages: die verzint iedereen zelf. Het bewijs komt uit
 * de projecten, dus een techniek zonder project heeft gewoon geen regel eronder.
 */
export function Skills({ dict, lang }: { dict: Dict; lang: Lang }) {
  const groups = Object.entries(SKILLS) as [
    keyof typeof SKILLS,
    readonly string[],
  ][]

  return (
    <section
      id="skills"
      aria-labelledby="skills-titel"
      className="scroll-mt-[4.5rem] bg-paper-soft py-20 sm:py-28"
    >
      <div className="shell">
        <SectionHeading
          id="skills-titel"
          lead={dict.skills.lead}
          accent={dict.skills.accent}
          intro={dict.skills.intro}
        />

        <div className="mt-14 border-t border-line">
          {groups.map(([key, names], i) => (
            <Reveal key={key} delay={Math.min(i, 3) * 70}>
              <div className="grid gap-6 border-b border-line py-8 sm:grid-cols-[12rem_1fr] sm:gap-8 sm:py-10">
                <h3 className="label-caps pt-1.5">{dict.skills.groups[key]}</h3>
                <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                  {names.map((name) => {
                    const used = projects.filter((p) => p.stack.includes(name))
                    return (
                      <li key={name}>
                        <span className="text-xl tracking-tight">{name}</span>
                        {used.length > 0 ? (
                          <p className="mt-1 text-sm text-muted">
                            {dict.skills.used}{" "}
                            {used.map((p, j) => (
                              <span key={p.slug}>
                                {j > 0 ? ", " : null}
                                {hasDetail(p) ? (
                                  <Link href={`/${lang}/werk/${p.slug}`} className="link">
                                    {p.title[lang].split(" | ")[0]}
                                  </Link>
                                ) : (
                                  p.title[lang].split(" | ")[0]
                                )}
                              </span>
                            ))}
                          </p>
                        ) : null}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
