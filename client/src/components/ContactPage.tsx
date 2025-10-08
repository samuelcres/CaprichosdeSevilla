import PageHeader from './PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail, Phone } from 'lucide-react';
import sevilleBgUrl from '@assets/plaza-espana-oranges.png';

interface ContactPageProps {
  onBack: () => void;
  onHome: () => void;
  t: any;
}

export default function ContactPage({ onBack, onHome, t }: ContactPageProps) {
  const openWhatsApp = () => {
    window.open('https://wa.me/34661610794', '_blank');
  };

  const openEmail = () => {
    window.location.href = 'mailto:info@caprichosdesevilla.com';
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none"
        style={{ backgroundImage: `url(${sevilleBgUrl})` }}
      />
      <PageHeader onBack={onBack} onHome={onHome} title={t.contact.title} />

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
