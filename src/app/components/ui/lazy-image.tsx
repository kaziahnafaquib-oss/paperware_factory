import { ImgHTMLAttributes, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  threshold?: number;
  className?: string;
  wrapperClassName?: string;
  onLoad?: () => void;
  aspectRatio?: string;
  blur?: boolean;
}

export function LazyImage({
  src,
  alt,
  placeholderSrc = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E',
  threshold = 0.01,
  className = '',
  wrapperClassName = '',
  onLoad,
  aspectRatio,
  blur = true,
  ...props
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(placeholderSrc);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start loading the actual image
            const img = new Image();
            img.src = src;
            img.onload = () => {
              setImageSrc(src);
              setImageLoaded(true);
              if (onLoad) onLoad();
            };
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '50px', // Start loading 50px before entering viewport
      }
    );

    observer.observe(imageRef.current);

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [src, threshold, onLoad]);

  return (
    <div 
      className={`relative overflow-hidden ${wrapperClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <motion.img
        ref={imageRef}
        src={imageSrc}
        alt={alt}
        className={`${className} ${
          !imageLoaded && blur ? 'blur-sm scale-105' : 'blur-0 scale-100'
        } transition-all duration-500`}
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded ? 1 : 0.5 }}
        loading="lazy"
        decoding="async"
        {...props}
      />
      {!imageLoaded && (
        <div className="absolute inset-0 bg-zinc-100 animate-pulse" />
      )}
    </div>
  );
}

// Preload critical images
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Preload multiple images
export async function preloadImages(srcs: string[]): Promise<void[]> {
  return Promise.all(srcs.map(preloadImage));
}