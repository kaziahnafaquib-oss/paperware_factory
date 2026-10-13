import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { X, Send, Paperclip, Phone, MessageCircle, Star, Mail, Info } from "lucide-react";
import { toast } from "sonner";

export function ManagerCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [rating, setRating] = useState(0);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm Sarah, your dedicated account manager.", sender: "agent", time: "09:00 AM" },
    { id: 2, text: "How can I help you with your supply chain today?", sender: "agent", time: "09:01 AM" }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newMsg = { id: Date.now(), text: inputValue, sender: "user", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setMessages(prev => [...prev, newMsg]);
    setInputValue("");
    
    setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now() + 1, text: "I've received your request and will update you shortly.", sender: "agent", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
    }, 1500);
  };

  return (
    <>
      <div 
        onClick={() => setShowDetails(true)}
        className="bg-[#fabf37]/5 border border-[#fabf37]/20 p-8 rounded-[40px] flex items-center gap-6 group hover:bg-[#fabf37]/10 transition-colors relative overflow-hidden cursor-pointer"
      >
        {/* Decorative background */}
         <div className="absolute top-0 right-0 w-32 h-32 bg-[#fabf37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="size-16 rounded-full overflow-hidden border-2 border-[#fabf37] relative z-10">
          <ImageWithFallback src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&crop=entropy&cs=tinysrgb&fit=max&q=80&w=200" alt="Manager" />
          <div className="absolute bottom-0 right-0 size-3 bg-emerald-500 border-2 border-white rounded-full" />
        </div>
        
        <div className="space-y-1 relative z-10 flex-1">
          <div className="flex justify-between items-start">
            <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-[#fabf37]">Your Manager</p>
                <p className="text-sm font-black text-black">Sarah Jenkins</p>
            </div>
            <Info className="size-4 text-zinc-400 group-hover:text-[#fabf37] transition-colors" />
          </div>
          <div className="flex items-center gap-3 pt-1">
             <button 
                onClick={(e) => { e.stopPropagation(); setIsOpen(true); }} 
                className="text-[9px] font-bold text-zinc-500 underline decoration-[#fabf37] hover:text-black transition-colors flex items-center gap-1"
             >
                <MessageCircle className="size-3" />
                Direct Message
            </button>
           <span className="text-[9px] text-zinc-300">|</span>
           <button 
                onClick={(e) => { e.stopPropagation(); toast.success("Calling Sarah Jenkins..."); }} 
                className="text-[9px] font-bold text-zinc-500 hover:text-black transition-colors flex items-center gap-1"
            >
                <Phone className="size-3" />
                Call Now
            </button>
             <span className="text-[9px] text-zinc-300">|</span>
             <button 
                onClick={(e) => { e.stopPropagation(); window.open('https://wa.me/1234567890', '_blank'); }} 
                className="text-[9px] font-bold text-green-600 hover:text-green-700 transition-colors flex items-center gap-1"
            >
                <MessageCircle className="size-3" />
                WhatsApp
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showDetails && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150] flex items-center justify-center p-4"
                onClick={() => setShowDetails(false)}
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl overflow-hidden relative"
                    onClick={e => e.stopPropagation()}
                >
                    <button onClick={() => setShowDetails(false)} className="absolute top-6 right-6 p-2 bg-zinc-50 rounded-full hover:bg-black hover:text-white transition-all">
                        <X className="size-4" />
                    </button>

                    <div className="flex flex-col items-center text-center space-y-4 mb-8">
                         <div className="size-24 rounded-full overflow-hidden border-4 border-[#fabf37] relative shadow-lg">
                            <ImageWithFallback src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&crop=entropy&cs=tinysrgb&fit=max&q=80&w=200" alt="Manager" />
                        </div>
                        <div>
                             <h3 className="text-2xl font-black uppercase tracking-tight">Sarah Jenkins</h3>
                             <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Senior Account Manager</p>
                        </div>
                        <div className="flex gap-2">
                             <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[9px] font-black uppercase">Online</span>
                             <span className="px-3 py-1 bg-zinc-100 text-zinc-500 rounded-full text-[9px] font-black uppercase">Response: &lt; 5m</span>
                        </div>
                    </div>

                    <div className="space-y-4 mb-8">
                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => { setIsOpen(true); setShowDetails(false); }} className="flex items-center justify-center gap-2 py-4 bg-black text-white rounded-2xl hover:bg-[#fabf37] hover:text-black transition-colors">
                                <MessageCircle className="size-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Chat</span>
                            </button>
                             <button onClick={() => window.open('https://wa.me/1234567890', '_blank')} className="flex items-center justify-center gap-2 py-4 bg-[#25D366] text-white rounded-2xl hover:bg-[#128C7E] transition-colors">
                                <MessageCircle className="size-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">WhatsApp</span>
                            </button>
                        </div>
                         <button className="w-full flex items-center justify-center gap-2 py-4 bg-zinc-50 text-black border border-black/5 rounded-2xl hover:bg-black hover:text-white transition-colors">
                            <Mail className="size-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Email Sarah</span>
                        </button>
                    </div>

                    <div className="bg-zinc-50 rounded-3xl p-6 text-center space-y-3">
                         <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Rate Service Experience</p>
                         <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button 
                                    key={star}
                                    onMouseEnter={() => setRating(star)}
                                    onMouseLeave={() => setRating(rating)}
                                    onClick={() => {
                                        setRating(star);
                                        toast.success("Thank you for your feedback!");
                                    }}
                                    className="transition-transform hover:scale-110"
                                >
                                    <Star className={`size-6 ${star <= rating ? 'fill-[#fabf37] text-[#fabf37]' : 'text-zinc-300'}`} />
                                </button>
                            ))}
                         </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed bottom-4 right-4 md:bottom-10 md:right-10 w-[90vw] md:w-96 h-[500px] bg-white rounded-[32px] shadow-2xl border border-black/5 z-[200] flex flex-col overflow-hidden"
            >
                {/* Header */}
                <div className="p-4 bg-black text-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                         <div className="size-8 rounded-full overflow-hidden border border-white/20">
                            <ImageWithFallback src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&crop=entropy&cs=tinysrgb&fit=max&q=80&w=200" alt="Manager" />
                        </div>
                        <div>
                             <p className="text-xs font-black uppercase tracking-wide">Sarah Jenkins</p>
                             <div className="flex items-center gap-1.5">
                                <div className="size-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                <p className="text-[8px] text-zinc-400 uppercase tracking-widest">Online</p>
                             </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Phone className="size-4" /></button>
                        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="size-4" /></button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 bg-zinc-50 p-4 overflow-y-auto space-y-4">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-2xl text-[11px] font-bold leading-relaxed ${msg.sender === 'user' ? 'bg-black text-white rounded-br-none' : 'bg-white border border-black/5 text-zinc-700 rounded-bl-none shadow-sm'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <form onSubmit={handleSend} className="p-4 bg-white border-t border-zinc-100 flex items-center gap-2">
                    <button type="button" className="p-2 text-zinc-400 hover:text-black"><Paperclip className="size-4" /></button>
                    <input 
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:border-[#fabf37] transition-colors"
                    />
                    <button type="submit" className="p-2 bg-[#fabf37] rounded-xl hover:scale-105 transition-transform"><Send className="size-4 text-black" /></button>
                </form>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
