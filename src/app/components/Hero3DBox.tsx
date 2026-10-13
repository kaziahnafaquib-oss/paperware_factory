import React from "react";
import { motion } from "motion/react";

// Import provided Figma assets
import iconSheetImg from "figma:asset/135e5c818885312b22073a240021cd1b9d50f297.webp";
import medBoxImg from "figma:asset/2204e5795799b0c2f5c29c7fb96cafac3e9ab57c.webp";

const iconPositions = [
  "origin-[10%_15%]", // Top Left
  "origin-[80%_15%]", // Top Right
  "origin-[80%_85%]", // Bottom Right
  "origin-[10%_80%]", // Bottom Left
];

export function Hero3DBox() {
  const [boxRotation, setBoxRotation] = React.useState({ x: 20, y: 0 });
  
  // Independent indices for each face to allow staggered updates
  // 0: Front, 1: Right, 2: Back, 3: Left
  const [faceIndices, setFaceIndices] = React.useState([0, 1, 2, 3]);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const x = (clientX - centerX) / 50;
        const y = (clientY - centerY) / 50;
        setBoxRotation({ x: 20 - y, y: x });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update faces one by one (staggered effect)
  React.useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      setFaceIndices(prev => {
        const next = [...prev];
        const faceToUpdate = step % 4; // Cycle through faces: Front -> Right -> Back -> Left
        next[faceToUpdate] = (next[faceToUpdate] + 1) % iconPositions.length;
        return next;
      });
      step++;
    }, 600); // Fast update: every 600ms
    return () => clearInterval(interval);
  }, []);

  // Helper to get position class for a specific face index
  const getIconClass = (faceIndex: number) => {
    return iconPositions[faceIndices[faceIndex] % iconPositions.length];
  };

  // Common face styles
  const faceClassName = "absolute inset-0 bg-white border-2 border-[#fabf37] flex items-center justify-center overflow-hidden rounded-2xl backface-visibility-hidden";
  // Common image styles with faster transition
  const imgClassName = "w-full h-full object-cover scale-[5] transition-all duration-300 ease-in-out";

  return (
    <div className="relative size-24 md:size-32 ml-4 md:ml-8 z-20 inline-flex items-center justify-center">
       <div className="relative size-24 md:size-32 preserve-3d" style={{ perspective: "1200px" }}>
         <motion.div
           animate={{ 
             rotateY: [boxRotation.y, boxRotation.y + 360],
             rotateX: [boxRotation.x, boxRotation.x + 10, boxRotation.x],
             y: [0, -15, 0]
           }}
           transition={{ 
             rotateY: { duration: 12, repeat: Infinity, ease: "linear" }, // Faster rotation
             rotateX: { duration: 5, repeat: Infinity, ease: "easeInOut" },
             y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
           }}
           className="relative size-full preserve-3d will-change-transform"
         >
           {/* Front Face (Index 0) */}
           <div className={`${faceClassName} shadow-[0_0_30px_rgba(250,191,55,0.2)] [transform:translateZ(3rem)] md:[transform:translateZ(4rem)]`}>
             <img loading="lazy" decoding="async" 
               src={iconSheetImg} 
               alt="Packaging Icon" 
               className={`${imgClassName} ${getIconClass(0)}`} 
             />
           </div>
           
           {/* Right Face (Index 1) */}
           <div className={`${faceClassName} translate-x-12 md:translate-x-16 rotate-y-90`}>
             <img loading="lazy" decoding="async" 
               src={iconSheetImg} 
               alt="Packaging Icon" 
               className={`${imgClassName} ${getIconClass(1)}`} 
             />
           </div>

           {/* Back Face (Index 2) - Brand Color Background */}
           <div className={`${faceClassName} !bg-[#fabf37] [transform:translateZ(-3rem)_rotateY(180deg)] md:[transform:translateZ(-4rem)_rotateY(180deg)]`}>
             <img loading="lazy" decoding="async" 
               src={iconSheetImg} 
               alt="Packaging Icon" 
               className={`${imgClassName} mix-blend-multiply ${getIconClass(2)}`} 
             />
           </div>
           
           {/* Left Face (Index 3) */}
           <div className={`${faceClassName} -translate-x-12 md:-translate-x-16 -rotate-y-90`}>
             <img loading="lazy" decoding="async" 
               src={iconSheetImg} 
               alt="Packaging Icon" 
               className={`${imgClassName} ${getIconClass(3)}`} 
             />
           </div>
           
           {/* Top Face - Lid */}
           <div className="absolute inset-0 bg-white border-2 border-[#fabf37]/30 -translate-y-12 md:-translate-y-16 rotate-x-90 flex items-center justify-center overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-[#fabf37]/10" />
              <div className="w-16 h-16 border-2 border-[#fabf37]/20 rounded-full" />
           </div>
           
           {/* Bottom Face - Base */}
           <div className="absolute inset-0 bg-zinc-100 border-2 border-[#fabf37]/30 translate-y-12 md:translate-y-16 -rotate-x-90 rounded-2xl" />
         </motion.div>
       </div>
    </div>
  );
}
