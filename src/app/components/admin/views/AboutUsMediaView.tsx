import React from "react";
import { ViewContainer } from "../ViewContainer";
import { Youtube, Video, Save, RefreshCw, Eye, Play, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";

interface AboutUsMediaViewProps {
  aboutUsVideos?: {
    heroBackground?: string;
    heroBackgroundType?: 'image' | 'video' | 'youtube';
    smartManufacturing?: string;
    smartManufacturingType?: 'image' | 'video' | 'youtube';
    galleryVideos?: Array<{
      url: string;
      type: 'image' | 'video' | 'youtube';
      alt: string;
    }>;
  };
  onUpdateAboutUsVideos?: (videos: any) => void;
}

export function AboutUsMediaView({ aboutUsVideos = {}, onUpdateAboutUsVideos }: AboutUsMediaViewProps) {
  const [heroBackgroundUrl, setHeroBackgroundUrl] = React.useState(aboutUsVideos.heroBackground || '');
  const [heroBackgroundType, setHeroBackgroundType] = React.useState<'image' | 'video' | 'youtube'>(aboutUsVideos.heroBackgroundType || 'image');
  
  const [smartManufacturingUrl, setSmartManufacturingUrl] = React.useState(aboutUsVideos.smartManufacturing || '');
  const [smartManufacturingType, setSmartManufacturingType] = React.useState<'image' | 'video' | 'youtube'>(aboutUsVideos.smartManufacturingType || 'image');
  
  const [galleryVideos, setGalleryVideos] = React.useState(aboutUsVideos.galleryVideos || []);
  const [newGalleryUrl, setNewGalleryUrl] = React.useState('');
  const [newGalleryType, setNewGalleryType] = React.useState<'image' | 'video' | 'youtube'>('image');
  const [newGalleryAlt, setNewGalleryAlt] = React.useState('');

  const handleSave = () => {
    if (onUpdateAboutUsVideos) {
      onUpdateAboutUsVideos({
        heroBackground: heroBackgroundUrl,
        heroBackgroundType,
        smartManufacturing: smartManufacturingUrl,
        smartManufacturingType,
        galleryVideos
      });
      toast.success('About Us page media updated successfully');
    }
  };

  const handleAddGalleryItem = () => {
    if (!newGalleryUrl) {
      toast.error('Please enter a URL');
      return;
    }
    
    setGalleryVideos([...galleryVideos, {
      url: newGalleryUrl,
      type: newGalleryType,
      alt: newGalleryAlt || 'Gallery Item'
    }]);
    
    setNewGalleryUrl('');
    setNewGalleryAlt('');
    toast.success('Gallery item added');
  };

  const handleRemoveGalleryItem = (index: number) => {
    setGalleryVideos(galleryVideos.filter((_, i) => i !== index));
    toast.success('Gallery item removed');
  };

  const getYouTubeEmbed = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  return (
    <ViewContainer 
      title="About Us - Media Manager" 
      subtitle="Manage videos and images for About Us page"
      actions={
        <button 
          onClick={handleSave}
          className="px-5 py-2.5 bg-[#fabf37] text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(250,191,55,0.3)]"
        >
          <Save className="size-4" />
          <span>Save Changes</span>
        </button>
      }
    >
      <div className="space-y-8">
        {/* Hero Background Section */}
        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">Hero Background</h3>
              <p className="text-xs text-zinc-500 font-bold mt-1">Full-screen background video/image</p>
            </div>
            <div className="flex gap-2">
              {['image', 'video', 'youtube'].map((type) => (
                <button
                  key={type}
                  onClick={() => setHeroBackgroundType(type as any)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                    heroBackgroundType === type ? 'bg-[#fabf37] text-black' : 'bg-black border border-white/10 text-zinc-400'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              {heroBackgroundType === 'youtube' ? 'YouTube URL' : heroBackgroundType === 'video' ? 'Video URL (MP4, WebM)' : 'Image URL'}
            </label>
            <input
              type="url"
              value={heroBackgroundUrl}
              onChange={(e) => setHeroBackgroundUrl(e.target.value)}
              placeholder={heroBackgroundType === 'youtube' ? 'https://www.youtube.com/watch?v=...' : 'https://example.com/video.mp4'}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#fabf37]"
            />
          </div>

          {/* Preview */}
          {heroBackgroundUrl && (
            <div className="aspect-video bg-black rounded-xl overflow-hidden border border-white/5">
              {heroBackgroundType === 'youtube' && getYouTubeEmbed(heroBackgroundUrl) ? (
                <iframe
                  src={getYouTubeEmbed(heroBackgroundUrl) || ''}
                  className="w-full h-full"
                  allowFullScreen
                />
              ) : heroBackgroundType === 'video' ? (
                <video 
                  src={heroBackgroundUrl} 
                  controls 
                  className="w-full h-full object-cover"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                  suppressHydrationWarning
                />
              ) : (
                <img loading="lazy" decoding="async" src={heroBackgroundUrl} alt="Hero Background" className="w-full h-full object-cover" />
              )}
            </div>
          )}
        </div>

        {/* Smart Manufacturing Section */}
        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">Smart Manufacturing Media</h3>
              <p className="text-xs text-zinc-500 font-bold mt-1">Side showcase video/image</p>
            </div>
            <div className="flex gap-2">
              {['image', 'video', 'youtube'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSmartManufacturingType(type as any)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                    smartManufacturingType === type ? 'bg-[#fabf37] text-black' : 'bg-black border border-white/10 text-zinc-400'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              {smartManufacturingType === 'youtube' ? 'YouTube URL' : smartManufacturingType === 'video' ? 'Video URL (MP4, WebM)' : 'Image URL'}
            </label>
            <input
              type="url"
              value={smartManufacturingUrl}
              onChange={(e) => setSmartManufacturingUrl(e.target.value)}
              placeholder={smartManufacturingType === 'youtube' ? 'https://www.youtube.com/watch?v=...' : 'https://example.com/video.mp4'}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#fabf37]"
            />
          </div>

          {/* Preview */}
          {smartManufacturingUrl && (
            <div className="aspect-[4/5] bg-black rounded-xl overflow-hidden border border-white/5">
              {smartManufacturingType === 'youtube' && getYouTubeEmbed(smartManufacturingUrl) ? (
                <iframe
                  src={getYouTubeEmbed(smartManufacturingUrl) || ''}
                  className="w-full h-full"
                  allowFullScreen
                />
              ) : smartManufacturingType === 'video' ? (
                <video src={smartManufacturingUrl} controls className="w-full h-full object-cover" />
              ) : (
                <img loading="lazy" decoding="async" src={smartManufacturingUrl} alt="Smart Manufacturing" className="w-full h-full object-cover" />
              )}
            </div>
          )}
        </div>

        {/* Factory Floor Gallery Section */}
        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight">Factory Floor Gallery</h3>
            <p className="text-xs text-zinc-500 font-bold mt-1">Horizontal scrolling gallery items</p>
          </div>

          {/* Add New Gallery Item */}
          <div className="bg-black/50 border border-white/5 rounded-xl p-4 space-y-4">
            <div className="flex gap-2">
              {['image', 'video', 'youtube'].map((type) => (
                <button
                  key={type}
                  onClick={() => setNewGalleryType(type as any)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                    newGalleryType === type ? 'bg-[#fabf37] text-black' : 'bg-zinc-800 border border-white/10 text-zinc-400'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={newGalleryAlt}
              onChange={(e) => setNewGalleryAlt(e.target.value)}
              placeholder="Title/Alt text (e.g., Production Line)"
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#fabf37]"
            />

            <input
              type="url"
              value={newGalleryUrl}
              onChange={(e) => setNewGalleryUrl(e.target.value)}
              placeholder={newGalleryType === 'youtube' ? 'https://www.youtube.com/watch?v=...' : 'https://example.com/media.mp4'}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#fabf37]"
            />

            <button
              onClick={handleAddGalleryItem}
              className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all flex items-center justify-center gap-2"
            >
              <Play className="size-3" />
              Add to Gallery
            </button>
          </div>

          {/* Gallery Items List */}
          <div className="space-y-3">
            {galleryVideos.length === 0 ? (
              <div className="text-center py-8 text-zinc-500 text-sm font-bold">
                No gallery items yet. Add some above!
              </div>
            ) : (
              galleryVideos.map((item: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/50 border border-white/5 rounded-xl p-4 flex items-center gap-4"
                >
                  {/* Preview Thumbnail */}
                  <div className="size-20 bg-zinc-900 rounded-lg overflow-hidden border border-white/5 shrink-0">
                    {item.type === 'youtube' && getYouTubeEmbed(item.url) ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <Youtube className="size-6 text-red-500" />
                      </div>
                    ) : item.type === 'video' ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <Video className="size-6 text-blue-500" />
                      </div>
                    ) : (
                      <img loading="lazy" decoding="async" src={item.url} alt={item.alt} className="w-full h-full object-cover" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{item.alt}</p>
                    <p className="text-[10px] text-zinc-500 truncate">{item.url}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                      item.type === 'youtube' ? 'bg-red-500/20 text-red-500' :
                      item.type === 'video' ? 'bg-blue-500/20 text-blue-500' :
                      'bg-emerald-500/20 text-emerald-500'
                    }`}>
                      {item.type}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveGalleryItem(index)}
                    className="px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 text-[10px] font-black uppercase transition-all"
                  >
                    Remove
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3">
          <Eye className="size-5 text-blue-500 shrink-0 mt-0.5" />
          <div className="space-y-2 text-xs text-blue-400 leading-relaxed">
            <p className="font-black uppercase">Quick Guide:</p>
            <ul className="list-disc list-inside space-y-1 text-[11px]">
              <li><strong>Hero Background:</strong> Full-screen background (supports autoplay)</li>
              <li><strong>Smart Manufacturing:</strong> Right side showcase image/video</li>
              <li><strong>Gallery:</strong> Horizontal scrolling media items</li>
              <li><strong>YouTube:</strong> Paste full URL (e.g., youtube.com/watch?v=xxxxx)</li>
              <li><strong>Video:</strong> Direct MP4, WebM, MOV file URLs</li>
            </ul>
          </div>
        </div>
      </div>
    </ViewContainer>
  );
}

export default React.memo(AboutUsMediaView);