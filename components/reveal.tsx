"use client"

import { useEffect, useRef } from "react"

/**
 * Laat de inhoud omhoog invaren zodra hij in beeld komt.
 *
 * Het `data-reveal`-attribuut wordt bewust pas in de effect gezet, niet tijdens
 * het renderen. De HTML die de Pi uitserveert bevat het attribuut dus niet, en
 * de begintoestand in globals.css (opacity: 0) kan daardoor nooit blijven
 * hangen als JavaScript niet laadt — dan staat alles gewoon zichtbaar.
 *
 * Alleen opacity en transform bewegen, dus dit blijft op de compositor. Bij
 * prefers-reduced-motion doet de CSS er niets mee.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode
  /** Milliseconden vertraging, om een rij items na elkaar te laten komen. */
  delay?: number
  className?: string
  as?: "div" | "li" | "section" | "article"
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.dataset.reveal = ""
    el.style.transitionDelay = `${delay}ms`

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.dataset.reveal = "shown"
        // Eenmalig: terug laten faden bij uitscrollen leidt af en kost werk.
        io.disconnect()
      },
      // Iets van het element moet in beeld zijn; rootMargin trekt de drempel
      // omhoog zodat het al begonnen is tegen de tijd dat je het leest.
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  return (
    <Tag ref={ref as React.Ref<never>} className={className}>
      {children}
    </Tag>
  )
}
