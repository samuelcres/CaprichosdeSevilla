import { languages, Language } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import sevilleBgUrl from '@assets/stock_images/seville_spain_citysc_d2607192.jpg';

interface LanguageSelectorProps {
  onSelect: (language: Language) => void;
  title: string;
  subtitle: string;
}

export default function LanguageSelector({ onSelect, title, subtitle }: LanguageSelectorProps) {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${sevilleBgUrl})` }}
      />
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative z-10 w-full max-w-2xl text-center space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {title}
          </h1>
          <p className="text-lg text-white/90">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {languages.map((lang) => (
            <Card
              key={lang.code}
              className="hover-elevate active-elevate-2 cursor-pointer overflow-visible"
              onClick={() => onSelect(lang.code)}
              data-testid={`button-language-${lang.code}`}
            >
              <Button
                variant="ghost"
                className="w-full h-full min-h-24 flex flex-col items-center justify-center gap-3 no-default-hover-elevate no-default-active-elevate"
              >
                <span className="text-4xl">{lang.flag}</span>
                <span className="text-base font-medium">{lang.name}</span>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
