import { differenceInCalendarDays, startOfDay } from 'date-fns';
import { ExternalLink, Star, Landmark, Building2, Ticket, CalendarRange } from 'lucide-react';
import { Language } from '@/lib/i18n';

// Enlaces externos con la mejor información para el visitante.
// Cada uno se abre, cuando la web lo permite, en el día elegido y en el idioma del huésped.

type Copy = { title: string; spanishOnly: string; fever: string; eventbrite: string; visita: string; junta: string; icas: string };

const COPY: Record<Language, Copy> = {
  es: {
    title: 'Más planes para este día',
    spanishOnly: 'en español',
    fever: 'Espectáculos, flamenco, conciertos Candlelight y visitas, con precio y valoraciones.',
    eventbrite: 'Rutas guiadas, catas, talleres y actividades de pequeños organizadores.',
    visita: 'Web oficial de turismo de Sevilla: lo más destacado ahora en la ciudad.',
    junta: 'Agenda oficial de teatros, museos y espacios culturales de la Junta en Sevilla.',
    icas: 'Programación cultural del Ayuntamiento: conciertos, exposiciones y actividades, muchas gratis.',
  },
  en: {
    title: 'More things to do this day',
    spanishOnly: 'in Spanish',
    fever: 'Shows, flamenco, Candlelight concerts and tours, with prices and ratings.',
    eventbrite: 'Guided walks, tastings, workshops and activities by local organisers.',
    visita: 'Official Seville tourism site: highlights happening in the city now.',
    junta: 'Official programme of the regional theatres, museums and cultural venues in Seville.',
    icas: 'City Council cultural programme: concerts, exhibitions and activities, many free.',
  },
  fr: {
    title: "Plus d'idées pour ce jour",
    spanishOnly: 'en espagnol',
    fever: 'Spectacles, flamenco, concerts Candlelight et visites, avec prix et avis.',
    eventbrite: 'Visites guidées, dégustations, ateliers et activités locales.',
    visita: "Site officiel du tourisme de Séville : l'essentiel en ce moment.",
    junta: 'Programme officiel des théâtres, musées et lieux culturels régionaux à Séville.',
    icas: 'Programme culturel de la mairie : concerts, expositions et activités, souvent gratuits.',
  },
  de: {
    title: 'Weitere Ideen für diesen Tag',
    spanishOnly: 'auf Spanisch',
    fever: 'Shows, Flamenco, Candlelight-Konzerte und Führungen mit Preisen und Bewertungen.',
    eventbrite: 'Stadtführungen, Verkostungen, Workshops und lokale Aktivitäten.',
    visita: 'Offizielle Tourismus-Website Sevillas: aktuelle Highlights der Stadt.',
    junta: 'Offizielles Programm der regionalen Theater, Museen und Kulturorte in Sevilla.',
    icas: 'Kulturprogramm der Stadt: Konzerte, Ausstellungen und Aktivitäten, oft kostenlos.',
  },
  it: {
    title: 'Altre idee per questo giorno',
    spanishOnly: 'in spagnolo',
    fever: 'Spettacoli, flamenco, concerti Candlelight e visite, con prezzi e recensioni.',
    eventbrite: 'Visite guidate, degustazioni, laboratori e attività locali.',
    visita: 'Sito ufficiale del turismo di Siviglia: il meglio in città adesso.',
    junta: 'Programma ufficiale di teatri, musei e spazi culturali regionali a Siviglia.',
    icas: 'Programma culturale del Comune: concerti, mostre e attività, spesso gratuite.',
  },
  zh: {
    title: '当天更多活动',
    spanishOnly: '西班牙语',
    fever: '演出、弗拉门戈、烛光音乐会和导览，附价格和评分。',
    eventbrite: '导览步行、品鉴、工作坊和本地活动。',
    visita: '塞维利亚官方旅游网站：城市近期亮点。',
    junta: '安达卢西亚政府在塞维利亚的剧院、博物馆和文化场馆官方节目单。',
    icas: '市政府文化节目：音乐会、展览和活动，很多免费。',
  },
};

function when(date: Date) {
  const diff = differenceInCalendarDays(startOfDay(date), startOfDay(new Date()));
  if (diff === 0) return 'today';
  if (diff === 1) return 'tomorrow';
  if (diff > 1 && diff < 7) return 'this-week';
  return null;
}

function feverUrl(lang: Language, date: Date) {
  const l = lang === 'zh' ? 'en' : lang;
  const city = l === 'en' ? 'seville' : 'sevilla';
  const w = when(date);
  return `https://feverup.com/${l}/${city}${w ? `/when/${w}` : ''}`;
}

function eventbriteUrl(lang: Language, date: Date) {
  const domain = { es: 'eventbrite.es', en: 'eventbrite.com', fr: 'eventbrite.fr', de: 'eventbrite.de', it: 'eventbrite.it', zh: 'eventbrite.com' }[lang];
  const w = when(date);
  return `https://www.${domain}/d/spain--sevilla/${w ? `events--${w}` : 'all-events'}/`;
}

function visitaUrl(lang: Language) {
  if (lang === 'es') return 'https://visitasevilla.es/ahora-en-sevilla/';
  if (lang === 'fr') return 'https://visitasevilla.es/fr/';
  return 'https://visitasevilla.es/en/';
}

export default function EventLinks({ lang, date }: { lang: Language; date: Date }) {
  const C = COPY[lang] || COPY.en;
  const links = [
    { id: 'fever', name: 'Fever', icon: Star, desc: C.fever, url: feverUrl(lang, date), es: false },
    { id: 'eventbrite', name: 'Eventbrite', icon: Ticket, desc: C.eventbrite, url: eventbriteUrl(lang, date), es: false },
    { id: 'visitasevilla', name: 'Visita Sevilla', icon: Landmark, desc: C.visita, url: visitaUrl(lang), es: false },
    { id: 'icas', name: 'ICAS · Ayuntamiento de Sevilla', icon: Building2, desc: C.icas, url: 'https://icas.sevilla.org/', es: true },
    { id: 'junta', name: 'Agenda Cultural de Andalucía', icon: CalendarRange, desc: C.junta, url: 'https://www.juntadeandalucia.es/cultura/agendaculturaldeandalucia/sevilla', es: true },
  ];

  return (
    <section className="space-y-3" data-testid="event-links">
      <h2 className="text-lg font-bold text-foreground px-1" data-testid="title-more-events">{C.title}</h2>
      <div className="grid gap-2 sm:grid-cols-2">
        {links.map(({ id, name, icon: Icon, desc, url, es }) => (
          <a
            key={id}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 rounded-2xl bg-white border border-border shadow-sm p-3 active:bg-muted transition-colors"
            data-testid={`link-${id}`}
          >
            <span className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Icon className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 font-semibold text-sm text-foreground">
                {name}
                {es && lang !== 'es' && (
                  <span className="whitespace-nowrap text-[10px] leading-none font-medium rounded-full bg-muted px-1.5 py-1 text-muted-foreground">{C.spanishOnly}</span>
                )}
              </span>
              <span className="block text-xs text-muted-foreground leading-snug mt-0.5">{desc}</span>
            </span>
            <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground mt-1" />
          </a>
        ))}
      </div>
    </section>
  );
}
