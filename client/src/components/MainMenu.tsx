import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bus, Key, Wifi, MapPin, Phone, ArrowLeft, PartyPopper, BookOpen } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import GuideDialog from '@/components/GuideDialog';
import logoUrl from '@assets/logoCS_1759701422984.png';
import transportBg from '@assets/stock_images/seville_transportati_6cb94a1d.jpg';
import checkinBg from '@assets/stock_images/hotel_apartment_key__f8c5ac84.jpg';
import wifiBg from '@assets/stock_images/wifi_internet_connec_dc76a8b4.jpg';
import tourismBg from '@assets/stock_images/seville_cathedral_al_69643ac9.jpg';
import contactBg from '@assets/stock_images/customer_service_con_5e1eb47a.jpg';
import { languages, Language, Apartment } from '@/lib/i18n';
import ibarraImageUrl from '@assets/FotoIbarra_1759702831594.webp';
import quevedoImageUrl from '@assets/FotoQuevedo_1759702831586.webp';
import quevedoCheckinBg from '@assets/Captura de pantalla 2025-10-10 a las 12.57.25_1760093862113.png';
import ibarraCheckinBg from '@assets/Captura de pantalla 2025-10-10 a las 12.56.38_1760094231886.png';
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
  const whatsappNumber = '+34661610794';
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}`;
  const [guideOpen, setGuideOpen] = useState(false);

  const currentLang = languages.find(l => l.code === currentLanguage);
  const apartmentBgUrl = apartment === 'ibarra' ? ibarraImageUrl : quevedoImageUrl;

  const getBackgroundImage = (optionId: string) => {
    // Apartment-specific check-in images with fallback to generic
    const checkinImages: Partial<Record<Apartment, string>> & { default: string } = {
      'ibarra': ibarraCheckinBg,
      'quevedo': quevedoCheckinBg,
      'default': checkinBg,
    };
    
    const backgrounds: Record<string, string> = {
      'transport': transportBg,
      'checkin': checkinImages[apartment] ?? checkinImages.default,
      'wifi': wifiBg,
      'tourism': tourismBg,
      'events': apartmentBgUrl,
      'contact': contactBg,
    };
    return backgrounds[optionId] || apartmentBgUrl;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none"
        style={{ backgroundImage: `url(${apartmentBgUrl})` }}
      />
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <p className="text-9xl font-bold text-foreground transform -rotate-45">
          {apartmentName}
        </p>
      </div>

      <header className="relative z-10 p-4 border-b border-border flex items-center justify-between gap-2 bg-white">
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
          className="h-14 md:h-16 object-contain"
        />
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="default"
            className="gap-2"
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
                className="gap-2"
                data-testid="button-language-selector"
                aria-label={t.common.changeLanguage}
                title={t.common.changeLanguage}
              >
                <span className="text-xl">{currentLang?.flag}</span>
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

      <div className="relative z-10 flex-1 p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {apartmentName}
            </h1>
            <p className="text-muted-foreground">{t.menu.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {options.map((option) => (
              <Card
                key={option.id}
                className="hover-elevate active-elevate-2 cursor-pointer overflow-hidden group !rounded-2xl !border-2 !shadow-xl hover:!shadow-2xl transition-all duration-300 relative h-48"
                onClick={() => onSelect(option.id)}
                data-testid={`card-menu-${option.id}`}
              >
                <div className="flex h-full">
                  <div 
                    className="w-1/2 bg-cover bg-center"
                    style={{ backgroundImage: `url(${getBackgroundImage(option.id)})` }}
                  />
                  <div className="w-1/2 bg-white dark:bg-card flex flex-col items-center justify-center p-6 space-y-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/40 via-primary/30 to-primary/20 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:from-primary/60 group-hover:via-primary/50 group-hover:to-primary/40">
                        <div className="text-primary transition-all duration-300 group-hover:scale-110 drop-shadow-lg">{option.icon}</div>
                      </div>
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <CardTitle className="text-lg font-bold text-foreground text-center">{option.title}</CardTitle>
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
    tourism: <MapPin className="w-12 h-12" />,
    events: <PartyPopper className="w-12 h-12" />,
    contact: <Phone className="w-12 h-12" />,
  };
}
