# Portfolio Frontend

Next.js 14 frontend for the portfolio website.

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_GITHUB_USERNAME=Zygarde641
```

## Deployment on Vercel

1. Push to GitHub
2. Import in Vercel Dashboard
3. Set environment variables:
   - `NEXT_PUBLIC_BACKEND_URL`: Your Render backend URL
   - `NEXT_PUBLIC_GITHUB_USERNAME`: Your GitHub username
4. Deploy

## Features

- Lenis smooth scrolling
- Framer Motion animations
- TanStack Virtual for list virtualization
- Dark/Light mode toggle
- GitHub API integration
- Contact form
- Resume download
