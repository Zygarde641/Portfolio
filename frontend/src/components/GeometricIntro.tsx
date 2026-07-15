'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useMusicContext } from './MusicPlayer'

interface GeometricIntroProps {
  onEnter: () => void
}

interface Vertex {
  x: number
  y: number
  z: number
}

interface Triangle {
  v1: number
  v2: number
  v3: number
}

const NAME = 'ARJUN SRIVASTAVA'

export default function GeometricIntro({ onEnter }: GeometricIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { getAudioData, isPlaying } = useMusicContext()
  const [isHovering, setIsHovering] = useState(false)
  const timeRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const rotationRef = useRef({ x: 0, y: 0 })
  const targetRotationRef = useRef({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const smoothedAudioRef = useRef<number[]>(new Array(128).fill(0))
  // Mirror isPlaying into a ref so the draw loop reads it without rebuilding the scene
  const isPlayingRef = useRef(isPlaying)
  isPlayingRef.current = isPlaying

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setIsMobile(window.innerWidth < 768)
    }
    resize()
    window.addEventListener('resize', resize)

    // Create icosahedron vertices
    const phi = (1 + Math.sqrt(5)) / 2
    const baseVertices: Vertex[] = [
      { x: 0, y: 1, z: phi }, { x: 0, y: -1, z: phi }, { x: 0, y: 1, z: -phi }, { x: 0, y: -1, z: -phi },
      { x: 1, y: phi, z: 0 }, { x: -1, y: phi, z: 0 }, { x: 1, y: -phi, z: 0 }, { x: -1, y: -phi, z: 0 },
      { x: phi, y: 0, z: 1 }, { x: -phi, y: 0, z: 1 }, { x: phi, y: 0, z: -1 }, { x: -phi, y: 0, z: -1 }
    ]

    // Normalize vertices
    baseVertices.forEach(v => {
      const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z)
      v.x /= len; v.y /= len; v.z /= len
    })

    // Icosahedron faces
    const baseFaces: Triangle[] = [
      { v1: 0, v2: 1, v3: 8 }, { v1: 0, v2: 8, v3: 4 }, { v1: 0, v2: 4, v3: 5 }, { v1: 0, v2: 5, v3: 9 }, { v1: 0, v2: 9, v3: 1 },
      { v1: 1, v2: 6, v3: 8 }, { v1: 8, v2: 6, v3: 10 }, { v1: 8, v2: 10, v3: 4 }, { v1: 4, v2: 10, v3: 2 }, { v1: 4, v2: 2, v3: 5 },
      { v1: 5, v2: 2, v3: 11 }, { v1: 5, v2: 11, v3: 9 }, { v1: 9, v2: 11, v3: 7 }, { v1: 9, v2: 7, v3: 1 }, { v1: 1, v2: 7, v3: 6 },
      { v1: 3, v2: 6, v3: 7 }, { v1: 3, v2: 7, v3: 11 }, { v1: 3, v2: 11, v3: 2 }, { v1: 3, v2: 2, v3: 10 }, { v1: 3, v2: 10, v3: 6 }
    ]

    // Subdivide for geodesic sphere
    const subdivide = (vertices: Vertex[], faces: Triangle[], iterations: number) => {
      let verts = [...vertices]
      let tris = [...faces]

      for (let i = 0; i < iterations; i++) {
        const newTris: Triangle[] = []
        const midpointCache: { [key: string]: number } = {}

        const getMidpoint = (i1: number, i2: number): number => {
          const key = i1 < i2 ? `${i1}_${i2}` : `${i2}_${i1}`
          if (midpointCache[key] !== undefined) return midpointCache[key]

          const v1 = verts[i1], v2 = verts[i2]
          const mid = { x: (v1.x + v2.x) / 2, y: (v1.y + v2.y) / 2, z: (v1.z + v2.z) / 2 }
          const len = Math.sqrt(mid.x * mid.x + mid.y * mid.y + mid.z * mid.z)
          mid.x /= len; mid.y /= len; mid.z /= len

          const idx = verts.length
          verts.push(mid)
          midpointCache[key] = idx
          return idx
        }

        tris.forEach(tri => {
          const a = getMidpoint(tri.v1, tri.v2)
          const b = getMidpoint(tri.v2, tri.v3)
          const c = getMidpoint(tri.v3, tri.v1)
          newTris.push({ v1: tri.v1, v2: a, v3: c }, { v1: a, v2: tri.v2, v3: b }, { v1: c, v2: b, v3: tri.v3 }, { v1: a, v2: b, v3: c })
        })
        tris = newTris
      }
      return { vertices: verts, faces: tris }
    }

    const subdivisions = isMobile ? 1 : 2
    const { vertices, faces } = subdivide(baseVertices, baseFaces, subdivisions)

    // Twinkling background stars
    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 1.2 + 0.3, p: Math.random() * 6.28
    }))

    // Audio-reactive angle samples, used to draw Saturn-style rings around the sphere
    const barCount = isMobile ? 64 : 128
    const angles: number[] = []
    for (let i = 0; i < barCount; i++) {
      angles.push((i / barCount) * Math.PI * 2 - Math.PI / 2)
    }

    // Tilted ellipse rings, like Saturn's rings seen at an angle.
    // BASE_TILT/BASE_SQUASH are the resting orientation; the cursor nudges them each frame.
    const BASE_TILT = -0.38
    const BASE_SQUASH = 0.28
    const RING_BANDS = [
      { mult: 1.32, intensity: 0.5 },
      { mult: 1.55, intensity: 0.66 },
      { mult: 1.80, intensity: 0.8 },
      { mult: 2.06, intensity: 0.9 },
      { mult: 2.34, intensity: 1 }
    ]

    // Beat detection
    let lastBassLevel = 0
    let beatDecay = 0

    let animationId: number

    const animate = () => {
      if (!reduceMotion) timeRef.current += 0.012

      // Sphere sits in the upper zone; the name stack owns the lower 40%
      const centerX = canvas.width / 2
      const centerY = canvas.height * 0.36
      const baseRadius = Math.min(isMobile ? 80 : 100, canvas.height * 0.13)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background stars
      stars.forEach(s => {
        ctx.globalAlpha = 0.25 + 0.35 * Math.abs(Math.sin(timeRef.current + s.p))
        ctx.fillStyle = '#9a9aa2'
        ctx.fillRect(s.x * canvas.width, s.y * canvas.height, s.r, s.r)
      })
      ctx.globalAlpha = 1

      // Beat detection - react to sudden increases, not just volume
      const audioData = isPlayingRef.current ? getAudioData() : null
      let bass = lastBassLevel

      if (audioData) {
        // Get bass frequencies (avoid per-frame slice allocation)
        let bassSum = 0
        for (let i = 0; i < 8; i++) bassSum += audioData[i]
        bass = bassSum / 8 / 255

        // Detect beat (sudden increase in bass)
        const bassIncrease = bass - lastBassLevel
        if (bassIncrease > 0.1) {
          beatDecay = 1  // Trigger beat
        }
        lastBassLevel = bass * 0.8 + lastBassLevel * 0.2

        // Decay the beat effect
        beatDecay *= 0.85

        // Smooth audio data with faster response
        for (let i = 0; i < smoothedAudioRef.current.length; i++) {
          const target = audioData[i] || 0
          smoothedAudioRef.current[i] += (target - smoothedAudioRef.current[i]) * 0.5
        }
      } else {
        for (let i = 0; i < smoothedAudioRef.current.length; i++) {
          smoothedAudioRef.current[i] *= 0.9
        }
        beatDecay *= 0.9
      }

      // Mouse rotation
      const dx = mouseRef.current.x - centerX
      const dy = mouseRef.current.y - centerY
      targetRotationRef.current.y = dx * 0.0008
      targetRotationRef.current.x = dy * 0.0008

      rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.02
      rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.02

      const autoRotY = timeRef.current * 0.15
      const autoRotX = Math.sin(timeRef.current * 0.08) * 0.15

      // Ring orientation follows the cursor: horizontal cursor turns the ring plane,
      // vertical cursor opens or flattens it. Reuses the same smoothed rotation the sphere uses.
      // Tilt is clamped so it always keeps a Saturn lean and never crosses to a flat horizontal band.
      const ringTilt = Math.max(-0.85, Math.min(-0.24, BASE_TILT + rotationRef.current.y * 1.6))
      const ringSquash = Math.max(0.2, Math.min(0.5, BASE_SQUASH + rotationRef.current.x * 1.1))
      const cosT = Math.cos(ringTilt), sinT = Math.sin(ringTilt)

      // Audio reactivity - beat-based bounce
      const pulseScale = 1 + beatDecay * 0.25
      const currentRadius = baseRadius * pulseScale

      // Ambient glow bloom behind the sphere — layered for a deeper, atmospheric mood
      const glowR = currentRadius * (2.6 + bass * 1.0)
      const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowR)
      glow.addColorStop(0, `rgba(255, 0, 0, ${0.2 + bass * 0.26})`)
      glow.addColorStop(0.35, `rgba(200, 0, 0, ${0.1 + bass * 0.16})`)
      glow.addColorStop(1, 'rgba(110, 0, 0, 0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(centerX, centerY, glowR, 0, Math.PI * 2)
      ctx.fill()

      // Saturn-style rings: the audio waveform bends around a tilted ellipse instead of radial spikes.
      // The frequency sample scrolls around the ring over time so the waveform visibly travels and ripples.
      // Each ring is one continuous closed loop; a linear gradient shades it smoothly from dark (far/back)
      // to light (near/front), and the loop is split into back/front passes so it weaves through the planet.
      const n = smoothedAudioRef.current.length
      const projectRing = (ri: number, mult: number) => {
        const baseR = baseRadius * mult
        const pts: { x: number; y: number; df: number }[] = []
        for (let i = 0; i < angles.length; i++) {
          const angle = angles[i]
          const df = (Math.sin(angle) + 1) / 2 // 0 = farthest back, 1 = nearest front
          const di = Math.floor((i * 1.3 + timeRef.current * 26 + ri * 47) % (n * 0.55))
          const amp = (smoothedAudioRef.current[di] || 0) / 255
          const rad = baseR + amp * baseRadius * (0.4 + ri * 0.12) * (0.82 + 0.18 * df) * (1 + beatDecay * 1.6)
          const x0 = Math.cos(angle) * rad
          const y0 = Math.sin(angle) * rad * ringSquash
          pts.push({ x: centerX + x0 * cosT - y0 * sinT, y: centerY + x0 * sinT + y0 * cosT, df })
        }
        return pts
      }
      // Screen point at a fixed extreme angle (no audio wobble) — anchors the depth gradient.
      const anchor = (mult: number, front: boolean) => {
        const baseR = baseRadius * mult
        const angle = front ? Math.PI / 2 : -Math.PI / 2
        const x0 = Math.cos(angle) * baseR
        const y0 = Math.sin(angle) * baseR * ringSquash
        return { x: centerX + x0 * cosT - y0 * sinT, y: centerY + x0 * sinT + y0 * cosT }
      }
      const ringsPts = RING_BANDS.map((b, ri) => projectRing(ri, b.mult))

      const strokePass = (wantFront: boolean) => {
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.shadowColor = 'rgba(255, 0, 0, 0.85)'
        RING_BANDS.forEach((b, ri) => {
          const pts = ringsPts[ri]
          const pB = anchor(b.mult, false)
          const pF = anchor(b.mult, true)
          const level = (0.45 + 0.55 * bass) * b.intensity
          const g = ctx.createLinearGradient(pB.x, pB.y, pF.x, pF.y)
          g.addColorStop(0, `rgba(140, 0, 0, ${Math.min(1, 0.22 * level + 0.12)})`)
          g.addColorStop(0.5, `rgba(200, 0, 0, ${Math.min(1, 0.5 * level + 0.14)})`)
          g.addColorStop(1, `rgba(255, 0, 0, ${Math.min(1, 0.95 * level + 0.16)})`)
          ctx.strokeStyle = g
          ctx.lineWidth = (wantFront ? 2.8 : 1.9) + beatDecay * 1.6
          ctx.shadowBlur = (wantFront ? 14 : 6) + beatDecay * 16
          ctx.beginPath()
          const N = pts.length
          for (let k = 0; k < N; k++) {
            const a = pts[k], c = pts[(k + 1) % N]
            const isFront = (a.df + c.df) / 2 >= 0.5
            if (isFront !== wantFront) continue
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(c.x, c.y)
          }
          ctx.stroke()
        })
        ctx.shadowBlur = 0
      }

      // Back half of every ring passes behind the sphere
      strokePass(false)

      // Transform vertices
      const rotX = rotationRef.current.x + autoRotX
      const rotY = rotationRef.current.y + autoRotY
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX)

      const transformed = vertices.map(v => {
        const x1 = v.x * cosY - v.z * sinY
        const z1 = v.x * sinY + v.z * cosY
        const y1 = v.y * cosX - z1 * sinX
        const z2 = v.y * sinX + z1 * cosX
        return { x: x1, y: y1, z: z2 }
      })

      // Collect edges with depth
      const edgeSet = new Set<string>()
      const edges: { x1: number; y1: number; x2: number; y2: number; z: number }[] = []

      faces.forEach(face => {
        const pairs = [[face.v1, face.v2], [face.v2, face.v3], [face.v3, face.v1]]
        pairs.forEach(([i1, i2]) => {
          const key = i1 < i2 ? `${i1}_${i2}` : `${i2}_${i1}`
          if (!edgeSet.has(key)) {
            edgeSet.add(key)
            const v1 = transformed[i1], v2 = transformed[i2]
            edges.push({
              x1: centerX + v1.x * currentRadius,
              y1: centerY + v1.y * currentRadius,
              x2: centerX + v2.x * currentRadius,
              y2: centerY + v2.y * currentRadius,
              z: (v1.z + v2.z) / 2
            })
          }
        })
      })

      // Sort by depth
      edges.sort((a, b) => a.z - b.z)

      // Draw triangular faces first (back to front) - ALL RED
      const sortedFaces = faces.map(face => {
        const v1 = transformed[face.v1], v2 = transformed[face.v2], v3 = transformed[face.v3]
        return { face, avgZ: (v1.z + v2.z + v3.z) / 3, v1, v2, v3 }
      }).sort((a, b) => a.avgZ - b.avgZ)

      sortedFaces.forEach(({ avgZ, v1, v2, v3 }) => {
        const depthFactor = (avgZ + 1) / 2

        ctx.beginPath()
        ctx.moveTo(centerX + v1.x * currentRadius, centerY + v1.y * currentRadius)
        ctx.lineTo(centerX + v2.x * currentRadius, centerY + v2.y * currentRadius)
        ctx.lineTo(centerX + v3.x * currentRadius, centerY + v3.y * currentRadius)
        ctx.closePath()

        // Pure red fill - darker in back, brighter in front (matches the rings)
        const brightness = 24 + depthFactor * 52
        ctx.fillStyle = `rgba(${brightness}, 0, 0, ${0.5 + depthFactor * 0.42})`
        ctx.fill()
      })

      // Draw edges - pure red, dark (back) to #ff0000 (front), same ramp as the rings
      edges.forEach(edge => {
        const depthFactor = (edge.z + 1) / 2
        const alpha = 0.3 + depthFactor * 0.7
        const r = Math.floor(140 + depthFactor * 115)

        ctx.beginPath()
        ctx.moveTo(edge.x1, edge.y1)
        ctx.lineTo(edge.x2, edge.y2)
        ctx.strokeStyle = `rgba(${r}, 0, 0, ${alpha})`
        ctx.lineWidth = 0.5 + depthFactor * 1
        ctx.stroke()
      })

      // Draw vertices as pure red dots
      transformed.forEach(v => {
        const depthFactor = (v.z + 1) / 2
        if (depthFactor > 0.35) {
          const screenX = centerX + v.x * currentRadius
          const screenY = centerY + v.y * currentRadius
          ctx.beginPath()
          ctx.arc(screenX, screenY, 1.5 + depthFactor * 1.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 0, 0, ${0.5 + depthFactor * 0.4})`
          ctx.fill()
        }
      })

      // Inner core glow — offset toward upper-left to fake a light source and give the sphere volume
      const lightX = centerX - currentRadius * 0.28
      const lightY = centerY - currentRadius * 0.32
      const gradient = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, currentRadius * 0.85)
      gradient.addColorStop(0, `rgba(255, 0, 0, ${0.28 + bass * 0.18})`)
      gradient.addColorStop(0.5, 'rgba(210, 0, 0, 0.10)')
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2)
      ctx.fill()

      // Front half of every ring, drawn last so it crosses over the sphere
      strokePass(true)

      if (!reduceMotion) animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    if (!reduceMotion) window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [isMobile, getAudioData])

  return (
    <div className="absolute inset-0 overflow-hidden z-20">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Name + CTA stack — owns the zone below the sphere */}
      <div className="absolute inset-x-0 top-[58%] bottom-0 z-30 flex flex-col items-center px-6 pointer-events-none">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="font-mono text-[10px] md:text-xs tracking-[0.35em] text-neutral-500 mb-3"
        >
          PORTFOLIO — 2026
        </motion.p>

        <h1
          aria-label={NAME}
          className="font-display font-extrabold uppercase text-white text-center leading-[0.9] tracking-wide text-[clamp(2.75rem,9vw,6.5rem)] select-none"
        >
          {NAME.split('').map((ch, i) => (
            <motion.span
              key={i}
              aria-hidden
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.035, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {ch === ' ' ? '\u00A0' : ch}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.6 }}
          className="font-mono text-[10px] md:text-sm tracking-[0.25em] text-red-500 mt-3"
        >
          FULL-STACK DEVELOPER · DEVOPS · AI/ML
        </motion.p>

        <motion.button
          onClick={onEnter}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: 1,
            y: 0,
            boxShadow: isHovering
              ? '0 0 36px rgba(255, 51, 51, 0.45)'
              : '0 0 16px rgba(255, 51, 51, 0.2)',
          }}
          transition={{ delay: 1.35, duration: 0.5 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group pointer-events-auto relative mt-7 md:mt-9 px-10 md:px-14 py-3.5 border border-red-500/70 bg-black/60 cursor-pointer"
        >
          {/* Corner ticks */}
          <span className="absolute -top-px -left-px w-2.5 h-2.5 border-t-2 border-l-2 border-red-500 transition-all duration-300 group-hover:w-4 group-hover:h-4" />
          <span className="absolute -top-px -right-px w-2.5 h-2.5 border-t-2 border-r-2 border-red-500 transition-all duration-300 group-hover:w-4 group-hover:h-4" />
          <span className="absolute -bottom-px -left-px w-2.5 h-2.5 border-b-2 border-l-2 border-red-500 transition-all duration-300 group-hover:w-4 group-hover:h-4" />
          <span className="absolute -bottom-px -right-px w-2.5 h-2.5 border-b-2 border-r-2 border-red-500 transition-all duration-300 group-hover:w-4 group-hover:h-4" />

          <span className="font-mono text-red-500 text-sm md:text-base tracking-[0.3em]">
            ▸ LET&apos;S BEGIN
          </span>
        </motion.button>
      </div>

      {/* Corner brackets */}
      <div className="hidden md:block absolute top-8 left-8 w-14 h-14 border-l-2 border-t-2 border-red-500/25" />
      <div className="hidden md:block absolute top-8 right-8 w-14 h-14 border-r-2 border-t-2 border-red-500/25" />
      <div className="hidden md:block absolute bottom-8 left-8 w-14 h-14 border-l-2 border-b-2 border-red-500/25" />
      <div className="hidden md:block absolute bottom-8 right-8 w-14 h-14 border-r-2 border-b-2 border-red-500/25" />

      {/* Corner readouts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="hidden md:block"
      >
        <p className="absolute top-11 left-16 font-mono text-[10px] tracking-[0.25em] text-neutral-600">
          ARJUN SRIVASTAVA — PORTFOLIO
        </p>
        <p
          className={`absolute top-11 right-16 font-mono text-[10px] tracking-[0.25em] ${
            isPlaying ? 'text-red-500' : 'text-neutral-600'
          }`}
        >
          {isPlaying ? '● SIGNAL LIVE' : '○ SIGNAL MUTED'}
        </p>
        <p className="absolute bottom-11 left-16 font-mono text-[10px] tracking-[0.25em] text-neutral-600">
          EST. 2022 — CHANDIGARH, IN
        </p>
      </motion.div>

      {!isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-neutral-600 text-[10px] md:text-xs tracking-widest text-center px-4"
        >
          TAP ANYWHERE TO ENABLE MUSIC
        </motion.div>
      )}
    </div>
  )
}
