import React from "react";
import { ArrowRight, Flame, Leaf, ShieldCheck, Layers } from "lucide-react";
import imgSingle from "../../../assets/cutouts/cup.webp";
import imgRipple from "../../../assets/cutouts/cup-ripple-orange.webp";
import imgDouble from "../../../assets/cutouts/cup-wave-yellow.webp";
import { useLanguage } from "../../context/LanguageContext";

type Props = { as?: "h1" | "h2"; onPageChange?: (page: string) => void };

const SPECS = ["liquid", "outer", "use", "print"] as const;

const WALLS = [
  { id: "single", img: imgSingle, featured: false },
  { id: "ripple", img: imgRipple, featured: true },
  { id: "double", img: imgDouble, featured: false },
] as const;

const COATINGS = [
  { id: "pe_pla", Icon: Layers },
  { id: "aqueous", Icon: ShieldCheck },
  { id: "pla", Icon: Leaf },
] as const;

export const MaterialLab = React.memo(function MaterialLab({ as = "h2", onPageChange }: Props) {
  const { t } = useLanguage();
  const H = as;

  return (
    <section aria-labelledby="ml-title" className="relative overflow-x-clip bg-[#0a0a0a] pb-20 pt-36 text-white md:pb-28 md:pt-44">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(250,191,55,0.08)_0%,transparent_55%)]" />
      <div className="container relative z-10 mx-auto px-4">
        <header className="max-w-3xl">
          <p className="mb-5 flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-[#fabf37]">
            <span className="h-px w-12 bg-[#fabf37]" aria-hidden="true" />
            {t("ml_eyebrow")}
          </p>
          <H id="ml-title" className="text-4xl font-black uppercase leading-[0.95] tracking-tighter md:text-7xl">
            {t("ml_title_a")} <span className="text-[#fabf37]">{t("ml_title_b")}</span>
          </H>
          <p className="mt-6 max-w-xl text-lg font-bold leading-relaxed text-zinc-300">{t("ml_intro")}</p>
        </header>

        <h2 className="sr-only">{t("ml_walls_title")}</h2>
        <ul className="mt-12 grid grid-cols-1 gap-6 md:mt-16 lg:grid-cols-3">
          {WALLS.map((w) => (
            <li
              key={w.id}
              className={`relative flex flex-col rounded-[32px] border p-6 md:p-8 ${
                w.featured ? "border-[#fabf37] bg-[#fabf37] text-black" : "border-white/10 bg-zinc-900/70 text-white"
              }`}
            >
              {w.featured && (
                <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-black px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#fabf37]">
                  <Flame className="size-3" aria-hidden="true" />
                  {t("ml_recommended")}
                </span>
              )}
              <div className="flex h-44 items-center justify-center md:h-52">
                <img src={w.img} alt="" loading="lazy" decoding="async" className="h-full w-auto object-contain" />
              </div>
              <h3 className="mt-4 text-2xl font-black uppercase tracking-tight md:text-3xl">{t(`ml_${w.id}_name`)}</h3>
              <dl className={`mt-6 divide-y ${w.featured ? "divide-black/15" : "divide-white/10"}`}>
                {SPECS.map((s) => (
                  <div key={s} className="flex items-baseline justify-between gap-4 py-3">
                    <dt className={`text-[11px] font-black uppercase tracking-widest ${w.featured ? "text-black/75" : "text-zinc-400"}`}>
                      {t(`ml_spec_${s}`)}
                    </dt>
                    <dd className={`text-right text-lg font-black tracking-tight ${w.featured ? "" : "text-white"}`}>
                      {t(`ml_v_${w.id}_${s}`)}
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>

        <div className="mt-20 md:mt-28">
          <h2 className="text-3xl font-black uppercase tracking-tighter md:text-5xl">{t("ml_coatings_title")}</h2>
          <p className="mt-4 max-w-xl text-base font-bold text-zinc-300">{t("ml_coatings_intro")}</p>
          <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {COATINGS.map(({ id, Icon }) => (
              <li key={id} className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-6 md:p-8">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-black text-[#fabf37]">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-black uppercase tracking-tight">{t(`ml_${id}_title`)}</h3>
                <p className="mt-3 text-base font-semibold leading-relaxed text-zinc-300">{t(`ml_${id}_text`)}</p>
              </li>
            ))}
          </ul>
        </div>

        {onPageChange && (
          <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-[32px] border border-white/10 bg-zinc-900/70 p-8 md:flex-row md:items-center md:p-10">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight md:text-3xl">{t("ml_cta_title")}</h2>
              <p className="mt-2 font-bold text-zinc-300">{t("ml_cta_text")}</p>
            </div>
            <button
              type="button"
              onClick={() => onPageChange("contact")}
              className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#fabf37] px-8 py-4 text-[11px] font-black uppercase tracking-widest text-black transition-transform hover:translate-x-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none motion-reduce:hover:translate-x-0"
            >
              {t("ml_cta_button")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
});
