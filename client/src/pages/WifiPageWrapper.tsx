import { useApp } from '@/context/AppContext';
import { useLocation } from 'wouter';
import WifiPage from '@/components/WifiPage';
import { useTranslation } from '@/lib/i18n';
import { useEffect } from 'react';

export default function WifiPageWrapper() {
  const { language, apartment, setLanguage } = useApp();
  const [, setLocation] = useLocation();
  const t = useTranslation(language);

  useEffect(() => {
    if (!apartment) {
      setLocation('/');
    }
  }, [apartment, setLocation]);

  if (!apartment) return null;

  return (
    <WifiPage
      apartment={apartment}
      t={t}
      onBack={() => setLocation('/menu')}
      onHome={() => setLocation('/menu')}
      currentLanguage={language}
      onLanguageChange={setLanguage}
    />
  );
}
