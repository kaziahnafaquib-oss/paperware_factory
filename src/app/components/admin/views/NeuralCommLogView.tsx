import { useState } from 'react';
import { Bot, User, CheckCheck, FileText, ChevronRight, Search, Filter, MessageSquare, Clock, X, ArrowUpRight, Send, Zap, AlertTriangle, Activity, ShieldCheck, Brain, Sparkles, ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewContainer } from "../ViewContainer";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "../../ui/dialog";
import { toast } from "sonner";

const initialCommLogs = [
    {
        id: 1,
        user: "Sarah Smith (Green Leaf)",
        msg: "Do you have 12oz double wall cups in stock?",
        reply: "Yes, currently 50k units available. Ready for dispatch.",
        fullThread: [
            { sender: "user", text: "Hi, I'm looking for 12oz cups.", time: "10:30 AM" },
            { sender: "bot", text: "Hello Sarah! We have several options. Are you interested in single or double wall?", time: "10:30 AM" },
            { sender: "user", text: "Do you have 12oz double wall cups in stock?", time: "10:31 AM" },
            { sender: "bot", text: "Yes, currently 50k units available. Ready for dispatch.", time: "10:31 AM" }
        ],
        type: "inquiry",
        status: "replied",
        time: "10m ago",
        hasQuote: false,
        sentiment: "positive",
        priority: "medium",
        topic: "Stock"
    },
    {
        id: 2,
        user: "John Doe (TechFlow)",
        msg: "Need a quote for 50k kraft bags with custom logo.",
        reply: "Quote #RFQ-10293 generated and sent to email.",
        fullThread: [
            { sender: "user", text: "Need a quote for 50k kraft bags with custom logo.", time: "09:15 AM" },
            { sender: "bot", text: "Certainly. Please upload your logo file so I can check printability.", time: "09:15 AM" },
            { sender: "user", text: "[File Uploaded: logo.png]", time: "09:16 AM" },
            { sender: "bot", text: "Received. Calculating based on 2-color print...", time: "09:16 AM" },
            { sender: "bot", text: "Quote #RFQ-10293 generated and sent to email.", time: "09:17 AM" }
        ],
        type: "rfq",
        status: "quoted",
        time: "1h ago",
        hasQuote: true,
        sentiment: "neutral",
        priority: "high",
        topic: "Pricing"
    },
    {
        id: 3,
        user: "Mike Ross (Urban Brew)",
        msg: "Is shipping to London possible? Urgent request.",
        reply: "Yes, we ship globally via DHL Express.",
        type: "inquiry",
        status: "replied",
        time: "3h ago",
        hasQuote: false,
        sentiment: "neutral",
        priority: "high",
        topic: "Shipping"
    },
    {
        id: 4,
        user: "Emily Chen (EcoPack)",
        msg: "Can I get a sample of the biodegradable straws?",
        reply: "Sample request #SMP-442 processed. Dispatching tomorrow.",
        type: "sample",
        status: "processed",
        time: "5h ago",
        hasQuote: false,
        sentiment: "positive",
        priority: "low",
        topic: "Sample"
    },
    {
        id: 5,
        user: "David Wilson",
        msg: "The last shipment arrived damaged. Need help.",
        reply: "I'm sorry to hear that. I've escalated this to support ticket #TKT-992.",
        type: "complaint",
        status: "escalated",
        time: "1d ago",
        hasQuote: false,
        sentiment: "negative",
        priority: "critical",
        topic: "Support"
    },
];

export function NeuralCommLogView() {
    const [commLogs, setCommLogs] = useState(initialCommLogs);
    const [selectedLog, setSelectedLog] = useState<any>(null);
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [agentMode, setAgentMode] = useState<"Autonomous" | "Supervisor">("Autonomous");

    const filteredLogs = commLogs.filter(log => {
        const matchesFilter = filter === "All" ||
            (filter === "Quotes" && log.hasQuote) ||
            (filter === "Inquiries" && log.type === "inquiry") ||
            (filter === "Critical" && log.priority === "critical") ||
            (filter === "Positive" && log.sentiment === "positive");
        const matchesSearch = log.user.toLowerCase().includes(search.toLowerCase()) ||
            log.msg.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleSendReply = () => {
        if (!replyText.trim()) return;

        if (selectedLog) {
            const newMsg = {
                sender: "bot",
                text: replyText,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            const updatedLog = {
                ...selectedLog,
                fullThread: selectedLog.fullThread ? [...selectedLog.fullThread, newMsg] : [newMsg],
                reply: replyText,
                status: "replied"
            };

            setCommLogs(prev => prev.map(log => log.id === selectedLog.id ? updatedLog : log));
            setSelectedLog(updatedLog);

            toast.success("Reply Sent", {
                description: "Message dispatched via Neural Gateway."
            });

            setReplyText("");
            setIsReplying(false);
        }
    };

    const handleCloseDialog = () => {
        setSelectedLog(null);
        setIsReplying(false);
        setReplyText("");
    };

    const toggleAgentMode = () => {
        const newMode = agentMode === "Autonomous" ? "Supervisor" : "Autonomous";
        setAgentMode(newMode);
        toast.success(`Mode Switched to ${newMode}`, {
            description: `AI Agent will now operate in ${newMode} mode.`
        });
    };

    const getSentimentIcon = (sentiment: string) => {
        switch (sentiment) {
            case "positive": return <ThumbsUp className="size-3 text-emerald-500" />;
            case "negative": return <ThumbsDown className="size-3 text-red-500" />;
            default: return <Minus className="size-3 text-zinc-500" />;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "critical": return "bg-red-500/10 text-red-500 border-red-500/20";
            case "high": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
            case "medium": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            default: return "bg-zinc-800 text-zinc-500 border-zinc-700";
        }
    };

    return (
        <ViewContainer
            title="Neural Comm Log"
            subtitle="AI-Enhanced Communication & Intelligence Stream"
            actions={
                <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 border ${agentMode === "Autonomous"
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : "bg-purple-500/10 text-purple-500 border-purple-500/20"
                        }`}>
                        <Brain className="size-3" /> Node: {agentMode}
                    </span>
                </div>
            }
        >
            <div className="space-y-6">
                {/* Neural Activity Banner */}
                <div className="bg-black border border-white/10 rounded-[32px] p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">System Online</span>
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Global Interaction Matrix</h3>
                        </div>
                        <div className="flex gap-8">
                            <div>
                                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Sentiment Index</p>
                                <p className="text-xl font-black text-white flex items-center gap-2">
                                    84% <span className="text-emerald-500 text-xs">+2.4%</span>
                                </p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Queue Load</p>
                                <p className="text-xl font-black text-white flex items-center gap-2">
                                    Low <span className="text-zinc-500 text-xs">4 active</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-auto flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search AI logs..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-[#fabf37] uppercase tracking-wider placeholder:text-zinc-600"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto scrollbar-hide">
                        {["All", "Quotes", "Inquiries", "Critical", "Positive"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${filter === f
                                        ? "bg-[#fabf37] text-black border-[#fabf37]"
                                        : "bg-black border-white/10 text-zinc-500 hover:text-white hover:border-white/30"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Log Stream */}
                    <div className="lg:col-span-2 space-y-4">
                        <AnimatePresence>
                            {filteredLogs.map((log) => (
                                <motion.div
                                    key={log.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    onClick={() => setSelectedLog(log)}
                                    className="bg-black/40 border border-white/5 rounded-[24px] p-6 relative group hover:bg-zinc-900/40 hover:border-[#fabf37]/30 cursor-pointer transition-all"
                                >
                                    {/* Badges */}
                                    <div className="absolute top-6 right-6 flex items-center gap-2">
                                        <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border ${getPriorityColor(log.priority)}`}>
                                            {log.priority}
                                        </span>
                                        <div className="size-6 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                                            {getSentimentIcon(log.sentiment)}
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="size-12 rounded-full bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center text-zinc-400 shrink-0 border border-white/10 shadow-lg">
                                            <User className="size-5" />
                                        </div>
                                        <div className="flex-1 pr-24">
                                            <h4 className="text-sm font-black text-white uppercase tracking-tight mb-1">{log.user}</h4>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[9px] text-[#fabf37] font-bold uppercase tracking-widest">{log.topic}</span>
                                                <span className="size-1 rounded-full bg-zinc-700" />
                                                <span className="text-[9px] text-zinc-500 font-bold uppercase">{log.time}</span>
                                            </div>
                                            <p className="mt-3 text-xs font-medium text-zinc-300 bg-white/5 p-3 rounded-xl rounded-tl-none border border-white/5 leading-relaxed">"{log.msg}"</p>
                                        </div>
                                    </div>

                                    <div className="pl-16">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="h-px bg-white/5 flex-1" />
                                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Auto-Response</span>
                                        </div>
                                        <div className="flex items-start gap-4 justify-end">
                                            <div className="flex-1 text-right">
                                                <p className="text-xs font-medium text-[#fabf37] bg-[#fabf37]/5 p-3 rounded-xl rounded-tr-none border border-[#fabf37]/10 inline-block text-left leading-relaxed">
                                                    {log.reply}
                                                </p>
                                            </div>
                                            <div className="size-8 rounded-full bg-[#fabf37] flex items-center justify-center text-black shrink-0 shadow-lg mt-1">
                                                <Bot className="size-4" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-6">
                            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Activity className="size-4 text-[#fabf37]" /> Live Metrics
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-black rounded-2xl border border-white/5 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex justify-between items-start mb-2 relative z-10">
                                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Resolution Rate</span>
                                        <Sparkles className="size-3 text-emerald-500" />
                                    </div>
                                    <p className="text-2xl font-black text-white relative z-10">94.2%</p>
                                </div>

                                <div className="p-4 bg-black rounded-2xl border border-white/5 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex justify-between items-start mb-2 relative z-10">
                                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Avg. Velocity</span>
                                        <Zap className="size-3 text-blue-500" />
                                    </div>
                                    <p className="text-2xl font-black text-white relative z-10">1.2s</p>
                                </div>

                                <div className="p-4 bg-black rounded-2xl border border-white/5 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex justify-between items-start mb-2 relative z-10">
                                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Quotes Generated</span>
                                        <FileText className="size-3 text-purple-500" />
                                    </div>
                                    <p className="text-2xl font-black text-white relative z-10">12</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#fabf37]/5 border border-[#fabf37]/10 rounded-[32px] p-6 relative overflow-hidden">
                            <div className="absolute -right-6 -top-6 size-24 bg-[#fabf37]/10 rounded-full blur-2xl" />
                            <h3 className="text-sm font-black text-[#fabf37] uppercase tracking-widest mb-4 flex items-center gap-2">
                                <ShieldCheck className="size-4" /> Supervisor Mode
                            </h3>
                            <p className="text-[10px] text-zinc-400 leading-relaxed mb-6 font-medium">
                                Current Status: <strong className="text-white">{agentMode}</strong>.
                                In autonomous mode, the neural engine processes responses with 99.8% confidence.
                            </p>
                            <button
                                onClick={toggleAgentMode}
                                className="w-full py-3 bg-[#fabf37] text-black text-[9px] font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(250,191,55,0.3)] transition-all flex items-center justify-center gap-2"
                            >
                                <RefreshCw className="size-3" /> Switch Mode
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Conversation Modal */}
            <Dialog open={!!selectedLog} onOpenChange={handleCloseDialog}>
                <DialogContent className="bg-[#09090b] border border-white/10 text-white max-w-2xl p-0 gap-0 overflow-hidden rounded-3xl">
                    <DialogHeader className="p-6 bg-zinc-900/50 border-b border-white/5">
                        <DialogTitle className="flex items-center gap-4">
                            <div className="size-12 rounded-full bg-black flex items-center justify-center border border-white/10 shadow-lg">
                                <User className="size-5 text-zinc-400" />
                            </div>
                            <div>
                                <h4 className="text-lg font-black uppercase tracking-tight text-white">{selectedLog?.user}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="px-2 py-0.5 bg-zinc-800 rounded text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{selectedLog?.topic}</span>
                                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest ${getPriorityColor(selectedLog?.priority || "medium")}`}>
                                        {selectedLog?.priority} Priority
                                    </span>
                                </div>
                            </div>
                        </DialogTitle>
                        <DialogDescription className="sr-only">Conversation thread</DialogDescription>
                    </DialogHeader>

                    <div className="p-6 space-y-6 max-h-[50vh] overflow-y-auto custom-scrollbar bg-black/20">
                        {selectedLog?.fullThread ? (
                            selectedLog.fullThread.map((msg: any, idx: number) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    key={idx}
                                    className={`flex gap-3 ${msg.sender === 'bot' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.sender === 'user' && (
                                        <div className="size-8 rounded-full bg-zinc-900 flex items-center justify-center shrink-0 border border-white/5 mt-1">
                                            <User className="size-3 text-zinc-500" />
                                        </div>
                                    )}

                                    <div className={`max-w-[80%] space-y-1 ${msg.sender === 'bot' ? 'text-right' : 'text-left'}`}>
                                        <div className={`p-4 rounded-2xl text-xs font-medium leading-relaxed border shadow-sm ${msg.sender === 'bot'
                                                ? 'bg-[#fabf37] border-[#fabf37] text-black rounded-tr-none'
                                                : 'bg-white/5 border-white/5 text-zinc-200 rounded-tl-none'
                                            }`}>
                                            {msg.text}
                                        </div>
                                        <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest block px-1">
                                            {msg.time}
                                        </span>
                                    </div>

                                    {msg.sender === 'bot' && (
                                        <div className="size-8 rounded-full bg-zinc-900 flex items-center justify-center shrink-0 border border-white/5 mt-1">
                                            <Bot className="size-3 text-[#fabf37]" />
                                        </div>
                                    )}
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-10 opacity-50">
                                <Activity className="size-8 text-zinc-700 mx-auto mb-4" />
                                <p className="text-xs uppercase tracking-widest text-zinc-500">History Not Available</p>
                            </div>
                        )}
                    </div>

                    <div className="p-6 bg-zinc-900/50 border-t border-white/5">
                        {isReplying ? (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                                <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder="Type response sequence..."
                                    className="w-full bg-black border border-white/10 rounded-xl p-4 text-xs font-medium text-white focus:outline-none focus:border-[#fabf37] min-h-[100px] resize-none placeholder:text-zinc-600"
                                    autoFocus
                                />
                                <div className="flex justify-between items-center">
                                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest"> <Bot className="size-3 inline mr-1" /> AI Suggestion Active</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setIsReplying(false)}
                                            className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSendReply}
                                            className="flex items-center gap-2 px-6 py-2 bg-[#fabf37] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform"
                                        >
                                            <Send className="size-3" /> Transmit
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Connection Stable</span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleCloseDialog}
                                        className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:bg-white/5 hover:text-white transition-all"
                                    >
                                        Close Terminal
                                    </button>
                                    <button
                                        onClick={() => setIsReplying(true)}
                                        className="px-6 py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#fabf37] hover:scale-105 transition-all flex items-center gap-2"
                                    >
                                        <MessageSquare className="size-3" /> Manual Override
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </ViewContainer>
    );
}

function RefreshCw({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M3 21v-5h5" />
        </svg>
    )
}