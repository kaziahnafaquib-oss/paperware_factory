import React, { useState, useEffect } from 'react';
import { Upload, FileText, Check, AlertCircle, Loader2, Link as LinkIcon, Trash2, Leaf, Clock, Video, Play, X } from "lucide-react";
import { toast } from 'sonner';
import { motion } from "motion/react";
import { ViewContainer } from "../ViewContainer";
import { projectId, publicAnonKey } from "../../../../../utils/supabase/info";
import { supabase } from "../../../lib/supabaseClient";

export default function SustainabilityView() {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [recentVideos, setRecentVideos] = useState<any[]>([]);

  useEffect(() => {
    fetchVideoUrl();
    fetchRecentVideos();
  }, []);

  const fetchRecentVideos = async () => {
    const { data } = await supabase.storage.from('videos').list('', {
      limit: 4,
      sortBy: { column: 'created_at', order: 'desc' }
    });
    if (data) setRecentVideos(data.filter(f => f.name !== '.emptyFolderPlaceholder'));
  };

  const handleSelectVideo = async (fileName: string) => {
    const toastId = toast.loading("Updating active video...");
    setUploadStatus("idle");
    const { data: { publicUrl } } = supabase.storage.from('videos').getPublicUrl(fileName);

    // Save to KV
    try {
      await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-bf34c9a5/sustainability/hero-video`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ url: publicUrl }),
      });
      setVideoUrl(publicUrl);
      setUploadStatus("success");
      toast.success("Video updated successfully", { id: toastId });
    } catch (e) {
      console.error(e);
      setUploadStatus("error");
      toast.error("Failed to update video", { id: toastId });
    }
  };

  const fetchVideoUrl = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-bf34c9a5/sustainability/hero-video`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.url) setVideoUrl(data.url);
      }
    } catch (error) {
      console.error("Failed to fetch video URL", error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus("idle");

    try {
      // 1. Get Signed Upload Token from Server (Bypass RLS)
      const fileExt = file.name.split('.').pop();
      const fileName = `hero-video-${Date.now()}.${fileExt}`;

      const tokenResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-bf34c9a5/storage/upload-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ bucket: 'videos', path: fileName }),
      });

      const tokenData = await tokenResponse.json();
      if (!tokenData.success) throw new Error(tokenData.error || "Failed to get upload authorization");

      // 2. Upload using Signed Token
      const { data, error } = await supabase.storage
        .from('videos')
        .uploadToSignedUrl(fileName, tokenData.token, file);

      if (error) throw error;

      // 3. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);

      // 4. Save URL to KV Store via Server
      const saveResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-bf34c9a5/sustainability/hero-video`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ url: publicUrl }),
      });

      if (!saveResponse.ok) throw new Error("Failed to save video URL");

      setVideoUrl(publicUrl);
      setUploadStatus("success");
      fetchRecentVideos(); // Refresh list
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ViewContainer title="Sustainability Metrics" subtitle="ESG Tracking & Environmental Impact">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Video Upload Section */}
          <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-10 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Hero Media</h3>
              {uploadStatus === "success" && <span className="text-emerald-500 flex items-center gap-2 text-xs font-bold uppercase"><Check className="size-4" /> Updated</span>}
            </div>

            <div className="relative group overflow-hidden rounded-2xl bg-black aspect-video border border-white/10 flex items-center justify-center">
              {videoUrl ? (
                (() => {
                  const isYoutube = videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");
                  const isImage = videoUrl.match(/\.(jpeg|jpg|gif|png|webp|svg|bmp|tiff)$/i);

                  if (isYoutube) {
                    // Extract video ID more robustly
                    let videoId = null;
                    const cleanUrl = videoUrl.replace(/['"]/g, '').trim();

                    // 1. Try to find ID from URL
                    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|live\/)([^#&?]*).*/;
                    const match = cleanUrl.match(regExp);
                    if (match && match[2]) {
                      const idMatch = match[2].match(/^[a-zA-Z0-9_-]{11}/);
                      if (idMatch) {
                        videoId = idMatch[0];
                      } else if (match[2].length === 11) {
                        videoId = match[2];
                      }
                    }

                    // 2. Fallback: Raw ID
                    if (!videoId) {
                      const rawIdMatch = cleanUrl.match(/^[a-zA-Z0-9_-]{11}$/);
                      if (rawIdMatch) videoId = rawIdMatch[0];
                    }

                    if (videoId) {
                      return (
                        <div className="w-full h-full">
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&enablejsapi=1&modestbranding=1&start=0&disablekb=1&fs=0`}
                            className="w-full h-full object-cover"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            title="YouTube video player"
                            loading="eager"
                            style={{ border: 0 }}
                          />
                        </div>
                      );
                    }
                  }
                  if (isImage) {
                    return <img loading="lazy" decoding="async" src={videoUrl} className="w-full h-full object-cover opacity-80" alt="Hero Background" />;
                  }
                  return (
                    <video
                      src={videoUrl}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                      muted
                      loop
                      autoPlay
                      playsInline
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                      suppressHydrationWarning
                    />
                  );
                })()
              ) : (
                <div className="text-zinc-500 flex flex-col items-center gap-2">
                  <Video className="size-8" />
                  <span className="text-xs font-bold uppercase tracking-widest">No Media Set</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Option 1: File Upload */}
              <label className="cursor-pointer bg-zinc-800/50 hover:bg-zinc-800 text-white p-4 rounded-xl border border-white/5 hover:border-[#fabf37]/50 flex flex-col items-center justify-center gap-3 transition-all group/up h-full">
                {isUploading ? <Loader2 className="size-6 animate-spin text-[#fabf37]" /> : <Upload className="size-6 text-zinc-400 group-hover/up:text-[#fabf37] transition-colors" />}
                <div className="text-center">
                  <span className="block text-[10px] font-black uppercase tracking-widest mb-1">{isUploading ? "Uploading..." : "Upload File"}</span>
                  <span className="block text-[9px] text-zinc-500">All Video & Image Formats<br />Max 500MB</span>
                </div>
                <input
                  type="file"
                  accept="video/*,image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
              </label>

              {/* Option 2: YouTube Embed */}
              <div className="bg-zinc-800/50 p-4 rounded-xl border border-white/5 hover:border-[#fabf37]/50 transition-colors h-full flex flex-col gap-3">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Video className="size-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">YouTube Embed</span>
                </div>
                <input
                  type="text"
                  placeholder="Paste YouTube Link & Enter"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-[10px] text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#fabf37] transition-colors"
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.currentTarget;
                      let url = input.value;
                      if (!url) return;

                      // Handle iframe code paste
                      if (url.includes("<iframe") && url.includes("src=")) {
                        const srcMatch = url.match(/src=["'](.*?)["']/);
                        if (srcMatch && srcMatch[1]) {
                          url = srcMatch[1];
                          toast.success("Extracted URL from embed code");
                        }
                      }

                      // Handle Shorts
                      if (url.includes("youtube.com/shorts/")) {
                        url = url.replace("youtube.com/shorts/", "youtube.com/watch?v=");
                      }

                      const toastId = toast.loading("Embedding YouTube video...");
                      try {
                        await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-bf34c9a5/sustainability/hero-video`, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${publicAnonKey}`,
                          },
                          body: JSON.stringify({ url }),
                        });
                        setVideoUrl(url);
                        setUploadStatus("success");
                        toast.success("YouTube video set!", { id: toastId });
                        input.value = "";
                      } catch (err) {
                        console.error(err);
                        toast.error("Failed to set video", { id: toastId });
                      }
                    }
                  }}
                />
                <div className="flex items-center gap-1.5 text-[9px] text-zinc-500">
                  <Clock className="size-3" />
                  <span>Auto-embeds on enter</span>
                </div>
              </div>
            </div>

            {/* Recent Videos List */}
            {recentVideos.length > 0 && (
              <div className="pt-6 border-t border-white/5">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Recent Uploads</p>
                <div className="grid grid-cols-2 gap-4">
                  {recentVideos.slice(0, 2).map((vid) => (
                    <button
                      key={vid.id}
                      onClick={() => handleSelectVideo(vid.name)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-black border border-white/10 hover:border-[#fabf37] transition-all text-left group/vid w-full"
                    >
                      <div className="size-10 rounded-lg bg-zinc-900 flex items-center justify-center shrink-0">
                        <Play className="size-4 text-zinc-500 group-hover/vid:text-[#fabf37]" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[10px] font-bold text-white truncate w-full group-hover/vid:text-[#fabf37] transition-colors">
                          {vid.name}
                        </p>
                        <div className="flex items-center gap-1 text-[9px] text-zinc-600 mt-0.5">
                          <Clock className="size-3" />
                          <span>{new Date(vid.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-10 space-y-8">
            <h3 className="text-xl font-black text-white uppercase tracking-tight">Carbon Footprint Analysis</h3>
            <div className="space-y-6">
              {[
                { label: "Manufacturing Scope 1", val: 45, max: 100 },
                { label: "Logistics Scope 2", val: 72, max: 100 },
                { label: "Supply Chain Scope 3", val: 28, max: 100 },
              ].map((s, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black text-zinc-400 uppercase">
                    <span>{s.label}</span>
                    <span className="text-[#fabf37]">{s.val} tons</span>
                  </div>
                  <div className="w-full h-1 bg-black rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${s.val}%` }} className="h-full bg-emerald-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-[40px] p-10 flex flex-col items-center justify-center text-center space-y-6">
          <Leaf className="size-16 text-emerald-500" />
          <h4 className="text-2xl font-black text-white uppercase tracking-tight">Global Impact Score: 92/100</h4>
          <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest leading-relaxed">Your manufacturing facility is operating at 92% eco-efficiency. <br /> Keep up the green transition!</p>
          <button className="px-10 py-4 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl">Download ESG Report</button>
        </div>
      </div>
    </ViewContainer>
  );
}