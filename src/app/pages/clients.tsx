import React from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowRight, Package, Layers, Globe, Users } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useScrollScrub, clamp01, smooth } from "../lib/useScrollScrub";
import imgChowmein from "@/assets/products/chowmein-boxes.webp";
import imgTakeaway from "@/assets/products/takeaway-food-box.webp";
import imgGiftBags from "@/assets/products/gift-bags.webp";
import imgCookie from "@/assets/products/cookie-boxes.webp";
import imgConfectionery from "@/assets/products/confectionery-boxes.webp";
import imgMedicine from "@/assets/products/medicine-boxes.webp";
import imgTissue from "@/assets/products/tissue-boxes.webp";
import imgBrochures from "@/assets/products/brochures.webp";
import imgCarry from "@/assets/products/carry-bag-pink.webp";
import imgFloor from "@/assets/factory/floor-cup-machines.webp";
import { ClientLogoWall } from "../components/paperware/client-logos";
import { ClientReels } from "../components/paperware/client-reels";

// Client identities are confidential: no customer names, logos or testimonials are shown.
// The only audience claim is the verified statement below.
const ROW_A = [
  { src: imgChowmein, alt: "Paperware chowmein boxes" },
  { src: imgTakeaway, alt: "Paperware takeaway food box" },
  { src: imgCookie, alt: "Paperware cookie boxes" },
  { src: imgConfectionery, alt: "Paperware confectionery boxes" },
  { src: imgTissue, alt: "Paperware tissue boxes" },
];
const ROW_B = [
  { src: imgGiftBags, alt: "Paperware gift bags" },
  { src: imgMedicine, alt: "Paperware medicine boxes" },
  { src: imgBrochures, alt: "Paperware brochures" },
  { src: imgCarry, alt: "Paperware carry bag" },
  { src: imgChowmein, alt: "Paperware chowmein boxes" },
];

export function ClientsPage({
  onPageChange,
}: {
  // Accepted for API compatibility with the app shell; intentionally ignored
  // (the shell seeds placeholder partner logos and a third-party video).
  videoUrl?: string;
  productionStats?: any;
  onPageChange?: (page: string) => void;
  partnersData?: any[];
}) {
  const { t } = useLanguage();
  const heroRef = React.useRef<HTMLDivElement>(null);
  const reelRef = React.useRef<HTMLDivElement>(null);
  const rowARef = React.useRef<HTMLDivElement>(null);
  const rowBRef = React.useRef<HTMLDivElement>(null);
  const stmtRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useSpring(useTransform(heroProgress, [0, 1], [1, 0.5]), { stiffness: 80, damping: 25 });
  const heroRadius = useTransform(heroProgress, [0, 1], ["0px", "80px"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8, 1], [1, 1, 0]);

  // Product reels slide in opposite directions 1:1 with scroll; the statement block scales up as it enters.
  useScrollScrub(() => {
    const h = window.innerHeight;
    const reel = reelRef.current;
    if (reel) {
      const r = reel.getBoundingClientRect();
      const p = clamp01((h - r.top) / (h + r.height));
      const a = rowARef.current;
      const b = rowBRef.current;
      const maxA = a ? Math.max(0, a.scrollWidth - a.parentElement!.clientWidth) : 0;
      const maxB = b ? Math.max(0, b.scrollWidth - b.parentElement!.clientWidth) : 0;
      if (a) a.style.transform = `translate3d(${(-smooth(p) * maxA).toFixed(1)}px,0,0)`;
      if (b) b.style.transform = `translate3d(${((smooth(p) - 1) * maxB).toFixed(1)}px,0,0)`;
    }
    const stmt = stmtRef.current;
    if (stmt) {
      const r = stmt.getBoundingClientRect();
      const p = clamp01((h - r.top) / (h * 0.7));
      stmt.style.transform = `scale(${(0.92 + 0.08 * smooth(p)).toFixed(4)})`;
      stmt.style.opacity = String(0.3 + 0.7 * smooth(p));
    }
  });

  const banners = [
    { id: "products", icon: Package, title: "All Products", text: "Explore our complete range of eco-friendly paper solutions", tone: "bg-[#fabf37] text-black" },
    { id: "solutions", icon: Layers, title: "Solutions", text: "Custom packaging solutions tailored to your business needs", tone: "bg-black text-white" },
    { id: "export", icon: Globe, title: "Export", text: "Interested in international expansion & export markets", tone: "bg-black text-white" },
    { id: "contact", icon: Users, title: "Contact Paperware", text: "Get in touch with our team for inquiries and partnerships", tone: "bg-[#fabf37] text-black" },
  ];

  return (
    <div className="relative pb-24 bg-white min-h-screen overflow-x-hidden selection:bg-[#fabf37] selection:text-black">
      <div className="container mx-auto px-4 pt-0 relative z-20">
        {/* Hero */}
        <div ref={heroRef} className="h-[120vh] md:h-[150vh] relative -mx-4">
          <motion.div
            style={{ scale: heroScale, borderRadius: heroRadius, opacity: heroOpacity }}
            className="sticky top-0 h-screen w-full bg-[#fabf37] overflow-hidden flex flex-col items-center justify-center border-2 border-white/20"
          >
            <div className="relative z-10 text-center px-6">
              <div className="inline-flex items-center gap-3 bg-black text-white px-5 py-2.5 rounded-xl mb-10 mx-auto">
                <span className="text-[8px] font-black uppercase tracking-[0.3em]">{t("clients_clients")}</span>
              </div>
              <h1 className="text-[56px] md:text-[120px] lg:text-[160px] font-black uppercase tracking-tighter leading-[0.8] text-black">
                {t("building_legacies").split(" ").map((word, wi) => (
                  <span key={wi} className="inline-block mr-4 last:mr-0">
                    {t(word)}
                  </span>
                ))}
              </h1>
            </div>
          </motion.div>
        </div>

        {/* Verified audience statement */}
        <div className="max-w-6xl mx-auto mb-20 md:mb-32">
          <div
            ref={stmtRef}
            className="bg-[#fabf37] text-black rounded-[40px] md:rounded-[64px] px-8 py-16 md:px-20 md:py-28 text-center origin-center will-change-transform"
          >
            <p className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.95]">
              {t("clients_trusted_by_caf_s_restaurants")}
            </p>
          </div>
        </div>
      </div>

      {/* Client logo wall (owner-supplied logos from the original site) */}
      <ClientLogoWall />

      {/* Client brand reels (Facebook embeds, owner-supplied links) */}
      <ClientReels />

      {/* Real product reels */}
      <div ref={reelRef} className="bg-black py-16 md:py-24 overflow-hidden space-y-6 md:space-y-8">
        {[
          { ref: rowARef, items: ROW_A },
          { ref: rowBRef, items: ROW_B },
        ].map((row, ri) => (
          <div key={ri} className="overflow-hidden">
            <div ref={row.ref} className="flex gap-6 md:gap-8 w-max px-4 will-change-transform">
              {row.items.map((it, i) => (
                <div key={i} className="w-[240px] md:w-[360px] aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-900 shrink-0">
                  <img src={it.src} alt={t(it.alt)} loading="lazy" className="size-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-20 pt-16 md:pt-24">
        <div className="relative rounded-[40px] overflow-hidden mb-12 h-[260px] md:h-[380px]">
          <img src={imgFloor} alt={t("clients_paperware_cup_machines_on_the")} loading="lazy" className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* CTA banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {banners.map((b) => (
            <motion.button
              key={b.id}
              type="button"
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => onPageChange?.(b.id)}
              className={`${b.tone} rounded-3xl p-8 text-left group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-black/10 rounded-xl">
                  <b.icon className="size-6" />
                </div>
                <ArrowRight className="size-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2">{t(b.title)}</h3>
              <p className="text-sm font-medium opacity-80">{t(b.text)}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
