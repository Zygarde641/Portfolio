'use client'

import { useState, useEffect } from 'react'

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  created_at: string
  updated_at: string
  pushed_at: string
}

export interface GitHubUser {
  login: string
  avatar_url: string
  html_url: string
  name: string | null
  bio: string | null
  public_repos: number
  followers: number
  following: number
}

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'Zygarde641'
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'

export function useGitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRepos() {
      try {
        // Try backend first, fallback to direct GitHub API
        let response = await fetch(`${BACKEND_URL}/api/github/repos`)
        
        if (!response.ok) {
          response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`
          )
        }

        if (!response.ok) {
          throw new Error('Failed to fetch repositories')
        }

        const data = await response.json()
        // Filter out forked repos and sort by stars
        const filteredRepos = data
          .filter((repo: GitHubRepo & { fork?: boolean }) => !repo.fork)
          .sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count)
        
        setRepos(filteredRepos)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  return { repos, loading, error }
}

export function useGitHubUser() {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        let response = await fetch(`${BACKEND_URL}/api/github/user`)
        
        if (!response.ok) {
          response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
        }

        if (!response.ok) {
          throw new Error('Failed to fetch user')
        }

        const data = await response.json()
        setUser(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { user, loading, error }
}
