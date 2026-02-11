import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translations, TranslationKey, Tone, toneVariants, getTranslation } from '../lib/translations';

type Language = keyof typeof translations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  tone: Tone;
  setTone: (tone: Tone) => void;
  t: (key: TranslationKey | string) => string;
  isRTL: boolean;
  fontFamily: string;
}

// Provide a robust default value so useContext never returns undefined
const defaultContext: LanguageContextType = {
  language: 'EN',
  setLanguage: () => { },
  tone: 'corporate',
  setTone: () => { },
  t: (key: string) => key,
  isRTL: false,
  fontFamily: "'Poppins', sans-serif"
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('EN');
  const [tone, setTone] = useState<Tone>('corporate');
  const [isRTL, setIsRTL] = useState(false);

  // Memoize the translation function to prevent unnecessary re-renders
  const t = useCallback((key: TranslationKey | string): string => {
    return getTranslation(key, language, tone);
  }, [language, tone]);

  const [fontFamily, setFontFamily] = useState("'Poppins', sans-serif");

  // Auto-detection logic
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('paperware-lang') as Language;
      const savedTone = localStorage.getItem('paperware-tone') as Tone;

      if (savedLang && translations[savedLang]) {
        setLanguage(savedLang);
      } else {
        const browserLang = navigator.language.split('-')[0].toUpperCase();
        if (translations[browserLang]) {
          setLanguage(browserLang as Language);
        }
      }

      if (savedTone) setTone(savedTone);
    } catch (e) {
      console.warn("LocalStorage not accessible", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('paperware-lang', language);
      localStorage.setItem('paperware-tone', tone);
    } catch (e) {
      // Ignore
    }

    const rtlLanguages = ['AR', 'FA', 'UR', 'HE'];
    const currentIsRTL = rtlLanguages.includes(language);
    setIsRTL(currentIsRTL);

    document.documentElement.dir = currentIsRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language.toLowerCase();

    const fontMap: Record<string, string> = {
      BN: "'Noto Sans Bengali', 'Hind Siliguri', serif",
      AR: "'Noto Sans Arabic', sans-serif",
      FA: "'Noto Sans Arabic', sans-serif",
      UR: "'Noto Sans Arabic', sans-serif",
      HI: "'Noto Sans Devanagari', sans-serif",
      ZH: "'Noto Sans SC', sans-serif",
      JA: "'Noto Sans JP', sans-serif",
      KO: "'Noto Sans KR', sans-serif",
      TH: "'Noto Sans Thai', sans-serif",
      RU: "'Noto Sans', sans-serif",
      UK: "'Noto Sans', sans-serif",
      BG: "'Noto Sans', sans-serif",
      MK: "'Noto Sans', sans-serif",
      EL: "'Noto Sans', sans-serif",
      HE: "'Noto Sans Hebrew', sans-serif",
      KA: "'Noto Sans Georgian', sans-serif",
      HY: "'Noto Sans Armenian', sans-serif",
      DEFAULT: "'Poppins', sans-serif"
    };

    const selectedFont = fontMap[language] || fontMap.DEFAULT;
    setFontFamily(selectedFont);
    document.body.style.fontFamily = selectedFont;
  }, [language]);

  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    tone,
    setTone,
    t,
    isRTL,
    fontFamily
  }), [language, tone, t, isRTL, fontFamily]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}