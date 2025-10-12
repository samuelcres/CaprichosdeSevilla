import PageHeader from './PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertCircle, MapPin, Mail, DoorOpen, Building2, LogOut, CheckCircle, Clock, Luggage, ExternalLink } from 'lucide-react';
import { Apartment, Language } from '@/lib/i18n';
import ibarraImageUrl from '@assets/FotoIbarra_1759702831594.webp';
import quevedoImageUrl from '@assets/FotoQuevedo_1759702831586.webp';
import ibarraStep1 from '@assets/1puerta_1760088503543.jpeg';
import ibarraStep2 from '@assets/2enlace_1760088503553.png';
import ibarraStep3 from '@assets/3puerta_1760088503553.png';
import ibarraStep4 from '@assets/4apartamento_1760088503552.png';
import ibarraStep5 from '@assets/6apertura_1760088503551.png';
import ibarraStep6 from '@assets/7aperturainterior_1760088503550.png';
import quevedoStep1 from '@assets/1puerta_1760093251206.png';
import quevedoStep2 from '@assets/3enlace_1760093251206.png';
import quevedoStep3 from '@assets/4botonportal_1760093251206.png';
import quevedoStep4 from '@assets/6puertabajo_1760093251205.png';
import quevedoStep5 from '@assets/7enlaceapartamento_1760093251205.png';
import quevedoStep6 from '@assets/8salida_1760093251204.png';
import ibarraLocker1 from '@assets/1-Pincklocker_1760271769125.png';
import ibarraLocker2 from '@assets/2-Lockandenjoy_1760271589870.png';
import quevedoLocker1 from '@assets/Captura de pantalla 2025-10-12 a las 14.00.58_1760270467274.png';
import quevedoLocker2 from '@assets/lockandenjoy_1760271398228.png';

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

  const apartmentAddress = apartment === 'ibarra' 
    ? 'Calle Conde de Ibarra, 11-13, 41004 Sevilla' 
    : 'Calle Quevedo, 11, 41001 Sevilla';
  
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(apartmentAddress)}`;

  const allSteps = [
    steps.step1,
    steps.step2,
    steps.step3,
    steps.step4,
    steps.step5,
    steps.step6,
  ];

  const stepImages = apartment === 'ibarra' ? [
    ibarraStep1,
    ibarraStep2,
    ibarraStep3,
    ibarraStep4,
    ibarraStep5,
    ibarraStep6,
  ] : [
    quevedoStep1,
    quevedoStep2,
    quevedoStep3,
    quevedoStep4,
    quevedoStep5,
    quevedoStep6,
  ];

  const lockerImages = apartment === 'ibarra' ? [
    ibarraLocker1,
    ibarraLocker2,
  ] : [
    quevedoLocker1,
    quevedoLocker2,
  ];

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
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="luggage" className="border rounded-lg bg-card">
            <AccordionTrigger className="px-6 py-4 hover:no-underline" data-testid="accordion-luggage">
              <div className="flex items-center gap-3 text-left">
                <Luggage className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">{t.checkin.luggage.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.checkin.luggage.subtitle}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-3 pt-2">
                {steps.luggage?.map((locker: any, index: number) => (
                  <Card key={index} className="overflow-visible" data-testid={`card-locker-${index}`}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <h4 className="font-semibold text-foreground">{locker.name}</h4>
                            <Badge variant="secondary" className="flex-shrink-0">
                              {locker.price}
                            </Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="font-medium text-foreground">{t.checkin.luggage.location}:</p>
                                <p className="text-muted-foreground">{locker.location}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="w-4 h-4 flex-shrink-0" />
                              <span>{t.checkin.luggage.distance}: {locker.distance}</span>
                            </div>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              asChild
                              data-testid={`button-locker-map-${index}`}
                            >
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locker.location + ', Sevilla')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2"
                              >
                                <MapPin className="w-4 h-4" />
                                {t.checkin.luggage.viewMap}
                              </a>
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              className="flex-1"
                              asChild
                              data-testid={`button-locker-link-${index}`}
                            >
                              <a
                                href={locker.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2"
                              >
                                <ExternalLink className="w-4 h-4" />
                                {t.checkin.luggage.link}
                              </a>
                            </Button>
                          </div>
                        </div>
                        {lockerImages[index] && (
                          <div className="flex-shrink-0 w-full md:w-48 h-48 md:h-auto">
                            <img 
                              src={lockerImages[index]} 
                              alt={locker.name}
                              className="w-full h-full object-cover rounded-lg"
                              data-testid={`img-locker-${index}`}
                            />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

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
                      {index === 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3"
                          asChild
                          data-testid="button-view-location"
                        >
                          <a 
                            href={googleMapsUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <MapPin className="w-4 h-4" />
                            {t.checkin.viewLocation}
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                  {stepImages[index] && (
                    <div className="flex-shrink-0 w-full md:w-64">
                      <img
                        src={stepImages[index]}
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
