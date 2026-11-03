import React from "react";
import { motion } from "motion/react";
import { 
  Factory, LayoutTemplate as Layout, Box, ClipboardList, 
  ShieldCheck, Truck, ChartBar, ArrowRight,
  Settings, Cpu, Search, Database, Layers,
  Activity, CircleCheck, Zap
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useGo } from "../lib/useGo";

export function ERPPage() {
  const go = useGo();
  const { t } = useLanguage();

  const workflow = [
    { icon: <ClipboardList />, title: "Order", desc: "Real-time client entry via ERP Portal." },
    { icon: <Layout />, title: "Design", desc: "Automated pre-press & proof approval." },
    { icon: <Layers />, title: "Production", desc: "Job queue & line management (CTP/Die)." },
    { icon: <ShieldCheck />, title: "QC", desc: "AI-assisted quality control checks." },
    { icon: <Box />, title: "Dispatch", desc: "Smart packaging & label generation." },
    { icon: <Truck />, title: "Warehouse", desc: "Inventory sync & stock forecasting." }
  ];

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 font-['Poppins',sans-serif]">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-50 rounded-full border border-zinc-100">
              <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{t("erp_live_factory_os_erpnext_powered")}</span>
            </div>
            <h1 className="text-[56px] md:text-[90px] font-black uppercase tracking-tighter leading-[0.85] text-black">
              {t("about_us_smart")} <br /><span className="text-[#fabf37]">{t("business_factory")}</span> {t("erp_ecosystem")}
            </h1>
            <p className="text-zinc-500 font-bold text-lg md:text-xl max-w-xl leading-relaxed">
              {t("erp_our_factory_operates_on_an")}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button onClick={() => go("contact")} className="bg-black text-[#fabf37] px-12 py-6 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl flex items-center gap-4">
                {t("erp_request_erp_demo")} <ArrowRight className="size-5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-zinc-50 rounded-[80px] p-12 border border-black/5 relative overflow-hidden"
            >
              {/* Technical Grid Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]" />
              
              <div className="grid grid-cols-2 gap-8 relative z-10">
                <div className="bg-white p-8 rounded-[40px] shadow-xl border border-black/5 space-y-4">
                   <Activity className="size-8 text-[#fabf37]" />
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t("erp_yield_optimization")}</p>
                      <p className="text-3xl font-black">99.4%</p>
                   </div>
                </div>
                <div className="bg-white p-8 rounded-[40px] shadow-xl border border-black/5 space-y-4">
                   <ChartBar className="size-8 text-[#fabf37]" />
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t("erp_waste_recovery")}</p>
                      <p className="text-3xl font-black">22%</p>
                   </div>
                </div>
                <div className="col-span-2 bg-black text-white p-10 rounded-[40px] shadow-2xl space-y-6">
                   <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#fabf37]">{t("erp_active_production_job")}</p>
                      <Zap className="size-5 text-[#fabf37] animate-pulse" />
                   </div>
                   <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                         <span>{t("erp_batch_p_9921_office_stationery")}</span>
                         <span>{t("erp_74_complete")}</span>
                      </div>
                      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                         <div className="h-full bg-[#fabf37] w-[74%]" />
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visual Process Flow */}
      <section className="container mx-auto px-4 mb-40">
        <div className="text-center mb-20 space-y-4">
           <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">{t("erp_the_manufacturing_protocol")}</h2>
           <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">{t("erp_unified_workflow")}</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {workflow.map((step, i) => (
            <div key={i} className="group relative">
               <div className="flex flex-col items-center text-center space-y-6">
                  <div className="size-20 rounded-[30px] bg-zinc-50 border border-black/5 flex items-center justify-center text-black group-hover:bg-[#fabf37] group-hover:rotate-12 transition-all duration-500 shadow-sm">
                    {React.cloneElement(step.icon as React.ReactElement, { className: "size-8" })}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-black uppercase tracking-widest">{t(step.title)}</h4>
                    <p className="text-[10px] font-bold text-zinc-400 leading-relaxed px-4">{t(step.desc)}</p>
                  </div>
               </div>
               {i < 5 && (
                 <div className="hidden lg:block absolute top-10 left-full w-full h-[1px] bg-zinc-100 -ml-10 z-0" />
               )}
            </div>
          ))}
        </div>
      </section>

      {/* AI Features Grid */}
      <section className="container mx-auto px-4 mb-40">
        <div className="bg-zinc-900 rounded-[60px] p-12 md:p-24 text-white">
           <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                 <div className="space-y-6">
                    <h2 className="text-5xl font-black uppercase tracking-tighter">{t("erp_ai_driven")} <br /><span className="text-[#fabf37]">{t("erp_optimizations")}</span></h2>
                    <p className="text-zinc-400 font-bold text-lg">{t("erp_our_erp_system_goes_beyond")}</p>
                 </div>
                 
                 <div className="grid sm:grid-cols-2 gap-8">
                    {[
                      { icon: <Settings />, title: "Smart Planning", desc: "Automated job prioritization based on delivery deadlines." },
                      { icon: <Activity />, title: "Delay Prediction", desc: "Early warning system for supply chain bottlenecks." },
                      { icon: <Database />, title: "Inventory Sync", desc: "Zero-stock alerts using historical demand data." },
                      { icon: <CircleCheck />, title: "Auto-QC", desc: "Vision-based defect detection during manufacturing." }
                    ].map((feature, i) => (
                      <div key={i} className="space-y-4">
                        <div className="text-[#fabf37]">{feature.icon}</div>
                        <h4 className="font-black uppercase tracking-widest text-xs">{t(feature.title)}</h4>
                        <p className="text-zinc-500 font-bold text-[10px] leading-relaxed">{t(feature.desc)}</p>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-8">
                <div className="p-10 bg-zinc-800 rounded-[50px] border border-white/5 space-y-10">
                   <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{t("erp_live_dashboard_preview")}</h4>
                      <div className="size-2 rounded-full bg-[#fabf37]" />
                   </div>
                   
                   <div className="space-y-6">
                      <div className="flex items-center gap-6">
                         <div className="size-16 rounded-2xl bg-zinc-700/50 flex items-center justify-center"><Box className="size-8 text-[#fabf37]" /></div>
                         <div className="flex-1 space-y-2">
                            <div className="h-2 bg-zinc-700 rounded-full w-3/4" />
                            <div className="h-2 bg-zinc-700/40 rounded-full w-1/2" />
                         </div>
                      </div>
                      <div className="flex items-center gap-6">
                         <div className="size-16 rounded-2xl bg-zinc-700/50 flex items-center justify-center"><Cpu className="size-8 text-[#fabf37]" /></div>
                         <div className="flex-1 space-y-2">
                            <div className="h-2 bg-zinc-700 rounded-full w-2/3" />
                            <div className="h-2 bg-zinc-700/40 rounded-full w-1/3" />
                         </div>
                      </div>
                      <div className="flex items-center gap-6">
                         <div className="size-16 rounded-2xl bg-zinc-700/50 flex items-center justify-center"><Search className="size-8 text-[#fabf37]" /></div>
                         <div className="flex-1 space-y-2">
                            <div className="h-2 bg-zinc-700 rounded-full w-4/5" />
                            <div className="h-2 bg-zinc-700/40 rounded-full w-1/4" />
                         </div>
                      </div>
                   </div>

                   <button onClick={() => go("contact")} className="w-full py-5 rounded-full border border-white/10 font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all">
                      {t("erp_access_enterprise_portal")}
                   </button>
                </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}