import { useState } from 'react';
import { createPortal } from 'react-dom';
import PageHeader from './PageHeader';
import {
  Bus, Car, Plane, ParkingCircle, Bike, Navigation, Train, Home, ArrowDown, Phone, Copy, Check, X,
  Clock, Euro, MapPin, Footprints, ExternalLink, Zap, Maximize2,
} from 'lucide-react';
import { Apartment, Language } from '@/lib/i18n';
import ibarraImageUrl from '@assets/FotoIbarra_1759702831594.webp';
import quevedoImageUrl from '@assets/FotoQuevedo_1759702831586.webp';

interface TransportPageProps {
  onBack: () => void;
  onHome: () => void;
  apartment: Apartment;
  t: any;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

type Direction = 'arrival' | 'departure';
type Place = 'airport' | 'station' | 'car';

// Textos nuevos de esta pantalla (el resto sale de i18n)
const UIX: Record<Language, { apartment: string; airport: string; station: string; car: string; route: string; showDriver: string; driverHint: string; copy: string; copied: string; call: string; recommended: string; close: string; walkRoute: string }> = {
  es: { apartment: 'Apartamento', airport: 'Aeropuerto', station: 'Estación Santa Justa', car: 'En coche', route: 'Ver ruta en Google Maps', showDriver: 'Mostrar al conductor', driverHint: 'Enseñe esta pantalla al taxista', copy: 'Copiar dirección', copied: 'Copiado', call: 'Llamar', recommended: 'Lo más cómodo', close: 'Cerrar', walkRoute: 'Ruta a pie' },
  en: { apartment: 'Apartment', airport: 'Airport', station: 'Santa Justa Station', car: 'By car', route: 'See route on Google Maps', showDriver: 'Show to the driver', driverHint: 'Show this screen to the taxi driver', copy: 'Copy address', copied: 'Copied', call: 'Call', recommended: 'Most convenient', close: 'Close', walkRoute: 'Walking route' },
  fr: { apartment: 'Appartement', airport: 'Aéroport', station: 'Gare Santa Justa', car: 'En voiture', route: 'Voir l’itinéraire sur Google Maps', showDriver: 'Montrer au chauffeur', driverHint: 'Montrez cet écran au chauffeur de taxi', copy: 'Copier l’adresse', copied: 'Copié', call: 'Appeler', recommended: 'Le plus pratique', close: 'Fermer', walkRoute: 'Itinéraire à pied' },
  de: { apartment: 'Wohnung', airport: 'Flughafen', station: 'Bahnhof Santa Justa', car: 'Mit dem Auto', route: 'Route in Google Maps', showDriver: 'Dem Fahrer zeigen', driverHint: 'Zeigen Sie diesen Bildschirm dem Taxifahrer', copy: 'Adresse kopieren', copied: 'Kopiert', call: 'Anrufen', recommended: 'Am bequemsten', close: 'Schließen', walkRoute: 'Fußweg' },
  it: { apartment: 'Appartamento', airport: 'Aeroporto', station: 'Stazione Santa Justa', car: 'In auto', route: 'Vedi percorso su Google Maps', showDriver: 'Mostra all’autista', driverHint: 'Mostra questa schermata al tassista', copy: 'Copia indirizzo', copied: 'Copiato', call: 'Chiama', recommended: 'Il più comodo', close: 'Chiudi', walkRoute: 'Percorso a piedi' },
  zh: { apartment: '公寓', airport: '机场', station: '圣胡斯塔火车站', car: '自驾', route: '在 Google 地图中查看路线', showDriver: '给司机看', driverHint: '请把此屏幕给出租车司机看', copy: '复制地址', copied: '已复制', call: '致电', recommended: '最方便', close: '关闭', walkRoute: '步行路线' },
};

const ADDRESS: Record<Apartment, string> = {
  ibarra: 'Calle Conde de Ibarra, 11-13, 41004 Sevilla',
  quevedo: 'Calle Quevedo, 11, 41003 Sevilla',
};
const COORDS: Record<Apartment, string> = { ibarra: '37.3889,-5.9885', quevedo: '37.3954,-5.9930' };
const PLACE_QUERY: Record<'airport' | 'station', string> = {
  airport: 'Aeropuerto de Sevilla (SVQ)',
  station: 'Estación de Sevilla-Santa Justa',
};

const stripLabel = (s?: string) => (s || '').replace(/^[^:]{1,20}:\s*/, '');

function Chip({ icon: Icon, children, tone = 'muted' }: { icon: typeof Clock; children: React.ReactNode; tone?: 'muted' | 'green' | 'amber' | 'blue' }) {
  const tones = {
    muted: 'bg-muted text-foreground',
    green: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    amber: 'bg-amber-50 text-amber-800 border border-amber-200',
    blue: 'bg-sky-50 text-sky-800 border border-sky-200',
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>
      <Icon className="w-3.5 h-3.5 shrink-0" />
      {children}
    </span>
  );
}

function OptionCard({ icon: Icon, color, title, badge, children, actions }: {
  icon: typeof Bus; color: string; title: string; badge?: string; children?: React.ReactNode; actions?: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl bg-white border border-border shadow-sm p-4 space-y-3">
      <div className="flex items-center gap-3">
        <span className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-base leading-tight">{title}</h3>
          {badge && <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wide text-primary">★ {badge}</span>}
        </div>
      </div>
      {children}
      {actions && <div className="grid grid-cols-2 gap-2 [&>*:last-child:nth-child(odd)]:col-span-2">{actions}</div>}
    </article>
  );
}

const btnPrimary = 'inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold py-2.5 px-2';
const btnOutline = 'inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-white text-sm font-semibold py-2.5 px-2';

export default function TransportPage({ onBack, onHome, apartment, t, currentLanguage, onLanguageChange }: TransportPageProps) {
  const [activeTab, setActiveTab] = useState<'arrival' | 'departure' | 'movearound'>('arrival');
  const [place, setPlace] = useState<Place>('airport');
  const [driverText, setDriverText] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const U = UIX[currentLanguage] || UIX.en;
  const T = t.transport;

  const address = ADDRESS[apartment];
  const busStop = apartment === 'ibarra' ? T.bus.stopIbarra : T.bus.stopQuevedo;
  const parkings = apartment === 'ibarra' ? T.byCar.ibarra : T.byCar.quevedo;
  const apartmentBgUrl = apartment === 'ibarra' ? ibarraImageUrl : quevedoImageUrl;
  const apartmentName = apartment === 'ibarra' ? 'Capricho de Ibarra' : 'Capricho de Quevedo';

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(driverText || address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* sin portapapeles */ }
  };

  const routeUrl = (p: 'airport' | 'station', dir: Direction, mode: 'transit' | 'driving' | 'walking' = 'transit') => {
    const a = encodeURIComponent(PLACE_QUERY[p]);
    const b = encodeURIComponent(address);
    const [origin, dest] = dir === 'arrival' ? [a, b] : [b, a];
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}&travelmode=${mode}`;
  };

  // Franja visual de la ruta: origen → destino
  const RouteStrip = ({ p, dir }: { p: 'airport' | 'station'; dir: Direction }) => {
    const PIcon = p === 'airport' ? Plane : Train;
    const pLabel = p === 'airport' ? U.airport : U.station;
    const a = { icon: PIcon, label: pLabel };
    const b = { icon: Home, label: apartmentName };
    const [from, to] = dir === 'arrival' ? [a, b] : [b, a];
    return (
      <div className="rounded-2xl bg-gradient-to-br from-primary to-[#E8743B] text-white p-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-1 w-24 text-center">
            <span className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center"><from.icon className="w-6 h-6" /></span>
            <span className="text-[11px] leading-tight font-medium">{from.label}</span>
          </div>
          <div className="flex-1 flex items-center">
            <span className="flex-1 border-t-2 border-dashed border-white/70" />
            <ArrowDown className="w-5 h-5 -rotate-90 shrink-0" />
          </div>
          <div className="flex flex-col items-center gap-1 w-24 text-center">
            <span className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-primary"><to.icon className="w-6 h-6" /></span>
            <span className="text-[11px] leading-tight font-medium">{to.label}</span>
          </div>
        </div>
        <a
          href={routeUrl(p, dir)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-sm font-semibold py-2"
          data-testid={`route-${p}-${dir}`}
        >
          <Navigation className="w-4 h-4" /> {U.route}
        </a>
      </div>
    );
  };

  const TaxiCard = ({ price, duration, dest }: { price: string; duration?: string; dest: string }) => (
    <OptionCard icon={Car} color="bg-amber-100 text-amber-700" title={T.taxi.title} badge={U.recommended}>
      <div className="flex flex-wrap gap-1.5">
        <Chip icon={Euro} tone="amber">{stripLabel(price)}</Chip>
        {duration && <Chip icon={Clock}>{duration}</Chip>}
      </div>
      <button
        type="button"
        onClick={() => setDriverText(dest)}
        className="w-full text-left rounded-xl bg-muted/60 p-3 flex items-center gap-3"
        data-testid="button-show-driver"
      >
        <MapPin className="w-5 h-5 text-primary shrink-0" />
        <span className="flex-1 min-w-0">
          <span className="block text-sm font-semibold">{dest}</span>
          <span className="block text-xs text-primary font-semibold mt-0.5">{U.showDriver}</span>
        </span>
        <Maximize2 className="w-4 h-4 text-muted-foreground shrink-0" />
      </button>
    </OptionCard>
  );

  const AirportOptions = ({ dir }: { dir: Direction }) => (
    <div className="space-y-3">
      <RouteStrip p="airport" dir={dir} />
      <TaxiCard price={T.taxi.price} dest={dir === 'arrival' ? address : PLACE_QUERY.airport} />
      <OptionCard
        icon={Bus}
        color="bg-sky-100 text-sky-700"
        title={T.bus.title}
        actions={
          <a href="https://www.tussam.es" target="_blank" rel="noopener noreferrer" className={btnOutline} data-testid="button-tussam">
            <ExternalLink className="w-4 h-4 text-primary" /> TUSSAM
          </a>
        }
      >
        <div className="flex flex-wrap gap-1.5">
          <Chip icon={Euro} tone="blue">{stripLabel(T.bus.price)}</Chip>
          <Chip icon={Clock}>{T.bus.schedule}</Chip>
        </div>
        <p className="text-sm text-muted-foreground flex gap-1.5"><Footprints className="w-4 h-4 mt-0.5 shrink-0 text-primary" />{busStop}</p>
      </OptionCard>
      <OptionCard
        icon={Zap}
        color="bg-zinc-100 text-zinc-800"
        title={T.vtc.title}
        actions={
          <>
            <a href="https://m.uber.com/" target="_blank" rel="noopener noreferrer" className={btnOutline} data-testid="button-uber">Uber</a>
            <a href="https://cabify.com/" target="_blank" rel="noopener noreferrer" className={btnOutline} data-testid="button-cabify">Cabify</a>
          </>
        }
      >
        <p className="text-sm text-muted-foreground">{T.vtc.description}</p>
      </OptionCard>
      <OptionCard
        icon={Plane}
        color="bg-violet-100 text-violet-700"
        title={T.transfer.title}
        actions={
          <a href="https://www.book-online-transfers.com/es/baintex-airport-taxi" target="_blank" rel="noopener noreferrer" className={btnPrimary} data-testid="button-transfer">
            {T.transfer.button}
          </a>
        }
      >
        <p className="text-sm text-muted-foreground">{T.transfer.description}</p>
      </OptionCard>
    </div>
  );

  const StationOptions = ({ dir }: { dir: Direction }) => (
    <div className="space-y-3">
      <RouteStrip p="station" dir={dir} />
      <TaxiCard price={T.trainStation.taxiPrice} duration={T.trainStation.taxiDuration} dest={dir === 'arrival' ? address : PLACE_QUERY.station} />
      <OptionCard
        icon={Bus}
        color="bg-sky-100 text-sky-700"
        title={`${T.trainStation.busTitle} · ${T.trainStation.busLine}`}
        actions={
          <a href="https://www.tussam.es" target="_blank" rel="noopener noreferrer" className={btnOutline}>
            <ExternalLink className="w-4 h-4 text-primary" /> TUSSAM
          </a>
        }
      >
        <div className="flex flex-wrap gap-1.5">
          <Chip icon={Euro} tone="blue">{stripLabel(T.trainStation.busPrice)}</Chip>
          <Chip icon={Clock}>{T.trainStation.busSchedule}</Chip>
        </div>
        <p className="text-sm text-muted-foreground flex gap-1.5">
          <Footprints className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
          {apartment === 'ibarra' ? T.trainStation.busStopIbarra : T.trainStation.busStopQuevedo}
        </p>
      </OptionCard>
      <OptionCard
        icon={Footprints}
        color="bg-emerald-100 text-emerald-700"
        title={stripLabel(apartment === 'ibarra' ? T.trainStation.walkingIbarra : T.trainStation.walkingQuevedo)}
        actions={
          <a href={routeUrl('station', dir, 'walking')} target="_blank" rel="noopener noreferrer" className={btnOutline}>
            <Navigation className="w-4 h-4 text-primary" /> {U.walkRoute}
          </a>
        }
      />
    </div>
  );

  const CarOptions = () => (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground px-1">{T.byCar.subtitle}</p>
      {[parkings.parking1, parkings.parking2].map((pk: any, i: number) => (
        <OptionCard
          key={i}
          icon={ParkingCircle}
          color="bg-blue-100 text-blue-700"
          title={pk.name}
          actions={
            <>
              <a href={`tel:${pk.phone.replace(/\s/g, '')}`} className={btnPrimary}><Phone className="w-4 h-4" /> {U.call}</a>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(pk.address)}&travelmode=driving`} target="_blank" rel="noopener noreferrer" className={btnOutline}>
                <Car className="w-4 h-4 text-primary" /> {T.byCar.openMap}
              </a>
              <a href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(pk.address)}&destination=${encodeURIComponent(address)}&travelmode=walking`} target="_blank" rel="noopener noreferrer" className={btnOutline}>
                <Footprints className="w-4 h-4 text-primary" /> {T.byCar.walkingRoute}
              </a>
            </>
          }
        >
          <div className="flex flex-wrap gap-1.5">
            <Chip icon={Euro} tone="blue">{pk.price}</Chip>
            <Chip icon={Footprints} tone="green">{pk.distance}</Chip>
          </div>
          <p className="text-sm text-muted-foreground flex gap-1.5"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />{pk.address}</p>
        </OptionCard>
      ))}
      <OptionCard
        icon={ParkingCircle}
        color="bg-blue-100 text-blue-700"
        title={T.parking.title}
        actions={
          <a href="https://parclick.es/?affiliate=670e528a" target="_blank" rel="noopener noreferrer" className={btnPrimary} data-testid="button-parking">
            {T.parking.button}
          </a>
        }
      >
        <p className="text-sm text-muted-foreground">{T.parking.description}</p>
      </OptionCard>
    </div>
  );

  const places: { id: Place; icon: typeof Plane; label: string }[] = [
    { id: 'airport', icon: Plane, label: U.airport },
    { id: 'station', icon: Train, label: U.station },
    { id: 'car', icon: Car, label: U.car },
  ];

  const tabs = [
    { id: 'arrival' as const, icon: Plane, label: T.arrival, rotate: 'rotate-45' },
    { id: 'departure' as const, icon: Plane, label: T.departure, rotate: '-rotate-45' },
    { id: 'movearound' as const, icon: Navigation, label: T.moveAround, rotate: '' },
  ];

  const nearbyUrl = (q: string) => `https://www.google.com/maps/search/${q}/@${COORDS[apartment]},16z`;

  return (
    <div className="min-h-screen bg-background relative">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-[0.12] pointer-events-none"
        style={{ backgroundImage: `url(${apartmentBgUrl})` }}
      />
      <PageHeader
        onBack={onBack}
        onHome={onHome}
        title={T.title}
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
        changeLanguageLabel={t.common.changeLanguage}
        apartment={apartment}
        apartmentLabel={apartment === 'ibarra' ? t.apartment.ibarra : t.apartment.quevedo}
      />

      <div className="relative z-10 max-w-2xl mx-auto p-4 md:p-6 space-y-4">
        {/* Llegada / Salida / Moverse */}
        <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-white/90 border border-border shadow-sm rounded-xl">
          {tabs.map(({ id, icon: Icon, label, rotate }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center justify-center gap-1 rounded-lg py-2 px-1 text-xs leading-tight text-center min-h-14 ${
                activeTab === id ? 'bg-primary text-primary-foreground shadow-sm font-semibold' : 'text-foreground hover:bg-muted'
              }`}
              data-testid={`tab-${id}`}
            >
              <Icon className={`w-5 h-5 ${rotate}`} />
              {label}
            </button>
          ))}
        </div>

        {activeTab !== 'movearound' && (
          <>
            {/* ¿Desde/hacia dónde? */}
            <div className="grid grid-cols-3 gap-2" data-testid="place-picker">
              {places.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPlace(id)}
                  className={`rounded-2xl border-2 p-3 flex flex-col items-center gap-1.5 text-center transition-colors ${
                    place === id ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-white text-foreground'
                  }`}
                  data-testid={`place-${id}`}
                >
                  <Icon className="w-7 h-7" />
                  <span className="text-xs font-semibold leading-tight">{label}</span>
                </button>
              ))}
            </div>

            {place === 'airport' && <AirportOptions dir={activeTab} />}
            {place === 'station' && <StationOptions dir={activeTab} />}
            {place === 'car' && <CarOptions />}
          </>
        )}

        {activeTab === 'movearound' && (
          <div className="space-y-3">
            <div className="rounded-2xl bg-white border border-border shadow-sm p-4 flex gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h2 className="font-bold text-base">{T.localTransport.title}</h2>
                <p className="text-sm text-muted-foreground leading-snug mt-1">
                  {apartment === 'ibarra' ? T.localTransport.ibarraInfo : T.localTransport.quevedoInfo}
                </p>
              </div>
            </div>
            {[
              { icon: Bus, color: 'bg-sky-100 text-sky-700', title: T.localTransport.busStops, map: nearbyUrl('parada+autobus'), web: { url: 'https://www.tussam.es', label: 'TUSSAM' } },
              { icon: Bike, color: 'bg-red-100 text-red-700', title: T.localTransport.bikeStations, map: nearbyUrl('sevici'), web: { url: T.localTransport.seviciUrl, label: 'Sevici' } },
              { icon: Zap, color: 'bg-teal-100 text-teal-700', title: T.localTransport.scooters, map: nearbyUrl('electric+scooter'), web: { url: T.localTransport.scooterUrl, label: 'VOI' } },
            ].map((o) => (
              <OptionCard
                key={o.title}
                icon={o.icon}
                color={o.color}
                title={o.title}
                actions={
                  <>
                    <a href={o.map} target="_blank" rel="noopener noreferrer" className={btnOutline}>
                      <MapPin className="w-4 h-4 text-primary" /> {T.localTransport.viewOnMap}
                    </a>
                    <a href={o.web.url} target="_blank" rel="noopener noreferrer" className={btnOutline}>
                      <ExternalLink className="w-4 h-4 text-primary" /> {o.web.label}
                    </a>
                  </>
                }
              >
                <p className="text-sm text-muted-foreground">{T.localTransport.description}</p>
              </OptionCard>
            ))}
          </div>
        )}
      </div>

      {/* Dirección a pantalla completa para enseñar al taxista */}
      {driverText && createPortal(
        <div className="fixed inset-0 z-[100] bg-white flex flex-col" role="dialog" aria-modal="true" data-testid="driver-screen">
          <div className="flex justify-end p-4">
            <button type="button" onClick={() => setDriverText(null)} className="w-11 h-11 rounded-full bg-muted flex items-center justify-center" aria-label={U.close}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6">
            <p className="text-sm text-muted-foreground">{U.driverHint}</p>
            <Car className="w-14 h-14 text-primary" />
            <p className="text-4xl font-extrabold leading-tight text-foreground">{driverText.replace(/, (\d{5})/, '\n$1').split('\n').map((l, i) => <span key={i} className="block">{l}</span>)}</p>
            {driverText === address && <p className="text-xl font-semibold text-primary">{apartmentName}</p>}
          </div>
          <div className="p-4 grid grid-cols-2 gap-2">
            <button type="button" onClick={copyAddress} className={btnOutline}>
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-primary" />} {copied ? U.copied : U.copy}
            </button>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(driverText)}`} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              <MapPin className="w-4 h-4" /> Maps
            </a>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
