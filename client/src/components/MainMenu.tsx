import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bus, Key, Wifi, MapPin, Phone, ArrowLeft, PartyPopper, BookOpen, UtensilsCrossed, Moon, Sun } from 'lucide-react';
import { useNightMode, NIGHT_LABEL } from '@/lib/theme';
import { SiWhatsapp } from 'react-icons/si';
import GuideDialog from '@/components/GuideDialog';
import { WeatherChip } from '@/components/Extras';
import { hostWhatsAppLink } from '@/lib/whatsapp';
import SearchBox from '@/components/SearchBox';

const APARTMENT_ADDRESS: Record<Apartment, string> = {
  ibarra: 'Calle Conde de Ibarra, 11-13, 41004 Sevilla',
  quevedo: 'Calle Quevedo, 11, 41003 Sevilla',
};
const MAP_LABEL: Record<Language, string> = { es: 'Mapa', en: 'Map', fr: 'Carte', de: 'Karte', it: 'Mappa', zh: '地图' };
import BrandLogo from '@/components/BrandLogo';
import transportPhoto from '@assets/menu/transporte.webp';
import checkinIbarraPhoto from '@assets/menu/checkin-ibarra.webp';
import checkinQuevedoPhoto from '@assets/menu/checkin-quevedo.webp';
import wifiIbarraPhoto from '@assets/menu/wifi-ibarra.webp';
import wifiQuevedoPhoto from '@assets/menu/wifi-quevedo.webp';
import foodPhoto from '@assets/menu/comer.webp';
import eventsPhoto from '@assets/menu/eventos.webp';
import contactPhoto from '@assets/menu/contacto.webp';
import { languages, Language, Apartment } from '@/lib/i18n';
import ibarraImageUrl from '@assets/FotoIbarra_1759702831594.webp';
import quevedoImageUrl from '@assets/FotoQuevedo_1759702831586.webp';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

// Fotos del menú (estilo «Editorial»): a sangre, con el título encima.
function getMenuPhoto(id: string, apartment: Apartment): string | undefined {
  const photos: Record<string, string> = {
    transport: transportPhoto,
    checkin: apartment === 'ibarra' ? checkinIbarraPhoto : checkinQuevedoPhoto,
    wifi: apartment === 'ibarra' ? wifiIbarraPhoto : wifiQuevedoPhoto,
    tourism: foodPhoto,
    events: eventsPhoto,
    contact: contactPhoto,
  };
  return photos[id];
}
const MENU_PHOTO_POSITION: Record<string, string> = { transport: '55% center', checkin: 'center 35%', events: 'center 40%' };

interface MenuOption {
  id: string;
  icon: React.ReactNode;
  title: string;
  description?: string;
}

interface MainMenuProps {
  options: MenuOption[];
  onSelect: (id: string) => void;
  onBack: () => void;
  apartment: Apartment;
  apartmentName: string;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  t: any;
  showBackButton?: boolean;
}

export default function MainMenu({ options, onSelect, onBack, apartment, apartmentName, currentLanguage, onLanguageChange, t, showBackButton = true }: MainMenuProps) {
  const whatsappLink = hostWhatsAppLink(apartment, currentLanguage);
  const [guideOpen, setGuideOpen] = useState(false);

  const currentLang = languages.find(l => l.code === currentLanguage);
  const apartmentBgUrl = apartment === 'ibarra' ? ibarraImageUrl : quevedoImageUrl;


  return (
    <div className="h-[100dvh] overflow-hidden sm:h-auto sm:min-h-screen sm:overflow-visible bg-background flex flex-col relative">
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none"
        style={{ backgroundImage: `url(${apartmentBgUrl})` }}
      />
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <p className="text-9xl font-bold text-foreground transform -rotate-45">
          {apartmentName}
        </p>
      </div>

      <header className="relative z-10 shrink-0 px-1.5 py-2 sm:p-4 border-b border-border flex items-center justify-between gap-1 sm:gap-2 bg-white dark:bg-card">
        {showBackButton ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            data-testid="button-back"
            aria-label={t.common.back}
            title={t.common.back}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        ) : (
          <div className="w-10" />
        )}
        
        <BrandLogo variant="horizontal" className="h-12 sm:h-16 md:h-24 lg:h-28 w-auto min-w-0 shrink object-contain" />
        
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <Button
            variant="outline"
            size="default"
            className="gap-2 px-2 sm:px-4"
            onClick={() => setGuideOpen(true)}
            data-testid="button-guide"
            aria-label={t.common.guide}
            title={t.common.guide}
          >
            <BookOpen className="h-5 w-5" />
            <span className="hidden sm:inline">{t.common.guide}</span>
          </Button>

          <NightToggle lang={currentLanguage} />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="default"
                className="gap-1 sm:gap-2 px-2 sm:px-4"
                data-testid="button-language-selector"
                aria-label={t.common.changeLanguage}
                title={t.common.changeLanguage}
              >
                <span className="text-xl">{currentLang?.flag}</span>
                <span className="sm:hidden text-xs font-semibold uppercase">{currentLang?.code}</span>
                <span className="hidden sm:inline">{currentLang?.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className="cursor-pointer"
                  data-testid={`menuitem-language-${lang.code}`}
                >
                  <span className="mr-2">{lang.flag}</span>
                  <span>{lang.name}</span>
                  {lang.code === currentLanguage && <span className="ml-2">✓</span>}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            asChild
          >
            <a 
              href={whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={t.common.contactWhatsApp}
              title={t.common.contactWhatsApp}
              data-testid="button-whatsapp"
            >
              <SiWhatsapp className="w-5 h-5 text-green-600" />
            </a>
          </Button>
        </div>
      </header>

      <div className="relative z-10 flex-1 min-h-0 flex flex-col p-3 sm:p-4 md:p-6">
        <div className="max-w-4xl w-full mx-auto flex-1 min-h-0 flex flex-col gap-3 sm:block sm:space-y-6">
          <div className="text-center sm:space-y-2 shrink-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-tight">
              {apartmentName}
            </h1>
            <div className="pt-1 flex flex-wrap items-center justify-center gap-1.5">
              <WeatherChip apartment={apartment} lang={currentLanguage} />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(APARTMENT_ADDRESS[apartment])}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-white/90 border border-border shadow-sm px-3 py-1 text-xs sm:text-sm font-semibold text-primary"
                data-testid="button-apartment-map"
              >
                <MapPin className="w-3.5 h-3.5" />
                {MAP_LABEL[currentLanguage] || MAP_LABEL.en}
              </a>
            </div>
            <div className="pt-2 px-1">
              <SearchBox apartment={apartment} lang={currentLanguage} />
            </div>
          </div>

          <div className="grid grid-cols-2 grid-rows-3 flex-1 min-h-0 gap-3 sm:grid-rows-none lg:grid-cols-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto w-full">
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                className="group relative min-h-0 sm:h-56 overflow-hidden rounded-2xl text-left shadow-lg hover:shadow-2xl transition-shadow duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 bg-muted"
                onClick={() => onSelect(option.id)}
                data-testid={`card-menu-${option.id}`}
              >
                <img
                  src={getMenuPhoto(option.id, apartment) || apartmentBgUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: MENU_PHOTO_POSITION[option.id] || 'center' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/80" />
                <span className="absolute top-2.5 left-2.5 w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/95 text-primary shadow-md flex items-center justify-center [&_svg]:w-5 [&_svg]:h-5 sm:[&_svg]:w-6 sm:[&_svg]:h-6 [&_svg]:stroke-[2.25]">
                  {option.icon}
                </span>
                <span className="absolute left-3 right-3 bottom-2.5 sm:left-4 sm:bottom-4 text-white">
                  <span className="block font-bold text-[15px] sm:text-xl leading-tight drop-shadow break-words hyphens-auto">{option.title}</span>
                  {option.description && (
                    <span className="block text-[11px] sm:text-sm leading-snug opacity-90 mt-0.5 line-clamp-1 sm:line-clamp-2">{option.description}</span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <GuideDialog
        open={guideOpen}
        onOpenChange={setGuideOpen}
        t={t}
        currentLanguage={currentLanguage}
        apartment={apartment}
        onNavigate={(id) => onSelect(id)}
      />
    </div>
  );
}

export function getMenuIcons() {
  return {
    transport: <Bus className="w-12 h-12" />,
    checkin: <Key className="w-12 h-12" />,
    wifi: <Wifi className="w-12 h-12" />,
    tourism: <UtensilsCrossed className="w-12 h-12" />,
    events: <PartyPopper className="w-12 h-12" />,
    contact: <Phone className="w-12 h-12" />,
  };
}


function NightToggle({ lang }: { lang: string }) {
  const { night, toggle } = useNightMode();
  const L = NIGHT_LABEL[lang] || NIGHT_LABEL.en;
  const label = night ? L.day : L.night;
  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9 shrink-0"
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-pressed={night}
      data-testid="button-night-mode"
    >
      {night ? <Sun className="h-[18px] w-[18px] text-amber-400" /> : <Moon className="h-[18px] w-[18px]" />}
    </Button>
  );
}
