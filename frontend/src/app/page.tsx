'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import { MusicProvider } from '@/components/MusicPlayer'
import FloatingSpheres from '@/components/FloatingSpheres'
import HexagonBackground from '@/components/HexagonBackground'
import GeometricIntro from '@/components/GeometricIntro'
import WelcomePage from '@/components/sections/WelcomePage'
import AboutMe from '@/components/sections/AboutMe'
import MyProjects from '@/components/sections/MyProjects'
import MyExperiences from '@/components/sections/MyExperiences'
import ContactMe from '@/components/sections/ContactMe'
import HorizontalScroll from '@/components/HorizontalScroll'
import HotBar from '@/components/HotBar'
import CustomCursor from '@/components/CustomCursor'

export default function Home() {
  // true = showing the Landing Sphere intro screen
  const [showIntro, setShowIntro] = useState(true)
  // becomes true after first "Let's Begin!" — hotbar stays visible even when returning to Landing Sphere
  const [hasSeenIntro, setHasSeenIntro] = useState(false)
  // which scroll section  (0=Welcome, 1=About, 2=Projects, 3=Experience, 4=Contact)
  const [activeScrollSection, setActiveScrollSection] = useState(0)

  // hotbar index: 0=Landing Sphere, 1=Welcome, 2=About, 3=Projects, 4=Experience, 5=Contact
  const hotbarActive = showIntro ? 0 : activeScrollSection + 1

  // First-time "Let's Begin!" click
  const handleEnter = useCallback(() => {
    setHasSeenIntro(true)
    setShowIntro(false)
    setActiveScrollSection(0)
  }, [])

  // Hotbar navigation
  const handleHotbarNavigate = useCallback((hotbarIndex: number) => {
    if (hotbarIndex === 0) {
      // Go back to Landing Sphere — but keep hotbar (hasSeenIntro stays true)
      setShowIntro(true)
    } else {
      setShowIntro(false)
      setActiveScrollSection(hotbarIndex - 1)
    }
  }, [])

  const handleScrollSectionChange = useCallback((index: number) => {
    setActiveScrollSection(index)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
    <MusicProvider>
      <CustomCursor disabled={showIntro} />

      {/* Nebula/floating spheres — always behind everything */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FloatingSpheres />
      </div>

      {/* ── LANDING SPHERE OVERLAY ──
          Shows on first visit (no hotbar) and when user returns via hotbar (hotbar visible).
          z-50 so it sits above the horizontal scroll content. */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
            className="fixed inset-0 z-50"
          >
            <HexagonBackground />
            <GeometricIntro onEnter={handleEnter} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HOTBAR ──
          Hidden on absolute first visit, shown after "Let's Begin!" even when revisiting Landing Sphere */}
      {hasSeenIntro && (
        <div className="fixed inset-x-0 top-0 z-[9000]">
          <HotBar
            activeSection={hotbarActive}
            onNavigate={handleHotbarNavigate}
          />
        </div>
      )}

      {/* ── MAIN PORTFOLIO (horizontal scroll, always mounted once seen) ──
          Kept mounted so sections don't re-initialise when returning from Landing Sphere */}
      <AnimatePresence>
        {!showIntro && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
            className="fixed inset-0 z-10"
          >
            <HorizontalScroll
              activeSection={activeScrollSection}
              onSectionChange={handleScrollSectionChange}
            >
              <WelcomePage />
              <AboutMe />
              <MyProjects />
              <MyExperiences />
              <ContactMe />
            </HorizontalScroll>
          </motion.div>
        )}
      </AnimatePresence>
    </MusicProvider>
    </MotionConfig>
  )
}
