import React from "react";
import imgPress from "@/assets/factory/offset-press.webp";
import { openWhatsAppInquiry, collectFormFields, INQUIRY_HANDOFF_BODY } from "../lib/inquiry";
import { motion, AnimatePresence } from "motion/react";
import { 
  Trash2, Plus, Minus, FileText, Send, 
  ChevronRight, Box, Truck, ShieldCheck, 
  Info, AlertCircle, CircleCheck as CheckCircle2, ArrowLeft,
  Settings2, Layers, Building2, User, Mail, Phone as PhoneIcon,
  MapPin, ClipboardList, Briefcase, Calendar, Upload, Globe,
  ArrowRight, Landmark, Factory, Shield, Sparkles
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useGo } from "../lib/useGo";
import { useLanguage } from "../context/LanguageContext";

interface BulkOrderPageProps {
  basket?: any[];
}

export default function BulkOrderPage({ basket = [] }: BulkOrderPageProps) {
  const { t } = useLanguage();
  const go = useGo();
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    companyName: "",
    businessType: "Corporate",
    contactPerson: "",
    email: "",
    phone: "",
    tin: "",
    address: "",
    expectedDate: "",
    specialInstructions: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#fabf37 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-zinc-900/50 backdrop-blur-3xl p-12 md:p-20 rounded-[60px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] max-w-2xl w-full text-center space-y-10 border border-[#fabf37]/10 relative z-10"
        >
          <div className="size-32 bg-[#fabf37] rounded-[40px] flex items-center justify-center text-black mx-auto shadow-[0_0_50px_rgba(250,191,55,0.4)] rotate-12">
            <CheckCircle2 className="size-16" />
          </div>
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white leading-tight">
              {t("bulk_order_almost")} <br /> <span className="text-[#fabf37]">{t("bulk_order_there")}</span>
            </h2>
            <p className="text-zinc-400 font-bold text-lg max-w-sm mx-auto leading-relaxed">
              <span role="status" aria-live="polite">{t(INQUIRY_HANDOFF_BODY)}</span>
            </p>
          </div>
          <button onClick={() => go("home")} className="w-full bg-white text-black px-12 py-6 rounded-full font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-[#fabf37] transition-all">
             {t("bulk_order_back_to_home")}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-40 pb-24 font-['Poppins',sans-serif] text-white selection:bg-[#fabf37] selection:text-black">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-[0.03]">
        <div className="absolute top-[-10%] left-[20%] size-[800px] border border-[#fabf37] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-20 grid lg:grid-cols-2 gap-12 items-end">
             <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="size-2 bg-[#fabf37] rounded-full animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#fabf37]">{t("bulk_order_industrial_procurement_portal")}</span>
                </div>
                <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8]">
                   {t("bulk_order_bulk")} <br /><span className="text-[#fabf37]">{t("bulk_order_orders")}</span>
                </h1>
                <p className="text-zinc-500 font-bold text-lg max-w-md">
                   {t("bulk_order_fill_out_the_b2b_procurement")}
                </p>
             </div>
             <div className="flex flex-col items-end gap-6">
                <div className="aspect-[16/9] w-full max-w-md rounded-[40px] overflow-hidden border border-white/5">
                  <img src={imgPress} alt={t("bulk_order_the_offset_printing_press_at")} loading="lazy" decoding="async" className="size-full object-cover object-center" />
                </div>
                <div className="bg-zinc-900 border border-white/5 p-8 rounded-[40px] flex items-center gap-8 w-full max-w-md">
                   <div className="size-16 bg-[#fabf37]/10 rounded-2xl flex items-center justify-center">
                      <Shield className="size-8 text-[#fabf37]" />
                   </div>
                   <div>
                      <h4 className="text-sm font-black uppercase tracking-widest">{t("bulk_order_enterprise_sla")}</h4>
                      <p className="text-[10px] font-bold text-zinc-500">{t("bulk_order_tier_1_priority_response_guaranteed")}</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-16">
            
            <div className="flex-1 space-y-12">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="bg-zinc-900/40 backdrop-blur-2xl p-10 md:p-16 rounded-[60px] border border-white/5 space-y-16 shadow-2xl"
               >
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <div className="flex items-center gap-3 text-[#fabf37]">
                        <Building2 className="size-6" />
                        <h4 className="text-lg font-black uppercase tracking-widest">{t("bulk_order_business_info")}</h4>
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">{t("auth_modal_company_name")}</label>
                          <input 
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            placeholder={t("bulk_order_e_g_acme_corporation")}
                            className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-6 text-sm font-bold focus:border-[#fabf37] outline-none transition-all placeholder:text-zinc-700"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">{t("bulk_order_business_category")}</label>
                          <select 
                            name="businessType"
                            value={formData.businessType}
                            onChange={handleInputChange}
                            className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-6 text-sm font-bold focus:border-[#fabf37] outline-none transition-all appearance-none cursor-pointer"
                          >
                            <option>{t("corporate")}</option>
                            <option>{t("bulk_order_fmcg_brand")}</option>
                            <option>{t("pharmaceutical")}</option>
                            <option>{t("bulk_order_restaurant_chain")}</option>
                            <option>{t("bulk_order_garments_accessories")}</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">{t("bulk_order_trade_tin_number")}</label>
                          <input 
                            name="tin"
                            value={formData.tin}
                            onChange={handleInputChange}
                            placeholder={t("bulk_order_business_registration_number")}
                            className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-6 text-sm font-bold focus:border-[#fabf37] outline-none transition-all placeholder:text-zinc-700"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="flex items-center gap-3 text-[#fabf37]">
                        <User className="size-6" />
                        <h4 className="text-lg font-black uppercase tracking-widest">{t("bulk_order_contact_point")}</h4>
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">{t("bulk_order_liaison_name")}</label>
                          <input 
                            name="contactPerson"
                            value={formData.contactPerson}
                            onChange={handleInputChange}
                            placeholder={t("bulk_order_procurement_manager")}
                            className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-6 text-sm font-bold focus:border-[#fabf37] outline-none transition-all placeholder:text-zinc-700"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">{t("home_bottom_email")}</label>
                          <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="manager@company.com"
                            className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-6 text-sm font-bold focus:border-[#fabf37] outline-none transition-all placeholder:text-zinc-700"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">{t("home_bottom_phone")}</label>
                          <input 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder={t("bulk_order_880_xxxx_xxxxxx")}
                            className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-6 text-sm font-bold focus:border-[#fabf37] outline-none transition-all placeholder:text-zinc-700"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-12 border-t border-white/5 space-y-12">
                     <div className="space-y-8">
                        <div className="flex items-center gap-3 text-[#fabf37]">
                           <Truck className="size-6" />
                           <h4 className="text-lg font-black uppercase tracking-widest">{t("bulk_order_supply_chain_logic")}</h4>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">{t("bulk_order_shipping_destination")}</label>
                              <textarea 
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                rows={4}
                                placeholder={t("bulk_order_warehouse_or_hq_address")}
                                className="w-full bg-black/60 border border-white/10 rounded-[40px] px-8 py-6 text-sm font-bold focus:border-[#fabf37] outline-none transition-all placeholder:text-zinc-700 resize-none"
                              />
                           </div>
                           <div className="space-y-8">
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-6">{t("bulk_order_expected_timeline")}</label>
                                 <div className="relative">
                                    <input 
                                      type="date"
                                      name="expectedDate"
                                      value={formData.expectedDate}
                                      onChange={handleInputChange}
                                      className="w-full bg-black/60 border border-white/10 rounded-[32px] px-8 py-6 text-sm font-bold focus:border-[#fabf37] outline-none transition-all cursor-pointer"
                                    />
                                    <Calendar className="absolute right-8 top-1/2 -translate-y-1/2 size-5 text-zinc-600 pointer-events-none" />
                                 </div>
                              </div>
                              <div className="bg-[#fabf37] p-8 rounded-[40px] text-black flex gap-4">
                                 <Sparkles className="size-6 shrink-0" />
                                 <div className="space-y-1">
                                    <p className="text-xs font-black uppercase">{t("bulk_order_volume_advantage_active")}</p>
                                    <p className="text-[10px] font-bold opacity-70 leading-tight">{t("bulk_order_by_submitting_this_form_you")}</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>

            <div className="lg:w-[450px] shrink-0 space-y-8">
               <div className="sticky top-40 space-y-8">
                  <div className="bg-white p-12 rounded-[60px] text-black shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-10 opacity-[0.03] rotate-12 group-hover:scale-110 transition-transform">
                        <Factory className="size-64" />
                     </div>

                     <div className="space-y-10 relative z-10">
                        <div className="space-y-2">
                           <h3 className="text-4xl font-black uppercase tracking-tighter leading-none italic underline decoration-[#fabf37] decoration-4 underline-offset-8">{t("bulk_order_final")} <br /> {t("bulk_order_manifest")}</h3>
                           <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{t("bulk_order_protocol_type_b2b_bulk")}</p>
                        </div>

                        <div className="space-y-6">
                           <div className="flex justify-between items-center text-sm font-black border-b border-zinc-100 pb-4">
                              <span className="opacity-40 uppercase tracking-widest text-[10px]">{t("bulk_order_configured_items")}</span>
                              <span>{basket.length} {t("bulk_order_skus")}</span>
                           </div>
                           <div className="flex justify-between items-center text-sm font-black border-b border-zinc-100 pb-4">
                              <span className="opacity-40 uppercase tracking-widest text-[10px]">{t("bulk_order_total_units")}</span>
                              <span>{basket.reduce((acc, curr) => acc + (curr.qty || 0), 0).toLocaleString()} PCS</span>
                           </div>
                        </div>

                        <button 
                          type="button"
                          onClick={(e) => {
                            // Phase A0: no backend yet; hand the request to WhatsApp instead of faking "logged".
                            const root = e.currentTarget.closest("main") ?? document.body;
                            const fields = collectFormFields(root as HTMLElement);
                            if (basket.length) fields["Items"] = basket.map((item: any) => item.name).filter(Boolean).join(", ");
                            openWhatsAppInquiry("Bulk order request", fields);
                            setIsSubmitted(true);
                          }}
                          className="w-full bg-black text-[#fabf37] py-10 rounded-[40px] font-black uppercase tracking-[0.2em] text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-4 group"
                        >
                           {t("bulk_order_transmit_inquiry")} <Send className="size-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        
                     </div>
                  </div>

                  <div className="bg-zinc-900/40 backdrop-blur-xl p-8 rounded-[40px] border border-white/5 space-y-6">
                    <div className="flex items-center gap-4 text-[#fabf37]">
                       <ShieldCheck className="size-6" />
                       <h4 className="text-[10px] font-black uppercase tracking-widest">{t("bulk_order_industrial_privacy")}</h4>
                    </div>
                    <p className="text-[10px] font-bold text-zinc-500 leading-relaxed italic">
                       {t("bulk_order_paperware_respects_trade_secrets_all")}
                    </p>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}