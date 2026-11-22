// Cloudflare Pages Function: GET /api/events?date=YYYY-MM-DD&lang=es&apartment=ibarra
//
// Busca los eventos de Sevilla de ese día en la API pública de Ticketmaster
// (Discovery API), calcula la distancia a pie y en taxi desde el apartamento
// y, si el proyecto tiene Workers AI enlazado, traduce las descripciones al
// idioma del huésped.
//
// Configuración en Cloudflare Pages → Settings:
//   - Variable de entorno (secreta) TICKETMASTER_API_KEY  (obligatoria)
//   - Binding de Workers AI con nombre AI                  (opcional, traducción)

type Lang = 'es' | 'en' | 'fr' | 'de' | 'it' | 'zh';

interface Env {
  TICKETMASTER_API_KEY?: string;
  AI?: { run: (model: string, input: unknown) => Promise<any> };
}

const APARTMENTS: Record<string, { lat: number; lng: number }> = {
  ibarra: { lat: 37.3889, lng: -5.9885 },
  quevedo: { lat: 37.3954, lng: -5.993 },
};

const TM_LOCALE: Record<Lang, string> = {
  es: 'es-es,*',
  en: 'en-us,*',
  fr: 'fr-fr,*',
  de: 'de-de,*',
  it: 'it-it,*',
  zh: 'en-us,*',
};

const LANG_NAME: Record<Lang, string> = {
  es: 'Spanish',
  en: 'English',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  zh: 'Simplified Chinese',
};

const CACHE_SECONDS = 3 * 60 * 60; // 3 horas

export interface LiveEvent {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD (hora local de Sevilla)
  time?: string; // HH:mm
  category?: string;
  genre?: string;
  description?: string;
  image?: string;
  url?: string;
  price?: { min?: number; max?: number; currency: string };
  venue?: {
    name: string;
    address?: string;
    lat?: number;
    lng?: number;
  };
  distance?: {
    km: number; // en línea recta
    walkMinutes: number;
    taxiMinutes: number;
  };
  rating?: number; // reservado: la fuente actual no da valoraciones
  source: 'ticketmaster';
}

function json(body: unknown, status = 200, maxAge = 0) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': maxAge ? `public, max-age=${maxAge}` : 'no-store',
    },
  });
}

function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Estimaciones prudentes para el centro de Sevilla:
// a pie ~4,8 km/h y calles un 30 % más largas que la línea recta;
// taxi ~18 km/h de media urbana, recorrido un 40 % más largo, +3 min de espera.
export function estimateDistance(from: { lat: number; lng: number }, to: { lat: number; lng: number }) {
  const km = haversineKm(from, to);
  const walkMinutes = Math.max(1, Math.round(((km * 1.3) / 4.8) * 60));
  const taxiMinutes = Math.max(3, Math.round(((km * 1.4) / 18) * 60) + 3);
  return { km: Math.round(km * 10) / 10, walkMinutes, taxiMinutes };
}

function stripHtml(s?: string) {
  return s?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() || undefined;
}

function pickImage(images: any[] | undefined) {
  if (!images?.length) return undefined;
  const wide = images
    .filter((i) => i.ratio === '16_9' && i.width >= 500)
    .sort((a, b) => a.width - b.width);
  return (wide[0] || images[0])?.url;
}

export function mapTicketmasterEvent(e: any, date: string, from?: { lat: number; lng: number }): LiveEvent | null {
  const localDate = e?.dates?.start?.localDate;
  if (localDate && localDate !== date) return null;

  const v = e?._embedded?.venues?.[0];
  const lat = v?.location?.latitude ? Number(v.location.latitude) : undefined;
  const lng = v?.location?.longitude ? Number(v.location.longitude) : undefined;
  const cls = e?.classifications?.[0];
  const pr = e?.priceRanges?.[0];
  const clean = (x?: string) => (x && x !== 'Undefined' ? x : undefined);

  const ev: LiveEvent = {
    id: String(e.id),
    name: String(e.name || '').trim(),
    date: localDate || date,
    time: e?.dates?.start?.localTime?.slice(0, 5),
    category: clean(cls?.segment?.name),
    genre: clean(cls?.genre?.name),
    description: stripHtml(e.description || e.info || e.pleaseNote),
    image: pickImage(e.images),
    url: e.url,
    price: pr ? { min: pr.min, max: pr.max, currency: pr.currency || 'EUR' } : undefined,
    venue: v
      ? {
          name: v.name,
          address: [v.address?.line1, v.city?.name].filter(Boolean).join(', ') || undefined,
          lat,
          lng,
        }
      : undefined,
    source: 'ticketmaster',
  };

  if (from && lat !== undefined && lng !== undefined && !Number.isNaN(lat) && !Number.isNaN(lng)) {
    ev.distance = estimateDistance(from, { lat, lng });
  }
  return ev;
}

// Ventana UTC que cubre el día completo en hora de Madrid (UTC+1/+2)
function utcWindow(date: string) {
  const d = new Date(`${date}T00:00:00Z`);
  const start = new Date(d.getTime() - 2 * 3600 * 1000);
  const end = new Date(d.getTime() + 24 * 3600 * 1000 - 1000);
  const fmt = (x: Date) => x.toISOString().replace(/\.\d{3}Z$/, 'Z');
  return { start: fmt(start), end: fmt(end) };
}

async function translateEvents(env: Env, events: LiveEvent[], lang: Lang) {
  if (!env.AI) return;
  const target = LANG_NAME[lang];
  const jobs = events
    .filter((e) => e.description)
    .slice(0, 15)
    .map(async (e) => {
      try {
        const out = await env.AI!.run('@cf/meta/llama-3.1-8b-instruct', {
          messages: [
            {
              role: 'system',
              content: `You translate short event descriptions for hotel guests into ${target}. Keep names of artists, shows and venues unchanged. If the text is already in ${target}, return it unchanged. Reply with the translated text only, at most 3 sentences.`,
            },
            { role: 'user', content: e.description!.slice(0, 1200) },
          ],
          max_tokens: 300,
        });
        const text = typeof out?.response === 'string' ? out.response.trim() : '';
        if (text) e.description = text;
      } catch {
        // si falla la traducción se deja el texto original
      }
    });
  await Promise.all(jobs);
}

export async function onRequestGet(context: { request: Request; env: Env; waitUntil: (p: Promise<any>) => void }) {
  const { request, env, waitUntil } = context;
  const url = new URL(request.url);
  const date = url.searchParams.get('date') || '';
  const lang = (url.searchParams.get('lang') || 'es') as Lang;
  const apartment = url.searchParams.get('apartment') || 'ibarra';

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return json({ error: 'bad date' }, 400);
  if (!(lang in TM_LOCALE)) return json({ error: 'bad lang' }, 400);
  const from = APARTMENTS[apartment] || APARTMENTS.ibarra;

  if (!env.TICKETMASTER_API_KEY) {
    return json({ configured: false, events: [] });
  }

  // Caché del borde: misma fecha + idioma + apartamento
  const cache = (caches as any).default as Cache;
  const cacheKey = new Request(`https://cache.local/events/v1/${date}/${lang}/${apartment}`);
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const { start, end } = utcWindow(date);
  const tm = new URL('https://app.ticketmaster.com/discovery/v2/events.json');
  tm.searchParams.set('apikey', env.TICKETMASTER_API_KEY);
  tm.searchParams.set('countryCode', 'ES');
  tm.searchParams.set('city', 'Sevilla');
  tm.searchParams.set('startDateTime', start);
  tm.searchParams.set('endDateTime', end);
  tm.searchParams.set('locale', TM_LOCALE[lang]);
  tm.searchParams.set('sort', 'date,asc');
  tm.searchParams.set('size', '60');

  let raw: any;
  try {
    const r = await fetch(tm.toString(), { headers: { accept: 'application/json' } });
    if (!r.ok) return json({ configured: true, events: [], error: `ticketmaster ${r.status}` }, 502);
    raw = await r.json();
  } catch {
    return json({ configured: true, events: [], error: 'ticketmaster unreachable' }, 502);
  }

  const seen = new Set<string>();
  const events: LiveEvent[] = [];
  for (const e of raw?._embedded?.events || []) {
    const ev = mapTicketmasterEvent(e, date, from);
    if (!ev) continue;
    // Ticketmaster repite a veces el mismo espectáculo (varias zonas/precios)
    const key = `${ev.name}|${ev.time}|${ev.venue?.name}`;
    if (seen.has(key)) continue;
    seen.add(key);
    events.push(ev);
  }

  if (lang !== 'es') await translateEvents(env, events, lang);

  const res = json({ configured: true, source: 'Ticketmaster', events }, 200, 900);
  waitUntil(cache.put(cacheKey, new Response(res.clone().body, {
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': `public, max-age=${CACHE_SECONDS}` },
  })));
  return res;
}
