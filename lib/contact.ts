/**
 * Alles van het contactformulier wat geen server of mail nodig heeft, zodat
 * `npm test` het kan nakijken. Overgenomen van fynnworks, maar zonder zod: drie
 * velden controleren is geen extra dependency waard.
 *
 * Staat niet in app/actions.ts: een "use server"-bestand mag alleen async
 * functies exporteren, geen typen of constanten.
 */

export type ContactValues = { name: string; email: string; message: string }

export type ContactState =
  | { status: "idle" }
  | { status: "sent" }
  | {
      status: "error"
      reason: "invalid" | "rate" | "server"
      // React 19 leegt het formulier bij elke submit. Zonder deze echo is wat
      // de bezoeker typte weg zodra het versturen mislukt.
      values: ContactValues
    }

/** Dezelfde grenzen staan als minLength/maxLength op de velden. Hier nog een
 *  keer, want een POST hoeft niet uit dat formulier te komen. */
export const LIMITS = {
  name: [2, 80],
  email: [3, 200],
  message: [10, 4000],
} as const

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function parseContact(form: FormData): {
  values: ContactValues
  valid: boolean
} {
  const values = {
    name: String(form.get("name") ?? "").trim(),
    email: String(form.get("email") ?? "").trim(),
    message: String(form.get("message") ?? "").trim(),
  }
  const fits = (key: keyof ContactValues) =>
    values[key].length >= LIMITS[key][0] && values[key].length <= LIMITS[key][1]

  const valid =
    fits("name") &&
    fits("email") &&
    fits("message") &&
    EMAIL.test(values.email) &&
    // De naam komt in het onderwerp van de mail; een regeleinde daarin is een
    // poging om er een eigen header achter te zetten.
    !/[\r\n]/.test(values.name) &&
    // Honeypot: onzichtbaar veld dat bots invullen en mensen nooit zien.
    !form.get("website")

  return { values, valid }
}

export const RATE_WINDOW_MS = 60 * 60 * 1000
export const RATE_MAX = 5

// ponytail: in-memory Map, 5 per uur per IP. Prima bij één Next-proces op één
// Pi; leegt bij herstart. Bij meerdere instances → iets gedeelds, zoals SQLite.
const defaultStore = new Map<string, number[]>()

/** true = mag versturen. Registreert de poging meteen. */
export function checkRate(
  ip: string,
  now: number = Date.now(),
  store: Map<string, number[]> = defaultStore,
): boolean {
  const recent = (store.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  const allowed = recent.length < RATE_MAX
  store.set(ip, allowed ? [...recent, now] : recent)
  return allowed
}
