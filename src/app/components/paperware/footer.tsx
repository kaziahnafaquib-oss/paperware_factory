import logoBlack from 'figma:asset/8788d2f066ca9921baf05e502ac560c2c717da5a.png';
import logoBn from '../../../assets/paperware_logo_bn.png';
import { memo } from 'react';
import { ArrowRight, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, Send, ExternalLink, Clock } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { motion as Motion } from "framer-motion";

export function Footer({ onPageChange }: { onPageChange: (page: string) => void }) {
  const { t, isRTL, language } = useLanguage();

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/paperwarefactory" },
    { icon: Instagram, href: "https://www.instagram.com/paperware_factory/" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/paperwarefactory/?viewAsMember=true" },
    { icon: Youtube, href: "http://tiktok.com/paperwarefactory" }
  ];

  return (
    <footer className="bg-[#fabf37]! text-black pt-0 relative overflow-hidden" style={{ backgroundColor: '#fabf37' }}>
      {/* Main Footer Content with Yellow Background */}
      <div className="pt-10 pb-10 relative bg-[#fabf37]!" style={{ backgroundColor: '#fabf37' }}>
        {/* White Wave Effect at Top */}
        <div className="absolute top-0 left-0 right-0 h-24 -translate-y-full overflow-hidden pointer-events-none">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full"
          >
            <path
              d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,black_1px,transparent_0)] bg-[size:40px_40px]" />

        <div className="container mx-auto px-6 lg:px-12 max-w-[1400px] relative z-10">
          {/* Newsletter Section */}
          <div className="relative z-10 bg-black text-[#fabf37] rounded-[40px] p-8 md:p-14 mb-24 overflow-hidden group border border-white/10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_80px_-10px_rgba(0,0,0,0.4)] transition-shadow duration-500">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-16 relative z-10">
              <div className="text-center lg:text-left space-y-5 max-w-3xl">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fabf37] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fabf37]"></span>
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">{t('industry_intelligence')}</span>
                </div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                  {t('footer_subscribe_title')} <br className="hidden md:block" />
                  <Motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-[#fabf37] via-[#fff5d6] to-[#fabf37]"
                  >
                    {t('footer_subscribe_gradient')}
                  </Motion.span>
                </h3>
                <p className="text-zinc-400 text-base font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  {t('footer_subscribe_desc')}
                </p>
              </div>

              <div className="w-full max-w-xl relative group/input">
                <div className="absolute inset-0 bg-[#fabf37]/20 blur-xl rounded-full opacity-0 group-hover/input:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-white/5 p-1.5 rounded-full border border-white/10 flex items-center backdrop-blur-sm">
                  <div className="pl-5 text-zinc-500">
                    <Mail className="size-5" />
                  </div>
                  <textarea
                    placeholder={t('footer_placeholder')}
                    rows={2}
                    className="flex-1 bg-transparent border-none text-white placeholder:text-zinc-400 focus:ring-0 px-3 py-4 font-bold text-sm outline-none min-w-0 resize-none flex items-center text-[11px]"
                  />
                  <button className="bg-[#fabf37] hover:bg-white hover:scale-105 active:scale-95 text-black px-6 py-3.5 rounded-full font-black uppercase tracking-widest text-[11px] transition-all flex items-center gap-2 group/btn shadow-[0_0_20px_rgba(250,191,55,0.3)] shrink-0">
                    {t('footer_join')} <ArrowRight className="size-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] gap-x-12 gap-y-16 mb-32 items-start">
            {/* Logo Column */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
              <Motion.img
                whileHover={{ scale: 1.05 }}
                src={language === 'BN' ? logoBn : logoBlack}
                alt="Paperware"
                className="h-40 w-auto mb-2 drop-shadow-sm select-none"
              />
              <p className="text-[14px] font-bold leading-relaxed opacity-80 max-w-[260px]">
                {t('footer_desc')}
              </p>
            </div>

            {/* Quick Links & Our Products - Grouped Together */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-16 lg:gap-x-6">
              {/* Quick Links */}
              <div className="space-y-8 text-center md:text-left">
                <div className="relative inline-block md:block">
                  <h4 className="font-black uppercase tracking-[0.25em] text-[15px]">{t('footer_quick_links')}</h4>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-10 h-[3px] bg-black"></div>
                </div>
                <ul className="space-y-4 pt-2">
                  {[
                    { label: t('nav_home'), page: 'home' },
                    { label: t('nav_about'), page: 'about' },
                    { label: t('nav_papercups'), page: 'papercups' },
                    { label: t('nav_sustainability'), page: 'sustainability' },
                    { label: t('nav_erp'), page: 'erp' },
                    { label: t('nav_contact'), page: 'contact' },
                    { label: t('nav_privacy'), page: 'privacy-policy' }
                  ].map((item, i) => (
                    <li key={i}>
                      <button
                        onClick={() => onPageChange(item.page)}
                        className="group flex items-center gap-2 text-[15px] font-bold hover:text-white transition-colors duration-300 mx-auto md:mx-0"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-black group-hover:bg-white transition-colors duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0" />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Our Products */}
              <div className="space-y-8 text-center md:text-left">
                <div className="relative inline-block md:block">
                  <h4 className="font-black uppercase tracking-[0.25em] text-[15px]">{t('footer_our_products')}</h4>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-10 h-[3px] bg-black"></div>
                </div>
                <ul className="space-y-4 pt-2">
                  {[
                    { name: t('nav_paper_cup'), page: 'papercups' },
                    { name: t('nav_carry_bag'), page: 'products' },
                    { name: t('nav_box'), page: 'products' },
                    { name: t('nav_hangtag'), page: 'products' },
                    { name: t('nav_brochure'), page: 'products' },
                    { name: t('nav_envelope'), page: 'products' }
                  ].map(item => (
                    <li key={item.name}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onPageChange(item.page);
                        }}
                        className="group flex items-center gap-2 text-[15px] font-bold hover:text-white transition-colors duration-300 mx-auto md:mx-0 cursor-pointer"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-black group-hover:bg-white transition-colors duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0" />
                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Get In Touch */}
            <div className="space-y-8 text-center md:text-left">
              <div className="relative inline-block md:block">
                <h4 className="font-black uppercase tracking-[0.25em] text-[15px]">{t('footer_get_in_touch')}</h4>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-10 h-[3px] bg-black"></div>
              </div>
              <ul className="space-y-6 pt-2">
                {[
                  {
                    icon: MapPin,
                    title: t('head_office'),
                    text: t('contact_address_office_street') || "7813 Trimohoni Nandipara Main Road, Dhaka",
                    href: "https://www.google.com/maps/search/?api=1&query=7813+Trimohoni+Nandipara+Main+Road,+Dhaka"
                  },
                  {
                    icon: MapPin,
                    title: t('factory_office'),
                    text: t('contact_address_factory_street') || "7814 Trimohoni Nandipara Main Road, Dhaka",
                    href: "https://www.google.com/maps/search/?api=1&query=7814+Trimohoni+Nandipara+Main+Road,+Dhaka"
                  },
                  {
                    icon: MapPin,
                    title: t('display_centre'),
                    text: t('contact_address_display_street') || "65 Begum bazar, Agrani Bank Lane, Dhaka",
                    href: "https://www.google.com/maps/search/?api=1&query=65+Begum+bazar,+Agrani+Bank+Lane,+Dhaka"
                  },
                  {
                    icon: Clock,
                    title: t('service'),
                    text: t('factory_working_hour'),
                    action: () => onPageChange?.('manufacturing')
                  }
                ].map((item, idx) => (
                  <li key={idx} className="flex flex-col md:flex-row items-center md:items-start gap-4 group">
                    <div className="size-10 rounded-full bg-black/5 border border-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-[#fabf37] group-hover:border-black transition-all duration-300 shrink-0 shadow-sm">
                      <item.icon className="size-4" />
                    </div>
                    <div className="space-y-1 text-center md:text-left">
                      <p className="text-[9px] font-black uppercase tracking-wider opacity-60 leading-none">{item.title}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[13px] font-extrabold leading-tight hover:text-white transition-colors block max-w-[220px]"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <button
                          onClick={item.action}
                          className="text-[13px] font-extrabold leading-tight hover:text-white transition-colors block max-w-[220px]"
                        >
                          {item.text}
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-black/10 pt-20 pb-4">
            <p className="text-xs font-bold uppercase tracking-widest opacity-60">
              © {new Date().getFullYear()} Paperware Factory. {t('rights')}.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-10 rounded-full bg-black/5 hover:bg-black flex items-center justify-center text-black hover:text-[#fabf37] transition-all duration-300 transform hover:-translate-y-1"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>

            <p className="text-xs font-black uppercase tracking-widest flex items-center gap-2 opacity-80 mr-8">
              {t('made_in_bangladesh')}
              <Motion.span
                animate={{
                  scaleY: [1, 1.05, 0.95, 1],
                  skewX: [0, 5, -5, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-block origin-left"
              >
                <svg width="20" height="15" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shadow-sm rounded-none">
                  <rect width="16" height="12" fill="#006747" />
                  <circle cx="7.2" cy="6" r="3.5" fill="#EF3340" />
                </svg>
              </Motion.span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Memoize Footer to prevent unnecessary re-renders
export const MemoizedFooter = memo(Footer);