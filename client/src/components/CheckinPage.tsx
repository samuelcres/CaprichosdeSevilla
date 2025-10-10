import PageHeader from './PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, MapPin, Mail, DoorOpen, Building2, LogOut, CheckCircle, Clock } from 'lucide-react';
import { Apartment, Language } from '@/lib/i18n';
import ibarraImageUrl from '@assets/FotoIbarra_1759702831594.webp';
import quevedoImageUrl from '@assets/FotoQuevedo_1759702831586.webp';
import ibarraStep1 from '@assets/1puerta_1760088503543.jpeg';
import ibarraStep2 from '@assets/2enlace_1760088503553.png';
import ibarraStep3 from '@assets/3puerta_1760088503553.png';
import ibarraStep4 from '@assets/4apartamento_1760088503552.png';
import ibarraStep5 from '@assets/6apertura_1760088503551.png';
import ibarraStep6 from '@assets/7aperturainterior_1760088503550.png';

interface CheckinPageProps {
  onBack: () => void;
  onHome: () => void;
  apartment: Apartment;
  t: any;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function CheckinPage({ onBack, onHome, apartment, t, currentLanguage, onLanguageChange }: CheckinPageProps) {
  const steps = apartment === 'ibarra' ? t.checkin.ibarra : t.checkin.quevedo;

  const stepIcons = [
    <MapPin className="w-5 h-5" />,
    <Mail className="w-5 h-5" />,
    <DoorOpen className="w-5 h-5" />,
    <Building2 className="w-5 h-5" />,
    <DoorOpen className="w-5 h-5" />,
    <LogOut className="w-5 h-5" />,
  ];

  const allSteps = [
    steps.step1,
    steps.step2,
    steps.step3,
    steps.step4,
    steps.step5,
    steps.step6,
  ];

  const ibarraStepImages = apartment === 'ibarra' ? [
    ibarraStep1,
    ibarraStep2,
    ibarraStep3,
    ibarraStep4,
    ibarraStep5,
    ibarraStep6,
  ] : [];

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
        title={t.checkin.title}
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
        changeLanguageLabel={t.common.changeLanguage}
        apartment={apartment}
        apartmentLabel={apartment === 'ibarra' ? t.apartment.ibarra : t.apartment.quevedo}
      />

      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        <div className="space-y-4">
          {allSteps.map((step, index) => (
            <Card key={index} data-testid={`card-step-${index + 1}`}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex gap-4 flex-1">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="text-primary">{stepIcons[index]}</div>
                        <h3 className="font-semibold text-foreground">
                          {t.checkin.step} {index + 1}: {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {apartment === 'ibarra' && ibarraStepImages[index] && (
                    <div className="flex-shrink-0 w-full md:w-64">
                      <img
                        src={ibarraStepImages[index]}
                        alt={`${t.checkin.step} ${index + 1}`}
                        className="w-full h-auto rounded-lg object-contain max-h-80 md:max-h-64"
                        data-testid={`img-step-${index + 1}`}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="font-semibold text-amber-900 dark:text-amber-300">
                  {t.checkin.warning.title}
                </h3>
                <p className="text-sm text-amber-800 dark:text-amber-400 leading-relaxed">
                  {t.checkin.warning.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {t.checkin.schedule && (
          <Card className="border-blue-500/50 bg-blue-50 dark:bg-blue-950/20" data-testid="card-schedule-info">
            <CardContent className="p-6">
              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300">
                    {t.checkin.schedule.title}
                  </h3>
                  <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
                    {t.checkin.schedule.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-green-500/50 bg-green-50 dark:bg-green-950/20">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="font-semibold text-green-900 dark:text-green-300">
                  Check-in: 15:00h
                </h3>
                <p className="text-sm text-green-800 dark:text-green-400">
                  Check-out: 11:00h
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
