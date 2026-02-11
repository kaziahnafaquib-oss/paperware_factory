import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Radio, ArrowRight, Activity, Globe as Globe2, ShieldCheck, Zap, Volume2, VolumeX, Loader2, Leaf, MapPin, AlertCircle, ExternalLink, Mouse } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { getDevicePerformanceTier } from "../../lib/performance";

interface ImmersiveHeroProps {
  videoUrl: string;
  brochureUrl?: string;
  onExplore: (page: string) => void;
  onDownload?: () => void;
  posterImage?: string;
  content?: {
    title: string;
    subtitle1: string;
    subtitle2: string;
    titleSize?: string;
    subtitle1Size?: string;
    subtitle2Size?: string;
    titleFont?: string;
    subtitle1Font?: string;
    subtitle2Font?: string;
  };
}

export const ImmersiveHero = ({ videoUrl, brochureUrl, onExplore, onDownload, posterImage, content }: ImmersiveHeroProps) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { scrollY } = useScroll();

  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const [youtubeError, setYoutubeError] = useState(false);
  const [forceDirectVideo, setForceDirectVideo] = useState(false);
  const [actualVideoUrl, setActualVideoUrl] = useState(videoUrl);

  const isLowEnd = getDevicePerformanceTier() === 'low';
  const videoScale = useTransform(scrollY, [0, 500], [1, isLowEnd ? 1 : 1.1]);
  const videoOpacity = useTransform(scrollY, [0, 500], [1, 0.2]);
  const textY = useTransform(scrollY, [0, 500], [0, isLowEnd ? 0 : 100]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const cleanUrl = url.replace(/['"]/g, '').trim();

    // Handle direct embed URLs
    if (cleanUrl.includes('youtube.com/embed/') || cleanUrl.includes('youtube-nocookie.com/embed/')) {
      const embedMatch = cleanUrl.match(/embed\/([a-zA-Z0-9_-]{11})/);
      if (embedMatch) return embedMatch[1];
    }

    // Remove tracking parameters like ?si= and other params
    const urlWithoutParams = cleanUrl.split('?')[0].split('&')[0];

    // 1. Try to find ID from various YouTube URL formats
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|live\/|shorts\/)([^#&?]*).*/;
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

  const getNormalizedEmbedUrl = (url: string) => {
    if (!url) return null;
    let cleanUrl = url.replace(/['"]/g, '').trim();
    if (!cleanUrl.includes('youtube.com/embed/') && !cleanUrl.includes('youtube-nocookie.com/embed/')) return null;

    // Add required parameters for JS API if missing
    const urlObj = new URL(cleanUrl);
    if (!urlObj.searchParams.has('enablejsapi')) urlObj.searchParams.set('enablejsapi', '1');
    if (!urlObj.searchParams.has('origin')) urlObj.searchParams.set('origin', window.location.origin);
    if (!urlObj.searchParams.has('autoplay')) urlObj.searchParams.set('autoplay', '1');
    if (!urlObj.searchParams.has('mute')) urlObj.searchParams.set('mute', '1');
    if (!urlObj.searchParams.has('vq')) urlObj.searchParams.set('vq', 'hd1080');

    return urlObj.toString();
  };

  const fullEmbedUrl = getNormalizedEmbedUrl(videoUrl);
  const videoId = !forceDirectVideo && !fullEmbedUrl ? getYouTubeId(videoUrl) : null;

  // Debug logging
  useEffect(() => {
    console.log('🎬 ImmersiveHero Debug:', {
      videoUrl,
      fullEmbedUrl,
      videoId,
      isYouTube: !!(videoId || fullEmbedUrl),
      youtubeError,
      forceDirectVideo
    });
  }, [videoUrl, fullEmbedUrl, videoId, youtubeError, forceDirectVideo]);

  // Detect YouTube iframe load failures and fallback
  useEffect(() => {
    if (!videoId && !fullEmbedUrl) return;

    const timer = setTimeout(() => {
      // After 8 seconds, if still loading, assume YouTube failed
      if (isLoading) {
        console.warn('YouTube video failed to load within timeout');
        setYoutubeError(true);
        setIsLoading(false);
      }
    }, 8000);

    return () => clearTimeout(timer);
  }, [videoId, fullEmbedUrl, isLoading]);

  // Reset when video URL changes
  useEffect(() => {
    setForceDirectVideo(false);
    setYoutubeError(false);
  }, [videoUrl]);

  useEffect(() => {
    setIsLoading(true);
    if (!videoId && !fullEmbedUrl) {
      if (videoRef1.current) {
        videoRef1.current.load();
      }

      // Safety timeout for direct videos (3 seconds)
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      // For YouTube, consider it loaded after a brief delay
      const timer = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [videoUrl, videoId, fullEmbedUrl]);

  // Auto-play videos with error handling
  useEffect(() => {
    let isCancelled = false;

    const playVideo = async (videoElement: HTMLVideoElement | null) => {
      if (!videoElement || isCancelled) return;

      // Check if element is still in document
      if (!document.body.contains(videoElement)) return;

      try {
        videoElement.muted = true; // Ensure muted before playing
        const playPromise = videoElement.play();

        if (playPromise !== undefined) {
          await playPromise;
        }
      } catch (error) {
        // Silently handle autoplay failures - this is expected behavior
        if (!isCancelled && error instanceof Error && !error.message.includes('aborted')) {
          console.warn('Video autoplay failed:', error);
        }
      }
    };

    if (!videoId) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        if (!isCancelled) {
          playVideo(videoRef1.current);
        }
      }, 100);

      return () => {
        isCancelled = true;
        clearTimeout(timer);
      };
    }

    return () => {
      isCancelled = true;
    };
  }, [videoUrl, videoId]);

  // Handle Mute Toggle for YouTube - Only after user interaction
  useEffect(() => {
    if ((videoId || fullEmbedUrl) && iframeRef.current && userInteracted) {
      try {
        const command = isMuted ? 'mute' : 'unMute';
        iframeRef.current.contentWindow?.postMessage(JSON.stringify({
          event: 'command',
          func: command,
          args: []
        }), '*');
      } catch (error) {
        console.warn('YouTube API command failed:', error);
      }
    }
  }, [isMuted, videoId, fullEmbedUrl, userInteracted]);

  // Handle regular video mute toggle
  const handleMuteToggle = async () => {
    setUserInteracted(true);
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);

    if (!videoId && !fullEmbedUrl && videoRef1.current) {
      try {
        videoRef1.current.muted = newMutedState;
        if (!newMutedState) {
          // If unmuting, try to play
          await videoRef1.current.play();
        }
      } catch (error) {
        console.warn('Video playback failed:', error);
        // Keep video muted if autoplay with sound fails
        setIsMuted(true);
        if (videoRef1.current) {
          videoRef1.current.muted = true;
        }
      }
    }
  };

  return (
    <section ref={containerRef} className="relative h-[100svh] w-full overflow-hidden bg-[#000000] font-['Poppins',sans-serif]">
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-[5] bg-black flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="size-8 text-[#fabf37] animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Initializing Stream...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Video with Immersive Scale */}
      <motion.div
        style={{ opacity: videoOpacity }}
        className="absolute inset-0 z-0"
      >
        {(videoId || fullEmbedUrl) && !youtubeError ? (
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute inset-0 w-full h-full scale-[1.12]">
              <iframe
                ref={iframeRef}
                key={fullEmbedUrl || videoId}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77vh] min-w-full h-[56.25vw] min-h-full pointer-events-none"
                src={fullEmbedUrl || `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&rel=0&showinfo=0&modestbranding=1&enablejsapi=1&vq=hd1080&origin=${window.location.origin}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                title="Background video"
                style={{ border: 0, contentVisibility: 'visible' }}
                loading="eager"
                onLoad={() => {
                  setIsLoading(false);
                  setYoutubeError(false);
                }}
                onError={() => {
                  console.warn('YouTube iframe failed to load');
                  setYoutubeError(true);
                  setIsLoading(false);
                }}
              />
            </div>
          </div>
        ) : (videoId || fullEmbedUrl) && youtubeError ? (
          // YouTube Error Fallback UI
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black flex items-center justify-center hardware-accelerated">
            <div className="text-center space-y-6 px-4 max-w-2xl">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#fabf37] blur-2xl opacity-20 animate-pulse" />
                  <AlertCircle className="size-16 text-[#fabf37] relative" />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
                  Industrial Stream Protocol
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Direct neural link interrupted. Switching to local redundancy.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 bg-[#fabf37] text-black px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider hover:bg-[#e5ad2a] transition-all"
                >
                  <ExternalLink className="size-4" />
                  External Protocol
                </a>
                <button
                  onClick={() => {
                    setForceDirectVideo(true);
                    setYoutubeError(false);
                  }}
                  className="text-xs font-bold text-white/50 hover:text-white uppercase tracking-wider transition-colors underline"
                >
                  Bypass Restrictions
                </button>
              </div>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef1}
            key={videoUrl}
            src={videoUrl}
            poster={posterImage}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setIsLoading(false)}
            onWaiting={() => setIsLoading(true)}
            onError={(e) => {
              console.warn('Video failed to load:', videoUrl, e);
              setIsLoading(false); // Clear loading state on error
            }}
            suppressHydrationWarning
            className="w-full h-full object-cover transition-opacity duration-1000 bg-zinc-900 will-change-transform"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#d6c8a9]/10 pointer-events-none" />
      </motion.div>


      {/* Beige Gradient Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/1 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-white/1 via-transparent to-transparent pointer-events-none" />

      {/* Futuristic HUD Scanning Effect */}
      {!isLowEnd && (
        <motion.div
          animate={{ top: ["-10%", "110%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#fabf37]/30 to-transparent z-10 pointer-events-none hardware-accelerated"
        />
      )}

      {/* Main Content Overlay */}
      <div className="relative z-20 h-full flex flex-col items-center justify-end pb-32 md:pb-12 px-4 text-center">
        {/* Inner Background Video Layer Removed */}

        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl w-full"
        >
          <div className="flex flex-col items-center gap-8 md:gap-12">
            {/* Real Hero Content */}
            {!isLoading && (
              <div className="space-y-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: [0, 1, 1, 0, 0],
                    y: [20, 0, 0, -10, -10]
                  }}
                  transition={{
                    duration: 16, // Total video duration (16 seconds)
                    times: [0, 0.05, 0.18, 0.25, 1], // Synced to appear in first 4s, gone for rest 12s
                    ease: "easeInOut",
                    repeat: Infinity
                  }}
                  className="flex flex-col items-center"
                >
                  <h1
                    className="text-[36px] sm:text-[54px] md:text-[86px] lg:text-[110px] font-black text-white leading-[0.95] uppercase tracking-tighter drop-shadow-2xl mb-6"
                    style={{ fontSize: content?.titleSize, fontFamily: content?.titleFont }}
                  >
                    {t("hero_title")}
                  </h1>
                  <div className="flex flex-col gap-2 max-w-4xl mx-auto px-4">
                    <p
                      className="text-[13px] md:text-[22px] font-black text-[#fabf37] leading-tight uppercase tracking-widest opacity-90"
                      style={{ fontSize: content?.subtitle1Size, fontFamily: content?.subtitle1Font }}
                    >
                      {t("hero_subtitle_1")}
                    </p>
                    <p
                      className="text-[10px] md:text-[14px] font-bold text-white/80 leading-tight uppercase tracking-[0.2em] mt-2"
                      style={{ fontSize: content?.subtitle2Size, fontFamily: content?.subtitle2Font }}
                    >
                      {t("hero_subtitle_2")}
                    </p>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Buttons Row */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-8">
              <button
                onClick={() => {
                  if (brochureUrl) {
                    if (onDownload) onDownload();
                    window.open(brochureUrl, '_blank');
                  } else {
                    onExplore("products");
                  }
                }}
                className="group relative overflow-hidden bg-[#fabf37] text-black w-44 md:w-52 px-6 md:px-8 py-3.5 md:py-3 rounded-full text-[11px] font-black uppercase tracking-[0.25em] transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(250,191,55,0.2)]"
              >
                <span className="relative z-10">{t('e_brochure') || 'E-Catalog'}</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              </button>

              <button
                onClick={() => onExplore("contact")}
                className="group bg-[#d6c8a9]/10 backdrop-blur-xl text-white border border-[#d6c8a9]/30 w-44 md:w-52 px-6 md:px-8 py-3.5 md:py-3 rounded-full text-[11px] font-black uppercase tracking-[0.25em] transition-all hover:bg-[#d6c8a9] hover:text-black relative"
              >
                {t('contact') || 'Contact Sales'}
              </button>
            </div>

            {/* Explore More Section with Lines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col items-center gap-4"
            >
              {/* Top Horizontal Line - Small */}
              <div className="w-24 h-[3px] bg-gradient-to-r from-transparent via-[#fabf37] to-transparent shadow-[0_0_20px_#fabf37]" />

              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.35em] text-[#fabf37] text-center whitespace-nowrap drop-shadow-[0_0_10px_rgba(250,191,55,0.5)]">
                {t('explore_products') || 'Explore More'}
              </span>

              {/* Bottom Animated Icon */}
              <div className="relative mt-2">
                {/* Immersive Glow Effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.1, 0.4, 0.1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-12 bg-[#fabf37] rounded-full blur-2xl pointer-events-none"
                />

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative text-[#fabf37] flex flex-col items-center"
                >
                  <Mouse className="size-8 stroke-[1.5px] drop-shadow-[0_0_15px_rgba(250,191,55,0.4)]" />

                  {/* Animated Internal Scroll Dot */}
                  <motion.div
                    animate={{
                      y: [0, 8, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeIn"
                    }}
                    className="absolute top-[8px] w-[2px] h-[5px] bg-white rounded-full shadow-[0_0_10px_#fff]"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating HUD Telemetry */}
        <div className="hidden lg:block absolute bottom-12 left-12 space-y-4 text-left">
          {[
            { icon: <Leaf className="size-3" />, label: t('sustainability') || "SUSTAINABILITY", value: t('sustainability_ecofriendly') || "100% ECO-FRIENDLY" },
            { icon: <Globe2 className="size-3" />, label: t('export_intelligence') || "EXPORT", value: t('ready_worldwide') || "READY WORLDWIDE" },
            {
              icon: <MapPin className="size-3" />,
              label: t('origin') || "ORIGIN",
              value: (
                <span className="flex items-center gap-2">
                  {t('made_in_bangladesh') || "MADE IN BANGLADESH"}
                  <motion.img
                    src="https://flagcdn.com/bd.svg"
                    className="h-2.5 w-auto rounded-[1px] shadow-[2px_2px_5px_rgba(0,0,0,0.3)] border-[0.5px] border-white/20"
                    alt="BD"
                    animate={{
                      rotateY: [10, -10, 10],
                      skewY: [2, -2, 2],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "1000px"
                    }}
                  />
                </span>
              )
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 + (idx * 0.2) }}
              className="flex items-center gap-3"
            >
              <div className="text-[#fabf37]/50">{item.icon}</div>
              <div className="flex flex-col">
                <span className="text-[7px] font-black text-white/30 tracking-widest">{item.label}</span>
                <span className="text-[10px] font-black text-white tracking-widest">{item.value}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* HUD Corner Accents */}
      <div className="absolute top-12 left-12 size-12 border-t-2 border-l-2 border-white/10 rounded-tl-2xl" />
      <div className="absolute top-12 right-12 size-12 border-t-2 border-r-2 border-white/10 rounded-tr-2xl" />

      {/* Sound Toggle */}
      <button
        onClick={handleMuteToggle}
        className="absolute bottom-12 right-24 z-30 hidden lg:flex items-center gap-3 group"
      >
        <span className="text-[9px] font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">
          {isMuted ? (t('audio_muted') || "AUDIO MUTED") : (t('audio_unmuted') || "AUDIO UNMUTED")}
        </span>
        <div className="size-10 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-[#fabf37] group-hover:text-black group-hover:border-[#fabf37] transition-all">
          {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        </div>
      </button>
    </section>
  );
};