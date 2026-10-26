# Visual Identification — Gustaw Beźnicki CV

> Source of truth for the design system used at **gustawbeznicki.dev**.
> All tokens live in `src/styles/global.css` (`@theme` block + `:root` aliases).

---

## Colour Palette

Direction: **engineering datasheet**. The page reads like a component data sheet for "part GB-01": paper, ink, one PCB-green accent. It deliberately avoids the generic dark + gold + serif-italic + glow look.

| Token | Hex / Value | Role |
|---|---|---|
| `--color-bg` | `#ecebe6` | Paper — page background |
| `--color-bg-alt` | `#e3e1da` | Alternate background |
| `--color-surface` | `#f6f5f1` | Sheet / card / tag surface |
| `--color-border` | `#c4c1b8` | Hard border |
| `--color-border-soft` | `#d8d5cd` | Subtle dividers |
| `--color-muted` | `#6d6a63` | De-emphasised text, labels |
| `--color-text-soft` | `#47453f` | Secondary body copy |
| `--color-text` | `#23211d` | Primary body copy |
| `--color-bright` | `#0f0f0f` | Ink — headings, frame lines |
| `--color-accent` | `#17735d` | PCB green (ink strength) — links, CTA, active states, kicker |
| `--color-accent-soft` | `rgba(23,115,93,0.10)` | Accent tint for hover fills |
| `--color-accent-line` | `rgba(23,115,93,0.35)` | Accent tint for borders |
| `--color-pcb` | `#1b7d66` | Section numbers, LEDs, skill-tag hover |
| `--color-pcb-deep` | `#17604f` | Chip substrate base |
| `--color-pcb-soft` / `-line` | `rgba(27,125,102,0.12 / 0.35)` | PCB tints |
| `--color-gold` | `#c99a5b` | Only the chip's pins and traces |

### Dark theme

The same datasheet at night: graphite paper, light ink, glowing PCB green.

- **Selection:** follows the OS (`prefers-color-scheme`) by default. The top-right toggle (`ThemeToggle.astro`, next to EN/PL) overrides it and saves the choice in `localStorage` (`theme`).
- **No flash:** an inline script in `Base.astro`'s `<head>` sets `data-theme` on `<html>` before first paint.
- **No JS:** the page stays light and the toggle stays hidden.
- **Where the tokens live:** the dark tokens override the `--color-*` palette under `@media screen { :root[data-theme="dark"] }`. Print therefore always stays black on white.
- **Non-palette values** are tokens too, so both themes stay in sync:
  - `--grid-*`, `--grain-*` (background),
  - `--sheet`, `--glass` (frames and floating UI),
  - `--hover-tint`, `--accent-rgb` (tints and spotlights),
  - `--cta-text/--cta-hover` (the PDF button),
  - `--shadow-rgb`,
  - `--trace-rgb/--pulse-rgb` (canvas; `enhance.ts` re-paints the same traces on a `themechange` event).

| Token | Dark value |
|---|---|
| `--color-bg` / `-bg-alt` / `-surface` | `#111413` / `#161a19` / `#1a1f1d` |
| `--color-border` / `-border-soft` | `#3a423f` / `#262d2a` |
| `--color-muted` / `-text-soft` / `-text` / `-bright` | `#8a938f` / `#b4bcb8` / `#d9dedb` / `#f1f3f2` |
| `--color-accent` | `#4cc3a0` (CTA uses dark text on it) |
| `--color-pcb` | `#3fae8e` |

The chip is identical in both themes; the small deer marks switch to a brighter steel on graphite.

### Text-selection colour

```css
::selection { background: var(--accent); color: var(--bg); }
```

---

## Typography

### Typefaces

| Role | Family | Source |
|---|---|---|
| Display / headings / body | **Instrument Sans Variable** | `@fontsource-variable/instrument-sans` |
| Labels / tables / header bar | **JetBrains Mono Variable** | `@fontsource-variable/jetbrains-mono` |

Both are self-hosted via Fontsource (zero external requests); Google Fonts is excluded to keep the CSP `'self'`-only. Fraunces (the old display serif) was removed.

### Type scale

| Element | Size | Family | Weight / Settings |
|---|---|---|---|
| Hero h1 (two lines) | `clamp(3rem, 5.6vw, 5.1rem)` | Instrument Sans | `600`, `letter-spacing: −0.045em`, line-height `0.9` |
| Hero h1 `em` (surname) | inherits | Instrument Sans | upright, PCB-green underline bar that draws in |
| Hero kicker (doc title) | `0.8rem` | JetBrains Mono | uppercase, accent |
| Spec table | `0.78rem` label / `0.92rem` value | Mono / Sans | dotted leaders |
| Section title | `clamp(1.5rem, 2.6vw, 1.95rem)` | Instrument Sans | `600`, `−0.025em` |
| Experience title | `clamp(1.2rem, 1.9vw, 1.4rem)` | Instrument Sans | `600` |
| Highlight text | `1.08rem` | Instrument Sans | `400`, `strong` `600` |
| Footer CTA | `clamp(1.4rem, 3vw, 2rem)` | Instrument Sans | `600` |
| Body copy | `16px` | Instrument Sans | regular |
| Mono labels | `0.62–0.8rem` | JetBrains Mono | uppercase, `+0.06–0.15em` |

---

## Spacing & Layout

| Token | Value | Notes |
|---|---|---|
| `--max` | `1180px` | Maximum content width |
| `--gap` | `clamp(2rem, 4vw, 4rem)` | Fluid outer gap |
| Main grid | `220px 1fr` | Sidebar + content (collapses at 860 px) |
| Main padding | `4rem clamp(1.5rem,5vw,6rem) 6rem` | Top / horizontal / bottom |
| Hero padding | `clamp(2rem,6vw,5rem) clamp(1.5rem,5vw,6rem)` | Fluid both axes |
| Section spacing | `5rem` bottom | Between content sections |
| Section header bottom | `2.5rem` | Below section title divider |

**Breakpoints:**

- `≤ 860px` — sidebar unsticks, becomes inline nav, main grid collapses to single column
- `≤ 600px` — further tightening: footer links stack, hero meta scales down

---

## Component Patterns

### Hero datasheet (`Hero.astro`)

The hero is a framed sheet (`.ds`, 1 px ink border, registration ticks on two corners):

- **Header bar** (`.hero-meta`): part number `GB-01` + "Curriculum Vitae" on the left, revision + location on the right. Typed in, with a green caret.
- **Left column** (`.ds-main`):
  - two-line name with a round portrait in an ink ring,
  - mono kicker (`hero.docTitle`) and `.hero-role`,
  - green `Download CV (PDF)` CTA, mono contact links,
  - **key parameters** table (`hero.specs`, dotted leaders).
- **Right column** (`.ds-figure`): FIG. 1, the 3D chip, with technical-drawing dimension lines (`32.0 mm`) and a caption.
- **Footer strip** (`.ds-foot`): `● Pin 1 · Sheet 1/1 · domain · Scroll ↓`.
- **Below 860 px:** one column; `.ds-main` uses `display: contents`, so FIG. 1 sits between the CTA and the parameters table.

All hero copy lives in `hero` in `en.ts`/`pl.ts`: `partNumber`, `revision`, `docTitle`, `specsHead`, `specs`, `figCaption`, `pinLabel`, `sheetLabel`.

### Sidebar navigation

Active/hover state: `border-left: 1px solid var(--accent)` + `padding-left: 12px` slide-in. Inactive: transparent left-border, `--text-soft` colour.

### Experience timeline

Left border `1px solid var(--border-soft)` forms the timeline rail. Each entry has a `9×9 px` circle node at `left: −5px`: open (bg + accent border) for past roles, filled `--accent` + `box-shadow: 0 0 0 4px var(--accent-soft)` glow for the current role. "Current" pill: `--accent` background, `--bg` text, `3px` border-radius, uppercase mono.

### Skill tags

Default: `--surface` fill, `--border-soft` border, `4px` radius. Lead skills (`.is-lead`): `--accent-soft` fill, `--accent` text, `--accent-line` border — always-on accent state. Hover: same as lead + `translateY(−1px)`.

### Highlight rows

Two-column grid (`160px 1fr`). Hover: cursor-following green spotlight (`radial-gradient` at `--mx/--my`, faded in via the registered `--spot` property) + `padding-left: 0.75rem` slide. Tag prefix uses em-dash accent line decoration. Experience cards share the spotlight.

### Logo (deer)

`src/components/Logo.astro` — a low-poly deer hand-traced from the brand artwork (`viewBox 0 0 100 100`). Large shards are split at build time (~53 shards in total). Every shard is a **milled pocket**: a flat floor plus chamfered walls. Each face carries its 3D normal as `--nx/--ny/--nz`, and `global.css` shades it with Lambert lighting plus a specular kick against the light vector `--lx/--ly/--lz`. Floors get a slight random tilt, so neighbouring shards catch the light differently.

- `chip`: engraved into the silver die (satin-dark floors, bright chamfers).
- `mark`: the same geometry raised, in graphite steel (floating back-to-top badge and footer).

Hovering a mark scatters the shards slightly.

### Hero chip

`src/components/Chip.astro` — a CPU package:

- **Substrate:** PCB green, with the laminate edge thickness built from stacked shadows.
- **Board details (inline SVG):** 4 × 14 metallic pins, fan-in gold traces with vias, SMD capacitors, fiducials.
- **Die:** raised silver (`translateZ(14px)`, so it parallaxes against the board on tilt), with chamfered rim, brushed and conic sheen, a milled pin-1 dot and a `GB-01 · 2026` marking.

Interaction and layout:

- The package tilts towards the cursor (`--tilt-x/--tilt-y`) and shifts on scroll (`--chip-shift`).
- The light vector on `.chip` follows the cursor like a lamp held above the die, eased in rAF. It drives both the deer facets and a specular glint on the die.
- It sits in the datasheet's FIG. 1 area (see Hero datasheet).

### Hero CTA

`.hero-cta` — filled PCB-green button (white mono uppercase label, 1 px ink border, 2 px radius) with a download icon, right under the role text; triggers print / Save as PDF (`[data-print]`). Full width below 600 px. The sidebar keeps a secondary outlined `.print-link`.

### Footer links

Pill buttons: `--surface` fill, `--border` border, `6px` radius, mono font. Hover: accent fill/border + `translateY(−1px)`.

### Language switcher

Fixed top-right pill group. Active locale: `--accent` fill, `--bg` text. Inactive: transparent fill, mono font.

---

## Background

1. **Graph paper** (`body::before`): a 24 px grid plus a heavier 120 px grid in ink at low alpha, fixed to the viewport.
2. **Paper grain** (`body::after`): inline SVG fractal noise at `opacity: 0.05`, `mix-blend-mode: multiply`.
3. **Circuit canvas** (`.circuit-bg`, drawn by `enhance.ts`):
   - random-walk traces in faint ink, snapped to the same 24 px grid (90°/45° turns, pads at the ends),
   - green and graphite signal pulses running along the traces,
   - a green "lens" around the cursor.

   Full strength over the hero, ~50% behind the content. Static under reduced motion; paused when the tab is hidden.

---

## Animation

| Element | Animation | Duration / Delay |
|---|---|---|
| `.ds` (sheet) | `fadeUp` (opacity 0→1, translateY 20px→0) | 0.8s / 0.05s |
| `.hero-avatar` | `fadeUp` | 0.8s / 0.15s |
| `hero h1` | `fadeUp` | 1.0s / 0.30s |
| `.hero-role` | `fadeUp` | 1.0s / 0.50s |
| `.hero-contact` | `fadeUp` | 1.0s / 0.70s |
| `.hero-meta .typed` | typewriter (`steps()` on width, one mono cell per char) + blinking caret | 45ms/char from 0.5s |
| `.hero-chip` | `chipIn` (rise + scale) | 1.2s / 0.2s |
| `.deer-shard` (chip) | `shardIn` — shards fly in and assemble | 1.1s / 0.5s + 32ms stagger |
| `.deer-trace` | green outline drawn along the shards, then fades | 2.4s / 1.7s |
| `.chip-sheen` | light sweep across the die | 7s loop / 3s |
| `.hero-actions` | `fadeUp` | 1.0s / 0.85s |
| `.hero-scroll` | `fadeUp` + `float` loop | 1.0s / 1.0s + 2.5s loop |
| Section header | divider trace draws from the left + LED flicker (on scroll) | 1.4s / 1.2s |
| Skill tags | cascade in per row (on scroll) | 0.4s, 35ms stagger |
| Experience rail | ink→green fill follows the reading line; dots pulse when passed | scroll-linked |
| Scroll progress | 2 px green bar at the top | scroll-linked |
| Sidebar nav active | `padding-left` slide | `0.25s` |
| Skill tag hover | colour + `translateY` | `0.2s` |
| Highlight / experience hover | cursor spotlight + pad | `0.35s` |
| Consent banner | `backdrop-filter blur(12px)` | CSS |

`prefers-reduced-motion: reduce` collapses all durations to `0.001ms` and sets hero elements to `opacity: 1`; the new effects are only declared under `prefers-reduced-motion: no-preference` (CSS) or behind the `has-motion` class on `<html>` (set by `enhance.ts`).

---

## Print / PDF Export

When the browser prints (or the user clicks the print button), the stylesheet switches to a **classic CV** layout:

- Background resets to `white`; all text to `#1a1a1a` / `#333` / `#555`
- Sidebar hidden; single-column layout, A4 margins (`1.4cm × 1.6cm`)
- `Georgia` (h1) and `Helvetica Neue, Helvetica, Arial` (all other text)
- The datasheet frame flattens to the classic CV header (name on one line, role, contact). Header bar, kicker, parameters table, FIG. 1, footer strip, avatar and CTA are hidden; so are the circuit canvas, progress bar and logo marks.
- Experience timeline border/nodes removed; period floats right
- All colour is stripped — no tints

---

## Image Assets

| File | Purpose |
|---|---|
| `/public/favicon.png` | Browser tab icon + Apple touch icon (deer on a chip) |
| `/public/og-image.png` | Open Graph / Twitter card preview (1200×630) |
| `/public/profile.png` | Round portrait in the hero (92 px, ink ring) |

---

## Consent Banner Theming

The self-hosted Silktide banner follows the palette: `--primaryColor: var(--accent)`, `--backgroundColor: var(--surface)`, `--textColor: var(--text)`, and a light paper prompt `rgba(246,245,241,0.88)` with blur and a 1 px border. An ink→green line runs along its top edge, and enabled switches in the preferences modal turn PCB green. It sits bottom-right, so the hero CTA stays clear.

---

## Design Principles

1. **Datasheet, not template.** Paper, ink, frame lines, mono labels and real parameters instead of glows, gradients and serif italics.
2. **One accent.** PCB green carries every interactive and decorative emphasis. Gold appears only on the chip's metal.
3. **The logo is the illustration.** The engraved chip is FIG. 1 of the sheet: technical, tactile, lit by the cursor.
4. **Motion as instrumentation.** Typing header, drawing dividers, LEDs, a timeline current and signal pulses read like a device booting, not like decoration. All of it respects reduced motion.
5. **Self-hosted everything.** Fonts, vendor scripts and the analytics proxy stay on-domain to keep a `'self'` CSP.
6. **Print degrades gracefully.** The print sheet is a separate design: clean A4, system fonts, black on white.
