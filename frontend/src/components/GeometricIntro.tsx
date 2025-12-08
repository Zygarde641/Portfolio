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

export default function GeometricIntro({ onEnter }: GeometricIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { audioData, isPlaying } = useMusicContext()
  const [isHovering, setIsHovering] = useState(false)
  const timeRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const rotationRef = useRef({ x: 0, y: 0 })
  const targetRotationRef = useRef({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const smoothedAudioRef = useRef<number[]>(new Array(128).fill(0))

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

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
    const baseRadius = isMobile ? 80 : 100  // Smaller to fit inside music circle
    
    // Create audio bars around the circle
    const barCount = isMobile ? 64 : 128
    const bars: { angle: number; baseLength: number }[] = []
    for (let i = 0; i < barCount; i++) {
      bars.push({
        angle: (i / barCount) * Math.PI * 2 - Math.PI / 2,
        baseLength: 3
      })
    }
    
    // Beat detection
    let lastBassLevel = 0
    let beatDecay = 0

    let animationId: number

    const animate = () => {
      timeRef.current += 0.012

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2 - 50

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Beat detection - react to sudden increases, not just volume
      let currentBass = 0
      let beatMultiplier = 1
      
      if (audioData && isPlaying) {
        // Get bass frequencies
        const bassSlice = audioData.slice(0, 8)
        currentBass = bassSlice.reduce((a, b) => a + b, 0) / bassSlice.length / 255
        
        // Detect beat (sudden increase in bass)
        const bassIncrease = currentBass - lastBassLevel
        if (bassIncrease > 0.1) {
          beatDecay = 1  // Trigger beat
        }
        lastBassLevel = currentBass * 0.8 + lastBassLevel * 0.2
        
        // Decay the beat effect
        beatDecay *= 0.85
        beatMultiplier = 1 + beatDecay * 2
        
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

      // Audio reactivity - beat-based bounce
      const pulseScale = 1 + beatDecay * 0.25
      const currentRadius = baseRadius * pulseScale

      // Draw music-reactive bars around the circle FIRST (behind sphere)
      const circleRadius = baseRadius + 25  // Music circle outside sphere
      bars.forEach((bar, i) => {
        const audioIndex = Math.floor((i / bars.length) * smoothedAudioRef.current.length)
        const audioValue = smoothedAudioRef.current[audioIndex] || 0
        
        // Dramatic short spikes - all red
        const beatBoost = 1 + beatDecay * 3
        const barLength = bar.baseLength + (audioValue / 255) * 40 * beatBoost
        
        const innerX = centerX + Math.cos(bar.angle) * circleRadius
        const innerY = centerY + Math.sin(bar.angle) * circleRadius
        const outerX = centerX + Math.cos(bar.angle) * (circleRadius + barLength)
        const outerY = centerY + Math.sin(bar.angle) * (circleRadius + barLength)
        
        const intensity = (audioValue / 255) * beatBoost
        ctx.beginPath()
        ctx.moveTo(innerX, innerY)
        ctx.lineTo(outerX, outerY)
        // Pure red - no yellow
        ctx.strokeStyle = `rgba(255, ${20 + intensity * 30}, ${20 + intensity * 30}, ${0.6 + Math.min(intensity, 1) * 0.4})`
        ctx.lineWidth = 2 + intensity * 0.5
        ctx.stroke()
      })

      // Draw base circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255, 60, 60, 0.3)'
      ctx.lineWidth = 1
      ctx.stroke()

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
        
        // Dark red fill - darker in back, brighter in front
        const brightness = 20 + depthFactor * 40
        ctx.fillStyle = `rgba(${brightness}, ${brightness * 0.15}, ${brightness * 0.15}, ${0.5 + depthFactor * 0.4})`
        ctx.fill()
      })

      // Draw edges - ALL RED tones
      edges.forEach(edge => {
        const depthFactor = (edge.z + 1) / 2
        const alpha = 0.3 + depthFactor * 0.7
        
        // Red gradient: dark red (back) to bright red (front)
        const r = Math.floor(150 + depthFactor * 105)
        const g = Math.floor(30 + depthFactor * 40)
        const b = Math.floor(30 + depthFactor * 40)

        ctx.beginPath()
        ctx.moveTo(edge.x1, edge.y1)
        ctx.lineTo(edge.x2, edge.y2)
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
        ctx.lineWidth = 0.5 + depthFactor * 1
        ctx.stroke()
      })

      // Draw vertices as red dots
      transformed.forEach(v => {
        const depthFactor = (v.z + 1) / 2
        if (depthFactor > 0.35) {
          const screenX = centerX + v.x * currentRadius
          const screenY = centerY + v.y * currentRadius
          ctx.beginPath()
          ctx.arc(screenX, screenY, 1.5 + depthFactor * 1.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, ${60 + depthFactor * 60}, ${60 + depthFactor * 60}, ${0.5 + depthFactor * 0.4})`
          ctx.fill()
        }
      })

      // Inner glow
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, currentRadius * 0.5)
      gradient.addColorStop(0, 'rgba(255, 50, 50, 0.15)')
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, currentRadius * 0.5, 0, Math.PI * 2)
      ctx.fill()

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [audioData, isPlaying, isMobile])

  return (
    <div className="fixed inset-0 overflow-hidden z-20">
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {/* Click me button below the sphere */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30">
        <div className="h-56 md:h-72" />
        
        <motion.button
          onClick={onEnter}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="pointer-events-auto relative px-8 md:px-12 py-3 md:py-4 rounded-full border-2 border-red-500 bg-black/50 flex items-center justify-center cursor-pointer group mt-16 md:mt-20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: isHovering 
              ? '0 0 40px rgba(255, 51, 51, 0.5)' 
              : '0 0 20px rgba(255, 51, 51, 0.3)',
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full border border-red-500"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <span className="text-red-500 font-bold text-base md:text-lg tracking-widest z-10">
            CLICK ME
          </span>
        </motion.button>
      </div>

      {/* Corner decorations - hidden on mobile */}
      <div className="hidden md:block absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-red-500/30" />
      <div className="hidden md:block absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-red-500/30" />
      <div className="hidden md:block absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-red-500/30" />
      <div className="hidden md:block absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-red-500/30" />
      
      {!isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 text-gray-600 text-xs md:text-sm text-center px-4"
        >
          Tap anywhere to enable music
        </motion.div>
      )}
    </div>
  )
}
