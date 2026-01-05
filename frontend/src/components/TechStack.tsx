'use client'

import { motion } from 'framer-motion'

const techStack = [
  { name: 'C++', color: '#00599C', icon: '©' },
  { name: 'JavaScript', color: '#F7DF1E', icon: 'JS' },
  { name: 'Python', color: '#3776AB', icon: '🐍' },
  { name: 'TypeScript', color: '#3178C6', icon: 'TS' },
  { name: 'Vercel', color: '#000000', icon: '▲' },
  { name: 'Render', color: '#46E3B7', icon: '◆' },
  { name: 'AWS', color: '#FF9900', icon: '☁' },
  { name: 'Express.js', color: '#000000', icon: 'Ex' },
  { name: 'Next.js', color: '#000000', icon: 'N' },
  { name: 'React', color: '#61DAFB', icon: '⚛' },
  { name: 'TailwindCSS', color: '#06B6D4', icon: '🎨' },
  { name: 'PostgreSQL', color: '#4169E1', icon: '🐘' },
  { name: 'MongoDB', color: '#47A248', icon: '🍃' },
  { name: 'Matplotlib', color: '#11557C', icon: '📊' },
  { name: 'NumPy', color: '#013243', icon: '🔢' },
  { name: 'Pandas', color: '#150458', icon: '🐼' },
  { name: 'PyTorch', color: '#EE4C2C', icon: '🔥' },
  { name: 'TensorFlow', color: '#FF6F00', icon: '🧠' },
  { name: 'GitHub', color: '#181717', icon: '🐙' },
]

export default function TechStack() {
  return (
    <div className="py-8">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-2xl">💻</span> Tech Stack:
      </h3>
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.02 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="px-3 py-1.5 rounded text-sm font-medium text-white flex items-center gap-1.5"
            style={{ backgroundColor: tech.color }}
          >
            <span className="text-xs">{tech.icon}</span>
            {tech.name}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
