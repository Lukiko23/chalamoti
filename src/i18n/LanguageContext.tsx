'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Lang, translations } from './translations';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr');

  useEffect(() => {
    const saved = localStorage.getItem('chalamoti-lang') as Lang | null;
    if (saved && (saved === 'fr' || saved === 'en' || saved === 'ka')) {
      setLangState(saved);
    }
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('chalamoti-lang', newLang);
  }, []);

  const t = useCallback((key: string): string => {
    return translations[lang][key] || translations['fr'][key] || key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within LanguageProvider');
  }
  return context;
}
