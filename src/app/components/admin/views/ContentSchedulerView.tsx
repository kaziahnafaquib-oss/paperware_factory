import { useState } from 'react';
import { Calendar, Clock, Send, CheckCircle, XCircle, Eye, Trash2, Edit, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewContainer } from "../ViewContainer";
import { toast } from "sonner";

interface ScheduledContent {
    id: number;
    type: 'product' | 'post' | 'campaign';
    title: string;
    description: string;
    scheduledDate: string;
    scheduledTime: string;
    status: 'scheduled' | 'published' | 'draft' | 'failed';
    category: string;
}

export default function ContentSchedulerView() {
    const [contents, setContents] = useState<ScheduledContent[]>([
        { id: 1, type: 'product', title: "Summer Collection Launch", description: "New biodegradable cup series", scheduledDate: "2026-02-10", scheduledTime: "09:00", status: "scheduled", category: "Products" },
        { id: 2, type: 'campaign', title: "Eid Special Discount", description: "30% off on all paper bags", scheduledDate: "2026-03-15", scheduledTime: "06:00", status: "scheduled", category: "Marketing" },
        { id: 3, type: 'post', title: "Sustainability Report 2026", description: "Annual environmental impact report", scheduledDate: "2026-02-05", scheduledTime: "14:00", status: "draft", category: "Blog" },
        { id: 4, type: 'product', title: "Premium Gift Boxes", description: "Luxury packaging for corporate gifts", scheduledDate: "2026-01-28", scheduledTime: "10:00", status: "published", category: "Products" },
    ]);

    const [isAddingNew, setIsAddingNew] = useState(false);

    const deleteContent = (id: number) => {
        setContents(prev => prev.filter(c => c.id !== id));
        toast.success("Content Deleted", {
            description: "Scheduled item removed successfully."
        });
    };

    const publishNow = (id: number) => {
        setContents(prev => prev.map(c => c.id === id ? { ...c, status: 'published' } : c));
        toast.success("Published", {
            description: "Content is now live on the website."
        });
    };

    const getStatusColor = (status: string) => {
        const colors = {
            'scheduled': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
            'published': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
            'draft': 'bg-zinc-800 text-zinc-500 border-zinc-700',
            'failed': 'bg-red-500/10 text-red-500 border-red-500/20'
        };
        return colors[status as keyof typeof colors];
    };

    const getTypeIcon = (type: string) => {
        if (type === 'product') return '📦';
        if (type === 'campaign') return '🎯';
        return '📝';
    };

    return (
        <ViewContainer
            title="Content Scheduler"
            subtitle="Automated Publishing & Campaign Management"
            actions={
                <button
                    onClick={() => setIsAddingNew(true)}
                    className="px-6 py-3 bg-[#fabf37] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2"
                >
                    <Plus className="size-4" /> Schedule New
                </button>
            }
        >
            <div className="space-y-6">
                {/* Calendar View */}
                <div className="bg-black border border-white/5 rounded-[32px] p-8">
                    <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                        <Calendar className="size-5 text-[#fabf37]" /> Upcoming Schedule
                    </h3>

                    <div className="space-y-4">
                        <AnimatePresence>
                            {contents.map((content) => (
                                <motion.div
                                    key={content.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 hover:border-[#fabf37]/30 transition-all"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-start gap-4 flex-1">
                                            <div className="text-3xl">{getTypeIcon(content.type)}</div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h4 className="text-sm font-black text-white uppercase">{content.title}</h4>
                                                    <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border ${getStatusColor(content.status)}`}>
                                                        {content.status}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-zinc-400 mb-3">{content.description}</p>
                                                <div className="flex items-center gap-4 text-[10px] text-zinc-500">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="size-3" />
                                                        <span>{content.scheduledDate}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="size-3" />
                                                        <span>{content.scheduledTime}</span>
                                                    </div>
                                                    <div className="px-2 py-1 bg-zinc-800 rounded text-[8px] font-bold uppercase">
                                                        {content.category}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            {content.status === 'scheduled' && (
                                                <button
                                                    onClick={() => publishNow(content.id)}
                                                    className="p-2 bg-emerald-500/10 rounded-lg hover:bg-emerald-500/20 transition-colors"
                                                    title="Publish Now"
                                                >
                                                    <Send className="size-4 text-emerald-500" />
                                                </button>
                                            )}
                                            <button
                                                className="p-2 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="size-4 text-blue-500" />
                                            </button>
                                            <button
                                                onClick={() => deleteContent(content.id)}
                                                className="p-2 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="size-4 text-red-500" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-blue-500/5 border border-blue-500/10 rounded-[24px] p-6">
                        <Clock className="size-8 text-blue-500 mb-3" />
                        <p className="text-2xl font-black text-white">{contents.filter(c => c.status === 'scheduled').length}</p>
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Scheduled</p>
                    </div>
                    <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-[24px] p-6">
                        <CheckCircle className="size-8 text-emerald-500 mb-3" />
                        <p className="text-2xl font-black text-white">{contents.filter(c => c.status === 'published').length}</p>
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Published</p>
                    </div>
                    <div className="bg-zinc-800 border border-zinc-700 rounded-[24px] p-6">
                        <Edit className="size-8 text-zinc-500 mb-3" />
                        <p className="text-2xl font-black text-white">{contents.filter(c => c.status === 'draft').length}</p>
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Drafts</p>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/10 rounded-[24px] p-6">
                        <XCircle className="size-8 text-red-500 mb-3" />
                        <p className="text-2xl font-black text-white">{contents.filter(c => c.status === 'failed').length}</p>
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Failed</p>
                    </div>
                </div>
            </div>
        </ViewContainer>
    );
}
