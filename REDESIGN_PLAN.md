# Dark Premium Redesign — Plan

Branch: `dark-premium-redesign`
Reference: Fey (fey.com + Mobbin "Fey web Apr 2025" screenshot pack)
Today: 2026-04-30

---

## 1. Why this redesign

The Chirp desktop app was just overhauled to a dark, premium, Fey-inspired aesthetic. The website is now stylistically out of sync — sunset-illustration hero → cream/cream-yellow middle → dusk-illustration close. It reads "friendly indie tool," not "premium native app." Goal: bring trychirp.com / chirptype.com into the same visual language as the new app.

The current `STYLE.md` and `SPEC.md` are emphatically light-only ("Premium doesn't mean dark. It means considered.", "Dark mode or dark sections" listed as anti-pattern). Both must be rewritten alongside the redesign — they will otherwise actively contradict the new direction for any future Claude session.

---

## 2. Audit summary

### Current chirptype.com (live, on master)

| # | Section | Treatment | Issue |
|---|---|---|---|
| 1 | Hero | Dusk illustration BG, black/30 overlay, white type, yellow CTA | Cute > premium; competes with email mock card |
| 2 | Integrations | White, "Works where you do." + app pills | Fine, but visually unmoored |
| 3 | PowerTools (bento) | Stone-50 dotted BG, white cards | Generic SaaS bento |
| 4 | Privacy 0/0/0 stats | White | Strong section, just needs reskin |
| 5 | FreeForever pricing | Cream amber-50 + 3 cards | Friendly tone clashes with premium |
| 6 | Founder note | White, big quote | Works, dark version even better |
| 7 | FAQ | Stone-50/60 accordion | Works, easy port |
| 8 | Close CTA | Night-sky illustration, "Try chirp." | Illustration → modern dark gradient |
| — | /download | White hero + dark footer | Reskin |
| — | /privacy | White cream cards | Reskin |
| — | /faq, /changelog | **404 deployed** — pages don't exist in `app/` despite SPEC.md and footer linking to them | Build them |

### Fey, distilled (what we're stealing)

- **Pure black canvas** (`#000` / `#06070A`-ish). No gradient washes.
- **Editorial display headlines.** "Make better investments." / "See the big picture." / "From overwhelming to effortless." Big, centered, often a single sentence per scene.
- **Product UI as the hero.** Real-looking app screenshots floating with subtle elevation; sometimes framed in a dark macOS bezel, sometimes bleeding into the canvas.
- **Single sentence + screenshot, repeated.** Each scene is one idea, very dense vertical rhythm.
- **Restrained color.** Mostly monochrome white-on-black. One or two accents: green (gain), red (loss), and the occasional gradient text headline (purple→pink→orange) used very sparingly.
- **Photography integrated.** Real human shot ("Earnings in real time" — woman in headphones) breaks up the UI density.
- **Logo / brand strip** at bottom of trust section: small, monochrome, centered.
- **Tiny pill nav, top-rounded.** "Fey has joined Wealthsimple — Learn more" — secondary announcement bar living next to nav.
- **Footer is whisper-quiet.** Small links, no oversized columns.

---

## 3. Target design language

### 3.1 Tokens (replacement for `app/globals.css` `@theme inline`)

Keep the `chirp-amber` and `chirp-stone` palettes — the desktop app likely still uses them, and amber stays as our brand-recognizable accent. But invert the surface vocabulary and add a true-dark layer.

```
/* Surfaces — new dark layer */
--color-ink-0:   #06070A;   /* page bg */
--color-ink-1:   #0B0D12;   /* section alt */
--color-ink-2:   #11141B;   /* card resting */
--color-ink-3:   #181C25;   /* card raised / nav blur base */
--color-hairline: rgba(255,255,255,0.06);   /* default borders */
--color-hairline-strong: rgba(255,255,255,0.10);

/* Text on dark */
--color-text-primary:   #F4F4F2;   /* near-white, slightly warm */
--color-text-secondary: #A8A8A8;
--color-text-tertiary:  #6E6E73;
--color-text-quaternary:#3F3F46;   /* meta/version stamps */

/* Accents (kept) */
--color-chirp-amber-400: #FBBF24;   /* CTA */
--color-chirp-amber-500: #F59E0B;   /* CTA pressed/hover-glow */
--color-chirp-yellow:    #F0B723;   /* logo only */

/* Semantic */
--color-success: #4ADE80;   /* recording dot */
--color-error:   #F87171;

/* Shadows now do double duty: outer glow + inner light */
--shadow-card:   inset 0 1px 0 rgba(255,255,255,0.04);
--shadow-raised: inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 2px rgba(0,0,0,0.5);
--shadow-hero:   0 40px 80px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06);
--shadow-amber-glow: 0 8px 32px rgba(245,158,11,0.35), 0 0 0 1px rgba(245,158,11,0.4) inset;
```

Light/cream tokens still defined but flagged as legacy — keep them so we can phase the migration without breaking, then delete.

### 3.2 Type

Keep Nunito for now to preserve brand recognition with the app, but consider a swap to a more editorial display face (Fey uses a custom serif-ish "Editorial New"-style face) as a **second-pass option**. For v1 of this redesign:

- **Hero / scene headlines:** Nunito 800, `tracking-[-0.035em]`, `leading-[0.95]`. Sizes lift: `text-7xl` → `text-8xl` desktop. Fey-style: short, period-terminated.
- **Sub-headlines:** Inter 400, 18–20px, `text-text-secondary`, `max-w-[44ch]`.
- **Eyebrow labels above headline (optional):** Inter 500, 12px, uppercase, `tracking-[0.2em]`, `text-text-tertiary`. Used very sparingly — Fey actually uses a small "Fey" wordmark above the hero headline as an eyebrow; we can mirror with a small `chirp` mark.
- **Mono:** JetBrains Mono kept for version strings, key badges, file paths.

### 3.3 Motion

Existing `lib/motion.ts` `reveal` / `staggerContainer` / `staggerChild` are already correct (opacity + small Y, ease-out, once). No change needed. Add:

- **Hero parallax subtle:** product mock translateY on scroll (0–40px over ~600px scroll). Prefers-reduced-motion: disable.
- **Cursor-aware spotlight** on hero card: faint amber radial that follows mouse — Fey uses something similar on their hero. CSS `radial-gradient` driven by CSS vars set via `mousemove`. Cheap, high-perceived-quality.

### 3.4 Components — new patterns

- **DarkCard**: `bg-ink-2`, `border-hairline`, `rounded-2xl`, optional `shadow-card`. Replace the "white bordered card" pattern everywhere.
- **Bezel frame**: thin chrome-like outer ring around UI mocks (Fey's hero laptop). Used once on the hero product demo.
- **Glow CTA**: existing amber pill but with the new `shadow-amber-glow`. Hover lifts the glow.
- **Hairline divider**: 1px `border-hairline` replaces all `border-stone-100` / `border-black/[0.06]`.
- **Announcement pill** (new): top-of-nav rounded pill — "Mac + Windows now both supported · Learn more". Mirrors Fey's "Fey has joined Wealthsimple" treatment.
- **Stat block**: monochrome `0 servers / 0 calls / 0 bytes` ported from current Privacy section, on `ink-1`.

---

## 4. Page-by-page

### 4.1 Home (`app/page.tsx` + `components/home-sections.tsx`)

Total scenes drop from 8 to 6. Each scene is one big idea on `ink-0` or `ink-1`, alternating.

| Scene | Bg | Headline (placeholder) | Visual |
|---|---|---|---|
| 1 — Hero | `ink-0` + spotlight | **"Speak freely."** | New `WorkflowDemo` reskinned dark, in a thin macOS bezel, floating on black. Subtle amber spotlight follows cursor. |
| 2 — Privacy stats | `ink-1` | **"Your voice never leaves your laptop."** | Existing 0/0/0 stat block, monochrome on dark, hairline dividers. |
| 3 — Works everywhere | `ink-0` | **"Drops in wherever you type."** | Integration grid, app marks switched to monochrome SVGs on `ink-2` chips. Possibly a marquee row underneath of all integrations. |
| 4 — Power tools | `ink-1` | **"Heavyweight power. Lightweight footprint."** | Two large feature cards (Tone Modes, Custom Dict) on `ink-2`, then one wide card (Native Performance + chip badges). Drop the bento entirely — Fey doesn't use one. |
| 5 — Free | `ink-0` | **"$0. Forever."** | Single, calmer pricing block. Drop the 3-cell ($0 / ∞ / Yours) layout — too SaaS. Replace with one centered statement and a small comparison underneath. |
| 6 — Close CTA | `ink-0` with an amber radial wash low on the page | **"Try chirp."** | Big bird mark at very low opacity behind the headline. Single download CTA. Version string. Footer collapses into this scene (no separate dark band). |

Drop the founder-quote section — feels brand-young in a way Fey doesn't. Move the quote into the FAQ page or `/about` if we ever build one.

Drop `hero-bg.jpeg` and `footer-bg.jpeg` from `public/`. They're the biggest "indie illustrated" tells.

### 4.2 Download (`app/download/page.tsx`)

- Reskin to `ink-0`. Bird mark 48px in `chirp-amber-500` at 70% opacity.
- Centered download card on `ink-2`, hairline border, two OS pills (already exists). OS auto-detect via `navigator.userAgentData`.
- Numbered install steps in `ink-1` strip below.
- Footer compressed to one hairline line.

### 4.3 Privacy (`app/privacy/page.tsx`)

- Cream cards → `ink-2` cards. Headings in `text-primary`, body in `text-secondary`.
- Section icons stay (small amber).

### 4.4 FAQ (`app/faq/page.tsx`) — **new, currently 404**

- Build the page that `SPEC.md` already specs out, in dark.
- Single-column accordion, max-w-[680px].
- Section headings as eyebrows.
- Pull data from existing `lib/constants.ts` `FAQS` (already there).

### 4.5 Changelog (`app/changelog/page.tsx`) — **new, currently 404**

- Build per `SPEC.md`.
- Each release on a `border-b border-hairline` block, max-w-[640px].
- Version: `font-mono text-chirp-amber-500`, date: mono `text-tertiary`.
- Pull from existing `CHANGELOG` constant.

---

## 5. Component-level work

### Update
- `components/nav.tsx` — dark, blur on scroll, add announcement pill slot.
- `components/footer.tsx` — collapse to one hairline row.
- `components/conditional-footer.tsx` — re-evaluate; the close section may absorb the footer on home.
- `components/workflow-demo.tsx` — reskin internals to dark UI (the editor mock, the chirp overlay, waveform colors).
- `components/integration-grid.tsx` — chip backgrounds → `ink-2`, app icons forced monochrome white.
- `components/power-tools.tsx` — drop bento; refactor to the feature-row pattern.
- `components/feature-card.tsx`, `feature-row.tsx` — dark variants.
- `components/waveform.tsx`, `waveform-overlay-demo.tsx`, `keyboard-demo.tsx`, `overlay-demo.tsx`, `history-demo.tsx`, `settings-demo.tsx` — all need a dark pass since they appear in demos.
- `components/key-badge.tsx` — `ink-3` cap with hairline + inset highlight.
- `components/bird-mark.tsx` — no change, already SVG-driven.
- `components/architecture-diagram.tsx` — reskin boxes to `ink-2`, connectors brighter amber.
- `components/section-divider.tsx` — likely deletable (we use bg-color shifts).

### Probably delete
- `components/amber-warmth.tsx` — light-mode glow orb, not needed.
- `components/brand-logos.tsx` and `logo-strip.tsx` — only if we drop a brand-strip section; otherwise reskin.
- `app/download/layout.tsx` — re-check whether the wrapper still serves a purpose once the global layout goes dark.
- Background JPEGs in `public/` (hero-bg.jpeg, footer-bg.jpeg).

### New
- `components/dark-card.tsx` — primitive used everywhere.
- `components/spotlight.tsx` — cursor-tracking amber radial.
- `components/announcement-pill.tsx` — top-nav announcement.
- `components/bezel-frame.tsx` — macOS-bezel chrome around the hero demo.
- `components/scene.tsx` — full-bleed `ink-0` / `ink-1` section wrapper with consistent vertical rhythm (`py-32 md:py-40`).

### Constants & docs
- `lib/constants.ts` — copy passes; tighten headlines to Fey-style single sentences.
- **Rewrite `STYLE.md`** to reflect dark-premium tokens, shadows, type, and the new "show, don't decorate" rule (this part is preserved). Mark old light-only rules as superseded.
- **Update `SPEC.md`** so it stops calling dark mode an anti-pattern. The structural advice (no bento, no comparison tables, no fake testimonials, etc.) all stays — most of it actually applies even better in dark.
- **Update `CLAUDE.md`** Design Rules section so future sessions don't re-apply light-mode constraints. Replace "No dark mode" with the new dark-only directive.

---

## 6. Phased execution

I'd ship this in five PR-sized phases on `dark-premium-redesign`. Each phase ends in a deployable state, so we can preview on Vercel as we go.

**Phase 0 — Tokens & globals (no visual change yet)**
- Add `ink-*`, `text-*`, `hairline` tokens to `globals.css`. Keep old tokens.
- Set `body` bg to `ink-0`, default text to `text-primary`.
- This will cause the existing site to render mostly broken — that's expected; phase 1 fixes it.

**Phase 1 — Chrome (nav + footer + base layout)**
- Dark nav with blur on scroll, announcement pill.
- Collapsed dark footer.
- Site is now dark + currently-broken-looking content. Push & view on Vercel.

**Phase 2 — Home page rewrite**
- New hero (drop hero-bg.jpeg, build bezeled product demo).
- Reskin/rewrite each home section.
- Drop founder note + bento + 3-card pricing.

**Phase 3 — /download + /privacy reskin**
- Mostly mechanical token swaps.

**Phase 4 — /faq + /changelog (new pages)**
- Build the two missing routes. Removes the 404s on the live footer links.

**Phase 5 — Doc cleanup + polish**
- Rewrite `STYLE.md` and `SPEC.md` to match.
- Update `CLAUDE.md` Design Rules.
- Remove dead components (`amber-warmth.tsx`, etc.) and unused public/ assets.
- Lighthouse + reduced-motion + mobile sweep.

---

## 7. Open decisions to confirm before phase 2

1. **Display font** — keep Nunito for brand-cohesion with app, or swap to an editorial face (Fey-style)? Recommend: keep Nunito v1, revisit after first preview.
2. **Hero copy** — keep "Speak freely." or move to a Fey-shape statement like "Voice in. Words out." or "Talk. Type. Done."? Recommend: keep "Speak freely.", strengthens brand.
3. **Photography** — Fey breaks up UI density with one human photo. Do we have / want a Pieter shot or a "person at desk" photo? Recommend: skip in v1.
4. **Macro CTA** — currently "Download for Mac & Windows" + "Learn More" secondary. Recommend dropping secondary CTA (Fey only ever has one).
5. **Domain** — `STYLE.md` says trychirp.app, live is chirptype.com, layout has chirptype.com. Confirm canonical domain so OG/meta is correct.

---

## 8. Risk / what could go wrong

- **Demo legibility on dark** — the workflow demo's "email being typed into a mock editor" was the showstopper of the current site. On dark, it has to read just as clearly. Plan to reskin the editor-mock with `ink-2` bg, white-ish prose text, amber cursor — and test contrast.
- **Re-deploying with a stale STYLE.md** — if I touch design before rewriting STYLE/SPEC/CLAUDE, a future Claude run could "fix" the dark mode back to light. Doc updates can't be a polish-phase afterthought; they belong in Phase 5 *before* the branch merges.
- **Existing /faq and /changelog 404s** — the live footer links to them today. Phase 4 fixes this; until then, the dark redesign also still has those broken links.

---

## 9. Out of scope for this redesign

- Internationalization (currently English-only is fine).
- A blog or content marketing routes.
- Pricing tiers (the product is free).
- Auth / account routes.
- Marketing analytics beyond the existing setup.
