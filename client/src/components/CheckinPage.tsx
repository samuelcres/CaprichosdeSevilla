import PageHeader from './PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, MapPin, Mail, DoorOpen, Building2, LogOut, CheckCircle } from 'lucide-react';
import { Apartment } from '@/lib/i18n';
import sevilleBgUrl from '@assets/0cdb654f-f852-4361-85d9-6ec92b4cab58 (1)_1759923922905.png';

interface CheckinPageProps {
  onBack: () => void;
  onHome: () => void;
  apartment: Apartment;
  t: any;
}

export default function CheckinPage({ onBack, onHome, apartment, t }: CheckinPageProps) {
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

  return (
    <div className="min-h-screen bg-background relative">
      <div 
        className="fixed inset-0 bg-contain bg-left bg-no-repeat opacity-30 pointer-events-none"
        style={{ backgroundImage: `url(${sevilleBgUrl})` }}
      />
      <PageHeader onBack={onBack} onHome={onHome} title={t.checkin.title} />

      <div className="relative z-10 max-w-3xl mx-auto p-4 md:p-6 space-y-6">
        <div className="space-y-4">
          {allSteps.map((step, index) => (
            <Card key={index} data-testid={`card-step-${index + 1}`}>
              <CardContent className="p-6">
                <div className="flex gap-4">
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
