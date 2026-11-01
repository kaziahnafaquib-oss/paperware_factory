import { useEffect, useMemo, useState } from "react";

export type SocialFeedSettings = {
  facebookPageUrl: string;
  instagramProfileUrl: string;
  facebookPostUrls: string[];
  instagramPostUrls: string[];
  autoRefreshMinutes: number;
  /** Optional https URL returning { facebookPostUrls, instagramPostUrls }. */
  feedEndpoint: string;
};

export const SOCIAL_FEEDS_KEY = "pwf.socialFeeds";
export const SOCIAL_FEEDS_EVENT = "pwf:social-feeds-changed";

export const DEFAULT_SOCIAL_FEED_SETTINGS: SocialFeedSettings = {
  facebookPageUrl: "https://www.facebook.com/paperwarefactory",
  instagramProfileUrl: "https://www.instagram.com/paperware_factory/",
  facebookPostUrls: [],
  instagramPostUrls: [],
  autoRefreshMinutes: 10,
  feedEndpoint: "",
};

const hostOf = (value: string): string | null => {
  try {
    const u = new URL(value.trim());
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    return u.hostname.toLowerCase().replace(/^(www|m|web|mbasic)\./, "");
  } catch {
    return null;
  }
};

export const isFacebookUrl = (value: string) => {
  const h = hostOf(value);
  return h === "facebook.com" || h === "fb.com" || h === "fb.watch";
};
export const isInstagramUrl = (value: string) => hostOf(value) === "instagram.com";

/** Returns { kind, code } for an IG post/reel/tv URL, or null. */
export function parseInstagramPost(url: string): { kind: "p" | "reel" | "tv"; code: string } | null {
  if (!isInstagramUrl(url)) return null;
  try {
    const parts = new URL(url.trim()).pathname.split("/").filter(Boolean);
    // /p/CODE, /reel/CODE, /tv/CODE, or /<user>/p/CODE
    const i = parts.findIndex((s) => s === "p" || s === "reel" || s === "reels" || s === "tv");
    if (i === -1 || !parts[i + 1]) return null;
    const code = parts[i + 1];
    if (!/^[A-Za-z0-9_-]{5,}$/.test(code)) return null;
    const seg = parts[i];
    return { kind: seg === "reels" ? "reel" : (seg as "p" | "reel" | "tv"), code };
  } catch {
    return null;
  }
}

export function instagramEmbedUrl(url: string): string | null {
  const p = parseInstagramPost(url);
  return p ? `https://www.instagram.com/${p.kind}/${p.code}/embed/` : null;
}

export function facebookPostEmbedUrl(url: string, width = 500): string | null {
  if (!isFacebookUrl(url)) return null;
  return `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url.trim())}&show_text=true&width=${width}`;
}

export function facebookPageEmbedUrl(pageUrl: string, width = 500, height = 700): string | null {
  if (!isFacebookUrl(pageUrl)) return null;
  const w = Math.min(500, Math.max(180, Math.round(width)));
  return (
    `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(pageUrl.trim())}` +
    `&tabs=timeline&width=${w}&height=${Math.round(height)}&small_header=true&adapt_container_width=true` +
    `&hide_cover=false&show_facepile=false`
  );
}

const cleanList = (v: unknown, test: (s: string) => boolean): string[] =>
  Array.isArray(v)
    ? Array.from(new Set(v.filter((s): s is string => typeof s === "string").map((s) => s.trim()).filter(test))).slice(0, 24)
    : [];

export function sanitizeSocialFeedSettings(raw: unknown): SocialFeedSettings {
  const d = DEFAULT_SOCIAL_FEED_SETTINGS;
  if (!raw || typeof raw !== "object") return { ...d };
  const r = raw as Record<string, unknown>;
  const fb = typeof r.facebookPageUrl === "string" && isFacebookUrl(r.facebookPageUrl) ? r.facebookPageUrl.trim() : d.facebookPageUrl;
  const ig = typeof r.instagramProfileUrl === "string" && isInstagramUrl(r.instagramProfileUrl) ? r.instagramProfileUrl.trim() : d.instagramProfileUrl;
  const mins = typeof r.autoRefreshMinutes === "number" && isFinite(r.autoRefreshMinutes) ? Math.min(1440, Math.max(0, Math.round(r.autoRefreshMinutes))) : d.autoRefreshMinutes;
  return {
    facebookPageUrl: fb,
    instagramProfileUrl: ig,
    facebookPostUrls: cleanList(r.facebookPostUrls, (s) => !!facebookPostEmbedUrl(s)),
    instagramPostUrls: cleanList(r.instagramPostUrls, (s) => !!instagramEmbedUrl(s)),
    autoRefreshMinutes: mins,
    feedEndpoint: typeof r.feedEndpoint === "string" && /^https:\/\//i.test(r.feedEndpoint.trim()) ? r.feedEndpoint.trim() : "",
  };
}

export function loadSocialFeedSettings(): SocialFeedSettings {
  try {
    const raw = localStorage.getItem(SOCIAL_FEEDS_KEY);
    if (!raw) return { ...DEFAULT_SOCIAL_FEED_SETTINGS };
    return sanitizeSocialFeedSettings(JSON.parse(raw));
  } catch {
    return { ...DEFAULT_SOCIAL_FEED_SETTINGS };
  }
}

export function saveSocialFeedSettings(settings: SocialFeedSettings): SocialFeedSettings {
  const clean = sanitizeSocialFeedSettings(settings);
  try {
    localStorage.setItem(SOCIAL_FEEDS_KEY, JSON.stringify(clean));
    localStorage.setItem(SOCIAL_FEEDS_SAVED_AT_KEY, String(Date.now()));
  } catch {
    /* storage unavailable: still notify same-tab listeners */
  }
  try {
    window.dispatchEvent(new CustomEvent(SOCIAL_FEEDS_EVENT, { detail: clean }));
  } catch {
    /* ignore */
  }
  return clean;
}

export function resetSocialFeedSettings(): SocialFeedSettings {
  try {
    localStorage.removeItem(SOCIAL_FEEDS_KEY);
    localStorage.removeItem(SOCIAL_FEEDS_SAVED_AT_KEY);
  } catch {
    /* ignore */
  }
  try {
    window.dispatchEvent(new CustomEvent(SOCIAL_FEEDS_EVENT));
  } catch {
    /* ignore */
  }
  return { ...DEFAULT_SOCIAL_FEED_SETTINGS };
}

export const SOCIAL_FEEDS_SAVED_AT_KEY = "pwf.socialFeeds.savedAt";

export function hasLocalSocialFeedOverride(): boolean {
  try {
    return localStorage.getItem(SOCIAL_FEEDS_KEY) !== null;
  } catch {
    return false;
  }
}

export function getSocialFeedsSavedAt(): number | null {
  try {
    const v = Number(localStorage.getItem(SOCIAL_FEEDS_SAVED_AT_KEY));
    return v > 0 ? v : null;
  } catch {
    return null;
  }
}

let publishedPromise: Promise<SocialFeedSettings | null> | null = null;

/** Fetches the published public/social-feeds.json once; resolves null on any error. */
export function fetchPublishedSocialFeedSettings(force = false): Promise<SocialFeedSettings | null> {
  if (!publishedPromise || force) {
    publishedPromise = (async () => {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}social-feeds.json`, { cache: "no-store" });
        if (!res.ok) return null;
        return sanitizeSocialFeedSettings(await res.json());
      } catch {
        return null;
      }
    })();
  }
  return publishedPromise;
}

export function useSocialFeedSettings(): SocialFeedSettings {
  const [local, setLocal] = useState<SocialFeedSettings | null>(() =>
    hasLocalSocialFeedOverride() ? loadSocialFeedSettings() : null,
  );
  const [published, setPublished] = useState<SocialFeedSettings | null>(null);
  useEffect(() => {
    let alive = true;
    fetchPublishedSocialFeedSettings().then((p) => {
      if (alive && p) setPublished(p);
    });
    return () => {
      alive = false;
    };
  }, []);
  useEffect(() => {
    const reload = () => setLocal(hasLocalSocialFeedOverride() ? loadSocialFeedSettings() : null);
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === SOCIAL_FEEDS_KEY) reload();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener(SOCIAL_FEEDS_EVENT, reload);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(SOCIAL_FEEDS_EVENT, reload);
    };
  }, []);
  const base = local ?? published ?? DEFAULT_SOCIAL_FEED_SETTINGS;
  const endpoint = base.feedEndpoint;
  const mins = base.autoRefreshMinutes;
  const [remote, setRemote] = useState<{ fb: string[]; ig: string[] }>({ fb: [], ig: [] });
  useEffect(() => {
    if (!endpoint) {
      setRemote({ fb: [], ig: [] });
      return;
    }
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch(endpoint, { cache: "no-store" });
        if (!res.ok) return;
        const j = (await res.json()) as Record<string, unknown>;
        const fb = cleanList(j.facebookPostUrls, (u) => !!facebookPostEmbedUrl(u));
        const ig = cleanList(j.instagramPostUrls, (u) => !!instagramEmbedUrl(u));
        if (alive) setRemote({ fb, ig });
      } catch {
        /* keep manual lists */
      }
    };
    load();
    const id = window.setInterval(load, (mins > 0 ? mins : 10) * 60_000);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, [endpoint, mins]);
  return useMemo(() => {
    if (!remote.fb.length && !remote.ig.length) return base;
    const merge = (a: string[], b: string[]) => Array.from(new Set([...a, ...b])).slice(0, 10);
    return {
      ...base,
      facebookPostUrls: merge(remote.fb, base.facebookPostUrls),
      instagramPostUrls: merge(remote.ig, base.instagramPostUrls),
    };
  }, [base, remote]);
}
