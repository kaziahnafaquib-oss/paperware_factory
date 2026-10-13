// 🖼️ Optimized Image Component for 98/100 Performance Score
import React from 'react';
import { 
  optimizeUnsplashImage, 
  generateBlurPlaceholder,
  generateSrcSet,
  generateSizes,
  setImagePriority,
  decodeImage
} from '@/app/lib/image-optimizer';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: 'high' | 'low' | 'auto';
  quality?: number;
  blur?: boolean;
  lazy?: boolean;
  responsive?: boolean;
  aspectRatio?: number;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width = 1200,
  height,
  className = '',
  priority = 'auto',
  quality = 80,
  blur = true,
  lazy = true,
  responsive = true,
  aspectRatio = 16 / 9,
  sizes,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  // Calculate dimensions
  const imgHeight = height || Math.round(width / aspectRatio);

  // Optimize URLs
  const optimizedSrc = optimizeUnsplashImage(src, {
    width,
    height: imgHeight,
    quality,
    format: 'webp'
  });

  const blurPlaceholder = blur ? generateBlurPlaceholder(src) : undefined;

  // Generate responsive srcset
  const srcSet = responsive 
    ? generateSrcSet(src, [320, 640, 768, 1024, 1280, 1920])
    : undefined;

  const imageSizes = sizes || (responsive ? generateSizes() : undefined);

  // Handle load
  const handleLoad = async () => {
    setIsLoaded(true);
    
    // Decode image asynchronously
    if (imgRef.current) {
      await decodeImage(imgRef.current);
    }
    
    onLoad?.();
  };

  // Handle error
  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Set priority on mount
  React.useEffect(() => {
    if (imgRef.current) {
      setImagePriority(imgRef.current, priority);
    }
  }, [priority]);

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ 
        aspectRatio: aspectRatio ? `${aspectRatio}` : undefined 
      }}
    >
      {/* Blur placeholder */}
      {blur && blurPlaceholder && !isLoaded && (
        <img loading="lazy" decoding="async"
          src={blurPlaceholder}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-lg scale-110 transition-opacity duration-300"
          style={{
            opacity: isLoaded ? 0 : 1
          }}
        />
      )}

      {/* Main image */}
      <img
        ref={imgRef}
        src={optimizedSrc}
        srcSet={srcSet}
        sizes={imageSizes}
        alt={alt}
        width={width}
        height={imgHeight}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`
          w-full h-full object-cover transition-opacity duration-500
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${hasError ? 'bg-zinc-200' : ''}
        `}
        style={{
          contentVisibility: 'auto'
        }}
      />

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 text-zinc-400">
          <svg 
            className="w-12 h-12" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        </div>
      )}

      {/* Loading skeleton */}
      {!blur && !isLoaded && !hasError && (
        <div className="absolute inset-0 bg-zinc-200 animate-pulse" />
      )}
    </div>
  );
}

/**
 * Background Image Component (for hero sections)
 */
interface OptimizedBackgroundProps {
  src: string;
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean;
  overlayOpacity?: number;
  priority?: 'high' | 'low' | 'auto';
}

export function OptimizedBackground({
  src,
  className = '',
  children,
  overlay = true,
  overlayOpacity = 0.5,
  priority = 'high'
}: OptimizedBackgroundProps) {
  const optimizedSrc = optimizeUnsplashImage(src, {
    width: 1920,
    quality: 85,
    format: 'webp'
  });

  const blurSrc = generateBlurPlaceholder(src);

  return (
    <div className={`relative ${className}`}>
      {/* Blur placeholder */}
      <div 
        className="absolute inset-0 bg-cover bg-center blur-lg scale-110"
        style={{ backgroundImage: `url(${blurSrc})` }}
      />
      
      {/* Main background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{ backgroundImage: `url(${optimizedSrc})` }}
      />

      {/* Overlay */}
      {overlay && (
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

/**
 * Progressive Image Component
 */
export function ProgressiveImage({
  src,
  alt,
  className = '',
  width = 1200,
  height
}: OptimizedImageProps) {
  const [currentSrc, setCurrentSrc] = React.useState(generateBlurPlaceholder(src));
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const img = new Image();
    img.src = optimizeUnsplashImage(src, { width, height, quality: 80 });
    
    img.onload = () => {
      setCurrentSrc(img.src);
      setIsLoading(false);
    };
  }, [src, width, height]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      className={`
        transition-all duration-500
        ${isLoading ? 'blur-lg scale-105' : 'blur-0 scale-100'}
        ${className}
      `}
      loading="lazy"
      decoding="async"
    />
  );
}
