# Localization Testing Guide - Batch 2
**Quick Reference for Visual Verification**

---

## 🎯 Testing Objectives

Verify that all Footer, Top Bar, Search Overlay, and Hero components display correctly in:
- ✅ English (EN)
- ✅ Bengali (BN)
- ✅ Arabic (AR)

---

## 📍 Test Locations

### Your Dev Server
**URL**: `http://localhost:5173`  
**Status**: ✅ Running (4h 45m)

---

## 🧪 Test Scenarios

### Test 1: Top Bar Verification (All Pages)

**Location**: Top yellow bar at the very top of the page

#### English (EN)
- [ ] "Factory Automation: Active"
- [ ] "Made In Bangladesh" with 🇧🇩 flag
- [ ] "CORE_v4.2.0"
- [ ] "LIVE" with red pulsing dot

#### Bengali (BN)
- [ ] "ফ্যাক্টরি অটোমেশন: সক্রিয়"
- [ ] "বাংলাদেশে তৈরি" with 🇧🇩 flag
- [ ] "কোর_v৪.২.০"
- [ ] "লাইভ" with red pulsing dot

#### Arabic (AR)
- [ ] "أتمتة المصنع: نشط"
- [ ] "صنع في بنغلاديش" with 🇧🇩 flag
- [ ] "النظام_v4.2.0"
- [ ] "مباشر" with red pulsing dot

---

### Test 2: Footer Newsletter Section

**Location**: Scroll to bottom → Black box with yellow accents

#### English (EN)
- [ ] Label: "INDUSTRIAL INTELLIGENCE"
- [ ] Title: "Subscribe to our **GLOBAL UPDATE STREAM**"
- [ ] Description: "Get direct access to manufacturing insights..."
- [ ] Placeholder: "Enter your corporate email..."
- [ ] Button: "Join"

#### Bengali (BN)
- [ ] Label: "ইন্ডাস্ট্রিয়াল ইন্টেলিজেন্স"
- [ ] Title: "সাবস্ক্রাইব করুন আমাদের **গ্লোবাল আপডেট স্ট্রীম**"
- [ ] Description: "ম্যানুফ্যাকচারিং ইনসাইট, সাসটেইনেবিলিটি রিপোর্ট..."
- [ ] Placeholder: "আপনার কর্পোরেট ইমেইল লিখুন..."
- [ ] Button: "যুক্ত হন"

#### Arabic (AR)
- [ ] Label: "الذكاء الصناعي"
- [ ] Title: "اشترك في **تدفق التحديثات العالمية**"
- [ ] Description: "احصل على وصول مباشر إلى رؤى التصنيع..."
- [ ] Placeholder: "أدخل بريدك الإلكتروني للشركة..."
- [ ] Button: "انضم"

---

### Test 3: Footer Quick Links

**Location**: Footer → Left column

#### English (EN)
- [ ] Header: "Quick Links"
- [ ] Links: Home, About Us, Papercups, Sustainability, Our ERP, Contact, Privacy Policy

#### Bengali (BN)
- [ ] Header: "কুইক লিঙ্ক"
- [ ] Links: হোম, আমাদের সম্পর্কে, পেপারকাপ, স্থায়িত্ব, আমাদের ইআরপি, যোগাযোগ, গোপনীয়তা নীতি

#### Arabic (AR)
- [ ] Header: "روابط سريعة"
- [ ] Links: الصفحة الرئيسية, من نحن, أكواب ورقية, الاستدامة, نظامنا المحاسبي, اتصل بنا, سياسة الخصوصية

---

### Test 4: Footer Our Products

**Location**: Footer → Middle column

#### English (EN)
- [ ] Header: "Our Products"
- [ ] Links: Paper Cup, Carry Bag, Box, Hangtag, Brochure, Envelope

#### Bengali (BN)
- [ ] Header: "আমাদের পণ্য"
- [ ] Links: কাগজের কাপ, ক্যারি ব্যাগ, বক্স, হ্যাংট্যাগ, ব্রোশার, খাম

#### Arabic (AR)
- [ ] Header: "منتجاتنا"
- [ ] Links: كوب ورقي, حقيبة حمل, صندوق, بطاقة تعليق, كتيب, ظرف

---

### Test 5: Footer Get In Touch

**Location**: Footer → Right column

#### English (EN)
- [ ] Header: "Get In Touch"

#### Bengali (BN)
- [ ] Header: "যোগাযোগ"

#### Arabic (AR)
- [ ] Header: "ابق على تواصل"

---

### Test 6: Footer Bottom

**Location**: Very bottom of footer

#### English (EN)
- [ ] "Made in Bangladesh" with animated flag

#### Bengali (BN)
- [ ] "বাংলাদেশে তৈরি" with animated flag

#### Arabic (AR)
- [ ] "صنع في بنغلاديش" with animated flag

---

### Test 7: Search Overlay

**Location**: Click search icon in navbar

#### English (EN)
- [ ] Placeholder: "SEARCH PRODUCTS"

#### Bengali (BN)
- [ ] Placeholder: "পণ্য অনুসন্ধান করুন"

#### Arabic (AR)
- [ ] Placeholder: "البحث عن المنتجات"

---

### Test 8: Hero Section (Homepage)

**Location**: Homepage hero section → Bottom left labels

#### English (EN)
- [ ] "SUSTAINABILITY" → "100% ECO-FRIENDLY"
- [ ] "EXPORT" → "READY WORLDWIDE"
- [ ] "ORIGIN" → "MADE IN BANGLADESH 🇧🇩"

#### Bengali (BN)
- [ ] "স্থায়িত্ব" → "১০০% পরিবেশ বান্ধব"
- [ ] "রপ্তানি" → "বিশ্বজুড়ে প্রস্তুত"
- [ ] "উৎস" → "বাংলাদেশে তৈরি 🇧🇩"

#### Arabic (AR)
- [ ] "الاستدامة" → "100% صديق للبيئة"
- [ ] "تصدير" → "جاهز عالمياً"
- [ ] "الأصل" → "صنع في بنغلاديش 🇧🇩"

---

### Test 9: Audio Toggle (Homepage Hero)

**Location**: Bottom right of hero section

#### English (EN)
- [ ] Muted: "Audio Muted"
- [ ] Active: "Audio Active"

#### Bengali (BN)
- [ ] Muted: "অডিও মিউট"
- [ ] Active: "অডিও সক্রিয়"

#### Arabic (AR)
- [ ] Muted: "كتم الصوت"
- [ ] Active: "الصوت نشط"

---

## 🔄 Language Switching Test

**Steps**:
1. Load homepage in English
2. Open language selector (globe icon in navbar)
3. Switch to Bengali → Verify all elements update
4. Switch to Arabic → Verify all elements update + RTL layout
5. Switch back to English → Verify everything returns to English

**Expected Behavior**:
- ✅ All text updates instantly
- ✅ No page reload required
- ✅ Layout adjusts for RTL (Arabic)
- ✅ No broken translations or missing keys

---

## 🌐 RTL (Right-to-Left) Verification for Arabic

**Elements to Check**:
- [ ] Footer sections align to the right
- [ ] Text flows right to left
- [ ] Icons and bullets position correctly
- [ ] Navigation links align properly
- [ ] Newsletter form layout is mirrored

---

## 🐛 Common Issues to Look For

### Missing Translations
- ❌ English text appearing in BN/AR mode
- ❌ Translation keys showing instead of text (e.g., `{t('footer_desc')}`)

### Layout Issues
- ❌ Text overflow or truncation
- ❌ Broken alignment in RTL mode
- ❌ Overlapping elements

### Functionality Issues
- ❌ Links not working after language switch
- ❌ Search overlay not opening
- ❌ Language selector not responding

---

## 📸 Screenshot Checklist

**Recommended Screenshots**:
1. ✅ Homepage - English - Full page
2. ✅ Homepage - Bengali - Footer section
3. ✅ Homepage - Arabic - Footer section + RTL layout
4. ✅ Search Overlay - All three languages
5. ✅ Company Page - Footer in all languages
6. ✅ Solutions Page - Footer in all languages

---

## ✅ Success Criteria

**Test Passes If**:
- All 43 translation keys display correctly in all 3 languages
- No English text remains in BN/AR modes (except technical identifiers)
- RTL layout works properly for Arabic
- All links and buttons function correctly in all languages
- Language switching is smooth and instant

**Test Fails If**:
- Any translation keys are missing or showing as code
- English text appears in non-English modes
- RTL layout is broken for Arabic
- Links or functionality breaks after language switch

---

## 🚀 Quick Test Commands

### Check for TypeScript Errors
```bash
npm run build
```

### Check for Console Errors
Open browser DevTools → Console tab → Look for errors

### Verify Translation Keys
Search in browser DevTools Console:
```javascript
// Check if translation exists
console.log(t('footer_subscribe_title'));
```

---

## 📝 Reporting Issues

**If you find issues, note**:
1. **Language**: EN / BN / AR
2. **Component**: Footer / Top Bar / Search / Hero
3. **Issue Type**: Missing translation / Layout / Functionality
4. **Screenshot**: Attach if possible
5. **Expected vs Actual**: What should appear vs what appears

---

## 🎉 Testing Complete!

Once all checkboxes are marked:
- ✅ Create summary of findings
- ✅ Report any issues found
- ✅ Confirm localization is production-ready

---

**Last Updated**: February 7, 2026  
**Tester**: [Your Name]  
**Status**: Ready for Testing
