import React from "react";

interface FullScreenVideoSectionProps {
  /** YouTube link (watch/shorts/youtu.be/embed) or a direct MP4 URL. Set from Admin → CMS → Product Gallery. */
  videoUrl?: string;
}

const getYouTubeId = (url: string): string | null =>
  url.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{11})/)?.[1] ?? null;

export function FullScreenVideoSection({ videoUrl }: FullScreenVideoSectionProps) {
  const url = (videoUrl || "").trim();
  const ytId = url ? getYouTubeId(url) : null;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black" aria-label="Paperware factory film">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {ytId ? (
          <iframe
            key={ytId}
            src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3`}
            title="Paperware Factory film"
            loading="lazy"
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 opacity-80"
          />
        ) : url ? (
          <video
            key={url}
            src={url}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-70"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        ) : (
          <div className="h-full w-full bg-zinc-950" />
        )}
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-transparent to-black/60" />

      <div className="absolute top-10 left-10 h-20 w-20 border-t-2 border-l-2 border-[#fabf37]/30" />
      <div className="absolute bottom-10 right-10 h-20 w-20 border-b-2 border-r-2 border-[#fabf37]/30" />

      <div className="absolute bottom-10 left-10 z-10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="size-2 animate-ping rounded-full bg-[#fabf37]" />
          <span className="text-[10px] font-black tracking-[0.3em] text-white uppercase opacity-50">
            Sustainable Daily Life Usage
          </span>
        </div>
        {ytId && (
          <a
            href={`https://www.youtube.com/watch?v=${ytId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-fit items-center rounded-full border border-white/30 px-5 text-[11px] font-black uppercase tracking-widest text-white hover:border-[#fabf37] hover:text-[#fabf37] transition-colors"
          >
            Watch with sound
          </a>
        )}
      </div>
    </section>
  );
}
