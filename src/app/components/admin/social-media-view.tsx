import { MouseEvent as ReactMouseEvent, useState } from 'react';
import { ViewContainer } from "./views";
import { useSocialMedia, SocialPost } from "../../context/SocialMediaContext";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Linkedin, Facebook, Youtube, Plus, Trash2, Save, X, ExternalLink, Eye, EyeOff, CheckSquare, Square, Filter, Layers, ListFilter, BarChart3, TrendingUp, Users, MessageCircle, Heart, Calendar, Share2, MapPin, Smile, MessageSquare, Globe, Users2 } from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function SocialMediaView() {
  const { socialLinks, updateSocialLink, posts, addPost, deletePost, updatePost } = useSocialMedia();
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [newPost, setNewPost] = useState<Partial<SocialPost>>({
    platform: 'Instagram',
    caption: '',
    img: '',
    date: 'Just now'
  });

  const [filter, setFilter] = useState<'all' | 'live' | 'hidden'>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

  const handleSaveLink = (platform: string, url: string) => {
    updateSocialLink(platform, url);
    toast.success(`${platform} link updated`);
  };

  const handleAddPost = () => {
    if (!newPost.caption || !newPost.img) {
      toast.error("Please fill in all fields");
      return;
    }
    addPost(newPost as Omit<SocialPost, 'id'>);
    setIsAddingPost(false);
    setNewPost({ platform: 'Instagram', caption: '', img: '', date: 'Just now' });
    toast.success("Post added to feed");
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'live' && post.isHidden) return false;
    if (filter === 'hidden' && !post.isHidden) return false;
    if (platformFilter !== 'all' && post.platform !== platformFilter) return false;
    return true;
  });

  const toggleSelect = (id: string, e?: ReactMouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedPosts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleBulkAction = (action: 'hide' | 'show' | 'delete') => {
    if (action === 'delete') {
      selectedPosts.forEach(id => deletePost(id));
      toast.success(`${selectedPosts.length} posts deleted`);
    } else {
      const isHidden = action === 'hide';
      selectedPosts.forEach(id => updatePost(id, { isHidden }));
      toast.success(`${selectedPosts.length} posts ${isHidden ? 'hidden' : 'set to live'}`);
    }
    setSelectedPosts([]);
  };

  return (
    <ViewContainer 
      title="Social Media" 
      subtitle="Digital Footprint Management"
      actions={
        <button 
          onClick={() => setIsAddingPost(true)}
          className="bg-[#fabf37] text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus className="size-4" /> Add Post
        </button>
      }
    >
      <div className="space-y-8">
        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           <div className="bg-black border border-white/5 rounded-[32px] p-6 relative overflow-hidden group hover:border-[#fabf37]/30 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Users className="size-20 text-[#fabf37]" />
              </div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Total Audience</p>
              <h4 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">84.2K</h4>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                  <TrendingUp className="size-3" /> +12.5%
                </span>
                <span className="text-[9px] font-bold text-zinc-600 uppercase">vs last month</span>
              </div>
           </div>
           
           <div className="bg-black border border-white/5 rounded-[32px] p-6 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <BarChart3 className="size-20 text-blue-500" />
              </div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Engagement Rate</p>
              <h4 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">4.8%</h4>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                  <TrendingUp className="size-3" /> +0.4%
                </span>
                <span className="text-[9px] font-bold text-zinc-600 uppercase">Above Avg</span>
              </div>
           </div>

           <div className="bg-black border border-white/5 rounded-[32px] p-6 relative overflow-hidden group hover:border-pink-500/30 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Heart className="size-20 text-pink-500" />
              </div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Total Interactions</p>
              <h4 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">12.4K</h4>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-pink-500/10 text-pink-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                  <Heart className="size-3" /> 8.2K Likes
                </span>
                <span className="text-[9px] font-bold text-zinc-600 uppercase">Last 30 days</span>
              </div>
           </div>

           <div className="bg-black border border-white/5 rounded-[32px] p-6 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Share2 className="size-20 text-purple-500" />
              </div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Content Velocity</p>
              <h4 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">{posts.length}</h4>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                  <Calendar className="size-3" /> {posts.filter(p => p.date === 'Just now').length} New
                </span>
                <span className="text-[9px] font-bold text-zinc-600 uppercase">Active Posts</span>
              </div>
           </div>
        </div>

        {/* Profile Links Section */}
        <div className="bg-black border border-white/5 rounded-[40px] p-8">
          <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6">Profile Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(socialLinks).map(([platform, url]) => (
              <div key={platform} className="bg-zinc-900/30 p-6 rounded-3xl border border-white/5 group hover:border-[#fabf37]/50 transition-colors">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#fabf37]/20 transition-colors">
                      {platform === 'instagram' && <Instagram className="size-5 text-pink-500 group-hover:text-[#fabf37] transition-colors" />}
                      {platform === 'facebook' && <Facebook className="size-5 text-blue-600 group-hover:text-[#fabf37] transition-colors" />}
                      {platform === 'linkedin' && <Linkedin className="size-5 text-blue-700 group-hover:text-[#fabf37] transition-colors" />}
                      {platform === 'youtube' && <Youtube className="size-5 text-red-600 group-hover:text-[#fabf37] transition-colors" />}
                    </div>
                    <div>
                      <p className="text-xs font-black text-white uppercase mb-1">{platform}</p>
                      <div className="flex items-center gap-2">
                         <div className={`size-1.5 rounded-full ${url ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`} />
                         <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{url ? 'Connected' : 'Not Linked'}</p>
                      </div>
                    </div>
                  </div>
                  {url && (
                    <div className="text-right hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
                       <p className="text-[10px] font-black text-white tabular-nums">1,204</p>
                       <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Monthly Clicks</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <div className="relative flex-1 group/input">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => updateSocialLink(platform, e.target.value)}
                      placeholder={`https://${platform.toLowerCase()}.com/...`}
                      className="w-full bg-black/50 border border-white/10 rounded-xl pl-4 pr-4 py-3 text-xs text-zinc-300 focus:outline-none focus:border-[#fabf37] font-mono transition-all placeholder:text-zinc-700"
                    />
                  </div>
                  
                  <button 
                    onClick={() => handleSaveLink(platform, url)}
                    className="px-4 bg-[#fabf37]/10 hover:bg-[#fabf37] text-[#fabf37] hover:text-black rounded-xl border border-[#fabf37]/20 hover:border-[#fabf37] transition-all"
                    title="Save Changes"
                  >
                    <Save className="size-4" />
                  </button>

                  <button 
                    onClick={() => window.open(url, '_blank')}
                    disabled={!url}
                    className="px-4 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-xl border border-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Test Link"
                  >
                    <ExternalLink className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Pulse & Demographics */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
           {/* Recent Activity / Top Comments */}
           <div className="xl:col-span-2 bg-black border border-white/5 rounded-[40px] p-8">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-xl font-black text-white uppercase tracking-tight">Community Pulse</h3>
                 <button className="text-[10px] font-bold text-[#fabf37] uppercase tracking-widest hover:underline">View All Activity</button>
              </div>
              
              <div className="space-y-4">
                 {[
                    { user: "Sarah Jenkins", handle: "@sarah.j_designs", platform: "Instagram", content: "The new sustainable packaging collection is exactly what we needed! 😍 Can't wait to order.", time: "2m ago", sentiment: "positive" },
                    { user: "EcoTech Solutions", handle: "@ecotech_ltd", platform: "LinkedIn", content: "Great to see Paperware expanding into industrial biodegradable options. Let's connect.", time: "15m ago", sentiment: "positive" },
                    { user: "Mike Ross", handle: "@mross_88", platform: "Facebook", content: "When will the food trays be back in stock? Need them for next week.", time: "1h ago", sentiment: "neutral" },
                    { user: "Design Daily", handle: "@designdaily", platform: "Instagram", content: "Love the minimal aesthetic. #design #packaging", time: "3h ago", sentiment: "positive" },
                 ].map((comment, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-[#fabf37]/30 transition-colors group">
                       <div className="size-10 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-black text-zinc-500 group-hover:bg-[#fabf37] group-hover:text-black transition-colors">
                          {comment.user.charAt(0)}
                       </div>
                       <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                             <div className="flex items-center gap-2">
                                <span className="text-[11px] font-bold text-white">{comment.user}</span>
                                <span className="text-[9px] text-zinc-500">{comment.handle}</span>
                             </div>
                             <div className="flex items-center gap-2">
                                {comment.platform === 'Instagram' && <Instagram className="size-3 text-pink-500" />}
                                {comment.platform === 'LinkedIn' && <Linkedin className="size-3 text-blue-500" />}
                                {comment.platform === 'Facebook' && <Facebook className="size-3 text-blue-600" />}
                                <span className="text-[9px] font-bold text-zinc-600 uppercase">{comment.time}</span>
                             </div>
                          </div>
                          <p className="text-[11px] text-zinc-300 leading-relaxed">{comment.content}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Audience Demographics */}
           <div className="bg-black border border-white/5 rounded-[40px] p-8 flex flex-col">
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6">Audience Data</h3>
              
              <div className="space-y-6 flex-1">
                 <div>
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                          <Globe className="size-3" /> Top Locations
                       </span>
                    </div>
                    <div className="space-y-2">
                       <div className="flex items-center justify-between">
                          <span className="text-[11px] text-white">United States</span>
                          <span className="text-[10px] font-bold text-[#fabf37]">42%</span>
                       </div>
                       <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                          <div className="h-full bg-[#fabf37]" style={{ width: '42%' }} />
                       </div>
                       
                       <div className="flex items-center justify-between mt-3">
                          <span className="text-[11px] text-white">United Kingdom</span>
                          <span className="text-[10px] font-bold text-zinc-500">28%</span>
                       </div>
                       <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                          <div className="h-full bg-zinc-700" style={{ width: '28%' }} />
                       </div>

                       <div className="flex items-center justify-between mt-3">
                          <span className="text-[11px] text-white">Germany</span>
                          <span className="text-[10px] font-bold text-zinc-500">15%</span>
                       </div>
                       <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                          <div className="h-full bg-zinc-700" style={{ width: '15%' }} />
                       </div>
                    </div>
                 </div>

                 <div className="pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between mb-4">
                       <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                          <Users2 className="size-3" /> Age Distribution
                       </span>
                    </div>
                    <div className="flex items-end gap-2 h-24">
                       {[
                          { label: '18-24', val: 15 },
                          { label: '25-34', val: 45 },
                          { label: '35-44', val: 25 },
                          { label: '45+', val: 15 },
                       ].map((d) => (
                          <div key={d.label} className="flex-1 flex flex-col items-center gap-2 group">
                             <div className="w-full bg-zinc-900 rounded-t-lg relative group-hover:bg-zinc-800 transition-colors overflow-hidden">
                                <div 
                                   className="absolute bottom-0 inset-x-0 bg-[#fabf37] opacity-80 group-hover:opacity-100 transition-opacity" 
                                   style={{ height: `${d.val}%` }} 
                                />
                             </div>
                             <span className="text-[8px] font-bold text-zinc-600 uppercase">{d.label}</span>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Feed Management Section */}
        <div className="bg-black border border-white/5 rounded-[40px] p-8">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-4">
            <h3 className="text-xl font-black text-white uppercase tracking-tight">Active Feed Posts</h3>
            
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-white/5">
                {(['all', 'live', 'hidden'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                      filter === f ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="relative">
                <select
                  value={platformFilter}
                  onChange={(e) => setPlatformFilter(e.target.value)}
                  className="appearance-none bg-zinc-900/50 border border-white/5 text-white px-4 py-2 pr-8 rounded-xl text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-[#fabf37]"
                >
                  <option value="all">All Platforms</option>
                  <option value="Instagram">Instagram</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Youtube">Youtube</option>
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 size-3 text-zinc-500 pointer-events-none" />
              </div>

              <AnimatePresence>
                {selectedPosts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-2 pl-2 border-l border-white/10"
                  >
                    <button
                      onClick={() => handleBulkAction('show')}
                      className="p-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-colors"
                      title="Set Live"
                    >
                      <Eye className="size-4" />
                    </button>
                    <button
                      onClick={() => handleBulkAction('hide')}
                      className="p-2 bg-zinc-500/20 text-zinc-400 rounded-lg hover:bg-zinc-500 hover:text-white transition-colors"
                      title="Hide Selected"
                    >
                      <EyeOff className="size-4" />
                    </button>
                    <button
                      onClick={() => handleBulkAction('delete')}
                      className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                      title="Delete Selected"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Add Post Form */}
          <AnimatePresence>
            {isAddingPost && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 bg-zinc-900/50 border border-[#fabf37]/30 rounded-3xl p-6 overflow-hidden"
              >
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-sm font-black text-[#fabf37] uppercase tracking-widest">New Post Entry</h4>
                  <button onClick={() => setIsAddingPost(false)} className="text-zinc-500 hover:text-white">
                    <X className="size-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Platform</label>
                      <select 
                        value={newPost.platform}
                        onChange={(e) => setNewPost({...newPost, platform: e.target.value as any})}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#fabf37]"
                      >
                        <option value="Instagram">Instagram</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Youtube">Youtube</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Image URL</label>
                      <input 
                        type="text"
                        value={newPost.img}
                        onChange={(e) => setNewPost({...newPost, img: e.target.value})}
                        placeholder="https://..."
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#fabf37]"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Caption</label>
                      <textarea 
                        value={newPost.caption}
                        onChange={(e) => setNewPost({...newPost, caption: e.target.value})}
                        rows={3}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#fabf37] resize-none"
                      />
                    </div>
                    <button 
                      onClick={handleAddPost}
                      className="w-full bg-[#fabf37] text-black font-black text-[10px] uppercase tracking-widest py-3 rounded-xl hover:opacity-90 transition-opacity"
                    >
                      Publish to Feed
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <div 
                  key={post.id} 
                  onClick={(e) => toggleSelect(post.id, e)}
                  className={`group relative bg-zinc-900/30 border rounded-3xl overflow-hidden hover:border-white/20 transition-all cursor-pointer ${
                    selectedPosts.includes(post.id) ? 'border-[#fabf37] ring-1 ring-[#fabf37]' : (post.isHidden ? 'border-red-500/20 opacity-60 grayscale' : 'border-white/5')
                  }`}
                >
                  <div className="aspect-[4/3] relative">
                    <ImageWithFallback src={post.img} alt={post.platform} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Selection Checkbox */}
                    <div className="absolute top-4 left-4 z-20">
                      <div className={`size-8 rounded-xl border flex items-center justify-center transition-all backdrop-blur-md ${
                        selectedPosts.includes(post.id) ? 'bg-[#fabf37] border-[#fabf37] text-black' : 'bg-black/50 border-white/10 text-transparent hover:border-white/50'
                      }`}>
                        <CheckSquare className="size-4" />
                      </div>
                    </div>

                    <div className="absolute top-4 left-14 px-3 py-2 bg-black/80 backdrop-blur-md rounded-xl text-white text-[8px] font-black tracking-widest flex items-center gap-2 border border-white/10 z-10">
                      {post.platform === 'Instagram' && <Instagram className="size-3" />}
                      {post.platform === 'LinkedIn' && <Linkedin className="size-3" />}
                      {post.platform === 'Facebook' && <Facebook className="size-3" />}
                      {post.platform === 'Youtube' && <Youtube className="size-3" />}
                      {post.platform}
                    </div>
                    
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      <button 
                        onClick={(e) => { e.stopPropagation(); updatePost(post.id, { isHidden: !post.isHidden }); }}
                        className={`p-2 rounded-xl backdrop-blur-md transition-all ${
                          post.isHidden 
                            ? 'bg-green-500/20 text-green-500 hover:bg-green-500 hover:text-white' 
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                        title={post.isHidden ? "Show Post" : "Hide Post"}
                      >
                        {post.isHidden ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); deletePost(post.id); }}
                        className="p-2 bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white rounded-xl backdrop-blur-md transition-all"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>

                    {post.isHidden && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px] pointer-events-none z-10">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white border border-white/20 px-3 py-1 rounded-full bg-black/50">
                          Hidden
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-bold text-zinc-400 line-clamp-2 mb-4 group-hover:text-zinc-200 transition-colors">
                      {post.caption}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-4">
                       <div className="flex items-center gap-1.5 text-zinc-500 group-hover:text-pink-500 transition-colors">
                          <Heart className="size-3" />
                          <span className="text-[9px] font-black">{Math.floor(Math.random() * 500) + 50}</span>
                       </div>
                       <div className="flex items-center gap-1.5 text-zinc-500 group-hover:text-blue-500 transition-colors">
                          <MessageCircle className="size-3" />
                          <span className="text-[9px] font-black">{Math.floor(Math.random() * 50) + 5}</span>
                       </div>
                       <div className="flex items-center gap-1.5 text-zinc-500 group-hover:text-white transition-colors ml-auto">
                          <Share2 className="size-3" />
                          <span className="text-[9px] font-black">Share</span>
                       </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-[8px] font-black uppercase tracking-widest text-[#fabf37]">{post.date}</span>
                      <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600">ID: {post.id}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ViewContainer>
  );
}
