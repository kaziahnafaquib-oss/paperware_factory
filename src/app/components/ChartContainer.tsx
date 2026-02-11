import { ReactNode, useEffect, useRef, useState } from 'react';
import { ResponsiveContainer } from "recharts";

interface ChartContainerProps {
  children: ReactNode;
  width?: string | number;
  height?: string | number;
  minHeight?: number;
  className?: string;
}

/**
 * Wrapper for ResponsiveContainer that ensures proper dimensions
 * Fixes: "width(-1) and height(-1) of chart should be greater than 0" error
 * 
 * This component ensures charts always have valid dimensions, even when
 * rendered in hidden/collapsed states (modals, tabs, etc.)
 */
export function ChartContainer({ 
  children, 
  width = "100%", 
  height = "100%",
  minHeight = 200,
  className = ""
}: ChartContainerProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: Math.max(rect.width, 100), // Minimum 100px
          height: Math.max(rect.height, minHeight)
        });
      }
    };

    // Initial measurement
    updateDimensions();

    // Use ResizeObserver for responsive updates
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);

    // Also update on window resize
    window.addEventListener('resize', updateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, [minHeight]);

  // Don't render chart until we have valid dimensions
  const hasValidDimensions = dimensions.width > 0 && dimensions.height > 0;

  return (
    <div 
      ref={containerRef}
      className={className || "w-full h-full"}
      style={{ 
        minHeight: `${minHeight}px`,
        minWidth: 0,
        position: 'relative'
      }}
    >
      {hasValidDimensions ? (
        <ResponsiveContainer width={width} height={height}>
          {children}
        </ResponsiveContainer>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-xs text-zinc-500">Loading chart...</div>
        </div>
      )}
    </div>
  );
}