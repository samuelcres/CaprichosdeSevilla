export interface VisitItem {
  name: string;
  description: string;
}

export interface VisitCategory {
  id: string;
  items: VisitItem[];
}

export const visitCategories: VisitCategory[] = [
  {
    id: 'monuments',
    items: [
      {
        name: 'Catedral de Sevilla y Giralda',
        description: 'La catedral gótica más grande del mundo, con la torre almohade reconvertida en campanario',
      },
      {
        name: 'Real Alcázar de Sevilla',
        description: 'Conjunto palaciego mudéjar y renacentista, aún residencia oficial de la Casa Real',
      },
      {
        name: 'Archivo General de Indias',
        description: 'Alberga documentos históricos de la colonización de América',
      },
      {
        name: 'Torre del Oro',
        description: 'Torre defensiva del siglo XIII junto al río Guadalquivir',
      },
      {
        name: 'Murallas y puertas históricas',
        description: 'Como la Puerta de la Macarena o el Arco del Postigo',
      },
    ],
  },
  {
    id: 'museums',
    items: [
      {
        name: 'Museo de Bellas Artes de Sevilla',
        description: 'Segunda pinacoteca más importante de España (Murillo, Zurbarán, Valdés Leal…)',
      },
      {
        name: 'Centro Andaluz de Arte Contemporáneo (CAAC)',
        description: 'Ubicado en el Monasterio de la Cartuja',
      },
      {
        name: 'Museo Arqueológico de Sevilla',
        description: 'Con piezas tartésicas, romanas y árabes, en la Plaza de América',
      },
      {
        name: 'Museo de Artes y Costumbres Populares',
        description: 'Dedicado a la etnografía andaluza',
      },
      {
        name: 'Museo del Baile Flamenco',
        description: 'Fundado por Cristina Hoyos, experiencia inmersiva sobre el arte flamenco',
      },
      {
        name: 'Museo Naval (Torre del Oro)',
        description: 'Exposición sobre la historia marítima de Sevilla',
      },
      {
        name: 'Museo del Castillo de San Jorge',
        description: 'Sobre la Inquisición y la Sevilla medieval',
      },
    ],
  },
  {
    id: 'nature',
    items: [
      {
        name: 'Parque de María Luisa',
        description: 'Jardines históricos con la Plaza de España y la Plaza de América',
      },
      {
        name: 'Jardines de Murillo y Reales Alcázares',
        description: 'Ideales para paseos',
      },
      {
        name: 'Ribera del Guadalquivir',
        description: 'Paseo fluvial con zonas verdes, carriles bici y vistas a Triana',
      },
      {
        name: 'Isla de la Cartuja',
        description: 'Espacios naturales y modernos (Parque del Alamillo, Pabellón del Futuro…)',
      },
    ],
  },
  {
    id: 'neighborhoods',
    items: [
      {
        name: 'Barrio de Santa Cruz',
        description: 'Antiguo barrio judío, calles estrechas y patios sevillanos',
      },
      {
        name: 'Triana',
        description: 'Cuna del flamenco y de la cerámica tradicional',
      },
      {
        name: 'La Macarena',
        description: 'Con su basílica y tramos de muralla',
      },
      {
        name: 'El Arenal',
        description: 'Zona de tradición taurina y marítima',
      },
      {
        name: 'Ruta de los Patios Sevillanos',
        description: 'Recorrido por los tradicionales patios andaluces',
      },
      {
        name: 'Ruta del Flamenco',
        description: 'Descubre los lugares emblemáticos del arte flamenco',
      },
      {
        name: 'Ruta de la Sevilla Romana e Islámica',
        description: 'Viaje por la historia antigua de la ciudad',
      },
      {
        name: 'Ruta de Cervantes o de Murillo',
        description: 'Siguiendo los pasos de grandes artistas sevillanos',
      },
    ],
  },
  {
    id: 'culture',
    items: [
      {
        name: 'Tablaos flamencos',
        description: 'Casa de la Memoria, Los Gallos, El Arenal, Museo del Baile Flamenco',
      },
      {
        name: 'Teatros históricos',
        description: 'Lope de Vega, Teatro de la Maestranza',
      },
      {
        name: 'Festivales',
        description: 'Bienal de Flamenco, Festival de Cine Europeo, Velá de Triana',
      },
      {
        name: 'Experiencias inmersivas',
        description: 'Espectáculos de luces en el Alcázar, visitas teatralizadas o en 3D',
      },
    ],
  },
  {
    id: 'churches',
    items: [
      {
        name: 'Basílica de la Macarena',
        description: 'Icónica basílica sevillana',
      },
      {
        name: 'Iglesia del Salvador',
        description: 'Segunda iglesia más grande de Sevilla',
      },
      {
        name: 'Convento de Santa Paula',
        description: 'Convento histórico con museo',
      },
      {
        name: 'San Luis de los Franceses',
        description: 'Joya barroca restaurada',
      },
    ],
  },
  {
    id: 'tours',
    items: [
      {
        name: 'Tours guiados a pie',
        description: 'Histórico, nocturno o teatralizado',
      },
      {
        name: 'Tours en bicicleta o segway',
        description: 'Descubre Sevilla de forma dinámica',
      },
      {
        name: 'Cruceros por el Guadalquivir',
        description: 'Vista panorámica desde el río',
      },
      {
        name: 'Visitas gastronómicas y de tapas',
        description: 'Conoce la gastronomía local',
      },
      {
        name: 'Visitas fotográficas o en coche de caballos',
        description: 'Experiencias únicas en la ciudad',
      },
    ],
  },
  {
    id: 'modern',
    items: [
      {
        name: 'Metropol Parasol (Las Setas de Sevilla)',
        description: 'Mirador panorámico sobre la ciudad',
      },
      {
        name: 'Pabellones de la Exposición Iberoamericana de 1929',
        description: 'Plaza de España, Plaza de América',
      },
      {
        name: 'Puente del Alamillo y pabellones de la Expo 92',
        description: 'Arquitectura moderna icónica',
      },
      {
        name: 'Estadio Ramón Sánchez Pizjuán y Estadio Benito Villamarín',
        description: 'Visitas guiadas deportivas',
      },
    ],
  },
  {
    id: 'gastronomy',
    items: [
      {
        name: 'Mercados tradicionales',
        description: 'Triana, Lonja del Barranco, Feria o Encarnación',
      },
      {
        name: 'Degustaciones y talleres',
        description: 'Tapas, cocina andaluza, catas de vino, aceite o jamón',
      },
      {
        name: 'Bodegas cercanas',
        description: 'Jerez, Sanlúcar o Carmona',
      },
    ],
  },
];
