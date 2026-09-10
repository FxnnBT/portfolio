/**
 * De vaste kop boven elke sectie. Het tweede deel staat cursief — dat ene
 * accent per kop is wat de pagina laat lezen als iets met een stem in plaats
 * van als een lijst met titels.
 */
export function SectionHeading({
  lead,
  accent,
  intro,
  id,
  align = "left",
  tone = "light",
}: {
  lead: string
  accent: string
  intro?: string
  id: string
  align?: "left" | "center"
  tone?: "light" | "band"
}) {
  const centered = align === "center"

  return (
    <div className={centered ? "text-center" : ""}>
      <h2 id={id} className="heading">
        {lead} <span className="accent">{accent}</span>
      </h2>
      {intro ? (
        <p
          className={[
            "mt-5 max-w-xl text-base leading-relaxed sm:text-lg",
            centered ? "mx-auto" : "",
            tone === "band" ? "text-band-muted" : "text-muted",
          ].join(" ")}
        >
          {intro}
        </p>
      ) : null}
    </div>
  )
}
