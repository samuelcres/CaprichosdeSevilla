import { useApp } from '@/context/AppContext';
import { useLocation } from 'wouter';
import CheckinPage from '@/components/CheckinPage';
import { useTranslation } from '@/lib/i18n';
import { useEffect } from 'react';

export default function CheckinPageWrapper() {
  const { language, apartment } = useApp();
  const [, setLocation] = useLocation();
  const t = useTranslation(language);

  useEffect(() => {
    if (!apartment) {
      setLocation('/');
    }
  }, [apartment, setLocation]);

  if (!apartment) return null;

  return (
    <CheckinPage
      apartment={apartment}
      t={t}
      onBack={() => setLocation('/menu')}
      onHome={() => setLocation('/menu')}
    />
  );
}
