import { createContext, useContext, useState, ReactNode } from 'react';
import { Language, Apartment } from '@/lib/i18n';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  apartment: Apartment | null;
  setApartment: (apt: Apartment | null) => void;
  isConfiguredApartment: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Check if apartment is pre-configured via URL parameter or environment variable
function getConfiguredApartment(): Apartment | null {
  // Priority 1: Check URL parameter (?apartment=ibarra or ?apartment=quevedo)
  const urlParams = new URLSearchParams(window.location.search);
  const urlApartment = urlParams.get('apartment');
  if (urlApartment === 'ibarra' || urlApartment === 'quevedo') {
    return urlApartment as Apartment;
  }
  
  // Priority 2: Check environment variable
  const configuredApt = import.meta.env.VITE_APARTMENT;
  if (configuredApt === 'ibarra' || configuredApt === 'quevedo') {
    return configuredApt as Apartment;
  }
  
  // Priority 3: No configuration, show apartment selector
  return null;
}

// Check if language is pre-configured via URL parameter or environment variable
function getConfiguredLanguage(): Language {
  const validLanguages: Language[] = ['es', 'en', 'fr', 'de', 'it', 'zh'];
  
  // Priority 1: Check URL parameter (?language=es, ?language=en, etc.)
  const urlParams = new URLSearchParams(window.location.search);
  const urlLanguage = urlParams.get('language');
  if (urlLanguage && validLanguages.includes(urlLanguage as Language)) {
    return urlLanguage as Language;
  }
  
  // Priority 2: Check environment variable
  const configuredLang = import.meta.env.VITE_LANGUAGE;
  if (configuredLang && validLanguages.includes(configuredLang as Language)) {
    return configuredLang as Language;
  }
  
  // Priority 3: Default to Spanish (es) since the app is for Seville apartments
  return 'es';
}

export function AppProvider({ children }: { children: ReactNode }) {
  const configuredApartment = getConfiguredApartment();
  const configuredLanguage = getConfiguredLanguage();
  const [language, setLanguage] = useState<Language>(configuredLanguage);
  const [apartment, setApartment] = useState<Apartment | null>(configuredApartment);

  return (
    <AppContext.Provider value={{ 
      language, 
      setLanguage, 
      apartment, 
      setApartment,
      isConfiguredApartment: configuredApartment !== null
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
