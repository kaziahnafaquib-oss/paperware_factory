import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Link as LinkIcon, Settings, Users, Video, Plus, Trash2, Image as ImageIcon } from "lucide-react";

interface VideoData {
  url: string;
  title: string;
  highlight: string;
  subtitle: string;
}

export interface Partner {
  id: string;
  name: string;
  category: string;
  logo: string;
  description: string;
  isFeatured?: boolean;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  videoData: VideoData[];
  onUpdateVideos: (data: VideoData[]) => void;
  heroVideoUrl?: string;
  onUpdateHeroVideo?: (url: string) => void;
  partnersData?: Partner[];
  onUpdatePartners?: (data: Partner[]) => void;
  signingImage?: string;
  onUpdateSigningImage?: (url: string) => void;
}

export function AdminPanel({
  isOpen,
  onClose,
  videoData,
  onUpdateVideos,
  heroVideoUrl,
  onUpdateHeroVideo,
  partnersData = [],
  onUpdatePartners,
  signingImage,
  onUpdateSigningImage
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'studio' | 'partners'>('studio');

  // Video State
  const [data, setData] = useState<VideoData[]>(videoData);
  const [currentHeroVideo, setCurrentHeroVideo] = useState(heroVideoUrl || "");
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("PAPERWARE FACTORY KEEPS");
  const [newHighlight, setNewHighlight] = useState("ECO-FRIENDLINESS");
  const [newSubtitle, setNewSubtitle] = useState("AT THE TIP OF YOUR FINGERS!");

  // Partners State
  const [pData, setPData] = useState<Partner[]>(partnersData);
  const [currentSigningImage, setCurrentSigningImage] = useState(signingImage || "");
  const [newPartnerName, setNewPartnerName] = useState("");
  const [newPartnerCategory, setNewPartnerCategory] = useState("Raw Material Supplier");
  const [newPartnerLogo, setNewPartnerLogo] = useState("");
  const [newPartnerDesc, setNewPartnerDesc] = useState("");

  // Sync state when props change
  useEffect(() => {
    setData(videoData);
    if (heroVideoUrl) setCurrentHeroVideo(heroVideoUrl);
  }, [videoData, heroVideoUrl]);

  useEffect(() => {
    setPData(partnersData);
    if (signingImage) setCurrentSigningImage(signingImage);
  }, [partnersData, signingImage]);

  // Video Handlers
  const handleAddVideo = () => {
    if (newUrl.trim()) {
      setData([...data, {
        url: newUrl.trim(),
        title: newTitle.trim(),
        highlight: newHighlight.trim(),
        subtitle: newSubtitle.trim()
      }]);
      setNewUrl("");
    }
  };

  const handleRemoveVideo = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  // Partner Handlers
  const handleAddPartner = () => {
    if (newPartnerName.trim()) {
      setPData([...pData, {
        id: Date.now().toString(),
        name: newPartnerName.trim(),
        category: newPartnerCategory.trim(),
        logo: newPartnerLogo.trim() || "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&h=300&fit=crop",
        description: newPartnerDesc.trim() || "Valued Partner",
        isFeatured: false
      }]);
      setNewPartnerName("");
      setNewPartnerLogo("");
      setNewPartnerDesc("");
    }
  };

  const handleRemovePartner = (id: string) => {
    setPData(pData.filter(p => p.id !== id));
  };

  const handleToggleFeatured = (id: string) => {
    setPData(pData.map(p => p.id === id ? { ...p, isFeatured: !p.isFeatured } : p));
  };

  const handleSave = () => {
    onUpdateVideos(data);
    if (onUpdateHeroVideo) onUpdateHeroVideo(currentHeroVideo);
    if (onUpdatePartners) onUpdatePartners(pData);
    if (onUpdateSigningImage) onUpdateSigningImage(currentSigningImage);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl h-[85vh] flex flex-col overflow-hidden rounded-[40px] bg-zinc-900 shadow-2xl border border-white/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-white/5 bg-zinc-900 z-10">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-[#fabf37] flex items-center justify-center text-black">
                  <Settings className="size-5" />
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Admin Console</h3>
              </div>
              <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                <X className="size-6" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex px-8 border-b border-white/5">
              <button
                onClick={() => setActiveTab('studio')}
                className={`py-4 mr-6 text-xs font-black uppercase tracking-widest transition-colors relative ${activeTab === 'studio' ? 'text-[#fabf37]' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <span className="flex items-center gap-2"><Video className="size-4" /> Studio & Video</span>
                {activeTab === 'studio' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#fabf37]" />}
              </button>
              <button
                onClick={() => setActiveTab('partners')}
                className={`py-4 text-xs font-black uppercase tracking-widest transition-colors relative ${activeTab === 'partners' ? 'text-[#fabf37]' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <span className="flex items-center gap-2"><Users className="size-4" /> Partners & Logos</span>
                {activeTab === 'partners' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#fabf37]" />}
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">

              {activeTab === 'studio' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Hero Video Section */}
                  <div className="space-y-4 p-6 bg-black/50 rounded-3xl border border-white/5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#fabf37]">Hero Section Video</label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 bg-zinc-800 border border-white/5 rounded-xl px-4 py-3">
                        <Upload className="size-4 text-zinc-500" />
                        <input
                          type="text"
                          value={currentHeroVideo}
                          onChange={(e) => setCurrentHeroVideo(e.target.value)}
                          placeholder="Hero Video URL (MP4)..."
                          className="w-full bg-transparent text-white text-sm outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 p-6 bg-black/50 rounded-3xl border border-white/5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#fabf37]">Add New Studio Slide</label>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                        placeholder="Video MP4 URL..."
                        className="w-full bg-zinc-800 border border-white/5 rounded-xl py-3 px-4 text-white text-sm outline-none"
                      />
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Title (e.g. PAPERWARE FACTORY)"
                        className="w-full bg-zinc-800 border border-white/5 rounded-xl py-3 px-4 text-white text-sm outline-none"
                      />
                      <input
                        type="text"
                        value={newHighlight}
                        onChange={(e) => setNewHighlight(e.target.value)}
                        placeholder="Highlight (Yellow Text)"
                        className="w-full bg-zinc-800 border border-white/5 rounded-xl py-3 px-4 text-white text-sm outline-none"
                      />
                      <input
                        type="text"
                        value={newSubtitle}
                        onChange={(e) => setNewSubtitle(e.target.value)}
                        placeholder="Subtitle (Bottom part)"
                        className="w-full bg-zinc-800 border border-white/5 rounded-xl py-3 px-4 text-white text-sm outline-none"
                      />
                      <button
                        onClick={handleAddVideo}
                        className="w-full bg-white/10 hover:bg-[#fabf37] hover:text-black text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all"
                      >
                        Add to Timeline
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Active Timeline</label>
                    {data.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-black/30 rounded-2xl border border-white/5">
                        <div className="flex flex-col gap-1 overflow-hidden">
                          <span className="text-[10px] font-black text-[#fabf37] uppercase tracking-tighter">{item.title}</span>
                          <span className="text-xs text-zinc-400 truncate max-w-[200px]">{item.url}</span>
                        </div>
                        <button onClick={() => handleRemoveVideo(index)} className="text-zinc-600 hover:text-red-500 transition-colors p-2">
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'partners' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Signing Image Section */}
                  <div className="space-y-4 p-6 bg-black/50 rounded-3xl border border-white/5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#fabf37]">Signing Ceremony Image</label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 bg-zinc-800 border border-white/5 rounded-xl px-4 py-3">
                        <ImageIcon className="size-4 text-zinc-500" />
                        <input
                          type="text"
                          value={currentSigningImage}
                          onChange={(e) => setCurrentSigningImage(e.target.value)}
                          placeholder="Image URL..."
                          className="w-full bg-transparent text-white text-sm outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 p-6 bg-black/50 rounded-3xl border border-white/5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#fabf37]">Add New Partner</label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={newPartnerName}
                        onChange={(e) => setNewPartnerName(e.target.value)}
                        placeholder="Partner Name..."
                        className="col-span-2 md:col-span-1 bg-zinc-800 border border-white/5 rounded-xl py-3 px-4 text-white text-sm outline-none"
                      />
                      <select
                        value={newPartnerCategory}
                        onChange={(e) => setNewPartnerCategory(e.target.value)}
                        className="col-span-2 md:col-span-1 bg-zinc-800 border border-white/5 rounded-xl py-3 px-4 text-white text-sm outline-none appearance-none"
                      >
                        <option>Raw Material Supplier</option>
                        <option>Chemical Partner</option>
                        <option>Delivery Partner</option>
                        <option>Telco Partner</option>
                        <option>Internet Partner</option>
                        <option>Digital Partner</option>
                        <option>ERP Partner</option>
                        <option>Website Partner</option>
                        <option>Strategic Partner</option>
                      </select>
                      <input
                        type="text"
                        value={newPartnerLogo}
                        onChange={(e) => setNewPartnerLogo(e.target.value)}
                        placeholder="Logo Image URL..."
                        className="col-span-2 bg-zinc-800 border border-white/5 rounded-xl py-3 px-4 text-white text-sm outline-none"
                      />
                      <input
                        type="text"
                        value={newPartnerDesc}
                        onChange={(e) => setNewPartnerDesc(e.target.value)}
                        placeholder="Short Description..."
                        className="col-span-2 bg-zinc-800 border border-white/5 rounded-xl py-3 px-4 text-white text-sm outline-none"
                      />
                    </div>
                    <button
                      onClick={handleAddPartner}
                      className="w-full bg-white/10 hover:bg-[#fabf37] hover:text-black text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                      <Plus className="size-4" /> Add Partner
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Partner Ecosystem</label>
                    {pData.map((partner) => (
                      <div key={partner.id} className="flex items-center justify-between p-4 bg-black/30 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-lg bg-zinc-800 overflow-hidden flex items-center justify-center">
                            {partner.logo ? <img src={partner.logo} className="w-full h-full object-cover" alt="" /> : <span className="text-xs font-bold text-white">{partner.name[0]}</span>}
                          </div>
                          <div className="flex flex-col gap-0.5 overflow-hidden">
                            <span className="text-[10px] font-black text-white uppercase tracking-tighter">{partner.name}</span>
                            <span className="text-[9px] text-[#fabf37] uppercase">{partner.category}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleFeatured(partner.id)}
                            className={`p-2 transition-colors ${partner.isFeatured ? 'text-[#fabf37]' : 'text-zinc-600 hover:text-zinc-400'}`}
                            title={partner.isFeatured ? "Remove from Marquee" : "Add to Marquee"}
                          >
                            <Plus className={`size-4 ${partner.isFeatured ? 'rotate-45 text-[#fabf37]' : ''} transition-transform`} />
                          </button>
                          <button onClick={() => handleRemovePartner(partner.id)} className="text-zinc-600 hover:text-red-500 transition-colors p-2">
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="p-8 border-t border-white/5 bg-zinc-900 z-10">
              <button
                onClick={handleSave}
                className="w-full bg-[#fabf37] text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.01] active:scale-[0.99] transition-all shadow-[0_10px_30px_rgba(250,191,55,0.15)]"
              >
                Save Changes & Sync
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
