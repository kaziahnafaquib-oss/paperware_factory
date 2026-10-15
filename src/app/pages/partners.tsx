import React from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Handshake, Award, ShieldCheck, Globe } from "lucide-react";

export interface Partner {
  id: string;
  name: string;
  category: string;
  logo: string;
  description: string;
}

interface PartnersPageProps {
  partners?: Partner[];
  signingImage?: string;
}

const CATEGORIES = [
  "Raw Material Supplier",
  "Chemical Partner",
  "Delivery Partner",
  "Telco Partner",
  "Internet Partner",
  "Digital Partner",
  "ERP Partner",
  "Website Partner"
];

const DEFAULT_SIGNING_IMAGE = "https://images.unsplash.com/photo-1758599543152-a73184816eba?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoYW5kc2hha2UlMjBidXNpbmVzcyUyMGRlYWwlMjBwYXJ0bmVyc2hpcHxlbnwxfHx8fDE3Njc2OTM3ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const DEFAULT_PARTNERS: Partner[] = [
  {
    id: "1",
    name: "EcoPulp Industries",
    category: "Raw Material Supplier",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&w=300&h=300&fit=crop&q=75",
    description: "Premium sustainable paper pulp provider."
  },
  {
    id: "2",
    name: "ChemSafe Solutions",
    category: "Chemical Partner",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&w=300&h=300&fit=crop&q=75",
    description: "Food-grade coatings."
  },
  {
    id: "3",
    name: "FastTrack Logistics",
    category: "Delivery Partner",
    logo: "https://images.unsplash.com/photo-1626863905121-3b0c0ed5b92c?auto=format&w=300&h=300&fit=crop&q=75",
    description: "Nationwide secure distribution network."
  },
  {
    id: "4",
    name: "ConnectTel",
    category: "Telco Partner",
    logo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&w=300&h=300&fit=crop&q=75",
    description: "Enterprise communication infrastructure."
  },
  {
    id: "5",
    name: "NetStream",
    category: "Internet Partner",
    logo: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&w=300&h=300&fit=crop&q=75",
    description: "High-speed fiber connectivity."
  },
  {
    id: "6",
    name: "DigitalCore",
    category: "Digital Partner",
    logo: "https://images.unsplash.com/photo-1572044162444-ad6021194360?auto=format&w=300&h=300&fit=crop&q=75",
    description: "Digital transformation solutions."
  },
  {
    id: "7",
    name: "SysMaster ERP",
    category: "ERP Partner",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&w=300&h=300&fit=crop&q=75",
    description: "Integrated resource planning systems."
  },
  {
    id: "8",
    name: "WebCrafters",
    category: "Website Partner",
    logo: "https://images.unsplash.com/photo-1496200186974-4293800e2c20?auto=format&w=300&h=300&fit=crop&q=75",
    description: "Web presence and e-commerce."
  }
];

export function PartnersPage({ partners = DEFAULT_PARTNERS, signingImage = DEFAULT_SIGNING_IMAGE }: PartnersPageProps) {
  const displayPartners = partners && partners.length > 0 ? partners : DEFAULT_PARTNERS;
  const displayImage = signingImage || DEFAULT_SIGNING_IMAGE;

  const otherPartners = displayPartners.filter(p => !CATEGORIES.includes(p.category));

  return (
    <div className="min-h-screen bg-zinc-50 font-['Poppins',sans-serif]">
      
      {/* Signing Ceremony Hero */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <ImageWithFallback
          src={displayImage}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Strategic Partnership Signing"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-center bg-gradient-to-t from-black/60 via-transparent to-transparent">
          <div className="container mx-auto px-4 md:px-12">
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, staggerChildren: 0.15 }}
               className="max-w-4xl space-y-8 relative z-10"
             >
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#fabf37] text-black rounded-full font-black text-xs uppercase tracking-[0.2em] border-2 border-white/20 shadow-[0_0_30px_rgba(250,191,55,0.4)]"
               >
                  <Handshake className="size-4" />
                  <span>Global Alliance Network</span>
               </motion.div>
               
               <motion.h1 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] drop-shadow-2xl"
               >
                 Building <br/>
                 <span className="relative inline-block">
                   <span className="absolute inset-0 blur-3xl bg-[#fabf37]/30" />
                   <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#fabf37] via-[#fff5d6] to-white filter drop-shadow-sm">For The Future</span>
                 </span>
               </motion.h1>

               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="flex flex-col gap-6 pl-6 border-l-4 border-[#fabf37]"
               >
                 <p className="text-zinc-100 text-xl md:text-2xl font-medium max-w-2xl leading-relaxed drop-shadow-lg">
                   We believe in the power of collaboration. Our ecosystem of partners empowers us to deliver excellence at every step of the supply chain.
                 </p>
               </motion.div>

               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="flex flex-wrap gap-4 pt-6"
               >
                 <button className="px-10 py-4 bg-[#fabf37] text-black font-black uppercase tracking-widest rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl shadow-[#fabf37]/20">
                   Join Our Network
                 </button>
                 <button className="px-10 py-4 bg-white/10 backdrop-blur-md text-white font-bold uppercase tracking-widest rounded-full hover:bg-white/20 border border-white/20 transition-all duration-300">
                   View Partners
                 </button>
               </motion.div>
             </motion.div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-black py-20 border-b border-zinc-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { icon: ShieldCheck, title: "Verified Partners", text: "Every partner reviewed" },
               { icon: Globe, title: "Global Network", text: "Local and international" },
               { icon: Award, title: "Premium Quality", text: "Trusted suppliers" }
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.2 }}
                 viewport={{ once: true }}
                 whileHover={{ scale: 1.02 }}
                 className="flex items-center gap-6 p-8 rounded-[30px] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-[#fabf37]/50 hover:bg-white/10 transition-all duration-300 group shadow-lg"
               >
                 <div className="size-16 rounded-2xl bg-[#fabf37]/10 flex items-center justify-center text-[#fabf37] group-hover:bg-[#fabf37] group-hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(250,191,55,0.1)]">
                   <item.icon className="size-8" />
                 </div>
                 <div>
                   <h4 className="text-white text-lg font-black uppercase tracking-wide mb-1 group-hover:text-[#fabf37] transition-colors">{item.title}</h4>
                   <p className="text-zinc-500 text-sm font-medium leading-relaxed group-hover:text-zinc-300 transition-colors">{item.text}</p>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </div>

      {/* Partners Sections */}
      <div className="py-24 container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">Our Ecosystem</h2>
          <div className="w-24 h-1 bg-[#fabf37] mx-auto rounded-full" />
        </div>

        <div className="space-y-24">
          {/* Main Categories */}
          {CATEGORIES.map((category, catIndex) => {
            const categoryPartners = displayPartners.filter(p => p.category === category);
            if (categoryPartners.length === 0) return null;

            return (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-px flex-1 bg-zinc-200" />
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black border-2 border-black rounded-full px-8 py-2">
                    {category}
                  </h3>
                  <div className="h-px flex-1 bg-zinc-200" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                  {categoryPartners.map((partner, index) => (
                    <PartnerCard key={partner.id || index} partner={partner} index={index} />
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Other Categories */}
          {otherPartners.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 bg-zinc-200" />
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black border-2 border-black rounded-full px-8 py-2">
                  Other Partners
                </h3>
                <div className="h-px flex-1 bg-zinc-200" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {otherPartners.map((partner, index) => (
                  <PartnerCard key={partner.id || index} partner={partner} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function PartnerCard({ partner, index }: { partner: Partner; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -10 }}
      className="bg-white p-6 rounded-[32px] shadow-lg border border-zinc-100 hover:shadow-2xl hover:border-[#fabf37]/30 transition-all duration-300 group flex flex-col items-center text-center h-full"
    >
      <div className="relative size-24 md:size-32 mb-6 p-4 rounded-full bg-zinc-50 border border-zinc-100 group-hover:scale-110 transition-transform duration-500 overflow-hidden flex items-center justify-center">
         {partner.logo ? (
           <ImageWithFallback 
             src={partner.logo} 
             className="w-full h-full object-contain mix-blend-multiply" 
             alt={partner.name} 
           />
         ) : (
           <div className="text-2xl font-black text-zinc-300">{partner.name.substring(0, 2)}</div>
         )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg md:text-xl font-black text-black leading-tight">
          {partner.name}
        </h3>
        <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">
          {partner.description}
        </p>
      </div>

      <div className="mt-auto pt-6 w-full">
         <button className="w-full py-2 rounded-xl bg-zinc-100 text-xs font-bold uppercase hover:bg-black hover:text-[#fabf37] transition-colors">
           View Profile
         </button>
      </div>
    </motion.div>
  );
}
