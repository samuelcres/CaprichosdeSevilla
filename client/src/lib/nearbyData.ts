// Supermercados, farmacias, cajeros, lavanderías y panaderías más cercanos a cada apartamento.
// Mismo formato que los bazares (bazaarData.ts). Seleccionados a mano con datos de Google Maps
// (noviembre 2026). Distancia a pie estimada desde el portal.
// Fotos propias opcionales: attached_assets/nearby/<id>.webp (si no hay, se usa la de Google si
// está configurada la clave; si no, una cabecera con el icono de la categoría).
import { Apartment, Language } from '@/lib/i18n';
import type { Bazaar } from '@/lib/bazaarData';

type L6 = Record<Language, string>;
const T = (es: string, en: string, fr: string, de: string, it: string, zh: string): L6 => ({ es, en, fr, de, it, zh });

export type NearbyId = 'supermarket' | 'pharmacy' | 'atm' | 'laundry' | 'bakery';
export type NearbyPlace = Bazaar;

const H24 = { wk: '24 h', sat: '24 h', sun: '24 h' };
const DAILY = (h: string) => ({ wk: h, sat: h, sun: h });

/* ---------- Textos repetidos ---------- */
const MY_LAUNDRY_ALFALFA = T(
  'Autoservicio moderno y muy limpio: detergente incluido, instrucciones en inglés y pago con tarjeta.',
  'Modern, spotless self-service laundry: detergent included, instructions in English and card payment.',
  'Laverie libre-service moderne et très propre : lessive incluse, instructions en anglais et paiement par carte.',
  'Moderner, sehr sauberer Waschsalon: Waschmittel inklusive, Anleitung auf Englisch, Kartenzahlung.',
  'Lavanderia self-service moderna e pulitissima: detersivo incluso, istruzioni in inglese e pagamento con carta.',
  '现代化自助洗衣店，非常干净：含洗衣液，有英文说明，可刷卡。');
const MY_LAUNDRY_TIP = T(
  'Tiene pocas lavadoras y se llena rápido: mejor a primera hora.',
  'Few machines and it fills up fast: best first thing in the morning.',
  'Peu de machines, vite pleine : mieux vaut y aller tôt.',
  'Wenige Maschinen, schnell voll: am besten früh morgens.',
  'Poche lavatrici e si riempie presto: meglio di prima mattina.',
  '洗衣机不多，很快就满，最好一早去。');
const CARREFOUR_DAILY_Q = T(
  'Abre todos los días, también domingos, hasta las 22:00.',
  'Open every day, Sundays included, until 22:00.',
  'Ouvert tous les jours, dimanche compris, jusqu’à 22 h.',
  'Täglich geöffnet, auch sonntags, bis 22 Uhr.',
  'Aperto tutti i giorni, anche la domenica, fino alle 22:00.',
  '每天营业（含周日）至22:00。');

export const NEARBY: Record<NearbyId, Record<Apartment, NearbyPlace[]>> = {
  /* ======================= SUPERMERCADOS ======================= */
  supermarket: {
    ibarra: [
      {
        id: 'dia-cabeza-rey', name: 'Supermercados Dia', address: 'C. Cabeza del Rey Don Pedro, 9, 41004 Sevilla',
        lat: 37.3902617, lng: -5.9894233, placeId: 'ChIJ3ZjEQxtsEg0RFfSoH8iHMJw', rating: 4.0, ratingCount: 650,
        meters: 230, walkMinutes: 3,
        hours: { wk: '9:00–21:30', sat: '9:00–21:30', sun: null },
        desc: T(
          'El supermercado más cercano: precios económicos, pan del día, fruta, lácteos y todo lo básico para la casa.',
          'The closest supermarket: budget prices, fresh bread, fruit, dairy and all the household basics.',
          'Le supermarché le plus proche : prix bas, pain du jour, fruits, produits laitiers et tout l’essentiel.',
          'Der nächste Supermarkt: günstige Preise, frisches Brot, Obst, Milchprodukte und alles für den Haushalt.',
          'Il supermercato più vicino: prezzi economici, pane del giorno, frutta, latticini e tutto il necessario.',
          '离公寓最近的超市：价格实惠，有当天面包、水果、奶制品和各种日用品。'),
      },
      {
        id: 'carrefour-alfalfa', name: 'Carrefour Express Alfalfa', address: 'C. Alfalfa, 3, 41004 Sevilla',
        lat: 37.3902054, lng: -5.9903221, placeId: 'ChIJBwKd2BpsEg0RzI-8NXDS_2o', rating: 4.1, ratingCount: 960,
        meters: 290, walkMinutes: 4,
        hours: DAILY('8:30–22:30'),
        desc: T(
          'Pequeño pero muy completo, junto a la plaza de la Alfalfa. Abre todos los días hasta las 22:30: ideal si llegas tarde o es domingo.',
          'Small but well stocked, by Plaza de la Alfalfa. Open every day until 22:30 – handy if you arrive late or on a Sunday.',
          'Petit mais très complet, près de la place de la Alfalfa. Ouvert tous les jours jusqu’à 22 h 30 : idéal si vous arrivez tard ou un dimanche.',
          'Klein, aber gut sortiert, an der Plaza de la Alfalfa. Täglich bis 22:30 Uhr – praktisch bei später Ankunft oder sonntags.',
          'Piccolo ma fornitissimo, vicino a piazza dell’Alfalfa. Aperto tutti i giorni fino alle 22:30: ideale se arrivi tardi o di domenica.',
          '店不大但商品齐全，紧邻阿尔法尔法广场。每天营业至22:30，晚到或周日都很方便。'),
        tip: T('A última hora suele haber cola en caja.', 'Expect a queue at the till in the evening.', 'Le soir, il y a souvent la queue en caisse.', 'Abends oft Schlange an der Kasse.', 'La sera c’è spesso coda alla cassa.', '傍晚结账常要排队。'),
      },
      {
        id: 'mas-rosario', name: 'Supermercado MAS', address: 'Cta. del Rosario, 4, 41004 Sevilla',
        lat: 37.3896911, lng: -5.992062, placeId: 'ChIJgRdlORBsEg0RDNa8uQ8afng', phone: '+34 954 22 90 10', rating: 3.9, ratingCount: 763,
        meters: 440, walkMinutes: 6,
        hours: { wk: '9:00–21:30', sat: '9:00–21:30', sun: null },
        desc: T(
          'El más grande de la zona (cadena andaluza): carnicería al corte, fruta y verdura frescas, buena selección de vinos y zumo de naranja recién exprimido.',
          'The biggest in the area (an Andalusian chain): butcher’s counter, fresh fruit and veg, a good wine selection and freshly squeezed orange juice.',
          'Le plus grand du quartier (chaîne andalouse) : boucherie à la coupe, fruits et légumes frais, bon choix de vins et jus d’orange pressé.',
          'Der größte in der Gegend (andalusische Kette): Fleischtheke, frisches Obst und Gemüse, gute Weinauswahl und frisch gepresster Orangensaft.',
          'Il più grande della zona (catena andalusa): macelleria al banco, frutta e verdura fresche, buona scelta di vini e spremuta d’arancia.',
          '附近最大的超市（安达卢西亚连锁）：有现切肉柜台、新鲜蔬果、丰富的葡萄酒和现榨橙汁。'),
      },
      {
        id: 'carrefour-cervantes', name: 'Carrefour Express', address: 'C. Cardenal Cervantes, 12, 41003 Sevilla',
        lat: 37.39168, lng: -5.98726, placeId: 'ChIJWR9tS8BtEg0R9dH2VdPe1GY', rating: 4.0, ratingCount: 194,
        meters: 440, walkMinutes: 6,
        hours: DAILY('8:30–23:00'),
        desc: T(
          'El que cierra más tarde: todos los días hasta las 23:00. Pequeño, con lo esencial y platos preparados para calentar.',
          'The one that closes latest: every day until 23:00. Small, with the essentials and ready meals to heat up.',
          'Celui qui ferme le plus tard : tous les jours jusqu’à 23 h. Petit, avec l’essentiel et des plats préparés à réchauffer.',
          'Schließt am spätesten: täglich bis 23 Uhr. Klein, mit dem Nötigsten und Fertiggerichten zum Aufwärmen.',
          'Quello che chiude più tardi: tutti i giorni fino alle 23:00. Piccolo, con l’essenziale e piatti pronti da scaldare.',
          '关门最晚的一家：每天营业至23:00。店小，有基本用品和可加热的熟食。'),
        tip: T('Revisa el tique al pagar.', 'Check your receipt when you pay.', 'Vérifiez votre ticket en payant.', 'Beim Bezahlen den Kassenbon prüfen.', 'Controlla lo scontrino quando paghi.', '付款时请核对小票。'),
      },
    ],
    quevedo: [
      {
        id: 'carrefour-feria', name: 'Carrefour Express Feria', address: 'C. Feria, 1-3, 41003 Sevilla',
        lat: 37.395539, lng: -5.991453, placeId: 'ChIJj4h7zAVsEg0R38uSItXhcKQ', rating: 3.8, ratingCount: 446,
        meters: 190, walkMinutes: 2,
        hours: { wk: '9:00–22:00', sat: '9:00–22:00', sun: '10:00–22:00' },
        desc: T(
          'El más cercano, al principio de la calle Feria. Abre todos los días, también domingos.',
          'The closest one, at the start of Calle Feria. Open every day, Sundays included.',
          'Le plus proche, au début de la rue Feria. Ouvert tous les jours, dimanche compris.',
          'Der nächste, am Anfang der Calle Feria. Täglich geöffnet, auch sonntags.',
          'Il più vicino, all’inizio di calle Feria. Aperto tutti i giorni, anche la domenica.',
          '离公寓最近，位于费里亚街口。每天营业，周日也开。'),
      },
      {
        id: 'carrefour-zurbaran', name: 'Carrefour Express', address: 'Pl. Zurbarán, 4, 41003 Sevilla',
        lat: 37.394009, lng: -5.992731, placeId: 'ChIJn0Awk0NtEg0RJHLGcYJJa5c', rating: 4.2, ratingCount: 133,
        meters: 210, walkMinutes: 3,
        hours: { wk: '9:00–22:00', sat: '9:00–22:00', sun: '10:00–22:00' },
        desc: T(
          'En la tranquila plaza de Zurbarán: bebidas frías, fruta y lo básico. ' + CARREFOUR_DAILY_Q.es,
          'On quiet Plaza de Zurbarán: cold drinks, fruit and the basics. ' + CARREFOUR_DAILY_Q.en,
          'Sur la paisible place de Zurbarán : boissons fraîches, fruits et l’essentiel. ' + CARREFOUR_DAILY_Q.fr,
          'An der ruhigen Plaza de Zurbarán: kalte Getränke, Obst und das Nötigste. ' + CARREFOUR_DAILY_Q.de,
          'Nella tranquilla piazza Zurbarán: bibite fresche, frutta e l’essenziale. ' + CARREFOUR_DAILY_Q.it,
          '位于安静的苏巴朗广场：冷饮、水果和基本用品。' + CARREFOUR_DAILY_Q.zh),
      },
      {
        id: 'carrefour-amor-dios', name: 'Carrefour Express', address: 'C. Amor de Dios, 45, 41002 Sevilla',
        lat: 37.396494, lng: -5.99406, placeId: 'ChIJ9fOjrAhsEg0Rc0f6JtMUzk0', rating: 3.9, ratingCount: 339,
        meters: 210, walkMinutes: 3,
        hours: { wk: '9:00–22:00', sat: '9:00–22:00', sun: '10:00–22:00' },
        desc: T(
          'Junto a la Alameda de Hércules: práctico a la vuelta de tapas o de cenar. ' + CARREFOUR_DAILY_Q.es,
          'Next to the Alameda de Hércules – handy on the way back from tapas or dinner. ' + CARREFOUR_DAILY_Q.en,
          'Près de l’Alameda de Hércules : pratique au retour des tapas ou du dîner. ' + CARREFOUR_DAILY_Q.fr,
          'An der Alameda de Hércules – praktisch auf dem Rückweg vom Tapas-Essen. ' + CARREFOUR_DAILY_Q.de,
          'Vicino all’Alameda de Hércules: comodo tornando dalle tapas o da cena. ' + CARREFOUR_DAILY_Q.it,
          '紧邻赫拉克勒斯林荫大道，吃完小吃或晚饭回来顺路。' + CARREFOUR_DAILY_Q.zh),
      },
      {
        id: 'mas-jeronimo', name: 'Supermercado MAS', address: 'Pl. Padre Jerónimo de Córdoba, 7, 41003 Sevilla',
        lat: 37.3928127, lng: -5.9865096, placeId: 'ChIJf0mkIgNsEg0RdqAopGyz6l8', phone: '+34 954 22 04 18', rating: 4.0, ratingCount: 584,
        meters: 870, walkMinutes: 11,
        hours: { wk: '9:00–21:30', sat: '9:00–21:30', sun: null },
        desc: T(
          'Supermercado grande de la cadena andaluza MAS, para hacer una compra completa con producto fresco y mucha más variedad.',
          'A large store of the Andalusian MAS chain, for a full shop with fresh produce and a much wider range.',
          'Grand supermarché de la chaîne andalouse MAS, pour des courses complètes avec des produits frais et bien plus de choix.',
          'Großer Markt der andalusischen Kette MAS – für den Wocheneinkauf mit Frischware und viel mehr Auswahl.',
          'Supermercato grande della catena andalusa MAS, per una spesa completa con prodotti freschi e molta più scelta.',
          '安达卢西亚连锁MAS的大型超市，适合大采购，生鲜多、品种全。'),
      },
    ],
  },

  /* ======================= FARMACIAS ======================= */
  pharmacy: {
    ibarra: [
      {
        id: 'farmacia-alfalfa', name: 'Farmacia de la Alfalfa', address: 'Pl. de la Alfalfa, 11, 41004 Sevilla',
        lat: 37.39028, lng: -5.9909854, placeId: 'ChIJGRTkJhtsEg0RIZ4qckqXYXY', phone: '+34 954 22 64 47', rating: 4.3, ratingCount: 175,
        meters: 360, walkMinutes: 4,
        hours: { wk: '9:00–22:00', sat: '9:30–22:00', sun: '9:30–22:00' },
        desc: T(
          'Abierta todos los días hasta las 22:00, también domingos. Personal amable y buenos precios en cosmética.',
          'Open every day until 22:00, Sundays included. Friendly staff and good prices on skincare.',
          'Ouverte tous les jours jusqu’à 22 h, dimanche compris. Personnel aimable et bons prix en cosmétique.',
          'Täglich bis 22 Uhr geöffnet, auch sonntags. Freundliches Personal, gute Preise bei Kosmetik.',
          'Aperta tutti i giorni fino alle 22:00, anche la domenica. Personale gentile e buoni prezzi sulla cosmetica.',
          '每天营业至22:00，周日也开。店员友好，护肤品价格实惠。'),
        tip: T('Te ayudan con el tax free (devolución del IVA) si vives fuera de la UE.', 'They help with tax-free (VAT refund) if you live outside the EU.', 'Ils vous aident pour la détaxe si vous résidez hors UE.', 'Hilfe bei Tax-free (Mehrwertsteuererstattung) für Nicht-EU-Bürger.', 'Ti aiutano con il tax free se risiedi fuori dall’UE.', '非欧盟居民可协助办理退税。'),
      },
      {
        id: 'farmacia-puerta-carmona', name: 'Farmacia Puerta de Carmona', address: 'Av. de Menéndez Pelayo, 69, 41003 Sevilla',
        lat: 37.3891612, lng: -5.9846921, placeId: 'ChIJZ83DdB1sEg0RW65GEAzZeA0', phone: '+34 854 67 22 09', rating: 4.3, ratingCount: 62,
        meters: 460, walkMinutes: 6,
        hours: { wk: '9:00–21:00', sat: '9:00–21:00', sun: null },
        desc: T(
          'Farmacia de barrio con trato muy atento, en la avenida de Menéndez Pelayo, junto a la antigua Puerta de Carmona.',
          'A neighbourhood pharmacy with very attentive service, on Avenida de Menéndez Pelayo by the old Puerta de Carmona.',
          'Pharmacie de quartier au service très attentionné, avenue Menéndez Pelayo, près de l’ancienne Puerta de Carmona.',
          'Apotheke im Viertel mit sehr aufmerksamer Beratung, an der Avenida de Menéndez Pelayo bei der alten Puerta de Carmona.',
          'Farmacia di quartiere molto attenta ai clienti, in avenida Menéndez Pelayo vicino all’antica Puerta de Carmona.',
          '社区药房，服务周到，位于梅内德斯·佩拉约大道、旧卡莫纳城门旁。'),
      },
      {
        id: 'farmacia-santa-catalina', name: 'Farmacia Santa Catalina', address: 'C. Alhóndiga, 6, 41003 Sevilla',
        lat: 37.393254, lng: -5.988331, placeId: 'ChIJhY2tYwNsEg0R-tK8JsTN_ag', phone: '+34 954 22 19 85', rating: 4.4, ratingCount: 52,
        meters: 650, walkMinutes: 8,
        hours: { wk: '9:00–21:00', sat: '9:00–21:00', sun: null },
        desc: T(
          'Junto a la iglesia de Santa Catalina, con horario continuo de lunes a sábado.',
          'Next to the church of Santa Catalina, open all day Monday to Saturday.',
          'Près de l’église Santa Catalina, ouverte en continu du lundi au samedi.',
          'Neben der Kirche Santa Catalina, Montag bis Samstag durchgehend geöffnet.',
          'Accanto alla chiesa di Santa Catalina, orario continuato dal lunedì al sabato.',
          '位于圣卡塔琳娜教堂旁，周一至周六全天营业。'),
      },
      {
        id: 'farmacia-amador-24h', name: 'Farmacia Amador de los Ríos (24 h)', address: 'C. Amador de los Ríos, 31, 41003 Sevilla',
        lat: 37.3921922, lng: -5.9827871, placeId: 'ChIJg4yMDBtsEg0R3E8SSyWmv7Q', phone: '+34 954 42 11 53', rating: 4.3, ratingCount: 195,
        meters: 840, walkMinutes: 10,
        hours: H24,
        desc: T(
          'Abierta las 24 horas todos los días: la opción para una urgencia de noche o en festivo.',
          'Open 24 hours, every day – the place to go for a night-time or holiday emergency.',
          'Ouverte 24 h/24, tous les jours : l’adresse pour une urgence la nuit ou un jour férié.',
          'Rund um die Uhr geöffnet, jeden Tag – die Adresse für nächtliche Notfälle oder Feiertage.',
          'Aperta 24 ore su 24, tutti i giorni: il posto giusto per un’urgenza di notte o nei festivi.',
          '全年24小时营业，夜间或节假日急需时可前往。'),
        tip: T('De madrugada, puedes llamar antes para confirmar que tienen el medicamento.', 'At night you can call ahead to check they have your medicine.', 'La nuit, vous pouvez appeler avant pour vérifier qu’ils ont le médicament.', 'Nachts vorher anrufen, ob das Medikament vorrätig ist.', 'Di notte puoi chiamare prima per verificare che abbiano il farmaco.', '深夜可先打电话确认是否有药。'),
      },
    ],
    quevedo: [
      {
        id: 'farmacia-trajano', name: 'Farmacia Trajano', address: 'C. Trajano, 40, 41002 Sevilla',
        lat: 37.396133, lng: -5.994685, placeId: 'ChIJ83lETA9sEg0RmqLkmh5SBZ4', phone: '+34 954 38 57 06', rating: 4.2, ratingCount: 51,
        meters: 230, walkMinutes: 3,
        hours: { wk: '9:30–21:00', sat: '9:30–22:00', sun: '9:30–22:00' },
        desc: T(
          'La más cercana que abre todos los días, también sábados y domingos hasta las 22:00.',
          'The closest one open every day, with weekend hours until 22:00.',
          'La plus proche ouverte tous les jours, le week-end jusqu’à 22 h.',
          'Die nächste, die täglich geöffnet hat – am Wochenende bis 22 Uhr.',
          'La più vicina aperta tutti i giorni, nel fine settimana fino alle 22:00.',
          '离公寓最近、每天营业的药房，周末营业至22:00。'),
      },
      {
        id: 'farmacia-la-venera', name: 'Farmacia La Venera', address: 'C. José Gestoso, 2, 41003 Sevilla',
        lat: 37.393716, lng: -5.992674, placeId: 'ChIJlUZYdAVsEg0RYJuXY8Z89jU', phone: '+34 954 22 46 19', rating: 4.5, ratingCount: 20,
        meters: 260, walkMinutes: 3,
        hours: { wk: '9:30–14:00 · 17:30–20:30', sat: '9:30–14:00', sun: null },
        desc: T(
          'Farmacia tradicional muy bien valorada, junto a la plaza de la Encarnación (Las Setas).',
          'A highly rated traditional pharmacy next to Plaza de la Encarnación (Las Setas).',
          'Pharmacie traditionnelle très bien notée, près de la place de la Encarnación (Las Setas).',
          'Sehr gut bewertete traditionelle Apotheke an der Plaza de la Encarnación (Las Setas).',
          'Farmacia tradizionale molto apprezzata, vicino a piazza dell’Encarnación (Las Setas).',
          '口碑很好的传统药房，紧邻恩卡纳西翁广场（都市阳伞）。'),
      },
      {
        id: 'farmacia-san-juan-palma', name: 'Farmacia San Juan de la Palma', address: 'C. San Juan de la Palma, 15, 41003 Sevilla',
        lat: 37.395086, lng: -5.990658, placeId: 'ChIJpRLlSARsEg0RUajs87OXAOs', phone: '+34 954 56 44 16', rating: 4.6, ratingCount: 38,
        meters: 280, walkMinutes: 4,
        hours: { wk: '9:30–14:00 · 17:00–20:00', sat: '9:30–14:00', sun: null },
        desc: T(
          'Farmacia de barrio con trato cercano y muy buenas valoraciones.',
          'A friendly neighbourhood pharmacy with excellent reviews.',
          'Pharmacie de quartier chaleureuse et très bien notée.',
          'Freundliche Apotheke im Viertel mit ausgezeichneten Bewertungen.',
          'Farmacia di quartiere cordiale e con ottime recensioni.',
          '亲切的社区药房，评价很高。'),
      },
      {
        id: 'farmacia-alameda', name: 'Farmacia Alameda', address: 'Alameda de Hércules, 7, 41002 Sevilla',
        lat: 37.397941, lng: -5.994391, placeId: 'ChIJk7HHmQhsEg0RQq0Ue-quHSE', phone: '+34 954 38 01 59', rating: 3.8, ratingCount: 84,
        meters: 420, walkMinutes: 5,
        hours: { wk: '8:00–22:00', sat: '9:30–22:00', sun: '9:30–22:00' },
        desc: T(
          'En la Alameda de Hércules: abre temprano entre semana y todos los días hasta las 22:00.',
          'On the Alameda de Hércules: opens early on weekdays and every day until 22:00.',
          'Sur l’Alameda de Hércules : ouvre tôt en semaine et tous les jours jusqu’à 22 h.',
          'An der Alameda de Hércules: werktags früh geöffnet und täglich bis 22 Uhr.',
          'Sull’Alameda de Hércules: apre presto nei giorni feriali e tutti i giorni fino alle 22:00.',
          '位于赫拉克勒斯林荫大道，工作日开门早，每天营业至22:00。'),
      },
    ],
  },

  /* ======================= CAJEROS ======================= */
  atm: {
    ibarra: [
      {
        id: 'atm-caixabank-menendez-pelayo', name: 'Cajero CaixaBank', address: 'Av. de Menéndez Pelayo, 41, 41003 Sevilla',
        lat: 37.38801, lng: -5.985224, placeId: 'ChIJy5Iq-PdtEg0R7oO3uGFQXYM',
        meters: 410, walkMinutes: 5, hours: H24,
        desc: T(
          'Cajero de CaixaBank a pie de calle en la avenida de Menéndez Pelayo, disponible las 24 horas.',
          'Street-side CaixaBank ATM on Avenida de Menéndez Pelayo, available 24 hours.',
          'Distributeur CaixaBank côté rue, avenue Menéndez Pelayo, disponible 24 h/24.',
          'CaixaBank-Automat direkt an der Straße, Avenida de Menéndez Pelayo, rund um die Uhr.',
          'Bancomat CaixaBank su strada, in avenida Menéndez Pelayo, disponibile 24 ore su 24.',
          '梅内德斯·佩拉约大道上的CaixaBank街边取款机，24小时可用。'),
      },
      {
        id: 'atm-caixabank-sierpes', name: 'Cajero CaixaBank', address: 'C. Sierpes, 85, 41004 Sevilla',
        lat: 37.3894603, lng: -5.9938022, placeId: 'ChIJM_U6n_ltEg0R6Gpd7bLTjGU',
        meters: 640, walkMinutes: 8, hours: H24,
        desc: T(
          'En la calle Sierpes, la gran calle comercial del centro: práctico si sales de paseo.',
          'On Calle Sierpes, the main shopping street – handy when you head into the centre.',
          'Rue Sierpes, la grande rue commerçante du centre : pratique en balade.',
          'In der Calle Sierpes, der großen Einkaufsstraße – praktisch beim Stadtbummel.',
          'In calle Sierpes, la grande via dello shopping: comodo quando vai in centro.',
          '位于市中心主要购物街谢尔佩斯街，逛街时很方便。'),
      },
      {
        id: 'atm-unicaja-alemanes', name: 'Cajero Unicaja', address: 'C. Alemanes, 11, 41004 Sevilla',
        lat: 37.386795, lng: -5.993555, placeId: 'ChIJUUZfg8BtEg0RaNq3f9wwr20', rating: 3.9, ratingCount: 18,
        meters: 680, walkMinutes: 8, hours: H24,
        desc: T(
          'Junto a la Catedral, en la calle Alemanes. Disponible las 24 horas.',
          'Next to the Cathedral, on Calle Alemanes. Available 24 hours.',
          'Près de la cathédrale, rue Alemanes. Disponible 24 h/24.',
          'Neben der Kathedrale, Calle Alemanes. Rund um die Uhr.',
          'Accanto alla Cattedrale, in calle Alemanes. Disponibile 24 ore su 24.',
          '紧邻大教堂的阿莱曼内斯街，24小时可用。'),
      },
    ],
    quevedo: [
      {
        id: 'atm-revolut-orfila', name: 'Cajero Revolut', address: 'C. Orfila, 6B, 41003 Sevilla',
        lat: 37.393499, lng: -5.993753, placeId: 'ChIJL1j5zeJtEg0RPhEbccXrXEs', rating: 4.0, ratingCount: 4,
        meters: 300, walkMinutes: 4, hours: H24,
        desc: T(
          'El cajero 24 horas más cercano al apartamento, en la calle Orfila.',
          'The closest 24-hour ATM to the apartment, on Calle Orfila.',
          'Le distributeur 24 h/24 le plus proche de l’appartement, rue Orfila.',
          'Der nächste 24-Stunden-Automat, in der Calle Orfila.',
          'Il bancomat 24 ore più vicino all’appartamento, in calle Orfila.',
          '离公寓最近的24小时取款机，位于奥尔菲拉街。'),
        tip: T('Mira la comisión que aparece en pantalla antes de aceptar.', 'Check the fee shown on screen before accepting.', 'Vérifiez les frais affichés avant d’accepter.', 'Vor dem Bestätigen die angezeigte Gebühr prüfen.', 'Controlla la commissione sullo schermo prima di accettare.', '确认前请查看屏幕上显示的手续费。'),
      },
      {
        id: 'atm-caixabank-larana', name: 'Cajero CaixaBank', address: 'C. Laraña, 2, 41003 Sevilla',
        lat: 37.392892, lng: -5.992603, placeId: 'ChIJQdkC34ttEg0RWv2LR-cmFVs',
        meters: 380, walkMinutes: 5, hours: H24,
        desc: T(
          'Cajero de banco a pie de calle, de camino a Las Setas y la plaza de la Encarnación.',
          'Street-side bank ATM on the way to Las Setas and Plaza de la Encarnación.',
          'Distributeur bancaire côté rue, sur le chemin de Las Setas et de la place de la Encarnación.',
          'Bankautomat an der Straße, auf dem Weg zu Las Setas und zur Plaza de la Encarnación.',
          'Bancomat su strada, sulla via per Las Setas e piazza dell’Encarnación.',
          '街边银行取款机，在去都市阳伞和恩卡纳西翁广场的路上。'),
      },
      {
        id: 'atm-santander-campana', name: 'Cajero Santander', address: 'C. Campana, 1D, 41004 Sevilla',
        lat: 37.392846, lng: -5.995218, placeId: 'ChIJqZ-kvQ9sEg0Ru3DaVrNc8VU', rating: 3.5, ratingCount: 11,
        meters: 470, walkMinutes: 6, hours: H24,
        desc: T(
          'En La Campana, al principio de la calle Sierpes. Disponible las 24 horas.',
          'At La Campana, where Calle Sierpes begins. Available 24 hours.',
          'À La Campana, au début de la rue Sierpes. Disponible 24 h/24.',
          'An der Campana, am Anfang der Calle Sierpes. Rund um die Uhr.',
          'A La Campana, all’inizio di calle Sierpes. Disponibile 24 ore su 24.',
          '位于坎帕纳广场、谢尔佩斯街口，24小时可用。'),
      },
      {
        id: 'atm-unicaja-sierpes', name: 'Cajero Unicaja', address: 'C. Sierpes, 22, 41004 Sevilla',
        lat: 37.391474, lng: -5.994749, placeId: 'ChIJC7wYMSBtEg0RhtZINcb3iTg', rating: 3.3, ratingCount: 8,
        meters: 630, walkMinutes: 8, hours: H24,
        desc: T(
          'En plena calle Sierpes, la gran calle comercial del centro.',
          'Right on Calle Sierpes, the main shopping street in the centre.',
          'En pleine rue Sierpes, la grande rue commerçante du centre.',
          'Mitten in der Calle Sierpes, der großen Einkaufsstraße.',
          'In piena calle Sierpes, la grande via dello shopping.',
          '位于市中心主要购物街谢尔佩斯街。'),
      },
    ],
  },

  /* ======================= LAVANDERÍAS ======================= */
  laundry: {
    ibarra: [
      {
        id: 'my-laundry-alfalfa', name: 'My Laundry Alfalfa', address: 'C. Muñoz y Pabón, 2, 41004 Sevilla',
        lat: 37.3893146, lng: -5.9900658, placeId: 'ChIJweNNSHttEg0RsBTK8KI87ec', phone: '+34 623 19 96 61', rating: 4.8, ratingCount: 227,
        meters: 200, walkMinutes: 2,
        hours: DAILY('9:00–21:00'),
        desc: MY_LAUNDRY_ALFALFA,
        tip: MY_LAUNDRY_TIP,
      },
      {
        id: 'my-laundry-mini', name: 'My Laundry Mini', address: 'C. Santa María la Blanca, 2, 41004 Sevilla',
        lat: 37.3864051, lng: -5.987993, placeId: 'ChIJ81YtTABtEg0RUDmYPVug2qQ', phone: '+34 623 19 96 61', rating: 4.8, ratingCount: 55,
        meters: 380, walkMinutes: 5,
        hours: DAILY('8:00–21:00'),
        desc: T(
          'Pequeña y muy cuidada, con detergente incluido y pago con tarjeta. Hay cafeterías al lado para esperar.',
          'Small and well kept, detergent included and card payment. There are cafés next door while you wait.',
          'Petite et très soignée, lessive incluse et paiement par carte. Des cafés juste à côté pour patienter.',
          'Klein und gepflegt, Waschmittel inklusive, Kartenzahlung. Cafés gleich nebenan zum Warten.',
          'Piccola e curatissima, detersivo incluso e pagamento con carta. Accanto ci sono bar per aspettare.',
          '小而整洁，含洗衣液，可刷卡。旁边有咖啡馆可以等候。'),
      },
      {
        id: 'speed-queen-amador', name: 'Lavandería Speed Queen', address: 'C. Amador de los Ríos, 3, 41003 Sevilla',
        lat: 37.3891888, lng: -5.9827394, placeId: 'ChIJVyVjg6duEg0RjOJbJolOf4k', phone: '+34 667 71 61 01', rating: 4.0, ratingCount: 259,
        meters: 690, walkMinutes: 9,
        hours: DAILY('7:00–22:00'),
        desc: T(
          'La que abre más horas (de 7:00 a 22:00). Detergente y suavizante incluidos en el lavado.',
          'The longest opening hours (7:00–22:00). Detergent and softener included in the wash.',
          'L’amplitude horaire la plus large (7 h–22 h). Lessive et adoucissant inclus.',
          'Die längsten Öffnungszeiten (7–22 Uhr). Waschmittel und Weichspüler inklusive.',
          'L’orario più lungo (7:00–22:00). Detersivo e ammorbidente inclusi.',
          '营业时间最长（7:00–22:00），洗衣含洗衣液和柔顺剂。'),
        tip: T('Funciona con monedas (no acepta las de 2 €); la máquina de cambio solo admite billetes.', 'Coins only (no €2 coins); the change machine only takes notes.', 'Pièces uniquement (pas de 2 €) ; le changeur n’accepte que les billets.', 'Nur Münzen (keine 2-€-Münzen); der Wechsler nimmt nur Scheine.', 'Solo monete (non da 2 €); il cambiamonete accetta solo banconote.', '只收硬币（不收2欧元），换币机只收纸币。'),
      },
    ],
    quevedo: [
      {
        id: 'my-self-laundry', name: 'My Self Laundry', address: 'C. Jesús del Gran Poder, 5, 41002 Sevilla',
        lat: 37.394676, lng: -5.9959963, placeId: 'ChIJNYnTGw9sEg0RM9-bPHvRqD8', phone: '+34 640 88 45 05', rating: 4.6, ratingCount: 425,
        meters: 370, walkMinutes: 5,
        hours: DAILY('9:00–21:00'),
        desc: T(
          'Autoservicio limpio y fácil de usar: jabón y suavizante incluidos, lavadoras de varios tamaños y pago con tarjeta o efectivo.',
          'Clean, easy self-service laundry: soap and softener included, several machine sizes, card or cash.',
          'Libre-service propre et simple : lessive et adoucissant inclus, machines de plusieurs tailles, carte ou espèces.',
          'Sauberer, einfacher Waschsalon: Waschmittel und Weichspüler inklusive, verschiedene Größen, Karte oder bar.',
          'Self-service pulito e facile: detersivo e ammorbidente inclusi, lavatrici di varie misure, carta o contanti.',
          '干净易用的自助洗衣店：含洗衣液和柔顺剂，洗衣机有多种容量，可刷卡或付现金。'),
        tip: T('Lavadora de 9 kg ≈ 5 €; de 15 kg ≈ 7,50 €.', '9 kg washer ≈ €5; 15 kg ≈ €7.50.', 'Machine 9 kg ≈ 5 € ; 15 kg ≈ 7,50 €.', '9-kg-Maschine ≈ 5 €; 15 kg ≈ 7,50 €.', 'Lavatrice da 9 kg ≈ 5 €; da 15 kg ≈ 7,50 €.', '9公斤洗衣机约5欧元，15公斤约7.5欧元。'),
      },
      {
        id: 'lavanderia-bailen', name: 'Lavandería Autoservicio Bailén', address: 'C. Bailén, 6, 41001 Sevilla',
        lat: 37.39074, lng: -5.998059, placeId: 'ChIJ1TrIgpFtEg0RfFJQsuvmrW8', phone: '+34 614 47 08 09', rating: 4.6, ratingCount: 65,
        meters: 920, walkMinutes: 12,
        hours: DAILY('8:00–22:00'),
        desc: T(
          'Abre de 8:00 a 22:00 todos los días, cerca del Museo de Bellas Artes.',
          'Open 8:00–22:00 every day, near the Fine Arts Museum.',
          'Ouverte de 8 h à 22 h tous les jours, près du musée des Beaux-Arts.',
          'Täglich 8–22 Uhr geöffnet, nahe dem Museum der Schönen Künste.',
          'Aperta dalle 8:00 alle 22:00 tutti i giorni, vicino al Museo di Belle Arti.',
          '每天8:00–22:00营业，靠近美术馆。'),
      },
      {
        id: 'my-laundry-alfalfa', name: 'My Laundry Alfalfa', address: 'C. Muñoz y Pabón, 2, 41004 Sevilla',
        lat: 37.3893146, lng: -5.9900658, placeId: 'ChIJweNNSHttEg0RsBTK8KI87ec', phone: '+34 623 19 96 61', rating: 4.8, ratingCount: 227,
        meters: 980, walkMinutes: 12,
        hours: DAILY('9:00–21:00'),
        desc: MY_LAUNDRY_ALFALFA,
        tip: MY_LAUNDRY_TIP,
      },
    ],
  },

  /* ======================= PANADERÍAS ======================= */
  bakery: {
    ibarra: [
      {
        id: 'panypiu', name: 'PANYPIU', address: 'C. Cabeza del Rey Don Pedro, 15, 41004 Sevilla',
        lat: 37.3899245, lng: -5.9896867, placeId: 'ChIJT7VeahtsEg0RJvkal6y3jAM', phone: '+34 954 21 93 48', rating: 4.4, ratingCount: 2377,
        meters: 210, walkMinutes: 3,
        hours: { wk: '9:00–21:00', sat: '9:00–20:00', sun: null },
        desc: T(
          'Panadería-obrador con cafetería: pan, bollería, focaccias, quiches y palmeras. Perfecta para desayunar.',
          'Bakery and café: bread, pastries, focaccia, quiches and palmeras. Perfect for breakfast.',
          'Boulangerie-café : pain, viennoiseries, focaccias, quiches et palmiers. Parfait pour le petit-déjeuner.',
          'Bäckerei mit Café: Brot, Gebäck, Focaccia, Quiches und Palmeras. Ideal zum Frühstück.',
          'Panetteria con caffetteria: pane, brioche, focacce, quiche e palmiers. Perfetta per la colazione.',
          '烘焙坊兼咖啡馆：面包、酥点、佛卡夏、咸派和蝴蝶酥，非常适合吃早餐。'),
      },
      {
        id: 'horno-buen-viaje', name: 'Horno Cristo del Buen Viaje', address: 'C. Cristo del Buen Viaje, 5, 41003 Sevilla',
        lat: 37.3894478, lng: -5.9861498, placeId: 'ChIJgxyONcltEg0R9ZkgPk1ll30', phone: '+34 954 53 38 31', rating: 4.7, ratingCount: 124,
        meters: 290, walkMinutes: 4,
        hours: { wk: '8:30–14:30', sat: '8:30–14:00', sun: null },
        desc: T(
          'Horno tradicional de barrio: pan, magdalenas, palmeritas, bizcochos caseros y empanadas.',
          'A traditional neighbourhood bakery: bread, muffins, palmeritas, homemade sponge cakes and empanadas.',
          'Boulangerie traditionnelle de quartier : pain, madeleines, petits palmiers, gâteaux maison et empanadas.',
          'Traditionelle Bäckerei im Viertel: Brot, Muffins, Palmeritas, hausgemachte Kuchen und Empanadas.',
          'Forno tradizionale di quartiere: pane, muffin, palmierini, torte fatte in casa ed empanadas.',
          '传统社区面包房：面包、玛芬、小蝴蝶酥、自制蛋糕和馅饼。'),
        tip: T('Solo efectivo.', 'Cash only.', 'Espèces uniquement.', 'Nur Barzahlung.', 'Solo contanti.', '只收现金。'),
      },
      {
        id: 'horno-doncellas', name: 'Horno Las Doncellas', address: 'C. Doncellas, 3, 41004 Sevilla',
        lat: 37.3861881, lng: -5.9872171, placeId: 'ChIJK0cCIBxsEg0Rcu0b2DXLoAw', phone: '+34 954 42 25 60', rating: 4.5, ratingCount: 178,
        meters: 430, walkMinutes: 5,
        hours: DAILY('8:00–14:30'),
        desc: T(
          'Horno clásico del barrio de Santa Cruz con mucha variedad de panes y bocadillos recién hechos. Abre también el domingo por la mañana.',
          'A classic Santa Cruz bakery with lots of breads and freshly made sandwiches. Also open on Sunday mornings.',
          'Boulangerie classique du quartier de Santa Cruz : nombreux pains et sandwichs minute. Ouverte aussi le dimanche matin.',
          'Klassische Bäckerei im Viertel Santa Cruz mit vielen Brotsorten und frisch belegten Brötchen. Auch sonntagvormittags offen.',
          'Forno classico del quartiere di Santa Cruz con tanti tipi di pane e panini appena fatti. Aperto anche la domenica mattina.',
          '圣十字区的老面包房，面包种类多，有现做三明治。周日上午也营业。'),
      },
      {
        id: 'masa-bambini', name: 'Panadería Masa Bambini', address: 'C. Huelva, 6, 41004 Sevilla',
        lat: 37.3900768, lng: -5.9920818, placeId: 'ChIJ37u0wxpsEg0RJkPPEr_vpyY', phone: '+34 600 41 44 40', rating: 4.7, ratingCount: 127,
        meters: 460, walkMinutes: 6,
        hours: { wk: '6:30–18:30', sat: null, sun: null },
        desc: T(
          'Obrador artesano con ingredientes ecológicos; su pan de naranja es famoso. Trato muy amable.',
          'Artisan bakery using organic ingredients – famous for its orange bread. Very friendly.',
          'Boulangerie artisanale aux ingrédients bio, réputée pour son pain à l’orange. Très accueillante.',
          'Handwerksbäckerei mit Bio-Zutaten, berühmt für ihr Orangenbrot. Sehr freundlich.',
          'Panificio artigianale con ingredienti biologici, famoso il pane all’arancia. Molto gentili.',
          '使用有机原料的手工面包坊，橙子面包很有名，店主非常热情。'),
      },
    ],
    quevedo: [
      {
        id: 'santagloria-alameda', name: 'Santagloria Coffee & Bakery', address: 'Alameda de Hércules, 3, 41002 Sevilla',
        lat: 37.3966884, lng: -5.9939744, placeId: 'ChIJy06-YPhtEg0RvnppigMgqrY', phone: '+34 614 70 89 78', rating: 4.7, ratingCount: 310,
        meters: 230, walkMinutes: 3,
        hours: { wk: '8:00–20:30', sat: '8:00–21:00', sun: '8:00–21:00' },
        desc: T(
          'Panadería-cafetería en la Alameda de Hércules: pan artesano, bollería y buen café. Abre todos los días.',
          'Bakery-café on the Alameda de Hércules: artisan bread, pastries and good coffee. Open every day.',
          'Boulangerie-café sur l’Alameda de Hércules : pain artisanal, viennoiseries et bon café. Ouverte tous les jours.',
          'Bäckerei-Café an der Alameda de Hércules: handwerkliches Brot, Gebäck und guter Kaffee. Täglich geöffnet.',
          'Panetteria-caffetteria sull’Alameda de Hércules: pane artigianale, dolci e buon caffè. Aperta tutti i giorni.',
          '赫拉克勒斯林荫大道上的面包咖啡馆：手工面包、酥点和好咖啡，每天营业。'),
      },
      {
        id: 'horno-san-gines', name: 'Horno San Ginés', address: 'Mercado de la Encarnación (Las Setas), puesto 25, 41003 Sevilla',
        lat: 37.393504, lng: -5.992099, placeId: 'ChIJvyXqEQVsEg0RsZOnRpEtkek', phone: '+34 655 21 78 30', rating: 5.0, ratingCount: 49,
        meters: 300, walkMinutes: 4,
        hours: { wk: '8:00–15:00', sat: '8:00–15:00', sun: null },
        desc: T(
          'Horno artesano dentro del mercado de la Encarnación, bajo Las Setas. Pan y dulces con valoraciones excelentes.',
          'Artisan bakery inside the Encarnación market, under Las Setas. Bread and sweets with excellent reviews.',
          'Boulangerie artisanale dans le marché de la Encarnación, sous Las Setas. Pains et douceurs excellemment notés.',
          'Handwerksbäckerei in der Markthalle Encarnación unter Las Setas. Brot und Süßes mit ausgezeichneten Bewertungen.',
          'Forno artigianale nel mercato dell’Encarnación, sotto Las Setas. Pane e dolci con recensioni eccellenti.',
          '位于都市阳伞下恩卡纳西翁市场内的手工面包房，面包和甜点评价极高。'),
      },
      {
        id: 'landalusi', name: 'L’Andalusí · Panadería artesana', address: 'Pl. de la Encarnación, 16, 41003 Sevilla',
        lat: 37.393437, lng: -5.991312, placeId: 'ChIJu_v3AgVsEg0RtDVi9l30gnI', phone: '+34 600 11 73 12', rating: 4.2, ratingCount: 86,
        meters: 360, walkMinutes: 4,
        hours: { wk: '9:00–15:00', sat: '9:00–15:00', sun: null },
        desc: T(
          'Panadería artesana con productos ecológicos, en la plaza de la Encarnación.',
          'Artisan bakery with organic products, on Plaza de la Encarnación.',
          'Boulangerie artisanale aux produits bio, place de la Encarnación.',
          'Handwerksbäckerei mit Bio-Produkten an der Plaza de la Encarnación.',
          'Panetteria artigianale con prodotti biologici, in piazza dell’Encarnación.',
          '恩卡纳西翁广场上的手工有机面包房。'),
      },
      {
        id: 'confiteria-la-campana', name: 'Confitería La Campana', address: 'C. Sierpes, 1-3, 41004 Sevilla',
        lat: 37.3925881, lng: -5.9948303, placeId: 'ChIJsbt9lA9sEg0RcbpO_7WME2E', phone: '+34 954 22 35 70', rating: 4.0, ratingCount: 2679,
        meters: 480, walkMinutes: 6,
        hours: { wk: '8:00–22:00', sat: '8:00–23:00', sun: '8:00–22:00' },
        desc: T(
          'La confitería más famosa de Sevilla (desde 1885): dulces típicos, pasteles y bollería, con cafetería. Abre todos los días.',
          'Seville’s most famous pastry shop (since 1885): traditional sweets, cakes and pastries, with a café. Open every day.',
          'La pâtisserie la plus célèbre de Séville (depuis 1885) : douceurs typiques, gâteaux et viennoiseries, avec salon de thé. Ouverte tous les jours.',
          'Sevillas berühmteste Konditorei (seit 1885): typische Süßigkeiten, Kuchen und Gebäck, mit Café. Täglich geöffnet.',
          'La pasticceria più famosa di Siviglia (dal 1885): dolci tipici, torte e brioche, con caffetteria. Aperta tutti i giorni.',
          '塞维利亚最著名的甜品店（创立于1885年）：传统甜点、蛋糕和酥点，附设咖啡厅，每天营业。'),
      },
    ],
  },
};

export const NEARBY_UI: Record<Language, Record<NearbyId, { title: string; intro: string }>> = {
  es: {
    supermarket: { title: 'Supermercados más cercanos', intro: 'Para la compra del día: agua, bebidas, desayuno, fruta y lo básico de casa.' },
    pharmacy: { title: 'Farmacias más cercanas', intro: 'En España las farmacias se reconocen por la cruz verde. Para una urgencia de noche, en Contacto tienes la farmacia de 24 horas y la de guardia.' },
    atm: { title: 'Cajeros más cercanos', intro: 'Si el cajero te ofrece cobrarte «en tu moneda», elige euros: la conversión del cajero suele salir más cara.' },
    laundry: { title: 'Lavanderías más cercanas', intro: 'Lavanderías de autoservicio: lavado de unos 30 minutos y secado por tramos de 15.' },
    bakery: { title: 'Panaderías más cercanas', intro: 'Pan recién hecho, bollería y dulces. Muchos hornos tradicionales abren solo por la mañana.' },
  },
  en: {
    supermarket: { title: 'Nearest supermarkets', intro: 'For everyday shopping: water, drinks, breakfast, fruit and household basics.' },
    pharmacy: { title: 'Nearest pharmacies', intro: 'In Spain pharmacies are marked by a green cross. For a night-time emergency, Contact lists the 24-hour and on-duty pharmacies.' },
    atm: { title: 'Nearest ATMs', intro: 'If the ATM offers to charge you “in your currency”, choose euros – the ATM’s conversion is usually more expensive.' },
    laundry: { title: 'Nearest laundries', intro: 'Self-service laundries: a wash takes about 30 minutes, drying in 15-minute slots.' },
    bakery: { title: 'Nearest bakeries', intro: 'Fresh bread, pastries and sweets. Many traditional bakeries open mornings only.' },
  },
  fr: {
    supermarket: { title: 'Supermarchés les plus proches', intro: 'Pour les courses du quotidien : eau, boissons, petit-déjeuner, fruits et l’essentiel.' },
    pharmacy: { title: 'Pharmacies les plus proches', intro: 'En Espagne, les pharmacies ont une croix verte. Pour une urgence la nuit, la rubrique Contact indique la pharmacie 24 h/24 et celle de garde.' },
    atm: { title: 'Distributeurs les plus proches', intro: 'Si le distributeur propose de débiter « dans votre devise », choisissez l’euro : sa conversion coûte généralement plus cher.' },
    laundry: { title: 'Laveries les plus proches', intro: 'Laveries libre-service : lavage d’environ 30 minutes, séchage par tranches de 15.' },
    bakery: { title: 'Boulangeries les plus proches', intro: 'Pain frais, viennoiseries et douceurs. Beaucoup de boulangeries traditionnelles n’ouvrent que le matin.' },
  },
  de: {
    supermarket: { title: 'Nächste Supermärkte', intro: 'Für den täglichen Einkauf: Wasser, Getränke, Frühstück, Obst und Haushaltsbedarf.' },
    pharmacy: { title: 'Nächste Apotheken', intro: 'Apotheken erkennt man in Spanien am grünen Kreuz. Für nächtliche Notfälle finden Sie unter Kontakt die 24-Stunden- und die Notdienst-Apotheke.' },
    atm: { title: 'Nächste Geldautomaten', intro: 'Bietet der Automat die Abrechnung „in Ihrer Währung“ an, wählen Sie Euro – die Umrechnung des Automaten ist meist teurer.' },
    laundry: { title: 'Nächste Waschsalons', intro: 'Selbstbedienung: Waschgang ca. 30 Minuten, Trocknen in 15-Minuten-Schritten.' },
    bakery: { title: 'Nächste Bäckereien', intro: 'Frisches Brot, Gebäck und Süßes. Viele traditionelle Bäckereien öffnen nur vormittags.' },
  },
  it: {
    supermarket: { title: 'Supermercati più vicini', intro: 'Per la spesa di tutti i giorni: acqua, bibite, colazione, frutta e l’essenziale.' },
    pharmacy: { title: 'Farmacie più vicine', intro: 'In Spagna le farmacie hanno la croce verde. Per un’urgenza notturna, in Contatti trovi la farmacia 24 ore e quella di turno.' },
    atm: { title: 'Bancomat più vicini', intro: 'Se il bancomat propone l’addebito “nella tua valuta”, scegli l’euro: la conversione del bancomat di solito costa di più.' },
    laundry: { title: 'Lavanderie più vicine', intro: 'Lavanderie self-service: lavaggio di circa 30 minuti, asciugatura a blocchi di 15.' },
    bakery: { title: 'Panetterie più vicine', intro: 'Pane fresco, brioche e dolci. Molti forni tradizionali aprono solo la mattina.' },
  },
  zh: {
    supermarket: { title: '附近的超市', intro: '日常采购：饮用水、饮料、早餐、水果和日用品。' },
    pharmacy: { title: '附近的药房', intro: '西班牙的药房以绿色十字为标志。夜间急需时，可在“联系”页面查看24小时药房和值班药房。' },
    atm: { title: '附近的取款机', intro: '如果取款机提出按“您的本国货币”扣款，请选择欧元：取款机的汇率通常更贵。' },
    laundry: { title: '附近的洗衣店', intro: '自助洗衣店：洗衣约30分钟，烘干每次15分钟。' },
    bakery: { title: '附近的面包店', intro: '新鲜面包、酥点和甜点。很多传统面包房只在上午营业。' },
  },
};
