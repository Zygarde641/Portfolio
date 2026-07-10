'use client'

import { useEffect, useRef } from 'react'

interface CustomCursorProps {
  disabled?: boolean  // true = hide custom cursor, show native
}

export default function CustomCursor({ disabled = false }: CustomCursorProps) {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    const trail = trailRef.current
    if (!dot || !ring || !trail) return

    // On true mobile (touch-only), always hide
    if (!window.matchMedia('(hover: hover)').matches) {
      dot.style.display = 'none'
      ring.style.display = 'none'
      trail.style.display = 'none'
      document.documentElement.classList.remove('hide-cursor')
      return
    }

    if (disabled) {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
      trail.style.display = 'none'
      document.documentElement.classList.remove('hide-cursor')
      return
    }

    // Custom cursor active — hide native
    document.documentElement.classList.add('hide-cursor')
    trail.style.display = 'block'

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let lastX = -100, lastY = -100

    const onMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY

      dot.style.transform  = `translate(${x - 5}px, ${y - 5}px)`
      ring.style.transform = `translate(${x - 19}px, ${y - 19}px)`
      dot.style.opacity = '1'
      ring.style.opacity = '1'

      // Spawn glitter
      const dx = x - lastX
      const dy = y - lastY
      if (!reduceMotion && dx * dx + dy * dy > 30) {
        spawnParticle(trail, x, y)
        lastX = x
        lastY = y
      }
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.documentElement.classList.remove('hide-cursor')
    }
  }, [disabled])

  return (
    <>
      <div
        ref={trailRef}
        style={{ position: 'fixed', inset: 0, zIndex: 99996, pointerEvents: 'none', overflow: 'hidden' }}
      />
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 10, height: 10, borderRadius: '50%',
          background: '#ff0000',
          boxShadow: '0 0 8px 2px rgba(255,0,0,0.7)',
          zIndex: 99999, pointerEvents: 'none',
          opacity: 0, willChange: 'transform',
          transform: 'translate(-100px, -100px)',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 38, height: 38, borderRadius: '50%',
          border: '1.5px solid rgba(255,0,0,0.55)',
          zIndex: 99998, pointerEvents: 'none',
          opacity: 0, willChange: 'transform',
          transform: 'translate(-100px, -100px)',
          transition: 'transform 0.1s cubic-bezier(0.22,1,0.36,1), opacity 0.3s',
        }}
      />
    </>
  )
}

function spawnParticle(container: HTMLDivElement, x: number, y: number) {
  const el = document.createElement('div')
  const size = Math.random() * 4 + 2
  const offsetX = (Math.random() - 0.5) * 8
  const offsetY = (Math.random() - 0.5) * 8
  const driftX  = (Math.random() - 0.5) * 20
  const driftY  = Math.random() * -18 - 5

  Object.assign(el.style, {
    position: 'absolute',
    left: `${x + offsetX}px`, top: `${y + offsetY}px`,
    width: `${size}px`, height: `${size}px`,
    borderRadius: '50%',
    background: `rgba(255, ${Math.floor(Math.random() * 60 + 20)}, ${Math.floor(Math.random() * 40)}, 0.9)`,
    boxShadow: '0 0 4px rgba(255,0,0,0.5)',
    pointerEvents: 'none', willChange: 'transform, opacity',
    animation: 'cursorGlitter 0.55s ease-out forwards',
    '--drift-x': `${driftX}px`, '--drift-y': `${driftY}px`,
  } as Record<string, string>)

  container.appendChild(el)
  el.addEventListener('animationend', () => el.remove(), { once: true })
  setTimeout(() => { if (el.parentNode) el.remove() }, 650)
}
