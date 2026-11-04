/**
 * Rule-based knowledge base for the website Assistant. No network, no LLM:
 * keyword scoring over facts already published on the site (products, cup sizes,
 * locations, contact, FAQ). Returns null when there is no confident match.
 */
import { PAPER_CUP_SIZES } from "../data/paper-cup-sizes";
import { SALES_EMAIL, SALES_PHONE_DISPLAY, SALES_WHATSAPP_DISPLAY } from "./inquiry";

export type KbAnswer = { text: string; page?: { id: string; labelKey: string }; restricted?: boolean };
type T = (key: string) => string;

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const normalize = (s: string) =>
  s.toLowerCase().replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d))).replace(/\s+/g, " ").trim();

const has = (text: string, kw: string) =>
  /^[a-z0-9 ]+$/.test(kw) ? new RegExp(`(^|[^a-z0-9])${kw}`).test(text) : text.includes(kw);

const RESTRICTED = /(password|passcode|secret|api[ -]?key|token|admin|login|credential|internal|database|salary|other (client|customer)s?|customer list|client list|পাসওয়ার্ড|গোপন|অন্য (ক্লায়েন্ট|গ্রাহক))/;

const pages = {
  quote: { id: "quote", labelKey: "chat_page_quote" },
  contact: { id: "contact", labelKey: "chat_page_contact" },
  products: { id: "products", labelKey: "chat_page_products" },
  papercups: { id: "papercups", labelKey: "chat_page_papercups" },
  faq: { id: "faq", labelKey: "chat_page_faq" },
  export: { id: "export", labelKey: "chat_page_export" },
  sustainability: { id: "sustainability", labelKey: "chat_page_sustainability" },
};

const fmt = (s: string, vars: Record<string, string | number>) =>
  Object.entries(vars).reduce((acc, [k, v]) => acc.split(`{${k}}`).join(String(v)), s);

function cupSizeAnswer(text: string, t: T): KbAnswer | null {
  const m = text.match(/(\d{2,3})\s*(ml|oz|মিলি|মিল|ওজ)/);
  if (!m) return null;
  const unit = /ml|মিল/.test(m[2]) ? "ML" : "OZ";
  const size = `${m[1]} ${unit}`;
  const rows = PAPER_CUP_SIZES.filter((c) => c.size === size);
  if (!rows.length) return null;
  const lines = rows.map((c) =>
    fmt(t("chat_a_cup_size_line"), {
      name: c.name,
      variant: c.variant ? ` (${c.variant})` : "",
      use: c.use,
      upper: c.upperMm,
      lower: c.lowerMm,
      height: c.heightMm,
      gsm: c.gsm.join("/"),
      moq: c.moq.toLocaleString("en-US"),
    }),
  );
  return { text: [fmt(t("chat_a_cup_size_head"), { size }), ...lines, t("chat_a_cup_size_note")].join("\n"), page: pages.papercups };
}

type Entry = { kw: string[]; answer: (t: T) => KbAnswer };
const ENTRIES: Entry[] = [
  { kw: ["price", "pricing", "cost", "rate", "quotation", "quote", "দাম", "মূল্য", "কত", "রেট", "কোটেশন"], answer: (t) => ({ text: t("chat_a_price"), page: pages.quote }) },
  { kw: ["moq", "minimum", "ন্যূনতম", "কমপক্ষে"], answer: (t) => ({ text: `${t("chat_a_moq_general")}\n${t("faq_minimum_order_quantities_depend_on")}`, page: pages.faq }) },
  { kw: ["order", "buy", "purchase", "অর্ডার", "কিনতে", "কিনব"], answer: (t) => ({ text: t("chat_a_order"), page: pages.quote }) },
  { kw: ["location", "address", "where", "factory", "office", "visit", "showroom", "display", "ঠিকানা", "কোথায়", "ফ্যাক্টরি", "অফিস", "ডিসপ্লে"], answer: (t) => ({ text: t("chat_a_locations"), page: pages.contact }) },
  { kw: ["contact", "phone", "call", "whatsapp", "email", "mail", "number", "যোগাযোগ", "ফোন", "নম্বর", "ইমেইল", "হোয়াটসঅ্যাপ"], answer: (t) => ({ text: fmt(t("chat_a_contact"), { wa: SALES_WHATSAPP_DISPLAY, phone: SALES_PHONE_DISPLAY, email: SALES_EMAIL }), page: pages.contact }) },
  { kw: ["export", "international", "shipping", "ship", "delivery", "abroad", "overseas", "এক্সপোর্ট", "রপ্তানি", "ডেলিভারি"], answer: (t) => ({ text: t("faq_yes_we_ship_from_chittagong"), page: pages.export }) },
  { kw: ["food", "safe", "eco", "hygiene", "খাদ্য", "নিরাপদ"], answer: (t) => ({ text: t("faq_we_use_food_grade_paper"), page: pages.faq }) },
  { kw: ["sample", "prototype", "নমুনা", "স্যাম্পল"], answer: (t) => ({ text: t("faq_our_studio_team_prepares_digital"), page: pages.faq }) },
  { kw: ["custom", "logo", "print", "design", "লোগো", "প্রিন্ট", "ডিজাইন"], answer: (t) => ({ text: t("chat_a_custom"), page: pages.quote }) },
  { kw: ["quality", "qa", "testing", "কোয়ালিটি", "মান"], answer: (t) => ({ text: t("faq_we_implement_a_5_tier"), page: pages.faq }) },
  { kw: ["recycle", "recycling", "waste", "sustainable", "sustainability", "environment", "পরিবেশ", "রিসাইকেল"], answer: (t) => ({ text: t("faq_paper_offcuts_from_production_are"), page: pages.sustainability }) },
  { kw: ["cup", "cups", "কাপ"], answer: (t) => ({ text: t("chat_a_cups_overview"), page: pages.papercups }) },
  { kw: ["product", "products", "what do you sell", "what do you make", "পণ্য", "প্রোডাক্ট"], answer: (t) => ({ text: t("chat_a_products"), page: pages.products }) },
];

export function answerQuestion(question: string, t: T): KbAnswer | null {
  const text = normalize(question);
  if (RESTRICTED.test(text)) return { text: t("chat_restricted"), restricted: true };
  const size = cupSizeAnswer(text, t);
  if (size) return size;
  let best: Entry | null = null;
  let bestScore = 0;
  for (const e of ENTRIES) {
    const score = e.kw.filter((k) => has(text, k)).length;
    if (score > bestScore) { best = e; bestScore = score; }
  }
  if (best) return best.answer(t);
  const words = text.split(" ");
  if (words.length <= 3 && /^(hi|hello|hey|salam|assalamu|হ্যালো|হাই|সালাম|আসসালামু)/.test(text)) return { text: t("chat_a_greeting") };
  return null;
}
