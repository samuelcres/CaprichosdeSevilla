import { useApp } from '@/context/AppContext';
import { useLocation } from 'wouter';
import ApartmentSelector from '@/components/ApartmentSelector';
import { useTranslation, Apartment } from '@/lib/i18n';

export default function ApartmentPage() {
  const { language, setApartment, setLanguage } = useApp();
  const [, setLocation] = useLocation();
  const t = useTranslation(language);

  const handleApartmentSelect = (apt: Apartment) => {
    setApartment(apt);
    setLocation('/menu');
  };

  const handleLanguageChange = (lang: typeof language) => {
    setLanguage(lang);
  };

  return (
    <ApartmentSelector
      title={t.apartment.title}
      ibarraName={t.apartment.ibarra}
      quevedoName={t.apartment.quevedo}
      onSelect={handleApartmentSelect}
      currentLanguage={language}
      onLanguageChange={handleLanguageChange}
      t={t}
    />
  );
}
