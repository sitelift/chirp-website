# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Marketing/landing site for **Chirp**, a local voice-to-text desktop app (Windows & macOS). This is the website only — not the app itself. Domain: trychirp.app.

## Commands

- `npm run dev` — start dev server
- `npm run build` — static export build (outputs to `out/`)
- `npm run lint` — ESLint
- No test suite exists

## Architecture

- **Next.js 16** with App Router, static export (`output: "export"`, no server features)
- **Tailwind CSS v4** via PostCSS
- **Framer Motion** for scroll-reveal animations
- **Radix UI** for accordion (FAQ page)
- **Lucide React** for icons

### Key directories

- `app/` — pages: home (`page.tsx`), `/download`, `/changelog`, `/faq`, `/privacy`
- `components/` — shared UI components (no barrel file; import directly)
- `lib/constants.ts` — product info, FAQ content, changelog data (single source of truth for copy)
- `lib/motion.ts` — shared Framer Motion animation presets (`reveal`, `staggerContainer`, `staggerChild`)
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

### Fonts

Three fonts loaded via `next/font/google` in `app/layout.tsx`, exposed as CSS variables:
- `--font-nunito` — headings/display
- `--font-inter` — body text
- `--font-jetbrains` — monospace/code

## Design Rules

**STYLE.md is the authoritative design spec.** Follow it exactly for colors, typography, spacing, radii, shadows, and component specs. Key constraints:
- No dark mode (light-only, `dark:` variants prohibited)
- No gradients — flat colors only
- No sharp corners — minimum 4px radius on everything
- Yellow (`amber-400`) is for accents/CTAs only, never large backgrounds or body text
- Cards use border OR shadow, never both
- Animations ≤ 300ms, always `ease-out` (never `ease-in` for UI)

## Content

**SPEC.md** contains the full product specification. Refer to it for feature descriptions, technical details, and product positioning. All user-facing copy in `lib/constants.ts` should align with SPEC.md.
