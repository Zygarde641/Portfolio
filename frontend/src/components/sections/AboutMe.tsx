'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Github, Linkedin, Mail, Download } from 'lucide-react'
import TechStack from '../TechStack'

export default function AboutMe() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [rotation, setRotation] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const hasFlippedRef = useRef(false)

  // Single coin flip animation
  const triggerFlip = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    
    // Single full rotation (720 degrees = 2 full spins)
    setRotation(prev => prev + 720)
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 1100)
  }, [isAnimating])

  // Trigger flip once on scroll into view
  useEffect(() => {
    if (isInView && !hasFlippedRef.current) {
      hasFlippedRef.current = true
      setTimeout(() => {
        setRotation(720)
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 1100)
      }, 300)
    }
  }, [isInView])

  const socials = [
    { icon: Github, href: 'https://github.com/Zygarde641', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/arjun-srivastava-122303288/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:zarjun641@gmail.com', label: 'Email' },
  ]

  return (
    <section
      ref={ref}
      id="about"
      className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,51,51,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,51,51,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Coin Flip Logo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div 
              className="relative cursor-pointer" 
              style={{ perspective: '1000px' }}
              onMouseEnter={triggerFlip}
            >
              {/* Coin container */}
              <motion.div
                animate={{
                  rotateY: rotation,
                }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                className="relative w-64 h-64 md:w-80 md:h-80"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front of coin (Logo) */}
                <div
                  className="absolute inset-0 rounded-full border-4 border-red-500 overflow-hidden flex items-center justify-center bg-black"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {/* Coin edge effect */}
                  <div className="absolute inset-2 rounded-full border border-red-500/30" />
                  <div className="absolute inset-4 rounded-full border border-red-500/20" />
                  
                  {/* Logo */}
                  <div className="relative w-48 h-48 md:w-60 md:h-60">
                    <Image
                      src="/logo.png"
                      alt="Arjun Srivastava"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  
                  {/* Shine effect */}
                  <motion.div
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                  />
                </div>

                {/* Back of coin (mirrors front) */}
                <div
                  className="absolute inset-0 rounded-full border-4 border-red-500 overflow-hidden flex items-center justify-center bg-black"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  {/* Coin edge effect */}
                  <div className="absolute inset-2 rounded-full border border-red-500/30" />
                  <div className="absolute inset-4 rounded-full border border-red-500/20" />

                  {/* Logo */}
                  <div className="relative w-48 h-48 md:w-60 md:h-60">
                    <Image
                      src="/logo.png"
                      alt="Arjun Srivastava"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>

                  {/* Shine effect */}
                  <motion.div
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                  />
                </div>
              </motion.div>

              {/* Floating particles around coin */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute inset-0"
                  style={{
                    margin: `-${20 + i * 10}px`,
                  }}
                >
                  <div
                    className="w-1 h-1 rounded-full bg-red-500/50"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="text-red-500 font-mono text-sm tracking-widest"
            >
              ABOUT ME
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6"
            >
              Arjun Srivastava
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="text-gray-400 text-lg leading-relaxed mb-6"
            >
              I build things that blend AI, full-stack engineering, and data analytics — 
              from neural networks that interpret sign language to scalable web apps and 
              management systems. I love taking ideas from &quot;this might work&quot; to 
              &quot;damn, this actually works.&quot;
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="text-gray-400 text-lg leading-relaxed mb-8"
            >
              Results-driven Software Developer and Data Analyst with hands-on experience 
              in AI systems, full-stack development, and data visualization. Skilled in 
              Python, SQL, machine learning, React, and Spring Boot with strong problem-solving 
              and product-thinking abilities.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="flex gap-4 justify-center lg:justify-start mb-8"
            >
              {socials.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="p-3 rounded-full border border-red-500/30 hover:border-red-500 hover:bg-red-500/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-red-500" />
                </motion.a>
              ))}
            </motion.div>

            {/* Download Resume Button */}
            <motion.a
              href="https://drive.google.com/file/d/1K9aXkOPLRH3MdivD4iWj6ocJXXQ3W7I4/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </motion.a>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
            >
              <TechStack />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Section indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2">
        <div className="w-px h-16 bg-red-500/30" />
        <span className="text-red-500 font-mono text-sm tracking-widest rotate-90 origin-center whitespace-nowrap">
          01 / ABOUT
        </span>
        <div className="w-px h-16 bg-red-500/30" />
      </div>
    </section>
  )
}
