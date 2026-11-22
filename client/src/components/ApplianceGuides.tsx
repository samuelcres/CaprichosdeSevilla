import { AlertTriangle, Power, Thermometer, Fan, Wind, Timer, Lock, Lightbulb, CircleDot } from 'lucide-react';
import { AcGuide, AcButton, WasherGuide } from '@/lib/applianceGuides';
import acPhoto from '@assets/mando_aire_ibarra.webp';

const AC_ICONS: Record<AcButton, typeof Power> = {
  power: Power,
  mode: CircleDot,
  temp: Thermometer,
  fan: Fan,
  swing: Wind,
  timer: Timer,
};

function Box({ title, children, icon: Icon }: { title: string; children: React.ReactNode; icon?: typeof Power }) {
  return (
    <section className="rounded-2xl bg-white border border-border shadow-sm p-4 space-y-2.5">
      <h3 className="flex items-center gap-2 font-bold text-[15px] text-foreground">
        {Icon && <Icon className="w-4 h-4 text-primary" />}
        {title}
      </h3>
      {children}
    </section>
  );
}

export function AcPanel({ g }: { g: AcGuide }) {
  const order: AcButton[] = ['power', 'mode', 'temp', 'fan', 'swing', 'timer'];
  return (
    <div className="space-y-3" data-testid="panel-ac">
      <div className="rounded-2xl bg-white border border-border shadow-sm overflow-hidden">
        <img src={acPhoto} alt={g.model} className="w-full h-auto" />
        <p className="px-4 py-2.5 text-xs text-muted-foreground border-t">{g.model}</p>
      </div>

      <div className="rounded-2xl border-2 border-amber-400 bg-amber-50 p-4 flex gap-3" data-testid="ac-timer-alert">
        <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
        <div className="space-y-1">
          <p className="font-bold text-amber-900 leading-snug">{g.alertTitle}</p>
          <p className="text-sm text-amber-900/90 leading-snug">{g.alert}</p>
        </div>
      </div>

      <Box title={g.buttonsTitle}>
        <ul className="divide-y divide-border">
          {order.map((k) => {
            const Icon = AC_ICONS[k];
            return (
              <li key={k} className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
                <span className="shrink-0 w-9 h-9 rounded-full border-2 border-dashed border-primary/40 text-primary flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-sm">{g.buttons[k].label}</p>
                  <p className="text-[13px] text-muted-foreground leading-snug">{g.buttons[k].text}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="text-xs rounded-xl bg-muted/60 p-2.5 leading-relaxed">
          <span className="font-semibold">{g.modesTitle}:</span> {g.modes}
        </p>
      </Box>

      <Box title={g.lockTitle} icon={Lock}>
        <p className="text-sm text-muted-foreground leading-snug">{g.lock}</p>
      </Box>

      <Box title={g.tipsTitle} icon={Lightbulb}>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          {g.tips.map((tip) => (
            <li key={tip} className="flex gap-2"><span className="text-primary">•</span>{tip}</li>
          ))}
        </ul>
      </Box>
    </div>
  );
}

export function WasherPanel({ g }: { g: WasherGuide }) {
  return (
    <div className="space-y-3" data-testid="panel-washer">
      <p className="text-xs text-muted-foreground px-1">{g.model}</p>

      <Box title={g.stepsTitle}>
        <ol className="space-y-2">
          {g.steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">{i + 1}</span>
              <span className="leading-snug pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </Box>

      <Box title={g.drawerTitle}>
        <div className="grid grid-cols-3 gap-2">
          {g.drawer.map((d) => (
            <div key={d.tag} className="rounded-xl bg-muted/60 p-2.5 text-center">
              <p className="text-lg font-bold text-primary leading-none mb-1">{d.tag}</p>
              <p className="text-[11px] leading-snug text-muted-foreground">{d.text}</p>
            </div>
          ))}
        </div>
      </Box>

      <Box title={g.programsTitle}>
        <ul className="divide-y divide-border">
          {g.programs.map((p) => (
            <li key={p.name} className="py-2 first:pt-0 last:pb-0">
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-semibold text-sm">{p.name}</p>
                <p className="text-[11px] text-muted-foreground whitespace-nowrap">{p.detail}</p>
              </div>
              <p className="text-[13px] text-muted-foreground leading-snug">{p.note}</p>
            </li>
          ))}
        </ul>
      </Box>

      <Box title={g.tipsTitle} icon={Lightbulb}>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          {g.tips.map((tip) => (
            <li key={tip} className="flex gap-2"><span className="text-primary">•</span><span className="leading-snug">{tip}</span></li>
          ))}
        </ul>
      </Box>
    </div>
  );
}
