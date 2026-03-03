'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github } from 'lucide-react'

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python:     '#3776ab',
  Java:       '#b07219',
  'C++':      '#f34b7d',
  Go:         '#00add8',
  Rust:       '#dea584',
  HTML:       '#e34c26',
  CSS:        '#563d7c',
  SCSS:       '#c6538c',
}

const projects = [
  {
    id: 1,
    name: 'Real-Time-Sign-Lang-decipher',
    title: 'Sign Language Decipher',
    description: 'Real-time sign language recognition using MediaPipe hand tracking and transformer-based neural networks. Processed 8000+ Phoenix dataset videos for live text translation.',
    language: 'Python',
    period: 'Dec 2025',
    highlights: [
      'Deep learning pipeline from video frames to text',
      'Live prediction via PyTorch & TensorFlow Lite',
    ],
  },
  {
    id: 2,
    name: 'TaskMaster641',
    title: 'TaskMaster641',
    description: 'A privacy-first desktop to-do list/manager designed for meetings. Always-on-top notes that hide during screen sharing — anti-screenshare, with pin and transparency slider.',
    language: 'JavaScript',
    period: '2025',
    highlights: [
      'Anti-screenshare: notes auto-hide during screen share',
      'Always-on-top with customizable transparency slider',
    ],
  },
  {
    id: 3,
    name: 'Attendance-Class-System',
    title: 'Educational Management Platform',
    description: 'Comprehensive attendance & class management with teacher, student, and admin dashboards. Built with Next.js 14, TypeScript, SQLite, JWT auth, and role-based access.',
    language: 'TypeScript',
    period: 'Sep–Nov 2025',
    highlights: [
      'Attendance, marks, analytics, exam scheduling',
      'Role-based access: Admin / Teacher / Student',
    ],
  },
  {
    id: 4,
    name: 'Mern-Form-Builder',
    title: 'MERN Form Builder',
    description: 'Full-stack MERN app: authenticate with Airtable, auto-generate dynamic forms from Airtable bases, apply conditional logic, and sync responses in real time via webhooks.',
    language: 'JavaScript',
    period: '2024',
    highlights: [
      'Airtable OAuth 2.0 authentication',
      'Real-time sync through webhooks',
    ],
  },
  {
    id: 5,
    name: 'Enhancing-Explainable-AI-with-Optimized-C5.0-for-Real-Time-Decision-Support-Systems-Dataset',
    title: 'Explainable AI with Optimized C5.0',
    description: 'C5.0-style decision tree with pre-pruning, post-pruning, combined pruning, and boosting. Full visual and performance insights on financial investment data.',
    language: 'Python',
    period: '2024',
    highlights: [
      'Multiple pruning strategies + boosting',
      'Visual insights on financial decision data',
    ],
  },
  {
    id: 6,
    name: 'Frontend',
    title: 'Frontend UI/UX Collection',
    description: 'A curated collection of small frontend & UI/UX projects committed for reuse. Reusable components and modern design patterns ready to copy-paste.',
    language: 'HTML',
    period: '2024',
    highlights: [
      'Reusable UI components & design patterns',
      'Ready-to-use templates',
    ],
  },
]

export default function MyProjects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="projects"
      className="relative min-h-screen overflow-y-auto overflow-x-hidden flex flex-col justify-center py-12 md:py-6"
    >
      {/* Subtle vertical line accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-500/15 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-500/15 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <span className="text-red-500 font-mono text-xs tracking-widest">MY WORK</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-3">Projects</h2>
          <div className="w-20 h-0.5 bg-red-500 mx-auto" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -3, borderColor: 'rgba(255, 51, 51, 0.5)' }}
              className="group relative p-4 rounded-xl border border-gray-800 bg-black/50 backdrop-blur-sm hover:bg-gray-900/50 transition-all duration-300 overflow-hidden"
            >
              {/* Watermark number */}
              <div className="absolute top-2 right-3 text-red-500/15 font-mono text-3xl font-bold select-none">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Title + meta */}
              <h3 className="text-sm font-semibold text-white group-hover:text-red-500 transition-colors pr-8 mb-1.5 leading-snug">
                {project.title}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: languageColors[project.language] || '#888' }}
                />
                <span className="text-xs text-gray-500">{project.language}</span>
                <span className="text-xs text-gray-600">· {project.period}</span>
              </div>

              <p className="text-gray-400 text-xs mb-2.5 line-clamp-2 leading-relaxed">
                {project.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-0.5 mb-3">
                {project.highlights.map((h, i) => (
                  <li key={i} className="text-xs text-gray-500 flex items-start gap-1.5">
                    <span className="text-red-500 mt-0.5 flex-shrink-0">▹</span>
                    <span className="line-clamp-1">{h}</span>
                  </li>
                ))}
              </ul>

              {/* GitHub link */}
              <a
                href={`https://github.com/Zygarde641/${project.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-700 hover:border-red-500 hover:text-red-500 text-xs text-gray-300 transition-colors"
              >
                <Github className="w-3 h-3" />
                View Code
              </a>

              {/* Hover bottom accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 origin-left"
              />
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <a
            href="https://github.com/Zygarde641?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 border border-red-500/50 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all text-sm"
          >
            <Github className="w-4 h-4" />
            View All on GitHub
          </a>
        </motion.div>
      </div>

      {/* Section indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2">
        <div className="w-px h-16 bg-red-500/30" />
        <span className="text-red-500 font-mono text-sm tracking-widest rotate-90 origin-center whitespace-nowrap">
          03 / PROJECTS
        </span>
        <div className="w-px h-16 bg-red-500/30" />
      </div>
    </section>
  )
}
