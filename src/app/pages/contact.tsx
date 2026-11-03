import React from "react";
import imgInspect from "@/assets/factory/operator-inspecting.webp";
import { mediaUrl } from "../components/paperware/factory-clip";
import "../components/paperware/social-strip.css";

const TICKER_WORDS = ["Knock Us Now", "Get In Touch", "Start Project", "Let's Talk", "Global Reach", "24/7 Support", "Instant Reply", "Sustainable Tech", "Eco Friendly", "Paperware Factory", "Fast Delivery", "Premium Quality", "Bulk Orders", "Custom Design", "Export Ready"];
import { openWhatsAppInquiry, mailtoUrl, LOCATIONS, mapEmbedUrl, mapDirectionsUrl, INQUIRY_HANDOFF_TITLE, INQUIRY_HANDOFF_BODY } from "../lib/inquiry";
import { motion, AnimatePresence, MotionConfig, useScroll, useTransform } from "motion/react";
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
  const [submitted, setSubmitted] = React.useState(false);
  const [mailHref, setMailHref] = React.useState("");
  const [locId, setLocId] = React.useState<string>(LOCATIONS[0].id);
  const loc = LOCATIONS.find((l) => l.id === locId) ?? LOCATIONS[0];
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

  // Phase A0: no form backend exists yet, so hand the message to WhatsApp instead of faking "sent".
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "");
    const fields = {
      Name: get("name"),
      Designation: get("designation"),
      Company: get("company"),
      "Phone/WhatsApp": get("phone"),
      Email: get("email"),
      City: get("city"),
      Country: get("country"),
      Requirement: get("requirement"),
      Message: get("message"),
    };
    if (!fields.Name.trim() || !(fields["Phone/WhatsApp"].trim() || fields.Email.trim()) || !fields.Message.trim()) return;
    openWhatsAppInquiry("Contact inquiry", fields);
    setMailHref(mailtoUrl("Contact inquiry", fields));
    setSubmitted(true);
  };

  // Owner (2 Nov 2026): the hero background and headline drift at different speeds while the page scrolls.
  const heroRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(heroProgress, [0, 1], [0, 160]);
  const heroTitleY = useTransform(heroProgress, [0, 1], [0, 60]);
  const heroFade = useTransform(heroProgress, [0, 0.9], [1, 0]);

  return (
    /* Owner (2 Nov 2026): this page keeps its motion even when the OS asks for reduced motion (every loop is decorative, nothing blocks reading). */
    <MotionConfig reducedMotion="never">
    <div className="bg-[#fdfaf3] min-h-screen selection:bg-[#fabf37] selection:text-black">
      {/* Immersive Industrial Hero */}
      <section ref={heroRef} className="pb-20 lg:pb-32 relative overflow-hidden bg-black">
        <motion.div className="absolute inset-0" style={{ y: heroBgY }}>
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
        </motion.div>

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
                  {t("contact_global_enterprise_hub")}
                </motion.span>
              </motion.div>
              <motion.h1 style={{ y: heroTitleY, opacity: heroFade }} className="mt-40 lg:mt-64 text-[32px] md:text-[48px] lg:text-[80px] font-black uppercase tracking-tighter leading-[0.9] lg:leading-[0.85] text-white flex flex-wrap gap-x-4">
                {t('contact_title').split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={textReveal}
                    className={i === 2 ? "text-transparent bg-clip-text bg-gradient-to-r from-[#fabf37] to-[#e3d1ae]" : ""}
                  >
                    {t(word)}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.div variants={fadeInUp} className="mt-8 lg:mt-12 flex flex-wrap gap-3 lg:gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-5 lg:px-6 py-2.5 lg:py-3 bg-zinc-900 border border-zinc-800 rounded-full flex items-center gap-3 cursor-default"
                >
                  <div className="size-2 rounded-full bg-emerald-500" />
                  <span className="text-zinc-400 text-[8px] lg:text-[9px] font-black uppercase tracking-widest">{t("contact_dhaka_core_site")}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-5 lg:px-6 py-2.5 lg:py-3 bg-zinc-900 border border-zinc-800 rounded-full flex items-center gap-3 cursor-default"
                >
                  <div className="size-2 rounded-full bg-[#fabf37]" />
                  <span className="text-zinc-400 text-[8px] lg:text-[9px] font-black uppercase tracking-widest">{t("contact_global_export_ready")}</span>
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
                  <p className="text-[#fabf37] text-4xl font-black italic tracking-tighter">{t("contact_dhaka")}</p>
                  <p className="text-zinc-500 text-[8px] font-black uppercase tracking-[0.2em]">{t("made_in_bangladesh")}</p>
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
              <div aria-hidden="true" className="absolute top-[-5%] right-[-5%] text-[80px] lg:text-[150px] font-black text-zinc-50 pointer-events-none select-none italic">Paperware</div>

              <div className="space-y-8 lg:space-y-10 relative z-10">
                <motion.div variants={slideInLeft} whileHover={{ x: 10 }} className="flex items-start gap-6 lg:gap-8 group">
                  <motion.div animate={{ y: [0, -7, 0], rotate: [0, -4, 4, 0] }} transition={{ duration: 4.7, repeat: Infinity, ease: "easeInOut" }} className="size-12 lg:size-16 rounded-[18px] lg:rounded-[24px] bg-[#fabf37] flex items-center justify-center shrink-0 shadow-lg shadow-[#fabf37]/20 group-hover:rotate-[15deg] transition-all">
                    <MapPin className="size-5 lg:size-7 text-black" />
                  </motion.div>
                  <div className="space-y-4 lg:space-y-6">
                    <div>
                      <h4 className="text-[5px] lg:text-[6px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-1">{t('head_office')}</h4>
                      <p className="font-bold text-[9px] lg:text-[10px] leading-tight text-black">
                        {t("contact_7813_trimohoni_nandipara")} <br />
                        {t("contact_main_road_dhaka")}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[5px] lg:text-[6px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-1">{t('factory_address')}</h4>
                      <p className="font-bold text-[9px] lg:text-[10px] leading-tight text-black">
                        {t("contact_7814_trimohoni_nandipara")} <br />
                        {t("contact_main_road_dhaka")}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[5px] lg:text-[6px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-1">{t("contact_display_centre")}</h4>
                      <p className="font-bold text-[9px] lg:text-[10px] leading-tight text-black">
                        {t("contact_65_begum_bazar")} <br />
                        {t("contact_agrani_bank_lane_dhaka")}
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
                  <motion.div animate={{ y: [0, -7, 0], rotate: [0, -4, 4, 0] }} transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }} className="size-12 lg:size-16 rounded-[18px] lg:rounded-[24px] bg-black flex items-center justify-center shrink-0 group-hover:rotate-[-15deg] transition-all">
                    <Phone className="size-5 lg:size-7 text-[#fabf37]" />
                  </motion.div>
                  <div>
                    <h4 className="text-[5px] lg:text-[6px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">{t('exec_support')}</h4>
                    <p className="font-black text-[12px] lg:text-[13px] tracking-tight text-black">09638011101</p>
                    <div className="flex items-center gap-2 mt-1 lg:mt-2">
                      <span className="size-1 rounded-full bg-emerald-500" />
                      <span className="text-[5px] lg:text-[6px] font-black uppercase text-emerald-600 tracking-widest">{t("featured_products_magazine_available_now")}</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={slideInLeft} whileHover={{ x: 10 }} className="flex items-start gap-6 lg:gap-8 group">
                  <motion.div animate={{ y: [0, -7, 0], rotate: [0, -4, 4, 0] }} transition={{ duration: 6.1, repeat: Infinity, ease: "easeInOut" }} className="size-12 lg:size-16 rounded-[18px] lg:rounded-[24px] bg-zinc-100 flex items-center justify-center shrink-0 group-hover:bg-[#fabf37] transition-all">
                    <MessageSquare className="size-5 lg:size-7 text-black" />
                  </motion.div>
                  <div>
                    <h4 className="text-[5px] lg:text-[6px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">{t('call_whatsapp')}</h4>
                    <p className="font-black text-[10px] lg:text-[11px] tracking-tight text-black">+880 1901-459110</p>
                  </div>
                </motion.div>

                <motion.div variants={slideInLeft} whileHover={{ x: 10 }} className="flex items-start gap-6 lg:gap-8 group">
                  <motion.div animate={{ y: [0, -7, 0], rotate: [0, -4, 4, 0] }} transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }} className="size-12 lg:size-16 rounded-[18px] lg:rounded-[24px] bg-zinc-100 flex items-center justify-center shrink-0 group-hover:bg-[#fabf37] transition-all">
                    <Mail className="size-5 lg:size-7 text-black" />
                  </motion.div>
                  <div>
                    <h4 className="text-[5px] lg:text-[6px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">{t('formal_channel')}</h4>
                    <p className="font-bold text-[9px] lg:text-[10px] text-black border-b border-[#fabf37]/30 truncate max-w-[200px] md:max-w-none">paperwarefactory@gmail.com</p>
                  </div>
                </motion.div>
              </div>

              <motion.div variants={fadeInUp} className="pt-8 lg:pt-12 border-t-2 border-dashed border-zinc-100 flex flex-wrap items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-4">
                  <motion.a whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }} href="https://www.facebook.com/paperwarefactory" target="_blank" rel="noopener noreferrer" aria-label={t("contact_paperware_factory_on_facebook")} className="text-[#fabf37] hover:text-black transition-colors">
                    <Facebook className="size-5" />
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }} href="https://www.instagram.com/paperware_factory/" target="_blank" rel="noopener noreferrer" aria-label={t("contact_paperware_factory_on_instagram")} className="text-[#fabf37] hover:text-black transition-colors">
                    <Instagram className="size-5" />
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }} href="https://www.linkedin.com/company/paperwarefactory/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label={t("contact_paperware_factory_on_linkedin")} className="text-[#fabf37] hover:text-black transition-colors">
                    <Linkedin className="size-5" />
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }} href="https://www.tiktok.com/@paperwarefactory" target="_blank" rel="noopener noreferrer" aria-label={t("contact_paperware_factory_on_tiktok")} className="text-[#fabf37] hover:text-black transition-colors">
                    <Youtube className="size-5" />
                  </motion.a>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="size-5 text-[#fabf37]" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{t("contact_24_7_support")}</p>
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
                  <p className="text-black font-black text-base lg:text-lg uppercase leading-none mb-1">{t("contact_menu_whatsapp")} <br />{t("email_modal_direct")}</p>
                  <p className="text-[6px] lg:text-[7px] font-black uppercase tracking-widest text-black/60">{t("contact_instant_connect")}</p>
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
                  <p className="text-black font-black text-base lg:text-lg uppercase leading-none mb-1">{t("contact_messenger")} <br />{t("manager_card_chat")}</p>
                  <p className="text-[6px] lg:text-[7px] font-black uppercase tracking-widest text-zinc-500">{t("contact_social_connect")}</p>
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
                    <p className="text-[7px] font-black uppercase tracking-widest text-black">{t("manager_card_online")}</p>
                  </div>
                </div>

                <div className="relative z-10">
                  <p className="text-black font-black text-base lg:text-lg uppercase leading-none mb-1">{t("contact_menu_whatsapp")} <br />{t("manager_card_chat")}</p>
                  <p className="text-[6px] lg:text-[7px] font-black uppercase tracking-widest text-black/60">{t("contact_talk_to_our_team")}</p>
                </div>
              </motion.button>

              <motion.div
                variants={fadeInUp}
                className="col-span-2 flex items-center justify-center gap-3 pt-2"
              >
                <div className="flex items-center gap-1.5">
                  <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[8px] font-black uppercase tracking-widest text-zinc-400">{t("contact_response_time")}</p>
                </div>
                <p className="text-[8px] font-black uppercase tracking-widest text-black border-b border-[#fabf37]">{t("contact_2_minutes")}</p>
              </motion.div>
            </motion.div>
            <div className="aspect-[4/3] rounded-[40px] lg:rounded-[50px] overflow-hidden border border-black/5 shadow-xl relative">
              {/* Owner (2 Nov 2026): photo + footage mix — the operator photo shows first, then the floor footage plays over it. */}
              <img src={imgInspect} alt={t("contact_a_paperware_operator_inspecting_a")} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover object-center" />
              <video
                src={mediaUrl("about-floor.mp4")}
                poster={imgInspect}
                className="relative size-full object-cover object-center"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                aria-hidden="true"
              />
            </div>
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
                    <span className="text-[8px] lg:text-[9px] font-black uppercase tracking-widest text-zinc-500">{t("contact_send_an_inquiry")}</span>
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter leading-none">
                    {t(t('contact_subtitle').split(' ')[0])} <br /> <span className="text-[#fabf37]">{t(t('contact_subtitle').split(' ')[1])}</span>
                  </h2>
                  <p className="text-zinc-500 font-bold text-sm lg:text-base max-w-md">{t("contact_our_engineering_desk_is_ready")}</p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    <motion.div variants={fadeInUp} className="space-y-2 lg:space-y-3">
                      <label htmlFor="contact-name" className="text-[7px] lg:text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">{t("contact_full_name")}</label>
                      <motion.input id="contact-name" name="name" whileFocus={{ scale: 1.02 }} required className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[20px] lg:rounded-[24px] py-3 lg:py-5 px-6 lg:px-8 font-bold text-xs focus:border-[#fabf37] focus:bg-white outline-none transition-all placeholder:text-zinc-300" placeholder={t("contact_e_g_john_doe")} />
                    </motion.div>
                    <motion.div variants={fadeInUp} className="space-y-2 lg:space-y-3">
                      <label htmlFor="contact-designation" className="text-[7px] lg:text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">{t("contact_designation")}</label>
                      <motion.input id="contact-designation" name="designation" whileFocus={{ scale: 1.02 }} required className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[20px] lg:rounded-[24px] py-3 lg:py-5 px-6 lg:px-8 font-bold text-xs focus:border-[#fabf37] focus:bg-white outline-none transition-all placeholder:text-zinc-300" placeholder={t("contact_designation")} />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    <motion.div variants={fadeInUp} className="space-y-2 lg:space-y-3">
                      <label htmlFor="contact-company" className="text-[7px] lg:text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">{t("auth_modal_company_name")}</label>
                      <motion.input id="contact-company" name="company" whileFocus={{ scale: 1.02 }} required className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[20px] lg:rounded-[24px] py-3 lg:py-5 px-6 lg:px-8 font-bold text-xs focus:border-[#fabf37] focus:bg-white outline-none transition-all placeholder:text-zinc-300" placeholder={t("auth_modal_company_name")} />
                    </motion.div>
                    <motion.div variants={fadeInUp} className="space-y-2 lg:space-y-3">
                      <label htmlFor="contact-phone" className="text-[7px] lg:text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">{t("contact_whatsapp_or_mobile_number")}</label>
                      <motion.input id="contact-phone" name="phone" type="tel" autoComplete="tel" whileFocus={{ scale: 1.02 }} required className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[20px] lg:rounded-[24px] py-3 lg:py-5 px-6 lg:px-8 font-bold text-xs focus:border-[#fabf37] focus:bg-white outline-none transition-all placeholder:text-zinc-300" placeholder={t("contact_880_1xxx_xxxxxx")} />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    <motion.div variants={fadeInUp} className="space-y-2 lg:space-y-3">
                      <label htmlFor="contact-email" className="text-[7px] lg:text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">{t("home_bottom_email")}</label>
                      <motion.input id="contact-email" name="email" whileFocus={{ scale: 1.02 }} required type="email" className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[20px] lg:rounded-[24px] py-3 lg:py-5 px-6 lg:px-8 font-bold text-xs focus:border-[#fabf37] focus:bg-white outline-none transition-all placeholder:text-zinc-300" placeholder="name@enterprise.com" />
                    </motion.div>
                    <motion.div variants={fadeInUp} className="space-y-2 lg:space-y-3">
                      <label htmlFor="contact-city" className="text-[7px] lg:text-[8px] font-black uppercase tracking-[0.2em] text-[rgb(144,144,144)] ml-2">{t("contact_city")}</label>
                      <motion.input id="contact-city" name="city" whileFocus={{ scale: 1.02 }} required className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[20px] lg:rounded-[24px] py-3 lg:py-5 px-6 lg:px-8 font-bold text-xs focus:border-[#fabf37] focus:bg-white outline-none transition-all placeholder:text-zinc-300" placeholder={t("contact_city")} />
                    </motion.div>
                  </div>

                  <motion.div variants={fadeInUp} className="space-y-2 lg:space-y-3">
                    <label htmlFor="contact-country" className="text-[7px] lg:text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">{t("partnerprogram_country")}</label>
                    <motion.input id="contact-country" name="country" whileFocus={{ scale: 1.02 }} required className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[20px] lg:rounded-[24px] py-3 lg:py-5 px-6 lg:px-8 font-bold text-xs focus:border-[#fabf37] focus:bg-white outline-none transition-all placeholder:text-zinc-300" placeholder={t("partnerprogram_country")} />
                  </motion.div>

                  <motion.div variants={fadeInUp} className="space-y-2 lg:space-y-3">
                    <label htmlFor="contact-requirement" className="text-[7px] lg:text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">{t('strategic_req')}</label>
                    <div className="relative group">
                      <motion.select id="contact-requirement" name="requirement" whileFocus={{ scale: 1.02 }} className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[20px] lg:rounded-[24px] py-3 lg:py-5 px-6 lg:px-8 font-bold text-xs focus:border-[#fabf37] focus:bg-white outline-none transition-all appearance-none cursor-pointer">
                        <option>{t("contact_large_scale_custom_manufacturing")}</option>
                        <option>{t("contact_sustainability_esg_partnership")}</option>
                        <option>{t("contact_global_distribution_inquiry")}</option>
                        <option>{t("contact_technical_product_design")}</option>
                      </motion.select>
                      <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 size-5 text-zinc-400 pointer-events-none group-hover:text-black transition-colors" />
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="space-y-2 lg:space-y-3">
                    <label htmlFor="contact-message" className="text-[7px] lg:text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">{t('project_blueprint')}</label>
                    <motion.textarea id="contact-message" name="message" whileFocus={{ scale: 1.02 }} required rows={5} className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[32px] py-6 px-8 font-bold text-xs focus:border-[#fabf37] focus:bg-white outline-none transition-all resize-none placeholder:text-zinc-300" placeholder={t("contact_describe_your_volume_targets_material")} />
                  </motion.div>

                  <motion.div variants={fadeInUp} className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
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
                            <CircleCheck className="size-6" /> {t("contact_opened_in_whatsapp")}
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

                  {submitted && (
                    <div role="status" aria-live="polite" className="rounded-[20px] border-2 border-[#fabf37] bg-[#fabf37]/10 p-6 space-y-2">
                      <p className="text-sm font-black text-black">{t(INQUIRY_HANDOFF_TITLE)}</p>
                      <p className="text-sm font-medium text-zinc-700 leading-relaxed">{t(INQUIRY_HANDOFF_BODY)}</p>
                      <a href={mailHref} className="inline-block text-sm font-bold text-black underline underline-offset-4">{t("export_request_form_send_by_email_instead")}</a>
                    </div>
                  )}

                  <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 opacity-40">
                    <div className="h-[1px] flex-1 bg-zinc-300" />
                    <span className="text-[6px] font-black uppercase tracking-widest text-zinc-500 whitespace-nowrap">{t("contact_end_transmission")}</span>
                    <div className="h-[1px] flex-1 bg-zinc-300" />
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LOCATION MAP */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="bg-black rounded-[48px] lg:rounded-[60px] p-6 md:p-10 space-y-6 border border-[#fabf37]/20 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2" role="group" aria-label={t("contact_choose_location")}>
              {LOCATIONS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  aria-pressed={l.id === locId}
                  onClick={() => setLocId(l.id)}
                  className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors ${l.id === locId ? "bg-[#fabf37] text-black" : "bg-white/10 text-white hover:bg-white/20"}`}
                >
                  {t(l.label)}
                </button>
              ))}
            </div>
            <a
              href={mapDirectionsUrl(loc.address)}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-[#fabf37] transition-colors"
            >
              {t("contact_get_directions")} <ArrowRight className="size-3" />
            </a>
          </div>
          <p className="text-white/70 text-xs font-bold">{t(loc.address)}</p>
          <div className="rounded-[32px] overflow-hidden bg-zinc-900 aspect-[4/3] md:aspect-[16/7]">
            <iframe
              src={mapEmbedUrl(loc.address)}
              title={t("contact_paperware_factory_location")}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0"
              allowFullScreen
            />
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
            {/* Owner (2 Nov 2026): CSS marquee (not motion.div) so it keeps scrolling under OS "Reduce Motion"; hover pauses. Two copies for a seamless loop. */}
            <div className="pwf-marquee-viewport">
              <div className="pwf-marquee-track flex items-center gap-16 whitespace-nowrap w-max" style={{ "--pwf-marquee-dur": "60s" } as React.CSSProperties}>
                {[0, 1].map((copy) =>
                  TICKER_WORDS.map((text, i) => (
                    <div key={`${copy}-${i}`} className="flex items-center gap-8 group/ticker cursor-default" aria-hidden={copy === 1 ? true : undefined}>
                      <span className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-[rgb(162,162,164)] group-hover/ticker:text-[#fabf37] transition-colors duration-500">
                        {t(text)}
                      </span>
                      <motion.span animate={{ opacity: [1, 0.4, 1], scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="size-4 bg-[#fabf37] rounded-full shadow-[0_0_15px_#fabf37]" />
                    </div>
                  )),
                )}
              </div>
            </div>
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
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">{t("contact_global_connectivity_feed")}</p>
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">{t("contact_social")} <br /> {t("contact_digital_footprint")}</h2>
              <p className="text-[9px] font-bold text-zinc-400 max-w-md uppercase tracking-widest leading-relaxed">
                {t("contact_direct_stream_from_our_enterprise")}
              </p>
            </div>
            <div className="flex gap-4">
              <div className="px-6 py-4 bg-black/5 rounded-[24px] border border-black/5 flex items-center gap-4">
                <div className="flex -space-x-2">
                  <motion.a
                    href={socialLinks.instagram}
                    aria-label={t("contact_paperware_factory_on_instagram")}
                    target="_blank"
                    whileHover={{ scale: 1.2, zIndex: 10, y: -3 }}
                    className="size-8 rounded-full bg-white border-2 border-zinc-100 flex items-center justify-center shadow-sm relative cursor-pointer"
                  >
                    <Instagram className="size-4 text-pink-500" />
                  </motion.a>
                  <motion.a
                    href={socialLinks.facebook}
                    aria-label={t("contact_paperware_factory_on_facebook")}
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
                    aria-label={t("contact_paperware_factory_on_linkedin")}
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
                  {t("contact_follow_us")}
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
                          alt={t(post.platform)}
                          className="w-full h-full object-cover group-hover/post:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-black text-[8px] font-black tracking-widest flex items-center gap-3 border border-white/20 shadow-lg">
                          <post.icon className={`size-3.5 ${post.color}`} />
                          {t(post.platform)}
                        </div>
                      </div>
                      <div className="space-y-4 px-2" style={{ transform: 'translateZ(10px)' }}>
                        <p className="text-[10px] font-bold text-zinc-600 leading-relaxed whitespace-normal line-clamp-2">
                          {t(post.caption)}
                        </p>
                        <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
                          <span className="text-[8px] font-black uppercase tracking-widest text-[#fabf37]">{t(post.date)}</span>
                          <div className="flex items-center gap-2 text-zinc-400 group-hover/post:text-black transition-colors">
                            <span className="text-[8px] font-black uppercase tracking-widest">{t("contact_view_post")}</span>
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
            <div className="flex items-center gap-6">
              <p className="text-[7px] font-black uppercase tracking-[0.4em]">{t("contact_paperware_media_hub")}</p>
              <div className="flex items-center gap-2">
                <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[7px] font-black uppercase tracking-[0.4em]">{t("contact_network_optimized")}</p>
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
                <span className="text-[9px] font-black uppercase tracking-[0.5em]">Paperware Factory</span>
                <div className="w-12 h-[1px] bg-black" />
                <span className="text-[9px] font-black uppercase tracking-[0.5em]">{t("contact_sustainable_manufacturing")}</span>
                <div className="w-12 h-[1px] bg-black" />
                <span className="text-[9px] font-black uppercase tracking-[0.5em]">{t("contact_global_export_quality")}</span>
                <div className="w-12 h-[1px] bg-black" />
                <span className="text-[9px] font-black uppercase tracking-[0.5em]">{t("contact_dhaka_bangladesh")}</span>
                <div className="w-12 h-[1px] bg-black" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
    </MotionConfig>
  );
}
