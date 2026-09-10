import type { Lang } from "../content/dictionaries.ts"
import { projects, type Project, type T } from "../content/projects.ts"

/** Kiest de juiste taal uit een tweetalig veld. */
export function t(value: T, lang: Lang): string {
  return value[lang]
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

/**
 * Het uitgelichte project staat vooraan; de rest volgt in de volgorde van
 * content/projects.ts. Zo bepaalt de inhoud de volgorde en niet de component.
 */
export function orderedProjects(): Project[] {
  const featured = projects.filter((p) => p.featured)
  return [...featured, ...projects.filter((p) => !p.featured)]
}

/** Het volgende project in de lijst, rondlopend, voor de link onderaan een
 *  projectpagina. Bij één project levert dit datzelfde project op — dan toont
 *  de pagina de link niet. */
export function nextProject(slug: string): Project | undefined {
  const list = orderedProjects()
  const i = list.findIndex((p) => p.slug === slug)
  if (i === -1 || list.length < 2) return undefined
  return list[(i + 1) % list.length]
}

/** Heeft dit project genoeg inhoud om een eigen pagina te verdienen? */
export function hasDetail(project: Project): boolean {
  return Boolean(project.brief || project.process?.length || project.learned)
}
