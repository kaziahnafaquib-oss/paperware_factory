import React from "react";
import { Maximize2 } from "lucide-react";
import yCupStack from "figma:asset/aeed94788eb16edccd466a19c50e38006db16bf5.webp";
import imgTakeaway from "../../assets/products/takeaway-food-box.webp";
import imgGiftBags from "../../assets/products/gift-bags.webp";
import imgChowmein from "../../assets/products/chowmein-boxes.webp";
import imgCarryBag from "../../assets/products/carry-bag-pink.webp";
import imgMedicine from "../../assets/products/medicine-boxes.webp";
import imgCookie from "../../assets/products/cookie-boxes.webp";
import imgConf from "../../assets/products/confectionery-boxes.webp";
import imgTissue from "../../assets/products/tissue-box-rose.webp";
import imgCalendar from "../../assets/products/desk-calendars.webp";
import imgBrochure from "../../assets/products/brochures.webp";
import imgMagazine from "../../assets/products/magazines.webp";
import imgStickers from "../../assets/products/stickers.webp";
import imgPurpleBag from "../../assets/products/gift-bag-purple.webp";
import imgFlyers from "../../assets/products/flyers.webp";
import imgRx from "../../assets/products/prescription-pad.webp";
import { useScrollScrub, clamp01, easeOut3 } from "../lib/useScrollScrub";
import { FactoryClip, mediaUrl } from "../components/paperware/factory-clip";
import posterCups from "../../assets/video-posters/gallery-printed-cups.webp";
import posterPress from "../../assets/video-posters/manufacturing-press.webp";
import { useLanguage } from "../context/LanguageContext";

// Real Paperware product photos (src/assets/products) and factory clips (public/media, see
// public/media/SOURCES.txt). Labels are product categories, not client names.
type GalleryItem = { url: string; title: string; client: string; video?: string; poster?: string };
const galleryImages: GalleryItem[] = [
  { url: imgTakeaway, title: "Takeaway Food Boxes", client: "Food Service" },
  { url: posterCups, video: mediaUrl("gallery-printed-cups.mp4"), poster: posterCups, title: "Printed Paper Cups", client: "Hot Drinks" },
  { url: imgGiftBags, title: "Printed Gift Bags", client: "Retail" },
  { url: imgChowmein, title: "Chowmein Boxes", client: "Food Service" },
  { url: imgCarryBag, title: "Branded Carry Bags", client: "Retail" },
  { url: posterPress, video: mediaUrl("manufacturing-press.mp4"), poster: posterPress, title: "Offset Printing Unit", client: "In the Factory" },
  { url: imgMedicine, title: "Medicine Boxes", client: "Pharma" },
  { url: yCupStack, title: "Ripple Cups", client: "Hot Drinks" },
  { url: imgCookie, title: "gallery_cookie_boxes", client: "gallery_cat_bakery" },
  { url: imgConf, title: "gallery_confectionery_boxes", client: "gallery_cat_confectionery" },
  { url: imgTissue, title: "gallery_tissue_boxes", client: "gallery_cat_hospitality" },
  { url: imgCalendar, title: "gallery_desk_calendars", client: "gallery_cat_corporate" },
  { url: imgBrochure, title: "gallery_brochures", client: "gallery_cat_print" },
  { url: imgMagazine, title: "gallery_magazines", client: "gallery_cat_print" },
  { url: imgStickers, title: "gallery_stickers", client: "gallery_cat_packaging" },
  { url: imgPurpleBag, title: "gallery_purple_gift_bags", client: "Retail" },
  { url: imgFlyers, title: "gallery_flyers", client: "gallery_cat_print" },
  { url: imgRx, title: "gallery_prescription_pads", client: "Pharma" },
];

export function GalleryPage() {
  const { t } = useLanguage();
  const headRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);

  // Scroll-scrubbed: header lifts and fades; cards rise and settle, staggered by column.
  useScrollScrub(() => {
    const h = window.innerHeight || 1;
    const head = headRef.current;
    if (head) {
      const p = clamp01(window.scrollY / (h * 0.5));
      head.style.transform = `translate3d(0,${(p * 60).toFixed(1)}px,0)`;
      head.style.opacity = (1 - 0.6 * p).toFixed(3);
    }
    const grid = gridRef.current;
    if (grid) {
      grid.querySelectorAll<HTMLElement>("[data-card]").forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const u = easeOut3(clamp01((h - r.top) / (h * 0.55)) - (i % 3) * 0.08);
        el.style.transform = `translate3d(0,${((1 - u) * 80).toFixed(1)}px,0) scale(${(0.95 + 0.05 * u).toFixed(4)})`;
        el.style.opacity = (0.1 + 0.9 * u).toFixed(3);
      });
    }
  });

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-['Poppins',sans-serif] overflow-x-clip">
      <div className="container mx-auto px-4">
        <div ref={headRef} className="text-center mb-24 space-y-4 will-change-transform">
          <span className="text-[#fabf37] font-black uppercase tracking-[0.4em] text-xs">{t("gallery_showcase")}</span>
          <h1 className="text-[52px] font-black uppercase tracking-tight leading-none text-black">
            {t("gallery_our_work")} <br /> {t("gallery_portfolio")}
          </h1>
          <p className="text-zinc-400 font-bold max-w-xl mx-auto pt-4">
            {t("gallery_take_a_look_at_some")}
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((item, i) => (
            <div
              key={i}
              data-card
              className="group relative h-[450px] rounded-[40px] overflow-hidden bg-zinc-100 shadow-xl will-change-transform"
            >
              {item.video && item.poster ? (
                <FactoryClip
                  src={item.video}
                  poster={item.poster}
                  label={item.title.toLowerCase()}
                  className="absolute inset-0 size-full"
                  controlPosition="top-right"
                />
              ) : (
                <img loading={i < 3 ? "eager" : "lazy"} decoding="async"
                  src={item.url}
                  alt={t(item.title)}
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="pointer-events-none absolute inset-0 p-10 flex flex-col justify-end translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-[#fabf37] font-black uppercase tracking-[0.2em] text-[10px]">{t(item.client)}</p>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-6">{t(item.title)}</h3>
                <span aria-hidden="true" className="size-14 rounded-2xl bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#fabf37] hover:text-black transition-colors">
                  <Maximize2 className="size-6" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
