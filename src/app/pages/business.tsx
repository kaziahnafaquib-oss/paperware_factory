import React from "react";
import { motion, useScroll, useTransform, useMotionValue, animate } from "motion/react";
import { 
  ChartBar, ShieldCheck, Globe, Zap, Cpu, Layers, 
  Target, Rocket, Network, FileText, Database, 
  Settings, Briefcase, TrendingUp, Handshake, 
  LayoutGrid, Share2, Terminal, Monitor, 
  Lock, ArrowRight, CircleCheck, Factory, 
  Boxes, Truck, Building2
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const HUDDecor = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#fabf37] to-transparent" />
    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#fabf37] to-transparent" />
    <div className="absolute top-1/2 left-0 w-full h-px bg-black/5" />
    <div className="absolute top-0 left-1/4 w-px h-full bg-black/5" />
    <div className="absolute top-0 right-1/4 w-px h-full bg-black/5" />
    
    <div className="absolute top-10 left-10 text-[8px] font-mono text-black/40">
      SYSTEM_ID: PW-BX-2025<br />
      LAT: 23.8103° N<br />
      LONG: 90.4125° E
    </div>
    <div className="absolute bottom-10 right-10 text-[8px] font-mono text-black/40 text-right">
      ENCRYPTION: AES-256<br />
      SYNC_STATUS: OPTIMAL<br />
      NODES: 46_ACTIVE
    </div>
  </div>
);

const BusinessMetric = ({ label, value, trend }: { label: string; value: string; trend: string }) => (
  <div className="p-6 bg-white/40 backdrop-blur-xl border border-black/5 rounded-3xl relative group overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-[#fabf37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10">
      <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">{label}</div>
      <div className="text-3xl font-black text-black tracking-tighter mb-1">{value}</div>
      <div className="text-[10px] font-bold text-green-500 flex items-center gap-1 uppercase tracking-wider">
        <TrendingUp className="size-3" /> {trend}
      </div>
    </div>
  </div>
);

const ServiceCard = ({ icon: Icon, title, desc, tags }: { icon: any; title: string; desc: string; tags: string[] }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-10 bg-white border border-black/5 rounded-[48px] shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
  >
    <div className="absolute -top-24 -right-24 size-48 bg-[#fabf37]/5 rounded-full blur-3xl group-hover:bg-[#fabf37]/10 transition-colors" />
    <div className="relative z-10 space-y-6">
      <div className="size-14 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-black group-hover:text-[#fabf37] transition-all duration-500">
        <Icon className="size-7" />
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-black text-black uppercase tracking-tighter leading-none">{title}</h3>
        <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
      </div>
      <div className="flex flex-wrap gap-2 pt-4">
        {tags.map((tag, i) => (
          <span key={i} className="text-[9px] font-black text-zinc-400 uppercase tracking-widest px-3 py-1 rounded-full bg-zinc-50 border border-black/5">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

export function BusinessPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-['Poppins',sans-serif] overflow-hidden">
      {/* HUD Background Layer */}
      <HUDDecor />

      {/* Page Header Spacer */}
      <div className="h-28" />

      {/* 1. HERO SECTION - FACTORY ORIENTED */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-black/5 shadow-sm">
              <div className="size-2 bg-[#fabf37] rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-black/60 uppercase tracking-[0.4em]">Industrial Command v4.0</span>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-black text-black tracking-tighter uppercase leading-[0.85]">
              Factory<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-zinc-800 to-black">Powerhouse</span>
            </h1>
            
            <p className="text-zinc-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
              Paperware is a massive manufacturing node, integrating high-speed production lines with industrial precision. We don't just build products; we engineer supply chains.
            </p>

            <div className="flex flex-wrap justify-center gap-6 pt-8">
              <button className="px-12 py-6 bg-black text-white rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#fabf37] hover:text-black transition-all shadow-2xl">
                Technical Consultation
              </button>
              <button className="px-12 py-6 bg-white border border-black/10 text-black rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-zinc-50 transition-all">
                Factory Tour (Virtual)
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. MANUFACTURING CAPABILITIES */}
      <section className="py-32 px-4 bg-zinc-50/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-black text-black uppercase tracking-tighter leading-none">Manufacturing<br />Capabilities</h2>
              <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em]">Industrial Grade / Precision Engineered</p>
            </div>
            <div className="text-[11px] font-bold text-zinc-500 max-w-sm leading-relaxed border-l-2 border-[#fabf37] pl-6">
              Our factory operates with high-speed automated machinery from Germany and South Korea, ensuring zero-defect manufacturing at scale.
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative group">
               <div className="absolute inset-0 rounded-[48px] overflow-hidden opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                  <ImageWithFallback src="https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&q=80&w=1200" alt="Mass Production" className="size-full object-cover" />
               </div>
               <ServiceCard 
                 icon={Factory}
                 title="Mass Production"
                 desc="High-speed continuous lines for volume orders. Designed for maximum throughput and minimum lead times."
                 tags={["High-Speed", "Custom Print"]}
               />
            </div>
            <div className="relative group">
               <div className="absolute inset-0 rounded-[48px] overflow-hidden opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                  <ImageWithFallback src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200" alt="Precision" className="size-full object-cover" />
               </div>
               <ServiceCard 
                 icon={Settings}
                 title="Precision Tooling"
                 desc="Custom dies and molds developed in-house for unique packaging shapes and technical specifications."
                 tags={["Custom Molds", "CAD Integration", "Prototyping"]}
               />
            </div>
            <div className="relative group">
               <div className="absolute inset-0 rounded-[48px] overflow-hidden opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                  <ImageWithFallback src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=1200" alt="Automation" className="size-full object-cover" />
               </div>
               <ServiceCard 
                 icon={Cpu}
                 title="Automated Quality"
                 desc="Production is checked against structural and visual specs."
                 tags={["Quality Checks", "Low Waste"]}
               />
            </div>
          </div>
        </div>
      </section>

      {/* 3. BUSINESS ECOSYSTEM BANNERS (Franchise, Investor, Partners) */}
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-6xl space-y-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-black uppercase tracking-tighter">Business Ecosystem</h2>
            <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Scale with the Paperware Node</p>
          </div>

          <div className="grid gap-8">
            {/* Franchise Banner */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="relative h-[350px] rounded-[64px] overflow-hidden border border-black/5 group cursor-pointer"
            >
              <ImageWithFallback src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200" alt="Franchise" className="size-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 p-12 flex flex-col justify-center max-w-xl text-white">
                <div className="text-[10px] font-black text-[#fabf37] uppercase tracking-[0.4em] mb-4">Expansion Protocol</div>
                <h3 className="text-5xl font-black uppercase tracking-tighter mb-4">Franchise<br />Opportunities</h3>
                <p className="text-white/60 mb-8 font-medium">Own a piece of the manufacturing revolution. Deploy a localized Paperware node in your region.</p>
                <button className="w-fit px-8 py-4 bg-[#fabf37] text-black rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all">
                  Launch Franchise Page
                </button>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
               {/* Investor Banner */}
               <motion.div 
                whileHover={{ scale: 1.01 }}
                className="relative h-[450px] rounded-[64px] overflow-hidden border border-black/5 group cursor-pointer"
              >
                <ImageWithFallback src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1200" alt="Investor" className="size-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
                <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
                  <div className="text-[10px] font-black text-[#fabf37] uppercase tracking-[0.4em] mb-4">Capital Growth</div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">Investor<br />Relations</h3>
                  <p className="text-white/60 mb-8 font-medium text-sm">Join us in financing the future of sustainable industrial manufacturing.</p>
                  <button className="w-fit px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#fabf37] hover:text-black transition-all">
                    Investor Portal
                  </button>
                </div>
              </motion.div>

              {/* Partner Banner */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="relative h-[450px] rounded-[64px] overflow-hidden border border-black/5 group cursor-pointer"
              >
                <ImageWithFallback src="https://images.unsplash.com/photo-1758599543152-a73184816eba?auto=format&fit=crop&q=80&w=1200" alt="Partners" className="size-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
                <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
                  <div className="text-[10px] font-black text-[#fabf37] uppercase tracking-[0.4em] mb-4">Global Network</div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">Partner<br />Program</h3>
                  <p className="text-white/60 mb-8 font-medium text-sm">Strategic alliances for logistics, raw materials, and digital infrastructure.</p>
                  <button className="w-fit px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#fabf37] hover:text-black transition-all">
                    Partner Network
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* 5. MULTI-LANGUAGE HUB */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full opacity-5 pointer-events-none">
          <div className="flex flex-wrap gap-8 justify-center text-8xl font-black text-black">
            <span>ENG</span><span>SPA</span><span>FRA</span><span>ARA</span><span>BEN</span><span>ZHO</span><span>JPN</span><span>KOR</span><span>RUS</span>
          </div>
        </div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="space-y-10">
             <div className="size-20 bg-white rounded-3xl border border-black/5 shadow-xl mx-auto flex items-center justify-center">
                <Globe className="size-10 text-[#fabf37]" />
             </div>
             <h2 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter leading-none">
                Localized Everywhere.<br />
                <span className="text-zinc-500">Many Languages.</span>
              </h2>
              <p className="text-zinc-500 font-medium leading-relaxed max-w-2xl mx-auto">
                Our business interface adapts instantly to your region's language and regulatory requirements. Managing global supply chains has never been this intuitive.
              </p>
              <div className="pt-10 flex flex-wrap justify-center gap-4">
                 {["English", "Español", "Français", "العربية", "বাংলা", "中文", "日本語", "한국어"].map((lang, i) => (
                   <span key={i} className="px-6 py-2 rounded-full bg-white border border-black/5 text-[10px] font-black uppercase tracking-widest text-black/60 shadow-sm">
                      {lang}
                   </span>
                 ))}
                 <span className="px-6 py-2 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-widest shadow-xl">
                    +38 More
                 </span>
              </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA - Removed as per user request */}
      {/* <section className="py-40 px-4">
        <div className="container mx-auto max-w-5xl relative">
          <div className="absolute inset-0 bg-[#fabf37] rounded-[80px] rotate-2 scale-105 opacity-10" />
          <div className="relative bg-white border border-black/5 rounded-[80px] p-24 text-center overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 size-64 bg-zinc-50 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 right-0 size-64 bg-blue-500/5 blur-[100px] rounded-full" />
            
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="relative z-10 space-y-10">
              <h2 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter leading-none">
                Ready to<br />
                <span className="text-zinc-300">Deploy?</span>
              </h2>
              <p className="text-zinc-500 max-w-lg mx-auto font-medium">
                Book a technical consultation with our engineering team to discuss your manufacturing specifications and ERP integration.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <button className="px-16 py-8 bg-black text-white rounded-full font-black text-[12px] uppercase tracking-[0.4em] hover:bg-[#fabf37] hover:text-black transition-all shadow-xl">
                  Contact Sales Node
                </button>
                <button className="px-16 py-8 bg-zinc-100 text-black rounded-full font-black text-[12px] uppercase tracking-[0.4em] hover:bg-black hover:text-white transition-all">
                  Request RFQ
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      <div className="h-20" />
    </div>
  );
}