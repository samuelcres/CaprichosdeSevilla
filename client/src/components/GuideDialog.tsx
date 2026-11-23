import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Bus, Key, Wifi, UtensilsCrossed, PartyPopper, Phone, ChevronRight, BookOpen } from 'lucide-react';
import { Apartment, Language } from '@/lib/i18n';
import { GUIDE, SectionId } from '@/lib/guideContent';
import ibarraImageUrl from '@assets/FotoIbarra_1759702831594.webp';
import quevedoImageUrl from '@assets/FotoQuevedo_1759702831586.webp';

interface GuideDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  t: any;
  currentLanguage: Language;
  apartment?: Apartment;
  onNavigate?: (id: SectionId) => void;
}

const SECTIONS: { id: SectionId; icon: typeof Bus; color: string }[] = [
  { id: 'transport', icon: Bus, color: 'bg-sky-100 text-sky-700' },
  { id: 'checkin', icon: Key, color: 'bg-amber-100 text-amber-700' },
  { id: 'wifi', icon: Wifi, color: 'bg-cyan-100 text-cyan-700' },
  { id: 'tourism', icon: UtensilsCrossed, color: 'bg-orange-100 text-orange-700' },
  { id: 'events', icon: PartyPopper, color: 'bg-fuchsia-100 text-fuchsia-700' },
  { id: 'contact', icon: Phone, color: 'bg-red-100 text-red-700' },
];

export default function GuideDialog({ open, onOpenChange, t, currentLanguage, apartment, onNavigate }: GuideDialogProps) {
  const G = GUIDE[currentLanguage] || GUIDE.en;
  const isIbarra = apartment === 'ibarra';
  const aptName = apartment === 'quevedo' ? 'Capricho de Quevedo' : apartment === 'ibarra' ? 'Capricho de Ibarra' : 'Caprichos de Sevilla';
  const heroImg = apartment === 'quevedo' ? quevedoImageUrl : ibarraImageUrl;

  const go = (id: SectionId) => {
    onOpenChange(false);
    onNavigate?.(id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-lg w-[calc(100%-1.5rem)] max-h-[92dvh] overflow-y-auto p-0 gap-0 rounded-3xl sm:rounded-3xl border-0 bg-background [&>button]:z-20 [&>button]:bg-white/90 [&>button]:rounded-full [&>button]:p-1.5 [&>button]:opacity-100 [&>button]:top-3 [&>button]:right-3"
        data-testid="dialog-guide"
      >
        {/* Portada */}
        <div className="relative h-40 shrink-0">
          <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-4 text-white">
            <p className="text-[11px] uppercase tracking-widest font-semibold opacity-90 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />{aptName}
            </p>
            <DialogTitle className="text-2xl font-bold leading-tight" data-testid="title-guide">{G.title}</DialogTitle>
            <DialogDescription className="text-white/90 text-sm leading-snug" data-testid="subtitle-guide">{G.intro(aptName)}</DialogDescription>
          </div>
        </div>

        <div className="p-4 space-y-5">
          {/* Recorrido de la estancia */}
          <section>
            <h3 className="font-bold text-base mb-2">{G.journeyTitle}</h3>
            <ol className="relative">
              {G.journey.map((j, i) => (
                <li key={j.when} className="relative flex gap-3 pb-3 last:pb-0">
                  {i < G.journey.length - 1 && <span className="absolute left-[1.15rem] top-10 bottom-0 w-0.5 bg-primary/20" aria-hidden />}
                  <span className="relative z-10 shrink-0 w-9 h-9 rounded-full bg-primary/10 ring-4 ring-background flex items-center justify-center text-lg">{j.icon}</span>
                  <div className="pt-0.5">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-primary">{j.when}</p>
                    <p className="text-sm leading-snug">{isIbarra && j.textIbarra ? j.textIbarra : j.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Secciones */}
          <section>
            <h3 className="font-bold text-base mb-2">{G.sectionsTitle}</h3>
            <div className="space-y-2">
              {SECTIONS.map(({ id, icon: Icon, color }) => {
                const s = G.sections[id];
                const feats = isIbarra && s.featsIbarra ? s.featsIbarra : s.feats;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => go(id)}
                    className="w-full text-left rounded-2xl bg-white border border-border shadow-sm p-3 flex gap-3 items-start active:bg-muted transition-colors"
                    data-testid={`card-guide-${id}`}
                  >
                    <span className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${color}`}><Icon className="w-5 h-5" /></span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-bold text-[15px] leading-tight">{t.menu[id]}</span>
                        <span className="shrink-0 inline-flex items-center text-xs font-semibold text-primary">{G.open}<ChevronRight className="w-4 h-4" /></span>
                      </span>
                      <span className="block text-xs text-muted-foreground mt-0.5">{s.desc}</span>
                      <span className="flex flex-wrap gap-1 mt-2">
                        {feats.map((f) => (
                          <span key={f} className="text-[11px] rounded-full bg-muted px-2 py-0.5 leading-tight">{f}</span>
                        ))}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Atajos */}
          <section>
            <h3 className="font-bold text-base mb-2">{G.toolsTitle}</h3>
            <div className="grid grid-cols-2 gap-2">
              {G.tools.map((tool, i) => (
                <div key={tool.title} className={`rounded-2xl bg-muted/60 p-3 ${i === G.tools.length - 1 && G.tools.length % 2 ? 'col-span-2' : ''}`}>
                  <p className="text-sm font-semibold flex items-center gap-1.5"><span className="text-base">{tool.icon}</span>{tool.title}</p>
                  <p className="text-xs text-muted-foreground leading-snug mt-0.5">{tool.text}</p>
                </div>
              ))}
            </div>
          </section>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full rounded-xl bg-primary text-primary-foreground font-semibold py-3 shadow-sm"
            data-testid="button-guide-close"
          >
            {G.close}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
