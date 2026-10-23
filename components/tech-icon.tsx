import { ServerCog } from "lucide-react"
import {
  type SimpleIcon,
  siClaude,
  siCss,
  siGit,
  siHtml5,
  siJavascript,
  siLinux,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siRaspberrypi,
  siTailwindcss,
  siTypescript,
} from "simple-icons"
import type { MARQUEE, SKILLS } from "@/content/dictionaries"

type Tech = (typeof MARQUEE)[number] | (typeof SKILLS)[keyof typeof SKILLS][number]

/**
 * Het `satisfies` is de controle: zet je een techniek bij de skills of in de
 * marquee zonder icoon, dan faalt `next build`. systemd staat niet in
 * simple-icons; een gewoon tandwiel is eerlijker dan een nagetekend logo.
 */
const ICONS: Record<string, SimpleIcon> = {
  HTML: siHtml5,
  CSS: siCss,
  PHP: siPhp,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  MySQL: siMysql,
  Git: siGit,
  Linux: siLinux,
  "Raspberry Pi": siRaspberrypi,
  "Next.js": siNextdotjs,
  Tailwind: siTailwindcss,
  Node: siNodedotjs,
  "Claude Code": siClaude,
} satisfies Record<Exclude<Tech, "systemd">, SimpleIcon>

/** Decoratief: de naam staat er altijd naast, dus een schermlezer slaat hem over. */
export function TechIcon({ name, className }: { name: string; className?: string }) {
  if (name === "systemd") return <ServerCog aria-hidden className={className} />
  const icon = ICONS[name]
  if (!icon) return null
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d={icon.path} />
    </svg>
  )
}
