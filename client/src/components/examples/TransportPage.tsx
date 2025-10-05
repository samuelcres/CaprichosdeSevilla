import TransportPage from '../TransportPage';
import { translations } from '@/lib/i18n';

export default function TransportPageExample() {
  const t = translations.es;

  return (
    <TransportPage
      apartment="ibarra"
      t={t}
      onBack={() => console.log('Back clicked')}
      onHome={() => console.log('Home clicked')}
    />
  );
}
