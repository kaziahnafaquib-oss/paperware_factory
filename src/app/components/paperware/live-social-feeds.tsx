import React from "react";
import { Facebook, Instagram, ArrowRight } from "lucide-react";
import {
  useSocialFeedSettings,
} from "../../lib/social-feeds";

const FollowCard = ({ href, label, handle, Icon }: { href: string; label: string; handle: string; Icon: typeof Facebook }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-4 p-6 bg-[#fabf37] rounded-[28px] border border-black/5 shadow-sm hover:shadow-xl transition-shadow"
  >
    <span className="size-12 rounded-2xl bg-black flex items-center justify-center shrink-0">
      <Icon className="size-6 text-[#fabf37]" />
    </span>
    <span className="flex-1 min-w-0">
      <span className="block text-[10px] font-black uppercase tracking-widest text-black/60">{label}</span>
      <span className="block text-sm font-black text-black truncate">{handle}</span>
    </span>
    <ArrowRight className="size-5 text-black shrink-0 group-hover:translate-x-1 transition-transform" />
  </a>
);

const handleFrom = (url: string, fallback: string) => {
  try {
    const seg = new URL(url).pathname.split("/").filter(Boolean)[0];
    return seg ? (url.includes("instagram") ? `@${seg}` : seg) : fallback;
  } catch {
    return fallback;
  }
};

export function LiveSocialFeeds() {
  const s = useSocialFeedSettings();

  return (
    <section aria-labelledby="live-feed-heading" className="w-full mb-24">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-2">Live from our pages</p>
          <h2 id="live-feed-heading" className="text-3xl sm:text-5xl font-[1000] uppercase tracking-tighter text-black leading-none">
            Latest <span className="text-[#fabf37]">Posts</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <FollowCard href={s.facebookPageUrl} label="Follow on Facebook" handle={handleFrom(s.facebookPageUrl, "Paperware Factory")} Icon={Facebook} />
        <FollowCard href={s.instagramProfileUrl} label="Follow on Instagram" handle={handleFrom(s.instagramProfileUrl, "Paperware Factory")} Icon={Instagram} />
      </div>

    </section>
  );
}
