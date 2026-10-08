import { ArrowUpRight } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { Reveal } from "@/components/reveal"
import type { Dict } from "@/content/dictionaries"
import { SITE } from "@/lib/site"

/**
 * Afsluitende zwarte band: het formulier, en daaronder de plekken waar je me
 * verder vindt. Het mailadres blijft zichtbaar — als het versturen faalt, of
 * als iemand liever zelf mailt, moet er een weg zijn die niet van de Pi afhangt.
 */
export function ContactBand({ dict }: { dict: Dict }) {
  const links = [
    { label: dict.contact.github, value: hostPath(SITE.github), href: SITE.github },
    {
      label: dict.contact.linkedin,
      value: hostPath(SITE.linkedin),
      href: SITE.linkedin,
    },
    {
      label: dict.contact.company,
      value: dict.contact.companyNote,
      href: SITE.company,
    },
  ]

  return (
    <section
      id="contact"
      aria-labelledby="contact-titel"
      className="band scroll-mt-[4.5rem] bg-band py-20 text-band-fg sm:py-28"
    >
      <div className="shell">
        <Reveal>
          <div className="text-center">
            <h2 id="contact-titel" className="heading">
              {dict.contact.lead}{" "}
              <span className="accent">{dict.contact.accent}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-band-muted sm:text-lg">
              {dict.contact.intro}
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-2xl">
            <ContactForm dict={dict.contact} />
          </div>
          <p className="label mt-12 text-center !text-band-muted">
            {dict.contact.form.orMail}{" "}
            <a href={`mailto:${SITE.email}`} className="link text-band-fg">
              {SITE.email}
            </a>
          </p>
        </Reveal>

        <Reveal delay={120}>
          <ul className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-band-line bg-band-line sm:grid-cols-3">
            {/* gap-px op een achtergrond in de lijnkleur levert hairlines tussen
                de cellen op, zonder per cel te bedenken welke rand moet
                verdwijnen. */}
            {links.map((link) => (
              <li key={link.label} className="bg-band">
                <a
                  href={link.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="group flex h-full items-center justify-between gap-4 p-6 transition-colors hover:bg-[#101010] sm:p-7"
                >
                  <span className="min-w-0">
                    <span className="label-caps block !text-band-muted">
                      {link.label}
                    </span>
                    {/* Geen truncate: de LinkedIn-URL eindigt op een
                        willekeurige reeks en dan zie je alleen "…7243a8".
                        Liever twee regels dan een halve URL. */}
                    <span className="mt-2 block break-all text-sm tracking-tight sm:text-base">
                      {link.value}
                    </span>
                  </span>
                  <ArrowUpRight className="size-5 shrink-0 text-band-muted transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-band-fg" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

/** github.com/fynn in plaats van de volle https://…-URL met slash op het eind. */
function hostPath(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
}
