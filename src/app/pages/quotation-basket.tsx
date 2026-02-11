import { useEffect, useLayoutEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trash2, Plus, Minus, FileText,
  ShieldCheck, Factory, ArrowRight,
  Phone, MessageSquare, Mail
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface QuotationBasketPageProps {
  basket: any[];
  onRemove: (name: string) => void;
  onProceedToOrder: () => void;
}

export default function QuotationBasketPage({ basket, onRemove, onProceedToOrder }: QuotationBasketPageProps) {
  const [items, setItems] = useState(basket.map((p, i) => ({ 
    ...p, 
    qty: 1000, 
    grade: "Premium Swedish Pulp",
    gsm: "280 GSM",
    finish: "Matte UV",
    delivery: "Standard (7-10 Days)",
    // Use index and timestamp to ensure uniqueness even for duplicate items
    _uniqueId: `${p.name}-${i}-${Date.now()}`
  })));

  // State to track carousel hover
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  // Ensure scroll starts from the absolute top on mount
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sync state if basket changes
  useEffect(() => {
    setItems(basket.map((p, i) => ({ 
      ...p, 
      qty: 1000, 
      grade: "Premium Swedish Pulp",
      gsm: "280 GSM",
      finish: "Matte UV",
      delivery: "Standard (7-10 Days)",
      _uniqueId: `${p.name}-${i}-${Date.now()}`
    })));
  }, [basket]);

  const updateQty = (uniqueId: string, delta: number) => {
    setItems(prev => prev.map(item => 
      item._uniqueId === uniqueId ? { ...item, qty: Math.max(500, item.qty + delta) } : item
    ));
  };

  const updateAttribute = (uniqueId: string, field: string, value: string) => {
    setItems(prev => prev.map(item => 
      item._uniqueId === uniqueId ? { ...item, [field]: value } : item
    ));
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen pb-24 font-['Poppins',sans-serif] text-white selection:bg-[#fabf37] selection:text-black">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-[0.03]">
        <div className="absolute top-[-10%] left-[-10%] size-[800px] border border-[#fabf37] rounded-full rotate-45" />
        <div className="absolute bottom-[-10%] right-[-10%] size-[800px] border border-[#fabf37] rounded-full -rotate-45" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-32 md:pt-48">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-10 md:mb-20 space-y-4">
             <div className="flex items-center gap-3">
                <div className="size-2 bg-[#fabf37] rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Inventory Matrix v2.0</span>
             </div>
             <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                Quotation <br /><span className="text-[#fabf37]">Basket</span>
             </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-start">
            
            <div className="flex-1 space-y-6 w-full">
              {items.length === 0 ? (
                <div className="bg-zinc-900/50 backdrop-blur-xl p-12 md:p-24 rounded-[40px] md:rounded-[60px] border border-dashed border-white/10 text-center space-y-8">
                  <div className="size-16 md:size-24 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                    <FileText className="size-8 md:size-10 text-zinc-700" />
                  </div>
                  <p className="text-xl md:text-2xl font-black uppercase tracking-tight text-zinc-500 italic">Your matrix is empty</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {items.map((item, i) => (
                    <motion.div 
                      layout
                      key={item._uniqueId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-zinc-900/40 backdrop-blur-2xl p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-white/5 hover:border-[#fabf37]/20 transition-all flex flex-col md:flex-row gap-6 md:gap-8 items-center group relative overflow-hidden"
                    >
                      <div className="size-32 md:size-40 rounded-[24px] md:rounded-[32px] bg-zinc-800 overflow-hidden shrink-0 border border-white/5 group-hover:scale-105 transition-transform duration-500">
                         <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                      </div>
                      
                      <div className="flex-1 space-y-4 md:space-y-6 w-full">
                         <div className="flex justify-between items-start">
                            <div className="min-w-0 flex-1">
                               <p className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1 truncate">{item.category}</p>
                               <h3 className="text-xl md:text-3xl font-black uppercase tracking-tighter leading-none truncate">{item.name}</h3>
                            </div>
                            <button 
                              onClick={() => onRemove(item.name)}
                              className="size-10 md:size-12 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center text-zinc-500 hover:text-red-500 hover:bg-red-500/10 transition-all shrink-0 ml-4"
                            >
                              <Trash2 className="size-4 md:size-5" />
                            </button>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 md:gap-6 pt-4 md:pt-6 border-t border-white/5">
                            <div className="space-y-2">
                               <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-600">Production Volume</p>
                               <div className="flex items-center justify-between bg-black p-1.5 rounded-full border border-white/10">
                                  <button onClick={() => updateQty(item._uniqueId, -500)} className="size-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#fabf37] hover:text-black transition-all group/btn"><Minus className="size-3 group-active/btn:scale-75 transition-transform" /></button>
                                  <span className="text-xs md:text-sm font-black tabular-nums">{item.qty.toLocaleString()}</span>
                                  <button onClick={() => updateQty(item._uniqueId, 500)} className="size-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#fabf37] hover:text-black transition-all group/btn"><Plus className="size-3 group-active/btn:scale-75 transition-transform" /></button>
                               </div>
                            </div>
                            <div className="space-y-2">
                               <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-600">Paper Material</p>
                               <div className="relative">
                                 <select 
                                   value={["Premium Swedish Pulp", "Recycled Kraft", "Luxury Art Paper"].includes(item.grade) ? item.grade : "Premium Swedish Pulp"}
                                   onChange={(e) => updateAttribute(item._uniqueId, 'grade', e.target.value)}
                                   className="w-full bg-black border border-white/10 rounded-full px-4 py-2.5 md:py-3 text-[9px] md:text-[10px] font-black uppercase outline-none focus:border-[#fabf37] transition-colors appearance-none cursor-pointer text-white"
                                 >
                                    <option>Premium Swedish Pulp</option>
                                    <option>Recycled Kraft</option>
                                    <option>Luxury Art Paper</option>
                                 </select>
                                 <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                                   <div className="size-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-white" />
                                 </div>
                               </div>
                            </div>
                            <div className="space-y-2">
                               <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-600">GSM</p>
                               <div className="relative">
                                 <select 
                                    value={item.gsm || "280 GSM"}
                                    onChange={(e) => updateAttribute(item._uniqueId, 'gsm', e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded-full px-4 py-2.5 md:py-3 text-[9px] md:text-[10px] font-black uppercase outline-none focus:border-[#fabf37] transition-colors appearance-none cursor-pointer text-white"
                                 >
                                    <option>280 GSM</option>
                                    <option>300 GSM</option>
                                    <option>350 GSM</option>
                                    <option>400 GSM</option>
                                 </select>
                                 <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                                   <div className="size-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-white" />
                                 </div>
                               </div>
                            </div>
                            <div className="space-y-2">
                               <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-600">Finish</p>
                               <div className="relative">
                                 <select 
                                    value={["Matte UV", "Gloss Laminated", "Soft Touch", "Metallic Foil"].includes(item.finish) ? item.finish : "Matte UV"}
                                    onChange={(e) => updateAttribute(item._uniqueId, 'finish', e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded-full px-4 py-2.5 md:py-3 text-[9px] md:text-[10px] font-black uppercase outline-none focus:border-[#fabf37] transition-colors appearance-none cursor-pointer text-white"
                                 >
                                    <option>Matte UV</option>
                                    <option>Gloss Laminated</option>
                                    <option>Soft Touch</option>
                                    <option>Metallic Foil</option>
                                 </select>
                                 <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                                   <div className="size-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-white" />
                                 </div>
                               </div>
                            </div>
                            <div className="space-y-2">
                               <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-600">Delivery</p>
                               <div className="relative">
                                 <select 
                                    value={item.delivery || "Standard (7-10 Days)"}
                                    onChange={(e) => updateAttribute(item._uniqueId, 'delivery', e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded-full px-4 py-2.5 md:py-3 text-[9px] md:text-[10px] font-black uppercase outline-none focus:border-[#fabf37] transition-colors appearance-none cursor-pointer text-white"
                                 >
                                    <option>Standard (7-10 Days)</option>
                                    <option>Express (3-5 Days)</option>
                                    <option>Rush (24-48 Hours)</option>
                                 </select>
                                 <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                                   <div className="size-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-white" />
                                 </div>
                               </div>
                            </div>
                         </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:w-[420px] shrink-0 w-full space-y-6 md:space-y-8">
               <div className="bg-[#fabf37] rounded-[40px] md:rounded-[60px] p-8 md:p-12 text-black shadow-[0_40px_80px_-20px_rgba(250,191,55,0.3)] relative overflow-hidden group">
                  <motion.div 
                    className="absolute top-0 right-0 p-10 opacity-10 hidden md:block"
                    animate={{ 
                      rotate: [12, 0, 12],
                      scale: [1, 1.1, 1] 
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut"
                    }}
                  >
                    <Factory className="size-48" />
                  </motion.div>
                  
                  <div className="space-y-6 md:space-y-8 relative z-10">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="size-2 bg-black rounded-full animate-ping" />
                        <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em]">Inventory Summary</h4>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">Industrial <br /> Manifest</h2>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                      <div className="flex justify-between items-center text-xs md:text-sm font-black border-b border-black/10 pb-4">
                        <span className="opacity-40 uppercase tracking-widest text-[9px] md:text-[10px]">SKUs</span>
                        <span>{items.length} Items</span>
                      </div>
                      <div className="flex justify-between items-center text-xs md:text-sm font-black border-b border-black/10 pb-4">
                        <span className="opacity-40 uppercase tracking-widest text-[9px] md:text-[10px]">Total Volume</span>
                        <span>{items.reduce((acc, curr) => acc + curr.qty, 0).toLocaleString()} PCS</span>
                      </div>
                    </div>

                    <button 
                      disabled={items.length === 0}
                      onClick={onProceedToOrder}
                      className="w-full bg-black text-[#fabf37] px-6 md:px-8 py-6 md:py-8 rounded-[24px] md:rounded-[32px] font-black uppercase tracking-widest text-[10px] md:text-xs shadow-2xl flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all group disabled:opacity-50 disabled:grayscale"
                    >
                       Proceed to Bulk Order <ArrowRight className="size-4 md:size-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="pt-8 border-t border-black/10 flex flex-col gap-6">
                       {/* Executive Support */}
                       <a href="tel:+09638011101" className="flex items-center gap-4 group/item">
                          <div className="size-14 md:size-16 rounded-[20px] bg-black flex items-center justify-center shrink-0 group-hover/item:scale-105 transition-transform">
                             <Phone className="size-6 md:size-7 text-[#fabf37]" />
                          </div>
                          <div className="space-y-1">
                             <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">Executive Support</p>
                             <p className="md:text-2xl font-black text-black tracking-tighter leading-none group-hover/item:text-black/70 transition-colors text-[16px]">+09638-011101</p>
                             <div className="flex items-center gap-2 pt-1">
                                <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[9px] font-black uppercase tracking-wider text-green-600">Available Now</span>
                             </div>
                          </div>
                       </a>

                       {/* Call & WhatsApp */}
                       <a href="https://wa.me/8801901459110" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group/item">
                          <div className="size-14 md:size-16 rounded-[20px] bg-zinc-100 flex items-center justify-center shrink-0 group-hover/item:bg-[#25D366] group-hover/item:text-white transition-all">
                             <MessageSquare className="size-6 md:size-7 text-black group-hover/item:text-white transition-colors" />
                          </div>
                          <div className="space-y-1">
                             <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">Call and WhatsApp</p>
                             <p className="md:text-2xl font-black text-black tracking-tighter leading-none group-hover/item:text-black/70 transition-colors text-[16px]">+880 1901-459110</p>
                          </div>
                       </a>

                       {/* Formal Channel */}
                       <a href="mailto:paperwarefactory@gmail.com" className="flex items-center gap-4 group/item">
                          <div className="size-14 md:size-16 rounded-[20px] bg-zinc-100 flex items-center justify-center shrink-0 group-hover/item:bg-[#fabf37] transition-all">
                             <Mail className="size-6 md:size-7 text-black" />
                          </div>
                          <div className="space-y-1 overflow-hidden">
                             <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">Formal Channel</p>
                             <div className="relative inline-block">
                                <p className="md:text-xl font-black text-black tracking-tight leading-none truncate group-hover/item:text-black/70 transition-colors text-[15px]">paperwarefactory@gmail.com</p>
                                <div className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#fabf37]" />
                             </div>
                          </div>
                       </a>
                    </div>
                  </div>
               </div>

               <div className="bg-zinc-900/40 backdrop-blur-xl p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-white/5 space-y-4 md:space-y-6">
                  <div className="flex items-center gap-4 text-[#fabf37]">
                     <ShieldCheck className="size-5 md:size-6" />
                     <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Secure Protocol</h4>
                  </div>
                  <p className="text-[9px] md:text-[10px] font-bold text-zinc-500 leading-relaxed italic">
                     Your inventory selections are stored locally until transmitted via the Bulk Order Form.
                  </p>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}