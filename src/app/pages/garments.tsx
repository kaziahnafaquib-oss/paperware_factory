import React from "react";
import { motion } from "motion/react";
import { 
  ShoppingBasket, Shirt, Package, CircleCheck, 
  ArrowRight, ShieldCheck, Zap, Layers, Cpu, Box,
  Tag, Sticker, Ticket
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Truck } from "lucide-react";
import { TopSellingProducts } from "../components/TopSellingProducts";
import { SocialMediaFeed } from "../components/SocialMediaFeed";

const products = [
  { name: "Hangtag", desc: "Premium textured clothing tags for apparel.", category: "GARMENTS", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&q=75&w=1600", price: "2.50", icon: Tag },
  { name: "Label", desc: "Woven and printed care labels for garments.", category: "GARMENTS", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&q=75&w=1600", price: "1.20", icon: Ticket },
  { name: "Garment Sticker", desc: "Size and branding stickers for retail.", category: "GARMENTS", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&q=75&w=1600", price: "0.80", icon: Sticker },
];

export function GarmentSuppliesPage({ onProductClick }: { onProductClick: (p: any) => void }) {
  const { t } = useLanguage();

  return (
    <div className="bg-[#fdfaf3] min-h-screen pt-32 pb-24 font-['Poppins',sans-serif]">
      {/* Hero */}
      <section className="container mx-auto px-4 mb-24">
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="size-2 rounded-full bg-[#fabf37]" />
            <span className="text-[#fabf37] font-black uppercase tracking-[0.4em] text-xs">Fashion & Retail Supply</span>
          </motion.div>
          <h1 className="text-[56px] md:text-[90px] font-black uppercase tracking-tighter leading-[0.85] mb-8 text-black">
            Garment <br /> <span className="text-zinc-500">Accessories</span>
          </h1>
          <p className="text-zinc-500 font-bold text-lg max-w-2xl leading-relaxed">
            High-quality accessories for the textile industry. From premium hangtags to bulk industrial labels, we provide the finishing touches for your garments.
          </p>
        </div>
      </section>

      {/* Featured Section */}
      <section className="container mx-auto px-4 mb-32">
        <div className="bg-black p-12 rounded-[60px] space-y-8 hover:shadow-2xl transition-all text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10"><Shirt className="size-32" /></div>
          <div className="size-16 rounded-3xl bg-zinc-800 flex items-center justify-center text-white shadow-xl">
            <Shirt className="size-8" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter italic">Garment Access</h2>
          <p className="text-zinc-500 font-bold leading-relaxed max-w-2xl">Precision accessories for the textile industry. From premium hangtags to bulk industrial labels.</p>
          <ul className="space-y-3">
              <li className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white/40"><CircleCheck className="size-4 text-[#fabf37]" /> Texture Focus</li>
              <li className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white/40"><CircleCheck className="size-4 text-[#fabf37]" /> Eco-Fiber Tags</li>
          </ul>
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-4 mb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <motion.div 
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onProductClick(p)}
              className="group bg-white rounded-[40px] border border-black/5 hover:border-[#fabf37] hover:shadow-2xl transition-all cursor-pointer overflow-hidden"
            >
              <div className="aspect-square overflow-hidden">
                <ImageWithFallback src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                   <div className="size-12 rounded-xl bg-zinc-50 flex items-center justify-center text-black group-hover:bg-black group-hover:text-[#fabf37] transition-all">
                     <p.icon className="size-5" />
                   </div>
                   <span className="text-[8px] font-black uppercase tracking-widest px-3 py-1 bg-zinc-100 rounded-full text-[rgb(0,0,0)]">{p.category}</span>
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-3 text-black">{p.name}</h3>
                <p className="text-zinc-500 font-bold text-xs mb-6 leading-relaxed line-clamp-2">{p.desc}</p>
                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">
                    Buy Now <ArrowRight className="size-4" />
                  </button>
                  <div className="flex items-center gap-1">
                    <Zap className="size-3 text-[#fabf37]" />
                    <span className="text-[8px] font-black text-zinc-400">24H</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <TopSellingProducts onProductClick={onProductClick} />
      <SocialMediaFeed />

      {/* Global Brand Trust */}
      <section className="container mx-auto px-4 mb-32">
        <div className="bg-[#fabf37] rounded-[80px] p-20 flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none"><Truck className="size-64 text-black" /></div>
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">Bulk Retail <br /> Logistics</h2>
            <p className="text-black/60 font-bold text-lg max-w-md">Optimized supply chain for high-volume retail brands. We deliver your seasonal packaging on time, every time.</p>
          </div>
          <div className="lg:w-1/2 flex justify-end">
             <div className="bg-black text-[#fabf37] px-10 py-8 rounded-[40px] space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest">Next-Day Dispatch</p>
                <p className="text-2xl font-black italic">Available Now</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}