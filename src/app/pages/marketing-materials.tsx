import React from "react";
import { motion } from "motion/react";
import { 
  Palette, Share2, Megaphone, CircleCheck as CheckCircle2, 
  ArrowRight, ShieldCheck, Zap, Globe, Sparkles,
  ShoppingBag, BookOpen, FileText, StickyNote, Calendar, Box
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Truck } from "lucide-react";
import { TopSellingProducts } from "../components/TopSellingProducts";
import { SocialMediaFeed } from "../components/SocialMediaFeed";
import imgCalendar from "figma:asset/d56cc7180a46e9766ae8656e08f26915e65b1e08.png";
import imgSticker from "figma:asset/083092191c09807406b3ab9369303938adea8ea5.png";
import imgTissueBox from "figma:asset/942d624f3eeb9f40ef2152028a1d1e2e73a4d226.png";
import imgMagazine from "figma:asset/6918c60927e9f8a4474f86ad7e0b378cadd0b766.png";
import imgFlyer from "figma:asset/996fde50aac464284d2652c5f215d915bf7e1897.png";
import imgBrochure from "figma:asset/aebcf13cb4e5ea06fcb9980128694f52cc69049a.png";
import imgPaperBag from "figma:asset/510221172209f9745471ae8d0b0d125bd25a70f7.png";

const products = [
  { name: "Paper Bag", desc: "Luxury branded carry bags with premium handles.", category: "Packaging", image: imgPaperBag, price: "45.00", icon: ShoppingBag },
  { name: "Brochure / Catalog", desc: "High-finish marketing literature for your brand.", category: "Print", image: imgBrochure, price: "25.00", icon: BookOpen },
  { name: "Premium Magazine", desc: "Executive quality print on demand magazines.", category: "Print", image: imgMagazine, price: "85.00", icon: BookOpen },
  { name: "Flyer & Leaflet", desc: "Bulk promotional prints with sharp clarity.", category: "Print", image: imgFlyer, price: "3.50", icon: FileText },
  { name: "Sticker", desc: "Custom-cut industrial adhesive branding assets.", category: "Branding", image: imgSticker, price: "1.20", icon: StickyNote },
  { name: "Calendar", desc: "Branded corporate desk and wall calendars.", category: "Office", image: imgCalendar, price: "120.00", icon: Calendar },
  { name: "Tissue Box", desc: "Customized promotional facial tissue packaging.", category: "Packaging", image: imgTissueBox, price: "35.00", icon: Box },
];

export function MarketingMaterialsPage({ onProductClick }: { onProductClick: (p: any) => void }) {
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
            <span className="text-[#fabf37] font-black uppercase tracking-[0.4em] text-xs">High-Impact Brand Collateral</span>
          </motion.div>
          <h1 className="text-[56px] md:text-[90px] font-black uppercase tracking-tighter leading-[0.85] mb-8 text-black">
            Marketing <br /> <span className="text-zinc-300">Materials</span>
          </h1>
          <p className="text-zinc-500 font-bold text-lg max-w-2xl leading-relaxed">
            Turn your brand into a tangible experience. Our marketing collateral uses premium finishes, vibrant colors, and eco-friendly materials to leave a lasting impression.
          </p>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="container mx-auto px-4 mb-32">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-black rounded-[60px] p-16 text-white space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform"><Sparkles className="size-48" /></div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none relative z-10">Premium <br /> <span className="text-[#fabf37]">Finishes</span></h2>
            <p className="text-zinc-500 font-bold leading-relaxed relative z-10">Spot UV, Foil Stamping, and Soft-Touch Lamination to make your marketing materials stand out from the noise.</p>
            <div className="flex gap-4 relative z-10">
              <span className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest">UV Spot</span>
              <span className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest">Gold Foil</span>
              <span className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest">Embossing</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
             {[
               { icon: <Globe className="size-8" />, title: "Eco-Ink", desc: "Soy-based sustainable ink." },
               { icon: <Zap className="size-8" />, title: "Rapid Print", desc: "24-hour express options." },
               { icon: <Palette className="size-8" />, title: "Pantone", desc: "100% color accuracy." },
               { icon: <Share2 className="size-8" />, title: "On-Demand", desc: "Small to bulk runs." },
             ].map((item, i) => (
               <div key={i} className="bg-white p-8 rounded-[40px] border border-black/5 flex flex-col items-center text-center space-y-4 hover:border-[#fabf37] transition-all">
                  <div className="text-zinc-300 group-hover:text-[#fabf37] transition-colors">{item.icon}</div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-black">{item.title}</h4>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Product List */}
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
                    Order Now <ArrowRight className="size-4" />
                  </button>
                  <Zap className="size-4 text-[#fabf37]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <TopSellingProducts onProductClick={onProductClick} />
      <SocialMediaFeed />

      {/* Industrial Footer Section */}
      <section className="container mx-auto px-4">
        <div className="bg-[#fabf37] p-20 rounded-[80px] text-center space-y-8 shadow-2xl">
          <Megaphone className="size-20 mx-auto text-black" />
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Broadcast Your <span className="underline">Excellence</span></h2>
          <button className="bg-black text-[#fabf37] px-12 py-6 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all">
            Get A Custom Quote
          </button>
        </div>
      </section>
    </div>
  );
}