import { PropsWithChildren, useEffect, useRef } from 'react';
import { motion } from "framer-motion";

type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: PropsWithChildren<WrapperProps>) {
  return (
    <div className={`relative shrink-0 max-w-full ${additionalClassNames}`}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">{children}</div>
    </div>
  );
}

function GreenWebm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  
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
    <div 
      className="h-[300px] md:h-[512px] relative shrink-0 w-full bg-transparent" 
      data-name="green.webm"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <video 
          ref={videoRef}
          width="512" 
          height="512"
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          className="h-full w-auto object-contain"
          style={{
            filter: 'drop-shadow(0 15px 30px rgba(0, 51, 1, 0.2))',
          }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
          suppressHydrationWarning
        >
          <source src="https://paperware.definedsolution.com/wp-content/uploads/2025/06/green.webm" type="video/webm" />
        </video>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8.39px] pt-0 px-0 relative shrink-0 w-full lg:w-[720px] z-[2]" data-name="Container">
      <GreenWebm />
    </div>
  );
}

function Heading() {
  return (
    <Wrapper additionalClassNames="w-full lg:max-w-[520px]">
      <div className="flex flex-col font-['Poppins',sans-serif] font-black leading-[1.1] md:leading-[1.2] not-italic relative shrink-0 text-[#003301] text-[48px] md:text-[64px] lg:text-[80px] uppercase w-full">
        <p className="mb-0 text-[36px]">Raise Your Cup</p>
        <p className="mb-0 text-[36px]">to a Greener</p>
        <p className="text-[36px]">World</p>
      </div>
    </Wrapper>
  );
}

function Container2() {
  return (
    <Wrapper additionalClassNames="w-full lg:max-w-[480px]">
      <div className="flex flex-col font-['Poppins',sans-serif] font-normal leading-[18px] md:leading-[22px] not-italic relative shrink-0 text-[12px] md:text-[14px] text-zinc-700">
        <p className="mb-0">Celebrate sustainability with every sip — our eco-conscious</p>
        <p className="mb-0">paper cups are crafted from responsibly sourced materials,</p>
        <p className="mb-0">designed to reduce waste, and made to support a healthier</p>
        <p>planet for generations to come.</p>
      </div>
    </Wrapper>
  );
}

function OverlayBorderOverlayBlur() {
  return (
    <div className="backdrop-blur-[3.55px] backdrop-filter bg-white/80 w-full lg:max-w-[520px] relative rounded-[20px] shrink-0 border border-zinc-200" data-name="Overlay+Border+OverlayBlur">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] p-4 md:p-[16px] relative w-full">
        <Container2 />
      </div>
    </div>
  );
}

function VerticalBorder() {
  return (
    <div className="relative shrink-0 w-full" data-name="VerticalBorder">
      {/* Green vertical line - middle divider */}
      <div aria-hidden="true" className="hidden lg:block absolute border-[0px_0px_0px_6px] border-[rgba(0,51,1,0.47)] border-solid top-0 bottom-0 pointer-events-none -left-[100px]" />
      <div className="content-stretch flex flex-col gap-[20px] items-start lg:-ml-[80px] py-0 relative w-full">
        <Heading />
        <OverlayBorderOverlayBlur />
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full lg:w-[720px] z-[1]" data-name="Margin">
      <VerticalBorder />
    </div>
  );
}

export function GreenCupSection() {
  return (
    <div className="content-stretch flex flex-col lg:flex-row isolate items-center pb-0 pt-8 lg:pt-[100px] px-0 relative size-full lg:-ml-8" data-name="Container">
      <Container />
      <Margin />
    </div>
  );
}