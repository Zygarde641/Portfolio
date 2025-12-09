'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useGitHubRepos, GitHubRepo } from '@/hooks/useGitHub'
import { ExternalLink, Github, Star, GitFork, Loader2 } from 'lucide-react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'

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

function ProjectCard({ repo }: { repo: GitHubRepo }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      className="group p-6 rounded-2xl bg-secondary/50 border border-border/50 hover:border-accent/50 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
            {repo.name}
          </h3>
          {repo.language && (
            <div className="flex items-center gap-2 mt-1">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: languageColors[repo.language] || '#888' }}
              />
              <span className="text-sm text-muted">{repo.language}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-background transition-colors"
            aria-label="View on GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-background transition-colors"
              aria-label="View live demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <p className="text-muted text-sm mb-4 line-clamp-2">
        {repo.description || 'No description available'}
      </p>

      <div className="flex items-center gap-4 text-sm text-muted">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4" />
          <span>{repo.stargazers_count}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork className="w-4 h-4" />
          <span>{repo.forks_count}</span>
        </div>
      </div>

      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {repo.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="px-2 py-1 text-xs rounded-full bg-accent/10 text-accent"
            >
              {topic}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function VirtualizedProjectList({ repos }: { repos: GitHubRepo[] }) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: repos.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 250,
    overscan: 3,
  })

  return (
    <div
      ref={parentRef}
      className="h-[600px] overflow-auto no-scrollbar"
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <div className="p-2">
              <ProjectCard repo={repos[virtualItem.index]} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const { repos, loading, error } = useGitHubRepos()
  const [filter, setFilter] = useState<string>('all')
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const languages = ['all', ...Array.from(new Set(repos.map((r) => r.language).filter((lang): lang is string => Boolean(lang))))]

  const filteredRepos = filter === 'all'
    ? repos
    : repos.filter((r) => r.language === filter)

  return (
    <section id="projects" ref={ref} className="relative py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-medium mb-4 block">My Work</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            A collection of projects I&apos;ve worked on, fetched directly from my GitHub.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {languages.slice(0, 6).map((lang) => (
            <button
              key={lang || 'all'}
              onClick={() => setFilter(lang || 'all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === lang
                  ? 'bg-accent text-background'
                  : 'bg-secondary hover:bg-secondary/80 text-foreground'
              }`}
            >
              {lang === 'all' ? 'All' : lang}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-muted">
            <p>Failed to load projects. Please try again later.</p>
          </div>
        ) : filteredRepos.length > 10 ? (
          <VirtualizedProjectList repos={filteredRepos} />
        ) : (
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredRepos.slice(0, 9).map((repo) => (
                <ProjectCard key={repo.id} repo={repo} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* View More Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Zygarde641?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full hover:border-accent hover:text-accent transition-colors"
          >
            <Github className="w-5 h-5" />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
