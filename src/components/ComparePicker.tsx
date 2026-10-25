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
        <table className="w-full table-fixed border-collapse text-left text-[15px]">
          <colgroup>
            <col className="w-[40%]" />
            <col className="w-[30%]" />
            <col className="w-[30%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-line">
              <th />
              <th className="bg-[#fbf0d2] px-3 py-3 font-serif text-[17px] font-normal">Chirp</th>
              <th className="px-3 py-3 font-serif text-[17px] font-normal leading-tight">{products[pick].name.replace(" voice typing", "")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-line last:border-b-0">
                <td className="px-4 py-3 align-top text-muted">{r.label}</td>
                <td className="bg-[#fbf0d2] px-3 py-3 align-top font-medium">{show(r.cells[0])}</td>
                <td className="px-3 py-3 align-top">{show(r.cells[pick])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
