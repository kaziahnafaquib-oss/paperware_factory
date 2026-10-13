import React from "react";
import { ArrowRight } from "lucide-react";
import { whatsAppInquiryUrl } from "../lib/inquiry";

/** Shown for unknown URLs (previously every path silently rendered the homepage). */
export function NotFoundPage({ onPageChange }: { onPageChange: (page: string) => void }) {
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
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">We couldn't find that page</h1>
        <p className="text-base text-zinc-600 leading-relaxed">
          The link may be old or mistyped. Try one of these, or message us and we'll point you in the right direction.
        </p>
        <nav aria-label="Suggested pages" className="flex flex-wrap justify-center gap-3">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => onPageChange(link.id)}
              className="min-h-11 px-6 rounded-full bg-black text-white font-bold text-sm hover:bg-[#fabf37] hover:text-black transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>
        <a
          href={whatsAppInquiryUrl("Question from the website")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold underline underline-offset-4"
        >
          Message us on WhatsApp <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  );
}
