"use client"

import { useEffect, useRef } from "react"

const VERT = `attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }`

/* Plooien van zijde: verticale sinusbanden die door trage sinussen in
   S-bochten worden getrokken. De macht maakt de lichte ruggen smal en de
   dalen breed en donker. Uitvoer is voorvermenigvuldigd alfa, dus het canvas
   ligt als licht over de pagina in plaats van er een vlak overheen te zetten. */
const FRAG = `
precision mediump float;
uniform vec2 r;
uniform float t;

void main() {
  vec2 p = gl_FragCoord.xy / r.y;
  p.x += 0.2 * sin(p.y * 3.1 + t * 0.15) + 0.07 * sin(p.y * 7.3 + p.x * 2.0 - t * 0.11);
  float f = 0.5 + 0.5 * sin(p.x * 11.0 + 1.2 * sin(p.y * 2.1 + t * 0.2));
  float a = 0.7 * pow(f, 6.0) + 0.3 * pow(f, 2.0);
  // Niet elke plooi vangt evenveel licht.
  a *= 0.25 + 0.75 * (0.5 + 0.5 * sin(p.x * 2.7 - p.y * 1.9 + t * 0.07));
  // Achter de kop gedimd, zodat de tekst leesbaar blijft.
  a *= 0.45 * mix(0.35, 1.0, smoothstep(0.1, 0.5, abs(gl_FragCoord.x / r.x - 0.5)));
  // Een korrel van minder dan één kleurstap breekt de banden in het verloop.
  a += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 128.0;
  a = max(a, 0.0);
  gl_FragColor = vec4(vec3(0.949, 0.937, 0.922) * a, a);
}`

/**
 * Bewegende zijde-achtergrond. Zonder WebGL blijft het canvas leeg en staat de
 * CSS-achtergrond eronder er gewoon; bij prefers-reduced-motion wordt er één
 * stilstaand beeld getekend.
 */
export function Silk({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const gl = canvas?.getContext("webgl", { antialias: false })
    if (!canvas || !gl) return

    const prog = gl.createProgram()
    for (const [type, src] of [
      [gl.VERTEX_SHADER, VERT],
      [gl.FRAGMENT_SHADER, FRAG],
    ] as const) {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, src)
      gl.compileShader(shader)
      gl.attachShader(prog, shader)
    }
    gl.bindAttribLocation(prog, 0, "p")
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn("Silk:", gl.getProgramInfoLog(prog))
      return
    }
    gl.useProgram(prog)

    // Eén driehoek die het hele beeld bedekt.
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, "r")
    const uTime = gl.getUniformLocation(prog, "t")
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches
    let raf = 0

    const draw = (ms: number) => {
      // Halve resolutie: het beeld is toch zacht, en het scheelt driekwart
      // van de pixels.
      const w = canvas.clientWidth >> 1
      const h = canvas.clientHeight >> 1
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
      gl.uniform2f(uRes, w, h)
      gl.uniform1f(uTime, ms / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (!still) raf = requestAnimationFrame(draw)
    }

    // Alleen tekenen zolang de hero in beeld is.
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf)
      if (entry.isIntersecting) raf = requestAnimationFrame(draw)
    })
    io.observe(canvas)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className={className} />
}
