import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bus, Key, Wifi, MapPin, Phone, ArrowLeft } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import logoUrl from '@assets/logoCS_1759701422984.png';
import sevilleBgUrl from '@assets/istockphoto-576913134-1024x1024_1759914381883.jpg';
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

export default function MainMenu({ options, onSelect, onBack, apartmentName, currentLanguage, onLanguageChange, t }: MainMenuProps) {
  const whatsappNumber = '+34661610794';
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}`;

  const currentLang = languages.find(l => l.code === currentLanguage);

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <div 
        className="fixed inset-0 bg-contain bg-left bg-no-repeat opacity-30 pointer-events-none"
        style={{ backgroundImage: `url(${sevilleBgUrl})` }}
      />

      <header className="relative z-10 p-4 border-b border-border flex items-center justify-between gap-2 bg-white">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {options.map((option) => (
              <Card
                key={option.id}
                className="hover-elevate active-elevate-2 cursor-pointer overflow-visible min-h-48"
                onClick={() => onSelect(option.id)}
                data-testid={`card-menu-${option.id}`}
              >
                <CardHeader className="p-8">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <div className="text-primary">{option.icon}</div>
                  </div>
                  <CardTitle className="text-xl font-semibold">{option.title}</CardTitle>
                  {option.description && (
                    <CardDescription className="text-sm mt-1">
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
    transport: <Bus className="w-9 h-9" />,
    checkin: <Key className="w-9 h-9" />,
    wifi: <Wifi className="w-9 h-9" />,
    tourism: <MapPin className="w-9 h-9" />,
    contact: <Phone className="w-9 h-9" />,
  };
}
