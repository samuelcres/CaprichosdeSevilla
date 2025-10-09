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
  { id: 'catedral', category: 'monuments', distanceIbarra: 8, distanceQuevedo: 7, schedule: 'L-S 11:00-17:00, D 14:30-18:00', price: '€12', photo: '@assets/stock_images/seville_cathedral_gi_b3f01c33.jpg', mapsUrl: 'https://maps.google.com/?q=Catedral+de+Sevilla', website: 'https://www.catedraldesevilla.es', phone: '+34 954 214 971' },
  { id: 'alcazar', category: 'monuments', distanceIbarra: 9, distanceQuevedo: 8, schedule: 'L-D 9:30-17:00', price: '€14.50', photo: '@assets/stock_images/real_alcazar_seville_28d23b78.jpg', mapsUrl: 'https://maps.google.com/?q=Real+Alcazar+Sevilla', website: 'https://www.alcazarsevilla.org', phone: '+34 954 502 324' },
  { id: 'archivo_indias', category: 'monuments', distanceIbarra: 8, distanceQuevedo: 7, schedule: 'M-S 9:30-17:00, D cerrado', price: 'Gratis', photo: '@assets/stock_images/archivo_de_indias_se_be263fb7.jpg', mapsUrl: 'https://maps.google.com/?q=Archivo+de+Indias+Sevilla', phone: '+34 954 500 528' },
  { id: 'torre_oro', category: 'monuments', distanceIbarra: 6, distanceQuevedo: 8, schedule: 'L-V 9:30-18:45, S-D 10:30-18:45', price: '€3', photo: '@assets/stock_images/torre_del_oro_sevill_eefd9c1c.jpg', mapsUrl: 'https://maps.google.com/?q=Torre+del+Oro+Sevilla', phone: '+34 954 222 419' },
  { id: 'murallas', category: 'monuments', distanceIbarra: 12, distanceQuevedo: 10, schedule: 'Acceso libre', price: 'Gratis', photo: '@assets/stock_images/ancient_city_walls_s_c1cb5200.jpg', mapsUrl: 'https://maps.google.com/?q=Murallas+Sevilla', phone: '+34 955 471 232' },
  
  // MUSEOS
  { id: 'bellas_artes', category: 'museums', distanceIbarra: 10, distanceQuevedo: 9, schedule: 'M 15:00-20:00, X-S 9:00-20:00, D 9:00-15:00', price: 'Gratis UE', photo: '@assets/stock_images/museum_of_fine_arts__42b2ead7.jpg', mapsUrl: 'https://maps.google.com/?q=Museo+Bellas+Artes+Sevilla', website: 'https://www.museosdeandalucia.es/web/museodebellasartesdesevilla', phone: '+34 955 542 942' },
  { id: 'caac', category: 'museums', distanceIbarra: 25, distanceQuevedo: 27, schedule: 'M-S 11:00-21:00, D 10:00-15:30', price: 'Gratis UE', photo: '@assets/stock_images/caac_contemporary_ar_657e729f.jpg', mapsUrl: 'https://maps.google.com/?q=CAAC+Sevilla', website: 'https://www.caac.es', phone: '+34 955 037 070' },
  { id: 'arqueologico', category: 'museums', distanceIbarra: 20, distanceQuevedo: 22, schedule: 'M 15:00-20:00, X-S 9:00-20:00, D 9:00-15:00', price: 'Gratis UE', photo: '@assets/stock_images/archaeological_museu_bfee1d03.jpg', mapsUrl: 'https://maps.google.com/?q=Museo+Arqueologico+Sevilla', phone: '+34 954 786 474' },
  { id: 'costumbres', category: 'museums', distanceIbarra: 20, distanceQuevedo: 22, schedule: 'M 15:00-20:00, X-S 9:00-20:00, D 9:00-15:00', price: 'Gratis UE', photo: '@assets/stock_images/museum_arts_and_trad_891dc284.jpg', mapsUrl: 'https://maps.google.com/?q=Museo+Artes+Costumbres+Sevilla', phone: '+34 954 712 391' },
  { id: 'baile_flamenco', category: 'museums', distanceIbarra: 5, distanceQuevedo: 4, schedule: 'Diario 10:00-19:00', price: '€10', photo: '@assets/stock_images/flamenco_dance_museu_7f409b2a.jpg', mapsUrl: 'https://maps.google.com/?q=Museo+Baile+Flamenco+Sevilla', website: 'https://www.museoflamenco.com', phone: '+34 954 340 311' },
  { id: 'naval', category: 'museums', distanceIbarra: 6, distanceQuevedo: 8, schedule: 'L-V 9:30-18:45, S-D 10:30-18:45', price: '€3', photo: '@assets/stock_images/naval_museum_torre_d_0a944c8c.jpg', mapsUrl: 'https://maps.google.com/?q=Museo+Naval+Sevilla', phone: '+34 954 223 945' },
  { id: 'san_jorge', category: 'museums', distanceIbarra: 3, distanceQuevedo: 5, schedule: 'M-S 10:00-14:00 y 16:00-20:00', price: 'Gratis', photo: '@assets/stock_images/castillo_san_jorge_s_1f2c4e39.jpg', mapsUrl: 'https://maps.google.com/?q=Castillo+San+Jorge+Sevilla', phone: '+34 955 471 580' },

  // NATURALEZA
  { id: 'maria_luisa', category: 'nature', distanceIbarra: 18, distanceQuevedo: 20, schedule: 'Diario 8:00-22:00', price: 'Gratis', photo: '@assets/stock_images/parque_maria_luisa_s_cd31317a.jpg', mapsUrl: 'https://maps.google.com/?q=Parque+Maria+Luisa+Sevilla', phone: '+34 954 234 465' },
  { id: 'jardines_murillo', category: 'nature', distanceIbarra: 10, distanceQuevedo: 9, schedule: 'Diario 8:00-22:00', price: 'Gratis', photo: '@assets/stock_images/jardines_murillo_sev_28a94786.jpg', mapsUrl: 'https://maps.google.com/?q=Jardines+Murillo+Sevilla', phone: '+34 955 473 290' },
  { id: 'guadalquivir', category: 'nature', distanceIbarra: 5, distanceQuevedo: 7, schedule: 'Acceso libre 24h', price: 'Gratis', photo: '@assets/stock_images/guadalquivir_river_s_9671d9d3.jpg', mapsUrl: 'https://maps.google.com/?q=Ribera+Guadalquivir+Sevilla', phone: '+34 954 591 347' },
  { id: 'cartuja', category: 'nature', distanceIbarra: 22, distanceQuevedo: 24, schedule: 'Diario 8:00-22:00', price: 'Gratis', photo: '@assets/stock_images/isla_cartuja_seville_0bdee3f1.jpg', mapsUrl: 'https://maps.google.com/?q=Isla+Cartuja+Sevilla', phone: '+34 955 037 620' },

  // BARRIOS
  { id: 'santa_cruz', category: 'neighborhoods', distanceIbarra: 7, distanceQuevedo: 6, schedule: 'Acceso libre 24h', price: 'Gratis', photo: '@assets/stock_images/santa_cruz_neighborh_8b5e10b0.jpg', mapsUrl: 'https://maps.google.com/?q=Barrio+Santa+Cruz+Sevilla', phone: '+34 954 210 005' },
  { id: 'triana', category: 'neighborhoods', distanceIbarra: 8, distanceQuevedo: 10, schedule: 'Acceso libre 24h', price: 'Gratis', photo: '@assets/stock_images/triana_neighborhood__b5185fb9.jpg', mapsUrl: 'https://maps.google.com/?q=Triana+Sevilla', phone: '+34 954 336 710' },
  { id: 'macarena', category: 'neighborhoods', distanceIbarra: 15, distanceQuevedo: 13, schedule: 'Acceso libre 24h', price: 'Gratis', photo: '@assets/stock_images/macarena_neighborhoo_3d5648c6.jpg', mapsUrl: 'https://maps.google.com/?q=Barrio+Macarena+Sevilla', phone: '+34 955 901 800' },
  { id: 'arenal', category: 'neighborhoods', distanceIbarra: 4, distanceQuevedo: 6, schedule: 'Acceso libre 24h', price: 'Gratis', photo: '@assets/stock_images/arenal_neighborhood__7cf3acf5.jpg', mapsUrl: 'https://maps.google.com/?q=Barrio+Arenal+Sevilla', phone: '+34 954 221 404' },
  { id: 'patios', category: 'neighborhoods', distanceIbarra: 10, distanceQuevedo: 8, schedule: 'Variable según patio', price: 'Variable', photo: '@assets/stock_images/seville_traditional__dd08ac97.jpg', mapsUrl: 'https://maps.google.com/?q=Patios+Sevillanos', phone: '+34 955 470 822' },
  { id: 'ruta_flamenco', category: 'neighborhoods', distanceIbarra: 5, distanceQuevedo: 4, schedule: 'Tour guiado', price: 'Desde €25', photo: '@assets/stock_images/flamenco_performance_31f9eb05.jpg', mapsUrl: 'https://maps.google.com/?q=Ruta+Flamenco+Sevilla', phone: '+34 954 563 288' },
  { id: 'ruta_romana', category: 'neighborhoods', distanceIbarra: 6, distanceQuevedo: 5, schedule: 'Tour guiado', price: 'Desde €20', photo: '@assets/stock_images/roman_ruins_ancient__919f60c9.jpg', mapsUrl: 'https://maps.google.com/?q=Ruta+Romana+Sevilla', phone: '+34 955 472 106' },
  { id: 'ruta_artistas', category: 'neighborhoods', distanceIbarra: 8, distanceQuevedo: 7, schedule: 'Tour guiado', price: 'Desde €20', photo: '@assets/stock_images/seville_artists_cerv_30a341cb.jpg', mapsUrl: 'https://maps.google.com/?q=Ruta+Cervantes+Sevilla', phone: '+34 954 418 955' },

  // CULTURA
  { id: 'tablaos', category: 'culture', distanceIbarra: 5, distanceQuevedo: 4, schedule: 'Variable, espectáculos nocturnos', price: 'Desde €25', photo: '@assets/stock_images/flamenco_tablao_show_79735d3c.jpg', mapsUrl: 'https://maps.google.com/?q=Tablaos+Flamencos+Sevilla', phone: '+34 954 216 981' },
  { id: 'teatros', category: 'culture', distanceIbarra: 12, distanceQuevedo: 14, schedule: 'Variable según función', price: 'Variable', photo: '@assets/stock_images/teatro_maestranza_se_f5c74711.jpg', mapsUrl: 'https://maps.google.com/?q=Teatro+Maestranza+Sevilla', website: 'https://www.teatrodelamaestranza.es', phone: '+34 954 223 344' },
  { id: 'festivales', category: 'culture', distanceIbarra: 0, distanceQuevedo: 0, schedule: 'Según calendario anual', price: 'Variable', photo: '@assets/stock_images/seville_festivals_se_9b331bbf.jpg', mapsUrl: 'https://maps.google.com/?q=Festivales+Sevilla', phone: '+34 955 010 010' },
  { id: 'experiencias', category: 'culture', distanceIbarra: 9, distanceQuevedo: 8, schedule: 'Variable según actividad', price: 'Desde €15', photo: '@assets/stock_images/cultural_experiences_64912c13.jpg', mapsUrl: 'https://maps.google.com/?q=Experiencias+Sevilla', phone: '+34 954 502 993' },

  // IGLESIAS
  { id: 'macarena', category: 'churches', distanceIbarra: 15, distanceQuevedo: 13, schedule: 'Diario 9:00-14:00 y 17:00-21:00', price: 'Gratis', photo: '@assets/stock_images/basilica_macarena_se_3b584568.jpg', mapsUrl: 'https://maps.google.com/?q=Basilica+Macarena+Sevilla', phone: '+34 954 901 800' },
  { id: 'salvador', category: 'churches', distanceIbarra: 4, distanceQuevedo: 3, schedule: 'L-S 11:00-18:00, D 15:00-19:00', price: '€4', photo: '@assets/stock_images/iglesia_salvador_sev_e695cfb0.jpg', mapsUrl: 'https://maps.google.com/?q=Iglesia+Salvador+Sevilla', phone: '+34 954 211 679' },
  { id: 'santa_paula', category: 'churches', distanceIbarra: 6, distanceQuevedo: 5, schedule: 'M-D 10:00-13:00 y 16:30-18:30', price: '€4', photo: '@assets/stock_images/convento_santa_paula_6d050cb9.jpg', mapsUrl: 'https://maps.google.com/?q=Convento+Santa+Paula+Sevilla', phone: '+34 954 536 330' },
  { id: 'san_luis', category: 'churches', distanceIbarra: 10, distanceQuevedo: 9, schedule: 'M-D 10:00-14:00 y 16:00-20:00', price: '€8', photo: '@assets/stock_images/san_luis_franceses_s_54af1241.jpg', mapsUrl: 'https://maps.google.com/?q=San+Luis+Franceses+Sevilla', website: 'https://www.sanluisdelosfranceses.es', phone: '+34 955 220 207' },

  // TOURS
  { id: 'tours_pie', category: 'tours', distanceIbarra: 0, distanceQuevedo: 0, schedule: 'Varios horarios diarios', price: 'Desde €15', photo: '@assets/stock_images/walking_tour_guide_s_7294995b.jpg', mapsUrl: 'https://maps.google.com/?q=Free+Tours+Sevilla', phone: '+34 954 229 160' },
  { id: 'tours_bici', category: 'tours', distanceIbarra: 0, distanceQuevedo: 0, schedule: 'Varios horarios diarios', price: 'Desde €20', photo: '@assets/stock_images/bicycle_tour_seville_77b414b6.jpg', mapsUrl: 'https://maps.google.com/?q=Bike+Tours+Sevilla', phone: '+34 955 514 795' },
  { id: 'cruceros', category: 'tours', distanceIbarra: 6, distanceQuevedo: 8, schedule: 'Salidas cada hora 12:00-20:00', price: 'Desde €18', photo: '@assets/stock_images/guadalquivir_river_c_a38157ef.jpg', mapsUrl: 'https://maps.google.com/?q=Crucero+Guadalquivir+Sevilla', website: 'https://www.crucerosgrandesevilla.com', phone: '+34 954 561 692' },
  { id: 'tours_tapas', category: 'tours', distanceIbarra: 0, distanceQuevedo: 0, schedule: 'Tarde/noche', price: 'Desde €30', photo: '@assets/stock_images/tapas_tour_seville_f_4a8731dc.jpg', mapsUrl: 'https://maps.google.com/?q=Tour+Tapas+Sevilla', phone: '+34 954 326 813' },
  { id: 'tours_especiales', category: 'tours', distanceIbarra: 0, distanceQuevedo: 0, schedule: 'Variable según tour', price: 'Desde €25', photo: '@assets/stock_images/special_themed_tour__e74cf839.jpg', mapsUrl: 'https://maps.google.com/?q=Tours+Sevilla', phone: '+34 955 623 457' },

  // MODERNOS
  { id: 'setas', category: 'modern', distanceIbarra: 5, distanceQuevedo: 3, schedule: 'Diario 10:00-23:00', price: '€15', photo: '@assets/stock_images/metropol_parasol_set_1042b8e1.jpg', mapsUrl: 'https://maps.google.com/?q=Setas+Sevilla', website: 'https://www.setasdesevilla.com', phone: '+34 954 560 851' },
  { id: 'pabellones_1929', category: 'modern', distanceIbarra: 18, distanceQuevedo: 20, schedule: 'Acceso libre', price: 'Gratis', photo: '@assets/stock_images/plaza_españa_seville_a5fb8922.jpg', mapsUrl: 'https://maps.google.com/?q=Plaza+España+Sevilla', phone: '+34 955 471 232' },
  { id: 'expo_92', category: 'modern', distanceIbarra: 25, distanceQuevedo: 27, schedule: 'Acceso libre', price: 'Gratis', photo: '@assets/stock_images/alamillo_bridge_sevi_0acc0e1b.jpg', mapsUrl: 'https://maps.google.com/?q=Puente+Alamillo+Sevilla', phone: '+34 955 037 099' },
  { id: 'estadios', category: 'modern', distanceIbarra: 30, distanceQuevedo: 32, schedule: 'Tours con reserva', price: 'Desde €12', photo: '@assets/stock_images/football_stadium_sev_68eecaa5.jpg', mapsUrl: 'https://maps.google.com/?q=Estadio+Sevilla', phone: '+34 954 535 353' },

  // GASTRONOMÍA
  { id: 'mercados', category: 'gastronomy', distanceIbarra: 8, distanceQuevedo: 6, schedule: 'L-S 9:00-15:00', price: 'Gratis entrada', photo: '@assets/stock_images/triana_market_sevill_13129c62.jpg', mapsUrl: 'https://maps.google.com/?q=Mercado+Triana+Sevilla', phone: '+34 954 334 690' },
  { id: 'talleres', category: 'gastronomy', distanceIbarra: 0, distanceQuevedo: 0, schedule: 'Variable según taller', price: 'Desde €40', photo: '@assets/stock_images/cooking_class_worksh_187c3c78.jpg', mapsUrl: 'https://maps.google.com/?q=Talleres+Gastronomia+Sevilla', phone: '+34 955 473 812' },
  { id: 'bodegas', category: 'gastronomy', distanceIbarra: 60, distanceQuevedo: 60, schedule: 'Tour con reserva', price: 'Desde €30', photo: '@assets/stock_images/jerez_wine_cellar_bo_802bd96e.jpg', mapsUrl: 'https://maps.google.com/?q=Bodegas+Jerez', phone: '+34 956 151 500' },
];
