'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, FlaskConical, BookOpen } from 'lucide-react'

const achievements = [
  {
    icon: Zap,
    title: 'Keep Learning, Keep Breaking Things',
    description: 'Every new technology is a puzzle to dismantle. I dive in, break it, understand it, and own it.',
  },
  {
    icon: FlaskConical,
    title: 'Experiment Without Fear',
    description: 'The best projects started as bad ideas. Weird ideas are worth implementing — you never know which becomes remarkable.',
  },
  {
    icon: BookOpen,
    title: 'Build Beyond the Comfort Zone',
    description: 'Real growth happens outside the familiar stack. Every side project taught me things a classroom never could.',
  },
]

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/Zygarde641',
    icon: (
      <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/arjun-srivastava-122303288/',
    icon: (
      <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Codeforces',
    href: 'https://codeforces.com/profile/The__Two',
    icon: (
      <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" />
      </svg>
    ),
  },
  {
    label: 'zarjun641@gmail.com',
    href: 'mailto:zarjun641@gmail.com',
    icon: (
      <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: '+91 91255 45599',
    href: 'tel:+919125545599',
    icon: (
      <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5.5C3 4.1 4.1 3 5.5 3h2A1.5 1.5 0 019 4.5v2A1.5 1.5 0 017.5 8H7c1.2 2.9 3.6 5.3 6.5 6.5v-.5A1.5 1.5 0 0115 13h2A1.5 1.5 0 0118.5 14.5v2A1.5 1.5 0 0117 18h-.5C9.5 18 3 11.5 3 3.5V3z" />
      </svg>
    ),
  },
]

export default function ContactMe() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section
      ref={ref}
      id="contact"
      className="relative w-full min-h-screen overflow-y-auto overflow-x-hidden flex flex-col justify-center py-12 md:py-0"
    >
      {/* Background dots */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,51,51,0.5) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 flex flex-col gap-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <span className="text-red-500 font-mono text-xs tracking-widest">GET IN TOUCH</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-3">Contact Me</h2>
          <div className="w-20 h-0.5 bg-red-500 mx-auto mb-3" />
          <p className="text-gray-400 text-base">Let&apos;s connect and build something amazing together</p>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.18 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-2.5 px-5 py-2.5 bg-gray-900/80 border border-red-500/25 rounded-full hover:border-red-500 hover:bg-red-500/10 transition-all group"
            >
              {s.icon}
              <span className="text-white group-hover:text-red-400 transition-colors text-sm">{s.label}</span>
            </a>
          ))}
        </motion.div>

        {/* Resume */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <a
            href="https://drive.google.com/file/d/1LGjyr5Yzlwnp2JAPXSMtuuHxtnfzsbtO/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 bg-red-500 text-white text-sm font-semibold rounded-full hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
          >
            Download Resume
          </a>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-red-500/20" />

        {/* My Mindset heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.42 }}
          className="text-center"
        >
          <span className="text-red-500 font-mono text-xs tracking-widest">PHILOSOPHY</span>
          <h3 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-1">My Mindset</h3>
          <p className="text-gray-500 text-sm">A few principles I live and code by.</p>
        </motion.div>

        {/* Mindset cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.12 }}
              whileHover={{ y: -4, borderColor: 'rgba(255, 51, 51, 0.5)' }}
              className="relative p-5 rounded-xl border border-gray-800 bg-black/50 backdrop-blur-sm hover:bg-gray-900/50 transition-all group overflow-hidden"
            >
              {/* Watermark number */}
              <div className="absolute top-3 right-4 text-red-500/10 font-mono text-4xl font-bold select-none">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="mb-3 w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                <item.icon className="w-5 h-5 text-red-500" />
              </div>

              <h4 className="text-white font-semibold text-sm mb-2 group-hover:text-red-400 transition-colors leading-snug">
                {item.title}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>

              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 origin-left rounded-b-xl"
              />
            </motion.div>
          ))}
        </div>

      </div>

      {/* Section indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2">
        <div className="w-px h-16 bg-red-500/30" />
        <span className="text-red-500 font-mono text-sm tracking-widest rotate-90 origin-center whitespace-nowrap">
          05 / CONTACT
        </span>
        <div className="w-px h-16 bg-red-500/30" />
      </div>
    </section>
  )
}
