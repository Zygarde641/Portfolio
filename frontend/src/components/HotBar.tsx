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
    >
      <div
        className="flex items-center gap-1 md:gap-4 overflow-x-auto no-scrollbar max-w-full px-4 py-1.5 rounded-full"
        style={{
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(14px) saturate(140%)',
          WebkitBackdropFilter: 'blur(14px) saturate(140%)',
        }}
      >
        {sections.map((section) => {
          const isActive = activeSection === section.index
          return (
            <button
              key={section.index}
              onClick={() => onNavigate(section.index)}
              className="relative px-2.5 md:px-3 py-2 font-mono text-[10px] md:text-[11px] tracking-[0.2em] outline-none select-none whitespace-nowrap flex-shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500"
            >
              <span className={`transition-colors duration-200 ${isActive ? 'text-[#ff0000]' : 'text-neutral-600'}`}>
                {String(section.index).padStart(2, '0')}
              </span>
              {' '}
              <span className={`transition-colors duration-200 ${isActive ? 'text-[#ff0000]' : 'text-white/45'}`}>
                {section.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  // Fixed width + auto-margin centering keeps the shared-layout animation a pure
                  // horizontal slide (no scaleX), so the bar and its glow never distort between
                  // labels of different widths.
                  className="absolute inset-x-0 mx-auto bottom-0 h-[2px] w-7 md:w-9 rounded-full bg-red-500 pointer-events-none"
                  style={{ boxShadow: '0 0 8px rgba(255,51,51,0.6)' }}
                  transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                />
              )}
            </button>
          )
        })}
      </div>
    </motion.nav>
  )
}
