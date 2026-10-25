// What you said, cleaned up in front of you:
//   phase 0  the words appear as you say them
//   phase 1  a thick amber line draws through each filler, one after another
// Every word is laid out from the start (unsaid ones are invisible), so the
// block never changes height. Struck words stay, dimmed, so the before and
// after can both be read. "~" marks a word Chirp drops.
export default function Spoken({
  said,
  shown = Infinity,
  phase,
  className = "",
}: {
  said: string;
  shown?: number;
  phase: 0 | 1;
  className?: string;
}) {
  const tokens = said.split(" ");
  let dropIndex = 0;
  return (
    <p className={className}>
      {tokens.map((t, i) => {
        const drop = t.startsWith("~");
        const word = t.replace(/^~/, "");
        const last = i === tokens.length - 1;
        const visible = i < shown;
        const show = { opacity: visible ? 1 : 0, transition: "opacity 160ms ease-out" };
        if (!drop) {
          return (
            <span key={i} style={show}>
              {word}
              {last ? "" : " "}
            </span>
          );
        }
        const order = dropIndex++;
        return (
          <span key={i} style={show}>
            <span className="relative inline-block">
              <span style={{ opacity: phase ? 0.4 : 1, transition: `opacity 300ms linear ${order * 160}ms` }}>{word}</span>
              <span
                className="absolute -inset-x-[0.06em] top-[54%] rounded-full bg-amber"
                style={{
                  height: "max(3px, 0.16em)",
                  transform: `translateY(-50%) scaleX(${phase ? 1 : 0})`,
                  transformOrigin: "left",
                  transition: `transform 320ms var(--ease) ${phase ? order * 160 : 0}ms`,
                }}
              />
            </span>
            {last ? "" : " "}
          </span>
        );
      })}
    </p>
  );
}
