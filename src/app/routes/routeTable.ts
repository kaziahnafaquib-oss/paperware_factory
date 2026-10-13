/**
 * Single source of truth for page ids <-> URL paths (Phase A, audit TR-01).
 *
 * The app historically navigated by setting a `currentPage` id in React state, so every
 * page lived at "/". Existing callers still pass those ids to `handlePageChange(id)`;
 * MainContent now turns them into real URLs with `pathFor(id)` and reads the current
 * page back from the URL with `idForPath(pathname)`. Ids are unchanged so the
 * ~16 existing call sites keep working.
 */

export type RouteEntry = {
  id: string;
  path: string;
  title: string;
  /** Excluded from sitemap / indexing (portal, admin, utility pages). */
  noindex?: boolean;
};

const SITE = "Paperware Factory";

export const ROUTES: readonly RouteEntry[] = [
  { id: "home", path: "/", title: `${SITE} | Paper Cups & Custom Paper Packaging, Dhaka, Bangladesh` },

  // Products
  { id: "products", path: "/products", title: `All Products | ${SITE}` },
  { id: "papercups", path: "/products/paper-cups", title: `Paper Cups | ${SITE}` },
  { id: "office-stationary", path: "/products/office-stationery", title: `Office Stationery | ${SITE}` },
  { id: "restaurant-supplies", path: "/products/restaurant-supplies", title: `Restaurant Supplies | ${SITE}` },
  { id: "marketing-materials", path: "/products/marketing-materials", title: `Paper Bags & Marketing Print | ${SITE}` },
  { id: "pharma-supplies", path: "/products/pharma-supplies", title: `Pharma Supplies | ${SITE}` },
  { id: "fmcg-supplies", path: "/products/fmcg-packaging", title: `FMCG Packaging | ${SITE}` },
  { id: "garments", path: "/products/garment-accessories", title: `Garment Accessories | ${SITE}` },
  { id: "product-details", path: "/products/details", title: `Product Details | ${SITE}`, noindex: true },
  { id: "catalog-3d", path: "/products/3d-catalog", title: `3D Catalogue | ${SITE}` },
  { id: "gallery", path: "/gallery", title: `Gallery | ${SITE}` },
  { id: "solutions", path: "/solutions", title: `Solutions | ${SITE}` },
  { id: "studio", path: "/studio", title: `Design Studio | ${SITE}` },

  // Company
  { id: "about", path: "/about", title: `About Us | ${SITE}` },
  { id: "company", path: "/company", title: `Company | ${SITE}` },
  { id: "clients", path: "/clients", title: `Clients | ${SITE}` },
  { id: "partners", path: "/partners", title: `Partners | ${SITE}` },
  { id: "sustainability", path: "/sustainability", title: `Sustainability | ${SITE}` },
  { id: "compliance", path: "/compliance", title: `Compliance | ${SITE}` },
  { id: "future-plan", path: "/future-plan", title: `Future Plan | ${SITE}` },
  { id: "csr", path: "/csr", title: `CSR | ${SITE}` },
  { id: "career", path: "/careers", title: `Careers | ${SITE}` },

  // Business & manufacturing
  { id: "business", path: "/business", title: `Business Solutions | ${SITE}` },
  { id: "partner-program", path: "/partner-program", title: `Partner Program | ${SITE}` },
  { id: "investor", path: "/investors", title: `Investor Relations | ${SITE}` },
  { id: "franchise", path: "/franchise", title: `Franchise | ${SITE}` },
  { id: "manufacturing", path: "/manufacturing", title: `Manufacturing | ${SITE}` },
  { id: "factory-live", path: "/manufacturing/factory", title: `Factory | ${SITE}` },
  { id: "erp", path: "/erp", title: `ERP & Order Process | ${SITE}` },
  { id: "export", path: "/export", title: `Export | ${SITE}` },
  { id: "technical-manifesto", path: "/technical-manifesto", title: `Technical Manifesto | ${SITE}` },

  // Conversion & support
  { id: "contact", path: "/contact", title: `Contact | ${SITE}` },
  { id: "quote", path: "/quote", title: `Request a Quote | ${SITE}` },
  { id: "quotation-basket", path: "/quote/basket", title: `Quotation Basket | ${SITE}`, noindex: true },
  { id: "bulk-quotes", path: "/quote/bulk", title: `Bulk Order | ${SITE}`, noindex: true },
  { id: "tracking", path: "/track", title: `Order Status | ${SITE}` },
  { id: "product-journey", path: "/track/journey", title: `Product Journey | ${SITE}`, noindex: true },
  { id: "product-feedback", path: "/feedback", title: `Product Feedback | ${SITE}` },
  { id: "faq", path: "/faq", title: `FAQ | ${SITE}` },
  { id: "socials", path: "/social", title: `Social | ${SITE}` },
  { id: "more", path: "/more", title: `More | ${SITE}` },
  { id: "privacy-policy", path: "/privacy", title: `Privacy Policy | ${SITE}` },

  // Portal / admin (only rendered when built with VITE_ENABLE_PORTALS=true)
  { id: "client-portal", path: "/portal", title: `Client Portal | ${SITE}`, noindex: true },
  { id: "admin-portal", path: "/admin/portal", title: `Admin | ${SITE}`, noindex: true },
  { id: "admin", path: "/admin", title: `Admin | ${SITE}`, noindex: true },

  { id: "not-found", path: "/404", title: `Page not found | ${SITE}`, noindex: true },
];

/** Old or alternative ids that should land on an existing page. */
const ID_ALIASES: Record<string, string> = {
  "impact-dashboard": "sustainability", // retired in Phase A0
  "about-us": "about",
  "garments-supplies": "garments",
};

/** Paths that used to exist (old sitemap, misspellings) -> canonical path. */
export const PATH_REDIRECTS: Record<string, string> = {
  "/about-us": "/about",
  "/papercups": "/products/paper-cups",
  "/office-stationary": "/products/office-stationery",
  "/products/office-stationary": "/products/office-stationery",
  "/restaurant-supplies": "/products/restaurant-supplies",
  "/marketing-materials": "/products/marketing-materials",
  "/pharma-supplies": "/products/pharma-supplies",
  "/fmcg-garments": "/products/fmcg-packaging",
  "/garments": "/products/garment-accessories",
  "/career": "/careers",
  "/privacy-policy": "/privacy",
  "/socials": "/social",
  "/factory-live": "/manufacturing/factory",
  "/impact-dashboard": "/sustainability",
  "/tracking": "/track",
};

const byId = new Map(ROUTES.map((r) => [r.id, r]));
const byPath = new Map(ROUTES.map((r) => [r.path, r]));

export function normalizePath(pathname: string): string {
  if (!pathname) return "/";
  const trimmed = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return trimmed.toLowerCase() || "/";
}

/** URL path for a page id. Unknown ids go home (previously they rendered a fallback hero). */
export function pathFor(id: string): string {
  const resolved = ID_ALIASES[id] ?? id;
  return byId.get(resolved)?.path ?? "/";
}

/** Page id for a URL path; unknown paths -> "not-found". */
export function idForPath(pathname: string): string {
  return byPath.get(normalizePath(pathname))?.id ?? "not-found";
}

export function redirectFor(pathname: string): string | undefined {
  return PATH_REDIRECTS[normalizePath(pathname)];
}

export function routeFor(id: string): RouteEntry | undefined {
  return byId.get(ID_ALIASES[id] ?? id);
}

export function isKnownId(id: string): boolean {
  return byId.has(ID_ALIASES[id] ?? id);
}
