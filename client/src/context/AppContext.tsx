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

// Check if apartment is pre-configured via environment variable
function getConfiguredApartment(): Apartment | null {
  const configuredApt = import.meta.env.VITE_APARTMENT;
  if (configuredApt === 'ibarra' || configuredApt === 'quevedo') {
    return configuredApt as Apartment;
  }
  return null;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const configuredApartment = getConfiguredApartment();
  const [language, setLanguage] = useState<Language>('es');
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
