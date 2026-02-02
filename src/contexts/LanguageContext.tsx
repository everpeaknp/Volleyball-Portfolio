'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'NE' | 'EN' | 'DE';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('NE');

  useEffect(() => {
    // Load saved language or detect browser language
    const saved = localStorage.getItem('app-language') as Language;
    if (saved) {
      setLanguage(saved);
    } else {
      // Default to German if browser is German, else Nepali
      const browserLang = navigator.language;
      if (browserLang.startsWith('de')) setLanguage('DE');
      else if (browserLang.startsWith('en')) setLanguage('EN');
      else setLanguage('NE');
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('app-language', lang);
  };

  // Simple translation helper placeholder
  // Real translations will be handled by data objects
  const t = (key: string) => key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
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
