// Comida rápida cerca de cada apartamento.
// Datos revisados en noviembre de 2026 (direcciones, teléfonos y precios orientativos
// tomados de fuentes públicas). Revisar de vez en cuando: los precios cambian.

export type FastFoodKind = 'burger' | 'pizza' | 'montaditos' | 'grill' | 'mexican';

export interface MenuItem {
  name: string;
  price?: string;
}

export interface FastFoodPlace {
  id: string;
  name: string;
  kind: FastFoodKind;
  address: string;
  walkMinutes: number; // aproximado, desde el apartamento
  phone?: string;
  website?: string;
  menuUrl?: string;
  delivery?: boolean;
  takeaway?: boolean;
  orderUrl?: string; // pedido online (web/app/Glovo)
  whatsapp?: string; // solo si está verificado
  description: { es: string; en: string; fr?: string; de?: string; it?: string };
  menu: MenuItem[]; // lo más pedido / carta resumida
}

const goiko: Omit<FastFoodPlace, 'walkMinutes'> = {
  id: 'goiko-albareda',
  name: 'Goiko',
  kind: 'burger',
  address: 'C. Albareda, 14, 41001 Sevilla',
  website: 'https://www.goiko.com/es/',
  orderUrl: 'https://www.goiko.com/es/',
  delivery: true,
  takeaway: true,
  description: {
    es: 'Hamburguesas gourmet muy jugosas, entrantes para compartir y opciones veganas. Reserva o pide a domicilio desde su web.',
    en: 'Juicy gourmet burgers, sharing starters and vegan options. Book or order delivery on their website.',
    fr: 'Burgers gourmets bien juteux, entrées à partager et options végétaliennes. Réservation ou livraison sur leur site.',
    de: 'Saftige Gourmet-Burger, Vorspeisen zum Teilen und vegane Optionen. Reservierung oder Lieferung über die Website.',
    it: 'Hamburger gourmet succosi, antipasti da condividere e opzioni vegane. Prenotazione o consegna dal sito.',
  },
  menu: [
    { name: 'Kevin Bacon / Aita / Thriller', price: '12,50 €' },
    { name: 'Custom Burger', price: '8,50 €' },
    { name: 'Goiko Kids', price: '7,90 €' },
    { name: 'Carrot Cake', price: '5,50 €' },
  ],
};

export const ibarraFastFood: FastFoodPlace[] = [
  {
    id: 'five-guys-constitucion',
    name: 'Five Guys',
    kind: 'burger',
    address: 'Av. de la Constitución, 8, 41004 Sevilla',
    walkMinutes: 9,
    website: 'https://fiveguys.es/',
    orderUrl: 'https://fiveguys.es/',
    delivery: true,
    takeaway: true,
    description: {
      es: 'La cadena americana frente a la Catedral: hamburguesas con los toppings que quieras y patatas cortadas a mano.',
      en: 'The American chain opposite the Cathedral: burgers with any toppings you like and hand-cut fries.',
      fr: 'La chaîne américaine face à la Cathédrale : burgers avec les garnitures de votre choix et frites coupées main.',
      de: 'Die US-Kette gegenüber der Kathedrale: Burger mit Toppings nach Wahl und handgeschnittene Pommes.',
      it: 'La catena americana di fronte alla Cattedrale: hamburger con i condimenti che vuoi e patatine tagliate a mano.',
    },
    menu: [
      { name: 'Cheeseburger / Bacon Burger' },
      { name: 'Hot dogs' },
      { name: 'Patatas Five Guys o Cajún' },
      { name: 'Batidos' },
    ],
  },
  {
    id: '100-montaditos-constitucion',
    name: '100 Montaditos',
    kind: 'montaditos',
    address: 'Av. de la Constitución, 9, 41004 Sevilla',
    walkMinutes: 9,
    phone: '+34 954 22 19 91',
    website: 'https://spain.100montaditos.com/',
    takeaway: true,
    description: {
      es: 'Cien variedades de mini bocadillos para picar rápido y barato, con cerveza muy fría. Se pide en barra con papeleta.',
      en: 'A hundred kinds of mini sandwiches for a quick, cheap bite, with ice-cold beer. Order at the counter with a slip.',
      fr: 'Cent variétés de mini-sandwichs pour manger vite et pas cher, avec une bière bien fraîche. Commande au comptoir.',
      de: 'Hundert Sorten Mini-Sandwiches für den schnellen, günstigen Hunger, dazu eiskaltes Bier. Bestellung an der Theke.',
      it: 'Cento varietà di mini panini per uno spuntino veloce ed economico, con birra ghiacciata. Si ordina al banco.',
    },
    menu: [
      { name: 'Montaditos (miércoles y domingo)', price: '1 €' },
      { name: 'Nachos, patatas y ensaladas' },
      { name: 'Jarra de cerveza' },
    ],
  },
  { ...goiko, walkMinutes: 10 },
  {
    id: 'burger-king-constitucion',
    name: 'Burger King',
    kind: 'burger',
    address: 'Av. de la Constitución, 27, 41001 Sevilla',
    walkMinutes: 9,
    website: 'https://www.burgerking.es/',
    orderUrl: 'https://www.burgerking.es/',
    delivery: true,
    takeaway: true,
    description: {
      es: 'Clásico de siempre en la avenida de la Constitución, cómodo para comer rápido o a deshoras.',
      en: 'The familiar classic on Avenida de la Constitución, handy for a quick meal at any hour.',
      fr: 'Le classique de toujours sur l’avenue de la Constitución, pratique à toute heure.',
      de: 'Der bekannte Klassiker an der Avenida de la Constitución, praktisch zu jeder Tageszeit.',
      it: 'Il classico di sempre in Avenida de la Constitución, comodo a ogni ora.',
    },
    menu: [{ name: 'Whopper®' }, { name: 'Menús, nuggets y helados' }],
  },
];

export const quevedoFastFood: FastFoodPlace[] = [
  {
    id: 'lokal',
    name: 'Lokal',
    kind: 'burger',
    address: 'C. Esperanza Elena Caro, 2, 41002 Sevilla',
    walkMinutes: 3,
    website: 'https://www.lokalburger.co/',
    delivery: true,
    takeaway: true,
    description: {
      es: 'Hamburguesería de barrio muy bien valorada, a un par de minutos de la Alameda. Servicio rápido y buena relación calidad-precio.',
      en: 'Highly rated neighbourhood burger bar, a couple of minutes from the Alameda. Quick service and great value.',
      fr: 'Burger de quartier très bien noté, à deux minutes de l’Alameda. Service rapide et bon rapport qualité-prix.',
      de: 'Sehr gut bewertete Burger-Bar im Viertel, zwei Minuten von der Alameda. Schneller Service, gutes Preis-Leistungs-Verhältnis.',
      it: 'Hamburgeria di quartiere molto apprezzata, a due minuti dall’Alameda. Servizio veloce e ottimo rapporto qualità-prezzo.',
    },
    menu: [{ name: 'Burger «Vaca Gallega»' }, { name: 'Burger «Only Fans»' }],
  },
  {
    id: 'nickel-alameda',
    name: 'Nickel Burger Alameda',
    kind: 'burger',
    address: 'Pl. Alameda de Hércules, 3 (esq. C. Amor de Dios), 41002 Sevilla',
    walkMinutes: 4,
    phone: '+34 722 17 95 82',
    orderUrl: 'https://glovoapp.com/es/es/sevilla/stores/nickel',
    delivery: true,
    takeaway: true,
    description: {
      es: 'Hamburguesas gourmet personalizables en plena Alameda, con cervezas caseras, helados y tartas.',
      en: 'Build-your-own gourmet burgers right on the Alameda, with homemade beers, ice cream and cakes.',
      fr: 'Burgers gourmets à composer en plein cœur de l’Alameda, bières maison, glaces et gâteaux.',
      de: 'Gourmet-Burger zum Selbstzusammenstellen direkt an der Alameda, mit hausgebrautem Bier, Eis und Kuchen.',
      it: 'Hamburger gourmet personalizzabili in piena Alameda, con birre artigianali, gelati e torte.',
    },
    menu: [
      { name: 'Las Bravas de Nickel', price: '6,90 €' },
      { name: 'La Classy', price: '11,50 €' },
      { name: 'La Dolce Vita', price: '12,50 €' },
      { name: 'Beyond Veggie', price: '13,50 €' },
    ],
  },
  {
    id: 'nachos-y-papas',
    name: 'Nachos y Papas',
    kind: 'mexican',
    address: 'Alameda de Hércules, 21, bajo, 41002 Sevilla',
    walkMinutes: 6,
    phone: '+34 645 57 89 97',
    takeaway: true,
    description: {
      es: 'Comida rápida de fusión mexicana y española en la Alameda, con opciones sin gluten.',
      en: 'Mexican–Spanish fusion fast food on the Alameda, with gluten-free options.',
      fr: 'Restauration rapide fusion mexicaine et espagnole sur l’Alameda, avec options sans gluten.',
      de: 'Mexikanisch-spanisches Fusion-Fast-Food an der Alameda, auch glutenfrei.',
      it: 'Fast food fusion messicano-spagnolo sull’Alameda, con opzioni senza glutine.',
    },
    menu: [{ name: 'Nachos' }, { name: 'Papas (patatas)' }, { name: 'Opciones sin gluten' }],
  },
  {
    id: '100-montaditos-santa-maria-de-gracia',
    name: '100 Montaditos',
    kind: 'montaditos',
    address: 'C. Santa María de Gracia, 9, 41002 Sevilla',
    walkMinutes: 5,
    website: 'https://spain.100montaditos.com/',
    takeaway: true,
    description: {
      es: 'Cien variedades de mini bocadillos para picar rápido y barato, junto a la calle Campana.',
      en: 'A hundred kinds of mini sandwiches for a quick, cheap bite, next to Calle Campana.',
      fr: 'Cent variétés de mini-sandwichs pour manger vite et pas cher, près de la rue Campana.',
      de: 'Hundert Sorten Mini-Sandwiches für den schnellen, günstigen Hunger, nahe der Calle Campana.',
      it: 'Cento varietà di mini panini per uno spuntino veloce ed economico, vicino a Calle Campana.',
    },
    menu: [
      { name: 'Montaditos (miércoles y domingo)', price: '1 €' },
      { name: 'Nachos, patatas y ensaladas' },
      { name: 'Jarra de cerveza' },
    ],
  },
  { ...goiko, walkMinutes: 8 },
  {
    id: 'dominos-capuchinos',
    name: "Domino's Pizza",
    kind: 'pizza',
    address: 'Ronda de Capuchinos, 2, 41003 Sevilla',
    walkMinutes: 12,
    website: 'https://www.dominos.es/',
    orderUrl: 'https://www.dominos.es/',
    delivery: true,
    takeaway: true,
    description: {
      es: 'Pizzas para recoger o, más cómodo, a domicilio en el apartamento pidiendo por su web o app.',
      en: 'Pizzas to collect or, easier, delivered to the apartment by ordering on their website or app.',
      fr: 'Pizzas à emporter ou, plus simple, livrées à l’appartement via leur site ou appli.',
      de: 'Pizza zum Abholen oder bequem in die Wohnung geliefert – Bestellung über Website oder App.',
      it: 'Pizze da asporto o, più comodo, consegnate in appartamento ordinando dal sito o dall’app.',
    },
    menu: [{ name: 'Pizzas', price: '' }, { name: 'Entrantes y postres' }],
  },
];
