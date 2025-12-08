'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function WelcomePage() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated background lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -100 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              x: ['0%', '100%'],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: i * 0.2,
              repeat: Infinity,
              repeatDelay: Math.random() * 5,
            }}
            className="absolute h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"
            style={{
              top: `${5 + i * 5}%`,
              width: '100%',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 text-center px-6"
      >
        {/* Hello text */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-7xl md:text-9xl font-bold mb-6"
        >
          <span className="text-white">Hello</span>
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-red-500"
          >
            .
          </motion.span>
        </motion.h1>

        {/* Welcome text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-gray-400 mb-4"
        >
          Welcome to my website
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-24 h-0.5 bg-red-500 mx-auto mb-12"
        />
      </motion.div>

      {/* Keep scrolling indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-500 text-sm tracking-widest mb-4"
        >
          KEEP SCROLLING
        </motion.p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-red-500" />
        </motion.div>
      </motion.div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32">
        <div className="absolute top-8 left-8 w-16 h-px bg-red-500/50" />
        <div className="absolute top-8 left-8 w-px h-16 bg-red-500/50" />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32">
        <div className="absolute top-8 right-8 w-16 h-px bg-red-500/50" />
        <div className="absolute top-8 right-8 w-px h-16 bg-red-500/50" />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32">
        <div className="absolute bottom-8 left-8 w-16 h-px bg-red-500/50" />
        <div className="absolute bottom-8 left-8 w-px h-16 bg-red-500/50" />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32">
        <div className="absolute bottom-8 right-8 w-16 h-px bg-red-500/50" />
        <div className="absolute bottom-8 right-8 w-px h-16 bg-red-500/50" />
      </div>
    </section>
  )
}
