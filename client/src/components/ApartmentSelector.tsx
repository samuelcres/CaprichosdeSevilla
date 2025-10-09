import { Apartment, languages, Language } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Globe } from 'lucide-react';
import logoUrl from '@assets/logoCS_1759701422984.png';
import ibarraPhotoUrl from '@assets/FotoIbarra_1759702831594.webp';
import quevedoPhotoUrl from '@assets/FotoQuevedo_1759702831586.webp';
import sevilleBgUrl from '@assets/plaza-espana-bg.png';
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
  const currentLang = languages.find(l => l.code === currentLanguage);

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <div 
        className="fixed inset-0 bg-no-repeat opacity-30 pointer-events-none"
        style={{ 
          backgroundImage: `url(${sevilleBgUrl})`,
          backgroundPosition: 'center 30%',
          backgroundSize: '120%'
        }}
      />

      <header className="relative z-10 p-6 border-b border-border flex items-center justify-end bg-white">
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
      </header>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center space-y-6">
            <img
              src={logoUrl}
              alt="Caprichos de Sevilla"
              className="h-20 md:h-24 mx-auto object-contain rounded-lg"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
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
                  <div>Calle Conde de Ibarra. Sevilla</div>
                  <div>Centro histórico. Barrio Arenal.</div>
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
                  <div>Calle Quevedo. Sevilla</div>
                  <div>Centro histórico. Barrio Encarnación.</div>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
