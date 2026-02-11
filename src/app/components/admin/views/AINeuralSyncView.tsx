import { useState } from 'react';
import { Zap, Sparkles, Activity, Globe, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ViewContainer } from "../ViewContainer";

export default function AINeuralSyncView() {
  const [syncStatus, setSyncStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [neuralLinks, setNeuralLinks] = useState(12842);
  
  const triggerSync = () => {
    setSyncStatus('syncing');
    setProgress(0);
    toast.loading("Neural Engine: Initiating Core Synchronization...");
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSyncStatus('complete');
          setNeuralLinks(prevLinks => prevLinks + Math.floor(Math.random() * 500) + 100);
          toast.dismiss();
          toast.success("Neural Sync Successful", {
            description: "Distributed ledger updated across all manufacturing nodes.",
            icon: <Zap className="size-4 text-[#fabf37]" />
          });
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <ViewContainer 
      title="AI Neural Sync" 
      subtitle="Advanced Manufacturing Data Intelligence"
      actions={
        <button 
          onClick={triggerSync}
          disabled={syncStatus === 'syncing'}
          className="bg-[#fabf37] text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(250,191,55,0.3)]"
        >
          <Zap className={`size-4 ${syncStatus === 'syncing' ? 'animate-pulse' : ''}`} /> 
          {syncStatus === 'syncing' ? 'Neural Processing...' : 'Trigger Global Sync'}
        </button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Visualizer */}
          <div className="bg-black border border-white/5 rounded-[48px] p-10 relative overflow-hidden h-[400px] flex flex-col justify-center items-center">
            {/* HUD Scanning Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />
            
            {/* Animated Neural Core */}
            <div className="relative">
              <motion.div 
                animate={{ 
                  scale: syncStatus === 'syncing' ? [1, 1.2, 1] : [1, 1.05, 1],
                  rotate: 360,
                  opacity: syncStatus === 'syncing' ? [0.5, 1, 0.5] : 0.8
                }}
                transition={{ duration: syncStatus === 'syncing' ? 2 : 10, repeat: Infinity, ease: "linear" }}
                className="size-48 md:size-64 rounded-full border border-[#fabf37]/20 flex items-center justify-center relative"
              >
                <div className="absolute inset-0 bg-[#fabf37]/5 blur-[60px] rounded-full" />
                <Sparkles className="size-20 text-[#fabf37]" />
              </motion.div>
              
              {/* Spinning Rings */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-20px] border-t-2 border-dashed border-[#fabf37]/10 rounded-full" 
              />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-40px] border-l-2 border-dotted border-white/5 rounded-full" 
              />
            </div>

            <div className="mt-12 text-center relative z-10">
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className="text-[10px] font-black text-[#fabf37] uppercase tracking-[0.4em]">Engine Status:</span>
                <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${syncStatus === 'syncing' ? 'text-emerald-500 animate-pulse' : 'text-zinc-500'}`}>
                  {syncStatus === 'syncing' ? 'Active Processing' : 'Standby / Optimal'}
                </span>
              </div>
              <h4 className="text-4xl md:text-5xl font-black text-white tabular-nums tracking-tighter">
                {progress}%
              </h4>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="size-10 rounded-xl bg-[#fabf37]/10 text-[#fabf37] flex items-center justify-center">
                  <Activity className="size-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Neural Connections</p>
                  <p className="text-lg font-black text-white uppercase tabular-nums">{neuralLinks.toLocaleString()}</p>
                </div>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: `${(neuralLinks / 20000) * 100}%` }}
                  className="h-full bg-[#fabf37] shadow-[0_0_10px_rgba(250,191,55,0.5)]" 
                />
              </div>
            </div>
            <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="size-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <Globe className="size-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Global Latency</p>
                  <p className="text-lg font-black text-white uppercase tabular-nums">14ms</p>
                </div>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "100%" }}
                  animate={{ width: "14%" }}
                  className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black border border-white/5 rounded-[48px] p-8 space-y-8">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">Sync Topology</h3>
          
          <div className="space-y-6">
            {[
              { name: "Node: Dhaka (Primary)", status: "connected", load: "24%" },
              { name: "Node: Istanbul (Edge)", status: "connected", load: "12%" },
              { name: "Node: Dubai (Relay)", status: "standby", load: "0%" },
              { name: "Node: London (Gateway)", status: "connected", load: "45%" },
              { name: "ERP Interface (Radix)", status: "connected", load: "88%" },
            ].map((node, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className={`size-2 rounded-full ${node.status === 'connected' ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-700'}`} />
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest group-hover:text-white transition-colors">{node.name}</span>
                </div>
                <span className="text-[9px] font-black text-zinc-600 tabular-nums">{node.load}</span>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/5">
            <div className="p-6 bg-zinc-900/30 rounded-3xl border border-white/[0.02] flex items-center gap-4">
              <ShieldCheck className="size-6 text-emerald-500" />
              <div>
                <p className="text-[9px] font-black text-white uppercase">Neural Encryption Active</p>
                <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mt-1">AES-4096 Multi-Layered</p>
              </div>
            </div>
          </div>

          <button className="w-full py-4 bg-white/5 text-zinc-400 hover:text-white border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all">
            Export Neural Logs
          </button>
        </div>
      </div>
    </ViewContainer>
  );
}
