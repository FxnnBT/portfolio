/**
 * Doorlopende band met de namen waar ik mee werk.
 *
 * De lijst staat er twee keer in. De animatie schuift precies de helft van het
 * spoor op, dus op het moment dat de eerste kopie weg is staat de tweede exact
 * waar de eerste begon — de sprong terug naar nul is daardoor niet te zien.
 * Puur CSS: geen JavaScript, geen library, en hij staat stil zodra iemand
 * minder beweging heeft gevraagd (zie globals.css).
 *
 * De tweede kopie is aria-hidden: een schermlezer hoort de lijst één keer.
 */
export function Marquee({
  items,
  label,
}: {
  items: readonly string[]
  label: string
}) {
  return (
    <div
      className="marquee relative overflow-hidden border-y border-line py-5"
      aria-label={label}
    >
      <div className="marquee-track">
        <Row items={items} />
        <Row items={items} hidden />
      </div>

      {/* Randen laten uitvloeien naar de paginakleur, zodat de namen niet
          halverwege een letter afgesneden tegen de rand aan staan. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-paper to-transparent sm:w-28"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper to-transparent sm:w-28"
      />
    </div>
  )
}

function Row({
  items,
  hidden = false,
}: {
  items: readonly string[]
  hidden?: boolean
}) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-8 whitespace-nowrap px-8 text-lg tracking-tight sm:text-xl"
        >
          {item}
          <span aria-hidden className="size-1 rounded-full bg-line" />
        </li>
      ))}
    </ul>
  )
}
