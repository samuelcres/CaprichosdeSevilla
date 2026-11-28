// Buscador de la guía: índice de todo el contenido de la app (en el idioma del
// huésped y solo de su apartamento) y búsqueda tolerante a acentos y sinónimos.
// Funciona sin conexión; la respuesta redactada la añade /api/ask si está disponible.
import { translations, Language, Apartment } from '@/lib/i18n';
import { ibarraRestaurants, quevedoRestaurants, restaurantText } from '@/lib/restaurantData';
import { ibarraFastFood, quevedoFastFood } from '@/lib/fastFoodData';
import { visitDetails } from '@/lib/visitData';
import { GUIDE } from '@/lib/guideContent';
import { AC, WASHER, APARTMENT_APPLIANCES } from '@/lib/applianceGuides';
import { BARRIO, HEALTH, HOSPITAL, PHARMACY_24H, TICKETS, ROUTES, REVIEW } from '@/lib/extrasI18n';

export type SearchSection = 'transport' | 'checkin' | 'wifi' | 'tourism' | 'events' | 'contact';

export interface SearchDoc {
  id: string;
  section: SearchSection;
  title: string;
  text: string;
}

export interface SearchHit extends SearchDoc {
  score: number;
  snippet: string;
}

const SECTIONS: SearchSection[] = ['transport', 'checkin', 'wifi', 'tourism', 'events', 'contact'];
const OTHER_APT: Record<Apartment, Apartment> = { ibarra: 'quevedo', quevedo: 'ibarra' };

// ---------- normalización ----------

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ß/g, 'ss');
}

const STOP = new Set(
  (
    'el la los las un una unos unas de del al a en y o que por para con sin se su sus mi mis es esta este hay como cual donde cuando quien me te lo le nos ' +
    'the a an of to in on at for and or is are be it my me i you we how what where when which who do does can there this that with from ' +
    'le la les un une des du de et ou est sont ce cette mon ma mes je tu vous nous comment ou quand quel quelle pour avec dans sur ' +
    'der die das ein eine einen und oder ist sind wo wie wann was ich du sie wir mit fur von zu im am den dem des es gibt kann ' +
    'il lo la gli le un una di da e o che per con su mio mia come dove quando quale ci sono e posso'
  ).split(/\s+/)
);

function tokens(s: string): string[] {
  const n = normalize(s);
  // chino: sin espacios, se indexa por caracteres
  const cjk = n.match(/[一-鿿]/g) ?? [];
  const words = n.split(/[^a-z0-9À-ɏ]+/).filter((w) => w.length > 1 && !STOP.has(w));
  return [...words, ...cjk];
}

// Grupos de sinónimos en los 6 idiomas: si la pregunta usa uno, cuentan todos.
const CONCEPTS: string[][] = [
  ['wifi', 'wi-fi', 'internet', 'contrasena', 'password', 'clave', 'red', 'wlan', 'passwort', 'mot de passe', 'reseau', 'rete', '密码', '网络', 'ssid'],
  ['llave', 'llaves', 'key', 'keys', 'entrar', 'entrada', 'acceso', 'puerta', 'door', 'cle', 'schlussel', 'chiave', 'porta', 'porte', 'tur', '钥匙', '门', 'check-in', 'checkin', 'llegada', 'arrival', 'arrivee', 'ankunft', 'arrivo', '入住', 'enlace', 'link'],
  ['salida', 'check-out', 'checkout', 'depart', 'departure', 'abreise', 'partenza', '退房', 'irse', 'marcharse'],
  ['hora', 'horario', 'time', 'hours', 'heure', 'horaire', 'uhrzeit', 'zeit', 'ora', 'orario', '时间'],
  ['aeropuerto', 'airport', 'aeroport', 'flughafen', 'aeroporto', '机场', 'avion', 'vuelo', 'flight'],
  ['tren', 'estacion', 'santa justa', 'train', 'gare', 'bahnhof', 'zug', 'treno', 'stazione', '火车', '车站'],
  ['taxi', 'uber', 'cabify', '出租车'],
  ['autobus', 'bus', 'tussam', '公交', 'parada', 'stop', 'arret', 'haltestelle', 'fermata'],
  ['comer', 'comida', 'restaurante', 'restaurantes', 'cenar', 'cena', 'almuerzo', 'desayuno', 'tapas', 'eat', 'food', 'restaurant', 'dinner', 'lunch', 'breakfast', 'manger', 'diner', 'dejeuner', 'essen', 'abendessen', 'fruhstuck', 'mangiare', 'cena', 'pranzo', 'colazione', '吃', '餐厅', '早餐', '晚餐'],
  ['farmacia', 'pharmacy', 'pharmacie', 'apotheke', '药店', 'medicina', 'medicine', 'medicament', 'medikament'],
  ['hospital', 'medico', 'doctor', 'urgencias', 'emergency', 'hopital', 'urgence', 'krankenhaus', 'arzt', 'notaufnahme', 'ospedale', 'pronto soccorso', '医院', '医生', 'salud', 'health', 'sante', 'gesundheit', 'salute'],
  ['emergencia', 'emergencias', '112', 'policia', 'police', 'polizei', 'polizia', '警察', '紧急'],
  ['aire', 'acondicionado', 'climatizacion', 'calefaccion', 'air conditioning', 'ac', 'heating', 'climatisation', 'chauffage', 'klimaanlage', 'heizung', 'aria condizionata', 'riscaldamento', '空调', 'mando', 'remote', 'telecommande', 'fernbedienung', 'telecomando'],
  ['lavadora', 'lavar', 'ropa', 'washing machine', 'washer', 'laundry', 'lave-linge', 'linge', 'waschmaschine', 'wasche', 'lavatrice', 'bucato', '洗衣机', 'lavanderia'],
  ['supermercado', 'supermarket', 'supermarche', 'supermarkt', '超市', 'compra', 'tienda', 'shop', 'magasin', 'geschaft', 'negozio'],
  ['cajero', 'atm', 'dinero', 'cash', 'money', 'distributeur', 'argent', 'geldautomat', 'bancomat', '取款机'],
  ['equipaje', 'maleta', 'maletas', 'consigna', 'luggage', 'baggage', 'suitcase', 'bagages', 'valise', 'gepack', 'koffer', 'bagagli', 'valigia', '行李'],
  ['whatsapp', 'telefono', 'contacto', 'anfitrion', 'phone', 'contact', 'host', 'telephone', 'hote', 'telefon', 'gastgeber', 'telefono', 'contatto', 'host', '电话', '联系'],
  ['evento', 'eventos', 'concierto', 'event', 'events', 'concert', 'evenement', 'veranstaltung', 'konzert', 'evento', 'concerto', '活动', '演出'],
  ['alcazar', 'catedral', 'giralda', 'cathedral', 'cathedrale', 'kathedrale', 'cattedrale', 'entradas', 'tickets', 'billets', 'eintrittskarten', 'biglietti', '门票', 'monumento', 'visitar', 'visit', 'visiter', 'besuchen', 'visitare'],
  ['basura', 'reciclaje', 'rubbish', 'trash', 'garbage', 'poubelle', 'mull', 'spazzatura', '垃圾'],
  ['parking', 'aparcar', 'coche', 'car', 'voiture', 'auto', 'parcheggio', '停车'],
  ['tiempo', 'clima', 'lluvia', 'calor', 'weather', 'rain', 'heat', 'meteo', 'pluie', 'wetter', 'regen', 'tempo', 'pioggia', '天气'],
  ['resena', 'opinion', 'review', 'avis', 'bewertung', 'recensione', '评价'],
  ['paseo', 'ruta', 'pasear', 'walk', 'route', 'balade', 'spaziergang', 'passeggiata', '散步'],
];
const CONCEPT_TOKENS = CONCEPTS.map((group) => group.map((t) => normalize(t)));

// ---------- construcción del índice ----------

const isUrl = (s: string) => /^(https?:|www\.|mailto:|tel:)/i.test(s.trim());

function sectionOfTopKey(key: string): SearchSection | null {
  return (SECTIONS as string[]).includes(key) ? (key as SearchSection) : null;
}

function flattenTranslations(lang: Language, apartment: Apartment, docs: SearchDoc[]) {
  const root = (translations as any)[lang] ?? (translations as any).es;
  const other = OTHER_APT[apartment];

  const walk = (node: any, path: string[], section: SearchSection, parentTitle: string) => {
    if (!node || typeof node !== 'object') return;
    const strings: string[] = [];
    const title: string =
      (typeof node.title === 'string' && node.title) || (typeof node.name === 'string' && node.name) || parentTitle;
    for (const [key, value] of Object.entries(node)) {
      // solo el apartamento del huésped (claves como quevedo, stopQuevedo, quevedoInfo…)
      if (key.toLowerCase().includes(other)) continue;
      // ya se indexan aparte, con más detalle
      if (key === 'visitItems' || key === 'recommendedDishes') continue;
      if (typeof value === 'string') {
        if (value.length > 1 && !isUrl(value) && value !== title) strings.push(value);
      } else if (Array.isArray(value)) {
        for (const item of value) {
          if (typeof item === 'string') strings.push(item);
          else walk(item, [...path, key], section, title);
        }
      } else if (value && typeof value === 'object') {
        walk(value, [...path, key], section, title);
      }
    }
    // grupos de etiquetas cortas de la interfaz (botones, pestañas) no responden preguntas
    const avg = strings.reduce((a, s) => a + s.length, 0) / Math.max(strings.length, 1);
    const isLabelList = typeof node.title !== 'string' && strings.length >= 4 && avg < 16;
    if (strings.length && !isLabelList) {
      docs.push({ id: `t:${path.join('.')}`, section, title, text: strings.join('. ') });
    }
  };

  for (const [topKey, value] of Object.entries(root)) {
    const section = sectionOfTopKey(topKey);
    if (!section) continue;
    if (section === 'wifi') continue; // se añade aparte, con formato claro
    walk(value, [topKey], section, (value as any)?.title ?? topKey);
  }

  const w = root.wifi;
  const cred = w?.[apartment];
  if (cred) {
    docs.push({
      id: 'wifi:credentials',
      section: 'wifi',
      title: w.title,
      text: `${w.password}: ${cred.password}. ${w.network}: ${cred.ssid}.`,
    });
  }
}

export function buildIndex(lang: Language, apartment: Apartment): SearchDoc[] {
  const docs: SearchDoc[] = [];
  flattenTranslations(lang, apartment, docs);

  const g = GUIDE[lang] ?? GUIDE.es;
  g.journey.forEach((j, i) =>
    docs.push({
      id: `guide:${i}`,
      section: i === 0 ? 'transport' : i <= 1 || i === 4 ? 'checkin' : i === 2 ? 'wifi' : 'tourism',
      title: j.when,
      text: apartment === 'ibarra' && j.textIbarra ? j.textIbarra : j.text,
    })
  );

  // Electrodomésticos (solo si el apartamento los tiene)
  const app = APARTMENT_APPLIANCES[apartment];
  const collect = (o: any): string[] =>
    typeof o === 'string' ? [o] : Array.isArray(o) ? o.flatMap(collect) : o && typeof o === 'object' ? Object.values(o).flatMap(collect) : [];
  if (app?.ac) {
    const ac: any = AC[lang] ?? AC.es;
    docs.push({ id: 'appliance:ac', section: 'wifi', title: ac.title ?? 'A/C', text: collect(ac).filter((s) => !isUrl(s)).join('. ') });
  }
  if (app?.washer) {
    const wa: any = WASHER[lang] ?? WASHER.es;
    docs.push({ id: 'appliance:washer', section: 'wifi', title: wa.title ?? 'Washer', text: collect(wa).filter((s) => !isUrl(s)).join('. ') });
  }

  // Barrio y costumbres
  const b: any = BARRIO[lang] ?? BARRIO.es;
  docs.push({ id: 'barrio:services', section: 'tourism', title: b.servicesTitle, text: `${b.servicesHint} ${Object.values(b.services).join(', ')}.` });
  (b.customs as { title: string; text: string }[]).forEach((c, i) =>
    docs.push({ id: `barrio:custom:${i}`, section: 'tourism', title: c.title, text: c.text })
  );

  // Salud
  const h: any = HEALTH[lang] ?? HEALTH.es;
  const hosp = HOSPITAL[apartment];
  docs.push({ id: 'health:hospital', section: 'contact', title: h.hospital, text: `${hosp.name}. ${hosp.address}. ${hosp.phone}.` });
  docs.push({ id: 'health:pharmacy24', section: 'contact', title: h.pharmacy24, text: `${PHARMACY_24H.name}. ${PHARMACY_24H.address}. ${PHARMACY_24H.phone}.` });
  docs.push({ id: 'health:guard', section: 'contact', title: h.guard, text: h.guardText });
  docs.push({ id: 'health:centre', section: 'contact', title: h.healthCentre, text: h.healthCentreText });

  // Entradas, paseos y reseña
  const tk: any = TICKETS[lang] ?? TICKETS.es;
  docs.push({ id: 'tickets', section: 'tourism', title: tk.title, text: `${tk.text} ${tk.alcazar}. ${tk.cathedral}.` });
  for (const r of ROUTES[apartment] ?? []) {
    docs.push({
      id: `route:${r.id}`,
      section: 'tourism',
      title: (r.title as any)[lang] ?? (r.title as any).es,
      text: `${(r.text as any)[lang] ?? (r.text as any).es} ${r.stops.join(', ')}. ${r.km} km · ${r.hours} h.`,
    });
  }
  const rv: any = REVIEW[lang] ?? REVIEW.es;
  docs.push({ id: 'review', section: 'checkin', title: rv.title, text: rv.text });

  // Restaurantes y comida rápida del apartamento
  const restaurants = apartment === 'ibarra' ? ibarraRestaurants : quevedoRestaurants;
  const tr: any = (translations as any)[lang]?.tourism ?? {};
  for (const r of restaurants) {
    const { description, dishes } = restaurantText(r, lang);
    docs.push({
      id: `rest:${r.name}`,
      section: 'tourism',
      title: r.name,
      text: `${tr[r.category] ?? r.category}. ${description} ${dishes ? `${dishes}.` : ''} ${r.distance} min.${r.phone ? ` ${r.phone}.` : ''}`,
    });
  }
  const fast = apartment === 'ibarra' ? ibarraFastFood : quevedoFastFood;
  for (const f of fast) {
    const d = (f.description as any)[lang] ?? f.description.en ?? f.description.es;
    docs.push({ id: `fast:${f.id}`, section: 'tourism', title: f.name, text: `${d} ${f.address}. ${f.walkMinutes} min.${f.phone ? ` ${f.phone}.` : ''}` });
  }

  // Visitas: horario y precio (nombre y descripción vienen de i18n)
  for (const v of visitDetails) {
    const info = tr.visitItems?.[v.id];
    if (!info) continue;
    const minutes = apartment === 'ibarra' ? v.distanceIbarra : v.distanceQuevedo;
    docs.push({
      id: `visit:${v.id}`,
      section: 'tourism',
      title: info.name ?? v.id,
      text: `${info.description ?? ''} ${v.schedule}. ${v.price}.${minutes ? ` ${minutes} min.` : ''} ${v.phone}.`,
    });
  }

  return docs
    .map((d) => ({ ...d, text: d.text.replace(/\s+/g, ' ').trim() }))
    .filter((d) => d.text.length > 3);
}

// ---------- búsqueda ----------

interface Prepared {
  doc: SearchDoc;
  titleTokens: string[];
  bodyTokens: string[];
  normText: string;
}

const cache = new Map<string, Prepared[]>();

function prepared(lang: Language, apartment: Apartment): Prepared[] {
  const key = `${lang}:${apartment}`;
  let p = cache.get(key);
  if (!p) {
    p = buildIndex(lang, apartment).map((doc) => ({
      doc,
      titleTokens: tokens(doc.title),
      bodyTokens: tokens(doc.text),
      normText: normalize(`${doc.title} ${doc.text}`),
    }));
    cache.set(key, p);
  }
  return p;
}

function matches(token: string, candidate: string): boolean {
  if (candidate === token) return true;
  // prefijos: "restaurant" ↔ "restaurantes", "farmac" ↔ "farmacias"
  if (token.length >= 4 && candidate.length >= 4) {
    return candidate.startsWith(token) || token.startsWith(candidate.slice(0, Math.max(4, token.length - 2)));
  }
  return false;
}

function bestSnippet(text: string, terms: string[]): string {
  const sentences = text.split(/(?<=[.!?。])\s+/);
  let best = sentences[0] ?? text;
  let bestScore = -1;
  for (const s of sentences) {
    const n = normalize(s);
    const score = terms.reduce((acc, t) => acc + (n.includes(t) ? 1 : 0), 0) + (s.length >= 15 ? 0.5 : -1);
    if (score > bestScore) {
      best = s;
      bestScore = score;
    }
  }
  return best.length > 220 ? `${best.slice(0, 217)}…` : best;
}

export function search(query: string, lang: Language, apartment: Apartment, limit = 6): SearchHit[] {
  const q = normalize(query.trim());
  if (q.length < 2) return [];
  const qTokens = tokens(query);
  if (!qTokens.length) return [];

  // conceptos que aparecen en la pregunta (también frases de varias palabras)
  const conceptTerms = new Set<string>();
  CONCEPT_TOKENS.forEach((group) => {
    if (group.some((term) => (term.includes(' ') ? q.includes(term) : qTokens.some((t) => matches(t, term))))) {
      group.forEach((term) => conceptTerms.add(term));
    }
  });

  const docs = prepared(lang, apartment);
  const df = (t: string) => docs.filter((d) => d.bodyTokens.some((b) => matches(t, b)) || d.titleTokens.some((b) => matches(t, b))).length;
  const idf = new Map(qTokens.map((t) => [t, Math.log(1 + docs.length / (1 + df(t)))]));

  const hits: SearchHit[] = [];
  for (const d of docs) {
    let score = 0;
    for (const t of qTokens) {
      const w = idf.get(t) ?? 1;
      if (d.titleTokens.some((x) => matches(t, x))) score += 3 * w;
      else if (d.bodyTokens.some((x) => matches(t, x))) score += 1.5 * w;
    }
    let conceptHits = 0;
    conceptTerms.forEach((term) => {
      if (term.includes(' ') ? d.normText.includes(term) : d.titleTokens.includes(term) || d.bodyTokens.includes(term)) conceptHits++;
    });
    score += Math.min(conceptHits, 3) * 1.2;
    if (q.length >= 4 && d.normText.includes(q)) score += 4; // frase exacta
    // fichas preparadas a mano (Wi-Fi, salud, electrodomésticos…) van primero ante empate
    if (score > 0 && !d.doc.id.startsWith('t:')) score += 1.5;
    if (score > 0) {
      hits.push({ ...d.doc, score, snippet: bestSnippet(d.doc.text, qTokens.concat(Array.from(conceptTerms))) });
    }
  }
  hits.sort((a, b) => b.score - a.score);
  // evita repetir el mismo título
  const seen = new Set<string>();
  return hits.filter((h) => (seen.has(h.title + h.snippet) ? false : (seen.add(h.title + h.snippet), true))).slice(0, limit);
}
