import assert from "node:assert/strict"
import { test } from "node:test"
import { getDictionary, isLang, LANGS } from "../content/dictionaries.ts"
import { projects } from "../content/projects.ts"
import { getProject, hasDetail, nextProject, orderedProjects, t } from "./content.ts"
import { age } from "./site.ts"

/**
 * Wat hier getest wordt is niet de logica — die is klein — maar de inhoud.
 * De fout die je bij een tweetalige site echt maakt is een tekst die je in het
 * Nederlands aanpast en in het Engels vergeet. Dat ziet niemand tot een
 * Engelstalige bezoeker op een lege plek staart.
 */

/** Loopt een genest object af en levert elk pad naar een blad op. */
function keyPaths(value: unknown, prefix = ""): string[] {
  if (value === null || typeof value !== "object") return [prefix]
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => keyPaths(item, `${prefix}[${i}]`))
  }
  return Object.entries(value).flatMap(([key, child]) =>
    keyPaths(child, prefix ? `${prefix}.${key}` : key),
  )
}

test("de Nederlandse en Engelse dictionary hebben exact dezelfde keys", () => {
  const nl = keyPaths(getDictionary("nl")).sort()
  const en = keyPaths(getDictionary("en")).sort()
  assert.deepEqual(en, nl)
})

test("geen enkele tekst in de dictionary is leeg", () => {
  for (const lang of LANGS) {
    const flat = JSON.stringify(getDictionary(lang))
    assert.equal(flat.includes('""'), false, `lege tekst in dictionary ${lang}`)
  }
})

test("isLang accepteert alleen de talen die de site kent", () => {
  assert.equal(isLang("nl"), true)
  assert.equal(isLang("en"), true)
  assert.equal(isLang("de"), false)
  assert.equal(isLang(""), false)
})

test("projectslugs zijn uniek", () => {
  const slugs = projects.map((p) => p.slug)
  assert.deepEqual([...new Set(slugs)], slugs)
})

test("slugs bevatten alleen tekens die veilig in een URL passen", () => {
  for (const p of projects) {
    assert.match(p.slug, /^[a-z0-9-]+$/, `slug "${p.slug}" hoort niet in een URL`)
  }
})

test("elk project heeft alle tweetalige velden in beide talen ingevuld", () => {
  for (const p of projects) {
    for (const [name, value] of [
      ["title", p.title],
      ["summary", p.summary],
      ["brief", p.brief],
      ["learned", p.learned],
      ["status", p.status],
    ] as const) {
      if (!value) continue
      for (const lang of LANGS) {
        assert.ok(
          value[lang]?.trim(),
          `${p.slug}: ${name}.${lang} ontbreekt of is leeg`,
        )
      }
    }
    p.process?.forEach((step, i) => {
      for (const lang of LANGS) {
        assert.ok(
          step[lang]?.trim(),
          `${p.slug}: process[${i}].${lang} ontbreekt of is leeg`,
        )
      }
    })
  }
})

test("elk project heeft minstens één ding in de stack staan", () => {
  for (const p of projects) {
    assert.ok(p.stack.length > 0, `${p.slug} heeft een lege stack`)
  }
})

test("hoogstens één project is uitgelicht", () => {
  assert.ok(projects.filter((p) => p.featured).length <= 1)
})

test("orderedProjects zet het uitgelichte project vooraan en verliest niets", () => {
  const ordered = orderedProjects()
  assert.equal(ordered.length, projects.length)
  assert.deepEqual(
    [...ordered].map((p) => p.slug).sort(),
    projects.map((p) => p.slug).sort(),
  )
  const featured = projects.find((p) => p.featured)
  if (featured) assert.equal(ordered[0].slug, featured.slug)
})

test("getProject vindt een bestaand project en geeft undefined op een onbekende slug", () => {
  assert.equal(getProject(projects[0].slug)?.slug, projects[0].slug)
  assert.equal(getProject("bestaat-niet"), undefined)
})

test("nextProject loopt rond en wijst nooit naar zichzelf", () => {
  for (const p of projects) {
    const next = nextProject(p.slug)
    assert.ok(next, `${p.slug} heeft geen volgend project`)
    assert.notEqual(next.slug, p.slug)
  }
  assert.equal(nextProject("bestaat-niet"), undefined)
})

test("t kiest de gevraagde taal", () => {
  const value = { nl: "hallo", en: "hello" }
  assert.equal(t(value, "nl"), "hallo")
  assert.equal(t(value, "en"), "hello")
})

test("hasDetail is waar zodra er een opdracht, aanpak of reflectie is", () => {
  const bare = projects[0]
  assert.equal(
    hasDetail({ ...bare, brief: undefined, process: undefined, learned: undefined }),
    false,
  )
  assert.equal(hasDetail({ ...bare, brief: { nl: "x", en: "x" } }), true)
})

test("age telt pas op de verjaardag een jaar op", () => {
  // Iemand geboren op 1 januari 2009 is op oudejaarsavond 2025 nog 16.
  assert.equal(age(new Date("2025-12-31T12:00:00Z")), 16)
  assert.equal(age(new Date("2026-01-01T12:00:00Z")), 17)
  assert.equal(age(new Date("2026-09-09T12:00:00Z")), 17)
})
