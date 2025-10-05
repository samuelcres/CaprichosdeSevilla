import WifiPage from '../WifiPage';
import { translations } from '@/lib/i18n';
import { Toaster } from '@/components/ui/toaster';

export default function WifiPageExample() {
  const t = translations.es;

  return (
    <>
      <WifiPage
        apartment="ibarra"
        t={t}
        onBack={() => console.log('Back clicked')}
        onHome={() => console.log('Home clicked')}
      />
      <Toaster />
    </>
  );
}
