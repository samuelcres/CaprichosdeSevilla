// Visit categories IDs - actual content is in i18n.ts translations
export const visitCategoryIds = [
  'monuments',
  'museums',
  'nature',
  'neighborhoods',
  'culture',
  'churches',
  'tours',
  'modern',
  'gastronomy',
] as const;

export type VisitCategoryId = typeof visitCategoryIds[number];

export interface Visit {
  id: string;
  category: VisitCategoryId;
  distanceIbarra?: number;  // minutes walking from Ibarra
  distanceQuevedo?: number; // minutes walking from Quevedo
  schedule?: string;        // Opening hours
  price?: string;          // Entry price
  photo?: string;          // Photo path
  mapsUrl?: string;        // Google Maps link
  website?: string;        // Official website
  phone?: string;          // Phone number for reservations
}

// Visit data with practical information - names and descriptions are in i18n.ts
export const visitDetails: Visit[] = [
  // MONUMENTOS
  { id: 'catedral', category: 'monuments', distanceIbarra: 8, distanceQuevedo: 7, schedule: 'L-S 11:00-17:00, D 14:30-18:00', price: '€12', photo: '@assets/stock_images/seville_spain_touris_9ba3bc69.jpg', mapsUrl: 'https://maps.google.com/?q=Catedral+de+Sevilla', website: 'https://www.catedraldesevilla.es' },
  { id: 'alcazar', category: 'monuments', distanceIbarra: 9, distanceQuevedo: 8, schedule: 'L-D 9:30-17:00', price: '€14.50', photo: '@assets/stock_images/elegant_restaurant_f_f15dec49.jpg', mapsUrl: 'https://maps.google.com/?q=Real+Alcazar+Sevilla', website: 'https://www.alcazarsevilla.org' },
  { id: 'archivo_indias', category: 'monuments', distanceIbarra: 8, distanceQuevedo: 7, schedule: 'M-S 9:30-17:00, D cerrado', price: 'Gratis', photo: '@assets/stock_images/spanish_traditional__0221f1ec.jpg', mapsUrl: 'https://maps.google.com/?q=Archivo+de+Indias+Sevilla' },
  { id: 'torre_oro', category: 'monuments', distanceIbarra: 6, distanceQuevedo: 8, schedule: 'L-V 9:30-18:45, S-D 10:30-18:45', price: '€3', photo: '@assets/stock_images/spanish_traditional__310230e0.jpg', mapsUrl: 'https://maps.google.com/?q=Torre+del+Oro+Sevilla' },
  { id: 'murallas', category: 'monuments', distanceIbarra: 12, distanceQuevedo: 10, schedule: 'Acceso libre', price: 'Gratis', photo: '@assets/stock_images/spanish_traditional__5f2425d0.jpg', mapsUrl: 'https://maps.google.com/?q=Murallas+Sevilla' },
  
  // MUSEOS
  { id: 'bellas_artes', category: 'museums', distanceIbarra: 10, distanceQuevedo: 9, schedule: 'M 15:00-20:00, X-S 9:00-20:00, D 9:00-15:00', price: 'Gratis UE', photo: '@assets/stock_images/elegant_restaurant_f_5086cc55.jpg', mapsUrl: 'https://maps.google.com/?q=Museo+Bellas+Artes+Sevilla', website: 'https://www.museosdeandalucia.es/web/museodebellasartesdesevilla' },
  { id: 'caac', category: 'museums', distanceIbarra: 25, distanceQuevedo: 27, schedule: 'M-S 11:00-21:00, D 10:00-15:30', price: 'Gratis UE', photo: '@assets/stock_images/elegant_restaurant_f_95b165b2.jpg', mapsUrl: 'https://maps.google.com/?q=CAAC+Sevilla', website: 'https://www.caac.es' },
  { id: 'arqueologico', category: 'museums', distanceIbarra: 20, distanceQuevedo: 22, schedule: 'M 15:00-20:00, X-S 9:00-20:00, D 9:00-15:00', price: 'Gratis UE', photo: '@assets/stock_images/spanish_traditional__60fd4f05.jpg', mapsUrl: 'https://maps.google.com/?q=Museo+Arqueologico+Sevilla' },
  { id: 'costumbres', category: 'museums', distanceIbarra: 20, distanceQuevedo: 22, schedule: 'M 15:00-20:00, X-S 9:00-20:00, D 9:00-15:00', price: 'Gratis UE', photo: '@assets/stock_images/spanish_paella_seafo_2e59c319.jpg', mapsUrl: 'https://maps.google.com/?q=Museo+Artes+Costumbres+Sevilla' },
  { id: 'baile_flamenco', category: 'museums', distanceIbarra: 5, distanceQuevedo: 4, schedule: 'Diario 10:00-19:00', price: '€10', photo: '@assets/stock_images/spanish_tapas_modern_a2f41932.jpg', mapsUrl: 'https://maps.google.com/?q=Museo+Baile+Flamenco+Sevilla', website: 'https://www.museoflamenco.com' },
  { id: 'naval', category: 'museums', distanceIbarra: 6, distanceQuevedo: 8, schedule: 'L-V 9:30-18:45, S-D 10:30-18:45', price: '€3', photo: '@assets/stock_images/spanish_tapas_modern_346e78d7.jpg', mapsUrl: 'https://maps.google.com/?q=Museo+Naval+Sevilla' },
  { id: 'san_jorge', category: 'museums', distanceIbarra: 3, distanceQuevedo: 5, schedule: 'M-S 10:00-14:00 y 16:00-20:00', price: 'Gratis', photo: '@assets/stock_images/spanish_tapas_modern_fa802452.jpg', mapsUrl: 'https://maps.google.com/?q=Castillo+San+Jorge+Sevilla' },

  // NATURALEZA
  { id: 'maria_luisa', category: 'nature', distanceIbarra: 18, distanceQuevedo: 20, schedule: 'Diario 8:00-22:00', price: 'Gratis', photo: '@assets/stock_images/spanish_paella_seafo_e3d9edb9.jpg', mapsUrl: 'https://maps.google.com/?q=Parque+Maria+Luisa+Sevilla' },
  { id: 'jardines_murillo', category: 'nature', distanceIbarra: 10, distanceQuevedo: 9, schedule: 'Diario 8:00-22:00', price: 'Gratis', photo: '@assets/stock_images/modern_brunch_cafe_a_e64d5442.jpg', mapsUrl: 'https://maps.google.com/?q=Jardines+Murillo+Sevilla' },
  { id: 'guadalquivir', category: 'nature', distanceIbarra: 5, distanceQuevedo: 7, schedule: 'Acceso libre 24h', price: 'Gratis', photo: '@assets/stock_images/seville_spain_citysc_d2607192.jpg', mapsUrl: 'https://maps.google.com/?q=Ribera+Guadalquivir+Sevilla' },
  { id: 'cartuja', category: 'nature', distanceIbarra: 22, distanceQuevedo: 24, schedule: 'Diario 8:00-22:00', price: 'Gratis', photo: '@assets/stock_images/modern_brunch_cafe_a_2fe8dd51.jpg', mapsUrl: 'https://maps.google.com/?q=Isla+Cartuja+Sevilla' },

  // BARRIOS
  { id: 'santa_cruz', category: 'neighborhoods', distanceIbarra: 7, distanceQuevedo: 6, schedule: 'Acceso libre 24h', price: 'Gratis', photo: '@assets/stock_images/spanish_traditional__a8531ed5.jpg', mapsUrl: 'https://maps.google.com/?q=Barrio+Santa+Cruz+Sevilla' },
  { id: 'triana', category: 'neighborhoods', distanceIbarra: 8, distanceQuevedo: 10, schedule: 'Acceso libre 24h', price: 'Gratis', photo: '@assets/stock_images/spanish_traditional__70149acc.jpg', mapsUrl: 'https://maps.google.com/?q=Triana+Sevilla' },
  { id: 'macarena', category: 'neighborhoods', distanceIbarra: 15, distanceQuevedo: 13, schedule: 'Acceso libre 24h', price: 'Gratis', photo: '@assets/stock_images/spanish_traditional__f9018bb3.jpg', mapsUrl: 'https://maps.google.com/?q=Barrio+Macarena+Sevilla' },
  { id: 'arenal', category: 'neighborhoods', distanceIbarra: 4, distanceQuevedo: 6, schedule: 'Acceso libre 24h', price: 'Gratis', photo: '@assets/stock_images/modern_brunch_cafe_a_e727f275.jpg', mapsUrl: 'https://maps.google.com/?q=Barrio+Arenal+Sevilla' },
  { id: 'patios', category: 'neighborhoods', distanceIbarra: 10, distanceQuevedo: 8, schedule: 'Variable según patio', price: 'Variable', photo: '@assets/stock_images/spanish_traditional__b4291a21.jpg', mapsUrl: 'https://maps.google.com/?q=Patios+Sevillanos' },
  { id: 'ruta_flamenco', category: 'neighborhoods', distanceIbarra: 5, distanceQuevedo: 4, schedule: 'Tour guiado', price: 'Desde €25', photo: '@assets/stock_images/spanish_paella_seafo_53beca91.jpg', mapsUrl: 'https://maps.google.com/?q=Ruta+Flamenco+Sevilla' },
  { id: 'ruta_romana', category: 'neighborhoods', distanceIbarra: 6, distanceQuevedo: 5, schedule: 'Tour guiado', price: 'Desde €20', photo: '@assets/stock_images/airport_bus_public_t_f8c6b930.jpg', mapsUrl: 'https://maps.google.com/?q=Ruta+Romana+Sevilla' },
  { id: 'ruta_artistas', category: 'neighborhoods', distanceIbarra: 8, distanceQuevedo: 7, schedule: 'Tour guiado', price: 'Desde €20', photo: '@assets/stock_images/hotel_check-in_door__08a6987e.jpg', mapsUrl: 'https://maps.google.com/?q=Ruta+Cervantes+Sevilla' },

  // CULTURA
  { id: 'tablaos', category: 'culture', distanceIbarra: 5, distanceQuevedo: 4, schedule: 'Variable, espectáculos nocturnos', price: 'Desde €25', photo: '@assets/stock_images/customer_service_sup_53d26c13.jpg', mapsUrl: 'https://maps.google.com/?q=Tablaos+Flamencos+Sevilla' },
  { id: 'teatros', category: 'culture', distanceIbarra: 12, distanceQuevedo: 14, schedule: 'Variable según función', price: 'Variable', photo: '@assets/stock_images/seville_spain_touris_9ba3bc69.jpg', mapsUrl: 'https://maps.google.com/?q=Teatro+Maestranza+Sevilla', website: 'https://www.teatrodelamaestranza.es' },
  { id: 'festivales', category: 'culture', distanceIbarra: 0, distanceQuevedo: 0, schedule: 'Según calendario anual', price: 'Variable', photo: '@assets/stock_images/seville_spain_citysc_d2607192.jpg', mapsUrl: 'https://maps.google.com/?q=Festivales+Sevilla' },
  { id: 'experiencias', category: 'culture', distanceIbarra: 9, distanceQuevedo: 8, schedule: 'Variable según actividad', price: 'Desde €15', photo: '@assets/stock_images/elegant_restaurant_f_f15dec49.jpg', mapsUrl: 'https://maps.google.com/?q=Experiencias+Sevilla' },

  // IGLESIAS
  { id: 'macarena', category: 'churches', distanceIbarra: 15, distanceQuevedo: 13, schedule: 'Diario 9:00-14:00 y 17:00-21:00', price: 'Gratis', photo: '@assets/stock_images/spanish_traditional__5f2425d0.jpg', mapsUrl: 'https://maps.google.com/?q=Basilica+Macarena+Sevilla' },
  { id: 'salvador', category: 'churches', distanceIbarra: 4, distanceQuevedo: 3, schedule: 'L-S 11:00-18:00, D 15:00-19:00', price: '€4', photo: '@assets/stock_images/spanish_traditional__60fd4f05.jpg', mapsUrl: 'https://maps.google.com/?q=Iglesia+Salvador+Sevilla' },
  { id: 'santa_paula', category: 'churches', distanceIbarra: 6, distanceQuevedo: 5, schedule: 'M-D 10:00-13:00 y 16:30-18:30', price: '€4', photo: '@assets/stock_images/spanish_traditional__b4291a21.jpg', mapsUrl: 'https://maps.google.com/?q=Convento+Santa+Paula+Sevilla' },
  { id: 'san_luis', category: 'churches', distanceIbarra: 10, distanceQuevedo: 9, schedule: 'M-D 10:00-14:00 y 16:00-20:00', price: '€8', photo: '@assets/stock_images/elegant_restaurant_f_95b165b2.jpg', mapsUrl: 'https://maps.google.com/?q=San+Luis+Franceses+Sevilla', website: 'https://www.sanluisdelosfranceses.es' },

  // TOURS
  { id: 'tours_pie', category: 'tours', distanceIbarra: 0, distanceQuevedo: 0, schedule: 'Varios horarios diarios', price: 'Desde €15', photo: '@assets/stock_images/airport_bus_public_t_f8c6b930.jpg', mapsUrl: 'https://maps.google.com/?q=Free+Tours+Sevilla' },
  { id: 'tours_bici', category: 'tours', distanceIbarra: 0, distanceQuevedo: 0, schedule: 'Varios horarios diarios', price: 'Desde €20', photo: '@assets/stock_images/spanish_paella_seafo_2e59c319.jpg', mapsUrl: 'https://maps.google.com/?q=Bike+Tours+Sevilla' },
  { id: 'cruceros', category: 'tours', distanceIbarra: 6, distanceQuevedo: 8, schedule: 'Salidas cada hora 12:00-20:00', price: 'Desde €18', photo: '@assets/stock_images/seville_spain_touris_9ba3bc69.jpg', mapsUrl: 'https://maps.google.com/?q=Crucero+Guadalquivir+Sevilla', website: 'https://www.crucerosgrandesevilla.com' },
  { id: 'tours_tapas', category: 'tours', distanceIbarra: 0, distanceQuevedo: 0, schedule: 'Tarde/noche', price: 'Desde €30', photo: '@assets/stock_images/spanish_tapas_modern_fa802452.jpg', mapsUrl: 'https://maps.google.com/?q=Tour+Tapas+Sevilla' },
  { id: 'tours_especiales', category: 'tours', distanceIbarra: 0, distanceQuevedo: 0, schedule: 'Variable según tour', price: 'Desde €25', photo: '@assets/stock_images/spanish_traditional__310230e0.jpg', mapsUrl: 'https://maps.google.com/?q=Tours+Sevilla' },

  // MODERNOS
  { id: 'setas', category: 'modern', distanceIbarra: 5, distanceQuevedo: 3, schedule: 'Diario 10:00-23:00', price: '€15', photo: '@assets/stock_images/modern_brunch_cafe_a_e727f275.jpg', mapsUrl: 'https://maps.google.com/?q=Setas+Sevilla', website: 'https://www.setasdesevilla.com' },
  { id: 'pabellones_1929', category: 'modern', distanceIbarra: 18, distanceQuevedo: 20, schedule: 'Acceso libre', price: 'Gratis', photo: '@assets/stock_images/seville_spain_citysc_d2607192.jpg', mapsUrl: 'https://maps.google.com/?q=Plaza+España+Sevilla' },
  { id: 'expo_92', category: 'modern', distanceIbarra: 25, distanceQuevedo: 27, schedule: 'Acceso libre', price: 'Gratis', photo: '@assets/stock_images/modern_brunch_cafe_a_2fe8dd51.jpg', mapsUrl: 'https://maps.google.com/?q=Puente+Alamillo+Sevilla' },
  { id: 'estadios', category: 'modern', distanceIbarra: 30, distanceQuevedo: 32, schedule: 'Tours con reserva', price: 'Desde €12', photo: '@assets/stock_images/hotel_check-in_door__08a6987e.jpg', mapsUrl: 'https://maps.google.com/?q=Estadio+Sevilla' },

  // GASTRONOMÍA
  { id: 'mercados', category: 'gastronomy', distanceIbarra: 8, distanceQuevedo: 6, schedule: 'L-S 9:00-15:00', price: 'Gratis entrada', photo: '@assets/stock_images/spanish_paella_seafo_53beca91.jpg', mapsUrl: 'https://maps.google.com/?q=Mercado+Triana+Sevilla' },
  { id: 'talleres', category: 'gastronomy', distanceIbarra: 0, distanceQuevedo: 0, schedule: 'Variable según taller', price: 'Desde €40', photo: '@assets/stock_images/spanish_tapas_modern_346e78d7.jpg', mapsUrl: 'https://maps.google.com/?q=Talleres+Gastronomia+Sevilla' },
  { id: 'bodegas', category: 'gastronomy', distanceIbarra: 60, distanceQuevedo: 60, schedule: 'Tour con reserva', price: 'Desde €30', photo: '@assets/stock_images/spanish_paella_seafo_e3d9edb9.jpg', mapsUrl: 'https://maps.google.com/?q=Bodegas+Jerez' },
];
