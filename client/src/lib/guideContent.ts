// Contenido de la guía inicial (botón 📖 de la pantalla de inicio).
import { Language } from '@/lib/i18n';

export type SectionId = 'transport' | 'checkin' | 'wifi' | 'tourism' | 'events' | 'contact';

export interface GuideText {
  title: string;
  intro: (apt: string) => string;
  journeyTitle: string;
  journey: { icon: string; when: string; text: string; textIbarra?: string }[];
  sectionsTitle: string;
  open: string;
  sections: Record<SectionId, { desc: string; feats: string[]; featsIbarra?: string[] }>;
  toolsTitle: string;
  tools: { icon: string; title: string; text: string }[];
  close: string;
}

export const GUIDE: Record<Language, GuideText> = {
  es: {
    title: 'Tu guía rápida',
    intro: (a) => `Todo lo que necesitas para tu estancia en ${a}, en tu idioma y a un toque.`,
    journeyTitle: 'Tu estancia, paso a paso',
    journey: [
      { icon: '✈️', when: 'Antes de llegar', text: 'En Transporte elige aeropuerto o estación y enseña la dirección al taxista a pantalla completa.' },
      { icon: '🔑', when: 'Al llegar', text: 'Sigue los pasos del Check-in con fotos; toca una foto para ampliarla. Entrada desde las 15:00.' },
      { icon: '📶', when: 'Al instalarte', text: 'Copia la contraseña del Wi-Fi con un toque.', textIbarra: 'Copia la contraseña del Wi-Fi y mira cómo usar el aire acondicionado y la lavadora.' },
      { icon: '🍽️', when: 'Durante tu estancia', text: 'Dónde comer, qué visitar, eventos del día y servicios del barrio.' },
      { icon: '⭐', when: 'Al salir', text: 'Check-out hasta las 11:00. ¡Nos encantará leer tu reseña!' },
    ],
    sectionsTitle: 'Qué hay en cada sección',
    open: 'Abrir',
    sections: {
      transport: { desc: 'Cómo llegar y moverte por Sevilla.', feats: ['Aeropuerto, estación o coche', 'Precios y frecuencias', 'Mostrar dirección al taxista', 'Bus, Sevici y patinetes'] },
      checkin: { desc: 'Cómo entrar al apartamento.', feats: ['Pasos con fotos', 'Horarios 15:00 / 11:00', 'Consigna de equipaje', 'Reseña al salir'] },
      wifi: { desc: 'Conexión y todo lo de la casa y el barrio.', feats: ['Copiar red y contraseña', 'Código QR', 'Barrio: supermercados, farmacias, cajeros…', 'Horarios y costumbres'], featsIbarra: ['Copiar red y contraseña', 'Aire acondicionado', 'Lavadora', 'Barrio: supermercados, farmacias, cajeros…', 'Horarios y costumbres'] },
      tourism: { desc: 'Dónde comer y qué visitar.', feats: ['Desayunos, comidas y cenas', 'Comida rápida cerca', 'Entradas oficiales Alcázar y Catedral', 'Paseos a pie'] },
      events: { desc: 'Qué hacer cada día.', feats: ['Eventos del día', 'Distancia a pie y en taxi', 'Precio y entradas', 'Más agendas de Sevilla'] },
      contact: { desc: 'Ayuda cuando la necesites.', feats: ['WhatsApp del anfitrión', 'Emergencias 112', 'Hospital y farmacia 24 h'] },
    },
    toolsTitle: 'Atajos en la parte de arriba',
    tools: [
      { icon: '☀️', title: 'El tiempo', text: 'Previsión día a día de tu estancia.' },
      { icon: '📍', title: 'Mapa', text: 'Abre el apartamento en Google Maps.' },
      { icon: '💬', title: 'WhatsApp', text: 'Escríbenos: el mensaje ya dice tu apartamento.' },
      { icon: '🌐', title: 'Idioma', text: 'Cámbialo cuando quieras.' },
      { icon: '⬇️', title: 'Barra inferior', text: 'Salta entre secciones sin volver al inicio.' },
    ],
    close: 'Empezar',
  },
  en: {
    title: 'Your quick guide',
    intro: (a) => `Everything you need for your stay at ${a}, in your language, one tap away.`,
    journeyTitle: 'Your stay, step by step',
    journey: [
      { icon: '✈️', when: 'Before you arrive', text: 'In Transport, pick airport or station and show the address to the taxi driver full screen.' },
      { icon: '🔑', when: 'On arrival', text: 'Follow the Check-in steps with photos; tap a photo to enlarge it. Entry from 3 pm.' },
      { icon: '📶', when: 'Settling in', text: 'Copy the Wi-Fi password with one tap.', textIbarra: 'Copy the Wi-Fi password and see how to use the air conditioning and washing machine.' },
      { icon: '🍽️', when: 'During your stay', text: 'Where to eat, what to see, today’s events and neighbourhood services.' },
      { icon: '⭐', when: 'When you leave', text: 'Check-out by 11 am. We’d love to read your review!' },
    ],
    sectionsTitle: 'What’s in each section',
    open: 'Open',
    sections: {
      transport: { desc: 'Getting here and around Seville.', feats: ['Airport, station or car', 'Prices and frequencies', 'Show address to the driver', 'Bus, bikes and scooters'] },
      checkin: { desc: 'How to get into the apartment.', feats: ['Steps with photos', 'Times 3 pm / 11 am', 'Luggage storage', 'Review when you leave'] },
      wifi: { desc: 'Connection, the home and the neighbourhood.', feats: ['Copy network and password', 'QR code', 'Neighbourhood: supermarkets, pharmacies, ATMs…', 'Opening hours and customs'], featsIbarra: ['Copy network and password', 'Air conditioning', 'Washing machine', 'Neighbourhood: supermarkets, pharmacies, ATMs…', 'Opening hours and customs'] },
      tourism: { desc: 'Where to eat and what to see.', feats: ['Breakfast, lunch and dinner', 'Fast food nearby', 'Official Alcázar & Cathedral tickets', 'Walks'] },
      events: { desc: 'What to do each day.', feats: ['Today’s events', 'Walking and taxi distance', 'Prices and tickets', 'More Seville listings'] },
      contact: { desc: 'Help whenever you need it.', feats: ['Host WhatsApp', 'Emergencies 112', 'Hospital and 24-h pharmacy'] },
    },
    toolsTitle: 'Shortcuts at the top',
    tools: [
      { icon: '☀️', title: 'Weather', text: 'Day-by-day forecast for your stay.' },
      { icon: '📍', title: 'Map', text: 'Opens the apartment in Google Maps.' },
      { icon: '💬', title: 'WhatsApp', text: 'Message us: it already says your apartment.' },
      { icon: '🌐', title: 'Language', text: 'Change it any time.' },
      { icon: '⬇️', title: 'Bottom bar', text: 'Jump between sections without going home.' },
    ],
    close: 'Get started',
  },
  fr: {
    title: 'Votre guide rapide',
    intro: (a) => `Tout ce qu’il vous faut pour votre séjour à ${a}, dans votre langue, en un geste.`,
    journeyTitle: 'Votre séjour, étape par étape',
    journey: [
      { icon: '✈️', when: 'Avant d’arriver', text: 'Dans Transport, choisissez aéroport ou gare et montrez l’adresse au chauffeur en plein écran.' },
      { icon: '🔑', when: 'À l’arrivée', text: 'Suivez les étapes du Check-in avec photos ; touchez une photo pour l’agrandir. Arrivée dès 15 h.' },
      { icon: '📶', when: 'En vous installant', text: 'Copiez le mot de passe Wi-Fi d’un geste.', textIbarra: 'Copiez le mot de passe Wi-Fi et voyez comment utiliser la clim et le lave-linge.' },
      { icon: '🍽️', when: 'Pendant le séjour', text: 'Où manger, quoi visiter, les événements du jour et les services du quartier.' },
      { icon: '⭐', when: 'Au départ', text: 'Départ avant 11 h. Nous serons ravis de lire votre avis !' },
    ],
    sectionsTitle: 'Ce que contient chaque section',
    open: 'Ouvrir',
    sections: {
      transport: { desc: 'Venir et se déplacer à Séville.', feats: ['Aéroport, gare ou voiture', 'Prix et fréquences', 'Montrer l’adresse au chauffeur', 'Bus, vélos et trottinettes'] },
      checkin: { desc: 'Comment entrer dans l’appartement.', feats: ['Étapes avec photos', 'Horaires 15 h / 11 h', 'Consigne à bagages', 'Avis au départ'] },
      wifi: { desc: 'Connexion, le logement et le quartier.', feats: ['Copier réseau et mot de passe', 'QR code', 'Quartier : supermarchés, pharmacies, distributeurs…', 'Horaires et coutumes'], featsIbarra: ['Copier réseau et mot de passe', 'Climatisation', 'Lave-linge', 'Quartier : supermarchés, pharmacies, distributeurs…', 'Horaires et coutumes'] },
      tourism: { desc: 'Où manger et quoi visiter.', feats: ['Petit-déjeuner, déjeuner, dîner', 'Restauration rapide proche', 'Billets officiels Alcázar et Cathédrale', 'Balades à pied'] },
      events: { desc: 'Que faire chaque jour.', feats: ['Événements du jour', 'Distance à pied et en taxi', 'Prix et billets', 'Autres agendas de Séville'] },
      contact: { desc: 'De l’aide quand il le faut.', feats: ['WhatsApp de l’hôte', 'Urgences 112', 'Hôpital et pharmacie 24 h/24'] },
    },
    toolsTitle: 'Raccourcis en haut',
    tools: [
      { icon: '☀️', title: 'Météo', text: 'Prévisions jour par jour de votre séjour.' },
      { icon: '📍', title: 'Carte', text: 'Ouvre l’appartement dans Google Maps.' },
      { icon: '💬', title: 'WhatsApp', text: 'Écrivez-nous : le message indique déjà votre appartement.' },
      { icon: '🌐', title: 'Langue', text: 'Changez-la quand vous voulez.' },
      { icon: '⬇️', title: 'Barre du bas', text: 'Passez d’une section à l’autre sans revenir à l’accueil.' },
    ],
    close: 'Commencer',
  },
  de: {
    title: 'Ihr Schnellführer',
    intro: (a) => `Alles für Ihren Aufenthalt im ${a} – in Ihrer Sprache, mit einem Fingertipp.`,
    journeyTitle: 'Ihr Aufenthalt Schritt für Schritt',
    journey: [
      { icon: '✈️', when: 'Vor der Anreise', text: 'Unter Transport Flughafen oder Bahnhof wählen und dem Taxifahrer die Adresse im Vollbild zeigen.' },
      { icon: '🔑', when: 'Bei Ankunft', text: 'Den Check-in-Schritten mit Fotos folgen; Foto antippen zum Vergrößern. Einlass ab 15 Uhr.' },
      { icon: '📶', when: 'Beim Einrichten', text: 'WLAN-Passwort mit einem Tipp kopieren.', textIbarra: 'WLAN-Passwort kopieren und nachlesen, wie Klimaanlage und Waschmaschine funktionieren.' },
      { icon: '🍽️', when: 'Während des Aufenthalts', text: 'Essen, Sehenswertes, heutige Veranstaltungen und Geschäfte im Viertel.' },
      { icon: '⭐', when: 'Bei Abreise', text: 'Check-out bis 11 Uhr. Wir freuen uns über Ihre Bewertung!' },
    ],
    sectionsTitle: 'Was in jedem Bereich steckt',
    open: 'Öffnen',
    sections: {
      transport: { desc: 'Anreise und unterwegs in Sevilla.', feats: ['Flughafen, Bahnhof oder Auto', 'Preise und Takt', 'Adresse dem Fahrer zeigen', 'Bus, Räder und Scooter'] },
      checkin: { desc: 'So kommen Sie in die Wohnung.', feats: ['Schritte mit Fotos', 'Zeiten 15 / 11 Uhr', 'Gepäckaufbewahrung', 'Bewertung bei Abreise'] },
      wifi: { desc: 'Verbindung, Wohnung und Viertel.', feats: ['Netz und Passwort kopieren', 'QR-Code', 'Viertel: Supermärkte, Apotheken, Geldautomaten…', 'Uhrzeiten und Gewohnheiten'], featsIbarra: ['Netz und Passwort kopieren', 'Klimaanlage', 'Waschmaschine', 'Viertel: Supermärkte, Apotheken, Geldautomaten…', 'Uhrzeiten und Gewohnheiten'] },
      tourism: { desc: 'Essen und Sehenswertes.', feats: ['Frühstück, Mittag- und Abendessen', 'Fast Food in der Nähe', 'Offizielle Tickets Alcázar und Kathedrale', 'Spaziergänge'] },
      events: { desc: 'Was man heute unternehmen kann.', feats: ['Heutige Veranstaltungen', 'Entfernung zu Fuß und mit Taxi', 'Preise und Tickets', 'Weitere Programme'] },
      contact: { desc: 'Hilfe, wenn Sie sie brauchen.', feats: ['WhatsApp des Gastgebers', 'Notruf 112', 'Krankenhaus und 24-h-Apotheke'] },
    },
    toolsTitle: 'Schnellzugriffe oben',
    tools: [
      { icon: '☀️', title: 'Wetter', text: 'Vorhersage für jeden Tag Ihres Aufenthalts.' },
      { icon: '📍', title: 'Karte', text: 'Öffnet die Wohnung in Google Maps.' },
      { icon: '💬', title: 'WhatsApp', text: 'Schreiben Sie uns – Ihre Wohnung steht schon drin.' },
      { icon: '🌐', title: 'Sprache', text: 'Jederzeit änderbar.' },
      { icon: '⬇️', title: 'Untere Leiste', text: 'Zwischen Bereichen wechseln, ohne zum Start zurück.' },
    ],
    close: 'Los geht’s',
  },
  it: {
    title: 'La tua guida rapida',
    intro: (a) => `Tutto ciò che serve per il soggiorno al ${a}, nella tua lingua, con un tocco.`,
    journeyTitle: 'Il soggiorno, passo per passo',
    journey: [
      { icon: '✈️', when: 'Prima di arrivare', text: 'In Trasporti scegli aeroporto o stazione e mostra l’indirizzo al tassista a schermo intero.' },
      { icon: '🔑', when: 'All’arrivo', text: 'Segui i passi del Check-in con foto; tocca una foto per ingrandirla. Ingresso dalle 15:00.' },
      { icon: '📶', when: 'Sistemandoti', text: 'Copia la password del Wi-Fi con un tocco.', textIbarra: 'Copia la password del Wi-Fi e scopri come usare il climatizzatore e la lavatrice.' },
      { icon: '🍽️', when: 'Durante il soggiorno', text: 'Dove mangiare, cosa visitare, eventi del giorno e servizi del quartiere.' },
      { icon: '⭐', when: 'Alla partenza', text: 'Check-out entro le 11:00. Ci farà piacere leggere la tua recensione!' },
    ],
    sectionsTitle: 'Cosa c’è in ogni sezione',
    open: 'Apri',
    sections: {
      transport: { desc: 'Arrivare e muoversi a Siviglia.', feats: ['Aeroporto, stazione o auto', 'Prezzi e frequenze', 'Mostra l’indirizzo al tassista', 'Bus, bici e monopattini'] },
      checkin: { desc: 'Come entrare nell’appartamento.', feats: ['Passi con foto', 'Orari 15:00 / 11:00', 'Deposito bagagli', 'Recensione alla partenza'] },
      wifi: { desc: 'Connessione, la casa e il quartiere.', feats: ['Copia rete e password', 'Codice QR', 'Quartiere: supermercati, farmacie, bancomat…', 'Orari e abitudini'], featsIbarra: ['Copia rete e password', 'Aria condizionata', 'Lavatrice', 'Quartiere: supermercati, farmacie, bancomat…', 'Orari e abitudini'] },
      tourism: { desc: 'Dove mangiare e cosa visitare.', feats: ['Colazione, pranzo e cena', 'Fast food vicino', 'Biglietti ufficiali Alcázar e Cattedrale', 'Passeggiate'] },
      events: { desc: 'Cosa fare ogni giorno.', feats: ['Eventi del giorno', 'Distanza a piedi e in taxi', 'Prezzi e biglietti', 'Altre agende di Siviglia'] },
      contact: { desc: 'Aiuto quando serve.', feats: ['WhatsApp dell’host', 'Emergenze 112', 'Ospedale e farmacia 24 h'] },
    },
    toolsTitle: 'Scorciatoie in alto',
    tools: [
      { icon: '☀️', title: 'Meteo', text: 'Previsioni giorno per giorno del soggiorno.' },
      { icon: '📍', title: 'Mappa', text: 'Apre l’appartamento in Google Maps.' },
      { icon: '💬', title: 'WhatsApp', text: 'Scrivici: il messaggio indica già l’appartamento.' },
      { icon: '🌐', title: 'Lingua', text: 'Cambiala quando vuoi.' },
      { icon: '⬇️', title: 'Barra in basso', text: 'Passa da una sezione all’altra senza tornare all’inizio.' },
    ],
    close: 'Inizia',
  },
  zh: {
    title: '快速指南',
    intro: (a) => `入住 ${a} 所需的一切信息，使用您的语言，一键即达。`,
    journeyTitle: '入住流程',
    journey: [
      { icon: '✈️', when: '抵达前', text: '在“交通”中选择机场或火车站，并把地址全屏给出租车司机看。' },
      { icon: '🔑', when: '抵达时', text: '按照带照片的入住步骤操作；点击照片可放大。15:00 起可入住。' },
      { icon: '📶', when: '安顿下来', text: '一键复制 Wi-Fi 密码。', textIbarra: '复制 Wi-Fi 密码，并查看空调和洗衣机的使用方法。' },
      { icon: '🍽️', when: '入住期间', text: '美食、景点、当日活动及周边服务。' },
      { icon: '⭐', when: '离开时', text: '11:00 前退房。期待您的评价！' },
    ],
    sectionsTitle: '各栏目内容',
    open: '打开',
    sections: {
      transport: { desc: '如何到达及市内出行。', feats: ['机场、火车站或自驾', '价格与班次', '给司机看地址', '公交、单车和滑板车'] },
      checkin: { desc: '如何进入公寓。', feats: ['带照片的步骤', '时间 15:00 / 11:00', '行李寄存', '离开时评价'] },
      wifi: { desc: '网络、公寓与周边。', feats: ['复制网络名和密码', '二维码', '周边：超市、药店、取款机…', '作息与习惯'], featsIbarra: ['复制网络名和密码', '空调', '洗衣机', '周边：超市、药店、取款机…', '作息与习惯'] },
      tourism: { desc: '去哪吃、看什么。', feats: ['早餐、午餐和晚餐', '附近快餐', '王宫和大教堂官方门票', '步行路线'] },
      events: { desc: '每天可以做什么。', feats: ['当日活动', '步行和出租车距离', '价格与门票', '更多塞维利亚活动'] },
      contact: { desc: '随时为您提供帮助。', feats: ['房东 WhatsApp', '紧急电话 112', '医院和 24 小时药店'] },
    },
    toolsTitle: '顶部快捷按钮',
    tools: [
      { icon: '☀️', title: '天气', text: '入住期间逐日预报。' },
      { icon: '📍', title: '地图', text: '在 Google 地图中打开公寓。' },
      { icon: '💬', title: 'WhatsApp', text: '给我们留言：消息已注明您的公寓。' },
      { icon: '🌐', title: '语言', text: '随时切换。' },
      { icon: '⬇️', title: '底部导航', text: '无需返回首页即可切换栏目。' },
    ],
    close: '开始',
  },
};
