import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { 
  Sparkles, Building2, Users, Package, 
  Award, Globe, ArrowRight
} from "lucide-react";

// Helper to extract YouTube embed URL
const getYouTubeEmbed = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=0&controls=1&modestbranding=1&rel=0`
    : null;
};

// Milestone Item Component
interface MilestoneItemProps {
  milestone: {
    id: string;
    year: string;
    title: string;
    stat: string;
    videoUrl: string;
    videoType: string;
  };
  index: number;
}

function MilestoneItem({ milestone, index }: MilestoneItemProps) {
  const milestoneRef = React.useRef(null);
  
  // Individual scroll progress for each milestone
  const { scrollYProgress: milestoneProgress } = useScroll({
    target: milestoneRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects for each milestone
  const yPhone = useTransform(milestoneProgress, [0, 1], [100, -100]);
  const rotatePhone = useTransform(milestoneProgress, [0, 0.5, 1], [-15, 0, 15]);
  const scalePhone = useTransform(milestoneProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);
  const opacityPhone = useTransform(milestoneProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={milestoneRef}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-8 md:pl-16 pb-16 md:pb-24 group"
    >
      {/* Timeline Dot */}
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.2 }}
        className="absolute -left-3 top-0 size-5 rounded-full bg-[#fabf37] border-4 border-white shadow-lg"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.8, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            delay: index * 0.3
          }}
          className="absolute inset-0 rounded-full bg-[#fabf37]"
        />
      </motion.div>

      {/* Content */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6" style={{ perspective: "1500px" }}>
        {/* Left - Year & Icon */}
        <div className="flex items-center gap-6">
          {/* Year */}
          <motion.div
            initial={{ rotateX: -30, opacity: 0 }}
            whileInView={{ rotateX: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.1 }}
            whileHover={{ scale: 1.1, rotateY: 15, z: 50 }}
            className="relative"
            style={{ 
              transformStyle: "preserve-3d",
              transform: "translateZ(30px)"
            }}
          >
            <div className="text-6xl md:text-8xl font-black text-black/5 select-none">
              {milestone.year}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span 
                className="text-xl md:text-2xl font-black text-[#fabf37]"
                style={{ 
                  transform: "translateZ(40px)",
                  textShadow: "3px 3px 10px rgba(250, 191, 55, 0.3)"
                }}
              >
                {milestone.year}
              </span>
            </div>
          </motion.div>

          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotateY: -180 }}
            whileInView={{ scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ 
              delay: index * 0.1 + 0.2,
              type: "spring",
              stiffness: 200
            }}
            whileHover={{ 
              rotate: 360, 
              scale: 1.2,
              rotateX: 20,
              z: 60
            }}
            className="size-16 md:size-20 rounded-full bg-black flex items-center justify-center"
            style={{ 
              transformStyle: "preserve-3d",
              boxShadow: "0 15px 40px rgba(0, 0, 0, 0.3)",
              transform: "translateZ(40px)"
            }}
          >
            <Sparkles 
              className="size-8 md:size-10 text-[#fabf37]" 
              strokeWidth={2}
              style={{ transform: "translateZ(20px)" }}
            />
          </motion.div>
        </div>

        {/* Right - Info */}
        <div className="flex-1 md:text-right" style={{ transformStyle: "preserve-3d" }}>
          <motion.h3 
            initial={{ x: 50, opacity: 0, rotateY: 30 }}
            whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2 }}
            whileHover={{ 
              scale: 1.05, 
              x: -10,
              rotateX: -5,
              z: 30
            }}
            className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black mb-2 leading-none"
            style={{ 
              transformStyle: "preserve-3d",
              textShadow: "4px 4px 8px rgba(0, 0, 0, 0.1)",
              transform: "translateZ(25px)"
            }}
          >
            {milestone.title}
          </motion.h3>
          <motion.p 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3 }}
            whileHover={{ scale: 1.05, x: -5 }}
            className="text-lg md:text-2xl font-bold text-zinc-400 uppercase tracking-wide"
            style={{ transform: "translateZ(15px)" }}
          >
            {milestone.stat}
          </motion.p>
        </div>
      </div>

      {/* Video Screen - Phone Type */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.4 }}
        className="mt-8 flex justify-center"
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -10, rotateY: 5 }}
          style={{
            y: yPhone,
            rotate: rotatePhone,
            scale: scalePhone,
            opacity: opacityPhone,
            perspective: "1000px",
            transformStyle: "preserve-3d"
          }}
          className="relative rounded-[40px] overflow-hidden aspect-[9/16] w-full max-w-[320px] bg-black shadow-2xl border-[8px] border-black group"
        >
          {/* Phone Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-20 border-b-2 border-zinc-800">
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-zinc-700 rounded-full" />
          </div>

          {/* Video/Image - Dynamic based on type */}
          {milestone.videoType === 'youtube' && getYouTubeEmbed(milestone.videoUrl) ? (
            <iframe
              src={getYouTubeEmbed(milestone.videoUrl) || ''}
              className="w-full h-full"
              allowFullScreen
              title={milestone.title}
            />
          ) : milestone.videoType === 'video' ? (
            <video
              src={milestone.videoUrl}
              className="w-full h-full object-cover"
              controls
              playsInline
              onError={(e) => e.currentTarget.style.display = 'none'}
              suppressHydrationWarning
            />
          ) : (
            <img loading="lazy" decoding="async" 
              src={milestone.videoUrl}
              alt={milestone.title}
              className="w-full h-full object-cover"
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Top Year Badge */}
          <div className="absolute top-8 left-4 right-4 z-10">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className="bg-[#fabf37] text-black rounded-2xl px-4 py-2 inline-block"
            >
              <span className="text-lg font-black">
                {milestone.year}
              </span>
            </motion.div>
          </div>

          {/* Play Button Center */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.85 }}
              className="size-16 rounded-full bg-[#fabf37] backdrop-blur-sm flex items-center justify-center cursor-pointer shadow-2xl border-4 border-white/30"
            >
              <div className="w-0 h-0 border-l-[16px] border-l-black border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
            </motion.div>
          </div>

          {/* Bottom Info Card */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.6 }}
              className="bg-black/90 backdrop-blur-xl rounded-3xl p-4 border border-white/10"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="size-2 rounded-full bg-[#fabf37] animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-white/60">
                  Milestone
                </span>
              </div>
              <h4 className="text-lg font-black uppercase text-white mb-1 leading-tight">
                {milestone.title}
              </h4>
              <p className="text-xs font-bold text-[#fabf37]">
                {milestone.stat}
              </p>
            </motion.div>
          </div>

          {/* Phone Home Indicator */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full z-20" />

          {/* Golden Glow Border on Hover */}
          <div className="absolute inset-0 border-4 border-[#fabf37] rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* 3D Shadow Effect */}
          <div 
            className="absolute inset-0 shadow-2xl rounded-[40px] pointer-events-none"
            style={{ 
              boxShadow: "0 30px 60px rgba(250, 191, 55, 0.2)"
            }}
          />
        </motion.div>
      </motion.div>

      {/* Hover Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.3 }}
        className="h-0.5 bg-gradient-to-r from-[#fabf37] to-transparent mt-8 origin-left"
      />
    </motion.div>
  );
}

export function OurJourney() {
  const containerRef = React.useRef(null);
  
  // Scroll progress for entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms
  const yBackground = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacityHeader = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);
  const scaleHeader = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  
  // Load milestones from localStorage or use defaults
  const milestones = React.useMemo(() => {
    const saved = localStorage.getItem('journeyMilestones');
    return saved ? JSON.parse(saved) : [
      {
        id: "1",
        year: "2019",
        title: "The Beginning",
        stat: "Founded",
        videoUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&w=800&q=80",
        videoType: "image"
      },
      {
        id: "2",
        year: "2020",
        title: "Growing Trust",
        stat: "50+ Partners",
        videoUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&w=800&q=80",
        videoType: "image"
      },
      {
        id: "3",
        year: "2021",
        title: "Scale Up",
        stat: "10K+ Customers",
        videoUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&w=800&q=80",
        videoType: "image"
      },
      {
        id: "4",
        year: "2022",
        title: "Mass Production",
        stat: "5M+ Products",
        videoUrl: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&w=800&q=80",
        videoType: "image"
      },
      {
        id: "5",
        year: "2024",
        title: "Premium Status",
        stat: "150+ Clients",
        videoUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&w=800&q=80",
        videoType: "image"
      },
      {
        id: "6",
        year: "2025",
        title: "Going Global",
        stat: "International",
        videoUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&w=800&q=80",
        videoType: "image"
      }
    ];
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-white via-zinc-50 to-white overflow-hidden"
    >
      {/* Background Pattern with Parallax */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute inset-0 opacity-5"
      >
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - Minimal with Scroll Effects */}
        <motion.div
          style={{ 
            opacity: opacityHeader,
            scale: scaleHeader
          }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div 
              className="h-1 w-12 bg-[#fabf37]"
              style={{
                scaleX: useTransform(scrollYProgress, [0, 0.2], [0, 1])
              }}
            />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
              Our Story
            </span>
          </div>

          <h2 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
            <motion.span 
              className="text-black block"
              style={{
                x: useTransform(scrollYProgress, [0, 0.3], [-100, 0]),
                rotateY: useTransform(scrollYProgress, [0, 0.3], [-45, 0])
              }}
            >
              Our
            </motion.span>
            <motion.span 
              className="text-[#fabf37] block"
              style={{
                x: useTransform(scrollYProgress, [0, 0.3], [100, 0]),
                rotateY: useTransform(scrollYProgress, [0, 0.3], [45, 0])
              }}
            >
              Journey
            </motion.span>
          </h2>
        </motion.div>

        {/* Timeline List - Vertical */}
        <div className="max-w-4xl mx-auto space-y-0 border-l-2 border-black/10">
          {milestones.map((milestone, index) => (
            <MilestoneItem key={index} milestone={milestone} index={index} />
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 max-w-4xl mx-auto"
        >
          <div className="bg-black rounded-[40px] p-10 md:p-16 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, #fabf37 1px, transparent 0)',
                backgroundSize: '30px 30px'
              }} />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              {/* Text */}
              <div>
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-3 leading-tight">
                  Be Part Of<br />
                  <span className="text-[#fabf37]">Our Story</span>
                </h3>
                <p className="text-sm md:text-base font-bold text-zinc-400 max-w-md">
                  Join 150+ premium brands who trust us for exceptional packaging solutions
                </p>
              </div>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#fabf37] text-black rounded-full text-sm font-black uppercase tracking-widest whitespace-nowrap shadow-xl shadow-[#fabf37]/20"
              >
                <span>Get Started</span>
                <ArrowRight className="size-5" strokeWidth={3} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}