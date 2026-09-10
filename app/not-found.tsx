import Link from "next/link"
import "./globals.css"

/**
 * Er is geen app/layout.tsx — de root layout woont in app/[lang]/layout.tsx —
 * dus deze pagina brengt zijn eigen html en body mee.
 *
 * Tweetalig in één pagina: welke taal de bezoeker wilde weten we hier niet, en
 * een 404 is te kort om daar een route voor op te tuigen.
 */
export default function NotFound() {
  return (
    <html lang="nl">
      <body>
        <main className="shell flex min-h-svh flex-col justify-center py-24 text-center">
          <p className="label-caps">404</p>
          <h1 className="heading mt-6">
            Deze pagina <span className="accent">bestaat niet.</span>
            <span className="mt-3 block text-muted">
              This page <span className="accent">does not exist.</span>
            </span>
          </h1>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/nl" className="pill pill-solid">
              Naar de homepage
            </Link>
            <Link href="/en" className="pill pill-outline">
              To the homepage
            </Link>
          </div>
        </main>
      </body>
    </html>
  )
}
