export interface Restaurant {
  name: string;
  description: string;
  distance: number;
  rating: number;
  website?: string;
  mapsUrl: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'tapas';
}

export const ibarraRestaurants: Restaurant[] = [
  {
    name: 'La Brunilda',
    description: 'Tapas modernas y creativas con productos de temporada',
    distance: 8,
    rating: 4.6,
    website: 'https://www.labrunilda.com',
    mapsUrl: 'https://maps.google.com/?q=La+Brunilda+Sevilla',
    category: 'tapas',
  },
  {
    name: 'Eslava',
    description: 'Tapas tradicionales con un toque contemporáneo',
    distance: 6,
    rating: 4.5,
    website: 'https://www.espacioeslava.com',
    mapsUrl: 'https://maps.google.com/?q=Eslava+Sevilla',
    category: 'tapas',
  },
  {
    name: 'Duo Tapas',
    description: 'Cocina de mercado y fusión asiática-andaluza',
    distance: 10,
    rating: 4.4,
    mapsUrl: 'https://maps.google.com/?q=Duo+Tapas+Sevilla',
    category: 'lunch',
  },
  {
    name: 'La Cacharrería',
    description: 'Ambiente acogedor con tapas creativas y vinos selectos',
    distance: 7,
    rating: 4.5,
    mapsUrl: 'https://maps.google.com/?q=La+Cacharreria+Sevilla',
    category: 'dinner',
  },
  {
    name: 'Confitería La Campana',
    description: 'Pastelería histórica perfecta para desayunos',
    distance: 5,
    rating: 4.3,
    mapsUrl: 'https://maps.google.com/?q=Confiteria+La+Campana+Sevilla',
    category: 'breakfast',
  },
  {
    name: 'Casa Morales',
    description: 'Taberna tradicional desde 1850 con auténtico sabor sevillano',
    distance: 9,
    rating: 4.4,
    mapsUrl: 'https://maps.google.com/?q=Casa+Morales+Sevilla',
    category: 'tapas',
  },
];

export const quevedoRestaurants: Restaurant[] = [
  {
    name: 'Bodeguita Romero',
    description: 'Bar de tapas clásico en el corazón de Sevilla',
    distance: 4,
    rating: 4.5,
    mapsUrl: 'https://maps.google.com/?q=Bodeguita+Romero+Sevilla',
    category: 'tapas',
  },
  {
    name: 'El Rinconcillo',
    description: 'El bar más antiguo de Sevilla (1670), tapas tradicionales',
    distance: 3,
    rating: 4.3,
    mapsUrl: 'https://maps.google.com/?q=El+Rinconcillo+Sevilla',
    category: 'tapas',
  },
  {
    name: 'Café Bar Las Teresas',
    description: 'Ambiente auténtico con jamón de calidad y vinos',
    distance: 6,
    rating: 4.4,
    mapsUrl: 'https://maps.google.com/?q=Las+Teresas+Sevilla',
    category: 'lunch',
  },
  {
    name: 'Vineria San Telmo',
    description: 'Cocina de autor en formato tapas con excelentes vinos',
    distance: 7,
    rating: 4.6,
    mapsUrl: 'https://maps.google.com/?q=Vineria+San+Telmo+Sevilla',
    category: 'dinner',
  },
  {
    name: 'Horno San Buenaventura',
    description: 'Panadería artesanal ideal para desayunos',
    distance: 5,
    rating: 4.5,
    mapsUrl: 'https://maps.google.com/?q=Horno+San+Buenaventura+Sevilla',
    category: 'breakfast',
  },
  {
    name: 'Catalina',
    description: 'Restaurante moderno con vistas a la Giralda',
    distance: 4,
    rating: 4.5,
    website: 'https://www.restaurantecatalina.com',
    mapsUrl: 'https://maps.google.com/?q=Catalina+Sevilla',
    category: 'dinner',
  },
];
