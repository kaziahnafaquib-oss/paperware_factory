import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, Cpu, Database, Activity, 
  RefreshCw, ShieldCheck, Zap, ArrowUpRight
} from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  source: string;
  message: string;
  status: 'info' | 'success' | 'warning' | 'error';
}

export function ERPSyncTerminal() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [metrics, setMetrics] = useState({
    throughput: 1240,
    latency: 12,
    syncRate: 99.9,
    activeLines: 24
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sources = ["LINE_01", "LINE_04", "QC_SCAN_3", "LOGISTICS_HUB", "INVENTORY_SYNC"];
    const messages = [
      "Substrate feed alignment optimized.",
      "QC scan complete: 0.001mm tolerance verified.",
      "Shipment #PW-902 dispatched to Port of Chittagong.",
      "FSC fiber trace confirmed for batch #A98.",
      "Energy grid balancing active: Solar 84%.",
      "Neural inventory sync initiated.",
      "Predictive maintenance alert: Line 12 roller check.",
      "Dynamic pricing updated for region EU-West."
    ];

    const addLog = () => {
      const newLog: LogEntry = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        source: sources[Math.floor(Math.random() * sources.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        status: Math.random() > 0.1 ? (Math.random() > 0.8 ? 'success' : 'info') : 'warning'
      };
      setLogs(prev => [...prev.slice(-15), newLog]);
    };

    const interval = setInterval(addLog, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        throughput: prev.throughput + Math.floor(Math.random() * 10 - 5),
        latency: Math.max(8, Math.min(25, prev.latency + Math.floor(Math.random() * 4 - 2))),
        syncRate: 99.8 + Math.random() * 0.2,
        activeLines: 24
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full bg-black/95 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl font-mono">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-zinc-900/50">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="size-2 rounded-full bg-red-500/50" />
            <div className="size-2 rounded-full bg-amber-500/50" />
            <div className="size-2 rounded-full bg-emerald-500/50" />
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Terminal className="size-3 text-[#fabf37]" />
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Paperware OS v4.0 - ERP Sync Terminal</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-bold text-emerald-500 uppercase">Live Pipeline</span>
          </div>
          <RefreshCw className="size-3 text-white/20 animate-spin-slow" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 divide-x divide-white/5">
        {/* Left: Live Metrics Dashboard */}
        <div className="p-6 space-y-6 bg-zinc-950/30">
          <div className="space-y-4">
            <h4 className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Operational Metrics</h4>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-white/40">
                  <Activity className="size-3" />
                  <span className="text-[8px] font-bold uppercase">Throughput</span>
                </div>
                <div className="text-xl font-bold text-white">{metrics.throughput}<span className="text-[10px] text-white/30 ml-1">U/min</span></div>
              </div>
              
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-white/40">
                  <Zap className="size-3" />
                  <span className="text-[8px] font-bold uppercase">Latency</span>
                </div>
                <div className="text-xl font-bold text-white">{metrics.latency}<span className="text-[10px] text-white/30 ml-1">ms</span></div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#fabf37]/5 border border-[#fabf37]/10 space-y-3">
              <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-[#fabf37]">
                <span>Sync Consistency</span>
                <span>{metrics.syncRate.toFixed(2)}%</span>
              </div>
              <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${metrics.syncRate}%` }}
                  className="h-full bg-[#fabf37]" 
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/5">
            <h4 className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Hardware Nodes</h4>
            <div className="space-y-2">
              {[
                { name: "Core Processor", status: "Nominal", icon: <Cpu className="size-3" /> },
                { name: "Database Cluster", status: "Optimal", icon: <Database className="size-3" /> },
                { name: "Security Ledger", status: "Verified", icon: <ShieldCheck className="size-3" /> }
              ].map((node, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 text-[9px]">
                  <div className="flex items-center gap-3 text-white/60">
                    {node.icon}
                    <span className="font-bold uppercase tracking-wider">{node.name}</span>
                  </div>
                  <span className="text-emerald-500 font-black uppercase">{node.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center & Right: Main Console Logs */}
        <div className="lg:col-span-2 p-0 flex flex-col h-[400px]">
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-2 scrollbar-thin scrollbar-thumb-white/10 relative"
          >
            <AnimatePresence initial={false}>
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-3 text-[10px] py-0.5 group"
                >
                  <span className="text-white/20 shrink-0">[{log.timestamp}]</span>
                  <span className={`px-1.5 rounded bg-white/5 font-bold shrink-0 ${
                    log.status === 'warning' ? 'text-amber-500' : 'text-[#fabf37]'
                  }`}>{log.source}</span>
                  <span className={`flex-1 ${
                    log.status === 'warning' ? 'text-amber-400/80' : 'text-zinc-400'
                  }`}>
                    {log.message}
                  </span>
                  <ArrowUpRight className="size-3 text-white/0 group-hover:text-white/20 transition-colors" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Console Input Simulation */}
          <div className="px-6 py-4 bg-zinc-900/50 border-t border-white/5 flex items-center gap-3">
            <span className="text-[#fabf37] text-[10px] font-black">root@paperware:~$</span>
            <div className="flex-1 h-4 relative">
              <motion.div 
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="absolute left-0 top-0 w-2 h-4 bg-[#fabf37]/50"
              />
              <span className="text-zinc-500 text-[10px] ml-3 italic">Awaiting neural command...</span>
            </div>
            <div className="flex gap-2">
              <span className="px-2 py-0.5 rounded bg-white/5 text-[8px] text-white/40 uppercase font-black">UTF-8</span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-[8px] text-white/40 uppercase font-black">SSL:AES-256</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}