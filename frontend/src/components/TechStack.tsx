'use client'

import { motion } from 'framer-motion'

const clusters = [
  { label: 'LANGUAGES', items: ['C++', 'Python', 'JavaScript'] },
  { label: 'FRONTEND', items: ['React', 'Next.js', 'Tailwind CSS'] },
  { label: 'BACKEND & DATA', items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'] },
  {
    label: 'DEVOPS & CLOUD',
    items: [
      'Docker',
      'Kubernetes',
      'AWS',
      'Terraform',
      'Jenkins',
      'GitHub Actions',
      'Prometheus',
      'Grafana',
      'Vercel',
      'Render',
    ],
  },
  { label: 'AI / ML', items: ['PyTorch', 'TensorFlow', 'NumPy', 'Pandas', 'Matplotlib'] },
]

export default function TechStack() {
  return (
    <div className="border-t border-hairline pt-4">
      <p className="font-mono text-[11px] tracking-[0.3em] text-red-500 mb-3">STACK</p>

      <div className="space-y-2 md:space-y-2.5">
        {clusters.map((cluster, ci) => (
          <motion.div
            key={cluster.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: ci * 0.06, duration: 0.4 }}
            className="flex flex-col md:flex-row md:items-baseline gap-1.5 md:gap-6"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-500 md:w-36 flex-shrink-0 text-left">
              {cluster.label}
            </span>
            <div className="flex flex-wrap gap-2 justify-start">
              {cluster.items.map(item => (
                <span
                  key={item}
                  className="px-2.5 py-1 border border-hairline bg-panel font-mono text-xs text-neutral-300 hover:border-red-500/60 hover:text-white transition-colors cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
