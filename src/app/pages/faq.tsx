import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useSpring, useScroll, useTransform } from "framer-motion";
import { 
  Plus, Minus, Search, CircleHelp, 
  Settings, ShieldCheck, Truck, 
  Leaf, ChevronRight, Zap,
  MessageCircle, ArrowUpRight,
  HardHat, Microscope
} from "lucide-react";

const categories = [
  { id: 'all', label: 'All Protocols', icon: CircleHelp },
  { id: 'prod', label: 'Production', icon: Settings },
  { id: 'log', label: 'Logistics', icon: Truck },
  { id: 'sust', label: 'Sustainability', icon: Leaf },
  { id: 'qual', label: 'Quality Control', icon: ShieldCheck },
];

const faqs = [
  { 
    cat: 'prod',
    q: "What is the Minimum Order Quantity (MOQ)?", 
    a: "Standard MOQ for custom-printed enterprise solutions is 10,000 units per design. However, for our strategic partners, we offer a 'Scaling Protocol' that allows for lower initial volumes during market testing phases.",
    tags: ["Bulk", "Customization"]
  },
  { 
    cat: 'log',
    q: "Do you offer international supply chain support?", 
    a: "Yes, our logistics engine is integrated with major global ports. We handle everything from Chittagong Port FOB to door-to-door DDP shipments for North American and European markets.",
    tags: ["Export", "Global"]
  },
  { 
    cat: 'sust',
    q: "Are your materials certified food-safe and eco-friendly?", 
    a: "Absolutely. We utilize FSC-certified paper stock and soy-based industrial inks. Our facility is ISO 22000 certified, ensuring the highest standards of food safety hygiene in the manufacturing process.",
    tags: ["ISO", "FSC"]
  },
  { 
    cat: 'prod',
    q: "Can we request a physical prototype before mass production?", 
    a: "Our Studio team provides 3D digital visualizations within 24 hours. Physical prototypes can be dispatched via express courier within 3-5 business days of design approval.",
    tags: ["Studio", "Prototyping"]
  },
  { 
    cat: 'qual',
    q: "What is your quality assurance (QA) protocol?", 
    a: "We implement a 5-tier QA check: Raw material inspection, In-line production monitoring, Automated leak testing, Random batch sampling, and Pre-shipment final audit.",
    tags: ["Quality", "Audit"]
  },
  { 
    cat: 'sust',
    q: "How do you handle production waste?", 
    a: "We operate a 'Circular Loop' system where 100% of our paper offcuts are recycled back into industrial-grade packaging materials, achieving near-zero waste in our primary production lines.",
    tags: ["Recycling", "Sustainability"]
  }
];

export function FAQPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for interactivity
  const [activeCat, setActiveCat] = useState("all");
  const [search, setSearch] = useState("");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Spring animations for cursor
  const springMouseX = useSpring(0, { stiffness: 500, damping: 30 });
  const springMouseY = useSpring(0, { stiffness: 500, damping: 30 });

  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const blackBgOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const heroRotateX = useTransform(scrollY, [0, 500], [0, 15]);
  const heroTranslateZ = useTransform(scrollY, [0, 500], [0, -200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.6]);

  // Optimize: Memoize mouse movement logic
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Lower intensity for better performance
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
    springMouseX.set(clientX);
    springMouseY.set(clientY);
  }, [springMouseX, springMouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);


  // Optimize: Memoize filtered results to prevent re-calc on every render
  const filteredFaqs = useMemo(() => {
    return faqs.filter(f => {
      const matchesCat = activeCat === 'all' || f.cat === activeCat;
      const matchesSearch = f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCat, search]);

  return (
    <div ref={containerRef} className="relative bg-white min-h-screen font-['Poppins',sans-serif] selection:bg-[#fabf37] selection:text-black overflow-x-hidden pt-32 md:pt-40">
      {/* Dynamic Magnetic Cursor / Scanner Overlay */}
      <motion.div
        style={{ x: springMouseX, y: springMouseY }}
        className="fixed top-0 left-0 size-96 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[100] hidden md:block"
      >
        <div className="absolute inset-0 bg-[#fabf37]/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 border border-[#fabf37]/10 rounded-full animate-spin-slow" />
      </motion.div>

      {/* Industrial Knowledge Hero */}
      <section className="pt-48 pb-32 relative overflow-hidden bg-white">
        <motion.div 
          style={{ opacity: blackBgOpacity }}
          className="absolute inset-0 bg-black z-0"
        />
        
        <div className="absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#fabf3708_1px,transparent_1px),linear-gradient(to_bottom,#fabf3708_1px,transparent_1px)] bg-[size:40px_40px]" />
          <motion.div 
             animate={{ top: ["-10%", "110%"] }}
             transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
             className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#fabf37]/40 to-transparent" 
          />
        </div>

        <div className="container mx-auto px-4 relative z-10" style={{ perspective: "2000px", transformStyle: "preserve-3d" }}>
          <motion.div 
            style={{ 
              scale: heroScale,
              rotateX: heroRotateX,
              translateZ: heroTranslateZ,
              opacity: heroOpacity,
              transformStyle: "preserve-3d",
              willChange: "transform, opacity"
            }} 
            className="max-w-6xl mx-auto"
          >
            <motion.div
              style={{ 
                rotateY: mousePos.x * 0.1, 
                rotateX: -mousePos.y * 0.05, 
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 bg-black/5 backdrop-blur-md border border-black/10 p-1.5 rounded-full pr-6">
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                     className="size-8 rounded-full bg-[#fabf37] flex items-center justify-center text-black"
                   >
                     <Settings className="size-4" />
                   </motion.div>
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-tighter leading-none">Paperware Core</span>
                      <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">v4.0 Protocol</span>
                   </div>
                </div>
                <div className="h-px w-12 bg-black/10" />
                <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.4em] flex items-center gap-3">
                  <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse" /> 
                  Live ERP Stream
                </span>
              </div>

              <div className="relative">
                <h1 className="text-[64px] lg:text-[120px] font-black uppercase tracking-tighter leading-[0.8] relative z-10">
                  <motion.span
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-black"
                    style={{ color: useTransform(scrollY, [0, 300], ["#000000", "#ffffff"]) }}
                  >
                    Technical
                  </motion.span>
                  <motion.span 
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[#fabf37] block"
                  >
                    Protocols
                  </motion.span>
                </h1>
                
                {/* Decorative Background Text */}
                <div className="absolute -top-10 -left-10 text-[200px] font-black opacity-[0.02] pointer-events-none select-none uppercase">
                   DATA
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col md:flex-row md:items-end gap-12"
              >
                <p className="text-zinc-600 font-bold text-xl max-w-xl leading-tight">
                  Immersive manufacturing standards and real-time operational directives for the global B2B ecosystem.
                </p>
                
                <div className="flex gap-4">
                   <div className="px-6 py-4 bg-white/50 backdrop-blur-xl border border-black/5 rounded-2xl bg-[rgba(0,0,0,0.5)]">
                      <p className="text-[8px] font-black uppercase text-zinc-400 mb-1">Compliance</p>
                      <p className="text-xl font-black">99.8%</p>
                   </div>
                   <div className="px-6 py-4 bg-white/50 backdrop-blur-xl border border-black/5 rounded-2xl">
                      <p className="text-[8px] font-black uppercase text-zinc-400 mb-1">Latency</p>
                      <p className="text-xl font-black">12ms</p>
                   </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Smart Search Bar - Volumetric Style */}
            <motion.div 
              style={{ rotateY: mousePos.x * 0.05, translateZ: 100 }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-24 max-w-3xl relative group"
            >
              <div className="absolute inset-0 bg-[#fabf37]/20 blur-[100px] group-focus-within:bg-[#fabf37]/40 transition-all duration-700" />
              <div className="relative bg-black/90 backdrop-blur-3xl border border-white/10 rounded-[40px] p-3 flex items-center gap-4 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                <div className="pl-8 text-[#fabf37] relative">
                  <Search className="size-7" />
                </div>
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="SCAN KNOWLEDGE BASE FOR PROTOCOLS..." 
                  className="bg-transparent border-none outline-none text-white font-black w-full py-6 placeholder:text-zinc-700 text-sm tracking-widest uppercase relative"
                />
                <button className="bg-[#fabf37] text-black px-12 py-6 rounded-[32px] font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 shadow-xl relative overflow-hidden group/btn">
                  <span className="relative z-10">Run Query</span>
                  <motion.div 
                    className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"
                  />
                </button>
              </div>
              
              {/* Scanline Effect for Search Bar */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-px bg-gradient-to-r from-transparent via-[#fabf37]/50 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-4 -mt-12 relative z-20 pb-32">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              style={{ rotateX: -mousePos.y * 0.1, rotateY: mousePos.x * 0.1, transformStyle: "preserve-3d" }}
              className="bg-white p-8 rounded-[40px] shadow-2xl border border-black/5 sticky top-32"
            >
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8 px-4">Directives</h4>
              <div className="space-y-2">
                {categories.map((cat, i) => (
                  <motion.button
                    key={cat.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setActiveCat(cat.id)}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${activeCat === cat.id ? 'bg-[#fabf37] text-black shadow-lg shadow-[#fabf37]/20' : 'hover:bg-zinc-50 text-zinc-500'}`}
                  >
                    <div className="flex items-center gap-4">
                      <cat.icon className={`size-5 ${activeCat === cat.id ? 'text-black' : 'text-zinc-400 group-hover:text-black'}`} />
                      <span className="font-black text-xs uppercase tracking-widest">{cat.label}</span>
                    </div>
                    <ChevronRight className={`size-4 transition-transform ${activeCat === cat.id ? 'rotate-90' : 'opacity-0 group-hover:opacity-100'}`} />
                  </motion.button>
                ))}
              </div>

              {/* Support Teaser */}
              <div className="mt-12 pt-8 border-t border-dashed border-zinc-100">
                 <div className="bg-zinc-900 p-6 rounded-[30px] space-y-4">
                    <p className="text-[8px] font-black uppercase tracking-widest text-[#fabf37]">AI Assistant Beta</p>
                    <p className="text-white font-bold text-xs">Can't find a specific protocol? Ask our AI core.</p>
                    <button className="w-full py-4 bg-[#fabf37] rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                       Launch Assistant <MessageCircle className="size-3" />
                    </button>
                 </div>
              </div>
            </motion.div>
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, i) => (
                  <motion.div 
                    layout
                    key={faq.q}
                    initial={{ opacity: 0, y: 50, rotateX: 20 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    whileHover={{ 
                      scale: 1.01,
                      translateZ: 20,
                    }}
                    style={{ transformStyle: "preserve-3d", willChange: "transform" }}
                    className={`bg-white rounded-[40px] border-2 transition-all overflow-hidden ${activeIdx === i ? 'border-[#fabf37] shadow-2xl shadow-[#fabf37]/10' : 'border-black/5 hover:border-black/20'}`}
                  >
                    <button 
                      onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                      className="w-full p-8 lg:p-10 flex items-start justify-between text-left group"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           {faq.tags.map(tag => (
                             <span key={tag} className="text-[8px] font-black uppercase tracking-widest px-2 py-1 bg-zinc-100 rounded text-zinc-400">#{tag}</span>
                           ))}
                        </div>
                        <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tight text-black group-hover:text-[#fabf37] transition-colors">{faq.q}</h3>
                      </div>
                      <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 transition-all ${activeIdx === i ? 'bg-black text-[#fabf37] rotate-180' : 'bg-zinc-100 text-black group-hover:bg-[#fabf37]'}`}>
                        {activeIdx === i ? <Minus className="size-6" /> : <Plus className="size-6" />}
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {activeIdx === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-10 pb-10">
                            <div className="h-[2px] w-12 bg-[#fabf37] mb-8" />
                            <p className="text-zinc-500 font-bold text-lg leading-relaxed max-w-3xl">
                              {faq.a}
                            </p>
                            <div className="mt-10 flex gap-4">
                               <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black hover:text-[#fabf37] transition-colors">
                                  Request Full Specs <ArrowUpRight className="size-3" />
                               </button>
                               <div className="w-[1px] h-4 bg-zinc-200" />
                               <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black hover:text-[#fabf37] transition-colors">
                                  Print Data <Zap className="size-3" />
                               </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              ) : (
                <div className="py-32 text-center space-y-4">
                   <div className="size-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-8">
                      <Search className="size-8 text-zinc-300" />
                   </div>
                   <h3 className="text-2xl font-black uppercase">No Protocol Found</h3>
                   <p className="text-zinc-500 font-bold">Try adjusting your query or filters for different results.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Industrial Grid Footer */}
      <section className="bg-white border-t border-black/5 py-32">
         <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12" style={{ perspective: "1000px" }}>
               {[
                 { icon: HardHat, title: "On-Site Compliance", desc: "Every order follows rigorous ISO and LEED manufacturing compliance protocols." },
                 { icon: Microscope, title: "Technical Audits", desc: "Access detailed laboratory reports for all batches upon enterprise request." },
                 { icon: ShieldCheck, title: "Data Integrity", desc: "Your business data and custom designs are protected under industrial non-disclosure terms." }
               ].map((item, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 30, rotateY: 20 }}
                   whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8, delay: i * 0.2 }}
                   whileHover={{ 
                     scale: 1.05, 
                     translateZ: 50,
                     rotateX: -5,
                     rotateY: 5,
                     boxShadow: "0 40px 100px -20px rgba(0,0,0,0.1)"
                   }}
                   style={{ transformStyle: "preserve-3d" }}
                   className="space-y-6 p-10 rounded-[40px] bg-zinc-50/50 border border-black/5 group cursor-default"
                 >
                    <div 
                      className="size-16 rounded-3xl bg-white flex items-center justify-center border border-black/5 shadow-sm group-hover:bg-[#fabf37] group-hover:text-black transition-colors duration-500 text-black"
                      style={{ transform: "translateZ(30px)" }}
                    >
                       {item.icon && <item.icon className="size-8" />}
                    </div>
                    <div style={{ transform: "translateZ(50px)" }} className="space-y-4">
                      <h4 className="text-xl font-black uppercase tracking-tight text-[rgb(0,0,0)]">{item.title}</h4>
                      <div className="h-1 w-8 bg-[#fabf37] group-hover:w-16 transition-all duration-500" />
                      <p className="text-zinc-500 font-bold text-sm leading-relaxed">{item.desc}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}