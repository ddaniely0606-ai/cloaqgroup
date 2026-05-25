---
name: design-self-review
description: "After building or modifying a webpage, render it to a screenshot and self-review it like a senior designer: palette coherence (no off-palette buttons, no text same colour as background, no text same colour as button), contrast ratios (WCAG AA minimum), typography legibility (no unreadable glyphs, right font weights), hierarchy, spacing, and visual bugs (overflow, broken images, invisible elements). If issues found, fix them and re-screenshot until the page passes. Use EVERY time a webpage/landing/artifact reaches a 'done' state, before handing it back to the user. Do not ship without running this review."
version: 1.1.0
license: MIT
source: skillport/originals
tags: [design-review, palette, contrast, wcag, qa, screenshot, playwright, self-critique]
category: design
trust_tier: verified
---

# Design Self-Review

The iron rule: **before any page/landing/artifact is handed back to the user, you screenshot it, look at the screenshot, and audit it yourself.** Most bad design output in Claude sessions is not because the model can't design — it's because it doesn't actually LOOK at what it built. Same-colour text on background. Dark buttons on an orange hero. Cyrillic glyphs that rendered as `□`. None of these survive a single critical look, but they ship because nobody looked.

## When this skill runs

Activates automatically on these completion signals:

- Claude has just written/modified an HTML file and is about to say "done" / "ready" / "here is your page" (in any language)
- User says "show me the result" / "how does it look" / equivalent in any language
- The workflow is about to call `install_skill` or `frontend-design` handoff
- Before any PR / commit that touches visual layout
- After any image-sourcing or theme change

Do NOT skip this. A page without self-review isn't finished.

## The review protocol

### Step 1 — Take a screenshot of the actual rendered page

Required capability: Playwright via MCP or local script. Typical command:

```bash
npx playwright@latest screenshot \
  --full-page \
  --viewport-size=1440,900 \
  "file://$PWD/index.html" \
  .review/full.png

# Also capture mobile (critical — desktop-only reviews miss half the bugs)
npx playwright@latest screenshot \
  --full-page \
  --viewport-size=390,844 \
  "file://$PWD/index.html" \
  .review/mobile.png
```

If Playwright is not available, use `wkhtmltoimage`, `chromium --headless --screenshot`, or stop and tell the user you need a screenshot capability.

Render at BOTH desktop (1440w) and mobile (390w). Most visual-bug failures are mobile-specific.

### Step 2 — Open the screenshot and run the audit

Use the session's image-reading capability to actually LOOK at the file. Then walk through the 6-point audit.

#### Audit 0 — STATIC CONTRAST SWEEP (non-negotiable, runs BEFORE any visual inspection)

This is a programmatic pass before you even open the screenshot. Dark-text-on-dark-bg and same-colour-text-on-same-bg ship regularly because people "eyeball" the page. Eyeballs lie. Math doesn't.

Parse the rendered HTML + CSS. For every text-bearing element, resolve:

1. Its **computed foreground colour** (follow `color`, cascade, inherit).
2. Its **effective background colour** — the FIRST non-transparent ancestor's `background-color` OR the section's `background-image` dominant colour (sample the rendered pixel if it's an image).

Then compute contrast:

```js
function luminance(rgb) {
  const [r,g,b] = rgb.map(c => {
    c = c/255;
    return c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4);
  });
  return 0.2126*r + 0.7152*g + 0.0722*b;
}
function contrast(a, b) {
  const L1 = luminance(a), L2 = luminance(b);
  return (Math.max(L1,L2) + 0.05) / (Math.min(L1,L2) + 0.05);
}
```

Fail the page if ANY text element has:

- **contrast < 3.0** → BLOCKER (practically unreadable — hard-fail even before AA check)
- **contrast < 4.5 for body text (< 18pt or < 14pt bold)** → BLOCKER (fails WCAG AA)
- **contrast < 3.0 for large text** → BLOCKER (fails WCAG AA for large)

Concrete traps this audit catches that eyeballing misses:

- **Dark button on dark background section** — e.g., button `#191817` inside a `<section style="background: linear-gradient(#2a1f1a,#1a0e08)">`. Contrast ~1.2:1. Button is nearly invisible.
- **Text the same colour family as the button** — `color: #C8833A` label on `background: #C8833A` button. Contrast 1.0:1. Zero-legibility.
- **Faded grey body text on cream** — `color: rgba(139,130,120,0.5)` on `#F4F3EE` — eyeballs see "subtle"; contrast says 2.1:1 (fail).
- **Placeholder / disabled state shipped as primary** — copy that renders at 40% opacity because a `.muted` class leaked onto a primary paragraph.
- **White text on a hero `<img>` with a bright top-middle area** — hero looks fine at wide viewport; at mobile the bright sky lands under the headline and contrast dies.

**How to run this sweep without a browser:** if you don't have Playwright, parse the `style` blocks + inline styles, apply the cascade manually to each text node, build a `{selector, fg_rgb, bg_rgb, contrast}` table. Print the table. Any row under 4.5 for body or 3.0 for large → BLOCKER.

**Do not proceed to Audits 1–6 until Audit 0 is zero blockers.**

#### Audit 1 — Palette coherence

Extract the page's actual palette (from `--color-*` CSS variables or from sampling the rendered image). Then check every visible element:

- **Buttons:** Is each button's background drawn from the palette? A jet-black `#000` or `#191817` CTA on an orange `#C8833A` hero is OFF-PALETTE. Buttons should be in the palette's accent or neutral family, not an unrelated dark.
- **Text:** Every text colour must be in the palette. `color: black` or `color: white` raw are red flags — use `var(--ink)` or `var(--bg)`.
- **Borders, dividers:** Same — drawn from palette.
- **One-off colours** (a random purple somewhere, a blue link that nobody restyled): flag them.

Fail cases to catch (all are BLOCKERS):

1. **Dark button on dark / coloured hero** — e.g., near-black `#191817` CTA on a `#C8833A` orange full-bleed hero, or a `#1C1913` button on a `#2E4A3A` forest background. Generic "dark button" is a default that escapes the palette. Fix: button bg must be in `{--bg, --accent, --accent-soft, white}` depending on the section's bg; button text must then be the CONTRAST colour (if bg is accent/dark → text is bg/cream; if bg is cream → text is ink).
2. **Button colour = surrounding section bg** — e.g., `background: var(--accent)` on a section that already is `background: var(--accent)`. The button disappears. Fix: button must stand out from its immediate parent by contrast ≥ 3.0.
3. **Text same colour as background** — `color: #fff` on `background: #fff` section (zero contrast, invisible).
4. **Text same colour as button-next-to-it** — label of a button and adjacent paragraph the same hex. Eye can't separate hierarchy.
5. **Button text same colour as button bg** — `<button style="background: #191817; color: #191817">`. Zero contrast. This is classic when a disabled state leaks onto the primary CTA.
6. **Accent used without restraint** — more than 3 distinct accent applications (button + link + icon + border + text-highlight + heading underline) on one page. Pick 2.

**Rule of thumb for CTAs on a coloured hero:**
- Orange/terracotta hero → CTA is `cream bg + ink text` (high contrast, palette-native) OR `white bg + accent text`. NEVER `black bg + anything`.
- Green/forest hero → CTA is `cream bg + forest text` OR `accent bg + ink text`.
- Cream/white section → CTA is `ink bg + cream text` OR `accent bg + cream text`.
- Dark/charcoal section → CTA is `cream bg + ink text` OR `accent bg + cream text`.

Save the rule as a lookup table in your head BEFORE you draw any button. If the current plan doesn't match a row, the button is off-palette.

#### Audit 2 — Contrast (WCAG AA minimum)

For every text-on-background pair in the visible UI:

- **Body text ≥ 4.5:1** against its background.
- **Large text (≥18pt or 14pt bold) ≥ 3:1**.
- **UI controls / non-text indicators ≥ 3:1**.

Quick check: if both the text and the background are in the SAME third of the lightness scale (both dark-ish, both mid-ish, both light-ish), contrast is probably failing. Compute: convert hex to relative luminance L1, L2; contrast = (max+0.05)/(min+0.05).

Fail cases:

- Faint grey body text on cream (`#a89… on #f4f3ee`) — almost always <4.5.
- Light terracotta on cream — fails big.
- White text on terracotta at regular body weight is usually fine, but CHECK don't assume.

#### Audit 3 — Typography legibility

- Are any glyphs rendering as `□` / `?` / `·` (missing glyph boxes)? This happens when the chosen font doesn't have the needed character — common for Cyrillic in Latin-only fonts, and for rare `&` / ligatures in display fonts.
- Are font weights distinct? Body 400, headline 600–700 — not all 500. If every weight looks the same, hierarchy is broken.
- Is line-height sufficient (1.4–1.6 for body, 1.0–1.15 for large display)?
- Are measure (line length) reasonable? Body `60–75ch`, not stretched to full viewport.
- Is the `&` character rendered legibly? In editorial display fonts (Fraunces, Instrument Serif) the ampersand can look like an abstract blob — if the site is Cyrillic, it should not be there at all (see `cyrillic-typography` skill). If the site is English and the `&` reads as unclear decoration at current size, replace with "and" or the word.

#### Audit 4 — Hierarchy and spacing

- Clear visual order: primary CTA bigger/bolder than secondary; H1 distinct from H2 distinct from body.
- Adequate whitespace: sections breathe; no cramped rows where everything is 16px apart.
- Consistent rhythm: similar blocks have similar spacing; no one section 120px tall and another 24px for no reason.

#### Audit 5 — Visual bugs

- **Overflow:** any text or image spilling outside its container, especially horizontal scroll.
- **Broken images:** `alt` text showing instead of image, `?` placeholder, 0×0 collapsed boxes.
- **Invisible elements:** `opacity: 0` or `visibility: hidden` left from a WIP animation.
- **Misaligned grid:** elements that should align on a row are off by a pixel.
- **Button not looking like a button** (no visible affordance — flat same-colour text).

#### Audit 6 — Mood & aesthetic fit

Match the declared aesthetic from the brief:

- Brief said "warm, editorial, summer camp" → is the page warm? Editorial? Or does it read cold/corporate?
- Brief said "premium" → is typography distinctive (not Arial/Inter defaults), are accents purposeful, is the image curation coherent?
- Brief said "for kids/families" → is the tone approachable, not austere?

If the aesthetic is off, that's a bug, not "subjective preference."

### Step 3 — Report findings

Structure the review output as a short list. For each finding, classify severity:

- **Blocker** — ship-stopper. Text invisible, button broken, images 404, glyphs missing.
- **Major** — visibly bad but usable. Contrast fail on important text, off-palette button, bad aesthetic fit.
- **Minor** — polish item. Slight spacing inconsistency, one subtle colour drift.

Example output:

```
Self-review of index.html (1440×900 + 390×844):

BLOCKERS (2)
- Hero CTA "+7 (3852)…" button is #191817 (ink) on #C8833A (terracotta) hero.
  Off-palette dark button — should be cream var(--bg) with ink text, or white-on-terracotta at a softer shade.
- Section "Features" H3 colour #D4A574 on background #EEEDE6 — contrast 2.1:1, fails AA.
  Use var(--ink) or var(--accent) directly.

MAJOR (1)
- Ampersand "&" in headline renders as a large italic blob in Fraunces at 96px. In non-Latin copy (e.g. Cyrillic), replace with the word equivalent; in English, consider "and" at this size.

MINOR (1)
- Card padding inconsistent between "Programs" (32px) and "Terms" (24px). Unify.

FIX → re-screenshot → repeat until zero blockers + zero majors.
```

### Step 4 — Fix and re-screenshot

After each fix, take a fresh screenshot and re-audit. **Do not hand off to the user until zero blockers and zero majors.** Minors can ship with a note.

## Integration with other skills

- `frontend-design` — this skill is the **gate** that closes frontend-design. frontend-design BUILDS; this skill VERIFIES.
- `cyrillic-typography` — audit 3 borrows its rules (ampersand, quotes, glyphs).
- `curated-image-sourcing` — audit 5 catches broken/404 images; image-sourcing is responsible for preventing them, this is last-line check.

## Anti-patterns to refuse

- **"It looks fine to me"** without opening a screenshot. You cannot look at a site you rendered through abstractions; you must see the pixels.
- **Skipping mobile.** Half the real-world bugs are mobile-only (text wrapping, button stacking, images overflowing).
- **"I'll fix it if the user complains."** That's the worst loop. Fix it now; it takes 30 seconds per fix, 5 minutes for a re-pass. Losing user trust takes longer to recover.
- **Dismissing aesthetic fit as "subjective."** If the brief said "warm editorial camp" and the page reads as "corporate SaaS," that is a bug. Aesthetics have a target; you can miss.

## Pre-ship checklist

- [ ] Screenshot taken at 1440×900 AND 390×844.
- [ ] All 6 audits run.
- [ ] Zero blockers and zero majors.
- [ ] Review report included in the handoff (even if just "clean — no issues").
