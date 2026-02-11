import { useEffect, useState } from 'react';
import { RefreshCw, Globe, CircleCheck, Box, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ViewContainer } from "../ViewContainer";

export default function HostingView() {
  const [stats, setStats] = useState({
    cpu: 24,
    ram: 38,
    uptime: 99.99
  });

  const [deploys, setDeploys] = useState([
    { version: "v2.5.1", date: "2023-12-22", user: "JS Admin", status: "Success" },
    { version: "v2.5.0", date: "2023-12-20", user: "JS Admin", status: "Success" },
    { version: "v2.4.9", date: "2023-12-18", user: "Auto-Deploy", status: "Success" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        cpu: Math.min(100, Math.max(10, prev.cpu + (Math.random() * 4 - 2))),
        ram: Math.min(100, Math.max(10, prev.ram + (Math.random() * 2 - 1))),
        uptime: 99.99
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleDeploy = () => {
    toast.promise(new Promise(res => setTimeout(res, 2000)), {
      loading: 'Initiating Production Deployment...',
      success: () => {
        const newDeploy = {
          version: `v2.5.${deploys.length + 1}`,
          date: new Date().toISOString().split('T')[0],
          user: "JS Admin",
          status: "Success"
        };
        setDeploys(prev => [newDeploy, ...prev]);
        return 'Deployment Successful';
      },
      error: 'Deployment Failed'
    });
  };

  return (
    <ViewContainer 
      title="Hostinger Panel" 
      subtitle="Infrastructure & Domain Management" 
      actions={
        <div className="flex gap-4">
           <button 
            onClick={handleDeploy}
            className="bg-white/5 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10 flex items-center gap-2 hover:bg-white/10"
          >
            <RefreshCw className="size-4" /> Trigger Deploy
          </button>
          <button 
            onClick={() => window.open('https://hpanel.hostinger.com', '_blank')}
            className="bg-[#fabf37] text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
          >
            <Globe className="size-4" /> Open hPanel
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900/50 p-8 rounded-[32px] border border-white/5">
          <div className="flex items-center gap-4 mb-6">
            <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <CircleCheck className="size-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Server Status</p>
              <p className="text-lg font-black text-white uppercase">Operational</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <span>Uptime</span>
              <span className="text-white">{stats.uptime}%</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: `${stats.uptime}%` }}
                className="h-full bg-emerald-500" 
              />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 p-8 rounded-[32px] border border-white/5">
          <div className="flex items-center gap-4 mb-6">
            <div className="size-10 rounded-xl bg-[#fabf37]/10 text-[#fabf37] flex items-center justify-center">
              <Box className="size-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">CPU Usage</p>
              <p className="text-lg font-black text-white uppercase">{stats.cpu.toFixed(1)}%</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <span>System Load</span>
              <span className="text-white">Active</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: `${stats.cpu}%` }}
                className={`h-full transition-colors ${stats.cpu > 80 ? 'bg-red-500' : 'bg-[#fabf37]'}`} 
              />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 p-8 rounded-[32px] border border-white/5">
          <div className="flex items-center gap-4 mb-6">
            <div className="size-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">SSL Certificate</p>
              <p className="text-lg font-black text-white uppercase">Active</p>
            </div>
          </div>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-2">Auto-renews in 42 days</p>
          <div className="mt-4 flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-emerald-500" />
            <span className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.2em]">Secure Connection</span>
          </div>
        </div>
      </div>

      <div className="bg-black border border-white/5 rounded-[40px] p-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">Deployment History</h3>
          <button 
            onClick={() => setDeploys(prev => prev.slice(0, 3))}
            className="text-[9px] font-black text-zinc-600 uppercase tracking-widest hover:text-white"
          >
            Refresh Logs
          </button>
        </div>
        <div className="space-y-6">
          <AnimatePresence initial={false}>
            {deploys.map((deploy, i) => (
              <motion.div 
                key={deploy.version}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between py-4 border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-500">
                    <RefreshCw className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-white uppercase">{deploy.version}</p>
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{deploy.date} • {deploy.user}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-widest">
                  {deploy.status}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ViewContainer>
  );
}
