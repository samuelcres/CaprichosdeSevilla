import { Apartment } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building2, ArrowLeft } from 'lucide-react';
import logoUrl from '@assets/logoCS_1759701422984.png';

interface ApartmentSelectorProps {
  onSelect: (apartment: Apartment) => void;
  onBack: () => void;
  title: string;
  ibarraName: string;
  quevedoName: string;
}

export default function ApartmentSelector({
  onSelect,
  onBack,
  title,
  ibarraName,
  quevedoName,
}: ApartmentSelectorProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="p-4 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          data-testid="button-back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center space-y-4">
            <img
              src={logoUrl}
              alt="Caprichos de Sevilla"
              className="h-16 md:h-20 mx-auto object-contain"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {title}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              className="hover-elevate active-elevate-2 cursor-pointer overflow-visible"
              onClick={() => onSelect('ibarra')}
              data-testid="card-apartment-ibarra"
            >
              <CardHeader className="text-center p-8">
                <div className="mx-auto mb-4 w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{ibarraName}</CardTitle>
                <CardDescription className="text-sm">
                  Calle Conde de Ibarra, 11-13
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="hover-elevate active-elevate-2 cursor-pointer overflow-visible"
              onClick={() => onSelect('quevedo')}
              data-testid="card-apartment-quevedo"
            >
              <CardHeader className="text-center p-8">
                <div className="mx-auto mb-4 w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
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
