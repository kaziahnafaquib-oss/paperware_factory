# Social feed Worker

Returns the latest Facebook Page posts and Instagram Business posts as permalinks, so the
website can embed them without shipping a Meta token to the browser. The site reads this
endpoint from Admin → Social Media → Social Feeds → **Auto-feed endpoint**.

## One-time setup (owner)

1. Meta for Developers (https://developers.facebook.com) → **Create App** → type **Business**.
2. In the app add product **Facebook Login for Business**.
3. Graph API Explorer → pick the app → add permissions `pages_show_list`,
   `pages_read_engagement`, `instagram_basic`, `business_management` →
   **Generate Access Token** → log in as the Page admin.
4. Make the token long-lived, then get the **Page** token:
   - `GET /oauth/access_token?grant_type=fb_exchange_token&client_id=APP_ID&client_secret=APP_SECRET&fb_exchange_token=SHORT_TOKEN`
   - `GET /me/accounts` → copy `access_token` of **Paperware Factory**
     (Page tokens derived from a long-lived user token do not expire).
5. Instagram Business id: `GET /{page-id}?fields=instagram_business_account` → copy `id`.
   The Instagram account must be a Business or Creator account linked to the Page.

## Deploy

```bash
cd workers/social-feed
npm install
npx wrangler login
npx wrangler secret put META_PAGE_TOKEN
npx wrangler secret put IG_USER_ID
npx wrangler deploy
```

Then:

1. Copy the Worker URL (`https://paperware-social-feed.<account>.workers.dev`).
2. Admin → Social Media → Social Feeds → paste it into **Auto-feed endpoint** → **Save**.
3. **Download social-feeds.json** → replace `public/social-feeds.json` → redeploy the site.

Secrets are never committed. `ALLOWED_ORIGINS` in `wrangler.jsonc` lists the sites allowed to call it.
