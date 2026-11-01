import React from "react";
// Machine photos and copy from the owner's brochure "Machinery Portion 2.pdf" (Dec 2024), see
// src/assets/machinery/SOURCES.txt. Catalogue shots supplied by the owner, not stock imagery.
import imgHeidelbergDemy from "../../../assets/machinery/heidelberg-single-demy.webp";
import imgPolar from "../../../assets/machinery/polar-cutting.webp";
import imgHeidelbergMOE from "../../../assets/machinery/heidelberg-moe.webp";
import imgDieCuttingTiger from "../../../assets/machinery/die-cutting-tiger.webp";
import imgCupFormingDW from "../../../assets/machinery/cup-forming-double-wall.webp";
import imgUvCoating from "../../../assets/machinery/uv-coating.webp";
import imgPasting from "../../../assets/machinery/pasting.webp";
import imgCupForming from "../../../assets/machinery/cup-forming-1.webp";

const MACHINES = [
  { name: "Printing Machine (Heidelberg 23×36, Demy)", unit: "Printing", image: imgHeidelbergDemy, desc: "Heidelberg single-colour Demy-size offset press for sharp text, fine detail and consistent colour on every run." },
  { name: "Printing Machine (MOE)", unit: "Printing", image: imgHeidelbergMOE, desc: "Original Heidelberg MO-E offset unit for single-colour and spot-colour work on board." },
  { name: "Polar Cutting Machine", unit: "Cutting", image: imgPolar, desc: "Programmable guillotine for square, repeatable sheet cutting before and after print." },
  { name: "Die Cutting Machine (Tiger)", unit: "Cutting", image: imgDieCuttingTiger, desc: "Tiger-brand platen die cutter for high-volume creasing and cutting of boxes and sleeves." },
  { name: "UV Coating Machine", unit: "Finishing", image: imgUvCoating, desc: "Gloss and matte UV coating for scuff resistance and a finished retail look." },
  { name: "Pasting Machine", unit: "Converting", image: imgPasting, desc: "Automatic folder-gluer that pastes boxes and sleeves at line speed." },
  { name: "Paper Cup Forming Machine", unit: "Forming", image: imgCupForming, desc: "High-speed cup former with ultrasonic sealing for leak-proof hot and cold cups." },
  { name: "Paper Cup Double Wall Forming Machine", unit: "Forming", image: imgCupFormingDW, desc: "Tiger double-wall former that wraps an insulated outer sleeve for hot drinks without a separate holder." },
];

export function MachineryGrid() {
  return (
    <section className="py-24 md:py-32 bg-white text-zinc-900" aria-labelledby="machinery-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12 md:mb-16 space-y-5">
          <span className="inline-block text-[10px] font-black uppercase tracking-[0.3em] text-[#fabf37] bg-black px-4 py-2 rounded-lg">Our Machineries</span>
          <h2 id="machinery-heading" className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            Print, cut, finish, <span className="text-zinc-500">form.</span>
          </h2>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[11px] leading-relaxed">
            The presses, cutters and formers on our floor in Dhaka.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {MACHINES.map((m) => (
            <li key={m.name} className="group rounded-[28px] border border-zinc-200 bg-white overflow-hidden hover:border-[#fabf37] transition-colors">
              <div className="aspect-[4/3] bg-zinc-50 overflow-hidden">
                <img
                  src={m.image}
                  alt={m.name}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-contain p-4 group-hover:scale-105 transition-transform duration-700 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>
              <div className="p-5 md:p-6 space-y-2">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">{m.unit} unit</span>
                <h3 className="text-base md:text-lg font-black uppercase tracking-tight leading-tight">{m.name}</h3>
                <p className="text-[11px] font-bold text-zinc-500 leading-relaxed">{m.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
