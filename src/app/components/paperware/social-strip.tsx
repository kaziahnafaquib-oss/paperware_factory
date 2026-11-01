import React, { useEffect, useRef, useState } from "react";
import { Facebook, Instagram, ArrowRight } from "lucide-react";
import { useSocialFeedSettings, instagramEmbedUrl, facebookPostEmbedUrl } from "../../lib/social-feeds";
import "./social-strip.css";

const FB_URL = "https://www.facebook.com/paperwarefactory";
const IG_URL = "https://www.instagram.com/paperware_factory/";
const W = 320;
const H = 420;

type Item = { key: string; src: string; title: string };

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

const FollowCard = ({ href, label, Icon }: { href: string; label: string; Icon: typeof Facebook }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-4 p-6 bg-[#fabf37] rounded-[28px] border border-black/5 shadow-sm hover:shadow-xl transition-shadow"
  >
    <span className="size-12 rounded-2xl bg-black flex items-center justify-center shrink-0">
      <Icon className="size-6 text-[#fabf37]" />
    </span>
    <span className="flex-1 min-w-0 text-sm font-black uppercase tracking-widest text-black">{label}</span>
    <ArrowRight className="size-5 text-black shrink-0 group-hover:translate-x-1 transition-transform" />
  </a>
);

function MarqueeRow({ items, near, reverse }: { items: Item[]; near: boolean; reverse?: boolean }) {
  const duration = Math.max(30, items.length * 8);
  const viewportRef = useRef<HTMLDivElement>(null);
  // Hover pauses via CSS. A click inside an embed moves focus into its iframe (window blur),
  // which pauses too; clicking or tapping anywhere outside the strip resumes.
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const onBlur = () => {
      const el = document.activeElement;
      if (el instanceof HTMLIFrameElement && viewportRef.current?.contains(el)) setPaused(true);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!viewportRef.current?.contains(e.target as Node)) setPaused(false);
    };
    window.addEventListener("blur", onBlur);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);
  return (
    <div
      ref={viewportRef}
      className={`pwf-marquee-viewport${paused ? " pwf-marquee-paused" : ""}`}
    >
      <div
        className={`pwf-marquee-track${reverse ? " pwf-marquee-reverse" : ""}`}
        style={{ ["--pwf-marquee-dur" as string]: `${duration}s` }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-5 pr-5" aria-hidden={copy === 1 ? true : undefined}>
            {items.map((it) => (
              <div
                key={it.key}
                className="shrink-0 bg-white rounded-3xl overflow-hidden shadow-md border border-black/5"
                style={{ width: W, height: H }}
              >
                {near && (
                  <iframe
                    title={copy === 1 ? `${it.title} (repeat)` : it.title}
                    src={it.src}
                    loading="lazy"
                    width={W}
                    height={H}
                    style={{ border: 0 }}
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
  const s = useSocialFeedSettings();
  const [ref, near] = useNearViewport<HTMLElement>(600);

  const fb: Item[] = [];
  s.facebookPostUrls.slice(0, 10).forEach((u, i) => {
    const src = facebookPostEmbedUrl(u, W);
    if (src) fb.push({ key: `fb-${i}`, src, title: `Facebook post ${i + 1}` });
  });
  const ig: Item[] = [];
  s.instagramPostUrls.slice(0, 10).forEach((u, i) => {
    const src = instagramEmbedUrl(u);
    if (src) ig.push({ key: `ig-${i}`, src, title: `Instagram post ${i + 1}` });
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
      aria-label="Social feed"
      className={`py-20 border-t overflow-hidden ${dark ? "bg-black border-white/10" : "bg-zinc-50 border-zinc-100"}`}
    >
      <div className="text-center mb-12 space-y-2 px-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-[#fabf37]">{eyebrow}</h3>
        <h2 className={`text-3xl font-black uppercase tracking-tighter ${dark ? "text-white" : "text-zinc-900"}`}>{title}</h2>
      </div>

      {empty ? (
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FollowCard href={s.facebookPageUrl || FB_URL} label="Follow on Facebook" Icon={Facebook} />
            <FollowCard href={s.instagramProfileUrl || IG_URL} label="Follow on Instagram" Icon={Instagram} />
          </div>
          <p className={`text-center text-xs ${dark ? "text-white/50" : "text-zinc-500"}`}>
            Posts appear here once added in Admin → Social Media → Social Feeds.
          </p>
        </div>
      ) : (
        <MarqueeRow items={mixed} near={near} />
      )}
    </section>
  );
}
