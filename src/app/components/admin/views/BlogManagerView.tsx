
import { useState, useEffect } from "react";
import { ViewContainer } from "../ViewContainer";
import { SimulatedDB, BlogPost } from "../../../../lib/simulated-db";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit3, Trash2, Eye, Calendar, User, Tag, Sparkles, Image as ImageIcon, Link, List, Type, Bold, Italic } from "lucide-react";
import { toast } from "sonner";

export default function BlogManagerView() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [viewMode, setViewMode] = useState<'Editor' | 'Preview'>('Editor');
    const [currentBlog, setCurrentBlog] = useState<Partial<BlogPost>>({});

    useEffect(() => {
        loadBlogs();
        const handleUpdate = () => loadBlogs();
        window.addEventListener('paperware-blog-update', handleUpdate);
        return () => window.removeEventListener('paperware-blog-update', handleUpdate);
    }, []);

    const loadBlogs = () => setBlogs(SimulatedDB.getBlogs());

    const handleSave = () => {
        if (!currentBlog.title || !currentBlog.category) {
            toast.error("Title and Category are required");
            return;
        }

        const blogToSave: BlogPost = {
            id: currentBlog.id || Date.now().toString(),
            title: currentBlog.title,
            excerpt: currentBlog.excerpt || "",
            category: currentBlog.category,
            status: currentBlog.status || 'Draft',
            date: currentBlog.date || new Date().toISOString().split('T')[0],
            views: currentBlog.views || 0,
            image: currentBlog.image || "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
            author: currentBlog.author || "Admin",
            tags: currentBlog.tags || [],
            seoTitle: currentBlog.seoTitle || currentBlog.title,
            seoDescription: currentBlog.seoDescription || currentBlog.excerpt || "",
        };

        SimulatedDB.saveBlog(blogToSave);
        setIsEditing(false);
        setCurrentBlog({});
        setViewMode('Editor');
        toast.success(currentBlog.id ? "Blog post updated" : "New blog post created");
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this post?")) {
            SimulatedDB.deleteBlog(id);
            toast.success("Blog post deleted");
        }
    };

    const addTag = () => {
        const tag = prompt("Enter tag:");
        if (tag) {
            setCurrentBlog(prev => ({ ...prev, tags: [...(prev.tags || []), tag] }));
        }
    };

    const removeTag = (index: number) => {
        setCurrentBlog(prev => {
            const newTags = [...(prev.tags || [])];
            newTags.splice(index, 1);
            return { ...prev, tags: newTags };
        });
    };

    return (
        <ViewContainer
            title="Blog & News Manager"
            subtitle="Content Management System"
            actions={
                <button
                    onClick={() => { setCurrentBlog({}); setIsEditing(true); }}
                    className="px-6 py-3 bg-[#fabf37] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2"
                >
                    <Plus className="size-4" /> New Post
                </button>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {blogs.map((blog) => (
                        <motion.div
                            key={blog.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="group bg-zinc-900/50 border border-white/5 rounded-[32px] overflow-hidden hover:border-[#fabf37]/30 transition-all flex flex-col h-full"
                        >
                            <div className="h-48 relative overflow-hidden shrink-0">
                                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 text-[10px] font-black text-white uppercase tracking-widest">{blog.category}</span>
                                    {blog.tags?.map((t, i) => i < 2 && (
                                        <span key={i} className="px-2 py-1 bg-[#fabf37]/80 rounded-lg text-[8px] font-black text-black uppercase tracking-widest">{t}</span>
                                    ))}
                                </div>
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-lg border ${blog.status === 'Published' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-500' : 'bg-zinc-500/20 border-zinc-500/30 text-zinc-400'}`}>
                                    <span className="text-[10px] font-black uppercase tracking-widest">{blog.status}</span>
                                </div>
                            </div>
                            <div className="p-6 space-y-4 flex flex-col flex-grow">
                                <div className="flex-grow">
                                    <div className="flex items-center gap-2 text-zinc-500 mb-2">
                                        <Calendar className="size-3" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{blog.date}</span>
                                        <span className="text-[10px]">•</span>
                                        <User className="size-3" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{blog.author}</span>
                                        <span className="text-[10px]">•</span>
                                        <Eye className="size-3" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{blog.views}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-white leading-tight mb-2 line-clamp-2">{blog.title}</h3>
                                    <p className="text-sm text-zinc-400 line-clamp-2">{blog.excerpt}</p>
                                </div>
                                <div className="flex gap-2 pt-4 border-t border-white/5 mt-auto">
                                    <button
                                        onClick={() => { setCurrentBlog(blog); setIsEditing(true); }}
                                        className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                                    >
                                        <Edit3 className="size-3" /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(blog.id)}
                                        className="py-3 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all"
                                    >
                                        <Trash2 className="size-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {isEditing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
                        onClick={() => setIsEditing(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                            className="w-full max-w-4xl bg-zinc-900 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl my-8 flex flex-col max-h-[90vh]"
                        >
                            {/* Editor Header */}
                            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
                                <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                                    {currentBlog.id ? "Edit Post" : "Create New Post"}
                                </h2>
                                <div className="flex gap-2 bg-black/50 p-1 rounded-xl">
                                    <button
                                        onClick={() => setViewMode('Editor')}
                                        className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'Editor' ? 'bg-[#fabf37] text-black' : 'text-zinc-500 hover:text-white'}`}
                                    >
                                        Editor
                                    </button>
                                    <button
                                        onClick={() => setViewMode('Preview')}
                                        className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'Preview' ? 'bg-[#fabf37] text-black' : 'text-zinc-500 hover:text-white'}`}
                                    >
                                        SEO Preview
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                                {viewMode === 'Editor' ? (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-3 gap-6">
                                            <div className="col-span-2">
                                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Featured Image URL</label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={currentBlog.image || ""}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentBlog({ ...currentBlog, image: e.target.value })}
                                                        placeholder="https://..."
                                                        className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37]"
                                                    />
                                                    <button className="px-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10">
                                                        <ImageIcon className="size-4 text-zinc-400" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Author</label>
                                                <input
                                                    type="text"
                                                    value={currentBlog.author || "Admin"}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentBlog({ ...currentBlog, author: e.target.value })}
                                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37]"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Title</label>
                                                <input
                                                    type="text"
                                                    value={currentBlog.title || ""}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentBlog({ ...currentBlog, title: e.target.value })}
                                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37]"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Category</label>
                                                <select
                                                    value={currentBlog.category || ""}
                                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCurrentBlog({ ...currentBlog, category: e.target.value })}
                                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37]"
                                                >
                                                    <option value="">Select Category...</option>
                                                    <option value="Sustainability">Sustainability</option>
                                                    <option value="Company News">Company News</option>
                                                    <option value="Design">Design</option>
                                                    <option value="Packaging Tips">Packaging Tips</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block">Content / Excerpt</label>
                                                <div className="flex gap-1 bg-black/30 rounded-lg p-1">
                                                    <button className="p-1 hover:bg-white/10 rounded"><Bold className="size-3 text-zinc-400" /></button>
                                                    <button className="p-1 hover:bg-white/10 rounded"><Italic className="size-3 text-zinc-400" /></button>
                                                    <button className="p-1 hover:bg-white/10 rounded"><Link className="size-3 text-zinc-400" /></button>
                                                    <button className="p-1 hover:bg-white/10 rounded"><List className="size-3 text-zinc-400" /></button>
                                                </div>
                                            </div>
                                            <textarea
                                                rows={6}
                                                value={currentBlog.excerpt || ""}
                                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCurrentBlog({ ...currentBlog, excerpt: e.target.value })}
                                                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] resize-none leading-relaxed"
                                                placeholder="Write your article summary here..."
                                            />
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block">Tags</label>
                                                <button onClick={addTag} className="text-[9px] text-[#fabf37] font-bold uppercase hover:underline">Add Tag +</button>
                                            </div>
                                            <div className="flex flex-wrap gap-2 p-3 bg-black border border-white/10 rounded-xl min-h-[50px]">
                                                {currentBlog.tags?.map((tag, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-zinc-800 rounded-lg text-[10px] text-zinc-300 flex items-center gap-2">
                                                        {tag}
                                                        <button onClick={() => removeTag(idx)} className="hover:text-white"><Trash2 className="size-3" /></button>
                                                    </span>
                                                ))}
                                                {(!currentBlog.tags || currentBlog.tags.length === 0) && <span className="text-zinc-600 text-xs italic">No tags added</span>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Status</label>
                                                <div className="flex gap-2">
                                                    {['Draft', 'Published'].map((s) => (
                                                        <button
                                                            key={s}
                                                            onClick={() => setCurrentBlog({ ...currentBlog, status: s as any })}
                                                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${currentBlog.status === s ? 'bg-white text-black' : 'bg-black border border-white/10 text-zinc-500'}`}
                                                        >
                                                            {s}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Publish Date</label>
                                                <input
                                                    type="date"
                                                    value={currentBlog.date || ""}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentBlog({ ...currentBlog, date: e.target.value })}
                                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-8">
                                        <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl">
                                            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                                                <Sparkles className="size-4 text-[#fabf37]" /> Search Engine Preview
                                            </h3>
                                            <div className="bg-white p-4 rounded-xl max-w-2xl">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="size-6 bg-zinc-200 rounded-full"></div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs text-zinc-800 font-bold">Paperware Factory</span>
                                                        <span className="text-[10px] text-zinc-500">https://paperware.com/blog/{currentBlog.title?.toLowerCase().replace(/\s+/g, '-')}</span>
                                                    </div>
                                                </div>
                                                <h4 className="text-xl text-[#1a0dab] font-serif hover:underline cursor-pointer mb-1 line-clamp-1">{currentBlog.seoTitle || currentBlog.title || "Your Post Title"}</h4>
                                                <p className="text-sm text-zinc-600 line-clamp-2">{currentBlog.seoDescription || currentBlog.excerpt || "This is how your post description will appear in search results..."}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">SEO Title</label>
                                                <input
                                                    type="text"
                                                    value={currentBlog.seoTitle || currentBlog.title || ""}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentBlog({ ...currentBlog, seoTitle: e.target.value })}
                                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37]"
                                                    placeholder="Optimal length: 50-60 chars"
                                                />
                                                <p className="text-[9px] text-right mt-1 text-zinc-500">{(currentBlog.seoTitle || "").length} / 60</p>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">SEO Description</label>
                                                <textarea
                                                    rows={3}
                                                    value={currentBlog.seoDescription || currentBlog.excerpt || ""}
                                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCurrentBlog({ ...currentBlog, seoDescription: e.target.value })}
                                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] resize-none"
                                                    placeholder="Optimal length: 150-160 chars"
                                                />
                                                <p className="text-[9px] text-right mt-1 text-zinc-500">{(currentBlog.seoDescription || "").length} / 160</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-8 border-t border-white/5 flex gap-4 bg-zinc-900 z-10">
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="flex-1 py-4 bg-zinc-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-700 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="flex-1 py-4 bg-[#fabf37] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
                                >
                                    Save Post
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </ViewContainer>
    );
}
