import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bus, Key, Wifi, MapPin, Phone, ArrowLeft, PartyPopper, BookOpen, UtensilsCrossed } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import GuideDialog from '@/components/GuideDialog';
import logoUrl from '@assets/logo-caprichos-2026-horizontal.webp';
import transportBg from '@assets/menu_transport_1774783796390.webp';
import checkinBg from '@assets/menu_checkin_1774783796390.png';
import wifiBg from '@assets/menu_wifi_1774783796390.webp';
import tourismBg from '@assets/menu_tourism_1774783796390.webp';
import eventsBg from '@assets/menu_events_1774783796390.webp';
import contactBg from '@assets/menu_contact_1774783796390.webp';
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
  const whatsappNumber = '+34664602010';
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}`;
  const [guideOpen, setGuideOpen] = useState(false);

  const currentLang = languages.find(l => l.code === currentLanguage);
  const apartmentBgUrl = apartment === 'ibarra' ? ibarraImageUrl : quevedoImageUrl;

  const getBackgroundImage = (optionId: string) => {
    const backgrounds: Record<string, string> = {
      'transport': transportBg,
      'checkin': checkinBg,
      'wifi': wifiBg,
      'tourism': tourismBg,
      'events': eventsBg,
      'contact': contactBg,
    };
    return backgrounds[optionId] || apartmentBgUrl;
  };

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

      <header className="relative z-10 shrink-0 px-2 py-2 sm:p-4 border-b border-border flex items-center justify-between gap-1 sm:gap-2 bg-white">
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
        
        <img
          src={logoUrl}
          alt="Caprichos de Sevilla"
          className="h-10 sm:h-14 md:h-16 min-w-0 shrink object-contain"
        />
        
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <Button
            variant="outline"
            size="default"
            className="gap-2 px-2.5 sm:px-4"
            onClick={() => setGuideOpen(true)}
            data-testid="button-guide"
            aria-label={t.common.guide}
            title={t.common.guide}
          >
            <BookOpen className="h-5 w-5" />
            <span className="hidden sm:inline">{t.common.guide}</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="default"
                className="gap-1 sm:gap-2 px-2.5 sm:px-4"
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
            <p className="text-sm sm:text-base text-muted-foreground">{t.menu.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 grid-rows-3 flex-1 min-h-0 gap-3 sm:grid-rows-none lg:grid-cols-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto w-full">
            {options.map((option) => (
              <Card
                key={option.id}
                className="hover-elevate active-elevate-2 cursor-pointer overflow-hidden group !rounded-2xl !border-2 !shadow-xl hover:!shadow-2xl transition-all duration-300 relative min-h-0 sm:h-48"
                onClick={() => onSelect(option.id)}
                data-testid={`card-menu-${option.id}`}
              >
                <div className="flex flex-col sm:flex-row h-full">
                  <div 
                    className="relative flex-1 min-h-0 sm:flex-none sm:w-1/2 bg-cover bg-center"
                    style={{ backgroundImage: `url(${getBackgroundImage(option.id)})` }}
                  >
                    {/* Icono pequeño sobre la imagen (solo móvil) */}
                    <div className="sm:hidden absolute top-2 left-2 w-12 h-12 rounded-2xl bg-primary text-primary-foreground ring-2 ring-white shadow-lg flex items-center justify-center [&_svg]:w-7 [&_svg]:h-7 [&_svg]:stroke-[2.25]">
                      {option.icon}
                    </div>
                  </div>
                  <div className="shrink-0 sm:w-1/2 bg-white dark:bg-card flex flex-col items-center justify-center px-2 py-1.5 sm:p-6 sm:space-y-3">
                    <div className="relative hidden sm:block">
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/40 via-primary/30 to-primary/20 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:from-primary/60 group-hover:via-primary/50 group-hover:to-primary/40">
                        <div className="text-primary transition-all duration-300 group-hover:scale-110 drop-shadow-lg">{option.icon}</div>
                      </div>
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="text-center space-y-1 w-full min-w-0">
                      <CardTitle className="text-[15px] sm:text-lg font-bold text-foreground leading-tight break-words hyphens-auto">{option.title}</CardTitle>
                      {option.description && (
                        <p className="hidden sm:block text-xs text-muted-foreground">{option.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <GuideDialog 
        open={guideOpen} 
        onOpenChange={setGuideOpen} 
        t={t} 
        currentLanguage={currentLanguage}
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
