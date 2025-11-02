export interface CulturalEvent {
  id: string;
  nameKey: string;
  descriptionKey: string;
  startDate: Date;
  endDate?: Date;
  category: 'festival' | 'religious' | 'cultural' | 'sports' | 'music' | 'theater' | 'art';
  location: string;
  website?: string;
  free: boolean;
  imageKey?: string;
}

// Helper function to get the current year's date for recurring annual events
function getEventDate(year: number, month: number, day: number): Date {
  return new Date(year, month - 1, day);
}

// Get events for current and next year to ensure continuity
const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;

// Cultural events in Seville - Updated with real dates for 2025-2026
export const sevilleEvents: CulturalEvent[] = [
  // 2025 Events
  {
    id: 'dia-andalucia-2025',
    nameKey: 'diaAndalucia',
    descriptionKey: 'diaAndaluciaDesc',
    startDate: getEventDate(2025, 2, 28),
    category: 'cultural',
    location: 'Toda la ciudad',
    free: true,
    imageKey: 'dia_andalucia'
  },
  {
    id: 'semana-santa-2025',
    nameKey: 'semanaSanta',
    descriptionKey: 'semanaSantaDesc',
    startDate: getEventDate(2025, 4, 13),
    endDate: getEventDate(2025, 4, 20),
    category: 'religious',
    location: 'Centro histórico de Sevilla',
    website: 'https://www.spain.info/en/calendar/easter-week-sevilla/',
    free: true,
    imageKey: 'semana_santa'
  },
  {
    id: 'feria-abril-2025',
    nameKey: 'feriaAbril',
    descriptionKey: 'feriaAbrilDesc',
    startDate: getEventDate(2025, 5, 6),
    endDate: getEventDate(2025, 5, 11),
    category: 'festival',
    location: 'Real de la Feria, Los Remedios',
    website: 'https://www.spain.info/en/calendar/april-fair/',
    free: false,
    imageKey: 'feria_abril'
  },
  {
    id: 'festival-interestelar-2025',
    nameKey: 'festivalInterestelar',
    descriptionKey: 'festivalInterestelarDesc',
    startDate: getEventDate(2025, 5, 16),
    endDate: getEventDate(2025, 5, 17),
    category: 'music',
    location: 'Centro Andaluz de Arte Contemporáneo (CAAC)',
    website: 'https://onsevilla.com/festival-interestelar-sevilla-2025',
    free: false,
    imageKey: 'festival_interestelar'
  },
  {
    id: 'iconica-fest-2025',
    nameKey: 'iconicaFest',
    descriptionKey: 'iconicaFestDesc',
    startDate: getEventDate(2025, 5, 30),
    endDate: getEventDate(2025, 7, 14),
    category: 'music',
    location: 'Plaza de España',
    website: 'https://onsevilla.com/iconica-sevilla-fest-2025-sevilla',
    free: false,
    imageKey: 'iconica_fest'
  },
  {
    id: 'corpus-christi-2025',
    nameKey: 'corpusChristi',
    descriptionKey: 'corpusChristiDesc',
    startDate: getEventDate(2025, 6, 19),
    category: 'religious',
    location: 'Catedral de Sevilla',
    free: true,
    imageKey: 'corpus_christi'
  },
  {
    id: 'puro-latino-2025',
    nameKey: 'puroLatino',
    descriptionKey: 'puroLatinoDesc',
    startDate: getEventDate(2025, 7, 4),
    endDate: getEventDate(2025, 7, 5),
    category: 'music',
    location: 'Estadio La Cartuja',
    free: false,
    imageKey: 'puro_latino'
  },
  {
    id: 'velada-santa-ana-2025',
    nameKey: 'veladaSantaAna',
    descriptionKey: 'veladaSantaAnaDesc',
    startDate: getEventDate(2025, 7, 25),
    endDate: getEventDate(2025, 7, 27),
    category: 'festival',
    location: 'Barrio de Triana',
    free: true,
    imageKey: 'velada_santa_ana'
  },
  {
    id: 'fiestas-vela-2025',
    nameKey: 'fiestasVela',
    descriptionKey: 'fiestasVelaDesc',
    startDate: getEventDate(2025, 8, 15),
    category: 'religious',
    location: 'Barrio de Triana',
    free: true,
    imageKey: 'fiestas_vela'
  },
  {
    id: 'noches-maestranza-2025',
    nameKey: 'nochesMaestranza',
    descriptionKey: 'nochesMaestranzaDesc',
    startDate: getEventDate(2025, 9, 2),
    endDate: getEventDate(2025, 9, 13),
    category: 'music',
    location: 'Plaza de la Maestranza',
    free: false,
    imageKey: 'noches_maestranza'
  },
  {
    id: 'concierto-camilo-2025',
    nameKey: 'conciertoCamilo',
    descriptionKey: 'conciertoCamiloDesc',
    startDate: getEventDate(2025, 9, 9),
    category: 'music',
    location: 'Plaza de Toros de la Maestranza',
    free: false,
    imageKey: 'concierto_camilo'
  },
  {
    id: 'bienal-flamenco-2025',
    nameKey: 'bienalFlamenco',
    descriptionKey: 'bienalFlamencoDesc',
    startDate: getEventDate(2025, 9, 10),
    endDate: getEventDate(2025, 10, 5),
    category: 'music',
    location: 'Diversos teatros de Sevilla',
    website: 'https://www.labienal.com/',
    free: false,
    imageKey: 'bienal_flamenco'
  },
  {
    id: 'noche-blanco-2025',
    nameKey: 'nocheBlanco',
    descriptionKey: 'nocheBlancoDesc',
    startDate: getEventDate(2025, 10, 11),
    category: 'cultural',
    location: 'Centro histórico de Sevilla',
    free: true,
    imageKey: 'noche_blanco'
  },
  {
    id: 'feria-belenes-2025',
    nameKey: 'feriaBelenes',
    descriptionKey: 'feriaBelenesDesc',
    startDate: getEventDate(2025, 11, 8),
    endDate: getEventDate(2025, 12, 23),
    category: 'cultural',
    location: 'Plaza de San Francisco',
    free: true,
    imageKey: 'feria_belenes'
  },
  {
    id: 'cascanueces-ballet-2025',
    nameKey: 'cascanueces',
    descriptionKey: 'cascanueceDesc',
    startDate: getEventDate(2025, 11, 29),
    endDate: getEventDate(2025, 11, 30),
    category: 'theater',
    location: 'Cartuja Center',
    website: 'https://cartujacenter.com/',
    free: false,
    imageKey: 'cascanueces'
  },
  {
    id: 'naturaleza-encendida-2025',
    nameKey: 'naturalezaEncendida',
    descriptionKey: 'naturalezaEncendidaDesc',
    startDate: getEventDate(2025, 10, 30),
    endDate: getEventDate(2026, 3, 15),
    category: 'art',
    location: 'Real Alcázar de Sevilla',
    website: 'https://www.alcazarsevilla.org/',
    free: false,
    imageKey: 'naturaleza_encendida'
  },
  {
    id: 'mercado-navideno-2025',
    nameKey: 'mercadoNavideno',
    descriptionKey: 'mercadoNavidenoDesc',
    startDate: getEventDate(2025, 12, 5),
    endDate: getEventDate(2026, 1, 5),
    category: 'cultural',
    location: 'Plaza Nueva y Av. de la Constitución',
    free: true,
    imageKey: 'mercado_navideno'
  },
  {
    id: 'concierto-navidad-2025',
    nameKey: 'conciertoNavidad',
    descriptionKey: 'conciertoNavidadDesc',
    startDate: getEventDate(2025, 12, 19),
    category: 'music',
    location: 'Espacio Turina',
    free: false,
    imageKey: 'concierto_navidad'
  },
  {
    id: 'san-silvestre-2025',
    nameKey: 'sanSilvestre',
    descriptionKey: 'sanSilvestreDesc',
    startDate: getEventDate(2025, 12, 31),
    category: 'sports',
    location: 'Parque de María Luisa',
    free: false,
    imageKey: 'san_silvestre'
  },
  
  // 2026 Events (for continuity)
  {
    id: 'cabalgata-reyes-2026',
    nameKey: 'cabalgataReyes',
    descriptionKey: 'cabalgataReyesDesc',
    startDate: getEventDate(2026, 1, 5),
    category: 'cultural',
    location: 'Centro de Sevilla',
    free: true,
    imageKey: 'cabalgata_reyes'
  },
  {
    id: 'media-maraton-2026',
    nameKey: 'mediaMaraton',
    descriptionKey: 'mediaMaratonDesc',
    startDate: getEventDate(2026, 1, 18),
    category: 'sports',
    location: 'Centro de Sevilla',
    website: 'https://www.zurichmaratonsevilla.es/',
    free: true,
    imageKey: 'media_maraton'
  },
  {
    id: 'dia-andalucia-2026',
    nameKey: 'diaAndalucia',
    descriptionKey: 'diaAndaluciaDesc',
    startDate: getEventDate(2026, 2, 28),
    category: 'cultural',
    location: 'Toda la ciudad',
    free: true,
    imageKey: 'dia_andalucia'
  },
  {
    id: 'semana-santa-2026',
    nameKey: 'semanaSanta',
    descriptionKey: 'semanaSantaDesc',
    startDate: getEventDate(2026, 3, 29),
    endDate: getEventDate(2026, 4, 5),
    category: 'religious',
    location: 'Centro histórico de Sevilla',
    website: 'https://www.spain.info/en/calendar/easter-week-sevilla/',
    free: true,
    imageKey: 'semana_santa'
  },
  {
    id: 'feria-abril-2026',
    nameKey: 'feriaAbril',
    descriptionKey: 'feriaAbrilDesc',
    startDate: getEventDate(2026, 4, 21),
    endDate: getEventDate(2026, 4, 26),
    category: 'festival',
    location: 'Real de la Feria, Los Remedios',
    website: 'https://www.spain.info/en/calendar/april-fair/',
    free: false,
    imageKey: 'feria_abril'
  },
  {
    id: 'corpus-christi-2026',
    nameKey: 'corpusChristi',
    descriptionKey: 'corpusChristiDesc',
    startDate: getEventDate(2026, 6, 11),
    category: 'religious',
    location: 'Catedral de Sevilla',
    free: true,
    imageKey: 'corpus_christi'
  },
  {
    id: 'velada-santa-ana-2026',
    nameKey: 'veladaSantaAna',
    descriptionKey: 'veladaSantaAnaDesc',
    startDate: getEventDate(2026, 7, 25),
    endDate: getEventDate(2026, 7, 27),
    category: 'festival',
    location: 'Barrio de Triana',
    free: true,
    imageKey: 'velada_santa_ana'
  },
  {
    id: 'fiestas-vela-2026',
    nameKey: 'fiestasVela',
    descriptionKey: 'fiestasVelaDesc',
    startDate: getEventDate(2026, 8, 15),
    category: 'religious',
    location: 'Barrio de Triana',
    free: true,
    imageKey: 'fiestas_vela'
  },
  {
    id: 'bienal-flamenco-2026',
    nameKey: 'bienalFlamenco',
    descriptionKey: 'bienalFlamencoDesc',
    startDate: getEventDate(2026, 9, 10),
    endDate: getEventDate(2026, 10, 5),
    category: 'music',
    location: 'Diversos teatros de Sevilla',
    website: 'https://www.labienal.com/',
    free: false,
    imageKey: 'bienal_flamenco'
  },
  {
    id: 'noche-blanco-2026',
    nameKey: 'nocheBlanco',
    descriptionKey: 'nocheBlancoDesc',
    startDate: getEventDate(2026, 10, 10),
    category: 'cultural',
    location: 'Centro histórico de Sevilla',
    free: true,
    imageKey: 'noche_blanco'
  },
];

// Helper function to get events for a specific date
export function getEventsForDate(date: Date): CulturalEvent[] {
  return sevilleEvents.filter(event => {
    const eventStart = new Date(event.startDate);
    const eventEnd = event.endDate ? new Date(event.endDate) : eventStart;
    
    // Set all times to midnight for comparison
    const compareDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const compareStart = new Date(eventStart.getFullYear(), eventStart.getMonth(), eventStart.getDate());
    const compareEnd = new Date(eventEnd.getFullYear(), eventEnd.getMonth(), eventEnd.getDate());
    
    return compareDate >= compareStart && compareDate <= compareEnd;
  });
}

// Helper function to get events for a specific month
export function getEventsForMonth(year: number, month: number): CulturalEvent[] {
  return sevilleEvents.filter(event => {
    const eventStart = new Date(event.startDate);
    const eventEnd = event.endDate ? new Date(event.endDate) : eventStart;
    
    // Check if event occurs in the specified month
    return (
      (eventStart.getFullYear() === year && eventStart.getMonth() === month) ||
      (eventEnd.getFullYear() === year && eventEnd.getMonth() === month) ||
      (eventStart < new Date(year, month, 1) && eventEnd > new Date(year, month + 1, 0))
    );
  });
}

// Get upcoming events (from today onwards) for the current week
export function getUpcomingEventsThisWeek(): CulturalEvent[] {
  const today = new Date();
  const weekFromNow = new Date(today);
  weekFromNow.setDate(today.getDate() + 7);
  
  return sevilleEvents.filter(event => {
    const eventStart = new Date(event.startDate);
    const eventEnd = event.endDate ? new Date(event.endDate) : eventStart;
    
    // Event is upcoming if it starts within the next week OR is currently ongoing
    return (eventStart >= today && eventStart <= weekFromNow) || 
           (eventStart <= today && eventEnd >= today);
  }).sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
}

// Get events for the current month
export function getEventsThisMonth(): CulturalEvent[] {
  const today = new Date();
  return getEventsForMonth(today.getFullYear(), today.getMonth());
}

// Category icons mapping
export const categoryIcons = {
  festival: '🎉',
  religious: '⛪',
  cultural: '🎭',
  sports: '⚽',
  music: '🎵',
  theater: '🎬',
  art: '🎨'
};

// Category colors
export const categoryColors = {
  festival: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  religious: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  cultural: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  sports: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  music: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  theater: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  art: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200'
};
