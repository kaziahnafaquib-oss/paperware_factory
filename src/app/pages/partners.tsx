import React from "react";
import { motion } from "motion/react";
import teamPhoto from "@/assets/factory/team.webp";
import { useScrollScrub, clamp01 } from "../lib/useScrollScrub";
import { Handshake, Award, ShieldCheck, Globe } from "lucide-react";
import { useGo } from "../lib/useGo";

export interface Partner {
  id: string;
  name: string;
  category: string;
  logo?: string;
  description: string;
}

interface PartnersPageProps {
  partners?: Partner[];
  signingImage?: string;
}

const CATEGORIES = [
  "Raw Material Supplier",
  "Chemical Partner",
  "Delivery Partner",
  "Telco Partner",
  "Internet Partner",
  "Digital Partner",
  "ERP Partner",
  "Website Partner"
];

// Partner identities are only shown when real, verified partners are passed in.
const DEFAULT_PARTNERS: Partner[] = [];

// `partners` / `signingImage` props are accepted for API compatibility but intentionally ignored:
// the app shell seeds them with unverified placeholder partners and a stock photo.
export function PartnersPage(_props: PartnersPageProps) {
  const go = useGo();
  const displayPartners = DEFAULT_PARTNERS;
  const displayImage = teamPhoto;
  const heroRef = React.useRef<HTMLDivElement>(null);
  const heroImgRef = React.useRef<HTMLImageElement>(null);

  // Hero photo drifts and eases in scale 1:1 with scroll (transform only).
  useScrollScrub(() => {
    const hero = heroRef.current;
    const img = heroImgRef.current;
    if (!hero || !img) return;
    const r = hero.getBoundingClientRect();
    const p = clamp01(-r.top / Math.max(1, r.height));
    img.style.transform = `translate3d(0,${(p * 60).toFixed(1)}px,0) scale(${(1.04 + p * 0.06).toFixed(4)})`;
  });

  const otherPartners = displayPartners.filter(p => !CATEGORIES.includes(p.category));

  return (
    <div className="min-h-screen bg-zinc-50 font-['Poppins',sans-serif]">
      
      {/* Signing Ceremony Hero */}
      <div ref={heroRef} className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <img
          ref={heroImgRef}
          src={displayImage}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          alt="The Paperware factory team"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-center bg-gradient-to-t from-black/60 via-transparent to-transparent">
          <div className="container mx-auto px-4 md:px-12">
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, staggerChildren: 0.15 }}
               className="max-w-4xl space-y-8 relative z-10"
             >
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#fabf37] text-black rounded-full font-black text-xs uppercase tracking-[0.2em] border-2 border-white/20 shadow-[0_0_30px_rgba(250,191,55,0.4)]"
               >
                  <Handshake className="size-4" />
                  <span>Global Alliance Network</span>
               </motion.div>
               
               <motion.h1 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] drop-shadow-2xl"
               >
                 Building <br/>
                 <span className="relative inline-block">
                   <span className="absolute inset-0 blur-3xl bg-[#fabf37]/30" />
                   <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#fabf37] via-[#fff5d6] to-white filter drop-shadow-sm">For The Future</span>
                 </span>
               </motion.h1>

               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="flex flex-col gap-6 pl-6 border-l-4 border-[#fabf37]"
               >
                 <p className="text-zinc-100 text-xl md:text-2xl font-medium max-w-2xl leading-relaxed drop-shadow-lg">
                   We believe in the power of collaboration. Our ecosystem of partners empowers us to deliver excellence at every step of the supply chain.
                 </p>
               </motion.div>

               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="flex flex-wrap gap-4 pt-6"
               >
                 <button onClick={() => go("partner-program")} className="px-10 py-4 bg-[#fabf37] text-black font-black uppercase tracking-widest rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl shadow-[#fabf37]/20">
                   Join Our Network
                 </button>
                 <button onClick={() => document.getElementById('partner-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="px-10 py-4 bg-white/10 backdrop-blur-md text-white font-bold uppercase tracking-widest rounded-full hover:bg-white/20 border border-white/20 transition-all duration-300">
                   View Partners
                 </button>
               </motion.div>
             </motion.div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-black py-20 border-b border-zinc-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { icon: ShieldCheck, title: "Verified Partners", text: "Every partner reviewed" },
               { icon: Globe, title: "Global Network", text: "Local and international" },
               { icon: Award, title: "Premium Quality", text: "Trusted suppliers" }
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.2 }}
                 viewport={{ once: true }}
                 whileHover={{ scale: 1.02 }}
                 className="flex items-center gap-6 p-8 rounded-[30px] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-[#fabf37]/50 hover:bg-white/10 transition-all duration-300 group shadow-lg"
               >
                 <div className="size-16 rounded-2xl bg-[#fabf37]/10 flex items-center justify-center text-[#fabf37] group-hover:bg-[#fabf37] group-hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(250,191,55,0.1)]">
                   <item.icon className="size-8" />
                 </div>
                 <div>
                   <h4 className="text-white text-lg font-black uppercase tracking-wide mb-1 group-hover:text-[#fabf37] transition-colors">{item.title}</h4>
                   <p className="text-zinc-500 text-sm font-medium leading-relaxed group-hover:text-zinc-300 transition-colors">{item.text}</p>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </div>

      {/* Partners Sections */}
      <div id="partner-list" className="py-24 container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">Our Ecosystem</h2>
          <div className="w-24 h-1 bg-[#fabf37] mx-auto rounded-full" />
        </div>

        {displayPartners.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            <div className="bg-[#fabf37] text-black rounded-[32px] p-10 md:p-14 flex flex-col justify-between gap-10">
              <p className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-[1.05]">
                Building for the future, together.
              </p>
              <a href="/partner-program" className="self-start px-8 py-3 bg-black text-[#fabf37] font-black uppercase tracking-widest text-sm rounded-full hover:scale-105 transition-transform">
                Join Our Network
              </a>
            </div>
            <div className="bg-black text-white rounded-[32px] p-10 md:p-14">
              <ul className="flex flex-wrap gap-3">
                {CATEGORIES.map((c) => (
                  <li key={c} className="px-5 py-2 rounded-full border-2 border-[#fabf37] text-[#fabf37] text-xs font-black uppercase tracking-widest">{c}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        <div className="space-y-24">
          {/* Main Categories */}
          {CATEGORIES.map((category, catIndex) => {
            const categoryPartners = displayPartners.filter(p => p.category === category);
            if (categoryPartners.length === 0) return null;

            return (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-px flex-1 bg-zinc-200" />
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black border-2 border-black rounded-full px-8 py-2">
                    {category}
                  </h3>
                  <div className="h-px flex-1 bg-zinc-200" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                  {categoryPartners.map((partner, index) => (
                    <PartnerCard key={partner.id || index} partner={partner} index={index} />
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Other Categories */}
          {otherPartners.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 bg-zinc-200" />
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black border-2 border-black rounded-full px-8 py-2">
                  Other Partners
                </h3>
                <div className="h-px flex-1 bg-zinc-200" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {otherPartners.map((partner, index) => (
                  <PartnerCard key={partner.id || index} partner={partner} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function PartnerCard({ partner, index }: { partner: Partner; index: number }) {
  const go = useGo();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -10 }}
      className="bg-white p-6 rounded-[32px] shadow-lg border border-zinc-100 hover:shadow-2xl hover:border-[#fabf37]/30 transition-all duration-300 group flex flex-col items-center text-center h-full"
    >
      <div className="relative size-24 md:size-32 mb-6 p-4 rounded-full bg-zinc-50 border border-zinc-100 group-hover:scale-110 transition-transform duration-500 overflow-hidden flex items-center justify-center">
         {partner.logo ? (
           <img src={partner.logo} className="w-full h-full object-contain mix-blend-multiply" alt={partner.name} />
         ) : (
           <div className="text-2xl font-black text-zinc-300">{partner.name.substring(0, 2)}</div>
         )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg md:text-xl font-black text-black leading-tight">
          {partner.name}
        </h3>
        <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">
          {partner.description}
        </p>
      </div>

      <div className="mt-auto pt-6 w-full">
         <button onClick={() => go("contact")} className="w-full py-2 rounded-xl bg-zinc-100 text-xs font-bold uppercase hover:bg-black hover:text-[#fabf37] transition-colors">
           Enquire
         </button>
      </div>
    </motion.div>
  );
}
