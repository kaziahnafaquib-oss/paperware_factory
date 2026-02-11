import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

interface VideoData {
  url: string;
  title: string;
  highlight: string;
  subtitle: string;
}

interface FullScreenVideoSectionProps {
  videoData: VideoData[];
}

export function FullScreenVideoSection({ videoData }: FullScreenVideoSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const data = useMemo(() => {
    if (Array.isArray(videoData) && videoData.length > 0) return videoData;
    return [];
  }, [videoData]);

  useEffect(() => {
    if (data.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [data]);

  // If no videos, show placeholder
  if (data.length === 0) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-900" />
        
        <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
          <div className="flex flex-col items-center gap-6">
            <div className="text-7xl opacity-20">🎬</div>
            <h2 className="text-2xl font-black text-zinc-600 uppercase tracking-wider">
              No Videos Available
            </h2>
            <p className="text-sm text-zinc-700">Admin can upload videos from the CMS</p>
          </div>
        </div>

        <div className="absolute top-10 left-10 h-20 w-20 border-t-2 border-l-2 border-zinc-800/30" />
        <div className="absolute bottom-10 right-10 h-20 w-20 border-b-2 border-r-2 border-zinc-800/30" />
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Videos Slider */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          {data[currentIndex]?.url ? (
            <video
              src={data[currentIndex].url}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover opacity-60 grayscale brightness-75"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
              suppressHydrationWarning
            />
          ) : (
            <div className="h-full w-full bg-zinc-950" />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-transparent to-black/40" />

      {/* Content Overlay */}
      <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Highly Stylized Text following the Reference Image */}
            <h2 className="flex flex-col items-center gap-0 leading-[0.85] font-black tracking-tighter text-white uppercase text-[32px] md:text-[60px] lg:text-[80px]">
              {data[currentIndex].title.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
              <span className="text-[#fabf37] block mt-2">{data[currentIndex].highlight}</span>
              {data[currentIndex].subtitle.split(' ').map((word, i) => (
                <span key={i} className="block mt-2">{word}</span>
              ))}
            </h2>
            
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-12 h-1.5 w-32 bg-[#fabf37] md:w-64"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Aesthetic Corners */}
      <div className="absolute top-10 left-10 h-20 w-20 border-t-2 border-l-2 border-[#fabf37]/30" />
      <div className="absolute bottom-10 right-10 h-20 w-20 border-b-2 border-r-2 border-[#fabf37]/30" />
      
      {/* Bottom Label - Updated as requested */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="size-2 animate-ping rounded-full bg-[#fabf37]" />
          <span className="text-[10px] font-black tracking-[0.3em] text-white uppercase opacity-50">
            Sustainable Daily Life Usage {data.length > 1 && `(${currentIndex + 1}/${data.length})`}
          </span>
        </div>
        
        {/* Progress Indicators */}
        {data.length > 1 && (
          <div className="flex gap-2">
            {data.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 transition-all duration-500 rounded-full ${i === currentIndex ? 'w-12 bg-[#fabf37]' : 'w-3 bg-white/20'}`} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}