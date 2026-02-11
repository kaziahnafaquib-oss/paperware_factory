import { useEffect, useMemo, useState } from 'react';
import { ViewContainer } from "../ViewContainer";
import { Image as ImageIcon, Video, Upload, Trash2, Search, Filter, MoreHorizontal, Copy, Check, X, Eye, Share2, Download, Globe, Lock, Calendar, Mail, BarChart3, Settings, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Switch } from "../../ui/switch"; 

const initialMedia = [
  { 
    id: 1, 
    type: "image", 
    name: "hero-banner-v2.jpg", 
    url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f", 
    size: "1.2 MB", 
    date: "2h ago",
    dimensions: "1920x1080",
    stats: { views: 1240, downloads: 45, shares: 12 },
    settings: { public: true, allowDownload: true, expiration: "" }
  },
  { 
    id: 2, 
    type: "video", 
    name: "factory-tour-reel.mp4", 
    url: "https://cdn.pixabay.com/video/2019/04/16/22896-331593818_large.mp4", 
    size: "15.4 MB", 
    date: "1d ago",
    dimensions: "1080p",
    stats: { views: 850, downloads: 120, shares: 34 },
    settings: { public: true, allowDownload: false, expiration: "2024-12-31" }
  },
  { 
    id: 3, 
    type: "image", 
    name: "product-cup-eco.png", 
    url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e", 
    size: "2.8 MB", 
    date: "3d ago",
    dimensions: "1000x1000",
    stats: { views: 432, downloads: 89, shares: 5 },
    settings: { public: true, allowDownload: true, expiration: "" }
  },
  { 
    id: 4, 
    type: "image", 
    name: "team-meeting.jpg", 
    url: "https://images.unsplash.com/photo-1542838132-92c53300491e", 
    size: "3.1 MB", 
    date: "5d ago",
    dimensions: "2400x1600",
    stats: { views: 120, downloads: 2, shares: 0 },
    settings: { public: false, allowDownload: true, expiration: "" }
  },
  { 
    id: 5, 
    type: "video", 
    name: "logistics-drone.mp4", 
    url: "https://cdn.pixabay.com/video/2022/05/17/117185-710439975_large.mp4", 
    size: "28.2 MB", 
    date: "1w ago",
    dimensions: "4K",
    stats: { views: 2100, downloads: 340, shares: 156 },
    settings: { public: true, allowDownload: true, expiration: "" }
  },
  { 
    id: 6, 
    type: "image", 
    name: "warehouse-interior.jpg", 
    url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d", 
    size: "4.5 MB", 
    date: "1w ago",
    dimensions: "3000x2000",
    stats: { views: 56, downloads: 0, shares: 1 },
    settings: { public: false, allowDownload: false, expiration: "" }
  },
];

interface MediaManagerViewProps {
  products?: any[];
}

import { UploadMediaModal } from "../upload-media-modal";

export function MediaManagerView({ products = [] }: MediaManagerViewProps) {
  // Merge products into initial media if they exist
  const productMedia = useMemo(() => {
    return products.map((p, idx) => ({
      id: `prod-${p.id || idx}`,
      type: "image",
      name: p.name ? `${p.name.replace(/\s+/g, '-').toLowerCase()}.jpg` : `product-${idx}.jpg`,
      url: p.image || "",
      size: "2.5 MB",
      date: "Catalog Asset",
      dimensions: "Unknown",
      isProduct: true,
      stats: { views: 0, downloads: 0, shares: 0 },
      settings: { public: true, allowDownload: true, expiration: "" }
    }));
  }, [products]);

  const [media, setMedia] = useState([...initialMedia, ...productMedia]);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [filter, setFilter] = useState("All");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Update media when productMedia changes (initial load or updates)
  useEffect(() => {
     setMedia(prev => {
        // Keep user uploads (ids are numbers) and replace old product media (ids start with 'prod-')
        const userUploads = prev.filter(m => typeof m.id === 'number');
        return [...userUploads, ...productMedia];
     });
  }, [productMedia]);

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleModalUpload = (files: File[]) => {
    const newMediaItems = files.map(file => ({
      id: Date.now() + Math.random(),
      type: file.type.startsWith("video") ? "video" : "image",
      name: file.name,
      url: URL.createObjectURL(file),
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      date: "Just now",
      dimensions: "Original",
      stats: { views: 0, downloads: 0, shares: 0 },
      settings: { public: true, allowDownload: true, expiration: "" }
    }));
    
    setMedia(prev => [...newMediaItems, ...prev]);
    toast.success(`${files.length} Asset${files.length > 1 ? 's' : ''} Uploaded Successfully`);
  };

  const handleDelete = (id: any) => {
    if (confirm("Are you sure you want to delete this file?")) {
        setMedia(prev => prev.filter(m => m.id !== id));
        if (selectedMedia?.id === id) setSelectedMedia(null);
        toast.success("File Deleted");
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL Copied", { icon: <Check className="size-4 text-green-500" /> });
  };

  const filteredMedia = media.filter(m => {
      if (filter === "All") return true;
      if (filter === "Images") return m.type === "image";
      if (filter === "Videos") return m.type === "video";
      if (filter === "Product Catalog") return (m as any).isProduct;
      return true;
  });

  return (
    <ViewContainer 
      title="Media Manager" 
      subtitle="Centralized Digital Asset Library"
      actions={
        <button 
          onClick={handleUploadClick}
          className="px-5 py-2.5 bg-[#fabf37] text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(250,191,55,0.3)]"
        >
          <Upload className="size-4" />
          <span>Upload Asset</span>
        </button>
      }
    >
      <UploadMediaModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleModalUpload}
      />
      
      <div className="flex gap-6 h-[calc(100vh-200px)]">
         {/* Main Grid Area */}
         <div className="flex-1 flex flex-col gap-6 overflow-hidden">
             {/* Toolbar */}
             <div className="bg-zinc-900/50 border border-white/5 p-4 rounded-2xl flex flex-col sm:flex-row gap-4 justify-between items-center shrink-0">
                 <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                    <input 
                       type="text" 
                       placeholder="Search files..." 
                       className="w-full sm:w-64 bg-black border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#fabf37]"
                    />
                 </div>
                 <div className="flex gap-2 overflow-x-auto w-full sm:w-auto">
                    {["All", "Images", "Videos", "Product Catalog"].map((f) => (
                       <button
                          key={f}
                          onClick={() => setFilter(f)}
                          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors whitespace-nowrap ${
                             filter === f ? "bg-white text-black" : "bg-black border border-white/10 text-zinc-400 hover:text-white"
                          }`}
                       >
                          {f}
                       </button>
                    ))}
                 </div>
             </div>

             {/* Grid */}
             <div className="flex-1 overflow-y-auto pr-2 pb-20">
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                   <AnimatePresence>
                      {filteredMedia.map((item) => (
                         <motion.div 
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={() => setSelectedMedia(item)}
                            className={`group relative bg-black border rounded-3xl overflow-hidden aspect-square cursor-pointer transition-all ${
                               selectedMedia?.id === item.id ? 'border-[#fabf37] ring-1 ring-[#fabf37]' : 'border-white/5 hover:border-[#fabf37]/50'
                            }`}
                         >
                            {/* Media Preview */}
                            <div className="w-full h-full">
                               {item.type === "video" ? (
                                  <video 
                                    src={item.url} 
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" 
                                    muted 
                                    loop 
                                    onMouseOver={e => e.currentTarget.play()} 
                                    onMouseOut={e => e.currentTarget.pause()}
                                    onError={(e) => e.currentTarget.style.display = 'none'}
                                    suppressHydrationWarning
                                  />
                               ) : (
                                  <img src={item.url} alt={item.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                               )}
                            </div>
                            
                            {/* Overlay info */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                               <div className="flex items-center justify-between">
                                  <div>
                                     <p className="text-xs font-bold text-white truncate max-w-[120px]" title={item.name}>{item.name}</p>
                                     <p className="text-[10px] text-zinc-500">{item.size}</p>
                                  </div>
                               </div>
                            </div>

                            {/* Type Badge */}
                            <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-bold text-white uppercase flex items-center gap-1.5">
                               {item.type === "video" ? <Video className="size-3 text-[#fabf37]" /> : <ImageIcon className="size-3 text-blue-500" />}
                            </div>
                         </motion.div>
                      ))}
                   </AnimatePresence>
                </div>
             </div>
         </div>

         {/* Right Sidebar: Details & Control Center */}
         <AnimatePresence>
            {selectedMedia && (
               <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 320, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="bg-black border border-white/10 rounded-[32px] overflow-hidden flex flex-col shrink-0 h-full"
               >
                  <div className="p-6 overflow-y-auto h-full space-y-8">
                     {/* Header */}
                     <div className="flex items-start justify-between">
                        <h3 className="text-lg font-black text-white uppercase tracking-tight break-all max-w-[200px]">{selectedMedia.name}</h3>
                        <button onClick={() => setSelectedMedia(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                           <X className="size-4 text-zinc-400" />
                        </button>
                     </div>

                     {/* Preview */}
                     <div className="aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-white/5">
                        {selectedMedia.type === 'video' ? (
                           <video 
                             src={selectedMedia.url} 
                             controls 
                             className="w-full h-full object-contain"
                             onError={(e) => e.currentTarget.style.display = 'none'}
                             suppressHydrationWarning
                           />
                        ) : (
                           <img src={selectedMedia.url} alt={selectedMedia.name} className="w-full h-full object-contain" />
                        )}
                     </div>

                     {/* Engagement Stats */}
                     <div className="space-y-4">
                        <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                           <BarChart3 className="size-3" /> Engagement
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                           <div className="bg-zinc-900/50 p-3 rounded-xl border border-white/5 text-center">
                              <Eye className="size-4 text-blue-500 mx-auto mb-2" />
                              <p className="text-sm font-black text-white">{selectedMedia.stats.views}</p>
                              <p className="text-[9px] text-zinc-500 uppercase">Views</p>
                           </div>
                           <div className="bg-zinc-900/50 p-3 rounded-xl border border-white/5 text-center">
                              <Download className="size-4 text-emerald-500 mx-auto mb-2" />
                              <p className="text-sm font-black text-white">{selectedMedia.stats.downloads}</p>
                              <p className="text-[9px] text-zinc-500 uppercase">Downloads</p>
                           </div>
                           <div className="bg-zinc-900/50 p-3 rounded-xl border border-white/5 text-center">
                              <Share2 className="size-4 text-[#fabf37] mx-auto mb-2" />
                              <p className="text-sm font-black text-white">{selectedMedia.stats.shares}</p>
                              <p className="text-[9px] text-zinc-500 uppercase">Shares</p>
                           </div>
                        </div>
                     </div>

                     {/* Control Center */}
                     <div className="space-y-4">
                        <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                           <Settings className="size-3" /> Control Center
                        </h4>
                        
                        <div className="bg-zinc-900/30 rounded-2xl p-4 border border-white/5 space-y-4">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <Globe className="size-4 text-zinc-400" />
                                 <div>
                                    <p className="text-xs font-bold text-white">Public Access</p>
                                    <p className="text-[9px] text-zinc-500">Visible via direct link</p>
                                 </div>
                              </div>
                              <Switch 
                                 checked={selectedMedia.settings.public} 
                                 onCheckedChange={() => {
                                     setSelectedMedia({...selectedMedia, settings: {...selectedMedia.settings, public: !selectedMedia.settings.public}});
                                     toast.success("Visibility Updated");
                                 }} 
                              />
                           </div>
                           <div className="w-full h-px bg-white/5" />
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <Download className="size-4 text-zinc-400" />
                                 <div>
                                    <p className="text-xs font-bold text-white">Allow Download</p>
                                    <p className="text-[9px] text-zinc-500">Users can save original</p>
                                 </div>
                              </div>
                              <Switch 
                                 checked={selectedMedia.settings.allowDownload} 
                                 onCheckedChange={() => {
                                     setSelectedMedia({...selectedMedia, settings: {...selectedMedia.settings, allowDownload: !selectedMedia.settings.allowDownload}});
                                     toast.success("Permissions Updated");
                                 }} 
                              />
                           </div>
                           <div className="w-full h-px bg-white/5" />
                           <div className="space-y-2">
                               <div className="flex items-center gap-2 mb-1">
                                   <Calendar className="size-3 text-zinc-400" />
                                   <label className="text-[10px] font-bold text-zinc-400 uppercase">Expiration Date</label>
                               </div>
                               <input 
                                   type="date" 
                                   value={selectedMedia.settings.expiration} 
                                   onChange={(e) => setSelectedMedia({...selectedMedia, settings: {...selectedMedia.settings, expiration: e.target.value}})}
                                   className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-[#fabf37] outline-none" 
                               />
                           </div>
                        </div>
                     </div>

                     {/* Actions */}
                     <div className="grid grid-cols-2 gap-3 pt-4">
                        <button 
                           onClick={() => copyToClipboard(selectedMedia.url)}
                           className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                           <Copy className="size-3" /> Copy Link
                        </button>
                        <button 
                           onClick={() => toast.success("Asset sent via Email")}
                           className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                           <Mail className="size-3" /> Email
                        </button>
                        <button 
                           onClick={() => handleDelete(selectedMedia.id)}
                           className="col-span-2 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                           <Trash2 className="size-3" /> Delete Asset
                        </button>
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
    </ViewContainer>
  );
}