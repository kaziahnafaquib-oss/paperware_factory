import React from "react";
import { motion } from "motion/react";
import { Building2, ShoppingBag, Factory, Truck, ShieldCheck, Zap, Globe as Globe2, ArrowRight, Package, Box, Lightbulb, Users } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import imgPaperCups from 'figma:asset/aeed94788eb16edccd466a19c50e38006db16bf5.webp';
import imgColorfulCups from 'figma:asset/6adcf127ea8fcf1105d20bd5049c27d9545b8c86.webp';
import imgPharmaceuticals from 'figma:asset/55b419d02b7ddadaade19007eb86f22b10b4285a.webp';
import yPharmaBoxes from "figma:asset/370cc946765f24fecd2241c5798febf3f636cf5e.webp";

const solutions = [
  {
    id: "food-beverage",
    title: "Food & Beverage",
    icon: <ShoppingBag className="size-10" />,
    description: "Premium biodegradable packaging for the food industry, focusing on temperature retention and moisture resistance.",
    features: ["Oil-resistant coating", "Compostable materials", "Custom branding"],
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&q=80&w=1000"
  },
  {
    id: "pharmaceutical",
    title: "Pharmaceuticals",
    icon: <ShieldCheck className="size-10" />,
    description: "Sterile-grade medical packaging solutions that meet international safety standards and regulatory compliance.",
    features: ["Tamper-evident design", "High-barrier protection"],
    image: yPharmaBoxes
  },
  {
    id: "retail-fmcg",
    title: "Retail & FMCG",
    icon: <Package className="size-10" />,
    description: "Scalable packaging systems for fast-moving consumer goods, optimized for high-speed automated production lines.",
    features: ["Multi-color offset", "Space-efficient design", "Eco-friendly inks"],
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&q=80&w=1000"
  },
  {
    id: "industrial-bulk",
    title: "Industrial Bulk",
    icon: <Factory className="size-10" />,
    description: "Heavy-duty paperware designed for industrial transport and storage, capable of handling high stress and weight.",
    features: ["Double-wall strength", "Moisture barrier", "Stackable geometry"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&q=80&w=1000"
  }
];

export function SolutionsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-black text-white">
        <div className="absolute inset-0 opacity-20">
          <img loading="lazy" decoding="async" 
            src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&q=80&w=1600" 
            className="w-full h-full object-cover grayscale" 
            alt="Industrial Background"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <span className="text-[#fabf37] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
              Global Ecosystem
            </span>
            <h1 className="text-6xl md:text-[100px] font-black uppercase tracking-tighter leading-none mb-8">
              Industrial <br />
              <span className="text-[#fabf37]">Solutions.</span>
            </h1>
            <p className="text-zinc-400 text-xl md:text-2xl font-medium max-w-2xl leading-relaxed">
              Transforming complex supply chain challenges into sustainable, 
              precision-engineered packaging systems for global enterprises.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-32 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {solutions.map((sol, idx) => {
            const paperImages: Record<string, string> = {
              "food-beverage": imgColorfulCups,
              "pharmaceutical": imgPharmaceuticals,
              "retail-fmcg": "https://images.unsplash.com/photo-1705592579405-0d59931c8e00?auto=format&q=80&w=1000",
              "industrial-bulk": "https://images.unsplash.com/photo-1549030927-006822377380?auto=format&q=80&w=1000"
            };

            return (
            <motion.div
              key={sol.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-zinc-50 rounded-[48px] overflow-hidden border border-black/5 hover:bg-black transition-all duration-150"
            >
              <div className="flex flex-col h-full">
                <div className="aspect-[16/9] overflow-hidden">
                  <ImageWithFallback 
                    src={paperImages[sol.id] || sol.image} 
                    alt={sol.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" 
                  />
                </div>
                <div className="p-12 flex flex-col flex-1">
                  <div className="text-[#fabf37] mb-8 transition-transform duration-500 group-hover:scale-110 origin-left">
                    {sol.icon}
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter mb-4 text-black group-hover:text-white transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-zinc-500 font-medium leading-relaxed mb-8 group-hover:text-zinc-400 transition-colors">
                    {sol.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-12">
                    {sol.features.map((f) => (
                      <span key={f} className="px-4 py-2 rounded-full bg-white border border-black/5 text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:bg-zinc-800 group-hover:border-white/10 group-hover:text-white transition-all">
                        {f}
                      </span>
                    ))}
                  </div>
                  <button className="mt-auto flex items-center gap-4 text-black font-black uppercase tracking-widest text-xs group-hover:text-[#fabf37] transition-colors">
                    Explore Integration <ArrowRight className="size-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )})}
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-32 bg-[#fabf37]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-black font-black uppercase tracking-[0.4em] text-[10px]">
                  Our Approach
                </span>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                  How We <br /> 
                  Work.
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { icon: <Lightbulb />, title: "Discovery", desc: "Deep analysis of your supply chain and logistics constraints." },
                  { icon: <Box />, title: "Prototyping", desc: "Rapid 3D modeling and physical testing of sustainable materials." },
                  { icon: <Zap />, title: "Optimization", desc: "Fine-tuning for high-speed automated production lines." },
                  { icon: <Users />, title: "Deployment", desc: "Full-scale manufacturing with just-in-time delivery." }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="size-12 bg-black text-[#fabf37] rounded-2xl flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-black uppercase tracking-tighter">{item.title}</h4>
                    <p className="text-black/60 font-medium text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[60px] overflow-hidden bg-black rotate-3">
                <img loading="lazy" decoding="async" 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&q=80&w=1000" 
                  className="w-full h-full object-cover opacity-60 grayscale" 
                  alt="Process" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-6xl md:text-[100px] font-black uppercase tracking-tighter leading-none mb-12 text-black">
            Ready to <span className="text-black italic">Integrate?</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="px-12 py-6 bg-black text-[#fabf37] rounded-full text-sm font-black uppercase tracking-widest hover:scale-105 transition-transform">
              Initiate RFQ Sequence
            </button>
            <button className="px-12 py-6 border-2 border-black text-black rounded-full text-sm font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
              Consult With Engineering
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}