'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'
import TechStack from '../TechStack'

const RESUME_URL =
  'https://drive.google.com/file/d/1tGCacYHYwBKLtvuOKNRpgAjL3Iubr84T/view?usp=sharing'

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
    setRotation(prev => prev + 720)
    setTimeout(() => setIsAnimating(false), 1100)
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

  const CodeforcesSvg = () => (
    <svg className="w-5 h-5 text-[#ff0000]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" />
    </svg>
  )

  const socials = [
    { icon: Github, href: 'https://github.com/Zygarde641', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/arjun-sri-dev', label: 'LinkedIn' },
    { icon: CodeforcesSvg, href: 'https://codeforces.com/profile/The__Two', label: 'Codeforces' },
    { icon: Mail, href: 'mailto:zarjun641@gmail.com', label: 'Email' },
  ]

  return (
    <section
      ref={ref}
      id="about"
      className="relative min-h-screen flex items-center justify-center py-10 md:py-12 overflow-hidden"
    >
      {/* Background grid */}
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

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Coin Flip Logo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex justify-center order-first"
          >
            <div
              className="relative cursor-pointer"
              style={{ perspective: '1000px' }}
              onMouseEnter={triggerFlip}
            >
              <motion.div
                animate={{ rotateY: rotation }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                className="relative w-44 h-44 md:w-60 md:h-60"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front of coin (Logo) */}
                <div
                  className="absolute inset-0 rounded-full border-4 border-red-500 overflow-hidden flex items-center justify-center bg-black"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="absolute inset-2 rounded-full border border-red-500/30" />
                  <div className="absolute inset-4 rounded-full border border-red-500/20" />
                  <div className="relative w-32 h-32 md:w-48 md:h-48">
                    <Image
                      src="/logo.png"
                      alt="Arjun Srivastava"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                  />
                </div>

                {/* Back of coin (bold red 'Z') */}
                <div
                  className="absolute inset-0 rounded-full border-4 border-red-500 overflow-hidden flex items-center justify-center bg-black"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <div
                    className="flex items-center justify-center w-full h-full"
                    style={{ fontFamily: "'Times New Roman', serif" }}
                  >
                    <span className="text-[#ff0000] text-7xl md:text-9xl font-bold">Z</span>
                  </div>
                </div>
              </motion.div>

              {/* Orbiting particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0"
                  style={{ margin: `-${20 + i * 10}px` }}
                >
                  <div
                    className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(255,0,0,0.8)]"
                    style={{ position: 'absolute', top: '50%', left: 0 }}
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
            <span className="font-mono text-[11px] md:text-xs tracking-[0.3em] text-red-500">
              02 / ABOUT
            </span>

            <h2 className="font-display font-extrabold uppercase text-white text-4xl md:text-5xl mt-2 leading-[0.95]">
              Arjun Srivastava
            </h2>

            <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-neutral-500 mt-2 mb-4">
              FULL-STACK DEVELOPER · DEVOPS · AI/ML
            </p>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-3">
              I&apos;m a full-stack developer who takes products end to end —
              React and Next.js up front, Node and Express with PostgreSQL and
              MongoDB behind — then ships them: Docker and Kubernetes on AWS,
              infrastructure in Terraform, CI/CD through Jenkins and GitHub
              Actions, Prometheus and Grafana on the dials. I&apos;ve also
              trained and deployed ML models in PyTorch and TensorFlow.
            </p>

            <p className="font-mono text-[10px] md:text-xs tracking-[0.15em] text-neutral-600 mb-5">
              CS @ CHANDIGARH UNIVERSITY &apos;26 · CODEFORCES: THE__TWO
            </p>

            {/* Social Links + Resume */}
            <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
              {socials.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.08 }}
                  className="p-2.5 border border-hairline glass hover:border-red-500/60 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-[#ff0000]" />
                </motion.a>
              ))}

              <motion.a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-red-500 hover:bg-red-600 text-white font-mono text-xs md:text-sm tracking-[0.2em] transition-colors"
              >
                VIEW RESUME
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Tech stack — full width below */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-6 md:mt-8"
        >
          <TechStack />
        </motion.div>
      </div>

      {/* Section indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2">
        <div className="w-px h-16 bg-red-500/30" />
        <span className="text-red-500 font-mono text-xs tracking-[0.25em] rotate-90 origin-center whitespace-nowrap">
          02 / ABOUT
        </span>
        <div className="w-px h-16 bg-red-500/30" />
      </div>
    </section>
  )
}
