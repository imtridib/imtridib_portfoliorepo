import { useEffect, useRef, useState } from 'react'

const VS_SOURCE = `
  attribute vec4 aVertexPosition;
  void main() {
    gl_Position = aVertexPosition;
  }
`

const FS_SOURCE = `
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;
  uniform float uTheme; // 0 = dark, 1 = light (animated between the two)
  uniform vec3 uBg1;
  uniform vec3 uBg2;
  uniform vec3 uLine;
  uniform vec3 uFade;

  const float overallSpeed = 0.2;
  const float gridSmoothWidth = 0.015;
  const float axisWidth = 0.05;
  const float majorLineWidth = 0.025;
  const float minorLineWidth = 0.0125;
  const float majorLineFrequency = 5.0;
  const float minorLineFrequency = 1.0;
  const vec4 gridColor = vec4(0.5);
  const float scale = 5.0;
  const float minLineWidth = 0.01;
  const float maxLineWidth = 0.2;
  const float lineSpeed = 1.0 * overallSpeed;
  const float lineAmplitude = 1.0;
  const float lineFrequency = 0.2;
  const float warpSpeed = 0.2 * overallSpeed;
  const float warpFrequency = 0.5;
  const float warpAmplitude = 1.0;
  const float offsetFrequency = 0.5;
  const float offsetSpeed = 1.33 * overallSpeed;
  const float minOffsetSpread = 0.6;
  const float maxOffsetSpread = 2.0;
  const int linesPerGroup = 16;

  #define drawCircle(pos, radius, coord) smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
  #define drawSmoothLine(pos, halfWidth, t) smoothstep(halfWidth, 0.0, abs(pos - (t)))
  #define drawCrispLine(pos, halfWidth, t) smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))
  #define drawPeriodicLine(freq, width, t) drawCrispLine(freq / 2.0, width, abs(mod(t, freq) - (freq) / 2.0))

  float drawGridLines(float axis) {
    return drawCrispLine(0.0, axisWidth, axis)
          + drawPeriodicLine(majorLineFrequency, majorLineWidth, axis)
          + drawPeriodicLine(minorLineFrequency, minorLineWidth, axis);
  }

  float drawGrid(vec2 space) {
    return min(1.0, drawGridLines(space.x) + drawGridLines(space.y));
  }

  float random(float t) {
    return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
  }

  float getPlasmaY(float x, float horizontalFade, float offset) {
    return random(x * lineFrequency + iTime * lineSpeed) * horizontalFade * lineAmplitude + offset;
  }

  void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 uv = fragCoord.xy / iResolution.xy;
    vec2 space = (fragCoord - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;

    float horizontalFade = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);
    float verticalFade = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);

    space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + horizontalFade);
    space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * horizontalFade;

    float lineAmount = 0.0;

    for(int l = 0; l < linesPerGroup; l++) {
      float normalizedLineIndex = float(l) / float(linesPerGroup);
      float offsetTime = iTime * offsetSpeed;
      float offsetPosition = float(l) + space.x * offsetFrequency;
      float rand = random(offsetPosition + offsetTime) * 0.5 + 0.5;
      float halfWidth = mix(minLineWidth, maxLineWidth, rand * horizontalFade) / 2.0;
      float offset = random(offsetPosition + offsetTime * (1.0 + normalizedLineIndex)) * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);
      float linePosition = getPlasmaY(space.x, horizontalFade, offset);
      float line = drawSmoothLine(linePosition, halfWidth, space.y) / 2.0 + drawCrispLine(linePosition, halfWidth * 0.15, space.y);

      float circleX = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
      vec2 circlePosition = vec2(circleX, getPlasmaY(circleX, horizontalFade, offset));
      float circle = drawCircle(circlePosition, 0.01, space) * 4.0;

      line = line + circle;
      lineAmount += line * rand;
    }

    vec3 bg = mix(uBg1, uBg2, uv.x);
    bg = mix(uFade, bg, verticalFade); // edges fade into the page colour

    // Dark: light is ADDED to a dark background (glow). Light: ink is mixed INTO a pale background.
    vec3 darkCol = bg + lineAmount * uLine;
    vec3 lightCol = mix(bg, uLine, clamp(lineAmount * 0.75, 0.0, 0.85));

    gl_FragColor = vec4(mix(darkCol, lightCol, uTheme), 1.0);
  }
`

type Vec3 = readonly [number, number, number]

/** Edit these to restyle the backdrop. Values are RGB from 0 to 1. */
const PALETTES = {
  dark: {
    bg1: [0.1, 0.1, 0.3] as Vec3, // left side of the background
    bg2: [0.3, 0.1, 0.5] as Vec3, // right side of the background
    line: [0.4, 0.2, 0.8] as Vec3, // glowing lines
    fade: [0, 0, 0] as Vec3, // top/bottom edges fade to this (match your page colour)
  },
  light: {
    bg1: [0.89, 0.92, 1.0] as Vec3,
    bg2: [0.96, 0.9, 1.0] as Vec3,
    line: [0.42, 0.3, 0.88] as Vec3,
    fade: [0.957, 0.957, 0.937] as Vec3, // = #F4F4EF, the light page colour
  },
}

const lerp3 = (a: Vec3, b: Vec3, t: number): Vec3 => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
]

function loadShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error: ', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function initShaderProgram(gl: WebGLRenderingContext, vs: string, fs: string): WebGLProgram | null {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vs)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fs)
  if (!vertexShader || !fragmentShader) return null

  const program = gl.createProgram()
  if (!program) return null
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Shader program link error: ', gl.getProgramInfoLog(program))
    return null
  }
  return program
}

interface Props {
  /** how much the page colour is laid over the backdrop in dark mode (0 to 1) */
  dim?: number
  /** same, in light mode. Higher keeps dark text easy to read. */
  dimLight?: number
  /** internal render size relative to the screen. Lower = lighter on the GPU, 1 = sharpest. */
  resolutionScale?: number
  className?: string
}

const isLightTheme = () => document.documentElement.getAttribute('data-theme') === 'light'

export default function ShaderBackground({
  dim = 0.35,
  dimLight = 0.5,
  resolutionScale = 0.75,
  className = '',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Only used to pick the overlay strength; the canvas itself is never re-created
  const [light, setLight] = useState(isLightTheme)
  useEffect(() => {
    const mo = new MutationObserver(() => setLight(isLightTheme()))
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => mo.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) {
      console.warn('WebGL not supported.')
      return
    }

    const program = initShaderProgram(gl, VS_SOURCE, FS_SOURCE)
    if (!program) return

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const positionLoc = gl.getAttribLocation(program, 'aVertexPosition')
    const resolutionLoc = gl.getUniformLocation(program, 'iResolution')
    const timeLoc = gl.getUniformLocation(program, 'iTime')
    const themeLoc = gl.getUniformLocation(program, 'uTheme')
    const bg1Loc = gl.getUniformLocation(program, 'uBg1')
    const bg2Loc = gl.getUniformLocation(program, 'uBg2')
    const lineLoc = gl.getUniformLocation(program, 'uLine')
    const fadeLoc = gl.getUniformLocation(program, 'uFade')

    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    const STILL_FRAME_TIME = 4

    // theme: 0 = dark, 1 = light. It glides towards `target` so switching modes fades smoothly.
    let theme = isLightTheme() ? 1 : 0
    let target = theme

    const setVec3 = (loc: WebGLUniformLocation | null, v: Vec3) => gl.uniform3f(loc, v[0], v[1], v[2])

    const resize = () => {
      canvas.width = Math.max(1, Math.round(window.innerWidth * resolutionScale))
      canvas.height = Math.max(1, Math.round(window.innerHeight * resolutionScale))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const draw = (seconds: number) => {
      gl.useProgram(program)
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height)
      gl.uniform1f(timeLoc, seconds)
      gl.uniform1f(themeLoc, theme)
      setVec3(bg1Loc, lerp3(PALETTES.dark.bg1, PALETTES.light.bg1, theme))
      setVec3(bg2Loc, lerp3(PALETTES.dark.bg2, PALETTES.light.bg2, theme))
      setVec3(lineLoc, lerp3(PALETTES.dark.line, PALETTES.light.line, theme))
      setVec3(fadeLoc, lerp3(PALETTES.dark.fade, PALETTES.light.fade, theme))
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(positionLoc)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    let raf = 0
    const startTime = performance.now()
    let lastFrame = startTime
    const loop = (now: number) => {
      const dt = Math.min(now - lastFrame, 50)
      lastFrame = now
      theme += (target - theme) * (1 - Math.exp(-dt / 180)) // ~0.5s fade between the two looks
      if (Math.abs(target - theme) < 0.002) theme = target
      draw((now - startTime) / 1000)
      raf = requestAnimationFrame(loop)
    }

    // Watch the dark/light switch
    const mo = new MutationObserver(() => {
      target = isLightTheme() ? 1 : 0
      if (reduceMotion) {
        theme = target // no animation: jump straight to the new look
        draw(STILL_FRAME_TIME)
      }
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const onResize = () => {
      resize()
      if (reduceMotion) draw(STILL_FRAME_TIME) // resizing clears the canvas
    }
    window.addEventListener('resize', onResize)
    resize()
    if (reduceMotion) draw(STILL_FRAME_TIME)
    else raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      mo.disconnect()
      window.removeEventListener('resize', onResize)
      gl.deleteBuffer(positionBuffer)
      gl.deleteProgram(program)
    }
  }, [resolutionScale])

  // -z-10 = behind all page content. This layer must come BEFORE <TubesCursor /> in App.tsx.
  // The overlay uses the page colour (--bg), so it darkens in dark mode and lightens in light mode.
  return (
    <div className={`pointer-events-none fixed inset-0 -z-10 ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{ background: `color-mix(in srgb, var(--bg) ${(light ? dimLight : dim) * 100}%, transparent)` }}
      />
    </div>
  )
}
