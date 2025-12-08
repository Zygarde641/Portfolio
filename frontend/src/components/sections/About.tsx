'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { Code2, Palette, Rocket, Users } from 'lucide-react'

const highlights = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable code with best practices',
  },
  {
    icon: Palette,
    title: 'UI/UX Focus',
    description: 'Creating intuitive and visually appealing interfaces',
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: 'Optimizing for speed and exceptional user experience',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Working effectively in teams and with stakeholders',
  },
]

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 bg-secondary/30"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-accent/10 rounded-3xl transform rotate-6" />
              <div className="absolute inset-0 bg-accent/5 rounded-3xl transform -rotate-3" />
              
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden bg-secondary">
                <Image
                  src="/logo.png"
                  alt="Arjun Srivastava"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-4 -right-4 bg-accent text-background px-6 py-3 rounded-full font-semibold shadow-lg"
              >
                Open to Work
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="text-accent font-medium mb-4 block">About Me</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Passionate about creating
              <span className="text-accent"> digital experiences</span>
            </h2>
            
            <div className="space-y-4 text-muted mb-8">
              <p>
                I&apos;m a full-stack developer with a passion for building beautiful, 
                functional, and user-centered digital experiences. With expertise in 
                modern web technologies, I bring ideas to life through clean code and 
                thoughtful design.
              </p>
              <p>
                My journey in tech started with curiosity and has evolved into a 
                deep commitment to continuous learning and improvement. I believe 
                in writing code that not only works but is also maintainable and 
                scalable.
              </p>
              <p>
                When I&apos;m not coding, you can find me exploring new technologies, 
                contributing to open-source projects, or sharing knowledge with 
                the developer community.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-4 rounded-xl bg-background/50 border border-border/50 hover:border-accent/50 transition-colors group"
                >
                  <item.icon className="w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
