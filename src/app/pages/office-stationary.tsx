import React from "react";
import { motion } from "motion/react";
import { 
  Notebook, Mail, FolderOpen, FileText, Contact, 
  ArrowRight, ShieldCheck, Zap, Layers, Cpu, Box, 
  CircleCheck, Truck, ShoppingBag, Clock, Heart, Sparkles, Filter, Activity
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { TopSellingProducts } from "../components/TopSellingProducts";
import { SocialMediaFeed } from "../components/SocialMediaFeed";
import yStationery from "figma:asset/996fde50aac464284d2652c5f215d915bf7e1897.webp";
import yBrochures from "figma:asset/aebcf13cb4e5ea06fcb9980128694f52cc69049a.webp";

const products = [
  { name: "Business Card", desc: "Premium textured cardstock with UV spot finish.", category: "Print", image: yStationery, icon: Contact },
  { name: "Envelope", desc: "Custom sized professional mailing solutions.", category: "Mailing", image: "https://images.unsplash.com/photo-1735050871569-4cb29aae3a30?auto=format&fit=crop&q=80&w=800", icon: Mail },
  { name: "Invoice Pad", desc: "Duplicate/Triplicate carbonless NCR pads.", category: "Finance", image: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&q=75&w=1600", icon: FileText },
  { name: "Letterhead Pad", desc: "Executive 100GSM watermarked paper.", category: "Branding", image: yBrochures, icon: FileText },
  { name: "Money Receipt", desc: "Secure serialized financial documentation.", category: "Finance", image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&q=75&w=1600", icon: FileText },
  { name: "Delivery Note", desc: "Industrial strength logbooks for logistics.", category: "Logistics", image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&q=75&w=1600", icon: Truck },
  { name: "Note Book", desc: "Custom branded corporate notebooks.", category: "Office", image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&q=75&w=1600", icon: Notebook },
  { name: "Diary", desc: "Annual premium planners and organizers.", category: "Office", image: "https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&q=75&w=1600", icon: Notebook },
  { name: "File Folder", desc: "Heavy-duty laminated organizational folders.", category: "Organization", image: "https://images.unsplash.com/photo-1595844730298-b960ff98fee0?auto=format&q=75&w=1600", icon: FolderOpen },
];

export function OfficeStationaryPage({ onProductClick }: { onProductClick: (p: any) => void }) {
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
            <span className="text-[#fabf37] font-black uppercase tracking-[0.4em] text-xs">Premium Corporate Assets</span>
          </motion.div>
          <h1 className="text-[56px] md:text-[90px] font-black uppercase tracking-tighter leading-[0.85] mb-8 text-black">
            Office <br /> <span className="text-zinc-500">Stationary</span>
          </h1>
          <p className="text-zinc-500 font-bold text-lg max-w-2xl leading-relaxed">
            Elevate your corporate identity with our high-precision printed stationary. From business cards to industrial logbooks, we ensure every detail reflects your brand's excellence.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Paper Weight", value: "80-350 GSM" },
            { label: "Print Tech", value: "Offset / Digital" },
            { label: "Finishing", value: "Matte / Gloss / Spot UV" },
            { label: "Daily Output", value: "250K+ Units" },
          ].map((stat, i) => (
            <div key={i} className="p-8 bg-white border border-black/5 rounded-[32px] shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">{stat.label}</p>
              <p className="text-2xl font-black text-black">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-4 mb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p, i) => (
            <motion.div 
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onProductClick(p)}
              className="group bg-white rounded-[48px] border border-black/5 hover:border-[#fabf37] hover:shadow-2xl transition-all overflow-hidden cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <ImageWithFallback 
                  src={p.image} 
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full">
                  <span className="text-[10px] font-black text-[#fabf37] uppercase tracking-widest">In Stock</span>
                </div>
              </div>
              <div className="p-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="size-12 rounded-xl bg-zinc-50 flex items-center justify-center text-black group-hover:bg-black group-hover:text-[#fabf37] transition-all">
                    <p.icon className="size-5" />
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest px-3 py-1 bg-zinc-100 rounded-full text-[rgb(0,0,0)]">{p.category}</span>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-black">{p.name}</h3>
                <p className="text-zinc-500 font-bold text-sm mb-8 leading-relaxed">{p.desc}</p>
                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">
                    Request Specs <ArrowRight className="size-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    <Zap className="size-4 text-[#fabf37]" />
                    <span className="text-[9px] font-black uppercase text-zinc-400">Ships in 24h</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <TopSellingProducts onProductClick={onProductClick} />
      <SocialMediaFeed />

      {/* Fast Delivery Banner */}
      <section className="container mx-auto px-4 mb-32">
        <div className="bg-[#fabf37] rounded-[60px] p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <Truck className="size-64 text-black" />
          </div>
          <div className="lg:w-1/2 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 bg-black text-[#fabf37] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
              <Zap className="size-3" /> Turbo Logistics
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">
              Same Day <br /> Production
            </h2>
            <p className="text-black/60 font-bold text-lg leading-relaxed max-w-md">
              We understand the pace of business. Our automated production lines are optimized for extreme speed without compromising on precision.
            </p>
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end relative z-10">
            <div className="bg-black text-[#fabf37] p-10 rounded-[40px] shadow-2xl space-y-4 max-w-sm">
              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-50">Logistics Hub Status</p>
              <div className="flex items-center gap-4">
                <div className="size-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xl font-black italic uppercase">Express Active</span>
              </div>
              <p className="text-[10px] font-bold text-zinc-500">Global shipping network operating at 100% capacity. Average dispatch: 14 hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Section */}
      <section className="bg-black py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fabf37 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white italic">
              Industrial <span className="text-[#fabf37]">Precision</span> Printing
            </h2>
            <p className="text-zinc-500 font-bold leading-relaxed max-w-lg">
              Our Heidelberg offset presses and Xerox digital units provide color-accurate results that meet international branding standards.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-white/70 font-bold text-sm">
                <CircleCheck className="size-5 text-[#fabf37]" /> CMYK Accurate
              </div>
              <div className="flex items-center gap-3 text-white/70 font-bold text-sm">
                <CircleCheck className="size-5 text-[#fabf37]" /> Bulk Serialization
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-6">
            <div className="aspect-square bg-zinc-900 rounded-[40px] border border-white/5 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <ShieldCheck className="size-12 text-[#fabf37]" />
              <p className="text-white font-black uppercase tracking-widest text-[10px]">Quality Control</p>
            </div>
            <div className="aspect-square bg-[#fabf37] rounded-[40px] flex flex-col items-center justify-center p-8 text-center space-y-4">
              <Zap className="size-12 text-black" />
              <p className="text-black font-black uppercase tracking-widest text-[10px]">Rapid Turnaround</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-32 text-center">
        <div className="max-w-2xl mx-auto space-y-12">
          <h2 className="text-[40px] md:text-[60px] font-black uppercase tracking-tighter text-black">Ready to <span className="text-[#fabf37]">Modernize</span>?</h2>
          <button className="bg-black text-[#fabf37] px-12 py-6 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
            Download Catalog
          </button>
        </div>
      </section>
    </div>
  );
}