# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Marketing site for **Chirp 2**, a free, open-source (MIT) voice-to-text app for **Windows only**. Domain: **chirptype.com**. The app lives in `sitelift/Chirp` (branch `v2`); its `docs/v2/DIRECTION.md` and `docs/v2/design/SPEC.md` are the source of truth for product facts. Copy on this site must match them (Windows only, speech recognized locally with Parakeet, optional AI cleanup with the user's own Anthropic or OpenAI key, no telemetry).

## Commands

- `npm run dev`: Astro dev server. On this machine use `tailnet-dev npm run dev -- --background --host @TAILNET_IP@ --port 4321`; manage it with `npx astro dev stop|status|logs`.
- `npm run build`: static build to `dist/`
- `npm run check`: type check
- `npm run preview`: serve `dist/` through Wrangler locally
- No test suite exists

## Architecture

- **Astro 7**, fully static, with **React islands** only where something is interactive (`client:load`).
- **Tailwind CSS v4** via `@tailwindcss/vite`; theme tokens in `src/styles/global.css`.
- Fonts self-hosted through Fontsource: Inter Tight (display/body), Instrument Serif italic (accents), JetBrains Mono (spoken text, labels).
- Hosting: **Cloudflare Workers static assets** (`wrangler.jsonc`, assets dir `dist`), deployed by Workers Builds from GitHub.

### Key files

- `src/pages/index.astro`: homepage
- `src/components/Hero.tsx`: the murmuration hero island (hold Right Ctrl / Space / the pill to run a scripted dictation)
- `src/lib/flock.ts`: particle engine (3D ribbon flock, inhale vortex, shape forming, cursor "hawk")
- `src/lib/points-gl.ts`: WebGL2 point renderer
- `src/lib/scripts.ts`: the dictations the hero plays
- `public/sounds/`: the app's real earcons, copied from `src-tauri/sounds`

## Design

Dark base (`#0a0908`), amber `#F0B723` only for meaning (the flock, level bars, focus, accents). Bird mark from `assets/brand/` in the app repo; brand artwork is reserved (not MIT). `STYLE.md` and `SPEC.md` describe the v1 light site and are outdated.

## Deployment

The v2 site is built on the `v2` branch and ships with the Chirp 2 release. Until cutover, `master` still deploys the old Next.js site to Vercel, so do not merge to `master` without the user's go-ahead. Commit and push work on `v2`.
