"use client";
import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import translations, { Locale, TranslationStrings } from "./translations";

/* ─────────────────────────────────────────────
   Language metadata for the switcher UI
   ───────────────────────────────────────────── */
export interface LanguageMeta {
  code: Locale;
  name: string;
  nameNative: string;
  tier: 1 | 2;
}

export const LANGUAGES: LanguageMeta[] = [
  { code: "hi", name: "Hindi", nameNative: "हिन्दी", tier: 1 },
  { code: "en", name: "English", nameNative: "English", tier: 1 },
  { code: "bn", name: "Bengali", nameNative: "বাংলা", tier: 1 },
  { code: "te", name: "Telugu", nameNative: "తెలుగు", tier: 1 },
  { code: "mr", name: "Marathi", nameNative: "मराठी", tier: 1 },
  { code: "ta", name: "Tamil", nameNative: "தமிழ்", tier: 1 },
  { code: "gu", name: "Gujarati", nameNative: "ગુજરાતી", tier: 1 },
  { code: "kn", name: "Kannada", nameNative: "ಕನ್ನಡ", tier: 1 },
  { code: "ml", name: "Malayalam", nameNative: "മലയാളം", tier: 1 },
  { code: "pa", name: "Punjabi", nameNative: "ਪੰਜਾਬੀ", tier: 1 },
  { code: "or", name: "Odia", nameNative: "ଓଡ଼ିଆ", tier: 1 },
  { code: "ur", name: "Urdu", nameNative: "اردو", tier: 1 },
  { code: "as", name: "Assamese", nameNative: "অসমীয়া", tier: 1 },
];

/* ─────────────────────────────────────────────
   Context
   ───────────────────────────────────────────── */
interface LanguageContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: TranslationStrings;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "hi",
  setLocale: () => {},
  t: translations["hi"],
});

export function useLanguage() {
  return useContext(LanguageContext);
}

/* ─────────────────────────────────────────────
   Provider – wraps the entire app
   ───────────────────────────────────────────── */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("hi");

  // Persist preference in localStorage
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("saarthi_lang") : null;
    if (stored && stored in translations) {
      setLocaleState(stored as Locale);
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("saarthi_lang", l);
    }
  }, []);

  const t = translations[locale] || translations["hi"];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
