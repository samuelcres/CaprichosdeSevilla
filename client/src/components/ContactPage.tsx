import PageHeader from './PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail, Phone, AlertCircle, Shield } from 'lucide-react';
import { Apartment, Language } from '@/lib/i18n';
import ibarraImageUrl from '@assets/FotoIbarra_1759702831594.webp';
import quevedoImageUrl from '@assets/FotoQuevedo_1759702831586.webp';

interface ContactPageProps {
  apartment: Apartment;
  onBack: () => void;
  onHome: () => void;
  t: any;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function ContactPage({ apartment, onBack, onHome, t, currentLanguage, onLanguageChange }: ContactPageProps) {
  const openWhatsApp = () => {
    window.open('https://wa.me/34661610794', '_blank');
  };

  const openEmail = () => {
    window.location.href = 'mailto:info@caprichosdesevilla.com';
  };

  const apartmentBgUrl = apartment === 'ibarra' ? ibarraImageUrl : quevedoImageUrl;
  const apartmentName = apartment === 'ibarra' ? 'Capricho de Ibarra' : 'Capricho de Quevedo';

  return (
    <div className="min-h-screen bg-background relative">
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none"
        style={{ backgroundImage: `url(${apartmentBgUrl})` }}
      />
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <p className="text-9xl font-bold text-foreground transform -rotate-45">
          {apartmentName}
        </p>
      </div>
      <PageHeader 
        onBack={onBack} 
        onHome={onHome} 
        title={t.contact.title}
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
        changeLanguageLabel={t.common.changeLanguage}
        apartment={apartment}
        apartmentLabel={apartment === 'ibarra' ? t.apartment.ibarra : t.apartment.quevedo}
      />

      <div className="relative z-10 max-w-2xl mx-auto p-4 md:p-6 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4">
            <Phone className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">{t.contact.title}</h2>
          <p className="text-muted-foreground">{t.contact.description}</p>
        </div>

        <div className="space-y-4">
          <Card className="hover-elevate active-elevate-2 cursor-pointer overflow-visible" onClick={openWhatsApp}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{t.contact.whatsapp}</CardTitle>
                  <CardDescription className="mt-1">
                    {t.contact.whatsappText}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                variant="default"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  openWhatsApp();
                }}
                data-testid="button-whatsapp"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                +34 661 610 794
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-elevate active-elevate-2 cursor-pointer overflow-visible" onClick={openEmail}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{t.contact.email}</CardTitle>
                  <CardDescription className="mt-1">
                    {t.contact.emailText}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  openEmail();
                }}
                data-testid="button-email"
              >
                <Mail className="w-4 h-4 mr-2" />
                info@caprichosdesevilla.com
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-4">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">{t.contact.emergencyTitle}</h2>
            <p className="text-muted-foreground">{t.contact.emergencyDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card data-testid="card-emergency-112">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{t.contact.emergency}</h3>
                    <p className="text-2xl font-bold text-red-600 mt-1">{t.contact.emergencyNumber}</p>
                    <p className="text-sm text-muted-foreground mt-1">{t.contact.emergencyDesc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-national-police">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{t.contact.nationalPolice}</h3>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{t.contact.nationalPoliceNumber}</p>
                    <p className="text-sm text-muted-foreground mt-1">{t.contact.nationalPoliceDesc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-local-police">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{t.contact.localPolice}</h3>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{t.contact.localPoliceNumber}</p>
                    <p className="text-sm text-muted-foreground mt-1">{t.contact.localPoliceDesc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-civil-guard">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{t.contact.civilGuard}</h3>
                    <p className="text-2xl font-bold text-green-600 mt-1">{t.contact.civilGuardNumber}</p>
                    <p className="text-sm text-muted-foreground mt-1">{t.contact.civilGuardDesc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-500/50" data-testid="card-tourist-police">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{t.contact.touristPolice}</h3>
                  <p className="text-2xl font-bold text-amber-600 mt-1">{t.contact.touristPoliceNumber}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t.contact.touristPoliceDesc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-muted/50">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Horario de atención: 9:00 - 21:00h
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Responderemos a tu consulta lo antes posible
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
