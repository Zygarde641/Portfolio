'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="relative mb-8"
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-accent/30 ring-offset-4 ring-offset-background">
              <Image
                src="/logo.png"
                alt="Arjun Srivastava"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <span className="text-background text-lg">👋</span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="overflow-hidden"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
              <span className="text-foreground">Arjun</span>
              <span className="text-accent">.</span>
            </h1>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-xl md:text-2xl text-muted mb-2">
              Full-Stack Developer
            </p>
            <p className="text-lg text-muted/70 max-w-md mx-auto">
              Crafting beautiful, performant web experiences with modern technologies
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-4 mt-8"
          >
            <a
              href="https://github.com/Zygarde641"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary hover:bg-accent/20 hover:text-accent transition-all duration-300 group"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://www.linkedin.com/in/arjun-srivastava-122303288/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary hover:bg-accent/20 hover:text-accent transition-all duration-300 group"
            >
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="#contact"
              className="p-3 rounded-full bg-secondary hover:bg-accent/20 hover:text-accent transition-all duration-300 group"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-10"
          >
            <a
              href="#projects"
              className="px-8 py-3 bg-accent text-background font-semibold rounded-full hover:bg-accent-hover transition-colors duration-300"
            >
              View My Work
            </a>
            <a
              href="https://drive.google.com/file/d/1K9aXkOPLRH3MdivD4iWj6ocJXXQ3W7I4/view?usp=drive_link"
              className="px-8 py-3 border border-border text-foreground font-semibold rounded-full hover:border-accent hover:text-accent transition-colors duration-300"
            >
              Download Resume
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted hover:text-accent transition-colors cursor-pointer"
      >
        <span className="text-sm">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.button>

      {/* Horizontal scroll text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-4 border-t border-border/30">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-8 text-muted/30 text-sm font-medium"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>FULL-STACK DEVELOPER</span>
              <span className="text-accent">•</span>
              <span>UI/UX ENTHUSIAST</span>
              <span className="text-accent">•</span>
              <span>PROBLEM SOLVER</span>
              <span className="text-accent">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
