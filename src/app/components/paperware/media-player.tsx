import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface MediaPlayerProps {
  src: string;
  type: 'video' | 'youtube' | 'image';
  thumbnail?: string;
  alt?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export function MediaPlayer({
  src,
  type,
  thumbnail,
  alt = '',
  className = '',
  autoPlay = false,
  muted = true,
  loop = true
}: MediaPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // Image type
  if (type === 'image') {
    return (
      <div className={className}>
        <ImageWithFallback src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
    );
  }

  // YouTube embed
  if (type === 'youtube') {
    const videoId = getYouTubeId(src);
    if (!videoId) {
      return (
        <div className={`${className} flex items-center justify-center bg-zinc-900 text-white`}>
          <p className="text-sm font-bold">Invalid YouTube URL</p>
        </div>
      );
    }

    return (
      <div className={`${className} relative`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}&mute=${muted ? 1 : 0}&loop=${loop ? 1 : 0}&playlist=${videoId}`}
          title={alt}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    );
  }

  // Video file (MP4, WebM, etc.)
  return (
    <div
      className={`${className} relative group`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay={autoPlay}
        muted={isMuted}
        loop={loop}
        playsInline
        className="w-full h-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
        suppressHydrationWarning
      />

      {/* Thumbnail Overlay (when paused) */}
      {!isPlaying && thumbnail && (
        <div className="absolute inset-0">
          <ImageWithFallback src={thumbnail} alt={alt} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Play Button Overlay */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-all group"
        >
          <div className="size-16 md:size-20 rounded-full bg-[#fabf37] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
            <Play className="size-8 md:size-10 text-black fill-current translate-x-0.5" />
          </div>
        </button>
      )}

      {/* Video Controls */}
      {isPlaying && (
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6 transition-all duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center gap-3 md:gap-4">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="size-8 md:size-10 rounded-full bg-[#fabf37] flex items-center justify-center hover:scale-110 transition-transform"
            >
              {isPlaying ? (
                <Pause className="size-4 md:size-5 text-black fill-current" />
              ) : (
                <Play className="size-4 md:size-5 text-black fill-current translate-x-0.5" />
              )}
            </button>

            {/* Mute/Unmute */}
            <button
              onClick={toggleMute}
              className="size-8 md:size-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="size-4 md:size-5 text-white" />
              ) : (
                <Volume2 className="size-4 md:size-5 text-white" />
              )}
            </button>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="size-8 md:size-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <Maximize className="size-4 md:size-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}