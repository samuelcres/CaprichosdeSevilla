import { useState } from 'react';
import PageHeader from './PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { Apartment, Language } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';
import qrIbarraUrl from '@assets/QR Ibarra_1759701422984.png';
import qrQuevedoUrl from '@assets/Captura de pantalla 2025-10-09 a las 10.26.39_1759998407884.png';
import ibarraImageUrl from '@assets/FotoIbarra_1759702831594.webp';
import quevedoImageUrl from '@assets/FotoQuevedo_1759702831586.webp';

interface WifiPageProps {
  onBack: () => void;
  onHome: () => void;
  apartment: Apartment;
  t: any;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function WifiPage({ onBack, onHome, apartment, t, currentLanguage, onLanguageChange }: WifiPageProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const wifiData = apartment === 'ibarra' ? t.wifi.ibarra : t.wifi.quevedo;
  const qrCode = apartment === 'ibarra' ? qrIbarraUrl : qrQuevedoUrl;

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(wifiData.password);
      setCopied(true);
      toast({
        description: t.wifi.copied,
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const apartmentBgUrl = apartment === 'ibarra' ? ibarraImageUrl : quevedoImageUrl;
  const apartmentName = apartment === 'ibarra' ? 'Capricho de Ibarra' : 'Capricho de Quevedo';

  return (
    <div className="min-h-screen bg-background relative">
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-[0.12] pointer-events-none"
        style={{ backgroundImage: `url(${apartmentBgUrl})` }}
      />
      <div className="hidden sm:flex fixed inset-0 items-center justify-center pointer-events-none opacity-5">
        <p className="text-9xl font-bold text-foreground transform -rotate-45">
          {apartmentName}
        </p>
      </div>
      <PageHeader 
        onBack={onBack} 
        onHome={onHome} 
        title={t.wifi.title}
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
        changeLanguageLabel={t.common.changeLanguage}
        apartment={apartment}
        apartmentLabel={apartment === 'ibarra' ? t.apartment.ibarra : t.apartment.quevedo}
      />

      <div className="relative z-10 max-w-2xl mx-auto p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t.wifi.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  {t.wifi.network}
                </label>
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="font-mono text-lg font-semibold text-foreground">
                    {wifiData.ssid}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  {t.wifi.password}
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 p-4 bg-muted/50 rounded-lg border border-border">
                    <p className="font-mono text-lg font-semibold text-foreground break-all">
                      {wifiData.password}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-14 w-14 flex-shrink-0"
                    onClick={copyPassword}
                    data-testid="button-copy-password"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <div className="text-center space-y-4">
                <p className="text-sm font-medium text-muted-foreground">
                  {t.wifi.scanQR}
                </p>
                <div className="flex justify-center">
                  <div className="p-4 bg-white rounded-lg border-2 border-border inline-block">
                    <img
                      src={qrCode}
                      alt="WiFi QR Code"
                      className="w-48 h-auto md:w-56 object-contain max-h-96"
                      data-testid="img-qr-code"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
