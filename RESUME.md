# Chirp Website Redesign — Resume State

This file is the source of truth for what's done and what's next on the
`dark-premium-redesign` branch. Cron jobs and background agents read it
to pick up work; they update it as items complete.

## Branch
`dark-premium-redesign` — push every commit. Final merge to `master`
is **human-gated** by Pieter; never merge to `master` autonomously.

## Visual language (DO NOT DRIFT)
- Pure black canvas (`bg-background` = `#000`).
- Geist Sans for display + body, Geist Mono for kbd/version glyphs.
- Card-surface utility for any lifted block (`#0E0E10` + 1px white-6%
  border + inset top highlight).
- Halo utilities (`.halo-hero`, `.halo-mark`, `.halo-amber`) for
  element-anchored glow.
- Amber `#F0B723` is the ONLY accent — used sparingly for signal
  moments (active states, highlights, brand mark).
- No emojis. No eyebrows on sections. No "$0" / "Free Forever" copy.
- Animation utilities live in `app/globals.css` (animate-slide-up
  400ms, animate-fade-in 200ms, sparkline draw-in 600ms, etc.).
- Framer-motion is wrapped in `MotionProvider` with
  `reducedMotion="never"` — animations always run regardless of OS.

## Reference
- Brand reference: Fey.com (dark, editorial, atmospheric, large
  visuals dissolve into canvas).
- App component source of truth: `C:/Users/dutch/chirp/src/`.

## Done

- [x] Phase 0+1: branch + token sync (Geist, dark theme, halos,
      keyframes)
- [x] Phase 2: ported Sparkline, BirdMark, SegmentedControl,
      ExpandableRow
- [x] Phase 2.5: ported TransientCanvas + synthetic OverlayDemo
      driver (no mic permission)
- [x] Phase 3: hero scene — announcement pill, hero app preview
      with mask gradient, headline, CTAs. Hero card has count-up
      animation matching app (700ms ease-out cubic).
- [x] Phase 4.1: "What it does" scene — three-beat sequential
      cascade (Press / Listen / Clean), single beat on screen at a
      time, autocycling 12.8s loop, in-place token-by-token
      transformation visualization on Beat 3.
- [x] Phase 5 partial: /changelog page rendered from
      `lib/changelog.ts`.

## Next (priority order — do top to bottom)

- [x] Phase 4.2: **Privacy scene** — rebuilt from scratch in
      Fey editorial style (Codex's first scaffold was off-brand).
      Single huge halo headline "Your voice never leaves your
      laptop." period-terminated alone on canvas, atmospheric
      `<BrandPlaceholder name="privacy-vault" />` centerpiece,
      three giant `0` stat blocks (servers · network calls · bytes
      transmitted) with hairline separators and per-column detail
      copy, quiet mono footer "LOCAL-FIRST · OFFLINE · NO ACCOUNT".
      Cursor-flashlight effect deleted from app/page.tsx (Fey
      doesn't have one and user explicitly called it shit). Visual
      verified at 1440x900 + 375x812.
- [x] Phase 4.3: **Power tools scene** — Fey-style centered halo
      headline "Tuned for how you talk." with two-line subhead, then
      a 3-column card-surface grid (Vocabulary / Snippets / Smart
      Cleanup). Each card has a top preview region with dotted bg +
      amber halo that renders a real shipped-app pattern (vocab
      entry rows, trigger→expansion snippet, Off/Local/Cloud
      segmented control + Tone toggle), and a bottom title + body.
      hover-lift via card-surface-hover. Visual verified at 1440x900
      + 375x812 (cards stack cleanly to single column on mobile).
- [x] Phase 4.4: **Close CTA scene** — min-h-screen monument
      pattern. Small halo'd BirdMark anchor, "Try Chirp." in
      clamp(72px, 12vw, 168px) display white as the dominant
      element, "Free. Local. Yours." subhead in white/55,
      amber download CTA (with amber glow shadow + arrow) plus
      Source on GitHub secondary button, version stamp in mono
      caps. Layered amber+white atmospheric blooms behind the
      headline. Subtle dotted floor with gradient mask at the
      bottom anchors the monument. Visual verified at 1440x900.
- [x] Phase 5.2: **/faq page built** — was 404, now renders.
      Single column max-w-[720px], halo-hero headline "Questions &
      answers.", Radix Accordion in hairline-divided list (8
      questions from `HOME_PREVIEW_FAQS`), chevron rotates on open,
      content slides via the accordion-down/up keyframes. Quiet
      mono footer linking to GitHub issues. Server component holds
      Metadata; client subcomponent (faq-accordion.tsx) holds the
      Radix root. Visual verified at 1440x900.
- [x] Phase 5.3: **/download reskinned dark** — pure black canvas,
      halo'd BirdMark anchor, halo-hero "Get Chirp." headline,
      OS picker segmented control (Mac/Windows) with auto-detect via
      navigator.userAgent, big amber CTA with amber-glow shadow,
      version+size+license mono stamp, three hairline-divided
      numbered install steps (amber numerals), 3-column system
      requirements row at bottom (OS · Disk · Memory). Visual
      verified at 1440x900.
- [ ] Phase 5.4: **Reskin /privacy page** to dark mode. Cream cards
      → card-surface. Headings white, body white/65. Section
      headings stay; remove any amber decoration that's not signal.
- [x] Phase 6.1: **Nav cleanup** — dropped scroll-driven
      transparency, always solid black/85 with hairline border-b.
      Brand left, Download/FAQ/Changelog text links center, amber
      Download CTA pill right (with amber glow shadow). Mobile
      hamburger collapses to a full-screen black/95 overlay.
- [x] Phase 6.2: **Footer cleanup** — collapsed from cream
      multi-column to a single hairline row at the bottom of every
      non-home page. Brand + version stamp left, inline link nav
      center (Download · FAQ · Changelog · Privacy · GitHub),
      mono copyright right. Pure black, white/25 mono caps for
      atmosphere. Mobile stacks the three regions vertically.
- [ ] Phase 6.3: **Hover lifts** on every `.card-surface` (use the
      `.card-surface-hover` utility already in globals.css).
- [ ] Phase 6.4: **Visual QA pass** — playwright screenshot every
      page, compare against Fey reference, address obvious deltas.

## Working agreement for agents

1. Pick the **first** unchecked item under "Next".
2. Read CLAUDE.md (`C:/Users/dutch/chirp/CLAUDE.md`) for
   tokens/architecture if needed.
3. Read this file's "Visual language" section before writing any code.
4. Implement the item with `Read`/`Edit`/`Write` against
   `C:/Users/dutch/chirp-website/`. Reference shipped components
   under `C:/Users/dutch/chirp/src/components/` for the visual
   language.
5. `cd C:/Users/dutch/chirp-website && npm run build` — must be clean.
6. **Visual verification is required before declaring an item done.**
   Ensure `npm run dev` is running on port 5173 (start it in the
   background if not). Use Playwright MCP to navigate to
   `http://localhost:5173/`, screenshot the affected page or
   section, **look at the screenshot**, and iterate until it reads
   as premium and brand-consistent. "Renders without errors" is
   not the bar.
7. Commit on `dark-premium-redesign` with a Conventional Commit
   message describing what shipped.
8. **Do NOT push every commit.** Vercel build minutes are limited.
   Push only when a top-level item under "Next" flips from `[ ]`
   to `[x]` — i.e., once per scene/page completion, not once per
   incremental commit.
9. Update **this file** — mark the item `[x]`.
10. Commit + push the RESUME.md update (this is the one push that
    happens per item).
11. Continue to the next item OR stop if all items are `[x]`.

## What NOT to do

- Don't push to `master`. Don't merge anything.
- Don't push every commit (saves Vercel minutes — push once per
  completed top-level item, see step 8 above).
- Don't introduce light-mode CSS. Pure black canvas only.
- Don't add new dependencies without strong justification.
- Don't write CLAUDE.md updates from an agent — that's Pieter's
  source of truth.
- Don't add `// TODO: figure out X later` comments. If you can't
  finish a step, leave the item `[ ]` and document the blocker as
  a new `[ ]` item describing what needs human input, then move on
  to the next pickable item.
- Don't claim a scene is "done" without seeing the screenshot
  yourself first.

## Image generation status (2026-05-01)

Codex `gpt-image-1` access is unavailable in this environment
(read-only Codex sandbox, no model selector exposed). User has
ChatGPT OAuth (no API key) which can't be reached via Playwright
MCP without a manual login session — deferred to a daytime task.
For tonight's work, all atmospheric imagery uses CSS-driven
compositions built from shipped tokens (BirdMark + halo + dotted
backgrounds + radial pools etc.), NOT bitmap brand assets.
