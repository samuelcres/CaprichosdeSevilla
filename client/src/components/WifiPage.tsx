import { useState } from 'react';
import PageHeader from './PageHeader';
import { Copy, Check, Wifi, AirVent, WashingMachine, QrCode } from 'lucide-react';
import { AC, WASHER, UI, APARTMENT_APPLIANCES } from '@/lib/applianceGuides';
import { AcPanel, WasherPanel } from './ApplianceGuides';
import { Apartment, Language } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';
import qrIbarraUrl from '@assets/QR Ibarra_1759701422984.png';
import qrQuevedoUrl from '@assets/QR Quevedo.png';
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
  const [copied, setCopied] = useState<'ssid' | 'password' | null>(null);
  const [showQr, setShowQr] = useState(false);
  const [tab, setTab] = useState<'wifi' | 'ac' | 'washer'>('wifi');
  const { toast } = useToast();
  const U = UI[currentLanguage] || UI.en;
  const has = APARTMENT_APPLIANCES[apartment];
  const tabs = [
    { id: 'wifi' as const, label: U.wifiTab, icon: Wifi },
    ...(has.ac ? [{ id: 'ac' as const, label: (AC[currentLanguage] || AC.en).tab, icon: AirVent }] : []),
    ...(has.washer ? [{ id: 'washer' as const, label: (WASHER[currentLanguage] || WASHER.en).tab, icon: WashingMachine }] : []),
  ];

  const wifiData = apartment === 'ibarra' ? t.wifi.ibarra : t.wifi.quevedo;
  const qrCode = apartment === 'ibarra' ? qrIbarraUrl : qrQuevedoUrl;

  const copyValue = async (value: string, key: 'ssid' | 'password') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      toast({ description: t.wifi.copied, duration: 2000 });
      setTimeout(() => setCopied(null), 2000);
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

      <div className="relative z-10 max-w-2xl mx-auto p-4 md:p-6 space-y-4">
        {tabs.length > 1 && (
          <div className="grid gap-1.5 p-1.5 bg-white/90 border border-border shadow-sm rounded-xl" style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }} data-testid="apartment-tabs">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`flex flex-col items-center justify-center gap-1 rounded-lg py-2 px-1 text-xs leading-tight text-center min-h-14 transition-colors ${
                  tab === id ? 'bg-primary text-primary-foreground shadow-sm font-semibold' : 'text-foreground hover:bg-muted'
                }`}
                data-testid={`tab-${id}`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </div>
        )}

        {tab === 'wifi' && (
          <section className="rounded-2xl bg-white border border-border shadow-sm p-4 space-y-3" data-testid="panel-wifi">
            {[
              { label: t.wifi.network, value: wifiData.ssid, key: 'ssid' as const },
              { label: t.wifi.password, value: wifiData.password, key: 'password' as const },
            ].map((row) => (
              <div key={row.key}>
                <p className="text-xs font-medium text-muted-foreground mb-1">{row.label}</p>
                <div className="flex gap-2">
                  <div className="flex-1 min-w-0 px-3 py-2.5 bg-muted/50 rounded-xl border border-border">
                    <p className="font-mono text-lg font-semibold text-foreground break-all">{row.value}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyValue(row.value, row.key)}
                    className="shrink-0 w-12 rounded-xl border border-border bg-white flex items-center justify-center"
                    aria-label={t.wifi.copy}
                    data-testid={row.key === 'password' ? 'button-copy-password' : 'button-copy-ssid'}
                  >
                    {copied === row.key ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setShowQr((v) => !v)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary/10 text-primary font-semibold text-sm py-2.5"
              data-testid="button-toggle-qr"
            >
              <QrCode className="w-4 h-4" />
              {showQr ? U.hideQr : U.showQr}
            </button>
            {showQr && (
              <div className="flex justify-center">
                <div className="p-3 bg-white rounded-xl border-2 border-border">
                  <img src={qrCode} alt="WiFi QR Code" className="w-44 h-auto object-contain max-h-80" data-testid="img-qr-code" />
                </div>
              </div>
            )}
          </section>
        )}

        {tab === 'ac' && <AcPanel g={AC[currentLanguage] || AC.en} />}
        {tab === 'washer' && <WasherPanel g={WASHER[currentLanguage] || WASHER.en} />}
      </div>
    </div>
  );
}
