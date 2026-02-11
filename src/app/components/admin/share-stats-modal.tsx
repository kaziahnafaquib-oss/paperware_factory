import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, Share2, Copy, Mail, Download, Sparkles, Check, FileText, BarChart3, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface ShareStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: {
    visitors: number;
    growth: string;
    topRegion: string;
    engagementRate: string;
  };
}

export function ShareStatsModal({ isOpen, onClose, stats }: ShareStatsModalProps) {
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSummary, setAiSummary] = useState("");

  // Simulate AI generation when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsGenerating(true);
      setAiSummary("");
      
      // Simulate typing effect
      const summaryText = `Traffic has surged by ${stats.growth} in the last 24h, driven primarily by high engagement from ${stats.topRegion}. Mobile retention has improved significantly, contributing to a ${stats.engagementRate} overall engagement score. Recommendation: Capitalize on this momentum by increasing ad spend in the top performing region.`;
      
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
    }
  }, [isOpen, stats]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`Traffic Report: ${stats.visitors.toLocaleString()} visitors (${stats.growth}). Top Region: ${stats.topRegion}.`);
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

  const handleEmail = () => {
    toast.success("Report queued for email delivery");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed top-[130px] inset-x-0 bottom-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-[#09090b] border border-white/10 rounded-[32px] w-full max-w-lg overflow-hidden relative z-10 shadow-2xl"
          >
            {/* Header */}
            <div className="bg-zinc-900/50 p-6 border-b border-white/5 flex justify-between items-center">
              <div>
                 <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                    <Share2 className="size-5 text-[#fabf37]" /> Share Intelligence
                 </h3>
                 <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Export Analytics & AI Insights</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
               {/* Stats Preview Card */}
               <div className="bg-black border border-white/10 rounded-2xl p-4 flex items-center justify-between relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#fabf37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                     <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Total Visitors</p>
                     <p className="text-2xl font-black text-white">{stats.visitors.toLocaleString()}</p>
                  </div>
                  <div className="relative z-10 text-right">
                     <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Growth</p>
                     <p className="text-xl font-black text-emerald-500">{stats.growth}</p>
                  </div>
                  
                  <div className="absolute -right-4 -bottom-4 opacity-10">
                     <BarChart3 className="size-24 text-white" />
                  </div>
               </div>

               {/* AI Summary Section */}
               <div className="space-y-3">
                  <div className="flex items-center gap-2">
                     <Sparkles className="size-4 text-[#fabf37] animate-pulse" />
                     <span className="text-xs font-black text-[#fabf37] uppercase tracking-widest">Neural Summary</span>
                  </div>
                  <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-4 min-h-[100px]">
                     <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                        {aiSummary}
                        {isGenerating && <span className="inline-block w-2 h-4 bg-[#fabf37] ml-1 animate-pulse" />}
                     </p>
                  </div>
               </div>

               {/* Share Options */}
               <div className="grid grid-cols-1 gap-3">
                  <button 
                     onClick={handleCopy}
                     className="w-full py-4 bg-zinc-900 border border-white/10 hover:border-[#fabf37]/50 rounded-xl flex items-center justify-between px-6 transition-all group"
                  >
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-black rounded-lg text-zinc-400 group-hover:text-white transition-colors">
                           {copied ? <Check className="size-5 text-emerald-500" /> : <Copy className="size-5" />}
                        </div>
                        <div className="text-left">
                           <p className="text-sm font-bold text-white uppercase tracking-wide">Copy Smart Link</p>
                           <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Share secure access URL</p>
                        </div>
                     </div>
                     <ArrowRight className="size-4 text-zinc-600 group-hover:text-[#fabf37] transition-colors" />
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                     <button 
                        onClick={handleEmail}
                        className="py-4 bg-zinc-900 border border-white/10 hover:border-[#fabf37]/50 rounded-xl flex flex-col items-center justify-center gap-2 transition-all group"
                     >
                        <Mail className="size-5 text-zinc-400 group-hover:text-white transition-colors" />
                        <span className="text-[10px] font-bold text-zinc-400 group-hover:text-white uppercase tracking-widest">Email Team</span>
                     </button>
                     <button 
                        onClick={handleDownload}
                        className="py-4 bg-[#fabf37] border border-[#fabf37] hover:bg-[#fabf37]/90 rounded-xl flex flex-col items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(250,191,55,0.2)]"
                     >
                        <Download className="size-5 text-black" />
                        <span className="text-[10px] font-black text-black uppercase tracking-widest">Download PDF</span>
                     </button>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}