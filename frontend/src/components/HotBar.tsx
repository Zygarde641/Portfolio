'use client'

import { motion } from 'framer-motion'

interface HotBarProps {
  // 0=Intro, 1=Welcome, 2=About, 3=Projects, 4=Experience, 5=Contact
  activeSection: number
  onNavigate: (index: number) => void
}

const sections = [
  { label: 'INTRO',      index: 0 },
  { label: 'WELCOME',    index: 1 },
  { label: 'ABOUT',      index: 2 },
  { label: 'PROJECTS',   index: 3 },
  { label: 'EXPERIENCE', index: 4 },
  { label: 'CONTACT',    index: 5 },
]

export default function HotBar({ activeSection, onNavigate }: HotBarProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 z-[9000] flex justify-center items-center py-2.5 px-4"
      style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      {/* Bottom hairline accent */}
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,51,51,0.35), transparent)' }}
      />

      <div className="flex items-center gap-1 md:gap-4 overflow-x-auto no-scrollbar max-w-full px-1">
        {sections.map((section) => {
          const isActive = activeSection === section.index
          return (
            <button
              key={section.index}
              onClick={() => onNavigate(section.index)}
              className="relative px-2.5 md:px-3 py-2 font-mono text-[10px] md:text-[11px] tracking-[0.2em] outline-none select-none whitespace-nowrap flex-shrink-0 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500"
              style={{ color: isActive ? '#ff3333' : 'rgba(255,255,255,0.45)' }}
            >
              <span className={isActive ? 'text-red-500' : 'text-neutral-600'}>
                {String(section.index).padStart(2, '0')}
              </span>
              {' '}
              {section.label}
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-x-1 bottom-0 h-[2px] bg-red-500 pointer-events-none"
                  style={{ boxShadow: '0 0 8px rgba(255,51,51,0.6)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          )
        })}
      </div>
    </motion.nav>
  )
}
