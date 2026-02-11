import { useState, useEffect, useRef, type MouseEvent as ReactMouseEvent } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Factory, Leaf, Award, Recycle, Users, Linkedin, Mail } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { projectId, publicAnonKey } from "../../../../utils/supabase/info";
import { useLanguage } from "../../context/LanguageContext";

interface WhoWeAreProps {
  onReadMore: () => void;
  teamMembers?: TeamMember[];
  content?: {
    titleTop: string;
    titleBottom: string;
    desc1: string;
    desc2: string;
    stat1Label: string;
    stat1Value: string;
    stat2Label: string;
    stat2Value: string;
    stat3Label: string;
    stat3Value: string;
  };
}

// Fallback Team Members (shown if no photos uploaded in admin portal)
const FALLBACK_TEAM_MEMBERS = [
  {
    id: 1,
    name: "Production Team",
    role: "Manufacturing Excellence",
    image: "https://images.unsplash.com/photo-1578988254148-9937ccb32ae7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWN0b3J5JTIwd29ya2VycyUyMGdyb3VwfGVufDF8fHx8MTc2ODYyOTk3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 2,
    name: "Factory Floor",
    role: "Paper Production Unit",
    image: "https://images.unsplash.com/photo-1727517786578-ff2bb896b852?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXBlciUyMGZhY3RvcnklMjBwcm9kdWN0aW9ufGVufDF8fHx8MTc2ODYyOTk3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 3,
    name: "Manufacturing Crew",
    role: "Quality Assurance Team",
    image: "https://images.unsplash.com/photo-1578988247876-ce2647da8195?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW51ZmFjdHVyaW5nJTIwd29ya2VycyUyMHRlYW18ZW58MXx8fHwxNzY4NjI5OTc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 4,
    name: "Industrial Operations",
    role: "Packaging & Processing",
    image: "https://images.unsplash.com/photo-1654703680115-4ab46aebebc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmFjdG9yeSUyMGZsb29yfGVufDF8fHx8MTc2ODYyOTk3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 5,
    name: "Warehouse Division",
    role: "Logistics & Distribution",
    image: "https://images.unsplash.com/photo-1664382953403-fc1ac77073a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjB3b3JrZXJzfGVufDF8fHx8MTc2ODYyOTk3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  }
];

interface TeamMember {
  id: string | number;
  name: string;
  role: string;
  image: string;
  url?: string;
}

export function WhoWeAreSection({ onReadMore, teamMembers: propTeamMembers, content }: WhoWeAreProps) {
  const { t } = useLanguage();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(propTeamMembers && propTeamMembers.length > 0 ? propTeamMembers : FALLBACK_TEAM_MEMBERS);
  const [loading, setLoading] = useState(true);

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-bf34c9a5`;

  // Fetch team photos from admin portal
  useEffect(() => {
    const fetchTeamPhotos = async () => {
      try {
        console.log("Who We Are: Fetching team photos from admin portal...");
        const response = await fetch(`${API_URL}/images/team`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` }
        });
        const data = await response.json();

        console.log("Team photos response:", data);

        if (data.success && data.images && data.images.length > 0) {
          // Map uploaded photos to team member format
          const uploadedTeam = data.images.map((img: any) => ({
            id: img.id,
            name: img.name,
            role: img.role || "Team Member",
            image: img.url
          }));

          setTeamMembers(uploadedTeam);
          console.log(`✅ Loaded ${uploadedTeam.length} team photos from admin portal`);
        } else {
          console.log("No uploaded photos found, using fallback team members");
          setTeamMembers(FALLBACK_TEAM_MEMBERS);
        }
      } catch (error) {
        console.error("Failed to fetch team photos, using fallback:", error);
        setTeamMembers(FALLBACK_TEAM_MEMBERS);
      } finally {
        setLoading(false);
      }
    };

    if (!propTeamMembers || propTeamMembers.length === 0) {
      fetchTeamPhotos();
    } else {
      setTeamMembers(propTeamMembers);
      setLoading(false);
    }
  }, [propTeamMembers, API_URL]);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const textXLeft = useTransform(scrollYProgress, [0, 0.5], [-100, 0]);
  const textXRight = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  function handleMouseMove({ currentTarget, clientX, clientY }: ReactMouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className="py-20 bg-white relative overflow-hidden min-h-[1000px]"
    >
      {/* Animated Background */}
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

      {/* Dots Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(250,191,55,0.4)_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      <div className="px-4 md:px-12 max-w-7xl mx-auto relative z-10" style={{ transformStyle: "preserve-3d" }}>
        {/* Abstract Background Decoration - Parallax */}
        <motion.div
          style={{ y: y1, z: -100 }}
          className="absolute top-0 right-0 -mr-20 -mt-20 opacity-[0.03] pointer-events-none select-none"
        >
          <Factory className="size-96 text-black" />
        </motion.div>

        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="flex flex-col gap-8 relative z-10"
        >
          {/* Top Section: Typography & Text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start mt-20" style={{ transformStyle: "preserve-3d" }}>
            {/* Title Block */}
            <div className="relative pt-4" style={{ transformStyle: "preserve-3d" }}>
              {/* Animated Background Elements */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{ z: -50 }}
                className="absolute -left-20 -top-20 w-80 h-80 bg-[#fabf37]/5 rounded-full blur-3xl pointer-events-none mix-blend-multiply"
              />

              {/* Floating Paper Element */}
              <motion.div
                style={{ y: y2, rotate: 12, z: 50 }}
                className="absolute -top-10 right-10 w-16 h-20 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-zinc-100 -z-10 rounded-sm hidden md:block"
              />

              <div className="relative z-10 mt-24" style={{ transformStyle: "preserve-3d" }}>
                <div className="flex items-center gap-4 mb-6" style={{ transform: "translateZ(20px)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-0.5 bg-[#fabf37]"
                  />
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Est. 2000</span>
                </div>

                <div className="relative overflow-visible pb-4 -mb-4" style={{ transformStyle: "preserve-3d" }}>
                  <motion.h2
                    style={{ opacity, z: 80 }}
                    className="text-4xl sm:text-7xl md:text-9xl font-black tracking-tighter text-black leading-[0.85] mb-2"
                  >
                    {t(content?.titleTop || 'team_title_top')}
                  </motion.h2>
                </div>

                <div className="relative overflow-visible pb-4 -mb-4" style={{ transformStyle: "preserve-3d" }}>
                  <motion.h2
                    style={{ x: textXRight, opacity, z: 80 }}
                    className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-100 leading-[0.85]"
                  >
                    <span style={{ textShadow: '-1px -1px 0 #e4e4e7, 1px -1px 0 #e4e4e7, -1px 1px 0 #e4e4e7, 1px 1px 0 #e4e4e7' }}>
                      {t(content?.titleBottom || 'team_title_bottom')}
                    </span>
                  </motion.h2>
                </div>
              </div>
            </div>

            {/* Description & Stats Column */}
            <div className="space-y-8 lg:pt-24">
              <motion.div
                style={{ opacity, y: y2 }}
                className="space-y-4 text-base text-zinc-600 leading-relaxed"
              >
                <p>
                  {t(content?.desc1 || 'team_desc_1')}
                </p>
                <p>
                  {t(content?.desc2 || 'team_desc_2')}
                </p>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                style={{ opacity }}
                className="grid grid-cols-3 gap-8 pt-8 border-t border-zinc-100"
              >
                {[
                  { label: t(content?.stat1Label || 'team_stat_1_label'), value: content?.stat1Value || "5+", icon: Award },
                  { label: t(content?.stat2Label || 'team_stat_2_label'), value: content?.stat2Value || "100%", icon: Leaf },
                  { label: t(content?.stat3Label || 'team_stat_3_label'), value: content?.stat3Value || "100+", icon: Users },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <stat.icon className="size-4 text-[#fabf37] mb-1" />
                    <p className="font-black text-black leading-none text-base">{stat.value}</p>
                    <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </motion.div>

              {/* Button */}
              <motion.div
                style={{ opacity }}
              >
                <button
                  onClick={onReadMore}
                  className="group flex items-center gap-4"
                >
                  <div className="size-12 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-[#fabf37] group-hover:text-black transition-all duration-300 shadow-lg group-hover:shadow-[#fabf37]/50">
                    <ArrowRight className="size-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-black uppercase tracking-widest text-black">{t('read_our_story') || "Read Our Story"}</span>
                    <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider group-hover:text-[#fabf37] transition-colors">{t('explore_factory') || "Explore the factory"}</span>
                  </div>
                </button>
              </motion.div>
            </div>
          </div>

          {/* Bottom Section: Team Carousel - Full Width */}
          <div
            className="relative w-full py-10 mt-8 overflow-hidden"
          >
            <div className="w-full relative overflow-hidden -mx-4 md:-mx-12 px-4 md:px-12">
              {/* Horizontal Marquee Gradients */}
              <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

              <motion.div
                animate={{ x: [0, -(220 + 24) * teamMembers.length] }}
                transition={{
                  duration: teamMembers.length * 6,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop"
                }}
                className="flex gap-6 w-max"
              >
                {/* Double list for smooth loop */}
                {[...teamMembers, ...teamMembers, ...teamMembers].map((member, i) => (
                  <div key={`${member.id}-${i}`} className="relative group rounded-3xl overflow-hidden shrink-0 w-[220px] h-[300px] shadow-sm hover:shadow-2xl transition-all duration-700 border-[6px] border-zinc-50 bg-zinc-100">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                      <h4 className="text-white font-black text-base translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{member.name}</h4>
                      <p className="text-[#fabf37] text-[9px] font-black uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-50">{member.role}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}