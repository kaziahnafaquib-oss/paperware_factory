import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { Heart, Users, ShieldCheck, Activity, HandHeart } from "lucide-react";

// Number Counter Component
const CountUp = ({ to }: { to: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = to;
    if (start === end) return;

    // Duration based on value
    const duration = 2000;
    const incrementTime = (duration / end) * 0.5; // slow down for small numbers

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, Math.max(incrementTime, 100)); // Minimum 100ms for visibility

    return () => clearInterval(timer);
  }, [to]);

  return <span>{count}</span>;
};

export function CSRPage() {
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Text animation variants
  const letterContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3
      }
    }
  };

  const letterAnimation = {
    hidden: { y: 50, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", damping: 12 } }
  };

  return (
    <div className="relative pt-32 md:pt-40 pb-24 bg-[#fdfaf3] min-h-screen font-['Poppins',sans-serif] overflow-hidden">

      {/* Background Animated Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          x: [0, 100, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-[-10%] w-96 h-96 bg-[#fabf37]/10 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
          x: [0, -50, 0],
          y: [0, 100, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 left-[-10%] w-[500px] h-[500px] bg-[#fabf37]/5 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">

        {/* Header */}
        <div className="text-center mb-32 space-y-8 py-12 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="inline-block relative"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 -left-6 text-[#fabf37] opacity-20"
            >
              <Activity className="size-12" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="relative z-10 text-[#fabf37] font-black uppercase tracking-[0.3em] text-sm px-6 py-3 bg-[#fabf37]/10 rounded-full border border-[#fabf37]/20 backdrop-blur-sm">
                Our Commitment
              </span>
            </motion.div>
          </motion.div>

          <motion.h1
            variants={letterContainer}
            initial="hidden"
            animate="show"
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-black flex flex-wrap justify-center gap-x-4 gap-y-2 leading-[0.9]"
          >
            {"Corporate Social Responsibility".split(" ").map((word, i) => (
              <span key={i} className="inline-flex overflow-hidden relative">
                {word.split("").map((char, j) => (
                  <motion.span key={j} variants={letterAnimation} className="relative z-10">
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ duration: 1, delay: 1.5 }}
            className="h-2 bg-[#fabf37] mx-auto rounded-full"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-zinc-500 font-medium text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed pt-4"
          >
            We believe in business with a heart. Our mission extends beyond profit to making a tangible difference in the lives of our people and community.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="pt-12"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-zinc-400"
            >
              <span className="text-xs font-bold uppercase tracking-widest">Scroll to Explore</span>
              <div className="w-px h-12 bg-gradient-to-b from-zinc-300 to-transparent" />
            </motion.div>
          </motion.div>
        </div>

        {/* Inclusive Employment Section */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", bounce: 0.4, duration: 1 }}
          className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl border border-black/5 mb-16 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
        >
          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none z-20"
            initial={{ x: "-100%" }}
            whileInView={{ x: "200%" }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
          />
          {/* Subtle hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#fabf37]/0 to-[#fabf37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-8">
              <div className="flex items-center gap-6">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  className="size-20 rounded-2xl bg-[#fabf37] flex items-center justify-center text-white shadow-lg shadow-[#fabf37]/30"
                >
                  <Users className="size-10" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Empowering Abilities</h2>
              </div>

              <p className="text-zinc-600 leading-relaxed font-medium text-lg">
                At Paperware, we focus on ability, not disability. We are proud to provide meaningful employment opportunities to those often overlooked by society.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-3xl bg-zinc-50 hover:bg-[#fabf37]/10 border border-zinc-100 transition-colors"
                >
                  <div className="text-4xl font-black text-[#fabf37] mb-2">
                    <CountUp to={3} />
                  </div>
                  <h4 className="font-bold text-black text-lg mb-1">Team Members</h4>
                  <p className="text-sm text-zinc-500 font-medium">with speech & hearing impairment</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-3xl bg-zinc-50 hover:bg-[#fabf37]/10 border border-zinc-100 transition-colors"
                >
                  <div className="text-4xl font-black text-[#fabf37] mb-2">
                    <CountUp to={2} />
                  </div>
                  <h4 className="font-bold text-black text-lg mb-1">Burn Survivors</h4>
                  <p className="text-sm text-zinc-500 font-medium">working with dignity</p>
                </motion.div>
              </div>
            </div>

            <div className="flex-1 w-full perspective-1000">
              <motion.div
                whileHover={{ rotateY: 5, rotateX: 5 }}
                className="relative aspect-video rounded-[32px] overflow-hidden bg-zinc-100 border border-black/5 flex items-center justify-center group/card shadow-inner"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-zinc-100" />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-[#fabf37]/5 rounded-full blur-3xl scale-50"
                />
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <Heart className="size-32 text-[#fabf37] drop-shadow-xl" fill="currentColor" fillOpacity={0.2} />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-6 left-6 right-6"
                >
                  <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-lg text-center transform group-hover/card:translate-y-[-5px] transition-transform duration-300">
                    <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Our Philosophy</p>
                    <p className="text-base font-bold text-black italic">"Work is for everyone who has the will to contribute."</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Covid Response Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -100, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            animate={{ y: [0, -10, 0] }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, rotate: -1 }}
            transition={{
              type: "spring", duration: 1,
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="bg-black text-white rounded-[40px] p-10 relative overflow-hidden group"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -right-20 w-64 h-64 bg-[#fabf37] rounded-[40px] blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"
            />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                  <Activity className="size-8 text-[#fabf37]" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight">COVID-19<br />Response</h3>
              </div>

              <p className="text-zinc-400 leading-relaxed mb-8 font-medium text-lg">
                During the global pandemic, we didn't step back. We stepped up. We stood by our community during the toughest times.
              </p>

              <ul className="space-y-4">
                {[
                  { icon: ShieldCheck, text: "Safety Kits Distribution" },
                  { icon: HandHeart, text: "Food Support for Families" },
                  { icon: Users, text: "100% Staff Retention" }
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (i * 0.15) }}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 text-base font-bold text-white/90 p-3 rounded-xl hover:bg-white/10 transition-colors cursor-default"
                  >
                    <item.icon className="size-5 text-[#fabf37]" /> {item.text}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100, rotate: 2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            animate={{ y: [0, 10, 0] }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, rotate: 1 }}
            transition={{
              type: "spring", duration: 1,
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
            className="bg-[#fabf37] rounded-[40px] p-10 flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />

            <div className="relative z-10">
              <h3 className="text-3xl font-black uppercase tracking-tight text-black mb-6">Ongoing Impact</h3>
              <p className="text-black/80 font-bold leading-relaxed text-xl">
                Our commitment didn't end with the pandemic. We continue to support health and wellness initiatives for our workers and their families.
              </p>
            </div>

            <div className="relative z-10 mt-12">
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="h-0.5 flex-1 bg-black/10 group-hover:bg-black/30 transition-colors" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-black/50 group-hover:text-black/80 transition-colors">Since 2020</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
