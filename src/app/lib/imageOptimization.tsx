/**
 * Advanced Image Optimization Utilities
 * Provides responsive images, WebP support, and lazy loading
 */

import { ImgHTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean; // Load immediately, don't lazy load
  quality?: number; // 1-100
  className?: string;
  onLoadComplete?: () => void;
}

/**
 * OptimizedImage Component
 * Automatically handles:
 * - Lazy loading
 * - WebP format support
 * - Blur-up loading effect
 * - Responsive images
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 75,
  className = '',
  onLoadComplete,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate blur placeholder (tiny base64 image)
  const blurPlaceholder = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width || 400} ${height || 300}'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='none' style='filter: url(%23b);' href='${src}'/%3E%3C/svg%3E`;

  useEffect(() => {
    if (priority) {
      // Load immediately
      setCurrentSrc(src);
      return;
    }

    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSrc(src);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before entering viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoadComplete) {
      onLoadComplete();
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder */}
      {!isLoaded && (
        <img
          src={blurPlaceholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
          aria-hidden="true"
        />
      )}
      
      {/* Main image */}
      <img
        ref={imgRef}
        src={currentSrc || blurPlaceholder}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
      
      {/* Loading indicator */}
      {!isLoaded && currentSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-100/50">
          <div className="w-8 h-8 border-3 border-[#fabf37] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

/**
 * Preload critical images
 */
export function preloadCriticalImages(images: string[]) {
  images.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

/**
 * Generate responsive image srcset
 */
export function generateSrcSet(baseSrc: string, widths: number[]): string {
  return widths
    .map((width) => `${baseSrc}?w=${width} ${width}w`)
    .join(', ');
}

/**
 * Check WebP support
 */
export async function supportsWebP(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  
  if (window.sessionStorage.getItem('webp-support') !== null) {
    return window.sessionStorage.getItem('webp-support') === 'true';
  }

  const webpData = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
  
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const result = img.width === 1;
      window.sessionStorage.setItem('webp-support', String(result));
      resolve(result);
    };
    img.onerror = () => {
      window.sessionStorage.setItem('webp-support', 'false');
      resolve(false);
    };
    img.src = webpData;
  });
}

/**
 * Get optimized image URL based on device capabilities
 */
export function getOptimizedImageUrl(
  src: string,
  options: {
    width?: number;
    quality?: number;
    format?: 'webp' | 'jpeg' | 'png';
  } = {}
): string {
  // If it's a Unsplash image, use their optimization params
  if (src.includes('unsplash.com')) {
    const url = new URL(src);
    if (options.width) url.searchParams.set('w', String(options.width));
    if (options.quality) url.searchParams.set('q', String(options.quality));
    if (options.format) url.searchParams.set('fm', options.format);
    url.searchParams.set('auto', 'format'); // Auto-format selection
    return url.toString();
  }

  return src;
}

/**
 * Image loading strategy hook
 */
export function useImageLoadingStrategy() {
  const [strategy, setStrategy] = useState<'lazy' | 'eager'>('lazy');

  useEffect(() => {
    // Check connection speed
    const connection = (navigator as any).connection;
    if (connection) {
      if (connection.effectiveType === '4g' && !connection.saveData) {
        setStrategy('eager');
      }
    }
  }, []);

  return strategy;
}

/**
 * Progressive image loading component
 * Shows low quality first, then high quality
 */
interface ProgressiveImageProps {
  lowQualitySrc: string;
  highQualitySrc: string;
  alt: string;
  className?: string;
}

export function ProgressiveImage({
  lowQualitySrc,
  highQualitySrc,
  alt,
  className = '',
}: ProgressiveImageProps) {
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc);
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false);

  useEffect(() => {
    // Preload high quality image
    const img = new Image();
    img.onload = () => {
      setCurrentSrc(highQualitySrc);
      setIsHighQualityLoaded(true);
    };
    img.src = highQualitySrc;
  }, [highQualitySrc]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={`${className} transition-all duration-700 ${
        isHighQualityLoaded ? 'blur-0' : 'blur-sm'
      }`}
      loading="lazy"
      decoding="async"
    />
  );
}

/**
 * Background image component with optimization
 */
interface BackgroundImageProps {
  src: string;
  children?: ReactNode;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

export function BackgroundImage({
  src,
  children,
  className = '',
  overlay = false,
  overlayOpacity = 0.5,
}: BackgroundImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <div className={`relative ${className}`}>
      {/* Background image */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundImage: imageSrc ? `url(${imageSrc})` : undefined }}
      />
      
      {/* Overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
      
      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-zinc-100 animate-pulse" />
      )}
    </div>
  );
}
