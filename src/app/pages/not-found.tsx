import React from "react";
import { ArrowRight } from "lucide-react";
import { whatsAppInquiryUrl } from "../lib/inquiry";
import { useLanguage } from "../context/LanguageContext";

/** Shown for unknown URLs (previously every path silently rendered the homepage). */
export function NotFoundPage({ onPageChange }: { onPageChange: (page: string) => void }) {
  const { t } = useLanguage();
  const links: { id: string; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "products", label: "All products" },
    { id: "papercups", label: "Paper cups" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <section id="main-content" className="min-h-[70vh] bg-zinc-50 text-zinc-900 flex items-center justify-center px-6 pt-40 pb-24">
      <div className="max-w-xl text-center space-y-6">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-zinc-500">404</p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">{t("not_found_we_couldn_t_find_that")}</h1>
        <p className="text-base text-zinc-600 leading-relaxed">
          {t("not_found_the_link_may_be_old")}
        </p>
        <nav aria-label={t("not_found_suggested_pages")} className="flex flex-wrap justify-center gap-3">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => onPageChange(link.id)}
              className="min-h-11 px-6 rounded-full bg-black text-white font-bold text-sm hover:bg-[#fabf37] hover:text-black transition-colors"
            >
              {t(link.label)}
            </button>
          ))}
        </nav>
        <a
          href={whatsAppInquiryUrl("Question from the website")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold underline underline-offset-4"
        >
          {t("not_found_message_us_on_whatsapp")} <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  );
}
