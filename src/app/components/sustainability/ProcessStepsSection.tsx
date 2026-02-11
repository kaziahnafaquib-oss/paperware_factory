import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StepCardProps {
  number: string;
  text: string;
  align?: 'left' | 'right';
  delay?: number;
}

function StepCard({ number, text, align = 'left', delay = 0 }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === 'left' ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="backdrop-blur-[3.55px] bg-[rgba(0,51,1,0.83)] mix-blend-multiply rounded-[20px] border border-[rgba(255,255,255,0.5)] w-full"
    >
      <div className={`flex flex-row items-center gap-4 px-4 md:px-[21px] py-3 md:py-4 ${align === 'right' ? 'justify-end' : ''}`}>
        {align === 'left' && (
          <div className="shrink-0 w-[36px] h-[36px] md:w-[40px] md:h-[40px] bg-[rgba(246,246,246,0.62)] rounded-full flex items-center justify-center">
            <span className="font-['Poppins',sans-serif] font-semibold text-[24px] md:text-[30px] text-[#21501f] leading-none">
              {number}
            </span>
          </div>
        )}
        
        <div className={`flex-1 max-w-[555px] ${align === 'right' ? 'text-right' : 'text-left'}`}>
          <p className="font-['Poppins',sans-serif] font-semibold text-[14px] md:text-[18px] leading-[1.65] text-white m-0">
            {text}
          </p>
        </div>

        {align === 'right' && (
          <div className="shrink-0 w-[36px] h-[36px] md:w-[40px] md:h-[40px] bg-[rgba(246,246,246,0.62)] rounded-full flex items-center justify-center">
            <span className="font-['Poppins',sans-serif] font-semibold text-[24px] md:text-[30px] text-[#21501f] leading-none">
              {number}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function CupImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [-100, 700]);
  
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.muted = true;
      videoElement.play().catch((err) => {
        console.log('Video autoplay prevented:', err);
      });
    }
  }, []);
  
  return (
    <motion.div
      ref={containerRef}
      style={{ y }}
      className="h-[300px] md:h-[512px] relative shrink-0 w-full mb-8 md:mb-12"
    >
      <div className="absolute inset-0 overflow-visible pointer-events-none flex items-center justify-center">
        <video 
          ref={videoRef}
          width="512" 
          height="512"
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          className="h-full w-auto max-w-none object-contain drop-shadow-2xl"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
          suppressHydrationWarning
        >
          <source src="https://paperware.definedsolution.com/wp-content/uploads/2025/06/green_story2.webm" type="video/webm" />
        </video>
      </div>
    </motion.div>
  );
}

export function ProcessStepsSection() {
  const leftSteps = [
    {
      number: "1",
      text: "Paper, plastic, packing material, printing plates, food grade ink are prepared."
    },
    {
      number: "3",
      text: "Die cutting machines cut large amounts of shapes in a short time frame."
    },
    {
      number: "5",
      text: "In the packing process, the cups are stacked together in definite numbers and wrapped by plastic bags."
    }
  ];

  const rightSteps = [
    {
      number: "2",
      text: "Flexo printing or offset printing techniques are carefully applied to the prepared materials."
    },
    {
      number: "4",
      text: "Shapes are then fed into a forming machine that gets to transform them into paper cups."
    },
    {
      number: "6",
      text: "Free 1 month warehouse for stocking before cost-saving delivery."
    }
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Gradient Background - Removed */}
      
      {/* Content Container */}
      <div className="relative z-10 px-4 md:px-8 lg:px-[80px] xl:px-[150px] py-12 md:py-20">
        {/* Cup Image */}
        <CupImage />

        {/* Steps Grid - Desktop: Two Columns, Mobile: Single Column */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 xl:gap-[100px] max-w-[1400px] mx-auto">
          {/* Left Column */}
          <div className="flex flex-col gap-5 md:gap-[20px]">
            {leftSteps.map((step, index) => (
              <div key={step.number} className={index > 0 ? 'pt-[80px] md:pt-[100px]' : ''}>
                <StepCard 
                  number={step.number} 
                  text={step.text} 
                  align="left"
                  delay={index * 0.15}
                />
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5 md:gap-[20px] pt-[80px] md:pt-[100px]">
            {rightSteps.map((step, index) => (
              <div key={step.number} className={index > 0 ? 'pt-[80px] md:pt-[100px]' : ''}>
                <StepCard 
                  number={step.number} 
                  text={step.text} 
                  align="right"
                  delay={index * 0.15 + 0.1}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Single Column Layout */}
        <div className="flex lg:hidden flex-col gap-5 max-w-[600px] mx-auto">
          {[...leftSteps, ...rightSteps]
            .sort((a, b) => parseInt(a.number) - parseInt(b.number))
            .map((step, index) => (
              <StepCard 
                key={step.number}
                number={step.number} 
                text={step.text} 
                align="left"
                delay={index * 0.1}
              />
            ))}
        </div>
      </div>
    </div>
  );
}