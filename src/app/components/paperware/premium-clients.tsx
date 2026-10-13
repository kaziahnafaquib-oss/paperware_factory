import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Star, Award, TrendingUp, Users } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { projectId, publicAnonKey } from "../../../../utils/supabase/info";

interface ClientLogo {
  id: string;
  name: string;
  image: string;
}

// Fallback logos (shown if no logos uploaded in admin portal)
const FALLBACK_LOGOS: ClientLogo[] = [
  {
    id: "1",
    name: "Tech Corp",
    image: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&h=200&fit=crop"
  },
  {
    id: "2",
    name: "Global Industries",
    image: "https://images.unsplash.com/photo-1599305446868-59e861c4a1d5?w=400&h=200&fit=crop"
  },
  {
    id: "3",
    name: "Innovation Labs",
    image: "https://images.unsplash.com/photo-1599305446902-d3eae5c4c986?w=400&h=200&fit=crop"
  },
  {
    id: "4",
    name: "Future Systems",
    image: "https://images.unsplash.com/photo-1599305446924-6c5e6d7a75e7?w=400&h=200&fit=crop"
  },
  {
    id: "5",
    name: "Prime Solutions",
    image: "https://images.unsplash.com/photo-1599305446868-59e861c4a1d5?w=400&h=200&fit=crop"
  },
  {
    id: "6",
    name: "Elite Partners",
    image: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&h=200&fit=crop"
  },
  {
    id: "7",
    name: "NextGen Co",
    image: "https://images.unsplash.com/photo-1599305446902-d3eae5c4c986?w=400&h=200&fit=crop"
  },
  {
    id: "8",
    name: "Quantum Inc",
    image: "https://images.unsplash.com/photo-1599305446924-6c5e6d7a75e7?w=400&h=200&fit=crop"
  },
  {
    id: "9",
    name: "Stellar Group",
    image: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&h=200&fit=crop"
  },
  {
    id: "10",
    name: "Velocity Ltd",
    image: "https://images.unsplash.com/photo-1599305446868-59e861c4a1d5?w=400&h=200&fit=crop"
  },
  {
    id: "11",
    name: "Apex Corp",
    image: "https://images.unsplash.com/photo-1599305446902-d3eae5c4c986?w=400&h=200&fit=crop"
  },
  {
    id: "12",
    name: "Summit Partners",
    image: "https://images.unsplash.com/photo-1599305446924-6c5e6d7a75e7?w=400&h=200&fit=crop"
  }
];

interface PremiumClientsProps {
  clients?: ClientLogo[];
  onPageChange?: (page: string) => void;
}

export function PremiumClients({ clients: propClients, onPageChange }: PremiumClientsProps) {
  const [clients, setClients] = React.useState<ClientLogo[]>(propClients || FALLBACK_LOGOS);
  const [loading, setLoading] = React.useState(true);

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-bf34c9a5`;

  // Scroll refs for parallax
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms
  const yHeader = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yLogos = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scaleNumber = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const rotateNumber = useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 20]);
  const opacityBackground = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);

  // Fetch client logos from admin portal
  React.useEffect(() => {
    // If logos passed as props, use those
    if (propClients && propClients.length > 0) {
      setClients(propClients);
      setLoading(false);
      return;
    }

    // Otherwise fetch from admin portal
    const fetchClientLogos = async () => {
      try {
        console.log("Premium Clients: Fetching logos from admin portal...");
        const response = await fetch(`${API_URL}/images/logo`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` }
        });
        const data = await response.json();

        console.log("Client logos response:", data);

        if (data.success && data.images && data.images.length > 0) {
          // Map uploaded logos
          const uploadedLogos = data.images.map((img: any) => ({
            id: img.id,
            name: img.name,
            image: img.url
          }));

          setClients(uploadedLogos);
          console.log(`✅ Loaded ${uploadedLogos.length} client logos from admin portal`);
        } else {
          console.log("No uploaded logos found, using fallback logos");
          setClients(FALLBACK_LOGOS);
        }
      } catch (error) {
        console.error("Failed to fetch client logos, using fallback:", error);
        setClients(FALLBACK_LOGOS);
      } finally {
        setLoading(false);
      }
    };

    fetchClientLogos();
  }, [propClients]);

  const stats = [
    {
      icon: Users,
      value: "150+",
      label: "Trusted Clients",
      color: "text-blue-500"
    },
    {
      icon: Award,
      value: "5+",
      label: "Years Experience",
      color: "text-purple-500"
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: "Satisfaction Rate",
      color: "text-green-500"
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "Average Rating",
      color: "text-[#fabf37]"
    }
  ];

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background with scroll opacity */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{ opacity: opacityBackground }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #fabf37 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 relative"
          style={{
            perspective: "2000px",
            y: yHeader
          }}
        >
          {/* Split layout design */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Big number with 3D + Scroll */}
            <div className="relative" style={{ perspective: "1500px" }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotateY: -30 }}
                whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Giant background number with depth + scroll effects */}
                <motion.div
                  className="text-[200px] md:text-[280px] font-black leading-none text-[#fabf37]/10 select-none"
                  style={{
                    transform: "translateZ(-50px)",
                    textShadow: "8px 8px 0px rgba(250, 191, 55, 0.05)",
                    scale: scaleNumber,
                    rotate: rotateNumber
                  }}
                >
                  150+
                </motion.div>

                {/* Overlay badge with 3D float */}
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotateX: [0, 5, 0],
                    rotateY: [0, -5, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-[#fabf37] px-8 py-6 rounded-[32px] shadow-2xl"
                  style={{
                    transform: "translateZ(80px)",
                    transformStyle: "preserve-3d",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(250, 191, 55, 0.2)"
                  }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      style={{ transform: "translateZ(20px)" }}
                    >
                      <Award className="size-8" strokeWidth={2.5} />
                    </motion.div>
                    <div style={{ transform: "translateZ(15px)" }}>
                      <p className="text-xs font-black uppercase tracking-widest opacity-70">Since 2019</p>
                      <p className="text-2xl font-black uppercase tracking-tight">Trusted Partner</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right side - Content with 3D layers */}
            <div className="space-y-6" style={{ perspective: "1000px" }}>
              {/* Small tag with 3D */}
              <motion.div
                initial={{ x: -20, opacity: 0, rotateX: -20 }}
                whileInView={{ x: 0, opacity: 1, rotateX: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotateZ: 2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#fabf37] text-black rounded-full shadow-lg"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(30px)"
                }}
              >
                <div className="size-2 rounded-full bg-black animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest">
                  Premium Quality
                </span>
              </motion.div>

              {/* Heading - Stacked with 3D depth */}
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] mb-4">
                  <motion.span
                    className="block text-zinc-900"
                    whileHover={{ x: -10, scale: 1.05 }}
                    style={{
                      transform: "translateZ(40px)",
                      textShadow: "6px 6px 0px rgba(0, 0, 0, 0.05)"
                    }}
                  >
                    Trusted
                  </motion.span>
                  <motion.span
                    className="block text-zinc-900"
                    whileHover={{ x: -10, scale: 1.05 }}
                    style={{
                      transform: "translateZ(30px)",
                      textShadow: "4px 4px 0px rgba(0, 0, 0, 0.05)"
                    }}
                  >
                    By The
                  </motion.span>
                  <motion.span
                    className="block text-[#fabf37]"
                    whileHover={{ x: -10, scale: 1.05 }}
                    style={{
                      transform: "translateZ(50px)",
                      textShadow: "4px 4px 20px rgba(250, 191, 55, 0.3)"
                    }}
                  >
                    Best
                  </motion.span>
                </h2>
              </motion.div>

              {/* Description with depth */}
              <motion.p
                initial={{ x: -30, opacity: 0, rotateX: -10 }}
                whileInView={{ x: 0, opacity: 1, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-xl text-zinc-600 font-bold leading-relaxed max-w-xl"
                style={{ transform: "translateZ(20px)" }}
              >
                Join 150+ leading brands who choose us for exceptional packaging solutions and unwavering quality.
              </motion.p>

              {/* Mini stats inline with 3D cards */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-6 pt-4"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "translateZ(25px)"
                  }}
                >
                  <div className="size-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                    <TrendingUp className="size-6 text-emerald-600" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-zinc-900">98%</p>
                    <p className="text-xs font-bold text-zinc-500 uppercase">Satisfaction</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "translateZ(25px)"
                  }}
                >
                  <div className="size-12 rounded-2xl bg-[#fabf37]/10 flex items-center justify-center">
                    <Star className="size-6 text-[#fabf37]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-zinc-900">4.9/5</p>
                    <p className="text-xs font-bold text-zinc-500 uppercase">Rating</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Logo Showcase - Auto Scroll with Parallax */}
        <motion.div
          className="space-y-12 mb-12"
          style={{
            perspective: "2000px",
            y: yLogos
          }}
        >
          {/* Row 1 - Scroll Left with 3D */}
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: [0, -1920] }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear"
              }}
              className="flex gap-12"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Duplicate for seamless loop */}
              {[...clients.slice(0, 6), ...clients.slice(0, 6), ...clients.slice(0, 6)].map((client, idx) => (
                <motion.div
                  key={`row1-${client.id}-${idx}`}
                  className="flex-shrink-0 w-[180px] h-[100px] flex items-center justify-center group"
                  whileHover={{
                    scale: 1.15,
                    rotateY: 10,
                    rotateX: -5,
                    z: 80
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "translateZ(0px)"
                  }}
                >
                  <motion.div
                    className="relative w-full h-full"
                    style={{
                      transformStyle: "preserve-3d",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0)"
                    }}
                    whileHover={{
                      boxShadow: "0 20px 60px rgba(250, 191, 55, 0.3)"
                    }}
                  >
                    <ImageWithFallback
                      src={client.image}
                      alt={client.name}
                      className="w-full h-full object-contain transition-all opacity-80 group-hover:opacity-100 rounded-lg"
                      style={{ transform: "translateZ(30px)" }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Row 2 - Scroll Right with 3D */}
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: [-1920, 0] }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear"
              }}
              className="flex gap-12"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Duplicate for seamless loop */}
              {[...clients.slice(6), ...clients.slice(6), ...clients.slice(6)].map((client, idx) => (
                <motion.div
                  key={`row2-${client.id}-${idx}`}
                  className="flex-shrink-0 w-[180px] h-[100px] flex items-center justify-center group"
                  whileHover={{
                    scale: 1.15,
                    rotateY: -10,
                    rotateX: 5,
                    z: 80
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "translateZ(0px)"
                  }}
                >
                  <motion.div
                    className="relative w-full h-full"
                    style={{
                      transformStyle: "preserve-3d",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0)"
                    }}
                    whileHover={{
                      boxShadow: "0 20px 60px rgba(250, 191, 55, 0.3)"
                    }}
                  >
                    <ImageWithFallback
                      src={client.image}
                      alt={client.name}
                      className="w-full h-full object-contain transition-all opacity-80 group-hover:opacity-100 rounded-lg"
                      style={{ transform: "translateZ(30px)" }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-zinc-600 font-medium mb-6">
            Want to join our list of happy clients?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange?.('contact')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white rounded-full font-black text-sm uppercase tracking-wider hover:bg-[#fabf37] transition-all shadow-xl"
          >
            <Star className="size-5" />
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}