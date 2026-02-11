import { FormEvent, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Phone, MapPin, ChevronDown,
  Facebook, Instagram, Linkedin, Youtube,
  MessageSquare, Clock, Globe, ShieldCheck,
  ArrowRight, CircleCheck, Terminal
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useChat } from "../context/ChatContext";
import { useSocialMedia } from "../context/SocialMediaContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Card3D, Grid3DBackground, Particle3DField } from "../components/paperware/3d-card";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const slideInLeft = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const float = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const textReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

interface ContactPageProps {
  onFeedbackClick?: () => void;
}

export function ContactPage({ onFeedbackClick }: ContactPageProps) {
  const [submitted, setSubmitted] = useState(false);
  const { t, isRTL } = useLanguage();
  const { openChat } = useChat();
  const { socialLinks, posts: contextPosts } = useSocialMedia();

  const getIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram': return Instagram;
      case 'LinkedIn': return Linkedin;
      case 'Facebook': return Facebook;
      case 'Youtube': return Youtube;
      default: return Globe;
    }
  };

  const getColor = (platform: string) => {
    switch (platform) {
      case 'Instagram': return 'text-pink-500';
      case 'LinkedIn': return 'text-blue-700';
      case 'Facebook': return 'text-blue-600';
      case 'Youtube': return 'text-red-600';
      default: return 'text-zinc-500';
    }
  };

  const socialPosts = contextPosts.map(p => ({
    ...p,
    icon: getIcon(p.platform),
    color: getColor(p.platform)
  }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-[#fdfaf3] min-h-screen selection:bg-[#fabf37] selection:text-black">
      {/* Immersive Industrial Hero */}
      <section className="pb-20 lg:pb-32 relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          {/* Technical Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#fabf3710_1px,transparent_1px),linear-gradient(to_bottom,#fabf3710_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

          {/* Animated "Blueprint" Lines */}
          <motion.div
            animate={{ opacity: [0.1, 0.3, 0.1], height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute left-[20%] w-[1px] bg-[#fabf37] opacity-20"
          />
          <motion.div
            animate={{ opacity: [0.1, 0.3, 0.1], width: ["0%", "100%", "0%"], left: ["0%", "0%", "100%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
            className="absolute top-[40%] h-[1px] bg-[#fabf37] opacity-20"
          />
          <motion.div
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 left-0 w-full h-[1px] bg-[#fabf37]"
          />
          <motion.div
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            className="absolute top-0 left-1/3 w-[1px] h-full bg-[#fabf37]"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-4xl"
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6 lg:mb-8">
                <span className="size-3 rounded-full bg-[#fabf37] animate-ping" />
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-[#fabf37] font-black uppercase tracking-[0.4em] text-[9px] lg:text-[10px]"
                >
                  {t('hero_global_hub')}
                </motion.span>
              </motion.div>
              <h1 className="mt-40 lg:mt-64 text-[32px] md:text-[48px] lg:text-[80px] font-black uppercase tracking-tighter leading-[0.9] lg:leading-[0.85] text-white flex flex-wrap gap-x-4">
                {t('contact_title') && t('contact_title').split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={textReveal}
                    className={i === 2 ? "text-transparent bg-clip-text bg-gradient-to-r from-[#fabf37] to-[#e3d1ae]" : ""}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
              <motion.div variants={fadeInUp} className="mt-8 lg:mt-12 flex flex-wrap gap-3 lg:gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-5 lg:px-6 py-2.5 lg:py-3 bg-zinc-900 border border-zinc-800 rounded-full flex items-center gap-3 cursor-default"
                >
                  <div className="size-2 rounded-full bg-emerald-500" />
                  <span className="text-zinc-400 text-[8px] lg:text-[9px] font-black uppercase tracking-widest">{t('hero_dhaka_site')}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-5 lg:px-6 py-2.5 lg:py-3 bg-zinc-900 border border-zinc-800 rounded-full flex items-center gap-3 cursor-default"
                >
                  <div className="size-2 rounded-full bg-[#fabf37]" />
                  <span className="text-zinc-400 text-[8px] lg:text-[9px] font-black uppercase tracking-widest">{t('hero_export_ready')}</span>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block pb-4"
            >
              <motion.div
                variants={float}
                animate="animate"
                className="w-[300px] h-[300px] rounded-full border-2 border-dashed border-[#fabf37]/30 flex items-center justify-center relative group"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-t-2 border-[#fabf37]"
                />
                <div className="text-center">
                  <p className="text-[#fabf37] text-4xl font-black italic tracking-tighter">99.9%</p>
                  <p className="text-zinc-500 text-[8px] font-black uppercase tracking-[0.2em]">{t('hero_efficiency')}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="container mx-auto px-4 -mt-16 lg:-mt-24 relative z-20 pb-20 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Contact Info - Left */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              whileHover={{ y: -10 }}
              className="bg-white p-8 lg:p-12 rounded-[40px] lg:rounded-[50px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-black/5 space-y-12 lg:space-y-16 relative overflow-hidden"
            >
              {/* Decorative Watermark */}
              <div className="absolute top-[-5%] right-[-5%] text-[80px] lg:text-[150px] font-black text-zinc-50 pointer-events-none select-none italic">Paperware</div>

              <div className="space-y-8 lg:space-y-10 relative z-10">
                <motion.div variants={slideInLeft} whileHover={{ x: 10 }} className="flex items-start gap-6 lg:gap-8 group">
                  <div className="size-12 lg:size-16 rounded-[18px] lg:rounded-[24px] bg-[#fabf37] flex items-center justify-center shrink-0 shadow-lg shadow-[#fabf37]/20 group-hover:rotate-[15deg] transition-all">
                    <MapPin className="size-5 lg:size-7 text-black" />
                  </div>
                  <div className="space-y-4 lg:space-y-6">
                    <div>
                      <h4 className="text-[5px] lg:text-[6px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-1">{t('head_office')}</h4>
                      <p className="font-bold text-[9px] lg:text-[10px] leading-tight text-black">
                        {t('contact_address_office_street')}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[5px] lg:text-[6px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-1">{t('factory_address')}</h4>
                      <p className="font-bold text-[9px] lg:text-[10px] leading-tight text-black">
                        {t('contact_address_factory_street')}
                      </p>
                    </div>
                    <a
                      href="https://goo.gl/maps/VogMNMx6N19ysXdh8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#fabf37] font-black text-[9px] uppercase tracking-widest hover:gap-4 transition-all"
                    >
                      {t('directions')} <ArrowRight className="size-3" />
                    </a>
                  </div>
                </motion.div>

                <motion.div variants={slideInLeft} whileHover={{ x: 10 }} className="flex items-start gap-6 lg:gap-8 group">
                  <div className="size-12 lg:size-16 rounded-[18px] lg:rounded-[24px] bg-black flex items-center justify-center shrink-0 group-hover:rotate-[-15deg] transition-all">
                    <Phone className="size-5 lg:size-7 text-[#fabf37]" />
                  </div>
                  <div>
                    <h4 className="text-[5px] lg:text-[6px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">{t('exec_support')}</h4>
                    <p className="font-black text-[12px] lg:text-[13px] tracking-tight text-black">+09638-011101</p>
                    <div className="flex items-center gap-2 mt-1 lg:mt-2">
                      <span className="size-1 rounded-full bg-emerald-500" />
                      <span className="text-[5px] lg:text-[6px] font-black uppercase text-emerald-600 tracking-widest">{t('contact_available_now')}</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={slideInLeft} whileHover={{ x: 10 }} className="flex items-start gap-6 lg:gap-8 group">
                  <div className="size-12 lg:size-16 rounded-[18px] lg:rounded-[24px] bg-zinc-100 flex items-center justify-center shrink-0 group-hover:bg-[#fabf37] transition-all">
                    <MessageSquare className="size-5 lg:size-7 text-black" />
                  </div>
                  <div>
                    <h4 className="text-[5px] lg:text-[6px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">{t('call_whatsapp')}</h4>
                    <p className="font-black text-[10px] lg:text-[11px] tracking-tight text-black">+880 1901-459110</p>
                  </div>
                </motion.div>

                <motion.div variants={slideInLeft} whileHover={{ x: 10 }} className="flex items-start gap-6 lg:gap-8 group">
                  <div className="size-12 lg:size-16 rounded-[18px] lg:rounded-[24px] bg-zinc-100 flex items-center justify-center shrink-0 group-hover:bg-[#fabf37] transition-all">
                    <Mail className="size-5 lg:size-7 text-black" />
                  </div>
                  <div>
                    <h4 className="text-[5px] lg:text-[6px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">{t('formal_channel')}</h4>
                    <p className="font-bold text-[9px] lg:text-[10px] text-black border-b border-[#fabf37]/30 truncate max-w-[200px] md:max-w-none">paperwarefactory@gmail.com</p>
                  </div>
                </motion.div>
              </div>

              <motion.div variants={fadeInUp} className="pt-8 lg:pt-12 border-t-2 border-dashed border-zinc-100 flex flex-wrap items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-4">
                  <motion.a whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }} href="https://www.facebook.com/paperwarefactory" target="_blank" className="text-[#fabf37] hover:text-black transition-colors">
                    <Facebook className="size-5" />
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }} href="https://www.instagram.com/paperware_factory/" target="_blank" className="text-[#fabf37] hover:text-black transition-colors">
                    <Instagram className="size-5" />
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }} href="https://www.linkedin.com/company/paperwarefactory/?viewAsMember=true" target="_blank" className="text-[#fabf37] hover:text-black transition-colors">
                    <Linkedin className="size-5" />
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }} href="http://tiktok.com/paperwarefactory" target="_blank" className="text-[#fabf37] hover:text-black transition-colors">
                    <Youtube className="size-5" />
                  </motion.a>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="size-5 text-[#fabf37]" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{t('contact_247_support')}</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Quick Action Cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6"
            >
              <motion.a
                href="https://wa.me/8801901459110"
                target="_blank"
                rel="noopener noreferrer"
                variants={scaleIn}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white p-6 lg:p-8 rounded-[30px] lg:rounded-[40px] border-2 border-black flex flex-col justify-between h-40 lg:h-48 shadow-xl cursor-pointer col-span-1 block"
              >
                <MessageSquare className="size-8 lg:size-10 text-black" />
                <div>
                  <p className="text-black font-black text-base lg:text-lg uppercase leading-none mb-1">{t('contact_whatsapp_title')}</p>
                  <p className="text-[6px] lg:text-[7px] font-black uppercase tracking-widest text-black/60">{t('contact_whatsapp_desc')}</p>
                </div>
              </motion.a>

              <motion.a
                href="https://m.me/paperwarefactory"
                target="_blank"
                rel="noopener noreferrer"
                variants={scaleIn}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white p-6 lg:p-8 rounded-[30px] lg:rounded-[40px] border-2 border-[#0084ff] flex flex-col justify-between h-40 lg:h-48 shadow-xl cursor-pointer col-span-1 block relative overflow-hidden group"
              >
                <div className="absolute top-[-20%] right-[-10%] opacity-5 group-hover:opacity-10 transition-opacity">
                  <Facebook className="size-40 text-[#0084ff] rotate-12" />
                </div>
                <Facebook className="size-8 lg:size-10 text-[#0084ff]" />
                <div className="relative z-10">
                  <p className="text-black font-black text-base lg:text-lg uppercase leading-none mb-1">{t('contact_messenger_title')}</p>
                  <p className="text-[6px] lg:text-[7px] font-black uppercase tracking-widest text-zinc-500">{t('contact_messenger_desc')}</p>
                </div>
              </motion.a>

              <motion.button
                variants={scaleIn}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={openChat}
                className="bg-[#fabf37] p-6 lg:p-8 rounded-[30px] lg:rounded-[40px] border-2 border-[#fabf37] flex flex-col justify-between h-40 lg:h-48 shadow-xl cursor-pointer col-span-2 text-left w-full relative overflow-hidden group"
              >
                {/* Breathing Glow Effect */}
                <motion.div
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-white/20 pointer-events-none"
                />

                <div className="absolute top-[-20%] right-[-10%] opacity-10 group-hover:opacity-20 transition-opacity">
                  <MessageSquare className="size-40 text-black rotate-12" />
                </div>

                <div className="flex justify-between items-start relative z-10">
                  <div className="size-10 rounded-full bg-black/10 flex items-center justify-center">
                    <div className="size-2 rounded-full bg-black animate-ping" />
                  </div>
                  <div className="px-3 py-1.5 bg-black/10 rounded-full border border-black/5">
                    <p className="text-[7px] font-black uppercase tracking-widest text-black">{t('contact_online')}</p>
                  </div>
                </div>

                <div className="relative z-10">
                  <p className="text-black font-black text-base lg:text-lg uppercase leading-none mb-1">{t('contact_live_chat_support')}</p>
                  <p className="text-[6px] lg:text-[7px] font-black uppercase tracking-widest text-black/60">{t('contact_talk_to_human')}</p>
                </div>
              </motion.button>

              <motion.div
                variants={fadeInUp}
                className="col-span-2 flex items-center justify-center gap-3 pt-2"
              >
                <div className="flex items-center gap-1.5">
                  <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[8px] font-black uppercase tracking-widest text-zinc-400">{t('contact_response_time')}</p>
                </div>
                <p className="text-[8px] font-black uppercase tracking-widest text-black border-b border-[#fabf37]">{t('contact_response_time_val')}</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Contact Form - Right */}
          <div className="lg:col-span-7">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="bg-white p-8 md:p-12 lg:p-20 rounded-[40px] lg:rounded-[60px] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.15)] border border-black/5 relative overflow-hidden text-[13px]"
            >
              {/* Technical Blueprint Overlay for Form */}
              <motion.div
                animate={{ opacity: [0.03, 0.08, 0.03] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 p-12 opacity-[0.05] pointer-events-none"
              >
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="w-[400px] h-[400px] border border-black rounded-full" />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-[300px] h-[300px] border border-black rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black" />
                <div className="absolute left-1/2 top-0 w-[1px] h-full bg-black" />
              </motion.div>

              <div className="relative z-10 space-y-10 lg:space-y-12">
                <motion.div variants={fadeInUp} className="space-y-4 lg:space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-50 rounded-full border border-zinc-100">
                    <span className="size-2 rounded-full bg-[#fabf37]" />
                    <span className="text-[8px] lg:text-[9px] font-black uppercase tracking-widest text-zinc-500">{t('contact_secure_protocol')}</span>
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter leading-none inline-flex flex-wrap gap-x-2">
                    {t('contact_subtitle') && t('contact_subtitle').split(' ').map((word, i) => (
                      <span key={i} className={i === 1 ? "text-[#fabf37]" : "text-black"}>{word}</span>
                    ))}
                  </h2>
                  <p className="text-zinc-500 font-bold text-sm lg:text-base max-w-md">Our engineering desk is ready to translate your requirements into high-volume reality.</p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    <motion.div variants={fadeInUp} className="space-y-2 lg:space-y-3">
                      <label className="text-[7px] lg:text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">{t('contact_full_name')}</label>
                      <motion.input whileFocus={{ scale: 1.02 }} required className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[20px] lg:rounded-[24px] py-3 lg:py-5 px-6 lg:px-8 font-bold text-xs focus:border-[#fabf37] focus:bg-white outline-none transition-all placeholder:text-zinc-300" placeholder={t('contact_placeholder_name')} />
                    </motion.div>
                    <motion.div variants={fadeInUp} className="space-y-2 lg:space-y-3">
                      <label className="text-[7px] lg:text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">{t('contact_designation')}</label>
                      <motion.input whileFocus={{ scale: 1.02 }} required className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[20px] lg:rounded-[24px] py-3 lg:py-5 px-6 lg:px-8 font-bold text-xs focus:border-[#fabf37] focus:bg-white outline-none transition-all placeholder:text-zinc-300" placeholder={t('contact_placeholder_designation')} />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    <motion.div variants={fadeInUp} className="space-y-2 lg:space-y-3">
                      <label className="text-[7px] lg:text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">{t('contact_company_name')}</label>
                      <motion.input whileFocus={{ scale: 1.02 }} required className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[20px] lg:rounded-[24px] py-3 lg:py-5 px-6 lg:px-8 font-bold text-xs focus:border-[#fabf37] focus:bg-white outline-none transition-all placeholder:text-zinc-300" placeholder={t('contact_placeholder_company')} />
                    </motion.div>
                    <motion.div variants={fadeInUp} className="space-y-2 lg:space-y-3">
                      <label className="text-[7px] lg:text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">{t('contact_mobile')}</label>
                      <motion.input whileFocus={{ scale: 1.02 }} required className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[20px] lg:rounded-[24px] py-3 lg:py-5 px-6 lg:px-8 font-bold text-xs focus:border-[#fabf37] focus:bg-white outline-none transition-all placeholder:text-zinc-300" placeholder={t('contact_placeholder_mobile')} />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    <motion.div variants={fadeInUp} className="space-y-2 lg:space-y-3">
                      <label className="text-[7px] lg:text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">{t('contact_email')}</label>
                      <motion.input whileFocus={{ scale: 1.02 }} required type="email" className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[20px] lg:rounded-[24px] py-3 lg:py-5 px-6 lg:px-8 font-bold text-xs focus:border-[#fabf37] focus:bg-white outline-none transition-all placeholder:text-zinc-300" placeholder={t('contact_placeholder_email')} />
                    </motion.div>
                    <motion.div variants={fadeInUp} className="space-y-2 lg:space-y-3">
                      <label className="text-[7px] lg:text-[8px] font-black uppercase tracking-[0.2em] text-[rgb(144,144,144)] ml-2">{t('contact_city')}</label>
                      <motion.input whileFocus={{ scale: 1.02 }} required className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[20px] lg:rounded-[24px] py-3 lg:py-5 px-6 lg:px-8 font-bold text-xs focus:border-[#fabf37] focus:bg-white outline-none transition-all placeholder:text-zinc-300" placeholder={t('contact_placeholder_city')} />
                    </motion.div>
                  </div>

                  <motion.div variants={fadeInUp} className="space-y-2 lg:space-y-3">
                    <label className="text-[7px] lg:text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">{t('contact_country')}</label>
                    <motion.input whileFocus={{ scale: 1.02 }} required className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[20px] lg:rounded-[24px] py-3 lg:py-5 px-6 lg:px-8 font-bold text-xs focus:border-[#fabf37] focus:bg-white outline-none transition-all placeholder:text-zinc-300" placeholder={t('contact_placeholder_country')} />
                  </motion.div>

                  <motion.div variants={fadeInUp} className="space-y-2 lg:space-y-3">
                    <label className="text-[7px] lg:text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">{t('strategic_req')}</label>
                    <div className="relative group">
                      <motion.select whileFocus={{ scale: 1.02 }} className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[20px] lg:rounded-[24px] py-3 lg:py-5 px-6 lg:px-8 font-bold text-xs focus:border-[#fabf37] focus:bg-white outline-none transition-all appearance-none cursor-pointer">
                        <option>{t('contact_option_manufacturing')}</option>
                        <option>{t('contact_option_sustainability')}</option>
                        <option>{t('contact_option_distribution')}</option>
                        <option>{t('contact_option_design')}</option>
                      </motion.select>
                      <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 size-5 text-zinc-400 pointer-events-none group-hover:text-black transition-colors" />
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="space-y-2 lg:space-y-3">
                    <label className="text-[7px] lg:text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">{t('project_blueprint')}</label>
                    <motion.textarea whileFocus={{ scale: 1.02 }} required rows={5} className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[32px] py-6 px-8 font-bold text-xs focus:border-[#fabf37] focus:bg-white outline-none transition-all resize-none placeholder:text-zinc-300" placeholder={t('contact_placeholder_message')} />
                  </motion.div>

                  <motion.div variants={fadeInUp} className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={submitted}
                      className={`group w-full py-7 rounded-[24px] font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 transition-all relative overflow-hidden ${submitted ? 'bg-emerald-500 text-white' : 'bg-black text-[#fabf37] hover:bg-[#fabf37] hover:text-black shadow-2xl'}`}
                    >
                      {/* Scanning Effect */}
                      {!submitted && (
                        <motion.div
                          animate={{ left: ["-100%", "200%"] }}
                          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "linear" }}
                          className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                        />
                      )}

                      <AnimatePresence mode="wait">
                        {submitted ? (
                          <motion.div
                            key="submitted"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-4"
                          >
                            <CircleCheck className="size-6" /> {t('inquiry_dispatched')}
                          </motion.div>
                        ) : (
                          <motion.div
                            key="initial"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2"
                          >
                            {t('init_connection')} <ArrowRight className="size-4 group-hover:translate-x-2 transition-transform" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 opacity-40">
                    <div className="h-[1px] flex-1 bg-zinc-300" />
                    <span className="text-[6px] font-black uppercase tracking-widest text-zinc-500 whitespace-nowrap">{t('contact_end_transmission')}</span>
                    <div className="h-[1px] flex-1 bg-zinc-300" />
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DIGITAL FOOTPRINT - WHITE GLASSMORPHISM SOCIAL FEED */}
      <section className="container mx-auto px-4 pb-0">
        {/* Scrolling Ticker */}
        <div className="w-full overflow-hidden mb-12 select-none py-4">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#fdfaf3] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#fdfaf3] to-transparent z-10 pointer-events-none" />
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              whileHover={{ animationPlayState: "paused" }}
              className="flex items-center gap-16 whitespace-nowrap w-max hover:[animation-play-state:paused]"
            >
              {[
                "ticker_knock", "ticker_get_touch", "ticker_start_project", "ticker_lets_talk",
                "ticker_global_reach", "contact_247_support", "ticker_instant_reply", "ticker_sustainable_tech",
                "ticker_eco_friendly", "ticker_paperware_factory", "ticker_fast_delivery", "ticker_premium_quality",
                "ticker_bulk_orders", "ticker_custom_design", "ticker_export_ready", "ticker_knock",
                "ticker_get_touch", "ticker_start_project", "ticker_lets_talk", "ticker_global_reach",
                "contact_247_support", "ticker_instant_reply", "ticker_sustainable_tech", "ticker_eco_friendly",
                "ticker_paperware_factory", "ticker_fast_delivery", "ticker_premium_quality", "ticker_bulk_orders",
                "ticker_custom_design", "ticker_export_ready"
              ].map((key, i) => (
                <div key={i} className="flex items-center gap-8 group/ticker cursor-default">
                  <span className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-[rgb(162,162,164)] group-hover/ticker:text-[#fabf37] transition-colors duration-500">
                    {t(key)}
                  </span>
                  <motion.div
                    animate={{ opacity: [1, 0.4, 1], scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="size-4 bg-[#fabf37] rounded-full shadow-[0_0_15px_#fabf37]"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
          className="bg-white/40 backdrop-blur-3xl p-10 md:p-14 rounded-[60px] text-black space-y-12 relative overflow-hidden group border border-black/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)]"
        >
          {/* 3D Background Layers */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
            <Grid3DBackground />
          </div>
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Particle3DField />
          </div>

          {/* Subtle Futuristic Background Elements */}
          <motion.div
            animate={{
              rotateZ: [0, 360],
              y: [-10, 10, -10],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 p-12 opacity-[0.05] pointer-events-none z-0"
          >
            <Globe className="size-80" />
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2, ease: "linear" }}
                  className="size-3 rounded-full border-2 border-[#fabf37] border-dashed"
                />
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">{t('social_connectivity_feed')}</p>
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">{t('social_digital_footprint')}</h2>
              <p className="text-[9px] font-bold text-zinc-400 max-w-md uppercase tracking-widest leading-relaxed">
                {t('social_stream_desc')}
              </p>
            </div>
            <div className="flex gap-4">
              <div className="px-6 py-4 bg-black/5 rounded-[24px] border border-black/5 flex items-center gap-4">
                <div className="flex -space-x-2">
                  <motion.a
                    href={socialLinks.instagram}
                    target="_blank"
                    whileHover={{ scale: 1.2, zIndex: 10, y: -3 }}
                    className="size-8 rounded-full bg-white border-2 border-zinc-100 flex items-center justify-center shadow-sm relative cursor-pointer"
                  >
                    <Instagram className="size-4 text-pink-500" />
                  </motion.a>
                  <motion.a
                    href={socialLinks.facebook}
                    target="_blank"
                    whileHover={{ scale: 1.2, zIndex: 10, y: -3 }}
                    animate={{
                      scale: [1, 1.15, 1],
                      filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut"
                    }}
                    className="size-8 rounded-full bg-white border-2 border-zinc-100 flex items-center justify-center shadow-sm relative cursor-pointer"
                  >
                    <Facebook className="size-4 text-blue-600" />
                  </motion.a>
                  <motion.a
                    href={socialLinks.linkedin}
                    target="_blank"
                    whileHover={{ scale: 1.2, zIndex: 10, y: -3 }}
                    className="size-8 rounded-full bg-white border-2 border-zinc-100 flex items-center justify-center shadow-sm relative cursor-pointer"
                  >
                    <Linkedin className="size-4 text-blue-700" />
                  </motion.a>
                </div>
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                  className="text-[9px] font-black uppercase tracking-widest text-black"
                >
                  {t('social_active_stream')}
                </motion.span>
              </div>
            </div>
          </div>

          {/* Social Feed Ticker */}
          <div className="relative overflow-hidden -mx-10 md:-mx-14">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="flex gap-8 px-10 md:px-14 whitespace-nowrap"
            >
              {[...socialPosts, ...socialPosts, ...socialPosts].map((post, i) => (
                <div key={i} className="py-4">
                  <Card3D intensity={10}>
                    <motion.div
                      whileHover={{ scale: 1.05, z: 50 }}
                      className="w-[340px] md:w-[420px] shrink-0 bg-white/80 backdrop-blur-md border border-black/[0.05] p-6 rounded-[40px] shadow-sm hover:shadow-2xl transition-all duration-500 group/post"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div className="relative h-56 md:h-64 rounded-[30px] overflow-hidden mb-5" style={{ transform: 'translateZ(20px)' }}>
                        <ImageWithFallback
                          src={post.img}
                          alt={post.platform}
                          className="w-full h-full object-cover group-hover/post:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-black text-[8px] font-black tracking-widest flex items-center gap-3 border border-white/20 shadow-lg">
                          <post.icon className={`size-3.5 ${post.color}`} />
                          {post.platform}
                        </div>
                      </div>
                      <div className="space-y-4 px-2" style={{ transform: 'translateZ(10px)' }}>
                        <p className="text-[10px] font-bold text-zinc-600 leading-relaxed whitespace-normal line-clamp-2">
                          {post.captionKey ? t(post.captionKey) : post.caption}
                        </p>
                        <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
                          <span className="text-[8px] font-black uppercase tracking-widest text-[#fabf37]">{post.dateKey ? t(post.dateKey) : post.date}</span>
                          <div className="flex items-center gap-2 text-zinc-400 group-hover/post:text-black transition-colors">
                            <span className="text-[8px] font-black uppercase tracking-widest">{t('social_view_post')}</span>
                            <ArrowRight className="size-4 group-hover/post:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Card3D>
                </div>
              ))}

            </motion.div>
          </div>

          <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40 relative z-10">
            <div className="flex items-center gap-3">
              <Terminal className="size-3.5" />
              <p className="text-[7px] font-black uppercase tracking-[0.4em]">{t('footer_protocol')}</p>
            </div>
            <div className="flex items-center gap-6">
              <p className="text-[7px] font-black uppercase tracking-[0.4em]">{t('footer_media_hub')}</p>
              <div className="flex items-center gap-2">
                <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[7px] font-black uppercase tracking-[0.4em]">{t('footer_net_opt')}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Small Bottom Ticker */}
        <div className="w-full overflow-hidden opacity-80 hover:opacity-100 transition-opacity duration-500 select-none pointer-events-none mt-8 mb-8">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap w-max"
          >
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-12">
                <span className="text-[9px] font-black uppercase tracking-[0.5em]">{t('ticker_paperware_factory')}</span>
                <div className="w-12 h-[1px] bg-black" />
                <span className="text-[9px] font-black uppercase tracking-[0.5em]">{t('ticker_sustainable_mfg')}</span>
                <div className="w-12 h-[1px] bg-black" />
                <span className="text-[9px] font-black uppercase tracking-[0.5em]">{t('ticker_global_quality')}</span>
                <div className="w-12 h-[1px] bg-black" />
                <span className="text-[9px] font-black uppercase tracking-[0.5em]">{t('ticker_dhaka_loc')}</span>
                <div className="w-12 h-[1px] bg-black" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
