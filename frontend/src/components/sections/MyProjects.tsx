'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3776ab',
  Java: '#b07219',
  'C++': '#f34b7d',
  Go: '#00add8',
  Rust: '#dea584',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
}

// Projects from resume and GitHub
const projects = [
  {
    id: 1,
    name: 'Real-Time-Sign-Lang-decipher',
    title: 'Sign Language Decipher (Neural Network Mode)',
    description: 'A real-time sign language recognition system powered by deep learning. Uses MediaPipe hand tracking and transformer-based neural networks to translate sign language gestures into text. Processed 8000+ Phoenix dataset videos, extracted landmarks, and trained a custom NN for real-time inference.',
    language: 'Python',
    period: 'December 2025 - Present',
    highlights: [
      'Deep learning pipeline to convert sign-language video frames into text',
      'Built a live prediction system using PyTorch, TensorFlow Lite',
      'Custom video landmark pipeline for real-time inference',
    ],
  },
  {
    id: 2,
    name: 'Multi-Factor-AI-Attendance-Tracking-System',
    title: 'AI-Powered Attendance Tracking System',
    description: 'AI-powered multi-factor attendance system using QR code verification, facial recognition, and IP self-validation. Ensures secure, proxy-proof attendance with real-time checks, time-restricted authentication.',
    language: 'JavaScript',
    period: 'December 2025',
    highlights: [
      'Full-stack MERN dynamic form builder with Airtable OAuth 2.0',
      'Advanced conditional logic (AND/OR rules) with real-time data sync',
      'Scalable backend with secure token refresh and webhook automation',
    ],
  },
  {
    id: 3,
    name: 'Attendance-Class-System',
    title: 'Educational Management Platform',
    description: 'A comprehensive attendance and class management system with teacher, student, and admin dashboards. Built with Next.js 14, React, TypeScript, Tailwind CSS, SQLite, JWT auth, and role-based access control.',
    language: 'TypeScript',
    period: 'Sept 2025 - Nov 2025',
    highlights: [
      'Complete school management system with dashboards for Admin, Teacher, and Student',
      'Attendance, marks, analytics, exam scheduling, drag-and-drop class management',
      'Notifications and role-based access control',
    ],
  },
  {
    id: 4,
    name: 'Mern-Form-Builder',
    title: 'MERN Form Builder',
    description: 'A full-stack MERN application that allows users to authenticate with Airtable, auto-generate dynamic forms from Airtable bases, apply conditional logic, and sync responses in real time through webhooks.',
    language: 'JavaScript',
    period: '2024',
    highlights: [
      'Airtable OAuth 2.0 authentication',
      'Auto-generate dynamic forms from Airtable bases',
      'Real-time sync through webhooks',
    ],
  },
  {
    id: 5,
    name: 'Enhancing-Explainable-AI-with-Optimized-C5.0-for-Real-Time-Decision-Support-Systems-Dataset',
    title: 'Explainable AI with Optimized C5.0',
    description: 'A C5.0-style decision tree optimization project featuring pre-pruning, post-pruning, combined pruning, and boosting. Includes comparison, full visual and performance insights on financial investment data.',
    language: 'Python',
    period: '2024',
    highlights: [
      'Decision tree optimization with multiple pruning strategies',
      'Boosting implementation for improved accuracy',
      'Visual and performance insights on financial data',
    ],
  },
  {
    id: 6,
    name: 'Frontend',
    title: 'Frontend UI/UX Collection',
    description: 'A bunch of small frontend, UI/UX projects committed to this repo for copying and pasting in future projects. A collection of reusable components and design patterns.',
    language: 'HTML',
    period: '2024',
    highlights: [
      'Reusable UI components',
      'Modern design patterns',
      'Ready-to-use templates',
    ],
  },
]

export default function MyProjects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      id="projects"
      className="relative min-h-screen py-24 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-500/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-500/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-red-500 font-mono text-sm tracking-widest">
            MY WORK
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
            Projects
          </h2>
          <div className="w-24 h-0.5 bg-red-500 mx-auto" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, borderColor: 'rgba(255, 51, 51, 0.5)' }}
              className="group relative p-6 rounded-xl border border-gray-800 bg-black/50 backdrop-blur-sm hover:bg-gray-900/50 transition-all duration-300"
            >
              {/* Project number */}
              <div className="absolute top-4 right-4 text-red-500/20 font-mono text-4xl font-bold">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Content */}
              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-red-500 transition-colors pr-8">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: languageColors[project.language] || '#888',
                          }}
                        />
                        <span className="text-sm text-gray-500">
                          {project.language}
                        </span>
                      </div>
                      <span className="text-xs text-gray-600">{project.period}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-1 mb-4">
                  {project.highlights.slice(0, 2).map((highlight, i) => (
                    <li key={i} className="text-xs text-gray-500 flex items-start gap-2">
                      <span className="text-red-500 mt-1">▹</span>
                      <span className="line-clamp-1">{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Links */}
                <div className="flex gap-3">
                  <a
                    href={`https://github.com/Zygarde641/${project.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 hover:border-red-500 hover:text-red-500 text-sm transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                </div>
              </div>

              {/* Hover accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 origin-left"
              />
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Zygarde641?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-red-500/50 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all"
          >
            <Github className="w-5 h-5" />
            View All Projects on GitHub
          </a>
        </motion.div>
      </div>

      {/* Section indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2">
        <div className="w-px h-16 bg-red-500/30" />
        <span className="text-red-500 font-mono text-sm tracking-widest rotate-90 origin-center whitespace-nowrap">
          02 / PROJECTS
        </span>
        <div className="w-px h-16 bg-red-500/30" />
      </div>
    </section>
  )
}
