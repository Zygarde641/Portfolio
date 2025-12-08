'use client'

import { useEffect, useRef, useState } from 'react'

interface Shape3D {
  x: number
  y: number
  z: number
  baseX: number
  baseY: number
  size: number
  rotationX: number
  rotationY: number
  rotationZ: number
  rotSpeedX: number
  rotSpeedY: number
  rotSpeedZ: number
  type: 'tetrahedron' | 'cube' | 'octahedron'
  vertices: { x: number; y: number; z: number }[]
  edges: [number, number][]
}

export default function FloatingSpheres() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
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

    // 3D shape definitions
    const createTetrahedron = (size: number) => ({
      vertices: [
        { x: 0, y: -size, z: 0 },
        { x: size * 0.94, y: size * 0.33, z: 0 },
        { x: -size * 0.47, y: size * 0.33, z: size * 0.82 },
        { x: -size * 0.47, y: size * 0.33, z: -size * 0.82 },
      ],
      edges: [[0, 1], [0, 2], [0, 3], [1, 2], [2, 3], [3, 1]] as [number, number][]
    })

    const createCube = (size: number) => ({
      vertices: [
        { x: -size, y: -size, z: -size }, { x: size, y: -size, z: -size },
        { x: size, y: size, z: -size }, { x: -size, y: size, z: -size },
        { x: -size, y: -size, z: size }, { x: size, y: -size, z: size },
        { x: size, y: size, z: size }, { x: -size, y: size, z: size },
      ],
      edges: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]] as [number, number][]
    })

    const createOctahedron = (size: number) => ({
      vertices: [
        { x: 0, y: -size, z: 0 }, { x: 0, y: size, z: 0 },
        { x: size, y: 0, z: 0 }, { x: -size, y: 0, z: 0 },
        { x: 0, y: 0, z: size }, { x: 0, y: 0, z: -size },
      ],
      edges: [[0, 2], [0, 3], [0, 4], [0, 5], [1, 2], [1, 3], [1, 4], [1, 5], [2, 4], [4, 3], [3, 5], [5, 2]] as [number, number][]
    })

    // Create shapes
    const shapeCount = isMobile ? 12 : 25
    const shapes: Shape3D[] = []
    const types: Shape3D['type'][] = ['tetrahedron', 'cube', 'octahedron']

    for (let i = 0; i < shapeCount; i++) {
      const type = types[Math.floor(Math.random() * types.length)]
      const size = Math.random() * 20 + 12
      const baseX = Math.random() * canvas.width
      const baseY = Math.random() * canvas.height
      
      let shapeData
      switch (type) {
        case 'tetrahedron': shapeData = createTetrahedron(size); break
        case 'cube': shapeData = createCube(size * 0.7); break
        case 'octahedron': shapeData = createOctahedron(size); break
      }

      shapes.push({
        x: baseX,
        y: baseY,
        z: Math.random() * 200 - 100,
        baseX,
        baseY,
        size,
        rotationX: Math.random() * Math.PI * 2,
        rotationY: Math.random() * Math.PI * 2,
        rotationZ: Math.random() * Math.PI * 2,
        rotSpeedX: (Math.random() - 0.5) * 0.008,
        rotSpeedY: (Math.random() - 0.5) * 0.008,
        rotSpeedZ: (Math.random() - 0.5) * 0.005,
        type,
        ...shapeData
      })
    }

    const rotatePoint = (point: { x: number; y: number; z: number }, rx: number, ry: number, rz: number) => {
      let { x, y, z } = point
      // Rotate X
      const cosX = Math.cos(rx), sinX = Math.sin(rx)
      const y1 = y * cosX - z * sinX, z1 = y * sinX + z * cosX
      // Rotate Y
      const cosY = Math.cos(ry), sinY = Math.sin(ry)
      const x2 = x * cosY + z1 * sinY, z2 = -x * sinY + z1 * cosY
      // Rotate Z
      const cosZ = Math.cos(rz), sinZ = Math.sin(rz)
      const x3 = x2 * cosZ - y1 * sinZ, y3 = x2 * sinZ + y1 * cosZ
      return { x: x3, y: y3, z: z2 }
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mouse = mouseRef.current

      shapes.forEach((shape) => {
        // Mouse repel interaction
        const dx = shape.x - mouse.x
        const dy = shape.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const repelRadius = 150

        if (dist < repelRadius && dist > 0) {
          const force = Math.pow(1 - dist / repelRadius, 2) * 80
          shape.x += (dx / dist) * force * 0.1
          shape.y += (dy / dist) * force * 0.1
        } else {
          // Return to base position
          shape.x += (shape.baseX - shape.x) * 0.02
          shape.y += (shape.baseY - shape.y) * 0.02
        }

        // Rotate shape
        shape.rotationX += shape.rotSpeedX
        shape.rotationY += shape.rotSpeedY
        shape.rotationZ += shape.rotSpeedZ

        // Transform and project vertices
        const projected = shape.vertices.map(v => {
          const rotated = rotatePoint(v, shape.rotationX, shape.rotationY, shape.rotationZ)
          const scale = 300 / (300 + rotated.z + shape.z)
          return {
            x: shape.x + rotated.x * scale,
            y: shape.y + rotated.y * scale,
            z: rotated.z
          }
        })

        // Calculate average z for opacity
        const avgZ = projected.reduce((sum, v) => sum + v.z, 0) / projected.length
        const depthAlpha = 0.15 + (avgZ + shape.size) / (shape.size * 2) * 0.25

        // Draw edges
        shape.edges.forEach(([i1, i2]) => {
          const v1 = projected[i1], v2 = projected[i2]
          const edgeZ = (v1.z + v2.z) / 2
          const edgeAlpha = depthAlpha + (edgeZ + shape.size) / (shape.size * 2) * 0.2

          ctx.beginPath()
          ctx.moveTo(v1.x, v1.y)
          ctx.lineTo(v2.x, v2.y)
          ctx.strokeStyle = `rgba(255, 60, 60, ${Math.max(0.1, Math.min(0.5, edgeAlpha))})`
          ctx.lineWidth = 1
          ctx.stroke()
        })

        // Draw vertices
        projected.forEach(v => {
          const vertAlpha = depthAlpha + (v.z + shape.size) / (shape.size * 2) * 0.15
          ctx.beginPath()
          ctx.arc(v.x, v.y, 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 100, 100, ${Math.max(0.1, Math.min(0.6, vertAlpha))})`
          ctx.fill()
        })
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationId)
    }
  }, [isMobile])

  return (
    <>
      {/* Nebula background image */}
      <img
        src="/nebula-bg.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.6 }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />
      {/* 3D Geometric shapes canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
    </>
  )
}
