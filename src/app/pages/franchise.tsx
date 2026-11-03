import React from "react";
import imgOperators from "@/assets/factory/operators-cup-machines.webp";
import { motion } from "motion/react";
import { CircleCheck as CheckCircle2, Building2, MapPin, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useGo } from "../lib/useGo";
import { EnquiryForm } from "../components/paperware/enquiry-form";

const PageHeader = ({ title, subtitle }: { title: string; subtitle: string }) => {
  const { t } = useLanguage();
  return (
  <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-white">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/50 to-white z-10" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#fabf37] to-transparent opacity-20" />
    </div>
    <div className="container mx-auto max-w-6xl relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="size-2 rounded-full bg-[#fabf37] animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">{t("franchise_business_expansion_node")}</span>
        </div>
        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
          {t(title)}
        </h1>
        <p className="text-lg md:text-xl font-bold text-zinc-500 uppercase italic max-w-2xl leading-relaxed">
          {t(subtitle)}
        </p>
      </motion.div>
    </div>
  </section>
  );
};

const ContentBlock = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`py-20 px-4 bg-white ${className}`}>
    <div className="container mx-auto max-w-6xl">
      {children}
    </div>
  </section>
);

export function FranchisePage() {
  const go = useGo();
  const { t } = useLanguage();

  return (
    <div className="bg-white min-h-screen font-['Poppins',sans-serif] selection:bg-[#fabf37] selection:text-black">
      <PageHeader 
        title={t("franchise_franchise_opportunities")} 
        subtitle="Empowering entrepreneurs to lead the sustainable packaging revolution across Bangladesh."
      />

      <ContentBlock>
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <p className="text-xl font-medium text-zinc-600 leading-relaxed">
                {t("franchise_paperware_factory_offers_structured_fran")}
              </p>
              <p className="text-zinc-500 leading-relaxed">
                {t("franchise_our_franchise_model_is_designed")}
              </p>
            </div>

            <div className="aspect-[4/3] md:aspect-[16/9] rounded-[48px] overflow-hidden border border-zinc-100">
              <img src={imgOperators} alt={t("franchise_operators_working_at_the_cup")} loading="lazy" decoding="async" className="size-full object-cover object-center" />
            </div>
            <div className="bg-zinc-50 rounded-[48px] p-10 md:p-16 border border-zinc-100 space-y-10">
              <h3 className="text-2xl font-black uppercase tracking-tight text-black">{t("franchise_what_we_support_with")}</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { title: "Proven Production", desc: "Access to our optimized production and business processes." },
                  { title: "Raw Materials", desc: "Centralized and ethical raw material sourcing network." },
                  { title: "Technical Guidance", desc: "Full branding, marketing, and engineering support." },
                  { title: "ERP Transparency", desc: "Cloud-based operational and financial visibility." },
                  { title: "Quality Control", desc: "Rigorous QC standards and compliance audit support." }
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="size-5 text-[#fabf37]" />
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-black">{t(item.title)}</h4>
                    </div>
                    <p className="text-xs font-medium text-zinc-500 leading-relaxed pl-8">
                      {t(item.desc)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-zinc-600 font-medium leading-relaxed">
                {t("franchise_franchise_partners_can_operate_regional")}
              </p>
              <p className="text-zinc-600 font-medium leading-relaxed">
                {t("franchise_we_aim_to_expand_responsibly")}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="p-10 bg-black rounded-[48px] text-white space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Building2 className="size-32" />
              </div>
              <div className="relative z-10 space-y-6">
                <h3 className="text-3xl font-black uppercase tracking-tighter text-[#fabf37]">{t("franchise_ready_to_partner")}</h3>
                <p className="text-zinc-400 text-sm font-medium leading-relaxed uppercase">
                  {t("franchise_join_our_network_of_regional")}
                </p>
                <div className="pt-4">
                  <button onClick={() => go("contact")} className="w-full py-6 bg-[#fabf37] text-black rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all shadow-xl">
                    {t("franchise_request_franchise_kit")}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-10 border border-zinc-100 rounded-[48px] space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t("franchise_expansion_nodes")}</h4>
              <div className="space-y-4">
                {["Chattogram Region", "Sylhet Hub", "Rajshahi Node", "Khulna Distribution"].map((loc, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-zinc-50 last:border-0">
                    <span className="text-sm font-black uppercase tracking-tight text-black">{t(loc)}</span>
                    <span className="text-[9px] font-black text-[#fabf37] uppercase tracking-widest px-3 py-1 bg-zinc-50 rounded-full">{t("franchise_available")}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs font-medium text-zinc-500 leading-relaxed">{t("franchise_phased_caveat")}</p>
            </div>
          </div>
        </div>
      </ContentBlock>

      <ContentBlock className="pt-0">
        <div id="franchise-enquiry" className="max-w-4xl"><EnquiryForm kind="franchise" /></div>
      </ContentBlock>
    </div>
  );
}