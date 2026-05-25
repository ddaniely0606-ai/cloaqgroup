---
name: layered-background-craft
description: Build atmospheric, layered backgrounds — gradient stacks, noise overlays, geometric patterns, contextual depth — instead of flat colors. Use on any hero, landing, or marketing surface where the background is currently `bg-white` or `bg-gray-50`. CSS-only, no images.
category: ui-design
version: 0.1.0
tags: [background, css, gradient, aesthetic, design]
recommended_npm: []
license: MIT
author: claude-code-skills
---

A flat background is the single biggest "AI-generated" tell. Real designers layer 2-4 effects so the surface has *atmosphere*. None of these need an image; everything is CSS.

## Layer recipe (stack from bottom to top)

1. **Base color** in OKLCH (perceptually uniform).
2. **Radial gradient** (or two) for soft light.
3. **Conic / linear gradient** for direction.
4. **Noise overlay** at 3-6% opacity (kills banding, adds texture).
5. **Vignette** for focus.

```css
.atmosphere {
  background-color: oklch(0.99 0.01 240);
  background-image:
    /* layer 4: noise */
    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2'/><feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0'/></filter><rect width='160' height='160' filter='url(%23n)'/></svg>"),
    /* layer 3: directional */
    linear-gradient(135deg, transparent 0%, oklch(0.95 0.04 250 / 0.4) 100%),
    /* layer 2b: secondary light */
    radial-gradient(circle at 100% 100%, oklch(0.92 0.10 30 / 0.35), transparent 50%),
    /* layer 2a: primary light */
    radial-gradient(circle at 0% 0%, oklch(0.88 0.18 280 / 0.45), transparent 45%);
  background-attachment: fixed;
  background-size: 160px 160px, auto, auto, auto;
}
```

## Pattern variants

### Subtle product page

Two soft radials, one off-canvas, on near-white base. No noise. Good for B2B SaaS that wants depth without character.

### Contrast-heavy hero

Dark base (`oklch(0.18 0.03 250)`) + one large bright radial in brand color + grid SVG overlay at 4% opacity. Used by Linear, Vercel, Resend.

### Brutalist / editorial

Solid pastel base (`oklch(0.93 0.06 80)`) + thick noise (8-10%) + no gradients. Texture-driven, no glow.

### Dot / grid patterns

```css
.dot-grid {
  background-color: oklch(0.99 0.01 240);
  background-image:
    radial-gradient(circle, oklch(0.85 0.02 250) 1px, transparent 1px);
  background-size: 24px 24px;
  mask-image: radial-gradient(circle at 50% 30%, black 20%, transparent 70%);
}
```

The `mask-image` fades the pattern toward the edges — feels intentional, not tiled.

### Animated aurora (subtle)

```css
@keyframes drift {
  0%   { transform: translate(0%, 0%) rotate(0deg); }
  100% { transform: translate(8%, -4%) rotate(20deg); }
}
.aurora::before {
  content: "";
  position: absolute; inset: -20%;
  background: radial-gradient(circle, oklch(0.78 0.22 300 / 0.5), transparent 50%);
  filter: blur(80px);
  animation: drift 20s ease-in-out infinite alternate;
}
```

Slow (15-25s), low-amplitude (≤10% movement), eye doesn't track it consciously but the surface feels alive.

## Performance gates

- Use `background-attachment: fixed` only on hero (paint cost is high; not for the whole page).
- Animated backgrounds: `will-change: transform` on the animated layer, never on the parent.
- Noise SVG inlined as data URI — no extra request.
- For mobile, drop the noise + animation (`@media (max-width: 640px)` or `prefers-reduced-motion`).

## Anti-patterns

- ❌ Flat single color on a hero. (`bg-white` and stop. No.)
- ❌ Three opposing brand-color gradients fighting each other. Pick one direction.
- ❌ Animated background under text — illegibility. Animate behind a card, not behind copy.
- ❌ Glassmorphism applied to every card on the page. Glass works once; twice it's a theme; thrice it's a meme.
- ❌ Blur radii > 100px on mobile — kills GPU.
- ❌ Pattern with no `mask-image` falloff — looks like a stock background.

## Quality gates

- Background passes the "remove test": removing it visibly degrades the page.
- Text on top still passes WCAG AA (4.5:1) at all viewport sizes.
- Lighthouse Performance ≥ 90 even with the background present.
- `prefers-reduced-motion` disables any animation.
