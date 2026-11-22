import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Language, Apartment } from '@/lib/i18n';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  apartment: Apartment | null;
  setApartment: (apt: Apartment | null) => void;
  isConfiguredApartment: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const VALID_LANGUAGES: Language[] = ['es', 'en', 'fr', 'de', 'it', 'zh'];
const STORAGE_APARTMENT = 'cs.apartment';
const STORAGE_LANGUAGE = 'cs.language';

function isApartment(value: unknown): value is Apartment {
  return value === 'ibarra' || value === 'quevedo';
}

function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && VALID_LANGUAGES.includes(value as Language);
}

// localStorage can be unavailable (private mode, blocked storage): never let it break the app
function readStored(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStored(key: string, value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

// Apartment fixed by the link (?apartment=) or by the build (VITE_APARTMENT)
function getConfiguredApartment(): Apartment | null {
  const urlApartment = new URLSearchParams(window.location.search).get('apartment');
  if (isApartment(urlApartment)) return urlApartment;

  const configuredApt = import.meta.env.VITE_APARTMENT;
  if (isApartment(configuredApt)) return configuredApt;

  return null;
}

// Apartment the guest chose earlier on this phone
function getStoredApartment(): Apartment | null {
  const stored = readStored(STORAGE_APARTMENT);
  return isApartment(stored) ? stored : null;
}

// Priority: link (?language=) > build (VITE_LANGUAGE) > guest's earlier choice > phone language > Spanish
function getInitialLanguage(): Language {
  const urlLanguage = new URLSearchParams(window.location.search).get('language');
  if (isLanguage(urlLanguage)) return urlLanguage;

  const configuredLang = import.meta.env.VITE_LANGUAGE;
  if (isLanguage(configuredLang)) return configuredLang;

  const stored = readStored(STORAGE_LANGUAGE);
  if (isLanguage(stored)) return stored;

  const phoneLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of phoneLanguages) {
    const code = tag?.slice(0, 2).toLowerCase();
    if (isLanguage(code)) return code;
  }

  return 'es';
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [configuredApartment] = useState<Apartment | null>(getConfiguredApartment);
  const [language, setLanguageState] = useState<Language>(() => {
    const initial = getInitialLanguage();
    writeStored(STORAGE_LANGUAGE, initial);
    return initial;
  });
  const [apartment, setApartmentState] = useState<Apartment | null>(() => {
    const initial = configuredApartment ?? getStoredApartment();
    if (initial) writeStored(STORAGE_APARTMENT, initial);
    return initial;
  });

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    writeStored(STORAGE_LANGUAGE, lang);
    setLanguageState(lang);
  };

  const setApartment = (apt: Apartment | null) => {
    writeStored(STORAGE_APARTMENT, apt);
    setApartmentState(apt);
  };

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
