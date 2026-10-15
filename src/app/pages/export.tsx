import React from "react";
import { motion } from "motion/react";
import { 
  Globe, ShieldCheck, Truck, ChartBar, 
  Map as MapIcon, Box, CircleCheck, 
  ArrowRight, Package as PackageIcon, Ship, Plane, 
  TrendingUp, Activity, Anchor
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ExportIntelligence } from "../components/paperware/export-intelligence";
import { ExportRequestForm } from "../components/paperware/export-request-form";

export function ExportPage() {
  const { t } = useLanguage();
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  return (
    <div className="bg-[#fdfaf3] min-h-screen pt-24 md:pt-32 pb-20 font-['Poppins',sans-serif]">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-32">
        <div className="bg-black rounded-[60px] p-12 md:p-24 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <Globe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[1200px]" />
          </div>

          <div className="relative z-10 max-w-4xl space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 rounded-full border border-zinc-800">
              <div className="size-2 rounded-full bg-[#fabf37] animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#fabf37]">{t('global_export_intel')}</span>
            </div>
            <h1 className="text-[40px] md:text-[72px] font-black uppercase tracking-tighter leading-[0.85]">
              {t('seamless_logistics').split(' ').map((word, i) => (
                <span key={i} style={{ display: 'contents' }}>
                  {word === 'Global' ? <span className="text-[#fabf37]">{word}</span> : word}{' '}
                  {i === 0 && <br />}
                </span>
              ))}
            </h1>
            <p className="text-zinc-400 font-bold md:text-xl max-w-2xl leading-relaxed text-[16px]">
              {t('export_hero_desc')}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => setIsFormOpen(true)}
                className="bg-[#fabf37] text-black px-12 py-6 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl flex items-center gap-4"
              >
                {t('start_export_inquiry')} <ArrowRight className="size-5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* World Map & Export Intelligence Suite */}
      <ExportIntelligence />



      <ExportRequestForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}

function CertCard({ cert, index }: { cert: { title: string, desc: string, Icon: React.FC<{ className: string }> }, index: number }) {
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);
  const [glareX, setGlareX] = React.useState(50);
  const [glareY, setGlareY] = React.useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
    setGlareX((x / rect.width) * 100);
    setGlareY((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlareX(50);
    setGlareY(50);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="group relative"
      style={{ perspective: "1500px" }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
        className="relative bg-zinc-900 p-8 rounded-[40px] border border-zinc-800 hover:border-[#fabf37] transition-colors duration-500 overflow-hidden cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* 3D Glare Effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(250, 191, 55, 0.5) 0%, transparent 60%)`,
          }}
        />

        {/* Background Icon with Depth */}
        <motion.div 
          className="absolute top-0 right-0 p-8 opacity-5"
          style={{ transform: "translateZ(-30px)" }}
          animate={{
            rotate: 360,
            y: [-5, 5, -5],
            x: [5, 10, 5],
          }}
          transition={{
            rotate: {
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            },
            y: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            },
            x: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <cert.Icon className="size-24 text-white" />
        </motion.div>
        
        {/* Icon Badge with Depth */}
        <div 
          className="relative z-10 size-12 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 border border-zinc-700 group-hover:bg-[#fabf37] group-hover:text-black group-hover:border-[#fabf37] transition-all duration-300 group-hover:scale-110"
          style={{ transform: "translateZ(50px)" }}
        >
          <cert.Icon className="size-6 text-[#fabf37] group-hover:text-black transition-colors" />
        </div>
        
        {/* Content with Depth */}
        <div 
          className="relative z-10 space-y-2"
          style={{ transform: "translateZ(40px)" }}
        >
          <h4 className="text-lg font-black uppercase tracking-tight text-white">{cert.title}</h4>
          <p className="text-[11px] font-bold text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">{cert.desc}</p>
        </div>

        {/* 3D Border Glow */}
        <div 
          className="absolute inset-0 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: "0 0 40px rgba(250, 191, 55, 0.3), inset 0 0 20px rgba(250, 191, 55, 0.1)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

function OptimizationCard({ icon: Icon, label, value, delay }: { icon: React.FC<{ className: string }>, label: string, value: string, delay: number }) {
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -15;
    const rotateYValue = ((x - centerX) / centerX) * 15;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: delay }}
      style={{ perspective: "1000px" }}
      className="group"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="p-8 bg-zinc-800 rounded-[40px] border border-white/5 hover:border-[#fabf37]/30 space-y-4 cursor-pointer relative overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* 3D Icon with floating animation */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(40px)" }}
        >
          <Icon className="size-8 text-[#fabf37] group-hover:scale-110 transition-transform" />
        </motion.div>
        
        {/* Content with depth */}
        <div style={{ transform: "translateZ(30px)" }}>
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-zinc-400 transition-colors">{label}</p>
          <p className="text-2xl font-black group-hover:text-[#fabf37] transition-colors">{value}</p>
        </div>

        {/* Glare effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#fabf37]/0 via-[#fabf37]/5 to-[#fabf37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

function CTACard({ onClick, t }: { onClick: () => void, t: (key: string) => string }) {
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      style={{ perspective: "1500px" }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-[#fabf37] p-12 rounded-[50px] text-black space-y-8 shadow-2xl cursor-pointer relative overflow-hidden group"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Animated shine effect */}
        <motion.div
          animate={{ 
            x: ["-200%", "200%"],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
        />

        {/* Icon with depth */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(50px)" }}
        >
          <ChartBar className="size-12 group-hover:scale-110 transition-transform" />
        </motion.div>
        
        {/* Content with depth */}
        <div style={{ transform: "translateZ(40px)" }} className="space-y-4">
          <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">{t('start_global_journey')}</h3>
          <p className="text-sm font-bold opacity-70 italic">{t('export_quote_24h')}</p>
        </div>
        
        {/* Button with depth */}
        <motion.button 
          onClick={onClick}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          style={{ transform: "translateZ(60px)" }}
          className="w-full py-6 bg-black text-white rounded-full font-black uppercase tracking-widest text-sm shadow-2xl relative z-10"
        >
           {t('initialize_export_request')}
        </motion.button>

        {/* 3D shadow effect */}
        <div className="absolute inset-0 rounded-[50px] bg-black/10 blur-xl -z-10" style={{ transform: "translateZ(-20px)" }} />
      </motion.div>
    </motion.div>
  );
}