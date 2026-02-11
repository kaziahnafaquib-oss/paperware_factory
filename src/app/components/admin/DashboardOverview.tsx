import React from "react";
import {
    Users,
    Sparkles,
    Globe,
    Settings,
    Activity
} from "lucide-react";
import {
    BarChart,
    Bar,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";
import { StatsCard } from "./stats-card";
import { data, inventoryData, rfqs } from "../../lib/admin-data";

export function DashboardOverview({ t }: { t: any }) {
    return (
        <div className="space-y-6 md:space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatsCard label="Active Sessions" value="2,842" change="+12.5%" isPositive={true} icon={<Users className="size-6" />} />
                <StatsCard label="Lead Conversions" value="14.2%" change="+3.2%" isPositive={true} icon={<Sparkles className="size-6" />} />
                <StatsCard label="Website Uptime" value="99.99%" change="0.0%" isPositive={true} icon={<Globe className="size-6" />} />
                <StatsCard label="CMS Updates" value="128" change="+0.4%" isPositive={true} icon={<Settings className="size-6" />} />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-10">
                {/* Traffic Chart */}
                <div className="xl:col-span-2 bg-black border border-white/5 rounded-[32px] md:rounded-[48px] p-6 md:p-10 overflow-hidden">
                    <div className="flex items-center justify-between mb-8 md:mb-10">
                        <div>
                            <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight">Traffic Analytics</h3>
                            <p className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest">Global Reach vs User Conversion</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded-full border border-white/5">
                                <div className="size-2 rounded-full bg-[#fabf37]" />
                                <span className="text-[9px] font-bold text-zinc-400">Revenue</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded-full border border-white/5">
                                <div className="size-2 rounded-full bg-purple-500" />
                                <span className="text-[9px] font-bold text-zinc-400">Visitors</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-[300px] md:h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#fabf37" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#fabf37" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                <XAxis dataKey="name" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#000", border: "1px solid #27272a", borderRadius: "12px" }}
                                    itemStyle={{ color: "#fff", fontSize: "10px", fontWeight: "900", textTransform: "uppercase" }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#fabf37" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                                <Area type="monotone" dataKey="visitors" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorVis)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Inventory Health */}
                <div className="bg-black border border-white/5 rounded-[32px] md:rounded-[48px] p-6 md:p-10 flex flex-col">
                    <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight mb-2">Inventory Health</h3>
                    <p className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest mb-8">Stock Level Monitoring</p>

                    <div className="h-[250px] w-full mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={inventoryData} layout="vertical" barSize={20}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#333" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#71717a', fontSize: 9, fontWeight: 700 }} axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }} />
                                <Bar dataKey="stock" radius={[0, 4, 4, 0]}>
                                    {inventoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-auto space-y-4">
                        <h4 className="text-xs font-black text-white uppercase tracking-wider">Critical Alerts</h4>
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                            <div className="p-2 bg-red-500/20 rounded-lg">
                                <Activity className="size-4 text-red-500 animate-pulse" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-red-400 uppercase tracking-wide">Low Stock Warning</p>
                                <p className="text-[10px] text-zinc-400 mt-1">Coffee Sleeves are below 20% threshold. Reorder recommended immediately.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent RFQs */}
            <div className="bg-black border border-white/5 rounded-[32px] md:rounded-[48px] p-6 md:p-10">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight">{t('incoming_rfqs')}</h3>
                    <button className="text-[10px] font-black uppercase text-[#fabf37] hover:underline">View All Requests</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {rfqs.map((rfq) => (
                        <div key={rfq.id} className="p-6 bg-zinc-900/50 border border-white/5 rounded-3xl group hover:border-[#fabf37]/30 transition-all cursor-pointer hover:bg-zinc-900">
                            <div className="flex justify-between items-start mb-4">
                                <div className="px-2 py-1 bg-[#fabf37]/10 text-[#fabf37] text-[9px] font-black rounded uppercase">{rfq.status}</div>
                                <span className="text-[10px] text-zinc-500 font-mono">{rfq.time}</span>
                            </div>
                            <p className="text-[10px] font-black text-zinc-400 uppercase mb-1">{rfq.id}</p>
                            <h4 className="text-sm font-black text-white uppercase mb-2 line-clamp-1">{rfq.client}</h4>
                            <p className="text-[11px] font-bold text-zinc-500">{rfq.product}</p>
                            <p className="text-[11px] font-bold text-zinc-300">{rfq.quantity}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
