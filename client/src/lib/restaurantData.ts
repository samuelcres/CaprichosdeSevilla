import type { Language } from '@/lib/i18n';

// Recomendaciones gastronómicas revisadas el 24/11/2026 con Google Maps
// (solo sitios con 4,3 o más y a pocos minutos a pie del apartamento).
// Las distancias se calculan a partir de las coordenadas; la nota real
// la pone Google en vivo cuando está la clave (no hay notas escritas a mano).
// Fotos: Unsplash (licencia libre), representativas del tipo de sitio o de
// su plato más conocido. Si hay clave de Google, se muestra la foto real.

type L = Record<Language, string>;
type Category = 'breakfast' | 'lunch' | 'cafeterias' | 'dinner';

const photos = import.meta.glob('../../../attached_assets/restaurants/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
const photo = (id: string) => photos[`../../../attached_assets/restaurants/${id}.webp`];

const T = (es: string, en: string, fr: string, de: string, it: string, zh: string): L => ({ es, en, fr, de, it, zh });

interface Place {
  id: string;
  name: string;
  lat: number;
  lng: number;
  placeId: string;
  priceLevel: 'low' | 'medium' | 'high';
  phone?: string;
  website?: string;
  desc: L;
  dishes?: L;
}

export interface Restaurant extends Place {
  /** Foto del local (Wikimedia Commons) cuando no hay foto de Google. */
  localPhoto?: { src: string; credit: string };
  category: Category;
  /** Minutos a pie desde el apartamento (estimados con las coordenadas). */
  distance: number;
  mapsUrl: string;
  photo?: string;
  description: string; // español (para compatibilidad)
}

const P: Record<string, Place> = {
  // ───────────── Cerca de Ibarra ─────────────
  baralfalfa: {
    id: 'baralfalfa', name: 'Bar Alfalfa', lat: 37.3899841, lng: -5.9901075, placeId: 'ChIJB5y8PRtsEg0Rn6L45ueUgPI', priceLevel: 'low', phone: '+34 954 22 23 44',
    desc: T('Bar de barrio pequeño y con mucho ambiente. Desayunos desde las 9:00 y tapas todo el día; suele haber algo de cola.',
      'Small, lively neighbourhood bar. Breakfast from 9:00 and tapas all day; expect a short queue.',
      'Petit bar de quartier très animé. Petit-déjeuner dès 9h et tapas toute la journée ; souvent un peu d’attente.',
      'Kleine, lebhafte Nachbarschaftsbar. Frühstück ab 9 Uhr und den ganzen Tag Tapas; oft kurze Wartezeit.',
      'Piccolo bar di quartiere molto vivace. Colazione dalle 9:00 e tapas tutto il giorno; spesso un po’ di fila.',
      '热闹的小型街区酒吧。9点起供应早餐，全天供应 tapas，常需稍等。'),
    dishes: T('Tostada con tomate y jamón, carrillada ibérica, salmorejo', 'Toast with tomato and ham, Iberian pork cheek, salmorejo', 'Tartine tomate-jambon, joue de porc ibérique, salmorejo', 'Toast mit Tomate und Schinken, iberische Schweinebäckchen, Salmorejo', 'Pane tostato con pomodoro e prosciutto, guancia iberica, salmorejo', '番茄火腿吐司、伊比利亚猪脸肉、萨尔莫雷霍冷汤'),
  },
  nini: {
    id: 'nini', name: 'Niní Specialty Coffee & Bakery', lat: 37.3895158, lng: -5.9899294, placeId: 'ChIJw9dnlOptEg0RCG9nWsyjATM', priceLevel: 'low',
    desc: T('Café de especialidad y bollería casera a dos minutos del apartamento. Abre todos los días de 8:00 a 20:00.',
      'Specialty coffee and home-made pastries two minutes from the apartment. Open daily 8:00–20:00.',
      'Café de spécialité et viennoiseries maison à deux minutes de l’appartement. Ouvert tous les jours de 8h à 20h.',
      'Specialty Coffee und hausgemachtes Gebäck, zwei Minuten von der Wohnung. Täglich 8–20 Uhr.',
      'Caffè specialty e dolci fatti in casa a due minuti dall’appartamento. Aperto tutti i giorni 8:00–20:00.',
      '距公寓两分钟的精品咖啡和自制烘焙店，每天 8:00–20:00 营业。'),
    dishes: T('Latte, medialunas, tarta de manzana, bollo de crema de pistacho', 'Latte, medialunas, apple tart, pistachio cream bun', 'Latte, medialunas, tarte aux pommes, brioche à la crème de pistache', 'Latte, Medialunas, Apfeltarte, Pistaziencreme-Brötchen', 'Latte, medialunas, torta di mele, brioche alla crema di pistacchio', '拿铁、阿根廷牛角包、苹果挞、开心果奶油面包'),
  },
  moya: {
    id: 'moya', name: 'MOYA Brunch', lat: 37.3862533, lng: -5.9873507, placeId: 'ChIJv1xP79ZtEg0RXSlfFULriA4', priceLevel: 'low', phone: '+34 854 71 23 30',
    desc: T('Brunch en Santa María la Blanca con local bonito y buen café. Sin reserva; de 8:00 a 16:00 (fines de semana hasta las 20:00).',
      'Brunch spot on Santa María la Blanca with a lovely room and good coffee. No booking needed; 8:00–16:00 (weekends until 20:00).',
      'Brunch rue Santa María la Blanca, joli cadre et bon café. Sans réservation ; 8h–16h (week-end jusqu’à 20h).',
      'Brunch in der Santa María la Blanca, schönes Lokal, guter Kaffee. Ohne Reservierung; 8–16 Uhr (Wochenende bis 20 Uhr).',
      'Brunch in Santa María la Blanca, locale curato e buon caffè. Senza prenotazione; 8:00–16:00 (weekend fino alle 20:00).',
      '位于 Santa María la Blanca 街的早午餐店，环境漂亮，咖啡好。无需预订；8:00–16:00（周末至 20:00）。'),
    dishes: T('Bowl de açaí, tostada de aguacate con huevos, smash burger', 'Açaí bowl, avocado toast with eggs, smash burger', 'Bowl d’açaí, avocado toast aux œufs, smash burger', 'Açaí-Bowl, Avocado-Toast mit Eiern, Smash Burger', 'Açaí bowl, avocado toast con uova, smash burger', '巴西莓碗、牛油果鸡蛋吐司、压扁汉堡'),
  },
  lamala: {
    id: 'lamala', name: 'La Mala Brunch Santa Cruz', lat: 37.3856364, lng: -5.9865006, placeId: 'ChIJP7_wybltEg0R2gw7hphtTy8', priceLevel: 'low', phone: '+34 636 94 33 23',
    desc: T('Uno de los brunch mejor valorados del centro, con muchas opciones vegetarianas y veganas. Todos los días de 8:30 a 19:00.',
      'One of the best-rated brunch places in the centre, with plenty of vegetarian and vegan options. Daily 8:30–19:00.',
      'L’un des brunchs les mieux notés du centre, avec beaucoup d’options végétariennes et véganes. Tous les jours 8h30–19h.',
      'Einer der bestbewerteten Brunch-Orte im Zentrum, viele vegetarische und vegane Optionen. Täglich 8:30–19 Uhr.',
      'Uno dei brunch più apprezzati del centro, con molte opzioni vegetariane e vegane. Tutti i giorni 8:30–19:00.',
      '市中心评分最高的早午餐店之一，素食和纯素选择多。每天 8:30–19:00。'),
    dishes: T('Huevos benedictinos, tostada de pesto y mozzarella, poke bowl', 'Eggs Benedict, pesto and mozzarella toast, poke bowl', 'Œufs Bénédicte, tartine pesto-mozzarella, poke bowl', 'Eggs Benedict, Pesto-Mozzarella-Toast, Poke Bowl', 'Uova alla Benedict, toast pesto e mozzarella, poke bowl', '班尼迪克蛋、青酱马苏里拉吐司、波奇碗'),
  },
  casamoreno: {
    id: 'casamoreno', name: 'Casa Moreno', lat: 37.3874292, lng: -5.995899, placeId: 'ChIJ1cbU5RBsEg0R0f6LShz1phs', priceLevel: 'low', phone: '+34 618 55 69 54',
    desc: T('Ultramarinos de toda la vida con una barra al fondo y carteles taurinos. Bocadillos hasta las 12:00 y después montaditos. Sábado solo a mediodía; domingo cerrado.',
      'Old-school grocery with a small bar at the back and bullfighting posters. Sandwiches until 12:00, then montaditos. Saturday lunchtime only; closed Sunday.',
      'Épicerie d’antan avec un petit bar au fond et des affiches taurines. Sandwichs jusqu’à 12h, puis montaditos. Samedi midi uniquement ; fermé le dimanche.',
      'Traditioneller Feinkostladen mit kleiner Bar hinten und Stierkampfplakaten. Bis 12 Uhr Bocadillos, danach Montaditos. Samstag nur mittags; sonntags geschlossen.',
      'Drogheria storica con un piccolo bancone in fondo e manifesti taurini. Panini fino alle 12:00, poi montaditos. Sabato solo a pranzo; domenica chiuso.',
      '老式杂货店，店后有小吧台，墙上挂满斗牛海报。12点前卖三明治，之后供应小面包 montaditos。周六仅午间营业，周日休息。'),
    dishes: T('Montaditos de jamón y de queso, vermut', 'Ham and cheese montaditos, vermouth', 'Montaditos au jambon et au fromage, vermouth', 'Montaditos mit Schinken und Käse, Wermut', 'Montaditos al prosciutto e al formaggio, vermut', '火腿和奶酪小面包、苦艾酒'),
  },
  mokambo: {
    id: 'mokambo', name: 'MOKAMBO Plaza Nueva', lat: 37.3879368, lng: -5.9953046, placeId: 'ChIJ_25e3oBtEg0RzpXjzfb1ZM8', priceLevel: 'low', phone: '+34 955 46 15 40',
    desc: T('Brunch junto a Plaza Nueva, con local muy cuidado y opciones sin gluten. Todos los días de 9:00 a 15:00 (no abre por la tarde).',
      'Brunch next to Plaza Nueva, with a stylish room and gluten-free options. Daily 9:00–15:00 (closed in the afternoon).',
      'Brunch près de la Plaza Nueva, cadre soigné et options sans gluten. Tous les jours 9h–15h (fermé l’après-midi).',
      'Brunch an der Plaza Nueva, schönes Lokal, glutenfreie Optionen. Täglich 9–15 Uhr (nachmittags geschlossen).',
      'Brunch vicino a Plaza Nueva, locale curato e opzioni senza glutine. Tutti i giorni 9:00–15:00 (chiuso il pomeriggio).',
      '新广场旁的早午餐店，装修讲究，有无麸质选择。每天 9:00–15:00（下午不营业）。'),
    dishes: T('Huevos benedictinos con pastrami, tortitas, bowl de açaí', 'Eggs Benedict with pastrami, pancakes, açaí bowl', 'Œufs Bénédicte au pastrami, pancakes, bowl d’açaí', 'Eggs Benedict mit Pastrami, Pancakes, Açaí-Bowl', 'Uova alla Benedict con pastrami, pancake, açaí bowl', '烟熏牛肉班尼迪克蛋、松饼、巴西莓碗'),
  },
  labartola: {
    id: 'labartola', name: 'La Bartola', lat: 37.3876651, lng: -5.9885385, placeId: 'ChIJZxeYDxxsEg0R4CLguqWIJIo', priceLevel: 'low',
    desc: T('Tapas creativas a buen precio, en la calle San José, a dos minutos del apartamento. De 12:00 a 0:00; por la noche se llena, mejor reservar.',
      'Creative, good-value tapas on Calle San José, two minutes from the apartment. 12:00–24:00; busy at night, best to book.',
      'Tapas créatives à bon prix, rue San José, à deux minutes de l’appartement. 12h–minuit ; plein le soir, mieux vaut réserver.',
      'Kreative, günstige Tapas in der Calle San José, zwei Minuten von der Wohnung. 12–24 Uhr; abends voll, besser reservieren.',
      'Tapas creative a buon prezzo in calle San José, a due minuti dall’appartamento. 12:00–24:00; la sera è pieno, meglio prenotare.',
      '圣何塞街的创意 tapas，价格实惠，距公寓两分钟。12:00–24:00；晚上人多，建议预订。'),
    dishes: T('Pulpo a la brasa, carrillada, ternera retinta, salmorejo', 'Grilled octopus, pork cheek, retinta beef, salmorejo', 'Poulpe grillé, joue de porc, bœuf retinta, salmorejo', 'Gegrillter Oktopus, Schweinebäckchen, Retinta-Rind, Salmorejo', 'Polpo alla brace, guancia, manzo retinto, salmorejo', '炭烤章鱼、猪脸肉、雷蒂恩塔牛肉、萨尔莫雷霍冷汤'),
  },
  elpasaje: {
    id: 'elpasaje', name: 'El Pasaje Santa María la Blanca', lat: 37.3865882, lng: -5.9882948, placeId: 'ChIJKfF9BhxsEg0RTaW7tjtX_34', priceLevel: 'medium', phone: '+34 954 21 77 78',
    desc: T('Cocina andaluza actualizada en un local más grande de lo que parece. Todos los días desde las 13:00.',
      'Updated Andalusian cooking in a room bigger than it looks. Daily from 13:00.',
      'Cuisine andalouse revisitée, dans une salle plus grande qu’il n’y paraît. Tous les jours dès 13h.',
      'Moderne andalusische Küche in einem Lokal, das größer ist, als es aussieht. Täglich ab 13 Uhr.',
      'Cucina andalusa rivisitata in un locale più grande di quanto sembri. Tutti i giorni dalle 13:00.',
      '改良安达卢西亚菜，店内比外观看起来大。每天 13:00 起营业。'),
    dishes: T('Lasaña crujiente de carrillada, bacalao confitado, tarta de queso', 'Crispy pork-cheek lasagne, confit cod, cheesecake', 'Lasagne croustillante de joue de porc, cabillaud confit, cheesecake', 'Knusprige Lasagne mit Schweinebäckchen, confierter Kabeljau, Käsekuchen', 'Lasagna croccante di guancia, baccalà confit, cheesecake', '脆皮猪脸肉千层面、油封鳕鱼、芝士蛋糕'),
  },
  casamikva: {
    id: 'casamikva', name: 'Casa Mikva', lat: 37.38633, lng: -5.9874624, placeId: 'ChIJ9Sf7R2JtEg0RSLQyiX1sl-A', priceLevel: 'medium', phone: '+34 954 96 86 86',
    desc: T('Cocina sefardí en la antigua judería, frente a la iglesia de Santa María la Blanca. Abre desde las 8:30; la cocina cierra de 12:00 a 13:00.',
      'Sephardic cooking in the old Jewish quarter, opposite Santa María la Blanca church. Open from 8:30; the kitchen closes 12:00–13:00.',
      'Cuisine séfarade dans l’ancien quartier juif, face à l’église Santa María la Blanca. Ouvert dès 8h30 ; cuisine fermée de 12h à 13h.',
      'Sephardische Küche im alten jüdischen Viertel, gegenüber der Kirche Santa María la Blanca. Ab 8:30; Küche 12–13 Uhr geschlossen.',
      'Cucina sefardita nell’antico quartiere ebraico, di fronte alla chiesa di Santa María la Blanca. Dalle 8:30; cucina chiusa 12:00–13:00.',
      '位于旧犹太区、圣玛丽亚·拉布兰卡教堂对面的塞法迪犹太菜。8:30 起营业；厨房 12:00–13:00 休息。'),
    dishes: T('Shakshuka, espinacas con garbanzos, atún rojo, postres caseros', 'Shakshuka, spinach with chickpeas, bluefin tuna, home-made desserts', 'Chakchouka, épinards aux pois chiches, thon rouge, desserts maison', 'Shakshuka, Spinat mit Kichererbsen, Roter Thun, hausgemachte Desserts', 'Shakshuka, spinaci con ceci, tonno rosso, dolci della casa', '北非蛋、鹰嘴豆菠菜、蓝鳍金枪鱼、自制甜点'),
  },
  pesciolino: {
    id: 'pesciolino', name: 'Il Pesciolino', lat: 37.3861869, lng: -5.990735, placeId: 'ChIJcT7olcNtEg0RfN4KDwTyoZo', priceLevel: 'medium', phone: '+34 954 22 73 09',
    desc: T('Pescados y mariscos en Mateos Gago, a dos minutos de la Catedral, con terraza. Conviene reservar.',
      'Fish and seafood on Mateos Gago, two minutes from the Cathedral, with a terrace. Booking recommended.',
      'Poissons et fruits de mer rue Mateos Gago, à deux minutes de la cathédrale, avec terrasse. Réservation conseillée.',
      'Fisch und Meeresfrüchte in der Mateos Gago, zwei Minuten von der Kathedrale, mit Terrasse. Reservierung empfohlen.',
      'Pesce e frutti di mare in calle Mateos Gago, a due minuti dalla Cattedrale, con terrazza. Meglio prenotare.',
      'Mateos Gago 街的海鲜餐厅，距大教堂两分钟，有露台。建议预订。'),
    dishes: T('Ostras, ceviche de salmón, pasta con marisco, paella', 'Oysters, salmon ceviche, seafood pasta, paella', 'Huîtres, ceviche de saumon, pâtes aux fruits de mer, paella', 'Austern, Lachs-Ceviche, Pasta mit Meeresfrüchten, Paella', 'Ostriche, ceviche di salmone, pasta ai frutti di mare, paella', '生蚝、三文鱼酸橘汁腌鱼、海鲜意面、海鲜饭'),
  },
  columnas: {
    id: 'columnas', name: 'Bodega Santa Cruz «Las Columnas»', lat: 37.38602, lng: -5.9907614, placeId: 'ChIJr6w91htsEg0RJ7OrcxZD8Eg', priceLevel: 'low',
    desc: T('El bar de tapas de pie más sevillano del barrio de Santa Cruz: siempre lleno, barato y con mucho ambiente. Abre de 8:00 a 0:00.',
      'Santa Cruz’s most Sevillian standing tapas bar: always packed, cheap and lively. Open 8:00–24:00.',
      'Le bar à tapas debout le plus sévillan de Santa Cruz : toujours plein, bon marché et animé. Ouvert 8h–minuit.',
      'Die sevillanischste Stehbar im Viertel Santa Cruz: immer voll, günstig und lebhaft. 8–24 Uhr.',
      'Il bar di tapas in piedi più sivigliano di Santa Cruz: sempre pieno, economico e vivace. Aperto 8:00–24:00.',
      '圣十字区最地道的站立式 tapas 酒吧：总是满座、便宜又热闹。8:00–24:00。'),
    dishes: T('Montaditos, carrillada, pringá, cerveza bien fría', 'Montaditos, pork cheek, pringá, ice-cold beer', 'Montaditos, joue de porc, pringá, bière bien fraîche', 'Montaditos, Schweinebäckchen, Pringá, eiskaltes Bier', 'Montaditos, guancia, pringá, birra ghiacciata', '小面包、猪脸肉、炖肉夹饼、冰啤酒'),
  },
  ovejas: {
    id: 'ovejas', name: 'Ovejas Negras', lat: 37.3876008, lng: -5.9937179, placeId: 'ChIJW5DldhpsEg0R2aXwWtE2Yso', priceLevel: 'low', phone: '+34 955 12 38 11',
    desc: T('Tapas de fusión en Hernando Colón, muy popular: sin reserva puede haber bastante espera. Desde las 12:30.',
      'Popular fusion tapas on Hernando Colón; without a booking the wait can be long. From 12:30.',
      'Tapas fusion très populaires rue Hernando Colón ; sans réservation, l’attente peut être longue. Dès 12h30.',
      'Beliebte Fusion-Tapas in der Hernando Colón; ohne Reservierung oft lange Wartezeit. Ab 12:30.',
      'Tapas fusion molto popolari in calle Hernando Colón; senza prenotazione l’attesa può essere lunga. Dalle 12:30.',
      'Hernando Colón 街很受欢迎的融合 tapas，不预订可能要等很久。12:30 起营业。'),
    dishes: T('Risotto de setas, gyozas, patatas bravas', 'Mushroom risotto, gyozas, patatas bravas', 'Risotto aux champignons, gyozas, patatas bravas', 'Pilzrisotto, Gyoza, Patatas Bravas', 'Risotto ai funghi, gyoza, patatas bravas', '蘑菇烩饭、煎饺、辣酱土豆'),
  },
  romero: {
    id: 'romero', name: 'Bodeguita Romero', lat: 37.387083, lng: -5.99567, placeId: 'ChIJ2b5GwhBsEg0R6QSnAOmCZK0', priceLevel: 'medium', phone: '+34 954 22 95 56',
    desc: T('Taberna clásica del Arenal, famosa por su cocina casera. Cierra lunes y domingo; solo mediodía salvo jueves y viernes.',
      'Classic Arenal tavern known for home cooking. Closed Monday and Sunday; lunchtime only except Thursday and Friday.',
      'Taverne classique de l’Arenal, réputée pour sa cuisine maison. Fermée lundi et dimanche ; midi seulement sauf jeudi et vendredi.',
      'Klassische Taverne im Arenal, bekannt für Hausmannskost. Montag und Sonntag geschlossen; außer Do/Fr nur mittags.',
      'Taverna classica dell’Arenal, famosa per la cucina casalinga. Chiusa lunedì e domenica; solo a pranzo tranne giovedì e venerdì.',
      'Arenal 区的经典小酒馆，以家常菜闻名。周一、周日休息；除周四、周五外只供午餐。'),
    dishes: T('Pringá, papas aliñás, rabo de toro', 'Pringá, dressed potatoes (papas aliñás), oxtail', 'Pringá, pommes de terre assaisonnées, queue de taureau', 'Pringá, Kartoffelsalat „papas aliñás“, Ochsenschwanz', 'Pringá, patate condite, coda di toro', '炖肉夹饼、凉拌土豆、炖牛尾'),
  },
  syra: {
    id: 'syra', name: 'Syra Coffee', lat: 37.3889412, lng: -5.9933136, placeId: 'ChIJEWLhqdttEg0RpLD4sByPpg8', priceLevel: 'low',
    desc: T('Café de especialidad en la calle Álvarez Quintero, sobre todo para llevar (apenas hay asientos). También venden café en grano.',
      'Specialty coffee on Calle Álvarez Quintero, mostly takeaway (very little seating). They also sell beans.',
      'Café de spécialité rue Álvarez Quintero, surtout à emporter (peu de places). Vente de café en grains.',
      'Specialty Coffee in der Calle Álvarez Quintero, vor allem zum Mitnehmen (kaum Sitzplätze). Auch Bohnen zum Kaufen.',
      'Caffè specialty in calle Álvarez Quintero, soprattutto da asporto (pochi posti). Vendono anche caffè in grani.',
      'Álvarez Quintero 街的精品咖啡，以外带为主（座位很少），也卖咖啡豆。'),
    dishes: T('Cortado, flat white, matcha latte', 'Cortado, flat white, matcha latte', 'Cortado, flat white, matcha latte', 'Cortado, Flat White, Matcha Latte', 'Cortado, flat white, matcha latte', '可塔朵、澳白、抹茶拿铁'),
  },
  bocafloja: {
    id: 'bocafloja', name: 'BocaFloja', lat: 37.3878588, lng: -5.9852271, placeId: 'ChIJ25sGXcdtEg0RwOUgHARJiuI', priceLevel: 'low', phone: '+34 662 46 08 67',
    desc: T('Brunch y taquería mexicana en Menéndez Pelayo, con precios muy razonables. Abre desde las 9:00.',
      'Mexican brunch and taquería on Menéndez Pelayo, very reasonably priced. Open from 9:00.',
      'Brunch et taquería mexicaine avenue Menéndez Pelayo, prix très raisonnables. Ouvert dès 9h.',
      'Mexikanischer Brunch und Taquería an der Menéndez Pelayo, sehr faire Preise. Ab 9 Uhr.',
      'Brunch e taquería messicana in avenida Menéndez Pelayo, prezzi molto onesti. Aperto dalle 9:00.',
      'Menéndez Pelayo 大道上的墨西哥早午餐和塔可店，价格实惠。9:00 起营业。'),
    dishes: T('Tacos de cochinita y al pastor, tostadas, chai latte', 'Cochinita and al pastor tacos, tostadas, chai latte', 'Tacos cochinita et al pastor, tostadas, chai latte', 'Cochinita- und Al-pastor-Tacos, Tostadas, Chai Latte', 'Tacos di cochinita e al pastor, tostadas, chai latte', '慢烤猪肉和牧师风味塔可、脆饼、印度奶茶'),
  },
  abantal: {
    id: 'abantal', name: 'Abantal', lat: 37.3879127, lng: -5.9836813, placeId: 'ChIJZ9KMjB1sEg0R6NhDbHBZO9M', priceLevel: 'high', phone: '+34 954 54 00 00',
    desc: T('Alta cocina andaluza con menú degustación, para una ocasión especial. Abre lunes, martes, jueves y viernes; imprescindible reservar.',
      'Andalusian fine dining with a tasting menu, for a special occasion. Open Monday, Tuesday, Thursday and Friday; booking essential.',
      'Haute cuisine andalouse avec menu dégustation, pour une occasion spéciale. Ouvert lundi, mardi, jeudi et vendredi ; réservation indispensable.',
      'Andalusische Spitzenküche mit Degustationsmenü, für besondere Anlässe. Geöffnet Mo, Di, Do, Fr; Reservierung nötig.',
      'Alta cucina andalusa con menù degustazione, per un’occasione speciale. Aperto lunedì, martedì, giovedì e venerdì; prenotazione indispensabile.',
      '安达卢西亚高级料理，提供品鉴菜单，适合特别场合。周一、二、四、五营业，必须预订。'),
    dishes: T('Menú degustación de 9 o 12 pases con maridaje', '9 or 12-course tasting menu with wine pairing', 'Menu dégustation en 9 ou 12 services avec accords mets-vins', 'Degustationsmenü mit 9 oder 12 Gängen und Weinbegleitung', 'Menù degustazione di 9 o 12 portate con abbinamento vini', '9 道或 12 道品鉴菜单配餐酒'),
  },
  mamarracha: {
    id: 'mamarracha', name: 'Mamarracha', lat: 37.3879206, lng: -5.9935932, placeId: 'ChIJu11neBpsEg0REAyrHV_4QMw', priceLevel: 'medium', phone: '+34 955 12 39 11',
    desc: T('Tapas a la brasa y buenos cócteles en Hernando Colón, cerca de la Catedral. Abre todos los días a mediodía y por la noche.',
      'Chargrilled tapas and good cocktails on Hernando Colón, near the Cathedral. Open daily for lunch and dinner.',
      'Tapas à la braise et bons cocktails rue Hernando Colón, près de la cathédrale. Ouvert tous les jours midi et soir.',
      'Tapas vom Grill und gute Cocktails in der Hernando Colón, nahe der Kathedrale. Täglich mittags und abends.',
      'Tapas alla brace e buoni cocktail in calle Hernando Colón, vicino alla Cattedrale. Aperto tutti i giorni a pranzo e cena.',
      'Hernando Colón 街的炭烤 tapas 和好喝的鸡尾酒，靠近大教堂。每天午晚餐营业。'),
    dishes: T('Alcachofa a la brasa, focaccia con presa, tartar de ternera, tacos de salmón', 'Chargrilled artichoke, focaccia with Iberian pork, beef tartare, salmon tacos', 'Artichaut à la braise, focaccia au porc ibérique, tartare de bœuf, tacos au saumon', 'Gegrillte Artischocke, Focaccia mit iberischem Schwein, Rindertatar, Lachs-Tacos', 'Carciofo alla brace, focaccia con maiale iberico, tartare di manzo, tacos di salmone', '炭烤朝鲜蓟、伊比利亚猪肉佛卡夏、牛肉鞑靼、三文鱼塔可'),
  },
  santelmo: {
    id: 'santelmo', name: 'Vinería San Telmo', lat: 37.3854384, lng: -5.9865712, placeId: 'ChIJ8VhbbnNtEg0RMTekNSSXNFI', priceLevel: 'medium', phone: '+34 954 41 06 00',
    desc: T('Tapas de autor y buena carta de vinos frente a los Jardines de Murillo, con terraza. Muy buena relación calidad-precio; conviene reservar.',
      'Signature tapas and a good wine list opposite the Murillo Gardens, with a terrace. Great value; booking advised.',
      'Tapas créatives et belle carte des vins face aux jardins de Murillo, avec terrasse. Excellent rapport qualité-prix ; réservation conseillée.',
      'Kreative Tapas und gute Weinkarte gegenüber den Murillo-Gärten, mit Terrasse. Sehr gutes Preis-Leistungs-Verhältnis; besser reservieren.',
      'Tapas d’autore e buona carta dei vini di fronte ai Giardini di Murillo, con terrazza. Ottimo rapporto qualità-prezzo; meglio prenotare.',
      '穆里略花园对面的创意 tapas 和葡萄酒吧，有露台，性价比高，建议预订。'),
    dishes: T('Presa ibérica, ensaladilla con pulpo, rabo de toro crujiente', 'Iberian pork presa, Russian salad with octopus, crispy oxtail', 'Presa ibérique, salade russe au poulpe, queue de taureau croustillante', 'Iberische Presa, Russischer Salat mit Oktopus, knuspriger Ochsenschwanz', 'Presa iberica, insalata russa con polpo, coda di toro croccante', '伊比利亚猪肩肉、章鱼土豆沙拉、酥脆牛尾'),
  },
  malquerer: {
    id: 'malquerer', name: 'MALQUERER', lat: 37.3853823, lng: -5.9895419, placeId: 'ChIJZb07LUZtEg0RhI_sbao8iGs', priceLevel: 'medium', phone: '+34 622 27 73 36',
    desc: T('Restaurante de un hotel en la calle Reinoso (Santa Cruz), tranquilo y con servicio rápido. Abierto todo el día, de 8:30 a 23:00.',
      'Hotel restaurant on Calle Reinoso (Santa Cruz), quiet with quick service. Open all day, 8:30–23:00.',
      'Restaurant d’hôtel rue Reinoso (Santa Cruz), calme et service rapide. Ouvert toute la journée, 8h30–23h.',
      'Hotelrestaurant in der Calle Reinoso (Santa Cruz), ruhig und schneller Service. Durchgehend 8:30–23 Uhr.',
      'Ristorante d’hotel in calle Reinoso (Santa Cruz), tranquillo e con servizio rapido. Aperto tutto il giorno, 8:30–23:00.',
      '圣十字区 Reinoso 街的酒店餐厅，安静、上菜快。全天营业 8:30–23:00。'),
    dishes: T('Tapas andaluzas de temporada, pescado del día, vino naranja', 'Seasonal Andalusian tapas, catch of the day, orange wine', 'Tapas andalouses de saison, poisson du jour, vin orange', 'Saisonale andalusische Tapas, Fisch des Tages, Orange Wine', 'Tapas andaluse di stagione, pesce del giorno, vino orange', '应季安达卢西亚 tapas、当日鲜鱼、橙酒'),
  },
  bendala: {
    id: 'bendala', name: 'Bendala Brasería', lat: 37.3854589, lng: -5.9866627, placeId: 'ChIJOdSOkt1tEg0Rs-QkQzsKKCk', priceLevel: 'medium', phone: '+34 955 22 30 01',
    desc: T('Brasería junto a los Jardines de Murillo, con terraza y opciones vegetarianas. Abre todos los días desde las 13:00; suele haber cola sin reserva.',
      'Grill house by the Murillo Gardens, with a terrace and vegetarian options. Daily from 13:00; expect a queue without a booking.',
      'Rôtisserie près des jardins de Murillo, avec terrasse et options végétariennes. Tous les jours dès 13h ; file d’attente sans réservation.',
      'Grillrestaurant an den Murillo-Gärten, mit Terrasse und vegetarischen Gerichten. Täglich ab 13 Uhr; ohne Reservierung Wartezeit.',
      'Braceria accanto ai Giardini di Murillo, con terrazza e piatti vegetariani. Tutti i giorni dalle 13:00; senza prenotazione c’è fila.',
      '穆里略花园旁的炭烤餐厅，有露台和素食选择。每天 13:00 起营业，不预订常需排队。'),
    dishes: T('Paella, calabaza asada, alcachofas a la brasa', 'Paella, roast pumpkin, chargrilled artichokes', 'Paella, potiron rôti, artichauts à la braise', 'Paella, gerösteter Kürbis, gegrillte Artischocken', 'Paella, zucca arrosto, carciofi alla brace', '海鲜饭、烤南瓜、炭烤朝鲜蓟'),
  },
  becerrita: {
    id: 'becerrita', name: 'Becerrita', lat: 37.3904247, lng: -5.9842474, placeId: 'ChIJyyHCaR1sEg0RBp7whq4FgF4', priceLevel: 'medium', phone: '+34 954 41 20 57',
    desc: T('Restaurante clásico sevillano en la calle Recaredo, con barra de tapas a la entrada y comedor. Mediodía y noche, todos los días.',
      'Classic Sevillian restaurant on Calle Recaredo, with a tapas bar at the front and a dining room. Lunch and dinner daily.',
      'Restaurant sévillan classique rue Recaredo, bar à tapas à l’entrée et salle. Midi et soir, tous les jours.',
      'Klassisches sevillanisches Restaurant in der Calle Recaredo, vorne Tapas-Bar, hinten Speisesaal. Täglich mittags und abends.',
      'Ristorante sivigliano classico in calle Recaredo, con bancone di tapas all’ingresso e sala. Pranzo e cena tutti i giorni.',
      'Recaredo 街的经典塞维利亚餐厅，入口是 tapas 吧台，里面是餐厅。每天午晚餐营业。'),
    dishes: T('Pescado a la sal, bacalao frito, atún rojo', 'Salt-baked fish, fried cod, bluefin tuna', 'Poisson en croûte de sel, morue frite, thon rouge', 'Fisch in Salzkruste, frittierter Kabeljau, Roter Thun', 'Pesce al sale, baccalà fritto, tonno rosso', '盐焗鱼、炸鳕鱼、蓝鳍金枪鱼'),
  },
  donaire: {
    id: 'donaire', name: 'Donaire Azabache', lat: 37.3897563, lng: -5.9948357, placeId: 'ChIJJwLPFa5tEg0R_2dP2WN0dU4', priceLevel: 'medium', phone: '+34 854 70 07 68',
    desc: T('Cocina andaluza cuidada en una calle tranquila junto a la Catedral, con mesas fuera. Abierto todo el día; domingo solo a mediodía.',
      'Careful Andalusian cooking on a quiet street by the Cathedral, with outdoor tables. Open all day; Sunday lunchtime only.',
      'Cuisine andalouse soignée dans une rue calme près de la cathédrale, avec tables dehors. Ouvert toute la journée ; dimanche midi seulement.',
      'Sorgfältige andalusische Küche in einer ruhigen Gasse bei der Kathedrale, mit Tischen draußen. Durchgehend; sonntags nur mittags.',
      'Cucina andalusa curata in una via tranquilla vicino alla Cattedrale, con tavoli all’aperto. Aperto tutto il giorno; domenica solo a pranzo.',
      '大教堂旁安静小街上的精致安达卢西亚菜，有户外座位。全天营业；周日仅午餐。'),
    dishes: T('Tataki de atún, salmorejo, salmón marinado con crema de limón', 'Tuna tataki, salmorejo, marinated salmon with lemon cream', 'Tataki de thon, salmorejo, saumon mariné à la crème de citron', 'Thunfisch-Tataki, Salmorejo, marinierter Lachs mit Zitronencreme', 'Tataki di tonno, salmorejo, salmone marinato con crema al limone', '金枪鱼塔塔基、萨尔莫雷霍冷汤、柠檬奶油腌三文鱼'),
  },
  // ───────────── Cerca de Quevedo ─────────────
  virgen: {
    id: 'virgen', name: 'Virgen Coffee', lat: 37.3939915, lng: -5.9917686, placeId: 'ChIJV6VDqAVsEg0R6atwWrqPBZM', priceLevel: 'low',
    desc: T('Para muchos, el mejor café de especialidad de Sevilla, junto a las Setas. Solo por la mañana (9:00–13:00) y domingo cerrado.',
      'For many, the best specialty coffee in Seville, next to Las Setas. Mornings only (9:00–13:00); closed Sunday.',
      'Pour beaucoup, le meilleur café de spécialité de Séville, près des Setas. Le matin seulement (9h–13h) ; fermé le dimanche.',
      'Für viele der beste Specialty Coffee Sevillas, bei den Setas. Nur vormittags (9–13 Uhr); sonntags geschlossen.',
      'Per molti il miglior caffè specialty di Siviglia, accanto alle Setas. Solo la mattina (9:00–13:00); domenica chiuso.',
      '许多人心中塞维利亚最好的精品咖啡，就在都市阳伞旁。仅上午营业（9:00–13:00），周日休息。'),
    dishes: T('Latte «Regina», espresso tonic, café de filtro', '“Regina” latte, espresso tonic, filter coffee', 'Latte « Regina », espresso tonic, café filtre', '„Regina“-Latte, Espresso Tonic, Filterkaffee', 'Latte “Regina”, espresso tonic, caffè filtro', '“Regina”拿铁、浓缩汤力、手冲咖啡'),
  },
  brunchit: {
    id: 'brunchit', name: 'Brunchit Las Setas', lat: 37.3933306, lng: -5.9914504, placeId: 'ChIJyfcbqe1tEg0ROI-h_VWgbtM', priceLevel: 'low', phone: '+34 911 08 94 46',
    desc: T('Brunch con raciones grandes y vistas a las Setas, con terraza. Todos los días de 9:00 a 16:00; a veces hay que esperar unos minutos.',
      'Brunch with big portions and views of Las Setas, with a terrace. Daily 9:00–16:00; sometimes a short wait.',
      'Brunch aux portions généreuses avec vue sur les Setas et terrasse. Tous les jours 9h–16h ; parfois un peu d’attente.',
      'Brunch mit großen Portionen und Blick auf die Setas, mit Terrasse. Täglich 9–16 Uhr; manchmal kurze Wartezeit.',
      'Brunch con porzioni abbondanti e vista sulle Setas, con terrazza. Tutti i giorni 9:00–16:00; a volte un po’ di attesa.',
      '份量大、可看都市阳伞的早午餐店，有露台。每天 9:00–16:00，有时需稍等。'),
    dishes: T('Tortitas, sándwiches de brunch, café con latte art', 'Pancakes, brunch sandwiches, latte-art coffee', 'Pancakes, sandwichs brunch, café latte art', 'Pancakes, Brunch-Sandwiches, Kaffee mit Latte Art', 'Pancake, sandwich da brunch, caffè con latte art', '松饼、早午餐三明治、拉花咖啡'),
  },
  muy: {
    id: 'muy', name: 'MUY Coffee', lat: 37.3974185, lng: -5.992695, placeId: 'ChIJift3fwxtEg0RKQ4pGTf6PUc', priceLevel: 'low', phone: '+34 655 35 60 80',
    desc: T('Café de especialidad muy cuidado en la calle Correduría, cerca de la Alameda. Todos los días desde las 8:30 (fines de semana desde las 9:00).',
      'Carefully made specialty coffee on Calle Correduría, near the Alameda. Daily from 8:30 (weekends from 9:00).',
      'Café de spécialité très soigné rue Correduría, près de l’Alameda. Tous les jours dès 8h30 (week-end dès 9h).',
      'Sorgfältiger Specialty Coffee in der Calle Correduría, nahe der Alameda. Täglich ab 8:30 (Wochenende ab 9 Uhr).',
      'Caffè specialty molto curato in calle Correduría, vicino all’Alameda. Tutti i giorni dalle 8:30 (weekend dalle 9:00).',
      'Correduría 街的精品咖啡，靠近 Alameda，非常讲究。每天 8:30 起（周末 9:00 起）。'),
    dishes: T('Espresso, café de filtro V60 con granos de origen', 'Espresso, V60 filter coffee with single-origin beans', 'Espresso, café filtre V60 de grains d’origine', 'Espresso, V60-Filterkaffee mit Single-Origin-Bohnen', 'Espresso, caffè filtro V60 con chicchi monorigine', '浓缩咖啡、单一产地豆 V60 手冲'),
  },
  cacharreria: {
    id: 'cacharreria', name: 'La Cacharrería', lat: 37.3946828, lng: -5.991436, placeId: 'ChIJ4wpntxFsEg0RkoPbUYuDwkY', priceLevel: 'low',
    desc: T('Brunch con pan propio en la calle Regina, muy cerca del apartamento. Abre todos los días desde las 9:00, sin reserva.',
      'Brunch with home-baked bread on Calle Regina, very close to the apartment. Daily from 9:00, no booking needed.',
      'Brunch avec pain maison rue Regina, tout près de l’appartement. Tous les jours dès 9h, sans réservation.',
      'Brunch mit eigenem Brot in der Calle Regina, ganz nah an der Wohnung. Täglich ab 9 Uhr, ohne Reservierung.',
      'Brunch con pane fatto in casa in calle Regina, vicinissimo all’appartamento. Tutti i giorni dalle 9:00, senza prenotazione.',
      'Regina 街的早午餐店，面包自制，离公寓很近。每天 9:00 起，无需预订。'),
    dishes: T('Tostada de aguacate con huevo, focaccia, bowl de açaí y yogur con granola', 'Avocado toast with egg, focaccia, açaí bowl and yoghurt with granola', 'Avocado toast à l’œuf, focaccia, bowl d’açaí et yaourt-granola', 'Avocado-Toast mit Ei, Focaccia, Açaí-Bowl und Joghurt mit Granola', 'Avocado toast con uovo, focaccia, açaí bowl e yogurt con granola', '牛油果鸡蛋吐司、佛卡夏、巴西莓碗和酸奶燕麦'),
  },
  mamaines: {
    id: 'mamaines', name: 'Café Mamá Inés', lat: 37.3937989, lng: -5.9928837, placeId: 'ChIJ-eu1dQVsEg0RaiEGTcmfm5k', priceLevel: 'low', phone: '+34 854 52 44 98',
    desc: T('Desayuno andaluz en una placita escondida junto a las Setas (Plaza Zurbarán), con mesas fuera y buen precio.',
      'Andalusian breakfast on a hidden little square by Las Setas (Plaza Zurbarán), with outdoor tables and good prices.',
      'Petit-déjeuner andalou sur une placette cachée près des Setas (Plaza Zurbarán), tables dehors et bons prix.',
      'Andalusisches Frühstück auf einem versteckten Plätzchen bei den Setas (Plaza Zurbarán), mit Tischen draußen und guten Preisen.',
      'Colazione andalusa in una piazzetta nascosta accanto alle Setas (Plaza Zurbarán), con tavoli fuori e buoni prezzi.',
      '都市阳伞旁隐蔽小广场（Zurbarán 广场）上的安达卢西亚早餐，有户外座位，价格实惠。'),
    dishes: T('Tostada de jamón con tomate, mollete, zumo natural', 'Toast with ham and tomato, mollete roll, fresh juice', 'Tartine jambon-tomate, mollete, jus frais', 'Toast mit Schinken und Tomate, Mollete, frischer Saft', 'Pane tostato con prosciutto e pomodoro, mollete, spremuta', '番茄火腿吐司、软面包、鲜榨果汁'),
  },
  otto: {
    id: 'otto', name: 'Café Otto', lat: 37.396935, lng: -5.9908011, placeId: 'ChIJzyYEhAZsEg0RfYQeaApQlS8', priceLevel: 'low',
    desc: T('Café tranquilo en la Plaza Monte Sión, con terraza. Ojo: cierra de miércoles a viernes.',
      'Quiet café on Plaza Monte Sión, with a terrace. Note: closed Wednesday to Friday.',
      'Café tranquille sur la Plaza Monte Sión, avec terrasse. Attention : fermé du mercredi au vendredi.',
      'Ruhiges Café an der Plaza Monte Sión, mit Terrasse. Achtung: Mittwoch bis Freitag geschlossen.',
      'Caffè tranquillo in Plaza Monte Sión, con terrazza. Attenzione: chiuso dal mercoledì al venerdì.',
      '蒙特锡安广场上安静的咖啡馆，有露台。注意：周三至周五休息。'),
    dishes: T('Bagels, huevos benedictinos, desayuno inglés, latte de caramelo', 'Bagels, Eggs Benedict, English breakfast, caramel latte', 'Bagels, œufs Bénédicte, petit-déjeuner anglais, latte caramel', 'Bagels, Eggs Benedict, englisches Frühstück, Karamell-Latte', 'Bagel, uova alla Benedict, colazione inglese, latte al caramello', '贝果、班尼迪克蛋、英式早餐、焦糖拿铁'),
  },
  parceria: {
    id: 'parceria', name: 'Parcería Café', lat: 37.3997067, lng: -5.9911759, placeId: 'ChIJ9RYQ9HNtEg0R3sRY3y8Ks_A', priceLevel: 'medium', phone: '+34 662 34 87 92',
    desc: T('Desayunos creativos y de los mejores cafés de la ciudad, en la Plaza Calderón de la Barca. Solo mañanas; domingo cerrado. Local pequeño: mejor ir pronto.',
      'Creative breakfasts and some of the best coffee in town, on Plaza Calderón de la Barca. Mornings only; closed Sunday. Small place: go early.',
      'Petits-déjeuners créatifs et l’un des meilleurs cafés de la ville, Plaza Calderón de la Barca. Le matin seulement ; fermé le dimanche. Petit local : venir tôt.',
      'Kreatives Frühstück und einer der besten Kaffees der Stadt, an der Plaza Calderón de la Barca. Nur vormittags; sonntags zu. Klein: früh kommen.',
      'Colazioni creative e uno dei migliori caffè della città, in Plaza Calderón de la Barca. Solo la mattina; domenica chiuso. Locale piccolo: meglio presto.',
      'Calderón de la Barca 广场上的创意早餐，咖啡是城里最好的之一。仅上午营业，周日休息。店小，建议早去。'),
    dishes: T('Bowls de granola, atún ahumado, tostadas de temporada', 'Granola bowls, smoked tuna, seasonal toasts', 'Bowls de granola, thon fumé, tartines de saison', 'Granola-Bowls, geräucherter Thunfisch, saisonale Toasts', 'Bowl di granola, tonno affumicato, toast di stagione', '燕麦碗、烟熏金枪鱼、时令吐司'),
  },
  creme: {
    id: 'creme', name: 'La Crème de la Crème', lat: 37.3942895, lng: -5.9918011, placeId: 'ChIJebOUgU5wEg0RQcs-ZYdPy1Y', priceLevel: 'low', phone: '+34 681 86 02 04',
    desc: T('Pastelería francesa y brunch bajo las Setas. Abre todos los días de 8:30 a 21:00.',
      'French patisserie and brunch under Las Setas. Open daily 8:30–21:00.',
      'Pâtisserie française et brunch sous les Setas. Ouvert tous les jours 8h30–21h.',
      'Französische Konditorei und Brunch unter den Setas. Täglich 8:30–21 Uhr.',
      'Pasticceria francese e brunch sotto le Setas. Aperto tutti i giorni 8:30–21:00.',
      '都市阳伞下的法式甜品和早午餐店。每天 8:30–21:00。'),
    dishes: T('Crepes, cruasanes, pasteles franceses', 'Crêpes, croissants, French pastries', 'Crêpes, croissants, pâtisseries françaises', 'Crêpes, Croissants, französisches Gebäck', 'Crêpe, croissant, pasticceria francese', '可丽饼、牛角包、法式甜点'),
  },
  caotica: {
    id: 'caotica', name: 'Caótica', lat: 37.3937415, lng: -5.9929754, placeId: 'ChIJ8Zl0dwVsEg0RlQQfC70zvWU', priceLevel: 'low', phone: '+34 955 54 19 66',
    desc: T('Librería-café de cuatro plantas junto a las Setas, ideal para un café tranquilo entre libros.',
      'Four-storey bookshop café by Las Setas, perfect for a quiet coffee among books.',
      'Librairie-café sur quatre étages près des Setas, idéale pour un café au calme entre les livres.',
      'Buchhandlung mit Café auf vier Etagen bei den Setas, ideal für einen ruhigen Kaffee zwischen Büchern.',
      'Libreria-caffè su quattro piani accanto alle Setas, ideale per un caffè tranquillo tra i libri.',
      '都市阳伞旁的四层书店咖啡馆，适合在书香中安静喝杯咖啡。'),
    dishes: T('Tartas caseras, desayunos, café', 'Home-made cakes, breakfasts, coffee', 'Gâteaux maison, petits-déjeuners, café', 'Hausgemachte Kuchen, Frühstück, Kaffee', 'Torte fatte in casa, colazioni, caffè', '自制蛋糕、早餐、咖啡'),
  },
  recoveco: {
    id: 'recoveco', name: 'Recoveco', lat: 37.3914499, lng: -5.9906545, placeId: 'ChIJ6d3vXj1tEg0R2VLGoGTxDpU', priceLevel: 'high', phone: '+34 673 30 08 18',
    desc: T('Azotea del hotel Vincci Unuk, con vistas a la Catedral y a las Setas. Brunch por la mañana y copas al atardecer; abre de 9:00 a 1:00.',
      'Rooftop of the Vincci Unuk hotel, with views of the Cathedral and Las Setas. Brunch in the morning and drinks at sunset; open 9:00–1:00.',
      'Rooftop de l’hôtel Vincci Unuk, vue sur la cathédrale et les Setas. Brunch le matin, verre au coucher du soleil ; ouvert 9h–1h.',
      'Dachterrasse des Hotels Vincci Unuk mit Blick auf Kathedrale und Setas. Vormittags Brunch, abends Drinks; 9–1 Uhr.',
      'Terrazza dell’hotel Vincci Unuk con vista sulla Cattedrale e sulle Setas. Brunch al mattino e aperitivo al tramonto; aperto 9:00–1:00.',
      'Vincci Unuk 酒店屋顶，可看大教堂和都市阳伞。上午早午餐，傍晚喝一杯；9:00–1:00。'),
    dishes: T('Brunch, baos de pato, ceviche, aperol al atardecer', 'Brunch, duck bao, ceviche, sunset spritz', 'Brunch, bao au canard, ceviche, spritz au coucher du soleil', 'Brunch, Enten-Bao, Ceviche, Spritz zum Sonnenuntergang', 'Brunch, bao all’anatra, ceviche, spritz al tramonto', '早午餐、鸭肉包、酸橘汁腌鱼、日落时的 Aperol'),
  },
  chia: {
    id: 'chia', name: 'CHÍA Brunch & Dreams', lat: 37.3939482, lng: -5.9879049, placeId: 'ChIJsVLpDgBtEg0RETKgmzIWmvg', priceLevel: 'low',
    desc: T('Brunch saludable y muy bien valorado en la calle Sol. Entre semana solo por la mañana (hasta 13:30); viernes y fines de semana hasta las 20:00.',
      'Healthy, highly rated brunch on Calle Sol. Weekdays mornings only (until 13:30); Friday and weekends until 20:00.',
      'Brunch sain et très bien noté rue Sol. En semaine le matin seulement (jusqu’à 13h30) ; vendredi et week-end jusqu’à 20h.',
      'Gesunder, sehr gut bewerteter Brunch in der Calle Sol. Werktags nur vormittags (bis 13:30); Fr und Wochenende bis 20 Uhr.',
      'Brunch sano e molto apprezzato in calle Sol. In settimana solo la mattina (fino alle 13:30); venerdì e weekend fino alle 20:00.',
      'Sol 街评分很高的健康早午餐。工作日仅上午（至 13:30），周五和周末至 20:00。'),
    dishes: T('Tortitas con fruta, zumos naturales, latte de avellana', 'Pancakes with fruit, fresh juices, hazelnut latte', 'Pancakes aux fruits, jus frais, latte noisette', 'Pancakes mit Obst, frische Säfte, Haselnuss-Latte', 'Pancake con frutta, spremute, latte alla nocciola', '水果松饼、鲜榨果汁、榛子拿铁'),
  },
  comissura: {
    id: 'comissura', name: 'La Comissura', lat: 37.3921513, lng: -5.9909857, placeId: 'ChIJ40SK6rptEg0RH7ebD-gu2Sw', priceLevel: 'low', phone: '+34 854 68 40 25',
    desc: T('Brunch ligero y saludable en la calle Santillana, a medio camino entre los dos apartamentos. Desde las 8:30.',
      'Light, healthy brunch on Calle Santillana, halfway between the two apartments. From 8:30.',
      'Brunch léger et sain rue Santillana, à mi-chemin entre les deux appartements. Dès 8h30.',
      'Leichter, gesunder Brunch in der Calle Santillana, auf halbem Weg zwischen beiden Wohnungen. Ab 8:30.',
      'Brunch leggero e sano in calle Santillana, a metà strada tra i due appartamenti. Dalle 8:30.',
      'Santillana 街清淡健康的早午餐，位于两套公寓之间。8:30 起营业。'),
    dishes: T('Huevos florentinos, tortilla, tortitas con fruta, zumos', 'Eggs Florentine, Spanish omelette, pancakes with fruit, juices', 'Œufs florentine, tortilla, pancakes aux fruits, jus', 'Eier Florentiner Art, Tortilla, Pancakes mit Obst, Säfte', 'Uova alla fiorentina, tortilla, pancake con frutta, spremute', '佛罗伦萨蛋、西班牙土豆饼、水果松饼、果汁'),
  },
  alameda: {
    id: 'alameda', name: 'Cervecería Alameda', lat: 37.3969582, lng: -5.9937659, placeId: 'ChIJBzMJvr1tEg0R9TrQgQuKVwU', priceLevel: 'low', phone: '+34 631 52 62 01',
    desc: T('Cervecería con terraza en plena Alameda de Hércules, abierta de 8:00 a 2:00. La paella se hace al momento (unos 25 minutos).',
      'Beer hall with a terrace right on the Alameda de Hércules, open 8:00–2:00. Paella is made to order (about 25 minutes).',
      'Brasserie avec terrasse en pleine Alameda de Hércules, ouverte 8h–2h. La paella est préparée à la commande (environ 25 min).',
      'Bierlokal mit Terrasse direkt an der Alameda de Hércules, 8–2 Uhr. Paella wird frisch zubereitet (ca. 25 Minuten).',
      'Birreria con terrazza in piena Alameda de Hércules, aperta 8:00–2:00. La paella si prepara al momento (circa 25 minuti).',
      'Alameda de Hércules 上带露台的啤酒馆，8:00–2:00 营业。海鲜饭现做（约 25 分钟）。'),
    dishes: T('Paella, choco frito, patatas bravas', 'Paella, fried cuttlefish, patatas bravas', 'Paella, seiche frite, patatas bravas', 'Paella, frittierter Tintenfisch, Patatas Bravas', 'Paella, seppia fritta, patatas bravas', '海鲜饭、炸墨鱼、辣酱土豆'),
  },
  sanlorenzo: {
    id: 'sanlorenzo', name: 'Bar San Lorenzo', lat: 37.3968955, lng: -5.9968111, placeId: 'ChIJOTc1LwlsEg0RADM1wGRmjXs', priceLevel: 'low', phone: '+34 640 68 76 46',
    desc: T('Bar de barrio en la Plaza de San Lorenzo, con clientela local y tapas muy cuidadas. Se pide en barra. Domingo cerrado.',
      'Neighbourhood bar on Plaza de San Lorenzo, with local regulars and carefully made tapas. Order at the bar. Closed Sunday.',
      'Bar de quartier sur la Plaza de San Lorenzo, clientèle locale et tapas soignées. On commande au comptoir. Fermé le dimanche.',
      'Nachbarschaftsbar an der Plaza de San Lorenzo, viele Einheimische, sorgfältige Tapas. Bestellung an der Theke. Sonntags geschlossen.',
      'Bar di quartiere in Plaza de San Lorenzo, clientela locale e tapas curate. Si ordina al bancone. Domenica chiuso.',
      '圣洛伦索广场的街区酒吧，多是本地客人，tapas 做得用心。在吧台点餐。周日休息。'),
    dishes: T('Raviolis de trufa, tarta de queso, enchiladas', 'Truffle ravioli, cheesecake, enchiladas', 'Raviolis à la truffe, cheesecake, enchiladas', 'Trüffel-Ravioli, Käsekuchen, Enchiladas', 'Ravioli al tartufo, cheesecake, enchiladas', '松露意大利饺、芝士蛋糕、墨西哥卷饼'),
  },
  andalusi: {
    id: 'andalusi', name: 'Alcázar Andalusí Tapas', lat: 37.3994558, lng: -5.9921834, placeId: 'ChIJfSdY4YRtEg0RNZyr7Sj16Fo', priceLevel: 'medium', phone: '+34 954 38 37 70',
    desc: T('Tapas con raciones generosas y muy buen trato en la calle Peris Mencheta. Mucho espacio, ideal para grupos. Todos los días de 12:00 a 0:00.',
      'Generous tapas and very friendly service on Calle Peris Mencheta. Plenty of space, great for groups. Daily 12:00–24:00.',
      'Tapas copieuses et accueil très chaleureux rue Peris Mencheta. Beaucoup de place, idéal en groupe. Tous les jours 12h–minuit.',
      'Großzügige Tapas und sehr freundlicher Service in der Calle Peris Mencheta. Viel Platz, ideal für Gruppen. Täglich 12–24 Uhr.',
      'Tapas abbondanti e servizio molto cordiale in calle Peris Mencheta. Tanto spazio, ideale per gruppi. Tutti i giorni 12:00–24:00.',
      'Peris Mencheta 街份量足、服务热情的 tapas 店，空间大，适合团体。每天 12:00–24:00。'),
    dishes: T('Risotto de setas, tapas andaluzas, postres caseros', 'Mushroom risotto, Andalusian tapas, home-made desserts', 'Risotto aux champignons, tapas andalouses, desserts maison', 'Pilzrisotto, andalusische Tapas, hausgemachte Desserts', 'Risotto ai funghi, tapas andaluse, dolci fatti in casa', '蘑菇烩饭、安达卢西亚 tapas、自制甜点'),
  },
  abaceria: {
    id: 'abaceria', name: 'Antigua Abacería de San Lorenzo', lat: 37.39786, lng: -5.99766, placeId: 'ChIJjRhEFAlsEg0RVrDhPgnpOQ0', priceLevel: 'low', phone: '+34 674 74 80 91',
    desc: T('Antigua tienda de ultramarinos convertida en bar, pequeña, auténtica y con mucho carácter. Muy de barrio; a mediodía puede haber espera.',
      'Old grocery store turned into a bar: small, authentic and full of character. Very local; expect a wait at lunchtime.',
      'Ancienne épicerie devenue bar : petite, authentique et pleine de caractère. Très locale ; attente possible le midi.',
      'Ehemaliger Krämerladen, heute Bar: klein, authentisch, mit viel Charakter. Sehr einheimisch; mittags oft Wartezeit.',
      'Antica drogheria trasformata in bar: piccola, autentica e piena di carattere. Molto di quartiere; a pranzo può esserci attesa.',
      '由老杂货铺改成的小酒馆，地道又有特色，本地客多，午餐时段可能要等。'),
    dishes: T('Huevos de Ramón, alcachofas con jamón, ibéricos', '“Ramón’s eggs”, artichokes with ham, Iberian cured meats', '« Œufs de Ramón », artichauts au jambon, charcuterie ibérique', '„Ramóns Eier“, Artischocken mit Schinken, iberische Wurstwaren', '“Uova di Ramón”, carciofi con prosciutto, salumi iberici', '“拉蒙鸡蛋”、火腿朝鲜蓟、伊比利亚腌肉'),
  },
  rinconcillo: {
    id: 'rinconcillo', name: 'El Rinconcillo', lat: 37.3933873, lng: -5.988364, placeId: 'ChIJObo_YwNsEg0RIGq8Rqq0ojA', priceLevel: 'medium', phone: '+34 954 22 31 83',
    desc: T('El bar más antiguo de Sevilla (1670). Merece la pena por el ambiente: tapas de pie en la barra, donde apuntan la cuenta con tiza. Mejor reservar mesa.',
      'Seville’s oldest bar (1670). Worth it for the atmosphere: standing tapas at the bar, where they chalk up your bill. Best to book a table.',
      'Le plus vieux bar de Séville (1670). À voir pour l’ambiance : tapas debout au comptoir, l’addition notée à la craie. Mieux vaut réserver une table.',
      'Die älteste Bar Sevillas (1670). Lohnt sich wegen der Atmosphäre: Tapas im Stehen an der Theke, die Rechnung wird mit Kreide notiert. Tisch besser reservieren.',
      'Il bar più antico di Siviglia (1670). Vale la pena per l’atmosfera: tapas in piedi al bancone, con il conto scritto col gesso. Meglio prenotare un tavolo.',
      '塞维利亚最古老的酒吧（1670 年）。值得体验氛围：在吧台站着吃 tapas，账目用粉笔写在台面上。要坐需预订。'),
    dishes: T('Espinacas con garbanzos, bacalao frito, carrillada', 'Spinach with chickpeas, fried cod, pork cheek', 'Épinards aux pois chiches, morue frite, joue de porc', 'Spinat mit Kichererbsen, frittierter Kabeljau, Schweinebäckchen', 'Spinaci con ceci, baccalà fritto, guancia', '鹰嘴豆菠菜、炸鳕鱼、猪脸肉'),
  },
  contenedor: {
    id: 'contenedor', name: 'conTenedor', lat: 37.398411, lng: -5.987947, placeId: 'ChIJr7TKMAFsEg0RUc0j3tmeQ5w', priceLevel: 'medium', phone: '+34 954 91 63 33',
    desc: T('Cocina de mercado «slow food» en la calle San Luis, con un local precioso. Servicio sin prisas. Lunes y martes solo cenas.',
      'Market-driven “slow food” cooking on Calle San Luis, in a beautiful room. Unhurried service. Monday and Tuesday dinner only.',
      'Cuisine du marché « slow food » rue San Luis, dans une très belle salle. Service sans hâte. Lundi et mardi le soir seulement.',
      'Marktküche im „Slow Food“-Stil in der Calle San Luis, wunderschönes Lokal. Service ohne Eile. Mo und Di nur abends.',
      'Cucina di mercato “slow food” in calle San Luis, in un locale bellissimo. Servizio senza fretta. Lunedì e martedì solo cena.',
      'San Luis 街的“慢食”市场料理，餐厅很漂亮，上菜不急。周一、周二仅晚餐。'),
    dishes: T('Arroz de pato, tartar de salmón, carrillada con pasta, tarta de queso', 'Duck rice, salmon tartare, pork cheek with pasta, cheesecake', 'Riz au canard, tartare de saumon, joue de porc aux pâtes, cheesecake', 'Entenreis, Lachstatar, Schweinebäckchen mit Pasta, Käsekuchen', 'Riso all’anatra, tartare di salmone, guancia con pasta, cheesecake', '鸭肉饭、三文鱼鞑靼、猪脸肉意面、芝士蛋糕'),
  },
  templo: {
    id: 'templo', name: 'Bar El Templo de Feria', lat: 37.3978263, lng: -5.9914828, placeId: 'ChIJ-bq5y05tEg0Rdpl6Ln7DPdI', priceLevel: 'low', phone: '+34 659 71 72 42',
    desc: T('Bar pequeño y simpático en la calle Feria, con tapas muy bien hechas a buen precio. Entre semana abre a las 19:00 (miércoles cerrado); fines de semana también a mediodía.',
      'Small, friendly bar on Calle Feria with well-made, good-value tapas. Weekdays from 19:00 (closed Wednesday); weekends also at lunchtime.',
      'Petit bar sympathique rue Feria, tapas bien faites à bon prix. En semaine dès 19h (fermé le mercredi) ; le week-end aussi le midi.',
      'Kleine, sympathische Bar in der Calle Feria, gut gemachte, günstige Tapas. Werktags ab 19 Uhr (mittwochs zu); am Wochenende auch mittags.',
      'Piccolo bar simpatico in calle Feria, tapas ben fatte a buon prezzo. In settimana dalle 19:00 (mercoledì chiuso); nel weekend anche a pranzo.',
      'Feria 街友好的小酒吧，tapas 做得好又实惠。工作日 19:00 开门（周三休息），周末中午也营业。'),
    dishes: T('Pulpo a la brasa con patatas, tacos de langostinos, chipirones', 'Grilled octopus with potatoes, prawn tacos, crispy baby squid', 'Poulpe grillé et pommes de terre, tacos aux crevettes, petits calamars', 'Gegrillter Oktopus mit Kartoffeln, Garnelen-Tacos, Babycalamares', 'Polpo alla brace con patate, tacos di gamberi, calamaretti', '炭烤章鱼配土豆、大虾塔可、炸小鱿鱼'),
  },
  canabota: {
    id: 'canabota', name: 'Cañabota', lat: 37.3935699, lng: -5.99357, placeId: 'ChIJx8hXfAVsEg0RSe2YupZmn4U', priceLevel: 'high', phone: '+34 954 87 02 98',
    desc: T('Restaurante de pescado con estrella Michelin, a tres minutos del apartamento, con cocina abierta. Menú degustación; cierra sábado y domingo. Imprescindible reservar.',
      'Michelin-starred fish restaurant three minutes from the apartment, with an open kitchen. Tasting menu; closed Saturday and Sunday. Booking essential.',
      'Restaurant de poisson étoilé Michelin à trois minutes de l’appartement, cuisine ouverte. Menu dégustation ; fermé samedi et dimanche. Réservation indispensable.',
      'Fischrestaurant mit Michelin-Stern, drei Minuten von der Wohnung, offene Küche. Degustationsmenü; Sa und So geschlossen. Reservierung nötig.',
      'Ristorante di pesce stellato Michelin a tre minuti dall’appartamento, con cucina a vista. Menù degustazione; chiuso sabato e domenica. Prenotazione indispensabile.',
      '距公寓三分钟的米其林一星海鲜餐厅，开放式厨房。提供品鉴菜单，周六、周日休息，必须预订。'),
    dishes: T('Menú degustación de pescado y marisco de lonja', 'Tasting menu of market-fresh fish and seafood', 'Menu dégustation de poissons et fruits de mer de criée', 'Degustationsmenü mit fangfrischem Fisch und Meeresfrüchten', 'Menù degustazione di pesce e frutti di mare freschissimi', '当日鲜鱼海鲜品鉴菜单'),
  },
  azzait: {
    id: 'azzait', name: 'Az-Zait', lat: 37.396846, lng: -5.9964439, placeId: 'ChIJATrqGI9tEg0RnOtY52QsuuU', priceLevel: 'high', phone: '+34 954 90 64 75',
    desc: T('Alta cocina andaluza en la Plaza de San Lorenzo, con un menú degustación de muy buena relación calidad-precio. Domingo cerrado; miércoles solo cenas.',
      'Andalusian fine dining on Plaza de San Lorenzo, with a great-value tasting menu. Closed Sunday; Wednesday dinner only.',
      'Haute cuisine andalouse Plaza de San Lorenzo, menu dégustation au très bon rapport qualité-prix. Fermé le dimanche ; mercredi le soir seulement.',
      'Andalusische Spitzenküche an der Plaza de San Lorenzo, Degustationsmenü mit sehr gutem Preis-Leistungs-Verhältnis. Sonntags zu; mittwochs nur abends.',
      'Alta cucina andalusa in Plaza de San Lorenzo, menù degustazione con ottimo rapporto qualità-prezzo. Domenica chiuso; mercoledì solo cena.',
      '圣洛伦索广场的安达卢西亚高级料理，品鉴菜单性价比很高。周日休息，周三仅晚餐。'),
    dishes: T('Menú degustación de 9 pases, sopa de huevo y gambas', '9-course tasting menu, egg and prawn soup', 'Menu dégustation en 9 services, soupe aux œufs et crevettes', '9-Gänge-Degustationsmenü, Suppe mit Ei und Garnelen', 'Menù degustazione di 9 portate, zuppa di uova e gamberi', '9 道品鉴菜单、鸡蛋鲜虾汤'),
  },
  eslava: {
    id: 'eslava', name: 'Espacio Eslava', lat: 37.3974911, lng: -5.9969382, placeId: 'ChIJn3Y6IglsEg0R2Ig0DZZQtRs', priceLevel: 'medium', phone: '+34 954 90 65 68',
    desc: T('Uno de los bares de tapas de autor más famosos de Sevilla, junto a San Lorenzo. Se llena: mejor llegar pronto o reservar. Lunes cerrado; domingo solo mediodía.',
      'One of Seville’s best-known signature tapas bars, next to San Lorenzo. It gets packed: arrive early or book. Closed Monday; Sunday lunchtime only.',
      'L’un des bars à tapas créatives les plus célèbres de Séville, près de San Lorenzo. Très fréquenté : venir tôt ou réserver. Fermé le lundi ; dimanche midi seulement.',
      'Eine der bekanntesten kreativen Tapas-Bars Sevillas, neben San Lorenzo. Oft voll: früh kommen oder reservieren. Montags zu; sonntags nur mittags.',
      'Uno dei bar di tapas d’autore più famosi di Siviglia, accanto a San Lorenzo. Si riempie: arrivare presto o prenotare. Lunedì chiuso; domenica solo pranzo.',
      '圣洛伦索旁塞维利亚最有名的创意 tapas 吧之一。人很多，建议早到或预订。周一休息，周日仅午餐。'),
    dishes: T('Yema sobre bizcocho de boletus, costillas a la miel de caña, helado de queso añejo', 'Egg yolk on boletus sponge, ribs with cane honey, aged cheese ice cream', 'Jaune d’œuf sur biscuit aux cèpes, travers au miel de canne, glace au fromage affiné', 'Eigelb auf Steinpilz-Biskuit, Rippchen mit Zuckerrohrhonig, Eis aus gereiftem Käse', 'Tuorlo su pan di spagna ai porcini, costine al miele di canna, gelato al formaggio stagionato', '牛肝菌蛋糕配蛋黄、甘蔗蜜排骨、陈年奶酪冰淇淋'),
  },
  anarubia: {
    id: 'anarubia', name: 'Ana La Rubia', lat: 37.398535, lng: -5.9932335, placeId: 'ChIJMawun6htEg0RrDWNWyys6kc', priceLevel: 'medium', phone: '+34 635 54 53 76',
    desc: T('Azotea con bar y restaurante en la Alameda de Hércules, nueva y muy bien valorada. Abre de 12:00 a 2:00 (fines de semana hasta las 3:00).',
      'Rooftop bar and restaurant on the Alameda de Hércules, new and highly rated. Open 12:00–2:00 (weekends until 3:00).',
      'Bar-restaurant en rooftop sur l’Alameda de Hércules, récent et très bien noté. Ouvert 12h–2h (week-end jusqu’à 3h).',
      'Dachterrassen-Bar und Restaurant an der Alameda de Hércules, neu und sehr gut bewertet. 12–2 Uhr (Wochenende bis 3 Uhr).',
      'Bar e ristorante in terrazza sull’Alameda de Hércules, nuovo e molto apprezzato. Aperto 12:00–2:00 (weekend fino alle 3:00).',
      'Alameda de Hércules 上新开的屋顶酒吧餐厅，评价很高。12:00–2:00（周末至 3:00）。'),
    dishes: T('Rape, katsu sando, cócteles y sangría', 'Monkfish, katsu sando, cocktails and sangria', 'Lotte, katsu sando, cocktails et sangria', 'Seeteufel, Katsu Sando, Cocktails und Sangria', 'Rana pescatrice, katsu sando, cocktail e sangria', '鮟鱇鱼、日式炸猪排三明治、鸡尾酒和桑格利亚'),
  },
  catalina: {
    id: 'catalina', name: 'Catalina Casa de Comidas', lat: 37.3931202, lng: -5.9864176, placeId: 'ChIJs7-NGQNsEg0RYD_S_MKSZow', priceLevel: 'medium', phone: '+34 954 56 36 87',
    desc: T('Casa de comidas en la Plaza Padre Jerónimo de Córdoba, famosa por sus croquetas. Abre todos los días de 12:30 a 0:30; mejor reservar.',
      'Traditional eatery on Plaza Padre Jerónimo de Córdoba, famous for its croquettes. Open daily 12:30–0:30; booking recommended.',
      'Maison de cuisine traditionnelle Plaza Padre Jerónimo de Córdoba, réputée pour ses croquettes. Tous les jours 12h30–0h30 ; réservation conseillée.',
      'Traditionelles Speiselokal an der Plaza Padre Jerónimo de Córdoba, berühmt für seine Kroketten. Täglich 12:30–0:30; besser reservieren.',
      'Trattoria in Plaza Padre Jerónimo de Córdoba, famosa per le crocchette. Tutti i giorni 12:30–0:30; meglio prenotare.',
      'Padre Jerónimo de Córdoba 广场的家常菜馆，以炸丸子闻名。每天 12:30–0:30，建议预订。'),
    dishes: T('Croquetas de pollo, patatas bravas, tortilla, tarta de queso', 'Chicken croquettes, patatas bravas, Spanish omelette, cheesecake', 'Croquettes de poulet, patatas bravas, tortilla, cheesecake', 'Hähnchenkroketten, Patatas Bravas, Tortilla, Käsekuchen', 'Crocchette di pollo, patatas bravas, tortilla, cheesecake', '鸡肉丸子、辣酱土豆、西班牙土豆饼、芝士蛋糕'),
  },
  duo: {
    id: 'duo', name: 'Duo Tapas', lat: 37.4013898, lng: -5.9938721, placeId: 'ChIJiX4P7_drEg0RPmO3J7UkVbo', priceLevel: 'low', phone: '+34 955 23 85 72',
    desc: T('Tapas de fusión en la calle Calatrava, al norte de la Alameda. Para cenar, abre a las 20:30.',
      'Fusion tapas on Calle Calatrava, north of the Alameda. For dinner it opens at 20:30.',
      'Tapas fusion rue Calatrava, au nord de l’Alameda. Le soir, ouverture à 20h30.',
      'Fusion-Tapas in der Calle Calatrava, nördlich der Alameda. Abends ab 20:30.',
      'Tapas fusion in calle Calatrava, a nord dell’Alameda. A cena apre alle 20:30.',
      'Alameda 北边 Calatrava 街的融合 tapas。晚餐 20:30 开门。'),
    dishes: T('Risotto, carrillada ibérica, pollo al curry, vino de Jerez', 'Risotto, Iberian pork cheek, curry chicken, sherry', 'Risotto, joue de porc ibérique, poulet au curry, xérès', 'Risotto, iberische Schweinebäckchen, Curryhuhn, Sherry', 'Risotto, guancia iberica, pollo al curry, sherry', '烩饭、伊比利亚猪脸肉、咖喱鸡、雪莉酒'),
  },
};

// Fotos reales de algunos locales, con licencia libre (Wikimedia Commons).
// Para el resto, la foto del local la pone Google en vivo cuando está la clave.
const LOCAL_PHOTOS: Record<string, string> = {
  cacharreria: '', // foto aportada por Samuel
  columnas: 'Foto: CarlosVdeHabsburgo · CC BY-SA 4.0',
  rinconcillo: 'Foto: Stefano Vigorelli · CC0',
  romero: 'Foto: Rubén Vique · CC BY 2.0',
};

// Listas por apartamento (orden = orden en la app)
const LISTS: Record<'ibarra' | 'quevedo', Record<Category, string[]>> = {
  ibarra: {
    breakfast: ['nini', 'baralfalfa', 'moya', 'lamala', 'mokambo', 'casamoreno'],
    lunch: ['labartola', 'elpasaje', 'casamikva', 'pesciolino', 'columnas', 'ovejas', 'romero'],
    cafeterias: ['syra', 'bocafloja', 'comissura'],
    dinner: ['abantal', 'mamarracha', 'santelmo', 'malquerer', 'bendala', 'becerrita', 'donaire'],
  },
  quevedo: {
    breakfast: ['cacharreria', 'creme', 'mamaines', 'brunchit', 'muy', 'otto', 'parceria'],
    lunch: ['alameda', 'sanlorenzo', 'andalusi', 'abaceria', 'rinconcillo', 'contenedor'],
    cafeterias: ['virgen', 'caotica', 'recoveco', 'comissura', 'chia'],
    dinner: ['canabota', 'azzait', 'eslava', 'anarubia', 'templo', 'catalina', 'duo'],
  },
};

const APT = { ibarra: [37.3889107, -5.98854], quevedo: [37.3954236, -5.9929671] } as const;

/** Minutos a pie: línea recta × 1,3 (trazado de calles) a 80 m/min. */
export function walkMinutes(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000, rad = Math.PI / 180;
  const x = (lng2 - lng1) * rad * Math.cos(((lat1 + lat2) / 2) * rad);
  const y = (lat2 - lat1) * rad;
  return Math.max(1, Math.round((R * Math.hypot(x, y) * 1.3) / 80));
}

function build(apt: 'ibarra' | 'quevedo'): Restaurant[] {
  const [alat, alng] = APT[apt];
  const out: Restaurant[] = [];
  (Object.keys(LISTS[apt]) as Category[]).forEach((category) => {
    for (const id of LISTS[apt][category]) {
      const p = P[id];
      out.push({
        ...p,
        category,
        distance: walkMinutes(alat, alng, p.lat, p.lng),
        mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + ', Sevilla')}&query_place_id=${p.placeId}`,
        photo: photo(id),
        localPhoto: id in LOCAL_PHOTOS ? { src: photo(`${id}-local`), credit: LOCAL_PHOTOS[id] } : undefined,
        description: p.desc.es,
      });
    }
  });
  return out;
}

export const ibarraRestaurants: Restaurant[] = build('ibarra');
export const quevedoRestaurants: Restaurant[] = build('quevedo');

export const restaurantText = (r: Restaurant, lang: string) => ({
  description: (r.desc as any)[lang] ?? r.desc.es,
  dishes: r.dishes ? ((r.dishes as any)[lang] ?? r.dishes.es) : undefined,
});
