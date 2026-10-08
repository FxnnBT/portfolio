import Link from "next/link"
import { MobileMenu } from "@/components/mobile-menu"
import type { Dict, Lang } from "@/content/dictionaries"

/**
 * `otherHref` komt van de pagina zelf, niet uit usePathname. Daardoor is dit
 * een server component; alleen het mobiele menu is een client component.
 */
export function SiteHeader({
  lang,
  dict,
  otherHref,
}: {
  lang: Lang
  dict: Dict
  otherHref: string
}) {
  const sections = [
    { href: `/${lang}#werk`, label: dict.nav.work },
    { href: `/${lang}#over`, label: dict.nav.about },
    { href: `/${lang}#diensten`, label: dict.nav.services },
    { href: `/${lang}#fynnworks`, label: dict.nav.fynnworks },
    { href: `/${lang}#skills`, label: dict.nav.skills },
    { href: `/${lang}#contact`, label: dict.nav.contact },
    { href: `/${lang}/cv`, label: dict.nav.cv },
  ]

  return (
    <header className="sticky top-0 z-50 print:hidden border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="shell flex h-[4.5rem] items-center justify-between gap-4">
        <Link
          href={`/${lang}`}
          className="text-lg tracking-tight transition-opacity hover:opacity-60"
        >
          Fynn<span className="accent">Tervoort</span>
        </Link>

        <nav
          aria-label={dict.nav.label}
          className="flex items-center gap-6 sm:gap-8"
        >
          {/* Onder lg passen zeven labels niet naast de naam en de taalwissel;
              daar neemt het hamburgermenu ze over. */}
          <ul className="hidden items-center gap-7 lg:flex">
            {sections.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  className="text-sm tracking-wide transition-opacity hover:opacity-60"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <Link
            href={otherHref}
            hrefLang={lang === "nl" ? "en" : "nl"}
            aria-label={dict.nav.otherLangLabel}
            className="label-caps rounded-full border border-line px-3 py-1.5 !text-ink transition-colors hover:border-ink"
          >
            {dict.nav.otherLang}
          </Link>

          <a
            href={`/${lang}#contact`}
            className="pill pill-solid hidden sm:inline-flex"
          >
            {dict.nav.cta}
          </a>

          <MobileMenu
            items={sections}
            cta={{ href: `/${lang}#contact`, label: dict.nav.cta }}
            labels={{
              menu: dict.nav.menu,
              open: dict.nav.menuOpen,
              close: dict.nav.menuClose,
            }}
          />
        </nav>
      </div>
    </header>
  )
}
