import React from "react";
import { ViewContainer } from "./views";
import { useSocialMedia, SocialPost } from "../../context/SocialMediaContext";
import { motion, AnimatePresence } from "motion/react";
import { Instagram, Linkedin, Facebook, Youtube, Plus, Trash2, Save, X, ExternalLink, Eye, EyeOff, CheckSquare, Square, Filter, Layers, ListFilter, BarChart3, TrendingUp, Users, MessageCircle, Heart, Calendar, Share2, MapPin, Smile, MessageSquare, Globe, Users2 } from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { SocialFeedsSettings } from "./social-feeds-settings";
import { useSocialFeedSettings, getSocialFeedsSavedAt, hasLocalSocialFeedOverride } from "../../lib/social-feeds";

function FeedSummary() {
  const s = useSocialFeedSettings();
  const saved = getSocialFeedsSavedAt();
  const rows: [string, string][] = [
    ["Facebook page", s.facebookPageUrl],
    ["Instagram profile", s.instagramProfileUrl],
    ["Configured posts", `${s.instagramPostUrls.length} Instagram, ${s.facebookPostUrls.length} Facebook`],
    ["Source", hasLocalSocialFeedOverride() ? "Local preview (this browser)" : "Published social-feeds.json"],
    ["Last saved here", saved ? new Date(saved).toLocaleString() : "Not saved in this browser"],
  ];
  return (
    <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {rows.map(([k, v]) => (
        <div key={k} className="bg-black border border-white/5 rounded-[24px] p-5 min-w-0">
          <dt className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">{k}</dt>
          <dd className="text-xs font-bold text-white break-all">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function SocialMediaView() {
  const { socialLinks, updateSocialLink, posts, addPost, deletePost, updatePost } = useSocialMedia();
  const [isAddingPost, setIsAddingPost] = React.useState(false);
  const [newPost, setNewPost] = React.useState<Partial<SocialPost>>({
    platform: 'Instagram',
    caption: '',
    img: '',
    date: 'Just now'
  });

  const [filter, setFilter] = React.useState<'all' | 'live' | 'hidden'>('all');
  const [platformFilter, setPlatformFilter] = React.useState<string>('all');
  const [selectedPosts, setSelectedPosts] = React.useState<string[]>([]);

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

  const toggleSelect = (id: string, e?: React.MouseEvent) => {
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
        <SocialFeedsSettings />
        {/* Live settings summary (no invented numbers) */}
        <FeedSummary />

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
                    onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
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
