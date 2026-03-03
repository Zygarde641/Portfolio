'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, GraduationCap, Calendar, MapPin, Award } from 'lucide-react'

// Ordered oldest → newest (left to right), so latest is on the right
const experiences = [
  {
    id: 3,
    type: 'education',
    title: 'Bachelor of Engineering (CSE)',
    organization: 'Chandigarh University, Mohali',
    location: 'Punjab, India',
    period: 'Sep 2022 - Jun 2026',
    description:
      'Specialization in Big Data Analytics. Studying software engineering, algorithms, data structures, ML, and web technologies.',
    achievements: [
      'Specialization in Big Data Analytics',
      'Led technical workshops and coding sessions',
      'Participated in hackathons and coding competitions',
    ],
  },
  {
    id: 2,
    type: 'work',
    title: 'Data Analytics Intern',
    organization: 'Pawzz',
    location: 'Remote',
    period: 'Jun 2024 - Jul 2024',
    description:
      'Data-driven analysis using Excel, SQL, Power BI, and IBM Cognos to track donations and optimize fundraising campaigns.',
    achievements: [
      'Built automated dashboards and visual reports',
      'Monitored rescue performance metrics',
      'Streamlined workflow processes and reporting efficiency',
    ],
  },
  {
    id: 1,
    type: 'work',
    title: 'Full-Stack Developer & Internship Mentor',
    organization: 'NTS Nihon Global',
    location: 'Remote',
    period: 'May 2025 - Jul 2025',
    description:
      'Led and mentored an intern developing a ride-booking app with booking, cancellation, and fare calculation logic.',
    achievements: [
      'Designed REST APIs using Spring Boot',
      'Integrated APIs with React/TypeScript frontend',
      'Improved reliability through API optimization & testing',
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
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,51,51,0.5) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="text-red-500 font-mono text-xs tracking-widest">MY JOURNEY</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">Experience</h2>
          <div className="w-20 h-0.5 bg-red-500 mx-auto" />
        </motion.div>

        {/* Horizontal Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Timeline line */}
          <div className="relative flex items-center mb-0">
            {/* Thick horizontal line spanning all columns */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
              className="absolute left-[16.67%] right-[16.67%] top-1/2 h-px bg-red-500/50 origin-left hidden md:block"
            />

            {/* Dots sit ON the line */}
            <div className="grid grid-cols-1 md:grid-cols-3 w-full">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.25, duration: 0.4 }}
                    className="relative w-4 h-4 flex-shrink-0"
                  >
                    <div className="w-4 h-4 bg-red-500 rounded-full relative z-10 shadow-[0_0_10px_rgba(255,0,0,0.6)]">
                      <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        className="absolute inset-0 rounded-full bg-red-500/40"
                      />
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Cards below the timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mt-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.18 }}
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl border border-gray-800 bg-black/50 backdrop-blur-sm hover:border-red-500/50 transition-all flex flex-col"
              >
                {/* Type badge */}
                <div className="flex items-center gap-2 mb-2">
                  {exp.type === 'work' ? (
                    <Briefcase className="w-3.5 h-3.5 text-red-500" />
                  ) : (
                    <GraduationCap className="w-3.5 h-3.5 text-red-500" />
                  )}
                  <span className="text-red-500 text-xs font-mono uppercase">{exp.type}</span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1 leading-snug">{exp.title}</h3>
                <p className="text-gray-400 text-xs mb-2">{exp.organization}</p>

                <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                <p className="text-gray-400 text-xs mb-3 leading-relaxed">{exp.description}</p>

                <div className="space-y-1.5 mt-auto">
                  {exp.achievements.map((a, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.18 + i * 0.08 }}
                      className="flex items-start gap-1.5 text-xs"
                    >
                      <Award className="w-3 h-3 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{a}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2">
        <div className="w-px h-16 bg-red-500/30" />
        <span className="text-red-500 font-mono text-sm tracking-widest rotate-90 origin-center whitespace-nowrap">
          04 / EXPERIENCE
        </span>
        <div className="w-px h-16 bg-red-500/30" />
      </div>
    </section>
  )
}
