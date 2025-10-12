// Visit categories IDs - actual content is in i18n.ts translations
export const visitCategoryIds = [
  'monuments',
  'museums',
  'nature',
  'neighborhoods',
  'churches',
  'modern',
  'gastronomy',
  'culture',
] as const;

export type VisitCategoryId = typeof visitCategoryIds[number];

export interface Visit {
  id: string;
  category: VisitCategoryId;
  distanceIbarra?: number;  // minutes walking from Ibarra
  distanceQuevedo?: number; // minutes walking from Quevedo
  schedule: string;        // Opening hours
  price: string;          // Entry price
  photo?: string;          // Photo path
  mapsUrl?: string;        // Google Maps link
  website?: string;        // Official website
  phone: string;          // Phone number for information
}

// Visit data with practical information - names and descriptions are in i18n.ts
export const visitDetails: Visit[] = [
  // MONUMENTOS HISTÓRICOS Y PATRIMONIALES
  { 
    id: 'catedral', 
    category: 'monuments', 
    distanceIbarra: 8, 
    distanceQuevedo: 7, 
    schedule: 'L-S 11:00-17:00, D 14:30-18:00', 
    price: '€12', 
    photo: '@assets/stock_images/seville_cathedral_gi_af05f5f8.jpg', 
    mapsUrl: 'https://maps.google.com/?q=Catedral+de+Sevilla', 
    website: 'https://www.catedraldesevilla.es', 
    phone: '+34 954 214 971' 
  },
  { 
    id: 'alcazar', 
    category: 'monuments', 
    distanceIbarra: 9, 
    distanceQuevedo: 8, 
    schedule: 'L-D 9:30-17:00', 
    price: '€14.50', 
    photo: '@assets/stock_images/real_alcazar_seville_2ba22877.jpg', 
    mapsUrl: 'https://maps.google.com/?q=Real+Alcazar+Sevilla', 
    website: 'https://www.alcazarsevilla.org', 
    phone: '+34 954 502 324' 
  },
  { 
    id: 'archivo_indias', 
    category: 'monuments', 
    distanceIbarra: 8, 
    distanceQuevedo: 7, 
    schedule: 'M-S 9:30-17:00, D cerrado', 
    price: 'Gratis', 
    photo: '@assets/stock_images/archivo_general_de_i_b6f773b7.jpg', 
    mapsUrl: 'https://maps.google.com/?q=Archivo+de+Indias+Sevilla', 
    phone: '+34 954 500 528' 
  },
  { 
    id: 'torre_oro', 
    category: 'monuments', 
    distanceIbarra: 6, 
    distanceQuevedo: 8, 
    schedule: 'L-V 9:30-18:45, S-D 10:30-18:45', 
    price: '€3', 
    photo: '@assets/stock_images/torre_del_oro_golden_b85ce120.jpg', 
    mapsUrl: 'https://maps.google.com/?q=Torre+del+Oro+Sevilla', 
    phone: '+34 954 222 419' 
  },
  
  // MUSEOS Y CENTROS DE INTERPRETACIÓN
  { 
    id: 'bellas_artes', 
    category: 'museums', 
    distanceIbarra: 10, 
    distanceQuevedo: 9, 
    schedule: 'M 15:00-20:00, X-S 9:00-20:00, D 9:00-15:00', 
    price: 'Gratis UE', 
    photo: '@assets/stock_images/museo_bellas_artes_s_e858bbb3.jpg', 
    mapsUrl: 'https://maps.google.com/?q=Museo+Bellas+Artes+Sevilla', 
    website: 'https://www.museosdeandalucia.es/web/museodebellasartesdesevilla', 
    phone: '+34 955 542 942' 
  },
  { 
    id: 'baile_flamenco', 
    category: 'museums', 
    distanceIbarra: 5, 
    distanceQuevedo: 4, 
    schedule: 'Diario 10:00-19:00', 
    price: '€10', 
    photo: '@assets/stock_images/museo_baile_flamenco_a3281216.jpg', 
    mapsUrl: 'https://maps.google.com/?q=Museo+Baile+Flamenco+Sevilla', 
    website: 'https://www.museoflamenco.com', 
    phone: '+34 954 340 311' 
  },

  // ESPACIOS NATURALES Y JARDINES
  { 
    id: 'maria_luisa', 
    category: 'nature', 
    distanceIbarra: 18, 
    distanceQuevedo: 20, 
    schedule: 'Diario 8:00-22:00', 
    price: 'Gratis', 
    photo: '@assets/stock_images/parque_maria_luisa_s_a5d78d89.jpg', 
    mapsUrl: 'https://maps.google.com/?q=Parque+Maria+Luisa+Sevilla', 
    phone: '+34 954 234 465' 
  },

  // BARRIOS CON ENCANTO Y RUTAS URBANAS
  { 
    id: 'santa_cruz', 
    category: 'neighborhoods', 
    distanceIbarra: 7, 
    distanceQuevedo: 6, 
    schedule: 'Acceso libre 24h', 
    price: 'Gratis', 
    photo: '@assets/stock_images/barrio_santa_cruz_se_31c1be3b.jpg', 
    mapsUrl: 'https://maps.google.com/?q=Barrio+Santa+Cruz+Sevilla', 
    phone: '+34 954 210 005' 
  },
  { 
    id: 'triana', 
    category: 'neighborhoods', 
    distanceIbarra: 8, 
    distanceQuevedo: 10, 
    schedule: 'Acceso libre 24h', 
    price: 'Gratis', 
    photo: '@assets/stock_images/barrio_triana_sevill_22bf8537.jpg', 
    mapsUrl: 'https://maps.google.com/?q=Triana+Sevilla', 
    phone: '+34 954 336 710' 
  },

  // IGLESIAS Y TEMPLOS RELEVANTES
  { 
    id: 'macarena', 
    category: 'churches', 
    distanceIbarra: 15, 
    distanceQuevedo: 13, 
    schedule: 'Diario 9:00-14:00 y 17:00-21:00', 
    price: 'Gratis', 
    photo: '@assets/stock_images/basílica_macarena_se_42e6f2c2.jpg', 
    mapsUrl: 'https://maps.google.com/?q=Basilica+Macarena+Sevilla', 
    phone: '+34 954 901 800' 
  },

  // ESPACIOS MODERNOS Y DE INTERÉS ARQUITECTÓNICO
  { 
    id: 'setas', 
    category: 'modern', 
    distanceIbarra: 5, 
    distanceQuevedo: 3, 
    schedule: 'Diario 10:00-23:00', 
    price: '€15', 
    photo: '@assets/stock_images/metropol_parasol_set_8cd25218.jpg', 
    mapsUrl: 'https://maps.google.com/?q=Setas+Sevilla', 
    website: 'https://www.setasdesevilla.com', 
    phone: '+34 954 560 851' 
  },

  // TURISMO GASTRONÓMICO Y ENOTURISMO
  { 
    id: 'mercados', 
    category: 'gastronomy', 
    distanceIbarra: 8, 
    distanceQuevedo: 6, 
    schedule: 'L-S 9:00-15:00', 
    price: 'Gratis entrada', 
    photo: '@assets/stock_images/mercado_triana_sevil_b65051c9.jpg', 
    mapsUrl: 'https://maps.google.com/?q=Mercado+Triana+Sevilla', 
    phone: '+34 954 334 690' 
  },

  // CULTURA, ESPECTÁCULOS Y EXPERIENCIAS
  { 
    id: 'tablaos', 
    category: 'culture', 
    distanceIbarra: 5, 
    distanceQuevedo: 4, 
    schedule: 'Variable, espectáculos nocturnos', 
    price: 'Desde €25', 
    photo: '@assets/stock_images/flamenco_tablao_show_e674e1c1.jpg', 
    mapsUrl: 'https://maps.google.com/?q=Tablaos+Flamencos+Sevilla', 
    phone: '+34 954 216 981' 
  },
];
