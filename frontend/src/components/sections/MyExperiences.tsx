'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, GraduationCap } from 'lucide-react'

// Ordered oldest → newest (left to right), so latest is on the right
const experiences = [
  {
    id: 3,
    type: 'education',
    title: 'Bachelor of Engineering (CSE)',
    organization: 'Chandigarh University',
    location: 'Punjab, India',
    period: 'Sep 2022 — Jun 2026',
    description:
      'Graduated with a specialization in Big Data Analytics — software engineering, algorithms, data structures, ML, and web technologies.',
    achievements: [
      'Graduated, specializing in Big Data Analytics',
      'Led technical workshops and coding sessions',
      'Hackathons and competitive programming',
    ],
  },
  {
    id: 2,
    type: 'work',
    title: 'Data Analytics Intern',
    organization: 'Pawzz',
    location: 'Remote',
    period: 'Jun 2024 — Jul 2024',
    description:
      'Data-driven analysis using Excel, SQL, Power BI, and IBM Cognos to track donations and optimize fundraising campaigns.',
    achievements: [
      'Built automated dashboards and visual reports',
      'Monitored rescue performance metrics',
      'Streamlined reporting workflows',
    ],
  },
  {
    id: 1,
    type: 'work',
    title: 'Full-Stack Developer & Internship Mentor',
    organization: 'NTS Nihon Global',
    location: 'Remote',
    period: 'May 2025 — Jul 2025',
    description:
      'Led and mentored an intern developing a ride-booking app with booking, cancellation, and fare calculation logic.',
    achievements: [
      'Designed REST APIs using Spring Boot',
      'Modeled the data layer and service logic in Spring Boot',
      'Improved reliability through API optimization & testing',
    ],
  },
  {
    id: 0,
    type: 'work',
    title: 'DevOps Engineer',
    organization: 'Altrodav Technologies',
    location: 'Remote',
    period: 'May 2026 — Present',
    description:
      'Building end-to-end delivery pipelines across GitHub Actions, AWS, Docker, and Kubernetes, with CloudWatch observability and streamlined releases.',
    achievements: [
      'Built end-to-end CI/CD pipelines with GitHub Actions',
      'Containerized services on Docker & Kubernetes across AWS',
      'Streamlined deployments and cut release lead time',
      'Wired CloudWatch metrics, logs, and alerting',
    ],
  },
]

export default function MyExperiences() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section
      ref={ref}
      id="experience"
      className="relative min-h-screen overflow-y-auto overflow-x-hidden flex flex-col justify-center py-12 md:py-16"
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10 border-b border-hairline pb-5"
        >
          <div>
            <span className="font-mono text-[11px] md:text-xs tracking-[0.3em] text-red-500">
              04 / EXPERIENCE
            </span>
            <h2 className="font-display font-extrabold uppercase text-white text-5xl md:text-6xl mt-2 leading-none">
              The Record<span className="text-red-500">.</span>
            </h2>
          </div>
          <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-neutral-500">
            2022 — PRESENT, OLDEST → NEWEST
          </p>
        </motion.div>

        {/* Horizontal Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Timeline rail with nodes */}
          <div className="relative flex items-center mb-0">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
              className="absolute left-[12.5%] right-[12.5%] top-1/2 h-px bg-red-500/50 origin-left hidden md:block"
            />

            <div className="grid grid-cols-1 md:grid-cols-4 w-full">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.25, duration: 0.4 }}
                    className="relative w-3.5 h-3.5 flex-shrink-0"
                  >
                    <div className="w-3.5 h-3.5 bg-red-500 rotate-45 relative z-10 shadow-[0_0_10px_rgba(255,0,0,0.6)]">
                      <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        className="absolute inset-0 bg-red-500/40"
                      />
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Cards below the timeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 mt-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.18 }}
                className="group p-5 border border-hairline bg-panel/80 hover:border-red-500/50 transition-colors flex flex-col relative"
              >
                <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Type + period */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {exp.type === 'work' ? (
                      <Briefcase className="w-3.5 h-3.5 text-red-500" />
                    ) : (
                      <GraduationCap className="w-3.5 h-3.5 text-red-500" />
                    )}
                    <span className="text-red-500 text-[10px] font-mono tracking-[0.2em] uppercase">
                      {exp.type}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-neutral-500">{exp.location}</span>
                </div>

                <h3 className="font-display font-bold uppercase tracking-wide text-white text-xl leading-tight mb-1">
                  {exp.organization}
                </h3>
                <p className="text-gray-300 text-xs mb-1">{exp.title}</p>
                <p className="font-mono text-[10px] text-neutral-500 mb-3">{exp.period}</p>

                <p className="text-gray-400 text-xs mb-3 leading-relaxed">{exp.description}</p>

                <ul className="space-y-1.5 mt-auto">
                  {exp.achievements.map((a, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.18 + i * 0.08 }}
                      className="flex items-start gap-1.5 text-xs"
                    >
                      <span className="text-red-500 mt-0.5 flex-shrink-0">▹</span>
                      <span className="text-gray-300">{a}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2">
        <div className="w-px h-16 bg-red-500/30" />
        <span className="text-red-500 font-mono text-xs tracking-[0.25em] rotate-90 origin-center whitespace-nowrap">
          04 / EXPERIENCE
        </span>
        <div className="w-px h-16 bg-red-500/30" />
      </div>
    </section>
  )
}
