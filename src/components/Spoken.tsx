// What you said, cleaned up in front of you. Three beats:
//   0  the words appear as you say them
//   1  an amber line draws through each filler, one after another
//   2  the struck words fold away and the sentence closes up
// "~" marks a word Chirp drops.
export default function Spoken({
  said,
  shown = Infinity,
  phase,
  className = "",
}: {
  said: string;
  shown?: number;
  phase: 0 | 1 | 2;
  className?: string;
}) {
  const tokens = said.split(" ");
  let dropIndex = 0;
  return (
    <p className={className}>
      {tokens.slice(0, shown).map((t, i) => {
        const drop = t.startsWith("~");
        const word = t.replace(/^~/, "");
        if (!drop) {
          return (
            <span key={i} className="inline-block whitespace-pre" style={{ animation: "ink-content 200ms ease-out both" }}>
              {word}{" "}
            </span>
          );
        }
        const order = dropIndex++;
        const gone = phase === 2;
        return (
          <span
            key={i}
            className="relative inline-block overflow-hidden whitespace-pre align-bottom"
            style={{
              maxWidth: gone ? 0 : "12em",
              opacity: gone ? 0 : 1,
              transition: `max-width 420ms var(--ease) ${order * 40}ms, opacity 260ms linear ${order * 40}ms`,
              animation: "ink-content 200ms ease-out both",
            }}
          >
            <span style={{ opacity: phase > 0 ? 0.45 : 1, transition: "opacity 200ms linear" }}>{word} </span>
            <span
              className="absolute left-0 top-[52%] h-[0.12em] rounded-full bg-amber"
              style={{
                width: "calc(100% - 0.3em)",
                transform: `scaleX(${phase > 0 ? 1 : 0})`,
                transformOrigin: "left",
                transition: `transform 260ms var(--ease) ${phase === 1 ? order * 110 : 0}ms`,
              }}
            />
          </span>
        );
      })}
    </p>
  );
}
