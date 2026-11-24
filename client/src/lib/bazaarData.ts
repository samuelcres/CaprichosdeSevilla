// Bazares («tiendas de todo», tipo chino) más cercanos a cada apartamento.
// Seleccionados a mano con datos de Google Maps (noviembre 2026).
// Fotos propias opcionales: attached_assets/bazaars/<id>.webp (si no hay, se usa la de Google si
// está configurada la clave, y si no, el mapa del itinerario).
import { Apartment, Language } from '@/lib/i18n';

type L6 = Record<Language, string>;
const T = (es: string, en: string, fr: string, de: string, it: string, zh: string): L6 => ({ es, en, fr, de, it, zh });

export interface Bazaar {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  placeId: string;
  phone?: string;
  rating?: number;
  ratingCount?: number;
  meters: number;
  walkMinutes: number;
  /** Horario: lunes-viernes, sábado, domingo (null = cerrado). Lunes distinto si se indica. */
  hours: { wk: string; sat: string; sun: string | null; monClosed?: boolean };
  desc: L6;
  tip?: L6;
}

export const BAZAARS: Record<Apartment, Bazaar[]> = {
  ibarra: [
    {
      id: 'hong-xiang', name: 'Supermercado Hong Xiang', address: 'C. Muñoz y Pabón, 15, 41004 Sevilla',
      lat: 37.3886622, lng: -5.989783, placeId: 'ChIJ7bCj-mdtEg0RvqUSU5sNO3k', rating: 4.2, ratingCount: 21,
      meters: 160, walkMinutes: 2,
      hours: { wk: '9:00–21:30', sat: '9:00–21:30', sun: '10:30–21:30' },
      desc: T(
        'La tienda china más cercana: agua, bebidas frías, snacks, huevos, pan y lo básico de casa. Abre todos los días, también domingos y festivos.',
        'The closest Chinese-run shop: water, cold drinks, snacks, eggs, bread and household basics. Open every day, Sundays and holidays too.',
        'La boutique chinoise la plus proche : eau, boissons fraîches, snacks, œufs, pain et l’essentiel pour la maison. Ouvert tous les jours, dimanches et fériés compris.',
        'Der nächste chinesische Laden: Wasser, kalte Getränke, Snacks, Eier, Brot und Haushaltsgrundbedarf. Täglich geöffnet, auch sonn- und feiertags.',
        'Il negozio cinese più vicino: acqua, bibite fresche, snack, uova, pane e l’essenziale per la casa. Aperto tutti i giorni, anche domenica e festivi.',
        '离公寓最近的华人小店：水、冷饮、零食、鸡蛋、面包和日用品。每天营业，周日和节假日也开。'),
      tip: T('Aceptan tarjeta.', 'Cards accepted.', 'Carte acceptée.', 'Kartenzahlung möglich.', 'Si paga con carta.', '可刷卡。'),
    },
    {
      id: 'la-amistad', name: 'Bazar La Amistad', address: 'C. Águilas, 3, 41004 Sevilla',
      lat: 37.3899015, lng: -5.9895003, placeId: 'ChIJkwyIcwBtEg0RxKzo7sLbwQA', rating: 3.6, ratingCount: 5,
      meters: 190, walkMinutes: 2,
      hours: { wk: '10:00–22:00', sat: '10:00–22:00', sun: null },
      desc: T(
        'Bazar pequeño de todo un poco: menaje, pilas, cargadores, artículos de limpieza y recuerdos (imanes y llaveros).',
        'Small everything-shop: kitchenware, batteries, chargers, cleaning products and souvenirs (magnets and keyrings).',
        'Petit bazar où l’on trouve un peu de tout : ustensiles, piles, chargeurs, produits ménagers et souvenirs (magnets, porte-clés).',
        'Kleiner Gemischtwarenladen: Küchenbedarf, Batterien, Ladegeräte, Putzmittel und Souvenirs (Magnete, Schlüsselanhänger).',
        'Piccolo bazar con un po’ di tutto: casalinghi, pile, caricabatterie, detersivi e souvenir (calamite e portachiavi).',
        '小型杂货店：厨具、电池、充电器、清洁用品和纪念品（冰箱贴、钥匙扣）。'),
      tip: T('Comprueba el precio en caja.', 'Check the price at the till.', 'Vérifiez le prix à la caisse.', 'Preis an der Kasse prüfen.', 'Controlla il prezzo alla cassa.', '结账时请核对价格。'),
    },
    {
      id: 'menendez-pelayo', name: 'Supermercado Alimentación & Bazar', address: 'C. Menéndez Pelayo, 46, 41003 Sevilla',
      lat: 37.38675, lng: -5.9852299, placeId: 'ChIJXR6l46ptEg0RJbkMB_qSpkI', rating: 3.8, ratingCount: 8,
      meters: 480, walkMinutes: 6,
      hours: { wk: '9:00–21:30', sat: '9:00–21:30', sun: '11:00–15:00' },
      desc: T(
        'Alimentación y bazar junto a los Jardines de Murillo: bebidas muy frías a buen precio, fruta, helados y cosas básicas.',
        'Grocery and bazaar by the Murillo Gardens: well-priced ice-cold drinks, fruit, ice creams and basics.',
        'Épicerie-bazar près des jardins de Murillo : boissons bien fraîches à bon prix, fruits, glaces et produits de base.',
        'Lebensmittel und Basar bei den Murillo-Gärten: eiskalte Getränke zu guten Preisen, Obst, Eis und Grundbedarf.',
        'Alimentari e bazar vicino ai Giardini di Murillo: bibite ghiacciate a buon prezzo, frutta, gelati e cose di base.',
        '穆里略花园旁的食品杂货店：冰饮价格实惠，还有水果、冰淇淋和基本用品。'),
    },
    {
      id: 'chino-sevillano', name: 'ElChinoSevillano', address: 'Pl. Carmen Benítez, 7 (esq. C. Arroyo, 1), 41003 Sevilla',
      lat: 37.3909508, lng: -5.98344, placeId: 'ChIJ-0abQRNtEg0RxBPQQkt6vKg', phone: '+34 681 35 91 98', rating: 4.8, ratingCount: 54,
      meters: 640, walkMinutes: 8,
      hours: { wk: '9:30–22:00', sat: '10:30–21:00', sun: '10:30–19:00' },
      desc: T(
        'El bazar mejor valorado de la zona: ferretería, electrónica, menaje, plantas, comida para mascotas y fotocopias, incluso en domingo. Trato muy amable.',
        'The best-rated bazaar in the area: hardware, electronics, homeware, plants, pet food and photocopies, even on Sundays. Very friendly service.',
        'Le bazar le mieux noté du quartier : quincaillerie, électronique, maison, plantes, nourriture pour animaux et photocopies, même le dimanche. Accueil très aimable.',
        'Der bestbewertete Basar der Gegend: Eisenwaren, Elektronik, Haushalt, Pflanzen, Tierfutter und Fotokopien, auch sonntags. Sehr freundlich.',
        'Il bazar più apprezzato della zona: ferramenta, elettronica, casalinghi, piante, cibo per animali e fotocopie, anche di domenica. Personale molto gentile.',
        '附近评价最高的杂货店：五金、电子产品、家居用品、植物、宠物食品和复印服务，周日也营业。服务非常友好。'),
      tip: T('Puedes llamar antes para preguntar si lo tienen.', 'You can call ahead to check they have it.', 'Vous pouvez appeler avant pour vérifier.', 'Vorher anrufen und nachfragen ist möglich.', 'Puoi chiamare prima per chiedere se ce l’hanno.', '可先打电话询问是否有货。'),
    },
  ],
  quevedo: [
    {
      id: 'regina', name: 'Souvenir y Bazar', address: 'C. Regina, 20, 41003 Sevilla',
      lat: 37.3949892, lng: -5.9912724, placeId: 'ChIJVXyMtAVsEg0RI8JvASOl26s', phone: '+34 688 09 70 38', rating: 4.4, ratingCount: 34,
      meters: 200, walkMinutes: 2,
      hours: { wk: '9:30–21:00', sat: '10:00–21:30', sun: '10:30–16:30' },
      desc: T(
        'El más cercano, a la vuelta de la esquina: de todo a precio bajo, bebidas, alimentación básica y recuerdos baratos. Abre también el domingo por la mañana.',
        'The closest one, just round the corner: everything at low prices, drinks, basic groceries and cheap souvenirs. Also open on Sunday mornings.',
        'Le plus proche, juste au coin de la rue : de tout à petit prix, boissons, épicerie de base et souvenirs bon marché. Ouvert aussi le dimanche matin.',
        'Der nächste, gleich um die Ecke: alles zu kleinen Preisen, Getränke, Grundnahrungsmittel und günstige Souvenirs. Auch sonntagvormittags offen.',
        'Il più vicino, dietro l’angolo: di tutto a poco prezzo, bibite, alimentari di base e souvenir economici. Aperto anche la domenica mattina.',
        '最近的一家，就在拐角：各种低价商品、饮料、基本食品和便宜纪念品。周日上午也营业。'),
      tip: T('Si pagas con tarjeta, pide el tique del datáfono.', 'If you pay by card, ask for the card receipt.', 'Si vous payez par carte, demandez le ticket.', 'Bei Kartenzahlung den Beleg verlangen.', 'Se paghi con carta, chiedi lo scontrino del POS.', '刷卡付款时请索要刷卡小票。'),
    },
    {
      id: 'gran-poder', name: 'Bazar Alimentación Mini Market', address: 'C. Jesús del Gran Poder, 6, 41002 Sevilla',
      lat: 37.394036, lng: -5.9959145, placeId: 'ChIJ0UXwLglsEg0RMYp9zfxUifY', phone: '+34 695 89 99 67', rating: 3.8, ratingCount: 18,
      meters: 390, walkMinutes: 5,
      hours: { wk: '10:00–23:00', sat: '10:00–23:30', sun: '10:00–23:00' },
      desc: T(
        '«El chino de Juan», muy querido en el barrio: vino y cerveza frías, agua, recuerdos y lo básico. Abre todos los días hasta tarde.',
        '“Juan’s shop”, a neighbourhood favourite: cold wine and beer, water, souvenirs and basics. Open every day until late.',
        '« Chez Juan », très apprécié du quartier : vin et bière frais, eau, souvenirs et l’essentiel. Ouvert tous les jours jusqu’à tard.',
        '„Juans Laden“, im Viertel sehr beliebt: kalter Wein und Bier, Wasser, Souvenirs und Grundbedarf. Täglich bis spät geöffnet.',
        '«Il negozio di Juan», molto amato nel quartiere: vino e birra freschi, acqua, souvenir e l’essenziale. Aperto tutti i giorni fino a tardi.',
        '“胡安的小店”，深受街坊喜爱：冰镇葡萄酒和啤酒、水、纪念品和基本用品。每天营业到很晚。'),
      tip: T('Por ley, el alcohol no se vende a partir de las 22:00.', 'By law, alcohol is not sold after 22:00.', 'Selon la loi, pas de vente d’alcool après 22h.', 'Gesetzlich kein Alkoholverkauf nach 22 Uhr.', 'Per legge, niente alcolici dopo le 22:00.', '依法22:00后不售酒。'),
    },
    {
      id: 'super-regalo', name: 'Super Regalo Chino', address: 'C. González Cuadrado (junto a C. Feria), 41003 Sevilla',
      lat: 37.3981004, lng: -5.9907761, placeId: 'ChIJMWQ78wZsEg0Rp4pfdjZ9cRk', rating: 3.8, ratingCount: 116,
      meters: 460, walkMinutes: 6,
      hours: { wk: '9:45–15:00 · 17:30–21:30', sat: '9:45–15:00 · 17:30–21:30', sun: '10:45–15:00' },
      desc: T(
        'Un bazar grande «de los de antes», con pasillos largos: herramientas, menaje, ropa, jardín, papelería, enchufes y adaptadores. Muy barato.',
        'A large old-style bazaar with long aisles: tools, kitchenware, clothes, garden, stationery, plugs and adapters. Very cheap.',
        'Un grand bazar à l’ancienne aux longues allées : outils, cuisine, vêtements, jardin, papeterie, prises et adaptateurs. Très bon marché.',
        'Ein großer Basar alter Schule mit langen Gängen: Werkzeug, Küche, Kleidung, Garten, Schreibwaren, Stecker und Adapter. Sehr günstig.',
        'Un grande bazar di una volta, con lunghe corsie: attrezzi, casalinghi, vestiti, giardino, cancelleria, prese e adattatori. Molto economico.',
        '一家传统大型杂货店，货架通道很长：工具、厨具、服装、园艺、文具、插头和转换器。非常便宜。'),
      tip: T('Cierra a mediodía (15:00–17:30). No vende comida.', 'Closes at midday (15:00–17:30). No food.', 'Fermé à midi (15h–17h30). Pas d’alimentation.', 'Mittags geschlossen (15–17:30 Uhr). Keine Lebensmittel.', 'Chiuso a pranzo (15:00–17:30). Niente alimentari.', '中午休息（15:00–17:30），不卖食品。'),
    },
    {
      id: 'calatrava', name: 'Alimentación y Bazar (Alameda)', address: 'C. Calatrava, 2, 41002 Sevilla',
      lat: 37.4011146, lng: -5.9937166, placeId: 'ChIJGUHP6r5tEg0RdVqMf408T4k', rating: 3.5, ratingCount: 25,
      meters: 830, walkMinutes: 10,
      hours: { wk: '9:30–22:00', sat: '9:30–22:00', sun: null, monClosed: true },
      desc: T(
        'Al final de la Alameda de Hércules: mucho más grande por dentro de lo que parece, con muchísimo surtido y buena relación calidad-precio.',
        'At the far end of the Alameda de Hércules: much bigger inside than it looks, with a huge range and good value for money.',
        'Au bout de l’Alameda de Hércules : bien plus grand à l’intérieur qu’il n’y paraît, avec un choix énorme et un bon rapport qualité-prix.',
        'Am Ende der Alameda de Hércules: innen viel größer als gedacht, riesige Auswahl und gutes Preis-Leistungs-Verhältnis.',
        'In fondo all’Alameda de Hércules: dentro è molto più grande di quanto sembri, con tantissima scelta e buon rapporto qualità-prezzo.',
        '位于赫拉克勒斯林荫大道尽头：店内比外观大得多，商品极多，性价比高。'),
      tip: T('Cierra lunes y domingo.', 'Closed Mondays and Sundays.', 'Fermé lundi et dimanche.', 'Montags und sonntags geschlossen.', 'Chiuso lunedì e domenica.', '周一和周日休息。'),
    },
  ],
};

const DAY: Record<Language, { wk: string; tf: string; sat: string; sun: string; mon: string; closed: string }> = {
  es: { wk: 'Lun–vie', tf: 'Mar–vie', sat: 'Sáb', sun: 'Dom', mon: 'Lun', closed: 'cerrado' },
  en: { wk: 'Mon–Fri', tf: 'Tue–Fri', sat: 'Sat', sun: 'Sun', mon: 'Mon', closed: 'closed' },
  fr: { wk: 'Lun–ven', tf: 'Mar–ven', sat: 'Sam', sun: 'Dim', mon: 'Lun', closed: 'fermé' },
  de: { wk: 'Mo–Fr', tf: 'Di–Fr', sat: 'Sa', sun: 'So', mon: 'Mo', closed: 'geschlossen' },
  it: { wk: 'Lun–ven', tf: 'Mar–ven', sat: 'Sab', sun: 'Dom', mon: 'Lun', closed: 'chiuso' },
  zh: { wk: '周一至周五', tf: '周二至周五', sat: '周六', sun: '周日', mon: '周一', closed: '休息' },
};

/** Líneas de horario legibles, agrupando días con el mismo horario. */
export function bazaarHours(h: Bazaar['hours'], lang: Language): string[] {
  const D = DAY[lang] || DAY.en;
  const lines: string[] = [];
  if (h.monClosed) lines.push(`${D.mon}: ${D.closed}`);
  const wkLabel = h.monClosed ? D.tf : D.wk;
  if (h.sat === h.wk && h.sun === h.wk) lines.push(`${wkLabel} · ${D.sat} · ${D.sun}: ${h.wk}`);
  else if (h.sat === h.wk) lines.push(`${wkLabel} · ${D.sat}: ${h.wk}`);
  else lines.push(`${wkLabel}: ${h.wk}`, `${D.sat}: ${h.sat}`);
  if (h.sun !== h.wk || h.sat !== h.wk) lines.push(`${D.sun}: ${h.sun ?? D.closed}`);
  return lines;
}

export const BAZAAR_UI: Record<Language, { title: string; intro: string; route: string; showMap: string; hideMap: string; facade: string; hours: string; note: string; walk: string; call: string; maps: string; reviews: string }> = {
  es: { title: 'Bazares más cercanos', intro: 'Tiendas «de todo» (tipo chino) para comprar lo que se te haya olvidado: cargadores, pilas, menaje, bebidas…', route: 'Cómo llegar a pie', showMap: 'Ver itinerario', hideMap: 'Ocultar itinerario', facade: 'Ver la fachada', hours: 'Horario', note: 'Horarios según Google Maps; pueden cambiar en festivos.', walk: 'min a pie', call: 'Llamar', maps: 'Google Maps', reviews: 'reseñas' },
  en: { title: 'Nearest bazaars', intro: 'Everything-shops (Chinese-run “bazares”) for anything you forgot: chargers, batteries, kitchenware, drinks…', route: 'Walking directions', showMap: 'Show route', hideMap: 'Hide route', facade: 'See the shopfront', hours: 'Opening hours', note: 'Hours from Google Maps; they may change on public holidays.', walk: 'min walk', call: 'Call', maps: 'Google Maps', reviews: 'reviews' },
  fr: { title: 'Bazars les plus proches', intro: 'Magasins « où l’on trouve de tout » (bazars chinois) pour ce que vous avez oublié : chargeurs, piles, ustensiles, boissons…', route: 'Itinéraire à pied', showMap: 'Voir l’itinéraire', hideMap: 'Masquer l’itinéraire', facade: 'Voir la façade', hours: 'Horaires', note: 'Horaires selon Google Maps ; ils peuvent changer les jours fériés.', walk: 'min à pied', call: 'Appeler', maps: 'Google Maps', reviews: 'avis' },
  de: { title: 'Nächste Basare', intro: 'Gemischtwarenläden („Bazares“, meist chinesisch geführt) für alles Vergessene: Ladegeräte, Batterien, Küchenbedarf, Getränke…', route: 'Fußweg', showMap: 'Route anzeigen', hideMap: 'Route ausblenden', facade: 'Ladenfront ansehen', hours: 'Öffnungszeiten', note: 'Zeiten laut Google Maps; an Feiertagen können sie abweichen.', walk: 'Min. zu Fuß', call: 'Anrufen', maps: 'Google Maps', reviews: 'Bewertungen' },
  it: { title: 'Bazar più vicini', intro: 'Negozi «di tutto» (bazar cinesi) per ciò che hai dimenticato: caricabatterie, pile, casalinghi, bibite…', route: 'Percorso a piedi', showMap: 'Vedi percorso', hideMap: 'Nascondi percorso', facade: 'Vedi la facciata', hours: 'Orari', note: 'Orari secondo Google Maps; possono cambiare nei festivi.', walk: 'min a piedi', call: 'Chiama', maps: 'Google Maps', reviews: 'recensioni' },
  zh: { title: '最近的杂货店', intro: '什么都卖的杂货店（多为华人经营），可买到忘带的东西：充电器、电池、厨具、饮料等。', route: '步行路线', showMap: '查看路线', hideMap: '收起路线', facade: '查看店面', hours: '营业时间', note: '营业时间来自 Google 地图，节假日可能变动。', walk: '分钟步行', call: '致电', maps: 'Google 地图', reviews: '条评价' },
};
