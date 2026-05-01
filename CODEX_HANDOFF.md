# Codex Handoff — Chirp Website Dark-Premium Redesign Loop

You are picking up an in-progress redesign of the Chirp marketing
site to match the just-shipped dark-premium desktop app. This file
is your sole entry point — you have no prior conversation context.
Loop through the unfinished work and finish it.

## Mission, in one sentence

Make the chirp-website match the desktop app's visual language
(dark, editorial, atmospheric, Fey-flavored), shipping one
top-level scene/page per loop iteration, until every item in
`RESUME.md` is checked off.

## Repo paths

- Working repo: `C:/Users/dutch/chirp-website/`
- Branch: `dark-premium-redesign` (already checked out)
- App reference repo (read-only): `C:/Users/dutch/chirp/`

The website is a Next.js 16 / React 19 / Tailwind v4 app. Geist
Sans + Geist Mono are the only fonts. Framer Motion handles
entrance choreography and is wrapped in a `MotionConfig
reducedMotion="never"` provider so animations always run.

## What to read first, EVERY iteration

1. `C:/Users/dutch/chirp-website/RESUME.md` — source of truth for
   what's done and what's next. Read the full file.
2. `C:/Users/dutch/chirp/CLAUDE.md` — project tokens, architecture,
   key constraints. Read once per session.
3. The desktop app's component source under
   `C:/Users/dutch/chirp/src/components/` — reference these for
   shipped visual patterns (Sparkline, BirdMark, SegmentedControl,
   QuickActions cards, HeroMetric, TransientCanvas overlay pill).
   Don't invent new patterns when a shipped one fits.

## Visual language (HARD CONSTRAINTS — DO NOT DRIFT)

- Pure black canvas (`#000`). No light-mode CSS anywhere.
- Geist Sans for display + body, Geist Mono for kbd glyphs and
  version stamps.
- `.card-surface` utility for any lifted block (`#0E0E10` + 1px
  white-6% border + inset top highlight, 14px radius).
- Halo utilities (`.halo-hero`, `.halo-mark`, `.halo-amber`) for
  element-anchored radial glow behind weight points.
- Amber `#F0B723` is the ONLY accent. Use it sparingly: brand mark,
  active states, signal moments (e.g., a token landing post-
  cleanup). Never decorate.
- No emojis. Use `lucide-react` icons.
- No section eyebrows (the small uppercase pill labels). Each
  scene leads with content, not chrome.
- No "$0 / Forever Free" copy. The "free" angle is implicit, not a
  scene.
- Animation utilities live in `app/globals.css`: `animate-slide-up`
  (400ms), `animate-fade-in` (200ms), `.animate-sparkline-draw`
  (600ms), `.animate-sparkline-dot` (200ms at 600ms delay), spring
  bounce easing `cubic-bezier(0.34, 1.56, 0.64, 1)`.

## Reference for editorial feel: Fey.com

Fey's marketing pages are the visual target: large atmospheric
visuals that dominate the canvas, generous breathing room,
editorial typography, never busy, never decorated. When in doubt
about a section's chrome — drop the chrome and let the visual
breathe.

Do NOT make sections feel like "demo containers" with cards
wrapping every visual. Open canvas with anchored visuals reads
more premium than boxed ones.

## Workflow per iteration

1. Read `RESUME.md`. Pick the FIRST unchecked `[ ]` item under
   the "Next" section.
2. Implement it. Use shipped tokens. Reference the app's
   components when patterns exist.
3. Build clean: `cd C:/Users/dutch/chirp-website && npm run build`.
   The build must succeed. Fix lints/type errors before
   continuing.
4. **Visual verification is required before marking done.**
   Ensure the local dev server is running on port 5173. If it's
   not, start it in the background:
   ```
   cd C:/Users/dutch/chirp-website && nohup npm run dev > /dev/null 2>&1 &
   ```
   Then drive a browser (Playwright, Puppeteer, whatever the
   environment provides) to navigate to the affected page,
   screenshot it, and **actually look at the screenshot**.
   Iterate on the implementation until it reads as premium and
   brand-consistent. "Renders without errors" is NOT the bar.
   "Looks intentional and beautiful" is the bar.
5. Commit to `dark-premium-redesign` with a Conventional Commit
   message that explains what shipped and why.
6. **Do NOT push every commit.** Vercel build minutes are
   limited. Push ONLY when a top-level item under "Next" flips
   from `[ ]` to `[x]` — i.e., once per scene/page completion,
   not once per incremental commit.
7. Update `RESUME.md`: flip the completed item to `[x]`.
8. Commit + push the `RESUME.md` update. (This is the single
   push per scene that lands on Vercel.)
9. Pick the next item and continue, OR stop if everything is
   `[x]`.

## Quality bar

- "Premium > complete." A scene that ships looking off is worse
  than a scene that's not started.
- Spacing, animation timing, hover states, scroll choreography —
  all considered, all intentional.
- Every `.card-surface` should have a hover lift (the
  `.card-surface-hover` utility is in `globals.css`).
- Headlines should breathe — large display type with tight
  tracking and loose leading.
- Subheads at white/55–65 opacity, never lower (white/40 reads
  as broken).
- Mobile must work. Single column on small viewports.

## Push policy (READ THIS — common failure mode)

The website is on Vercel's free / hobby plan. Every push to
`dark-premium-redesign` triggers a preview build. There's a
monthly build-minute cap, and we are NOT close to it but want to
stay disciplined.

- Commit every working state locally. State persists in git.
- Push ONLY when a top-level RESUME item completes. Roughly:
  one push per scene or page. Six to ten pushes total to finish
  the remaining work.
- NEVER push to `master`. Pieter (the human) merges to master
  manually after reviewing the dark-premium-redesign preview.

## Stop condition

When all items under "Next" in `RESUME.md` are `[x]` AND every
page on the site (`/`, `/download`, `/privacy`, `/faq`,
`/changelog`) has been visually screenshotted and reads as
premium and brand-consistent, output the literal phrase:

```
WEBSITE COMPLETE
```

(That's the signal for the loop wrapper to stop firing this
prompt.)

If you cannot complete a single iteration without hitting an
unresolvable blocker, document it as a new `[ ]` item in
`RESUME.md` with a `BLOCKER:` prefix describing what needs human
input, then move to the next pickable item. Do not grind on
something that needs Pieter's call.

## Image generation: deferred

Codex `gpt-image-1` access is unavailable in this environment
(read-only sandbox, no model selector). The user has ChatGPT
OAuth only — no API key. For this loop, all atmospheric imagery
must be built from CSS-driven compositions: the BirdMark SVG,
halo utilities, dotted backgrounds, radial pools, gradients.
Don't generate placeholder imagery and don't reference brand
imagery files that don't exist on disk.

## Out of scope

- New dependencies (don't add libraries unless absolutely
  necessary).
- CLAUDE.md edits (that's Pieter's source of truth).
- Tests (the website has no test suite; visual verification is
  the test).
- Performance optimization beyond not regressing.
- SEO copy / metadata (preserve existing).
- Master branch (do not touch).

## Loop hint

You are running inside a wrapper that fires this prompt
repeatedly. Each iteration sees the previous iteration's commits
in the repo. Make incremental progress every iteration. Don't try
to ship multiple top-level items in one fire — one is plenty.

When the user wakes up, they should be able to:
1. Open the latest preview URL on Vercel.
2. See a coherent, premium, brand-consistent dark redesign.
3. Read the updated `RESUME.md` to see which items shipped.
4. Merge `dark-premium-redesign` into `master` with confidence.

Make that morning happen. Go.
