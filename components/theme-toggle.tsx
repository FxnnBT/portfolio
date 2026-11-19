"use client"

import { Moon, Sun } from "lucide-react"
import { useLayoutEffect } from "react"

/**
 * Licht is de standaard; wie donker kiest krijgt dat ook bij het volgende
 * bezoek. Het script in de layout zet data-theme al vóór de eerste paint, dus
 * de knop hoeft zelf geen staat bij te houden: CSS kiest welk icoon er staat.
 */
export function ThemeToggle({ label }: { label: string }) {
  // Strict Mode wist in development bij het hermounten de attributen op
  // <html>; dit zet het thema terug. In productie verandert het niets.
  useLayoutEffect(() => {
    if (readTheme() === "dark") document.documentElement.dataset.theme = "dark"
  }, [])

  function toggle() {
    const root = document.documentElement
    const next = root.dataset.theme === "dark" ? "light" : "dark"
    root.dataset.theme = next
    try {
      localStorage.setItem("theme", next)
    } catch {
      // Opslag geblokkeerd (privévenster): het thema wisselt wel, alleen
      // onthoudt de volgende pagina het niet.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="glass grid size-[2.125rem] place-items-center rounded-full transition-colors hover:bg-ink hover:text-paper"
    >
      <Moon className="size-4 dark:hidden" strokeWidth={1.75} />
      <Sun className="hidden size-4 dark:block" strokeWidth={1.75} />
    </button>
  )
}

function readTheme() {
  try {
    return localStorage.getItem("theme")
  } catch {
    return null
  }
}
