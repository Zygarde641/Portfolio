const express = require('express');

const router = express.Router();

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'Zygarde641';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Cache for GitHub data
let cache = {
  repos: { data: null, timestamp: 0 },
  user: { data: null, timestamp: 0 },
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper to make GitHub API requests
const fetchGitHub = async (endpoint) => {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Portfolio-Backend',
  };

  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  const response = await fetch(`https://api.github.com${endpoint}`, { headers });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
};

// GET /api/github/repos
router.get('/repos', async (req, res) => {
  try {
    const now = Date.now();

    // Check cache
    if (cache.repos.data && now - cache.repos.timestamp < CACHE_DURATION) {
      return res.json(cache.repos.data);
    }

    const repos = await fetchGitHub(`/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`);

    // Filter and sort repos
    const filteredRepos = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count);

    // Update cache
    cache.repos = { data: filteredRepos, timestamp: now };

    res.json(filteredRepos);
  } catch (error) {
    console.error('GitHub repos error:', error.message);
    
    // Return cached data if available
    if (cache.repos.data) {
      return res.json(cache.repos.data);
    }
    
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
});

// GET /api/github/user
router.get('/user', async (req, res) => {
  try {
    const now = Date.now();

    // Check cache
    if (cache.user.data && now - cache.user.timestamp < CACHE_DURATION) {
      return res.json(cache.user.data);
    }

    const user = await fetchGitHub(`/users/${GITHUB_USERNAME}`);

    // Update cache
    cache.user = { data: user, timestamp: now };

    res.json(user);
  } catch (error) {
    console.error('GitHub user error:', error.message);
    
    // Return cached data if available
    if (cache.user.data) {
      return res.json(cache.user.data);
    }
    
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// GET /api/github/stats
router.get('/stats', async (req, res) => {
  try {
    const [user, repos] = await Promise.all([
      fetchGitHub(`/users/${GITHUB_USERNAME}`),
      fetchGitHub(`/users/${GITHUB_USERNAME}/repos?per_page=100`),
    ]);

    const stats = {
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      totalForks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
      languages: [...new Set(repos.map((r) => r.language).filter(Boolean))],
    };

    res.json(stats);
  } catch (error) {
    console.error('GitHub stats error:', error.message);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;
