import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import logoUrl from '@assets/logoCS_1759701422984.png';
import { languages, Language, Apartment } from '@/lib/i18n';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PageHeaderProps {
  onBack: () => void;
  onHome?: () => void;
  title?: string;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  changeLanguageLabel: string;
  apartment?: Apartment;
  apartmentLabel?: string;
}

export default function PageHeader({ onBack, onHome, title, currentLanguage, onLanguageChange, changeLanguageLabel, apartment, apartmentLabel }: PageHeaderProps) {
  const currentLang = languages.find(l => l.code === currentLanguage);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          data-testid="button-back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="flex flex-col items-center flex-1 mx-4 min-w-0">
          {apartment && apartmentLabel && (
            <Badge 
              variant="outline" 
              className="mb-1 text-xs"
              data-testid="badge-apartment"
            >
              {apartmentLabel}
            </Badge>
          )}
          {title ? (
            <h1 className="text-lg font-semibold text-foreground truncate w-full text-center">
              {title}
            </h1>
          ) : (
            <img
              src={logoUrl}
              alt="Caprichos de Sevilla"
              className="h-10 object-contain"
            />
          )}
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="default"
                className="gap-2"
                data-testid="button-language-selector"
                aria-label={changeLanguageLabel}
                title={changeLanguageLabel}
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

          {onHome ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={onHome}
              data-testid="button-home"
            >
              <Home className="w-5 h-5" />
            </Button>
          ) : (
            <div className="w-10" />
          )}
        </div>
      </div>
    </header>
  );
}
