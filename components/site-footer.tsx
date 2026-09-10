import type { Dict } from "@/content/dictionaries"
import { SITE } from "@/lib/site"

export function SiteFooter({ dict }: { dict: Dict }) {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="shell flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="label">
          © {new Date().getFullYear()} {SITE.name}. {dict.footer.rights}
        </p>
        <p className="label">{dict.footer.built}</p>
      </div>
    </footer>
  )
}
