import React from "react";
import { FactoryClip, mediaUrl } from "./factory-clip";
import posterCup from "../../../assets/video-posters/home-cup-render.webp";
import { useLanguage } from "../../context/LanguageContext";

const CUP_VIDEO = mediaUrl("home-cup-render.mp4");

/**
 * Home: one real Paperware clip (the brand's own paper-cup render, public/media/SOURCES.txt)
 * between Featured Products and Trusted By. Plain autoplay, no counters, no CTA.
 */
export function HomeFactoryClip() {
  const { t } = useLanguage();
  return (
    <section className="bg-black text-white py-20 md:py-28 [content-visibility:visible]" aria-labelledby="home-clip-h">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(0,360px)] gap-10 md:gap-16 items-center">
          <div className="space-y-6 order-2 md:order-1">
            {/* Owner (3 Nov 2026): the "Paper cups formed and printed in Dhaka." headline was removed; the eyebrow now labels the section. */}
            <h2 id="home-clip-h" className="text-[10px] font-black uppercase tracking-[0.3em] text-[#fabf37]">{t("home_factory_clip_made_in_our_factory")}</h2>
            <p className="text-zinc-400 font-bold uppercase tracking-widest text-[11px] leading-relaxed max-w-md">
              {t("home_factory_clip_formed_and_printed_on_our")}
            </p>
          </div>
          <FactoryClip
            src={CUP_VIDEO}
            poster={posterCup}
            label={t("home_factory_clip_paper_cup")}
            className="order-1 md:order-2 aspect-[9/16] w-full max-w-[360px] mx-auto rounded-[40px] border-[10px] border-zinc-900 shadow-2xl"
            controlPosition="bottom-right"
          />
        </div>
      </div>
    </section>
  );
}
