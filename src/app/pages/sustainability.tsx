import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import { Leaf, Recycle, Droplets, Sun, Wind, Globe, TrendingDown, ArrowUpRight } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from "recharts";
import bannerImage from "figma:asset/5c87293e5521da72382b054681e7166a818841e9.webp";
import exampleImage from 'figma:asset/de22a1513e35499b5f2c79ba9800a59dbb7543f8.webp';
import { SustainJourneyGlobe } from "../components/paperware/sustain-journey-globe";
import { SustainCupStory } from "../components/paperware/sustain-cup-story";
import { FactoryClip, mediaUrl } from "../components/paperware/factory-clip";
import posterFloor from "../../assets/video-posters/factory-floor-wide.jpg";
import { StorySection } from "../components/sustainability/StorySection";
import { ProcessStepsSection } from "../components/sustainability/ProcessStepsSection";
import { TopSellingProducts } from "../components/TopSellingProducts";

const impactData = [
  { month: 'Jan', co2: 45, water: 120 },
  { month: 'Feb', co2: 52, water: 135 },
  { month: 'Mar', co2: 48, water: 110 },
  { month: 'Apr', co2: 61, water: 150 },
  { month: 'May', co2: 55, water: 140 },
  { month: 'Jun', co2: 67, water: 165 },
];

const materialData = [
  { name: 'Paper', value: 85, color: '#fabf37' },
  { name: 'Water-based Ink', value: 10, color: '#000000' },
  { name: 'Eco-Coating', value: 5, color: '#4ade80' },
];

export function SustainabilityPage() {
  const { t } = useLanguage();
  const heroRef = React.useRef(null);
  const { scrollY } = useScroll();
  const [videoUrl, setVideoUrl] = React.useState("");
  const [videoError, setVideoError] = React.useState(false);

  React.useEffect(() => {
    // CMS video endpoint is not live yet; opt in with VITE_CMS_IMAGES=true.
    if (import.meta.env.VITE_CMS_IMAGES !== 'true') return;
    fetch(`https://${projectId}.supabase.co/functions/v1/make-server-bf34c9a5/sustainability/hero-video`, {
      headers: { Authorization: `Bearer ${publicAnonKey}` }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.url) {
          setVideoUrl(data.url);
        } else {
          console.warn('⚠️ No video URL in backend response');
        }
      })
      .catch(err => {
        console.error('❌ Error fetching video URL:', err);
        setVideoError(true);
      });
  }, []);

  // Parallax effect for text
  // const textY = useTransform(scrollY, [0, 500], [0, 200]);
  // const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative bg-[#fdfaf3] min-h-screen">
      {/* Full Screen Hero Banner */}
      <div ref={heroRef} className="relative min-h-screen w-full overflow-hidden bg-zinc-900 flex flex-col justify-end pb-20">
        {/* Real factory-floor footage, graded, with a dark scrim so the text stays readable */}
        <div className="absolute inset-0">
        <FactoryClip
          src={mediaUrl("factory-floor-wide.mp4")}
          poster={posterFloor}
          graded
          label={t("manufacturing_floor_video")}
          className="size-full"
        >
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/30 pointer-events-none" />
        </FactoryClip>
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 flex flex-col gap-12 justify-end h-full pt-32">

          {/* Header and Stat Card Section */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-medium text-white max-w-2xl leading-tight drop-shadow-lg"
            >
              {t("sustainability_empowering")} <br />
              <span className="text-[#fabf37]">{t("sustainability_sustainable_practices")}</span>
            </motion.h1>

          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#9DC88D] p-4 rounded-xl h-[160px] flex flex-col justify-center relative overflow-hidden group"
            >
              <h3 className="text-sm font-bold text-white mb-1.5 relative z-10 leading-tight">{t("sustainability_sustainable_corporate_governance")}</h3>
              <p className="text-white/90 text-[10px] font-medium leading-relaxed relative z-10">
                {t("sustainability_dedicated_to_transparency_accountability")}
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[#4D8B55] p-4 rounded-xl h-[160px] flex flex-col justify-center relative overflow-hidden group"
            >
              <h3 className="text-sm font-bold text-white mb-1.5 relative z-10 leading-tight">{t("sustainability_ethical_supply_chain")}</h3>
              <p className="text-white/90 text-[10px] font-medium leading-relaxed relative z-10">
                {t("sustainability_our_supply_chain_starts_with")}
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-[#1A5336] p-4 rounded-xl h-[160px] flex flex-col justify-center relative overflow-hidden group"
            >
              <h3 className="text-sm font-bold text-white mb-1.5 relative z-10 leading-tight">{t("sustainability_material_reduction_and_replacement")}</h3>
              <p className="text-white/80 text-[10px] font-medium leading-relaxed relative z-10">
                {t("sustainability_minimizing_material_usage_and_replacing")}
              </p>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-[#0D3B2E] p-4 rounded-xl h-[160px] flex flex-col justify-center relative overflow-hidden group"
            >
              <h3 className="text-sm font-bold text-white mb-1.5 relative z-10 leading-tight">{t("sustainability_paperware_happiness_project")}</h3>
              <p className="text-white/70 text-[10px] font-medium leading-relaxed relative z-10">
                {t("sustainability_initiative_aimed_to_promote_employee")}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="bg-white relative z-10 pt-4 px-4 md:px-8 container mx-auto">
        <SustainJourneyGlobe />
      </div>

      {/* Story of a Green Cup: heading, then the scroll-scrubbed cup */}
      <div className="bg-white relative z-10 px-4 md:px-8 container mx-auto">
        <StorySection />
        <SustainCupStory />
      </div>

      {/* Process Steps Section */}
      <div className="bg-white relative z-10 pb-12 lg:pb-24 pt-8 lg:pt-12">
        <ProcessStepsSection />
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10 bg-white">



        {/* Top Selling Products Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-24"
        >
          <div className="mb-12">
            <h2 className="text-[40px] md:text-[60px] font-black uppercase tracking-tighter leading-none text-black mb-4">
              {t("sustainability_eco_friendly_best_sellers")}
            </h2>
            <p className="text-zinc-500 font-bold text-lg max-w-2xl">
              {t("sustainability_our_most_popular_sustainable_packaging")}
            </p>
          </div>
          <TopSellingProducts />
        </motion.div>

      </div>
    </div>
  );
}