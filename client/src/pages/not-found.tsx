import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import { useLocation } from "wouter";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";
import logoUrl from "@assets/logo-caprichos-2026.webp";

export default function NotFound() {
  const { language } = useApp();
  const t = useTranslation(language);
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 space-y-4 text-center">
          <img src={logoUrl} alt="Caprichos de Sevilla" className="h-28 mx-auto object-contain" />
          <div className="flex items-center justify-center gap-2">
            <Compass className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">{t.common.notFoundTitle}</h1>
          </div>
          <p className="text-sm text-muted-foreground">{t.common.notFoundText}</p>
          <Button className="w-full" onClick={() => setLocation("/")} data-testid="button-not-found-home">
            {t.common.backHome}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
