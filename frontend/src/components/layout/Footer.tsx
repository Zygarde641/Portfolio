'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import Link from 'next/link'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/Zygarde641',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/arjun-srivastava-122303288/',
    icon: Linkedin,
  },
  {
    name: 'Email',
    href: 'mailto:contact@arjunsrivastava.dev',
    icon: Mail,
  },
]

const footerLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-secondary/30 border-t border-border/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold">
              Arjun<span className="text-accent">.</span>
            </Link>
            <p className="text-muted text-sm max-w-xs">
              Full-stack developer passionate about creating beautiful, 
              performant, and user-friendly web experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted hover:text-foreground transition-colors text-sm"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-semibold">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-secondary hover:bg-accent/20 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm flex items-center gap-1">
            © {currentYear} Arjun Srivastava. Made with{' '}
            <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using Next.js
          </p>
          <p className="text-muted text-sm">
            Designed & Built by Arjun Srivastava
          </p>
        </div>
      </div>
    </footer>
  )
}
