import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Zap, Droplets, Leaf, Recycle, Sparkles, TrendingUp, AlertCircle,
    Package, Boxes, Globe, Search, Ship, Truck, Activity, ChevronRight,
    Rotate3d, Maximize2, MousePointer2, Info, Share2, ArrowRight, Home, MapPin
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { toast } from "sonner";

// Sustainability Widget for Client
export function SustainabilityReport({ t }: { t: any }) {
    const stats = useMemo(() => [
        { label: t('trees_saved') || "Trees Preserved", value: "2,480", icon: Leaf, color: "text-emerald-500", bg: "bg-emerald-50" },
        { label: t('plastic_reduced') || "Plastic Reduced", value: "12,500 kg", icon: Recycle, color: "text-[#fabf37]", bg: "bg-yellow-50" },
        { label: t('energy_saved') || "Carbon Offset", value: "45.2 tCO2e", icon: Zap, color: "text-blue-500", bg: "bg-blue-50" }
    ], [t]);

    return (
        <div className="bg-white rounded-[40px] p-8 md:p-12 border border-black/5 shadow-sm overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
                <div className="lg:w-1/3 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live ESG Impact
                    </div>
                    <h3 className="text-4xl font-black uppercase tracking-tighter leading-none">Your Sustainable <br /> <span className="text-emerald-600">Footprint.</span></h3>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest leading-relaxed">
                        Real-time tracking of your environmental contributions through Paperware packaging solutions.
                    </p>
                    <button className="px-6 py-3 bg-black text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#fabf37] hover:text-black transition-all">
                        Download ESG Report
                    </button>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-[32px] border border-black/5 bg-zinc-50 flex flex-col items-center text-center gap-4 hover:shadow-xl transition-all"
                        >
                            <div className={`size-16 rounded-3xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner`}>
                                <stat.icon className="size-8" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{stat.label}</p>
                                <p className="text-3xl font-black tracking-tighter">{stat.value}</p>
                            </div>
                            <div className="flex items-center gap-1 text-[8px] font-black text-emerald-600 uppercase">
                                <TrendingUp className="size-3" />
                                +12% vs last month
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// AI Inventory Forecasting Widget
export function AIInventoryForecasting({ t }: { t: any }) {
    const alerts = [
        { item: "Kraft Boxes (PW-8821)", current: "5,200", threshold: "10,000", status: "Critical", daysRemaining: 4, color: "text-red-500", bg: "bg-red-50" },
        { item: "Coffee Cups (PW-8815)", current: "15,800", threshold: "20,000", status: "Low Stock", daysRemaining: 12, color: "text-[#fabf37]", bg: "bg-yellow-50" },
        { item: "Salad Bowls (PW-8792)", current: "42,000", threshold: "15,000", status: "Healthy", daysRemaining: 45, color: "text-emerald-500", bg: "bg-emerald-50" }
    ];

    return (
        <div className="bg-zinc-900 rounded-[40px] p-8 md:p-10 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#fabf37]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-10 relative z-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-[#fabf37] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#fabf37]">AI Inventory Pulse</span>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tight">Stock Analysis</h3>
                </div>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-all rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="size-3 text-[#fabf37]" />
                    Smart Reorder All
                </button>
            </div>

            <div className="space-y-4 relative z-10">
                {alerts.map((alert, i) => (
                    <div key={i} className="p-5 bg-white/5 border border-white/5 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/10 transition-all">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className={`size-12 rounded-2xl ${alert.bg} ${alert.color} flex items-center justify-center`}>
                                <Boxes className="size-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm tracking-tight">{alert.item}</h4>
                                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Inventory Level: {alert.current}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                            <div className="text-right">
                                <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Days Remaining</p>
                                <p className={`text-xl font-black ${alert.daysRemaining < 7 ? 'text-red-500' : 'text-white'}`}>{alert.daysRemaining} Days</p>
                            </div>
                            <button
                                onClick={() => toast.success(`Reorder request sent for ${alert.item}`)}
                                className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${alert.status === 'Critical' ? 'bg-[#fabf37] text-black' : 'bg-white/10 text-white hover:bg-white'}`}
                            >
                                {alert.status === 'Critical' ? 'Instant Reorder' : 'Schedule'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Logistics Neural Widget
export function LogisticsNeuralNetwork({ t }: { t: any }) {
    const shipments = [
        { id: "PW-8821", route: "Shanghai → Dhaka", eta: "Nov 05", status: "In Transit", v: "Ever Ace", p: 75 },
        { id: "PW-8815", route: "Shanghai → Chittagong", eta: "Nov 15", status: "Loading", v: "CMA CGM", p: 12 },
        { id: "PW-8798", route: "Dubai → Sylhet", eta: "Oct 30", status: "Customs", v: "Air Cargo", p: 92 }
    ];

    return (
        <div className="bg-white rounded-[40px] p-8 md:p-12 border border-black/5 shadow-sm overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="size-2 rounded-full bg-blue-500 animate-bounce" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Neural Logistics Active</span>
                        </div>
                        <h3 className="text-4xl font-black uppercase tracking-tighter leading-none">Global Network <br /> <span className="text-zinc-400 italic">Command.</span></h3>
                    </div>

                    <div className="space-y-4">
                        {shipments.map((ship, i) => (
                            <div key={i} className="p-6 bg-zinc-50 rounded-3xl border border-black/5 hover:border-blue-200 transition-all group">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="text-[9px] font-black uppercase text-blue-600 tracking-widest mb-1">{ship.id}</p>
                                        <p className="font-black text-sm uppercase tracking-tight">{ship.route}</p>
                                    </div>
                                    <Ship className="size-5 text-zinc-300 group-hover:text-blue-500 transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[8px] font-black uppercase text-zinc-400">
                                        <span>ETA: {ship.eta}</span>
                                        <span>{ship.p}% Complete</span>
                                    </div>
                                    <div className="h-1 bg-zinc-200 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${ship.p}%` }}
                                            className="h-full bg-blue-600"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative bg-zinc-900 rounded-[32px] overflow-hidden group shadow-2xl min-h-[400px]">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #fabf37 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="size-64 border border-[#fabf37]/10 rounded-full animate-ping" />
                        <div className="absolute size-40 border border-[#fabf37]/20 rounded-full animate-pulse" />
                    </div>

                    <div className="absolute top-1/2 left-1/3 size-3 bg-[#fabf37] rounded-full shadow-[0_0_15px_#fabf37] animate-pulse" />
                    <div className="absolute top-1/3 left-2/3 size-3 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6] animate-pulse [animation-delay:0.5s]" />

                    <div className="absolute bottom-8 left-8 right-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-lg bg-[#fabf37] flex items-center justify-center text-black">
                                <Search className="size-4" />
                            </div>
                            <span className="text-[10px] font-black uppercase text-white/50">Tracking Neural Link...</span>
                        </div>
                        <Activity className="size-4 text-[#fabf37] animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Multi-Warehouse Management Widget
export function WarehouseManagement({ t }: { t: any }) {
    const warehouses = [
        { city: "Dhaka Central", stock: "450k units", capacity: "85%", status: "Active" },
        { city: "Chittagong Port", stock: "120k units", capacity: "40%", status: "Active" },
        { city: "Gazipur Industrial", stock: "890k units", capacity: "92%", status: "Full" }
    ];

    return (
        <div className="bg-white rounded-[40px] p-8 md:p-10 border border-black/5 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h3 className="text-xl font-black uppercase tracking-tight">Warehouse Distribution</h3>
                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Inventory spread across regions</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full text-[9px] font-black text-zinc-500 uppercase">
                    <Home className="size-3" />
                    3 Hubs Connected
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {warehouses.map((w, i) => (
                    <div key={i} className="p-6 bg-zinc-50 rounded-[32px] border border-black/5 hover:shadow-lg transition-all">
                        <div className="flex items-center justify-between mb-6">
                            <div className="size-10 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-black">
                                <MapPin className="size-5" />
                            </div>
                            <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase ${w.status === 'Full' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>{w.status}</span>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-black text-sm uppercase tracking-tight">{w.city}</h4>
                                <p className="text-2xl font-black mt-1">{w.stock}</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[8px] font-black uppercase text-zinc-400">
                                    <span>Usage</span>
                                    <span>{w.capacity}</span>
                                </div>
                                <div className="h-1 bg-zinc-200 rounded-full overflow-hidden">
                                    <div className={`h-full ${parseInt(w.capacity) > 90 ? 'bg-red-500' : 'bg-black'}`} style={{ width: w.capacity }} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// 3D Digital Twin Modal / Feature
export function DigitalTwinShowcase({ onClose, t }: { onClose: () => void, t: any }) {
    const [activeView, setActiveView] = useState("exterior");
    const views = [
        { id: "exterior", name: "Exterior Design", img: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=1080" },
        { id: "interior", name: "Internal Coating", img: "https://images.unsplash.com/photo-1517570582775-65c119c2b98d?q=80&w=1080" },
        { id: "base", name: "Base Seal", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1080" }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12"
        >
            <div className="absolute top-12 right-12 flex gap-4">
                <button className="size-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#fabf37] hover:text-black transition-all">
                    <Share2 className="size-5" />
                </button>
                <button onClick={onClose} className="size-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <Maximize2 className="size-5" />
                </button>
            </div>

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 relative group">
                    <div className="absolute -inset-20 bg-[#fabf37]/10 blur-[120px] rounded-full animate-pulse" />
                    <motion.div
                        initial={{ scale: 0.8, rotateY: 30 }}
                        animate={{ scale: 1, rotateY: 0 }}
                        className="relative aspect-square bg-white/5 rounded-[60px] border border-white/10 flex items-center justify-center p-12 md:p-24 cursor-grab active:cursor-grabbing"
                    >
                        <ImageWithFallback
                            src={views.find(v => v.id === activeView)?.img || ""}
                            alt="3D Preview"
                            className="max-h-full max-w-full object-contain drop-shadow-[0_50px_100px_rgba(250,191,55,0.3)]"
                        />
                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 py-2 px-6 bg-white/10 rounded-full backdrop-blur-md border border-white/10">
                            <Rotate3d className="size-4 text-[#fabf37]" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/70">360° Digital Twin Engine</span>
                        </div>
                    </motion.div>
                </div>

                <div className="lg:col-span-5 space-y-12 text-white">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-3 px-3 py-1 bg-white/10 rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-[#fabf37]">
                            <Sparkles className="size-3" />
                            Precision Lab
                        </div>
                        <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                            Volumetric <br /> <span className="text-[#fabf37]">Analysis.</span>
                        </h2>
                        <p className="text-white/40 font-bold text-sm leading-relaxed uppercase tracking-wide italic">
                            Inspect every structural detail of your packaging before mass production starts.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {views.map((v) => (
                            <button
                                key={v.id}
                                onClick={() => setActiveView(v.id)}
                                className={`p-6 rounded-3xl border transition-all text-left space-y-4 ${activeView === v.id ? 'bg-[#fabf37] border-[#fabf37] text-black shadow-[0_0_30px_rgba(250,191,55,0.3)]' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                                    }`}
                            >
                                <Rotate3d className="size-6 opacity-50" />
                                <p className="text-[10px] font-black uppercase tracking-widest">{v.name}</p>
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 pt-6">
                        <button className="flex-1 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#fabf37] transition-all">
                            Approve Design
                        </button>
                        <button className="px-8 py-5 bg-white/10 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-red-500 transition-all">
                            Reject
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
