import React from "react";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import image_2cf02ce26ccdbb62dfe9c412f2f673ebd0977bb2 from 'figma:asset/2cf02ce26ccdbb62dfe9c412f2f673ebd0977bb2.webp';
import { Button } from "../ui/button";
import { Search, Phone, Send, ChevronDown, ShoppingBasket, Globe, Menu, X, Zap, Activity, Cpu, Facebook, Instagram, Linkedin, MapPin, Youtube } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { useLanguage } from "../../context/LanguageContext";
import { useSocialMedia } from "../../context/SocialMediaContext";
import { LanguageCode, TranslationKey } from "../../lib/translations";
import { prefetchPage } from "../../lib/performance";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface NavbarProps {
  onPageChange: (id: string) => void;
  onProductClick: (product: any) => void;
  onSearchOpen: () => void;
  onEmailOpen: () => void;
  onAuthOpen: (type: 'admin' | 'client') => void;
  currentPage: string;
  quoteBasketCount?: number;
}

/** True if a nav link, or any item nested inside it (dropdown items, mega-menu categories), targets `page`. */
function linkContainsPage(node: unknown, page: string): boolean {
  if (!node || typeof node !== "object") return false;
  if ((node as { id?: string }).id === page) return true;
  return Object.values(node as Record<string, unknown>).some(
    (value) => Array.isArray(value) && value.some((child) => linkContainsPage(child, page))
  );
}

const getLinks = (t: (key: string) => string) => [
  { name: t('home') || "Home", id: "home" },
  {
    name: t('company') || "Company",
    id: "company",
    hasDropdown: true,
    items: [
      { name: t('about'), id: "about" },
      { name: t('clients'), id: "clients" },
      { name: t('sustainability'), id: "sustainability" },
      { name: t('compliance'), id: "compliance" },
      { name: "Our Partners", id: "partners" },
      { name: t('future_plan'), id: "future-plan" }
    ]
  },
  {
    name: t('all_products') || "All products",
    id: "products",
    isMega: true,
    categories: [
      {
        title: "OFFICE STATIONARY SUPPLIES",
        id: "office-stationary",
        items: ["Business Card", "Envelope", "Invoice Pad", "Letterhead Pad", "Money Receipt Book", "Delivery Note Book", "Note Book", "Diary", "File Folder"]
      },
      {
        title: "PAPER CUP SUPPLIES",
        id: "papercups",
        items: ["Paper Cup", "Paper Cup Holder", "Paper Cup Jacket/Sleeve", "Paper Cup Carrier"]
      },
      {
        title: "RESTAURANT SUPPLIES",
        id: "restaurant-supplies",
        items: ["Food Box", "Chowmein Box", "Meat Box", "Sandwich Box", "Burger Box", "Pizza Box", "Cake Box", "Sweet Box", "Fries Box", "Shawarma Box", "Waffle Box & Tray", "Wedges Cone", "Ice Cream Cone", "Sugar Sachet", "Table Mat", "Carry Bag", "Food Menu"]
      },
      {
        title: "MARKETING MATERIALS SUPPLIES",
        id: "marketing-materials",
        items: ["Paper Bag", "Brochure / Catalog", "Premium Magazine", "Flyer & Leaflet", "Sticker", "Calendar", "Tissue Box"]
      },
      {
        title: "HOSPITALS & PHARMACEUTICALS SUPPLIES",
        id: "pharma-supplies",
        items: ["Patient File", "X-Ray File", "Doctor's Prescription Pad", "Report Envelope", "Medicine Box", "Medicine Literature"]
      },
      {
        title: "FMCG PRODUCTS SUPPLIES",
        id: "fmcg-supplies",
        items: ["Food & Beverage Packaging", "Personal Care Product Packaging", "Home Care Product Packaging", "Confectionary Goods Packaging"]
      },
      {
        title: "GARMENTS ACCESSORIES SUPPLIES",
        id: "garments",
        items: ["Hangtag", "Label", "Sticker"]
      }
    ]
  },
  {
    name: t('solutions') || "Solutions",
    id: "solutions",
    hasDropdown: true,
    items: [
      { name: "For Restaurants", id: "restaurant-supplies" },
      { name: "For Pharma", id: "pharma-supplies" },
      { name: "For FMCG", id: "fmcg-supplies" },
      { name: "For Marketing", id: "marketing-materials" }
    ]
  },
  {
    name: t('business') || "Business",
    id: "business",
    hasDropdown: true,
    items: [
      { name: "Business Solutions", id: "business" },
      { name: "Partner Program", id: "partner-program" },
      { name: "Investor Relations", id: "investor" },
      { name: "Franchise", id: "franchise" }
    ]
  },
  {
    name: t('manufacturing'),
    id: "manufacturing",
    hasDropdown: true,
    items: [
      { name: t('factory_live') || "Factory Live", id: "factory-live" },
      { name: t('machinery') || "Machinery", id: "manufacturing" },
      { name: t('material_lab') || "Material Lab", id: "manufacturing" }
    ]
  },
  { name: t('export_intelligence') || "Export", id: "export" },
  { name: t('contact'), id: "contact" },
  {
    name: t('more'),
    id: "more",
    hasDropdown: true,
    items: [
      { name: t('erp_smart_factory'), id: "erp" },
      { name: t('studio_interactive'), id: "studio" },
      { name: t('track_order'), id: "tracking" },
      { name: t('product_gallery'), id: "gallery" },
      { name: t('social_hub'), id: "socials" },
      { name: t('career'), id: "career" },
      { name: t('faq'), id: "faq" },
      { name: "CSR", id: "csr" }
    ]
  }
];

export const Navbar = React.memo(({
  onPageChange,
  onProductClick,
  currentPage,
  onSearchOpen,
  onEmailOpen,
  onAuthOpen,
  quoteBasketCount = 0
}: NavbarProps) => {
  const { t, language, setLanguage, tone, setTone } = useLanguage();
  const { posts } = useSocialMedia();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  useEscapeKey(isMobileMenuOpen, () => setIsMobileMenuOpen(false));
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  useEscapeKey(activeDropdown !== null, () => setActiveDropdown(null));
  const [mobileExpanded, setMobileExpanded] = React.useState<string | null>(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isOpeningRef = React.useRef(false);
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (id: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const links = React.useMemo(() => getLinks(t), [t]);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  React.useEffect(() => {
    const bottomNav = document.querySelector('nav.fixed.bottom-0');
    if (bottomNav) {
      (bottomNav as HTMLElement).style.display = isMobileMenuOpen ? 'none' : '';
    }

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleDropdownToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // e.preventDefault(); // Removed preventDefault to allow natural click behavior
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpeningRef.current) return;
      const target = e.target as HTMLElement;
      if (target.closest('[data-dropdown]') || target.closest('[data-dropdown-trigger]')) return;
      setActiveDropdown(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleInternalPageChange = React.useCallback((id: string) => {
    onPageChange(id);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [onPageChange]);

  return (
    <Tooltip.Provider>
      <nav
        className={`${isMobileMenuOpen ? 'top-0 left-0 w-full h-full z-[99999]' : 'top-0 left-0 w-full z-[1001]'} font-['Poppins',sans-serif]`}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          transform: 'translate3d(0, 0, 0)', willChange: 'transform',
          isolation: 'isolate', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden',
        }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.015] z-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat', mixBlendMode: 'overlay',
          }} />
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-[1000]"
            />
          )}
        </AnimatePresence>

        <div className="fixed top-0 left-0 right-0 flex flex-col items-center pointer-events-none z-[5000]">
          <div className="w-full h-8 bg-[#fabf37]/90 backdrop-blur-sm flex items-center justify-between px-4 md:px-8 pointer-events-auto relative z-[5001] shadow-sm border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="hidden md:flex items-center gap-2 ml-4 px-2 py-0.5 bg-black/5 rounded text-[9px] font-black uppercase tracking-[0.2em] text-black">
                Made In Bangladesh <img src="https://flagcdn.com/bd.svg" className="w-3 h-auto" alt="BD" />
              </span>
            </div>
            <div className="flex items-center gap-2">
            </div>
          </div>

          <div
            className="w-[95%] max-w-[1440px] mt-4 relative flex items-center justify-between h-[48px] md:h-[58px] rounded-full px-2 md:px-4 border border-black/10 group/nav z-[1100] overflow-visible pointer-events-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(250,249,246,0.96) 100%)',
              backdropFilter: 'blur(40px) saturate(200%)',
              WebkitBackdropFilter: 'blur(40px) saturate(200%)',
              boxShadow: '0px 20px 60px -15px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8), 0 0 0 1px rgba(255,255,255,0.7)',
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fabf37]/5 to-transparent pointer-events-none rounded-full overflow-hidden"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
            />

            {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((pos, i) => (
              <motion.div
                key={i} className={`absolute ${pos} z-10`}
                initial={{ opacity: 0 }} animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                <div className="relative size-3">
                  <div className={`absolute ${i % 2 === 0 ? 'top-0 left-0' : 'top-0 right-0'} w-2 h-[1px] bg-[#fabf37]`} />
                  <div className={`absolute ${i < 2 ? 'top-0' : 'bottom-0'} ${i % 2 === 0 ? 'left-0' : 'right-0'} w-[1px] h-2 bg-[#fabf37]`} />
                </div>
              </motion.div>
            ))}

            <div className="flex-shrink-0 pl-1 md:pl-3 relative z-30">
              <button onClick={() => handleInternalPageChange("home")} className="focus:outline-none relative active:scale-95 transition-transform">
                <motion.img src={image_2cf02ce26ccdbb62dfe9c412f2f673ebd0977bb2} alt="Paperware Logo" className="h-[50px] md:h-[64px] w-auto object-contain py-1 scale-110 md:scale-115 translate-y-1" />
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-0 flex-1 justify-start pl-2 md:pl-4 relative z-20">
              {links.map((link) => {
                // Phase A: the outlined pill marks the section containing the current page
                // (it was hard-wired to "Home", so Home looked active on every page).
                const isCurrent = linkContainsPage(link, currentPage);
                const isActive = isCurrent || activeDropdown === link.id;

                return (
                  <div
                    key={link.id + link.name}
                    className="relative group/link"
                    onMouseEnter={() => {
                      if (link.hasDropdown || link.isMega) handleMouseEnter(link.id || "");
                      prefetchPage(link.id || "");
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Tooltip.Root delayDuration={300}>
                      <Tooltip.Trigger asChild>
                        <button
                          data-dropdown-trigger="true"
                          onClick={() => handleInternalPageChange(link.id || "home")}
                          aria-current={isCurrent ? "page" : undefined}
                          className={`text-[10px] md:text-[10.5px] font-bold transition-all px-1.5 md:px-2 py-1 flex items-center gap-1 relative overflow-hidden ${isCurrent ? "bg-white border-[2px] border-black rounded-full text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none mx-2 px-3"
                            : isActive ? "text-black" : "text-[#8e8e8e] hover:text-black"
                            }`}
                        >
                          {!isCurrent && (
                            <motion.span className="absolute inset-0 rounded-full" style={{ backgroundColor: "rgba(250, 191, 55, 0.1)" }} initial={{ scale: 0, opacity: 0 }} whileHover={{ scale: 1.1, opacity: 1 }} transition={{ duration: 0.3 }} />
                          )}
                          {isActive && !isCurrent && (
                            <motion.div layoutId="navbar-underline" className="absolute bottom-0 left-0 w-full h-[3px] bg-[#fabf37]" initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.3 }} />
                          )}
                          <span className={`relative z-10 transition-transform duration-300 ${!isCurrent ? 'hover:scale-110' : ''}`}>
                            {link.name}
                          </span>
                          {(link.hasDropdown || link.isMega) && (
                            <ChevronDown className={`size-2.5 transition-transform relative z-10 ${activeDropdown === link.id ? 'rotate-180' : ''}`} />
                          )}
                        </button>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content className="bg-black text-[#fabf37] px-2 py-1 rounded-md text-[7px] font-black uppercase tracking-wider shadow-xl border border-[#fabf37]/20" sideOffset={5}>
                          Navigate to {link.name}
                          <Tooltip.Arrow className="fill-black" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>

                    <AnimatePresence>
                      {activeDropdown === link.id && link.hasDropdown && !link.isMega && (
                        <motion.div
                          data-dropdown="true"
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 15, scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 z-[2000] pt-4 w-[240px]"
                        >
                          <div className="bg-white/95 backdrop-blur-xl rounded-[24px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] border border-black/[0.05] overflow-hidden p-3 space-y-1 transform-gpu">
                            {link.items?.map((item: any, i: number) => (
                              <motion.button
                                key={item.id + item.name}
                                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                                onClick={() => handleInternalPageChange(item.id)}
                                className="w-full flex items-center justify-between px-6 py-4 rounded-full bg-[#f3f3f5] hover:bg-[#fabf37] group transition-all text-left relative overflow-hidden"
                              >
                                <span className="text-[11px] font-black uppercase tracking-widest text-black/70 group-hover:text-black transition-colors relative z-10">{item.name}</span>
                                <ChevronDown className="size-3 text-black/20 group-hover:text-black -rotate-90 transition-all relative z-10" />
                                <div className="absolute inset-0 bg-[#fabf37]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <AnimatePresence>
                {links.map((link) => (
                  activeDropdown === link.id && link.isMega && (
                    <motion.div
                      key={link.id}
                      data-dropdown="true"
                      onMouseEnter={() => handleMouseEnter(link.id || "")}
                      onMouseLeave={handleMouseLeave}
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute top-[calc(100%+8px)] left-0 w-full z-[2000] flex justify-center px-4"
                    >
                      <div className="w-full max-w-[1000px] rounded-[32px] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.18)] border border-black/10 overflow-hidden relative" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,247,242,0.95) 100%)', backdropFilter: 'blur(30px) saturate(180%)' }}>
                        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
                        <motion.div className="absolute inset-0 rounded-[32px] pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(250,191,55,0.1), transparent)' }} animate={{ x: ['-100%', '100%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />

                        <div className="p-4 md:p-6 relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <motion.div className="size-2 bg-[#fabf37] rounded-full" animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                              <span className="font-mono text-[8px] text-black/20 tracking-[0.2em] uppercase">: Manufacturing_Active_044</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5, 6].map(i => <motion.div key={i} className="w-3 h-[1px] bg-black/[0.08]" animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }} />)}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-0 border-t border-black/[0.03]">
                            {link.categories?.map((cat: any, idx: number) => (
                              <motion.div
                                key={cat.id}
                                className="p-4 border-r border-b border-black/[0.04] last:border-r-0 transition-all relative group/item overflow-hidden"
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                                whileHover={{ background: 'linear-gradient(135deg, rgba(250,191,55,0.03) 0%, rgba(250,191,55,0.01) 100%)' }}
                              >
                                <motion.div className="absolute inset-0 bg-gradient-to-br from-[#fabf37]/5 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none" />
                                <div className="absolute top-3 right-4 font-mono text-[7px] text-black/10 tracking-widest group-hover/item:text-[#fabf37]/40 transition-colors">[{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}]</div>

                                <div className="space-y-3 relative z-10">
                                  <div className="flex items-center gap-2">
                                    <motion.div className="size-1 bg-[#fabf37] rounded-full shadow-[0_0_8px_rgba(250,191,55,0.4)]" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }} />
                                    <h4 className="text-[9px] font-black uppercase text-black tracking-[0.15em] group-hover/item:text-[#fabf37] transition-colors">{cat.title}</h4>
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    {cat.items.map((sub: string, subIdx: number) => (
                                      <motion.button
                                        key={sub} onClick={() => handleInternalPageChange(cat.id)}
                                        className="w-full flex items-center justify-between px-2.5 py-1 rounded-full bg-[#f3f3f5] hover:bg-[#fabf37] group/subitem transition-all text-left relative overflow-hidden"
                                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 + subIdx * 0.02 }}
                                      >
                                        <span className="text-[8px] font-black uppercase tracking-widest text-black/60 group-hover/subitem:text-black transition-colors relative z-10">{sub}</span>
                                        <div className="absolute inset-0 bg-[#fabf37]/10 opacity-0 group-hover/subitem:opacity-100 transition-opacity" />
                                      </motion.button>
                                    ))}
                                  </div>
                                </div>
                                <div className="absolute bottom-2 left-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                  <div className="w-2 h-[1px] bg-[#fabf37]/30" />
                                  <div className="w-[1px] h-2 bg-[#fabf37]/30" />
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          <motion.div className="mt-2 pt-4 border-t border-black/[0.03] flex items-center justify-between" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <motion.div className="size-1 bg-green-500 rounded-full" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                                <span className="font-mono text-[7px] text-black/30 uppercase tracking-[0.2em]">Global_Sync: Stable</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Activity className="size-2.5 text-black/20" />
                                <span className="font-mono text-[7px] text-black/30 uppercase tracking-[0.2em]">{link.categories?.length || 0} Categories Active</span>
                              </div>
                            </div>
                            <motion.button onClick={() => handleInternalPageChange('products')} className="text-[8px] font-black uppercase tracking-widest text-black/40 hover:text-[#fabf37] underline underline-offset-4 transition-colors flex items-center gap-1 group" whileHover={{ x: 2 }}>
                              <span>Explore Full Catalog</span>
                              <motion.span className="opacity-0 group-hover:opacity-100" animate={{ x: [0, 3, 0] }} transition={{ duration: 1, repeat: Infinity }}>→</motion.span>
                            </motion.button>
                          </motion.div>
                        </div>

                        {[{ pos: 'top-3 left-3', rot: 0 }, { pos: 'top-3 right-3', rot: 90 }, { pos: 'bottom-3 left-3', rot: -90 }, { pos: 'bottom-3 right-3', rot: 180 }].map((corner, i) => (
                          <motion.div key={i} className={`absolute ${corner.pos} size-4`} style={{ rotate: corner.rot }} animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}>
                            <div className="absolute top-0 left-0 w-3 h-[1px] bg-[#fabf37]/40" />
                            <div className="absolute top-0 left-0 w-[1px] h-3 bg-[#fabf37]/40" />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-1 relative z-20">
              <div className="flex items-center h-[36px] md:h-[44px] bg-[#f8f7f2] rounded-full pl-2 pr-3 border border-black/5 shadow-inner relative overflow-hidden">
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" animate={{ x: ['-200%', '200%'] }} transition={{ duration: 5, repeat: Infinity, repeatDelay: 3 }} />

                {__PORTALS_ENABLED__ && (<div className="relative z-10">
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <button
                        data-dropdown-trigger="true"
                        onMouseEnter={() => handleMouseEnter("portal")}
                        onMouseLeave={handleMouseLeave}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (closeTimeoutRef.current) {
                            clearTimeout(closeTimeoutRef.current);
                            closeTimeoutRef.current = null;
                          }
                          setActiveDropdown("portal");
                        }}
                        className="flex items-center gap-1 px-2.5 md:px-3 h-[28px] md:h-[34px] bg-white rounded-full shadow-sm border border-black/5 hover:border-[#fabf37]/20 transition-all group relative overflow-hidden"
                      >
                        <motion.div className="absolute inset-0 bg-gradient-to-r from-[#fabf37]/0 via-[#fabf37]/10 to-[#fabf37]/0" initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.6 }} />
                        <span className="text-[7.5px] md:text-[8px] font-black uppercase tracking-widest text-black relative z-10">Portal</span>
                        <ChevronDown className={`size-2 text-black/30 transition-transform relative z-10 ${activeDropdown === "portal" ? "rotate-180" : ""}`} />

                        <DropdownMenu.Root open={activeDropdown === 'portal'} onOpenChange={(open) => !open && setActiveDropdown(null)}>
                          <DropdownMenu.Trigger asChild>
                            <div className="absolute inset-0 pointer-events-none opacity-0" />
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Portal>
                            <DropdownMenu.Content className="z-[6000] outline-none" side="bottom" align="end" sideOffset={8}>
                              <motion.div initial={{ opacity: 0, y: 5, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.15 }} className="min-w-[200px]">
                                <div className="bg-white border border-black/10 rounded-2xl p-2.5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden font-['Poppins',sans-serif]">
                                  <div className="absolute top-0 left-0 w-full h-1 bg-[#fabf37]" />

                                  <div className="mb-2 px-2 pt-1 flex items-center justify-between">
                                    <span className="text-[8px] font-black uppercase tracking-widest text-black/40">Secure Access</span>
                                    <div className="size-1.5 bg-green-500 rounded-full animate-pulse" />
                                  </div>

                                  <div className="space-y-1 relative z-10">
                                    <div className="absolute left-2 top-2 bottom-2 w-[1px] h-auto bg-black/5 z-0" />
                                    <div className="absolute top-2 left-2 right-2 h-[1px] w-auto bg-black/5 z-0" />
                                    <div className="absolute bottom-2 left-2 right-2 h-[1px] w-auto bg-black/5 z-0" />
                                    <div className="absolute right-2 top-2 bottom-2 w-[1px] h-auto bg-black/5 z-0" />

                                    <div className="absolute top-0 left-0 w-1.5 h-[1px] bg-[#fabf37]/30" />
                                    <div className="absolute top-0 left-0 w-[1px] h-1.5 bg-[#fabf37]/30" />
                                  </div>
                                  <motion.button onClick={() => { onAuthOpen('client'); setActiveDropdown(null); }} className="w-full text-left px-4 py-3 text-[9px] font-black uppercase bg-[#f4f4f5] hover:bg-[#eaeaea] rounded-xl transition-all group flex items-center justify-between relative overflow-hidden mb-2" whileHover={{ x: 2 }}>
                                    <div className="flex items-center gap-2.5">
                                      <Globe className="size-3 text-black/40 group-hover:text-black transition-colors" />
                                      <span className="relative z-10 text-black tracking-wider">Client Portal</span>
                                    </div>
                                    <motion.span className="text-black/20 group-hover:text-black text-[10px]" initial={{ x: -5, opacity: 0 }} whileHover={{ x: 0, opacity: 1 }}>→</motion.span>
                                  </motion.button>
                                  <motion.button onClick={() => { onAuthOpen('admin'); setActiveDropdown(null); }} className="w-full text-left px-4 py-3 text-[9px] font-black uppercase bg-gradient-to-r from-[#fabf37] to-[#ffd060] rounded-xl shadow-sm hover:shadow-md transition-all group flex items-center justify-between relative overflow-hidden" whileHover={{ x: 2, scale: 1.02 }}>
                                    <motion.div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0" animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }} />
                                    <div className="flex items-center gap-2.5">
                                      <Cpu className="size-3 text-black/40 group-hover:text-black relative z-10" />
                                      <span className="relative z-10 text-black tracking-wider">Admin HQ</span>
                                    </div>
                                  </motion.button>
                                </div>
                              </motion.div>
                            </DropdownMenu.Content>
                          </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content className="bg-black text-[#fabf37] px-2 py-1 rounded-md text-[7px] font-black uppercase tracking-wider shadow-xl border border-[#fabf37]/20" sideOffset={5}>
                        Access Portal
                        <Tooltip.Arrow className="fill-black" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </div>)}

                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <motion.button
                      onClick={() => handleInternalPageChange('quotation-basket')}
                      aria-label={quoteBasketCount ? `Quotation basket, ${quoteBasketCount} item${quoteBasketCount === 1 ? "" : "s"}` : "Quotation basket"}
                      className="after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:size-11 after:content-[''] relative size-[28px] md:size-[34px] bg-black rounded-full flex items-center justify-center shadow-lg mx-1 group"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        ease: "easeInOut"
                      }}
                    >
                      <motion.div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#fabf37]/20 to-transparent" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }} />
                      <ShoppingBasket className="size-3 md:size-3.5 text-[#fabf37] relative z-10" />
                      {quoteBasketCount > 0 && (
                        <motion.div className="absolute -top-1 -right-1 size-4 bg-[#fabf37] rounded-full flex items-center justify-center border border-black shadow-sm" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 15 }}>
                          <span className="text-[8px] font-black text-black">{quoteBasketCount}</span>
                        </motion.div>
                      )}
                    </motion.button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content className="bg-black text-[#fabf37] px-2 py-1 rounded-md text-[7px] font-black uppercase tracking-wider shadow-xl border border-[#fabf37]/20" sideOffset={5}>
                      Quote Basket {quoteBasketCount > 0 && `(${quoteBasketCount})`}
                      <Tooltip.Arrow className="fill-black" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>

                <div className="w-[1px] h-3 bg-black/10 mx-1 relative z-10" />

                <div className="flex items-center gap-0.5 md:gap-1 relative z-10">
                  <DropdownMenu.Root>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <DropdownMenu.Trigger asChild>
                          <button
                            className="p-1.5 md:p-2 text-black transition-all relative group flex items-center justify-center outline-none hover:bg-black/5 rounded-full"
                          >
                            <motion.span
                              key={language}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              className="text-[16px] md:text-[18px] leading-none relative z-10 inline-block filter drop-shadow-sm"
                            >
                              <motion.span
                                animate={{ rotate: [0, 15, 0, -10, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                className="inline-block origin-bottom"
                              >
                                {(() => {
                                  const flags: Record<string, string> = {
                                    'EN': '🇺🇸', 'BN': '🇧🇩', 'AR': '🇸🇦', 'TR': '🇹🇷', 'ES': '🇪🇸', 'FR': '🇫🇷',
                                    'DE': '🇩🇪', 'JP': '🇯🇵', 'CN': '🇨🇳', 'IN': '🇮🇳', 'RU': '🇷🇺', 'PT': '🇵🇹',
                                    'IT': '🇮🇹', 'KR': '🇰🇷', 'VN': '🇻🇳', 'TH': '🇹🇭', 'NL': '🇳🇱', 'ID': '🇮🇩'
                                  };
                                  return flags[language] || '🌐';
                                })()}
                              </motion.span>
                            </motion.span>
                          </button>
                        </DropdownMenu.Trigger>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content className="bg-black text-white px-2 py-1 rounded-md text-[7px] font-bold uppercase tracking-wider shadow-xl z-[6000]" sideOffset={5}>
                          Language
                          <Tooltip.Arrow className="fill-black" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>

                    <DropdownMenu.Portal>
                      <DropdownMenu.Content className="z-[6000] outline-none" sideOffset={10} align="end">
                        <motion.div
                          initial={{ opacity: 0, y: 5, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.95 }}
                          className="w-[350px] bg-white border border-black/10 rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden p-3 font-['Poppins',sans-serif]"
                        >
                          {/* Header */}
                          <div className="flex items-center justify-between mb-3 pb-2 border-b border-black/5">
                            <h4 className="text-[9px] font-black text-black/40 uppercase tracking-[0.2em]">Neural Node Selection</h4>
                            <div className="flex items-center gap-2">
                              <div className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                              <span className="text-[8px] font-bold text-black/40 uppercase tracking-widest">OS v2.5 Terminal</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-1.5 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                            {[
                              { code: "EN", name: "English", flag: "🇺🇸" },
                              { code: "BN", name: "বাংলা", flag: "🇧🇩" },
                              { code: "AR", name: "العربية", flag: "🇸🇦" },
                              { code: "TR", name: "Türkçe", flag: "🇹🇷" },
                              { code: "ES", name: "Español", flag: "🇪🇸" },
                              { code: "FR", name: "Français", flag: "🇫🇷" },
                              { code: "DE", name: "Deutsch", flag: "🇩🇪" },
                              { code: "IT", name: "Italiano", flag: "🇮🇹" },
                              { code: "PT", name: "Português", flag: "🇵🇹" },
                              { code: "RU", name: "Русский", flag: "🇷🇺" },
                              { code: "ZH", name: "中文", flag: "🇨🇳" },
                              { code: "JA", name: "日本語", flag: "🇯🇵" },
                              { code: "KO", name: "한국어", flag: "🇰🇷" },
                              { code: "HI", name: "हिन्दी", flag: "🇮🇳" },
                              { code: "ID", name: "Indonesia", flag: "🇮🇩" },
                              { code: "MS", name: "Malay", flag: "🇲🇾" },
                              { code: "VI", name: "Tiếng Việt", flag: "🇻🇳" },
                              { code: "TH", name: "ไทย", flag: "🇹🇭" },
                              { code: "NL", name: "Nederlands", flag: "🇳🇱" },
                              { code: "PL", name: "Polski", flag: "🇵🇱" },
                              { code: "SV", name: "Svenska", flag: "🇸🇪" },
                              { code: "NO", name: "Norsk", flag: "🇳🇴" },
                              { code: "FI", name: "Suomi", flag: "🇫🇮" },
                              { code: "DA", name: "Dansk", flag: "🇩🇰" },
                              { code: "EL", name: "Ελληνικά", flag: "🇬🇷" },
                              { code: "HE", name: "עברית", flag: "🇮🇱" },
                              { code: "CS", name: "Čeština", flag: "🇨🇿" },
                              { code: "HU", name: "Magyar", flag: "🇭🇺" },
                              { code: "RO", name: "Română", flag: "🇷🇴" },
                              { code: "UK", name: "Українська", flag: "🇺🇦" },
                              { code: "SK", name: "Slovenčina", flag: "🇸🇰" },
                              { code: "BG", name: "Български", flag: "🇧🇬" },
                              { code: "HR", name: "Hrvatski", flag: "🇭🇷" },
                              { code: "LT", name: "Lietuvių", flag: "🇱🇹" },
                              { code: "LV", name: "Latviešu", flag: "🇱🇻" },
                              { code: "ET", name: "Eesti", flag: "🇪🇪" },
                              { code: "SL", name: "Slovenščina", flag: "🇸🇮" },
                              { code: "MT", name: "Malti", flag: "🇲🇹" },
                              { code: "IS", name: "Íslenska", flag: "🇮🇸" },
                              { code: "GA", name: "Gaeilge", flag: "🇮🇪" },
                              { code: "SQ", name: "Shqip", flag: "🇦🇱" },
                              { code: "MK", name: "Македонски", flag: "🇲🇰" },
                              { code: "HY", name: "Հայերեն", flag: "🇦🇲" },
                              { code: "KA", name: "ქართული", flag: "🇬🇪" }
                            ].map((lang) => (
                              <DropdownMenu.Item
                                asChild
                                key={lang.code}
                                onSelect={() => setLanguage(lang.code as LanguageCode)}
                              >
                                <button
                                  className={`relative w-full text-left px-3 py-2 rounded-xl transition-all flex items-center gap-2 group/lang overflow-hidden outline-none ${language === lang.code
                                    ? "bg-[#fabf37] text-black shadow-sm"
                                    : "bg-zinc-50 hover:bg-zinc-100 text-black/70"
                                    }`}
                                >
                                  <span className="text-base">{lang.flag}</span>
                                  <div className="flex flex-col">
                                    <span className={`text-[10px] font-black uppercase tracking-wider ${language === lang.code ? "text-black" : "text-black/80 group-hover/lang:text-black transition-colors"}`}>{lang.code}</span>
                                    <span className={`text-[8px] font-bold uppercase tracking-wider ${language === lang.code ? "text-black/60" : "text-black/40"}`}>{lang.name}</span>
                                  </div>

                                  {language === lang.code && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 size-1.5 bg-black rounded-full" />
                                  )}
                                </button>
                              </DropdownMenu.Item>
                            ))}
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/5">
                            <span className="text-[8px] font-black text-black/30 uppercase tracking-[0.2em]">46 Neural Nodes Active</span>
                            <span className="text-[8px] font-black text-black/30 uppercase tracking-[0.2em]">Sync: Optimal</span>
                          </div>
                        </motion.div>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>

                  {[
                    { icon: Search, action: onSearchOpen, label: "Search" },
                    { icon: Phone, action: () => window.location.href = "tel:+8809638011101", label: "Call Us" },
                    { icon: Send, action: onEmailOpen, label: "Request a quote" }
                  ].map((item, idx) => (
                    <Tooltip.Root key={idx}>
                      <Tooltip.Trigger asChild>
                        <motion.button
                          type="button"
                          onClick={(e: React.MouseEvent) => { e.stopPropagation(); item.action(); }}
                          aria-label={item.label}
                          className="p-1 text-black/60 hover:text-black transition-all relative group after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:h-11 after:w-full after:content-['']"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <motion.div className="absolute inset-0 bg-[#fabf37]/10 rounded-full" initial={{ scale: 0, opacity: 0 }} whileHover={{ scale: 1, opacity: 1 }} />
                          <item.icon className="size-3 md:size-3.5 relative z-10" />
                        </motion.button>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content className="bg-black text-white px-2 py-1 rounded-md text-[7px] font-bold uppercase tracking-wider shadow-xl" sideOffset={5}>
                          {item.label}
                          <Tooltip.Arrow className="fill-black" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  ))}
                </div>
              </div>

              <motion.button
                type="button"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  setIsMobileMenuOpen(prev => !prev);
                }}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                className="p-1.5 md:p-2 text-black/60 hover:text-black transition-all ml-0.5 relative group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ pointerEvents: 'auto' }}
              >
                <motion.div className="absolute inset-0 bg-[#fabf37]/10 rounded-full pointer-events-none" initial={{ scale: 0, opacity: 0 }} whileHover={{ scale: 1, opacity: 1 }} />
                {isMobileMenuOpen ? (
                  <motion.div initial={{ rotate: 0 }} animate={{ rotate: 90 }} transition={{ duration: 0.3 }} className="pointer-events-none">
                    <X className="size-5 text-[#fabf37] relative z-10" />
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{
                      rotate: [0, 12, -12, 0]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut"
                    }}
                    className="pointer-events-none"
                  >
                    <Menu className="size-5 relative z-10" />
                  </motion.div>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="fixed top-[115px] right-[10%] w-[320px] bg-[#d6c8a9] border-2 border-black rounded-[24px] shadow-2xl p-4 font-['Poppins',sans-serif] max-h-[calc(100dvh-215px)] overflow-y-auto overscroll-contain custom-scrollbar z-[4000] pointer-events-auto"
            >
              <div className="flex flex-col gap-2">
                {links.map((link) => (
                  <div key={link.id} className="border-b border-black/10 last:border-0 pb-2 last:pb-0">
                    <div className="flex items-center justify-between gap-2">
                      {/* Clicking text navigates directly */}
                      <button
                        onClick={() => handleInternalPageChange(link.id || "home")}
                        className="flex-1 text-left py-1.5 text-[12px] font-bold uppercase tracking-wider text-black hover:text-[#fabf37] transition-colors"
                      >
                        {link.name}
                      </button>

                      {/* Clicking arrow toggles dropdown */}
                      {(link.hasDropdown || link.isMega) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setMobileExpanded(mobileExpanded === link.id ? null : link.id);
                            console.log('Mobile arrow clicked:', link.id, 'New state:', mobileExpanded === link.id ? null : link.id);
                          }}
                          className={`size-8 flex items-center justify-center rounded-lg transition-all ${mobileExpanded === link.id ? 'bg-[#fabf37] text-black' : 'bg-black/10 text-black/40 hover:bg-black/20'
                            }`}
                        >
                          <ChevronDown className={`size-3.5 transition-transform ${mobileExpanded === link.id ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>

                    {/* Dropdown content */}
                    {(mobileExpanded === link.id && (link.hasDropdown || link.isMega)) && (
                      <div className="overflow-hidden pl-3 pt-2 bg-white/20 rounded-lg mt-2 p-2">
                        {link.isMega ? link.categories?.map((cat: any) => (
                          <div key={cat.id} className="py-1.5">
                            <div className="text-[9px] font-black uppercase text-[#fabf37] mb-0.5">{cat.title}</div>
                            {cat.items.map((item: string, idx: number) => (
                              <button key={idx} onClick={() => handleInternalPageChange(cat.id)} className="block w-full text-left py-0.5 text-[10px] text-black/70 hover:text-black">{item}</button>
                            ))}
                          </div>
                        )) : link.items?.map((item: any) => (
                          <button key={item.id + item.name} onClick={() => handleInternalPageChange(item.id)} className="block w-full text-left py-1.5 text-[10px] font-bold uppercase text-black/70 hover:text-black">
                            {item.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-black/10 pt-6 flex flex-col gap-4">
                {/* Sustainability Promo */}
                <div className="bg-[#fabf37]/10 p-4 rounded-2xl border border-[#fabf37]/20 relative overflow-hidden group cursor-pointer hover:bg-[#fabf37]/15 transition-all">
                  <div className="absolute -top-2 -right-2 p-2 opacity-10 group-hover:opacity-20 transition-opacity rotate-12">
                    <Globe className="size-16 text-[#fabf37]" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[9px] font-black uppercase text-[rgb(255,255,255)] tracking-widest">Sustainability</span>
                    </div>
                    <h4 className="text-base font-black text-black mb-1 uppercase tracking-tight">100% Eco-Friendly</h4>
                    <p className="text-[11px] font-medium text-black/60 leading-relaxed max-w-[90%]">Our commitment to a greener future starts with every package we produce.</p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-6">
                  {/* Language Dropdown */}
                  <div className="flex items-center justify-center relative z-20">
                    <DropdownMenu.Root modal={false}>
                      <DropdownMenu.Trigger asChild>
                        <button
                          type="button"
                          className="flex items-center text-[10px] font-black uppercase text-black/60 hover:text-black outline-none"
                        >

                        </button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.Content className="z-[6000] outline-none" side="top" align="start" sideOffset={10}>
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="w-[340px] bg-white border border-black/10 rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] overflow-hidden p-3 font-['Poppins',sans-serif]"
                          >
                            <div className="flex items-center justify-between mb-3 pb-2 border-b border-black/5">
                              <h4 className="text-[9px] font-black text-black/40 uppercase tracking-[0.2em]">Neural Node Selection</h4>
                              <div className="flex items-center gap-2">
                                <div className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[8px] font-bold text-black/40 uppercase tracking-widest">OS v2.5 Terminal</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-1.5 max-h-[350px] overflow-y-auto custom-scrollbar pr-1">
                              {[
                                { code: "EN", name: "English", flag: "🇺🇸" },
                                { code: "BN", name: "বাংলা", flag: "🇧🇩" },
                                { code: "AR", name: "العربية", flag: "🇸🇦" },
                                { code: "TR", name: "Türkçe", flag: "🇹🇷" },
                                { code: "ES", name: "Español", flag: "🇪🇸" },
                                { code: "FR", name: "Français", flag: "🇫🇷" },
                                { code: "DE", name: "Deutsch", flag: "🇩🇪" },
                                { code: "IT", name: "Italiano", flag: "🇮🇹" },
                                { code: "PT", name: "Português", flag: "🇵🇹" },
                                { code: "RU", name: "Русский", flag: "🇷🇺" },
                                { code: "ZH", name: "中文", flag: "🇨🇳" },
                                { code: "JA", name: "日本語", flag: "🇯🇵" },
                                { code: "KO", name: "한국어", flag: "🇰🇷" },
                                { code: "HI", name: "हिन्दी", flag: "🇮🇳" },
                                { code: "ID", name: "Indonesia", flag: "🇮��" },
                                { code: "MS", name: "Malay", flag: "🇲🇾" },
                                { code: "VI", name: "Tiếng Việt", flag: "🇻🇳" },
                                { code: "TH", name: "ไทย", flag: "🇹🇭" },
                                { code: "NL", name: "Nederlands", flag: "🇳🇱" },
                                { code: "PL", name: "Polski", flag: "🇵🇱" },
                                { code: "SV", name: "Svenska", flag: "🇸🇪" },
                                { code: "NO", name: "Norsk", flag: "🇳🇴" },
                                { code: "FI", name: "Suomi", flag: "🇫🇮" },
                                { code: "DA", name: "Dansk", flag: "🇩🇰" },
                                { code: "EL", name: "Ελληνικά", flag: "🇬🇷" },
                                { code: "HE", name: "עברית", flag: "🇮🇱" },
                                { code: "CS", name: "Čeština", flag: "🇨🇿" },
                                { code: "HU", name: "Magyar", flag: "🇭🇺" },
                                { code: "RO", name: "Română", flag: "🇷🇴" },
                                { code: "UK", name: "Українська", flag: "🇺🇦" },
                                { code: "SK", name: "Slovenčina", flag: "🇸🇰" },
                                { code: "BG", name: "Български", flag: "🇧🇬" },
                                { code: "HR", name: "Hrvatski", flag: "🇭🇷" },
                                { code: "LT", name: "Lietuvių", flag: "🇱🇹" },
                                { code: "LV", name: "Latviešu", flag: "🇱🇻" },
                                { code: "ET", name: "Eesti", flag: "🇪🇪" },
                                { code: "SL", name: "Slovenščina", flag: "🇸🇮" },
                                { code: "MT", name: "Malti", flag: "🇲🇹" },
                                { code: "IS", name: "Íslenska", flag: "🇮🇸" },
                                { code: "GA", name: "Gaeilge", flag: "🇮🇪" },
                                { code: "SQ", name: "Shqip", flag: "🇦🇱" },
                                { code: "MK", name: "Македонски", flag: "🇲🇰" },
                                { code: "HY", name: "Հայերեն", flag: "🇦🇲" },
                                { code: "KA", name: "ქართული", flag: "🇬🇪" }
                              ].map((lang) => (
                                <DropdownMenu.Item
                                  asChild
                                  key={lang.code}
                                  onSelect={() => setLanguage(lang.code as LanguageCode)}
                                >
                                  <button
                                    className={`relative w-full text-left px-3 py-2 rounded-xl transition-all flex items-center gap-2 group/lang overflow-hidden outline-none ${language === lang.code
                                      ? "bg-[#fabf37] text-black shadow-sm"
                                      : "bg-zinc-50 hover:bg-zinc-100 text-black/70"
                                      }`}
                                  >
                                    <span className="text-xl shadow-sm rounded-sm overflow-hidden">{lang.flag}</span>
                                    <div className="flex flex-col">
                                      <span className={`text-[10px] font-black uppercase tracking-wider ${language === lang.code ? "text-black" : "text-black/80 group-hover/lang:text-black transition-colors"}`}>{lang.code}</span>
                                      <span className={`text-[8px] font-bold uppercase tracking-wider ${language === lang.code ? "text-black/60" : "text-black/40"}`}>{lang.name}</span>
                                    </div>

                                    {language === lang.code && (
                                      <div className="absolute right-3 top-1/2 -translate-y-1/2 size-1.5 bg-black rounded-full" />
                                    )}
                                  </button>
                                </DropdownMenu.Item>
                              ))}
                            </div>

                            {/* Dropdown Footer */}
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/5">
                              <span className="text-[8px] font-black text-black/30 uppercase tracking-[0.2em]">46 Neural Nodes Active</span>
                              <span className="text-[8px] font-black text-black/30 uppercase tracking-[0.2em]">Sync: Optimal</span>
                            </div>
                          </motion.div>
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    {/* System Time & Quick Actions */}


                    <div className="flex flex-col items-center gap-4 mt-6 mb-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black -mt-8">Made in Bangladesh 🇧🇩</span>
                      <div className="flex items-center gap-3">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="size-10 flex items-center justify-center bg-black/5 rounded-full text-black/40 hover:text-[#1877F2] hover:bg-[#1877F2]/10 transition-all border border-black/5"><Facebook className="size-5" /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="size-10 flex items-center justify-center bg-black/5 rounded-full text-black/40 hover:text-[#E4405F] hover:bg-[#E4405F]/10 transition-all border border-black/5"><Instagram className="size-5" /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="size-10 flex items-center justify-center bg-black/5 rounded-full text-black/40 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all border border-black/5"><Linkedin className="size-5" /></a>
                      </div>
                    </div>

                    {/* Digital Live Feed Ticker */}
                    {/* Social Live Feed Ticker */}
                    <div className="mt-6 w-full overflow-hidden bg-black/5 py-5 rounded-lg border border-black/5 relative group cursor-pointer" onClick={() => onPageChange('socials')}>
                      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-zinc-50 to-transparent z-10" />
                      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-zinc-50 to-transparent z-10" />

                      {/* Live Indicator */}
                      <div className="absolute top-2 right-2 z-20">
                        <span className="flex size-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full size-2 bg-red-500"></span>
                        </span>
                      </div>

                      <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                        className="flex whitespace-nowrap gap-8"
                      >
                        {[...posts.filter(p => !p.isHidden).slice(0, 6), ...posts.filter(p => !p.isHidden).slice(0, 6)].map((post, i) => (
                          <div key={`${post.id}-${i}`} className="flex items-center gap-5">
                            <div className="relative shrink-0">
                              <img src={post.img} alt={post.platform} className="size-24 rounded-lg object-cover border border-black/10 shadow-sm" />
                              <div className={`absolute -bottom-2 -right-2 p-1.5 rounded-full border-2 border-white shadow-sm ${post.platform === 'Instagram' ? 'bg-pink-500 text-white' :
                                post.platform === 'Facebook' ? 'bg-blue-600 text-white' :
                                  post.platform === 'LinkedIn' ? 'bg-sky-700 text-white' :
                                    'bg-red-600 text-white'
                                }`}>
                                {post.platform === 'Instagram' ? <Instagram className="size-3.5" /> :
                                  post.platform === 'Facebook' ? <Facebook className="size-3.5" /> :
                                    post.platform === 'LinkedIn' ? <Linkedin className="size-3.5" /> :
                                      <Youtube className="size-3.5" />}
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-xs font-bold uppercase tracking-wide text-black/90 max-w-[240px] truncate">{post.caption}</span>
                              <span className="text-[10px] font-medium text-black/50 flex items-center gap-2">
                                {post.platform} <span className="size-1 rounded-full bg-black/30" /> {post.date}
                              </span>
                            </div>
                            <div className="w-px h-16 bg-black/5 mx-2" />
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  </div>

                  <div className="w-full overflow-hidden bg-black/5 py-2.5 rounded-lg border border-black/5 mt-2">
                    <motion.div
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="flex items-center gap-8 whitespace-nowrap"
                    >
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-8">
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black/40">System Status: Online</span>
                          <span className="text-[9px] text-[#fabf37]">●</span>
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black/40">Secure Connection</span>
                          <span className="text-[9px] text-[#fabf37]">●</span>
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black/40">v2.5.0-beta</span>
                          <span className="text-[9px] text-[#fabf37]">●</span>
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black/40">Paperware OS</span>
                          <span className="text-[9px] text-[#fabf37]">●</span>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </Tooltip.Provider>
  );
});

Navbar.displayName = "Navbar";
