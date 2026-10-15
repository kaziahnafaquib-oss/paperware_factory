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
import { JourneySection } from "../components/sustainability/JourneySection";
import { GreenCupSection } from "../components/sustainability/GreenCupSection";
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
    console.log('🎬 Fetching video URL from backend...');
    fetch(`https://${projectId}.supabase.co/functions/v1/make-server-bf34c9a5/sustainability/hero-video`, {
      headers: { Authorization: `Bearer ${publicAnonKey}` }
    })
      .then(res => {
        console.log('📡 Backend response status:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('📦 Backend data received:', data);
        if (data.url) {
          console.log('✅ Video URL found:', data.url);
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
      <div ref={heroRef} className="relative min-h-screen w-full overflow-hidden bg-zinc-900 flex flex-col justify-end pb-8">
        {/* Forest Background */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {videoUrl ? (
              (() => {
                const getYouTubeId = (url: string) => {
                  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                  const match = url.match(regExp);
                  return (match && match[2].length === 11) ? match[2] : null;
                };
                const videoId = getYouTubeId(videoUrl);

                if (videoId) {
                  return (
                    <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-br from-emerald-950 via-zinc-900 to-black">
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse" />
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-[100px] animate-pulse delay-700" />
                      </div>
                    </div>
                  );
                }

                return (
                  <video
                    key={videoUrl}
                    src={videoUrl}
                    className="w-full h-full object-cover opacity-80"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    suppressHydrationWarning
                    onLoadedData={(e) => {
                      const video = e.currentTarget;
                      video.play().catch(() => { });
                    }}
                    onError={(e) => {
                      setVideoError(true);
                      e.currentTarget.style.display = 'none';
                    }}
                    onPlay={() => { }}
                    onPause={() => console.log('⏸️ Video paused')}
                  />
                );
              })()
            ) : (
              <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-gradient-to-br from-emerald-950 via-zinc-900 to-black">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse" />
                  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-[100px] animate-pulse delay-700" />
                </div>
              </div>
            )}
          </div>
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
              Empowering <br />
              <span className="text-[#fabf37]">sustainable practices</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl max-w-xs shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="size-8 bg-white/20 rounded-lg flex items-center justify-center shadow-inner shrink-0">
                  <Leaf className="text-white size-4 drop-shadow-md" />
                </div>
                <div>
                  <span className="text-xl font-bold text-white block mb-0.5 drop-shadow-md">96%</span>
                  <p className="text-white/90 leading-tight drop-shadow-sm text-[10px]">
                    of our product range is environmentally friendly, recyclable, or biodegradable.
                  </p>
                </div>
              </div>
            </motion.div>
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
              <h3 className="text-sm font-bold text-white mb-1.5 relative z-10 leading-tight">Sustainable Corporate Governance</h3>
              <p className="text-white/90 text-[10px] font-medium leading-relaxed relative z-10">
                Dedicated to transparency, accountability, ethical practices, stakeholder engagement, and continuous improvement.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[#4D8B55] p-4 rounded-xl h-[160px] flex flex-col justify-center relative overflow-hidden group"
            >
              <h3 className="text-sm font-bold text-white mb-1.5 relative z-10 leading-tight">Ethical Supply Chain</h3>
              <p className="text-white/90 text-[10px] font-medium leading-relaxed relative z-10">
                Our supply chain starts with ethical, eco-friendly suppliers who share our values and commitment to the planet.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-[#1A5336] p-4 rounded-xl h-[160px] flex flex-col justify-center relative overflow-hidden group"
            >
              <h3 className="text-sm font-bold text-white mb-1.5 relative z-10 leading-tight">Material Reduction and Replacement</h3>
              <p className="text-white/80 text-[10px] font-medium leading-relaxed relative z-10">
                Minimizing material usage and replacing non-renewable resources with sustainable, biodegradable alternatives.
              </p>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-[#0D3B2E] p-4 rounded-xl h-[160px] flex flex-col justify-center relative overflow-hidden group"
            >
              <h3 className="text-sm font-bold text-white mb-1.5 relative z-10 leading-tight">Paperware Happiness Project</h3>
              <p className="text-white/70 text-[10px] font-medium leading-relaxed relative z-10">
                Initiative aimed to promote employee happiness by encouraging work-life balance and uplifting the community.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* New Journey Section */}
      <div className="bg-white relative z-10 pt-12 lg:pt-24 px-4 md:px-8 container mx-auto pb-0">
        <JourneySection />
      </div>

      {/* Green Cup Section */}
      <div className="bg-white relative z-10 pb-12 lg:pb-24 px-4 md:px-8 container mx-auto pt-0">
        <GreenCupSection />
      </div>

      {/* Story Section */}
      <div className="bg-white relative z-10 pb-0 px-4 md:px-8 container mx-auto pt-0">
        <StorySection />
      </div>

      {/* Process Steps Section */}
      <div className="bg-white relative z-10 pb-12 lg:pb-24 pt-8 lg:pt-12">
        <ProcessStepsSection />
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10 bg-white">
        {/* Impact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {[
            { label: t('plastic_reduced'), val: "450 Tons", icon: <Recycle />, trend: "+12%" },
            { label: t('biodegradable'), val: "100%", icon: <Leaf />, trend: "Goal Reached" },
            { label: "Landfill Diverted", val: "96%", icon: <TrendingDown />, trend: "Zero waste initiative" },
            { label: "Carbon Neutral", val: "100%", icon: <Globe />, trend: "Offset certified" },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-black/5 shadow-xl group hover:bg-[#fabf37] transition-all duration-500"
            >
              <div className="size-12 md:size-14 rounded-2xl bg-zinc-50 text-black flex items-center justify-center mb-4 md:mb-6 group-hover:bg-black group-hover:text-[#fabf37] transition-colors">
                <div className="scale-75 md:scale-100">{card.icon}</div>
              </div>
              <h4 className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-black/60 mb-1">{card.label}</h4>
              <p className="text-2xl md:text-3xl font-black text-black">{card.val}</p>
              <div className="mt-3 md:mt-4 flex items-center gap-2 text-[10px] md:text-xs font-bold text-emerald-600 group-hover:text-black">
                <ArrowUpRight className="size-3" /> {card.trend}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Chart 1: Resource Efficiency */}
          <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[32px] md:rounded-[60px] border border-black/5 shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 md:mb-10">
              <div>
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black">{t('resource_eff')}</h3>
                <p className="text-xs font-bold text-zinc-400 italic">Monthly reduction in CO2 and Water usage</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="size-2 md:size-3 rounded-full bg-[#fabf37]" />
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">CO2 Emission</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 md:size-3 rounded-full bg-black" />
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">Water Consumption</span>
                </div>
              </div>
            </div>
            <div className="h-[250px] md:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={impactData}>
                  <defs>
                    <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fabf37" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#fabf37" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#999" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="co2" stroke="#fabf37" strokeWidth={4} fillOpacity={1} fill="url(#colorCo2)" />
                  <Area type="monotone" dataKey="water" stroke="#000" strokeWidth={4} fill="transparent" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Material Composition */}
          <div className="bg-black text-white p-8 md:p-10 rounded-[32px] md:rounded-[60px] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#fabf37]/5 -skew-x-12 translate-x-1/2" />
            <div className="relative z-10 mb-8 md:mb-0">
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-2">{t('material_purity')}</h3>
              <p className="text-zinc-500 text-xs md:text-sm font-bold">100% Sourced from FSC certified forests.</p>
            </div>

            <div className="h-[200px] md:h-[250px] relative z-10 my-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={materialData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={10}
                    dataKey="value"
                  >
                    {materialData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-black text-[#fabf37]">95%</span>
              </div>
            </div>

            <div className="space-y-3 md:space-y-4 relative z-10">
              {materialData.map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                  <div className="flex items-center gap-3">
                    <div className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{item.name}</span>
                  </div>
                  <span className="font-black text-sm">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Future Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#fabf37] p-8 md:p-12 lg:p-20 rounded-[40px] md:rounded-[60px] flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-black font-black uppercase tracking-[0.4em] text-[8px] md:text-[10px] bg-black/5 px-4 py-2 rounded-full inline-block">{t('live_diagnostics')}</span>
              <h3 className="text-[28px] md:text-[32px] lg:text-[48px] font-black uppercase tracking-tight leading-none text-black">
                {t('net_zero')}
              </h3>
              <p className="text-black/60 font-bold text-base md:text-lg leading-relaxed">
                By 2030, Paperware Factory aims to become carbon-negative by transitioning
                100% of its logistics to electric fleets and localizing raw material pulp production.
              </p>
            </div>
            <div className="mt-8 md:mt-12 flex items-center gap-6">
              <div className="size-16 md:size-20 rounded-full border-4 border-black/10 flex items-center justify-center text-black font-black text-sm md:text-base">75%</div>
              <p className="text-[10px] md:text-sm font-black uppercase tracking-widest text-black/40 max-w-[150px]">Logistics electrification in progress</p>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 lg:p-20 rounded-[40px] md:rounded-[60px] border border-black/5 flex flex-col justify-between group cursor-pointer relative overflow-hidden shadow-2xl">
            <div className="space-y-6 md:space-y-8 relative z-10">
              <div className="size-16 md:size-20 rounded-[24px] md:rounded-[32px] bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                <Wind className="size-8 md:size-10" />
              </div>
              <h3 className="text-[28px] md:text-[32px] lg:text-[48px] font-black uppercase tracking-tight leading-none text-black">
                {t('circular_economy')}
              </h3>
              <p className="text-zinc-400 font-bold text-base md:text-lg leading-relaxed">
                We collect used paperware from our partner retail outlets and process
                them into recycled cardboard packaging, ensuring zero waste goes to landfills.
              </p>
            </div>
            <button className="flex items-center gap-3 font-black uppercase tracking-widest text-[10px] md:text-xs mt-8 md:mt-12 group-hover:gap-6 transition-all text-black">
              Our Recycling Partners <ArrowUpRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Top Selling Products Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-24"
        >
          <div className="mb-12">
            <h2 className="text-[40px] md:text-[60px] font-black uppercase tracking-tighter leading-none text-black mb-4">
              Eco-Friendly Best Sellers
            </h2>
            <p className="text-zinc-500 font-bold text-lg max-w-2xl">
              Our most popular sustainable packaging solutions trusted by businesses worldwide
            </p>
          </div>
          <TopSellingProducts />
        </motion.div>

        {/* Social Media Feed Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-24"
        >
          <div className="mb-12">
            <h2 className="text-[40px] md:text-[60px] font-black uppercase tracking-tighter leading-none text-black mb-4">
              Live Digital Feed
            </h2>
            <p className="text-zinc-500 font-bold text-lg max-w-2xl">
              Follow our sustainability journey and green initiatives across social platforms
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}