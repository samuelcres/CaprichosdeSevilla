import TourismPage from '../TourismPage';
import { translations } from '@/lib/i18n';

export default function TourismPageExample() {
  const t = translations.es;

  return (
    <TourismPage
      apartment="ibarra"
      t={t}
      onBack={() => console.log('Back clicked')}
      onHome={() => console.log('Home clicked')}
    />
  );
}
