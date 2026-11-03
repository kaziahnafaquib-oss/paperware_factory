import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, Upload, Printer, HelpCircle, Calendar, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "../../context/LanguageContext";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'order' | 'reorder' | 'quote' | 'support' | null;
}

export function ActionModal({ isOpen, onClose, type }: ActionModalProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  // Form states
  const [orderData, setOrderData] = useState({ product: 'Custom Kraft Boxes', qty: '', date: '', specs: '' });
  const [reorderData, setReorderData] = useState({ qty: '25000', date: '' });
  const [quoteData, setQuoteData] = useState({ product: 'Custom Kraft Boxes', qty: '', date: '', specs: '' });
  const [supportData, setSupportData] = useState({ priority: 'Medium', subject: '', message: '' });

  if (!isOpen || !type) return null;

  const getTitle = () => {
    switch (type) {
      case 'order': return 'New Custom Order';
      case 'reorder': return 'Repeat Previous Order';
      case 'quote': return 'Request Production Quote';
      case 'support': return 'Priority Support Ticket';
      default: return '';
    }
  };

  const getIcon = () => {
      switch (type) {
        case 'order': return <div className="size-3 rounded-full bg-black" />;
        case 'reorder': return <div className="size-3 rounded-full bg-[#fabf37]" />;
        case 'quote': return <div className="size-3 rounded-full bg-zinc-200" />;
        case 'support': return <div className="size-3 rounded-full bg-red-500" />;
      }
  }

  const backdropVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  const modalVariants = {
      hidden: { opacity: 0, scale: 0.8, y: 50 },
      visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
      exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2 } }
  };

  const formItemVariants = {
      hidden: { opacity: 0, x: -10 },
      visible: { opacity: 1, x: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          className="fixed inset-0 bg-white/60 backdrop-blur-[40px] z-[150] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div 
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white rounded-[40px] md:rounded-[60px] shadow-2xl border border-black/5 overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            <div className="p-8 md:p-12 space-y-8">
              <div className="flex items-center justify-between sticky top-0 bg-white z-10 pb-4 border-b border-transparent">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                        {getIcon()}
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{t("action_modal_action_required")}</p>
                    </div>
                  <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">{getTitle()}</h2>
                </div>
                <motion.button 
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose} 
                    className="size-12 rounded-2xl bg-zinc-50 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                >
                  <X className="size-6" />
                </motion.button>
              </div>

              {type === 'order' && (
                <motion.form 
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                    className="space-y-6" 
                    onSubmit={(e) => { e.preventDefault(); toast.success("Order request submitted successfully!", { description: `Order for ${orderData.qty || '0'} ${orderData.product} placed.` }); onClose(); }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={formItemVariants} className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">{t("action_modal_product_type")}</label>
                        <select 
                          value={orderData.product}
                          onChange={(e) => setOrderData({...orderData, product: e.target.value})}
                          className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none appearance-none cursor-pointer transition-all hover:bg-zinc-100"
                        >
                            <option>{t("action_modal_custom_kraft_boxes")}</option>
                            <option>{t("action_modal_premium_coffee_cups")}</option>
                            <option>{t("action_modal_shopping_bags")}</option>
                            <option>{t("action_modal_corrugated_cartons")}</option>
                            <option>{t("action_modal_food_wrappers")}</option>
                        </select>
                    </motion.div>
                     <motion.div variants={formItemVariants} className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">{t("action_modal_quantity")}</label>
                         <input 
                            type="number" 
                            placeholder="5000" 
                            value={orderData.qty}
                            onChange={(e) => setOrderData({...orderData, qty: e.target.value})}
                            className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none transition-all hover:bg-zinc-100" 
                         />
                    </motion.div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={formItemVariants} className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">{t("material")}</label>
                        <select 
                          className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none appearance-none cursor-pointer transition-all hover:bg-zinc-100"
                        >
                            <option>{t("action_modal_recycled_kraft")}</option>
                            <option>{t("action_modal_virgin_pulp")}</option>
                            <option>{t("action_modal_bamboo_fiber")}</option>
                        </select>
                    </motion.div>
                    <motion.div variants={formItemVariants} className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">{t("finish_title")}</label>
                        <select 
                          className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none appearance-none cursor-pointer transition-all hover:bg-zinc-100"
                        >
                            <option>{t("action_modal_matte_lamination")}</option>
                            <option>{t("action_modal_glossy_lamination")}</option>
                            <option>{t("action_modal_uncoated")}</option>
                            <option>{t("action_modal_soft_touch")}</option>
                        </select>
                    </motion.div>
                  </div>

                  <motion.div variants={formItemVariants} className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">{t("action_modal_required_delivery_date")}</label>
                        <div className="relative group">
                            <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-zinc-400 group-focus-within:text-[#fabf37] transition-colors" />
                            <input 
                                type="date" 
                                value={orderData.date}
                                onChange={(e) => setOrderData({...orderData, date: e.target.value})}
                                className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-14 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none transition-all hover:bg-zinc-100" 
                            />
                        </div>
                   </motion.div>
                  <motion.div variants={formItemVariants} className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">{t("action_modal_specifications_attributes")}</label>
                        <textarea 
                            rows={4} 
                            value={orderData.specs}
                            onChange={(e) => setOrderData({...orderData, specs: e.target.value})}
                            placeholder={t("action_modal_describe_dimensions_materials_finish_mat")} 
                            className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-medium text-black focus:ring-2 focus:ring-[#fabf37] outline-none resize-none transition-all hover:bg-zinc-100" 
                        />
                   </motion.div>
                   <motion.div variants={formItemVariants} className="flex items-center justify-between pt-4">
                        <button type="button" className="flex items-center gap-2 text-zinc-400 hover:text-black transition-colors group">
                            <Upload className="size-4 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-widest">{t("action_modal_upload_design_files")}</span>
                        </button>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit" 
                            className="px-8 py-4 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#fabf37] hover:text-black transition-all shadow-lg"
                        >
                            {t("action_modal_submit_order")}
                        </motion.button>
                   </motion.div>
                </motion.form>
              )}

              {type === 'reorder' && (
                  <motion.form 
                      initial="hidden"
                      animate="visible"
                      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                      className="space-y-6" 
                      onSubmit={(e) => { e.preventDefault(); toast.success("Re-order request processed", { description: "Production will start upon confirmation." }); onClose(); }}
                  >
                      <motion.div variants={formItemVariants} className="p-6 bg-zinc-50 rounded-3xl border border-black/5 space-y-4 hover:shadow-md transition-all">
                          <div className="flex items-center justify-between">
                              <p className="text-sm font-black">{t("action_modal_last_order_pw_8821")}</p>
                              <span className="text-[10px] font-bold text-zinc-400">{t("action_modal_oct_24_2024")}</span>
                          </div>
                           <p className="text-zinc-600 text-sm">{t("action_modal_custom_kraft_boxes_standard_finish")}</p>
                      </motion.div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={formItemVariants} className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">{t("action_modal_quantity")}</label>
                             <input 
                                type="number" 
                                value={reorderData.qty}
                                onChange={(e) => setReorderData({...reorderData, qty: e.target.value})}
                                className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none transition-all hover:bg-zinc-100" 
                             />
                        </motion.div>
                        <motion.div variants={formItemVariants} className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">{t("action_modal_delivery_date")}</label>
                             <input 
                                type="date" 
                                value={reorderData.date}
                                onChange={(e) => setReorderData({...reorderData, date: e.target.value})}
                                className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none transition-all hover:bg-zinc-100" 
                             />
                        </motion.div>
                      </div>

                       <motion.button 
                           whileHover={{ scale: 1.02 }}
                           whileTap={{ scale: 0.98 }}
                           type="submit" 
                           className="w-full py-4 bg-[#fabf37] text-black rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[0_10px_20px_-5px_rgba(250,191,55,0.3)] hover:shadow-xl transition-all"
                       >
                           {t("action_modal_confirm_re_order")}
                       </motion.button>
                  </motion.form>
              )}

              {type === 'quote' && (
                   <motion.form 
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                    className="space-y-6" 
                    onSubmit={(e) => { e.preventDefault(); toast.success("Quote request sent to sales team."); onClose(); }}
                   >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={formItemVariants} className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">{t("action_modal_product_interest")}</label>
                            <select 
                                value={quoteData.product}
                                onChange={(e) => setQuoteData({...quoteData, product: e.target.value})}
                                className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none appearance-none cursor-pointer transition-all hover:bg-zinc-100"
                            >
                                <option>{t("action_modal_custom_kraft_boxes")}</option>
                                <option>{t("action_modal_premium_coffee_cups")}</option>
                                <option>{t("action_modal_shopping_bags")}</option>
                                <option>{t("action_modal_corrugated_cartons")}</option>
                                <option>{t("action_modal_other")}</option>
                            </select>
                        </motion.div>
                        <motion.div variants={formItemVariants} className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">{t("action_modal_target_quantity")}</label>
                            <input 
                                type="number" 
                                placeholder="e.g. 10000"
                                value={quoteData.qty}
                                onChange={(e) => setQuoteData({...quoteData, qty: e.target.value})}
                                className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none transition-all hover:bg-zinc-100"
                            />
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={formItemVariants} className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">{t("action_modal_material_preference")}</label>
                            <select 
                                className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none appearance-none cursor-pointer transition-all hover:bg-zinc-100"
                            >
                                <option>{t("action_modal_recycled_kraft")}</option>
                                <option>{t("action_modal_virgin_pulp")}</option>
                                <option>{t("action_modal_bamboo_fiber")}</option>
                                <option>{t("action_modal_food_grade_cardboard")}</option>
                            </select>
                        </motion.div>
                        <motion.div variants={formItemVariants} className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">{t("finish_type")}</label>
                            <select 
                                className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none appearance-none cursor-pointer transition-all hover:bg-zinc-100"
                            >
                                <option>{t("action_modal_standard")}</option>
                                <option>{t("action_modal_matte")}</option>
                                <option>{t("action_modal_glossy")}</option>
                                <option>{t("action_modal_embossed")}</option>
                            </select>
                        </motion.div>
                    </div>
                    
                    <motion.div variants={formItemVariants} className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">{t("action_modal_project_specifications")}</label>
                         <textarea 
                            rows={4} 
                            placeholder={t("action_modal_tell_us_about_dimensions_material")} 
                            value={quoteData.specs}
                            onChange={(e) => setQuoteData({...quoteData, specs: e.target.value})}
                            className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-medium text-black focus:ring-2 focus:ring-[#fabf37] outline-none resize-none transition-all hover:bg-zinc-100" 
                         />
                    </motion.div>
                    
                     <motion.div variants={formItemVariants} className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">{t("action_modal_desired_delivery")}</label>
                        <input 
                            type="date" 
                            value={quoteData.date}
                            onChange={(e) => setQuoteData({...quoteData, date: e.target.value})}
                            className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none transition-all hover:bg-zinc-100"
                        />
                    </motion.div>

                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        className="w-full py-5 bg-black text-white rounded-[28px] text-[10px] font-black uppercase tracking-widest hover:bg-[#fabf37] hover:text-black transition-all shadow-lg"
                    >
                        {t("action_modal_request_custom_quote")}
                    </motion.button>
                   </motion.form>
              )}

              {type === 'support' && (
                  <motion.form 
                      initial="hidden"
                      animate="visible"
                      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                      className="space-y-6" 
                      onSubmit={(e) => { e.preventDefault(); toast.success("Support Ticket Created", { description: "Ticket #TK-NEW has been assigned to your account." }); onClose(); }}
                  >
                      <motion.div variants={formItemVariants} className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">{t("action_modal_priority_level")}</label>
                         <div className="grid grid-cols-4 gap-2">
                             {['Low', 'Medium', 'High', 'Critical'].map((p) => (
                                 <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    key={p}
                                    type="button"
                                    onClick={() => setSupportData({...supportData, priority: p})}
                                    className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${supportData.priority === p ? 'bg-black text-white border-black shadow-md' : 'bg-zinc-50 text-zinc-400 border-transparent hover:bg-zinc-100'}`}
                                 >
                                     {t(p)}
                                 </motion.button>
                             ))}
                         </div>
                      </motion.div>
                      
                      <motion.div variants={formItemVariants} className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">{t("action_modal_subject")}</label>
                           <input 
                              type="text" 
                              placeholder={t("action_modal_brief_description_of_the_issue")}
                              value={supportData.subject}
                              onChange={(e) => setSupportData({...supportData, subject: e.target.value})}
                              className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none transition-all hover:bg-zinc-100"
                           />
                      </motion.div>
                      
                       <motion.div variants={formItemVariants} className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">{t("action_modal_message")}</label>
                           <textarea 
                               rows={4} 
                               placeholder={t("action_modal_describe_your_issue_in_detail")}
                               value={supportData.message}
                               onChange={(e) => setSupportData({...supportData, message: e.target.value})}
                               className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-medium text-black focus:ring-2 focus:ring-[#fabf37] outline-none resize-none transition-all hover:bg-zinc-100"
                           />
                      </motion.div>

                       <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        className="w-full py-5 bg-red-500 text-white rounded-[28px] text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-[0_10px_20px_-5px_rgba(239,68,68,0.3)] hover:shadow-xl"
                       >
                        {t("action_modal_submit_priority_ticket")}
                    </motion.button>
                  </motion.form>
              )}

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}