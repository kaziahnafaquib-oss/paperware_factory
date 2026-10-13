import React from "react";
import clsx from "clsx";
import earthGlobe from 'figma:asset/d9bc56d5ac1b8289e38bb2eca6596e00d255eb7a.png';
import mossEarth from 'figma:asset/030a98abab19ca707b7d61f033927447b4531a95.webp';

type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("relative shrink-0 max-w-full", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end relative w-full">{children}</div>
    </div>
  );
}

function Heading() {
  return (
    <Wrapper additionalClassNames="w-full lg:max-w-[520px]">
      <div className="flex flex-col font-['Poppins',sans-serif] font-black justify-center leading-[1.1] md:leading-[1.2] not-italic relative shrink-0 text-white lg:text-[#003301] text-[24px] md:text-[36px] text-right">
        <p className="mb-0">JOURNEY TO</p>
        <p className="mb-0">SAVE THE</p>
        <p>ENVIRONMENT</p>
      </div>
    </Wrapper>
  );
}

function Container() {
  return (
    <Wrapper additionalClassNames="w-full lg:max-w-[480px]">
      <div className="flex flex-col font-['Poppins',sans-serif] font-normal justify-center leading-[18px] md:leading-[22px] not-italic relative shrink-0 text-[12px] md:text-[14px] text-right text-white">
        <p className="mb-0">Our journey to save the environment is rooted in</p>
        <p className="mb-0">responsibility — we craft paperware with sustainably</p>
        <p className="mb-0">harvested materials, eco-conscious processes, and a</p>
        <p className="mb-0">passion for reducing waste, so that every product we make</p>
        <p className="mb-0">supports a cleaner planet and a brighter, more resilient</p>
        <p>future.</p>
      </div>
    </Wrapper>
  );
}

function OverlayBorderOverlayBlur() {
  return (
    <div className="backdrop-blur-[3.55px] backdrop-filter bg-[rgba(0,51,1,0.9)] w-full lg:max-w-[520px] mix-blend-multiply relative rounded-[20px] shrink-0" data-name="Overlay+Border+OverlayBlur">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] p-4 md:p-[16px] relative w-full">
        <Container />
      </div>
    </div>
  );
}

function VerticalBorder() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 flex flex-col items-end w-full" data-name="VerticalBorder">
      <div aria-hidden="true" className="hidden lg:block absolute border-[0px_6px_0px_0px] border-[rgba(0,51,1,0.47)] border-solid inset-0 pointer-events-none -right-[100px]" />
      <div className="content-stretch flex flex-col gap-[20px] items-end lg:-mr-[80px] py-0 relative w-full">
        <Heading />
        <OverlayBorderOverlayBlur />
      </div>
    </div>
  );
}

// Fallback component without 3D globe to prevent React version conflicts
function Earth3DFallback() {
  return (
    <div className="h-[300px] md:h-[512px] relative shrink-0 w-full flex items-center justify-center" data-name="earth3d-fallback">
      <div className="relative w-full h-full max-w-[500px] mx-auto flex flex-col items-center justify-center">
        {/* Simple Moss Earth Globe */}
        <div className="relative w-[280px] h-[280px] md:w-[420px] md:h-[420px]">
          
          {/* Earth Globe - Clean without decorations */}
          <div 
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              animation: 'slowRotate 50s linear infinite',
            }}
          >
            {/* Moss Earth Image */}
            <img loading="lazy" decoding="async" 
              src={mossEarth}
              alt="Sustainable Moss Earth"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: 'scale(1)',
                imageRendering: 'auto',
                filter: 'brightness(1.1) contrast(1.15) saturate(1.2)',
              }}
            />
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes slowRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8.39px] pt-0 px-0 relative shrink-0 w-full lg:w-[720px]" data-name="Container">
      <Earth3DFallback />
    </div>
  );
}

export function JourneySection() {
  return (
    <div className="content-stretch flex flex-col-reverse lg:flex-row items-center pb-0 pt-8 lg:pt-[100px] px-0 relative size-full" data-name="Container">
      <VerticalBorder />
      <Container1 />
    </div>
  );
}