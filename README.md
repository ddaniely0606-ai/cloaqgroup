# CLOAQGROUP — Marketing Agency Website

> **"אנחנו הופכים מותגים לבלתי ניתנים להתעלמות."**
> *We make brands impossible to ignore.*

[![Live Site](https://img.shields.io/badge/LIVE-cloaqgroup.vercel.app-7c3aed?style=for-the-badge&logo=vercel)](https://cloaqgroup.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02?style=for-the-badge)](https://gsap.com)
[![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=for-the-badge&logo=three.js)](https://threejs.org)

---

## Overview

**CloaqGroup** is a premium Israeli-market marketing agency website built with a stealth-meets-dominance design concept. The brand identity is rooted in the meaning of *cloak* — operating unseen, then striking with impact.

- **Hebrew-first** RTL layout with `lang="he"` and `dir="rtl"`
- **Dark + purple** aesthetic — near-black backgrounds, deep purple accents, platinum highlights
- **7 specialized agents** — each section is a self-contained component with its own animations and purpose
- **Production-ready** — deployed on Vercel with full TypeScript and zero build errors

---

## Live Demo

**[https://cloaqgroup.vercel.app](https://cloaqgroup.vercel.app)**

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| 3D / Particles | Three.js (vanilla, SSR-safe) |
| Animations | GSAP + ScrollTrigger |
| Fonts | Syne (brand) + Heebo (Hebrew body) |
| Deployment | Vercel |
| Dev Tools | Context7 MCP, Playwright MCP, Figma MCP |

---

## Architecture — The 7 Agents

Each section of the site is a **self-contained agent** with its own data, animations, and purpose:

```
app/
├── page.tsx                    # Composes all agents
├── layout.tsx                  # Hebrew RTL, fonts, SEO metadata
└── globals.css                 # Cloaq design system + marquee keyframes

components/
├── agents/
│   ├── ParticleCanvas.tsx      # Three.js particle field (SSR-safe)
│   ├── HeroAgent.tsx           # Full-screen hero + GSAP logo reveal
│   ├── ServicesAgent.tsx       # 6 services, scroll-triggered cards
│   ├── PortfolioAgent.tsx      # Case studies masonry grid
│   ├── TeamAgent.tsx           # Team members with hover overlays
│   ├── TestimonialsAgent.tsx   # Infinite auto-scrolling reviews
│   └── ContactAgent.tsx        # Animated Hebrew contact form
└── ui/
    ├── Navbar.tsx              # Sticky nav with scroll blur effect
    ├── Footer.tsx              # Hebrew footer with brand links
    └── AgentsPanel.tsx         # Floating dev panel (agents overview)
```

### Agent Breakdown

| Agent | Role | Talks To |
|---|---|---|
| **HeroAgent** | First impression — 3D particles + animated logo | Every visitor |
| **ServicesAgent** | Shows what we do — 6 service cards | Potential clients |
| **PortfolioAgent** | Proves it — 5 case studies with real results | Skeptical clients |
| **TeamAgent** | Builds trust — 4 team members with bios | Trust-seekers |
| **TestimonialsAgent** | Social proof — infinite scrolling Hebrew reviews | Almost-clients |
| **ContactAgent** | Converts — animated Hebrew contact form | Ready buyers |
| **SEO Agent** | Makes it findable — metadata, RTL, OpenGraph | Google + social |

---

## Design System

```
Colors:
  --bg:           #050508   (near-black)
  --bg2:          #0d0d18   (dark navy)
  --purple:       #7c3aed   (primary accent)
  --purple-light: #a78bfa   (highlights)
  --silver:       #c4c4d4   (platinum)
  --text:         #f5f5f7   (primary text)
  --muted:        #8a8a9a   (secondary text)

Fonts:
  Syne       → Brand wordmark, headings (English)
  Heebo      → Body text (Hebrew + Latin)

Direction:
  dir="rtl" lang="he" — full Hebrew RTL layout
  .brand-en → override class for LTR brand marks
```

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/ddaniely0606-ai/cloaqgroup.git
cd cloaqgroup

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deployment

Deployed automatically to Vercel on every push to `master`.

```bash
# Manual deploy
vercel --prod
```

---

## MCP Servers (Dev Tools)

Three MCP servers configured for enhanced development:

| MCP | Purpose |
|---|---|
| **Context7** | Live Next.js/React documentation in session |
| **Playwright** | Browser automation and visual testing |
| **Figma** | Design-to-code from Figma files |

---

*Built with Claude Code by Anthropic*
