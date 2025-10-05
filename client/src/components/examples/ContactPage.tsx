import ContactPage from '../ContactPage';
import { translations } from '@/lib/i18n';

export default function ContactPageExample() {
  const t = translations.es;

  return (
    <ContactPage
      t={t}
      onBack={() => console.log('Back clicked')}
      onHome={() => console.log('Home clicked')}
    />
  );
}
