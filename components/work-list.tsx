import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import type { Dict, Lang } from "@/content/dictionaries"
import type { Project } from "@/content/projects"
import { hasDetail, orderedProjects } from "@/lib/content"

/**
 * Werk op een zwarte band, met de screenshots als grote afgeronde vlakken. Het
 * uitgelichte project loopt over de volle breedte, de rest staat twee naast
 * elkaar — zonder dat verschil is het een uniform kaartenraster, en dat is
 * precies wat deze sectie niet moet zijn.
 */
export function WorkList({ dict, lang }: { dict: Dict; lang: Lang }) {
  const projects = orderedProjects()
  const [featured, ...rest] = projects

  return (
    <section
      id="werk"
      aria-labelledby="werk-titel"
      className="band scroll-mt-[4.5rem] bg-band py-20 text-band-fg sm:py-28"
    >
      <div className="shell">
        <SectionHeading
          id="werk-titel"
          lead={dict.work.lead}
          accent={dict.work.accent}
          intro={dict.work.intro}
          tone="band"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {featured ? (
            <Reveal className="block sm:col-span-2">
              <Card project={featured} dict={dict} lang={lang} wide />
            </Reveal>
          ) : null}

          {rest.map((project, i) => (
            <Reveal
              key={project.slug}
              className="block"
              delay={Math.min(i, 3) * 80}
            >
              <Card project={project} dict={dict} lang={lang} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Card({
  project,
  dict,
  lang,
  wide = false,
}: {
  project: Project
  dict: Dict
  lang: Lang
  wide?: boolean
}) {
  const detail = hasDetail(project)
  const href = `/${lang}/werk/${project.slug}`
  // Splitsen in tekst naast beeld kan alleen als er beeld is. Zonder screenshot
  // blijft de kaart één kolom — anders staat de halve kaart leeg en is de
  // "uitlichting" een gat.
  const split = wide && Boolean(project.image)

  return (
    <article className="group h-full overflow-hidden rounded-[var(--radius-card)] border border-band-line bg-[#0c0c0c] transition-colors duration-300 hover:border-band-muted">
      <div
        className={[
          "grid h-full",
          split ? "lg:grid-cols-[1.1fr_1fr] lg:items-center" : "",
        ].join(" ")}
      >
        <div
          className={[
            wide ? "p-7 sm:p-10" : "p-7 sm:p-8",
            split ? "lg:order-2" : "",
          ].join(" ")}
        >
          <div className="label flex flex-wrap items-center gap-x-3 gap-y-1 !text-band-muted">
            <span>{project.year}</span>
            <span aria-hidden className="size-1 rounded-full bg-band-line" />
            <span>{dict.work.kinds[project.kind]}</span>
            {project.status ? (
              <>
                <span aria-hidden className="size-1 rounded-full bg-band-line" />
                <span className="accent">{project.status[lang]}</span>
              </>
            ) : null}
          </div>

          <h3
            className={[
              "mt-4 tracking-tight",
              wide ? "text-2xl sm:text-4xl" : "text-xl sm:text-2xl",
            ].join(" ")}
          >
            {detail ? (
              <Link href={href} className="transition-opacity hover:opacity-70">
                {project.title[lang]}
              </Link>
            ) : (
              project.title[lang]
            )}
          </h3>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-band-muted sm:text-base">
            {project.summary[lang]}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li
                key={item}
                className="label rounded-full border border-band-line px-3 py-1 !text-band-muted"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            {detail ? (
              <Link href={href} className="link font-medium">
                {dict.work.read}
              </Link>
            ) : null}
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-band-muted transition-colors hover:text-band-fg"
              >
                {dict.work.visit}
                <ArrowUpRight className="size-3.5" />
              </a>
            ) : null}
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-band-muted transition-colors hover:text-band-fg"
              >
                {dict.work.repo}
                <ArrowUpRight className="size-3.5" />
              </a>
            ) : null}
          </div>
        </div>

        {project.image ? (
          <div
            className={
              split
                ? "overflow-hidden lg:order-1 lg:h-full"
                : "overflow-hidden border-t border-band-line"
            }
          >
            {/* Bewust een gewone <img>: de beeldoptimalisatie staat uit, dus
                next/image levert hier alleen extra JavaScript op. width en
                height staan er hard in zodat de kaart niet verspringt terwijl
                de screenshot laadt. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt=""
              width={1600}
              height={1000}
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03] lg:h-full"
            />
          </div>
        ) : null}
      </div>
    </article>
  )
}
