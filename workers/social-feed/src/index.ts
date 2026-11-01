/**
 * Paperware Factory — social feed proxy (Cloudflare Worker).
 *
 * Returns the latest public post permalinks from the Facebook Page and the linked
 * Instagram Business account so the website can embed them without exposing a token.
 *
 * GET /  -> { facebookPostUrls: string[], instagramPostUrls: string[], fetchedAt: string, errors?: string[] }
 *
 * Responses are cached at the edge for CACHE_SECONDS. The token never leaves the Worker.
 */
export interface Env {
  META_PAGE_TOKEN: string;
  IG_USER_ID?: string;
  FACEBOOK_PAGE_ID: string;
  ALLOWED_ORIGINS: string;
  CACHE_SECONDS: string;
  LIMIT: string;
}

const GRAPH = "https://graph.facebook.com/v21.0";

type FbPost = { id: string; permalink_url?: string; is_published?: boolean };
type IgMedia = { id: string; permalink?: string; media_type?: string };

async function graph<T>(path: string, token: string): Promise<T> {
  const sep = path.includes("?") ? "&" : "?";
  const res = await fetch(`${GRAPH}/${path}${sep}access_token=${encodeURIComponent(token)}`, {
    headers: { accept: "application/json" },
  });
  if (!res.ok) throw new Error(`graph ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return (await res.json()) as T;
}

function corsHeaders(origin: string | null, allowed: string[]): Record<string, string> {
  const ok = origin !== null && allowed.includes(origin);
  return {
    "access-control-allow-origin": ok ? origin : allowed[0] ?? "*",
    "access-control-allow-methods": "GET, OPTIONS",
    "access-control-allow-headers": "content-type",
    vary: "origin",
  };
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const allowed = env.ALLOWED_ORIGINS.split(",").map((s) => s.trim()).filter(Boolean);
    const cors = corsHeaders(request.headers.get("origin"), allowed);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "GET") return new Response("method not allowed", { status: 405, headers: cors });
    if (!env.META_PAGE_TOKEN) {
      return Response.json({ error: "META_PAGE_TOKEN not configured" }, { status: 503, headers: cors });
    }

    const limit = Math.min(25, Math.max(1, Number(env.LIMIT) || 10));
    const ttl = Math.max(60, Number(env.CACHE_SECONDS) || 600);

    const cache = caches.default;
    const cacheKey = new Request(new URL("/feed", request.url).toString(), { method: "GET" });
    const hit = await cache.match(cacheKey);
    if (hit) {
      const r = new Response(hit.body, hit);
      for (const [k, v] of Object.entries(cors)) r.headers.set(k, v);
      r.headers.set("x-cache", "HIT");
      return r;
    }

    const [fb, ig] = await Promise.allSettled([
      graph<{ data: FbPost[] }>(
        `${env.FACEBOOK_PAGE_ID}/published_posts?fields=id,permalink_url,is_published&limit=${limit}`,
        env.META_PAGE_TOKEN,
      ),
      env.IG_USER_ID
        ? graph<{ data: IgMedia[] }>(`${env.IG_USER_ID}/media?fields=id,permalink,media_type&limit=${limit}`, env.META_PAGE_TOKEN)
        : Promise.resolve({ data: [] as IgMedia[] }),
    ]);

    const facebookPostUrls =
      fb.status === "fulfilled"
        ? fb.value.data
            .filter((p) => p.is_published !== false && typeof p.permalink_url === "string")
            .map((p) => p.permalink_url as string)
            .slice(0, limit)
        : [];
    const instagramPostUrls =
      ig.status === "fulfilled"
        ? ig.value.data.filter((m) => typeof m.permalink === "string").map((m) => m.permalink as string).slice(0, limit)
        : [];

    const errors: string[] = [];
    if (fb.status === "rejected") errors.push(`facebook: ${String(fb.reason).slice(0, 160)}`);
    if (ig.status === "rejected") errors.push(`instagram: ${String(ig.reason).slice(0, 160)}`);

    const body = JSON.stringify({
      facebookPostUrls,
      instagramPostUrls,
      fetchedAt: new Date().toISOString(),
      ...(errors.length ? { errors } : {}),
    });
    const res = new Response(body, {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": `public, max-age=${ttl}`,
        "x-cache": "MISS",
        ...cors,
      },
    });
    if (!errors.length) ctx.waitUntil(cache.put(cacheKey, res.clone()));
    return res;
  },
} satisfies ExportedHandler<Env>;
