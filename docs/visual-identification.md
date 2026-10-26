# Visual Identification — Gustaw Beźnicki CV

> Source of truth for the design system used at **gustawbeznicki.dev**.
> All tokens live in `src/styles/global.css` (`@theme` block + `:root` aliases).

---

## Colour Palette

| Token | Hex / Value | Role |
|---|---|---|
| `--color-bg` | `#0e0f13` | Page background (near-black) |
| `--color-bg-alt` | `#14161e` | Alternate background |
| `--color-surface` | `#181a23` | Card / tag surface |
| `--color-border` | `#262936` | Hard border |
| `--color-border-soft` | `#1f2230` | Subtle dividers |
| `--color-muted` | `#6b7282` | De-emphasised text, labels |
| `--color-text-soft` | `#9da3b1` | Secondary body copy |
| `--color-text` | `#c8cad2` | Primary body copy |
| `--color-bright` | `#f0f0f4` | Headings, high-contrast text |
| `--color-accent` | `#d4a574` | Warm gold — primary brand accent |
| `--color-accent-soft` | `rgba(212,165,116,0.12)` | Accent tint for hover fills |
| `--color-accent-line` | `rgba(212,165,116,0.30)` | Accent tint for borders |
| `--color-pcb` | `#2fa883` | PCB green — secondary "technical" accent (from the logo) |
| `--color-pcb-deep` | `#17604f` | Chip substrate base |
| `--color-pcb-soft` | `rgba(47,168,131,0.12)` | PCB tint for hover fills |
| `--color-pcb-line` | `rgba(47,168,131,0.30)` | PCB tint for borders |

### Accent swatch

```
#0e0f13  ████  background
#181a23  ████  surface
#d4a574  ████  accent (warm gold)
#f0f0f4  ████  bright text
```

The overall mood is **dark + warm**: a near-black slate background warmed by gold as the primary accent. **PCB green** — the circuit-board substrate from the deer-on-a-chip logo — is the secondary, technical accent: circuit traces in the background, section numbers + LEDs, skill-tag hover, the timeline current and the chip substrate. Gold stays reserved for the name, CTAs, links and active states.

### Text-selection colour

```css
::selection { background: var(--accent); color: var(--bg); }
```

Gold background, near-black text.

---

## Typography

### Typefaces

| Role | Family | Source | Variable axes |
|---|---|---|---|
| Display / headings | **Fraunces Variable** | `@fontsource-variable/fraunces` | `wght`, `opsz`, `SOFT`, italic |
| Body / UI | **Instrument Sans Variable** | `@fontsource-variable/instrument-sans` | `wght` |
| Code / labels / mono UI | **JetBrains Mono Variable** | `@fontsource-variable/jetbrains-mono` | `wght` |

All three are self-hosted via Fontsource (zero external requests). Google Fonts is explicitly excluded to keep the CSP `'self'`-only.

### Type scale

| Element | Size | Family | Weight / Settings |
|---|---|---|---|
| Hero h1 | `clamp(3.5rem, 10vw, 8.5rem)` | Fraunces | `350`, `"opsz" 144 "SOFT" 30` |
| Hero h1 `em` | inherits | Fraunces italic | `300`, accent gold |
| Section title | `clamp(1.6rem, 3vw, 2.1rem)` | Fraunces | `300`, `"opsz" 144 "SOFT" 50` |
| Experience title | `clamp(1.25rem, 2vw, 1.5rem)` | Fraunces | `400`, `"opsz" 144 "SOFT" 30` |
| Footer CTA | `clamp(1.4rem, 3vw, 2rem)` | Fraunces italic | `300` |
| Interests list | `1.25rem` | Fraunces italic | `350`, `"opsz" 144 "SOFT" 60` |
| Highlight text | `1.15rem` | Fraunces | `350`, `"opsz" 144 "SOFT" 50` |
| Body copy | `16px` / `1rem` | Instrument Sans | regular |
| Secondary body | `0.95rem` | Instrument Sans | regular |
| Small body | `0.85–0.88rem` | Instrument Sans | regular |
| Nav / mono labels | `0.65–0.78rem` | JetBrains Mono | `500`, `letter-spacing: 0.08–0.15em`, uppercase |
| Hero meta | `0.78rem` | JetBrains Mono | `500`, uppercase, `letter-spacing: 0.08em` |
| Tech stack line | `0.75rem` | JetBrains Mono | regular |

**Line-heights:** body `1.6`; hero role `1.5`; summary `1.7`; lists `1.55`; tight headings `0.95–1.2`.

**Letter-spacing:** headings `−0.025em` to `−0.01em` (tighten); mono labels `+0.08em` to `+0.20em` (open up).

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

### Accent line / em-dash decoration

A recurring micro-pattern: a short `24px × 1px` horizontal rule in `--accent` placed before `.hero-meta`, and `8px × 1px` accent marks before `.highlight-tag`, connect decorative elements to content without borders.

### Sidebar navigation

Active/hover state: `border-left: 1px solid var(--accent)` + `padding-left: 12px` slide-in. Inactive: transparent left-border, `--text-soft` colour.

### Experience timeline

Left border `1px solid var(--border-soft)` forms the timeline rail. Each entry has a `9×9 px` circle node at `left: −5px`: open (bg + accent border) for past roles, filled `--accent` + `box-shadow: 0 0 0 4px var(--accent-soft)` glow for the current role. "Current" pill: `--accent` background, `--bg` text, `3px` border-radius, uppercase mono.

### Skill tags

Default: `--surface` fill, `--border-soft` border, `4px` radius. Lead skills (`.is-lead`): `--accent-soft` fill, `--accent` text, `--accent-line` border — always-on accent state. Hover: same as lead + `translateY(−1px)`.

### Highlight rows

Two-column grid (`160px 1fr`). Hover: cursor-following gold spotlight (`radial-gradient` at `--mx/--my`, faded in via the registered `--spot` property) + `padding-left: 0.75rem` slide. Tag prefix uses em-dash accent line decoration. Experience cards share the spotlight.

### Logo (deer)

`src/components/Logo.astro` — a low-poly deer hand-traced from the brand artwork, one `<path>` per shard (`viewBox 0 0 100 100`, gaps made by insetting each shard towards its centroid). Variants: `chip` (black shards on the silver die in the hero) and `mark` (`currentColor`, gold — floating back-to-top badge and footer). Hovering a mark scatters the shards slightly.

### Hero chip

The deer sits on a CSS-built CPU: silver brushed die, PCB-green substrate, gold pins on all four sides, pin-1 dot. Tilted in 3D (`--tilt-x/--tilt-y`, follows the cursor) and shifted on scroll (`--chip-shift`). Below 860 px it sits on the avatar row.

### Hero CTA

`.hero-cta` — filled gold button with a download icon under the contact row; triggers print / Save as PDF (`[data-print]`). Full width below 600 px. The sidebar keeps a secondary outlined `.print-link`.

### Footer links

Pill buttons: `--surface` fill, `--border` border, `6px` radius, mono font. Hover: accent fill/border + `translateY(−1px)`.

### Language switcher

Fixed top-right pill group. Active locale: `--accent` fill, `--bg` text. Inactive: transparent fill, mono font.

---

## Background Atmospherics

Two layered pseudo-elements on `body` create depth without images:

1. **Radial gradients** (`body::before`): warm gold glow at top-right corner (`rgba(212,165,116,0.05)`), PCB green at bottom-left (`rgba(47,168,131,0.06)`).
2. **Grain texture** (`body::after`): inline SVG fractal noise at `opacity: 0.025`, `mix-blend-mode: overlay`.
3. **Circuit canvas** (`.circuit-bg`, drawn by `enhance.ts`): random-walk PCB traces on a 26 px grid (90°/45° turns, pads at the ends) with gold/green signal pulses running along them and a brighter "lens" around the cursor. Full strength over the hero, ~35 % behind the content. Static (no pulses) under reduced motion; paused when the tab is hidden.

---

## Animation

| Element | Animation | Duration / Delay |
|---|---|---|
| `.hero-meta` | `fadeUp` (opacity 0→1, translateY 20px→0) | 0.8s / 0.10s |
| `.hero-avatar` | `fadeUp` | 0.8s / 0.15s |
| `hero h1` | `fadeUp` | 1.0s / 0.30s |
| `.hero-role` | `fadeUp` | 1.0s / 0.50s |
| `.hero-contact` | `fadeUp` | 1.0s / 0.70s |
| `.hero-meta .typed` | typewriter (`steps()` on width, one mono cell per char) + blinking caret | 45ms/char from 0.5s |
| `.hero-chip` | `chipIn` (rise + scale) | 1.2s / 0.2s |
| `.deer-shard` (chip) | `shardIn` — shards fly in and assemble | 1.1s / 0.5s + 32ms stagger |
| `.deer-trace` | gold outline drawn along the shards, then fades | 2.4s / 1.7s |
| `.chip-sheen` | light sweep across the die | 7s loop / 3s |
| `.hero-actions` | `fadeUp` | 1.0s / 0.85s |
| `.hero-scroll` | `fadeUp` + `float` loop | 1.0s / 1.0s + 2.5s loop |
| Section header | divider trace draws from the left + LED flicker (on scroll) | 1.4s / 1.2s |
| Skill tags | cascade in per row (on scroll) | 0.4s, 35ms stagger |
| Experience rail | gold→green fill follows the reading line; dots pulse when passed | scroll-linked |
| Scroll progress | 2 px gold→green bar at the top | scroll-linked |
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
- Fraunces replaced by `Georgia` (h1) and `Helvetica Neue, Helvetica, Arial` (all other text)
- Hero avatar, chip, CTA, meta and scroll indicator hidden; circuit canvas, progress bar and logo marks hidden
- Experience timeline border/nodes removed; period floats right
- All colour is stripped — no gold, no tints

---

## Image Assets

| File | Purpose |
|---|---|
| `/public/favicon.png` | Browser tab icon + Apple touch icon (deer on a chip) |
| `/public/og-image.png` | Open Graph / Twitter card preview (1200×630) |
| `/public/profile.png` | Avatar in hero (88×88 px circle, `object-position: center 15%`) |

---

## Consent Banner Theming

The self-hosted Silktide banner is overridden to match the site palette:

```css
--primaryColor:          #d4a955   /* warm gold (slightly more saturated) */
--backgroundColor:       var(--surface)
--textColor:             var(--text)
--boxShadow:             0 0 0 1px var(--accent-line), 0 12px 40px rgba(0,0,0,0.5)
--iconBackgroundColor:   #d4a955
```

The banner prompt (`.stcm-banner`) uses `rgba(14,15,19,0.4)` fill + `backdrop-filter: blur(12px)` + `border: 1px solid var(--accent-line)` — matching the glassmorphism style of other floating UI (language switcher).

---

## Design Principles

1. **Single accent** — one warm gold (`#d4a574`) carries all interactive and decorative emphasis. No secondary accent hue.
2. **Typographic hierarchy through Fraunces** — the variable serif does the display work; Instrument Sans handles legibility at small sizes. Mixing these two families (with mono for metadata) is the core visual identity.
3. **Motion as polish, not decoration** — entrance animations (staggered `fadeUp`) give the hero a cinematic feel; interactive transitions (`0.2–0.3s`) are subtle enough to disappear after the first visit.
4. **Self-hosted everything** — fonts, vendor scripts, and analytics proxy stay on-domain to maintain a `'self'` CSP and avoid third-party requests.
5. **Print degrades gracefully** — the print sheet is a separate design, not an afterthought: clean A4, system fonts, black on white.
