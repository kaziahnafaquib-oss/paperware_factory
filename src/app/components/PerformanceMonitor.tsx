import { useEffect, useState } from 'react';

interface WebVital {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export function PerformanceMonitor() {
  const [vitals, setVitals] = useState<WebVital[]>([]);
  const [showMonitor, setShowMonitor] = useState(false);

  useEffect(() => {
    // Only show in development mode
    if (import.meta.env.PROD) return;

    // Measure Web Vitals
    const measureVitals = () => {
      // First Contentful Paint (FCP)
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');

      if (fcpEntry) {
        const fcpValue = fcpEntry.startTime;
        setVitals(prev => [...prev, {
          name: 'FCP',
          value: fcpValue,
          rating: fcpValue < 1800 ? 'good' : fcpValue < 3000 ? 'needs-improvement' : 'poor'
        }]);
      }

      // Largest Contentful Paint (LCP)
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;

        if (lastEntry) {
          const lcpValue = lastEntry.renderTime || lastEntry.loadTime;
          setVitals(prev => {
            const filtered = prev.filter(v => v.name !== 'LCP');
            return [...filtered, {
              name: 'LCP',
              value: lcpValue,
              rating: lcpValue < 2500 ? 'good' : lcpValue < 4000 ? 'needs-improvement' : 'poor'
            }];
          });
        }
      });

      try {
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        console.log('LCP observation not supported');
      }

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }

        setVitals(prev => {
          const filtered = prev.filter(v => v.name !== 'CLS');
          return [...filtered, {
            name: 'CLS',
            value: clsValue,
            rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
          }];
        });
      });

      try {
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        console.log('CLS observation not supported');
      }

      // Time to Interactive (TTI) approximation
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navigationTiming) {
            const ttiValue = navigationTiming.domInteractive;
            setVitals(prev => [...prev, {
              name: 'TTI',
              value: ttiValue,
              rating: ttiValue < 3800 ? 'good' : ttiValue < 7300 ? 'needs-improvement' : 'poor'
            }]);
          }
        }, 0);
      });
    };

    measureVitals();

    // Keyboard shortcut to toggle monitor (Ctrl+Shift+P)
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setShowMonitor(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!showMonitor || import.meta.env.PROD) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[99999] bg-black/90 text-white p-4 rounded-lg shadow-2xl backdrop-blur-sm border border-[#fabf37]/30 font-mono text-xs max-w-xs">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#fabf37]/20">
        <span className="font-bold text-[#fabf37] uppercase tracking-wider">Performance</span>
        <button
          onClick={() => setShowMonitor(false)}
          className="text-white/50 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      {vitals.length === 0 ? (
        <div className="text-white/50">Measuring...</div>
      ) : (
        <div className="space-y-2">
          {vitals.map((vital) => (
            <div key={vital.name} className="flex items-center justify-between">
              <span className="text-white/70">{vital.name}:</span>
              <span className={`font-bold ${vital.rating === 'good' ? 'text-green-400' :
                vital.rating === 'needs-improvement' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                {vital.name === 'CLS'
                  ? vital.value.toFixed(3)
                  : `${Math.round(vital.value)}ms`
                }
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 pt-2 border-t border-[#fabf37]/20 text-[10px] text-white/40">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  );
}

// Performance tips component
export function PerformanceTips() {
  const [tips, setTips] = useState<string[]>([]);

  useEffect(() => {
    const checkPerformance = () => {
      const newTips: string[] = [];

      // Check memory usage
      if ((performance as any).memory) {
        const memory = (performance as any).memory;
        const usedMemoryPercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;

        if (usedMemoryPercent > 90) {
          newTips.push('High memory usage detected. Consider clearing cache.');
        }
      }

      // Check connection
      const connection = (navigator as any).connection;
      if (connection) {
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          newTips.push('Slow connection detected. Some features may be limited.');
        }
      }

      // Check device hardware
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
        newTips.push('Limited CPU detected. Animations may be reduced.');
      }

      setTips(newTips);
    };

    checkPerformance();
  }, []);

  if (tips.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-[9999] max-w-sm">
      {tips.map((tip, index) => (
        <div
          key={index}
          className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-lg shadow-lg mb-2 text-xs"
        >
          ⚡ {tip}
        </div>
      ))}
    </div>
  );
}
