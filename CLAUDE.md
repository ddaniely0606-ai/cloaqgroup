@AGENTS.md

# Mythos Agency — Project Context for Claude

## What this is
Premium Hebrew-first marketing agency website for the Israeli market.
Stack: Next.js 16 App Router · React 19 · TypeScript · Tailwind v4 · GSAP · Three.js (vanilla) · lucide-react.

## Design System
- `--bg`: #050508 (main dark)
- `--bg2`: #0d0d18 (section alt)
- `--green`: #059669 (primary — emerald)
- `--green-light`: #4ade80
- `--text`: #f5f5f7
- `--muted`: #8a8a9a
- Display font: `var(--font-syne)` (English/brand marks only)
- Body font: `var(--font-heebo)` (Hebrew content)
- Direction: `rtl` globally; English islands use `.brand-en` (`direction: ltr; unicode-bidi: isolate`)

## Section Order (page.tsx)
1. HeroAgent — Three.js particles + GSAP letter reveal
2. StatsAgent — count-up KPIs (200+, ₪50M+, 340%, 98%)
3. ServicesAgent — 6 service cards
4. ProcessAgent — 6-step client journey (Discovery → Scale)
5. PortfolioAgent — masonry case studies grid
6. TeamAgent — team cards with hover overlay
7. TestimonialsAgent — infinite marquee testimonials
8. ContactAgent — animated Hebrew contact form
9. Footer

## Component Rules
- Every `"use client"` component — use GSAP for scroll animations, not Framer Motion
- All section `<section>` elements get `className="cv-auto"` for content-visibility perf
- GSAP context + `ctx.revert()` in every useEffect cleanup
- Passive event listeners for scroll/mousemove (`{ passive: true }`)
- No inline `onClick` state for hover — use `onMouseEnter`/`onMouseLeave` + React.useState
- Icon imports: lucide-react ONLY — avoid Twitter/Linkedin/Instagram (not in this version)
- Safe icons: AtSign, Link2, Globe, Play, ArrowUpLeft, Check, X, etc.

## Skills Available
### .agents/skills/ (via `npx skills add`)
- `find-skills` — skill discovery
- `frontend-design` — Anthropic frontend design guidelines
- `vercel-react-best-practices` — Vercel React perf rules
- `web-design-guidelines` — web design standards
- `ui-ux-pro-max` — advanced UI/UX data

### .claude/skills/ (via `npx claude-code-templates`)
- `senior-architect`, `senior-frontend`, `senior-backend`, `senior-fullstack`
- `code-reviewer`, `skill-creator`, `git-commit-helper`, `senior-security`
- `senior-prompt-engineer`, `brainstorming`, `seo-optimizer`
- `react-best-practices`, `ui-design-system`, `ui-ux-pro-max`
- `canvas-design`, `mobile-design`, `frontend-design`
- `webapp-testing`, `docx`

## Deployment
- Live: Vercel production (run `vercel --prod --yes`)
- Repo: https://github.com/ddaniely0606-ai/cloaqgroup
- Push: `git push origin master`

## Hebrew Notes
- All visible copy is Hebrew except: logo (MYTHOS AGENCY), team member English names, service English subtitles
- Tagline: "אנחנו הופכים מותגים לבלתי ניתנים להתעלמות."
- Nav labels: שירותים, תהליך, עבודות, צוות, צור קשר
- CTA: "בואו נדבר"
