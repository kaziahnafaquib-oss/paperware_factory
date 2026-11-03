import React from "react";
import { PAPER_CUP_SIZES, cupSizesByWall, type CupSize, type CupWall } from "../../data/paper-cup-sizes";
import img150 from "../../../assets/products/cups/150-ml-white-paper-cup.jpg";
import img210 from "../../../assets/products/cups/210-ml-plain-paper-cup.jpg";

/** Sheet pictures, keyed by filename (CupSize.image). */
const SHEET_IMAGES = import.meta.glob("../../../assets/products/cups/*.jpg", { eager: true, import: "default" }) as Record<string, string>;
const sheetImage = (name?: string) => (name ? SHEET_IMAGES[`../../../assets/products/cups/${name}`] : undefined);

/** Fallback owner photos for single-wall sizes without a sheet picture. */
const PHOTO_BY_SIZE: Record<string, string> = { "150 ML": img150, "210 ML": img210 };

const GROUPS: { key: string; title: string; walls: CupWall[] }[] = [
  { key: "single", title: "Single Wall", walls: ["single", "double-pe"] },
  { key: "double", title: "Double Wall", walls: ["double"] },
  { key: "ripple", title: "Ripple Wall", walls: ["ripple"] },
];

const mm = (n: number) => `${n} mm`;

function Thumb({ cup }: { cup: CupSize }) {
  const src = sheetImage(cup.image) ?? (cup.wall === "single" ? PHOTO_BY_SIZE[cup.size] : undefined);
  return (
    <div className="w-20 shrink-0">
      <div className="aspect-square w-20 rounded-xl bg-zinc-50 border border-black/5 overflow-hidden flex items-center justify-center">
        {src ? (
          <img src={src} alt={`${cup.size} ${cup.wall === "double-pe" ? "double PE" : cup.wall} paper cup`} loading="lazy" className="size-full object-contain" />
        ) : null}
      </div>
      {!src && (
        <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-zinc-400 leading-tight">Image: pending sheet export</p>
      )}
    </div>
  );
}

const label = (c: CupSize) => `${c.size}${c.variant ? ` (${c.variant})` : ""}`;

function Group({ title, walls }: { title: string; walls: CupWall[] }) {
  const rows = walls.flatMap((w) => cupSizesByWall(w));
  return (
    <div className="mb-16 md:mb-20" data-testid={`cup-group-${title.toLowerCase().replace(/\s/g, "-")}`}>
      <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black mb-6">
        {title} <span className="text-zinc-400 text-sm tracking-widest">{rows.length} sizes</span>
      </h3>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-black/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 text-[10px] font-black uppercase tracking-widest text-zinc-400">
            <tr>
              {["Image", "Size", "Type", "Use", "Upper", "Lower", "Height", "GSM options", "Outer GSM", "PE", "MOQ", "Variant"].map((h) => (
                <th key={h} scope="col" className="px-4 py-3 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 font-bold text-zinc-600">
            {rows.map((c) => (
              <tr key={c.id} className="align-top">
                <td className="px-4 py-3"><Thumb cup={c} /></td>
                <th scope="row" className="px-4 py-3 font-black text-black whitespace-nowrap">{c.size}</th>
                <td className="px-4 py-3">{c.name}</td>
                <td className="px-4 py-3 whitespace-nowrap">{c.use}</td>
                <td className="px-4 py-3 whitespace-nowrap">{mm(c.upperMm)}</td>
                <td className="px-4 py-3 whitespace-nowrap">{mm(c.lowerMm)}</td>
                <td className="px-4 py-3 whitespace-nowrap">{mm(c.heightMm)}</td>
                <td className="px-4 py-3">{c.gsm.join(", ")}</td>
                <td className="px-4 py-3 whitespace-nowrap">{c.outerGsm ?? ""}</td>
                <td className="px-4 py-3 whitespace-nowrap">{c.pe}</td>
                <td className="px-4 py-3 whitespace-nowrap">{c.moq.toLocaleString("en-US")}</td>
                <td className="px-4 py-3 whitespace-nowrap">{c.variant ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ul className="md:hidden space-y-4">
        {rows.map((c) => (
          <li key={c.id} className="rounded-2xl border border-black/10 p-4 bg-white">
            <div className="flex gap-4">
              <Thumb cup={c} />
              <div className="min-w-0">
                <p className="text-lg font-black uppercase tracking-tighter text-black">{label(c)}</p>
                <p className="text-xs font-bold text-zinc-500">{c.name}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-1">{c.use}</p>
              </div>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              {([
                ["Upper", mm(c.upperMm)],
                ["Lower", mm(c.lowerMm)],
                ["Height", mm(c.heightMm)],
                ["PE", c.pe],
                ["GSM options", c.gsm.join(", ")],
                ["Outer GSM", c.outerGsm ? String(c.outerGsm) : null],
                ["MOQ", c.moq.toLocaleString("en-US")],
                ["Variant", c.variant ?? null],
              ] as [string, string | null][]).filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="min-w-0">
                  <dt className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{k}</dt>
                  <dd className="font-bold text-zinc-700 break-words">{v}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CupSizeTables() {
  return (
    <section className="container mx-auto px-4 mt-20 md:mt-32" aria-labelledby="cup-sizes-heading">
      <div className="flex items-center gap-4 mb-2">
        <div className="size-2 bg-[#fabf37] rounded-full" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">{PAPER_CUP_SIZES.length} size listings</p>
      </div>
      <h2 id="cup-sizes-heading" className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black mb-10">
        Paper Cup Sizes
      </h2>
      {GROUPS.map((g) => <Group key={g.key} title={g.title} walls={g.walls} />)}
    </section>
  );
}
