import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import type { Dict, Lang } from "@/content/dictionaries"
import { age, SCHOOL, SITE } from "@/lib/site"

export function About({ dict, lang }: { dict: Dict; lang: Lang }) {
  // De teksten in de dictionary bevatten %AGE%, %SCHOOL% en %PROGRAM% in plaats
  // van de waarden zelf: zo staat een leeftijd die elk jaar verandert op precies
  // één plek (lib/site.ts) en niet verspreid door twee talen.
  const fill = (line: string) =>
    line
      .replaceAll("%AGE%", `${age()}`)
      .replaceAll("%SCHOOL%", SCHOOL.name)
      .replaceAll("%PROGRAM%", SCHOOL.program[lang])

  const facts = [
    { key: dict.about.facts.age, value: `${age()}` },
    {
      key: dict.about.facts.school,
      value: `${SCHOOL.program[lang]}, ${SCHOOL.level[lang]}`,
    },
    { key: dict.about.facts.based, value: dict.about.facts.basedValue },
    { key: dict.about.facts.company, value: "fynnworks", href: SITE.company },
    { key: dict.about.facts.internship, value: dict.about.facts.internshipValue },
  ]

  return (
    <section
      id="over"
      aria-labelledby="over-titel"
      className="scroll-mt-[4.5rem] py-20 sm:py-28"
    >
      <div className="shell grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20">
        <Reveal>
          <div>
            <SectionHeading
              id="over-titel"
              lead={dict.about.lead}
              accent={dict.about.accent}
            />
            <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              {dict.about.body.map((line) => (
                <p key={line}>{fill(line)}</p>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <dl className="rounded-[var(--radius-card)] border border-line bg-paper-soft p-6 sm:p-8">
            {facts.map((fact, i) => (
              <div
                key={fact.key}
                className={[
                  "flex items-baseline justify-between gap-4 py-3.5",
                  i > 0 ? "border-t border-line" : "",
                ].join(" ")}
              >
                <dt className="label-caps">{fact.key}</dt>
                <dd className="text-right text-sm">
                  {fact.href ? (
                    <a
                      href={fact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 transition-opacity hover:opacity-60"
                    >
                      {fact.value}
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
