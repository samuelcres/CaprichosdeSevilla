import { useApp } from '@/context/AppContext';
import { useLocation } from 'wouter';
import TourismPage from '@/components/TourismPage';
import { useTranslation } from '@/lib/i18n';
import { useEffect } from 'react';

export default function TourismPageWrapper() {
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
    <TourismPage
      apartment={apartment}
      t={t}
      onBack={() => setLocation('/menu')}
      onHome={() => setLocation('/menu')}
      currentLanguage={language}
      onLanguageChange={setLanguage}
    />
  );
}
