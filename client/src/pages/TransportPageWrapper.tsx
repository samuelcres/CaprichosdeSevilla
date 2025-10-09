import { useApp } from '@/context/AppContext';
import { useLocation } from 'wouter';
import TransportPage from '@/components/TransportPage';
import { useTranslation } from '@/lib/i18n';
import { useEffect } from 'react';

export default function TransportPageWrapper() {
  const { language, apartment, setLanguage } = useApp();
  const [, setLocation] = useLocation();
  const t = useTranslation(language);

  useEffect(() => {
    if (!apartment) {
      setLocation('/');
    }
  }, [apartment, setLocation]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!apartment) return null;

  return (
    <TransportPage
      apartment={apartment}
      t={t}
      onBack={() => setLocation('/menu')}
      onHome={() => setLocation('/menu')}
      currentLanguage={language}
      onLanguageChange={setLanguage}
    />
  );
}
