"use client"

import { useEffect, useRef } from "react"

/**
 * Verticale lijn links van een lijst die zich vult terwijl je scrolt, met een
 * lichtpunt vooraan. Elk kind met de class `rail-step` krijgt een stip op de
 * lijn (globals.css) die oplicht zodra het lichtpunt erlangs is.
 *
 * Alleen vanaf lg zichtbaar; daaronder staat de lijn op display: none en doet
 * de scroll-handler niets.
 */
export function Rail({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = ref.current!
    const rail = track.firstElementChild as HTMLElement
    const [fill, orb] = rail.children as unknown as HTMLElement[]
    const steps = [...track.querySelectorAll<HTMLElement>(".rail-step")]

    const update = () => {
      const r = rail.getBoundingClientRect()
      if (!r.height) return
      // Het lichtpunt hangt net onder het midden van het scherm: daar lees je.
      const y = Math.min(Math.max(innerHeight * 0.58 - r.top, 0), r.height)
      // Eerst alles meten, dan pas schrijven: één layout per scroll. De lijn
      // begint op stiphoogte van de eerste stap, dus een stap is gepasseerd
      // zodra zijn bovenkant minder dan y onder die van de lijst ligt.
      const top = track.getBoundingClientRect().top
      const passed = steps.map((s) => s.getBoundingClientRect().top - top <= y)

      fill.style.transform = `scaleY(${y / r.height})`
      orb.style.transform = `translateY(${y}px)`
      steps.forEach((s, i) => s.toggleAttribute("data-passed", passed[i]))
    }

    update()
    addEventListener("scroll", update, { passive: true })
    addEventListener("resize", update)
    return () => {
      removeEventListener("scroll", update)
      removeEventListener("resize", update)
    }
  }, [])

  return (
    <div ref={ref} className={`rail-track ${className}`}>
      <div aria-hidden className="rail">
        <i className="rail-fill" />
        <i className="rail-orb" />
      </div>
      {children}
    </div>
  )
}
