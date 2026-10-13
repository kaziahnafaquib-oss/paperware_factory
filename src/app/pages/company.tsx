import React from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "motion/react";
import { ArrowRight, Leaf, ShieldCheck, Zap, Factory, Users, MoveRight, Sparkles, Instagram, Linkedin, Twitter, Facebook } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import imgWhoarewe from "figma:asset/6b92055ba5bbffc98cadd5ecc5acc306f29875e4.webp";
import imgCardBg1 from "figma:asset/deb0797add19956888ddfd67b88ff75ecb592792.webp";
import imgCardBg2 from "figma:asset/047a125a2726498b23eb2e792cd9129a5e35bd9f.webp";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30, rotateX: 20, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

// 3D Tilt Card Component
function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <motion.div
        style={{
          rotateX: useSpring(rotateX, { stiffness: 200, damping: 20 }),
          rotateY: useSpring(rotateY, { stiffness: 200, damping: 20 }),
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Parallax Image Component
function ParallaxImage({ src, alt, className }: { src: string, alt: string, className?: string }) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y, scale }} className="w-full h-full">
        <ImageWithFallback
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
}

// Magnetic Button
function MagneticButton({ children, onClick, className, "aria-label": ariaLabel }: { children: React.ReactNode, onClick?: () => void, className?: string, "aria-label"?: string }) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    x.set((clientX - centerX) * 0.2);
    y.set((clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      aria-label={ariaLabel}
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: useSpring(x), y: useSpring(y) }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export function CompanyPage({ onPageChange }: { onPageChange: (page: string) => void }) {
  const containerRef = React.useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleHeroMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const sections = [
    {
      id: "about",
      title: "About Us",
      subtitle: "The Origin",
      desc: "Architects of the modern supply chain. We don't just manufacture; we engineer the future of packaging.",
      image: "https://images.unsplash.com/photo-1554227231-54aa5db01c51?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbWF0ZWQlMjBwYWNrYWdpbmclMjBtYWNoaW5lcnklMjBpbmR1c3RyaWFsJTIwbWluaW1hbGlzdCUyMHdoaXRlfGVufDF8fHx8MTc2NzExNDQ5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      video: "https://www.youtube.com/embed/0BuwrFoXTlw?autoplay=1&mute=1&controls=0&loop=1&playlist=0BuwrFoXTlw&playsinline=1&rel=0&showinfo=0&modestbranding=1&enablejsapi=1&vq=hd1080",
      stats: "Est. 2021",
      icon: Factory,
      colSpan: "md:col-span-2"
    },
    {
      id: "clients",
      title: "Our Clients",
      subtitle: "Global Trust",
      desc: "Powering the brands you love. We are the silent engine behind their success.",
      image: "https://images.unsplash.com/photo-1766945206843-eac0b1aa0343?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG9iYWwlMjBsb2dpc3RpY3MlMjBzaGlwcGluZyUyMGNvbnRhaW5lcnMlMjBtaW5pbWFsaXN0JTIwbW9kZXJufGVufDF8fHx8MTc2NzExNDQ5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      stats: "500+ Partners",
      icon: Users,
      colSpan: "md:col-span-1"
    },
    {
      id: "sustainability",
      title: "Sustainability",
      subtitle: "Eco Core",
      desc: "Defaulting to green. Environmental responsibility meets industrial scale.",
      image: "https://images.unsplash.com/photo-1584022438855-930ac64c51be?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xlZCUyMHBhcGVyJTIwdGV4dHVyZSUyMGVjbyUyMGZyaWVuZGx5JTIwYnJvd24lMjBjcmFmdCUyMG1pbmltYWxpc3R8ZW58MXx8fHwxNzY3MTE0NDkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      video: "https://www.youtube.com/embed/0BuwrFoXTlw?autoplay=1&mute=1&controls=0&loop=1&playlist=0BuwrFoXTlw&playsinline=1&rel=0&showinfo=0&modestbranding=1&enablejsapi=1&vq=hd1080",
      stats: "100% Eco",
      icon: Leaf,
      colSpan: "md:col-span-1"
    },
    {
      id: "compliance",
      title: "Compliance",
      subtitle: "Certified",
      desc: "Excellence without compromise. Adhering to the strictest international standards.",
      image: "https://images.unsplash.com/photo-1735448213858-6bdfdf78967a?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMGxhYiUyMGNsZWFuJTIwcm9vbSUyMHdoaXRlJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3NjcxMTQwNDkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      video: "https://www.youtube.com/embed/0BuwrFoXTlw?autoplay=1&mute=1&controls=0&loop=1&playlist=0BuwrFoXTlw&playsinline=1&rel=0&showinfo=0&modestbranding=1&enablejsapi=1&vq=hd1080",
      stats: "ISO 9001",
      icon: ShieldCheck,
      colSpan: "md:col-span-1"
    },
    {
      id: "future-plan",
      title: "Future Plan",
      subtitle: "Vision 2030",
      desc: "Innovating for tomorrow. Investing in next-gen automated machinery.",
      image: "https://images.unsplash.com/photo-1590038667005-7d82ac6f864b?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbWF0ZWQlMjB3YXJlaG91c2UlMjByb2JvdGljcyUyMGxvZ2lzdGljcyUyMGZ1dHVyaXN0aWN8ZW58MXx8fHwxNzY3MTE0NDkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      video: "https://www.youtube.com/embed/0BuwrFoXTlw?autoplay=1&mute=1&controls=0&loop=1&playlist=0BuwrFoXTlw&playsinline=1&rel=0&showinfo=0&modestbranding=1&enablejsapi=1&vq=hd1080",
      stats: "R&D Focused",
      icon: Zap,
      colSpan: "md:col-span-1"
    }
  ];

  return (
    <div ref={containerRef} className="bg-white min-h-screen font-['Poppins',sans-serif] selection:bg-[#fabf37] selection:text-black overflow-hidden">

      {/* Ambient Background Animation - More subtle */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[5%] w-[40vw] h-[40vw] bg-zinc-50 rounded-full blur-[80px] opacity-80"
        />
      </div>

      {/* 1. CINEMATIC HERO - Scroll Effects Added */}
      <section
        onMouseMove={handleHeroMouseMove}
        className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 md:px-16 pt-24 text-center overflow-hidden group"
      >
        {/* Spotlight Effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 z-0 mix-blend-multiply"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(250, 191, 55, 0.15),
                transparent 80%
              )
            `,
          }}
        />

        {/* Animated Background Elements with Parallax */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <motion.div
            style={{ y: useTransform(useScroll().scrollY, [0, 1000], [0, -200]) }}
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] left-[5%] md:left-[10%] opacity-[0.03]"
          >
            <Factory className="size-40 md:size-64" />
          </motion.div>
          <motion.div
            style={{ y: useTransform(useScroll().scrollY, [0, 1000], [0, 300]) }}
            animate={{ rotate: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[20%] right-[5%] md:right-[10%] opacity-[0.04]"
          >
            <Leaf className="size-48 md:size-72" />
          </motion.div>
          <motion.div
            style={{ y: useTransform(useScroll().scrollY, [0, 1000], [0, -150]) }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.02, 0.05, 0.02] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[40%] right-[30%] opacity-[0.03]"
          >
            <Zap className="size-24 md:size-32" />
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto z-10 w-full flex flex-col items-center">
          <motion.div
            style={{
              y: useTransform(useScroll().scrollY, [0, 500], [0, 100]),
              opacity: useTransform(useScroll().scrollY, [0, 400], [1, 0])
            }}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-12 relative flex flex-col items-center py-12"
          >
            {/* Floating Badge */}
            <motion.div
              variants={fadeInUp}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center justify-center gap-3"
            >
              <span className="px-6 py-2 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200 text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow cursor-default">
                <span className="size-2 rounded-full bg-[#fabf37] animate-ping" />
                <span className="size-2 rounded-full bg-[#fabf37] absolute" />
                Corporate Profile
              </span>
            </motion.div>

            {/* MASSIVE HERO TITLE - FIXED OVERLAP & MOBILE VIEW */}
            <motion.h1 variants={fadeInUp} className="font-black uppercase tracking-tighter text-black leading-none relative z-10 flex flex-col items-center select-none gap-0 md:gap-4 mt-8 md:mt-0">
              <span className="text-6xl md:text-[9rem] lg:text-[11rem] text-zinc-100/80 md:text-zinc-200 blur-[0.5px] hover:blur-0 transition-all duration-700 -mb-4 md:mb-0 z-0">THE</span>
              <span className="relative inline-block px-8 py-2 md:px-12 md:py-4 transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-default group z-10">
                <motion.span
                  initial={{ scaleX: 0, rotate: -2 }}
                  animate={{ scaleX: 1, rotate: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }}
                  className="absolute inset-0 bg-[#fabf37] origin-center -skew-x-6 md:-skew-x-12 rounded-lg md:rounded-2xl shadow-2xl transition-colors"
                />
                <span className="relative z-10 text-5xl md:text-[9rem] lg:text-[11rem] text-black drop-shadow-sm group-hover:text-black/90 block pt-1 md:pt-4">COMPANY</span>

                {/* Shine Effect on Box */}
                <motion.div
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: '200%', opacity: [0, 0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 1, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
                />
              </span>
            </motion.h1>

            <motion.div variants={fadeInUp} className="flex flex-col items-center gap-8 md:gap-12 mt-8 max-w-3xl mx-auto px-4">
              <div className="text-lg md:text-3xl font-medium text-zinc-500 leading-relaxed max-w-2xl text-center flex flex-wrap justify-center gap-x-1.5 md:gap-x-3">
                {["We", "manufacture"].map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                  >
                    {word}
                  </motion.span>
                ))}
                <motion.span
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 1.0, duration: 0.6, type: "spring" }}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  className="text-black font-bold px-2 rounded decoration-clone cursor-default bg-[#fabf37]/20 hover:bg-[#fabf37]/40"
                  style={{ backgroundColor: "#fabf3733" }}
                >
                  premium
                </motion.span>
                {["packaging", "solutions", "that", "define", "brands."].map((word, i) => (
                  <motion.span
                    key={i + 2}
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 1.1 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              <MagneticButton
                onClick={() => window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' })}
                aria-label="Scroll to content"
                className="size-20 md:size-24 rounded-full bg-black text-white flex items-center justify-center shrink-0 hover:scale-110 hover:bg-[#fabf37] hover:text-black transition-all duration-300 shadow-2xl shadow-zinc-300 ring-4 ring-zinc-50 group mt-4 md:mt-0"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="size-6 md:size-8 rotate-90 group-hover:scale-125 transition-transform" />
                </motion.div>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. SOCIAL HUB GRID LAYOUT */}
      <section className="px-6 md:px-16 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sections.map((section, idx) => (
              <motion.div
                key={section.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: idx * 0.1 }
                  }
                }}
                className={`group relative overflow-hidden rounded-3xl bg-zinc-50 border border-zinc-100 hover:border-[#fabf37]/50 transition-colors duration-500 ${section.colSpan || 'md:col-span-1'} min-h-[400px] flex flex-col`}
              >
                {/* Card Content Wrapper */}
                <div className="flex-1 p-8 flex flex-col relative z-20">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-auto">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-zinc-400">
                        <section.icon className="size-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{section.subtitle}</span>
                      </div>
                      <h3 className="text-2xl font-bold uppercase tracking-tight text-black group-hover:text-[#fabf37] transition-colors duration-300">
                        {section.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">0{idx + 1}</span>
                  </div>

                  {/* Description & Action */}
                  <div className="space-y-6 mt-8">
                    <p className="text-sm text-zinc-500 leading-relaxed max-w-md">
                      {section.desc}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="px-3 py-1.5 rounded-full bg-white border border-zinc-100 text-[10px] font-bold uppercase tracking-wider text-zinc-400 shadow-sm">
                        {section.stats}
                      </div>

                      <button
                        onClick={() => onPageChange(section.id)}
                        aria-label={`Open ${section.title}`}
                        className="size-10 rounded-full bg-white border border-zinc-100 flex items-center justify-center text-zinc-900 group-hover:bg-[#fabf37] group-hover:text-black group-hover:scale-110 transition-all duration-300 shadow-sm"
                      >
                        <ArrowRight className="size-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Background Image / Video Decoration */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-zinc-50/70 to-transparent z-10" />
                  <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                  >
                    {(section as any).video ? (
                      <div className="w-full h-full relative overflow-hidden">
                        <iframe
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77%] h-full pointer-events-none grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-50 transition-all duration-700"
                          src={(section as any).video}
                          allow="autoplay; encrypted-media"
                        />
                      </div>
                    ) : (
                      <ImageWithFallback
                        src={section.image}
                        alt={section.title}
                        className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-500"
                      />
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. READY TO COLLABORATE - MATCHED TO IMAGE */}
      <section className="pt-0 pb-24 bg-white text-black relative flex flex-col items-center justify-center overflow-hidden">

        {/* Top Scrolling Marquee */}
        <div className="w-full border-y border-zinc-100 bg-zinc-50 py-6 mb-24 overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap w-max"
            animate={{ x: "-50%" }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 px-6">
                <span className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[rgb(147,147,147)]">Start Project</span>
                <Sparkles className="size-8 text-[#fabf37]" />
                <span className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900">Get in Touch</span>
                <ArrowRight className="size-8 text-zinc-300" />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="px-6 flex flex-col items-center relative z-10">
          {/* Sparkle Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="mb-6"
          >
            <Sparkles className="size-8 text-[#fabf37]" strokeWidth={2} />
          </motion.div>

          {/* Main Title with Yellow Highlight */}
          <div className="relative z-10 text-center mb-8">
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#fabf37] -z-10 transform -skew-x-2"
            />
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none px-4 py-2 text-black">
              Ready to Collaborate?
            </h2>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-zinc-500 text-sm md:text-lg font-medium max-w-lg mx-auto text-center mb-10 leading-relaxed"
          >
            Let's create packaging that speaks volumes about your brand's commitment to quality.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => onPageChange('contact')}
              className="px-8 py-4 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 hover:bg-zinc-800 transition-all shadow-xl shadow-black/20"
            >
              Get Started
            </button>
            <button
              onClick={() => onPageChange('about')}
              className="px-8 py-4 bg-white border border-zinc-200 text-black rounded-full text-xs font-bold uppercase tracking-widest hover:border-black transition-colors"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* 4. SOCIAL LIVE FEED - INFINITE MARQUEE */}
      <section className="py-20 bg-zinc-50 border-t border-zinc-100 overflow-hidden">
        <div className="text-center mb-12 space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#fabf37]">Social Hub</h3>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">#PaperwareLife</h2>
        </div>

        <div className="flex relative w-full overflow-hidden">
          <motion.div
            className="flex gap-6 pl-6"
            animate={{ x: "-50%" }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            style={{ width: "fit-content" }}
          >
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-6">
                {[
                  { img: "https://images.unsplash.com/photo-1610187224249-1c5aa1841c2c?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwc2hvd2Nhc2UlMjBwYWNrYWdpbmclMjBkZXNpZ24lMjBzdHVkaW98ZW58MXx8fHwxNzY3MTE0NzI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", icon: Instagram, tag: "@paperware_co" },
                  { img: "https://images.unsplash.com/photo-1634881091477-5ebe7ac70074?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaW5rZWRpbiUyMGNvcnBvcmF0ZSUyMHBvc3QlMjBtZWV0aW5nJTIwb2ZmaWNlfGVufDF8fHx8MTc2NzExNDcyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", icon: Linkedin, tag: "Paperware Industries" },
                  { img: "https://images.unsplash.com/photo-1587470049607-de08c66f308c?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0d2l0dGVyJTIwcG9zdCUyMHVwZGF0ZSUyMHRlY2glMjBtaW5pbWFsaXN0fGVufDF8fHx8MTc2NzExNDcyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", icon: Twitter, tag: "@paperware_tech" },
                  { img: "https://images.unsplash.com/photo-1730971991690-f8825d74c055?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWdyYW0lMjBwb3N0JTIwbWluaW1hbGlzdCUyMGxpZmVzdHlsZSUyMHBhY2thZ2luZ3xlbnwxfHx8fDE3NjcxMTQ3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", icon: Instagram, tag: "@paperware_life" },
                  { img: "https://images.unsplash.com/photo-1766945206843-eac0b1aa0343?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG9iYWwlMjBsb2dpc3RpY3MlMjBzaGlwcGluZyUyMGNvbnRhaW5lcnMlMjBtaW5pbWFsaXN0JTIwbW9kZXJufGVufDF8fHx8MTc2NzExNDQ5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", icon: Facebook, tag: "Paperware Logistics" }
                ].map((item, i) => (
                  <div key={i} className="relative w-[300px] h-[400px] shrink-0 group rounded-2xl overflow-hidden cursor-pointer">
                    <ImageWithFallback src={item.img} alt="Social" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute bottom-6 left-6 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <item.icon className="size-6 mb-2 text-[#fabf37]" />
                      <p className="text-sm font-medium">{item.tag}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}