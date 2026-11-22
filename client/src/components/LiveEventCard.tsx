import { useState } from 'react';
import { MapPin, Clock, Footprints, CarTaxiFront, Ticket, Navigation, Star, Euro } from 'lucide-react';
import { Language } from '@/lib/i18n';

export interface LiveEvent {
  id: string;
  name: string;
  date: string;
  time?: string;
  category?: string;
  genre?: string;
  description?: string;
  image?: string;
  url?: string;
  price?: { min?: number; max?: number; currency: string };
  venue?: { name: string; address?: string; lat?: number; lng?: number };
  distance?: { km: number; walkMinutes: number; taxiMinutes: number };
  rating?: number;
  source: string;
}

type Texts = {
  today: string; otherDate: string; byTime: string; closest: string; tryOther: string;
  tickets: string; directions: string; from: string; priceOnline: string; free: string;
  walk: string; taxi: string; more: string; less: string; disclaimer: string;
};

export const TEXTS: Record<Language, Texts> = {
  es: {
    today: 'Hoy', otherDate: 'Otra fecha', byTime: 'Por hora', closest: 'Más cerca',
    tryOther: 'Prueba otro día o consulta las webs de abajo.',
    tickets: 'Entradas', directions: 'Cómo llegar', from: 'Desde', priceOnline: 'Precio en la web', free: 'Gratis',
    walk: 'a pie', taxi: 'en taxi', more: 'Ver más', less: 'Ver menos',
    disclaimer: 'Eventos de Ticketmaster. Tiempos de trayecto aproximados desde el apartamento.',
  },
  en: {
    today: 'Today', otherDate: 'Other date', byTime: 'By time', closest: 'Closest',
    tryOther: 'Try another day or check the websites below.',
    tickets: 'Tickets', directions: 'Directions', from: 'From', priceOnline: 'Price online', free: 'Free',
    walk: 'walk', taxi: 'by taxi', more: 'Read more', less: 'Show less',
    disclaimer: 'Events from Ticketmaster. Travel times from the apartment are approximate.',
  },
  fr: {
    today: "Aujourd'hui", otherDate: 'Autre date', byTime: 'Par heure', closest: 'Plus proches',
    tryOther: 'Essayez un autre jour ou consultez les sites ci-dessous.',
    tickets: 'Billets', directions: 'Itinéraire', from: 'Dès', priceOnline: 'Prix en ligne', free: 'Gratuit',
    walk: 'à pied', taxi: 'en taxi', more: 'Lire la suite', less: 'Réduire',
    disclaimer: "Événements Ticketmaster. Temps de trajet approximatifs depuis l'appartement.",
  },
  de: {
    today: 'Heute', otherDate: 'Anderes Datum', byTime: 'Nach Uhrzeit', closest: 'Am nächsten',
    tryOther: 'Probieren Sie einen anderen Tag oder die Websites unten.',
    tickets: 'Tickets', directions: 'Route', from: 'Ab', priceOnline: 'Preis online', free: 'Kostenlos',
    walk: 'zu Fuß', taxi: 'mit Taxi', more: 'Mehr', less: 'Weniger',
    disclaimer: 'Veranstaltungen von Ticketmaster. Wegzeiten ab der Wohnung sind ungefähre Angaben.',
  },
  it: {
    today: 'Oggi', otherDate: 'Altra data', byTime: 'Per orario', closest: 'Più vicini',
    tryOther: 'Prova un altro giorno o consulta i siti qui sotto.',
    tickets: 'Biglietti', directions: 'Indicazioni', from: 'Da', priceOnline: 'Prezzo online', free: 'Gratis',
    walk: 'a piedi', taxi: 'in taxi', more: 'Leggi tutto', less: 'Mostra meno',
    disclaimer: "Eventi da Ticketmaster. Tempi di percorrenza dall'appartamento approssimativi.",
  },
  zh: {
    today: '今天', otherDate: '其他日期', byTime: '按时间', closest: '最近',
    tryOther: '请尝试其他日期或查看下方网站。',
    tickets: '购票', directions: '路线', from: '起价', priceOnline: '价格见官网', free: '免费',
    walk: '步行', taxi: '出租车', more: '展开', less: '收起',
    disclaimer: '活动信息来自 Ticketmaster。从公寓出发的行程时间为估算。',
  },
};

function formatPrice(p: LiveEvent['price'], L: Texts, lang: Language) {
  if (!p || p.min === undefined) return L.priceOnline;
  if (p.min === 0 && (!p.max || p.max === 0)) return L.free;
  const fmt = (n: number) =>
    new Intl.NumberFormat(lang === 'zh' ? 'zh-CN' : lang, {
      style: 'currency', currency: p.currency || 'EUR', maximumFractionDigits: n % 1 ? 2 : 0,
    }).format(n);
  return `${L.from} ${fmt(p.min)}`;
}

export default function LiveEventCard({ ev, L, lang, origin }: { ev: LiveEvent; L: Texts; lang: Language; origin: string }) {
  const [expanded, setExpanded] = useState(false);
  const dest = ev.venue?.lat !== undefined && ev.venue?.lng !== undefined
    ? `${ev.venue.lat},${ev.venue.lng}`
    : ev.venue ? encodeURIComponent(`${ev.venue.name}, Sevilla`) : '';
  const mapsUrl = dest
    ? `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}&travelmode=${(ev.distance?.km ?? 0) > 2.5 ? 'driving' : 'walking'}`
    : undefined;
  const longDesc = (ev.description?.length || 0) > 160;

  return (
    <article className="rounded-2xl bg-white border border-border shadow-sm overflow-hidden" data-testid={`live-event-${ev.id}`}>
      {ev.image && (
        <div className="relative h-40 sm:h-48 bg-muted">
          <img src={ev.image} alt="" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
          {ev.time && (
            <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold shadow">
              <Clock className="h-3.5 w-3.5 text-primary" />{ev.time}
            </span>
          )}
          {(ev.genre || ev.category) && (
            <span className="absolute top-2 right-2 rounded-full bg-primary text-primary-foreground px-2.5 py-1 text-[11px] font-semibold shadow">
              {ev.genre || ev.category}
            </span>
          )}
        </div>
      )}

      <div className="p-4 space-y-3">
        <div>
          {!ev.image && ev.time && (
            <p className="text-xs font-bold text-primary flex items-center gap-1 mb-0.5"><Clock className="h-3.5 w-3.5" />{ev.time}{(ev.genre || ev.category) && ` · ${ev.genre || ev.category}`}</p>
          )}
          <h3 className="font-bold text-base leading-snug">{ev.name}</h3>
          {ev.rating !== undefined && (
            <p className="flex items-center gap-1 text-xs mt-0.5">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold">{ev.rating.toFixed(1)}</span>
            </p>
          )}
        </div>

        {ev.venue && (
          <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
            <span><span className="font-medium text-foreground">{ev.venue.name}</span>{ev.venue.address && <> · {ev.venue.address}</>}</span>
          </p>
        )}

        <div className="flex flex-wrap gap-2 text-xs">
          {ev.distance && (
            <>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1">
                <Footprints className="h-3.5 w-3.5" />{ev.distance.walkMinutes} min {L.walk} · {ev.distance.km.toLocaleString(lang)} km
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1">
                <CarTaxiFront className="h-3.5 w-3.5" />{ev.distance.taxiMinutes} min {L.taxi}
              </span>
            </>
          )}
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 font-medium">
            <Euro className="h-3.5 w-3.5" />{formatPrice(ev.price, L, lang)}
          </span>
        </div>

        {ev.description && (
          <div className="text-sm text-muted-foreground">
            <p className={expanded ? '' : 'line-clamp-3'}>{ev.description}</p>
            {longDesc && (
              <button type="button" onClick={() => setExpanded((v) => !v)} className="text-primary font-medium text-xs mt-1">
                {expanded ? L.less : L.more}
              </button>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 pt-1">
          {ev.url && (
            <a href={ev.url} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold py-2.5 shadow-sm">
              <Ticket className="h-4 w-4" />{L.tickets}
            </a>
          )}
          {mapsUrl && (
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
               className={`inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-white text-sm font-semibold py-2.5 ${ev.url ? '' : 'col-span-2'}`}>
              <Navigation className="h-4 w-4 text-primary" />{L.directions}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
