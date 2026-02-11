
import { useState, useEffect } from "react";
import { ViewContainer } from "../ViewContainer";
import { SimulatedDB, Subscriber } from "../../../../lib/simulated-db";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Mail, Send, Download, Users, CheckCircle, Clock, LayoutTemplate, PieChart, MousePointer, Filter } from "lucide-react";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RePie, Pie, Cell } from "recharts";

export default function NewsletterView() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [campaign, setCampaign] = useState({ subject: "", content: "", template: "Standard" });
    const [isSending, setIsSending] = useState(false);
    const [activeTab, setActiveTab] = useState<'Campaign' | 'Subscribers' | 'Analytics'>('Campaign');
    const [selectedTemplate, setSelectedTemplate] = useState('Promo');

    useEffect(() => {
        loadSubscribers();
        const handleUpdate = () => loadSubscribers();
        window.addEventListener('paperware-newsletter-update', handleUpdate);
        return () => window.removeEventListener('paperware-newsletter-update', handleUpdate);
    }, []);

    const loadSubscribers = () => setSubscribers(SimulatedDB.getSubscribers());

    const activeCount = subscribers.filter(s => s.status === 'Active').length;

    const handleSend = () => {
        if (!campaign.subject) {
            toast.error("Please add a subject line");
            return;
        }

        setIsSending(true);
        setTimeout(() => {
            setIsSending(false);
            setCampaign({ subject: "", content: "", template: "Standard" });
            toast.success("Newsletter Sent Successfully", { description: `Sent to ${activeCount} active subscribers.` });
        }, 2000);
    };

    const handleExport = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Email,Status,Date\n"
            + subscribers.map(e => `${e.email},${e.status},${e.subscribedAt}`).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "paperware_subscribers.csv");
        document.body.appendChild(link);
        link.click();
        toast.success("Subscribers list exported");
    };

    const analyticsData = [
        { name: 'Opened', value: 450, color: '#10b981' },
        { name: 'Clicked', value: 120, color: '#3b82f6' },
        { name: 'Bounced', value: 15, color: '#ef4444' },
        { name: 'Unopened', value: 300, color: '#52525b' },
    ];

    const templates = [
        { id: 'Promo', name: 'Product Promo', icon: <div className="h-20 w-full bg-purple-500/20 border border-purple-500/30 rounded-lg mb-2 relative overflow-hidden"><div className="absolute top-2 left-2 right-2 h-2 bg-purple-500/40 rounded"></div><div className="absolute bottom-2 left-0 right-0 h-8 bg-purple-500/10"></div></div> },
        { id: 'Update', name: 'Weekly Update', icon: <div className="h-20 w-full bg-blue-500/20 border border-blue-500/30 rounded-lg mb-2 relative overflow-hidden"><div className="absolute top-2 left-2 right-2 h-2 bg-blue-500/40 rounded"></div><div className="absolute top-6 left-2 w-1/2 h-2 bg-blue-500/20 rounded"></div></div> },
        { id: 'Alert', name: 'Urgent Alert', icon: <div className="h-20 w-full bg-red-500/20 border border-red-500/30 rounded-lg mb-2 relative overflow-hidden"><div className="absolute inset-0 flex items-center justify-center"><div className="size-8 rounded-full bg-red-500/40"></div></div></div> },
    ];

    return (
        <ViewContainer
            title="Newsletter & Subscribers"
            subtitle="Audience Growth & Campaigns"
            actions={
                <div className="flex gap-2">
                    <div className="flex bg-black/50 p-1 rounded-xl">
                        {['Campaign', 'Subscribers', 'Analytics'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[#fabf37] text-black' : 'text-zinc-500 hover:text-white'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            }
        >
            <AnimatePresence mode="wait">
                {activeTab === 'Campaign' && (
                    <motion.div
                        key="campaign"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-8">
                                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                                    <LayoutTemplate className="size-5 text-[#fabf37]" /> Select Template
                                </h3>
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    {templates.map(t => (
                                        <button
                                            key={t.id}
                                            onClick={() => setSelectedTemplate(t.id)}
                                            className={`p-4 rounded-2xl border transition-all text-left group ${selectedTemplate === t.id ? 'bg-[#fabf37]/10 border-[#fabf37]' : 'bg-black border-white/5 hover:border-white/20'}`}
                                        >
                                            {t.icon}
                                            <p className={`text-[10px] font-black uppercase tracking-widest ${selectedTemplate === t.id ? 'text-[#fabf37]' : 'text-zinc-500 group-hover:text-white'}`}>{t.name}</p>
                                        </button>
                                    ))}
                                </div>

                                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                                    <Send className="size-5 text-[#fabf37]" /> Create Content
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Subject Line</label>
                                        <input
                                            type="text"
                                            value={campaign.subject}
                                            onChange={(e) => setCampaign({ ...campaign, subject: e.target.value })}
                                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37]"
                                            placeholder="Example: February Product Drop is Here!"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Content (HTML Preview)</label>
                                        <div className="w-full h-48 bg-black border border-white/10 rounded-xl p-4 text-zinc-400 font-mono text-xs overflow-y-auto">
                                            <span className="text-purple-400">&lt;div</span> <span className="text-blue-400">class</span>=<span className="text-green-400">"email-container"</span><span className="text-purple-400">&gt;</span><br />
                                            &nbsp;&nbsp;<span className="text-purple-400">&lt;h1&gt;</span>{campaign.subject || "Header"}<span className="text-purple-400">&lt;/h1&gt;</span><br />
                                            &nbsp;&nbsp;<span className="text-purple-400">&lt;p&gt;</span>Draft your email content here. The selected template <b>{selectedTemplate}</b> will apply standard styling.<span className="text-purple-400">&lt;/p&gt;</span><br />
                                            &nbsp;&nbsp;<span className="text-zinc-600">&lt;!-- Dynamic content blocks inserted here --&gt;</span><br />
                                            <span className="text-purple-400">&lt;/div&gt;</span>
                                        </div>
                                    </div>
                                    <button
                                        disabled={isSending}
                                        onClick={handleSend}
                                        className={`w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${isSending ? 'bg-zinc-800 text-zinc-500' : 'bg-[#fabf37] text-black hover:scale-[1.02] shadow-lg'}`}
                                    >
                                        {isSending ? (
                                            <>Processing Broadcast...</>
                                        ) : (
                                            <><Send className="size-4" /> Schedule Campaign</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-black/50 border border-white/5 rounded-[32px] p-6">
                                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4">Target Audience</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-xl border border-white/5">
                                        <span className="text-xs text-zinc-400">All Subscribers</span>
                                        <span className="text-xs font-bold text-white">{activeCount}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-xl border border-white/5 opacity-50">
                                        <span className="text-xs text-zinc-400">VIP Clients (Order {'>'} 5)</span>
                                        <span className="text-xs font-bold text-white">12</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-xl border border-white/5 opacity-50">
                                        <span className="text-xs text-zinc-400">New (Last 30 Days)</span>
                                        <span className="text-xs font-bold text-white">4</span>
                                    </div>
                                </div>
                                <p className="text-[10px] text-zinc-500 mt-4 italic text-center">Segmentation features coming in v3.0</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'Subscribers' && (
                    <motion.div
                        key="subscribers"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                                    <Users className="size-5 text-[#fabf37]" /> Full Subscriber List
                                </h3>
                                <button
                                    onClick={handleExport}
                                    className="px-4 py-2 bg-white/5 text-white rounded-lg text-[9px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
                                >
                                    <Download className="size-3" /> Export CSV
                                </button>
                            </div>

                            <div className="overflow-hidden bg-black rounded-2xl border border-white/5">
                                <table className="w-full">
                                    <thead className="bg-zinc-900">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-[9px] font-black text-zinc-500 uppercase tracking-widest">Email</th>
                                            <th className="px-6 py-4 text-left text-[9px] font-black text-zinc-500 uppercase tracking-widest">Status</th>
                                            <th className="px-6 py-4 text-left text-[9px] font-black text-zinc-500 uppercase tracking-widest">Date Joined</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {subscribers.map((sub) => (
                                            <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4 text-sm font-medium text-white">{sub.email}</td>
                                                <td className="px-6 py-4">
                                                    {sub.status === 'Active' ? (
                                                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">Active</span>
                                                    ) : (
                                                        <span className="px-2 py-1 bg-red-500/10 text-red-500 rounded text-[9px] font-black uppercase tracking-widest border border-red-500/20">Unsubscribed</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-xs text-zinc-400 font-mono">{sub.subscribedAt}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'Analytics' && (
                    <motion.div
                        key="analytics"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                    >
                        <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-8">
                            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                                <PieChart className="size-5 text-[#fabf37]" /> Last Campaign Performance
                            </h3>
                            <div className="h-64 relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RePie width={400} height={400}>
                                        <Pie
                                            data={analyticsData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {analyticsData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                    </RePie>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="text-center">
                                        <p className="text-3xl font-black text-white">585</p>
                                        <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Total Sent</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center gap-6 mt-6">
                                {analyticsData.map((d) => (
                                    <div key={d.name} className="flex items-center gap-2">
                                        <div className="size-2 rounded-full" style={{ backgroundColor: d.color }}></div>
                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{d.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-8">
                            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                                <MousePointer className="size-5 text-blue-500" /> Click Map (Top Links)
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { link: "Shop All Products", clicks: 85, percent: 70 },
                                    { link: "Read Blog Post", clicks: 25, percent: 20 },
                                    { link: "Contact Support", clicks: 10, percent: 8 }
                                ].map((link, i) => (
                                    <div key={i} className="bg-black/40 rounded-xl p-4 border border-white/5">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-xs font-bold text-white">{link.link}</span>
                                            <span className="text-xs font-bold text-[#fabf37]">{link.clicks} clicks</span>
                                        </div>
                                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${link.percent}%` }}
                                                transition={{ duration: 1, delay: 0.2 }}
                                                className="h-full bg-blue-500 rounded-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </ViewContainer>
    );
}
