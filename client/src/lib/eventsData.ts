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

// Cultural events in Seville for 2025
export const sevilleEvents: CulturalEvent[] = [
  {
    id: 'semana-santa-2025',
    nameKey: 'semanaSanta',
    descriptionKey: 'semanaSantaDesc',
    startDate: new Date('2025-04-13'),
    endDate: new Date('2025-04-20'),
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
    startDate: new Date('2025-05-05'),
    endDate: new Date('2025-05-11'),
    category: 'festival',
    location: 'Real de la Feria, Los Remedios',
    website: 'https://www.spain.info/en/calendar/april-fair/',
    free: false,
    imageKey: 'feria_abril'
  },
  {
    id: 'copa-rey-2025',
    nameKey: 'copaRey',
    descriptionKey: 'copaReyDesc',
    startDate: new Date('2025-04-26'),
    category: 'sports',
    location: 'Estadio La Cartuja',
    website: 'https://www.rfef.es/',
    free: false,
    imageKey: 'copa_rey'
  },
  {
    id: 'corpus-christi-2025',
    nameKey: 'corpusChristi',
    descriptionKey: 'corpusChristiDesc',
    startDate: new Date('2025-06-19'),
    category: 'religious',
    location: 'Catedral de Sevilla',
    free: true,
    imageKey: 'corpus_christi'
  },
  {
    id: 'bienal-flamenco-2025',
    nameKey: 'bienalFlamenco',
    descriptionKey: 'bienalFlamencoDesc',
    startDate: new Date('2025-09-10'),
    endDate: new Date('2025-10-05'),
    category: 'music',
    location: 'Diversos teatros de Sevilla',
    website: 'https://www.labienal.com/',
    free: false,
    imageKey: 'bienal_flamenco'
  },
  {
    id: 'festival-teatro-2025',
    nameKey: 'festivalTeatro',
    descriptionKey: 'festivalTeatroDesc',
    startDate: new Date('2025-03-15'),
    endDate: new Date('2025-04-15'),
    category: 'theater',
    location: 'Teatro de la Maestranza y otros',
    website: 'https://www.spain.info/en/calendar/international-festival-theatre-performing-arts/',
    free: false,
    imageKey: 'festival_teatro'
  },
  {
    id: 'noche-blanco-2025',
    nameKey: 'nocheBlanco',
    descriptionKey: 'nocheBlancoDesc',
    startDate: new Date('2025-10-11'),
    category: 'cultural',
    location: 'Centro histórico de Sevilla',
    free: true,
    imageKey: 'noche_blanco'
  },
  {
    id: 'dia-andalucia-2025',
    nameKey: 'diaAndalucia',
    descriptionKey: 'diaAndaluciaDesc',
    startDate: new Date('2025-02-28'),
    category: 'cultural',
    location: 'Toda la ciudad',
    free: true,
    imageKey: 'dia_andalucia'
  },
  {
    id: 'velada-santa-ana-2025',
    nameKey: 'veladaSantaAna',
    descriptionKey: 'veladaSantaAnaDesc',
    startDate: new Date('2025-07-25'),
    endDate: new Date('2025-07-27'),
    category: 'festival',
    location: 'Barrio de Triana',
    free: true,
    imageKey: 'velada_santa_ana'
  },
  {
    id: 'fiestas-vela-2025',
    nameKey: 'fiestasVela',
    descriptionKey: 'fiestasVelaDesc',
    startDate: new Date('2025-08-15'),
    category: 'religious',
    location: 'Barrio de Triana',
    free: true,
    imageKey: 'fiestas_vela'
  }
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
