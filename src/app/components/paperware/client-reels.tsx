import React from "react";
import { Play } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { mediaUrl } from "./factory-clip";
import posterChaChill from "../../../assets/video-posters/cha-chill.jpg";

/**
 * Facebook reels from the owner's page (facebook.com/paperwarefactory).
 * Client label = the brand named in the reel's own caption/hashtags (verified 3 Nov 2026).
 * Each reel appears once. Featured embeds start muted when scrolled into view; product videos load on click.
 */
// local: Facebook refuses to embed the reel ("may contain content owned by someone else", i.e. licensed audio),
// so the owner had it downloaded (4 Nov 2026) and it plays from public/media/reels (see public/media/SOURCES.txt).
type Reel = { id: string; client: string; note?: string; local?: { src: string; poster: string } };

const FEATURED: Reel[] = [
  { id: "2176346162786287", client: "Beanspout", note: "Eco-friendly paper cups" },
  { id: "666181465980371", client: "Dhakaiya Khana", note: "Paper cups" },
  { id: "2542781386064650", client: "Cha & Chill", note: "Paper cups", local: { src: mediaUrl("reels/cha-chill.mp4"), poster: posterChaChill } },
];

const PRODUCT_VIDEOS: Reel[] = [
  { id: "1171255701662094", client: "Peyala" },
  { id: "2037786680376538", client: "Bee Sweets" },
  { id: "2299910513765302", client: "La Tarte" },
  { id: "881243651515800", client: "Bread & Beyond" },
  { id: "1414211363452193", client: "Burger King Bangladesh" },
  { id: "26272372872351579", client: "BSH" },
  { id: "2308408036322440", client: "Chuti Resort" },
  { id: "1672038250642299", client: "Chuti Resort" },
  { id: "1731323144676473", client: "Paperware Factory", note: "Custom printed paper cups" },
];

// Row of 3 that slides in from the side and starts its videos (muted) when scrolled into view.
function SlideRow({ reels, from }: { reels: Reel[]; from: "left" | "right" }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const hidden = from === "left" ? "-translate-x-24" : "translate-x-24";
  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8 transition-all duration-700 ease-out motion-reduce:transition-none ${shown ? "translate-x-0 opacity-100" : `${hidden} opacity-0 motion-reduce:translate-x-0 motion-reduce:opacity-100`}`}
    >
      {reels.map((r) => <ReelCard key={r.id} reel={r} autoplay={shown} />)}
    </div>
  );
}

function ReelCard({ reel, tall, autoplay }: { reel: Reel; tall?: boolean; autoplay?: boolean }) {
  const [open, setOpen] = React.useState(false);
  const boxRef = React.useRef<HTMLDivElement>(null);
  // Featured reels start (muted) once scrolled into view; the rest load on click.
  React.useEffect(() => {
    const el = boxRef.current;
    if (!autoplay || !el) return;
    setOpen(true);
  }, [autoplay]);
  const url = `https://www.facebook.com/reel/${reel.id}/`;
  return (
    <figure className="group flex flex-col gap-3">
      <div ref={boxRef} className={`relative overflow-hidden rounded-3xl bg-zinc-900 ${tall ? "aspect-[9/16]" : "aspect-[9/16]"}`}>
        {reel.local ? (
          <video
            ref={(el) => { if (el && autoplay) { el.muted = true; void el.play()?.catch?.(() => {}); } }}
            src={reel.local.src}
            poster={reel.local.poster}
            className="absolute inset-0 size-full object-cover"
            controls
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`${reel.client} reel`}
          />
        ) : open ? (
          <iframe
            title={`${reel.client} reel`}
            src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&autoplay=true&mute=1`}
            className="absolute inset-0 size-full border-0"
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-zinc-800 to-black text-white"
            aria-label={`Play ${reel.client} reel`}
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-[#fabf37] text-black transition-transform group-hover:scale-110">
              <Play className="size-7 translate-x-0.5" fill="currentColor" />
            </span>
            <span className="px-4 text-center text-lg font-black uppercase tracking-tight">{reel.client}</span>
          </button>
        )}
      </div>
      <figcaption className="px-1">
        <div className="text-sm font-black uppercase tracking-wide text-black">{reel.client}</div>
        {reel.note && <div className="text-xs font-medium text-zinc-500">{reel.note}</div>}
      </figcaption>
    </figure>
  );
}

export function ClientReels() {
  const { t } = useLanguage();
  return (
    <>
      <section className="overflow-hidden bg-white py-16 md:py-24" aria-labelledby="client-reels-h">
        <div className="container mx-auto px-4 md:px-6">
          <h2 id="client-reels-h" className="mb-2 text-3xl font-black uppercase tracking-tight md:text-5xl">
            {t("clients_client_reels")}
          </h2>
          <p className="mb-10 max-w-xl text-sm font-medium text-zinc-500">{t("clients_client_reels_sub")}</p>
          <SlideRow reels={FEATURED} from="left" />
        </div>
      </section>
      <section className="bg-zinc-50 py-16 md:py-24" aria-labelledby="product-videos-h">
        <div className="container mx-auto px-4 md:px-6">
          <h2 id="product-videos-h" className="mb-2 text-2xl font-black uppercase tracking-tight md:text-4xl">
            {t("clients_product_videos")}
          </h2>
          <p className="mb-10 max-w-xl text-sm font-medium text-zinc-500">{t("clients_product_videos_sub")}</p>
          <div className="space-y-10 overflow-hidden">
            {[0, 3, 6].map((i, n) => (
              <SlideRow key={i} reels={PRODUCT_VIDEOS.slice(i, i + 3)} from={n % 2 === 0 ? "right" : "left"} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
