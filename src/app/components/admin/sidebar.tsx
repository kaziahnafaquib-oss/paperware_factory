import { useState } from 'react';
import {
  LayoutDashboard,
  Box,
  Users,
  Settings,
  ChartBar,
  Truck,
  LogOut,
  X,
  ExternalLink,
  ChevronDown,
  Share2,
  MessageSquare,
  FileText,
  Megaphone,
  Newspaper,
  Mail
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageCode } from "../../lib/translations";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export function AdminSidebar({ activeTab, setActiveTab, onLogout }: SidebarProps) {
  const { language, setLanguage, tone, setTone, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const groups = [
    {
      title: t('core_operations'),
      items: [
        { id: "overview", label: t('control_center'), icon: <LayoutDashboard className="size-5" /> },
        { id: "visitors", label: t('visitor_traffic'), icon: <Users className="size-5" /> },
        { id: "shares", label: t('share_stats'), icon: <Share2 className="size-5" /> },
        { id: "engagement", label: t('user_engagement'), icon: <ChartBar className="size-5" /> },
      ]
    },
    {
      title: t('website_management'),
      items: [
        { id: "seo-command", label: t('seo_command'), icon: <ChartBar className="size-5" /> },
        { id: "performance", label: t('performance'), icon: <ChartBar className="size-5" /> },
        { id: "form-leads", label: t('form_leads'), icon: <FileText className="size-5" /> },
        { id: "blog-manager", label: t('blog_news'), icon: <Newspaper className="size-5" /> },
        { id: "announcements", label: t('announcements'), icon: <Megaphone className="size-5" /> },
        { id: "newsletter", label: t('newsletter_menu'), icon: <Mail className="size-5" /> },
      ]
    },
    {
      title: t('content_media'),
      items: [
        { id: "cms", label: t('website_cms'), icon: <Settings className="size-5" /> },
        { id: "partners-cms", label: t('global_partners'), icon: <Users className="size-5" /> },
        { id: "media", label: t('media_manager'), icon: <Box className="size-5" /> },
        { id: "about-media", label: t('about_media'), icon: <Box className="size-5" /> },
        { id: "brochure-upload", label: t('upload_brochure'), icon: <FileText className="size-5" /> },
        { id: "brochure-stats", label: t('ecatalog_logs'), icon: <ChartBar className="size-5" /> },
      ]
    },
    {
      title: t('system_integrations'),
      items: [
        { id: "erpnext", label: t('erpnext_node'), icon: <Box className="size-5" /> },
        { id: "comm-log", label: t('neural_comm_log'), icon: <MessageSquare className="size-5" /> },
        { id: "neural-sync", label: t('ai_neural_sync'), icon: <Box className="size-5" /> },
        { id: "hosting", label: t('hostinger_panel'), icon: <Box className="size-5" /> },
      ]
    },
    {
      title: t('client_management'),
      items: [
        { id: "clients", label: t('lead_management'), icon: <Users className="size-5" /> },
        { id: "portal", label: t('client_portal'), icon: <Box className="size-5" /> },
        { id: "feedback", label: t('user_feedback'), icon: <Box className="size-5" /> },
      ]
    },
    {
      title: t('digital_assets'),
      items: [
        { id: "products", label: t('product_catalog'), icon: <Box className="size-5" /> },
        { id: "studio", label: t('brand_studio'), icon: <Box className="size-5" /> },
        { id: "attributes", label: t('attributes'), icon: <Box className="size-5" /> },
        { id: "social-media", label: t('social_media'), icon: <Share2 className="size-5" /> },
        { id: "languages", label: t('language_ecosystem'), icon: <Box className="size-5" /> },
      ]
    },
    {
      title: t('corporate'),
      items: [
        { id: "sustainability", label: "Sustainability", icon: <Box className="size-5" /> },
        { id: "careers", label: t('job_postings'), icon: <Box className="size-5" /> },
        { id: "compliance", label: t('security_legal'), icon: <Box className="size-5" /> },
      ]
    }
  ];

  return (
    <div className="w-72 bg-black border-r border-white/10 flex flex-col h-[calc(100vh-6rem)] sticky top-24 mt-24 overflow-y-auto custom-scrollbar relative">
      <div className="px-8 pb-8 pt-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="size-10 bg-[#fabf37] rounded-xl flex items-center justify-center text-black font-black text-xl">
            P
          </div>
          <div>
            <h2 className="text-white font-black uppercase tracking-widest text-sm leading-none">Paperware</h2>
            <p className="text-[10px] font-bold text-[#fabf37] uppercase tracking-[0.2em] mt-1">Admin OS v2.5</p>
          </div>
        </div>

        <div className="space-y-10">
          {groups.map((group) => (
            <div key={group.title} className="space-y-4">
              <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600 px-4">
                {group.title}
              </h3>
              <nav className="space-y-1 relative">
                <AnimatePresence mode="popLayout">
                  {group.items.map((item, idx) => (
                    <motion.button
                      key={item.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${activeTab === item.id
                        ? "text-black"
                        : "text-zinc-500 hover:text-white"
                        }`}
                    >
                      {/* Selection Indicator Background */}
                      {activeTab === item.id && (
                        <motion.div
                          layoutId={`active-bg-${group.title}`}
                          className="absolute inset-0 bg-[#fabf37] shadow-[0_10px_20px_rgba(250,191,55,0.15)]"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}

                      {/* Hover Scanner Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
                        style={{
                          backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.1), transparent)'
                        }}
                      />

                      <div className="flex items-center gap-4 relative z-10">
                        <motion.div
                          animate={activeTab === item.id ? { rotate: [0, 15, -15, 0] } : {}}
                          transition={{ duration: 0.5 }}
                          className={activeTab === item.id ? "text-black" : "group-hover:text-[#fabf37] transition-colors"}
                        >
                          {item.icon}
                        </motion.div>
                        <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                      </div>

                      {/* Corner HUD Bracket (Only on active) */}
                      {activeTab === item.id && (
                        <div className="absolute right-0 top-0 size-2 border-t border-r border-black/20" />
                      )}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </nav>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto p-8 border-t border-white/5 bg-zinc-900/20 space-y-4">
        {/* Language Switcher in Sidebar */}
        <div className="relative">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-[#fabf37] transition-all"
          >
            <div className="flex items-center gap-4">
              <Box className="size-5" />
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest leading-none">{language}</p>
                <p className="text-[7px] font-bold text-[#fabf37] uppercase tracking-tighter mt-1">AI-{tone}</p>
              </div>
            </div>
            <ChevronDown className={`size-3 transition-transform ${isLangOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {isLangOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bottom-full left-0 right-0 mb-2 bg-[#1a1a1a] border border-white/10 rounded-2xl p-2 shadow-2xl z-50 overflow-hidden"
              >
                <div className="max-h-[300px] overflow-y-auto custom-scrollbar relative">
                  {[
                    { code: "EN", name: "English", flag: "🇺🇸" },
                    { code: "BN", name: "বাংলা", flag: "🇧🇩" },
                    { code: "AR", name: "العربية", flag: "🇸🇦" },
                    { code: "TR", name: "Türkçe", flag: "🇹🇷" },
                    { code: "DE", name: "Deutsch", flag: "🇩🇪" },
                    { code: "FR", name: "Français", flag: "🇫🇷" },
                    { code: "ES", name: "Español", flag: "🇪🇸" },
                    { code: "ZH", name: "中文", flag: "🇨🇳" },
                    { code: "HI", name: "हिन्दी", flag: "🇮🇳" },
                    { code: "RU", name: "Русский", flag: "🇷🇺" },
                    { code: "JA", name: "日本語", flag: "🇯🇵" },
                    { code: "KO", name: "한국어", flag: "🇰🇷" },
                    { code: "FA", name: "فارسی", flag: "🇮🇷" },
                    { code: "IT", name: "Italiano", flag: "🇮🇹" },
                    { code: "PT", name: "Português", flag: "🇵🇹" },
                    { code: "UR", name: "اردو", flag: "🇵🇰" },
                    { code: "VN", name: "Tiếng Việt", flag: "🇻🇳" },
                    { code: "TH", name: "ไทย", flag: "🇹🇭" },
                    { code: "ID", name: "Bahasa", flag: "🇮🇩" }
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as LanguageCode);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${language === lang.code
                        ? "bg-[#fabf37] text-black"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                      <span className="text-sm leading-none">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-4 py-3 text-zinc-500 hover:text-red-500 transition-colors group border border-transparent hover:border-red-500/20 rounded-xl"
        >
          <LogOut className="size-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[11px] font-black uppercase tracking-widest">{t('logout_terminal')}</span>
        </button>
      </div>
    </div>
  );
}