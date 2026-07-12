'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, ArrowUpRight } from 'lucide-react'

const languageColors: Record<string, string> = {
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
    description: 'Comprehensive attendance & class management with teacher, student, and admin dashboards. Built with Next.js 14, SQLite, JWT auth, and role-based access.',
    language: 'JavaScript',
    period: 'Sep–Nov 2025',
    highlights: [
      'Attendance, marks, analytics, exam scheduling',
      'Role-based access: Admin / Teacher / Student',
    ],
  },
  {
    id: 4,
    name: 'DebateGuard',
    title: 'DebateGuard AI',
    description: 'Real-time debate fact-checker and fallacy detector. Streams mic audio through Deepgram, then a two-stage Claude pipeline (web-search fact-check) fires a ding and a sourced correction card the moment a claim is wrong or fallacious.',
    language: 'JavaScript',
    period: '2026',
    highlights: [
      'Deepgram live STT + two-stage Claude web-search pipeline',
      'Detects 21 fallacy types with sourced corrections',
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
      className="relative min-h-screen overflow-y-auto overflow-x-hidden flex flex-col justify-center py-12 md:py-8"
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8 border-b border-hairline pb-5"
        >
          <div>
            <span className="font-mono text-[11px] md:text-xs tracking-[0.3em] text-red-500">
              03 / PROJECTS
            </span>
            <h2 className="font-display font-extrabold uppercase text-white text-5xl md:text-6xl mt-2 leading-none">
              Selected Work<span className="text-red-500">.</span>
            </h2>
          </div>
          <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-neutral-500">
            06 REPOSITORIES — GITHUB / ZYGARDE641
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -3 }}
              className="group relative p-5 border border-hairline bg-panel/80 hover:border-red-500/50 transition-colors duration-300 flex flex-col"
            >
              {/* Corner tick on hover */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Index + meta row */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-red-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-500">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: languageColors[project.language] || '#888' }}
                  />
                  {project.language} · {project.period}
                </div>
              </div>

              <h3 className="font-display font-bold uppercase tracking-wide text-white text-lg leading-tight mb-2 group-hover:text-red-500 transition-colors">
                {project.title}
              </h3>

              <p className="text-gray-400 text-xs mb-3 line-clamp-2 leading-relaxed">
                {project.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-1 mb-4">
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
                className="mt-auto inline-flex items-center gap-1.5 self-start px-3 py-1.5 border border-hairline hover:border-red-500 hover:text-red-500 font-mono text-[11px] tracking-[0.15em] text-gray-300 transition-colors"
              >
                <Github className="w-3 h-3" />
                VIEW CODE
              </a>
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
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-red-500/50 font-mono text-xs tracking-[0.2em] text-red-500 hover:bg-red-500 hover:text-white transition-colors"
          >
            ALL REPOSITORIES
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>

      {/* Section indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2">
        <div className="w-px h-16 bg-red-500/30" />
        <span className="text-red-500 font-mono text-xs tracking-[0.25em] rotate-90 origin-center whitespace-nowrap">
          03 / PROJECTS
        </span>
        <div className="w-px h-16 bg-red-500/30" />
      </div>
    </section>
  )
}
