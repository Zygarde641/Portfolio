'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, GraduationCap, Calendar } from 'lucide-react'

interface TimelineItem {
  id: number
  type: 'work' | 'education'
  title: string
  organization: string
  period: string
  description: string
  skills?: string[]
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    type: 'work',
    title: 'Full-Stack Developer',
    organization: 'Freelance',
    period: '2023 - Present',
    description: 'Building modern web applications for clients using React, Next.js, Node.js, and various other technologies. Focused on creating performant, accessible, and user-friendly experiences.',
    skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'],
  },
  {
    id: 2,
    type: 'education',
    title: 'Computer Science',
    organization: 'University',
    period: '2021 - Present',
    description: 'Pursuing a degree in Computer Science with focus on software engineering, algorithms, and web technologies.',
    skills: ['Data Structures', 'Algorithms', 'System Design'],
  },
  {
    id: 3,
    type: 'work',
    title: 'Open Source Contributor',
    organization: 'Various Projects',
    period: '2022 - Present',
    description: 'Contributing to open-source projects, fixing bugs, adding features, and helping maintain documentation.',
    skills: ['Git', 'GitHub', 'Collaboration', 'Code Review'],
  },
]

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-center ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-col md:gap-8`}
    >
      {/* Content */}
      <div className={`w-full md:w-1/2 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
        <div className="p-6 rounded-2xl bg-secondary/50 border border-border/50 hover:border-accent/30 transition-colors">
          <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'md:justify-end' : ''}`}>
            {item.type === 'work' ? (
              <Briefcase className="w-4 h-4 text-accent" />
            ) : (
              <GraduationCap className="w-4 h-4 text-accent" />
            )}
            <span className="text-sm text-accent font-medium">
              {item.type === 'work' ? 'Experience' : 'Education'}
            </span>
          </div>
          
          <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
          <p className="text-muted mb-2">{item.organization}</p>
          
          <div className={`flex items-center gap-2 text-sm text-muted mb-4 ${isLeft ? 'md:justify-end' : ''}`}>
            <Calendar className="w-4 h-4" />
            <span>{item.period}</span>
          </div>
          
          <p className="text-muted text-sm mb-4">{item.description}</p>
          
          {item.skills && (
            <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
              {item.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 text-xs rounded-full bg-accent/10 text-accent"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Timeline dot */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background z-10 hidden md:block" />
    </motion.div>
  )
}

export default function Experience() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="experience" ref={ref} className="relative py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-medium mb-4 block">My Journey</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Experience & Education
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            A timeline of my professional experience and educational background.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          {/* Timeline items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <TimelineCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* LinkedIn CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="https://www.linkedin.com/in/arjun-srivastava-122303288/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background font-semibold rounded-full hover:bg-accent-hover transition-colors"
          >
            Connect on LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  )
}
