'use client'

import {
  useRef,
  useEffect,
  useCallback,
  ReactNode,
  Children,
} from 'react'

interface HorizontalScrollProps {
  children: ReactNode
  activeSection: number
  onSectionChange: (index: number) => void
}

export default function HorizontalScroll({
  children,
  activeSection,
  onSectionChange,
}: HorizontalScrollProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef(false)
  const currentRef = useRef(activeSection)
  const touchStartXRef = useRef(0)
  const touchStartYRef = useRef(0)

  const sectionList = Children.toArray(children)
  const total = sectionList.length

  // Slide the track
  const slideTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, total - 1))
      if (!trackRef.current) return
      currentRef.current = clamped
      onSectionChange(clamped)
      trackRef.current.style.transform = `translateX(${-clamped * 100}vw)`
    },
    [total, onSectionChange]
  )

  // Respond to hotbar / external activeSection changes
  useEffect(() => {
    if (activeSection !== currentRef.current) {
      slideTo(activeSection)
    }
  }, [activeSection, slideTo])

  // Wheel — one tick = one section
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isScrollingRef.current) return
      const delta = e.deltaY || e.deltaX
      if (Math.abs(delta) < 5) return

      const next = delta > 0
        ? Math.min(currentRef.current + 1, total - 1)
        : Math.max(currentRef.current - 1, 0)

      if (next !== currentRef.current) {
        isScrollingRef.current = true
        slideTo(next)
        setTimeout(() => { isScrollingRef.current = false }, 750)
      }
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [slideTo, total])

  // Touch / swipe
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartXRef.current = e.touches[0].clientX
      touchStartYRef.current = e.touches[0].clientY
    }
    const onTouchEnd = (e: TouchEvent) => {
      const dx = touchStartXRef.current - e.changedTouches[0].clientX
      const dy = touchStartYRef.current - e.changedTouches[0].clientY
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return
      const next = dx > 0
        ? Math.min(currentRef.current + 1, total - 1)
        : Math.max(currentRef.current - 1, 0)
      slideTo(next)
    }
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend',   onTouchEnd,   { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend',   onTouchEnd)
    }
  }, [slideTo, total])

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        slideTo(Math.min(currentRef.current + 1, total - 1))
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        slideTo(Math.max(currentRef.current - 1, 0))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [slideTo, total])

  return (
    /* Viewport-size clip window */
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Sliding track */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: `${total * 100}vw`,
          height: '100vh',
          transform: `translateX(${-activeSection * 100}vw)`,
          transition: 'transform 0.72s cubic-bezier(0.77, 0, 0.175, 1)',
          willChange: 'transform',
        }}
      >
        {sectionList.map((child, i) => (
          <div
            key={i}
            style={{
              width: '100vw',
              height: '100vh',
              flexShrink: 0,
              overflowY: 'auto',
              overflowX: 'hidden',
              position: 'relative',
            }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
