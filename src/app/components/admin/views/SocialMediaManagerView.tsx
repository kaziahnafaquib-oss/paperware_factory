
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewContainer } from '../ViewContainer';
import {
    LayoutGrid, BarChart3, MessageCircle, Calendar as CalendarIcon,
    Plus, Search, Filter, MoreHorizontal, Send, Image as ImageIcon,
    ThumbsUp, Share2, MessageSquare, Trash2, Edit3, X, Check, Eye
} from 'lucide-react';
import { SimulatedDB, SocialPost, SocialAnalytics } from '../../../../lib/simulated-db';
import { toast } from 'sonner';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

export default function SocialMediaManagerView() {
    const [activeTab, setActiveTab] = useState<'posts' | 'analytics' | 'inbox' | 'calendar'>('posts');
    const [posts, setPosts] = useState<SocialPost[]>([]);
    const [analytics, setAnalytics] = useState<SocialAnalytics[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        loadData();
        const handleUpdate = () => loadData();
        window.addEventListener('paperware-social-update', handleUpdate);
        return () => window.removeEventListener('paperware-social-update', handleUpdate);
    }, []);

    const loadData = () => {
        setPosts(SimulatedDB.getSocialPosts());
        setAnalytics(SimulatedDB.getSocialAnalytics());
    };

    const handleDelete = (id: string) => {
        SimulatedDB.deleteSocialPost(id);
        toast.success("Post deleted");
    };

    return (
        <ViewContainer
            title="Social Media Manager"
            subtitle="Manage posts, track performance & engage with audience"
            actions={
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-6 py-3 bg-[#fabf37] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2"
                    >
                        <Plus className="size-4" /> Create Post
                    </button>
                </div>
            }
        >
            <div className="space-y-8">
                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-4 border-b border-white/5 pb-4">
                    {[
                        { id: 'posts', label: 'Posts Feed', icon: LayoutGrid },
                        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                        { id: 'inbox', label: 'Unified Inbox', icon: MessageCircle },
                        { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                                    ? 'bg-white text-black'
                                    : 'text-zinc-500 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <tab.icon className="size-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'posts' && <PostsTab key="posts" posts={posts} onDelete={handleDelete} onEdit={() => { }} />}
                    {activeTab === 'analytics' && <AnalyticsTab key="analytics" data={analytics} />}
                    {activeTab === 'inbox' && <InboxTab key="inbox" />}
                    {activeTab === 'calendar' && <CalendarTab key="calendar" posts={posts} />}
                </AnimatePresence>
            </div>

            {isCreateModalOpen && (
                <CreatePostModal onClose={() => setIsCreateModalOpen(false)} />
            )}
        </ViewContainer>
    );
}

function PostsTab({ posts, onDelete, onEdit }: { posts: SocialPost[], onDelete: (id: string) => void, onEdit: (post: SocialPost) => void }) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <div key={post.id} className="bg-zinc-900/50 border border-white/5 rounded-[24px] overflow-hidden hover:border-[#fabf37]/30 transition-all flex flex-col">
                    <div className="p-6 flex-1">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-2">
                                {post.platforms.map(p => (
                                    <span key={p} className="px-2 py-1 bg-white/5 rounded-md text-[8px] font-bold text-zinc-400 uppercase tracking-widest border border-white/5">{p}</span>
                                ))}
                            </div>
                            <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest ${post.status === 'Published' ? 'bg-emerald-500/10 text-emerald-500' :
                                    post.status === 'Scheduled' ? 'bg-blue-500/10 text-blue-500' :
                                        'bg-zinc-500/10 text-zinc-500'
                                }`}>
                                {post.status}
                            </span>
                        </div>

                        <p className="text-sm text-white/90 mb-4 line-clamp-3 leading-relaxed">{post.content}</p>

                        {post.media && (
                            <div className="rounded-xl overflow-hidden mb-4 border border-white/5 aspect-video relative">
                                <img src={post.media} alt="Post media" className="absolute inset-0 w-full h-full object-cover" />
                            </div>
                        )}

                        <div className="flex items-center gap-4 text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
                            <span className="flex items-center gap-1"><ThumbsUp className="size-3" /> {post.likes || 0}</span>
                            <span className="flex items-center gap-1"><MessageSquare className="size-3" /> {post.comments || 0}</span>
                            <span className="flex items-center gap-1"><Share2 className="size-3" /> {post.shares || 0}</span>
                        </div>
                    </div>

                    <div className="p-4 border-t border-white/5 bg-black/20 flex justify-between items-center">
                        <span className="text-[10px] text-zinc-600 font-mono">
                            {new Date(post.scheduledDate).toLocaleDateString()}
                        </span>
                        <div className="flex gap-2">
                            <button onClick={() => onEdit(post)} className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors">
                                <Edit3 className="size-3" />
                            </button>
                            <button onClick={() => onDelete(post.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-zinc-400 hover:text-red-500 transition-colors">
                                <Trash2 className="size-3" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </motion.div>
    );
}

function AnalyticsTab({ data }: { data: SocialAnalytics[] }) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.map((stat, i) => (
                    <div key={i} className="bg-zinc-900/50 border border-white/5 rounded-[28px] p-6 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-6">
                            <h4 className="text-lg font-black text-white uppercase">{stat.platform}</h4>
                            <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest ${stat.trend > 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                                }`}>
                                {stat.trend > 0 ? '+' : ''}{stat.trend}%
                            </span>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <span className="text-3xl font-black text-white block">{stat.followers.toLocaleString()}</span>
                                <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Followers</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-sm font-bold text-white block">{stat.engagementRate}%</span>
                                    <span className="text-[8px] text-zinc-500 uppercase tracking-widest">Engagement</span>
                                </div>
                                <div>
                                    <span className="text-sm font-bold text-white block">{(stat.reach / 1000).toFixed(1)}k</span>
                                    <span className="text-[8px] text-zinc-500 uppercase tracking-widest">Reach</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-8">
                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                    <BarChart3 className="size-5 text-[#fabf37]" /> Growth Overview
                </h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="platform" stroke="#52525b" style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} tickLine={false} axisLine={false} />
                            <YAxis stroke="#52525b" style={{ fontSize: '10px', fontWeight: 'bold' }} tickLine={false} axisLine={false} />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                itemStyle={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}
                            />
                            <Bar dataKey="reach" name="Reach" fill="#fabf37" radius={[6, 6, 0, 0]} barSize={40} />
                            <Bar dataKey="followers" name="Followers" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </motion.div>
    );
}

function InboxTab() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-[600px] border border-white/5 rounded-[32px] overflow-hidden bg-zinc-900/50">
            {/* Sidebar */}
            <div className="w-80 border-r border-white/5 flex flex-col bg-black/20">
                <div className="p-6 border-b border-white/5">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4">Messages</h3>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3 text-zinc-500" />
                        <input type="text" placeholder="Search conversation..." className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-[10px] text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#fabf37]/50 transition-all font-medium" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${i === 0 ? 'bg-[#fabf37]/5 border-l-2 border-l-[#fabf37]' : ''}`}>
                            <div className="flex justify-between items-start mb-1">
                                <h4 className={`text-xs font-bold ${i === 0 ? 'text-white' : 'text-zinc-400'}`}>Jane Doe</h4>
                                <span className="text-[9px] text-zinc-600">2m ago</span>
                            </div>
                            <p className="text-[10px] text-zinc-500 line-clamp-1">Hi, I have a question about the bulk pricing...</p>
                            <div className="mt-2 flex gap-2">
                                <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[8px] font-bold uppercase">Facebook</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
                    <div>
                        <h3 className="text-sm font-black text-white">Jane Doe</h3>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Facebook • Active Now</p>
                    </div>
                    <button className="px-3 py-1.5 border border-white/10 rounded-lg text-[10px] font-bold text-zinc-400 hover:text-white uppercase tracking-widest hover:bg-white/5 transition-all">
                        View Profile
                    </button>
                </div>

                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    <div className="flex justify-start">
                        <div className="bg-zinc-800 rounded-2xl rounded-tl-none p-4 max-w-[80%] text-xs text-zinc-300 leading-relaxed shadow-sm">
                            <p>Hello! I'm interested in ordering 5000 units of your 8oz cups. Do you offer international shipping?</p>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-[#fabf37] rounded-2xl rounded-tr-none p-4 max-w-[80%] text-xs text-black font-medium leading-relaxed shadow-sm">
                            <p>Hi Jane! Yes, we absolutely do ship internationally. Where are you located?</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-white/5 bg-black/20">
                    <div className="flex gap-2 items-center bg-zinc-900 border border-white/10 rounded-xl p-2 focus-within:border-[#fabf37]/50 transition-all">
                        <button className="p-2 hover:bg-white/10 rounded-lg text-zinc-500 hover:text-white transition-colors"><Plus className="size-4" /></button>
                        <input type="text" placeholder="Type a reply..." className="flex-1 bg-transparent border-none text-xs text-white placeholder:text-zinc-600 focus:outline-none py-2" />
                        <button className="p-2 bg-[#fabf37] text-black rounded-lg hover:bg-white transition-colors"><Send className="size-4" /></button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function CalendarTab({ posts }: { posts: SocialPost[] }) {
    // Determine days in current month (simplified for demo)
    const days = Array.from({ length: 35 }, (_, i) => i + 1);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-8">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-black text-white uppercase tracking-tight">February 2024</h3>
                <div className="flex gap-2">
                    <button className="p-2 border border-white/10 rounded-lg hover:bg-white/5"><div className="rotate-180 text-white">➜</div></button>
                    <button className="p-2 border border-white/10 rounded-lg hover:bg-white/5"><div className="text-white">➜</div></button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                    <div key={d} className="bg-zinc-900 p-4 text-[10px] font-black uppercase text-zinc-500 text-center">{d}</div>
                ))}

                {days.map((d) => {
                    // Check if there's a post for this "day" (simplified logic)
                    const postForDay = posts.find(p => new Date(p.scheduledDate).getDate() === (d > 31 ? d - 31 : d));

                    return (
                        <div key={d} className={`bg-black/40 min-h-[100px] p-3 hover:bg-white/5 transition-colors group relative ${d > 29 ? 'opacity-30' : ''}`}>
                            <span className="text-[10px] font-bold text-zinc-600 mb-2 block">{d > 29 ? d - 29 : d}</span>

                            {postForDay && (
                                <div className={`text-[9px] p-2 rounded-lg font-bold truncate cursor-pointer ${postForDay.status === 'Published' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
                                    }`}>
                                    {postForDay.content}
                                </div>
                            )}

                            <button className="absolute bottom-2 right-2 p-1 bg-white/10 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#fabf37] hover:text-black">
                                <Plus className="size-3" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}

function CreatePostModal({ onClose }: { onClose: () => void }) {
    const [form, setForm] = useState<Partial<SocialPost>>({
        content: '',
        platforms: [],
        status: 'Draft',
        scheduledDate: new Date().toISOString().slice(0, 16)
    });

    const handleSave = () => {
        if (!form.content || !form.platforms?.length) {
            toast.error("Please fill required fields");
            return;
        }

        SimulatedDB.saveSocialPost({
            id: Date.now().toString(),
            ...form as SocialPost
        });
        toast.success("Post Created Successfully");
        onClose();
    };

    const togglePlatform = (p: any) => {
        const current = form.platforms || [];
        if (current.includes(p)) {
            setForm({ ...form, platforms: current.filter(x => x !== p) });
        } else {
            setForm({ ...form, platforms: [...current, p] });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-900 border border-white/10 rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl"
            >
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
                    <h3 className="text-lg font-black text-white uppercase tracking-tight">Create New Post</h3>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors"><X className="size-5" /></button>
                </div>

                <div className="p-8 space-y-6">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block">Select Platforms</label>
                        <div className="flex gap-3">
                            {['Facebook', 'Instagram', 'LinkedIn', 'Twitter'].map(p => (
                                <button
                                    key={p}
                                    onClick={() => togglePlatform(p)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${form.platforms?.includes(p as any)
                                            ? 'bg-[#fabf37] text-black border-[#fabf37]'
                                            : 'bg-black border-white/10 text-zinc-400 hover:border-white/30'
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block">Content</label>
                        <textarea
                            value={form.content}
                            onChange={e => setForm({ ...form, content: e.target.value })}
                            rows={5}
                            className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#fabf37]/50 transition-all resize-none"
                            placeholder="What's on your mind?"
                        />
                        <div className="flex justify-between items-center">
                            <button className="flex items-center gap-2 text-[10px] font-bold text-[#fabf37] hover:underline uppercase tracking-widest">
                                <ImageIcon className="size-3" /> Add Media
                            </button>
                            <span className="text-[10px] text-zinc-600 font-mono">{form.content?.length || 0} chars</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block">Schedule Date</label>
                            <input
                                type="datetime-local"
                                value={form.scheduledDate}
                                onChange={e => setForm({ ...form, scheduledDate: e.target.value })}
                                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#fabf37]/50"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block">Status</label>
                            <select
                                value={form.status}
                                onChange={e => setForm({ ...form, status: e.target.value as any })}
                                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#fabf37]/50 appearance-none"
                            >
                                <option value="Draft">Draft</option>
                                <option value="Scheduled">Scheduled</option>
                                <option value="Published">Published</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-white/10 bg-black/40 flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-3 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/5 transition-all">Cancel</button>
                    <button onClick={handleSave} className="px-8 py-3 bg-[#fabf37] text-black rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-[#fabf37]/20">Save Post</button>
                </div>
            </motion.div>
        </div>
    );
}
