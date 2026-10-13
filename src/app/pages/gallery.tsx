import React from "react";
import { motion } from "motion/react";
import { Maximize2 } from "lucide-react";

const galleryImages = [
  { url: "https://images.unsplash.com/photo-1517254456976-ee8682099819?auto=format&q=80&w=800", title: "Custom Coffee Cups", client: "Dhana Brew" },
  { url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&q=80&w=800", title: "Eco Shopping Bags", client: "Green Style" },
  { url: "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?auto=format&q=80&w=800", title: "Food Packaging", client: "Tasty Eats" },
  { url: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&q=80&w=800", title: "Branded Carry Bags", client: "Fashion Hub" },
  { url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&q=80&w=800", title: "Medical Boxes", client: "Pharma Care" },
  { url: "https://images.unsplash.com/photo-1649191629386-d828988cc053?auto=format&q=80&w=800", title: "Ripple Cups", client: "Hot Sip" },
];

export function GalleryPage() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-['Poppins',sans-serif]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-24 space-y-4">
          <span className="text-[#fabf37] font-black uppercase tracking-[0.4em] text-xs">Showcase</span>
          <h1 className="text-[52px] font-black uppercase tracking-tight leading-none text-black">
            Our Work <br /> Portfolio
          </h1>
          <p className="text-zinc-400 font-bold max-w-xl mx-auto pt-4">
            Take a look at some of the custom packaging solutions we've delivered to our prestigious clients across Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[450px] rounded-[40px] overflow-hidden bg-zinc-100 shadow-xl"
            >
              <img loading="lazy" decoding="async" 
                src={item.url} 
                alt={item.title}
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-[#fabf37] font-black uppercase tracking-[0.2em] text-[10px]">{item.client}</p>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-6">{item.title}</h3>
                <span aria-hidden="true" className="size-14 rounded-2xl bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#fabf37] hover:text-black transition-colors">
                  <Maximize2 className="size-6" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}