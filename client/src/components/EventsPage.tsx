import { useState } from 'react';
import { Apartment, Language } from '@/lib/i18n';
import PageHeader from './PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, MapPin, ExternalLink, PartyPopper, CalendarDays, CalendarClock } from 'lucide-react';
import { getEventsForDate, getEventsForMonth, getUpcomingEventsThisWeek, getEventsThisMonth, categoryColors } from '@/lib/eventsData';
import { format } from 'date-fns';
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
  const locale = getLocale(currentLanguage);

  const eventsForSelectedDate = selectedDate ? getEventsForDate(selectedDate) : [];
  const eventsForCurrentMonth = getEventsForMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const upcomingEventsThisWeek = getUpcomingEventsThisWeek();
  const eventsThisMonth = getEventsThisMonth();

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
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <PartyPopper className="h-8 w-8 text-primary" data-testid="icon-events" />
              <h1 className="text-3xl font-bold text-foreground" data-testid="title-events">{t.events.title}</h1>
            </div>
            <p className="text-muted-foreground">{t.events.subtitle}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  {t.events.selectDate}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  month={currentMonth}
                  onMonthChange={setCurrentMonth}
                  modifiers={modifiers}
                  modifiersStyles={modifiersStyles}
                  className="rounded-md"
                  data-testid="calendar-events"
                />
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle data-testid="selected-date">
                    {selectedDate ? format(selectedDate, 'MMMM d, yyyy', { locale }) : t.events.selectDate}
                  </CardTitle>
                  <CardDescription>
                    {eventsForSelectedDate.length > 0
                      ? `${eventsForSelectedDate.length} ${eventsForSelectedDate.length === 1 ? t.events.eventCount : t.events.eventsCount}`
                      : t.events.noEvents}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {eventsForSelectedDate.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8" data-testid="no-events-message">{t.events.noEvents}</p>
                  ) : (
                    eventsForSelectedDate.map((event) => (
                      <Card key={event.id} className="hover-elevate" data-testid={`card-event-detail-${event.id}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-2" data-testid={`event-name-${event.id}`}>
                                {t.events.eventNames[event.nameKey as keyof typeof t.events.eventNames]}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-3">
                                {t.events.eventDescriptions[event.descriptionKey as keyof typeof t.events.eventDescriptions]}
                              </p>
                              <div className="flex flex-wrap items-center gap-2 mb-3">
                                <Badge variant="outline" className={categoryColors[event.category]}>
                                  {t.events.categoryLabels[event.category]}
                                </Badge>
                                <Badge variant="outline">
                                  {event.free ? t.events.free : t.events.paid}
                                </Badge>
                                {event.endDate && (
                                  <Badge variant="outline">
                                    {format(event.startDate, 'MMM d', { locale })} - {format(event.endDate, 'MMM d', { locale })}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                              </div>
                            </div>
                          </div>
                          {event.website && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-3 w-full"
                              asChild
                              data-testid={`button-website-${event.id}`}
                            >
                              <a href={event.website} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                {t.events.viewWebsite}
                              </a>
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8">
            <Tabs defaultValue="week" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="week" className="flex items-center gap-2" data-testid="tab-week">
                  <CalendarClock className="h-4 w-4" />
                  {t.events.thisWeek}
                </TabsTrigger>
                <TabsTrigger value="month" className="flex items-center gap-2" data-testid="tab-month">
                  <CalendarDays className="h-4 w-4" />
                  {t.events.thisMonth}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="week" className="mt-6">
                <h2 className="text-2xl font-bold mb-4 text-foreground" data-testid="week-title">
                  {t.events.thisWeek}
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {upcomingEventsThisWeek.length === 0 ? (
                    <p className="text-sm text-muted-foreground col-span-full text-center py-8">{t.events.noEvents}</p>
                  ) : (
                    upcomingEventsThisWeek.map((event) => (
                      <Card key={event.id} className="hover-elevate" data-testid={`card-event-week-${event.id}`}>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {t.events.eventNames[event.nameKey as keyof typeof t.events.eventNames]}
                          </CardTitle>
                          <CardDescription className="flex flex-wrap gap-2">
                            <Badge variant="outline" className={categoryColors[event.category]}>
                              {t.events.categoryLabels[event.category]}
                            </Badge>
                            <Badge variant="outline">
                              {event.free ? t.events.free : t.events.paid}
                            </Badge>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">
                            {t.events.eventDescriptions[event.descriptionKey as keyof typeof t.events.eventDescriptions]}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <CalendarIcon className="h-4 w-4" />
                            <span>
                              {event.endDate
                                ? `${format(event.startDate, 'MMM d', { locale })} - ${format(event.endDate, 'MMM d, yyyy', { locale })}`
                                : format(event.startDate, 'MMMM d, yyyy', { locale })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                          {event.website && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-3 w-full"
                              asChild
                              data-testid={`button-website-week-${event.id}`}
                            >
                              <a href={event.website} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                {t.events.viewWebsite}
                              </a>
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="month" className="mt-6">
                <h2 className="text-2xl font-bold mb-4 text-foreground" data-testid="month-title">
                  {new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {eventsThisMonth.length === 0 ? (
                    <p className="text-sm text-muted-foreground col-span-full text-center py-8">{t.events.noEvents}</p>
                  ) : (
                    eventsThisMonth.map((event) => (
                      <Card key={event.id} className="hover-elevate" data-testid={`card-event-month-${event.id}`}>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {t.events.eventNames[event.nameKey as keyof typeof t.events.eventNames]}
                          </CardTitle>
                          <CardDescription className="flex flex-wrap gap-2">
                            <Badge variant="outline" className={categoryColors[event.category]}>
                              {t.events.categoryLabels[event.category]}
                            </Badge>
                            <Badge variant="outline">
                              {event.free ? t.events.free : t.events.paid}
                            </Badge>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">
                            {t.events.eventDescriptions[event.descriptionKey as keyof typeof t.events.eventDescriptions]}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <CalendarIcon className="h-4 w-4" />
                            <span>
                              {event.endDate
                                ? `${format(event.startDate, 'MMM d', { locale })} - ${format(event.endDate, 'MMM d, yyyy', { locale })}`
                                : format(event.startDate, 'MMMM d, yyyy', { locale })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                          {event.website && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-3 w-full"
                              asChild
                              data-testid={`button-website-month-${event.id}`}
                            >
                              <a href={event.website} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                {t.events.viewWebsite}
                              </a>
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-12 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-foreground text-center" data-testid="title-more-events">
              {t.events.moreEventsTitle}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <Button
                variant="default"
                size="lg"
                className="flex-1"
                asChild
                data-testid="button-onsevilla"
              >
                <a
                  href="https://onsevilla.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ExternalLink className="h-5 w-5" />
                  {t.events.onSevillaButton}
                </a>
              </Button>
              <Button
                variant="default"
                size="lg"
                className="flex-1"
                asChild
                data-testid="button-visitasevilla"
              >
                <a
                  href="https://visitasevilla.es/ahora-en-sevilla/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ExternalLink className="h-5 w-5" />
                  {t.events.visitSevillaButton}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
