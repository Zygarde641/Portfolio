<div align="center">

# Arjun Srivastava — Portfolio

Welcome to my interactive developer portfolio built as an instrument panel: a music-reactive geodesic sphere, canvas-drawn 3D wireframes, and a horizontal-scroll deck of sections. Black, red `#ff3333`, and fast.

</div>

---

## Features

- **Music-reactive landing** — Web Audio API beat detection drives a circular equalizer around a hand-rolled geodesic sphere (Canvas 2D, no WebGL). The name types itself in beneath it.
- **Horizontal-scroll deck** — Welcome, About, Projects, Experience, Contact — one wheel tick / swipe / arrow key per section, plus a top nav to jump anywhere.
- **Ambient canvas layers** — floating wireframe polyhedra with mouse repel, and a hexagon grid on the intro.
- **Custom cursor** — red dot + ring with a glitter particle trail (desktop only).
- **Accessible & responsive** — honors `prefers-reduced-motion`, visible keyboard focus, reduced particle counts and touch navigation on mobile.

## Design

- **Type** — Big Shoulders Display (condensed headlines), IBM Plex Mono (labels & readouts), Inter (body), all self-hosted via `next/font`.
- **Palette** — pure black canvas, signal red accent, hairline borders, panel fills. Sharp corners throughout; circles reserved for the sphere, coin, and cursor.

## Tech

Next.js 14 (App Router) · Tailwind CSS · Framer Motion · Canvas 2D · Web Audio API

## Structure

```
frontend/
├── src/
│   ├── app/                  # layout (fonts + metadata), page (state machine), globals
│   └── components/
│       ├── GeometricIntro.tsx    # landing sphere + music bars + name reveal
│       ├── HexagonBackground.tsx # intro hexagon grid
│       ├── FloatingSpheres.tsx   # ambient 3D shapes + nebula bg
│       ├── MusicPlayer.tsx       # audio context provider + volume control
│       ├── HorizontalScroll.tsx  # section slider
│       ├── HotBar.tsx            # top navigation
│       ├── CustomCursor.tsx
│       ├── TechStack.tsx         # clustered skill readout
│       └── sections/             # WelcomePage, AboutMe, MyProjects, MyExperiences, ContactMe
└── public/                       # music.mp3, logo.png, nebula-bg.webp
```

## Run it

```bash
cd frontend
npm install
npm run dev   # http://localhost:3000
```

Deployed on Vercel. Fully static — no backend, no env vars.

---

<div align="center">

**Arjun Srivastava**

[![GitHub](https://img.shields.io/badge/GitHub-Zygarde641-181717?style=for-the-badge&logo=github)](https://github.com/Zygarde641)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Arjun_Srivastava-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/arjun-sri-dev)
[![Email](https://img.shields.io/badge/Email-zarjun641@gmail.com-EA4335?style=for-the-badge&logo=gmail)](mailto:zarjun641@gmail.com)

</div>
