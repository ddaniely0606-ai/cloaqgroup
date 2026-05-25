---
name: tailwind-v4-systems
description: Build Tailwind v4 design systems using CSS-first config (@theme) instead of tailwind.config.js. Use when starting a new project with Tailwind 4.x, migrating from v3, or designing custom design tokens, color scales, fluid typography, container queries, and `@starting-style` entry animations.
category: frontend
version: 0.1.0
tags: [tailwind, css, design-system, tokens]
recommended_npm: ["tailwindcss", "@tailwindcss/postcss", "@tailwindcss/vite", "tailwind-merge"]
license: MIT
author: claude-code-skills
---

Tailwind 4 changed the model: design tokens live in CSS via `@theme`, not in a JS config. The Oxide engine compiles in microseconds, so you can use container queries, modern color spaces, and `@starting-style` without a build step penalty.

## Setup

```css
/* app.css */
@import "tailwindcss";

@theme {
  --font-display: "Geist", ui-sans-serif, system-ui;
  --font-body: "Geist", ui-sans-serif, system-ui;
  --font-mono: "Geist Mono", ui-monospace, monospace;

  --color-bg: oklch(0.99 0.01 240);
  --color-fg: oklch(0.18 0.02 250);
  --color-accent: oklch(0.65 0.22 25);
  --color-muted: oklch(0.94 0.01 250);

  --radius-sharp: 0.125rem;
  --radius-soft: 1rem;

  --shadow-pop: 0 1px 0 0 rgb(0 0 0 / 0.04), 0 8px 24px -8px rgb(0 0 0 / 0.12);

  /* Custom screen sizes (container queries are first-class) */
  --breakpoint-3xl: 1920px;
}

@layer base {
  body {
    @apply bg-bg text-fg font-body antialiased;
    background-image:
      radial-gradient(circle at 0% 0%, oklch(from var(--color-accent) l c h / 0.08), transparent 40%),
      radial-gradient(circle at 100% 100%, oklch(from var(--color-accent) l c h / 0.05), transparent 50%);
  }
}
```

## Patterns to use in v4

- **`@theme` over `tailwind.config.js`.** Tokens cascade, can be overridden per route, per component, per `@media (prefers-color-scheme)`.
- **OKLCH colors.** Perceptually uniform; lightness shifts behave predictably across hues. Use `oklch(from var(--color-accent) calc(l + 0.1) c h)` for hover states.
- **Container queries everywhere.** `@container (min-width: 600px)` works without a plugin. Tag containers with `@container/sidebar` named scopes.
- **Fluid typography with `clamp`.** `font-size: clamp(1rem, 0.5rem + 1.5vw, 1.5rem);` — no breakpoint hops.
- **`@starting-style` for entry animations.** Pair with `transition-discrete` on `display: none → block` for popovers without JS.
- **Subgrid.** `grid-cols-subgrid` for table-like layouts with shared column tracks.

## v3 → v4 migration checklist

1. Replace `tailwind.config.{ts,js}` with `@theme` blocks. Keep the file only for plugins that aren't yet ported.
2. Delete `@tailwind base; @tailwind components; @tailwind utilities;` → replace with one `@import "tailwindcss";`.
3. Run `npx @tailwindcss/upgrade@latest` to rewrite class names that changed (`shadow-sm` → `shadow-xs`, `outline-none` → `outline-hidden`, etc.).
4. Update PostCSS config: `tailwindcss` plugin → `@tailwindcss/postcss`.
5. If using Vite, prefer `@tailwindcss/vite` plugin (faster).

## What NOT to do

- ❌ Don't keep a `tailwind.config.ts` "just in case" — it splits the source of truth.
- ❌ Don't use `theme(colors.gray.500)` in arbitrary properties — use `var(--color-gray-500)` directly.
- ❌ Don't fight the CSS cascade by piling `!important` — use `@layer` ordering.
- ❌ Don't ship a tailwind site that looks like every other tailwind site. Customize at least: font, primary color (avoid the default zinc + blue), border radius, and one signature shadow or gradient.
