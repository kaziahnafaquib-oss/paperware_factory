# 🌍 Translation Review Guide

**Date**: February 7, 2026
**Scope**: Batch 2 Localization (1,118 keys across 26 languages)

## 🎯 Purpose
This document lists the newly added translations for native speakers to review. While professional AI translation was used, context-specific nuances in the manufacturing sector may require adjustment.

## ✅ Instructions for Reviewers
1. **Navigate to the language section** below.
2. **Review the translations** for accuracy, tone, and context.
3. **Check for** formatting issues (e.g., missing variables).
4. **Report issues** by referencing the "Key" name.

---

## 🟢 Tier 1 Languages (Priority Review)

### 🇩🇪 German (DE)
| Key | Translation | Context |
|-----|-------------|---------|
| `industry_intelligence` | "Industrielle Intelligenz" | Footer Header |
| `footer_subscribe_title` | "Abonnieren Sie unseren" | Newsletter |
| `footer_subscribe_desc` | "Erhalten Sie direkten Zugang zu Fertigungsinformationen..." | Newsletter |
| `made_in_bangladesh` | "Hergestellt in Bangladesch" | Navbar |
| `industrial_stream_protocol` | "Industrielles Stream-Protokoll" | Hero |

### 🇨🇳 Chinese (ZH)
| Key | Translation | Context |
|-----|-------------|---------|
| `industry_intelligence` | "工业智能" | Footer Header |
| `footer_subscribe_title` | "订阅我们的" | Newsletter |
| `footer_subscribe_desc` | "直接获取制造见解、可持续性报告..." | Newsletter |
| `made_in_bangladesh` | "孟加拉国制造" | Navbar |
| `industrial_stream_protocol` | "工业流协议" | Hero |

### 🇯🇵 Japanese (JA)
| Key | Translation | Context |
|-----|-------------|---------|
| `industry_intelligence` | "産業インテリジェンス" | Footer Header |
| `footer_subscribe_title` | "購読する" | Newsletter |
| `footer_subscribe_desc` | "製造インサイト、持続可能性レポート..." | Newsletter |
| `made_in_bangladesh` | "バングラデシュ製" | Navbar |
| `industrial_stream_protocol` | "産業ストリームプロトコル" | Hero |

### 🇮🇳 Hindi (HI)
| Key | Translation | Context |
|-----|-------------|---------|
| `industry_intelligence` | "औद्योगिक बुद्धिमत्ता" | Footer Header |
| `footer_subscribe_title` | "हमारे लिए सदस्यता लें" | Newsletter |
| `footer_subscribe_desc` | "विनिर्माण अंतर्दृष्टि, स्थिरता रिपोर्ट..." | Newsletter |
| `made_in_bangladesh` | "बांग्लादेश में निर्मित" | Navbar |

### 🇷🇺 Russian (RU)
| Key | Translation | Context |
|-----|-------------|---------|
| `industry_intelligence` | "Промышленная Аналитика" | Footer Header |
| `footer_subscribe_title` | "Подпишитесь на наш" | Newsletter |
| `footer_subscribe_desc` | "Получите прямой доступ к производственной аналитике..." | Newsletter |
| `made_in_bangladesh` | "Сделано в Бангладеш" | Navbar |

### 🇵🇹 Portuguese (PT)
| Key | Translation | Context |
|-----|-------------|---------|
| `industry_intelligence` | "Inteligência Industrial" | Footer Header |
| `footer_subscribe_title` | "Inscreva-se no nosso" | Newsletter |
| `footer_subscribe_desc` | "Obtenha acesso direto a insights de fabricação..." | Newsletter |
| `made_in_bangladesh` | "Feito em Bangladesh" | Navbar |

---

## 🟡 Tier 2 & 3 Languages (Secondary Review)

**Languages**: Italian (IT), Turkish (TR), Korean (KO), Persian (FA), Urdu (UR), Vietnamese (VI), Thai (TH), Indonesian (ID), Dutch (NL), Polish (PL), Swedish (SV), Greek (EL), Malay (MS), Afrikaans (AF), Akan (AK).

**Note:** Some of these languages currently use English fallbacks for certain technical terms. Please review `src/app/lib/translations.ts` for the full list.

### Key Terms to Verify
Please check these specific terms in your language:
1. **"Industrial Intelligence"**: Short, punchy header for the footer.
2. **"Made in Bangladesh"**: Should be "Made in", not "Manufactured in" if possible (for brevity).
3. **"Subscribe"**: Action verb for newsletter.
4. **"Sustainability"**: Should refer to environmental sustainability.

---

## 🐛 Known Validations
- **RTL Languages** (Arabic, Persian, Urdu): Verified text direction is correct.
- **Asian Characters**: Validated rendering for ZH, JA, KO, TH.
- **Length Constraints**: Checked that translations fit within UI components (Navbar, Buttons).

---

**Source File**: [`src/app/lib/translations.ts`](file:///Users/kazi.ahnaf.aquib/Downloads/Paperware%20Factory24:01:2026/src/app/lib/translations.ts)
