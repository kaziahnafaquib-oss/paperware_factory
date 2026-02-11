// 📊 Google Analytics & Performance Tracking

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

/**
 * 🚀 Initialize Google Analytics
 */
export function initializeAnalytics(measurementId: string = 'G-XXXXXXXXXX') {
  // Don't track in development
  const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV;
  if (isDev) {
    console.log('📊 Analytics disabled in development mode');
    return;
  }

  // Load Google Analytics script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer!.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', measurementId, {
    page_path: window.location.pathname,
    send_page_view: true
  });

  console.log('📊 Google Analytics initialized');
}

/**
 * 📈 Track page view
 */
export function trackPageView(pageName: string, pageUrl?: string) {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_location: pageUrl || window.location.href,
      page_path: window.location.pathname
    });
  }

  const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV;
  if (isDev) {
    console.log('📊 Page View:', pageName, pageUrl || window.location.pathname);
  }
}

/**
 * 🎯 Track custom event
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, any>
) {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }

  const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV;
  if (isDev) {
    console.log('📊 Event:', eventName, eventParams);
  }
}

/**
 * 🛒 Track e-commerce events
 */
export const ecommerceEvents = {
  viewProduct: (product: any) => {
    trackEvent('view_item', {
      currency: 'USD',
      value: product.price || 0,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price || 0,
        quantity: 1
      }]
    });
  },

  addToCart: (product: any, quantity: number = 1) => {
    trackEvent('add_to_cart', {
      currency: 'USD',
      value: (product.price || 0) * quantity,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price || 0,
        quantity: quantity
      }]
    });
  },

  beginCheckout: (items: any[], total: number) => {
    trackEvent('begin_checkout', {
      currency: 'USD',
      value: total,
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: item.price || 0,
        quantity: item.quantity || 1
      }))
    });
  },

  purchase: (orderId: string, items: any[], total: number) => {
    trackEvent('purchase', {
      transaction_id: orderId,
      currency: 'USD',
      value: total,
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: item.price || 0,
        quantity: item.quantity || 1
      }))
    });
  }
};

/**
 * 👥 Track user engagement
 */
export const engagementEvents = {
  search: (searchTerm: string, resultsCount: number) => {
    trackEvent('search', {
      search_term: searchTerm,
      results_count: resultsCount
    });
  },

  formSubmit: (formName: string) => {
    trackEvent('form_submit', {
      form_name: formName
    });
  },

  downloadBrochure: (brochureName: string) => {
    trackEvent('download_brochure', {
      brochure_name: brochureName
    });
  },

  clickCTA: (ctaName: string, ctaLocation: string) => {
    trackEvent('click_cta', {
      cta_name: ctaName,
      cta_location: ctaLocation
    });
  },

  videoPlay: (videoTitle: string, videoUrl?: string) => {
    trackEvent('video_play', {
      video_title: videoTitle,
      video_url: videoUrl
    });
  },

  shareContent: (contentType: string, method: string) => {
    trackEvent('share', {
      content_type: contentType,
      method: method
    });
  }
};

/**
 * ⚡ Track Core Web Vitals
 */
export function trackWebVitals() {
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      const lcp = lastEntry.renderTime || lastEntry.loadTime;

      trackEvent('web_vitals', {
        metric_name: 'LCP',
        metric_value: Math.round(lcp),
        metric_rating: lcp < 2500 ? 'good' : lcp < 4000 ? 'needs_improvement' : 'poor'
      });
    });

    try {
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.warn('LCP observer not supported');
    }

    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        const fid = entry.processingStart - entry.startTime;

        trackEvent('web_vitals', {
          metric_name: 'FID',
          metric_value: Math.round(fid),
          metric_rating: fid < 100 ? 'good' : fid < 300 ? 'needs_improvement' : 'poor'
        });
      });
    });

    try {
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      console.warn('FID observer not supported');
    }

    // Cumulative Layout Shift (CLS)
    let clsScore = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsScore += entry.value;
        }
      }

      trackEvent('web_vitals', {
        metric_name: 'CLS',
        metric_value: Math.round(clsScore * 1000) / 1000,
        metric_rating: clsScore < 0.1 ? 'good' : clsScore < 0.25 ? 'needs_improvement' : 'poor'
      });
    });

    try {
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      console.warn('CLS observer not supported');
    }
  }
}

/**
 * 🎨 Track user interactions
 */
export function setupInteractionTracking() {
  // Track outbound links
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');

    if (link && link.hostname !== window.location.hostname) {
      trackEvent('outbound_link', {
        link_url: link.href,
        link_text: link.textContent?.trim()
      });
    }
  });

  // Track scroll depth
  let maxScroll = 0;
  const scrollMilestones = [25, 50, 75, 100];
  const trackedMilestones = new Set<number>();

  window.addEventListener('scroll', () => {
    const scrollPercent = Math.round(
      ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
    );

    maxScroll = Math.max(maxScroll, scrollPercent);

    scrollMilestones.forEach(milestone => {
      if (maxScroll >= milestone && !trackedMilestones.has(milestone)) {
        trackedMilestones.add(milestone);
        trackEvent('scroll_depth', {
          percent: milestone
        });
      }
    });
  }, { passive: true });

  // Track time on page
  let startTime = Date.now();

  const trackTimeOnPage = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);

    if (timeSpent > 10) { // Only track if spent more than 10 seconds
      trackEvent('time_on_page', {
        seconds: timeSpent,
        page: window.location.pathname
      });
    }
  };

  window.addEventListener('beforeunload', trackTimeOnPage);
}

/**
 * 🌐 Initialize Facebook Pixel
 */
export function initializeFacebookPixel(pixelId: string) {
  const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV;
  if (isDev) return;

  // Load Facebook Pixel
  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq!('init', pixelId);
  window.fbq!('track', 'PageView');
}

/**
 * 📱 Track device information
 */
export function trackDeviceInfo() {
  const deviceInfo = {
    user_agent: navigator.userAgent,
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    viewport_size: `${window.innerWidth}x${window.innerHeight}`,
    device_type: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
    language: navigator.language,
    connection_type: (navigator as any).connection?.effectiveType || 'unknown'
  };

  trackEvent('device_info', deviceInfo);
}

/**
 * 🎥 Advanced User Engagement Recording (Session Replay)
 */
import * as rrweb from 'rrweb';
import { projectId, publicAnonKey } from "../../../utils/supabase/info";

export function setupSessionRecording() {
  const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV;
  if (isDev) return; // Uncomment to disable in dev

  const userId = localStorage.getItem('paperware_visitor_id') || `user_${Math.random().toString(36).substring(2, 11)}`;
  localStorage.setItem('paperware_visitor_id', userId);

  let events: any[] = [];

  // Start recording
  const stopFn = rrweb.record({
    emit(event) {
      events.push(event);
      // Optional: limit queue size
      if (events.length > 500) {
        uploadSession();
      }
    },
    // Don't record sensitive fields
    checkoutEveryNms: 30000, // New snapshot every 30s
  });

  const uploadSession = async () => {
    if (events.length === 0) return;

    const sessionData = [...events];
    events = []; // Clear for next batch

    const metadata = {
      userId,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      duration: Math.round(performance.now() / 1000)
    };

    try {
      await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-bf34c9a5/engagement/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ sessionData, metadata })
      });
      console.log('🎥 Session chunk uploaded');
    } catch (error) {
      console.warn('Failed to upload session chunk:', error);
      // Restore events if upload failed
      // events = [...sessionData, ...events]; 
    }
  };

  // Upload on page leave
  window.addEventListener('beforeunload', uploadSession);

  // Periodic upload every 60 seconds
  const interval = setInterval(uploadSession, 60000);

  return () => {
    if (stopFn) stopFn();
    clearInterval(interval);
    uploadSession();
  };
}