
import { useState, useEffect } from 'react';
import { Zap, Globe, Image as ImageIcon, CheckCircle, TrendingUp, RefreshCw, Server, Cpu, Activity, AlertOctagon, AlertTriangle, Terminal, Pointer, MousePointerClick, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewContainer } from "../ViewContainer";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from "recharts";
import { toast } from "sonner";

interface PageMetrics {
    page: string;
    loadTime: number;
    lighthouse: number;
    imageSize: number;
    brokenLinks: number;
    status: 'fast' | 'average' | 'slow';
}

interface ResourceData {
    time: string;
    cpu: number;
    memory: number;
}

interface ErrorLog {
    id: string;
    time: string;
    message: string;
    type: 'error' | 'warning' | 'info';
    count: number;
}

interface RUMMetric {
    name: string;
    value: string;
    score: 'good' | 'needs-improvement' | 'poor';
    desc: string;
}

export default function PerformanceMonitorView() {
    const [pages, setPages] = useState<PageMetrics[]>([
        { page: "Home", loadTime: 1.8, lighthouse: 94, imageSize: 2.4, brokenLinks: 0, status: "fast" },
        { page: "Products", loadTime: 2.3, lighthouse: 87, imageSize: 4.1, brokenLinks: 2, status: "average" },
        { page: "About", loadTime: 1.5, lighthouse: 96, imageSize: 1.2, brokenLinks: 0, status: "fast" },
        { page: "Contact", loadTime: 1.2, lighthouse: 98, imageSize: 0.8, brokenLinks: 0, status: "fast" },
        { page: "Gallery", loadTime: 3.8, lighthouse: 72, imageSize: 8.5, brokenLinks: 1, status: "slow" },
    ]);

    const [resources, setResources] = useState<ResourceData[]>([]);
    const [isStressTesting, setIsStressTesting] = useState(false);

    // New States
    const [errors, setErrors] = useState<ErrorLog[]>([]);
    const [rumMetrics, setRumMetrics] = useState<RUMMetric[]>([
        { name: 'LCP', value: '1.2s', score: 'good', desc: 'Largest Contentful Paint' },
        { name: 'FID', value: '42ms', score: 'good', desc: 'First Input Delay' },
        { name: 'CLS', value: '0.05', score: 'good', desc: 'Cumulative Layout Shift' },
    ]);

    // Initialize/Update Resource Data
    useEffect(() => {
        const initialData = Array.from({ length: 20 }, (_, i) => ({
            time: `${10 + i}:00`,
            cpu: 20 + Math.random() * 10,
            memory: 30 + Math.random() * 10
        }));
        setResources(initialData);

        const initialErrors: ErrorLog[] = [
            { id: '1', time: '10:45:22', message: 'Connection timeout: redis-cache-01', type: 'warning', count: 12 },
            { id: '2', time: '10:42:10', message: '404 GET /api/v1/unknown-endpoint', type: 'info', count: 5 },
            { id: '3', time: '10:30:15', message: '500 Internal Server Error (Payment Gateway)', type: 'error', count: 2 },
        ];
        setErrors(initialErrors);

        const interval = setInterval(() => {
            setResources(prev => {
                const newTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
                const baseCpu = isStressTesting ? 85 : 25;
                const baseMem = isStressTesting ? 75 : 35;

                const newPoint = {
                    time: newTime,
                    cpu: Math.min(100, Math.max(0, baseCpu + (Math.random() * 20 - 10))),
                    memory: Math.min(100, Math.max(0, baseMem + (Math.random() * 15 - 7.5)))
                };
                return [...prev.slice(1), newPoint];
            });

            // Randomly add errors if stress testing
            if (isStressTesting && Math.random() > 0.7) {
                const newError: ErrorLog = {
                    id: Date.now().toString(),
                    time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    message: Math.random() > 0.5 ? 'High CPU Usage Warning' : 'Database Connection Latency High',
                    type: Math.random() > 0.5 ? 'warning' : 'error',
                    count: 1
                };
                setErrors(prev => [newError, ...prev].slice(0, 10));
            }

            // Update RUM metrics
            if (Math.random() > 0.5) {
                setRumMetrics(prev => prev.map(m => {
                    if (isStressTesting) {
                        return {
                            ...m,
                            value: m.name === 'LCP' ? (1.2 + Math.random()).toFixed(1) + 's'
                                : m.name === 'FID' ? (40 + Math.random() * 100).toFixed(0) + 'ms'
                                    : (0.05 + Math.random() * 0.2).toFixed(2),
                            score: 'needs-improvement'
                        };
                    }
                    return m; // Keep stable if not stress testing for cleaner demo
                }));
            }

        }, 1000);

        return () => clearInterval(interval);
    }, [isStressTesting]);

    const runAudit = () => {
        toast.loading("Running Deep Performance Audit...");
        setTimeout(() => {
            toast.dismiss();
            toast.success("Audit Complete", {
                description: "Critical CSS path optimized. Time to Interactive improved by 0.4s."
            });
        }, 2500);
    };

    const toggleStressTest = () => {
        if (!isStressTesting) {
            toast.warning("Stress Test Initiated", { description: "Simulating 10,000 concurrent users..." });
        } else {
            toast.success("Stress Test Stopped", { description: "System returning to normal load." });
            // Reset RUM metrics
            setRumMetrics([
                { name: 'LCP', value: '1.2s', score: 'good', desc: 'Largest Contentful Paint' },
                { name: 'FID', value: '42ms', score: 'good', desc: 'First Input Delay' },
                { name: 'CLS', value: '0.05', score: 'good', desc: 'Cumulative Layout Shift' },
            ]);
        }
        setIsStressTesting(!isStressTesting);
    };

    const optimizeImages = () => {
        toast.success("Image Optimization Started", {
            description: "Compressing 24 images in background..."
        });
    };

    const getStatusColor = (status: string) => {
        const colors = {
            'fast': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
            'average': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
            'slow': 'bg-red-500/10 text-red-500 border-red-500/20'
        };
        return colors[status as keyof typeof colors];
    };

    const getLighthouseColor = (score: number) => {
        if (score >= 90) return "text-emerald-500";
        if (score >= 70) return "text-yellow-500";
        return "text-red-500";
    };

    return (
        <ViewContainer
            title="Performance Monitor"
            subtitle="Real-time Server Health & regional Latency"
            actions={
                <div className="flex gap-3">
                    <button
                        onClick={toggleStressTest}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-2 ${isStressTesting ? 'bg-red-500 text-white border-red-600 animate-pulse' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
                    >
                        {isStressTesting ? <AlertOctagon className="size-4" /> : <Activity className="size-4" />}
                        {isStressTesting ? 'Stop Stress Test' : 'Simulate Load'}
                    </button>
                    <button
                        onClick={optimizeImages}
                        className="px-6 py-3 bg-white/5 text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                        <ImageIcon className="size-4" /> Optimize Assets
                    </button>
                    <button
                        onClick={runAudit}
                        className="px-6 py-3 bg-[#fabf37] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2"
                    >
                        <RefreshCw className="size-4" /> Run Deep Audit
                    </button>
                </div>
            }
        >
            <div className="space-y-8">
                {/* Real-time Resources Chart & RUM */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-black border border-white/5 rounded-[32px] p-8 relative overflow-hidden">
                            {isStressTesting && <div className="absolute top-0 left-0 right-0 h-1 bg-red-500 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.5)]" />}
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                                    <Server className={`size-5 ${isStressTesting ? 'text-red-500' : 'text-[#fabf37]'}`} />
                                    Server Resource Usage
                                </h3>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="size-2 rounded-full bg-blue-500" />
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase">CPU</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="size-2 rounded-full bg-purple-500" />
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase">Memory</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={resources}>
                                        <defs>
                                            <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                        <XAxis dataKey="time" stroke="#52525b" style={{ fontSize: '9px', fontWeight: 'bold' }} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#52525b" style={{ fontSize: '9px', fontWeight: 'bold' }} tickLine={false} axisLine={false} domain={[0, 100]} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                            itemStyle={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}
                                        />
                                        <Area type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorCpu)" animationDuration={500} isAnimationActive={false} />
                                        <Area type="monotone" dataKey="memory" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorMem)" animationDuration={500} isAnimationActive={false} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Core Web Vitals RUM */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {rumMetrics.map((m, i) => (
                                <div key={i} className="bg-zinc-900/50 border border-white/5 rounded-[28px] p-6 hover:border-[#fabf37]/20 transition-all">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 rounded-xl border ${m.score === 'good' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                                                : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'}`}>
                                            {m.name === 'LCP' ? <LayoutDashboard className="size-5" /> : m.name === 'FID' ? <MousePointerClick className="size-5" /> : <RefreshCw className="size-5" />}
                                        </div>
                                        <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest ${m.score === 'good' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-yellow-500/10 text-yellow-500'
                                            }`}>{m.score.replace('-', ' ')}</span>
                                    </div>
                                    <h4 className="text-3xl font-black text-white mb-1">{m.value}</h4>
                                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{m.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-8">
                        {/* Live Error Stream */}
                        <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-6 h-[400px] flex flex-col">
                            <h4 className="text-sm font-black text-white uppercase mb-4 flex items-center gap-2 sticky top-0 bg-transparent z-10">
                                <Terminal className="size-4 text-red-500" /> Live Error Stream
                            </h4>
                            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
                                <AnimatePresence initial={false}>
                                    {errors.map((err) => (
                                        <motion.div
                                            key={err.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className={`p-4 rounded-xl border ${err.type === 'error' ? 'bg-red-500/5 border-red-500/10' :
                                                    err.type === 'warning' ? 'bg-yellow-500/5 border-yellow-500/10' :
                                                        'bg-blue-500/5 border-blue-500/10'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <span className={`text-[9px] font-bold uppercase tracking-widest ${err.type === 'error' ? 'text-red-500' :
                                                        err.type === 'warning' ? 'text-yellow-500' :
                                                            'text-blue-500'
                                                    }`}>{err.type}</span>
                                                <span className="text-[9px] font-mono text-zinc-500">{err.time}</span>
                                            </div>
                                            <p className="text-[10px] font-medium text-white/80 leading-snug">{err.message}</p>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {errors.length === 0 && (
                                    <div className="text-center py-10 text-zinc-600">
                                        <CheckCircle className="size-8 mx-auto mb-2 opacity-20" />
                                        <p className="text-[10px] uppercase font-black tracking-widest">System Operational</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-6">
                            <h4 className="text-sm font-black text-white uppercase mb-4 flex items-center gap-2">
                                <Globe className="size-4 text-emerald-500" /> Regional Latency
                            </h4>
                            <div className="space-y-3">
                                {[
                                    { region: 'US East (N. Virginia)', ms: 24, status: 'good' },
                                    { region: 'EU West (London)', ms: 85, status: 'good' },
                                    { region: 'Asia Pacific (Singapore)', ms: 142, status: 'fair' },
                                    { region: 'South America (São Paulo)', ms: 180, status: 'fair' }
                                ].map((r, i) => (
                                    <div key={i} className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{r.region}</span>
                                        <div className="flex items-center gap-2">
                                            <div className={`size-1.5 rounded-full ${r.status === 'good' ? 'bg-emerald-500' : 'bg-yellow-500'}`} />
                                            <span className="text-xs font-mono text-white">{r.ms}ms</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page Metrics */}
                <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                        <Zap className="size-5 text-[#fabf37]" /> Page Load Benchmarks
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {pages.map((page) => (
                            <motion.div
                                key={page.page}
                                whileHover={{ scale: 1.01 }}
                                className="bg-zinc-900/50 border border-white/5 rounded-[24px] p-6 hover:border-[#fabf37]/20 transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h4 className="text-sm font-black text-white uppercase mb-1">{page.page}</h4>
                                        <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border ${getStatusColor(page.status)}`}>
                                            {page.status}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-white">{page.loadTime}s</p>
                                        <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">Load Time</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center p-3 bg-black rounded-xl border border-white/5">
                                        <p className={`text-xl font-black ${getLighthouseColor(page.lighthouse)}`}>{page.lighthouse}</p>
                                        <p className="text-[8px] text-zinc-600 uppercase tracking-widest mt-1">Lighthouse</p>
                                    </div>
                                    <div className="text-center p-3 bg-black rounded-xl border border-white/5">
                                        <p className="text-xl font-black text-blue-500">{page.imageSize}MB</p>
                                        <p className="text-[8px] text-zinc-600 uppercase tracking-widest mt-1">Images</p>
                                    </div>
                                    <div className="text-center p-3 bg-black rounded-xl border border-white/5">
                                        <p className={`text-xl font-black ${page.brokenLinks > 0 ? 'text-red-500' : 'text-emerald-500'}`}>{page.brokenLinks}</p>
                                        <p className="text-[8px] text-zinc-600 uppercase tracking-widest mt-1">Broken</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </ViewContainer>
    );
}
