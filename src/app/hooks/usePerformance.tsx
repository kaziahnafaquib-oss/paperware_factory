import { ComponentType, ReactNode, RefObject, memo, useEffect, useRef, useState } from 'react';

interface IntersectionObserverWrapperProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  className?: string;
  onIntersect?: () => void;
}

/**
 * A wrapper component that uses IntersectionObserver to lazily render children
 * when they enter the viewport. Great for performance optimization.
 */
export function IntersectionObserverWrapper({
  children,
  threshold = 0.01,
  rootMargin = '100px',
  triggerOnce = true,
  className = '',
  onIntersect,
}: IntersectionObserverWrapperProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (onIntersect) onIntersect();
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, onIntersect]);

  return (
    <div ref={ref} className={className}>
      {isIntersecting ? children : <div style={{ minHeight: '200px' }} />}
    </div>
  );
}

/**
 * Memoized version of a component to prevent unnecessary re-renders
 */
export function withMemo<P extends object>(
  Component: ComponentType<P>,
  propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean
) {
  return memo(Component, propsAreEqual);
}

/**
 * Custom hook for debounced values
 */
export function useDebouncedValue<T>(value: T, delay: number): T {
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
 * Custom hook for throttled values
 */
export function useThrottledValue<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
}

/**
 * Custom hook for intersection observer
 */
export function useIntersectionObserver(
  ref: RefObject<Element>,
  options: IntersectionObserverInit = {}
): boolean {
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
  }, [ref, options]);

  return isIntersecting;
}

/**
 * Custom hook for media query
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
    // Older browsers
    else {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, [query]);

  return matches;
}

/**
 * Custom hook for prefered reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/**
 * Custom hook for device performance tier
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
 * Custom hook for idle callback
 */
export function useIdleCallback(callback: () => void, timeout = 2000) {
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = (window as any).requestIdleCallback(callback, { timeout });
      return () => (window as any).cancelIdleCallback(id);
    } else {
      const id = setTimeout(callback, 1);
      return () => clearTimeout(id);
    }
  }, [callback, timeout]);
}
