import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { format, addDays, parseISO, isValid, differenceInCalendarDays } from 'date-fns';
import { es, enUS, fr, de, it, zhCN } from 'date-fns/locale';
import {
  ShoppingCart, Pill, Landmark, Shirt, Cigarette, Croissant, Hospital, Phone, Navigation, ExternalLink,
  Stethoscope, Ticket, Footprints, Clock, X, Star, HeartPulse,
} from 'lucide-react';
import { Apartment, Language } from '@/lib/i18n';
import {
  BARRIO, SERVICE_QUERY, ServiceId, HEALTH, HOSPITAL, PHARMACY_24H, PHARMACY_GUARD_URL,
  TICKETS, TICKET_URLS, ROUTES, ROUTES_UI, WEATHER, REVIEW, REVIEW_LINKS,
} from '@/lib/extrasI18n';

const COORDS: Record<Apartment, { lat: number; lng: number }> = {
  ibarra: { lat: 37.3889, lng: -5.9885 },
  quevedo: { lat: 37.3954, lng: -5.993 },
};
const ADDRESS: Record<Apartment, string> = {
  ibarra: 'Calle Conde de Ibarra, 11-13, 41004 Sevilla',
  quevedo: 'Calle Quevedo, 11, 41003 Sevilla',
};
const LOCALES = { es, en: enUS, fr, de, it, zh: zhCN };
const btnPrimary = 'inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold py-2.5 px-2';
const btnOutline = 'inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-white text-sm font-semibold py-2.5 px-2';
const tel = (p: string) => `tel:${p.replace(/\s/g, '')}`;
const mapsRoute = (apt: Apartment, dest: string, mode = 'walking') =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(ADDRESS[apt])}&destination=${encodeURIComponent(dest)}&travelmode=${mode}`;

/* ============ Barrio (pestaña en Wi-Fi y Apartamento) ============ */
const SERVICE_ICON: Record<ServiceId, typeof Pill> = {
  supermarket: ShoppingCart, pharmacy: Pill, atm: Landmark, laundry: Shirt, tobacco: Cigarette, bakery: Croissant,
};

export function BarrioPanel({ apartment, lang }: { apartment: Apartment; lang: Language }) {
  const B = BARRIO[lang] || BARRIO.en;
  const { lat, lng } = COORDS[apartment];
  const ids = Object.keys(SERVICE_QUERY) as ServiceId[];
  return (
    <div className="space-y-3" data-testid="panel-barrio">
      <section className="rounded-2xl bg-white border border-border shadow-sm p-4 space-y-3">
        <div>
          <h3 className="font-bold text-[15px]">{B.servicesTitle}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{B.servicesHint}</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {ids.map((id) => {
            const Icon = SERVICE_ICON[id];
            return (
              <a
                key={id}
                href={`https://www.google.com/maps/search/${encodeURIComponent(SERVICE_QUERY[id])}/@${lat},${lng},17z`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-muted/60 hover:bg-primary/10 p-3 flex flex-col items-center gap-1.5 text-center"
                data-testid={`service-${id}`}
              >
                <span className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-sm"><Icon className="w-5 h-5" /></span>
                <span className="text-xs font-semibold leading-tight">{B.services[id]}</span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl bg-white border border-border shadow-sm p-4 space-y-2.5">
        <h3 className="font-bold text-[15px] flex items-center gap-2"><Clock className="w-4 h-4 text-primary" />{B.customsTitle}</h3>
        <ul className="divide-y divide-border">
          {B.customs.map((c) => (
            <li key={c.title} className="flex gap-3 py-2.5 first:pt-0 last:pb-0">
              <span className="text-2xl leading-none">{c.icon}</span>
              <div>
                <p className="font-semibold text-sm">{c.title}</p>
                <p className="text-[13px] text-muted-foreground leading-snug">{c.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* ============ Salud (Contacto) ============ */
export function HealthSection({ apartment, lang }: { apartment: Apartment; lang: Language }) {
  const H = HEALTH[lang] || HEALTH.en;
  const hosp = HOSPITAL[apartment];
  const { lat, lng } = COORDS[apartment];
  const Row = ({ icon: Icon, color, label, name, sub, actions }: { icon: typeof Pill; color: string; label: string; name: string; sub?: string; actions: React.ReactNode }) => (
    <article className="rounded-2xl bg-white border border-border shadow-sm p-4 space-y-3">
      <div className="flex gap-3">
        <span className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${color}`}><Icon className="w-5 h-5" /></span>
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="font-semibold text-sm leading-snug">{name}</p>
          {sub && <p className="text-xs text-muted-foreground leading-snug mt-0.5">{sub}</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 [&>*:last-child:nth-child(odd)]:col-span-2">{actions}</div>
    </article>
  );
  return (
    <section className="space-y-3" data-testid="health-section">
      <h2 className="text-xl font-bold flex items-center gap-2 px-1"><HeartPulse className="w-5 h-5 text-red-600" />{H.title}</h2>
      <Row
        icon={Hospital} color="bg-red-100 text-red-700" label={H.hospital} name={hosp.name} sub={hosp.address}
        actions={<>
          <a href={tel(hosp.phone)} className={btnPrimary}><Phone className="w-4 h-4" />{H.call}</a>
          <a href={mapsRoute(apartment, hosp.address, 'driving')} target="_blank" rel="noopener noreferrer" className={btnOutline}><Navigation className="w-4 h-4 text-primary" />{H.route}</a>
        </>}
      />
      <Row
        icon={Pill} color="bg-emerald-100 text-emerald-700" label={H.pharmacy24} name={PHARMACY_24H.name} sub={PHARMACY_24H.address}
        actions={<>
          <a href={tel(PHARMACY_24H.phone)} className={btnPrimary}><Phone className="w-4 h-4" />{H.call}</a>
          <a href={mapsRoute(apartment, PHARMACY_24H.address)} target="_blank" rel="noopener noreferrer" className={btnOutline}><Navigation className="w-4 h-4 text-primary" />{H.route}</a>
        </>}
      />
      <Row
        icon={Pill} color="bg-emerald-100 text-emerald-700" label={H.guard} name={H.guardText}
        actions={<a href={PHARMACY_GUARD_URL} target="_blank" rel="noopener noreferrer" className={btnOutline}><ExternalLink className="w-4 h-4 text-primary" />{H.guard}</a>}
      />
      <Row
        icon={Stethoscope} color="bg-sky-100 text-sky-700" label={H.healthCentre} name={H.healthCentreText}
        actions={<a href={`https://www.google.com/maps/search/${encodeURIComponent('centro de salud')}/@${lat},${lng},16z`} target="_blank" rel="noopener noreferrer" className={btnOutline}><Navigation className="w-4 h-4 text-primary" />{H.route}</a>}
      />
    </section>
  );
}

/* ============ Entradas + rutas a pie (Visitas) ============ */
export function TicketsAndWalks({ apartment, lang }: { apartment: Apartment; lang: Language }) {
  const T = TICKETS[lang] || TICKETS.en;
  const R = ROUTES_UI[lang] || ROUTES_UI.en;
  const routes = ROUTES[apartment];
  return (
    <div className="space-y-3">
      <section className="rounded-2xl border-2 border-amber-400 bg-amber-50 p-4 space-y-3" data-testid="tickets-banner">
        <div className="flex gap-3">
          <Ticket className="w-6 h-6 text-amber-600 shrink-0" />
          <div>
            <p className="font-bold text-amber-900">{T.title}</p>
            <p className="text-sm text-amber-900/90 leading-snug">{T.text}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <a href={TICKET_URLS.alcazar} target="_blank" rel="noopener noreferrer" className={btnPrimary}>{T.alcazar}</a>
          <a href={TICKET_URLS.cathedral} target="_blank" rel="noopener noreferrer" className={btnPrimary}>{T.cathedral}</a>
        </div>
      </section>

      <section className="space-y-2.5" data-testid="walk-routes">
        <h3 className="font-bold text-base px-1 flex items-center gap-2"><Footprints className="w-5 h-5 text-primary" />{R.title}</h3>
        {routes.map((r) => {
          const dest = r.stops[r.stops.length - 1];
          const waypoints = r.stops.slice(0, -1).map(encodeURIComponent).join('|');
          const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(ADDRESS[apartment])}&destination=${encodeURIComponent(dest)}&waypoints=${waypoints}&travelmode=walking`;
          return (
            <article key={r.id} className="rounded-2xl bg-white border border-border shadow-sm p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold leading-tight">{r.title[lang] || r.title.en}</p>
                  <p className="text-[13px] text-muted-foreground leading-snug mt-0.5">{r.text[lang] || r.text.en}</p>
                </div>
                <span className="shrink-0 text-right text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-1">≈ {r.hours} h · {r.km} km</span>
              </div>
              <ol className="flex flex-wrap items-center gap-1 text-xs">
                <li className="rounded-full bg-primary text-primary-foreground px-2 py-1 font-semibold">🏠</li>
                {r.stops.map((s) => (
                  <li key={s} className="flex items-center gap-1">
                    <span className="text-muted-foreground">›</span>
                    <span className="rounded-full bg-muted px-2 py-1">{s.replace(/, Sevilla$/, '').replace(/ de Sevilla$/, '')}</span>
                  </li>
                ))}
              </ol>
              <a href={url} target="_blank" rel="noopener noreferrer" className={`${btnOutline} w-full`}><Navigation className="w-4 h-4 text-primary" />{R.open}</a>
            </article>
          );
        })}
      </section>
    </div>
  );
}

/* ============ Reseña (final del check-in) ============ */
export function ReviewCard({ lang }: { lang: Language }) {
  const R = REVIEW[lang] || REVIEW.en;
  return (
    <section className="rounded-2xl bg-gradient-to-br from-primary/10 to-amber-50 border border-primary/20 p-4 space-y-3 text-center" data-testid="review-card">
      <div className="flex justify-center gap-0.5 text-amber-400">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="w-5 h-5 fill-current" />)}</div>
      <p className="font-bold">{R.title}</p>
      <p className="text-sm text-muted-foreground leading-snug">{R.text}</p>
      <div className="grid grid-cols-2 gap-2">
        {REVIEW_LINKS.map((l) => (
          <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer" className={btnOutline}>{l.name}</a>
        ))}
      </div>
    </section>
  );
}

/* ============ Tiempo de la estancia ============ */
interface Daily { time: string[]; weather_code: number[]; temperature_2m_max: number[]; temperature_2m_min: number[]; precipitation_probability_max: (number | null)[] }

const wmoEmoji = (c: number) =>
  c === 0 ? '☀️' : c <= 2 ? '🌤️' : c === 3 ? '☁️' : c <= 48 ? '🌫️' : c <= 57 ? '🌦️' : c <= 67 ? '🌧️' : c <= 77 ? '❄️' : c <= 82 ? '🌧️' : '⛈️';

const STAY_KEY = 'cs_stay';
const iso = (d: Date) => format(d, 'yyyy-MM-dd');

const validDate = (s: string | null | undefined) => !!s && isValid(parseISO(s));

// Fechas de la estancia en el enlace (?llegada=AAAA-MM-DD&salida=AAAA-MM-DD):
// se guardan al cargar la app, antes de que la navegación quite los parámetros.
(function captureStayFromUrl() {
  if (typeof window === 'undefined') return;
  const p = new URLSearchParams(window.location.search);
  const qFrom = p.get('llegada') || p.get('checkin');
  const qTo = p.get('salida') || p.get('checkout');
  if (validDate(qFrom) && validDate(qTo)) {
    try { localStorage.setItem(STAY_KEY, JSON.stringify({ from: qFrom, to: qTo })); } catch { /* */ }
  }
})();

function initialStay(): { from: string; to: string } {
  const ok = validDate;
  try {
    const s = JSON.parse(localStorage.getItem(STAY_KEY) || 'null');
    if (s && ok(s.from) && ok(s.to) && differenceInCalendarDays(parseISO(s.to), new Date()) >= 0) return s;
  } catch { /* */ }
  const today = new Date();
  return { from: iso(today), to: iso(addDays(today, 3)) };
}

let forecastPromise: Promise<Daily | null> | null = null;
function loadForecast(apartment: Apartment) {
  if (!forecastPromise) {
    const { lat, lng } = COORDS[apartment];
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMadrid&forecast_days=16`;
    forecastPromise = fetch(url).then((r) => (r.ok ? r.json() : null)).then((j) => (j?.daily as Daily) || null).catch(() => null);
  }
  return forecastPromise;
}

export function WeatherChip({ apartment, lang }: { apartment: Apartment; lang: Language }) {
  const W = WEATHER[lang] || WEATHER.en;
  const [open, setOpen] = useState(false);
  const [daily, setDaily] = useState<Daily | null | undefined>(undefined);
  useEffect(() => { loadForecast(apartment).then(setDaily); }, [apartment]);
  const todayIdx = daily ? daily.time.indexOf(iso(new Date())) : -1;
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full bg-white/90 border border-border shadow-sm px-3 py-1 text-xs sm:text-sm font-medium text-foreground"
        data-testid="weather-chip"
      >
        {daily && todayIdx >= 0 ? (
          <span className="font-semibold">{wmoEmoji(daily.weather_code[todayIdx])} {Math.round(daily.temperature_2m_max[todayIdx])}°</span>
        ) : <span>🌤️</span>}
        <span className="text-muted-foreground">· {W.chip}</span>
      </button>
      {open && <WeatherSheet apartment={apartment} lang={lang} daily={daily} onClose={() => setOpen(false)} />}
    </>
  );
}

function WeatherSheet({ apartment, lang, daily, onClose }: { apartment: Apartment; lang: Language; daily: Daily | null | undefined; onClose: () => void }) {
  const W = WEATHER[lang] || WEATHER.en;
  const locale = LOCALES[lang] || enUS;
  const [stay, setStay] = useState(initialStay);
  const update = (k: 'from' | 'to', v: string) => {
    if (!v) return;
    const next = { ...stay, [k]: v };
    if (next.to < next.from) next.to = next.from;
    setStay(next);
    try { localStorage.setItem(STAY_KEY, JSON.stringify(next)); } catch { /* */ }
  };

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const days = useMemo(() => {
    if (!daily) return [];
    return daily.time
      .map((d, i) => ({ d, i }))
      .filter(({ d }) => d >= stay.from && d <= stay.to)
      .map(({ d, i }) => ({
        date: parseISO(d),
        code: daily.weather_code[i],
        max: Math.round(daily.temperature_2m_max[i]),
        min: Math.round(daily.temperature_2m_min[i]),
        rain: daily.precipitation_probability_max[i] ?? 0,
      }));
  }, [daily, stay]);

  const hot = days.some((d) => d.max >= 35);
  const wet = days.some((d) => d.rain >= 50);

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-end sm:items-center justify-center" onClick={onClose} data-testid="weather-sheet">
      <div className="w-full sm:max-w-md max-h-[90dvh] overflow-y-auto bg-background rounded-t-3xl sm:rounded-3xl p-4 space-y-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">{W.title}</h2>
          <button type="button" onClick={onClose} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center" aria-label={W.close}><X className="w-5 h-5" /></button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {(['from', 'to'] as const).map((k) => (
            <label key={k} className="rounded-xl bg-white border border-border px-3 py-2">
              <span className="block text-[11px] text-muted-foreground">{k === 'from' ? W.arrival : W.departure}</span>
              <input
                type="date"
                value={stay[k]}
                min={k === 'to' ? stay.from : undefined}
                onChange={(e) => update(k, e.target.value)}
                className="w-full bg-transparent font-semibold text-sm outline-none"
                data-testid={`stay-${k}`}
              />
            </label>
          ))}
        </div>

        {daily === undefined && <div className="h-32 rounded-2xl bg-muted animate-pulse" />}
        {daily === null && <p className="text-sm text-muted-foreground text-center py-6">{W.noForecast}</p>}
        {daily && days.length === 0 && <p className="text-sm text-muted-foreground text-center py-6">{W.tooFar}</p>}

        {days.length > 0 && (
          <ul className="space-y-1.5" data-testid="weather-days">
            {days.map((d) => (
              <li key={d.date.toISOString()} className="flex items-center gap-3 rounded-xl bg-white border border-border px-3 py-2">
                <span className="text-2xl w-8 text-center">{wmoEmoji(d.code)}</span>
                <span className="flex-1 min-w-0 text-sm font-medium first-letter:uppercase">{format(d.date, 'EEE d MMM', { locale })}</span>
                {d.rain >= 20 && <span className="text-xs text-sky-700">💧 {d.rain}%</span>}
                <span className="text-sm w-16 text-right"><span className="font-bold">{d.max}°</span> <span className="text-muted-foreground">{d.min}°</span></span>
              </li>
            ))}
          </ul>
        )}

        {(hot || wet) && (
          <div className="space-y-1.5">
            {hot && <p className="text-sm rounded-xl bg-red-50 text-red-800 border border-red-200 px-3 py-2">🔥 {W.heat}</p>}
            {wet && <p className="text-sm rounded-xl bg-sky-50 text-sky-800 border border-sky-200 px-3 py-2">☔ {W.rain}</p>}
          </div>
        )}

        {daily && days.length > 0 && days.length < differenceInCalendarDays(parseISO(stay.to), parseISO(stay.from)) + 1 && (
          <p className="text-xs text-muted-foreground">{W.tooFar}</p>
        )}
        <p className="text-[10px] text-muted-foreground text-center">{W.source}</p>
      </div>
    </div>,
    document.body,
  );
}
