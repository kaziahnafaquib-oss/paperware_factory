import React from "react";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import { useDialogFocus } from "../../hooks/useDialogFocus";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, User, Mail, MessageSquare, ShieldCheck, Factory, Building2, Phone, Hash, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { openWhatsAppInquiry, collectFormFields, INQUIRY_HANDOFF_TITLE, INQUIRY_HANDOFF_BODY } from "../../lib/inquiry";
import { useLanguage } from "../../context/LanguageContext";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmailModal({ isOpen, onClose }: EmailModalProps) {
  const { t } = useLanguage();
  useEscapeKey(isOpen, onClose);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  useDialogFocus(dialogRef, isOpen);
  const [loading, setLoading] = React.useState(false);

  // Phase A0: no backend yet; hand the RFQ to WhatsApp instead of faking "transmitted".
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    openWhatsAppInquiry("Request for quotation", collectFormFields(e.currentTarget));
    toast.info(INQUIRY_HANDOFF_TITLE, { description: INQUIRY_HANDOFF_BODY, duration: 12000 });
    onClose();
  };

  const productCategories = [
    "Paper Cups", "Food Packaging", "Carry Bags", "Office Stationary", "Industrial Boxes", "Specialty Items"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div ref={dialogRef}
          role="dialog" aria-modal="true" aria-label={t("email_modal_request_a_quotation")} className="fixed inset-0 z-[2000] flex items-center justify-center p-4 overflow-y-auto outline-none">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-black border border-white/5 rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] overflow-hidden font-['Poppins',sans-serif] my-auto"
          >
            {/* Header Yellow Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#fabf37]" />

            <div className="p-8 md:p-14 space-y-8 relative z-10">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="size-2 bg-[#fabf37] rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">{t("email_modal_contact_protocol")}</span>
                  </div>
                  <h2 className="text-4xl font-black uppercase tracking-tighter text-white flex flex-wrap gap-x-3 leading-none">
                    {t("email_modal_direct")} <span className="text-[#fabf37]">{t("email_modal_inquiry")}</span>
                  </h2>
                </div>
                <button 
                  onClick={onClose}
                  className="size-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-zinc-500 hover:text-white transition-all shrink-0"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Inquiry Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Personal Info */}
                  <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-zinc-700 group-focus-within:text-[#fabf37] transition-colors" />
                    <input required type="text" placeholder={t("email_modal_your_full_name")} className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-[#fabf37]/30 transition-all placeholder:text-zinc-800" />
                  </div>

                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-zinc-700 group-focus-within:text-[#fabf37] transition-colors" />
                    <input required type="email" placeholder={t("email_modal_corporate_email")} className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-[#fabf37]/30 transition-all placeholder:text-zinc-800" />
                  </div>

                  {/* Corporate Info */}
                  <div className="relative group">
                    <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-zinc-700 group-focus-within:text-[#fabf37] transition-colors" />
                    <input required type="text" placeholder={t("email_modal_company_name")} className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-[#fabf37]/30 transition-all placeholder:text-zinc-800" />
                  </div>

                  <div className="relative group">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-zinc-700 group-focus-within:text-[#fabf37] transition-colors" />
                    <input required type="tel" placeholder={t("email_modal_whatsapp_phone")} className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-[#fabf37]/30 transition-all placeholder:text-zinc-800" />
                  </div>

                  {/* Requirements */}
                  <div className="relative group">
                    <Hash className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-zinc-700 group-focus-within:text-[#fabf37] transition-colors" />
                    <input required type="text" placeholder={t("email_modal_expected_quantity")} className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-[#fabf37]/30 transition-all placeholder:text-zinc-800" />
                  </div>

                  <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-zinc-700 pointer-events-none"><ChevronDown className="size-4" /></div>
                    <select required defaultValue="" className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-[#fabf37]/30 transition-all appearance-none cursor-pointer">
                      <option value="" disabled>{t("email_modal_product_category")}</option>
                      {productCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                </div>

                <div className="relative group">
                  <MessageSquare className="absolute left-5 top-5 size-4 text-zinc-700 group-focus-within:text-[#fabf37] transition-colors" />
                  <textarea required rows={4} placeholder={t("email_modal_your_message_or_rfq_details")} className="w-full bg-zinc-900/50 border border-white/5 rounded-[24px] py-5 pl-14 pr-4 text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-[#fabf37]/30 transition-all placeholder:text-zinc-800 resize-none" />
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#fabf37] text-black py-6 rounded-[24px] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 shadow-[0_20px_40px_-10px_rgba(250,191,55,0.3)]"
                >
                  {loading ? (
                    <div className="size-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      {t("email_modal_transmit_message")}
                      <Send className="size-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Footer Trust Shield */}
              <div className="pt-6 border-t border-white/5 flex items-center gap-4">
                <ShieldCheck className="size-5 text-zinc-700 shrink-0" />
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest italic leading-relaxed">
                  {t("email_modal_your_inquiry_is_protected_by")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}