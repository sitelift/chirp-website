"use client";

// In-place per-token text transformer. Renders a sequence of tokens
// (each marked keep / delete / replace), and progresses through five
// visual states:
//
//   raw          — render every token's raw form, white/45
//   typing       — like raw but only the first N chars are shown
//   transforming — each token crossfades / shrinks per its delay
//   highlighted  — clean form visible, changed tokens glow amber
//   clean        — clean form visible, all tokens white/100
//
// The transformation is the centerpiece of the "what it does" scene —
// the visitor literally sees the cleanup happen: filler words shrink
// and disappear, spoken-punctuation words morph into real punctuation,
// lowercase capitalizes, "three pm" becomes "3 PM". Each change is
// flagged with `highlight: true` so it briefly glows amber when it
// lands, then settles to white as the final sentence holds.

export interface TransformToken {
  /** Raw transcript form, including trailing whitespace if present. */
  raw: string;
  /** Cleaned form. Empty string means the token is fully removed. */
  clean: string;
  type: "keep" | "delete" | "replace";
  /** When this token's transformation begins, normalized 0..1 within
   *  the transform phase. Earlier delays land first. */
  delay: number;
  /** If true, the cleaned form briefly glows amber on landing. */
  highlight?: boolean;
}

interface Props {
  tokens: TransformToken[];
  showState: "raw" | "typing" | "transforming" | "highlighted" | "clean";
  /** During "typing": 0..1 fraction of total chars to reveal.
   *  During "transforming": 0..1 progress through the transform phase. */
  progress: number;
  /** During "highlighted" → "clean" fade: 1 = full amber, 0 = white. */
  highlightOpacity: number;
}

/** Each token's transformation takes this fraction of the transform
 *  phase to morph (so delays + this duration must fit in 0..1). */
const TOKEN_MORPH_DURATION = 0.32;

const AMBER = { r: 240, g: 183, b: 35 };

function lerpToWhite(opacity: number) {
  const r = Math.round(255 - (255 - AMBER.r) * opacity);
  const g = Math.round(255 - (255 - AMBER.g) * opacity);
  const b = Math.round(255 - (255 - AMBER.b) * opacity);
  return `rgb(${r}, ${g}, ${b})`;
}

export function TextTransformer({
  tokens,
  showState,
  progress,
  highlightOpacity,
}: Props) {
  // "typing" mode reveals raw text char-by-char.
  if (showState === "typing") {
    const fullRaw = tokens.map((t) => t.raw).join("");
    const visible = Math.floor(progress * fullRaw.length);
    return (
      <span style={{ whiteSpace: "pre-wrap" }}>{fullRaw.slice(0, visible)}</span>
    );
  }

  return (
    <span style={{ whiteSpace: "pre-wrap" }}>
      {tokens.map((token, i) => (
        <TokenSpan
          key={i}
          token={token}
          showState={showState}
          progress={progress}
          highlightOpacity={highlightOpacity}
        />
      ))}
    </span>
  );
}

interface TokenSpanProps {
  token: TransformToken;
  showState: Exclude<Props["showState"], "typing">;
  progress: number;
  highlightOpacity: number;
}

function TokenSpan({
  token,
  showState,
  progress,
  highlightOpacity,
}: TokenSpanProps) {
  // Pre-transform: raw form visible.
  if (showState === "raw") {
    return <span style={{ whiteSpace: "pre" }}>{token.raw}</span>;
  }

  // Post-transform settled: clean form visible (or nothing for deletes).
  if (showState === "clean") {
    if (token.type === "delete") return null;
    return <span style={{ whiteSpace: "pre" }}>{token.clean}</span>;
  }

  // Post-transform highlighted: clean form, with amber glow on changed
  // tokens. The amber fades to white via `highlightOpacity`.
  if (showState === "highlighted") {
    if (token.type === "delete") return null;
    if (token.highlight) {
      return (
        <span
          style={{
            whiteSpace: "pre",
            color: lerpToWhite(highlightOpacity),
            transition: "color 80ms linear",
          }}
        >
          {token.clean}
        </span>
      );
    }
    return <span style={{ whiteSpace: "pre" }}>{token.clean}</span>;
  }

  // showState === "transforming" — per-token morph based on its delay.
  if (token.type === "keep") {
    return <span style={{ whiteSpace: "pre" }}>{token.raw}</span>;
  }

  const tokenProgress = clamp01(
    (progress - token.delay) / TOKEN_MORPH_DURATION,
  );

  if (token.type === "delete") {
    if (tokenProgress >= 1) return null;
    return (
      <span
        style={{
          whiteSpace: "pre",
          display: "inline-block",
          opacity: 1 - tokenProgress,
          // Shrinking font-size collapses width as the token fades,
          // so neighboring text reflows smoothly into the gap.
          fontSize: `${1 - tokenProgress}em`,
          verticalAlign: "baseline",
        }}
      >
        {token.raw}
      </span>
    );
  }

  // type === "replace" — crossfade raw → clean using a CSS-grid stack
  // (both forms occupy grid cell 1/1; the cell width is the wider of
  // the two so there's no layout shift mid-crossfade).
  if (tokenProgress >= 1) {
    if (token.highlight) {
      return (
        <span style={{ whiteSpace: "pre", color: "#F0B723" }}>
          {token.clean}
        </span>
      );
    }
    return <span style={{ whiteSpace: "pre" }}>{token.clean}</span>;
  }

  return (
    <span
      style={{
        display: "inline-grid",
        gridTemplateColumns: "min-content",
        gridTemplateRows: "min-content",
        verticalAlign: "baseline",
      }}
    >
      <span
        style={{
          gridArea: "1 / 1",
          whiteSpace: "pre",
          opacity: 1 - tokenProgress,
        }}
      >
        {token.raw}
      </span>
      <span
        style={{
          gridArea: "1 / 1",
          whiteSpace: "pre",
          opacity: tokenProgress,
          color: token.highlight ? "#F0B723" : undefined,
        }}
      >
        {token.clean}
      </span>
    </span>
  );
}

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}
