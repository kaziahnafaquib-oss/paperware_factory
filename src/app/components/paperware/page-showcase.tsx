import React from "react";
import { motion } from "framer-motion";
import { 
  Users, ShoppingBag, Coffee, FileText, Utensils, Megaphone, Pill, 
  ShoppingBasket, Shirt, Leaf, Lightbulb, Phone, FileQuestion, Briefcase, 
  ShieldCheck, Truck, Image as ImageIcon, Factory, Video, Share2, Box, 
  Activity, BarChart3, Globe, Database, BookOpen, Handshake, Building2, 
  Heart, CreditCard, UserCircle
} from "lucide-react";

interface PageShowcaseProps {
  onNavigate: (page: string) => void;
}

const pages = [
  { id: "about", title: "About Us", icon: Users, desc: "Our Story & Vision" },
  { id: "products", title: "Full Catalog", icon: ShoppingBag, desc: "Explore All Products" },
  { id: "papercups", title: "Paper Cups", icon: Coffee, desc: "Premium Beverage Solutions" },
  { id: "clients", title: "Client Stories", icon: Handshake, desc: "Success Stories" },
  { id: "office-stationary", title: "Office Supplies", icon: FileText, desc: "Corporate Essentials" },
  { id: "restaurant-supplies", title: "Restaurant", icon: Utensils, desc: "Food Service Gear" },
  { id: "marketing-materials", title: "Marketing", icon: Megaphone, desc: "Brand Collateral" },
  { id: "pharma-supplies", title: "Pharmaceutical", icon: Pill, desc: "Medical Packaging" },
  { id: "fmcg-supplies", title: "FMCG", icon: ShoppingBasket, desc: "Retail Packaging" },
  { id: "garments", title: "Garments", icon: Shirt, desc: "Textile Solutions" },
  { id: "sustainability", title: "Sustainability", icon: Leaf, desc: "Eco Initiatives" },
  { id: "solutions", title: "Solutions", icon: Lightbulb, desc: "Custom Services" },
  { id: "manufacturing", title: "Manufacturing", icon: Factory, desc: "Production Lines" },
  { id: "technology", title: "Our ERP", icon: Database, desc: "Tech Infrastructure", route: "erp" },
  { id: "export", title: "Export", icon: Globe, desc: "Global Reach" },
  { id: "career", title: "Careers", icon: Briefcase, desc: "Join the Team" },
  { id: "investor", title: "Investors", icon: BarChart3, desc: "Financial Data" },
  { id: "partners", title: "Partners", icon: Building2, desc: "Network" },
  { id: "csr", title: "CSR", icon: Heart, desc: "Social Responsibility" },
  { id: "gallery", title: "Gallery", icon: ImageIcon, desc: "Visual Showcase" },
  { id: "studio", title: "Studio", icon: Video, desc: "Creative Hub" },
  { id: "socials", title: "Social Media", icon: Share2, desc: "Connect With Us" },
  { id: "catalog-3d", title: "3D Catalog", icon: Box, desc: "Interactive View" },
  { id: "factory-live", title: "Factory Live", icon: Activity, desc: "Real-time Cam" },
  { id: "contact", title: "Contact", icon: Phone, desc: "Get in Touch" },
  { id: "faq", title: "FAQ", icon: FileQuestion, desc: "Common Questions" },
  { id: "compliance", title: "Compliance", icon: ShieldCheck, desc: "Certifications" },
  { id: "tracking", title: "Track Order", icon: Truck, desc: "Logistics Status" },
];

export function PageShowcase({ onNavigate }: PageShowcaseProps) {
  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden border-t border-zinc-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#fabf37]/50 to-transparent" />
      
      <div className="container mx-auto px-4 mb-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900 mb-6"
        >
           <div className="size-1.5 bg-[#fabf37] rounded-full animate-pulse" />
           <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Site Map</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4"
        >
          Explore <span className="text-[#fabf37]">Everything</span>
        </motion.h2>
        <p className="text-zinc-500 text-sm font-medium max-w-lg mx-auto">
          Navigate through our comprehensive ecosystem of products, services, and company information.
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden pb-10">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

        {/* Row 1 - Moving Left */}
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 pl-6 w-max hover:[animation-play-state:paused]"
        >
          {[...pages, ...pages].map((page, idx) => (
            <div 
              key={`${page.id}-${idx}`}
              onClick={() => onNavigate(page.route || page.id)}
              className="group relative w-64 h-40 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 cursor-pointer hover:bg-zinc-800 hover:border-[#fabf37]/30 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <page.icon className="size-24 text-white" />
              </div>
              
              <div className="size-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-[#fabf37] group-hover:border-[#fabf37]/30 transition-colors">
                <page.icon className="size-5" />
              </div>

              <div>
                <h3 className="text-white font-black uppercase tracking-tight text-lg group-hover:text-[#fabf37] transition-colors">{page.title}</h3>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mt-1">{page.desc}</p>
              </div>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                 <div className="size-6 rounded-full bg-[#fabf37] flex items-center justify-center">
                    <div className="size-0.5 bg-black rounded-full" />
                 </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
