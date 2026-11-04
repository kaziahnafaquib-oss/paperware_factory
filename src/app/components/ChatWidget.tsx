import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Bot, MessageCircle, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router";
import { useChat } from "../context/ChatContext";
import { useLanguage } from "../context/LanguageContext";
import { answerQuestion } from "../lib/chatKnowledge";
import { SALES_EMAIL, whatsAppInquiryUrl, emailInquiryHref } from "../lib/inquiry";
import { pathFor } from "../routes/routeTable";

/**
 * Rule-based FAQ assistant. No AI model, no network calls, nothing persisted:
 * everything lives in React state and disappears when the tab closes.
 * Human handoff = WhatsApp / email links with the summary prefilled.
 */
type Step = "name" | "phone" | "question" | "chat";
type Msg = {
  id: number;
  role: "bot" | "user";
  text: string;
  page?: { id: string; labelKey: string };
  handoff?: { question: string };
};

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const validName = (v: string) => /^[\p{L}][\p{L}\p{M} .'-]{1,59}$/u.test(v);
const validPhone = (v: string) => {
  if (!/^\+?[\d\s()-]+$/.test(v)) return false;
  const digits = v.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
};
const validQuestion = (v: string) => v.length >= 3 && v.length <= 500 && /\p{L}|\d/u.test(v);

export function ChatWidget() {
  const { isChatOpen, closeChat } = useChat();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const idRef = useRef(0);
  const nextId = () => ++idRef.current;
  const initialMsgs = useCallback(
    (): Msg[] => [
      { id: nextId(), role: "bot", text: t("chat_intro") },
      { id: nextId(), role: "bot", text: t("chat_consent") },
      { id: nextId(), role: "bot", text: t("chat_ask_name") },
    ],
    [t],
  );
  const [msgs, setMsgs] = useState<Msg[]>(initialMsgs);
  const [step, setStep] = useState<Step>("name");
  const [profile, setProfile] = useState({ name: "", phone: "" });
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  // Focus management: remember the opener, focus the input, hand focus back on close.
  useEffect(() => {
    if (!isChatOpen) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const id = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      window.clearTimeout(id);
      const back = returnFocusRef.current;
      (back && back.isConnected ? back : document.querySelector<HTMLElement>("[data-chat-launcher]"))?.focus?.();
    };
  }, [isChatOpen]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, isChatOpen]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      closeChat();
      return;
    }
    if (e.key !== "Tab" || !dialogRef.current) return;
    const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => n.offsetParent !== null);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (active === last || !dialogRef.current.contains(active))) {
      e.preventDefault();
      first.focus();
    }
  };

  const reset = () => {
    idRef.current = 0;
    setMsgs(initialMsgs());
    setStep("name");
    setProfile({ name: "", phone: "" });
    setInput("");
    setError("");
    inputRef.current?.focus();
  };

  const answer = (question: string, who: { name: string; phone: string }): Msg[] => {
    const hit = answerQuestion(question, t);
    if (hit && !hit.restricted) {
      return [
        { id: nextId(), role: "bot", text: hit.text, page: hit.page },
        { id: nextId(), role: "bot", text: t("chat_followup"), handoff: { question } },
      ];
    }
    return [{ id: nextId(), role: "bot", text: hit ? hit.text : t("chat_nomatch"), handoff: { question } }];
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = input.replace(/[\u0000-\u001F\u007F]/g, " ").trim();
    if (step === "name") {
      if (!validName(value)) return setError(t("chat_err_name"));
      setProfile((p) => ({ ...p, name: value }));
      setMsgs((m) => [...m, { id: nextId(), role: "user", text: value }, { id: nextId(), role: "bot", text: `${t("chat_thanks_name").replace("{name}", value)} ${t("chat_ask_phone")}` }]);
      setStep("phone");
    } else if (step === "phone") {
      if (!validPhone(value)) return setError(t("chat_err_phone"));
      setProfile((p) => ({ ...p, phone: value }));
      setMsgs((m) => [...m, { id: nextId(), role: "user", text: value }, { id: nextId(), role: "bot", text: `${t("chat_got_phone")} ${t("chat_ask_question")}` }]);
      setStep("question");
    } else {
      if (!validQuestion(value)) return setError(t("chat_err_question"));
      setMsgs((m) => [...m, { id: nextId(), role: "user", text: value }, ...answer(value, profile)]);
      setStep("chat");
    }
    setError("");
    setInput("");
  };

  const placeholder = step === "name" ? t("chat_ph_name") : step === "phone" ? t("chat_ph_phone") : step === "question" ? t("chat_ph_question") : t("chat_ph_followup");
  const handoffFields = (q: string) => ({ Name: profile.name, Phone: profile.phone, Question: q });
  const waTitle = t("chat_whatsapp_prefill");

  return createPortal(
    <AnimatePresence>
      {isChatOpen && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="pw-chat-title"
          aria-describedby="pw-chat-sub"
          onKeyDown={onKeyDown}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          style={{ zIndex: 2147483647 }}
          className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[390px] h-[min(600px,calc(100dvh-24px))] flex flex-col overflow-hidden bg-white shadow-2xl border border-black/10 rounded-[24px]"
        >
          <div className="bg-black p-4 flex items-center justify-between shrink-0 gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="size-10 rounded-full bg-[#fabf37] flex items-center justify-center shrink-0">
                <Bot className="size-5 text-black" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h2 id="pw-chat-title" className="text-white font-black text-sm tracking-wide leading-tight">{t("chat_title")}</h2>
                <p id="pw-chat-sub" className="text-[#fabf37] text-[11px] font-semibold leading-tight">{t("chat_subtitle")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button type="button" onClick={reset} aria-label={t("chat_reset")} title={t("chat_reset")} className="size-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#fabf37]">
                <RotateCcw className="size-4" aria-hidden="true" />
              </button>
              <button type="button" onClick={closeChat} aria-label={t("chat_close")} title={t("chat_close")} className="size-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#fabf37]">
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <a
            href={whatsAppInquiryUrl(waTitle)}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center justify-center gap-2 bg-[#25D366] text-black text-xs font-bold py-2 hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            {t("chat_whatsapp_link")}
          </a>

          <div ref={logRef} role="log" aria-live="polite" aria-relevant="additions" aria-label={t("chat_log_label")} className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-50">
            {msgs.map((m) => (
              <div key={m.id} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                <span className="sr-only">{m.role === "user" ? t("chat_you") : t("chat_bot")}:</span>
                <div className={`max-w-[88%] px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-line rounded-2xl ${m.role === "bot" ? "bg-[#fabf37] text-black rounded-tl-sm" : "bg-white border border-zinc-200 text-zinc-900 rounded-tr-sm"}`}>
                  {m.text}
                </div>
                {m.page && (
                  <button
                    type="button"
                    onClick={() => { navigate(pathFor(m.page!.id)); closeChat(); }}
                    className="mt-1.5 text-xs font-bold underline underline-offset-2 text-zinc-800 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
                  >
                    {t("chat_open_page").replace("{page}", t(m.page.labelKey))}
                  </button>
                )}
                {m.handoff && (
                  <div className="mt-2 flex flex-col gap-1.5 max-w-[88%]">
                    <a
                      href={whatsAppInquiryUrl(waTitle, handoffFields(m.handoff.question))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-black text-white text-xs font-bold px-4 py-2 hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#fabf37]"
                    >
                      <MessageCircle className="size-4 text-[#25D366]" aria-hidden="true" />
                      {t("chat_handoff_whatsapp")}
                    </a>
                    <a
                      href={emailInquiryHref(waTitle, handoffFields(m.handoff.question))}
                      className="text-xs font-semibold underline underline-offset-2 text-zinc-700 hover:text-black px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
                    >
                      {t("chat_handoff_email")} ({SALES_EMAIL})
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={submit} className="p-3 bg-white border-t border-zinc-100 shrink-0" noValidate>
            {error && <p role="alert" className="text-xs font-semibold text-red-700 mb-2 px-1">{error}</p>}
            <div className="flex items-center gap-2">
              <label htmlFor="pw-chat-input" className="sr-only">{t("chat_input_label")}</label>
              <input
                id="pw-chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                maxLength={step === "name" ? 60 : step === "phone" ? 20 : 500}
                type={step === "phone" ? "tel" : "text"}
                inputMode={step === "phone" ? "tel" : undefined}
                autoComplete={step === "name" ? "off" : "off"}
                aria-invalid={!!error}
                className="flex-1 min-w-0 bg-zinc-50 border border-zinc-300 rounded-full py-3 px-4 text-base sm:text-sm text-black focus:outline-none focus:border-black focus:ring-2 focus:ring-[#fabf37] placeholder:text-zinc-500"
              />
              <button type="submit" aria-label={t("chat_send")} title={t("chat_send")} className="size-11 shrink-0 rounded-full bg-black text-[#fabf37] flex items-center justify-center hover:bg-[#fabf37] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-black">
                <Send className="size-4" aria-hidden="true" />
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
