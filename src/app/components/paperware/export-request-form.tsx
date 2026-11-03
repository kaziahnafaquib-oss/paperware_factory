import React, { useState, useEffect } from "react";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import { useDialogFocus } from "../../hooks/useDialogFocus";
import { mailtoUrl, openWhatsAppInquiry, collectFormFields, INQUIRY_HANDOFF_TITLE, INQUIRY_HANDOFF_BODY } from "../../lib/inquiry";
import { motion, AnimatePresence } from "motion/react";
import { X, Globe, Ship, Plane, Box, ArrowRight, ShieldCheck, CircleCheck, Phone, Mail, MessageCircle, Facebook, Instagram, Linkedin, Twitter, Plus, Trash2, Upload } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface ExportRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportRequestForm({ isOpen, onClose }: ExportRequestFormProps) {
  const { t } = useLanguage();
  useEscapeKey(isOpen, onClose);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  useDialogFocus(dialogRef, isOpen);
  const [contactNumbers, setContactNumbers] = useState([{ number: '', apps: [] as string[] }]);
  const [emails, setEmails] = useState(['']);
  const [mailHref, setMailHref] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const addContactNumber = () => {
    if (contactNumbers.length < 3) {
      setContactNumbers([...contactNumbers, { number: '', apps: [] }]);
    }
  };

  const removeContactNumber = (index: number) => {
    const newNumbers = contactNumbers.filter((_, i) => i !== index);
    setContactNumbers(newNumbers);
  };

  const updateContactNumber = (index: number, value: string) => {
    const newNumbers = [...contactNumbers];
    newNumbers[index].number = value;
    setContactNumbers(newNumbers);
  };

  const toggleAppForContact = (index: number, app: string) => {
    const newNumbers = [...contactNumbers];
    const currentApps = newNumbers[index].apps;
    if (currentApps.includes(app)) {
      newNumbers[index].apps = currentApps.filter(a => a !== app);
    } else {
      newNumbers[index].apps = [...currentApps, app];
    }
    setContactNumbers(newNumbers);
  };

  const addEmail = () => {
    if (emails.length < 3) {
      setEmails([...emails, '']);
    }
  };

  const removeEmail = (index: number) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
  };

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  // Phase A0: no backend yet; hand the request to WhatsApp instead of faking "received".
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fields = collectFormFields(e.currentTarget);
    if (attachment) fields["Attachment"] = `${attachment.name} (I will send this file in the chat)`;
    openWhatsAppInquiry("Export inquiry", fields);
    setMailHref(mailtoUrl("Export inquiry", fields));
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        ref={dialogRef}
          role="dialog"
        aria-modal="true"
        aria-label={t("export_request_form_export_inquiry")}
        className="fixed inset-0 z-[9999] flex justify-center items-start md:items-center bg-black/80 backdrop-blur-xl overflow-y-auto py-4 md:py-8"
        style={{ paddingTop: "max(env(safe-area-inset-top), 1rem)" }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#fdfaf3] w-full max-w-5xl rounded-[24px] md:rounded-[40px] shadow-2xl relative flex flex-col md:flex-row m-2 md:m-6 max-h-[85vh] md:max-h-[85vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 md:top-6 md:right-6 z-50 p-2 md:p-3 bg-black text-white rounded-full hover:rotate-90 transition-transform"
          >
            <X className="size-4 md:size-5" />
          </button>

          {isSubmitted ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-12 text-center space-y-4 md:space-y-6">
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="size-24 bg-[#fabf37] rounded-full flex items-center justify-center"
              >
                <CircleCheck className="size-12 text-black" />
              </motion.div>
              <h2 className="text-2xl font-black uppercase tracking-tighter">{t(INQUIRY_HANDOFF_TITLE)}</h2>
              <p role="status" aria-live="polite" className="text-zinc-600 font-bold max-w-md text-sm">
                {t(INQUIRY_HANDOFF_BODY)}
              </p>
              <a href={mailHref} className="text-sm font-bold text-black underline underline-offset-4">{t("export_request_form_send_by_email_instead")}</a>
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-black text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform"
              >
                {t("export_request_form_close_window")}
              </button>
            </div>
          ) : (
            <>
              {/* Left Side: Info */}
              <div className="md:w-1/3 bg-black p-8 text-white flex flex-col justify-between">
                <div className="space-y-6">
                  <motion.div 
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-[#fabf37] rounded-full text-black"
                  >
                    <Globe className="size-3" />
                    <span className="text-[8px] font-black uppercase tracking-widest">{t("export_request_form_global_export")}</span>
                  </motion.div>
                  <h2 className="text-xl font-black uppercase tracking-tighter leading-none">
                    {t("export_request_form_initialize")} <br /> <span className="text-[#fabf37]">{t("export_request_form_cargo")}</span> {t("export_request_form_request")}
                  </h2>
                  <p className="text-zinc-400 text-[10px] font-bold leading-relaxed">
                    {t("export_request_form_connect_with_our_logistics_ai")}
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CircleCheck className="text-[#fabf37] size-4" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">{t("export_request_form_24h_quote_response")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CircleCheck className="text-[#fabf37] size-4" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">{t("export_request_form_direct_port_access")}</span>
                    </div>
                  </div>

                  <div className="w-full h-px bg-white/10" />

                  <div className="space-y-3">
                    <a 
                      href="tel:+09638011101"
                      className="flex items-center gap-4 group cursor-pointer"
                    >
                      <div className="size-8 bg-black border border-zinc-800 rounded-2xl flex items-center justify-center group-hover:border-[#fabf37] transition-colors">
                        <Phone className="text-[#fabf37] size-3" />
                      </div>
                      <div>
                        <p className="text-[7px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-0.5">{t("exec_support")}</p>
                        <div className="flex items-center gap-2">
                          <p className="font-black text-white group-hover:text-[#fabf37] transition-colors leading-none text-[10px]">+09638-011101</p>
                          <motion.span 
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                            className="text-[8px] font-black text-[#fabf37] bg-[#fabf37]/20 px-1.5 py-0.5 rounded-full"
                          >
                            24/7
                          </motion.span>
                        </div>
                      </div>
                    </a>

                    <a 
                      href="https://wa.me/8801901459110"
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="flex items-center gap-4 group cursor-pointer"
                    >
                      <div className="size-8 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                        <MessageCircle className="text-black size-3" />
                      </div>
                      <div>
                        <p className="text-[7px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-0.5">{t("contact_menu_whatsapp")}</p>
                        <div className="flex items-center gap-2">
                          <p className="font-black text-white group-hover:text-[#fabf37] transition-colors leading-none text-[10px]">+880 1901-459110</p>
                          <motion.span 
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                            className="text-[8px] font-black text-[#fabf37] bg-[#fabf37]/20 px-1.5 py-0.5 rounded-full"
                          >
                            24/7
                          </motion.span>
                        </div>
                      </div>
                    </a>

                    <a 
                      href="mailto:paperwarefactory@gmail.com"
                      className="flex items-center gap-4 group cursor-pointer"
                    >
                      <div className="size-8 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Mail className="text-black size-3" />
                      </div>
                      <div>
                        <p className="text-[7px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-0.5">{t("formal_channel")}</p>
                        <p className="text-[8px] font-black text-white group-hover:text-[#fabf37] transition-colors break-all">paperwarefactory@gmail.com</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="flex-1 p-8 md:p-10 overflow-y-auto custom-scrollbar relative">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Row 1: Company & Email */}
                  <div className="grid md:grid-cols-2 gap-6 items-start">
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">{t("auth_modal_company_name")}</label>
                      <input 
                        type="text" 
                        required
                        placeholder={t("export_request_form_global_corp_inc")}
                        className="w-full bg-transparent border-b border-zinc-200 py-2 font-black text-xs outline-none focus:border-[#fabf37] transition-colors text-black"
                      />
                    </div>
                    
                    {/* Emails Section */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">{t("export_request_form_email_address")}</label>
                        {emails.length < 3 && (
                          <button type="button" onClick={addEmail} className="text-[8px] font-bold text-[#fabf37] hover:underline flex items-center gap-1">
                            <Plus className="size-3" /> {t("export_request_form_add")}
                          </button>
                        )}
                      </div>
                      <div className="space-y-2">
                        {emails.map((email, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input 
                              type="email" 
                              required={idx === 0}
                              value={email}
                              onChange={(e) => updateEmail(idx, e.target.value)}
                              placeholder={t(idx === 0 ? "Primary Email Address" : "Secondary Email Address")}
                              className="flex-1 bg-transparent border-b border-zinc-200 py-2 font-black text-xs outline-none focus:border-[#fabf37] transition-colors text-black placeholder:text-zinc-300"
                            />
                            {idx > 0 && (
                              <button 
                                type="button" 
                                onClick={() => removeEmail(idx)} 
                                className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Contact & Apps (Combined per number) */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">{t("export_request_form_contact_number_s")}</label>
                      {contactNumbers.length < 3 && (
                        <button type="button" onClick={addContactNumber} className="text-[8px] font-bold text-[#fabf37] hover:underline flex items-center gap-1">
                          <Plus className="size-3" /> {t("export_request_form_add")}
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      {contactNumbers.map((contact, idx) => (
                        <div key={idx} className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100 relative group">
                          {idx > 0 && (
                            <button 
                              type="button" 
                              onClick={() => removeContactNumber(idx)}
                              className="absolute top-4 right-4 text-zinc-300 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          )}
                          <div className="space-y-3">
                            <input 
                              type="tel" 
                              value={contact.number}
                              required={idx === 0}
                              onChange={(e) => updateContactNumber(idx, e.target.value)}
                              placeholder={t(idx === 0 ? "Primary Contact Number" : "Alternative Number")}
                              className="w-full bg-transparent border-b border-zinc-200 py-2 font-black text-xs outline-none focus:border-[#fabf37] transition-colors text-black placeholder:text-zinc-300 pr-8"
                            />
                            <div className="flex flex-wrap gap-2 items-center">
                              <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider mr-2">{t("export_request_form_available_on")}</span>
                              {['WhatsApp', 'Viber', 'IMO', 'Direct Call'].map((app) => (
                                <button
                                  key={app}
                                  type="button"
                                  onClick={() => toggleAppForContact(idx, app)}
                                  className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-wider border transition-all ${
                                    contact.apps.includes(app) 
                                      ? 'bg-black text-white border-black' 
                                      : 'bg-white text-zinc-400 border-zinc-200 hover:border-black hover:text-black'
                                  }`}
                                >
                                  {t(app)}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Row 3: Socials - 2x2 Grid for multiple inputs */}
                  <div className="space-y-2">
                    <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">{t("export_request_form_social_verification_optional")}</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { icon: Facebook, placeholder: "Facebook Profile URL", color: "hover:text-[#1877F2]" },
                        { icon: Instagram, placeholder: "Instagram Handle/URL", color: "hover:text-[#E4405F]" },
                        { icon: Linkedin, placeholder: "LinkedIn Company URL", color: "hover:text-[#0A66C2]" },
                        { icon: Twitter, placeholder: "X (Twitter) Handle", color: "hover:text-black" }
                      ].map((social, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-zinc-50 px-3 py-2.5 rounded-xl border border-zinc-100 focus-within:border-[#fabf37]/50 transition-colors">
                          <social.icon className={`size-3.5 text-zinc-400 ${social.color} transition-colors`} />
                          <div className="h-3 w-[1px] bg-zinc-200" />
                          <input 
                            type="text" 
                            placeholder={t(social.placeholder)}
                            className="flex-1 bg-transparent border-none outline-none text-[10px] font-bold text-black placeholder:text-zinc-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Row 4: Location */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">{t("export_request_form_destination_country")}</label>
                      <select className="w-full bg-transparent border-b border-zinc-200 py-2 font-black text-xs outline-none focus:border-[#fabf37] transition-colors appearance-none text-black">
                        <option>{t("export_request_form_united_kingdom")}</option>
                        <option>{t("export_request_form_united_arab_emirates")}</option>
                        <option>{t("export_request_form_germany")}</option>
                        <option>{t("export_request_form_united_states")}</option>
                        <option>{t("export_request_form_australia")}</option>
                        <option>{t("export_request_form_saudi_arabia")}</option>
                        <option>{t("export_request_form_netherlands")}</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">{t("export_request_form_destination_city_port")}</label>
                      <input 
                        type="text" 
                        required
                        placeholder={t("export_request_form_e_g_london_gateway_jebel")}
                        className="w-full bg-transparent border-b border-zinc-200 py-2 font-black text-xs outline-none focus:border-[#fabf37] transition-colors text-black"
                      />
                    </div>
                  </div>

                  {/* Row 5: Area & Product */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">{t("export_request_form_delivery_area_zip_code")}</label>
                      <input 
                        type="text" 
                        placeholder={t("export_request_form_e_g_e1_6an_industrial")}
                        className="w-full bg-transparent border-b border-zinc-200 py-2 font-black text-xs outline-none focus:border-[#fabf37] transition-colors text-black"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">{t("action_modal_product_type")}</label>
                      <select className="w-full bg-transparent border-b border-zinc-200 py-2 font-black text-xs outline-none focus:border-[#fabf37] transition-colors appearance-none text-black" defaultValue="" required>
                        <option value="" disabled>{t("export_request_form_select_product_type")}</option>
                        
                        <optgroup label={t("export_request_form_paper_cups_accessories")}>
                          <option>{t("export_request_form_paper_cup_all_sizes")}</option>
                          <option>{t("export_request_form_paper_cup_holder")}</option>
                          <option>{t("export_request_form_paper_cup_jacket_sleeve")}</option>
                          <option>{t("export_request_form_paper_cup_carrier")}</option>
                          <option>{t("export_request_form_ice_cream_cup_bowl")}</option>
                        </optgroup>

                        <optgroup label={t("export_request_form_restaurant_food_service")}>
                          <option>{t("export_request_form_burger_box")}</option>
                          <option>{t("export_request_form_pizza_box")}</option>
                          <option>{t("export_request_form_food_box_meal_box")}</option>
                          <option>{t("export_request_form_chowmein_noodle_box")}</option>
                          <option>{t("export_request_form_meat_box")}</option>
                          <option>{t("export_request_form_sandwich_box")}</option>
                          <option>{t("export_request_form_fried_chicken_fries_box")}</option>
                          <option>{t("export_request_form_cake_sweet_box")}</option>
                          <option>{t("export_request_form_shawarma_waffle_box")}</option>
                          <option>{t("export_request_form_ice_cream_cone_wrapper")}</option>
                          <option>{t("export_request_form_sugar_sachet_table_mat")}</option>
                          <option>{t("export_request_form_food_menu")}</option>
                          <option>{t("export_request_form_paper_straws_cutlery")}</option>
                        </optgroup>

                        <optgroup label={t("export_request_form_office_stationery")}>
                          <option>{t("export_request_form_business_card")}</option>
                          <option>{t("export_request_form_envelope_all_sizes")}</option>
                          <option>{t("export_request_form_letterhead_invoice_pad")}</option>
                          <option>{t("export_request_form_money_receipt_delivery_book")}</option>
                          <option>{t("export_request_form_note_book_diary")}</option>
                          <option>{t("export_request_form_file_folder")}</option>
                        </optgroup>

                        <optgroup label={t("export_request_form_marketing_retail_packaging")}>
                          <option>{t("export_request_form_paper_carry_bag")}</option>
                          <option>{t("export_request_form_brochure_catalog_magazine")}</option>
                          <option>{t("export_request_form_flyer_leaflet")}</option>
                          <option>{t("export_request_form_sticker_label")}</option>
                          <option>{t("export_request_form_calendar")}</option>
                          <option>{t("export_request_form_tissue_box")}</option>
                          <option>{t("export_request_form_luxury_gift_box")}</option>
                        </optgroup>

                        <optgroup label={t("export_request_form_pharmaceutical_hospital")}>
                          <option>{t("export_request_form_medicine_box")}</option>
                          <option>{t("export_request_form_medicine_literature")}</option>
                          <option>{t("export_request_form_patient_x_ray_file")}</option>
                          <option>{t("export_request_form_prescription_pad")}</option>
                          <option>{t("export_request_form_report_envelope")}</option>
                        </optgroup>

                        <optgroup label={t("export_request_form_fmcg_garments")}>
                          <option>{t("export_request_form_food_beverage_packaging")}</option>
                          <option>{t("export_request_form_personal_home_care_packaging")}</option>
                          <option>{t("export_request_form_confectionary_packaging")}</option>
                          <option>{t("export_request_form_garment_hangtag")}</option>
                          <option>{t("export_request_form_clothing_label")}</option>
                          <option>{t("export_request_form_apparel_box")}</option>
                        </optgroup>

                        <option value="custom">{t("export_request_form_other_custom_request")}</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 6: Quantity */}
                  <div className="space-y-1.5">
                     <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">{t("export_request_form_est_quantity_units")}</label>
                     <input 
                       type="number" 
                       placeholder="50,000"
                       className="w-full bg-transparent border-b border-zinc-200 py-2 font-black text-xs outline-none focus:border-[#fabf37] transition-colors text-black"
                     />
                  </div>

                  {/* Certifications */}
                  <div className="space-y-3">
                    <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">{t("export_request_form_required_certifications")}</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { id: 'fsc', label: 'FSC Certified' },
                        { id: 'fda', label: 'FDA Approved' },
                        { id: 'iso', label: 'ISO 9001/14001' },
                        { id: 'brc', label: 'BRCGS Food' },
                      ].map((cert) => (
                        <label key={cert.id} className="flex items-center gap-2 p-3 border border-zinc-200 rounded-xl cursor-pointer hover:bg-zinc-50 transition-colors has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white group">
                          <input type="checkbox" className="sr-only" />
                          <div className="size-3.5 border border-zinc-300 rounded flex items-center justify-center group-has-[:checked]:bg-[#fabf37] group-has-[:checked]:border-[#fabf37]">
                            <CircleCheck className="size-2.5 text-black opacity-0 group-has-[:checked]:opacity-100" />
                          </div>
                          <span className="text-[8px] font-black uppercase tracking-tight text-black group-has-[:checked]:text-white">{t(cert.label)}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">{t("export_request_form_special_requirements_compliance")}</label>
                    <textarea 
                      placeholder={t("export_request_form_mention_fda_iso_specifics_or")}
                      rows={2}
                      className="w-full bg-zinc-100/50 rounded-2xl p-4 font-bold text-[10px] outline-none focus:ring-1 ring-[#fabf37] transition-all text-black"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">{t("export_request_form_product_sample_design_file")}</label>
                    <div className="relative group">
                      <div className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${attachment ? 'border-[#fabf37] bg-[#fabf37]/5' : 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'}`}>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setAttachment(e.target.files[0]);
                            }
                          }}
                          aria-label={t("export_request_form_attach_a_reference_image")}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {attachment ? (
                          <div className="flex flex-col items-center">
                            <div className="size-10 bg-white rounded-xl shadow-sm flex items-center justify-center mb-2 overflow-hidden">
                              <img loading="lazy" decoding="async" src={URL.createObjectURL(attachment)} alt={t("export_request_form_preview")} className="w-full h-full object-cover" />
                            </div>
                            <p className="text-[10px] font-black text-black">{t(attachment.name)}</p>
                            <p className="text-[8px] font-bold text-zinc-400">{(attachment.size / 1024 / 1024).toFixed(2)} MB</p>
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setAttachment(null);
                              }}
                              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:text-red-500 transition-colors z-10"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="size-8 bg-zinc-100 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                              <Upload className="size-4 text-zinc-400" />
                            </div>
                            <p className="text-[10px] font-bold text-zinc-500">{t("export_request_form_click_to_upload_or_drag")}</p>
                            <p className="text-[8px] font-bold text-zinc-400 mt-1">{t("export_request_form_svg_png_jpg_max_10mb")}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-black text-white py-4 rounded-full font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-xl"
                  >
                    {t("export_request_form_send_export_intent")} <ArrowRight className="size-4 text-[#fabf37]" />
                  </button>
                </form>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}