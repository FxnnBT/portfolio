import assert from "node:assert/strict"
import { test } from "node:test"
import { checkRate, parseContact, RATE_MAX, RATE_WINDOW_MS } from "./contact.ts"

function form(fields: Record<string, string>): FormData {
  const data = new FormData()
  for (const [key, value] of Object.entries(fields)) data.set(key, value)
  return data
}

const ok = { name: "Sanne", email: "sanne@voorbeeld.nl", message: "Hoi, heb je plek voor een stagiair?" }

test("parseContact accepteert een normaal bericht en trimt de velden", () => {
  const { values, valid } = parseContact(form({ ...ok, name: "  Sanne  " }))
  assert.equal(valid, true)
  assert.equal(values.name, "Sanne")
})

test("parseContact weigert te korte, ongeldige of verdachte invoer", () => {
  for (const bad of [
    { ...ok, name: "S" },
    { ...ok, email: "geen-adres" },
    { ...ok, message: "hoi" },
    { ...ok, message: "x".repeat(4001) },
    { ...ok, name: "Sanne\r\nBcc: iedereen@voorbeeld.nl" },
    { ...ok, website: "https://spam.example" },
  ]) {
    assert.equal(parseContact(form(bad)).valid, false, JSON.stringify(bad).slice(0, 80))
  }
})

test("parseContact geeft de invoer ook terug als hij ongeldig is", () => {
  const { values } = parseContact(form({ ...ok, email: "fout" }))
  assert.equal(values.message, ok.message)
})

test("checkRate laat er RATE_MAX per uur door, per IP, en daarna weer", () => {
  const store = new Map<string, number[]>()
  for (let i = 0; i < RATE_MAX; i++) assert.equal(checkRate("1.1.1.1", 0, store), true)
  assert.equal(checkRate("1.1.1.1", 0, store), false)
  assert.equal(checkRate("2.2.2.2", 0, store), true)
  assert.equal(checkRate("1.1.1.1", RATE_WINDOW_MS, store), true)
})
