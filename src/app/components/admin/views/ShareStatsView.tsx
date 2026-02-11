import { useEffect, useState } from 'react';
import { ViewContainer } from "../ViewContainer";
import { Share2, Copy, Mail, Download, Sparkles, Check, BarChart3, ArrowRight, TrendingUp, Globe, Users } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

const growthData = [
  { day: "Mon", shares: 145 },
  { day: "Tue", shares: 230 },
  { day: "Wed", shares: 180 },
  { day: "Thu", shares: 290 },
  { day: "Fri", shares: 450 },
  { day: "Sat", shares: 320 },
  { day: "Sun", shares: 380 },
];

const platformData = [
  { name: "LinkedIn", value: 45, color: "#0077b5" },
  { name: "Twitter", value: 30, color: "#1da1f2" },
  { name: "Email", value: 15, color: "#ea4335" },
  { name: "Direct", value: 10, color: "#fabf37" },
];

export function ShareStatsView() {
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSummary, setAiSummary] = useState("");

  // Simulate AI generation on mount
  useEffect(() => {
    setIsGenerating(true);
    setAiSummary("");
    
    const summaryText = "Viral coefficient has increased by 14% this week. LinkedIn shares are driving the highest quality traffic with a 3.2% conversion rate. Recommendation: Boost the latest product announcement post on LinkedIn to maximize reach.";
    
    let i = 0;
    const interval = setInterval(() => {
      setAiSummary(summaryText.slice(0, i));
      i++;
      if (i > summaryText.length) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 20);
    
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("https://paperware.io/report/q1-2026");
    setCopied(true);
    toast.success("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Generating PDF Report...',
        success: 'Report downloaded successfully',
        error: 'Failed to generate report',
      }
    );
  };

  return (
    <ViewContainer title="Share Intelligence" subtitle="Virality & Distribution Analytics">
      <div className="space-y-8">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-[#fabf37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="p-2 bg-[#fabf37]/20 text-[#fabf37] rounded-lg">
                   <Share2 className="size-5" />
                </div>
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Total Shares</span>
             </div>
             <p className="text-4xl font-black text-white relative z-10">2,415</p>
             <div className="flex items-center gap-2 mt-2 relative z-10">
                <TrendingUp className="size-4 text-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wide">+18.2% this week</span>
             </div>
          </div>

          <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
             <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="p-2 bg-blue-500/20 text-blue-500 rounded-lg">
                   <Users className="size-5" />
                </div>
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Unique Referrals</span>
             </div>
             <p className="text-4xl font-black text-white relative z-10">15,892</p>
             <div className="flex items-center gap-2 mt-2 relative z-10">
                <Globe className="size-4 text-zinc-500" />
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Across 42 Countries</span>
             </div>
          </div>

          <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
             <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="p-2 bg-purple-500/20 text-purple-500 rounded-lg">
                   <BarChart3 className="size-5" />
                </div>
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Viral Coefficient</span>
             </div>
             <p className="text-4xl font-black text-white relative z-10">1.4</p>
             <div className="flex items-center gap-2 mt-2 relative z-10">
                <Sparkles className="size-4 text-[#fabf37]" />
                <span className="text-[10px] font-bold text-[#fabf37] uppercase tracking-wide">High Virality</span>
             </div>
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-gradient-to-r from-zinc-900 to-black border border-white/10 rounded-2xl p-6 flex items-start gap-4 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-1 h-full bg-[#fabf37]" />
           <div className="p-3 bg-[#fabf37]/10 rounded-xl text-[#fabf37]">
              <Sparkles className="size-6 animate-pulse" />
           </div>
           <div className="flex-1">
              <h4 className="text-sm font-black text-white uppercase tracking-wide mb-2 flex items-center gap-2">
                 Neural Summary
                 {isGenerating && <span className="size-1.5 bg-[#fabf37] rounded-full animate-ping" />}
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed font-medium font-mono">
                 {aiSummary}
                 {isGenerating && <span className="inline-block w-2 h-4 bg-[#fabf37] ml-1 align-middle animate-pulse" />}
              </p>
           </div>
        </div>

        {/* Charts & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Growth Chart */}
           <div className="lg:col-span-2 bg-zinc-900/50 border border-white/5 rounded-3xl p-8">
              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-8">Share Growth Trend</h3>
              <div className="h-[300px] w-full min-w-0">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={growthData}>
                       <defs>
                          <linearGradient id="colorShares" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#fabf37" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#fabf37" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="day" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                       <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                       <Tooltip 
                          contentStyle={{ backgroundColor: "#000", border: "1px solid #27272a", borderRadius: "12px" }}
                          itemStyle={{ fontSize: "10px", fontWeight: "900", textTransform: "uppercase", color: "#fabf37" }}
                       />
                       <Area type="monotone" dataKey="shares" stroke="#fabf37" strokeWidth={3} fillOpacity={1} fill="url(#colorShares)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Quick Actions */}
           <div className="space-y-4">
              <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 flex flex-col h-full">
                 <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6">Quick Actions</h3>
                 
                 <div className="space-y-3 flex-1">
                    <button 
                       onClick={handleCopy}
                       className="w-full py-4 bg-black border border-white/10 hover:border-[#fabf37]/50 rounded-xl flex items-center justify-between px-6 transition-all group"
                    >
                       <div className="flex items-center gap-3">
                          <div className="p-2 bg-zinc-900 rounded-lg text-zinc-400 group-hover:text-white transition-colors">
                             {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
                          </div>
                          <span className="text-xs font-bold text-zinc-300 uppercase tracking-wide">Copy Report Link</span>
                       </div>
                    </button>

                    <button 
                       onClick={() => toast.success("Email queued for delivery")}
                       className="w-full py-4 bg-black border border-white/10 hover:border-[#fabf37]/50 rounded-xl flex items-center justify-between px-6 transition-all group"
                    >
                       <div className="flex items-center gap-3">
                          <div className="p-2 bg-zinc-900 rounded-lg text-zinc-400 group-hover:text-white transition-colors">
                             <Mail className="size-4" />
                          </div>
                          <span className="text-xs font-bold text-zinc-300 uppercase tracking-wide">Email to Team</span>
                       </div>
                    </button>

                    <button 
                       onClick={handleDownload}
                       className="w-full py-4 bg-[#fabf37] text-black rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(250,191,55,0.2)] hover:scale-105"
                    >
                       <Download className="size-4" />
                       <span className="text-xs font-black uppercase tracking-widest">Download PDF</span>
                    </button>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </ViewContainer>
  );
}