import image_370cc946765f24fecd2241c5798febf3f636cf5e from 'figma:asset/370cc946765f24fecd2241c5798febf3f636cf5e.webp';
import React from "react";
import { motion } from "motion/react";
import { 
  HeartPulse, ShieldAlert, Microscope, CircleCheck as CheckCircle2, 
  ArrowRight, ShieldCheck, Zap, Layers, Cpu, FileBadge,
  FileText, FolderOpen, ClipboardList, Pill, BookOpen
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Truck } from "lucide-react";
import { TopSellingProducts } from "../components/TopSellingProducts";
import yStationery from "figma:asset/996fde50aac464284d2652c5f215d915bf7e1897.webp";
import yBrochures from "figma:asset/aebcf13cb4e5ea06fcb9980128694f52cc69049a.webp";
import pMedicineBoxes from "figma:asset/products/medicine-boxes.webp";
import pPrescriptionPad from "figma:asset/products/prescription-pad.webp";

const products = [
  { name: "Patient File", desc: "Durable medical record folders with antimicrobial coating.", category: "Record", image: yStationery, price: "22.00", icon: FolderOpen },
  { name: "X-Ray File", desc: "Large-format protective envelopes for diagnostic films.", category: "Record", image: "https://images.unsplash.com/photo-1735050871569-4cb29aae3a30?auto=format&fit=crop&q=80&w=800", price: "35.00", icon: FileText },
  { name: "Doctor's Prescription Pad", desc: "Secure serialized prescription pads with security features.", category: "Prescription", image: pPrescriptionPad, price: "12.00", icon: ClipboardList },
  { name: "Report Envelope", desc: "Privacy-guaranteed clinical report packaging.", category: "Envelope", image: "https://images.unsplash.com/photo-1579642984744-4dd0fe83c38c?auto=format&fit=crop&q=80&w=800", price: "8.50", icon: FileText },
  { name: "Medicine Box", desc: "Precision-molded drug packaging with braille support.", category: "Packaging", image: pMedicineBoxes, price: "14.50", icon: Pill },
  { name: "Medicine Literature", desc: "Micro-folded dosage guides and safety leaflets.", category: "Print", image: yBrochures, price: "2.50", icon: BookOpen },
];

export function PharmaSuppliesPage({ onProductClick }: { onProductClick: (p: any) => void }) {
  const { t } = useLanguage();

  return (
    <div className="bg-[#fdfaf3] min-h-screen pt-32 pb-24 font-['Poppins',sans-serif]">
      {/* Hero */}
      <section className="container mx-auto px-4 mb-24">
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
            <span className="text-emerald-600 font-black uppercase tracking-[0.4em] text-xs">Medical Grade Packaging</span>
          </motion.div>
          <h1 className="text-[56px] md:text-[90px] font-black uppercase tracking-tighter leading-[0.85] mb-8 text-black">
            Pharma <br /> <span className="text-zinc-500">Supplies</span>
          </h1>
          <p className="text-zinc-500 font-bold text-lg max-w-2xl leading-relaxed">
            Safety, precision, and compliance. Our pharmaceutical packaging and hospital stationary are manufactured in sterile environments, meeting strict global healthcare standards.
          </p>
        </div>
      </section>

      {/* Compliance Grid */}
      <section className="container mx-auto px-4 mb-32">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: <ShieldCheck />, title: "Pharma Grade", desc: "Safe for drugs." },
            { icon: <Microscope />, title: "Sterile Lab", desc: "Dust-free production." },
            { icon: <ShieldAlert />, title: "Anti-Counterfeit", desc: "Secure printing." },
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white border border-black/5 rounded-[32px] flex flex-col items-center text-center space-y-4">
              <div className="text-emerald-500">{item.icon}</div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[rgb(0,0,0)]">{item.title}</h4>
              <p className="text-zinc-400 font-bold text-[10px] uppercase leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Display */}
      <section className="container mx-auto px-4 mb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <motion.div 
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onProductClick(p)}
              className="group bg-white rounded-[40px] border border-black/5 hover:border-[#fabf37] hover:shadow-2xl transition-all cursor-pointer overflow-hidden"
            >
              <div className="aspect-square overflow-hidden">
                <ImageWithFallback src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="size-12 rounded-xl bg-zinc-50 flex items-center justify-center text-black group-hover:bg-black group-hover:text-[#fabf37] transition-all">
                    <p.icon className="size-5" />
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest px-3 py-1 bg-zinc-100 rounded-full text-[rgb(0,0,0)]">{p.category}</span>
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-3 text-black">{p.name}</h3>
                <p className="text-zinc-500 font-bold text-xs mb-6 leading-relaxed line-clamp-2">{p.desc}</p>
                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">
                    Order Now <ArrowRight className="size-4" />
                  </button>
                  <Zap className="size-4 text-[#fabf37]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <TopSellingProducts onProductClick={onProductClick} />

      {/* Pharma Logistics Banner */}
      <section className="container mx-auto px-4 mb-32">
        <div className="bg-black text-white rounded-[80px] p-16 flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none"><Truck className="size-64 text-[#fabf37]" /></div>
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Emergency <br /> <span className="text-[#fabf37]">Supply</span> Chain</h2>
            <p className="text-zinc-500 font-bold text-lg max-w-md">Critical medical stationary delivered within 24 hours to hospitals across the country.</p>
          </div>
          <div className="lg:w-1/2 flex justify-end">
            <button className="bg-[#fabf37] text-black px-12 py-6 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">Hospital Quick-Order</button>
          </div>
        </div>
      </section>

      {/* Industrial Lab Preview */}
      <section className="bg-zinc-900 py-32 relative overflow-hidden rounded-[100px] mx-4">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(16,185,129,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container mx-auto px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl space-y-8">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white">
              The <span className="text-emerald-500">Sterile</span> Standard
            </h2>
            <p className="text-zinc-500 font-bold text-lg leading-relaxed">
              We operate dedicated production lines for healthcare providers, with batch traceability.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-3xl p-12 rounded-[60px] border border-white/10 space-y-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Production Engine Status</p>
            <div className="flex items-center gap-4">
               <div className="size-3 rounded-full bg-emerald-500 animate-ping" />
               <span className="text-white font-black uppercase tracking-tighter">HEPA-Filtered Active</span>
            </div>
            <button className="w-full bg-emerald-500 text-black py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all">
              Request Compliance Audit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}