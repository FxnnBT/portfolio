"use server"

import { headers } from "next/headers"
import nodemailer from "nodemailer"
import { checkRate, parseContact, type ContactState } from "@/lib/contact"
import { SITE } from "@/lib/site"

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Ontbrekende omgevingsvariabele: ${name}`)
  return value
}

/** Caddy zet x-forwarded-for; direct verkeer op :5200 heeft 'm niet. */
async function clientIp(): Promise<string> {
  const forwarded = (await headers()).get("x-forwarded-for") ?? ""
  return forwarded.split(",")[0]?.trim() || "onbekend"
}

/**
 * Een server action is een publiek POST-endpoint, dus alles wat het formulier
 * in de browser al controleert gebeurt hier opnieuw.
 */
export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const { values, valid } = parseContact(formData)
  if (!valid) return { status: "error", reason: "invalid", values }

  if (!checkRate(await clientIp())) {
    return { status: "error", reason: "rate", values }
  }

  try {
    const port = Number(process.env.SMTP_PORT ?? 587)
    const user = requireEnv("SMTP_USER")
    await nodemailer
      .createTransport({
        host: requireEnv("SMTP_HOST"),
        port,
        secure: port === 465,
        auth: { user, pass: requireEnv("SMTP_PASS") },
      })
      .sendMail({
        // Afzender moet je eigen mailbox zijn, anders weigert SPF/DMARC 'm. De
        // bezoeker staat in reply-to, dus "beantwoorden" gaat meteen naar die.
        from: { name: `${SITE.name} portfolio`, address: user },
        to: SITE.email,
        replyTo: { name: values.name, address: values.email },
        subject: `Bericht via je portfolio van ${values.name}`,
        text: `${values.message}\n\n— ${values.name} <${values.email}>\n`,
      })
    return { status: "sent" }
  } catch (error) {
    // Details blijven in journalctl; de bezoeker krijgt een nette melding.
    console.error("[contact] versturen mislukt:", error)
    return { status: "error", reason: "server", values }
  }
}
