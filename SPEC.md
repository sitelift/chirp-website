# Chirp Website — trychirp.app

> Build spec for a premium marketing site. Another Claude Code session should ship the full site from this document alone.

---

## Design Philosophy

This is NOT a SaaS template. No bento grids. No trust bars with icons-in-circles. No "How it works" three-column layouts. No feature comparison tables with green checkmarks.

Study these references for the level we're targeting:
- **Raycast.com** — buttery interactions, purposeful motion, never decorative
- **Stripe.com** — pristine light surfaces, invisible grid discipline, type-driven
- **Notion.so** — warm, approachable, light-first with depth through shadows not borders
- **Things 3 marketing site** — clean macOS-native feel, lots of air, the product sells itself

### Core Principles

1. **Light-first and light-only.** The Chirp app is white. The website is white. No dark mode. Warmth comes from amber accents against cream and stone surfaces — not from darkness. Premium doesn't mean dark. It means considered.
2. **Fewer sections, each perfect.** Five incredible sections beat eight mediocre ones. Every section earns its place.
3. **Show, don't decorate.** If there's a visual, it should be the actual product or an interactive demo — not an icon in a colored circle.
4. **Type does the heavy lifting.** Massive headlines with tight tracking. Generous whitespace. Let the words breathe. Dark stone-900 type on white bg is the foundation.
5. **Motion is choreographed, not sprinkled.** Every animation has a reason. Scroll reveals are subtle (opacity + tiny Y shift, 0.6s). Nothing bounces. Nothing wobbles. No "fade up" on every element.
6. **Depth through shadow, not through borders.** Cards float above the page with layered shadows. Borders are barely there or absent. The shadow language is what makes surfaces feel real and premium.

---

## Tech Stack

- **Next.js 15** (App Router, static export via `output: 'export'`)
- **Tailwind CSS v4** (custom theme, no preset)
- **Framer Motion** (scroll animations, layout transitions)
- **No component library.** Every component is hand-built. shadcn adds bloat and sameness. The only exception: use Radix primitives for the FAQ accordion (accessibility) — but style it yourself.
- **Fonts**: `next/font/google` — Nunito (display), Inter (body), JetBrains Mono (mono)
- **Deploy**: Vercel, auto from `main`

---

## Design Tokens

Pulled from the Chirp desktop app's `tailwind.config.ts`:

```ts
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        chirp: {
          yellow: '#F0B723',
          amber: {
            50:  '#FFFBEB',
            100: '#FEF3C7',
            200: '#FDE68A',
            300: '#FCD34D',
            400: '#FBBF24',   // Primary accent
            500: '#F59E0B',
            600: '#D97706',
          },
          stone: {
            50:  '#FAFAF9',
            100: '#F5F5F4',
            200: '#E7E5E4',
            300: '#D6D3D1',
            400: '#A8A29E',
            500: '#78716C',
            600: '#57534E',
            700: '#44403C',
            800: '#292524',
            900: '#1C1917',
          },
        },
      },
      fontFamily: {
        display: ['var(--font-nunito)', 'sans-serif'],
        body:    ['var(--font-inter)', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'monospace'],
      },
    },
  },
}
```

### Color Usage on the Website

The website is light-first, matching the Chirp desktop app.

| Surface | Value | Notes |
|---------|-------|-------|
| Page background | `#FFFFFF` | Pure white. Clean canvas. |
| Warm background | `#FAFAF9` (stone-50) | Alternating sections, footer. Barely-there warmth. |
| Cream tint | `#FFFBEB` (amber-50) | Behind accent areas — hero glow, cleanup demo bg. Very subtle. |
| Elevated surface | `#FFFFFF` | Cards. They float via shadow, not background color. |
| Border | `rgba(0,0,0,0.06)` | Almost invisible. Structural, not decorative. Use sparingly. |
| Border (hover) | `rgba(0,0,0,0.10)` | Slight definition on hover |
| Primary text | `#1C1917` (stone-900) | Headlines, strong body |
| Body text | `#44403C` (stone-700) | Default reading text |
| Secondary text | `#78716C` (stone-500) | Descriptions, captions |
| Muted text | `#A8A29E` (stone-400) | Metadata, timestamps |
| Accent | `#F59E0B` (amber-500) | CTAs, highlights, active states. NOT amber-400 — use 500 on light bg for better contrast. |
| Accent hover | `#D97706` (amber-600) | Button hover, link hover |
| Accent surface | `#FFFBEB` (amber-50) | Behind accent elements — badges, highlights |
| Accent text | `#92400E` | Dark amber for readable text on light bg. Derived from amber-800. |

### The Amber Warmth Effect

The signature light-mode equivalent of a glow. A soft radial gradient that adds warmth without being visible as a shape.

```css
/* Warm radial — place behind hero headline and key elements */
.amber-warmth {
  position: absolute;
  width: 800px;
  height: 800px;
  background: radial-gradient(
    circle,
    rgba(251, 191, 36, 0.06) 0%,
    rgba(251, 191, 36, 0.02) 40%,
    transparent 70%
  );
  pointer-events: none;
  filter: blur(60px);
}

/* Tighter warmth for buttons/small elements */
.amber-warmth-tight {
  background: radial-gradient(
    circle,
    rgba(251, 191, 36, 0.10) 0%,
    transparent 60%
  );
  width: 200px;
  height: 200px;
}
```

### Shadow Language

This is critical. Shadows are how you create depth on a light site. Every surface exists at a specific elevation.

```ts
boxShadow: {
  // Level 0 — flat (text, inline elements)
  // no shadow

  // Level 1 — resting cards, containers
  'surface': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',

  // Level 2 — hovered cards, elevated containers
  'lifted': '0 4px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',

  // Level 3 — hero demo, featured elements
  'elevated': '0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',

  // Level 4 — the hero product demo (the star of the show)
  'hero': '0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)',

  // Amber-tinted shadow for CTA buttons
  'amber': '0 4px 14px rgba(245,158,11,0.20), 0 1px 3px rgba(245,158,11,0.10)',
  'amber-hover': '0 6px 20px rgba(245,158,11,0.28), 0 2px 4px rgba(245,158,11,0.12)',
}
```

### Typography Scale

Headlines are BIG. Tracking is TIGHT. This is how you make type feel premium.

| Element | Font | Weight | Size (desktop) | Letter-spacing | Line-height |
|---------|------|--------|----------------|----------------|-------------|
| Hero headline | Nunito | 800 | 72px (`text-7xl`) | `-0.03em` | 1.0 |
| Section headline | Nunito | 700 | 48px (`text-5xl`) | `-0.025em` | 1.1 |
| Sub-headline | Inter | 400 | 20px (`text-xl`) | `-0.01em` | 1.6 |
| Body | Inter | 400 | 17px | `0` | 1.7 |
| Caption/meta | Inter | 500 | 13px (`text-xs`) | `0.04em` | 1.4 |
| Mono | JetBrains Mono | 400 | 14px | `0` | 1.5 |
| Button | Nunito | 700 | 15px | `0.01em` | 1.0 |

### Motion

```ts
// lib/motion.ts — Framer Motion presets

// The ONE scroll reveal. Use this consistently. Don't vary it per section.
export const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
}

// Stagger children within a revealed container
export const staggerContainer = {
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: '-100px' },
}

export const staggerChild = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
}

// Reduced motion: wrap all Framer Motion in this check
// if (prefersReducedMotion) return { initial: {}, whileInView: {}, transition: { duration: 0 } }
```

**Rules:**
- Never animate scale (feels cheap)
- Never bounce or spring (feels playful, we want precise)
- Only animate opacity + translateY on scroll reveals
- Hover effects: 200ms ease-out, only on desktop (`@media (hover: hover)`)
- `will-change: transform` on animated elements, removed after animation

---

## BirdMark Logo

```tsx
export function BirdMark({ size = 20, color = '#F0B723', className = '' }: {
  size?: number; color?: string; className?: string
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 4167 4167" className={className}
      xmlns="http://www.w3.org/2000/svg" style={{ fillRule: 'evenodd', clipRule: 'evenodd' }}>
      <path d="M1531.604,2829.783c668.518,24.139 1171.926,-353.144 1045.89,-883.882c-0.56,-2.358 -17.658,-74.359 -23.385,-19.253c-0.995,9.575 69.958,358.895 -292.787,623.11c-524.721,382.194 -1516.421,61.554 -1543.52,-49.205c-11.643,-47.586 14.39,-42.864 628.22,-583.275c147.113,-129.517 646.449,-555.007 653.201,-572.264c34.69,-88.668 53.661,-462.329 467.34,-678.203c261.617,-136.522 720.888,-99.525 911.155,199.849c29.64,46.637 21.052,59.492 57.912,65.5c39.258,6.398 321.439,44.685 346.981,111.874c6.542,17.208 3.266,26.147 -189.861,130.03c-119.168,64.1 -121.172,70.126 -124.937,81.447c-10.473,31.492 -22.872,225.25 16.526,343.54c4.893,14.69 49.551,107.832 76.735,336.287c61.149,513.904 -236.456,1191.465 -944.642,1420.703c-412.05,133.38 -863.994,33.644 -1136.283,-126.848c-276.402,-162.916 -260.407,-240.238 -310.516,-201.362c-357.873,277.646 -414.605,298.476 -456.184,313.742c-37.345,13.712 -249.743,91.697 -493.694,-59.685c-90.71,-56.289 2.227,-101.049 53.22,-135.73c621.383,-422.616 620.158,-437.327 651.083,-428.394c149.547,43.196 321.948,101.022 607.547,112.018Z"
        style={{ fill: color }} />
    </svg>
  )
}
```

---

## Global Layout

### Navigation

Minimal. Starts transparent, then `backdrop-blur-xl bg-white/80` on scroll (detect with IntersectionObserver or scroll position > 100px).

```
[BirdMark 24px] [Chirp — font-display 600 15px]     [Changelog]  [FAQ]  [GitHub icon]  [Download — amber pill button]
```

- Height: 56px. Compact and premium (not the standard chunky 80px).
- Links: `text-chirp-stone-500 hover:text-chirp-stone-900` — 200ms transition
- "Download" button: `bg-chirp-amber-500 text-white font-display font-bold text-sm h-8 px-4 rounded-full shadow-amber` — `rounded-full` pill shape. White text on amber-500 for contrast.
- Hover: `bg-chirp-amber-600 shadow-amber-hover`
- Border bottom on scroll: `border-b border-black/[0.06]`
- Max width: 1120px centered
- Mobile: hamburger → full-screen overlay menu (white bg, large links, amber accent)

### Footer

Not a big 4-column corporate footer. Simple and confident.

```
──────────────────────────────────────────────────────
[BirdMark 20px]  Chirp                       [GitHub]  [Changelog]  [FAQ]  [Privacy]

                 Local voice-to-text.
                 Free. Private. Open source.

──────────────────────────────────────────────────────
```

- Background: `stone-50` (`#FAFAF9`)
- Top border: `border-t border-black/[0.06]`
- Padding: `py-12`
- Text: `text-chirp-stone-500 text-sm`
- Links: `text-chirp-stone-500 hover:text-chirp-stone-900`

---

## Page 1: Home

The home page is 5 sections. That's it. Each one is a full scene.

### Section 1 — Hero

**The feeling**: Bright, open, warm. You land and immediately understand what Chirp does. The headline is massive against white. The product demo below it is the centerpiece — floating with a beautiful shadow. It feels like opening a window on a sunny day.

**Structure:**

```
┌─────────────────────────────────────────────┐
│                   white bg                  │
│              [amber warmth orb]             │
│                                             │
│           Speak. Chirp types.               │
│                                             │
│     Voice-to-text that never leaves         │
│     your computer. No cloud. No cost.       │
│     No account. Just your voice and         │
│     your words.                             │
│                                             │
│        [Download for Windows]               │
│        v0.4.0 · Windows 10+                 │
│                                             │
│   ┌─────────────────────────────────┐       │
│   │                                 │       │
│   │     [Live product demo]         │       │
│   │     (interactive, not a         │       │
│   │      static screenshot)         │       │
│   │                                 │       │
│   └─────────────────────────────────┘       │
│                                             │
└─────────────────────────────────────────────┘
```

**Specifics:**

- Full viewport height (100svh), centered content, single column
- Background: `#FFFFFF` with a large amber warmth orb (800px diameter, `rgba(251,191,36,0.05)`) centered behind the headline, blurred
- Very subtle dot grid pattern in the background — `radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)` at 32px spacing. Adds texture without being noticeable. This is the premium alternative to a flat white void.

**Headline:**
```
Speak. Chirp types.
```
- Nunito 800, 72px, `text-chirp-stone-900`, `tracking-[-0.03em]`, `leading-none`
- "Chirp" in `text-chirp-amber-500` — the only colored word
- Centered

**Subheadline:**
```
Voice-to-text that never leaves your computer.
No cloud. No cost. No account. Just your voice and your words.
```
- Inter 400, 20px, `text-chirp-stone-500`, `max-w-[540px]`, centered, `leading-relaxed`
- Fade in 200ms after headline (stagger)

**CTA:**
- Single button. No secondary action cluttering the hero.
- "Download for Windows" — `bg-chirp-amber-500 text-white font-display font-bold h-12 px-8 rounded-full shadow-amber`
- Behind the button: a tight amber warmth orb (`amber-warmth-tight`)
- Hover: `bg-chirp-amber-600 shadow-amber-hover`
- Below: `"v0.4.0 · Windows 10+"` in `font-mono text-xs text-chirp-stone-400 mt-3`

**Product Demo (below CTA, centered):**

This is the hero visual. NOT a static screenshot. It's an interactive, animated recreation of the Chirp workflow:

Build a self-contained component that shows a mock desktop text editor (minimal, light themed — white bg with stone-50 sidebar, like a clean notepad) with a cursor blinking in it. Then:

1. A floating Chirp overlay appears (mimicking the real app's overlay) — small, rounded, white card with `shadow-elevated` and amber waveform bars
2. The waveform bars animate (16 bars, 2px wide, amber-500, heights oscillating randomly between 3px and 24px, 80ms interval)
3. After 3 seconds, the overlay transitions to "processing" state (waveform stops, subtle pulse animation)
4. Text types out character by character into the "editor": `"I was thinking we should probably move the meeting to Thursday, if that works."`
5. The overlay fades out
6. Pause 3 seconds, then loop

Style the demo container:
- `max-w-[720px]` centered
- `rounded-2xl` with `shadow-hero` — this is the most prominent shadow on the page, making the demo float dramatically
- Inner background: `#FFFFFF`
- Top bar: mock window chrome — stone-100 bg, three dots (stone-300), "Untitled — Editor" title in mono xs stone-400
- `mt-16` from the CTA
- The whole demo sits on a subtle `bg-stone-50` band or has the amber warmth behind it for depth

### Section 2 — The Privacy Argument

**The feeling**: This is where trust is built. Not with badges and shields, but with a clear, honest argument. The architecture diagram IS the proof.

**Background**: `stone-50` (`#FAFAF9`) — the first section break. Subtle warmth shift tells you this is a new thought.

**Layout**: Left-aligned headline + body, with the diagram on the right. Two-column on desktop, stacked on mobile. Max width 1120px.

**Left column:**

Headline:
```
Your voice never
leaves this machine.
```
- Nunito 700, 48px, `text-chirp-stone-900`, `tracking-tight`

Body (beneath headline, `mt-6`):
```
Most voice-to-text tools send your audio to someone else's
server, process it there, and send text back. You're trusting
a company with every word you say.

Chirp doesn't work like that. The speech model runs on your
CPU. The cleanup model runs on your CPU. Nothing is ever
uploaded, logged, or transmitted. There is no server.

After the initial model download, disconnect from the internet.
Chirp won't even notice.
```
- Inter 400, 17px, `text-chirp-stone-600`, `max-w-[480px]`, `leading-[1.75]`
- Short paragraphs. Each one is a complete thought. The writing style matters as much as the design.

**Right column — Architecture Diagram:**

Build this as an actual component, not an image. A vertical flow:

```
┌──────────────────────────┐
│  🎤  Your Microphone     │ ← white bg, shadow-surface, stone-700 text
└──────────┬───────────────┘
           │  audio stream (never saved)
           ▼
┌──────────────────────────┐
│  🧠  Speech Model        │ ← white bg, shadow-surface
│  Parakeet TDT 0.6B      │    mono text for model name
│  runs on your CPU        │
└──────────┬───────────────┘
           │  raw transcript
           ▼
┌──────────────────────────┐
│  ✨  Cleanup Model        │ ← amber-50 bg, subtle amber-200 border
│  Qwen 2.5 1.5B          │    this one gets the accent treatment
│  runs on your CPU        │
└──────────┬───────────────┘
           │  clean text
           ▼
┌──────────────────────────┐
│  📋  Your App            │ ← white bg, shadow-surface
│  pasted at cursor        │
└──────────────────────────┘
```

- Each box: `rounded-xl p-4 bg-white shadow-surface`
- The cleanup model box: `bg-amber-50 border border-amber-200/40 shadow-surface` — warm accent
- Connecting lines: 1px `chirp-stone-200`, with a subtle animated gradient pulse (amber-400 traveling down the line, like data flowing). Use a CSS gradient animation on the connector — a small bright spot that moves downward over 2s, repeating.
- Labels between boxes: `font-mono text-xs text-chirp-stone-400`
- The whole diagram fades in on scroll with `reveal` preset

**Below both columns**, centered, in `font-mono text-xs text-chirp-stone-400 tracking-wide uppercase`:
```
Zero servers · Zero telemetry · Zero network calls · MIT licensed
```

### Section 3 — The Demo Section (Smart Cleanup)

**The feeling**: This is the "wow" moment. Users see the AI cleanup transform messy speech into clean text, and it happens right in front of them, interactively.

**Background**: Back to `#FFFFFF`. A very subtle amber warmth orb behind the demo card.

**Layout**: Centered, narrow (`max-w-[640px]`).

**Headline:**
```
From rambling to ready.
```
- Nunito 700, 48px, `text-chirp-stone-900`, centered

**Subheadline:**
```
Chirp's local AI cleans up your speech in real time —
removing filler words, fixing grammar, adding punctuation.
All on your device.
```
- Inter 400, 18px, `text-chirp-stone-500`, centered, `max-w-[500px]`

**The Interactive Demo (`mt-12`):**

A single card, `max-w-[640px]`, centered:
- `rounded-2xl bg-white shadow-elevated overflow-hidden`
- Top bar: two tabs — "What you said" (active: `text-chirp-stone-900 border-b-2 border-chirp-amber-500`) and "What Chirp typed" (inactive: `text-chirp-stone-400`)
- Tab bar has a `border-b border-black/[0.06]` bottom border
- Auto-switches between tabs every 4 seconds. Or let the user click to toggle.

**"What you said" tab:**
```
so um basically I was thinking that we should
like probably move the meeting to uh Thursday
if that works
```
- `font-mono text-base text-chirp-stone-700 leading-relaxed p-8`
- Filler words (`um`, `like`, `uh`, `basically`, `so`) have `bg-chirp-amber-100 text-chirp-amber-700 rounded px-1` highlight
- Small label below text: `"Filler words highlighted"` in `text-xs text-chirp-stone-400`

**"What Chirp typed" tab:**
```
I was thinking we should probably move the
meeting to Thursday, if that works.
```
- `font-body text-base text-chirp-stone-900 leading-relaxed p-8`
- Clean, no highlights. The contrast IS the demo.

**Transition between tabs**: Crossfade (`opacity` + slight Y shift, 300ms). Not a slide. Slides feel like a carousel.

**Below the card** (`mt-6`):
```
Powered by Qwen 2.5 1.5B · runs locally · ~1 GB model
```
- `font-mono text-xs text-chirp-stone-400` centered

### Section 4 — Features

**The feeling**: Not a grid of cards with icons. Instead, a sequence of tight, punchy feature callouts with inline visuals. Think Apple's product page: one feature at a time, big type, minimal visual.

**Background**: `stone-50` — the warm section. This alternation (white → stone-50 → white → stone-50) creates a gentle rhythm down the page.

**Layout**: Stacked vertically. Each feature is a row: text on one side, visual on the other. Alternating left/right. Max width 1120px.

**Feature 1 — Global Hotkey:**

```
[Left: visual]                    [Right: text]
┌──────────────────┐
│                  │              Works in every app.
│  [Ctrl][⇧][Space]│
│                  │              One hotkey from anywhere — your browser,
│  animated press  │              your editor, your email. Chirp transcribes
│                  │              and pastes right at your cursor.
└──────────────────┘
```

Visual: Three keyboard key badges (`Ctrl`, `Shift`, `Space`) in a white `shadow-surface rounded-2xl` container. Style each key:
- `bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 font-mono text-sm text-chirp-stone-700 shadow-[0_2px_0_0_rgba(0,0,0,0.06)]`
- The bottom shadow creates a 3D "key" effect (physical depth)
- Animation: Every 4s, keys press down (`translateY(2px)`, bottom shadow disappears) for 200ms, then release. Subtle, mechanical feel.

Text:
- Title: Nunito 700, 32px, `text-chirp-stone-900`
- Body: Inter 400, 17px, `text-chirp-stone-600`, `max-w-[400px]`
- Below body: `"Default: Ctrl+Shift+Space · fully customizable"` in `font-mono text-xs text-chirp-stone-400`

**Feature 2 — Noise Suppression:**

```
[Left: text]                      [Right: visual]

Hear you, not your               ┌──────────────────┐
surroundings.                     │  ████ ██ ███ █   │
                                  │  waveform viz    │
Chirp filters background          │  with noise      │
noise before transcription.       │  being suppressed │
Keyboard clatter, AC hum,        └──────────────────┘
the coffee shop — filtered out.
```

Visual: A white `shadow-surface rounded-2xl` container. Two waveform visualizations stacked:
1. "Input" — noisy waveform: more bars (24), chaotic heights, muted color (`chirp-stone-300`)
2. "Output" — clean waveform: fewer active bars (16), smooth oscillation, `chirp-amber-500`
3. A subtle arrow or divider between them with label "noise suppressed" in mono xs
4. Both animate continuously

**Feature 3 — Dictionary & Snippets:**

```
[Left: visual]                    [Right: text]

┌──────────────────┐              Your words. Your terms.
│ ┌──────────────┐ │
│ │ Anthropic ✓  │ │              Add names, jargon, and technical terms
│ │ Kubernetes ✓ │ │              to your dictionary. Save frequently used
│ │ HIPAA ✓      │ │              phrases as snippets and trigger them
│ └──────────────┘ │              instantly.
│                  │
│ snippet: /sig    │
│ → "Best regards, │
│    Alex"         │
└──────────────────┘
```

Visual: A mock settings panel (white bg, `shadow-surface rounded-2xl`). Show:
- A mini dictionary list with 3 words, each with a checkmark in amber-500
- A subtle divider (`border-b border-black/[0.06]`)
- A snippet entry showing trigger → expansion
- Clean, minimal — matches the Chirp app aesthetic

Text:
- Title: Nunito 700, 32px, `text-chirp-stone-900`
- Body: Inter 400, 17px, `text-chirp-stone-600`

**Feature 4 — History:**

```
[Left: text]                      [Right: visual]

Everything you've said.           ┌──────────────────┐
Nothing we've heard.              │  Today             │
                                  │  ┌──────────────┐ │
Your transcription history        │  │ meeting text  │ │
lives on your device. Search,     │  │ 2:34 PM       │ │
copy, review — then delete it     │  ├──────────────┤ │
if you want. We'll never know     │  │ email draft   │ │
it existed.                       │  │ 2:12 PM       │ │
                                  │  └──────────────┘ │
                                  └──────────────────┘
```

Visual: A compact history panel (white bg, `shadow-surface rounded-2xl`) showing 2-3 transcription entries with timestamps. Each entry has a truncated preview in stone-700, timestamp in stone-400.

**Spacing between features**: `py-32` (`128px`). Generous. Let each one breathe.

**Each feature fades in on scroll** with the `reveal` preset — but the visual and text animate as a unit, not separately.

### Section 5 — The Close

**The feeling**: Quiet confidence. Not "DOWNLOAD NOW!!!" screaming. Warmth, the bird mark, and an invitation.

**Background**: Back to white. A large amber warmth orb (1000px, very subtle) centered. This section is mostly whitespace with a few centered elements. The emptiness IS the design.

**Layout**: Centered, generous padding (`py-40`).

```
                [BirdMark 80px, amber-500 at 15% opacity]

                     Try Chirp.

          Free. Private. Yours.

                [Download for Windows]
                 v0.4.0 · MIT License

          ────────────────────────────

          [GitHub]    [FAQ]    [Privacy]
```

**BirdMark**: 80px, `color="rgba(245,158,11,0.15)"`, centered, `mb-8`

**Headline**: `"Try Chirp."` — Nunito 800, 56px, `text-chirp-stone-900`, centered
- Understated. Not "Ready to speak freely?" or "Join thousands of users!" — just an invitation.

**Sub**: `"Free. Private. Yours."` — Inter 500, 20px, `text-chirp-stone-500`, centered, `mt-4`

**CTA**: Same amber pill button as hero. `mt-10`.
- "Download for Windows"
- `shadow-amber`, amber warmth behind it

**Version**: `font-mono text-xs text-chirp-stone-400 mt-3`

**Divider**: `border-t border-black/[0.06] max-w-[200px] mx-auto mt-16`

**Footer links** (`mt-8`): `text-chirp-stone-500 text-sm hover:text-chirp-stone-900`, spaced horizontally

---

## Page 2: Download

**Route**: `/download`

**Hero area:**
- BirdMark 48px centered
- "Download Chirp" — Nunito 700, 48px, stone-900
- "Local voice-to-text for Windows" — Inter 400, `text-chirp-stone-500`

**Download card** (centered, `max-w-[480px]`, `mt-12`):
- `rounded-2xl bg-white shadow-elevated p-8`
- "Chirp for Windows" — Nunito 600, 20px, stone-900
- Version badge: `font-mono text-xs bg-stone-50 border border-black/[0.06] rounded-full px-3 py-1 text-chirp-stone-500`
- Download button: full-width, amber-500, white text, rounded-full, h-12, `shadow-amber`
- Below button: `"~80 MB · Windows 10+ (x64)"` in mono xs stone-400
- Auto-detect OS: if not Windows, show "Chirp is currently Windows-only. Star us on GitHub to follow progress on macOS and Linux support." with GitHub link.

**Installation steps** (`mt-16`, centered, `max-w-[480px]`):

Style as numbered items, not a bulleted list. Each step gets a number in `font-display text-chirp-amber-500 text-2xl font-bold` with the instruction in `text-chirp-stone-700`:

1. **Run the installer** — Windows may show SmartScreen. Click "More info" then "Run anyway."
2. **Walk through setup** — Choose your microphone and download the speech model (~465 MB).
3. **Press `Ctrl+Shift+Space`** — From any app. Start talking. That's it.

**System requirements** (`mt-16`):
- Compact block, `text-chirp-stone-400 text-sm font-mono`
- `Windows 10+ (x64) · 4 GB RAM (8 GB recommended) · ~1.5 GB disk · GPU optional`
- Single line, pipe-separated

**"View source on GitHub"** link at bottom: `text-chirp-stone-500 hover:text-chirp-amber-600 text-sm`, with GitHub icon.

---

## Page 3: Changelog

**Route**: `/changelog`

**Layout**: Centered, `max-w-[640px]`. Clean vertical list, not a timeline with connecting lines (timelines feel overdone).

**Header:**
- "Changelog" — Nunito 700, 48px, stone-900
- "What's new in Chirp." — Inter 400, `text-chirp-stone-500`

**Each release:**
```
┌─────────────────────────────────────────────┐
│  v0.4.0                     March 17, 2026  │
│                                             │
│  · Added text snippets with triggers        │
│  · Added completion sound effects           │
│  · Added passive overlay mode               │
│  · Added transcription history              │
│  · Fixed microphone test volume display     │
│                                             │
└─────────────────────────────────────────────┘
```

- Version: `font-mono text-chirp-amber-600 text-base font-medium`
- Date: `font-mono text-chirp-stone-400 text-sm` — right-aligned (flexbox)
- Changes: `text-chirp-stone-700 text-[15px] leading-relaxed`
- Each item starts with `·` (middle dot), not `-` or `•`
- Card: `border-b border-black/[0.06] py-10` (border separator between releases, no card background)
- Latest release gets a subtle `"Latest"` badge: `font-mono text-xs bg-chirp-amber-50 text-chirp-amber-700 rounded-full px-2 py-0.5`

**Data**: Fetch from GitHub releases API at build time. Fallback to hardcoded data.

---

## Page 4: FAQ

**Route**: `/faq`

**Layout**: Centered, `max-w-[640px]`.

**Header:**
- "FAQ" — Nunito 700, 48px, stone-900
- "Answers to common questions." — Inter 400, `text-chirp-stone-500`

**Accordion**: Use Radix `Accordion.Root` for accessibility. Style it yourself — do NOT use shadcn's accordion.

Each item:
- Trigger: `text-chirp-stone-900 text-[17px] font-body font-medium py-5 border-b border-black/[0.06]`
- Hover: `text-chirp-stone-700` (subtle, not a color change)
- Chevron: `text-chirp-stone-400`, rotates 180deg on open, `transition-transform 200ms ease-out`
- Content: `text-chirp-stone-600 text-base leading-relaxed pb-5`
- Open/close: 200ms height animation (Radix handles this with `data-state`)

**Grouped by section with headings:**

Section headings: `font-mono text-xs text-chirp-stone-400 uppercase tracking-[0.08em] mt-12 mb-4`

#### GETTING STARTED

**What is Chirp?**
Chirp is a free, open-source voice-to-text app for Windows. Press a hotkey, speak, and your words appear as text wherever your cursor is. Everything runs locally on your PC — no cloud, no account, no subscription.

**How do I install it?**
Download the installer from the download page, run it, and follow the setup wizard. It takes about a minute, plus a few minutes to download the speech model.

**What's the default hotkey?**
`Ctrl+Shift+Space`. You can change it to any key combination in Settings.

**Does it work in every app?**
Yes. Chirp pastes text wherever your cursor is focused — browsers, editors, messaging apps, documents.

#### PRIVACY

**Does Chirp send my audio to the cloud?**
No. All processing happens on your PC using local AI models. There are no servers that could receive your data. We couldn't collect your audio even if we wanted to.

**Does Chirp collect telemetry or analytics?**
No. Zero telemetry. Chirp doesn't phone home, track usage, or make any network requests during operation.

**Can I use it with sensitive or confidential content?**
Yes. Chirp works fully offline after the initial model download. No data leaves your device. It's suitable for medical, legal, financial, or classified environments.

**Is it really free? What's the catch?**
No catch. MIT-licensed open source. No freemium tiers, no pro plan, no subscriptions. It's a community project.

#### FEATURES

**What is Smart Cleanup?**
A local AI model (Qwen 2.5 1.5B, ~1 GB) that removes filler words, fixes grammar, and adds punctuation. It runs entirely on your CPU — nothing is sent anywhere.

**Can I add custom words?**
Yes. Add names, jargon, and technical terms in Settings so Chirp recognizes them correctly.

**What are snippets?**
Saved phrases you can insert instantly with a trigger shortcut. Useful for email signatures, addresses, or boilerplate text.

**Does it support other languages?**
Currently English only. Other languages are planned.

#### TECHNICAL

**What speech model does it use?**
NVIDIA Parakeet TDT 0.6B — excellent accuracy, runs efficiently on consumer hardware. About 465 MB.

**Do I need a GPU?**
No. Chirp works well on CPU only. A Vulkan-compatible GPU speeds up transcription if available.

**How much disk space?**
About 1.5 GB total: ~80 MB app, ~465 MB speech model, ~1.1 GB cleanup model.

**Does it work offline?**
Completely, after the initial model download.

#### TROUBLESHOOTING

**SmartScreen is blocking the installer.**
That's normal for new unsigned software. Chirp is open source — every line of code is on GitHub. Click "More info" then "Run anyway."

**Chirp can't hear my microphone.**
Check Settings to ensure the correct device is selected. Verify Chirp has microphone permission in Windows Settings > Privacy > Microphone.

**The hotkey isn't working.**
Check that no other app is using the same key combination. Try changing the hotkey in Settings, or restart Chirp.

---

## Page 5: Privacy Policy

**Route**: `/privacy`

**Layout**: Centered, `max-w-[640px]`, good prose typography.

**Header:**
- "Privacy Policy" — Nunito 700, 48px, stone-900
- "Last updated March 2026" — `font-mono text-xs text-chirp-stone-400`

**Style**: `text-chirp-stone-600 text-[17px] leading-[1.8]` for body. `text-chirp-stone-900 font-display text-xl font-bold mt-12 mb-4` for subheadings.

### Content:

**The short version**

Chirp doesn't collect, store, or transmit your data. There is no server. There is nothing to worry about.

**What happens when you use Chirp**

When you press the hotkey, Chirp captures audio from your microphone. That audio is processed by an AI model running on your computer. The model converts your speech to text. If Smart Cleanup is enabled, another local model cleans up the text. The result is pasted at your cursor. Every step happens on your device.

**What we don't do**

We don't send audio or text to any server. We don't store your recordings. We don't collect telemetry, analytics, or usage data. We don't make network requests during operation. We don't require an account, email, or personal information. We don't use cookies or tracking. We don't share data with third parties — there is no data to share.

**Network activity**

Chirp connects to the internet exactly once: to download the AI models during first-time setup. After that, it works fully offline. You can verify this by disconnecting from the internet — Chirp won't notice.

**Your data**

Audio is captured, processed, and immediately discarded. It is never written to disk and never transmitted. Transcriptions are stored locally on your device in your app data folder. You can view and delete them at any time. Settings are stored locally.

**Open source**

Chirp is MIT-licensed. You can read every line of code on GitHub. If you find a privacy concern, please open an issue.

---

## SEO & Meta

```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://trychirp.app'),
  title: { default: 'Chirp — Local Voice-to-Text for Windows', template: '%s | Chirp' },
  description: 'Free, open-source voice-to-text that runs entirely on your PC. No cloud, no subscription, no compromise.',
  keywords: ['voice to text', 'speech to text', 'dictation', 'Windows', 'local', 'privacy', 'free', 'open source', 'offline'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://trychirp.app',
    title: 'Chirp — Local Voice-to-Text for Windows',
    description: 'Free, open-source voice-to-text that runs entirely on your PC.',
    siteName: 'Chirp',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chirp — Local Voice-to-Text for Windows',
    description: 'Free, open-source voice-to-text that runs entirely on your PC.',
    images: ['/og.png'],
  },
}
```

**OG Image** (`public/og.png`): Generate at build time or create manually.
- 1200x630, background `#FFFFFF`
- BirdMark centered, 200px, `#F0B723`
- "Chirp" in Nunito 800 48px stone-900 below the bird
- "Local voice-to-text for Windows" in Inter 400 18px stone-500

**Per-page titles**: "Download Chirp", "Changelog", "FAQ", "Privacy Policy"

---

## Performance

- Lighthouse: 95+ all categories
- First Contentful Paint: < 1s (it's a static site)
- CLS: 0
- JS bundle: < 100 KB first load (Framer Motion is the heaviest dep — tree-shake aggressively)
- Fonts: self-hosted via `next/font/google`, preload display font, `font-display: swap`
- No images except the OG image. Everything else is CSS/SVG/code.
- `prefers-reduced-motion`: all animations instantly complete (duration: 0)
- Static export: every page pre-rendered at build

---

## File Structure

```
chirp-website/
├── app/
│   ├── layout.tsx                 # Root layout, fonts, nav, footer
│   ├── page.tsx                   # Home
│   ├── download/page.tsx
│   ├── changelog/page.tsx
│   ├── faq/page.tsx
│   └── privacy/page.tsx
├── components/
│   ├── nav.tsx                    # Sticky nav with scroll detection
│   ├── footer.tsx
│   ├── bird-mark.tsx
│   ├── amber-warmth.tsx           # Reusable warm glow orb component
│   ├── hero-demo.tsx              # The interactive product demo
│   ├── architecture-diagram.tsx   # The privacy section diagram
│   ├── cleanup-demo.tsx           # The before/after tab demo
│   ├── feature-row.tsx            # Single feature with visual + text
│   ├── key-badge.tsx              # Keyboard key visual
│   ├── waveform.tsx               # Animated waveform bars
│   └── faq-accordion.tsx          # Radix-based accordion
├── lib/
│   ├── motion.ts                  # Framer Motion presets
│   ├── constants.ts               # FAQ data, changelog data, product info
│   └── utils.ts                   # cn() helper, etc.
├── public/
│   └── og.png
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Anti-Patterns to Avoid

These will make the site look templated instantly. Do NOT do any of these:

1. **Icons in colored circles** as feature callouts. If there's a feature, show it with an actual UI mock or interactive demo.
2. **Bento grids.** Every AI product has one. They look the same.
3. **Comparison tables with green checkmarks.** Screams "we're insecure about our product."
4. **"How it works" three-step layouts** with numbered circles. Everyone does this. The hero demo shows how it works.
5. **Trust badges / "100% secure" shields.** If you have to say it with a badge, people don't believe it. Show the architecture instead.
6. **Gradient text** on everything. Use it exactly zero times. Amber color on "Chirp" in the hero headline is enough.
7. **Multiple CTAs in the hero.** One button. One action. Clarity.
8. **Stock illustrations or Lottie animations.** Everything visual should be product UI or code.
9. **Testimonial carousels.** We have no testimonials. Don't fake it.
10. **"Join X users" or fake social proof.** We're new. Be honest about it.
11. **Rounded-xl cards with colored borders** for every feature. This is the #1 "vibe coded" tell.
12. **Hover effects on everything.** Only interactive elements get hover states.
13. **Dark mode or dark sections.** The site is light. Period. Depth comes from shadows, not dark backgrounds.
14. **Colored backgrounds on sections** (blue, purple, dark gradients). Use white and stone-50 only. The amber warmth orbs provide the only color in backgrounds, and they're barely visible.
