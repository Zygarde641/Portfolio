'use client'

import { motion } from 'framer-motion'

interface HotBarProps {
  // 0=Landing Sphere, 1=Welcome, 2=About Me, 3=Projects, 4=Experience, 5=Contact Me
  activeSection: number
  onNavigate: (index: number) => void
}

const sections = [
  { label: 'Landing Sphere', index: 0 },
  { label: 'Welcome',        index: 1 },
  { label: 'About Me',       index: 2 },
  { label: 'Projects',       index: 3 },
  { label: 'Experience',     index: 4 },
  { label: 'Contact Me',     index: 5 },
]

export default function HotBar({ activeSection, onNavigate }: HotBarProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 z-[9000] flex justify-center items-center py-3 px-6"
      style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 70%, transparent 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      {/* Bottom glow accent */}
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,0,0,0.35), transparent)' }}
      />

      <div className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar max-w-full px-1">
        {sections.map((section) => {
          const isActive = activeSection === section.index
          return (
            <motion.button
              key={section.index}
              onClick={() => onNavigate(section.index)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="relative px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-mono tracking-wider outline-none select-none whitespace-nowrap flex-shrink-0"
              style={{
                color:      isActive ? '#ff0000' : 'rgba(255,255,255,0.55)',
                background: isActive ? 'rgba(255,0,0,0.08)' : 'transparent',
                border:     isActive ? '1px solid rgba(255,0,0,0.4)' : '1px solid transparent',
                transition: 'color 0.25s, background 0.25s, border-color 0.25s',
              }}
            >
              {section.label}
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ boxShadow: '0 0 10px rgba(255,0,0,0.25)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </motion.nav>
  )
}
