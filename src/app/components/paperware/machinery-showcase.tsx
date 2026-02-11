import { memo, useMemo } from 'react';
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { Settings, Cpu, Zap, Activity, Gauge, Database, Factory, Box, Printer } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import imgHeidelberg from "figma:asset/e72bb120492f063c2a2bd8669456a539365af830.png";
import imgOriginalHeidelberg from "figma:asset/6acd2f3438274d3aa253228bd057142cd1415192.png";
import imgForming from "figma:asset/d1d09ee2807bc96c0db6200d9081bc2d7c8effa7.png";
import imgCutting from "figma:asset/e4d419676dc773e53692192900cc87f073cae093.png";
import imgProcess from "figma:asset/065035dc996c4de10bf1df3ba3adb27b15abbdc2.png";

const getMachineries = (t: (key: string) => string) => [
  {
    name: "HEIDELBERG MO-V-P",
    type: "4 Color Printing Unit",
    image: imgHeidelberg,
    val: "140K",
    unit: "PCS/DAY",
    mainTitle: "PRINTING UNIT",
    subtitle: "HEIDELBERG MO-V-P",
    specs: [
      "HEIDELBERG MO-V-P (19x25.9\")",
      "ORIGINAL HEIDELBERG (25.25x36\")",
      "DOUBLE DAISY PLATE TECHNOLOGY"
    ],
    detail: "HIGH-PRECISION 4-COLOR OFFSET PRINTING FOR PREMIUM BRANDING.",
    icon: <Printer className="size-6" />
  },
  {
    name: "Ultrasonic Former",
    type: "Forming Unit",
    image: imgForming,
    val: "350K",
    unit: "PCS/DAY",
    mainTitle: "FORMING UNIT",
    subtitle: "ULTRASONIC FORMER",
    specs: [
      "MEDICAL GRADE HYGIENE",
      "AUTOMATIC QUALITY CONTROL",
      "HIGH-SPEED PRODUCTION"
    ],
    detail: "AUTOMATED ULTRASONIC FORMING ENSURING LEAK-PROOF PRECISION.",
    icon: <Box className="size-6" />
  },
  {
    name: "Die-Cut Precision",
    type: "Cutting Unit",
    image: imgCutting,
    val: "12K",
    unit: "PCS/DAY",
    mainTitle: "CUTTING UNIT",
    subtitle: "DIE-CUT PRECISION",
    specs: [
      "LASER GUIDED CALIBRATION",
      "ZERO-WASTE TRIMMING",
      "CUSTOM SHAPE SUPPORT"
    ],
    detail: "PRECISION DIE-CUTTING WITH MINIMAL WASTE & LASER ACCURACY.",
    icon: <Cpu className="size-6" />
  },
  {
    name: "ORIGINAL HEIDELBERG",
    type: "Offset-Letterset Unit",
    image: imgOriginalHeidelberg,
    val: "25K",
    unit: "PCS/DAY",
    mainTitle: "LAMINATION UNIT",
    subtitle: "THERMAL LAMINATOR",
    specs: [
      "ECO-FRIENDLY PLA SUPPORT",
      "HEAT-SEAL OPTIMIZATION",
      "GLOSS & MATTE FINISH"
    ],
    detail: "PE/PLA LAMINATION FOR SUPERIOR LIQUID & HEAT RESISTANCE.",
    icon: <Zap className="size-6" />
  }
];

export const MachineryShowcase = memo(function MachineryShowcase() {
  const { t } = useLanguage();

  const machineries = useMemo(() => getMachineries(t), [t]);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 text-black font-black uppercase tracking-[0.4em] text-[10px]"
          >
            <div className="h-[2px] w-12 bg-[#fabf37]" />
            {t('prod_intel') || "Production Power"}
          </motion.div>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
            {t('scaling_excellence') || "Manufacturing Excellence."}
          </h2>
          <p className="text-zinc-500 font-bold text-xs md:text-sm max-w-2xl leading-relaxed uppercase tracking-widest pt-4">
            {t('machinery_desc') || "World-class machinery powering high-speed production with unmatched precision and quality."}
          </p>
        </div>

        {/* Production Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            { value: "500K+", label: "Daily Capacity", icon: <Activity className="size-5" />, unit: "pcs/day" },
            { value: "99.8%", label: "Uptime Rate", icon: <Gauge className="size-5" />, unit: "reliability" },
            { value: "24/7", label: "Operations", icon: <Settings className="size-5" />, unit: "active" },
            { value: "ISO 9001", label: "Certified", icon: <Database className="size-5" />, unit: "quality" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-zinc-50 rounded-3xl p-6 md:p-8 border-2 transition-all duration-300 group hover:border-[#fabf37] ${
                i === 1 ? 'border-[#fabf37]' : 'border-zinc-200'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-[#fabf37]">
                  {stat.icon}
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">
                  Unit {i + 1}
                </span>
              </div>

              {/* Value */}
              <div className="mb-2">
                <div className="text-5xl md:text-6xl font-black italic tracking-tighter leading-none text-black">
                  {stat.value}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mt-1">
                  {stat.unit}
                </div>
              </div>

              {/* Label */}
              <div className="mt-6 mb-4">
                <h4 className="text-sm md:text-base font-black uppercase tracking-tight text-black">
                  {stat.label}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {machineries.map((machine, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-white rounded-[32px] p-6 md:p-8 flex flex-col border-2 transition-all duration-300 ${
                i === 0 ? 'border-[#fabf37]' : 'border-zinc-200 hover:border-[#fabf37]'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className={`${i === 0 ? 'text-[#fabf37]' : 'text-zinc-400'}`}>
                  {machine.icon}
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">
                  UNIT {i + 1}
                </span>
              </div>

              {/* Value */}
              <div className="mb-6">
                <div className="text-6xl md:text-7xl font-black italic tracking-tighter leading-none text-black">
                  {machine.val}
                </div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 mt-2">
                  {machine.unit}
                </div>
              </div>

              {/* Main Title */}
              <div className="mb-6">
                <h3 className={`text-xl md:text-2xl font-black uppercase tracking-tight mb-2 leading-tight ${
                  i === 0 ? 'text-[#fabf37]' : 'text-black'
                }`}>
                  {machine.mainTitle}
                </h3>
                <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">
                  {machine.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-[10px] font-bold text-black leading-relaxed uppercase tracking-wide mb-6">
                {machine.detail}
              </p>

              {/* Specs List */}
              <div className="space-y-3 mt-auto">
                {machine.specs.map((spec, si) => (
                  <div key={si} className="flex items-start gap-2">
                    <div className={`size-1.5 rounded-full mt-1.5 shrink-0 ${
                      i === 0 ? 'bg-[#fabf37]' : 'bg-zinc-400'
                    }`} />
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-wide leading-relaxed">
                      {spec}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-black rounded-[40px] p-6 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 border-4 border-[#fabf37]">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="size-14 md:size-16 rounded-2xl bg-[#fabf37] flex items-center justify-center text-black shrink-0">
              <Zap className="size-6 md:size-8" />
            </div>
            <div>
              <p className="text-[#fabf37] font-black uppercase tracking-widest text-[8px] md:text-[10px]">{t('smart_factory') || "Smart Factory Integration"}</p>
              <h4 className="text-white text-lg md:text-2xl font-black uppercase tracking-tight mt-1">{t('live_diagnostics') || "Real-time Production Analytics"}</h4>
            </div>
          </div>
          <button className="w-full lg:w-auto bg-white text-black px-8 md:px-10 py-4 md:py-5 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-[#fabf37] transition-all">
            {t('tech_audit_report') || "Technical Audit Report"}
          </button>
        </div>
      </div>
    </section>
  );
});