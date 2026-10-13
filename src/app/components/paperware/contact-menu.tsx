import React, { useState } from "react";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Bot, X, Headphones } from "lucide-react";
import { useChat } from "../../context/ChatContext";

export const ContactMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEscapeKey(isOpen, () => setIsOpen(false));
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const { toggleChat } = useChat();
  const phoneNumber = "+8801901459110";
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\+/g, '')}`;

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -20;
    const rotateYValue = ((x - centerX) / centerX) * 20;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleWhatsApp = () => {
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const handleAIChat = () => {
    toggleChat();
    setIsOpen(false);
  };

  return (
    <>
      {/* Main Toggle Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-24 md:bottom-8 right-6 z-[1000000]"
        style={{ perspective: "1000px" }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{ rotateX, rotateY, rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          className={`group relative flex items-center justify-center size-14 rounded-full shadow-lg transition-all duration-300 ${isOpen ? 'bg-black text-white' : 'bg-[#fabf37] text-black'
            }`}
          style={{
            transformStyle: "preserve-3d",
            boxShadow: isOpen
              ? "0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(250, 191, 55, 0.3)"
              : "0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(250, 191, 55, 0.2)"
          }}
        >
          {isOpen ? (
            <X className="size-6" />
          ) : (
            <Headphones className="size-6 group-hover:scale-110 transition-transform" />
          )}

          {/* Pulse Animation */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-[#fabf37] animate-ping opacity-20 pointer-events-none" />
          )}

          {/* Tooltip */}
          {!isOpen && (
            <span className="absolute bottom-full mb-3 px-3 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#fabf37]/20">
              Support
            </span>
          )}
        </motion.button>
      </motion.div>

      {/* Popup Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[999999]"
            />

            {/* Menu Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-32 md:bottom-24 right-4 z-[1000000] w-[280px]"
            >
              {/* Card with gradient background */}
              <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-black rounded-[40px] p-6 shadow-2xl border border-white/10 relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#fabf37]/10 via-transparent to-transparent pointer-events-none" />

                {/* Header */}
                <div className="mb-6 relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-400">Online Now</span>
                  </div>
                  <h3 className="font-black uppercase tracking-tight text-white leading-none mb-1 text-[16px]">Get in Touch</h3>
                  <p className="text-xs font-semibold text-zinc-400">Choose your preferred channel</p>
                </div>

                {/* Options - Vertical Stack */}
                <div className="space-y-3 relative z-10">
                  {/* WhatsApp Option */}
                  <motion.button
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleWhatsApp}
                    className="w-full bg-gradient-to-r from-[#25D366] to-[#20BA5A] text-white p-4 rounded-[24px] flex items-center gap-3 transition-all shadow-lg hover:shadow-[#25D366]/20 group"
                  >
                    <div className="size-12 rounded-[18px] bg-white/20 flex items-center justify-center shrink-0">
                      <MessageCircle className="size-6" strokeWidth={2.5} fill="currentColor" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-black uppercase tracking-tight leading-none mb-1 text-[12px]">WhatsApp</p>
                      <p className="text-[9px] font-bold opacity-90 leading-none">Direct messaging</p>
                    </div>
                    <div className="size-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <MessageCircle className="size-4" />
                    </div>
                  </motion.button>

                  {/* AI Chat Option */}
                  <motion.button
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAIChat}
                    className="w-full bg-gradient-to-r from-[#fabf37] to-[#fac95a] text-black p-4 rounded-[24px] flex items-center gap-3 transition-all shadow-lg hover:shadow-[#fabf37]/20 group"
                  >
                    <div className="size-12 rounded-[18px] bg-black/10 flex items-center justify-center shrink-0">
                      <Bot className="size-6" strokeWidth={2.5} />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-black uppercase tracking-tight leading-none mb-1 text-[12px]">AI Assistant</p>
                      <p className="text-[8px] font-bold opacity-70 leading-none">Instant responses</p>
                    </div>
                    <div className="size-8 rounded-full bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bot className="size-4" />
                    </div>
                  </motion.button>
                </div>

                {/* Footer */}
                <div className="mt-5 pt-5 border-t border-white/10 relative z-10">
                  <div className="flex items-center justify-center gap-2">
                    <div className="size-1.5 rounded-full bg-[#fabf37]" />
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Available 24/7</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
