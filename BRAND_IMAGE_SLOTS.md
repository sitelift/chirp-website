# Brand Image Slots

Every `<BrandPlaceholder name="..." />` instance on the site must
have a row here. Morning ChatGPT image gen (in a daytime task)
produces one PNG per slot, drops it into
`public/brand/<name>.png`, and the placeholder gets swapped for
`<Image src="/brand/<name>.png" />` at the same call site.

Slot rows are added by the overnight loop as scenes are built.

## Style guide for the bitmaps (when generated)

- Pure black background (`#000`).
- Atmospheric, cinematic, premium. Fey-flavored.
- Chirp brand color is amber `#F0B723` — used sparingly as glow,
  not as a flat fill.
- Dimensions: render at 2x the layout size, then export at the
  layout's native pixel dimensions. PNG with alpha if the
  composition wants to blend into the canvas; otherwise PNG with
  pure-black background.
- No text in the image (typography is layered via DOM).

## Suggested ChatGPT prompt template

> A cinematic, atmospheric brand image for a premium voice-to-text
> Mac & Windows app called Chirp. Pure black background, [SUBJECT
> + COMPOSITION]. Soft amber rim light. No text, no logo
> wordmark. Aspect ratio [RATIO]. Style: dark editorial,
> understated, premium native feel, similar to Fey (fey.com).

## Slots

(Updated by the loop as scenes are built. Format below.)

| Name | Aspect | Location | Composition brief | Status |
|------|--------|----------|-------------------|--------|
| _(none yet — loop will add as scenes ship)_ | | | | |

---

### Slot row format

When adding a slot row, fill in:

- **Name** — matches the `name=` prop and the eventual
  `public/brand/<name>.png` filename.
- **Aspect** — the CSS aspect-ratio used at the call site (e.g.
  `16 / 10`).
- **Location** — file + component where the placeholder lives
  (e.g. `components/close-cta-scene.tsx · main centerpiece`).
- **Composition brief** — one or two sentences describing what
  the bitmap should depict. Will be expanded into a full ChatGPT
  prompt in the daytime image-gen pass.
- **Status** — `placeholder` (default) until the real image
  lands, then `live`.
