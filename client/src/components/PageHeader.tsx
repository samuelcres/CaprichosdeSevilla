import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import logoUrl from '@assets/logoCS_1759701422984.png';

interface PageHeaderProps {
  onBack: () => void;
  onHome?: () => void;
  title?: string;
}

export default function PageHeader({ onBack, onHome, title }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          data-testid="button-back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {title ? (
          <h1 className="text-lg font-semibold text-foreground truncate mx-4">
            {title}
          </h1>
        ) : (
          <img
            src={logoUrl}
            alt="Caprichos de Sevilla"
            className="h-10 object-contain"
          />
        )}

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
    </header>
  );
}
