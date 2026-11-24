import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { format, addDays, parseISO, isValid, differenceInCalendarDays } from 'date-fns';
import { es, enUS, fr, de, it, zhCN } from 'date-fns/locale';
import {
  ShoppingCart, Pill, Landmark, Shirt, Store, Croissant, MapPin, Hospital, Phone, Navigation, ExternalLink,
  Stethoscope, Ticket, Footprints, Clock, X, Star, HeartPulse, Eye, Map as MapIcon, Lightbulb,
} from 'lucide-react';
import { BAZAARS, BAZAAR_UI, Bazaar, bazaarHours } from '@/lib/bazaarData';
import { usePlaceInfo } from '@/lib/usePlaceInfo';
import { Apartment, Language } from '@/lib/i18n';
import {
  BARRIO, SERVICE_QUERY, ServiceId, HEALTH, HOSPITAL, PHARMACY_24H, PHARMACY_GUARD_URL,
  TICKETS, TICKET_URLS, ROUTES, ROUTES_UI, WEATHER, REVIEW, REVIEW_LINKS, PLACES_UI, googleReviewUrl,
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
  supermarket: ShoppingCart, pharmacy: Pill, atm: Landmark, laundry: Shirt, bazaar: Store, bakery: Croissant,
};

interface NearbyPlace {
  id: string; name: string; address?: string; phone?: string; rating?: number; ratingCount?: number;
  openNow?: boolean; photo?: string; mapsUrl: string; meters: number; walkMinutes: number;
}

function PlaceRow({ p, icon: Icon, P }: { p: NearbyPlace; icon: typeof Pill; P: (typeof PLACES_UI)['es'] }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <li className="rounded-2xl bg-white border border-border shadow-sm p-3 flex gap-3" data-testid={`place-${p.id}`}>
      <div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-muted flex items-center justify-center text-primary">
        {p.photo && imgOk
          ? <img src={p.photo} alt="" loading="lazy" className="w-full h-full object-cover" onError={() => setImgOk(false)} />
          : <Icon className="w-7 h-7" />}
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold text-sm leading-tight">{p.name}</p>
          <span className="shrink-0 inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full px-1.5 py-0.5">
            <Footprints className="w-3 h-3" />{p.walkMinutes} {P.walk}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
          {p.rating !== undefined && (
            <span className="inline-flex items-center gap-0.5 text-foreground">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold">{p.rating.toFixed(1)}</span>
              {p.ratingCount !== undefined && <span className="text-muted-foreground">({p.ratingCount} {P.reviews})</span>}
            </span>
          )}
          <span>{p.meters} m</span>
          {p.openNow !== undefined && (
            <span className={p.openNow ? 'text-emerald-700 font-medium' : 'text-red-600 font-medium'}>{p.openNow ? P.open : P.closed}</span>
          )}
        </div>
        {p.address && <p className="text-xs text-muted-foreground leading-snug flex gap-1"><MapPin className="w-3.5 h-3.5 shrink-0 mt-px text-primary" />{p.address}</p>}
        <div className="flex gap-1.5 pt-1">
          {p.phone && (
            <a href={tel(p.phone)} className="inline-flex items-center gap-1 rounded-lg bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1.5">
              <Phone className="w-3.5 h-3.5" />{P.call}
            </a>
          )}
          <a href={p.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-border bg-white text-xs font-semibold px-2.5 py-1.5">
            <Navigation className="w-3.5 h-3.5 text-primary" />{P.maps}
          </a>
        </div>
      </div>
    </li>
  );
}

/* ---- Bazares: lista propia con foto, horario e itinerario a pie ---- */
const BZ_PHOTOS = import.meta.glob('../../../attached_assets/bazaars/*.webp', { eager: true, import: 'default' }) as Record<string, string>;

function BazaarCard({ b, apartment, lang, index }: { b: Bazaar; apartment: Apartment; lang: Language; index: number }) {
  const U = BAZAAR_UI[lang] || BAZAAR_UI.en;
  const live = usePlaceInfo(`${b.name}, ${b.address}`, apartment);
  const [showMap, setShowMap] = useState(index === 0);
  const [imgOk, setImgOk] = useState(true);
  const own = BZ_PHOTOS[`../../../attached_assets/bazaars/${b.id}.webp`];
  const photo = own || (live?.photo && imgOk ? live.photo : undefined);
  const { lat: oLat, lng: oLng } = COORDS[apartment];
  const route = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(ADDRESS[apartment])}&destination=${encodeURIComponent(b.name)}&destination_place_id=${b.placeId}&travelmode=walking`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.name)}&query_place_id=${b.placeId}`;
  const facade = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${b.lat},${b.lng}`;
  const embed = `https://maps.google.com/maps?saddr=${oLat},${oLng}&daddr=${b.lat},${b.lng}&dirflg=w&hl=${lang === 'zh' ? 'zh-CN' : lang}&output=embed`;
  const rating = live?.rating ?? b.rating;
  const ratingCount = live?.ratingCount ?? b.ratingCount;
  return (
    <article className="rounded-2xl bg-white border border-border shadow-sm overflow-hidden" data-testid={`bazaar-${b.id}`}>
      {photo && <img src={photo} alt={b.name} loading="lazy" className="w-full h-40 object-cover bg-muted" onError={() => setImgOk(false)} />}
      <div className="p-4 space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2 min-w-0">
            <span className="shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">{index + 1}</span>
            <h4 className="font-bold text-[15px] leading-tight pt-0.5">{b.name}</h4>
          </div>
          <span className="shrink-0 inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
            <Footprints className="w-3 h-3" />{b.walkMinutes} {U.walk} · {b.meters} m
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {rating !== undefined && (
            <span className="inline-flex items-center gap-0.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /><span className="font-semibold">{rating.toFixed(1)}</span>
              {ratingCount !== undefined && <span className="text-muted-foreground">({ratingCount} {U.reviews})</span>}
            </span>
          )}
          {live?.openNow !== undefined && (
            <span className={live.openNow ? 'text-emerald-700 font-medium' : 'text-red-600 font-medium'}>{live.openNow ? (PLACES_UI[lang] || PLACES_UI.en).open : (PLACES_UI[lang] || PLACES_UI.en).closed}</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-snug">{b.desc[lang] || b.desc.en}</p>
        <p className="text-sm flex gap-1.5"><MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary" />{b.address}</p>
        <div className="text-[13px] flex gap-1.5">
          <Clock className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
          <div>{bazaarHours(b.hours, lang).map((l) => <p key={l}>{l}</p>)}</div>
        </div>
        {b.tip && <p className="text-xs rounded-xl bg-amber-50 text-amber-900 border border-amber-200 px-3 py-2 flex gap-1.5"><Lightbulb className="w-3.5 h-3.5 shrink-0 mt-px" />{b.tip[lang] || b.tip.en}</p>}

        <button type="button" onClick={() => setShowMap((v) => !v)} className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-muted/70 text-sm font-semibold py-2" data-testid={`bazaar-map-toggle-${b.id}`}>
          <MapIcon className="w-4 h-4 text-primary" />{showMap ? U.hideMap : U.showMap}
        </button>
        {showMap && (
          <iframe
            title={`${U.route}: ${b.name}`}
            src={embed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-56 rounded-xl border border-border"
          />
        )}

        <div className="grid grid-cols-2 gap-2">
          <a href={route} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} col-span-2`}><Navigation className="w-4 h-4" />{U.route}</a>
          <a href={facade} target="_blank" rel="noopener noreferrer" className={btnOutline}><Eye className="w-4 h-4 text-primary" />{U.facade}</a>
          {b.phone
            ? <a href={tel(b.phone)} className={btnOutline}><Phone className="w-4 h-4 text-primary" />{U.call}</a>
            : <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={btnOutline}><ExternalLink className="w-4 h-4 text-primary" />{U.maps}</a>}
        </div>
      </div>
    </article>
  );
}

function BazaarList({ apartment, lang }: { apartment: Apartment; lang: Language }) {
  const U = BAZAAR_UI[lang] || BAZAAR_UI.en;
  return (
    <section className="space-y-2.5" data-testid="bazaar-list">
      <div className="px-1">
        <h3 className="font-bold text-[15px] flex items-center gap-2"><Store className="w-4 h-4 text-primary" />{U.title}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{U.intro}</p>
      </div>
      {BAZAARS[apartment].map((b, i) => <BazaarCard key={b.id} b={b} apartment={apartment} lang={lang} index={i} />)}
      <p className="text-[10px] text-muted-foreground px-1">{U.note}</p>
    </section>
  );
}

export function BarrioPanel({ apartment, lang }: { apartment: Apartment; lang: Language }) {
  const B = BARRIO[lang] || BARRIO.en;
  const P = PLACES_UI[lang] || PLACES_UI.en;
  const { lat, lng } = COORDS[apartment];
  const ids = Object.keys(SERVICE_QUERY) as ServiceId[];
  const [selected, setSelected] = useState<ServiceId | null>(null);
  const [state, setState] = useState<{ loading: boolean; error?: boolean; source?: string; places: NearbyPlace[] }>({ loading: false, places: [] });

  useEffect(() => {
    if (!selected || selected === 'bazaar') return;
    const ctrl = new AbortController();
    setState({ loading: true, places: [] });
    fetch(`/api/places?type=${selected}&apartment=${apartment}`, { signal: ctrl.signal })
      .then((r) => (r.ok && (r.headers.get('content-type') || '').includes('json') ? r.json() : Promise.reject(new Error('bad'))))
      .then((d) => setState({ loading: false, source: d.source, places: Array.isArray(d.places) ? d.places : [] }))
      .catch((e) => { if (e?.name !== 'AbortError') setState({ loading: false, error: true, places: [] }); });
    return () => ctrl.abort();
  }, [selected, apartment]);

  const mapsSearch = selected ? `https://www.google.com/maps/search/${encodeURIComponent(SERVICE_QUERY[selected])}/@${lat},${lng},17z` : '';
  const Icon = selected ? SERVICE_ICON[selected] : Store;

  return (
    <div className="space-y-3" data-testid="panel-barrio">
      <section className="rounded-2xl bg-white border border-border shadow-sm p-4 space-y-3">
        <div>
          <h3 className="font-bold text-[15px]">{B.servicesTitle}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{B.servicesHint}</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {ids.map((id) => {
            const TileIcon = SERVICE_ICON[id];
            const active = selected === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelected(active ? null : id)}
                className={`rounded-xl p-3 flex flex-col items-center gap-1.5 text-center border-2 transition-colors ${active ? 'border-primary bg-primary/10' : 'border-transparent bg-muted/60 hover:bg-primary/10'}`}
                aria-pressed={active}
                data-testid={`service-${id}`}
              >
                <span className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${active ? 'bg-primary text-primary-foreground' : 'bg-white text-primary'}`}><TileIcon className="w-5 h-5" /></span>
                <span className="text-xs font-semibold leading-tight">{B.services[id]}</span>
              </button>
            );
          })}
        </div>
      </section>

      {selected === 'bazaar' && <BazaarList apartment={apartment} lang={lang} />}

      {selected && selected !== 'bazaar' && (
        <section className="space-y-2" data-testid="places-list">
          <h3 className="font-bold text-[15px] px-1 flex items-center gap-2"><Icon className="w-4 h-4 text-primary" />{B.services[selected]}</h3>
          {state.loading && (
            <ul className="space-y-2">
              {[0, 1, 2].map((i) => (
                <li key={i} className="rounded-2xl bg-white border border-border p-3 flex gap-3 animate-pulse">
                  <div className="w-16 h-16 rounded-xl bg-muted" />
                  <div className="flex-1 space-y-2 py-1"><div className="h-3 w-2/3 bg-muted rounded" /><div className="h-3 w-1/2 bg-muted rounded" /><div className="h-3 w-1/3 bg-muted rounded" /></div>
                </li>
              ))}
            </ul>
          )}
          {!state.loading && state.places.length > 0 && (
            <ul className="space-y-2">
              {state.places.map((p) => <PlaceRow key={p.id} p={p} icon={Icon} P={P} />)}
            </ul>
          )}
          {!state.loading && state.places.length === 0 && (
            <p className="rounded-2xl bg-white border border-border p-4 text-sm text-muted-foreground text-center">{state.error ? P.error : P.empty}</p>
          )}
          {!state.loading && (
            <div className="flex items-center justify-between gap-2 px-1">
              <span className="text-[10px] text-muted-foreground">{state.source === 'google' ? P.sourceGoogle : state.source === 'osm' ? P.sourceOsm : ''}</span>
              <a href={mapsSearch} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-primary inline-flex items-center gap-1">
                <ExternalLink className="w-3.5 h-3.5" />{P.maps}
              </a>
            </div>
          )}
        </section>
      )}

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
export function ReviewCard({ lang, apartment }: { lang: Language; apartment: Apartment }) {
  const R = REVIEW[lang] || REVIEW.en;
  return (
    <section className="rounded-2xl bg-gradient-to-br from-primary/10 to-amber-50 border border-primary/20 p-4 space-y-3 text-center" data-testid="review-card">
      <div className="flex justify-center gap-0.5 text-amber-400">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="w-5 h-5 fill-current" />)}</div>
      <p className="font-bold">{R.title}</p>
      <p className="text-sm text-muted-foreground leading-snug">{R.text}</p>
      <a
        href={googleReviewUrl(apartment)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white border-2 border-primary text-base font-bold py-3 px-3 shadow-sm"
        data-testid="button-google-review"
      >
        <svg viewBox="0 0 48 48" className="w-5 h-5" aria-hidden="true">
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
          <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.3-.4-3.5z"/>
        </svg>
        {R.google}
      </a>
      <p className="text-[11px] text-muted-foreground -mt-1">{R.googleHint}</p>
      <p className="text-xs text-muted-foreground pt-1">{R.other}</p>
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
