import PageHeader from './PageHeader';
import { ReviewCard } from './Extras';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AlertCircle, MapPin, Mail, DoorOpen, Building2, LogOut, LogIn, Clock, Luggage, ExternalLink, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Apartment, Language } from '@/lib/i18n';
import ibarraImageUrl from '@assets/FotoIbarra_1759702831594.webp';
import quevedoImageUrl from '@assets/FotoQuevedo_1759702831586.webp';
import ibarraStep1 from '@assets/1puerta_1760088503543.webp';
import ibarraStep2 from '@assets/2enlace_1760088503553.webp';
import ibarraStep3 from '@assets/3puerta_1760088503553.png';
import ibarraStep4 from '@assets/4apartamento_1760088503552.webp';
import ibarraStep5 from '@assets/6apertura_1760088503551.png';
import ibarraStep6 from '@assets/7aperturainterior_1760088503550.webp';
import quevedoStep1 from '@assets/1puerta_1760093251206.webp';
import quevedoStep2 from '@assets/3enlace_1760093251206.webp';
import quevedoStep3 from '@assets/4botonportal_1760093251206.png';
import quevedoStep4 from '@assets/6puertabajo_1760093251205.webp';
import quevedoStep5 from '@assets/7enlaceapartamento_1760093251205.png';
import quevedoStep6 from '@assets/8salida_1760093251204.webp';
import ibarraLocker1 from '@assets/1-Pincklocker_1760271769125.webp';
import ibarraLocker2 from '@assets/2-Lockandenjoy_1760271589870.webp';
import quevedoLocker1 from '@assets/Captura de pantalla 2025-10-12 a las 14.00.58_1760270467274.webp';
import quevedoLocker2 from '@assets/lockandenjoy_1760271398228.webp';

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
  const [zoom, setZoom] = useState<number | null>(null);

  // Cerrar la foto ampliada con Escape y bloquear el scroll de fondo
  useEffect(() => {
    if (zoom === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setZoom(null); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [zoom]);

  const stepIcons = [
    <MapPin className="w-3.5 h-3.5" />,
    <Mail className="w-3.5 h-3.5" />,
    <DoorOpen className="w-3.5 h-3.5" />,
    <Building2 className="w-3.5 h-3.5" />,
    <DoorOpen className="w-3.5 h-3.5" />,
    <LogOut className="w-3.5 h-3.5" />,
  ];

  const apartmentAddress = apartment === 'ibarra' 
    ? 'Calle Conde de Ibarra, 11-13, 41004 Sevilla' 
    : 'Calle Quevedo, 11, 41003 Sevilla';
  
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
        title={t.checkin.title}
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
        changeLanguageLabel={t.common.changeLanguage}
        apartment={apartment}
        apartmentLabel={apartment === 'ibarra' ? t.apartment.ibarra : t.apartment.quevedo}
      />

      <div className="relative z-10 max-w-3xl mx-auto p-4 md:p-6 space-y-4">
        <div className="flex gap-2" data-testid="checkin-times">
          <div className="flex-1 rounded-2xl bg-white border border-border shadow-sm px-3 py-2.5 flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center"><LogIn className="w-5 h-5" /></span>
            <div className="leading-tight"><p className="text-[11px] text-muted-foreground">Check-in</p><p className="font-bold">15:00 h</p></div>
          </div>
          <div className="flex-1 rounded-2xl bg-white border border-border shadow-sm px-3 py-2.5 flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center"><LogOut className="w-5 h-5" /></span>
            <div className="leading-tight"><p className="text-[11px] text-muted-foreground">Check-out</p><p className="font-bold">11:00 h</p></div>
          </div>
        </div>

        {/* Pasos: foto a la izquierda y texto a la derecha, con línea de progreso */}
        <ol className="relative space-y-3" data-testid="checkin-steps">
          {allSteps.map((step, index) => (
            <li key={index} className="relative" data-testid={`card-step-${index + 1}`}>
              {index < allSteps.length - 1 && (
                <span className="absolute left-[1.15rem] top-10 -bottom-3 w-0.5 bg-primary/20 sm:hidden" aria-hidden />
              )}
              <div className="flex gap-3">
                <div className="relative z-10 shrink-0 w-9 h-9 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center shadow ring-4 ring-background">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0 rounded-2xl bg-white border border-border shadow-sm overflow-hidden">
                  <div className="flex gap-3 p-3">
                    {stepImages[index] && (
                      <button
                        type="button"
                        onClick={() => setZoom(index)}
                        className="relative shrink-0 w-28 sm:w-40 aspect-[3/4] rounded-xl overflow-hidden bg-muted group"
                        aria-label={`${t.checkin.step} ${index + 1}`}
                        data-testid={`img-step-${index + 1}`}
                      >
                        <img
                          src={stepImages[index]}
                          alt={`${t.checkin.step} ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading={index > 1 ? 'lazy' : undefined}
                        />
                        <span className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-black/55 text-white flex items-center justify-center">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </span>
                      </button>
                    )}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-primary">
                        {stepIcons[index]}
                        {t.checkin.step} {index + 1}
                      </p>
                      <h3 className="font-bold text-[15px] leading-snug text-foreground">{step.title}</h3>
                      <p className="text-[13px] text-muted-foreground leading-snug">{step.description}</p>
                      {index === 0 && (
                        <a
                          href={googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-1 rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5"
                          data-testid="button-view-location"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          {t.checkin.viewLocation}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* Foto ampliada */}
        {zoom !== null && stepImages[zoom] && createPortal(
          <div
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4"
            onClick={() => setZoom(null)}
            role="dialog"
            aria-modal="true"
            data-testid="step-zoom"
          >
            <button
              type="button"
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/15 text-white flex items-center justify-center"
              aria-label="Cerrar"
              onClick={() => setZoom(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <img src={stepImages[zoom]} alt="" className="max-w-full max-h-[78vh] object-contain rounded-lg" />
            <p className="mt-4 text-white text-center text-sm max-w-md">
              <span className="font-bold">{t.checkin.step} {zoom + 1}:</span> {allSteps[zoom].title}
            </p>
            <div className="mt-3 flex gap-3" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                disabled={zoom === 0}
                onClick={() => setZoom(zoom - 1)}
                className="w-11 h-11 rounded-full bg-white/15 text-white flex items-center justify-center disabled:opacity-30"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                disabled={zoom === allSteps.length - 1}
                onClick={() => setZoom(zoom + 1)}
                className="w-11 h-11 rounded-full bg-white/15 text-white flex items-center justify-center disabled:opacity-30"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>,
          document.body
        )}

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="luggage" className="border rounded-2xl bg-white shadow-sm">
            <AccordionTrigger className="px-4 py-3 hover:no-underline" data-testid="accordion-luggage">
              <div className="flex items-center gap-3 text-left">
                <Luggage className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">{t.checkin.luggage.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.checkin.luggage.subtitle}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
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

        <Card className="!rounded-2xl border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
          <CardContent className="p-4">
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
          <Card className="!rounded-2xl border-blue-500/50 bg-blue-50 dark:bg-blue-950/20" data-testid="card-schedule-info">
            <CardContent className="p-4">
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

        <ReviewCard lang={currentLanguage} apartment={apartment} />
      </div>
    </div>
  );
}
