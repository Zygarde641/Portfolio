<div align="center">

# 🚀 Arjun Srivastava | Portfolio

A stunning, interactive portfolio website featuring immersive 3D animations, music-reactive visualizations, and a sleek dark theme with red accents.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Latest-FF0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

[Live Demo](https://arjun-portfolio.vercel.app) · [Report Bug](https://github.com/Zygarde641/portfolio/issues) · [Request Feature](https://github.com/Zygarde641/portfolio/issues)

</div>

---

## ✨ Features

### 🎵 Music-Reactive Animations
- **Beat Detection** - Visualizations respond to music beats, not just volume
- **Audio Frequency Bars** - Circular equalizer around the geodesic sphere
- **Auto-play** - Music starts on first user interaction

### 🔮 3D Visualizations
- **Geodesic Sphere** - Wireframe sphere with triangular faces that pulses to music
- **Hexagonal Grid** - Wave-animated hexagons that light up on mouse hover
- **Floating Geometric Shapes** - 3D tetrahedrons, cubes, and octahedrons with repel animation

### 🎨 Design
- **Dark Theme** - Pure black background (`#000000`)
- **Red Accents** - Vibrant red highlights (`#ff3333`)
- **Nebula Background** - Stunning space imagery on content pages
- **Smooth Transitions** - 2-second fade reveals and fluid animations

### 📱 Responsive
- Mobile-optimized with reduced animations for performance
- Touch-friendly interactions
- Adaptive layouts for all screen sizes

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion, Canvas API |
| **Audio** | Web Audio API |
| **Backend** | Express.js, Node.js |
| **Icons** | Lucide React |

---

## 📁 Project Structure

```
portfolio/
├── frontend/                 # Next.js application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   └── components/
│   │       ├── GeometricIntro.tsx    # Landing sphere + music bars
│   │       ├── HexagonBackground.tsx # Animated hexagon grid
│   │       ├── FloatingSpheres.tsx   # 3D shapes + nebula bg
│   │       ├── MusicPlayer.tsx       # Audio context provider
│   │       ├── TechStack.tsx         # Skills badges
│   │       └── sections/
│   │           ├── WelcomePage.tsx
│   │           ├── AboutMe.tsx
│   │           ├── MyProjects.tsx
│   │           └── MyExperiences.tsx
│   └── public/
│       ├── music.mp3        # Background music
│       ├── logo.png         # Logo image
│       └── nebula-bg.webp   # Background image
├── backend/                  # Express.js API
│   └── src/
│       ├── routes/          # API endpoints
│       └── index.js         # Server entry
└── README.md
```

---

## 📄 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/resume` | GET | Download resume PDF |
| `/api/github/repos` | GET | Fetch GitHub repositories |
| `/api/contact` | POST | Submit contact form |

---

## 🎯 Performance Optimizations

- **Lazy Loading** - Components load on demand
- **Canvas Rendering** - Hardware-accelerated 3D graphics
- **Mobile Detection** - Reduced particle counts on mobile
- **Audio Smoothing** - Prevents jarring visual jumps
- **RequestAnimationFrame** - Smooth 60fps animations

---

## 👤 Author

<div align="center">

**Arjun Srivastava**

</div>

---

<div align="center">

⭐ **Star this repo if you found it helpful!** ⭐

</div>
