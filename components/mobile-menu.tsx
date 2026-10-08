"use client"

import { Menu, X } from "lucide-react"

const ID = "mobiel-menu"

/**
 * Het menu is een native popover. Openen, sluiten met Escape en sluiten door
 * ernaast te tikken doet de browser zelf, ook voordat React geladen is. En het
 * staat in de top layer: de backdrop-blur van de header maakt van elk `fixed`
 * kind een gevangene van de header, maar dit menu ontsnapt daaraan.
 *
 * Het enige wat hier JavaScript nodig heeft: dichtgaan zodra je een link
 * aantikt. Een ankerlink laadt geen nieuwe pagina, dus anders bleef het menu
 * over de sectie liggen waar je net heen wilde.
 */
export function MobileMenu({
  items,
  cta,
  labels,
}: {
  items: { href: string; label: string }[]
  cta: { href: string; label: string }
  labels: { menu: string; open: string; close: string }
}) {
  return (
    <>
      <button
        type="button"
        popoverTarget={ID}
        aria-label={labels.open}
        className="-mr-2.5 grid size-11 place-items-center lg:hidden"
      >
        <Menu className="size-6" strokeWidth={1.5} />
      </button>

      {/* Geen display-klasse op dit element zelf: die wint van de
          display: none waarmee de browser een dichte popover verbergt. */}
      <div
        id={ID}
        popover="auto"
        onClick={(e) => {
          if ((e.target as Element).closest("a")) e.currentTarget.hidePopover()
        }}
        className="m-0 h-dvh max-h-none w-full max-w-none border-0 bg-paper p-0 text-ink lg:hidden"
      >
        <div className="shell flex h-[4.5rem] items-center justify-between border-b border-line">
          <span className="label-caps">{labels.menu}</span>
          <button
            type="button"
            popoverTarget={ID}
            popoverTargetAction="hide"
            aria-label={labels.close}
            className="-mr-2.5 grid size-11 place-items-center"
          >
            <X className="size-6" strokeWidth={1.5} />
          </button>
        </div>

        <ul className="shell">
          {items.map((item) => (
            <li key={item.href} className="border-b border-line">
              <a href={item.href} className="heading block py-5">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="shell py-10">
          <a href={cta.href} className="pill pill-solid">
            {cta.label}
          </a>
        </div>
      </div>
    </>
  )
}
