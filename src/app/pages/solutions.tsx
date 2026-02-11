import React from "react";
import { motion } from "framer-motion";
import { Building2, ShoppingBag, Factory, Truck, ShieldCheck, Zap, Globe as Globe2, ArrowRight, Package, Box, Lightbulb, Users } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import imgColorfulCups from 'figma:asset/6adcf127ea8fcf1105d20bd5049c27d9545b8c86.png';
import imgPharmaceuticals from 'figma:asset/55b419d02b7ddadaade19007eb86f22b10b4285a.png';

export function SolutionsPage() {
  const { t } = useLanguage();
  const solutions = [
    {
      id: "food-beverage",
      title: t('solutions_food_beverage'),
      icon: <ShoppingBag className="size-10" />,
      description: t('solutions_food_desc'),
      features: [t('solutions_food_feat_1'), t('solutions_food_feat_2'), t('solutions_food_feat_3')],
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000"
    },
    {
      id: "pharmaceutical",
      title: t('solutions_pharma_title'),
      icon: <ShieldCheck className="size-10" />,
      description: t('solutions_pharma_desc'),
      features: [t('solutions_pharma_feat_1'), t('solutions_pharma_feat_2'), t('solutions_pharma_feat_3')],
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=1000"
    },
    {
      id: "retail-fmcg",
      title: t('solutions_retail_fmcg'),
      icon: <Package className="size-10" />,
      description: t('solutions_retail_desc'),
      features: [t('solutions_retail_feat_1'), t('solutions_retail_feat_2'), t('solutions_retail_feat_3')],
      image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=1000"
    },
    {
      id: "industrial-bulk",
      title: t('solutions_industrial_bulk'),
      icon: <Factory className="size-10" />,
      description: t('solutions_industrial_desc'),
      features: [t('solutions_industrial_feat_1'), t('solutions_industrial_feat_2'), t('solutions_industrial_feat_3')],
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-black text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2000"
            className="w-full h-full object-cover grayscale"
            alt="Industrial Background"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <span className="text-[#fabf37] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
              {t('solutions_hero_subtitle')}
            </span>
            <h1 className="text-6xl md:text-[100px] font-black uppercase tracking-tighter leading-none mb-8">
              {t('solutions_hero_title_1')} <br />
              <span className="text-[#fabf37]">{t('solutions_hero_title_2')}</span>
            </h1>
            <p className="text-zinc-400 text-xl md:text-2xl font-medium max-w-2xl leading-relaxed">
              {t('solutions_hero_desc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-32 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {solutions.map((sol, idx) => {
            const paperImages: Record<string, string> = {
              "food-beverage": imgColorfulCups,
              "pharmaceutical": imgPharmaceuticals,
              "retail-fmcg": "https://images.unsplash.com/photo-1705592579405-0d59931c8e00?q=80&w=1000",
              "industrial-bulk": "https://images.unsplash.com/photo-1549030927-006822377380?q=80&w=1000"
            };

            return (
              <motion.div
                key={sol.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-zinc-50 rounded-[48px] overflow-hidden border border-black/5 hover:bg-black transition-all duration-150"
              >
                <div className="flex flex-col h-full">
                  <div className="aspect-[16/9] overflow-hidden">
                    <ImageWithFallback
                      src={paperImages[sol.id] || sol.image}
                      alt={sol.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    />
                  </div>
                  <div className="p-12 flex flex-col flex-1">
                    <div className="text-[#fabf37] mb-8 transition-transform duration-500 group-hover:scale-110 origin-left">
                      {sol.icon}
                    </div>
                    <h3 className="text-4xl font-black uppercase tracking-tighter mb-4 text-black group-hover:text-white transition-colors">
                      {sol.title}
                    </h3>
                    <p className="text-zinc-500 font-medium leading-relaxed mb-8 group-hover:text-zinc-400 transition-colors">
                      {sol.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-12">
                      {sol.features.map((f) => (
                        <span key={f} className="px-4 py-2 rounded-full bg-white border border-black/5 text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:bg-zinc-800 group-hover:border-white/10 group-hover:text-white transition-all">
                          {f}
                        </span>
                      ))}
                    </div>
                    <button className="mt-auto flex items-center gap-4 text-black font-black uppercase tracking-widest text-xs group-hover:text-[#fabf37] transition-colors">
                      {t('solutions_explore')} <ArrowRight className="size-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-32 bg-[#fabf37]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-black font-black uppercase tracking-[0.4em] text-[10px]">
                  {t('solutions_approach')}
                </span>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                  {t('solutions_workflow_title_1')} <br />
                  {t('solutions_workflow_title_2')}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { icon: <Lightbulb />, title: t('solutions_step_1_title'), desc: t('solutions_step_1_desc') },
                  { icon: <Box />, title: t('solutions_step_2_title'), desc: t('solutions_step_2_desc') },
                  { icon: <Zap />, title: t('solutions_step_3_title'), desc: t('solutions_step_3_desc') },
                  { icon: <Users />, title: t('solutions_step_4_title'), desc: t('solutions_step_4_desc') }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="size-12 bg-black text-[#fabf37] rounded-2xl flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-black uppercase tracking-tighter">{item.title}</h4>
                    <p className="text-black/60 font-medium text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[60px] overflow-hidden bg-black rotate-3">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000"
                  className="w-full h-full object-cover opacity-60 grayscale"
                  alt="Process"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-12 rounded-[40px] shadow-2xl max-w-xs -rotate-3">
                <p className="text-4xl font-black tracking-tighter mb-2">99.8%</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t('solutions_reliability_label')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-6xl md:text-[100px] font-black uppercase tracking-tighter leading-none mb-12 text-black">
            {t('solutions_cta_title_1')} <span className="text-black italic">{t('solutions_cta_title_2')}</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="px-12 py-6 bg-black text-[#fabf37] rounded-full text-sm font-black uppercase tracking-widest hover:scale-105 transition-transform">
              {t('solutions_cta_btn_1')}
            </button>
            <button className="px-12 py-6 border-2 border-black text-black rounded-full text-sm font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
              {t('solutions_cta_btn_2')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}