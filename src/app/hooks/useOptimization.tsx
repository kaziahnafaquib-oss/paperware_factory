/**
 * Quick Performance Utilities
 * Ready-to-use hooks and helpers for common performance patterns
 */

import { ComponentType, DependencyList, FC, RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Hook to detect if element is in viewport
 * @param options - IntersectionObserver options
 * @returns [ref, isIntersecting]
 */
export function useIntersectionObserver<T extends HTMLElement>(
  options: IntersectionObserverInit = {}
): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, isIntersecting];
}

/**
 * Hook to lazy load component when in viewport
 * @param threshold - Intersection threshold
 * @returns [ref, shouldLoad]
 */
export function useLazyLoad<T extends HTMLElement>(
  threshold = 0.1
): [RefObject<T>, boolean] {
  const [ref, isIntersecting] = useIntersectionObserver<T>({
    threshold,
    rootMargin: '200px', // Start loading 200px before entering viewport
  });

  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (isIntersecting && !shouldLoad) {
      setShouldLoad(true);
    }
  }, [isIntersecting]);

  return [ref, shouldLoad];
}

/**
 * Hook to detect device performance tier
 * @returns tier - 'low' | 'medium' | 'high'
 */
export function useDevicePerformance(): 'low' | 'medium' | 'high' {
  const [tier, setTier] = useState<'low' | 'medium' | 'high'>('high');

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 1;
    const memory = (navigator as any).deviceMemory || 4;
    const connection = (navigator as any).connection;
    const effectiveType = connection?.effectiveType || '4g';

    if (cores <= 2 || memory <= 2 || effectiveType === 'slow-2g' || effectiveType === '2g') {
      setTier('low');
    } else if (cores <= 4 || memory <= 4 || effectiveType === '3g') {
      setTier('medium');
    } else {
      setTier('high');
    }
  }, []);

  return tier;
}

/**
 * Hook for debounced value
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds
 * @returns debouncedValue
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook for throttled callback
 * @param callback - Function to throttle
 * @param delay - Throttle delay in milliseconds
 * @returns throttledCallback
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const throttleRef = useRef<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    ((...args: Parameters<T>) => {
      if (!throttleRef.current) {
        callback(...args);
        throttleRef.current = true;

        timeoutRef.current = setTimeout(() => {
          throttleRef.current = false;
        }, delay);
      }
    }) as T,
    [callback, delay]
  );
}

/**
 * Hook to detect if user prefers reduced motion
 * @returns prefersReducedMotion
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook for idle callback
 * @param callback - Function to run when idle
 * @param deps - Dependency array
 */
export function useIdleCallback(
  callback: () => void,
  deps: DependencyList = []
): void {
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = (window as any).requestIdleCallback(callback, { timeout: 2000 });
      return () => (window as any).cancelIdleCallback(id);
    } else {
      const timeout = setTimeout(callback, 1);
      return () => clearTimeout(timeout);
    }
  }, deps);
}

/**
 * Hook to measure component render time
 * @param componentName - Name for logging
 */
export function useRenderTime(componentName: string): void {
  const renderStartTime = useRef<number>(performance.now());

  useEffect(() => {
    const renderEndTime = performance.now();
    const renderTime = renderEndTime - renderStartTime.current;
    
    if (import.meta.env.DEV && renderTime > 16) { // More than one frame
      console.warn(`[Performance] ${componentName} render took ${renderTime.toFixed(2)}ms`);
    }

    renderStartTime.current = performance.now();
  });
}

/**
 * Hook for media query
 * @param query - Media query string
 * @returns matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/**
 * Hook to check if viewport is mobile
 * @returns isMobile
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)');
}

/**
 * Hook for window size with debouncing
 * @param delay - Debounce delay in milliseconds
 * @returns { width, height }
 */
export function useWindowSize(delay = 200): { width: number; height: number } {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, delay);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [delay]);

  return size;
}

/**
 * Hook for optimized scroll position
 * @param throttleMs - Throttle delay in milliseconds
 * @returns scrollY
 */
export function useScrollPosition(throttleMs = 100): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Throttle with requestAnimationFrame
    let timeoutId: NodeJS.Timeout;
    const throttledScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, throttleMs);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(timeoutId);
    };
  }, [throttleMs]);

  return scrollY;
}

/**
 * Hook to prefetch route/component
 * @param importFn - Dynamic import function
 */
export function usePrefetch(importFn: () => Promise<any>): void {
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        importFn();
      });
    }
  }, []);
}

/**
 * Hook for optimized animation frame
 * @param callback - Animation callback
 * @param deps - Dependency array
 */
export function useAnimationFrame(
  callback: (deltaTime: number) => void,
  deps: DependencyList = []
): void {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, deps);
}

/**
 * Memoize expensive calculations
 * @param factory - Factory function
 * @param deps - Dependency array
 * @returns memoized value
 */
export function useExpensiveMemo<T>(
  factory: () => T,
  deps: DependencyList
): T {
  const startTime = performance.now();
  const value = useMemo(factory, deps);
  const endTime = performance.now();

  if (import.meta.env.DEV && endTime - startTime > 5) {
    console.warn(`[Performance] Expensive memo computation took ${(endTime - startTime).toFixed(2)}ms`);
  }

  return value;
}

/**
 * Performance metrics collector
 */
export class PerformanceMetrics {
  private static metrics: Map<string, number[]> = new Map();

  static mark(name: string): void {
    if (import.meta.env.DEV) {
      performance.mark(name);
    }
  }

  static measure(name: string, startMark: string, endMark?: string): void {
    if (import.meta.env.DEV) {
      try {
        performance.measure(name, startMark, endMark);
        const measure = performance.getEntriesByName(name, 'measure')[0];
        
        if (!this.metrics.has(name)) {
          this.metrics.set(name, []);
        }
        this.metrics.get(name)!.push(measure.duration);

        console.log(`[Performance] ${name}: ${measure.duration.toFixed(2)}ms`);
      } catch (e) {
        console.warn('Performance measure failed:', e);
      }
    }
  }

  static getMetrics(name: string): { avg: number; min: number; max: number } | null {
    const values = this.metrics.get(name);
    if (!values || values.length === 0) return null;

    return {
      avg: values.reduce((a, b) => a + b, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
    };
  }

  static clear(): void {
    this.metrics.clear();
    performance.clearMarks();
    performance.clearMeasures();
  }
}

/**
 * Component wrapper for performance monitoring
 */
export function withPerformanceMonitoring<P extends object>(
  Component: ComponentType<P>,
  componentName: string
): FC<P> {
  return (props: P) => {
    useRenderTime(componentName);
    return <Component {...props} />;
  };
}
