import { useState } from "react";
import { Tick, Cross } from "./Marks";

// Mobile comparison: Chirp beside one alternative you pick, on shared rows.
type Cell = boolean | string;
export type Product = { name: string; href: string };
export type Row = { label: string; cells: Cell[] };

const show = (c: Cell) => (c === true ? <Tick className="text-[#8f6400]" /> : c === false ? <Cross className="text-[#b0aca2]" /> : c);

export default function ComparePicker({ products, rows }: { products: Product[]; rows: Row[] }) {
  const [pick, setPick] = useState(1);
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Compare Chirp with">
        {products.slice(1).map((p, k) => {
          const i = k + 1;
          return (
            <button
              key={p.name}
              type="button"
              role="tab"
              aria-selected={pick === i}
              onClick={() => setPick(i)}
              className="h-10 rounded-full px-4 text-[15px] transition-colors duration-200"
              style={pick === i ? { background: "#292929", color: "#fff" } : { background: "#fff", color: "#292929", boxShadow: "inset 0 0 0 1px rgba(0,0,0,.12)" }}
            >
              {p.name}
            </button>
          );
        })}
      </div>
      <div className="mt-5 overflow-hidden rounded-[20px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
        <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-line text-[15px]">
          <span />
          <span className="bg-[#fbf0d2] px-3 py-3 font-serif text-[18px]">Chirp</span>
          <span className="px-3 py-3 font-serif text-[18px]">{products[pick].name.replace(" voice typing", "")}</span>
        </div>
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-line text-[15px] last:border-b-0">
            <span className="px-4 py-3 text-muted">{r.label}</span>
            <span className="bg-[#fbf0d2] px-3 py-3 font-medium">{show(r.cells[0])}</span>
            <span className="px-3 py-3">{show(r.cells[pick])}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
