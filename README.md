<div align="center">

# 🚀 Arjun Srivastava | Portfolio

A stunning, interactive portfolio website featuring immersive 3D animations, music-reactive visualizations, and a sleek dark theme with red accents.
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

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Zygarde641/portfolio.git
cd portfolio

# Install frontend dependencies
cd frontend
npm install

# Start development server
npm run dev
```

The app will be running at `http://localhost:3000`

### Backend (Optional)

```bash
cd backend
npm install
npm run dev
```

---

## 🔧 Environment Variables

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_GITHUB_USERNAME=Zygarde641
```

### Backend (`backend/.env`)
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
GITHUB_TOKEN=your_github_token
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

## 📸 Screenshots

<div align="center">

| Landing Page | Projects Section |
|:---:|:---:|
| Geodesic sphere with music bars | Nebula background with 3D shapes |

</div>

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

<div align="center">

**Arjun Srivastava**

[![GitHub](https://img.shields.io/badge/GitHub-Zygarde641-181717?style=for-the-badge&logo=github)](https://github.com/Zygarde641)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Arjun_Srivastava-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/arjun-srivastava-122303288/)
[![Email](https://img.shields.io/badge/Email-zarjun641@gmail.com-EA4335?style=for-the-badge&logo=gmail)](mailto:zarjun641@gmail.com)

</div>

---

<div align="center">

⭐ **Star this repo if you found it helpful!** ⭐

</div>
