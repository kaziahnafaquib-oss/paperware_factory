import { ReactNode } from 'react';
import { motion } from "framer-motion";
import { TrendingUp, Database, ChartBar, CircleCheck as CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const PageHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-white">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/50 to-white z-10" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#fabf37] to-transparent opacity-20" />
    </div>
    <div className="container mx-auto max-w-6xl relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="size-2 rounded-full bg-[#fabf37] animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Capital Growth Protocol</span>
        </div>
        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
          {title}
        </h1>
        <p className="text-lg md:text-xl font-bold text-zinc-500 uppercase italic max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </motion.div>
    </div>
  </section>
);

const ContentBlock = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <section className={`py-20 px-4 bg-white ${className}`}>
    <div className="container mx-auto max-w-6xl">
      {children}
    </div>
  </section>
);

export function InvestorPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-white min-h-screen font-['Poppins',sans-serif] selection:bg-[#fabf37] selection:text-black">
      <PageHeader 
        title="Investor Relations" 
        subtitle="Financing the future of high-precision, eco-friendly manufacturing in South Asia."
      />

      <ContentBlock>
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-16">
            <div className="space-y-8">
              <p className="text-2xl font-medium text-zinc-600 leading-tight">
                Paperware Factory welcomes strategic investors who share our vision for sustainable manufacturing and long-term growth.
              </p>
              <p className="text-zinc-500 leading-relaxed text-lg">
                Since starting commercial operations in 2020, the company has demonstrated steady growth in demand for eco-friendly paper packaging products in Bangladesh. Our technical advantage and operational efficiency provide a robust foundation for scalable returns.
              </p>
            </div>

            <div className="space-y-10">
              <h3 className="text-3xl font-black uppercase tracking-tighter text-black">Strategic Opportunities</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Capacity Expansion", desc: "Scaling production floors to meet surging regional demand." },
                  { title: "New Production Lines", desc: "Diversifying product range with high-speed automated machinery." },
                  { title: "Renewable Initiatives", desc: "Transitioning factory nodes to solar and zero-carbon energy." },
                  { title: "Digital Transformation", desc: "Enhancing AI-driven quality control and supply chain automation." },
                  { title: "Market Expansion", desc: "Strategic entry into nationwide and high-value export markets." }
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-zinc-50 rounded-[40px] border border-zinc-100 group hover:bg-black hover:text-white transition-all duration-500">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="size-10 rounded-xl bg-white flex items-center justify-center text-[#fabf37] border border-zinc-200 group-hover:bg-zinc-900 group-hover:border-zinc-800 transition-colors">
                        <TrendingUp className="size-5" />
                      </div>
                      <h4 className="text-[12px] font-black uppercase tracking-widest leading-none">{item.title}</h4>
                    </div>
                    <p className="text-xs font-bold text-zinc-500 group-hover:text-zinc-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-12 bg-[#fabf37]/5 rounded-[64px] border border-[#fabf37]/10 space-y-8">
              <div className="flex items-center gap-4">
                <Database className="size-8 text-[#fabf37]" />
                <h3 className="text-2xl font-black uppercase tracking-tight text-black">Operational Transparency</h3>
              </div>
              <p className="text-zinc-600 font-medium leading-relaxed">
                We ensure transparency through ERPNext-based financial tracking, reporting, and operational monitoring. Every batch, every transaction, and every efficiency metric is recorded in real-time.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-4">
                <div className="space-y-1">
                  <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Financial Sync</div>
                  <div className="text-xl font-black text-black uppercase">Real-time</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Audit Status</div>
                  <div className="text-xl font-black text-black uppercase">Verified</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Reporting</div>
                  <div className="text-xl font-black text-black uppercase">Automated</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="p-10 bg-zinc-900 rounded-[48px] text-white space-y-8">
              <div className="size-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-[#fabf37]">
                <ChartBar className="size-8" />
              </div>
              <div className="space-y-4">
                <h4 className="text-2xl font-black uppercase tracking-tighter">Engagement Protocol</h4>
                <p className="text-zinc-400 text-xs font-bold leading-relaxed uppercase">
                  Investors are encouraged to engage with us for detailed business plans, forecasts, and growth strategies.
                </p>
              </div>
              <button className="w-full py-6 bg-[#fabf37] text-black rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all shadow-2xl">
                Request Prospectus
              </button>
            </div>
          </div>
        </div>
      </ContentBlock>
    </div>
  );
}