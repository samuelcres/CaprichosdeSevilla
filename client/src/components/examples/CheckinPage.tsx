import CheckinPage from '../CheckinPage';
import { translations } from '@/lib/i18n';

export default function CheckinPageExample() {
  const t = translations.es;

  return (
    <CheckinPage
      apartment="ibarra"
      t={t}
      onBack={() => console.log('Back clicked')}
      onHome={() => console.log('Home clicked')}
    />
  );
}
