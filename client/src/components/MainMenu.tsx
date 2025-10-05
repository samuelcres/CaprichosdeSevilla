import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bus, Key, Wifi, MapPin, Phone, ArrowLeft, Home } from 'lucide-react';
import logoUrl from '@assets/logoCS_1759701422984.png';

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
}

export default function MainMenu({ options, onSelect, onBack, apartmentName }: MainMenuProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="p-4 border-b border-border flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          data-testid="button-back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <img
          src={logoUrl}
          alt="Caprichos de Sevilla"
          className="h-10 object-contain"
        />
        <div className="w-10" />
      </header>

      <div className="flex-1 p-4 md:p-6">
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
                className="hover-elevate active-elevate-2 cursor-pointer overflow-visible"
                onClick={() => onSelect(option.id)}
                data-testid={`card-menu-${option.id}`}
              >
                <CardHeader className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <div className="text-primary">{option.icon}</div>
                  </div>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                  {option.description && (
                    <CardDescription className="text-sm">
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
