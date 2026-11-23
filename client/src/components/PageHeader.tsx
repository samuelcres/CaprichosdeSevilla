import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import ibarraImageUrl from '@assets/FotoIbarra_1759702831594.webp';
import quevedoImageUrl from '@assets/FotoQuevedo_1759702831586.webp';
import { languages, Language, Apartment } from '@/lib/i18n';
import BottomNav from '@/components/BottomNav';
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

  const apartmentImg = apartment === 'ibarra' ? ibarraImageUrl : quevedoImageUrl;

  return (
    <>
    <header className="sticky top-0 z-50 bg-gradient-to-b from-[#FDF1E6] to-[#FAE6D4] border-b border-primary/20 shadow-[0_2px_10px_rgba(194,90,30,0.10)] px-2 py-2 sm:px-4 sm:py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-1 sm:gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-11 w-11 shrink-0 rounded-full bg-white/85 shadow-sm hover:bg-white"
          aria-label="Volver"
          data-testid="button-back"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>

        <div className="flex flex-col items-center flex-1 mx-1 sm:mx-4 min-w-0">
          {title ? (
            <h1 className="text-base sm:text-xl font-bold text-foreground leading-tight text-center line-clamp-2 break-words">
              {title}
            </h1>
          ) : (
            <BrandLogo variant="horizontal" className="h-12 md:h-20 lg:h-24 w-auto object-contain" />
          )}
          {apartment && apartmentLabel && (
            onHome ? (
              <button
                type="button"
                onClick={onHome}
                className="mt-0.5 flex items-center gap-1 text-[11px] sm:text-xs text-[#8A5A3C] hover:text-primary"
                data-testid="button-apartment-home"
              >
                <img src={apartmentImg} alt="" className="w-4 h-4 rounded-full object-cover" />
                <span className="truncate">{apartmentLabel}</span>
              </button>
            ) : (
              <span
                className="mt-0.5 flex items-center gap-1 text-[11px] sm:text-xs text-[#8A5A3C]"
                data-testid="badge-apartment"
              >
                <img src={apartmentImg} alt="" className="w-4 h-4 rounded-full object-cover" />
                <span className="truncate">{apartmentLabel}</span>
              </span>
            )
          )}
        </div>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="default"
                className="gap-1 h-10 px-2 sm:px-4 bg-white/85 border-primary/20 hover:bg-white"
                data-testid="button-language-selector"
                aria-label={changeLanguageLabel}
                title={changeLanguageLabel}
              >
                <span className="text-lg">{currentLang?.flag}</span>
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

          {onHome ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={onHome}
              className="h-11 w-11 rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
              aria-label="Menú"
              data-testid="button-home"
            >
              <Home className="w-6 h-6" />
            </Button>
          ) : (
            <div className="w-10" />
          )}
        </div>
      </div>
    </header>
    <BottomNav />
    </>
  );
}
