// Textos de las secciones nuevas: barrio, salud, entradas, rutas a pie, tiempo y reseñas.
import { Apartment, Language } from '@/lib/i18n';

type L6<T> = Record<Language, T>;

/* ---------- Barrio: servicios cercanos y costumbres ---------- */
export type ServiceId = 'supermarket' | 'pharmacy' | 'atm' | 'laundry' | 'bazaar' | 'bakery';
export const SERVICE_QUERY: Record<ServiceId, string> = {
  supermarket: 'supermercado',
  pharmacy: 'farmacia',
  atm: 'cajero automático',
  laundry: 'lavandería autoservicio',
  bazaar: 'bazar',
  bakery: 'panadería',
};

export const BARRIO: L6<{
  tab: string; servicesTitle: string; servicesHint: string; services: Record<ServiceId, string>;
  customsTitle: string; customs: { icon: string; title: string; text: string }[];
}> = {
  es: {
    tab: 'Barrio',
    servicesTitle: 'Servicios cerca del apartamento',
    servicesHint: 'Toca una categoría para ver los sitios más cercanos, con horario e itinerario a pie.',
    services: { supermarket: 'Supermercados', pharmacy: 'Farmacias', atm: 'Cajeros', laundry: 'Lavanderías', bazaar: 'Bazares', bakery: 'Panaderías' },
    customsTitle: 'Horarios y costumbres en Sevilla',
    customs: [
      { icon: '🍽️', title: 'Almuerzo de 14:00 a 16:00', text: 'Es la comida principal. Muchas cocinas cierran entre las 16:00 y las 20:00.' },
      { icon: '🌙', title: 'Cena a partir de las 21:00', text: 'Lo normal es cenar entre las 21:00 y las 23:00, sobre todo en verano.' },
      { icon: '🛍️', title: 'Tiendas', text: 'Las pequeñas suelen abrir 10–14 h y 17–21 h. El domingo la mayoría cierra; los supermercados del centro suelen abrir horario continuo.' },
      { icon: '☀️', title: 'Calor de verano', text: 'De junio a septiembre evita caminar de 14:00 a 18:00. Bebe agua y busca la sombra.' },
      { icon: '🍺', title: 'Tapeo', text: 'Se pide en barra o en mesa, tapa a tapa. La propina no es obligatoria; un 5–10 % si quedas contento.' },
    ],
  },
  en: {
    tab: 'Neighbourhood',
    servicesTitle: 'Services near the apartment',
    servicesHint: 'Tap a category to see the nearest places, sorted by distance.',
    services: { supermarket: 'Supermarkets', pharmacy: 'Pharmacies', atm: 'ATMs', laundry: 'Laundries', bazaar: 'Bazaars', bakery: 'Bakeries' },
    customsTitle: 'Opening hours and customs in Seville',
    customs: [
      { icon: '🍽️', title: 'Lunch 2:00–4:00 pm', text: 'It is the main meal. Many kitchens close between 4 and 8 pm.' },
      { icon: '🌙', title: 'Dinner from 9:00 pm', text: 'Locals usually dine between 9 and 11 pm, especially in summer.' },
      { icon: '🛍️', title: 'Shops', text: 'Small shops usually open 10 am–2 pm and 5–9 pm. Most close on Sunday; central supermarkets usually open all day.' },
      { icon: '☀️', title: 'Summer heat', text: 'From June to September avoid walking between 2 and 6 pm. Drink water and stay in the shade.' },
      { icon: '🍺', title: 'Tapas', text: 'Order at the bar or table, one tapa at a time. Tipping is optional; 5–10% if you are happy.' },
    ],
  },
  fr: {
    tab: 'Quartier',
    servicesTitle: 'Services près de l’appartement',
    servicesHint: 'Touchez une catégorie pour voir les plus proches, par distance.',
    services: { supermarket: 'Supermarchés', pharmacy: 'Pharmacies', atm: 'Distributeurs', laundry: 'Laveries', bazaar: 'Bazars', bakery: 'Boulangeries' },
    customsTitle: 'Horaires et coutumes à Séville',
    customs: [
      { icon: '🍽️', title: 'Déjeuner de 14 h à 16 h', text: 'C’est le repas principal. Beaucoup de cuisines ferment entre 16 h et 20 h.' },
      { icon: '🌙', title: 'Dîner à partir de 21 h', text: 'On dîne en général entre 21 h et 23 h, surtout en été.' },
      { icon: '🛍️', title: 'Commerces', text: 'Les petits commerces ouvrent souvent 10–14 h et 17–21 h. Le dimanche la plupart ferment ; les supermarchés du centre ouvrent en continu.' },
      { icon: '☀️', title: 'Chaleur estivale', text: 'De juin à septembre, évitez de marcher entre 14 h et 18 h. Buvez de l’eau et restez à l’ombre.' },
      { icon: '🍺', title: 'Tapas', text: 'On commande au bar ou à table, tapa par tapa. Le pourboire est facultatif ; 5–10 % si vous êtes satisfait.' },
    ],
  },
  de: {
    tab: 'Viertel',
    servicesTitle: 'Geschäfte in der Nähe',
    servicesHint: 'Kategorie antippen: die nächsten Orte, nach Entfernung sortiert.',
    services: { supermarket: 'Supermärkte', pharmacy: 'Apotheken', atm: 'Geldautomaten', laundry: 'Waschsalons', bazaar: 'Basare', bakery: 'Bäckereien' },
    customsTitle: 'Uhrzeiten und Gewohnheiten in Sevilla',
    customs: [
      { icon: '🍽️', title: 'Mittagessen 14–16 Uhr', text: 'Die Hauptmahlzeit. Viele Küchen schließen zwischen 16 und 20 Uhr.' },
      { icon: '🌙', title: 'Abendessen ab 21 Uhr', text: 'Man isst meist zwischen 21 und 23 Uhr, besonders im Sommer.' },
      { icon: '🛍️', title: 'Geschäfte', text: 'Kleine Läden öffnen meist 10–14 und 17–21 Uhr. Sonntags ist fast alles zu; Supermärkte im Zentrum haben oft durchgehend geöffnet.' },
      { icon: '☀️', title: 'Sommerhitze', text: 'Von Juni bis September zwischen 14 und 18 Uhr möglichst nicht zu Fuß gehen. Viel trinken, Schatten suchen.' },
      { icon: '🍺', title: 'Tapas', text: 'Man bestellt an der Theke oder am Tisch, Tapa für Tapa. Trinkgeld ist freiwillig; 5–10 %, wenn man zufrieden ist.' },
    ],
  },
  it: {
    tab: 'Quartiere',
    servicesTitle: 'Servizi vicino all’appartamento',
    servicesHint: 'Tocca una categoria per vedere i più vicini, in ordine di distanza.',
    services: { supermarket: 'Supermercati', pharmacy: 'Farmacie', atm: 'Bancomat', laundry: 'Lavanderie', bazaar: 'Bazar', bakery: 'Panetterie' },
    customsTitle: 'Orari e abitudini a Siviglia',
    customs: [
      { icon: '🍽️', title: 'Pranzo dalle 14 alle 16', text: 'È il pasto principale. Molte cucine chiudono tra le 16 e le 20.' },
      { icon: '🌙', title: 'Cena dalle 21', text: 'Di solito si cena tra le 21 e le 23, soprattutto d’estate.' },
      { icon: '🛍️', title: 'Negozi', text: 'I piccoli negozi aprono di solito 10–14 e 17–21. La domenica quasi tutto è chiuso; i supermercati del centro fanno orario continuato.' },
      { icon: '☀️', title: 'Caldo estivo', text: 'Da giugno a settembre evita di camminare tra le 14 e le 18. Bevi acqua e stai all’ombra.' },
      { icon: '🍺', title: 'Tapas', text: 'Si ordina al banco o al tavolo, una tapa alla volta. La mancia non è obbligatoria; 5–10% se sei soddisfatto.' },
    ],
  },
  zh: {
    tab: '周边',
    servicesTitle: '公寓附近的服务',
    servicesHint: '点击类别，按距离查看最近的地点。',
    services: { supermarket: '超市', pharmacy: '药店', atm: '取款机', laundry: '自助洗衣', bazaar: '杂货店', bakery: '面包店' },
    customsTitle: '塞维利亚的作息与习惯',
    customs: [
      { icon: '🍽️', title: '午餐 14:00–16:00', text: '午餐是正餐。很多餐厅厨房 16:00–20:00 休息。' },
      { icon: '🌙', title: '晚餐 21:00 以后', text: '当地人一般 21:00–23:00 吃晚饭，夏天尤其如此。' },
      { icon: '🛍️', title: '商店', text: '小店通常 10–14 点和 17–21 点营业。周日大多关门；市中心超市一般全天营业。' },
      { icon: '☀️', title: '夏季高温', text: '6 月至 9 月请避免在 14:00–18:00 步行外出，多喝水，待在阴凉处。' },
      { icon: '🍺', title: '小吃 Tapas', text: '在吧台或餐桌一份份点。小费不是必须的，满意可给 5–10%。' },
    ],
  },
};

/* ---------- Salud (Contacto) ---------- */
export const HOSPITAL: Record<Apartment, { name: string; address: string; phone: string }> = {
  ibarra: { name: 'Hospital Universitario Virgen del Rocío', address: 'Av. Manuel Siurot, s/n, 41013 Sevilla', phone: '+34 955 012 000' },
  quevedo: { name: 'Hospital Universitario Virgen Macarena', address: 'Av. Dr. Fedriani, 3, 41009 Sevilla', phone: '+34 955 008 000' },
};
export const PHARMACY_24H = { name: 'Farmacia Macarena 24 Horas', address: 'C. Dr. Fedriani, 13, 41009 Sevilla', phone: '+34 954 371 828' };
export const PHARMACY_GUARD_URL = 'https://www.farmaceuticos.com/farmacias-de-guardia/sevilla/';

export const HEALTH: L6<{ title: string; hospital: string; pharmacy24: string; guard: string; guardText: string; healthCentre: string; healthCentreText: string; call: string; route: string }> = {
  es: { title: 'Salud', hospital: 'Hospital público más cercano (urgencias)', pharmacy24: 'Farmacia abierta 24 horas', guard: 'Farmacias de guardia hoy', guardText: 'Listado oficial actualizado de farmacias abiertas de noche y en festivos.', healthCentre: 'Centro de salud cercano', healthCentreText: 'Para consultas que no son urgentes.', call: 'Llamar', route: 'Cómo llegar' },
  en: { title: 'Health', hospital: 'Nearest public hospital (A&E)', pharmacy24: '24-hour pharmacy', guard: 'On-duty pharmacies today', guardText: 'Official, up-to-date list of pharmacies open at night and on holidays.', healthCentre: 'Nearby health centre', healthCentreText: 'For non-urgent medical visits.', call: 'Call', route: 'Directions' },
  fr: { title: 'Santé', hospital: 'Hôpital public le plus proche (urgences)', pharmacy24: 'Pharmacie ouverte 24 h/24', guard: 'Pharmacies de garde aujourd’hui', guardText: 'Liste officielle à jour des pharmacies ouvertes la nuit et les jours fériés.', healthCentre: 'Centre de santé proche', healthCentreText: 'Pour les consultations non urgentes.', call: 'Appeler', route: 'Itinéraire' },
  de: { title: 'Gesundheit', hospital: 'Nächstes öffentliches Krankenhaus (Notaufnahme)', pharmacy24: '24-Stunden-Apotheke', guard: 'Notdienst-Apotheken heute', guardText: 'Offizielle, aktuelle Liste der nachts und an Feiertagen geöffneten Apotheken.', healthCentre: 'Gesundheitszentrum in der Nähe', healthCentreText: 'Für nicht dringende Arztbesuche.', call: 'Anrufen', route: 'Route' },
  it: { title: 'Salute', hospital: 'Ospedale pubblico più vicino (pronto soccorso)', pharmacy24: 'Farmacia aperta 24 ore', guard: 'Farmacie di turno oggi', guardText: 'Elenco ufficiale aggiornato delle farmacie aperte di notte e nei festivi.', healthCentre: 'Centro di salute vicino', healthCentreText: 'Per visite non urgenti.', call: 'Chiama', route: 'Indicazioni' },
  zh: { title: '医疗', hospital: '最近的公立医院（急诊）', pharmacy24: '24 小时药店', guard: '今日值班药店', guardText: '官方实时更新的夜间及节假日营业药店名单。', healthCentre: '附近的社区医疗中心', healthCentreText: '用于非紧急就诊。', call: '致电', route: '路线' },
};

/* ---------- Entradas anticipadas y rutas a pie (Visitas) ---------- */
export const TICKETS: L6<{ title: string; text: string; alcazar: string; cathedral: string }> = {
  es: { title: 'Reserva con antelación', text: 'El Real Alcázar y la Catedral agotan entradas, sobre todo en temporada alta. Cómpralas solo en sus webs oficiales.', alcazar: 'Real Alcázar', cathedral: 'Catedral y Giralda' },
  en: { title: 'Book ahead', text: 'The Royal Alcázar and the Cathedral sell out, especially in high season. Buy only on their official websites.', alcazar: 'Royal Alcázar', cathedral: 'Cathedral & Giralda' },
  fr: { title: 'Réservez à l’avance', text: 'L’Alcazar et la Cathédrale affichent souvent complet, surtout en haute saison. Achetez uniquement sur leurs sites officiels.', alcazar: 'Real Alcázar', cathedral: 'Cathédrale et Giralda' },
  de: { title: 'Rechtzeitig buchen', text: 'Alcázar und Kathedrale sind oft ausverkauft, besonders in der Hochsaison. Tickets nur auf den offiziellen Websites kaufen.', alcazar: 'Real Alcázar', cathedral: 'Kathedrale & Giralda' },
  it: { title: 'Prenota in anticipo', text: 'L’Alcázar e la Cattedrale vanno spesso esauriti, soprattutto in alta stagione. Acquista solo sui siti ufficiali.', alcazar: 'Real Alcázar', cathedral: 'Cattedrale e Giralda' },
  zh: { title: '提前预订', text: '王宫和大教堂门票经常售罄，旺季尤甚。请只在官方网站购票。', alcazar: '塞维利亚王宫', cathedral: '大教堂与吉拉尔达塔' },
};
export const TICKET_URLS = { alcazar: 'https://www.alcazarsevilla.org/', cathedral: 'https://www.catedraldesevilla.es/' };

export interface WalkRoute { id: string; stops: string[]; km: string; hours: string; title: L6<string>; text: L6<string> }

export const ROUTES: Record<Apartment, WalkRoute[]> = {
  ibarra: [
    {
      id: 'santa-cruz', km: '2,5', hours: '2',
      stops: ['Plaza de Santa Cruz, Sevilla', 'Jardines de Murillo, Sevilla', 'Patio de Banderas, Sevilla', 'Catedral de Sevilla', 'Archivo General de Indias, Sevilla'],
      title: { es: 'Santa Cruz y Catedral', en: 'Santa Cruz & Cathedral', fr: 'Santa Cruz et Cathédrale', de: 'Santa Cruz & Kathedrale', it: 'Santa Cruz e Cattedrale', zh: '圣十字区与大教堂' },
      text: { es: 'Callejuelas del antiguo barrio judío hasta la Giralda.', en: 'Narrow lanes of the old Jewish quarter up to the Giralda.', fr: 'Ruelles de l’ancien quartier juif jusqu’à la Giralda.', de: 'Gassen des alten jüdischen Viertels bis zur Giralda.', it: 'Vicoli dell’antico quartiere ebraico fino alla Giralda.', zh: '穿过老犹太区的小巷，直到吉拉尔达塔。' },
    },
    {
      id: 'plaza-espana', km: '3,5', hours: '2',
      stops: ['Jardines de Murillo, Sevilla', 'Plaza de España, Sevilla', 'Parque de María Luisa, Sevilla', 'Torre del Oro, Sevilla'],
      title: { es: 'Plaza de España y el río', en: 'Plaza de España & the river', fr: 'Plaza de España et le fleuve', de: 'Plaza de España & der Fluss', it: 'Plaza de España e il fiume', zh: '西班牙广场与河畔' },
      text: { es: 'Jardines, la Plaza de España y vuelta por la Torre del Oro.', en: 'Gardens, Plaza de España and back via the Torre del Oro.', fr: 'Jardins, Plaza de España et retour par la Torre del Oro.', de: 'Gärten, Plaza de España und zurück über den Torre del Oro.', it: 'Giardini, Plaza de España e ritorno dalla Torre del Oro.', zh: '花园、西班牙广场，经黄金塔返回。' },
    },
  ],
  quevedo: [
    {
      id: 'alameda-macarena', km: '3', hours: '2',
      stops: ['Setas de Sevilla', 'Alameda de Hércules, Sevilla', 'Basílica de la Macarena, Sevilla', 'Murallas de la Macarena, Sevilla'],
      title: { es: 'Setas, Alameda y Macarena', en: 'Setas, Alameda & Macarena', fr: 'Setas, Alameda et Macarena', de: 'Setas, Alameda & Macarena', it: 'Setas, Alameda e Macarena', zh: '都市阳伞、阿拉梅达与马卡雷纳' },
      text: { es: 'El Sevilla más vivo: miradores, terrazas y murallas.', en: 'Lively Seville: viewpoints, terraces and city walls.', fr: 'La Séville vivante : belvédères, terrasses et remparts.', de: 'Lebendiges Sevilla: Aussicht, Terrassen und Stadtmauer.', it: 'La Siviglia più viva: belvedere, terrazze e mura.', zh: '最有活力的塞维利亚：观景台、露台与古城墙。' },
    },
    {
      id: 'centro-triana', km: '4', hours: '2,5',
      stops: ['Plaza del Salvador, Sevilla', 'Catedral de Sevilla', 'Torre del Oro, Sevilla', 'Puente de Triana, Sevilla', 'Mercado de Triana, Sevilla'],
      title: { es: 'Del centro a Triana', en: 'From the centre to Triana', fr: 'Du centre à Triana', de: 'Vom Zentrum nach Triana', it: 'Dal centro a Triana', zh: '从市中心到特里亚纳' },
      text: { es: 'Catedral, río y el barrio de la cerámica y el flamenco.', en: 'Cathedral, river and the district of ceramics and flamenco.', fr: 'Cathédrale, fleuve et le quartier de la céramique et du flamenco.', de: 'Kathedrale, Fluss und das Viertel der Keramik und des Flamenco.', it: 'Cattedrale, fiume e il quartiere della ceramica e del flamenco.', zh: '大教堂、河畔，以及陶瓷与弗拉门戈之乡。' },
    },
  ],
};
export const ROUTES_UI: L6<{ title: string; open: string }> = {
  es: { title: 'Paseos a pie desde el apartamento', open: 'Abrir ruta' },
  en: { title: 'Walks from the apartment', open: 'Open route' },
  fr: { title: 'Balades à pied depuis l’appartement', open: 'Ouvrir l’itinéraire' },
  de: { title: 'Spaziergänge ab der Wohnung', open: 'Route öffnen' },
  it: { title: 'Passeggiate dall’appartamento', open: 'Apri percorso' },
  zh: { title: '从公寓出发的步行路线', open: '打开路线' },
};

/* ---------- Tiempo ---------- */
export const WEATHER: L6<{ chip: string; title: string; arrival: string; departure: string; noForecast: string; tooFar: string; heat: string; rain: string; source: string; close: string; rainProb: string }> = {
  es: { chip: 'El tiempo en tu estancia', title: 'El tiempo durante tu estancia', arrival: 'Llegada', departure: 'Salida', noForecast: 'No se pudo cargar la previsión. Inténtalo más tarde.', tooFar: 'La previsión estará disponible unos días antes de tu llegada (hasta 16 días vista).', heat: 'Mucho calor: evita caminar de 14:00 a 18:00 y bebe agua.', rain: 'Posible lluvia: lleva paraguas.', source: 'Previsión: Open-Meteo', close: 'Cerrar', rainProb: 'lluvia' },
  en: { chip: 'Weather for your stay', title: 'Weather during your stay', arrival: 'Arrival', departure: 'Departure', noForecast: 'The forecast could not be loaded. Please try later.', tooFar: 'The forecast will be available a few days before you arrive (up to 16 days ahead).', heat: 'Very hot: avoid walking 2–6 pm and drink water.', rain: 'Rain likely: bring an umbrella.', source: 'Forecast: Open-Meteo', close: 'Close', rainProb: 'rain' },
  fr: { chip: 'La météo de votre séjour', title: 'La météo pendant votre séjour', arrival: 'Arrivée', departure: 'Départ', noForecast: 'Impossible de charger la prévision. Réessayez plus tard.', tooFar: 'La prévision sera disponible quelques jours avant votre arrivée (jusqu’à 16 jours).', heat: 'Forte chaleur : évitez de marcher de 14 h à 18 h et buvez de l’eau.', rain: 'Pluie probable : prenez un parapluie.', source: 'Prévisions : Open-Meteo', close: 'Fermer', rainProb: 'pluie' },
  de: { chip: 'Wetter für Ihren Aufenthalt', title: 'Wetter während Ihres Aufenthalts', arrival: 'Anreise', departure: 'Abreise', noForecast: 'Die Vorhersage konnte nicht geladen werden. Bitte später erneut versuchen.', tooFar: 'Die Vorhersage ist einige Tage vor Ihrer Anreise verfügbar (bis zu 16 Tage im Voraus).', heat: 'Sehr heiß: 14–18 Uhr nicht zu Fuß gehen und viel trinken.', rain: 'Regen möglich: Schirm mitnehmen.', source: 'Vorhersage: Open-Meteo', close: 'Schließen', rainProb: 'Regen' },
  it: { chip: 'Il meteo del tuo soggiorno', title: 'Il meteo durante il soggiorno', arrival: 'Arrivo', departure: 'Partenza', noForecast: 'Impossibile caricare le previsioni. Riprova più tardi.', tooFar: 'Le previsioni saranno disponibili pochi giorni prima dell’arrivo (fino a 16 giorni).', heat: 'Molto caldo: evita di camminare dalle 14 alle 18 e bevi acqua.', rain: 'Possibile pioggia: porta l’ombrello.', source: 'Previsioni: Open-Meteo', close: 'Chiudi', rainProb: 'pioggia' },
  zh: { chip: '入住期间天气', title: '您入住期间的天气', arrival: '入住', departure: '离开', noForecast: '无法加载天气预报，请稍后再试。', tooFar: '天气预报将在您抵达前几天提供（最多提前 16 天）。', heat: '天气炎热：14:00–18:00 避免步行，多喝水。', rain: '可能下雨：请带伞。', source: '预报来源：Open-Meteo', close: '关闭', rainProb: '降雨' },
};

/* ---------- Reseña ---------- */
export const REVIEW: L6<{ title: string; text: string; google: string; googleHint: string; other: string }> = {
  es: { title: '¿Qué tal tu estancia?', text: '¿Te ha gustado? Cuéntalo en Google, nos ayuda muchísimo ⭐ ¡Solo te lleva un minuto, gracias!', google: 'Contarlo en Google', googleHint: 'Se abre Google con las estrellas listas para puntuar.', other: 'O en la plataforma donde reservaste:' },
  en: { title: 'How was your stay?', text: 'Did you like it? Tell others on Google, it helps us so much ⭐ It only takes a minute, thank you!', google: 'Share it on Google', googleHint: 'Google opens with the stars ready to rate.', other: 'Or on the platform where you booked:' },
  fr: { title: 'Comment s’est passé votre séjour ?', text: 'Vous avez aimé ? Racontez-le sur Google, cela nous aide énormément ⭐ Une minute suffit, merci !', google: 'Le raconter sur Google', googleHint: 'Google s’ouvre avec les étoiles prêtes à noter.', other: 'Ou sur la plateforme de réservation :' },
  de: { title: 'Wie war Ihr Aufenthalt?', text: 'Hat es Ihnen gefallen? Erzählen Sie es auf Google, das hilft uns sehr ⭐ Es dauert nur eine Minute, danke!', google: 'Auf Google erzählen', googleHint: 'Google öffnet sich direkt mit den Sternen zum Bewerten.', other: 'Oder auf der Buchungsplattform:' },
  it: { title: 'Com’è andato il soggiorno?', text: 'Ti è piaciuto? Raccontalo su Google, ci aiuta tantissimo ⭐ Ci vuole solo un minuto, grazie!', google: 'Raccontalo su Google', googleHint: 'Si apre Google con le stelle pronte per votare.', other: 'Oppure sulla piattaforma dove hai prenotato:' },
  zh: { title: '住得怎么样？', text: '喜欢这里吗？在 Google 上分享一下吧，对我们帮助很大 ⭐ 只需一分钟，谢谢！', google: '在 Google 上分享', googleHint: '将打开 Google 评分页面，直接点星即可。', other: '或在您预订的平台上评价：' },
};

// Ficha de Google de cada apartamento → enlace directo a «Escribir una reseña»
export const GOOGLE_PLACE_ID: Record<Apartment, string> = {
  ibarra: 'ChIJVTf3D0BtEg0RPGx4168ZnYw',
  quevedo: 'ChIJ29QGAVdtEg0RMnVNjEbySiE',
};
export const googleReviewUrl = (apt: Apartment) => `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID[apt]}`;

export const REVIEW_LINKS = [
  { name: 'Booking.com', url: 'https://secure.booking.com/mytrips.html' },
  { name: 'Airbnb', url: 'https://www.airbnb.com/trips' },
];

export const PLACES_UI: L6<{ walk: string; call: string; maps: string; open: string; closed: string; empty: string; error: string; reviews: string; sourceGoogle: string; sourceOsm: string }> = {
  es: { walk: 'min a pie', call: 'Llamar', maps: 'Google Maps', open: 'Abierto', closed: 'Cerrado', empty: 'No hay resultados cerca. Prueba en Google Maps.', error: 'No se pudo cargar la lista.', reviews: 'reseñas', sourceGoogle: 'Datos y fotos: Google', sourceOsm: 'Datos: © OpenStreetMap' },
  en: { walk: 'min walk', call: 'Call', maps: 'Google Maps', open: 'Open', closed: 'Closed', empty: 'Nothing found nearby. Try Google Maps.', error: 'The list could not be loaded.', reviews: 'reviews', sourceGoogle: 'Data and photos: Google', sourceOsm: 'Data: © OpenStreetMap' },
  fr: { walk: 'min à pied', call: 'Appeler', maps: 'Google Maps', open: 'Ouvert', closed: 'Fermé', empty: 'Aucun résultat à proximité. Essayez Google Maps.', error: 'Impossible de charger la liste.', reviews: 'avis', sourceGoogle: 'Données et photos : Google', sourceOsm: 'Données : © OpenStreetMap' },
  de: { walk: 'Min. zu Fuß', call: 'Anrufen', maps: 'Google Maps', open: 'Geöffnet', closed: 'Geschlossen', empty: 'Nichts in der Nähe gefunden. Google Maps probieren.', error: 'Liste konnte nicht geladen werden.', reviews: 'Bewertungen', sourceGoogle: 'Daten und Fotos: Google', sourceOsm: 'Daten: © OpenStreetMap' },
  it: { walk: 'min a piedi', call: 'Chiama', maps: 'Google Maps', open: 'Aperto', closed: 'Chiuso', empty: 'Nessun risultato vicino. Prova Google Maps.', error: 'Impossibile caricare l’elenco.', reviews: 'recensioni', sourceGoogle: 'Dati e foto: Google', sourceOsm: 'Dati: © OpenStreetMap' },
  zh: { walk: '分钟步行', call: '致电', maps: 'Google 地图', open: '营业中', closed: '已关门', empty: '附近未找到结果，请在 Google 地图中查看。', error: '无法加载列表。', reviews: '条评价', sourceGoogle: '数据与照片：Google', sourceOsm: '数据：© OpenStreetMap' },
};
