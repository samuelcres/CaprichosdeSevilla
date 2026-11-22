import { useEffect, useMemo, useState } from 'react';
import { Apartment, Language } from '@/lib/i18n';
import PageHeader from './PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, MapPin, ExternalLink, PartyPopper } from 'lucide-react';
import LiveEventCard, { LiveEvent, TEXTS } from './LiveEventCard';
import EventLinks from './EventLinks';
import { getEventsForDate, getEventsForMonth, categoryColors } from '@/lib/eventsData';
import { format, addDays, startOfDay, isSameDay, isToday } from 'date-fns';
import { es, enUS, fr, de, it, zhCN } from 'date-fns/locale';
import ibarraImageUrl from '@assets/FotoIbarra_1759702831594.webp';
import quevedoImageUrl from '@assets/FotoQuevedo_1759702831586.webp';

// Map language codes to date-fns locales
const getLocale = (lang: Language) => {
  const locales = {
    es: es,
    en: enUS,
    fr: fr,
    de: de,
    it: it,
    zh: zhCN,
  };
  return locales[lang] || enUS;
};

interface EventsPageProps {
  apartment: Apartment;
  onBack: () => void;
  onHome: () => void;
  t: any;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function EventsPage({ apartment, onBack, onHome, t, currentLanguage, onLanguageChange }: EventsPageProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [sortBy, setSortBy] = useState<'time' | 'distance'>('time');
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const locale = getLocale(currentLanguage);
  const L = TEXTS[currentLanguage] || TEXTS.en;
  const origin = apartment === 'ibarra' ? '37.3889,-5.9885' : '37.3954,-5.9930';

  const stripDays = useMemo(() => {
    const today = startOfDay(new Date());
    return Array.from({ length: 14 }, (_, i) => addDays(today, i));
  }, []);

  const eventsForSelectedDate = selectedDate ? getEventsForDate(selectedDate) : [];
  const eventsForCurrentMonth = getEventsForMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  const dateKey = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  useEffect(() => {
    if (!dateKey) return;
    const ctrl = new AbortController();
    setLoading(true);
    fetch(`/api/events?date=${dateKey}&lang=${currentLanguage}&apartment=${apartment}`, { signal: ctrl.signal })
      .then((r) => (r.ok && (r.headers.get('content-type') || '').includes('json') ? r.json() : { events: [] }))
      .then((d) => setLiveEvents(Array.isArray(d?.events) ? d.events : []))
      .catch((err) => { if (err?.name !== 'AbortError') setLiveEvents([]); })
      .finally(() => { if (!ctrl.signal.aborted) setLoading(false); });
    return () => ctrl.abort();
  }, [dateKey, currentLanguage, apartment]);

  const sortedLive = useMemo(() => {
    const list = [...liveEvents];
    if (sortBy === 'distance') {
      list.sort((a, b) => (a.distance?.km ?? 999) - (b.distance?.km ?? 999));
    } else {
      list.sort((a, b) => (a.time || '99').localeCompare(b.time || '99'));
    }
    return list;
  }, [liveEvents, sortBy]);

  const totalCount = liveEvents.length + eventsForSelectedDate.length;

  const eventDates = eventsForCurrentMonth.map(event => {
    const dates: Date[] = [];
    const start = new Date(event.startDate);
    const end = event.endDate ? new Date(event.endDate) : start;
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    return dates;
  }).flat();

  const modifiers = {
    event: eventDates
  };

  const modifiersStyles = {
    event: {
      backgroundColor: 'hsl(var(--primary))',
      color: 'hsl(var(--primary-foreground))',
      fontWeight: 'bold'
    }
  };

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
      <div className="relative z-10">
        <PageHeader
          title={t.events.title}
          onBack={onBack}
          onHome={onHome}
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
          changeLanguageLabel={t.common.changeLanguage}
          apartment={apartment}
          apartmentLabel={apartment === 'ibarra' ? t.apartment.ibarra : t.apartment.quevedo}
        />
        <div className="container mx-auto px-4 py-4 sm:py-8 max-w-3xl space-y-4">
          {/* Selector de día: tira deslizable con los próximos 14 días */}
          <div className="bg-white/95 rounded-2xl border border-border shadow-sm p-2">
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar snap-x" data-testid="date-strip">
              {stripDays.map((d) => {
                const active = selectedDate && isSameDay(d, selectedDate);
                return (
                  <button
                    key={d.toISOString()}
                    type="button"
                    onClick={() => { setSelectedDate(d); setShowCalendar(false); }}
                    className={`snap-start shrink-0 w-14 rounded-xl py-1.5 flex flex-col items-center transition-colors ${
                      active ? 'bg-primary text-primary-foreground shadow' : 'hover:bg-muted text-foreground'
                    }`}
                    data-testid={`day-${format(d, 'yyyy-MM-dd')}`}
                  >
                    <span className={`text-[10px] uppercase font-semibold ${active ? '' : 'text-muted-foreground'}`}>
                      {isToday(d) ? L.today : format(d, 'EEE', { locale })}
                    </span>
                    <span className="text-lg font-bold leading-tight">{format(d, 'd')}</span>
                    <span className={`text-[10px] ${active ? '' : 'text-muted-foreground'}`}>{format(d, 'MMM', { locale })}</span>
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setShowCalendar((v) => !v)}
                className={`shrink-0 w-14 rounded-xl py-1.5 flex flex-col items-center justify-center gap-0.5 border border-dashed ${showCalendar ? 'border-primary text-primary' : 'border-border text-muted-foreground'}`}
                aria-label={t.events.selectDate}
                data-testid="button-open-calendar"
              >
                <CalendarIcon className="h-5 w-5" />
                <span className="text-[10px] leading-tight text-center">{L.otherDate}</span>
              </button>
            </div>
            {showCalendar && (
              <div className="flex justify-center pt-2 border-t mt-2">
                <Calendar
                  mode="single"
                  locale={locale}
                  selected={selectedDate}
                  onSelect={(d) => { if (d) { setSelectedDate(d); setShowCalendar(false); } }}
                  month={currentMonth}
                  onMonthChange={setCurrentMonth}
                  modifiers={modifiers}
                  modifiersStyles={modifiersStyles}
                  className="rounded-md"
                  data-testid="calendar-events"
                />
              </div>
            )}
          </div>

          {/* Cabecera del día + orden */}
          <div className="flex items-end justify-between gap-2 px-1">
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-foreground first-letter:uppercase" data-testid="selected-date">
                {selectedDate ? format(selectedDate, 'EEEE, d MMMM', { locale }) : t.events.selectDate}
              </h2>
              {!loading && (
                <p className="text-xs text-muted-foreground">
                  {totalCount === 0 ? t.events.noEvents : `${totalCount} ${totalCount === 1 ? t.events.eventCount : t.events.eventsCount}`}
                </p>
              )}
            </div>
            {liveEvents.length > 1 && (
              <div className="flex shrink-0 rounded-full bg-muted p-0.5 text-xs">
                {(['time', 'distance'] as const).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setSortBy(k)}
                    className={`px-3 py-1 rounded-full ${sortBy === k ? 'bg-white shadow font-semibold text-foreground' : 'text-muted-foreground'}`}
                    data-testid={`sort-${k}`}
                  >
                    {k === 'time' ? L.byTime : L.closest}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Grandes citas de la ciudad (fiestas, Semana Santa, Feria...) */}
          {eventsForSelectedDate.map((event) => (
            <Card key={event.id} className="!rounded-2xl border-primary/30 bg-primary/5" data-testid={`card-event-detail-${event.id}`}>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <PartyPopper className="h-5 w-5 text-primary shrink-0" />
                  <h3 className="font-bold text-base leading-snug" data-testid={`event-name-${event.id}`}>
                    {t.events.eventNames[event.nameKey as keyof typeof t.events.eventNames]}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t.events.eventDescriptions[event.descriptionKey as keyof typeof t.events.eventDescriptions]}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <Badge variant="outline" className={categoryColors[event.category]}>{t.events.categoryLabels[event.category]}</Badge>
                  <Badge variant="outline">{event.free ? t.events.free : t.events.paid}</Badge>
                  <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{event.location}</span>
                </div>
                {event.website && (
                  <a href={event.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                    <ExternalLink className="h-4 w-4" />{t.events.viewWebsite}
                  </a>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Eventos en directo de la fuente externa */}
          {loading && (
            <div className="space-y-4" data-testid="events-loading">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-2xl bg-white/90 border overflow-hidden animate-pulse">
                  <div className="h-36 bg-muted" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 w-2/3 bg-muted rounded" />
                    <div className="h-3 w-1/2 bg-muted rounded" />
                    <div className="h-3 w-1/3 bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && sortedLive.map((ev) => (
            <LiveEventCard key={ev.id} ev={ev} L={L} lang={currentLanguage} origin={origin} />
          ))}

          {!loading && totalCount === 0 && (
            <div className="rounded-2xl bg-white/90 border p-6 text-center space-y-1" data-testid="no-events-message">
              <CalendarIcon className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="font-medium">{t.events.noEvents}</p>
              <p className="text-sm text-muted-foreground">{L.tryOther}</p>
            </div>
          )}

          {!loading && liveEvents.length > 0 && (
            <p className="text-[11px] text-muted-foreground text-center px-4">{L.disclaimer}</p>
          )}
        </div>

        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mt-6 mb-8">
            <EventLinks lang={currentLanguage} date={selectedDate || new Date()} />
          </div>
        </div>
      </div>
    </div>
  );
}
