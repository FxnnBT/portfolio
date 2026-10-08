"use client"

import { ArrowUpRight, Check, TriangleAlert } from "lucide-react"
import { useActionState } from "react"
import { sendContact } from "@/app/actions"
import type { Dict } from "@/content/dictionaries"
import { type ContactState, LIMITS } from "@/lib/contact"

// Onderstreept in plaats van een kader. De focus-schaduw maakt de lijn 2px dik
// zonder dat het veld een pixel verspringt; de globale outline zou er een
// rechthoek omheen zetten die bij een lijn niet past.
const field =
  "mt-2 block w-full rounded-none border-0 border-b border-band-line bg-transparent py-3 text-base text-band-fg transition-[border-color,box-shadow] duration-200 focus:border-band-fg focus:shadow-[0_1px_0_var(--band-fg)] focus-visible:outline-none"

/**
 * Werkt ook zonder JavaScript: de server action zit gewoon in `action`, dus de
 * browser post het formulier zelf als React nog niet geladen is.
 */
export function ContactForm({ dict }: { dict: Dict["contact"] }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(
    sendContact,
    { status: "idle" },
  )
  const values = state.status === "error" ? state.values : undefined

  return (
    // color-scheme: dark geeft autofill en de resize-greep van de textarea
    // donkere kleuren; anders zet Chrome een lichtblauw vlak op de zwarte band.
    <form
      action={action}
      className="grid gap-8 text-left [color-scheme:dark] sm:grid-cols-2"
    >
      <label className="block">
        <span className="label-caps !text-band-muted">{dict.form.name}</span>
        <input
          name="name"
          required
          minLength={LIMITS.name[0]}
          maxLength={LIMITS.name[1]}
          autoComplete="name"
          defaultValue={values?.name}
          className={field}
        />
      </label>

      <label className="block">
        <span className="label-caps !text-band-muted">{dict.email}</span>
        <input
          name="email"
          type="email"
          required
          minLength={LIMITS.email[0]}
          maxLength={LIMITS.email[1]}
          autoComplete="email"
          defaultValue={values?.email}
          className={field}
        />
      </label>

      <label className="block sm:col-span-2">
        <span className="label-caps !text-band-muted">{dict.form.message}</span>
        <textarea
          name="message"
          required
          minLength={LIMITS.message[0]}
          maxLength={LIMITS.message[1]}
          rows={5}
          defaultValue={values?.message}
          className={`${field} resize-y`}
        />
      </label>

      {/* Honeypot: buiten beeld, niet focusbaar, genegeerd door screenreaders.
          Bots vullen 'm wel in en worden serverside geweigerd. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="sm:col-span-2">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <button
            type="submit"
            disabled={pending}
            className="pill pill-solid disabled:pointer-events-none disabled:opacity-60"
          >
            {pending ? dict.form.sending : dict.form.submit}
            <ArrowUpRight className="size-4" />
          </button>
          <p className="text-sm text-band-muted">{dict.form.privacy}</p>
        </div>

        {/* Staat altijd in de DOM, ook leeg: aria-live kondigt alleen
            wijzigingen aan in een element dat er al was. */}
        <div role="status" aria-live="polite">
          {state.status === "sent" ? (
            <p className="mt-6 flex items-center gap-3 text-base">
              <Check className="size-5 shrink-0" />
              {dict.form.sent}
            </p>
          ) : null}
          {state.status === "error" ? (
            <p className="mt-6 flex items-center gap-3 text-base">
              <TriangleAlert className="size-5 shrink-0" />
              {dict.form.errors[state.reason]}
            </p>
          ) : null}
        </div>
      </div>
    </form>
  )
}
