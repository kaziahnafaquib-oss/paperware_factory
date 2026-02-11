import clsx from "clsx";
import imgEarth3DWebm from "figma:asset/d259b5fdc9662c5bae9bd0310d27c34b787e68b7.png";
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end relative w-full">{children}</div>
    </div>
  );
}

function Heading() {
  return (
    <Wrapper additionalClassNames="w-[664px]">
      <div className="flex flex-col font-['Poppins:Black',sans-serif] justify-center leading-[70px] not-italic relative shrink-0 text-[#003301] text-[64px] text-nowrap text-right">
        <p className="mb-0">JOURNEY TO</p>
        <p className="mb-0">SAVE THE</p>
        <p>ENVIRONMENT</p>
      </div>
    </Wrapper>
  );
}

function Container() {
  return (
    <Wrapper additionalClassNames="w-[612px]">
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[33px] not-italic relative shrink-0 text-[20px] text-nowrap text-right text-white">
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
    <div className="backdrop-blur-[3.55px] backdrop-filter bg-[rgba(0,51,1,0.9)] max-w-[720px] mix-blend-multiply relative rounded-[20px] shrink-0 w-[664px]" data-name="Overlay+Border+OverlayBlur">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] p-[26px] relative w-full">
        <Container />
      </div>
    </div>
  );
}

function VerticalBorder() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
      <div aria-hidden="true" className="absolute border-[0px_6px_0px_0px] border-[rgba(0,51,1,0.47)] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[20px] items-start pl-0 pr-[56px] py-0 relative w-full">
        <Heading />
        <OverlayBorderOverlayBlur />
      </div>
    </div>
  );
}

function Earth3DWebm() {
  return (
    <div className="h-[512px] relative shrink-0 w-full" data-name="earth3d.webm">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[14.44%] max-w-none top-0 w-[71.11%]" src={imgEarth3DWebm} />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8.39px] pt-0 px-0 relative shrink-0 w-[720px]" data-name="Container">
      <Earth3DWebm />
    </div>
  );
}

export default function Container2() {
  return (
    <div className="content-stretch flex items-center pb-0 pt-[100px] px-0 relative size-full" data-name="Container">
      <VerticalBorder />
      <Container1 />
    </div>
  );
}