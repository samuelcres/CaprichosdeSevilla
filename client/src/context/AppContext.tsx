import { createContext, useContext, useState, ReactNode } from 'react';
import { Language, Apartment } from '@/lib/i18n';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  apartment: Apartment | null;
  setApartment: (apt: Apartment | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');
  const [apartment, setApartment] = useState<Apartment | null>(null);

  return (
    <AppContext.Provider value={{ language, setLanguage, apartment, setApartment }}>
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
