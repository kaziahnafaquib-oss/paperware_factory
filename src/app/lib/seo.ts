// SEO and Meta Tag Management Utilities

export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  locale?: string;
}

const defaultConfig: SEOConfig = {
  title: 'Paperware - Premium Paper Solutions',
  description: 'Premium B2B Manufacturing Platform for Sustainable Paper Products. Global Standard. Industrial Precision.',
  keywords: 'paper manufacturing, sustainable packaging, B2B paper products, eco-friendly paper, industrial paper solutions',
  image: 'https://paperwarefactory.com/og-image.jpg',
  url: 'https://paperware.com',
  type: 'website',
  author: 'Paperware',
  locale: 'en_US',
};

/**
 * Update document title
 */
export function updateTitle(title: string) {
  document.title = title;
  updateMetaTag('og:title', title);
  updateMetaTag('twitter:title', title);
}

/**
 * Update meta description
 */
export function updateDescription(description: string) {
  updateMetaTag('description', description);
  updateMetaTag('og:description', description);
  updateMetaTag('twitter:description', description);
}

/**
 * Update meta keywords
 */
export function updateKeywords(keywords: string) {
  updateMetaTag('keywords', keywords);
}

/**
 * Update Open Graph image
 */
export function updateImage(imageUrl: string) {
  updateMetaTag('og:image', imageUrl);
  updateMetaTag('twitter:image', imageUrl);
}

/**
 * Update canonical URL
 */
export function updateCanonicalUrl(url: string) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
  updateMetaTag('og:url', url);
}

/**
 * Update all SEO tags at once
 */
export function updateSEO(config: SEOConfig) {
  const finalConfig = { ...defaultConfig, ...config };

  if (finalConfig.title) updateTitle(finalConfig.title);
  if (finalConfig.description) updateDescription(finalConfig.description);
  if (finalConfig.keywords) updateKeywords(finalConfig.keywords);
  if (finalConfig.image) updateImage(finalConfig.image);
  if (finalConfig.url) updateCanonicalUrl(finalConfig.url);
  if (finalConfig.type) updateMetaTag('og:type', finalConfig.type);
  if (finalConfig.locale) updateMetaTag('og:locale', finalConfig.locale);
}

/**
 * Helper to update or create meta tags
 */
function updateMetaTag(name: string, content: string) {
  // Try property first (for og: tags)
  let meta = document.querySelector(`meta[property="${name}"]`);
  
  // Then try name attribute
  if (!meta) {
    meta = document.querySelector(`meta[name="${name}"]`);
  }

  // Create if doesn't exist
  if (!meta) {
    meta = document.createElement('meta');
    if (name.startsWith('og:') || name.startsWith('twitter:')) {
      meta.setAttribute('property', name);
    } else {
      meta.setAttribute('name', name);
    }
    document.head.appendChild(meta);
  }

  meta.setAttribute('content', content);
}

/**
 * Add structured data (JSON-LD)
 */
export function addStructuredData(data: any) {
  let script = document.querySelector('script[type="application/ld+json"]');
  
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

/**
 * Initialize default SEO tags
 */
export function initializeSEO() {
  // Set default SEO tags
  updateSEO(defaultConfig);

  // Add Organization structured data
  addStructuredData({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Paperware',
    description: 'Premium B2B Manufacturing Platform for Sustainable Paper Products',
    url: 'https://paperware.com',
    logo: 'https://paperwarefactory.com/logo.png',
    sameAs: [
      'https://facebook.com/paperware',
      'https://twitter.com/paperware',
      'https://linkedin.com/company/paperware',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+880-XXX-XXXXXX',
      contactType: 'customer service',
      areaServed: 'BD',
      availableLanguage: ['en', 'bn'],
    },
  });
}

/**
 * Track page view for analytics
 */
export function trackPageView(pageName: string, pageUrl?: string) {
  // Google Analytics (if installed)
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: pageUrl || window.location.pathname,
      page_title: pageName,
    });
  }

  // Facebook Pixel (if installed)
  if (typeof (window as any).fbq === 'function') {
    (window as any).fbq('track', 'PageView');
  }

  // Custom analytics event
  if (import.meta.env.DEV) {
    console.log(`📊 Page View: ${pageName}`, pageUrl || window.location.pathname);
  }
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources() {
  const criticalResources = [
    { href: '/fonts/main-font.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
    // Add more critical resources as needed
  ];

  criticalResources.forEach(({ href, as, type, crossOrigin }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    if (crossOrigin) link.crossOrigin = crossOrigin;
    document.head.appendChild(link);
  });
}

/**
 * Add hreflang tags for multilingual sites
 */
export function addHreflangTags(urls: { [lang: string]: string }) {
  // Remove existing hreflang tags
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((tag) => tag.remove());

  // Add new hreflang tags
  Object.entries(urls).forEach(([lang, url]) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = lang;
    link.href = url;
    document.head.appendChild(link);
  });
}

/**
 * Generate breadcrumb structured data
 */
export function addBreadcrumbData(breadcrumbs: Array<{ name: string; url: string }>) {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };

  addStructuredData(breadcrumbData);
}