import React from "react";

interface FullScreenVideoSectionProps {
  /** YouTube link (watch/shorts/youtu.be/embed) or a direct MP4 URL. Set from Admin → CMS → Product Gallery. */
  videoUrl?: string;
}

const getYouTubeId = (url: string): string | null =>
  url.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{11})/)?.[1] ?? null;

const YT_ORIGIN = "https://www.youtube-nocookie.com";

export function FullScreenVideoSection({ videoUrl }: FullScreenVideoSectionProps) {
  const url = (videoUrl || "").trim();
  const ytId = url ? getYouTubeId(url) : null;
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = React.useState(false);
  const [ready, setReady] = React.useState(false);

  // YouTube IFrame API over postMessage: no SDK download, works with enablejsapi=1.
  const ytCommand = (func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), YT_ORIGIN);
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    if (ytId) {
      ytCommand(next ? "unMute" : "mute");
      if (next) ytCommand("setVolume", [100]);
    } else if (videoRef.current) {
      videoRef.current.muted = !next;
    }
  };

  // Hide the poster once the player reports PLAYING (state 1); fall back to a timer.
  React.useEffect(() => {
    if (!ytId) return;
    setReady(false);
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== YT_ORIGIN || typeof e.data !== "string") return;
      try {
        const d = JSON.parse(e.data);
        if (d.event === "onReady") ytCommand("playVideo");
        if (d.event === "onStateChange" && d.info === 1) setReady(true);
        if (d.event === "infoDelivery" && d.info?.playerState === 1) setReady(true);
      } catch { /* ignore non-JSON */ }
    };
    window.addEventListener("message", onMessage);
    const hello = setInterval(() => iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: "listening" }), YT_ORIGIN), 500);
    const fallback = setTimeout(() => setReady(true), 6000);
    return () => { window.removeEventListener("message", onMessage); clearInterval(hello); clearTimeout(fallback); };
  }, [ytId]);

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const embedSrc = ytId
    ? `${YT_ORIGIN}/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&rel=0&playsinline=1&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1&origin=${encodeURIComponent(origin)}`
    : "";

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black" aria-label="Paperware factory film">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {ytId ? (
          <>
            {/* Poster shows instantly while the player boots. */}
            <img
              src={`https://i.ytimg.com/vi/${ytId}/maxresdefault.jpg`}
              alt=""
              aria-hidden="true"
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-80"}`}
            />
            {/* Oversized + scaled so YouTube's corner logo and title bar sit outside the viewport. */}
            <iframe
              ref={iframeRef}
              key={ytId}
              src={embedSrc}
              title="Paperware Factory film"
              allow="autoplay; encrypted-media"
              referrerPolicy="strict-origin-when-cross-origin"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.28] opacity-80"
            />
          </>
        ) : url ? (
          <video
            ref={videoRef}
            key={url}
            src={url}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover opacity-70"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        ) : (
          <div className="h-full w-full bg-zinc-950" />
        )}
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-transparent to-black/70" />

      <div className="absolute top-10 left-10 h-20 w-20 border-t-2 border-l-2 border-[#fabf37]/30" />
      <div className="absolute bottom-10 right-10 h-20 w-20 border-b-2 border-r-2 border-[#fabf37]/30" />

      <div className="absolute bottom-10 left-10 z-10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="size-2 animate-ping rounded-full bg-[#fabf37]" />
          <span className="text-[10px] font-black tracking-[0.3em] text-white uppercase opacity-50">
            Sustainable Daily Life Usage
          </span>
        </div>
        {url && (
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={soundOn}
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-white/30 px-5 text-[11px] font-black uppercase tracking-widest text-white hover:border-[#fabf37] hover:text-[#fabf37] transition-colors"
          >
            <span aria-hidden="true">{soundOn ? "🔊" : "🔇"}</span>
            {soundOn ? "Sound off" : "Sound on"}
          </button>
        )}
      </div>
    </section>
  );
}
