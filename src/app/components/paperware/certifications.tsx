import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, Globe, Award, CircleCheck, Truck, FileText } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export function Certifications() {
  const { t } = useLanguage();
  const certifications = [
    { name: "ISO 9001:2015", body: "Quality Management System", icon: <Award /> },
    { name: "FSC Certified", body: "Sustainable Forest Management", icon: <CircleCheck /> },
    { name: "ISO 14001", body: "Environmental Management", icon: <ShieldCheck /> },
    { name: "FDA Approved", body: "Food Grade Safety Standards", icon: <FileText /> }
  ];

  return (
    <section className="py-24 bg-white border-y border-black/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-12">
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 text-black font-black uppercase tracking-[0.4em] text-[10px]"
              >
                <div className="h-[2px] w-12 bg-[#fabf37]" />
                {t("certifications_trust_compliance")}
              </motion.div>
              <h2 className="text-[32px] md:text-[52px] font-black uppercase tracking-tighter leading-[0.9]">
                {t("certifications_global_standards")} <br /> <span className="text-[#fabf37]">{t("certifications_zero_compromise")}</span>
              </h2>
              <p className="text-zinc-500 font-bold text-lg leading-relaxed max-w-xl">
                {t("certifications_we_adhere_to_the_strictest")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-6 bg-zinc-50 rounded-3xl border border-black/5"
                >
                  <div className="size-12 rounded-xl bg-black text-[#fabf37] flex items-center justify-center shrink-0">
                    {cert.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-black uppercase tracking-tight">{t(cert.name)}</h4>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{t(cert.body)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
             <div className="absolute inset-0 bg-[#fabf37]/10 blur-[100px] rounded-full" />
             <div className="relative bg-black rounded-[40px] p-8 md:p-12 border border-white/10 overflow-hidden">
                <div className="space-y-8">
                   <div className="flex items-center gap-4">
                      <div className="size-12 rounded-full bg-[#fabf37] flex items-center justify-center text-black">
                         <Globe className="size-6" />
                      </div>
                      <h3 className="text-white text-2xl font-black uppercase tracking-tight">{t("certifications_global_export_reach")}</h3>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-1">
                         <p className="text-[#fabf37] text-4xl font-black">46+</p>
                         <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{t("certifications_countries_supplied")}</p>
                      </div>
                      <div className="space-y-1">
                         <p className="text-[#fabf37] text-4xl font-black">2.4B</p>
                         <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{t("certifications_units_exported_yearly")}</p>
                      </div>
                   </div>

                   <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                      <div className="flex items-center gap-3">
                         <Truck className="text-[#fabf37] size-5" />
                         <span className="text-white text-xs font-black uppercase tracking-widest">{t("certifications_live_logistics_tracking")}</span>
                      </div>
                      <div className="flex gap-1 h-1.5">
                         {[1,2,3,4,5,6,7,8].map(i => (
                            <motion.div 
                              key={i}
                              animate={{ opacity: [0.2, 1, 0.2] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                              className="flex-1 bg-[#fabf37] rounded-full"
                            />
                         ))}
                      </div>
                      <p className="text-zinc-500 text-[10px] font-bold">{t("certifications_consignments_currently_in_transit_to")}</p>
                   </div>
                </div>
                
                {/* Abstract Map Background Placeholder */}
                <div className="absolute bottom-0 right-0 opacity-10 -mr-20 -mb-20">
                   <Globe className="size-80 text-white" />
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}