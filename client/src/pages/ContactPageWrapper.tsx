import { useApp } from '@/context/AppContext';
import { useLocation } from 'wouter';
import ContactPage from '@/components/ContactPage';
import { useTranslation } from '@/lib/i18n';

export default function ContactPageWrapper() {
  const { language } = useApp();
  const [, setLocation] = useLocation();
  const t = useTranslation(language);

  return (
    <ContactPage
      t={t}
      onBack={() => setLocation('/menu')}
      onHome={() => setLocation('/menu')}
    />
  );
}
