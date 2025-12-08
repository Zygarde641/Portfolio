'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MusicProvider } from '@/components/MusicPlayer'
import HexagonBackground from '@/components/HexagonBackground'
import FloatingSpheres from '@/components/FloatingSpheres'
import GeometricIntro from '@/components/GeometricIntro'
import WelcomePage from '@/components/sections/WelcomePage'
import AboutMe from '@/components/sections/AboutMe'
import MyProjects from '@/components/sections/MyProjects'
import MyExperiences from '@/components/sections/MyExperiences'

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [showBackground, setShowBackground] = useState(false)

  const handleEnter = () => {
    setShowIntro(false)
    setShowBackground(true)
  }

  return (
    <MusicProvider>
      {/* Hexagon background for intro */}
      {showIntro && <HexagonBackground />}
      
      {/* Nebula background + geometric shapes - shows after intro and stays forever */}
      {showBackground && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="fixed inset-0 z-0"
        >
          <FloatingSpheres />
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            exit={{ 
              opacity: 0,
              scale: 0.95,
            }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <GeometricIntro onEnter={handleEnter} />
          </motion.div>
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="relative z-10"
          >
            <WelcomePage />
            <AboutMe />
            <MyProjects />
            <MyExperiences />
          </motion.main>
        )}
      </AnimatePresence>
    </MusicProvider>
  )
}
