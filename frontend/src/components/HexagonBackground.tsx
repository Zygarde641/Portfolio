'use client'

import { useEffect, useRef, useState } from 'react'

export default function HexagonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const scrollRef = useRef(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setIsMobile(window.innerWidth < 768)
    }
    resize()
    window.addEventListener('resize', resize)

    // Hexagon grid settings - visible size
    const hexSize = isMobile ? 40 : 28
    const hexHeight = hexSize * Math.sqrt(3)
    const hexWidth = hexSize * 2
    const cols = Math.ceil(canvas.width / (hexWidth * 0.75)) + 2
    const rows = Math.ceil(canvas.height / hexHeight) + 2

    // Create hexagons with 3D properties
    interface Hexagon {
      x: number
      y: number
      col: number
      row: number
      elevation: number
      targetElevation: number
      baseElevation: number
    }

    const hexagons: Hexagon[] = []
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * hexWidth * 0.75
        const y = row * hexHeight + (col % 2 === 1 ? hexHeight / 2 : 0)
        hexagons.push({
          x,
          y,
          col,
          row,
          elevation: 0,
          targetElevation: 0,
          baseElevation: 0,
        })
      }
    }

    const draw3DHexagon = (x: number, y: number, size: number, elevation: number) => {
      const depth = elevation * 10

      // Skip if not visible
      if (y < -50 || y > canvas.height + 50) return

      // Only draw if elevation is significant (wave or mouse hover)
      if (elevation < 0.1) return

      // Draw side faces for 3D effect
      if (depth > 0.5) {
        for (let i = 0; i < 6; i++) {
          const angle1 = (Math.PI / 3) * i - Math.PI / 6
          const angle2 = (Math.PI / 3) * ((i + 1) % 6) - Math.PI / 6
          
          const x1 = x + size * Math.cos(angle1)
          const y1 = y + size * Math.sin(angle1)
          const x2 = x + size * Math.cos(angle2)
          const y2 = y + size * Math.sin(angle2)

          // Only draw visible sides
          if (i >= 2 && i <= 4) {
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.lineTo(x2, y2 + depth)
            ctx.lineTo(x1, y1 + depth)
            ctx.closePath()
            
            const sideBrightness = elevation * 40
            ctx.fillStyle = `rgb(${sideBrightness}, ${sideBrightness * 0.25}, ${sideBrightness * 0.25})`
            ctx.fill()
            ctx.strokeStyle = `rgba(255, 51, 51, ${elevation * 0.3})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Draw top face
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6
        const hx = x + size * Math.cos(angle)
        const hy = y + size * Math.sin(angle) - depth
        if (i === 0) ctx.moveTo(hx, hy)
        else ctx.lineTo(hx, hy)
      }
      ctx.closePath()

      // Top face - only visible when elevated (wave/hover)
      const topBrightness = elevation * 60
      ctx.fillStyle = `rgb(${topBrightness}, ${topBrightness * 0.2}, ${topBrightness * 0.2})`
      ctx.fill()
      
      ctx.strokeStyle = `rgba(255, 51, 51, ${elevation * 0.5})`
      ctx.lineWidth = 0.5 + elevation * 0.8
      ctx.stroke()
    }

    let animationId: number

    const animate = () => {
      time += 0.02
      
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const mouse = mouseRef.current
      const hoverRadius = isMobile ? 0 : 250

      hexagons.forEach((hex) => {
        // Wave animation - breathing effect
        const waveX = Math.sin(time * 0.8 + hex.col * 0.25) * 0.25
        const waveY = Math.cos(time * 0.6 + hex.row * 0.15) * 0.25
        hex.baseElevation = (waveX + waveY + 0.5) * 0.5

        // Calculate distance from mouse
        const dx = hex.x - mouse.x
        const dy = hex.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Set target elevation based on mouse proximity
        if (dist < hoverRadius) {
          const intensity = Math.pow(1 - dist / hoverRadius, 1.5)
          hex.targetElevation = hex.baseElevation + intensity * 1.5
        } else {
          hex.targetElevation = hex.baseElevation
        }

        // Smooth interpolation
        hex.elevation += (hex.targetElevation - hex.elevation) * 0.08

        draw3DHexagon(hex.x, hex.y, hexSize - 1, hex.elevation)
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleScroll = () => {
      scrollRef.current = window.scrollY
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationId)
    }
  }, [isMobile])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}
