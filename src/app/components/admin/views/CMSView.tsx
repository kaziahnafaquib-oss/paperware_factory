import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  ChevronRight,
  Monitor,
  Camera,
  Sparkles,
  Pencil as Edit,
  RefreshCw,
  CircleCheck,
  AlertTriangle,
  Plus,
  Trash2,
  Link,
  Activity,
  TrendingUp,
  Box,
  Users,
  Play,
  Star,
  Zap,
  FileText,
  Upload,
  Loader2,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ViewContainer } from "../ViewContainer";
import { supabase } from "../../../lib/supabaseClient";

interface CMSViewProps {
  heroVideoUrl?: string;
  heroVideoMobileUrl?: string;
  onUpdateHeroVideo?: (url: string) => void;
  onUpdateHeroVideoMobile?: (url: string) => void;
  clientsVideoUrl?: string;
  onUpdateClientsVideo?: (url: string) => void;
  clients?: any[];
  onUpdateClients?: (clients: any[]) => void;
  heroContent?: {
    title: string;
    subtitle1: string;
    subtitle2: string;
    titleSize?: string;
    titleFont?: string;
    subtitle1Size?: string;
    subtitle1Font?: string;
    subtitle2Size?: string;
    subtitle2Font?: string;
  };
  onUpdateHeroContent?: (content: any) => void;
  products?: any[];
  onUpdateProducts?: (products: any[]) => void;
  testimonials?: any[];
  onUpdateTestimonials?: (testimonials: any[]) => void;
  impactStats?: any[];
  onUpdateImpactStats?: (stats: any[]) => void;
  productionStats?: any;
  onUpdateProductionStats?: (stats: any) => void;
  careers?: any[];
  onUpdateCareers?: (careers: any[]) => void;
  clientProjects?: any[];
  onUpdateClientProjects?: (projects: any[]) => void;
  partners?: any[];
  onUpdatePartners?: (partners: any[]) => void;
  teamMembers?: any[];
  onUpdateTeamMembers?: (members: any[]) => void;
  brochureUrl?: string;
  onUpdateBrochure?: (url: string) => void;
  teamSectionContent?: any;
  onUpdateTeamSectionContent?: (content: any) => void;
  defaultCategory?: string | null;
}

export default function CMSView({
  heroVideoUrl,
  heroVideoMobileUrl,
  onUpdateHeroVideo,
  onUpdateHeroVideoMobile,
  clientsVideoUrl,
  onUpdateClientsVideo,
  heroContent,
  onUpdateHeroContent,
  products = [],
  onUpdateProducts,
  testimonials = [],
  onUpdateTestimonials,
  impactStats = [],
  onUpdateImpactStats,
  productionStats,
  onUpdateProductionStats,
  careers = [],
  onUpdateCareers,
  clientProjects = [],
  onUpdateClientProjects,
  partners = [],
  onUpdatePartners,
  teamMembers = [],
  onUpdateTeamMembers,
  teamSectionContent,
  onUpdateTeamSectionContent,
  clients = [],
  onUpdateClients,
  brochureUrl,
  onUpdateBrochure,
  defaultCategory = null
}: CMSViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(defaultCategory);
  const [screenSize, setScreenSize] = useState({ w: 1920, h: 1080 });
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<any>(null);
  const [isAddPartnerOpen, setIsAddPartnerOpen] = useState(false);
  const [editingTeamMember, setEditingTeamMember] = useState<any>(null);
  const [isVideoLive, setIsVideoLive] = useState(true);
  const [videoInput, setVideoInput] = useState(heroVideoUrl || "");
  const [videoMobileInput, setVideoMobileInput] = useState(heroVideoMobileUrl || "");
  const [brochureInput, setBrochureInput] = useState(brochureUrl || "");
  const [heroTitle, setHeroTitle] = useState(heroContent?.title || "");
  const [heroSub1, setHeroSub1] = useState(heroContent?.subtitle1 || "");
  const [heroSub2, setHeroSub2] = useState(heroContent?.subtitle2 || "");
  const [heroTitleSize, setHeroTitleSize] = useState(heroContent?.titleSize || "");
  const [heroTitleFont, setHeroTitleFont] = useState(heroContent?.titleFont || "Poppins");
  const [heroSub1Size, setHeroSub1Size] = useState(heroContent?.subtitle1Size || "");
  const [heroSub1Font, setHeroSub1Font] = useState(heroContent?.subtitle1Font || "Poppins");
  const [heroSub2Size, setHeroSub2Size] = useState(heroContent?.subtitle2Size || "");
  const [heroSub2Font, setHeroSub2Font] = useState(heroContent?.subtitle2Font || "Poppins");
  const [loadError, setLoadError] = useState(false);
  const isInternalChange = useRef(false);
  const [pageVideoInput, setPageVideoInput] = useState(clientsVideoUrl || "");
  const prevVideoRef = useRef(clientsVideoUrl || "");
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroDesktopRef = useRef<HTMLVideoElement>(null);
  const heroMobileRef = useRef<HTMLVideoElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const PRESETS = [
    { label: "Preset 1", url: "" },
    { label: "Preset 2", url: "" },
    { label: "Preset 3", url: "" }
  ];

  const handleApplyPreset = (url: string) => {
    setVideoInput(url);
    isInternalChange.current = true;
    toast.success("Video Preset Applied");
  };

  const FONT_OPTIONS = [
    { label: "Poppins (Default)", value: "Poppins" },
    { label: "Inter", value: "Inter" },
    { label: "Roboto", value: "Roboto" },
    { label: "Open Sans", value: "Open Sans" },
    { label: "Montserrat", value: "Montserrat" },
    { label: "Lato", value: "Lato" },
    { label: "Playfair Display", value: "Playfair Display" },
    { label: "Merriweather", value: "Merriweather" },
    { label: "--- Bengali Fonts ---", value: "disabled", disabled: true },
    { label: "Hind Siliguri", value: "Hind Siliguri" },
    { label: "Noto Sans Bengali", value: "Noto Sans Bengali" },
    { label: "Tiro Bangla", value: "Tiro Bangla" },
    { label: "Galada", value: "Galada" },
    { label: "Baloo Da 2", value: "Baloo Da 2" },
    { label: "Arial (System)", value: "Arial" },
    { label: "Serif (System)", value: "serif" },
  ];

  const handleClear = () => {
    setVideoInput("");
    setVideoMobileInput("");
    isInternalChange.current = true;
    toast.info("Fields Cleared");
  };

  useEffect(() => {
    if (heroDesktopRef.current) {
      heroDesktopRef.current.load();
    }
  }, [videoInput]);

  useEffect(() => {
    if (heroMobileRef.current) {
      heroMobileRef.current.load();
    }
  }, [videoMobileInput, videoInput]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setScreenSize({ w: window.innerWidth, h: window.innerHeight });
      const handleResize = () => setScreenSize({ w: window.innerWidth, h: window.innerHeight });
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Safe play effect
  useEffect(() => {
    let isMounted = true;
    const playVideo = async () => {
      // Only attempt play if it's a video element and not a youtube link
      const isYoutube = pageVideoInput?.includes('youtube.com') || pageVideoInput?.includes('youtu.be');
      if (videoRef.current && isMounted && !isYoutube) {
        try {
          videoRef.current.muted = true;
          if (videoRef.current.paused) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
              await playPromise;
            }
          }
        } catch (err) {
          // Silently handle autoplay prevention or interruption
        }
      }
    };

    if (isVideoLive) {
      const timeout = setTimeout(playVideo, 150);
      return () => {
        isMounted = false;
        clearTimeout(timeout);
      };
    }
  }, [pageVideoInput, isVideoLive]);

  // Auto-verify fallback logic
  useEffect(() => {
    if (pageVideoInput && pageVideoInput !== prevVideoRef.current) {
      setIsVideoLive(false);
      prevVideoRef.current = pageVideoInput;
      const timer = setTimeout(() => {
        setIsVideoLive(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [pageVideoInput]);

  useEffect(() => {
    // Reset error state when video input changes to allow new attempt
    setLoadError(false);
  }, [videoInput, videoMobileInput]);

  // Sync with props when category changes or initial load
  useEffect(() => {
    if (heroVideoUrl) setVideoInput(heroVideoUrl);
    if (heroVideoMobileUrl) setVideoMobileInput(heroVideoMobileUrl);
    if (brochureUrl) setBrochureInput(brochureUrl);
    if (clientsVideoUrl) setPageVideoInput(clientsVideoUrl);
    if (heroContent) {
      setHeroTitle(heroContent.title);
      setHeroSub1(heroContent.subtitle1);
      setHeroSub2(heroContent.subtitle2);
      if (heroContent.titleSize) setHeroTitleSize(heroContent.titleSize);
      if (heroContent.titleFont) setHeroTitleFont(heroContent.titleFont);
      if (heroContent.subtitle1Size) setHeroSub1Size(heroContent.subtitle1Size);
      if (heroContent.subtitle1Font) setHeroSub1Font(heroContent.subtitle1Font);
      if (heroContent.subtitle2Size) setHeroSub2Size(heroContent.subtitle2Size);
      if (heroContent.subtitle2Font) setHeroSub2Font(heroContent.subtitle2Font);
    }
  }, [heroVideoUrl, heroVideoMobileUrl, clientsVideoUrl, heroContent]);

  const handleSaveHero = () => {
    if (onUpdateHeroVideo) onUpdateHeroVideo(videoInput);
    if (onUpdateHeroVideoMobile) onUpdateHeroVideoMobile(videoMobileInput);
    if (onUpdateBrochure) onUpdateBrochure(brochureInput);
    if (onUpdateHeroContent) {
      onUpdateHeroContent({
        title: heroTitle,
        subtitle1: heroSub1,
        subtitle2: heroSub2,
        titleSize: heroTitleSize,
        titleFont: heroTitleFont,
        subtitle1Size: heroSub1Size,
        subtitle1Font: heroSub1Font,
        subtitle2Size: heroSub2Size,
        subtitle2Font: heroSub2Font
      });
    }
    toast.success("Hero Content Updated Successfully");
  };

  const handleReset = () => {
    setVideoInput("");
    setVideoMobileInput("");
    setBrochureInput("");
    setHeroTitle("PREMIUM PAPER SOLUTIONS");
    setHeroSub1("Global Standard. Sustainable Impact. Industrial Precision.");
    setHeroSub2("YOUR PARTNER IN SUSTAINABLE MANUFACTURING EXCELLENCE.");
    setHeroTitleSize("");
    setHeroTitleFont("Poppins");
    setHeroSub1Size("");
    setHeroSub1Font("Poppins");
    setHeroSub2Size("");
    setHeroSub2Font("Poppins");
    setLoadError(false);
  };

  const handleSaveProject = () => {
    if (!onUpdateClientProjects) return;

    if (editingProject?.index !== undefined) {
      // Update existing
      const updated = [...clientProjects];
      const { index, ...rest } = editingProject;
      updated[index] = rest;
      onUpdateClientProjects(updated);
      toast.success("Project Updated");
    } else {
      // Add new
      onUpdateClientProjects([...clientProjects, editingProject]);
      toast.success("Project Added");
    }
    setEditingProject(null);
    setIsAddProjectOpen(false);
  };

  const handleDeleteProject = (index: number) => {
    if (!onUpdateClientProjects) return;
    const updated = [...clientProjects];
    updated.splice(index, 1);
    onUpdateClientProjects(updated);
    toast.success("Project Deleted");
  };

  if (selectedCategory === "Hero Banner") {
    return (
      <ViewContainer
        title="Hero Section Configuration"
        subtitle="Manage Main Banner Assets & Visuals"
        actions={
          <button
            onClick={() => setSelectedCategory(null)}
            className="bg-white/5 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10 flex items-center gap-2"
          >
            <ChevronRight className="size-4 rotate-180" /> Back to CMS
          </button>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-10 space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="size-12 rounded-2xl bg-[#fabf37] flex items-center justify-center text-black">
                  <Monitor className="size-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">Main Hero Video</h3>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Multi-Device Asset Optimization</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Desktop Video URL (MP4 or YouTube)</label>
                  <div className="flex items-center gap-3 bg-black border border-white/10 rounded-2xl px-5 py-4 focus-within:border-[#fabf37] transition-all">
                    <Monitor className="size-4 text-zinc-500" />
                    <input
                      type="text"
                      value={videoInput}
                      onChange={(e) => {
                        let value = e.target.value;

                        // Handle iframe paste
                        if (value.includes("<iframe") && value.includes("src=")) {
                          const srcMatch = value.match(/src=["'](.*?)["']/);
                          if (srcMatch && srcMatch[1]) {
                            value = srcMatch[1];
                            toast.success("Extracted URL from embed code");
                          }
                        }

                        // Handle YouTube Shorts
                        if (value.includes("youtube.com/shorts/")) {
                          value = value.replace("youtube.com/shorts/", "youtube.com/watch?v=");
                          toast.success("Converted Shorts link to standard format");
                        }

                        setVideoInput(value);
                        isInternalChange.current = true;
                      }}
                      placeholder="Paste Video URL (MP4 or YouTube)..."
                      className="w-full bg-transparent text-white text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Mobile Video URL (MP4 or YouTube)</label>
                  <div className="flex items-center gap-3 bg-black border border-white/10 rounded-2xl px-5 py-4 focus-within:border-[#fabf37] transition-all">
                    <Camera className="size-4 text-zinc-500" />
                    <input
                      type="text"
                      value={videoMobileInput}
                      onChange={(e) => {
                        let value = e.target.value;

                        // Handle iframe paste
                        if (value.includes("<iframe") && value.includes("src=")) {
                          const srcMatch = value.match(/src=["'](.*?)["']/);
                          if (srcMatch && srcMatch[1]) {
                            value = srcMatch[1];
                            toast.success("Extracted URL from embed code");
                          }
                        }

                        // Handle YouTube Shorts
                        if (value.includes("youtube.com/shorts/")) {
                          value = value.replace("youtube.com/shorts/", "youtube.com/watch?v=");
                          toast.success("Converted Shorts link to standard format");
                        }

                        setVideoMobileInput(value);
                        isInternalChange.current = true;
                      }}
                      placeholder="Paste Mobile Video URL..."
                      className="w-full bg-transparent text-white text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Brochure Download Link (PDF)</label>
                  <div className="flex items-center gap-3 bg-black border border-white/10 rounded-2xl px-5 py-4 focus-within:border-[#fabf37] transition-all">
                    <FileText className="size-4 text-zinc-500" />
                    <input
                      type="text"
                      value={brochureInput}
                      onChange={(e) => {
                        setBrochureInput(e.target.value);
                        isInternalChange.current = true;
                      }}
                      placeholder="Paste PDF Link..."
                      className="w-full bg-transparent text-white text-sm outline-none"
                    />
                  </div>
                </div>

                {/* Quick Actions & Presets */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Quick Presets</span>
                    <button onClick={handleClear} className="text-[9px] font-bold text-red-400 uppercase tracking-widest hover:text-red-300">Clear All</button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {PRESETS.map((preset, i) => (
                      <button
                        key={i}
                        onClick={() => handleApplyPreset(preset.url)}
                        className="px-3 py-2 rounded-lg bg-zinc-900 border border-white/5 hover:border-[#fabf37]/50 hover:bg-zinc-800 transition-all text-left group"
                      >
                        <span className="block text-[9px] font-black text-white/60 group-hover:text-white uppercase tracking-wider truncate">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 border-t border-white/5 pt-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Hero Main Title</label>
                    <div className="flex items-center gap-3 bg-black border border-white/10 rounded-2xl px-5 py-4 focus-within:border-[#fabf37] transition-all">
                      <Sparkles className="size-4 text-zinc-500" />
                      <input
                        type="text"
                        value={heroTitle}
                        onChange={(e) => setHeroTitle(e.target.value)}
                        placeholder="Hero Title..."
                        className="w-full bg-transparent text-white text-sm outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Font Size</label>
                        <input
                          type="text"
                          value={heroTitleSize}
                          onChange={(e) => setHeroTitleSize(e.target.value)}
                          placeholder="e.g. 80px, 5rem"
                          className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-2 text-white text-xs outline-none focus:border-[#fabf37]/50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Font Family</label>
                        <select
                          value={heroTitleFont}
                          onChange={(e) => setHeroTitleFont(e.target.value)}
                          className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-2 text-white text-xs outline-none focus:border-[#fabf37]/50"
                        >
                          {FONT_OPTIONS.map((font) => (
                            <option key={font.value} value={font.value} disabled={font.disabled}>
                              {font.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Subtitle 01 (Top)</label>
                    <div className="flex items-center gap-3 bg-black border border-white/10 rounded-2xl px-5 py-4 focus-within:border-[#fabf37] transition-all">
                      <Edit className="size-4 text-zinc-500" />
                      <input
                        type="text"
                        value={heroSub1}
                        onChange={(e) => setHeroSub1(e.target.value)}
                        placeholder="Subtitle 1..."
                        className="w-full bg-transparent text-white text-sm outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Font Size</label>
                        <input
                          type="text"
                          value={heroSub1Size}
                          onChange={(e) => setHeroSub1Size(e.target.value)}
                          placeholder="Default"
                          className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-2 text-white text-xs outline-none focus:border-[#fabf37]/50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Font Family</label>
                        <select
                          value={heroSub1Font}
                          onChange={(e) => setHeroSub1Font(e.target.value)}
                          className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-2 text-white text-xs outline-none focus:border-[#fabf37]/50"
                        >
                          {FONT_OPTIONS.map((font) => (
                            <option key={font.value} value={font.value} disabled={font.disabled}>
                              {font.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Subtitle 02 (Bottom)</label>
                    <div className="flex items-center gap-3 bg-black border border-white/10 rounded-2xl px-5 py-4 focus-within:border-[#fabf37] transition-all">
                      <Edit className="size-4 text-zinc-500" />
                      <input
                        type="text"
                        value={heroSub2}
                        onChange={(e) => setHeroSub2(e.target.value)}
                        placeholder="Subtitle 2..."
                        className="w-full bg-transparent text-white text-sm outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Font Size</label>
                        <input
                          type="text"
                          value={heroSub2Size}
                          onChange={(e) => setHeroSub2Size(e.target.value)}
                          placeholder="Default"
                          className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-2 text-white text-xs outline-none focus:border-[#fabf37]/50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Font Family</label>
                        <select
                          value={heroSub2Font}
                          onChange={(e) => setHeroSub2Font(e.target.value)}
                          className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-2 text-white text-xs outline-none focus:border-[#fabf37]/50"
                        >
                          {FONT_OPTIONS.map((font) => (
                            <option key={font.value} value={font.value} disabled={font.disabled}>
                              {font.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSaveHero}
                  className="w-full py-5 bg-[#fabf37] text-black rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_40px_rgba(250,191,55,0.2)]"
                >
                  <RefreshCw className="size-4" />
                  Sync Changes
                </button>
              </div>

              <div className="pt-6 border-t border-white/5">
                <p className="text-[9px] font-bold text-zinc-500 leading-relaxed uppercase tracking-widest">
                  Note: Use direct file links (ending in .mp4). Desktop and Mobile assets will be served based on viewer device context.
                </p>
              </div>
            </div>

            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-[32px] p-8 flex items-start gap-4">
              <CircleCheck className="size-6 text-emerald-500 shrink-0" />
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-tight">Responsive Engine: Active</h4>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
                  System will automatically toggle between assets based on screen resolution.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <h3 className="text-xl font-black text-white uppercase tracking-tight ml-4 flex items-center gap-3">
                <Monitor className="size-5" /> Desktop Preview
              </h3>
              <div className="bg-black border border-white/5 rounded-[48px] p-4 aspect-video relative overflow-hidden group">
                {(() => {
                  const getYouTubeId = (url: string) => {
                    if (!url) return null;
                    const cleanUrl = url.replace(/['"]/g, '').trim();

                    // 1. Try to find ID from URL
                    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|live\/)([^#&?]*).*/;
                    const match = cleanUrl.match(regExp);
                    if (match && match[2]) {
                      const idMatch = match[2].match(/^[a-zA-Z0-9_-]{11}/);
                      if (idMatch) return idMatch[0];
                      if (match[2].length === 11) return match[2];
                    }

                    // 2. Fallback: Is the input ITSELF just the ID?
                    const rawIdMatch = cleanUrl.match(/^[a-zA-Z0-9_-]{11}$/);
                    if (rawIdMatch) return rawIdMatch[0];

                    return null;
                  };
                  const inputValue = (videoInput || "").trim();
                  const videoId = getYouTubeId(inputValue);
                  const isInvalidFormat = inputValue.length > 5 && !videoId && (inputValue.includes("youtube") || inputValue.includes("youtu.be"));

                  return (
                    <>
                      {isInvalidFormat && (
                        <div className="absolute inset-0 z-20 bg-black/80 flex flex-col items-center justify-center p-8 text-center backdrop-blur-xl transition-all duration-500">
                          <div className="size-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
                            <AlertTriangle className="size-8 text-red-500 animate-pulse" />
                          </div>
                          <p className="text-[11px] font-black text-white uppercase tracking-[0.3em] mb-3">Invalid Source</p>
                          <p className="text-[9px] font-bold text-zinc-400 uppercase leading-loose max-w-[240px] tracking-widest mb-6">
                            The provided URL is not supported. <br />
                            <span className="text-[#fabf37] mt-2 block italic">Please use a valid YouTube link.</span>
                          </p>
                        </div>
                      )}

                      {videoId ? (
                        <div className="w-full h-full rounded-[36px] overflow-hidden relative group cursor-pointer" onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')}>
                          <img
                            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                            alt="Video thumbnail"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to hqdefault if maxresdefault doesn't exist
                              e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                            }}
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all flex items-center justify-center">
                            <div className="size-20 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                              <Play className="size-10 text-white ml-1" fill="white" />
                            </div>
                          </div>
                          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full">
                            <p className="text-[9px] font-black text-white uppercase tracking-widest">Click to Test</p>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-zinc-900 rounded-[36px] flex items-center justify-center">
                          <div className="text-center text-zinc-600 space-y-2">
                            <div className="text-4xl">🎥</div>
                            <p className="text-sm font-bold">No Video Selected</p>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2 opacity-40">Paperware Global</h2>
                    <div className="h-0.5 w-12 bg-[#fabf37] mx-auto opacity-20" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-black text-white uppercase tracking-tight ml-4 flex items-center gap-3">
                <Camera className="size-5" /> Mobile Preview
              </h3>
              <div className="flex justify-center">
                <div className="bg-black border-[12px] border-zinc-900 rounded-[60px] w-[280px] aspect-[9/19] relative overflow-hidden shadow-2xl">
                  {(() => {
                    const getYouTubeId = (url: string) => {
                      if (!url) return null;
                      const cleanUrl = url.replace(/['"]/g, '').trim();

                      // 1. Try to find ID from URL
                      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|live\/)([^#&?]*).*/;
                      const match = cleanUrl.match(regExp);
                      if (match && match[2]) {
                        const idMatch = match[2].match(/^[a-zA-Z0-9_-]{11}/);
                        if (idMatch) return idMatch[0];
                        if (match[2].length === 11) return match[2];
                      }

                      // 2. Fallback: Is the input ITSELF just the ID?
                      const rawIdMatch = cleanUrl.match(/^[a-zA-Z0-9_-]{11}$/);
                      if (rawIdMatch) return rawIdMatch[0];

                      return null;
                    };

                    const rawUrl = videoMobileInput || videoInput;
                    const activeUrl = (rawUrl || "").trim();
                    const videoId = getYouTubeId(activeUrl);

                    if (videoId) {
                      return (
                        <div className="w-full h-full relative group cursor-pointer" onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')}>
                          <img
                            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                            alt="Mobile video thumbnail"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                            }}
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all flex items-center justify-center">
                            <div className="size-16 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                              <Play className="size-8 text-white ml-1" fill="white" />
                            </div>
                          </div>
                          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                            <p className="text-[8px] font-black text-white uppercase tracking-widest">Tap to Test</p>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                        <div className="text-center text-zinc-600 space-y-2">
                          <div className="text-2xl">🎥</div>
                          <p className="text-xs font-bold">No Video</p>
                        </div>
                      </div>
                    );
                  })()}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-zinc-900 rounded-full z-20" />
                  <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                  <div className="absolute bottom-12 left-0 w-full px-6 text-center">
                    <p className="text-[10px] font-black text-white uppercase tracking-tighter opacity-60">Responsive Mobile Feed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ViewContainer>
    );
  }

  if (selectedCategory === "Product Gallery") {
    const handleAddProduct = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const newProduct = {
        id: Date.now(),
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        image: formData.get('image') as string || "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070",
        status: "Active"
      };
      if (onUpdateProducts) onUpdateProducts([...products, newProduct]);
      setIsAddProductOpen(false);
      toast.success("Product Added Successfully");
    };

    const handleUpdateProduct = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const updatedProducts = products.map(p => p.id === editingProduct.id ? {
        ...p,
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        image: formData.get('image') as string,
      } : p);
      if (onUpdateProducts) onUpdateProducts(updatedProducts);
      setEditingProduct(null);
      toast.success("Product Updated Successfully");
    };

    const handleDeleteProduct = (id: any) => {
      if (confirm("Are you sure you want to delete this product?")) {
        if (onUpdateProducts) onUpdateProducts(products.filter(p => p.id !== id));
        toast.error("Product Removed");
      }
    };

    return (
      <ViewContainer
        title="Product Gallery"
        subtitle="Manage Industrial Catalog"
        actions={
          <div className="flex gap-4">
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="bg-[#fabf37] text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all"
            >
              <Plus className="size-4" /> Add Product
            </button>
            <button onClick={() => setSelectedCategory(null)} className="bg-white/5 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10">
              Back
            </button>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p: any) => (
            <div key={p.id} className="bg-zinc-900/50 border border-white/5 rounded-3xl overflow-hidden group">
              <div className="aspect-video relative">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setEditingProduct(p)}
                    className="size-8 rounded-lg bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#fabf37] hover:text-black transition-all"
                  >
                    <Edit className="size-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(p.id)}
                    className="size-8 rounded-lg bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-red-500 transition-all"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <span className="text-[9px] font-black text-[#fabf37] uppercase tracking-widest">{p.category}</span>
                <h4 className="text-lg font-black text-white uppercase tracking-tight mt-1">{p.name}</h4>
                <div className="flex items-center gap-2 mt-4">
                  <div className="size-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{p.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Modals */}
        <AnimatePresence>
          {(isAddProductOpen || editingProduct) && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => { setIsAddProductOpen(false); setEditingProduct(null); }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-zinc-900 rounded-[40px] p-10 border border-white/10 shadow-2xl"
              >
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">
                  {isAddProductOpen ? "Initialize New Asset" : "Modify Asset Details"}
                </h3>
                <form onSubmit={isAddProductOpen ? handleAddProduct : handleUpdateProduct} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Product Name</label>
                    <input
                      name="name"
                      required
                      defaultValue={editingProduct?.name || ""}
                      placeholder="Enter product title..."
                      className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Industrial Category</label>
                    <input
                      name="category"
                      required
                      defaultValue={editingProduct?.category || ""}
                      placeholder="e.g. Food Packaging, Beverage..."
                      className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Image URL (Visual Data)</label>
                    <input
                      name="image"
                      required
                      defaultValue={editingProduct?.image || ""}
                      placeholder="Paste Unsplash or direct image URL..."
                      className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => { setIsAddProductOpen(false); setEditingProduct(null); }}
                      className="flex-1 py-5 bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] border border-white/5 hover:bg-white/10 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-5 bg-[#fabf37] text-black rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-[0_20px_40px_rgba(250,191,55,0.2)] hover:scale-105 transition-all"
                    >
                      {isAddProductOpen ? "Create Asset" : "Update Asset"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </ViewContainer>
    );
  }

  if (selectedCategory === "Client Testimonials") {
    const handleSavePageVideo = () => {
      if (onUpdateClientsVideo) {
        onUpdateClientsVideo(pageVideoInput);
        toast.success("Clients Page Featured Video Updated");
      }
    };

    const handleAddTestimonial = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const isFeatured = formData.get('isFeatured') === 'on';
      const isVideo = formData.get('isVideo') === 'on';

      const newTestimonial = {
        id: Date.now(),
        client: formData.get('client') as string,
        quote: formData.get('quote') as string,
        rating: 5,
        isFeatured,
        isVideo,
        videoUrl: formData.get('videoUrl') as string,
        image: formData.get('image') as string
      };
      if (onUpdateTestimonials) onUpdateTestimonials([...testimonials, newTestimonial]);
      setIsAddProductOpen(false);
      toast.success("Testimonial Added to Pipeline");
    };

    const handleDeleteTestimonial = (id: any) => {
      if (confirm("Delete this feedback?")) {
        if (onUpdateTestimonials) onUpdateTestimonials(testimonials.filter(t => t.id !== id));
        toast.error("Feedback Removed");
      }
    };

    return (
      <ViewContainer
        title="Client Testimonials"
        subtitle="Manage Social Proof & Feedback"
        actions={
          <div className="flex gap-4">
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="bg-[#fabf37] text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all"
            >
              <Plus className="size-4" /> Add Feedback
            </button>
            <button onClick={() => setSelectedCategory(null)} className="bg-white/5 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10">
              Back
            </button>
          </div>
        }
      >
        <div className="space-y-8">
          {/* Section: Clients Page Featured Video */}
          <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-[#fabf37] flex items-center justify-center text-black">
                <Monitor className="size-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Clients Page Main Video</h3>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Featured Story Background Video</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center gap-3 bg-black border border-white/10 rounded-2xl px-5 py-4 focus-within:border-[#fabf37] transition-all">
                <Link className="size-4 text-zinc-500" />
                <input
                  type="text"
                  value={pageVideoInput}
                  onChange={(e) => {
                    setPageVideoInput(e.target.value.trim());
                  }}
                  placeholder="Paste Featured Video MP4 URL..."
                  className="w-full bg-transparent text-white text-sm outline-none"
                />
              </div>
              <button
                onClick={handleSavePageVideo}
                className="bg-[#fabf37] text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all"
              >
                Sync Video
              </button>
            </div>

            {/* Live Preview Window */}
            <div className="mt-8 flex justify-center">
              <div className="relative aspect-[4/5] w-full max-w-xs rounded-[48px] overflow-hidden border border-white/10 bg-black group shadow-2xl">
                {pageVideoInput ? (
                  <>
                    {(() => {
                      const getYoutubeId = (url: string) => {
                        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                        const match = url.match(regExp);
                        return (match && match[2].length === 11) ? match[2] : null;
                      };
                      const youtubeId = getYoutubeId(pageVideoInput);

                      if (youtubeId) {
                        return (
                          <iframe
                            key={youtubeId}
                            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&autohide=1`}
                            className="w-full h-full object-cover opacity-80"
                            allow="autoplay; encrypted-media"
                            onLoad={() => setIsVideoLive(true)}
                          />
                        );
                      }

                      return (
                        <video
                          ref={videoRef}
                          key={pageVideoInput}
                          src={pageVideoInput}
                          autoPlay
                          muted
                          loop
                          playsInline
                          onCanPlay={() => setIsVideoLive(true)}
                          onLoadedData={() => setIsVideoLive(true)}
                          onPlaying={() => setIsVideoLive(true)}
                          onError={(e) => {
                            setIsVideoLive(false);
                            e.currentTarget.style.display = 'none';
                          }}
                          suppressHydrationWarning
                          className={`w-full h-full object-cover transition-all duration-700 ${isVideoLive ? 'opacity-100' : 'opacity-40'}`}
                        />
                      );
                    })()}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

                    {/* READY TO PLAY Badge */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2">
                      <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="px-5 py-2 bg-[#fabf37] rounded-full flex items-center gap-2 shadow-lg shadow-[#fabf37]/20"
                      >
                        <div className="size-1.5 rounded-full bg-black animate-pulse" />
                        <span className="text-[9px] font-black text-black uppercase tracking-[0.2em]">Ready to Play</span>
                      </motion.div>
                    </div>

                    {/* HUD Elements */}
                    <div className="absolute top-8 left-8 flex items-center gap-3">
                      <div className={`size-2 rounded-full ${isVideoLive ? 'bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-red-500'}`} />

                      {/* Visible Screen Size HUD */}
                      <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                        <Monitor className="size-3 text-[#fabf37]" />
                        <span className="text-[7px] font-black text-[#fabf37] uppercase tracking-widest whitespace-nowrap">
                          {screenSize.w} x {screenSize.h}
                        </span>
                      </div>
                    </div>

                    {/* Central Play Button */}
                    <AnimatePresence>
                      {!isVideoLive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.1 }}
                          className="absolute inset-0 flex items-center justify-center z-20"
                        >
                          <motion.div
                            onClick={() => setIsVideoLive(true)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="size-20 rounded-full bg-[#fabf37] flex items-center justify-center text-black shadow-[0_0_40px_rgba(250,191,55,0.4)] cursor-pointer"
                          >
                            <Play className="size-8 fill-current ml-1" />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Bottom Content Area */}
                    <div className="absolute bottom-10 left-6 right-6 p-6 rounded-[32px] bg-black/40 backdrop-blur-xl border border-white/10 text-center space-y-4">
                      <div className="flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="size-3 text-[#fabf37] fill-current" />
                        ))}
                      </div>

                      <div className="group relative">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#fabf37] text-black text-[7px] font-black px-2 py-0.5 rounded uppercase">Click to Edit</div>
                        <h4
                          contentEditable
                          suppressContentEditableWarning
                          className="text-xl font-black text-white uppercase tracking-tight mb-1 outline-none hover:text-[#fabf37] transition-colors cursor-text focus:ring-1 focus:ring-[#fabf37]/50 rounded px-1"
                        >
                          Verified Story
                        </h4>
                        <p
                          contentEditable
                          suppressContentEditableWarning
                          className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest leading-relaxed outline-none hover:text-white transition-colors cursor-text focus:ring-1 focus:ring-[#fabf37]/50 rounded px-1"
                        >
                          "Industrial excellence through sustainable manufacturing."
                        </p>
                      </div>

                      <div className="flex justify-center">
                        <div className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                          <Zap className="size-3 text-[#fabf37]" />
                          <span className="text-[8px] font-black text-white uppercase tracking-widest">4K Pipeline Sync</span>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {!isVideoLive && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => setIsVideoLive(true)}
                          className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xl z-[100] cursor-pointer"
                        >
                          <div className="flex flex-col items-center gap-4 text-center px-8">
                            <div className="relative">
                              <RefreshCw className="size-10 text-[#fabf37] animate-spin" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="size-1.5 rounded-full bg-white animate-ping" />
                              </div>
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Neural Verification</p>
                              <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Establishing Secure Stream...</p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsVideoLive(true);
                              }}
                              className="mt-4 px-5 py-2.5 bg-white/5 hover:bg-[#fabf37] hover:text-black rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-white/10 group/btn shadow-xl"
                            >
                              <span className="group-hover/btn:scale-105 inline-block">Force Sync Bypass</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center space-y-4 text-zinc-800 p-12 text-center">
                    <div className="size-20 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mb-4">
                      <Monitor className="size-8 opacity-20" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Awaiting Video Input for Verified Story Card</p>
                  </div>
                )}
              </div>
            </div>

            <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest leading-relaxed ml-2">
              Note: This video appears as the main background of the "Featured Video" card on the Clients page.
            </p>
          </div>

          <div className="space-y-4">
            {testimonials.map((t: any) => (
              <div key={t.id} className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-8 flex justify-between items-center group hover:border-[#fabf37]/50 transition-all">
                <div className="flex items-center gap-8">
                  <div className="relative">
                    <div className="size-16 rounded-2xl bg-black flex items-center justify-center text-[#fabf37] font-black text-xl overflow-hidden border border-white/5">
                      {t.image ? (
                        <img src={t.image} alt="" className="w-full h-full object-cover opacity-60" />
                      ) : (
                        <span>{t.client[0]}</span>
                      )}
                    </div>
                    {t.isVideo && (
                      <div className="absolute -top-1 -right-1 size-5 bg-[#fabf37] rounded-full flex items-center justify-center border-2 border-black">
                        <Play className="size-2 text-black fill-current" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="text-xl font-black text-white uppercase tracking-tight">{t.client}</h4>
                      {t.isFeatured && (
                        <span className="px-2 py-0.5 bg-[#fabf37]/10 text-[#fabf37] text-[8px] font-black uppercase tracking-widest rounded-md border border-[#fabf37]/20">Featured</span>
                      )}
                    </div>
                    <p className="text-sm font-bold text-zinc-500 mt-1">"{t.quote}"</p>
                    {t.isVideo && <p className="text-[10px] text-[#fabf37] mt-1 font-black uppercase tracking-widest">Neural Video Pipeline Active</p>}
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleDeleteTestimonial(t.id)}
                    className="size-10 rounded-xl bg-white/5 text-zinc-400 hover:text-red-500 flex items-center justify-center transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Simple Add Modal for Testimonials */}
        <AnimatePresence>
          {isAddProductOpen && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAddProductOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-xl bg-zinc-900 rounded-[40px] p-10 border border-white/10 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">Add Client Voice</h3>
                  <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                    <div className="size-1.5 rounded-full bg-[#fabf37] animate-pulse" />
                    <span className="text-[8px] font-black text-white uppercase tracking-widest">Admin Pipeline</span>
                  </div>
                </div>

                <form onSubmit={handleAddTestimonial} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Client Name / Business</label>
                    <input name="client" required className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Testimonial Content</label>
                    <textarea name="quote" required className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all h-24" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-black rounded-2xl border border-white/5">
                      <input type="checkbox" name="isFeatured" id="feat" className="size-4 accent-[#fabf37]" />
                      <label htmlFor="feat" className="text-[10px] font-black text-white uppercase tracking-widest cursor-pointer">Featured Card</label>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-black rounded-2xl border border-white/5">
                      <input type="checkbox" name="isVideo" id="vid" className="size-4 accent-[#fabf37]" />
                      <label htmlFor="vid" className="text-[10px] font-black text-white uppercase tracking-widest cursor-pointer">Video Story</label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Video MP4 URL</label>
                      <input name="videoUrl" placeholder="https://..." className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-[10px] outline-none focus:border-[#fabf37] transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Thumbnail/Avatar URL</label>
                      <input name="image" placeholder="https://..." className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-[10px] outline-none focus:border-[#fabf37] transition-all" />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setIsAddProductOpen(false)} className="flex-1 py-5 bg-white/5 text-zinc-500 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white/10 hover:text-white transition-all">Cancel</button>
                    <button type="submit" className="flex-1 py-5 bg-[#fabf37] text-black rounded-2xl font-black uppercase tracking-widest text-[11px] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#fabf37]/10">Push to Production</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </ViewContainer>
    );
  }

  if (selectedCategory === "Client Projects") {
    return (
      <ViewContainer
        title="Recent Deployments"
        subtitle="Manage Client Project Showcase"
        actions={
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className="bg-white/5 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10 flex items-center gap-2"
            >
              <ChevronRight className="size-4 rotate-180" /> Back to CMS
            </button>
            <button
              onClick={() => {
                setEditingProject({});
                setIsAddProjectOpen(true);
              }}
              className="bg-[#fabf37] text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#fabf37]/20"
            >
              <Plus className="size-4" /> Add Project
            </button>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientProjects.map((project: any, idx: number) => (
            <div key={idx} className="bg-zinc-900/50 border border-white/5 rounded-[32px] overflow-hidden group hover:border-[#fabf37]/50 transition-all">
              <div className="relative h-48">
                <img src={project.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all" />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    onClick={() => {
                      setEditingProject({ ...project, index: idx });
                      setIsAddProjectOpen(true);
                    }}
                    className="size-8 rounded-lg bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#fabf37] hover:text-black transition-all"
                  >
                    <Edit className="size-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(idx)}
                    className="size-8 rounded-lg bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-red-500 transition-all"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[8px] font-black text-[#fabf37] uppercase tracking-widest border border-[#fabf37]/20">
                    {project.company}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-black text-white uppercase tracking-tight mb-2 leading-none">{project.project}</h4>
                <p className="text-[10px] font-bold text-zinc-500 leading-relaxed line-clamp-2">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {isAddProjectOpen && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => { setIsAddProjectOpen(false); setEditingProject(null); }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-zinc-900 rounded-[40px] p-10 border border-white/10 shadow-2xl"
              >
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">
                  {editingProject?.index !== undefined ? "Update Project" : "New Deployment"}
                </h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Company Name</label>
                    <input
                      value={editingProject?.company || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, company: e.target.value })}
                      placeholder="e.g. TechFlow Systems"
                      className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Project Title</label>
                    <input
                      value={editingProject?.project || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, project: e.target.value })}
                      placeholder="e.g. Neural Hardware Packaging"
                      className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Description</label>
                    <textarea
                      value={editingProject?.desc || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, desc: e.target.value })}
                      placeholder="Project details..."
                      className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all h-24"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Image URL</label>
                    <input
                      value={editingProject?.image || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => { setIsAddProjectOpen(false); setEditingProject(null); }}
                      className="flex-1 py-5 bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] border border-white/5 hover:bg-white/10 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProject}
                      className="flex-1 py-5 bg-[#fabf37] text-black rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-[0_20px_40px_rgba(250,191,55,0.2)] hover:scale-105 transition-all"
                    >
                      {editingProject?.index !== undefined ? "Save Changes" : "Deploy Project"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </ViewContainer>
    );
  }

  if (selectedCategory === "Impact Dashboard") {
    const handleSaveStats = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const newStats = {
        totalCups: parseInt(formData.get('totalCups') as string),
        wonderfulBusinesses: parseInt(formData.get('wonderfulBusinesses') as string),
        lastSync: new Date().toISOString()
      };
      if (onUpdateProductionStats) onUpdateProductionStats(newStats);
      toast.success("Impact Metrics Synchronized with ERP");
    };

    return (
      <ViewContainer
        title="Impact Dashboard Editor"
        subtitle="Manage Global Sustainability & Production Stats"
        actions={<button onClick={() => setSelectedCategory(null)} className="bg-white/5 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10">Back</button>}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-10 space-y-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="size-12 rounded-2xl bg-[#fabf37] flex items-center justify-center text-black">
                <TrendingUp className="size-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Live Production Hub</h3>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Connected to Cloud ERP Node</p>
              </div>
            </div>

            <form onSubmit={handleSaveStats} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Total Paper Cups Produced (Base)</label>
                <div className="flex items-center gap-3 bg-black border border-white/10 rounded-2xl px-5 py-4 focus-within:border-[#fabf37] transition-all">
                  <Box className="size-4 text-zinc-500" />
                  <input
                    name="totalCups"
                    type="number"
                    defaultValue={productionStats?.totalCups || 69550257}
                    className="w-full bg-transparent text-white text-sm outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Wonderful Businesses Partnered</label>
                <div className="flex items-center gap-3 bg-black border border-white/10 rounded-2xl px-5 py-4 focus-within:border-[#fabf37] transition-all">
                  <Users className="size-4 text-zinc-500" />
                  <input
                    name="wonderfulBusinesses"
                    type="number"
                    defaultValue={productionStats?.wonderfulBusinesses || 5754}
                    className="w-full bg-transparent text-white text-sm outline-none"
                  />
                </div>
              </div>

              <div className="bg-black/40 border border-[#fabf37]/20 rounded-2xl p-6 flex items-start gap-4">
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse mt-1" />
                <div>
                  <p className="text-[10px] font-black text-white uppercase tracking-tight">AI-Assisted ERP Sync: ON</p>
                  <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mt-1 leading-relaxed">
                    Values will increment automatically on the live site to reflect real-time production flow. <br />
                    <span className="text-[#fabf37]">Last ERP Handshake: {productionStats?.lastSync ? new Date(productionStats.lastSync).toLocaleTimeString() : 'N/A'}</span>
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-[#fabf37] text-black rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-[0_20px_40px_rgba(250,191,55,0.2)] hover:scale-[1.02] active:scale-95 transition-all"
              >
                Sync with Global Node
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-black border border-white/5 rounded-[40px] p-10">
              <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6">Sustainability Impact Metrics</h4>
              <div className="space-y-4">
                {impactStats.map((stat: any, i: number) => (
                  <div key={i} className="p-4 bg-zinc-900/30 rounded-2xl border border-white/5 flex justify-between items-center group">
                    <div>
                      <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">{stat.label}</p>
                      <p className="text-lg font-black text-white">{stat.value}</p>
                    </div>
                    <button className="text-[10px] font-black text-[#fabf37] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">Edit</button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => toast.info("Sustainability metrics are locked to Carbon Calculator API.")}
                className="w-full py-4 mt-8 bg-white/5 text-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-white/5"
              >
                Configure Carbon API
              </button>
            </div>
          </div>
        </div>
      </ViewContainer>
    );
  }

  if (selectedCategory === "Career Postings") {
    const handleAddJob = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const newJob = {
        id: Date.now(),
        title: formData.get('title') as string,
        dept: formData.get('dept') as string,
        location: formData.get('location') as string,
        type: formData.get('type') as string,
      };
      if (onUpdateCareers) onUpdateCareers([...careers, newJob]);
      setIsAddProductOpen(false);
      toast.success("New Job Opening Published");
    };

    const handleDeleteJob = (id: any) => {
      if (confirm("Remove this career opportunity?")) {
        if (onUpdateCareers) onUpdateCareers(careers.filter(c => c.id !== id));
        toast.error("Job Removed");
      }
    };

    return (
      <ViewContainer
        title="Career Opportunities"
        subtitle="Manage Job Openings & Hiring"
        actions={
          <div className="flex gap-4">
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="bg-[#fabf37] text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all"
            >
              <Plus className="size-4" /> Post New Job
            </button>
            <button onClick={() => setSelectedCategory(null)} className="bg-white/5 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10">
              Back
            </button>
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-4">
          {careers.map((c: any) => (
            <div key={c.id} className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-8 flex justify-between items-center group hover:bg-black transition-all">
              <div className="flex items-center gap-8">
                <div className="size-14 rounded-2xl bg-[#fabf37]/10 text-[#fabf37] flex items-center justify-center">
                  <Users className="size-6" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-white uppercase tracking-tight">{c.title}</h4>
                  <div className="flex gap-4 mt-1">
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{c.dept}</span>
                    <span className="text-[10px] font-black text-[#fabf37] uppercase tracking-widest">{c.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="px-4 py-1.5 rounded-full bg-white/5 text-[9px] font-black text-white uppercase tracking-widest">{c.type}</span>
                <div className="flex gap-2">
                  <button className="size-10 rounded-xl bg-white/5 text-zinc-400 hover:text-white flex items-center justify-center"><Edit className="size-4" /></button>
                  <button
                    onClick={() => handleDeleteJob(c.id)}
                    className="size-10 rounded-xl bg-white/5 text-zinc-400 hover:text-red-500 flex items-center justify-center transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Job Modal */}
        <AnimatePresence>
          {isAddProductOpen && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsAddProductOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-zinc-900 rounded-[40px] p-10 border border-white/10 shadow-2xl"
              >
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">Post New Position</h3>
                <form onSubmit={handleAddJob} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Job Title</label>
                    <input name="title" required placeholder="e.g. Senior Machine Operator" className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Department</label>
                      <input name="dept" required placeholder="e.g. Logistics" className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Job Type</label>
                      <select name="type" className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all appearance-none">
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Location</label>
                    <input name="location" required placeholder="e.g. Dhaka, BD" className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all" />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setIsAddProductOpen(false)} className="flex-1 py-5 bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest text-[11px]">Cancel</button>
                    <button type="submit" className="flex-1 py-5 bg-[#fabf37] text-black rounded-2xl font-black uppercase tracking-widest text-[11px]">Publish Job</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </ViewContainer>
    );
  }

  if (selectedCategory === "Legal/Privacy") {
    return (
      <ViewContainer
        title="Legal & Compliance"
        subtitle="Manage Privacy Policy & Terms"
        actions={<button onClick={() => setSelectedCategory(null)} className="bg-white/5 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10">Back</button>}
      >
        <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-12 space-y-8">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4">Privacy Policy Content</label>
            <textarea
              className="w-full h-64 bg-black border border-white/10 rounded-3xl p-8 text-white text-sm outline-none focus:border-[#fabf37] transition-all resize-none custom-scrollbar"
              defaultValue="Paperware Manufacturing is committed to protecting your industrial data and privacy. Our protocols ensure that all B2B transactions remain encrypted and secure. We do not share client specifications with third parties without explicit authorization."
            />
          </div>
          <button className="bg-[#fabf37] text-black px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-[1.02] active:scale-95 transition-all">Update Legal Docs</button>
        </div>
      </ViewContainer>
    );
  }

  if (selectedCategory === "Who We Are") {
    const handleSaveMember = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsUploading(true);
      try {
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const role = formData.get('role') as string;
        const photoFile = (e.currentTarget.elements.namedItem('photoFile') as HTMLInputElement).files?.[0];
        let imageUrl = formData.get('image') as string || (editingTeamMember?.image || "");

        if (photoFile) {
          const fileName = `team-${Date.now()}-${photoFile.name}`;
          const { data, error } = await supabase.storage
            .from('team')
            .upload(fileName, photoFile);

          if (error) throw error;
          const { data: { publicUrl } } = supabase.storage
            .from('team')
            .getPublicUrl(fileName);
          imageUrl = publicUrl;
        }

        if (editingTeamMember) {
          const updatedMembers = teamMembers.map((m: any) =>
            m.id === editingTeamMember.id ? { ...m, name, role, image: imageUrl } : m
          );
          if (onUpdateTeamMembers) onUpdateTeamMembers(updatedMembers);
          toast.success("Unit Photo Updated Successfully");
        } else {
          const newMember = {
            id: Date.now().toString(),
            name,
            role,
            image: imageUrl
          };
          if (onUpdateTeamMembers) onUpdateTeamMembers([...teamMembers, newMember]);
          toast.success("Unit Photo Added Successfully");
        }

        setIsAddProductOpen(false);
        setEditingTeamMember(null);
      } catch (error: any) {
        toast.error(`Upload failed: ${error.message}`);
      } finally {
        setIsUploading(false);
      }
    };

    const handleDeleteMember = (id: string) => {
      if (confirm("Remove this unit photo?")) {
        if (onUpdateTeamMembers) onUpdateTeamMembers(teamMembers.filter((m: any) => m.id !== id));
        toast.error("Photo Removed");
      }
    };

    return (
      <ViewContainer
        title="Who We Are - Unit Showcase"
        subtitle="Manage factory units and facility operations photos"
        actions={
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className="bg-white/5 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10 flex items-center gap-2"
            >
              <ChevronRight className="size-4 rotate-180" /> Back to CMS
            </button>
            <button
              onClick={() => {
                setEditingTeamMember(null);
                setIsAddProductOpen(true);
              }}
              className="bg-[#fabf37] text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#fabf37]/20"
            >
              <Plus className="size-4" /> Add Photo
            </button>
          </div>
        }
      >
        <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-10 mb-12">
          <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6 flex items-center gap-3">
            <Edit className="size-5 text-[#fabf37]" /> Section Typography
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Title Top</label>
                <input
                  defaultValue={teamSectionContent?.titleTop}
                  onBlur={(e) => onUpdateTeamSectionContent?.({ ...teamSectionContent, titleTop: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                  placeholder="WHO"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Title Bottom</label>
                <input
                  defaultValue={teamSectionContent?.titleBottom}
                  onBlur={(e) => onUpdateTeamSectionContent?.({ ...teamSectionContent, titleBottom: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                  placeholder="WE ARE"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Description Paragraph 1</label>
                <textarea
                  defaultValue={teamSectionContent?.desc1}
                  onBlur={(e) => onUpdateTeamSectionContent?.({ ...teamSectionContent, desc1: e.target.value })}
                  className="w-full h-24 bg-black border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all resize-none custom-scrollbar"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Description Paragraph 2</label>
                <textarea
                  defaultValue={teamSectionContent?.desc2}
                  onBlur={(e) => onUpdateTeamSectionContent?.({ ...teamSectionContent, desc2: e.target.value })}
                  className="w-full h-24 bg-black border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all resize-none custom-scrollbar"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-10 mb-12">
          <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6 flex items-center gap-3">
            <Award className="size-5 text-[#fabf37]" /> Section Stats
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat 1 */}
            <div className="space-y-4 p-6 bg-black/40 rounded-[32px] border border-white/5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Stat 1 Label</label>
                <input
                  defaultValue={teamSectionContent?.stat1Label}
                  onBlur={(e) => onUpdateTeamSectionContent?.({ ...teamSectionContent, stat1Label: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Stat 1 Value</label>
                <input
                  defaultValue={teamSectionContent?.stat1Value}
                  onBlur={(e) => onUpdateTeamSectionContent?.({ ...teamSectionContent, stat1Value: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                />
              </div>
            </div>

            {/* Stat 2 */}
            <div className="space-y-4 p-6 bg-black/40 rounded-[32px] border border-white/5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Stat 2 Label</label>
                <input
                  defaultValue={teamSectionContent?.stat2Label}
                  onBlur={(e) => onUpdateTeamSectionContent?.({ ...teamSectionContent, stat2Label: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Stat 2 Value</label>
                <input
                  defaultValue={teamSectionContent?.stat2Value}
                  onBlur={(e) => onUpdateTeamSectionContent?.({ ...teamSectionContent, stat2Value: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                />
              </div>
            </div>

            {/* Stat 3 */}
            <div className="space-y-4 p-6 bg-black/40 rounded-[32px] border border-white/5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Stat 3 Label</label>
                <input
                  defaultValue={teamSectionContent?.stat3Label}
                  onBlur={(e) => onUpdateTeamSectionContent?.({ ...teamSectionContent, stat3Label: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Stat 3 Value</label>
                <input
                  defaultValue={teamSectionContent?.stat3Value}
                  onBlur={(e) => onUpdateTeamSectionContent?.({ ...teamSectionContent, stat3Value: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teamMembers.map((member: any) => (
            <div key={member.id} className="bg-zinc-900/50 border border-white/5 rounded-[32px] overflow-hidden group hover:border-[#fabf37]/50 transition-all relative aspect-[3/4]">
              <img src={member.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={member.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 flex flex-col justify-end">
                <h4 className="text-xl font-black text-white uppercase tracking-tight leading-none mb-1">{member.name}</h4>
                <p className="text-[10px] font-black text-[#fabf37] uppercase tracking-widest">{member.role}</p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                <button
                  onClick={() => {
                    setEditingTeamMember(member);
                    setIsAddProductOpen(true);
                  }}
                  className="size-10 rounded-xl bg-black/60 backdrop-blur-md text-white hover:text-[#fabf37] border border-white/10 flex items-center justify-center transition-all"
                >
                  <Edit className="size-4" />
                </button>
                <button
                  onClick={() => handleDeleteMember(member.id)}
                  className="size-10 rounded-xl bg-black/60 backdrop-blur-md text-white hover:text-red-500 border border-white/10 flex items-center justify-center transition-all"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
          {teamMembers.length === 0 && (
            <div className="col-span-full py-20 bg-zinc-900/30 border border-dashed border-white/10 rounded-[40px] flex flex-col items-center justify-center gap-4">
              <div className="size-16 rounded-full bg-white/5 flex items-center justify-center text-zinc-500">
                <Camera className="size-8" />
              </div>
              <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">No unit photos uploaded yet</p>
            </div>
          )}
        </div>

        <AnimatePresence>
          {isAddProductOpen && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAddProductOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-zinc-900 rounded-[40px] p-10 border border-white/10 shadow-2xl"
              >
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">
                  {editingTeamMember ? "Edit Unit Photo" : "Add Unit Photo"}
                </h3>
                <form onSubmit={handleSaveMember} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Unit Name / Title</label>
                    <input name="name" required defaultValue={editingTeamMember?.name || ""} className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Description / Details</label>
                    <input name="role" required defaultValue={editingTeamMember?.role || ""} className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Photo Upload</label>
                    <div className="relative group">
                      <input
                        type="file"
                        name="photoFile"
                        accept="image/*"
                        className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-[#fabf37] file:text-black hover:file:bg-[#fabf37]/80"
                      />
                    </div>
                  </div>
                  <div className="relative flex items-center gap-4 py-2">
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="text-[8px] font-black text-zinc-600 uppercase">OR</span>
                    <div className="flex-1 h-px bg-white/5" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Photo URL</label>
                    <div className="relative group">
                      <input name="image" defaultValue={editingTeamMember?.image || ""} placeholder="https://..." className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all" />
                      <Camera className="absolute right-5 top-1/2 -translate-y-1/2 size-4 text-zinc-500 group-focus-within:text-[#fabf37]" />
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setIsAddProductOpen(false)} className="flex-1 py-5 bg-white/5 text-zinc-400 rounded-2xl font-black uppercase tracking-widest text-[11px] border border-white/5 hover:bg-white/10 transition-all">Cancel</button>
                    <button type="submit" disabled={isUploading} className="flex-1 py-5 bg-[#fabf37] text-black rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-[#fabf37]/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                      {isUploading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="size-4 animate-spin" /> Uploading...
                        </span>
                      ) : "Push to Live"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </ViewContainer>
    );
  }

  if (selectedCategory === "Clients") {
    const handleSaveClient = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!onUpdateClients) return;
      setIsUploading(true);

      try {
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const category = formData.get('category') as string;
        const description = formData.get('description') as string;

        const photoFile = (e.currentTarget.elements.namedItem('photoFile') as HTMLInputElement).files?.[0];
        let imageUrl = formData.get('logo') as string || (editingPartner?.logo || "");

        if (photoFile) {
          const fileName = `client-${Date.now()}-${photoFile.name}`;
          const { data, error } = await supabase.storage
            .from('clients')
            .upload(fileName, photoFile);

          if (error) {
            // Fallback to partners bucket if clients doesn't exist or error
            console.warn("Client upload failed, trying partners bucket", error);
            const { data: data2, error: error2 } = await supabase.storage
              .from('partners')
              .upload(fileName, photoFile);
            if (error2) throw error2;
            const { data: { publicUrl } } = supabase.storage
              .from('partners')
              .getPublicUrl(fileName);
            imageUrl = publicUrl;
          } else {
            const { data: { publicUrl } } = supabase.storage
              .from('clients')
              .getPublicUrl(fileName);
            imageUrl = publicUrl;
          }
        }

        const newClientData = {
          name: name || "Valued Client",
          category: category || "Client",
          logo: imageUrl,
          description: description || "Strategic Partner"
        };

        if (editingPartner?.id) {
          const updated = clients.map((c: any) =>
            c.id === editingPartner.id ? { ...c, ...newClientData } : c
          );
          onUpdateClients(updated);
          toast.success("Client Updated");
        } else {
          const newClient = {
            id: Date.now().toString(),
            ...newClientData
          };
          onUpdateClients([...clients, newClient]);
          toast.success("Client Added");
        }
        setEditingPartner(null);
        setIsAddPartnerOpen(false);
      } catch (error: any) {
        toast.error(`Upload failed: ${error.message}`);
      } finally {
        setIsUploading(false);
      }
    };

    const handleDeleteClient = (id: string) => {
      if (!onUpdateClients) return;
      if (confirm("Remove this client?")) {
        onUpdateClients(clients.filter((c: any) => c.id !== id));
        toast.success("Client Removed");
      }
    };

    return (
      <ViewContainer
        title="Client Management"
        subtitle="Manage client logos and profiles."
        actions={
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className="bg-white/5 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10 flex items-center gap-2"
            >
              <ChevronRight className="size-4 rotate-180" /> Back to CMS
            </button>
            <button
              onClick={() => {
                setEditingPartner(null);
                setIsAddPartnerOpen(true);
              }}
              className="bg-[#fabf37] text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#fabf37]/20"
            >
              <Plus className="size-4" /> Add Client
            </button>
          </div>
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {clients.map((client: any) => (
            <div key={client.id} className="bg-zinc-900/50 border border-white/5 rounded-[24px] p-6 group hover:border-[#fabf37]/50 transition-all flex flex-col items-center text-center relative">
              <div className="size-20 bg-white p-4 rounded-2xl mb-4 flex items-center justify-center overflow-hidden">
                {client.logo ? (
                  <img src={client.logo} className="w-full h-full object-contain" alt={client.name} />
                ) : (
                  <span className="text-2xl font-black text-black">{client.name.charAt(0)}</span>
                )}
              </div>
              <h4 className="text-xs font-black text-white uppercase tracking-tight mb-1 line-clamp-1">{client.name}</h4>
              <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest line-clamp-1">{client.category}</p>

              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button
                  onClick={() => {
                    setEditingPartner(client);
                    setIsAddPartnerOpen(true);
                  }}
                  className="size-6 rounded-lg bg-black/80 text-white flex items-center justify-center hover:text-[#fabf37]"
                >
                  <Edit className="size-3" />
                </button>
                <button
                  onClick={() => handleDeleteClient(client.id)}
                  className="size-6 rounded-lg bg-black/80 text-white flex items-center justify-center hover:text-red-500"
                >
                  <Trash2 className="size-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {isAddPartnerOpen && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => { setIsAddPartnerOpen(false); setEditingPartner(null); }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-zinc-900 rounded-[40px] p-10 border border-white/10 shadow-2xl"
              >
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">
                  {editingPartner?.id ? "Update Client" : "Add New Client"}
                </h3>
                <form onSubmit={handleSaveClient} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Client Name*</label>
                    <input
                      name="name"
                      required
                      defaultValue={editingPartner?.name || ""}
                      placeholder="e.g. Acme Corp"
                      className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Category / Industry</label>
                    <input
                      name="category"
                      defaultValue={editingPartner?.category || "Client"}
                      placeholder="e.g. FMCG, Technology"
                      className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Relationship Note</label>
                    <input
                      name="description"
                      defaultValue={editingPartner?.description || ""}
                      placeholder="e.g. Strategic Partner since 2020"
                      className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Logo Upload</label>
                    <div className="relative group">
                      <input
                        type="file"
                        name="photoFile"
                        accept="image/*"
                        className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-[#fabf37] file:text-black hover:file:bg-[#fabf37]/80"
                      />
                    </div>
                  </div>

                  <div className="relative flex items-center gap-4 py-2">
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="text-[8px] font-black text-zinc-600 uppercase">OR URL</span>
                    <div className="flex-1 h-px bg-white/5" />
                  </div>

                  <div className="space-y-2">
                    <div className="relative group">
                      <input name="logo" defaultValue={editingPartner?.logo || ""} placeholder="https://..." className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all" />
                      <Link className="absolute right-5 top-1/2 -translate-y-1/2 size-4 text-zinc-500 group-focus-within:text-[#fabf37]" />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => { setIsAddPartnerOpen(false); setEditingPartner(null); }} className="flex-1 py-5 bg-white/5 text-zinc-400 rounded-2xl font-black uppercase tracking-widest text-[11px] border border-white/5 hover:bg-white/10 transition-all">Cancel</button>
                    <button type="submit" disabled={isUploading} className="flex-1 py-5 bg-[#fabf37] text-black rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-[#fabf37]/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                      {isUploading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="size-4 animate-spin" /> Saving...
                        </span>
                      ) : "Save Client"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </ViewContainer>
    );
  }

  if (selectedCategory === "Supplier & Partner Management") {
    const handleSavePartner = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!onUpdatePartners) return;
      setIsUploading(true);

      try {
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const category = formData.get('category') as string;
        const description = formData.get('description') as string;
        const location = formData.get('location') as string;
        const since = formData.get('since') as string;
        const website = formData.get('website') as string;
        const certificationsStr = formData.get('certifications') as string;
        const certifications = certificationsStr ? certificationsStr.split(',').map(c => c.trim()).filter(c => c) : [];
        const isFeatured = formData.get('isFeatured') === 'on';

        const photoFile = (e.currentTarget.elements.namedItem('photoFile') as HTMLInputElement).files?.[0];
        let imageUrl = formData.get('logo') as string || (editingPartner?.logo || "");

        if (photoFile) {
          const fileName = `partner-${Date.now()}-${photoFile.name}`;
          const { data, error } = await supabase.storage
            .from('partners') // Make sure this bucket exists
            .upload(fileName, photoFile);

          if (error) throw error;
          const { data: { publicUrl } } = supabase.storage
            .from('partners')
            .getPublicUrl(fileName);
          imageUrl = publicUrl;
        }

        const newPartnerData = {
          name: name || "Untitled Partner",
          category: category || "Business Partner",
          logo: imageUrl,
          description: description || "",
          location: location || "",
          since: since || "",
          certifications: certifications,
          website: website || "",
          isFeatured: isFeatured
        };

        if (editingPartner?.id) {
          // Update existing
          const updated = partners.map((p: any) =>
            p.id === editingPartner.id ? { ...p, ...newPartnerData } : p
          );
          onUpdatePartners(updated);
          toast.success("Partner Updated Successfully");
        } else {
          // Add new
          const newPartner = {
            id: Date.now().toString(),
            ...newPartnerData
          };
          onUpdatePartners([...partners, newPartner]);
          toast.success("Partner Added Successfully");
        }
        setEditingPartner(null);
        setIsAddPartnerOpen(false);
      } catch (error: any) {
        toast.error(`Upload failed: ${error.message}`);
      } finally {
        setIsUploading(false);
      }
    };

    const handleDeletePartner = (id: string) => {
      if (!onUpdatePartners) return;
      if (confirm("Remove this partner?")) {
        onUpdatePartners(partners.filter((p: any) => p.id !== id));
        toast.success("Partner Removed");
      }
    };

    return (
      <ViewContainer
        title="Supplier & Partner Management"
        subtitle="Manage global partners, raw material suppliers, and strategic alliances."
        actions={
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className="bg-white/5 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10 flex items-center gap-2"
            >
              <ChevronRight className="size-4 rotate-180" /> Back to CMS
            </button>
            <button
              onClick={() => {
                setEditingPartner(null);
                setIsAddPartnerOpen(true);
              }}
              className="bg-[#fabf37] text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#fabf37]/20"
            >
              <Plus className="size-4" /> Add Supplier
            </button>
          </div>
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {partners.map((partner: any) => (
            <div key={partner.id} className="bg-zinc-900/50 border border-white/5 rounded-[24px] p-6 group hover:border-[#fabf37]/50 transition-all flex flex-col items-center text-center relative">
              <div className="size-20 bg-white p-4 rounded-2xl mb-4 flex items-center justify-center overflow-hidden">
                {partner.logo ? (
                  <img src={partner.logo} className="w-full h-full object-contain" alt={partner.name} />
                ) : (
                  <span className="text-2xl font-black text-black">{partner.name.charAt(0)}</span>
                )}
              </div>
              <h4 className="text-xs font-black text-white uppercase tracking-tight mb-1 line-clamp-1">{partner.name}</h4>
              <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest line-clamp-1">{partner.category}</p>

              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button
                  onClick={() => {
                    setEditingPartner(partner);
                    setIsAddPartnerOpen(true);
                  }}
                  className="size-6 rounded-lg bg-black/80 text-white flex items-center justify-center hover:text-[#fabf37]"
                >
                  <Edit className="size-3" />
                </button>
                <button
                  onClick={() => handleDeletePartner(partner.id)}
                  className="size-6 rounded-lg bg-black/80 text-white flex items-center justify-center hover:text-red-500"
                >
                  <Trash2 className="size-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {isAddPartnerOpen && (
            <div className="fixed inset-0 z-[1000] flex items-start justify-center p-4 pt-32 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => { setIsAddPartnerOpen(false); setEditingPartner(null); }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-zinc-900 rounded-[40px] p-10 border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh]"
              >
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">
                  {editingPartner?.id ? "Update Supplier Details" : "Add New Supplier"}
                </h3>
                <form onSubmit={handleSavePartner} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Brand Name*</label>
                      <input
                        name="name"
                        required
                        defaultValue={editingPartner?.name || ""}
                        placeholder="e.g. Acme Corp"
                        className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Category*</label>
                      <select
                        name="category"
                        defaultValue={editingPartner?.category || "raw-material"}
                        className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all appearance-none"
                      >
                        <option value="raw-material">Raw Material</option>
                        <option value="machinery">Machinery</option>
                        <option value="digital">Digital Core</option>
                        <option value="logistics">Global Logistics</option>
                        <option value="erp">ERP Systems</option>
                        <option value="technology">Cloud Tech</option>
                        <option value="design">Creative</option>
                        <option value="connectivity">Network</option>
                        <option value="packaging">Packaging</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Description</label>
                    <textarea
                      name="description"
                      rows={3}
                      defaultValue={editingPartner?.description || ""}
                      placeholder="Brief overview of the partnership..."
                      className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Location (Region/Country)</label>
                      <input
                        name="location"
                        defaultValue={editingPartner?.location || ""}
                        placeholder="e.g. Dhaka, Bangladesh"
                        className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Establishment Year</label>
                      <input
                        name="since"
                        defaultValue={editingPartner?.since || ""}
                        placeholder="e.g. 2010"
                        className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Certifications (Comma Separated)</label>
                    <input
                      name="certifications"
                      defaultValue={editingPartner?.certifications ? editingPartner.certifications.join(', ') : ""}
                      placeholder="e.g. ISO 9001, FSC, Fair Trade"
                      className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Website URL</label>
                    <input
                      name="website"
                      defaultValue={editingPartner?.website || ""}
                      placeholder="https://example.com"
                      className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Logo Upload</label>
                    <div className="relative group">
                      <input
                        type="file"
                        name="photoFile"
                        accept="image/*"
                        className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-[#fabf37] file:text-black hover:file:bg-[#fabf37]/80"
                      />
                    </div>
                  </div>

                  <div className="relative flex items-center gap-4 py-2">
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="text-[8px] font-black text-zinc-600 uppercase">OR</span>
                    <div className="flex-1 h-px bg-white/5" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Logo URL (Alternative)</label>
                    <div className="relative group">
                      <input
                        name="logo"
                        defaultValue={editingPartner?.logo || ""}
                        placeholder="https://..."
                        className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                      />
                      <Camera className="absolute right-5 top-1/2 -translate-y-1/2 size-4 text-zinc-500 group-focus-within:text-[#fabf37]" />
                    </div>
                  </div>

                  <div className="pt-2 px-2 flex items-center gap-3">
                    <label className="relative flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        name="isFeatured"
                        defaultChecked={editingPartner?.isFeatured}
                        className="peer sr-only"
                      />
                      <div className="size-6 rounded-lg border-2 border-white/10 bg-black peer-checked:bg-[#fabf37] peer-checked:border-[#fabf37] transition-all flex items-center justify-center">
                        <CircleCheck className="size-4 text-black opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                      <span className="ml-3 text-[11px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
                        Featured in Auto-Scroll Marquee
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsAddPartnerOpen(false)}
                      className="flex-1 py-5 bg-white/5 text-zinc-400 rounded-2xl font-black uppercase tracking-widest text-[11px] border border-white/5 hover:bg-white/10 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isUploading}
                      className="flex-1 py-5 bg-[#fabf37] text-black rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-[#fabf37]/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                    >
                      {isUploading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="size-4 animate-spin" /> Saving...
                        </span>
                      ) : "Save Supplier Details"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div >
          )
          }
        </AnimatePresence >
      </ViewContainer >
    );
  }

  if (selectedCategory) {
    return (
      <ViewContainer
        title={`Editing: ${selectedCategory}`}
        subtitle="Live Content Synchronization Active"
        actions={
          <button
            onClick={() => setSelectedCategory(null)}
            className="bg-white/5 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10 flex items-center gap-2"
          >
            <ChevronRight className="size-4 rotate-180" /> Back to List
          </button>
        }
      >
        <div className="bg-zinc-900/30 border border-white/5 rounded-[40px] p-12 flex flex-col items-center justify-center text-center space-y-6 min-h-[400px]">
          <div className="size-20 rounded-full bg-[#fabf37]/10 flex items-center justify-center text-[#fabf37]">
            <Edit className="size-8" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">Visual Editor Loading</h3>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mt-2">Fetching module schema from production branch...</p>
          </div>
          <div className="w-full max-w-md h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-full h-full bg-[#fabf37] opacity-50"
            />
          </div>
        </div>
      </ViewContainer>
    );
  }

  return (
    <ViewContainer title="Website Editor" subtitle="Content Management & Site Config" actions={
      <button
        onClick={() => toast.success("All changes published to production node.")}
        className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
      >
        <CircleCheck className="size-4" /> Publish Changes
      </button>
    }>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { label: "Hero Banner", items: 4, last: "2h ago" },
          { label: "Product Gallery", items: 124, last: "1d ago" },
          { label: "Client Testimonials", items: 12, last: "3h ago" },
          { label: "Client Projects", items: clientProjects.length, last: "Now" },
          { label: "Impact Dashboard", items: 6, last: "5m ago" },
          { label: "Career Postings", items: 3, last: "1w ago" },
          { label: "Clients", items: clients.length, last: "Now" },
          { label: "Supplier & Partner Management", items: partners.length, last: "Now" },
          { label: "Who We Are", labelDisplay: "Unit Showcase", items: teamMembers.length, last: "Now" },
        ].map((item, i) => (
          <div
            key={i}
            onClick={() => setSelectedCategory(item.label)}
            className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 hover:border-[#fabf37] transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Edit className="size-4 text-[#fabf37]" />
            </div>
            <div className="flex justify-between items-start mb-6">
              <div className="size-12 rounded-2xl bg-black flex items-center justify-center text-[#fabf37]">
                <Box className="size-6" />
              </div>
              <span className="text-[9px] font-black text-zinc-500 uppercase">{item.last}</span>
            </div>
            <h4 className="text-xl font-black text-white uppercase tracking-tight mb-2">{item.labelDisplay || item.label}</h4>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.items} Dynamic Modules</p>
            <button className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase text-[#fabf37] group-hover:gap-4 transition-all pointer-events-none">
              Manage Content <ChevronRight className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </ViewContainer>
  );
}
