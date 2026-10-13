import logoBlack from 'figma:asset/8788d2f066ca9921baf05e502ac560c2c717da5a.webp';
import React from "react";
import { ArrowRight, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, Music2, Send, ExternalLink, Clock } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { motion as Motion } from "motion/react";
import { openWhatsAppInquiry } from "../../lib/inquiry";
import { pathFor } from "../../routes/routeTable";

export function Footer({ onPageChange }: { onPageChange: (page: string) => void }) {
  const { t, isRTL } = useLanguage();

  // Real links (crawlable, middle-click / open-in-new-tab work); plain clicks stay in-app.
  const pageLink = (id: string) => ({
    href: pathFor(id),
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      onPageChange(id);
    },
  });

  const socialLinks = [
    { icon: Facebook, label: "Paperware Factory on Facebook", href: "https://www.facebook.com/paperwarefactory" },
    { icon: Instagram, label: "Paperware Factory on Instagram", href: "https://www.instagram.com/paperware_factory/" },
    { icon: Linkedin, label: "Paperware Factory on LinkedIn", href: "https://www.linkedin.com/company/paperwarefactory/" },
    // TikTok previously used the YouTube icon and an http URL; handle still needs confirming by the business.
    { icon: Music2, label: "Paperware Factory on TikTok", href: "https://www.tiktok.com/@paperwarefactory" }
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
              className="drop-shadow-lg"
            />
          </svg>
        </div>

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,black_1px,transparent_0)] bg-[size:40px_40px]" />

        <div className="container mx-auto px-6 lg:px-12 max-w-[1400px] relative z-10">
          {/* Newsletter Section */}
          <div className="relative z-10 bg-black text-[#fabf37] rounded-[40px] p-8 md:p-14 mb-24 overflow-hidden group border border-white/10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_80px_-10px_rgba(0,0,0,0.4)] transition-shadow duration-500">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#fabf37]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#fabf37]/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-16 relative z-10">
              <div className="text-center lg:text-left space-y-5 max-w-3xl">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fabf37] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fabf37]"></span>
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">Industrial Intelligence</span>
                </div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                  Subscribe to our <br className="hidden md:block" />
                  <Motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-[#fabf37] via-[#fff5d6] to-[#fabf37]"
                  >
                    Global Update Stream
                  </Motion.span>
                </h3>
                <p className="text-zinc-400 text-base font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Get direct access to manufacturing insights, sustainability reports, and product innovation alerts.
                </p>
              </div>

              <div className="w-full max-w-xl relative group/input">
                <div className="absolute inset-0 bg-[#fabf37]/20 blur-xl rounded-full opacity-0 group-hover/input:opacity-100 transition-opacity duration-500" />
                <form
                  onSubmit={(e) => {
                    // Phase A0: no mailing list exists yet; hand the request to WhatsApp instead of doing nothing.
                    e.preventDefault();
                    const email = new FormData(e.currentTarget).get("newsletter-email");
                    openWhatsAppInquiry("Updates / newsletter request", { Email: String(email ?? "") });
                  }}
                  className="relative bg-white/5 p-1.5 rounded-full border border-white/10 flex items-center backdrop-blur-sm"
                >
                  <div className="pl-5 text-zinc-500">
                    <Mail className="size-5" />
                  </div>
                  <input
                    type="email"
                    name="newsletter-email"
                    required
                    autoComplete="email"
                    aria-label="Your work email"
                    placeholder="Enter your corporate email..."
                    className="flex-1 bg-transparent border-none text-white placeholder:text-zinc-400 focus:ring-0 px-3 py-4 font-bold text-sm outline-none min-w-0"
                  />
                  <button type="submit" className="bg-[#fabf37] hover:bg-white hover:scale-105 active:scale-95 text-black px-6 py-3.5 rounded-full font-black uppercase tracking-widest text-[11px] transition-all flex items-center gap-2 group/btn shadow-[0_0_20px_rgba(250,191,55,0.3)] shrink-0">
                    Join <ArrowRight className="size-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] gap-x-12 gap-y-16 mb-32 items-start">
            {/* Logo Column */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
              <Motion.img
                whileHover={{ scale: 1.05 }}
                src={logoBlack}
                alt="Paperware"
                className="h-40 w-auto mb-2 drop-shadow-sm select-none"
              />
              <p className="text-[14px] font-bold leading-relaxed opacity-80 max-w-[260px]">
                Premium B2B manufacturing platform for sustainable paper packaging solutions.
              </p>
            </div>

            {/* Quick Links & Our Products - Grouped Together */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-16 lg:gap-x-6">
              {/* Quick Links */}
              <div className="space-y-8 text-center md:text-left">
                <div className="relative inline-block md:block">
                  <h4 className="font-black uppercase tracking-[0.25em] text-[15px]">Quick Links</h4>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-10 h-[3px] bg-black"></div>
                </div>
                <ul className="space-y-4 pt-2">
                  {['Home', 'About Us', 'Papercups', 'Sustainability', 'Our ERP', 'Contact', 'Privacy Policy'].map((item, i) => (
                    <li key={item}>
                      <a
                        {...pageLink(item === 'Our ERP' ? 'erp' : item === 'About Us' ? 'about' : item.toLowerCase().replace(/ /g, '-'))}
                        className="group flex items-center gap-2 text-[15px] font-bold hover:text-white transition-colors duration-300 mx-auto md:mx-0 w-fit"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-black group-hover:bg-white transition-colors duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0" />
                        <span>{item}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Our Products */}
              <div className="space-y-8 text-center md:text-left">
                <div className="relative inline-block md:block">
                  <h4 className="font-black uppercase tracking-[0.25em] text-[15px]">Our Products</h4>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-10 h-[3px] bg-black"></div>
                </div>
                <ul className="space-y-4 pt-2">
                  {[
                    { name: 'Paper Cup', page: 'papercups' },
                    { name: 'Carry Bag', page: 'products' },
                    { name: 'Box', page: 'products' },
                    { name: 'Hangtag', page: 'products' },
                    { name: 'Brochure', page: 'products' },
                    { name: 'Envelope', page: 'products' }
                  ].map(item => (
                    <li key={item.name}>
                      <a
                        {...pageLink(item.page)}
                        className="group flex items-center gap-2 text-[15px] font-bold hover:text-white transition-colors duration-300 mx-auto md:mx-0 cursor-pointer"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-black group-hover:bg-white transition-colors duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0" />
                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Get In Touch */}
            <div className="space-y-8 text-center md:text-left">
              <div className="relative inline-block md:block">
                <h4 className="font-black uppercase tracking-[0.25em] text-[15px]">Get In Touch</h4>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-10 h-[3px] bg-black"></div>
              </div>
              <ul className="space-y-6 pt-2">
                {[
                  {
                    icon: MapPin,
                    title: "Head Office",
                    text: "7813 Trimohoni Nandipara Main Road, Dhaka",
                    href: "https://www.google.com/maps/search/?api=1&query=7813+Trimohoni+Nandipara+Main+Road,+Dhaka"
                  },
                  {
                    icon: MapPin,
                    title: "Factory Office",
                    text: "7814 Trimohoni Nandipara Main Road, Dhaka",
                    href: "https://www.google.com/maps/search/?api=1&query=7814+Trimohoni+Nandipara+Main+Road,+Dhaka"
                  },
                  {
                    icon: MapPin,
                    title: "Display Centre",
                    text: "65 Begum bazar, Agrani Bank Lane, Dhaka",
                    href: "https://www.google.com/maps/search/?api=1&query=65+Begum+bazar,+Agrani+Bank+Lane,+Dhaka"
                  },
                  {
                    icon: Clock,
                    title: "Service",
                    text: "Factory working hour: 24/7",
                    action: () => onPageChange('manufacturing')
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
              © {new Date().getFullYear()} Paperware Factory. All rights reserved.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} (opens in a new tab)`}
                  className="size-10 rounded-full bg-black/5 hover:bg-black flex items-center justify-center text-black hover:text-[#fabf37] transition-all duration-300 transform hover:-translate-y-1"
                >
                  <social.icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>

            <p className="text-xs font-black uppercase tracking-widest flex items-center gap-2 opacity-80 mr-8">
              Made in Bangladesh
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
export const MemoizedFooter = React.memo(Footer);