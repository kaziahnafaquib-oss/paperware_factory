import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Box, Layers, ShieldCheck, Zap, ArrowRight, Expand, RefreshCw, Smartphone, Package, Info, CircleCheck, Factory } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { openWhatsAppInquiry } from "../lib/inquiry";
// Phase A0: replaced an unsafe stock photo (a gun silhouette) with a real packaging render from the project assets.
import imgPrintedBoxes from "figma:asset/370cc946765f24fecd2241c5798febf3f636cf5e.png";

export function Catalog3DPage() {
  const { t, isRTL } = useLanguage();
  const [selectedProduct, setSelectedProduct] = React.useState(0);
  const [rotation, setRotation] = React.useState(0);

  const products = [
    {
      id: "PW-001",
      name: "Premium Matte Box",
      description: "Recycled kraft paper with premium matte finish for luxury retail.",
      specs: ["Custom Printing", "Custom Embossing", "Reinforced Base"],
      image: imgPrintedBoxes,
      colors: ["#2D2D2D", "#F5F5F5", "#D4A373"],
      rating: 4.9
    },
    {
      id: "PW-002",
      name: "Industrial Shipping Carton",
      description: "Triple-walled corrugated cardboard for heavy-duty global shipping.",
      specs: ["300kg Crush Test", "Water-resistant Layer", "Stackable Design"],
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      colors: ["#78350F", "#451A03"],
      rating: 4.8
    },
    {
      id: "PW-003",
      name: "Eco-Coffee Carrier",
      description: "Multi-cup high-grip carriers made from molded pulp fibers.",
      specs: ["Spill-proof Geometry", "100% Pulp", "Space Saving"],
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      colors: ["#D1D5DB", "#9CA3AF"],
      rating: 5.0
    }
  ];

  return (
    <div className={`min-h-screen bg-black text-white pt-32 pb-20 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-[#fabf37]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#fabf37]">Product Showroom v4.0</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              360° <span className="text-zinc-600">Product</span> <br /> <span className="text-[#fabf37]">Preview</span>
            </h1>
          </div>
          <div className="max-w-xs text-right hidden md:block">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
              Browse sample packaging formats and ask us for physical samples.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-6 px-4">Catalog Selection</p>
            {products.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setSelectedProduct(idx)}
                className={`w-full text-left p-6 rounded-3xl transition-all border ${
                  selectedProduct === idx 
                  ? 'bg-[#fabf37] border-[#fabf37] text-black shadow-[0_20px_40px_-10px_rgba(250,191,55,0.3)]' 
                  : 'bg-zinc-900 border-white/5 text-zinc-400 hover:border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-black tracking-widest uppercase opacity-60">{p.id}</span>
                  {selectedProduct === idx && <CircleCheck className="size-4" />}
                </div>
                <h3 className="font-black text-lg uppercase leading-tight">{p.name}</h3>
              </button>
            ))}
            
          </div>

          {/* 360 Viewer Area */}
          <div className="lg:col-span-6 relative aspect-square bg-zinc-900 rounded-[60px] border border-white/5 flex items-center justify-center overflow-hidden group">
            {/* Background Decorations */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(250,191,55,0.05),transparent_70%)]" />
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Simulated 3D Image */}
            <motion.div 
              key={selectedProduct}
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: rotation }}
              transition={{ type: "spring", stiffness: 100 }}
              className="relative z-10 w-4/5 h-4/5 cursor-grab active:cursor-grabbing"
              onPan={(e, info) => setRotation(prev => prev + info.delta.x * 0.5)}
            >
              <ImageWithFallback 
                src={products[selectedProduct].image}
                alt={products[selectedProduct].name}
                className="w-full h-full object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)]"
              />
            </motion.div>

            {/* Interaction UI */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/40 backdrop-blur-xl p-2 rounded-full border border-white/10">
              <button onClick={() => setRotation(prev => prev - 45)} className="p-3 hover:bg-white/10 rounded-full transition-colors">
                <RefreshCw className="size-5 text-zinc-400" />
              </button>
              <div className="h-4 w-px bg-white/10" />
              <button className="px-6 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-white">360 Mode</button>
              <div className="h-4 w-px bg-white/10" />
              <button onClick={() => setRotation(prev => prev + 45)} className="p-3 hover:bg-white/10 rounded-full transition-colors">
                <Expand className="size-5 text-zinc-400" />
              </button>
            </div>

          </div>

          {/* Details Sidebar */}
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black uppercase tracking-tighter">{products[selectedProduct].name}</h2>
                <div className="px-3 py-1 bg-[#fabf37] text-black text-[9px] font-black rounded-full">New</div>
              </div>
              <p className="text-sm font-bold text-zinc-400 leading-relaxed">
                {products[selectedProduct].description}
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Technical Specs</p>
              <div className="space-y-3">
                {products[selectedProduct].specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-zinc-900/50 rounded-2xl border border-white/5">
                    <Layers className="size-4 text-[#fabf37]" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 space-y-6">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Pricing</p>
                  <p className="text-xl font-black">On request</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-zinc-400">Made in Dhaka</p>
                </div>
              </div>
              <button type="button" onClick={() => openWhatsAppInquiry("Sample request", { Product: products[selectedProduct].name })} className="w-full py-6 bg-[#fabf37] text-black rounded-3xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-[0_20px_40px_-10px_rgba(250,191,55,0.4)]">
                Request Samples <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Industrial Footer Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-white/5">
          {[
            { label: "Durability", value: "A++", icon: ShieldCheck },
            { label: "Eco-Rating", value: "100%", icon: Zap },
            { label: "Global Ships", value: "24h", icon: Factory },
            { label: "Certifications", value: "ISO", icon: Info }
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center gap-2 text-zinc-600">
                <stat.icon className="size-3" />
                <span className="text-[9px] font-black uppercase tracking-widest">{stat.label}</span>
              </div>
              <p className="text-2xl font-black italic text-[#fabf37]">{stat.value}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}