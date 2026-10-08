import { ArrowLeft, ArrowUpRight } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Reveal } from "@/components/reveal"
import { SiteHeader } from "@/components/site-header"
import { getDictionary, isLang, LANGS } from "@/content/dictionaries"
import { projects } from "@/content/projects"
import { getProject, hasDetail, nextProject } from "@/lib/content"

/**
 * Elke taal × elk project met verdieping. Projecten zonder opdracht, aanpak of
 * reflectie krijgen geen pagina — dan zou er alleen de samenvatting staan die
 * de bezoeker net op de homepage al las.
 */
export function generateStaticParams() {
  return LANGS.flatMap((lang) =>
    projects.filter(hasDetail).map((p) => ({ lang, slug: p.slug })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  const project = getProject(slug)
  if (!isLang(lang) || !project) return {}

  return {
    title: project.title[lang],
    description: project.summary[lang],
    alternates: {
      canonical: `/${lang}/werk/${slug}`,
      languages: Object.fromEntries(LANGS.map((l) => [l, `/${l}/werk/${slug}`])),
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!isLang(lang)) notFound()
  const project = getProject(slug)
  if (!project) notFound()

  const dict = getDictionary(lang)
  const other = lang === "nl" ? "en" : "nl"
  const next = nextProject(slug)

  const meta = [
    { key: dict.project.year, value: project.year },
    { key: dict.project.kind, value: dict.work.kinds[project.kind] },
    { key: dict.project.stack, value: project.stack.join(", ") },
  ]

  return (
    <>
      <SiteHeader lang={lang} dict={dict} otherHref={`/${other}/werk/${slug}`} />

      <main id="inhoud">
        <div className="shell pb-16 pt-12 sm:pt-16">
          <Link
            href={`/${lang}/werk`}
            className="label-caps inline-flex items-center gap-2 transition-colors hover:!text-ink"
          >
            <ArrowLeft className="size-3.5" />
            {dict.project.back}
          </Link>

          <header className="mt-10 max-w-4xl">
            <div className="label flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>{project.year}</span>
              <span aria-hidden className="size-1 rounded-full bg-line" />
              <span>{dict.work.kinds[project.kind]}</span>
            </div>

            <h1 className="heading mt-5">{project.title[lang]}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {project.summary[lang]}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill pill-solid"
                >
                  {dict.work.visit}
                  <ArrowUpRight className="size-4" />
                </a>
              ) : null}
              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill pill-outline"
                >
                  {dict.work.repo}
                  <ArrowUpRight className="size-4" />
                </a>
              ) : null}
            </div>
          </header>

          {project.image ? (
            <Reveal className="mt-14 block overflow-hidden rounded-[var(--radius-media)] border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.title[lang]}
                width={1600}
                height={1000}
                loading="lazy"
                decoding="async"
                className="w-full object-cover"
              />
            </Reveal>
          ) : null}

          <dl className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-3">
            {meta.map((item) => (
              <div key={item.key} className="bg-paper-soft p-6">
                <dt className="label-caps">{item.key}</dt>
                <dd className="mt-2 text-sm">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* De verdieping op de zachte achtergrond: dat scheidt "waar gaat dit
            over" van "hoe is het gegaan" zonder een kop die dat uitlegt. */}
        <div className="border-y border-line bg-paper-soft py-20 sm:py-24">
          <div className="shell grid gap-14 lg:grid-cols-[14rem_1fr] lg:gap-x-16">
            {project.brief ? (
              <Block title={dict.project.brief}>
                <p>{project.brief[lang]}</p>
              </Block>
            ) : null}

            {project.process?.length ? (
              <Block title={dict.project.process}>
                <ol className="space-y-8">
                  {project.process.map((step, i) => (
                    <li key={i} className="flex gap-5">
                      <span className="label accent mt-1.5 shrink-0">
                        #{String(i + 1).padStart(2, "0")}
                      </span>
                      <p>{step[lang]}</p>
                    </li>
                  ))}
                </ol>
              </Block>
            ) : null}

            {project.learned ? (
              <Block title={dict.project.learned}>
                <p>{project.learned[lang]}</p>
              </Block>
            ) : null}
          </div>
        </div>

        {next ? (
          <div className="shell py-16 sm:py-20">
            <Link
              href={`/${lang}/werk/${next.slug}`}
              className="group flex items-center justify-between gap-6 rounded-[var(--radius-card)] border border-line p-7 transition-colors hover:bg-paper-soft sm:p-9"
            >
              <span>
                <span className="label-caps">{dict.project.next}</span>
                <span className="mt-2 block text-2xl tracking-tight sm:text-3xl">
                  {next.title[lang]}
                </span>
              </span>
              <ArrowUpRight className="size-6 shrink-0 text-muted transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
            </Link>
          </div>
        ) : null}
      </main>
    </>
  )
}

/** Kop links in mono, inhoud rechts — hetzelfde raster als de rest van de site. */
function Block({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <>
      <h2 className="label-caps border-t border-line pt-4 lg:col-start-1">
        {title}
      </h2>
      <div className="max-w-2xl space-y-5 text-base leading-relaxed text-muted sm:text-lg lg:col-start-2 lg:pt-4">
        {children}
      </div>
    </>
  )
}
