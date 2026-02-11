import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, MapPin, ShoppingBag, Share2, ExternalLink, Eye, Clock, History, Laptop } from "lucide-react";
import { toast } from "sonner";

interface VisitorDetailsModalProps {
  visitor: any;
  onClose: () => void;
  onAddLead: () => void;
  onSync: () => void;
  onBlock: () => void;
}

export function VisitorDetailsModal({ visitor, onClose, onAddLead, onSync, onBlock }: VisitorDetailsModalProps) {
  if (!visitor) return null;

  return (
    <AnimatePresence>
      <div className="fixed top-[130px] inset-x-0 bottom-0 z-[60] flex items-start justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-[#09090b] border border-[#fabf37]/20 rounded-[32px] w-full max-w-2xl overflow-hidden relative z-10 shadow-[0_0_50px_rgba(250,191,55,0.1)] max-h-[85vh] overflow-y-auto custom-scrollbar"
        >
          <div className="bg-[#fabf37] p-8 pb-12 relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
             <div className="relative z-10 flex justify-between items-start">
                <div className="flex items-center gap-4">
                   <div className="size-16 rounded-full bg-black border-4 border-black shadow-xl flex items-center justify-center text-[#fabf37] text-2xl font-black relative">
                      {visitor.name.charAt(0)}
                      <div className="absolute -bottom-1 -right-1 text-lg animate-bounce">{visitor.flag}</div>
                   </div>
                   <div>
                      <h2 className="text-2xl font-black text-black tracking-tight">{visitor.name}</h2>
                      <div className="flex items-center gap-2 mt-1">
                         <span className="px-2 py-0.5 bg-black/10 rounded text-[9px] font-bold text-black uppercase tracking-widest">{visitor.id}</span>
                         <span className="px-2 py-0.5 bg-black text-[#fabf37] rounded text-[9px] font-bold uppercase tracking-widest">{visitor.status}</span>
                      </div>
                   </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 bg-black/10 hover:bg-black/20 rounded-full text-black transition-colors"
                >
                   <X className="size-4" />
                </button>
             </div>
          </div>

          <div className="p-6 -mt-6 bg-[#09090b] rounded-t-[32px] relative z-20">
             <div className="grid grid-cols-2 gap-5">
                {/* Column 1 */}
                <div className="space-y-5">
                   <div className="space-y-3">
                      <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                        <Users className="size-3" /> Personal Information
                      </h4>
                      <div className="bg-zinc-900/50 p-3 rounded-2xl border border-white/5 space-y-3">
                         <div>
                            <p className="text-[9px] text-zinc-500 uppercase font-bold mb-0.5">Full Name</p>
                            <p className="text-sm font-bold text-white tracking-tight">{visitor.name}</p>
                         </div>
                         <div>
                            <p className="text-[9px] text-zinc-500 uppercase font-bold mb-0.5">Date of Birth</p>
                            <p className="text-xs font-bold text-white">{visitor.dob}</p>
                         </div>
                         <div>
                            <p className="text-[9px] text-zinc-500 uppercase font-bold mb-0.5">Gender</p>
                            <p className="text-xs font-bold text-white">Male</p>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-3">
                      <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                        <MapPin className="size-3" /> Location Data
                      </h4>
                      <div className="bg-zinc-900/50 p-3 rounded-2xl border border-white/5 space-y-3">
                         <div>
                            <p className="text-[9px] text-zinc-500 uppercase font-bold mb-0.5">Country</p>
                            <p className="text-sm font-bold text-white flex items-center gap-2 tracking-tight">
                               <span className="text-base">{visitor.flag}</span> {visitor.country}
                            </p>
                         </div>
                         <div>
                            <p className="text-[9px] text-zinc-500 uppercase font-bold mb-0.5">City / Region</p>
                            <p className="text-xs font-bold text-white">New York, NY</p>
                         </div>
                         <div>
                            <p className="text-[9px] text-zinc-500 uppercase font-bold mb-0.5">IP Address</p>
                            <p className="text-xs font-mono font-bold text-zinc-400 tracking-wider">{visitor.ip}</p>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-3">
                      <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                        <ShoppingBag className="size-3" /> Shopping Activity
                      </h4>
                      <div className="bg-zinc-900/50 p-3 rounded-2xl border border-white/5 space-y-3">
                         <div>
                            <p className="text-[9px] text-zinc-500 uppercase font-bold mb-1.5">Basket Items</p>
                            {visitor.basket.length > 0 ? (
                              <div className="flex flex-wrap gap-1.5">
                                {visitor.basket.map((item: string, i: number) => (
                                  <span key={i} className="px-2 py-1 bg-white/5 rounded-lg text-[10px] font-medium text-zinc-300 border border-white/5">{item}</span>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs font-bold text-zinc-600 italic">Empty Basket</p>
                            )}
                         </div>
                         <div>
                            <p className="text-[9px] text-zinc-500 uppercase font-bold mb-0.5">Quotations</p>
                            {visitor.quotation ? (
                              <p className="text-xs font-bold text-[#fabf37] mt-0.5">{visitor.quotation}</p>
                            ) : (
                              <p className="text-xs font-bold text-zinc-600 italic">None Requested</p>
                            )}
                         </div>
                      </div>
                   </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-5">
                   <div className="space-y-3">
                      <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                        <Share2 className="size-3" /> Contact Details
                      </h4>
                      <div className="bg-zinc-900/50 p-3 rounded-2xl border border-white/5 space-y-3 relative">
                         <div className="absolute top-3 right-3">
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toast.success(`Offer sent to ${visitor.email}`);
                              }}
                              className="relative z-10 cursor-pointer px-2 py-1 bg-[#fabf37] hover:bg-[#fabf37]/90 rounded-md text-[9px] font-black uppercase tracking-widest text-black transition-colors"
                            >
                              Send Offer
                            </button>
                         </div>
                         <div className="group cursor-pointer">
                            <p className="text-[9px] text-[#fabf37] uppercase font-bold mb-0.5">Email Address</p>
                            <p className="text-xs font-bold text-white flex items-center gap-2">
                               {visitor.email} <ExternalLink className="size-3 opacity-50" />
                            </p>
                         </div>
                         <div className="group cursor-pointer">
                            <p className="text-[9px] text-zinc-500 uppercase font-bold mb-0.5">WhatsApp</p>
                            <p className="text-xs font-bold text-white flex items-center gap-2">
                               {visitor.whatsapp}
                            </p>
                         </div>
                         <div className="group cursor-pointer">
                            <p className="text-[9px] text-zinc-500 uppercase font-bold mb-0.5">Mobile Number</p>
                            <p className="text-xs font-bold text-white flex items-center gap-2">
                               {visitor.mobile}
                            </p>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-3">
                      <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                        <Eye className="size-3" /> Visit Intelligence
                      </h4>
                      <div className="bg-zinc-900/50 p-3 rounded-2xl border border-white/5 space-y-3">
                         <div>
                            <p className="text-[9px] text-zinc-500 uppercase font-bold mb-0.5">Top Page</p>
                            <p className="text-sm font-bold text-white font-mono tracking-tight">{visitor.topPage}</p>
                         </div>
                         <div className="grid grid-cols-2 gap-3">
                           <div>
                              <p className="text-[9px] text-zinc-500 uppercase font-bold mb-0.5">Time In</p>
                              <p className="text-xs font-bold text-white flex items-center gap-2">
                                <Clock className="size-3 text-zinc-500" /> {visitor.visitTimeIn}
                              </p>
                           </div>
                           <div>
                              <p className="text-[9px] text-zinc-500 uppercase font-bold mb-0.5">Time Out</p>
                              <p className="text-xs font-bold text-white flex items-center gap-2">
                                <History className="size-3 text-zinc-500" /> {visitor.visitTimeOut}
                              </p>
                           </div>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-3">
                      <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                        <Laptop className="size-3" /> Technical Info
                      </h4>
                      <div className="bg-zinc-900/50 p-3 rounded-2xl border border-white/5 space-y-3">
                         <div>
                            <p className="text-[9px] text-zinc-500 uppercase font-bold mb-0.5">Device Type</p>
                            <p className="text-sm font-bold text-white tracking-tight">{visitor.device}</p>
                         </div>
                         <div>
                            <p className="text-[9px] text-zinc-500 uppercase font-bold mb-0.5">Browser</p>
                            <p className="text-xs font-bold text-white">Chrome 120.0.0</p>
                         </div>
                         <div>
                            <p className="text-[9px] text-zinc-500 uppercase font-bold mb-0.5">OS</p>
                            <p className="text-sm font-bold text-white tracking-tight">Windows 11</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="mt-8 flex justify-between items-center">
                <p className="text-[12px] text-zinc-500 font-medium">Last seen: <span className="text-zinc-300">Just now</span></p>
                <div className="flex gap-3 relative z-10">
                   <button 
                     type="button"
                     className="px-5 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-colors cursor-pointer"
                     onClick={onBlock}
                   >
                      Block IP
                   </button>
                   <button 
                     type="button"
                     className="px-5 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-colors cursor-pointer"
                     onClick={onAddLead}
                   >
                      Add as Lead
                   </button>
                   <button 
                     type="button"
                     className="px-5 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-colors cursor-pointer"
                     onClick={onSync}
                   >
                      Sync ERPNext
                   </button>
                   <button 
                     type="button"
                     className="px-5 py-3 bg-[#fabf37] hover:bg-[#fabf37]/90 rounded-xl text-[10px] font-black uppercase tracking-widest text-black transition-colors cursor-pointer"
                     onClick={() => toast.success("Visitor data exported to CSV")}
                   >
                      Export Data
                   </button>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}