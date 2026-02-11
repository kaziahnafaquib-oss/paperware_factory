import { ReactElement, cloneElement, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, ShieldCheck, Truck, ChartBar, 
  Settings, Cpu, Database, Activity, 
  CircleCheck as CheckCircle2, Zap, ArrowRight, Ship, 
  Search, Server, Radio, Layers, ClipboardList, LayoutTemplate as Layout, Box, Network, Plane, Anchor
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ExportIntelligence } from "../components/paperware/export-intelligence";
import { ExportRequestForm } from "../components/paperware/export-request-form";
import { ERPSyncTerminal } from "../components/paperware/erp-sync-terminal";

export function OurERPPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'factory' | 'logistics'>('factory');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const factoryWorkflow = [
    { icon: <ClipboardList />, title: "Digital Entry", desc: "Automated order processing via Cloud ERP." },
    { icon: <Layout />, title: "Smart Design", desc: "Pre-press automation with version control." },
    { icon: <Layers />, title: "Line Control", desc: "Real-time production scheduling & monitoring." },
    { icon: <ShieldCheck />, title: "Vision QC", desc: "AI-powered quality inspections at every stage." },
    { icon: <Box />, title: "Precision Packing", desc: "Digital label sync with global standards." },
    { icon: <Database />, title: "Inventory 360", desc: "Predictive stock replenishment system." }
  ];

  const logisticsInsights = [
    { label: "Active Export Lanes", value: "GCC, EU, USA", trend: "Global" },
    { label: "Transit Optimization", value: "3.2 Days Saved", trend: "-14%" },
    { label: "Customs Compliance", value: "Fully Verified", trend: "100%" },
    { label: "Digital Tracking", value: "24/7 Satellite", trend: "Live" }
  ];

  return (
    <div className="bg-white min-h-screen pt-24 md:pt-32 pb-20 font-['Poppins',sans-serif] selection:bg-[#fabf37] selection:text-black">
      {/* Precision Industrial Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20 md:mb-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-zinc-50 rounded-full border border-black/5"
            >
              <div className="size-2 rounded-full bg-[#fabf37] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Operational Backbone: PAPERWARE OS v4.0</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[50px] md:text-[100px] font-black uppercase tracking-tighter leading-[0.85] text-black"
            >
              The <span className="text-[#fabf37]">Pulse</span> of <br />Manufacturing
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-zinc-500 font-bold text-lg md:text-xl max-w-2xl leading-relaxed"
            >
              Integrating every byte of data from our factory floor to global shipping lanes. 
              Our ERP system is the invisible force ensuring precision, speed, and sustainability.
            </motion.p>

            <div className="flex flex-wrap gap-4 pt-4">
               <button 
                 onClick={() => setIsFormOpen(true)}
                 className="bg-black text-[#fabf37] px-12 py-6 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl flex items-center gap-4 group"
               >
                 Inquire Export Services <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>

          <div className="flex-1 w-full max-w-xl lg:max-w-2xl">
             <div className="relative group">
                {/* Advanced HUD Decoration */}
                <div className="absolute -inset-4 bg-[#fabf37]/5 rounded-[60px] blur-2xl group-hover:bg-[#fabf37]/10 transition-all duration-1000" />
                <ERPSyncTerminal />
             </div>
          </div>
        </div>
      </section>

      {/* Switcher Section */}
      <section className="container mx-auto px-4 mb-20">
         <div className="flex justify-center mb-16">
            <div className="bg-zinc-100 p-2 rounded-[32px] flex gap-2">
               <button 
                 onClick={() => setActiveTab('factory')}
                 className={`px-8 py-4 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'factory' ? 'bg-black text-[#fabf37] shadow-xl' : 'text-zinc-400 hover:text-zinc-600'}`}
               >
                 Internal ERP (Factory)
               </button>
               <button 
                 onClick={() => setActiveTab('logistics')}
                 className={`px-8 py-4 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'logistics' ? 'bg-black text-[#fabf37] shadow-xl' : 'text-zinc-400 hover:text-zinc-600'}`}
               >
                 Global Logistics (Export)
               </button>
            </div>
         </div>

         <AnimatePresence mode="wait">
            {activeTab === 'factory' ? (
              <motion.div 
                key="factory"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-24"
              >
                {/* Workflow Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                  {factoryWorkflow.map((step, i) => (
                    <div key={i} className="flex flex-col items-center text-center space-y-6 group">
                      <div className="size-20 rounded-[32px] bg-zinc-50 border border-black/5 flex items-center justify-center text-black group-hover:bg-[#fabf37] group-hover:rotate-12 transition-all duration-500 shadow-sm relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        {cloneElement(step.icon as ReactElement, { className: "size-8 relative z-10" })}
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-[11px] font-black uppercase tracking-widest text-black">{step.title}</h4>
                        <p className="text-[9px] font-bold text-zinc-400 leading-relaxed max-w-[140px]">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Technical Feature Split */}
                <div className="bg-zinc-950 rounded-[60px] p-12 md:p-24 text-white overflow-hidden relative">
                   {/* Background Graphics */}
                   <Network className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] text-white/[0.02] pointer-events-none" />
                   
                   <div className="grid lg:grid-cols-2 gap-24 items-center relative z-10">
                      <div className="space-y-12">
                         <div className="space-y-6">
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">AI-Integrated <br /><span className="text-[#fabf37]">Operation Stack</span></h2>
                            <p className="text-zinc-400 font-bold text-lg max-w-xl">Our factory operates on a proprietary stack built to eliminate waste and maximize throughput via real-time data sync.</p>
                         </div>
                         
                         <div className="grid sm:grid-cols-2 gap-12">
                            <div className="space-y-4">
                               <div className="size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#fabf37]">
                                  <Settings className="size-6" />
                               </div>
                               <h5 className="font-black uppercase tracking-widest text-[10px]">Auto-Prioritization</h5>
                               <p className="text-zinc-500 font-bold text-[10px] leading-relaxed">System automatically adjusts line queues based on shipping urgency and material availability.</p>
                            </div>
                            <div className="space-y-4">
                               <div className="size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#fabf37]">
                                  <Database className="size-6" />
                               </div>
                               <h5 className="font-black uppercase tracking-widest text-[10px]">Dynamic Inventory</h5>
                               <p className="text-zinc-500 font-bold text-[10px] leading-relaxed">Blockchain-ready ledger system for 100% material traceability from source to cup.</p>
                            </div>
                         </div>
                      </div>

                      <div className="relative">
                         <div className="bg-zinc-900 border border-white/5 rounded-[50px] p-10 space-y-10 relative overflow-hidden">
                            <div className="flex justify-between items-center mb-4">
                               <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-600">Centralized Server Status</span>
                               <Server className="size-4 text-emerald-500" />
                            </div>
                            
                            <div className="space-y-6">
                               {[
                                 { label: "Paper Supply", value: "88%", color: "bg-[#fabf37]" },
                                 { label: "Energy Grid", value: "94%", color: "bg-emerald-500" },
                                 { label: "Die-Cut Precision", value: "99.2%", color: "bg-[#fabf37]" }
                               ].map((stat, i) => (
                                 <div key={i} className="space-y-2">
                                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                      <span className="text-zinc-500">{stat.label}</span>
                                      <span>{stat.value}</span>
                                   </div>
                                   <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                      <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: stat.value }}
                                        className={`h-full ${stat.color}`}
                                      />
                                   </div>
                                 </div>
                               ))}
                            </div>

                            <button className="w-full py-5 rounded-[24px] border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                               Request Enterprise Integration
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="logistics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-24"
              >
                {/* Logistics Stats */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                   {logisticsInsights.map((stat, i) => (
                     <div key={i} className="bg-zinc-50 p-10 rounded-[50px] border border-black/5 space-y-4 hover:bg-black hover:text-white transition-all group">
                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-[#fabf37]">{stat.label}</p>
                        <div className="space-y-1">
                           <h4 className="text-2xl font-black uppercase tracking-tight">{stat.value}</h4>
                           <div className="flex items-center gap-2 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                              <Zap className="size-3" /> {stat.trend} Optimization
                           </div>
                        </div>
                     </div>
                   ))}
                </div>

                {/* World Map Section from ExportIntelligence */}
                <ExportIntelligence />

                {/* Global Transport Pillars */}
                <div className="grid lg:grid-cols-3 gap-8">
                   {[
                     { icon: <Ship />, mode: "Ocean Freight", desc: "Optimized LCL/FCL shipping for bulk container orders." },
                     { icon: <Plane />, mode: "Air Express", desc: "DDP solutions for time-sensitive premium packaging." },
                     { icon: <Anchor />, mode: "Port Management", desc: "Automated customs clearance at global entry points." }
                   ].map((pill, i) => (
                     <div key={i} className="p-10 rounded-[50px] border-2 border-zinc-100 space-y-6 hover:border-black transition-all">
                        <div className="size-16 rounded-2xl bg-[#fabf37]/10 flex items-center justify-center text-black">
                           {cloneElement(pill.icon as ReactElement, { className: "size-8" })}
                        </div>
                        <div className="space-y-2">
                           <h4 className="text-xl font-black uppercase tracking-tight">{pill.mode}</h4>
                           <p className="text-sm font-bold text-zinc-400 leading-relaxed">{pill.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>

                {/* Final Call to Action */}
                <div className="bg-[#fabf37] rounded-[60px] p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12 text-black relative overflow-hidden">
                   <div className="relative z-10 space-y-6">
                      <h2 className="text-[40px] md:text-[60px] font-black uppercase tracking-tighter leading-none">Ready to <br />Go Global?</h2>
                      <p className="text-lg font-black max-w-md opacity-60">Consult with our logistics experts to optimize your international packaging supply chain.</p>
                   </div>
                   <button 
                     onClick={() => setIsFormOpen(true)}
                     className="relative z-10 px-16 py-8 bg-black text-[#fabf37] rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl"
                   >
                     Initialize Export Request
                   </button>
                   {/* Background Circle Decor */}
                   <div className="absolute top-1/2 right-0 -translate-y-1/2 size-[600px] rounded-full bg-white/20 blur-[100px] -mr-[300px]" />
                </div>
              </motion.div>
            )}
         </AnimatePresence>
      </section>

      <ExportRequestForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}