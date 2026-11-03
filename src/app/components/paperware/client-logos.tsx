import React from "react";
import "./client-logos.css";
import { ImageWithFallback } from "../figma/ImageWithFallback";

import imgSwish from "figma:asset/d07c4da6a8a6d0044e29458d685d2f999a52427b.webp";
import imgIntercontinental from "figma:asset/e5cd2ece8d72457632c8666eea18c92ebb1e78a3.webp";
import imgHolidayInn from "figma:asset/f6b9e36dbf11e2d246417fbb2d258155f7f9a479.webp";
import imgEagleAgency from "figma:asset/a6b5ca68042a20a6c62623c3448766c4fc7beb4e.webp";
import imgDhakaBoatClub from "figma:asset/484cddbb0a4719fc316882618a25f084e2b1abc9.webp";
import imgCafeBir from "figma:asset/4b036cd41a84569f614c98aef871a7ce4d2d0c80.webp";
import imgAci from "figma:asset/f16a78ba0dd54cbdf4aa6d7054825e515e96f035.webp";
import imgGauravJewellers from "figma:asset/c82ff60537a7a75c52b852cde7d1fc285e19a6c1.webp";
import imgDiamondWorld from "figma:asset/e82f545f1fdff4d8d7c1a2a00edf14bc22e11bf5.webp";
import imgSquareHospitals from "figma:asset/944389e54537c0eb55260dcebf9f7900b792dd7f.webp";
import imgRenata from "figma:asset/61b07ca520a337d43cd3ab040af7a1f5a28a9d9d.webp";
import imgRadiant from "figma:asset/9069057e3e51904ef3041bc4c5eb56fed98e0164.png";
import imgPmchl from "figma:asset/e64cd2ee50c742639b1135197a7c8220e104d1cc.png";
import imgNovatek from "figma:asset/acfbf69c5be13b6af2d163459f1ceb3477eebd2a.webp";
import imgLovenTaste from "figma:asset/67a4f8b2c9653ea62d2c8349b427d6fe380b99a9.png";
import imgKonaCafe from "figma:asset/d90e47ede71caca60446757a1cace25c72162637.webp";
import imgKhanas from "figma:asset/b7ddc1b83ba4ac963d95acc6932cc7c077231065.webp";
import imgKaziKaziTea from "figma:asset/b48146b672186270c6b579b89a93120549b72b77.png";
import imgIspahani from "figma:asset/e192b13abd540f9f302f8a638db3c8bdde925335.webp";
import imgIccbHeritage from "figma:asset/258cc4f6b52d788b372a16376b04f2d5d5dcf3b4.png";
import imgHerfy from "figma:asset/4b9569cdcf589af5e6886c82fd2b3d0f05e39eef.webp";
import imgCoffeelime from "figma:asset/b7b18e09947e3be75f397ac05fbd8f17d645fe76.webp";
import imgCoffeelicious from "figma:asset/2aa86228832bdc318b2b0d093ace834c92c7996b.webp";
import imgCoffeeBuzz from "figma:asset/289023b85676588401219cb6a006f1a3401d1a36.webp";
import imgCoffeeAvenue from "figma:asset/e1b52edc4bd49baf663705f27f615b1ffa798c3a.webp";
import imgCocacola from "figma:asset/e2067cd206580d5e1214472e4e8e9f6af3a8c607.png";
import imgClubGelato from "figma:asset/3003225026d617c618b47dd6eb290f69ae46f136.webp";
import imgChaChill from "figma:asset/009e5f3c631e1858a665531672d0ffcc69d21dcc.webp";
import imgTranscom from "figma:asset/fa6c46cdcb30bd3f437a9a5827e6450447989634.webp";
import imgTheWaffleHouse from "figma:asset/647a60ec209ee728f98c8f2028802218f584350d.webp";
import imgTheLocalCoffee from "figma:asset/058c912908a675dd8f29e166420432fcc4643d90.webp";
import imgTerraBistro from "figma:asset/cebce585c69603a15f21e8c16a2274c0439654c4.webp";
import imgTeaLounge from "figma:asset/d3505f2cc7c33731db33889792afb434adfda40f.webp";
import imgTeaFirin from "figma:asset/0dd1f563ffeac48fcd397177d2282cf47d8042d4.webp";
import { useLanguage } from "../../context/LanguageContext";

export type ClientLogo = { name: string; img: string; category: string };

/** Client logos carried over from the original Paperware Factory website (owner-supplied). */
export const CLIENT_LOGOS: ClientLogo[] = [
  { name: "Swish", img: imgSwish, category: "Hospitality" },
  { name: "Intercontinental", img: imgIntercontinental, category: "Hospitality" },
  { name: "Holiday Inn", img: imgHolidayInn, category: "Hospitality" },
  { name: "Eagle Agency", img: imgEagleAgency, category: "Others" },
  { name: "Dhaka Boat Club", img: imgDhakaBoatClub, category: "Others" },
  { name: "Cafe Bir", img: imgCafeBir, category: "Beverage" },
  { name: "ACI", img: imgAci, category: "Healthcare" },
  { name: "Gaurav Jewellers", img: imgGauravJewellers, category: "Retail" },
  { name: "Diamond World", img: imgDiamondWorld, category: "Retail" },
  { name: "Square Hospitals", img: imgSquareHospitals, category: "Healthcare" },
  { name: "Renata", img: imgRenata, category: "Healthcare" },
  { name: "Radiant", img: imgRadiant, category: "Healthcare" },
  { name: "PMCHL", img: imgPmchl, category: "Healthcare" },
  { name: "Novatek", img: imgNovatek, category: "Healthcare" },
  { name: "Loven Taste", img: imgLovenTaste, category: "Beverage" },
  { name: "Kona Cafe", img: imgKonaCafe, category: "Beverage" },
  { name: "Khanas", img: imgKhanas, category: "Beverage" },
  { name: "Kazi & Kazi Tea", img: imgKaziKaziTea, category: "Beverage" },
  { name: "Ispahani", img: imgIspahani, category: "Beverage" },
  { name: "ICCB Heritage", img: imgIccbHeritage, category: "Hospitality" },
  { name: "Herfy", img: imgHerfy, category: "Beverage" },
  { name: "Coffeelime", img: imgCoffeelime, category: "Beverage" },
  { name: "Coffeelicious", img: imgCoffeelicious, category: "Beverage" },
  { name: "Coffee Buzz", img: imgCoffeeBuzz, category: "Beverage" },
  { name: "Coffee Avenue", img: imgCoffeeAvenue, category: "Beverage" },
  { name: "Coca-Cola", img: imgCocacola, category: "Beverage" },
  { name: "Club Gelato", img: imgClubGelato, category: "Beverage" },
  { name: "Cha Chill", img: imgChaChill, category: "Beverage" },
  { name: "Transcom", img: imgTranscom, category: "Others" },
  { name: "The Waffle House", img: imgTheWaffleHouse, category: "Beverage" },
  { name: "The Local Coffee", img: imgTheLocalCoffee, category: "Beverage" },
  { name: "Terra Bistro", img: imgTerraBistro, category: "Beverage" },
  { name: "Tea Lounge", img: imgTeaLounge, category: "Beverage" },
  { name: "Tea Firin", img: imgTeaFirin, category: "Beverage" },
];


/**
 * Client logo wall. Three rows auto-scroll (CSS marquee, alternating direction), pause on hover.
 * The owner asked for continuous motion, so it also runs under prefers-reduced-motion (slower).
 */
export function ClientLogoWall({ logos = CLIENT_LOGOS }: { logos?: ClientLogo[] }) {
  const { t } = useLanguage();
  const rows = React.useMemo(() => {
    const per = Math.ceil(logos.length / 3);
    return [0, 1, 2].map((r) => {
      const slice = logos.slice(r * per, (r + 1) * per);
      return [...slice, ...slice];
    });
  }, [logos]);

  if (!logos.length) return null;

  return (
    <section aria-label={t("client_logos_our_clients")} className="py-16 md:py-24 bg-[#fdfaf3] border-y border-zinc-100 [content-visibility:visible]" style={{ overflowX: "clip" }}>
      <div className="container mx-auto px-4 mb-10 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-black">
          {t("client_logos_brands_we")} <span className="text-zinc-400">{t("client_logos_pack_for")}</span>
        </h2>
        <p className="text-zinc-500 font-bold text-xs md:text-sm uppercase tracking-widest">{logos.length} {t("client_logos_clients_bangladesh")}</p>
      </div>
      <div className="flex flex-col gap-5 md:gap-8">
        {rows.map((row, ri) => (
          <div key={ri} className="pw-logo-track overflow-hidden">
            <div
              className="pw-logo-row flex items-center gap-5 md:gap-8 w-max px-4 will-change-transform"
              style={{ animationDuration: `${Math.max(30, row.length * 3)}s`, animationDirection: ri % 2 ? "reverse" : "normal" }}
            >
              {row.map((c, i) => (
                <div
                  key={`${ri}-${i}`}
                  title={t(c.name)}
                  className="bg-white size-24 md:size-32 rounded-full p-5 md:p-7 flex items-center justify-center shadow-[0_8px_20px_-8px_rgba(0,0,0,0.08)] border border-zinc-100 shrink-0"
                >
                  <ImageWithFallback src={c.img} alt={t(c.name)} loading="lazy" decoding="async" className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
