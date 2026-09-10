import type { Metadata } from "next"
import { Anonymous_Pro, Inter } from "next/font/google"
import { notFound } from "next/navigation"
import { SiteFooter } from "@/components/site-footer"
import { getDictionary, isLang, LANGS } from "@/content/dictionaries"
import { SITE } from "@/lib/site"
import "../globals.css"

// Twee families, meer niet. Inter draagt alles wat je leest; de cursief in de
// koppen is een echte italic van Inter, geen scheefgetrokken rechte letter —
// vandaar dat "italic" hier expliciet meegeladen wordt.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
})

// Alleen voor bijschriften, nummers en labels. Klein en spaarzaam.
const mono = Anonymous_Pro({
  variable: "--font-mono-face",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
})

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const dict = getDictionary(lang)

  return {
    metadataBase: new URL(SITE.url),
    title: { default: dict.meta.title, template: `%s — ${SITE.name}` },
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [l, `/${l}`])),
        // Voor bezoekers wier taal geen van beide is. Zonder x-default kiest
        // Google zelf een variant, en dat is niet altijd de Nederlandse.
        "x-default": "/nl",
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${lang}`,
      siteName: SITE.name,
      locale: lang === "nl" ? "nl_NL" : "en_US",
      type: "website",
    },
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const dict = getDictionary(lang)

  return (
    <html lang={lang} className={`${inter.variable} ${mono.variable}`}>
      <body>
        {/* Eerste tabstop van de pagina. Blijft buiten beeld tot hij focus
            krijgt, en springt dan in zicht. */}
        <a
          href="#inhoud"
          className="label-caps sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:!text-paper"
        >
          {dict.nav.skip}
        </a>
        {children}
        <SiteFooter dict={dict} />
      </body>
    </html>
  )
}
