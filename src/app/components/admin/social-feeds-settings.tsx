import React from "react";
import { toast } from "sonner";
import { Facebook, Instagram, Plus, Trash2, Save, RotateCcw } from "lucide-react";
import {
  DEFAULT_SOCIAL_FEED_SETTINGS,
  SocialFeedSettings,
  loadSocialFeedSettings,
  saveSocialFeedSettings,
  resetSocialFeedSettings,
  fetchPublishedSocialFeedSettings,
  sanitizeSocialFeedSettings,
  isFacebookUrl,
  isInstagramUrl,
  instagramEmbedUrl,
  facebookPostEmbedUrl,
} from "../../lib/social-feeds";

const inputCls =
  "w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#fabf37]";
const labelCls = "block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2";

type ListProps = {
  label: string;
  placeholder: string;
  urls: string[];
  validate: (u: string) => string | null; // returns embed src or null
  onChange: (next: string[]) => void;
  frameHeight: number;
};

function UrlList({ label, placeholder, urls, validate, onChange, frameHeight }: ListProps) {
  const [draft, setDraft] = React.useState("");
  const add = () => {
    const v = draft.trim();
    if (!v) return;
    if (!validate(v)) {
      toast.error("Not a valid facebook.com / fb.com / instagram.com post URL for this list");
      return;
    }
    if (urls.includes(v)) {
      toast.error("Already added");
      return;
    }
    onChange([...urls, v]);
    setDraft("");
  };
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="flex gap-2">
        <input
          className={inputCls}
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
        />
        <button type="button" onClick={add} className="shrink-0 bg-[#fabf37] text-black px-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-1">
          <Plus className="size-4" /> Add
        </button>
      </div>
      {urls.length > 0 && (
        <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {urls.map((u) => (
            <li key={u} className="bg-zinc-900 border border-white/10 rounded-2xl p-3">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] text-zinc-400 truncate">{u}</span>
                <button type="button" aria-label="Remove" onClick={() => onChange(urls.filter((x) => x !== u))} className="text-zinc-500 hover:text-red-500">
                  <Trash2 className="size-4" />
                </button>
              </div>
              <iframe title={`Preview ${u}`} src={validate(u) || undefined} loading="lazy" width="100%" height={frameHeight} style={{ border: 0, background: "#fff", borderRadius: 12 }} allow="encrypted-media" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function SocialFeedsSettings() {
  const [s, setS] = React.useState<SocialFeedSettings>(() => loadSocialFeedSettings());
  const patch = (p: Partial<SocialFeedSettings>) => setS((prev) => ({ ...prev, ...p }));

  const fbOk = isFacebookUrl(s.facebookPageUrl);
  const igOk = isInstagramUrl(s.instagramProfileUrl);

  const save = () => {
    if (!fbOk) return toast.error("Facebook page URL must be on facebook.com or fb.com");
    if (!igOk) return toast.error("Instagram profile URL must be on instagram.com");
    const mins = Math.max(0, Math.min(1440, Math.round(Number(s.autoRefreshMinutes) || 0)));
    const saved = saveSocialFeedSettings({ ...s, autoRefreshMinutes: mins });
    setS(saved);
    toast.success("Social feeds saved. Public Socials page updated.");
  };

  const reset = () => {
    setS(resetSocialFeedSettings());
    toast.success("Social feeds reset to defaults");
  };

  const download = () => {
    const clean = sanitizeSocialFeedSettings(s);
    const blob = new Blob([JSON.stringify(clean, null, 2) + "\n"], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "social-feeds.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const loadPublished = async () => {
    const p = await fetchPublishedSocialFeedSettings(true);
    if (!p) return toast.error("Could not load the published social-feeds.json");
    setS(p);
    toast.success("Loaded published settings into the form (not saved)");
  };


  return (
    <section aria-labelledby="social-feeds-heading" className="bg-black border border-white/5 rounded-[32px] p-6 md:p-8 space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 id="social-feeds-heading" className="text-xl font-black text-white uppercase tracking-tighter">Social Feeds</h3>
          <p className="text-[11px] text-zinc-500 mt-1 max-w-xl">
            Live embeds on the public Socials page. Facebook shows the page timeline; Instagram has no public timeline embed, so add individual post or reel URLs. Settings are stored in this browser.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={reset} className="px-4 py-3 rounded-xl border border-white/10 text-zinc-300 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:border-white/30">
            <RotateCcw className="size-4" /> Reset to defaults
          </button>
          <button type="button" onClick={loadPublished} className="px-4 py-3 rounded-xl border border-white/10 text-zinc-300 font-black text-[10px] uppercase tracking-widest hover:border-white/30">
            Load published
          </button>
          <button type="button" onClick={download} className="px-4 py-3 rounded-xl border border-[#fabf37]/40 text-[#fabf37] font-black text-[10px] uppercase tracking-widest hover:border-[#fabf37]">
            Download social-feeds.json
          </button>
          <button type="button" onClick={save} className="bg-[#fabf37] text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-all">
            <Save className="size-4" /> Save
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelCls} htmlFor="sf-fb"><Facebook className="inline size-3 mr-1" /> Facebook page URL</label>
          <input id="sf-fb" className={`${inputCls} ${fbOk ? "" : "border-red-500"}`} value={s.facebookPageUrl} placeholder={DEFAULT_SOCIAL_FEED_SETTINGS.facebookPageUrl} onChange={(e) => patch({ facebookPageUrl: e.target.value })} />
          {!fbOk && <p className="text-[10px] text-red-500 mt-1">Must be a facebook.com or fb.com URL.</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="sf-ig"><Instagram className="inline size-3 mr-1" /> Instagram profile URL</label>
          <input id="sf-ig" className={`${inputCls} ${igOk ? "" : "border-red-500"}`} value={s.instagramProfileUrl} placeholder={DEFAULT_SOCIAL_FEED_SETTINGS.instagramProfileUrl} onChange={(e) => patch({ instagramProfileUrl: e.target.value })} />
          {!igOk && <p className="text-[10px] text-red-500 mt-1">Must be an instagram.com URL.</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="sf-refresh">Auto-refresh (minutes, 0 = off)</label>
          <input id="sf-refresh" type="number" min={0} max={1440} className={inputCls} value={s.autoRefreshMinutes} onChange={(e) => patch({ autoRefreshMinutes: Number(e.target.value) })} />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls} htmlFor="sf-endpoint">Auto-feed endpoint (optional)</label>
          <input id="sf-endpoint" type="url" placeholder="https://" className={inputCls} value={s.feedEndpoint} onChange={(e) => patch({ feedEndpoint: e.target.value })} />
          <p className="text-xs text-zinc-400 mt-1">URL of a feed service that returns the latest post links</p>
        </div>
      </div>

      <UrlList
        label="Instagram post / reel URLs"
        placeholder="https://www.instagram.com/p/XXXXXXXXXXX/"
        urls={s.instagramPostUrls}
        validate={instagramEmbedUrl}
        onChange={(instagramPostUrls) => patch({ instagramPostUrls })}
        frameHeight={480}
      />
      <UrlList
        label="Facebook post URLs"
        placeholder="https://www.facebook.com/paperwarefactory/posts/..."
        urls={s.facebookPostUrls}
        validate={(u) => facebookPostEmbedUrl(u, 340)}
        onChange={(facebookPostUrls) => patch({ facebookPostUrls })}
        frameHeight={420}
      />
      <p className="text-[10px] text-zinc-500">Save = preview in this browser only. Download and replace <code>public/social-feeds.json</code>, then redeploy, to publish for all visitors.</p>
    </section>
  );
}
