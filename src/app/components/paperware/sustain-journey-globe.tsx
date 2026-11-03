import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./sustain-journey.css";

const STEPS = [
  "sustainability_ethical_supply_chain",
  "sustainability_material_reduction_and_replacement",
  "sustainability_sustainable_corporate_governance",
  "sustainability_paperware_happiness_project",
];

/** Abstract (not geographic) land shapes, tiled twice so the strip loops seamlessly. */
const LAND = [
  "M30 120 C50 70 110 60 140 95 C165 125 130 170 80 175 C45 178 20 155 30 120Z",
  "M200 60 C230 35 290 45 300 85 C308 120 270 140 235 130 C205 120 180 85 200 60Z",
  "M250 190 C275 170 320 180 322 215 C324 245 285 262 258 245 C238 232 236 205 250 190Z",
  "M360 110 C385 90 430 100 438 135 C446 168 405 190 378 176 C352 162 345 128 360 110Z",
];

export function SustainJourneyGlobe() {
  const { t } = useLanguage();
  const W = 480;
  const strip = (
    <>
      {LAND.map((d, i) => <path key={i} d={d} fill="#4D8B55" />)}
      {LAND.map((d, i) => <path key={`b${i}`} d={d} transform={`translate(${W} 0) `} fill="#4D8B55" />)}
    </>
  );
  return (
    <section aria-labelledby="sustain-journey-h" className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12 lg:py-24">
      <div className="order-2 lg:order-1">
        <h2 id="sustain-journey-h" className="font-['Poppins',sans-serif] font-black uppercase leading-[1.1] text-[#003301] text-[28px] md:text-[40px]">
          {t("sustain_journey_title")}
        </h2>
        <p className="mt-3 text-zinc-600 text-sm md:text-base max-w-md">{t("sustain_journey_intro")}</p>
        <ol className="mt-8 space-y-3">
          {STEPS.map((k, i) => (
            <li key={k} className="flex items-center gap-4 rounded-2xl border border-[#003301]/10 bg-[#f4f9f0] px-4 py-3">
              <span aria-hidden="true" className="size-9 shrink-0 rounded-full bg-[#003301] text-[#fabf37] font-black text-sm flex items-center justify-center">{i + 1}</span>
              <span className="font-bold text-[#003301] text-sm md:text-base">{t(k)}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="order-1 lg:order-2 flex justify-center">
        <svg viewBox="0 0 400 400" role="img" aria-label={t("sustain_journey_globe_alt")} className="w-[260px] md:w-[400px] h-auto">
          <defs>
            <clipPath id="sustain-globe-clip"><circle cx="200" cy="200" r="190" /></clipPath>
            <radialGradient id="sustain-globe-sea" cx="38%" cy="32%" r="80%">
              <stop offset="0" stopColor="#9DC88D" /><stop offset="1" stopColor="#1A5336" />
            </radialGradient>
            <radialGradient id="sustain-globe-shade" cx="50%" cy="50%" r="50%">
              <stop offset="0.55" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#001a08" stopOpacity="0.55" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="190" fill="url(#sustain-globe-sea)" />
          <g clipPath="url(#sustain-globe-clip)">
            <g className="sustain-globe-strip">
              <g transform="translate(0 20)">{strip}</g>
            </g>
            <g fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="1">
              <ellipse cx="200" cy="200" rx="190" ry="60" />
              <ellipse cx="200" cy="200" rx="190" ry="125" />
              <line x1="10" y1="200" x2="390" y2="200" />
            </g>
            <circle cx="200" cy="200" r="190" fill="url(#sustain-globe-shade)" />
          </g>
          <circle cx="200" cy="200" r="190" fill="none" stroke="#003301" strokeOpacity="0.25" strokeWidth="2" />
        </svg>
      </div>
    </section>
  );
}
