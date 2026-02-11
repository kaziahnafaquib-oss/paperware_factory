import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Recycle, Wind, Droplets, Zap, ChevronRight, Calculator, PieChart } from "lucide-react";

export function CarbonCalculator() {
  const [quantity, setQuantity] = useState(50000);
  const [material, setMaterial] = useState("kraft");

  const materials = {
    kraft: { name: "Nordic Kraft", saved: 0.12, plastic: 1.0 },
    bio: { name: "Bio-Shield Barrier", saved: 0.25, plastic: 1.2 },
    nordic: { name: "High-Density Fiber", saved: 0.08, plastic: 0.9 }
  };

  const plasticSaved = (quantity * materials[material as keyof typeof materials].plastic).toFixed(2);
  const co2Saved = (quantity * materials[material as keyof typeof materials].saved).toFixed(2);

  return (
    <section className="py-24 bg-[#fdfaf3] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-[64px] border border-black/5 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.1)] overflow-hidden">
           <div className="flex flex-col lg:flex-row">
              
              {/* Left: Input */}
              <div className="lg:w-2/5 bg-black p-12 md:p-20 text-white space-y-12">
                 <div className="space-y-6">
                    <div className="flex items-center gap-4 text-[#fabf37] font-black uppercase tracking-[0.4em] text-[10px]">
                      <div className="h-[1px] w-12 bg-[#fabf37]" />
                      Eco-Audit Tool
                    </div>
                    <h2 className="text-[32px] md:text-[52px] font-black uppercase tracking-tighter leading-none">
                      Impact <br /> <span className="text-zinc-600 italic">Calculator</span>
                    </h2>
                    <p className="text-zinc-400 font-bold text-sm leading-relaxed">
                      Quantify your company's contribution to the circular economy by switching to Paperware solutions.
                    </p>
                 </div>

                 <div className="space-y-8">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Order Quantity</label>
                       <input 
                          type="range" 
                          min="1000" 
                          max="1000000" 
                          step="1000"
                          value={quantity}
                          onChange={(e) => setQuantity(parseInt(e.target.value))}
                          className="w-full accent-[#fabf37]"
                       />
                       <div className="flex justify-between font-black text-2xl tracking-tight italic">
                          <span>{quantity.toLocaleString()} <span className="text-[10px] uppercase not-italic text-zinc-600">Units</span></span>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Select Material Technology</label>
                       <div className="grid grid-cols-1 gap-3">
                          {Object.entries(materials).map(([key, m]) => (
                            <button 
                              key={key}
                              onClick={() => setMaterial(key)}
                              className={`flex items-center justify-between px-6 py-4 rounded-2xl border-2 transition-all ${material === key ? 'bg-[#fabf37] border-[#fabf37] text-black' : 'bg-zinc-900 border-white/5 text-white hover:border-white/20'}`}
                            >
                               <span className="text-xs font-black uppercase tracking-widest">{m.name}</span>
                               <div className={`size-4 rounded-full border-2 ${material === key ? 'border-black bg-black' : 'border-white/20'}`} />
                            </button>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>

              {/* Right: Visualization */}
              <div className="flex-1 p-12 md:p-24 relative">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                       <div className="size-20 bg-emerald-100 rounded-[32px] flex items-center justify-center text-emerald-600">
                          <Recycle className="size-10" />
                       </div>
                       <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Total Plastic Avoided</p>
                          <h3 className="text-4xl md:text-6xl font-black tracking-tighter italic">{plasticSaved} <span className="text-xl not-italic text-emerald-500">KG</span></h3>
                          <p className="text-xs font-bold text-zinc-500 italic">Equivalent to ~{(parseFloat(plasticSaved)/0.01).toFixed(0)} plastic bottles.</p>
                       </div>
                    </div>

                    <div className="space-y-8">
                       <div className="size-20 bg-blue-100 rounded-[32px] flex items-center justify-center text-blue-600">
                          <Wind className="size-10" />
                       </div>
                       <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">CO2 Emissions Reduced</p>
                          <h3 className="text-4xl md:text-6xl font-black tracking-tighter italic">{co2Saved} <span className="text-xl not-italic text-blue-500">KG</span></h3>
                          <p className="text-xs font-bold text-zinc-500 italic">Equivalent to planting {(parseFloat(co2Saved)/21).toFixed(1)} trees.</p>
                       </div>
                    </div>
                 </div>

                 <div className="mt-16 p-12 bg-zinc-50 rounded-[48px] border border-black/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                       <div className="size-16 rounded-3xl bg-black text-[#fabf37] flex items-center justify-center">
                          <PieChart className="size-8" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Environment Impact Grade</p>
                          <h4 className="text-2xl font-black uppercase">Tier 1 Sustainability</h4>
                       </div>
                    </div>
                    <button className="bg-black text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-[#fabf37] hover:text-black transition-all flex items-center gap-3">
                       Download Audit Report <ChevronRight className="size-4" />
                    </button>
                 </div>

                 {/* Abstract Decor */}
                 <div className="absolute bottom-10 right-10 opacity-5 pointer-events-none">
                    <Leaf className="size-64 rotate-12" />
                 </div>
              </div>

           </div>
        </div>
      </div>
    </section>
  );
}