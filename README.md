# CLOAQGROUP — Marketing Agency Website

> **"אנחנו הופכים מותגים לבלתי ניתנים להתעלמות."**
> *We make brands impossible to ignore.*

[![Live Site](https://img.shields.io/badge/LIVE-Vercel-7c3aed?style=for-the-badge&logo=vercel)](https://cloaqgroup-o160oyeun-ddaniely0606-ais-projects.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge)](https://gsap.com)
[![Three.js](https://img.shields.io/badge/Three.js-0.184-black?style=for-the-badge&logo=three.js)](https://threejs.org)

---

## Overview

**CloaqGroup** is a premium Israeli-market marketing agency website built with a stealth-meets-dominance design concept. The brand identity is rooted in the meaning of *cloak* — operating unseen, then striking with impact.

- **Hebrew-first** RTL layout with `lang="he"` and `dir="rtl"`
- **Dark + purple** aesthetic — near-black backgrounds, deep purple accents, platinum highlights
- **9 specialized agents** — each section is a self-contained component with its own animations and purpose
- **Production-ready** — deployed on Vercel with full TypeScript and zero build errors
- **19+ Claude Code skills** installed for ongoing AI-assisted development

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + CSS custom properties |
| 3D / Particles | Three.js (vanilla, SSR-safe) |
| Animations | GSAP + ScrollTrigger |
| Icons | lucide-react |
| Fonts | Syne (brand/English) + Heebo (Hebrew body) |
| Deployment | Vercel |

---

## Architecture — The 9 Agents

```
app/
├── page.tsx                    # Composes all agents in order
├── layout.tsx                  # Hebrew RTL, fonts, full SEO metadata
└── globals.css                 # Design system, marquee keyframes, responsive

components/
├── agents/
│   ├── ParticleCanvas.tsx      # Three.js particle field (SSR-safe, dynamic import)
│   ├── HeroAgent.tsx           # Full-screen hero + GSAP logo reveal
│   ├── StatsAgent.tsx          # Animated count-up KPI metrics
│   ├── ServicesAgent.tsx       # 6 services, scroll-triggered cards
│   ├── ProcessAgent.tsx        # 6-step client journey timeline
│   ├── PortfolioAgent.tsx      # Case studies masonry grid
│   ├── TeamAgent.tsx           # Team members with hover overlays
│   ├── TestimonialsAgent.tsx   # Infinite auto-scrolling reviews
│   └── ContactAgent.tsx        # Animated Hebrew contact form
└── ui/
    ├── Navbar.tsx              # Sticky nav with scroll blur + mobile menu
    ├── Footer.tsx              # Hebrew footer with brand links
    ├── CustomCursor.tsx        # Purple glow dot + lagging ring cursor
    ├── Preloader.tsx           # Logo reveal + progress bar entrance
    ├── ScrollProgress.tsx      # Purple gradient scroll-progress line
    ├── WhatsAppButton.tsx      # Fixed WhatsApp CTA (bottom-right)
    └── AgentsPanel.tsx         # Floating dev panel — all 9 agents listed
```

### Agent Breakdown

| Agent | Role | Audience |
|---|---|---|
| **HeroAgent** | 3D particles + animated logo reveal | Every visitor |
| **StatsAgent** | Count-up KPIs: 200+ brands, ₪50M ad spend, 340% growth | Validates scale |
| **ServicesAgent** | 6 service cards — what we do | Potential clients |
| **ProcessAgent** | 6-step journey: Discovery → Strategy → Creative → Launch → Optimize → Scale | Shows how we work |
| **PortfolioAgent** | 5 case studies with real results in masonry grid | Skeptical clients |
| **TeamAgent** | 4 team members with bios and social hover | Trust-seekers |
| **TestimonialsAgent** | Infinite dual-marquee Hebrew client reviews | Almost-clients |
| **ContactAgent** | Animated Hebrew contact form with success state | Ready buyers |
| **SEO / Layout** | Metadata, OpenGraph, Twitter card, robots, RTL | Google + social |

---

## Design System

```
Colors:
  --bg:           #050508   (near-black main background)
  --bg2:          #0d0d18   (dark navy section alternate)
  --purple:       #7c3aed   (primary accent)
  --purple-light: #a78bfa   (highlights, icons, labels)
  --silver:       #c4c4d4   (platinum)
  --text:         #f5f5f7   (primary text)
  --muted:        #8a8a9a   (secondary text)

Fonts:
  Syne   → Brand wordmark, numbers, English marks (.brand-en)
  Heebo  → Hebrew body text (default)

Direction:
  dir="rtl" lang="he"   — full RTL layout globally
  .brand-en             — LTR override for English islands
```

---

## Getting Started

```bash
git clone https://github.com/ddaniely0606-ai/cloaqgroup.git
cd cloaqgroup
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

```bash
# Production build
npm run build

# Deploy to Vercel
vercel --prod --yes
```

---

## Claude Code Skills Installed

### via `npx skills add` (.agents/skills/)
`find-skills` · `frontend-design` · `vercel-react-best-practices` · `web-design-guidelines` · `ui-ux-pro-max`

### via `npx claude-code-templates` (.claude/skills/)
`senior-architect` · `senior-frontend` · `senior-backend` · `senior-fullstack` · `code-reviewer` · `skill-creator` · `git-commit-helper` · `senior-security` · `senior-prompt-engineer` · `brainstorming` · `seo-optimizer` · `react-best-practices` · `ui-design-system` · `canvas-design` · `mobile-design` · `frontend-design` · `webapp-testing` · `docx` · `ui-ux-pro-max`

---

*Built with Claude Code by Anthropic*
