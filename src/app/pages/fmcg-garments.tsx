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
import yProductBoxes from "figma:asset/55b419d02b7ddadaade19007eb86f22b10b4285a.webp";
import pConfectioneryBoxes from "figma:asset/products/confectionery-boxes.webp";
import pCookieBoxes from "figma:asset/products/cookie-boxes.webp";
import pTissueBoxFloral from "figma:asset/products/tissue-box-floral.webp";
import pTissueBoxes from "figma:asset/products/tissue-boxes.webp";

const products = [
  { name: "Food & Beverage Packaging", desc: "Moisture-locked boxes for snacks and drinks.", category: "FMCG", image: pCookieBoxes, price: "12.50", icon: Package },
  { name: "Personal Care", desc: "Luxury aesthetic packaging for cosmetics.", category: "FMCG", image: pTissueBoxes, price: "45.00", icon: Box },
  { name: "Product Packaging", desc: "Generic to custom high-run product boxes.", category: "FMCG", image: yProductBoxes, price: "18.00", icon: Box },
  { name: "Home Care Packaging", desc: "Durable boxes for cleaning and home supplies.", category: "FMCG", image: pTissueBoxFloral, price: "22.00", icon: Package },
  { name: "Confectionary Goods", desc: "Decorative and food-safe chocolate/sweet boxes.", category: "FMCG", image: pConfectioneryBoxes, price: "35.00", icon: Package },
];

export function FMCGSuppliesPage({ onProductClick }: { onProductClick: (p: any) => void }) {
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
            <span className="text-[#fabf37] font-black uppercase tracking-[0.4em] text-xs">Retail Supply</span>
          </motion.div>
          <h1 className="text-[56px] md:text-[90px] font-black uppercase tracking-tighter leading-[0.85] mb-8 text-black">
            FMCG <br /> <span className="text-zinc-500">Supplies</span>
          </h1>
          <p className="text-zinc-500 font-bold text-lg max-w-2xl leading-relaxed">
            High-volume retail packaging for the world's leading consumer brands. We combine durability with high-end aesthetics to drive shelf impact.
          </p>
        </div>
      </section>

      {/* Featured Section */}
      <section className="container mx-auto px-4 mb-32">
        <div className="bg-white p-12 rounded-[60px] border border-black/5 space-y-8 hover:shadow-2xl transition-all">
          <div className="size-16 rounded-3xl bg-[#fabf37] flex items-center justify-center text-black shadow-xl">
            <ShoppingBasket className="size-8" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter italic text-black">FMCG Sector</h2>
          <p className="text-zinc-500 font-bold leading-relaxed max-w-2xl">Focusing on high-run efficiency, moisture barriers, and vibrant color reproduction for consumer shelf dominance.</p>
          <ul className="space-y-3">
              <li className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-black/40"><CircleCheck className="size-4 text-[#fabf37]" /> Moisture Lock</li>
              <li className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-black/40"><CircleCheck className="size-4 text-[#fabf37]" /> High Speed Die-Cut</li>
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