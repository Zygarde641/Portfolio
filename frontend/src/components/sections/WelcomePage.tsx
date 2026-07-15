'use client'

import { motion } from 'framer-motion'

export default function WelcomePage() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Hairline grid */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,51,51,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,51,51,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
        }}
      />

      {/* Single slow scanline sweep */}
      <motion.div
        animate={{ y: ['-10%', '110%'] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[11px] md:text-xs tracking-[0.3em] text-[#ff0000] mb-6"
        >
          01 / WELCOME
        </motion.p>

        <h1 className="font-display font-extrabold uppercase leading-[0.92] text-[clamp(2.75rem,7.5vw,6.75rem)]">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="block text-white"
          >
            I build full-stack
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="block text-white"
          >
            systems <span className="text-[#ff0000]">—</span> and the
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="block text-[#ff0000]"
          >
            pipelines that ship them.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 max-w-xl text-gray-400 text-base md:text-lg leading-relaxed"
        >
          React and Node end to end, Docker-to-Kubernetes delivery, and a
          growing AI/ML habit. Have a look around.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-10 font-mono text-[10px] md:text-xs tracking-[0.25em] text-neutral-600"
        >
          SCROLL · SWIPE · ARROW KEYS — 5 SECTIONS
        </motion.p>
      </div>

      {/* Keep going indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3"
      >
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-mono text-neutral-500 text-[11px] tracking-[0.3em]"
        >
          KEEP GOING
        </motion.p>
        <motion.span
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-red-500 text-lg leading-none"
        >
          →
        </motion.span>
      </motion.div>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-14 h-px bg-red-500/40" />
      <div className="absolute top-8 left-8 w-px h-14 bg-red-500/40" />
      <div className="absolute bottom-8 right-8 w-14 h-px bg-red-500/40" />
      <div className="absolute bottom-8 right-8 w-px h-14 bg-red-500/40" />

      {/* Section indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2">
        <div className="w-px h-16 bg-red-500/30" />
        <span className="text-[#ff0000] font-mono text-xs tracking-[0.25em] rotate-90 origin-center whitespace-nowrap">
          01 / WELCOME
        </span>
        <div className="w-px h-16 bg-red-500/30" />
      </div>
    </section>
  )
}
