
import { useState, useEffect } from "react";
import { ViewContainer } from "../ViewContainer";
import { SimulatedDB, Announcement } from "../../../../lib/simulated-db";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Megaphone, Info, AlertTriangle, Calendar, X, AlertCircle, Layout, ArrowUp, Monitor, MessageSquare, Check, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function AnnouncementManagerView() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newAnnouncement, setNewAnnouncement] = useState<Partial<Announcement>>({
        type: 'Info',
        status: 'Active',
        priority: 'Medium',
        displayStyle: 'Top Bar'
    });
    const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Scheduled'>('All');

    useEffect(() => {
        loadAnnouncements();
        const handleUpdate = () => loadAnnouncements();
        window.addEventListener('paperware-announcement-update', handleUpdate);
        return () => window.removeEventListener('paperware-announcement-update', handleUpdate);
    }, []);

    const loadAnnouncements = () => {
        setAnnouncements(SimulatedDB.getAnnouncements());
    };

    const handleSave = () => {
        if (!newAnnouncement.title || !newAnnouncement.message || !newAnnouncement.startDate || !newAnnouncement.endDate) {
            toast.error("Please fill all required fields");
            return;
        }

        const annToSave: Announcement = {
            id: newAnnouncement.id || Date.now().toString(),
            title: newAnnouncement.title,
            message: newAnnouncement.message,
            type: newAnnouncement.type || 'Info',
            status: newAnnouncement.status || 'Active',
            startDate: newAnnouncement.startDate,
            endDate: newAnnouncement.endDate,
            displayStyle: newAnnouncement.displayStyle || 'Top Bar',
            priority: newAnnouncement.priority || 'Medium',
        };

        SimulatedDB.saveAnnouncement(annToSave);
        setIsCreating(false);
        setNewAnnouncement({ type: 'Info', status: 'Active', priority: 'Medium', displayStyle: 'Top Bar' });
        toast.success(newAnnouncement.id ? "Announcement Updated" : "Announcement Created", {
            description: `${annToSave.title} is now ${annToSave.status}`
        });
    };

    const handleDelete = (id: string) => {
        if (confirm("Delete this announcement?")) {
            SimulatedDB.deleteAnnouncement(id);
            toast.success("Announcement Deleted");
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Warning': return 'text-red-500 bg-red-500/10 border-red-500/20';
            case 'Promo': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
            default: return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
        }
    };

    const getPriorityColor = (p: string) => {
        switch (p) {
            case 'High': return 'text-red-500';
            case 'Medium': return 'text-yellow-500';
            default: return 'text-zinc-500';
        }
    };

    const filteredAnnouncements = announcements.filter(a => {
        if (activeTab === 'All') return true;
        if (activeTab === 'Active') return a.status === 'Active';
        if (activeTab === 'Scheduled') return new Date(a.startDate) > new Date();
        return true;
    });

    return (
        <ViewContainer
            title="Announcement Center"
            subtitle="Site-wide Alerts & Notifications"
            actions={
                <button
                    onClick={() => {
                        setNewAnnouncement({
                            type: 'Info', status: 'Active', priority: 'Medium', displayStyle: 'Top Bar',
                            startDate: new Date().toISOString().split('T')[0],
                            endDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
                        });
                        setIsCreating(true);
                    }}
                    className="px-6 py-3 bg-[#fabf37] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2"
                >
                    <Plus className="size-4" /> New Alert
                </button>
            }
        >
            {/* Filter Tabs */}
            <div className="flex gap-4 mb-6 border-b border-white/5 pb-1">
                {['All', 'Active', 'Scheduled'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`text-[10px] font-black uppercase tracking-widest py-2 px-4 border-b-2 transition-all ${activeTab === tab ? 'text-[#fabf37] border-[#fabf37]' : 'text-zinc-500 border-transparent hover:text-white'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {filteredAnnouncements.length === 0 && (
                        <div className="col-span-full h-64 flex flex-col items-center justify-center text-zinc-500 bg-zinc-900/30 rounded-[32px] border border-white/5 border-dashed">
                            <Megaphone className="size-8 mb-4 opacity-50" />
                            <p className="text-xs font-bold uppercase tracking-widest">No announcements found</p>
                        </div>
                    )}
                    {filteredAnnouncements.map((ann) => (
                        <motion.div
                            key={ann.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`bg-zinc-900/50 border rounded-[24px] overflow-hidden group flex flex-col relative ${ann.status === 'Active' ? 'border-[#fabf37]/50' : 'border-white/5 opacity-75'}`}
                        >
                            <div className="p-6 flex-grow space-y-4">
                                <div className="flex items-start justify-between">
                                    <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${getTypeColor(ann.type)}`}>
                                        {ann.type}
                                    </span>
                                    <div className="flex gap-2">
                                        <span className={`px-2 py-1 rounded-lg bg-black text-[8px] font-black uppercase tracking-widest flex items-center gap-1 border border-white/10 ${getPriorityColor(ann.priority)}`}>
                                            <AlertCircle className="size-2" /> {ann.priority}
                                        </span>
                                        <div className={`size-2 rounded-full mt-1 ${ann.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-zinc-500'}`} />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-black text-white leading-tight mb-2">{ann.title}</h3>
                                    <p className="text-xs text-zinc-400 leading-relaxed max-h-20 overflow-y-auto custom-scrollbar">{ann.message}</p>
                                </div>

                                <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-600 bg-black/30 p-2 rounded-lg border border-white/5">
                                    <Layout className="size-3" />
                                    <span className="uppercase tracking-widest">{ann.displayStyle || "Top Bar"}</span>
                                    <span className="text-zinc-700">|</span>
                                    <Calendar className="size-3" />
                                    <span className="font-mono">{ann.startDate}</span>
                                    <span className="text-zinc-700">→</span>
                                    <span className="font-mono">{ann.endDate}</span>
                                </div>
                            </div>

                            <div className="flex border-t border-white/5 divide-x divide-white/5 bg-black/20">
                                <button
                                    onClick={() => { setNewAnnouncement(ann); setIsCreating(true); }}
                                    className="flex-1 py-3 text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(ann.id)}
                                    className="px-4 py-3 text-red-500 hover:bg-red-500/10 transition-colors"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {isCreating && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={() => setIsCreating(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-zinc-900 border border-white/10 rounded-[32px] p-8 w-full max-w-2xl shadow-2xl relative"
                        >
                            <button
                                onClick={() => setIsCreating(false)}
                                className="absolute top-6 right-6 p-2 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition-colors"
                            >
                                <X className="size-5" />
                            </button>

                            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-8">
                                {newAnnouncement.id ? "Edit Announcement" : "Create New Alert"}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="md:col-span-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Title</label>
                                    <input
                                        type="text"
                                        value={newAnnouncement.title || ""}
                                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37]"
                                        placeholder="e.g. Server Maintenance"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Message</label>
                                    <textarea
                                        rows={3}
                                        value={newAnnouncement.message || ""}
                                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] resize-none"
                                        placeholder="Detailed message displayed to users..."
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Display Style</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[
                                            { id: 'Top Bar', icon: <ArrowUp className="size-3" /> },
                                            { id: 'Popup', icon: <Monitor className="size-3" /> },
                                            { id: 'Toast', icon: <MessageSquare className="size-3" /> }
                                        ].map(style => (
                                            <button
                                                key={style.id}
                                                onClick={() => setNewAnnouncement({ ...newAnnouncement, displayStyle: style.id as any })}
                                                className={`flex flex-col items-center justify-center gap-1 py-3 rounded-lg border text-[9px] font-black uppercase tracking-widest transition-all ${newAnnouncement.displayStyle === style.id ? 'bg-[#fabf37]/20 border-[#fabf37] text-[#fabf37]' : 'bg-black border-white/10 text-zinc-500 hover:text-white'}`}
                                            >
                                                {style.icon}
                                                {style.id}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Alert Type</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[
                                            { id: 'Info', color: 'text-blue-500' },
                                            { id: 'Warning', color: 'text-red-500' },
                                            { id: 'Promo', color: 'text-purple-500' }
                                        ].map(type => (
                                            <button
                                                key={type.id}
                                                onClick={() => setNewAnnouncement({ ...newAnnouncement, type: type.id as any })}
                                                className={`py-3 rounded-lg border text-[9px] font-black uppercase tracking-widest transition-all ${newAnnouncement.type === type.id ? `bg-white/10 border-white/30 ${type.color}` : 'bg-black border-white/10 text-zinc-500'}`}
                                            >
                                                {type.id}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Start Date</label>
                                    <input
                                        type="date"
                                        value={newAnnouncement.startDate || ""}
                                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, startDate: e.target.value })}
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37]"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">End Date</label>
                                    <input
                                        type="date"
                                        value={newAnnouncement.endDate || ""}
                                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, endDate: e.target.value })}
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37]"
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Priority</label>
                                    <select
                                        value={newAnnouncement.priority || 'Medium'}
                                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, priority: e.target.value as any })}
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37]"
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Status</label>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setNewAnnouncement({ ...newAnnouncement, status: 'Active' })}
                                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${newAnnouncement.status === 'Active' ? 'bg-green-500/20 border-green-500 text-green-500' : 'bg-black border-white/10 text-zinc-500'}`}
                                        >
                                            <Check className="size-3" /> Active
                                        </button>
                                        <button
                                            onClick={() => setNewAnnouncement({ ...newAnnouncement, status: 'Inactive' })}
                                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${newAnnouncement.status === 'Inactive' ? 'bg-zinc-500/20 border-zinc-500 text-zinc-300' : 'bg-black border-white/10 text-zinc-500'}`}
                                        >
                                            <XCircle className="size-3" /> Inactive
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleSave}
                                className="w-full py-4 bg-[#fabf37] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                <Plus className="size-4" /> Save Announcement
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </ViewContainer>
    );
}
