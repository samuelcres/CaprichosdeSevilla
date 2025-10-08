import { Apartment, languages, Language } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Globe } from 'lucide-react';
import logoUrl from '@assets/logoCS_1759701422984.png';
import ibarraPhotoUrl from '@assets/FotoIbarra_1759702831594.webp';
import quevedoPhotoUrl from '@assets/FotoQuevedo_1759702831586.webp';
import sevilleBgUrl from '@assets/istockphoto-576913134-1024x1024_1759914381883.jpg';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ApartmentSelectorProps {
  onSelect: (apartment: Apartment) => void;
  title: string;
  ibarraName: string;
  quevedoName: string;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  t: any;
}

export default function ApartmentSelector({
  onSelect,
  title,
  ibarraName,
  quevedoName,
  currentLanguage,
  onLanguageChange,
  t,
}: ApartmentSelectorProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <div 
        className="fixed inset-0 bg-contain bg-center bg-no-repeat opacity-20 pointer-events-none blur-sm"
        style={{ backgroundImage: `url(${sevilleBgUrl})` }}
      />

      <header className="relative z-10 p-4 border-b border-border flex items-center justify-end">
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
      </header>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center space-y-6">
            <img
              src={logoUrl}
              alt="Caprichos de Sevilla"
              className="h-20 md:h-24 mx-auto object-contain"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {title}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              className="hover-elevate active-elevate-2 cursor-pointer overflow-hidden"
              onClick={() => onSelect('ibarra')}
              data-testid="card-apartment-ibarra"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={ibarraPhotoUrl}
                  alt={ibarraName}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="text-center p-6">
                <CardTitle className="text-xl">{ibarraName}</CardTitle>
                <CardDescription className="text-sm">
                  Calle Conde de Ibarra, 11-13
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="hover-elevate active-elevate-2 cursor-pointer overflow-hidden"
              onClick={() => onSelect('quevedo')}
              data-testid="card-apartment-quevedo"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={quevedoPhotoUrl}
                  alt={quevedoName}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="text-center p-6">
                <CardTitle className="text-xl">{quevedoName}</CardTitle>
                <CardDescription className="text-sm">
                  Calle Quevedo, 11
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
