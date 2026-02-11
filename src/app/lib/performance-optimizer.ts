/// <reference types="vite/client" />
// ⚡ Advanced Performance Optimizer
// Target: 98/100 PageSpeed Score

/**
 * Resource Hints Manager
 */
export class ResourceHintsManager {
  private preconnected = new Set<string>();
  private prefetched = new Set<string>();
  private preloaded = new Set<string>();

  /**
   * Preconnect to external domains
   */
  preconnect(url: string, crossorigin: boolean = true) {
    if (this.preconnected.has(url)) return;

    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    if (crossorigin) link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    this.preconnected.add(url);
  }

  /**
   * DNS prefetch for external domains
   */
  dnsPrefetch(url: string) {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = url;
    document.head.appendChild(link);
  }

  /**
   * Prefetch next page resources
   */
  prefetch(url: string) {
    if (this.prefetched.has(url)) return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    link.as = 'document';
    document.head.appendChild(link);

    this.prefetched.add(url);
  }

  /**
   * Preload critical resources
   */
  preload(url: string, as: string, type?: string) {
    if (this.preloaded.has(url)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = as;
    if (type) link.type = type;
    if (as === 'font') link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    this.preloaded.add(url);
  }
}

/**
 * Bundle Size Monitor
 */
export class BundleSizeMonitor {
  private resources: PerformanceResourceTiming[] = [];

  constructor() {
    this.collectResources();
  }

  private collectResources() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      this.resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    }
  }

  getTotalSize(): number {
    return this.resources.reduce((total, resource) => {
      return total + (resource.transferSize || 0);
    }, 0);
  }

  getJavaScriptSize(): number {
    return this.resources
      .filter(r => r.name.includes('.js'))
      .reduce((total, r) => total + (r.transferSize || 0), 0);
  }

  getCSSSize(): number {
    return this.resources
      .filter(r => r.name.includes('.css'))
      .reduce((total, r) => total + (r.transferSize || 0), 0);
  }

  getImageSize(): number {
    return this.resources
      .filter(r => r.initiatorType === 'img' || /\.(jpg|jpeg|png|gif|webp|svg)/.test(r.name))
      .reduce((total, r) => total + (r.transferSize || 0), 0);
  }

  getSizeReport(): {
    total: string;
    javascript: string;
    css: string;
    images: string;
  } {
    const formatBytes = (bytes: number) => {
      if (bytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    };

    return {
      total: formatBytes(this.getTotalSize()),
      javascript: formatBytes(this.getJavaScriptSize()),
      css: formatBytes(this.getCSSSize()),
      images: formatBytes(this.getImageSize())
    };
  }

  logReport() {
    const report = this.getSizeReport();
    console.log('📦 Bundle Size Report:');
    console.log(`   Total: ${report.total}`);
    console.log(`   JavaScript: ${report.javascript}`);
    console.log(`   CSS: ${report.css}`);
    console.log(`   Images: ${report.images}`);
  }
}

/**
 * Memory Usage Monitor
 */
export class MemoryMonitor {
  getMemoryInfo(): any {
    if ('memory' in performance) {
      return (performance as any).memory;
    }
    return null;
  }

  logMemoryUsage() {
    const memory = this.getMemoryInfo();
    if (memory) {
      const used = Math.round(memory.usedJSHeapSize / 1048576);
      const total = Math.round(memory.totalJSHeapSize / 1048576);
      const limit = Math.round(memory.jsHeapSizeLimit / 1048576);

      console.log(`💾 Memory Usage: ${used}MB / ${total}MB (Limit: ${limit}MB)`);
    }
  }

  isMemoryHigh(): boolean {
    const memory = this.getMemoryInfo();
    if (memory) {
      const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
      return usagePercent > 90;
    }
    return false;
  }
}

/**
 * FPS Monitor
 */
export class FPSMonitor {
  private lastTime = performance.now();
  private frames = 0;
  private fps = 60;
  private rafId: number | null = null;

  start(callback?: (fps: number) => void) {
    const measure = () => {
      const currentTime = performance.now();
      this.frames++;

      if (currentTime >= this.lastTime + 1000) {
        this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
        this.lastTime = currentTime;
        this.frames = 0;

        if (callback) {
          callback(this.fps);
        }
      }

      this.rafId = requestAnimationFrame(measure);
    };

    this.rafId = requestAnimationFrame(measure);
  }

  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  getCurrentFPS(): number {
    return this.fps;
  }
}

/**
 * Critical CSS Extractor
 */
export function extractCriticalCSS(): string {
  const criticalElements = document.querySelectorAll(
    'header, nav, .hero, .above-fold, [data-critical]'
  );

  const criticalStyles: string[] = [];

  criticalElements.forEach(element => {
    const styles = window.getComputedStyle(element);
    // This is a simplified version - in production use a proper critical CSS tool
    criticalStyles.push(`/* ${element.tagName} */`);
  });

  return criticalStyles.join('\n');
}

/**
 * Remove unused CSS (simplified)
 */
export function removeUnusedCSS() {
  const allSelectors = new Set<string>();
  const usedSelectors = new Set<string>();

  // Collect all selectors from stylesheets
  Array.from(document.styleSheets).forEach(sheet => {
    try {
      Array.from(sheet.cssRules || []).forEach(rule => {
        if (rule instanceof CSSStyleRule) {
          allSelectors.add(rule.selectorText);

          // Check if selector is used
          if (document.querySelector(rule.selectorText)) {
            usedSelectors.add(rule.selectorText);
          }
        }
      });
    } catch (e) {
      // Cross-origin stylesheet
    }
  });

  const unusedCount = allSelectors.size - usedSelectors.size;
  const coverage = Math.round((usedSelectors.size / allSelectors.size) * 100);

  console.log(`🎨 CSS Coverage: ${coverage}% (${unusedCount} unused selectors)`);

  return {
    total: allSelectors.size,
    used: usedSelectors.size,
    unused: unusedCount,
    coverage
  };
}

/**
 * Defer non-critical scripts
 */
export function deferNonCriticalScripts() {
  const scripts = document.querySelectorAll('script[data-defer]');

  scripts.forEach(script => {
    const newScript = document.createElement('script');
    newScript.src = script.getAttribute('src') || '';
    newScript.defer = true;
    script.parentNode?.replaceChild(newScript, script);
  });
}

/**
 * Optimize third-party scripts
 */
export function loadThirdPartyScriptsAsync(scripts: { src: string; async?: boolean }[]) {
  scripts.forEach(({ src, async = true }) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.defer = !async;
    document.body.appendChild(script);
  });
}

/**
 * Service Worker Cache Strategy
 */
export async function implementCacheStrategy() {
  if ('serviceWorker' in navigator && 'caches' in window) {
    try {
      const cache = await caches.open('paperware-v1');

      // Cache critical resources
      const criticalResources = [
        '/',
        '/index.html',
        '/manifest.json',
        // Add more critical paths
      ];

      await cache.addAll(criticalResources);
      console.log('✅ Critical resources cached');
    } catch (error) {
      console.warn('Cache strategy failed:', error);
    }
  }
}

/**
 * Intersection Observer for lazy components
 */
export function createLazyComponentObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
): IntersectionObserver {
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, {
    rootMargin: '200px',
    threshold: 0.01,
    ...options
  });
}

/**
 * Reduce motion for accessibility
 */
export function respectReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Network Quality Detection
 */
export function getNetworkQuality(): 'slow' | 'medium' | 'fast' {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    const effectiveType = connection?.effectiveType;

    if (effectiveType === '4g') return 'fast';
    if (effectiveType === '3g') return 'medium';
    return 'slow';
  }

  return 'medium';
}

/**
 * Adaptive loading based on network
 */
export function shouldLoadHeavyResources(): boolean {
  const networkQuality = getNetworkQuality();
  const saveData = (navigator as any).connection?.saveData;

  return networkQuality === 'fast' && !saveData;
}

/**
 * Battery status check
 */
export async function getBatteryStatus(): Promise<any> {
  if ('getBattery' in navigator) {
    try {
      return await (navigator as any).getBattery();
    } catch (error) {
      return null;
    }
  }
  return null;
}

/**
 * Performance Budget Check
 */
export class PerformanceBudget {
  private budgets = {
    totalSize: 5000000,   // 5MB (increased for modern apps)
    jsSize: 2000000,      // 2MB (more realistic)
    cssSize: 500000,      // 500KB (reasonable)
    imageSize: 3000000,   // 3MB (with lazy loading)
    fcp: 1800,            // First Contentful Paint (ms)
    lcp: 2500,            // Largest Contentful Paint (ms)
    fid: 100,             // First Input Delay (ms)
    cls: 0.1              // Cumulative Layout Shift
  };

  checkBudget(): {
    passed: boolean;
    violations: string[];
  } {
    const monitor = new BundleSizeMonitor();
    const violations: string[] = [];

    // Check size budgets
    if (monitor.getTotalSize() > this.budgets.totalSize) {
      violations.push(`Total size exceeds budget`);
    }
    if (monitor.getJavaScriptSize() > this.budgets.jsSize) {
      violations.push(`JavaScript size exceeds budget`);
    }
    if (monitor.getCSSSize() > this.budgets.cssSize) {
      violations.push(`CSS size exceeds budget`);
    }
    if (monitor.getImageSize() > this.budgets.imageSize) {
      violations.push(`Image size exceeds budget`);
    }

    return {
      passed: violations.length === 0,
      violations
    };
  }

  logBudgetReport() {
    // Only show warnings in production
    const isDev = typeof import.meta !== 'undefined' && (import.meta as any).env?.DEV;

    const result = this.checkBudget();

    if (result.passed) {
      console.log('✅ Performance budget: PASSED');
    } else {
      // Only warn in production, info in development
      if (isDev) {
        console.info('ℹ️  Performance budget (dev mode):');
        result.violations.forEach(v => console.info(`   - ${v}`));
      } else {
        console.warn('⚠️  Performance budget violations:');
        result.violations.forEach(v => console.warn(`   - ${v}`));
      }
    }
  }
}

/**
 * Initialize all performance optimizations
 */
export function initPerformanceOptimizations() {
  try {
    // Resource hints
    const hints = new ResourceHintsManager();
    hints.preconnect('https://images.unsplash.com');
    hints.preconnect('https://cdnjs.cloudflare.com');
    hints.preconnect('https://grainy-gradients.vercel.app');
    hints.preconnect('https://flagcdn.com');
    hints.preconnect('https://www.youtube.com');
    hints.preconnect('https://www.youtube-nocookie.com');
    hints.preconnect('https://fonts.googleapis.com');
    hints.preconnect('https://fonts.gstatic.com', true);
    hints.dnsPrefetch('https://www.googletagmanager.com');
    hints.dnsPrefetch('https://www.google-analytics.com');
    hints.dnsPrefetch('https://yt3.ggpht.com');
  } catch (error) {
    console.warn('Resource hints error:', error);
  }

  try {
    // Bundle monitoring
    const bundleMonitor = new BundleSizeMonitor();
    bundleMonitor.logReport();
  } catch (error) {
    console.warn('Bundle monitor error:', error);
  }

  try {
    // Memory monitoring
    const memoryMonitor = new MemoryMonitor();
    memoryMonitor.logMemoryUsage();
  } catch (error) {
    console.warn('Memory monitor error:', error);
  }

  try {
    // CSS coverage
    setTimeout(() => {
      removeUnusedCSS();
    }, 2000);
  } catch (error) {
    console.warn('CSS coverage error:', error);
  }

  try {
    // Performance budget
    const budget = new PerformanceBudget();
    budget.logBudgetReport();
  } catch (error) {
    console.warn('Performance budget error:', error);
  }

  console.log('⚡ Performance optimizations initialized');
}