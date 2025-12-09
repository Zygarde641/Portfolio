'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, GraduationCap, Calendar, MapPin, Award } from 'lucide-react'

// Experience data from resume
const experiences = [
  {
    id: 1,
    type: 'work',
    title: 'Full-Stack Developer & Internship Mentor',
    organization: 'NTS Nihon Global',
    location: 'Remote',
    period: 'May 2025 - Jul 2025',
    description:
      'Led and mentored an intern in developing a ride-booking application with booking, cancellation, and fare calculation logic.',
    achievements: [
      'Designed and implemented backend REST APIs using Spring Boot',
      'Integrated APIs with React/TypeScript frontend components',
      'Improved system reliability through API optimization, testing, and seamless frontend-backend communication',
    ],
  },
  {
    id: 2,
    type: 'work',
    title: 'Data Analytics Intern',
    organization: 'Pawzz',
    location: 'Remote',
    period: 'June 2024 - July 2024',
    description:
      'Conducted data-driven analysis using Excel, SQL, Power BI, and IBM Cognos to track donations and optimize fundraising campaigns.',
    achievements: [
      'Built automated dashboards and visual reports to support operational decision-making',
      'Monitored rescue performance metrics',
      'Collaborated with cross-functional teams to streamline workflow processes and improve reporting efficiency',
    ],
  },
  {
    id: 3,
    type: 'education',
    title: 'Bachelor of Engineering (CSE)',
    organization: 'Chandigarh University, Mohali',
    location: 'Punjab, India',
    period: 'September 2022 - June 2026',
    description:
      'Specialization in Big Data Analytics. Studying software engineering, algorithms, data structures, machine learning, and web technologies.',
    achievements: [
      'Specialization in Big Data Analytics',
      'Led technical workshops and coding sessions',
      'Participated in hackathons and coding competitions',
    ],
  },
]

export default function MyExperiences() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-150px' })

  return (
    <section
      ref={ref}
      id="experience"
      className="relative min-h-screen py-24 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
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
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-red-500 font-mono text-sm tracking-widest">
            MY JOURNEY
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
            Experience
          </h2>
          <div className="w-24 h-0.5 bg-red-500 mx-auto" />
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Animated timeline line (from first dot to last, behind cards) */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute left-0 md:left-1/2 top-0 w-px bg-red-500/70 md:-translate-x-1/2 origin-top z-0"
          />

          {/* Experience cards */}
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } z-10`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-red-500 rounded-full transform -translate-x-1/2 z-20">
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-red-500/40"
                />
              </div>

              {/* Content */}
              <div
                className={`flex-1 ml-8 md:ml-0 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-xl border border-gray-800 bg-black/50 backdrop-blur-sm hover:border-red-500/50 transition-all"
                >
                  {/* Type badge */}
                  <div
                    className={`flex items-center gap-2 mb-3 ${
                      index % 2 === 0 ? 'md:justify-end' : ''
                    }`}
                  >
                    {exp.type === 'work' ? (
                      <Briefcase className="w-4 h-4 text-red-500" />
                    ) : (
                      <GraduationCap className="w-4 h-4 text-red-500" />
                    )}
                    <span className="text-red-500 text-sm font-mono uppercase">
                      {exp.type}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <h3 className="text-xl font-bold text-white mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-gray-400 mb-3">{exp.organization}</p>

                  {/* Meta info */}
                  <div
                    className={`flex flex-wrap gap-4 text-sm text-gray-500 mb-4 ${
                      index % 2 === 0 ? 'md:justify-end' : ''
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          delay: index * 0.2 + i * 0.1 + 0.5,
                          duration: 0.4,
                        }}
                        className={`flex items-start gap-2 text-sm ${
                          index % 2 === 0
                            ? 'md:flex-row-reverse md:text-right'
                            : ''
                        }`}
                      >
                        <Award className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>

        {/* Contact Me Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-20 py-16 border-t border-red-500/20"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Contact Me
          </h3>
          <p className="text-gray-400 mb-8 text-lg">
            Let&apos;s connect and build something amazing together
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a
              href="https://github.com/Zygarde641"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-gray-900 border border-red-500/30 rounded-full hover:border-red-500 hover:bg-red-500/10 transition-all group"
            >
              <svg
                className="w-6 h-6 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="text-white group-hover:text-red-400 transition-colors">
                GitHub
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/arjun-srivastava-122303288/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-gray-900 border border-red-500/30 rounded-full hover:border-red-500 hover:bg-red-500/10 transition-all group"
            >
              <svg
                className="w-6 h-6 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="text-white group-hover:text-red-400 transition-colors">
                LinkedIn
              </span>
            </a>

            <a
              href="mailto:zarjun641@gmail.com"
              className="flex items-center gap-3 px-6 py-3 bg-gray-900 border border-red-500/30 rounded-full hover:border-red-500 hover:bg-red-500/10 transition-all group"
            >
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-white group-hover:text-red-400 transition-colors">
                zarjun641@gmail.com
              </span>
            </a>

            <a
              href="+91 91255 45599"
              className="flex items-center gap-3 px-6 py-3 bg-gray-900 border border-red-500/30 rounded-full hover:border-red-500 hover:bg-red-500/10 transition-all group"
            >
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5.5C3 4.1 4.1 3 5.5 3h2A1.5 1.5 0 019 4.5v2A1.5 1.5 0 017.5 8H7c1.2 2.9 3.6 5.3 6.5 6.5v-.5A1.5 1.5 0 0115 13h2A1.5 1.5 0 0118.5 14.5v2A1.5 1.5 0 0117 18h-.5C9.5 18 3 11.5 3 3.5V3z"
                />
              </svg>

              <span className="text-white group-hover:text-red-400 transition-colors">
                +91 91255 45599
              </span>
            </a>
          </div>

          <a
            href="/api/resume"
            download
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-colors"
          >
            Download Resume
          </a>
        </motion.div>
      </div>

      {/* Section indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2">
        <div className="w-px h-16 bg-red-500/30" />
        <span className="text-red-500 font-mono text-sm tracking-widest rotate-90 origin-center whitespace-nowrap">
          03 / EXPERIENCE
        </span>
        <div className="w-px h-16 bg-red-500/30" />
      </div>
    </section>
  )
}
