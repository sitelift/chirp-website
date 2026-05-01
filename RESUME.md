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

- [ ] Phase 4.2: **Privacy scene** for home page. Replace the legacy
      light-mode `PrivacySection` (already removed). Rebuild from
      first principles: large dark editorial scene, headline "Your
      voice never leaves your laptop." or similar, atmospheric visual
      (since Codex image gen is unavailable, use a CSS-driven
      composition — e.g., a stylized padlock/vault SVG with the
      BirdMark embossed; OR three big stat blocks "0 / 0 / 0" with
      labels "servers · network calls · bytes transmitted" in giant
      Geist Sans, hairline-separated, with an amber halo behind the
      heading). Wire into `home-sections.tsx` after the WhatItDoes
      scene.
- [ ] Phase 4.3: **Power tools scene** for home page. Three feature
      cards: Vocabulary, Snippets, Smart Cleanup. Each card uses
      `.card-surface` with hover-lift, real app element previews
      built from ported components where possible (a mini
      vocabulary table mock, a snippets mock, a Smart Cleanup
      SegmentedControl preview). No screenshots. Headline above:
      "Your dictation, finely tuned." or similar.
- [ ] Phase 4.4: **Close CTA scene** for home page. Full-bleed
      atmospheric dark moment. Centered: small BirdMark, halo-hero
      headline "Try Chirp.", subhead "Free. Local. Yours.",
      single amber download CTA, version stamp underneath. No
      light-mode artifacts — all dark canvas.
- [ ] Phase 5.2: **Build /faq page** (currently 404). Use Radix
      Accordion. Source: `lib/constants.ts FAQS`. Each FAQ on a
      hairline-divider row. Headline: "Questions & answers." Single
      column, max-w-[680px], plenty of breathing room.
- [ ] Phase 5.3: **Reskin /download page** to dark mode. Black
      canvas, card-surface OS picker (Mac / Windows segmented
      control). Numbered install steps in hairline-divided rows.
      No cream cards.
- [ ] Phase 5.4: **Reskin /privacy page** to dark mode. Cream cards
      → card-surface. Headings white, body white/65. Section
      headings stay; remove any amber decoration that's not signal.
- [ ] Phase 6.1: **Nav cleanup**. Confirm dark styling matches the
      hero. Announcement pill integrated. Logo + nav links + CTA
      align to the spec.
- [ ] Phase 6.2: **Footer cleanup**. Collapse to a single hairline
      row with copyright + a few minimal links. No big footer
      backdrop image.
- [ ] Phase 6.3: **Hover lifts** on every `.card-surface` (use the
      `.card-surface-hover` utility already in globals.css).
- [ ] Phase 6.4: **Visual QA pass** — playwright screenshot every
      page, compare against Fey reference, address obvious deltas.

## Working agreement for agents

1. Pick the **first** unchecked item.
2. Read CLAUDE.md (`C:/Users/dutch/chirp/CLAUDE.md`) for
   tokens/architecture if needed.
3. Read this file's "Visual language" section before writing any code.
4. Implement the item with `Read`/`Edit`/`Write` against
   `C:/Users/dutch/chirp-website/`.
5. `cd C:/Users/dutch/chirp-website && npm run build` — must be clean.
6. Commit on `dark-premium-redesign` with a Conventional Commit
   message describing what shipped.
7. Push.
8. Update **this file** — mark the item `[x]`.
9. Commit + push the RESUME update.
10. Stop. (Don't try to do multiple items in one fire.)

## What NOT to do

- Don't push to `master`. Don't merge anything.
- Don't introduce light-mode CSS. Pure black canvas only.
- Don't add new dependencies without strong justification.
- Don't write CLAUDE.md updates from a cron — that's the human's
  source of truth.
- Don't add `// TODO: figure out X later` comments. If you can't
  finish a step, leave it `[ ]` and stop, don't ship a half-done
  scene.
