import React from "react";
import { Utensils, Coffee, Hospital, Pill, Briefcase, Hotel, ArrowRight, MoveRight } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../../context/LanguageContext";
import { Card3D } from "./3d-card";

const getIndustries = (t: (key: string) => string) => [
  {
    title: t('restaurants'),
    desc: t('restaurant_desc'),
    icon: <Utensils className="size-5 md:size-6" />,
  },
  {
    title: t('cafes'),
    desc: t('cafe_desc'),
    icon: <Coffee className="size-5 md:size-6" />,
  },
  {
    title: t('hospitals'),
    desc: t('hospital_desc'),
    icon: <Hospital className="size-5 md:size-6" />,
  },
  {
    title: t('pharmaceutical'),
    desc: t('pharma_desc'),
    icon: <Pill className="size-5 md:size-6" />,
  },
  {
    title: t('corporate_clients'),
    desc: t('corporate_desc'),
    icon: <Briefcase className="size-5 md:size-6" />,
  },
  {
    title: t('hotels'),
    desc: t('hotel_desc'),
    icon: <Hotel className="size-5 md:size-6" />,
  },
];

export const Industries = React.memo(function Industries({ onExplore }: { onExplore: () => void }) {
  const { t } = useLanguage();

  const industries = React.useMemo(() => getIndustries(t), [t]);

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden perspective-1000">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-soft-light" />
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(250,191,55,0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(250,191,55,0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgba(250,191,55,0.08) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>

      {/* Dots Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(250,191,55,0.4)_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      {/* Floating Cubes 3D - Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         {[...Array(5)].map((_, i) => (
            <motion.div 
               key={`cube-${i}`}
               animate={{ 
                  y: [0, -40, 0],
                  rotateX: [0, 360],
                  rotateY: [0, 360]
               }}
               transition={{ 
                  duration: 20 + i * 5,
                  repeat: Infinity,
                  ease: "linear"
               }}
               className="absolute opacity-[0.03] border border-black/20"
               style={{
                  width: 50 + i * 20,
                  height: 50 + i * 20,
                  left: `${10 + i * 20}%`,
                  top: `${20 + i * 15}%`,
               }}
            />
         ))}
      </div>


      {/* Floating Particles - Adjusted for light background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            className="absolute size-1 bg-zinc-400 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Compact 3D Header */}
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <span className="inline-block text-[#fabf37] font-bold uppercase tracking-[0.25em] text-[8px] md:text-[9px] mb-4 md:mb-6 px-3 py-1 bg-[#fabf37]/10 border border-[#fabf37]/30 rounded backdrop-blur-sm">
            {t('sectors_tag')}
          </span>
          
          <h2 className="text-[28px] md:text-[42px] lg:text-[52px] font-black text-black leading-[0.95] tracking-tight mb-6 md:mb-8">
            {t('industries_subtitle')}
          </h2>

          <div className="flex items-start gap-6 md:gap-8">
            <motion.div 
              animate={{ scaleY: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-0.5 h-16 bg-gradient-to-b from-[#fabf37] to-transparent" 
            />
            <p className="text-zinc-600 text-sm md:text-base leading-relaxed max-w-xl font-medium">
              {t('industries_desc')}
            </p>
          </div>
        </motion.div>

        {/* 3D Card List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 md:mb-24 perspective-1000">
          {industries.map((item, i) => (
            <Card3D key={i} intensity={20}>
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                onClick={onExplore}
                className="group h-full cursor-pointer relative"
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              >
                {/* Stacked Paper Layers - Back to Front */}
                <div className="absolute inset-0 bg-white rounded-[32px] border border-zinc-200 shadow-md group-hover:translate-x-[-12px] group-hover:translate-y-[-12px] group-hover:rotate-[-4deg] transition-all duration-500 ease-out" 
                     style={{ transform: 'translateZ(-30px) translateX(8px) translateY(8px)', transformStyle: 'preserve-3d' }} />
                
                <div className="absolute inset-0 bg-white rounded-[32px] border border-zinc-150 shadow-lg group-hover:translate-x-[-6px] group-hover:translate-y-[-6px] group-hover:rotate-[-2deg] transition-all duration-500 ease-out delay-75" 
                     style={{ transform: 'translateZ(-15px) translateX(4px) translateY(4px)', transformStyle: 'preserve-3d' }} />

                {/* Main Card Content */}
                <div 
                  className="relative bg-white p-8 rounded-[32px] border border-zinc-100 group-hover:border-[#fabf37]/50 shadow-xl group-hover:shadow-2xl transition-all duration-500 flex flex-col group-hover:translate-x-[6px] group-hover:translate-y-[6px] group-hover:rotate-[2deg]"
                  style={{ transformStyle: 'preserve-3d', transform: 'translateZ(0px)' }}
                >
                  {/* Hover Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#fabf37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px]" />

                  <div className="relative z-10 flex justify-between items-start mb-8" style={{ transform: 'translateZ(30px)' }}>
                    <motion.div 
                      className="size-14 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center group-hover:bg-[#fabf37] group-hover:border-[#fabf37] transition-all duration-300 shadow-xl group-hover:shadow-[#fabf37]/30"
                      style={{ transformStyle: 'preserve-3d' }}
                      animate={{
                        rotateY: [0, 360],
                        rotateX: [0, 15, 0, -15, 0],
                        z: [0, 20, 0],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3
                      }}
                      whileHover={{
                        scale: 1.1,
                        rotateZ: 360,
                        transition: { duration: 0.5 }
                      }}
                    >
                      <motion.div 
                        className="text-zinc-600 group-hover:text-black transition-colors"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotateZ: [0, 5, 0, -5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.2
                        }}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {item.icon}
                      </motion.div>
                    </motion.div>
                    <span aria-hidden="true" className="text-5xl font-black text-zinc-100 group-hover:text-zinc-900/5 transition-colors duration-300 select-none" style={{ transform: 'translateZ(10px)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <div className="relative z-10 space-y-3 flex-grow" style={{ transform: 'translateZ(20px)' }}>
                    <h3 className="text-xl font-black text-zinc-900 group-hover:text-[#fabf37] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-zinc-500 leading-relaxed group-hover:text-zinc-600 transition-colors">
                      {item.desc}
                    </p>
                  </div>

                  <div className="relative z-10 mt-8 pt-6 border-t border-zinc-100 group-hover:border-[#fabf37]/20 flex items-center justify-between transition-colors" style={{ transform: 'translateZ(25px)' }}>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-900 transition-colors">
                      View Solutions
                    </span>
                    <div className="size-8 rounded-full bg-zinc-50 group-hover:bg-zinc-900 flex items-center justify-center transition-colors duration-300 shadow-md">
                      <ArrowRight className="size-3 text-zinc-400 group-hover:text-white -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Card3D>
          ))}
        </div>

        {/* 3D CTA */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ 
            rotateX: -2,
            rotateY: 2,
            z: 50,
            transition: { duration: 0.3 }
          }}
          className="relative bg-zinc-900 rounded-[3rem] p-8 md:p-16 overflow-hidden group shadow-2xl"
          style={{ 
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none" />
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#fabf37] rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
          
          {/* 3D Depth Layers */}
          <div 
            className="absolute inset-0 border-2 border-[#fabf37]/20 rounded-[3rem] group-hover:border-[#fabf37]/40 transition-colors duration-500"
            style={{ transform: 'translateZ(10px)' }}
          />
          <div 
            className="absolute inset-2 border border-white/5 rounded-[2.5rem] group-hover:border-white/10 transition-colors duration-500"
            style={{ transform: 'translateZ(20px)' }}
          />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-12" style={{ transform: 'translateZ(30px)' }}>
            
            <motion.div 
              className="space-y-6 max-w-xl"
              style={{ transform: 'translateZ(40px)' }}
              whileHover={{ x: 10, transition: { duration: 0.3 } }}
            >
               <motion.div 
                 className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                 animate={{
                   boxShadow: [
                     '0 0 20px rgba(250,191,55,0.1)',
                     '0 0 30px rgba(250,191,55,0.2)',
                     '0 0 20px rgba(250,191,55,0.1)',
                   ],
                 }}
                 transition={{
                   duration: 3,
                   repeat: Infinity,
                   ease: "easeInOut"
                 }}
                 style={{ transform: 'translateZ(10px)' }}
               >
                  <motion.div 
                    className="size-1.5 rounded-full bg-[#fabf37]"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <span className="text-[#fabf37] text-[10px] font-mono uppercase tracking-widest">
                    Industry Wide Impact
                  </span>
               </motion.div>
               
               <motion.h3 
                 className="text-3xl md:text-5xl font-black text-white leading-[0.95] tracking-tight"
                 style={{ transform: 'translateZ(20px)' }}
               >
                  {t('explore_all_sectors')}
               </motion.h3>
               
               <motion.p 
                 className="text-zinc-400 font-medium text-sm leading-relaxed max-w-sm"
                 style={{ transform: 'translateZ(15px)' }}
               >
                  Discover how we serve diverse industries with tailored packaging solutions that prioritize sustainability.
               </motion.p>
            </motion.div>

            <motion.button 
               onClick={onExplore}
               className="group/btn relative h-16 px-8 rounded-full bg-white text-zinc-900 flex items-center gap-4 font-black uppercase text-xs tracking-widest hover:bg-[#fabf37] transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-[#fabf37]/30"
            >
               <span className="relative z-10">View All Industries</span>
               <div 
                 className="relative z-10 size-8 rounded-full bg-zinc-900 text-white flex items-center justify-center group-hover/btn:rotate-45 transition-transform duration-300"
               >
                  <ArrowRight className="size-4" />
               </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
});