import { useApp } from '@/context/AppContext';
import { useLocation } from 'wouter';
import ContactPage from '@/components/ContactPage';
import { useTranslation } from '@/lib/i18n';
import { useEffect } from 'react';

export default function ContactPageWrapper() {
  const { language, setLanguage } = useApp();
  const [, setLocation] = useLocation();
  const t = useTranslation(language);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ContactPage
      t={t}
      onBack={() => setLocation('/menu')}
      onHome={() => setLocation('/menu')}
      currentLanguage={language}
      onLanguageChange={setLanguage}
    />
  );
}
