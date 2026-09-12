import type { MetadataRoute } from "next"
import { LANGS } from "@/content/dictionaries"
import { projects } from "@/content/projects"
import { hasDetail } from "@/lib/content"
import { SITE } from "@/lib/site"

/**
 * Draait tijdens de build en levert een statische sitemap.xml op — dat werkt
 * ook bij `output: "export"`, want er komt geen request aan te pas.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const home = LANGS.map((lang) => ({
    url: `${SITE.url}/${lang}`,
    lastModified: now,
    priority: 1,
  }))

  const work = LANGS.flatMap((lang) =>
    projects.filter(hasDetail).map((p) => ({
      url: `${SITE.url}/${lang}/werk/${p.slug}`,
      lastModified: now,
      priority: 0.7,
    })),
  )

  return [...home, ...work]
}
