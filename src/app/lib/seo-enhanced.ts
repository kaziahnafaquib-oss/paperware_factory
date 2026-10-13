// 🚀 Enhanced SEO System for Google Ranking
// Complete SEO optimization for Paperware website

export interface PageSEO {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  url?: string;
  structuredData?: any;
  lang?: string;
  alternateLinks?: { [lang: string]: string };
}

// 🎯 SEO Configuration for all pages
export const pageSEOConfig: Record<string, PageSEO> = {
  home: {
    title: 'Paperware - Premium Paper Manufacturing | Sustainable Packaging Solutions Bangladesh',
    description: 'Leading paper manufacturing company in Bangladesh. Eco-friendly paper cups, food packaging, and sustainable solutions. ISO 9001:2015 certified. Export quality products.',
    keywords: [
      'paper manufacturing bangladesh',
      'paper cup manufacturer',
      'eco-friendly packaging',
      'sustainable paper products',
      'food packaging bangladesh',
      'paperware factory',
      'disposable cups supplier',
      'custom paper packaging'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Paperware Factory',
      description: 'Premium B2B Manufacturing Platform for Sustainable Paper Products',
      url: 'https://paperware.com',
      logo: 'https://paperwarefactory.com/logo.png',
      foundingDate: '2015',
      founders: [{
        '@type': 'Person',
        name: 'Paperware Team'
      }],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Dhaka Industrial Area',
        addressLocality: 'Dhaka',
        addressCountry: 'BD'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+880-XXX-XXXXXX',
        contactType: 'customer service',
        areaServed: ['BD', 'US', 'EU', 'ME'],
        availableLanguage: ['en', 'bn', 'ar']
      },
      sameAs: [
        'https://facebook.com/paperware',
        'https://instagram.com/paperware',
        'https://linkedin.com/company/paperware'
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '250'
      }
    }
  },
  
  products: {
    title: 'All Products - Paper Cups, Food Packaging & More | Paperware',
    description: 'Browse our complete range of sustainable paper products. Paper cups, food boxes, custom packaging, restaurant supplies, and pharmaceutical packaging. Bulk orders available.',
    keywords: [
      'paper cup sizes',
      'food packaging boxes',
      'restaurant supplies bangladesh',
      'custom paper bags',
      'pharmaceutical packaging',
      'office stationery',
      'bulk paper products'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Paperware Products',
      description: 'Complete range of eco-friendly paper products'
    }
  },
  
  sustainability: {
    title: 'Sustainability & Environmental Impact | Paperware Factory',
    description: 'Our commitment to a plastic-free future. 100% eco-friendly materials, FSC certified, solar-powered manufacturing. Track our real-time environmental impact.',
    keywords: [
      'sustainable manufacturing',
      'eco-friendly paper',
      'FSC certified products',
      'plastic-free packaging',
      'green manufacturing bangladesh',
      'carbon neutral production'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Sustainability',
      about: {
        '@type': 'Thing',
        name: 'Environmental Sustainability'
      }
    }
  },
  
  contact: {
    title: 'Contact Us - Get Quote | Paperware Factory Bangladesh',
    description: 'Get in touch for bulk orders, custom packaging solutions, and export inquiries. Factory in Dhaka. 24/7 customer support. Fast response guaranteed.',
    keywords: [
      'paper factory contact bangladesh',
      'bulk order inquiry',
      'custom packaging quote',
      'export inquiry',
      'paperware dhaka'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Paperware'
    }
  },
  
  clients: {
    title: 'Our Clients & Partners - Global Brands Trust Paperware',
    description: 'Trusted by leading brands across industries. Serving FMCG, restaurants, hospitals, and retail chains worldwide. View our client success stories.',
    keywords: [
      'paper supplier bangladesh',
      'b2b paper products',
      'bulk packaging supplier',
      'corporate paper solutions'
    ]
  },
  
  about: {
    title: 'About Us - Leading Paper Manufacturer in Bangladesh | Paperware',
    description: 'Since 2015, manufacturing premium eco-friendly paper products. ISO certified facility, advanced machinery, 24/7 production. Learn our story.',
    keywords: [
      'paper factory bangladesh',
      'manufacturing company dhaka',
      'paper industry bangladesh',
      'iso certified manufacturer'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Paperware Factory'
    }
  }
};

/**
 * 🔍 Generate meta tags for any page
 */
export function generateMetaTags(page: string, lang: string = 'en'): string {
  const config = pageSEOConfig[page] || pageSEOConfig.home;
  
  // Add language suffix to title for non-English
  const titleSuffix = lang === 'bn' ? ' | পেপারওয়্যার' : '';
  
  return `
    <title>${config.title}${titleSuffix}</title>
    <meta name="description" content="${config.description}" />
    <meta name="keywords" content="${config.keywords.join(', ')}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${config.url || 'https://paperware.com'}" />
    <meta property="og:title" content="${config.title}" />
    <meta property="og:description" content="${config.description}" />
    <meta property="og:image" content="${config.image || 'https://paperwarefactory.com/og-image.jpg'}" />
    <meta property="og:locale" content="${lang === 'bn' ? 'bn_BD' : 'en_US'}" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${config.url || 'https://paperware.com'}" />
    <meta name="twitter:title" content="${config.title}" />
    <meta name="twitter:description" content="${config.description}" />
    <meta name="twitter:image" content="${config.image || 'https://paperwarefactory.com/og-image.jpg'}" />
    
    <!-- Language alternates -->
    <link rel="alternate" hreflang="en" href="https://paperwarefactory.com/${page}" />
    <link rel="alternate" hreflang="bn" href="https://paperwarefactory.com/${page}?lang=bn" />
    <link rel="alternate" hreflang="x-default" href="https://paperwarefactory.com/${page}" />
  `;
}

/**
 * 📊 Update page SEO dynamically
 */
export function updatePageSEO(page: string, lang: string = 'en') {
  const config = pageSEOConfig[page];
  if (!config) return;
  
  // Update title
  document.title = config.title + (lang === 'bn' ? ' | পেপারওয়্যার' : '');
  
  // Update description
  updateOrCreateMeta('description', config.description);
  updateOrCreateMeta('keywords', config.keywords.join(', '));
  
  // Update OG tags
  updateOrCreateMeta('og:title', config.title, 'property');
  updateOrCreateMeta('og:description', config.description, 'property');
  updateOrCreateMeta('og:type', 'website', 'property');
  updateOrCreateMeta('og:locale', lang === 'bn' ? 'bn_BD' : 'en_US', 'property');
  
  // Update Twitter tags
  updateOrCreateMeta('twitter:card', 'summary_large_image', 'name');
  updateOrCreateMeta('twitter:title', config.title, 'name');
  updateOrCreateMeta('twitter:description', config.description, 'name');
  
  // Add structured data
  if (config.structuredData) {
    addStructuredData(config.structuredData);
  }
  
  // Update canonical URL
  const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (canonical) {
    canonical.href = `https://paperwarefactory.com/${page}`;
  }
  
  // Update lang attribute
  document.documentElement.lang = lang;
}

/**
 * 🛠️ Helper to update or create meta tags
 */
function updateOrCreateMeta(name: string, content: string, type: 'name' | 'property' = 'name') {
  let meta = document.querySelector(`meta[${type}="${name}"]`) as HTMLMetaElement;
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(type, name);
    document.head.appendChild(meta);
  }
  
  meta.content = content;
}

/**
 * 📦 Add structured data (JSON-LD)
 */
function addStructuredData(data: any) {
  // Remove existing structured data
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing) {
    existing.remove();
  }
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

/**
 * 🌐 Generate sitemap content
 */
export function generateSitemap(): string {
  const pages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: 'products', priority: '0.9', changefreq: 'weekly' },
    { path: 'papercups', priority: '0.9', changefreq: 'weekly' },
    { path: 'sustainability', priority: '0.8', changefreq: 'monthly' },
    { path: 'contact', priority: '0.8', changefreq: 'monthly' },
    { path: 'about', priority: '0.7', changefreq: 'monthly' },
    { path: 'clients', priority: '0.7', changefreq: 'monthly' },
    { path: 'export', priority: '0.8', changefreq: 'weekly' },
    { path: 'manufacturing', priority: '0.7', changefreq: 'monthly' },
    { path: 'compliance', priority: '0.6', changefreq: 'monthly' },
    { path: 'career', priority: '0.6', changefreq: 'weekly' },
    { path: 'faq', priority: '0.5', changefreq: 'monthly' }
  ];
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  
  pages.forEach(page => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>https://paperwarefactory.com/${page.path}</loc>\n`;
    sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += `    <xhtml:link rel="alternate" hreflang="en" href="https://paperwarefactory.com/${page.path}" />\n`;
    sitemap += `    <xhtml:link rel="alternate" hreflang="bn" href="https://paperwarefactory.com/${page.path}?lang=bn" />\n`;
    sitemap += `  </url>\n`;
  });
  
  sitemap += '</urlset>';
  return sitemap;
}

/**
 * 🎯 SEO Best Practices Checklist
 */
export const seoChecklist = {
  critical: [
    '✅ Unique title tags for each page (50-60 characters)',
    '✅ Meta descriptions (150-160 characters)',
    '✅ Header hierarchy (H1, H2, H3)',
    '✅ Alt text for all images',
    '✅ Mobile responsive design',
    '✅ Fast page load speed (<3 seconds)',
    '✅ HTTPS security',
    '✅ XML sitemap',
    '✅ Robots.txt file',
    '✅ Structured data (Schema.org)'
  ],
  important: [
    '✅ Internal linking strategy',
    '✅ Canonical URLs',
    '✅ Hreflang tags for multilingual',
    '✅ Open Graph tags',
    '✅ Twitter Card tags',
    '✅ URL structure (clean, descriptive)',
    '✅ Page breadcrumbs',
    '✅ Social media integration'
  ],
  recommended: [
    '✅ Content freshness',
    '✅ External links to authoritative sources',
    '✅ Image optimization (WebP, lazy loading)',
    '✅ Video content',
    '✅ User engagement metrics',
    '✅ Local SEO (Google My Business)',
    '✅ Reviews and ratings',
    '✅ FAQ schema'
  ]
};

/**
 * 🚀 Performance optimization tips
 */
export const performanceOptimizations = {
  images: [
    'Use WebP format with fallback',
    'Lazy load images below fold',
    'Responsive images with srcset',
    'Compress images (80-90% quality)',
    'Use CDN for image delivery'
  ],
  code: [
    'Minify CSS, JS, HTML',
    'Remove unused CSS/JS',
    'Code splitting and lazy loading',
    'Use production React build',
    'Enable gzip/brotli compression'
  ],
  loading: [
    'Critical CSS inline',
    'Defer non-critical JavaScript',
    'Preload critical resources',
    'Use HTTP/2 server push',
    'Implement service worker caching'
  ],
  rendering: [
    'Avoid layout shifts (CLS)',
    'Optimize First Contentful Paint',
    'Reduce Time to Interactive',
    'Use content-visibility CSS',
    'Implement skeleton screens'
  ]
};
