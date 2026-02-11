import { MouseEvent as ReactMouseEvent, useState } from 'react';
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const phoneNumber = "+8801901459110";
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\+/g, '')}`;

  const handleMouseMove = (e: ReactMouseEvent<HTMLButtonElement>) => {
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

  const handleClick = () => {
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-20 md:bottom-6 right-20 z-[9999]"
      style={{ perspective: "1000px" }}
    >
      <motion.button
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        className="group relative flex items-center justify-center size-12 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-[#25D366]/20 transition-all duration-300"
        style={{ 
          transformStyle: "preserve-3d",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(37, 211, 102, 0.2)"
        }}
      >
        {/* WhatsApp Icon */}
        <MessageCircle className="size-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" />
        
        {/* Tooltip */}
        <span className="absolute bottom-full mb-3 px-3 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#25D366]/20">
          WhatsApp Call
          <span className="block text-[8px] text-zinc-400 mt-0.5 normal-case tracking-normal">{phoneNumber}</span>
        </span>

        {/* Pulse Animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
      </motion.button>
    </motion.div>
  );
};