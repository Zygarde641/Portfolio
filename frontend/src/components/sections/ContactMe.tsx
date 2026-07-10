'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, FlaskConical, BookOpen, ArrowUpRight } from 'lucide-react'

const channels = [
  { label: 'EMAIL', value: 'zarjun641@gmail.com', href: 'mailto:zarjun641@gmail.com' },
  { label: 'PHONE', value: '+91 91255 45599', href: 'tel:+919125545599' },
  { label: 'GITHUB', value: 'github.com/Zygarde641', href: 'https://github.com/Zygarde641' },
  {
    label: 'LINKEDIN',
    value: 'in/arjun-sri-dev',
    href: 'https://www.linkedin.com/in/arjun-sri-dev',
  },
  {
    label: 'CODEFORCES',
    value: 'The__Two',
    href: 'https://codeforces.com/profile/The__Two',
  },
  {
    label: 'RESUME',
    value: 'View on Google Drive',
    href: 'https://drive.google.com/file/d/1LGjyr5Yzlwnp2JAPXSMtuuHxtnfzsbtO/view?usp=sharing',
  },
]

const mindset = [
  {
    icon: Zap,
    title: 'Keep Learning, Keep Breaking Things',
    description:
      'Every new technology is a puzzle to dismantle. I dive in, break it, understand it, and own it.',
  },
  {
    icon: FlaskConical,
    title: 'Experiment Without Fear',
    description:
      'The best projects started as bad ideas. Weird ideas are worth implementing — you never know which becomes remarkable.',
  },
  {
    icon: BookOpen,
    title: 'Build Beyond the Comfort Zone',
    description:
      'Real growth happens outside the familiar stack. Every side project taught me things a classroom never could.',
  },
]

export default function ContactMe() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section
      ref={ref}
      id="contact"
      className="relative w-full min-h-screen overflow-y-auto overflow-x-hidden flex flex-col justify-center py-12"
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-8 flex flex-col gap-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <span className="font-mono text-[11px] md:text-xs tracking-[0.3em] text-red-500">
            05 / CONTACT
          </span>
          <h2 className="font-display font-extrabold uppercase text-white text-5xl md:text-7xl mt-2 leading-none">
            Open a channel<span className="text-red-500">.</span>
          </h2>
          <p className="text-gray-400 text-base mt-4 max-w-xl">
            Looking for a full-stack or DevOps engineer? I graduate in June
            2026 and I&apos;m open to work. Email is the fastest route.
          </p>
        </motion.div>

        {/* Channel ledger */}
        <div className="border-t border-hairline">
          {channels.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.07 }}
              className="group flex items-center justify-between gap-4 py-3.5 border-b border-hairline hover:bg-panel transition-colors px-2 md:px-3"
            >
              <span className="font-mono text-[11px] md:text-xs tracking-[0.25em] text-neutral-500 group-hover:text-red-500 transition-colors w-28 md:w-36 flex-shrink-0">
                {c.label}
              </span>
              <span className="text-gray-300 group-hover:text-white text-sm md:text-base transition-colors truncate text-left flex-1">
                {c.value}
              </span>
              <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-red-500 transition-colors flex-shrink-0" />
            </motion.a>
          ))}
        </div>

        {/* My Mindset */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.55 }}
            className="font-mono text-[11px] tracking-[0.3em] text-red-500 mb-4"
          >
            MINDSET
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mindset.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.12 }}
                className="group relative p-5 border border-hairline bg-panel/80 hover:border-red-500/50 transition-colors"
              >
                <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center justify-between mb-3">
                  <item.icon className="w-5 h-5 text-red-500" />
                  <span className="font-mono text-[10px] text-neutral-600">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h4 className="text-white font-semibold text-sm mb-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2">
        <div className="w-px h-16 bg-red-500/30" />
        <span className="text-red-500 font-mono text-xs tracking-[0.25em] rotate-90 origin-center whitespace-nowrap">
          05 / CONTACT
        </span>
        <div className="w-px h-16 bg-red-500/30" />
      </div>
    </section>
  )
}
