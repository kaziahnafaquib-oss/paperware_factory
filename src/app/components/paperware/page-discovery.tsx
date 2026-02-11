import { useState, useMemo } from 'react';
import { motion } from "framer-motion";
import { Card3D } from "./3d-card";
import {
  ArrowRight, Leaf, Factory, Users,
  ShoppingBag, HelpCircle, Truck, Image,
  ShieldCheck, TrendingUp, Globe, Store,
  Briefcase, Mail, FileText, Settings,
  Box, Layers, Zap, Info, Activity
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const getPages = (t: (key: string) => string) => [
  { id: 'products', title: t('full_catalog'), icon: ShoppingBag, color: 'bg-blue-600' },
  { id: 'manufacturing', title: t('manufacturing_title'), icon: Factory, color: 'bg-orange-600' },
  { id: 'sustainability', title: t('sustainability_title'), icon: Leaf, color: 'bg-green-600' },
  { id: 'clients', title: t('client_stories'), icon: Users, color: 'bg-purple-600' },
  { id: 'gallery', title: t('media_gallery'), icon: Image, color: 'bg-pink-600' },
  { id: 'tracking', title: t('track_order_title'), icon: Truck, color: 'bg-indigo-600' },
  { id: 'career', title: t('careers'), icon: Briefcase, color: 'bg-red-600' },
  { id: 'compliance', title: t('compliance_title'), icon: ShieldCheck, color: 'bg-teal-600' },
  { id: 'export', title: t('global_export'), icon: Globe, color: 'bg-cyan-600' },
  { id: 'investor', title: t('investors'), icon: TrendingUp, color: 'bg-emerald-600' },
  { id: 'franchise', title: t('franchise_title'), icon: Store, color: 'bg-amber-600' },
  { id: 'about', title: t('about_us'), icon: Info, color: 'bg-zinc-600' },
  { id: 'contact', title: t('contact_us'), icon: Mail, color: 'bg-rose-600' },
  { id: 'catalog-3d', title: t('catalog_3d'), icon: Box, color: 'bg-violet-600' },
  { id: 'erp', title: t('erp_system'), icon: Settings, color: 'bg-slate-600' },
  { id: 'factory-live', title: t('live_factory_title'), icon: Activity, color: 'bg-lime-600' },
];

export function PageDiscovery({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t } = useLanguage();
  const [isPaused, setIsPaused] = useState(false);

  const pages = useMemo(() => getPages(t), [t]);

  return (
    <section className="pt-4 pb-4 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 mb-2 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-2"
        >
          <span className="inline-block text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px] bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200 shadow-sm">
            {t('explore_paperware')}
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 drop-shadow-sm">
            {t('discover_more').split(' ')[0]} <span className="text-yellow-500 drop-shadow-sm">{t('discover_more').split(' ')[1] || 'More'}</span>
          </h2>
        </motion.div>
      </div>

      {/* 3D Marquee Stage */}
      <div className="relative py-8 md:py-16 overflow-visible" style={{ perspective: '2000px' }}>
        {/* Left fade to white - hidden on mobile */}
        <div className="hidden md:block absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white via-white/95 to-transparent z-20 pointer-events-none" />
        {/* Right fade to white - hidden on mobile */}
        <div className="hidden md:block absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-white via-white/95 to-transparent z-20 pointer-events-none" />

        <div className="overflow-hidden py-4">
          <motion.div
            animate={isPaused ? {} : { x: ["0%", "-50%"] }}
            transition={{
              duration: 80,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }}
            className="flex gap-4 md:gap-6 pl-4 md:pl-8 min-w-max"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {[...pages, ...pages, ...pages].map((page, idx) => (
              <div key={`${page.id}-${idx}`} className="flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    console.log('Navigating to:', page.id);
                    onNavigate(page.id);
                  }}
                  className="group w-36 h-48 md:w-40 md:h-52 bg-gradient-to-br from-white to-zinc-50 rounded-[1.5rem] p-1 cursor-pointer relative active:scale-95"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: 'perspective(1000px) rotateY(5deg) rotateX(-2deg)',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    boxShadow: '0 10px 30px -5px rgba(0,0,0,0.15), 0 20px 40px -10px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)',
                  }}
                  onTouchStart={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateY(10deg) rotateX(-5deg) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 40px -8px rgba(0,0,0,0.2), 0 30px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.08)';
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateY(5deg) rotateX(-2deg)';
                    e.currentTarget.style.boxShadow = '0 10px 30px -5px rgba(0,0,0,0.15), 0 20px 40px -10px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)';
                  }}
                  onMouseMove={(e) => {
                    if (window.innerWidth < 768) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -18;
                    const rotateY = ((x - centerX) / centerX) * 18;
                    e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px) scale(1.05)`;
                    e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.25), 0 30px 60px -15px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    if (window.innerWidth < 768) return;
                    e.currentTarget.style.transform = 'perspective(1000px) rotateY(5deg) rotateX(-2deg)';
                    e.currentTarget.style.boxShadow = '0 10px 30px -5px rgba(0,0,0,0.15), 0 20px 40px -10px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)';
                  }}
                >
                  {/* Enhanced 3D Glow Layers */}
                  <div className={`absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-30 transition-all duration-700 ${page.color} blur-[50px] pointer-events-none`} style={{ transform: 'translateZ(-20px)' }} />
                  <div className={`absolute inset-0 rounded-2xl opacity-[0.08] group-hover:opacity-[0.18] transition-all duration-700 ${page.color} blur-[40px] pointer-events-none`} style={{ transform: 'translateZ(-10px)' }} />
                  <div className={`absolute inset-2 rounded-2xl opacity-[0.12] group-hover:opacity-[0.25] transition-all duration-700 ${page.color} blur-[25px] pointer-events-none`} style={{ transform: 'translateZ(-5px)' }} />

                  {/* Inner Card with 3D Depth */}
                  <div className="relative h-full bg-white rounded-[1.3rem] overflow-hidden p-3 md:p-4 flex flex-col justify-between z-10" style={{
                    transform: 'translateZ(10px)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06), inset 0 -2px 4px rgba(255,255,255,0.5)'
                  }}>

                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className={`size-8 md:size-9 rounded-xl ${page.color} flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500`} style={{
                        transform: 'translateZ(20px)',
                        boxShadow: '0 8px 16px -4px rgba(0,0,0,0.2), 0 4px 8px -2px rgba(0,0,0,0.1)'
                      }}>
                        <page.icon className={`size-3 md:size-4 text-white`} />
                      </div>
                      <span className="font-mono text-[7px] md:text-[8px] text-zinc-400 bg-zinc-50 border border-zinc-100 px-1.5 py-0.5 rounded-full uppercase tracking-widest group-hover:bg-zinc-900 group-hover:text-white transition-colors" style={{ transform: 'translateZ(15px)' }}>
                        0{idx % pages.length + 1}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-1.5 md:space-y-2" style={{ transform: 'translateZ(15px)' }}>
                      <h3 className="text-base md:text-lg font-black text-zinc-900 leading-[1.1] tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                        {page.title.split(' ').map((word, i) => (
                          <span key={i} className="block text-[13px] md:text-[15px] font-black">{word}</span>
                        ))}
                      </h3>

                      <div className="w-full h-px bg-zinc-300 group-hover:bg-zinc-900 transition-colors duration-500" />

                      <div className="flex items-center justify-between group-hover:pl-1 transition-all duration-300">
                        <span className="text-[9px] md:text-[11px] font-black text-zinc-600 uppercase tracking-[0.15em] group-hover:text-zinc-900 transition-colors">
                          {t('explore_action')}
                        </span>
                        <div className="size-5 md:size-6 rounded-full bg-zinc-900 group-hover:bg-zinc-900 flex items-center justify-center transition-all duration-300 group-hover:scale-125" style={{
                          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                        }}>
                          <ArrowRight className="size-2.5 md:size-3 text-white -rotate-45 group-hover:rotate-0 transition-all duration-500" />
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Decorative Elements with 3D Depth */}
                    <div className={`absolute -bottom-8 -right-8 size-28 rounded-full ${page.color} opacity-10 group-hover:opacity-40 group-hover:scale-150 transition-all duration-700 ease-out pointer-events-none blur-2xl`} style={{ transform: 'translateZ(-15px)' }} />
                    <div className={`absolute -top-6 -left-6 size-20 rounded-full ${page.color} opacity-5 group-hover:opacity-25 group-hover:scale-125 transition-all duration-500 pointer-events-none blur-xl`} style={{ transform: 'translateZ(-10px)' }} />

                    {/* Edge Highlights for Extra Depth */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50" style={{ transform: 'translateZ(12px)' }} />
                    <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white to-transparent opacity-30" style={{ transform: 'translateZ(12px)' }} />
                  </div>
                </button>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}