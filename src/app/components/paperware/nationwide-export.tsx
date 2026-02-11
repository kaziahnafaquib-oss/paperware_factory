import React from "react";
import { motion } from "framer-motion";
import { MapPin, Truck, Box } from "lucide-react";
import { getDevicePerformanceTier } from "../../lib/performance";
import { useLanguage } from "../../context/LanguageContext";

export function NationwideExportSection() {
  const isLowEnd = getDevicePerformanceTier() === 'low';
  const { t } = useLanguage();

  return (
    <section className="py-40 bg-white relative overflow-hidden hardware-accelerated optimize-layout">
      {/* Animated Background */}
      {!isLowEnd && (
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E')] mix-blend-soft-light opacity-40" />
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
      )}

      {/* Dots Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(250,191,55,0.4)_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="size-16 rounded-2xl flex items-center justify-center relative"
              style={{
                background: 'linear-gradient(to bottom right, #fabf37, #f5b829, #fabf37)',
                color: 'rgb(0, 0, 0)',
                transform: 'perspective(1000px) rotateX(5deg) rotateY(-5deg)',
                boxShadow: '0 10px 30px rgba(250,191,55,0.3), 0 20px 60px rgba(250,191,55,0.2), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.1)'
              }}
            >
              <MapPin className="size-8" style={{
                color: 'rgb(0, 0, 0)',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2)) drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                transform: 'translateZ(20px)'
              }} />
            </motion.div>
            <h2 className="text-[50px] lg:text-[80px] font-black uppercase tracking-tighter leading-none" style={{ color: 'rgb(0, 0, 0)' }}>
              {t('nationwide_export').split('&')[0]} & <br /> <span style={{ color: 'rgb(82, 82, 91)' }}>{t('nationwide_export').split('&')[1]?.trim() || 'Export'}</span>
            </h2>
            <p className="font-bold leading-relaxed text-[16px]" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
              {t('nationwide_export_desc')}
            </p>
            <div className="flex flex-col gap-4">
              <div
                className="flex items-center gap-6 p-6 rounded-3xl border"
                style={{
                  background: 'rgba(0, 0, 0, 0.03)',
                  borderColor: 'rgba(0, 0, 0, 0.1)'
                }}
              >
                <Truck className="size-6" style={{ color: '#fabf37' }} />
                <span className="font-black uppercase tracking-widest text-sm text-[13px]" style={{ color: 'rgb(0, 0, 0)' }}>
                  {t('express_delivery')}
                </span>
              </div>
              <div
                className="flex items-center gap-6 p-6 rounded-3xl border"
                style={{
                  background: 'rgba(0, 0, 0, 0.03)',
                  borderColor: 'rgba(0, 0, 0, 0.1)'
                }}
              >
                <Box className="size-6" style={{ color: '#fabf37' }} />
                <span className="font-black uppercase tracking-widest text-sm text-[13px]" style={{ color: 'rgb(0, 0, 0)' }}>
                  {t('bulk_fulfillment')}
                </span>
              </div>
            </div>
          </div>
          <div className="relative w-full aspect-square">
            <div
              className="absolute inset-0 rounded-[80px] border-4 overflow-hidden"
              style={{ backgroundColor: 'rgb(250, 250, 250)', borderColor: 'rgba(0, 0, 0, 0.08)' }}
            >
              {/* Background Dot Pattern - Full Coverage */}
              <div className="absolute inset-0 opacity-80 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.4) 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />

              {/* Video Map - Larger Size */}
              <div className="absolute inset-0 flex items-center justify-center pl-8 pr-2 z-10">
                <video
                  className="w-full h-full object-contain scale-95"
                  style={{ filter: 'contrast(1.3) brightness(1.1)' }}
                  width="720"
                  height="720"
                  autoPlay
                  loop
                  muted
                  playsInline
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                  suppressHydrationWarning
                >
                  <source src="https://paperware.definedsolution.com/wp-content/uploads/2025/06/map0001-0300.webm" type="video/webm" />
                </video>
              </div>

              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest"
                style={{ background: 'rgba(0, 0, 0, 1)', color: 'rgb(255, 255, 255)' }}
              >
                {t('active_supply_nodes')}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}