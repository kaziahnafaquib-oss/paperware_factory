import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Award, TrendingUp, Users } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { projectId, publicAnonKey } from "../../../../utils/supabase/info";
import { useLanguage } from '../../context/LanguageContext';
import { getDevicePerformanceTier } from "../../lib/performance";

interface ClientLogo {
  id: string;
  name: string;
  image: string;
}

// Fallback logos (shown if no logos uploaded in admin portal)
const FALLBACK_LOGOS: ClientLogo[] = [
  {
    id: "f1",
    name: "Aventis",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Volkswagen_logo_2019.svg/1024px-Volkswagen_logo_2019.svg.png"
  },
  {
    id: "f2",
    name: "Nestle",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/Nestl%C3%A9_logo.svg/1200px-Nestl%C3%A9_logo.svg.png"
  },
  {
    id: "f3",
    name: "Unilever",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Unilever.svg/2000px-Unilever.svg.png"
  },
  {
    id: "f4",
    name: "Bengal",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/07/Bengal_Group_logo.svg/1200px-Bengal_Group_logo.svg.png"
  },
  {
    id: "f5",
    name: "Square",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Square_Pharma_Logo.svg/1200px-Square_Pharma_Logo.svg.png"
  },
  {
    id: "f6",
    name: "Akij",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/22/Akij_Group_logo.png/220px-Akij_Group_logo.png"
  },
  {
    id: "f7",
    name: "PRAN",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/Pran_Group_logo.svg/1200px-Pran_Group_logo.svg.png"
  },
  {
    id: "f8",
    name: "ACI",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/ACI_Limited_Logo.svg/1200px-ACI_Limited_Logo.svg.png"
  },
  {
    id: "f9",
    name: "Beximco",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Beximco_Group_logo.svg/1200px-Beximco_Group_logo.svg.png"
  },
  {
    id: "f10",
    name: "Bashundhara",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Bashundhara_Group_logo.svg/1200px-Bashundhara_Group_logo.svg.png"
  },
  {
    id: "f11",
    name: "SMC",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/SMC_Logo.png/250px-SMC_Logo.png"
  },
  {
    id: "f12",
    name: "Golden Harvest",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Golden_Harvest_logo.png/250px-Golden_Harvest_logo.png"
  }
];

interface PremiumClientsProps {
  clients?: ClientLogo[];
  onPageChange?: (page: string) => void;
}

export function PremiumClients({ clients: propClients, onPageChange }: PremiumClientsProps) {
  const { t } = useLanguage();
  const [clients, setClients] = useState<ClientLogo[]>(propClients || FALLBACK_LOGOS);
  const [loading, setLoading] = useState(true);
  const isLowEnd = getDevicePerformanceTier() === 'low';

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-bf34c9a5`;

  // Scroll refs for parallax
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms
  const yHeader = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yLogos = useTransform(scrollYProgress, [0, 1], [20, -80]);
  const scaleNumber = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const rotateNumber = useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 20]);
  const opacityBackground = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);

  // Fetch client logos from admin portal
  useEffect(() => {
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
      label: t('proj_stats_trusted'),
      color: "text-blue-500"
    },
    {
      icon: Award,
      value: "5+",
      label: t('proj_stats_xp'),
      color: "text-purple-500"
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: t('proj_stats_satisfaction'),
      color: "text-green-500"
    },
    {
      icon: Star,
      value: "4.9/5",
      label: t('proj_stats_rating'),
      color: "text-[#fabf37]"
    }
  ];

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden hardware-accelerated">
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
          className="mb-10 relative"
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
                initial={isLowEnd ? { opacity: 0 } : { scale: 0.8, opacity: 0, rotateY: -30 }}
                whileInView={isLowEnd ? { opacity: 1 } : { scale: 1, opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative hardware-accelerated"
                style={{ transformStyle: isLowEnd ? "flat" : "preserve-3d" }}
              >
                {/* Giant background number with depth + scroll effects */}
                <motion.div
                  className="text-[200px] md:text-[280px] font-black leading-none text-[#fabf37]/10 select-none hardware-accelerated"
                  style={{
                    transform: isLowEnd ? "none" : "translateZ(-50px)",
                    textShadow: "8px 8px 0px rgba(250, 191, 55, 0.05)",
                    scale: isLowEnd ? 1 : scaleNumber,
                    rotate: isLowEnd ? 0 : rotateNumber
                  }}
                >
                  150+
                </motion.div>

                {/* Overlay badge with 3D float */}
                <motion.div
                  animate={isLowEnd ? {} : {
                    y: [0, -15, 0],
                    rotateX: [0, 5, 0],
                    rotateY: [0, -5, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-[#fabf37] px-8 py-6 rounded-[32px] shadow-2xl hardware-accelerated"
                  style={{
                    transform: isLowEnd ? "translate(-50%, -50%)" : "translateZ(80px)",
                    transformStyle: isLowEnd ? "flat" : "preserve-3d",
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
                      <p className="text-xs font-black uppercase tracking-widest opacity-70">{t('proj_since_2019')}</p>
                      <p className="text-2xl font-black uppercase tracking-tight">{t('proj_trusted_partner')}</p>
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
                  {t('proj_quality_tag')}
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
                <h2 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] mb-4">
                  <motion.span
                    className="block text-zinc-900"
                    whileHover={{ x: -10, scale: 1.05 }}
                    style={{
                      transform: "translateZ(40px)",
                      textShadow: "6px 6px 0px rgba(0, 0, 0, 0.05)"
                    }}
                  >
                    {t('proj_trusted')}
                  </motion.span>
                  <motion.span
                    className="block text-zinc-900"
                    whileHover={{ x: -10, scale: 1.05 }}
                    style={{
                      transform: "translateZ(30px)",
                      textShadow: "4px 4px 0px rgba(0, 0, 0, 0.05)"
                    }}
                  >
                    {t('proj_by_the')}
                  </motion.span>
                  <motion.span
                    className="block text-[#fabf37]"
                    whileHover={{ x: -10, scale: 1.05 }}
                    style={{
                      transform: "translateZ(50px)",
                      textShadow: "4px 4px 20px rgba(250, 191, 55, 0.3)"
                    }}
                  >
                    {t('proj_best')}
                  </motion.span>
                </h2>
              </motion.div>

              {/* Description with depth */}
              <motion.p
                initial={{ x: -30, opacity: 0, rotateX: -10 }}
                whileInView={{ x: 0, opacity: 1, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-sm text-zinc-600 font-bold leading-relaxed max-w-xl"
                style={{ transform: "translateZ(20px)" }}
              >
                {t('proj_join_us')}
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
                    <p className="text-xl font-black text-zinc-900">98%</p>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Satisfaction</p>
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
                    <p className="text-xl font-black text-zinc-900">4.9/5</p>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Rating</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Logo Showcase - Auto Scroll with Parallax */}
        <motion.div
          className="space-y-12 mb-6"
          style={{
            perspective: isLowEnd ? "none" : "2000px",
            y: isLowEnd ? 0 : yLogos
          }}
        >
          {/* Row 1 - Scroll Left */}
          <div className="relative overflow-hidden py-4">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
              className="flex gap-16 whitespace-nowrap w-fit"
            >
              {[...clients, ...clients].map((client, idx) => (
                <div
                  key={`row1-${client.id}-${idx}`}
                  className="flex-shrink-0 w-[140px] h-[80px] flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100"
                >
                  <ImageWithFallback
                    src={client.image}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2 - Scroll Right */}
          <div className="relative overflow-hidden py-4">
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear"
              }}
              className="flex gap-16 whitespace-nowrap w-fit"
            >
              {[...clients, ...clients].map((client, idx) => (
                <div
                  key={`row2-${client.id}-${idx}`}
                  className="flex-shrink-0 w-[140px] h-[80px] flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100"
                >
                  <ImageWithFallback
                    src={client.image}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-6"
        >
          <p className="text-zinc-600 font-medium mb-3">
            {t('proj_join_cta')}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange?.('clients')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white rounded-full font-black text-xs uppercase tracking-wider hover:bg-[#fabf37] transition-all shadow-xl"
          >
            <Star className="size-5" />
            {t('proj_explore_btn')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}