import { useApp } from '@/context/AppContext';
import { useLocation } from 'wouter';
import MainMenu, { getMenuIcons } from '@/components/MainMenu';
import { useTranslation } from '@/lib/i18n';
import { useEffect } from 'react';

export default function MenuPage() {
  const { language, apartment, setApartment, setLanguage } = useApp();
  const [, setLocation] = useLocation();
  const t = useTranslation(language);

  useEffect(() => {
    if (!apartment) {
      setLocation('/');
    }
  }, [apartment, setLocation]);

  if (!apartment) return null;

  const icons = getMenuIcons();

  const options = [
    { id: 'transport', icon: icons.transport, title: t.menu.transport },
    { id: 'checkin', icon: icons.checkin, title: t.menu.checkin },
    { id: 'wifi', icon: icons.wifi, title: t.menu.wifi },
    { id: 'tourism', icon: icons.tourism, title: t.menu.tourism },
    { id: 'events', icon: icons.events, title: t.menu.events },
    { id: 'contact', icon: icons.contact, title: t.menu.contact },
  ];

  const apartmentName = apartment === 'ibarra' ? t.apartment.ibarra : t.apartment.quevedo;

  const handleSelect = (id: string) => {
    setLocation(`/${id}`);
  };

  const handleBack = () => {
    setApartment(null);
    setLocation('/');
  };

  const handleLanguageChange = (lang: typeof language) => {
    setLanguage(lang);
  };

  return (
    <MainMenu
      options={options}
      apartmentName={apartmentName}
      onSelect={handleSelect}
      onBack={handleBack}
      currentLanguage={language}
      onLanguageChange={handleLanguageChange}
      t={t}
    />
  );
}
