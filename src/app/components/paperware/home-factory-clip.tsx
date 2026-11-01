import React from "react";
import { FactoryClip, mediaUrl } from "./factory-clip";
import posterCup from "../../../assets/video-posters/home-cup-render.webp";

const CUP_VIDEO = mediaUrl("home-cup-render.mp4");

/**
 * Home: one real Paperware clip (the brand's own paper-cup render, public/media/SOURCES.txt)
 * between Featured Products and Trusted By. Plain autoplay, no counters, no CTA.
 */
export function HomeFactoryClip() {
  return (
    <section className="bg-black text-white py-20 md:py-28 [content-visibility:visible]" aria-labelledby="home-clip-h">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(0,360px)] gap-10 md:gap-16 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#fabf37]">Made in our factory</span>
            <h2 id="home-clip-h" className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              Paper cups, <br />
              <span className="text-zinc-500">formed and printed</span> <br />
              in Dhaka.
            </h2>
            <p className="text-zinc-400 font-bold uppercase tracking-widest text-[11px] leading-relaxed max-w-md">
              Formed and printed on our own lines. Real footage from the Paperware factory.
            </p>
          </div>
          <FactoryClip
            src={CUP_VIDEO}
            poster={posterCup}
            label="paper cup"
            className="order-1 md:order-2 aspect-[9/16] w-full max-w-[360px] mx-auto rounded-[40px] border-[10px] border-zinc-900 shadow-2xl"
            controlPosition="bottom-right"
          />
        </div>
      </div>
    </section>
  );
}
