// ✨ Enhanced Button Component with Advanced Effects
import { MouseEvent as ReactMouseEvent, ReactNode, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface EnhancedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'neon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  magnetic?: boolean;
  glow?: boolean;
}

export function EnhancedButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  className = '',
  disabled = false,
  fullWidth = false,
  magnetic = false,
  glow = false
}: EnhancedButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setRipples(prev => [...prev, { x, y, id }]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 600);
    
    onClick?.();
  };

  const handleMouseMove = (e: ReactMouseEvent) => {
    if (!magnetic || !ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    ref.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  const handleMouseLeave = () => {
    if (!magnetic || !ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
  };

  const variants = {
    primary: 'bg-[#fabf37] text-black hover:bg-[#ff9800] shadow-lg hover:shadow-xl',
    secondary: 'bg-black text-[#fabf37] hover:bg-zinc-800 shadow-lg hover:shadow-xl',
    outline: 'bg-transparent border-2 border-[#fabf37] text-[#fabf37] hover:bg-[#fabf37] hover:text-black',
    ghost: 'bg-transparent text-zinc-900 hover:bg-zinc-100',
    neon: 'bg-black text-[#fabf37] border-2 border-[#fabf37] shadow-[0_0_20px_rgba(250,191,55,0.5)] hover:shadow-[0_0_40px_rgba(250,191,55,0.8)]'
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
    xl: 'px-10 py-5 text-lg'
  };

  return (
    <motion.button
      ref={ref}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`
        relative overflow-hidden rounded-full font-bold uppercase tracking-wider
        transition-all duration-300 ease-out
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${glow ? 'animate-pulse-glow' : ''}
        ${className}
      `}
      style={{
        transition: magnetic ? 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)' : undefined
      }}
    >
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute w-4 h-4 bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
            animation: 'ripple 0.6s ease-out'
          }}
        />
      ))}

      {/* Shimmer effect */}
      <span className="absolute inset-0 shimmer pointer-events-none" />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {Icon && iconPosition === 'left' && <Icon className="size-4" />}
        {children}
        {Icon && iconPosition === 'right' && (
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Icon className="size-4" />
          </motion.span>
        )}
      </span>
    </motion.button>
  );
}
