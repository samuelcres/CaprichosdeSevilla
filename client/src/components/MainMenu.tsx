import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bus, Key, Wifi, MapPin, Phone, ArrowLeft, MessageCircle } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import logoUrl from '@assets/logoCS_1759701422984.png';
import transportBgUrl from '@assets/stock_images/airport_bus_public_t_f8c6b930.jpg';
import checkinBgUrl from '@assets/stock_images/hotel_check-in_door__08a6987e.jpg';
import wifiBgUrl from '@assets/stock_images/wifi_wireless_intern_d64534a5.jpg';
import tourismBgUrl from '@assets/stock_images/seville_spain_touris_9ba3bc69.jpg';
import contactBgUrl from '@assets/stock_images/customer_service_sup_53d26c13.jpg';
import sevilleBgUrl from '@assets/stock_images/seville_spain_citysc_d2607192.jpg';
import { languages, Language } from '@/lib/i18n';
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
  apartmentName: string;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  t: any;
}

const backgroundImages: Record<string, string> = {
  transport: transportBgUrl,
  checkin: checkinBgUrl,
  wifi: wifiBgUrl,
  tourism: tourismBgUrl,
  contact: contactBgUrl,
};

export default function MainMenu({ options, onSelect, onBack, apartmentName, currentLanguage, onLanguageChange, t }: MainMenuProps) {
  const whatsappNumber = '+34661610794';
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}`;

  const currentLang = languages.find(l => l.code === currentLanguage);

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-[0.03] pointer-events-none blur-sm"
        style={{ backgroundImage: `url(${sevilleBgUrl})` }}
      />

      <header className="relative z-10 p-4 border-b border-border flex items-center justify-between gap-2">
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
        
        <img
          src={logoUrl}
          alt="Caprichos de Sevilla"
          className="h-14 md:h-16 object-contain"
        />
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                data-testid="button-language-selector"
                aria-label={t.common.changeLanguage}
                title={t.common.changeLanguage}
              >
                <Globe className="w-5 h-5" />
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
            <p className="text-muted-foreground">Selecciona una opción</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {options.map((option) => (
              <Card
                key={option.id}
                className="hover-elevate active-elevate-2 cursor-pointer overflow-hidden relative min-h-40"
                onClick={() => onSelect(option.id)}
                data-testid={`card-menu-${option.id}`}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${backgroundImages[option.id]})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30" />
                
                <CardHeader className="relative z-10 p-6">
                  <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                    <div className="text-white">{option.icon}</div>
                  </div>
                  <CardTitle className="text-lg text-white">{option.title}</CardTitle>
                  {option.description && (
                    <CardDescription className="text-sm text-white/90">
                      {option.description}
                    </CardDescription>
                  )}
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function getMenuIcons() {
  return {
    transport: <Bus className="w-6 h-6" />,
    checkin: <Key className="w-6 h-6" />,
    wifi: <Wifi className="w-6 h-6" />,
    tourism: <MapPin className="w-6 h-6" />,
    contact: <Phone className="w-6 h-6" />,
  };
}
