import { useApp } from '@/context/AppContext';
import { useLocation } from 'wouter';
import LanguageSelector from '@/components/LanguageSelector';
import { useTranslation } from '@/lib/i18n';
import BrandLogo from '@/components/BrandLogo';

export default function WelcomePage() {
  const { language, setLanguage } = useApp();
  const [, setLocation] = useLocation();
  const t = useTranslation(language);

  const handleLanguageSelect = (lang: typeof language) => {
    setLanguage(lang);
    setLocation('/apartment');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-4">
          <BrandLogo variant="full" className="h-20 md:h-24 mx-auto object-contain mb-6" />
        </div>
        <LanguageSelector
          title={t.welcome.title}
          subtitle={t.welcome.subtitle}
          onSelect={handleLanguageSelect}
        />
      </div>
    </div>
  );
}
