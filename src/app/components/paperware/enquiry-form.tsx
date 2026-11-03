import React, { useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { openWhatsAppInquiry, whatsAppInquiryUrl, emailInquiryHref, SALES_WHATSAPP_DISPLAY, SALES_EMAIL } from "../../lib/inquiry";

export type EnquiryKind = "franchise" | "investor";

const PREFIX: Record<EnquiryKind, string> = { franchise: "PW-FR", investor: "PW-IN" };
const INTEREST_KEYS = ["capacity", "lines", "renewable", "digital", "market", "other"] as const;

type Values = Record<string, string>;
type Errors = Record<string, string>;

const inputCls =
  "w-full min-h-[44px] px-4 py-3 rounded-2xl border border-zinc-200 bg-white text-sm font-medium text-black placeholder:text-zinc-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fabf37] focus-visible:border-[#fabf37] aria-[invalid=true]:border-red-500";
const labelCls = "block text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-2";

function makeRef(kind: EnquiryKind) {
  return `${PREFIX[kind]}-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

export function EnquiryForm({ kind }: { kind: EnquiryKind }) {
  const { t } = useLanguage();
  const k = (s: string) => `ef_${kind}_${s}`;
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>({});
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<{ ref: string; title: string; fields: Record<string, string> } | null>(null);
  const [failed, setFailed] = useState(false);

  const set = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [name]: e.target.value }));

  const validate = (): Errors => {
    const e: Errors = {};
    const v = (n: string) => (values[n] || "").trim();
    if (!v("name")) e.name = t("ef_err_name");
    const digits = v("phone").replace(/\D/g, "");
    if (!v("phone")) e.phone = t("ef_err_phone_required");
    else if (digits.length < 7 || digits.length > 15 || !/^[+\d\s()-]+$/.test(v("phone"))) e.phone = t("ef_err_phone");
    if (!v("email")) e.email = t("ef_err_email_required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) e.email = t("ef_err_email");
    if (!v("city")) e.city = t("ef_err_city");
    if (kind === "investor" && !v("interest")) e.interest = t("ef_err_interest");
    if (!v("message")) e.message = t("ef_err_message");
    if (!consent) e.consent = t("ef_err_consent");
    return e;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const errs = validate();
    setErrors(errs);
    setFailed(false);
    const first = Object.keys(errs)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const ref = makeRef(kind);
    const title = `${t(k("title"))} (${ref})`;
    const fields: Record<string, string> = {
      Reference: ref,
      Name: values.name,
      Phone: values.phone,
      Email: values.email,
      Organisation: values.company || "",
      City: values.city,
      ...(kind === "investor" ? { "Area of interest": t(`ef_interest_${values.interest}`) } : { "Preferred city": values.preferred || "" }),
      Message: values.message,
      Consent: "Yes, contact me about this enquiry",
    };
    try {
      openWhatsAppInquiry(title, fields);
    } catch {
      setFailed(true);
    }
    setDone({ ref, title, fields });
  };

  const err = (n: string) => (errors[n] ? <p id={`${kind}-${n}-err`} className="mt-2 text-xs font-bold text-red-600">{errors[n]}</p> : null);
  const aria = (n: string) => ({ "aria-invalid": errors[n] ? true : undefined, "aria-describedby": errors[n] ? `${kind}-${n}-err` : undefined } as const);

  if (done) {
    return (
      <div role="status" aria-live="polite" className="rounded-[32px] border border-zinc-100 bg-zinc-50 p-8 md:p-12 space-y-6">
        <h3 className="text-2xl font-black uppercase tracking-tight text-black">{t("ef_done_title")}</h3>
        <p className="text-xs font-black uppercase tracking-widest text-zinc-600">{t("ef_done_ref")}: <span className="text-black">{done.ref}</span></p>
        <p className="text-zinc-600 font-medium leading-relaxed">{t("ef_done_body")}</p>
        {failed && <p className="text-sm font-bold text-red-600">{t("ef_done_failed")}</p>}
        <div className="flex flex-col sm:flex-row gap-3">
          <a href={whatsAppInquiryUrl(done.title, done.fields)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center min-h-[44px] px-8 py-4 rounded-full bg-[#fabf37] text-black font-black text-[10px] uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-colors">
            {t("ef_done_whatsapp")}
          </a>
          <a href={emailInquiryHref(done.title, done.fields)} className="inline-flex items-center justify-center min-h-[44px] px-8 py-4 rounded-full border border-zinc-300 text-black font-black text-[10px] uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-colors">
            {t("ef_done_email")}
          </a>
        </div>
        <p className="text-xs text-zinc-500 font-medium">{t("ef_done_fallback")} {SALES_WHATSAPP_DISPLAY} / {SALES_EMAIL}</p>
        <button type="button" onClick={() => { setDone(null); setValues({}); setConsent(false); setErrors({}); }} className="min-h-[44px] text-[10px] font-black uppercase tracking-widest text-zinc-600 underline underline-offset-4">
          {t("ef_done_another")}
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby={`${kind}-form-title`} className="rounded-[32px] border border-zinc-100 bg-zinc-50 p-8 md:p-12 space-y-6">
      <div className="space-y-3">
        <h3 id={`${kind}-form-title`} className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black">{t(k("title"))}</h3>
        <p className="text-zinc-600 font-medium leading-relaxed">{t(k("intro"))}</p>
        <p className="text-xs font-medium text-zinc-500 leading-relaxed">{t("ef_why_all")} {t(k("why"))}</p>
      </div>

      <div role="status" aria-live="polite" className="empty:hidden rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-bold text-red-700">
        {Object.keys(errors).length > 0 ? t("ef_err_summary") : null}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor={`${kind}-name`} className={labelCls}>{t("ef_name")} *</label>
          <input id={`${kind}-name`} name="name" autoComplete="name" required value={values.name || ""} onChange={set("name")} className={inputCls} {...aria("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor={`${kind}-phone`} className={labelCls}>{t("ef_phone")} *</label>
          <input id={`${kind}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" required value={values.phone || ""} onChange={set("phone")} className={inputCls} {...aria("phone")} />
          {err("phone")}
        </div>
        <div>
          <label htmlFor={`${kind}-email`} className={labelCls}>{t("ef_email")} *</label>
          <input id={`${kind}-email`} name="email" type="email" autoComplete="email" required value={values.email || ""} onChange={set("email")} className={inputCls} {...aria("email")} />
          {err("email")}
        </div>
        <div>
          <label htmlFor={`${kind}-company`} className={labelCls}>{t("ef_company")}</label>
          <input id={`${kind}-company`} name="company" autoComplete="organization" value={values.company || ""} onChange={set("company")} className={inputCls} />
        </div>
        <div>
          <label htmlFor={`${kind}-city`} className={labelCls}>{t("ef_city")} *</label>
          <input id={`${kind}-city`} name="city" autoComplete="address-level2" required value={values.city || ""} onChange={set("city")} className={inputCls} {...aria("city")} />
          {err("city")}
        </div>
        {kind === "franchise" ? (
          <div>
            <label htmlFor="franchise-preferred" className={labelCls}>{t("ef_preferred_city")}</label>
            <input id="franchise-preferred" name="preferred" value={values.preferred || ""} onChange={set("preferred")} className={inputCls} />
          </div>
        ) : (
          <div>
            <label htmlFor="investor-interest" className={labelCls}>{t("ef_interest")} *</label>
            <select id="investor-interest" name="interest" required value={values.interest || ""} onChange={set("interest")} className={inputCls} {...aria("interest")}>
              <option value="">{t("ef_interest_choose")}</option>
              {INTEREST_KEYS.map((i) => <option key={i} value={i}>{t(`ef_interest_${i}`)}</option>)}
            </select>
            {err("interest")}
          </div>
        )}
        <div className="md:col-span-2">
          <label htmlFor={`${kind}-message`} className={labelCls}>{t("ef_message")} *</label>
          <textarea id={`${kind}-message`} name="message" rows={4} required value={values.message || ""} onChange={set("message")} className={inputCls} {...aria("message")} />
          {err("message")}
        </div>
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input id={`${kind}-consent`} name="consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required className="mt-1 size-5 shrink-0 accent-[#fabf37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fabf37]" {...aria("consent")} />
          <label htmlFor={`${kind}-consent`} className="text-sm font-medium text-zinc-700 leading-relaxed min-h-[44px] py-0.5 cursor-pointer">{t(k("consent"))} *</label>
        </div>
        {err("consent")}
      </div>

      <div className="space-y-3">
        <button type="submit" className="w-full sm:w-auto min-h-[44px] px-10 py-5 bg-black text-white rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#fabf37] hover:text-black transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fabf37]">
          {t(k("submit"))}
        </button>
        <p className="text-xs text-zinc-500 font-medium leading-relaxed">{t("ef_delivery_note")}</p>
      </div>
    </form>
  );
}
