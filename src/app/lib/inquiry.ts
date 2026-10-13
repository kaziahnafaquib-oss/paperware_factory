/**
 * Interim inquiry delivery (Phase A0).
 *
 * The site has no working form backend yet, so forms must never pretend a
 * message was "sent". Instead they hand the visitor's message to a channel that
 * really reaches the sales team: WhatsApp (prefilled) or email (prefilled).
 * Replace with a real backend submission in Phase A (see audit TR-05).
 */

export const SALES_WHATSAPP_NUMBER = "8801901459110";
export const SALES_WHATSAPP_DISPLAY = "+880 1901-459110";
export const SALES_PHONE_TEL = "+8809638011101";
export const SALES_PHONE_DISPLAY = "+880 9638-011101";
export const SALES_EMAIL = "paperwarefactory@gmail.com";

export type InquiryFields = Record<string, string | number | boolean | null | undefined>;

/** Plain-text message: a title line followed by "Label: value" lines (empty values skipped). */
export function buildInquiryMessage(title: string, fields: InquiryFields = {}): string {
  const lines = Object.entries(fields)
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== "")
    .map(([label, value]) => `${label}: ${typeof value === "boolean" ? (value ? "Yes" : "No") : String(value).trim()}`);
  return [`Paperware Factory website: ${title}`, ...lines].join("\n");
}

export function whatsAppInquiryUrl(title: string, fields: InquiryFields = {}): string {
  return `https://wa.me/${SALES_WHATSAPP_NUMBER}?text=${encodeURIComponent(buildInquiryMessage(title, fields))}`;
}

export function emailInquiryHref(title: string, fields: InquiryFields = {}): string {
  const subject = encodeURIComponent(`Website inquiry: ${title}`);
  const body = encodeURIComponent(buildInquiryMessage(title, fields));
  return `mailto:${SALES_EMAIL}?subject=${subject}&body=${body}`;
}

/** Opens WhatsApp in a new tab with the message prefilled. The visitor still presses Send there. */
export function openWhatsAppInquiry(title: string, fields: InquiryFields = {}): void {
  window.open(whatsAppInquiryUrl(title, fields), "_blank", "noopener,noreferrer");
}

function fieldLabel(el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): string {
  const aria = el.getAttribute("aria-label");
  if (aria) return aria.trim();
  if (el.id) {
    const forLabel = el.ownerDocument.querySelector(`label[for="${CSS.escape(el.id)}"]`);
    if (forLabel?.textContent?.trim()) return forLabel.textContent.trim();
  }
  // Nearest label inside the closest few wrappers (most forms here use <div><label/><input/></div>).
  let node: HTMLElement | null = el.parentElement;
  for (let depth = 0; node && depth < 4; depth++, node = node.parentElement) {
    const label = node.querySelector("label");
    if (label?.textContent?.trim()) return label.textContent.trim();
  }
  const placeholder = "placeholder" in el ? el.placeholder : "";
  return (placeholder || el.name || "Field").trim();
}

/**
 * Reads every filled control of a form into "label → value" pairs, so forms whose inputs
 * have no `name` attributes can still be handed off. File inputs are skipped (attachments
 * cannot travel through a WhatsApp/mail link; the hand-off text asks visitors to send them).
 */
export function collectFormFields(form: HTMLElement): InquiryFields {
  const fields: InquiryFields = {};
  const controls = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea");
  controls.forEach((el) => {
    if (el.disabled) return;
    if (el instanceof HTMLInputElement) {
      if (["file", "submit", "button", "reset", "hidden", "password"].includes(el.type)) return;
      if ((el.type === "checkbox" || el.type === "radio") && !el.checked) return;
    }
    const value = el instanceof HTMLInputElement && (el.type === "checkbox" || el.type === "radio") ? (el.value && el.value !== "on" ? el.value : "Yes") : el.value;
    if (!String(value).trim()) return;
    let key = fieldLabel(el).replace(/\s*\*\s*$/, "");
    let n = 2;
    while (key in fields) key = `${fieldLabel(el)} (${n++})`;
    fields[key] = value;
  });
  return fields;
}

/** Honest status text shown after the hand-off (never claims delivery). */
export const INQUIRY_HANDOFF_TITLE = "Almost there: press Send in WhatsApp";
export const INQUIRY_HANDOFF_BODY =
  `We opened WhatsApp with your message filled in. Press Send there so it reaches our sales team. ` +
  `If WhatsApp didn't open, message us on ${SALES_WHATSAPP_DISPLAY}, call ${SALES_PHONE_DISPLAY} or email ${SALES_EMAIL}.`;
