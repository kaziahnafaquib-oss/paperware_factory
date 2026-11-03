import React from "react";
import { Facebook, Instagram, ArrowRight } from "lucide-react";
import { useSocialFeedSettings, instagramEmbedUrl, facebookPostEmbedUrl } from "../../lib/social-feeds";
import "./social-strip.css";
import { useLanguage } from "../../context/LanguageContext";

const FB_URL = "https://www.facebook.com/paperwarefactory";
const IG_URL = "https://www.instagram.com/paperware_factory/";
const W = 320;
const H = 420;

type Item = { key: string; src: string; title: string; href: string; kind: "fb" | "ig" };
/** Facebook's post plugin draws its own square frame and padding; crop this much on every side so the card's rounded corners show. */
const FB_CROP = 14;

function useNearViewport<T extends HTMLElement>(margin = 600) {
  const ref = React.useRef<T>(null);
  const [near, setNear] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: `${margin}px` },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, near] as const;
}

const FollowCard = ({ href, label, Icon }: { href: string; label: string; Icon: typeof Facebook }) => {
  const { t } = useLanguage();
  return (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-4 p-6 bg-[#fabf37] rounded-[28px] border border-black/5 shadow-sm hover:shadow-xl transition-shadow"
  >
    <span className="size-12 rounded-2xl bg-black flex items-center justify-center shrink-0">
      <Icon className="size-6 text-[#fabf37]" />
    </span>
    <span className="flex-1 min-w-0 text-sm font-black uppercase tracking-widest text-black">{t(label)}</span>
    <ArrowRight className="size-5 text-black shrink-0 group-hover:translate-x-1 transition-transform" />
  </a>
  );
};

function MarqueeRow({ items, near, reverse }: { items: Item[]; near: boolean; reverse?: boolean }) {
  const { t } = useLanguage();
  const duration = Math.max(30, items.length * 5);
  return (
    <div className="pwf-marquee-viewport">
      <div
        className={`pwf-marquee-track${reverse ? " pwf-marquee-reverse" : ""}`}
        style={{ ["--pwf-marquee-dur" as string]: `${duration}s` }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-5 pr-5" aria-hidden={copy === 1 ? true : undefined}>
            {items.map((it) => (
              <div
                key={it.key}
                className="relative shrink-0 bg-white rounded-3xl overflow-hidden shadow-md border border-black/5"
                style={{ width: W, height: H }}
              >
                {/* Same-origin layer: hover pauses the row (iframes swallow hover), click opens the post. */}
                <a
                  href={it.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${it.title}`}
                  className="absolute inset-0 z-10 rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#fabf37]"
                  tabIndex={copy === 1 ? -1 : undefined}
                />
                {/* Owner (1 Nov 2026): platform badge in the bottom corner of every card. */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute bottom-3 right-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full text-white shadow-lg ring-2 ring-white ${
                    it.kind === "fb" ? "bg-[#1877F2]" : "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]"
                  }`}
                >
                  {it.kind === "fb" ? <Facebook size={16} strokeWidth={2.5} /> : <Instagram size={16} strokeWidth={2.5} />}
                </span>
                {near && (
                  <iframe
                    title={t(copy === 1 ? `${it.title} (repeat)` : it.title)}
                    src={it.src}
                    loading="lazy"
                    width={it.kind === "fb" ? W + FB_CROP * 2 : W}
                    height={it.kind === "fb" ? H + FB_CROP * 2 : H}
                    style={it.kind === "fb" ? { border: 0, margin: -FB_CROP, display: "block" } : { border: 0 }}
                    allow="encrypted-media"
                    referrerPolicy="strict-origin-when-cross-origin"
                    tabIndex={copy === 1 ? -1 : undefined}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SocialStrip({
  title = "#PaperwareLife",
  eyebrow = "Social Hub",
  dark = false,
  postsOnly = false,
}: {
  title?: string;
  eyebrow?: string;
  dark?: boolean;
  /** Render only the post rows (nothing when no posts are configured). */
  postsOnly?: boolean;
}) {
  const { t } = useLanguage();
  const s = useSocialFeedSettings();
  const [ref, near] = useNearViewport<HTMLElement>(600);

  const fb: Item[] = [];
  s.facebookPostUrls.slice(0, 10).forEach((u, i) => {
    const src = facebookPostEmbedUrl(u, W + FB_CROP * 2);
    if (src) fb.push({ key: `fb-${i}`, src, title: `Facebook post ${i + 1}`, href: u, kind: "fb" });
  });
  const ig: Item[] = [];
  s.instagramPostUrls.slice(0, 10).forEach((u, i) => {
    const src = instagramEmbedUrl(u);
    if (src) ig.push({ key: `ig-${i}`, src, title: `Instagram post ${i + 1}`, href: u, kind: "ig" });
  });
  // One mixed row: Facebook, Instagram, Facebook, Instagram... leftovers follow at the end.
  const mixed: Item[] = [];
  for (let i = 0; i < Math.max(fb.length, ig.length); i++) {
    if (fb[i]) mixed.push(fb[i]);
    if (ig[i]) mixed.push(ig[i]);
  }
  const empty = mixed.length === 0;
  if (postsOnly && empty) return null;

  return (
    <section
      ref={ref}
      aria-label={t("social_strip_social_feed")}
      className={`py-20 border-t overflow-hidden ${dark ? "bg-black border-white/10" : "bg-zinc-50 border-zinc-100"}`}
    >
      <div className="text-center mb-12 space-y-2 px-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-[#fabf37]">{t(eyebrow)}</h3>
        <h2 className={`text-3xl font-black uppercase tracking-tighter ${dark ? "text-white" : "text-zinc-900"}`}>{t(title)}</h2>
      </div>

      {empty ? (
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FollowCard href={s.facebookPageUrl || FB_URL} label={t("live_social_feeds_follow_on_facebook")} Icon={Facebook} />
            <FollowCard href={s.instagramProfileUrl || IG_URL} label={t("live_social_feeds_follow_on_instagram")} Icon={Instagram} />
          </div>
          <p className={`text-center text-xs ${dark ? "text-white/50" : "text-zinc-500"}`}>
            {t("social_strip_posts_appear_here_once_added")}
          </p>
        </div>
      ) : (
        <MarqueeRow items={mixed} near={near} />
      )}
    </section>
  );
}
