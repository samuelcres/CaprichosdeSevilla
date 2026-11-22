// Cloudflare Pages Function: GET /api/places?type=supermarket&apartment=ibarra
//
// Lista de sitios cercanos al apartamento, ordenados por distancia a pie.
// - Con GOOGLE_PLACES_API_KEY: Google Places (New) Text Search → nombre, dirección,
//   teléfono, valoración, foto y enlace a Google Maps.
// - Sin clave: OpenStreetMap (Overpass) → nombre, dirección y teléfono si existe.
// Resultados en caché 7 días (por tipo y apartamento) para no gastar cuota.

interface Env {
  GOOGLE_PLACES_API_KEY?: string;
}

type PlaceType = 'supermarket' | 'pharmacy' | 'atm' | 'laundry' | 'bazaar' | 'bakery';

const APARTMENTS: Record<string, { lat: number; lng: number }> = {
  ibarra: { lat: 37.3889, lng: -5.9885 },
  quevedo: { lat: 37.3954, lng: -5.993 },
};

const GOOGLE_QUERY: Record<PlaceType, string> = {
  supermarket: 'supermercado',
  pharmacy: 'farmacia',
  atm: 'cajero automático',
  laundry: 'lavandería autoservicio',
  bazaar: 'bazar',
  bakery: 'panadería',
};

// Etiquetas de OpenStreetMap equivalentes
const OSM_FILTER: Record<PlaceType, string[]> = {
  supermarket: ['["shop"="supermarket"]', '["shop"="convenience"]'],
  pharmacy: ['["amenity"="pharmacy"]'],
  atm: ['["amenity"="atm"]', '["amenity"="bank"]["atm"="yes"]'],
  laundry: ['["shop"="laundry"]'],
  bazaar: ['["shop"="variety_store"]', '["shop"="general"]', '["shop"="houseware"]'],
  bakery: ['["shop"="bakery"]', '["shop"="pastry"]'],
};

const RADIUS_M = 900;
const MAX_RESULTS = 8;
const CACHE_SECONDS = 7 * 24 * 3600;

export interface NearbyPlace {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  rating?: number;
  ratingCount?: number;
  openNow?: boolean;
  photo?: string; // URL de nuestra propia función de fotos
  mapsUrl: string;
  meters: number;
  walkMinutes: number;
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

export function walkFrom(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371000;
  const rad = (x: number) => (x * Math.PI) / 180;
  const h =
    Math.sin(rad(b.lat - a.lat) / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lng - a.lng) / 2) ** 2;
  const straight = 2 * R * Math.asin(Math.sqrt(h));
  const meters = Math.round((straight * 1.3) / 10) * 10; // calles ~30 % más largas
  return { meters, walkMinutes: Math.max(1, Math.round(meters / 80)) }; // ~4,8 km/h
}

export async function fromGoogle(key: string, type: PlaceType, from: { lat: number; lng: number }): Promise<NearbyPlace[]> {
  const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': [
        'places.id', 'places.displayName', 'places.shortFormattedAddress', 'places.formattedAddress',
        'places.location', 'places.rating', 'places.userRatingCount', 'places.internationalPhoneNumber',
        'places.googleMapsUri', 'places.photos', 'places.currentOpeningHours.openNow',
      ].join(','),
    },
    body: JSON.stringify({
      textQuery: GOOGLE_QUERY[type],
      languageCode: 'es',
      regionCode: 'ES',
      pageSize: 15,
      locationBias: { circle: { center: { latitude: from.lat, longitude: from.lng }, radius: RADIUS_M } },
    }),
  });
  if (!r.ok) throw new Error(`google ${r.status}`);
  const data: any = await r.json();
  return (data.places || [])
    .filter((p: any) => p.location)
    .map((p: any): NearbyPlace => {
      const loc = { lat: p.location.latitude, lng: p.location.longitude };
      const photoName = p.photos?.[0]?.name;
      return {
        id: p.id,
        name: p.displayName?.text || '',
        address: p.shortFormattedAddress || p.formattedAddress,
        phone: p.internationalPhoneNumber,
        rating: p.rating,
        ratingCount: p.userRatingCount,
        openNow: p.currentOpeningHours?.openNow,
        photo: photoName ? `/api/place-photo?name=${encodeURIComponent(photoName)}` : undefined,
        mapsUrl: p.googleMapsUri || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.displayName?.text || '')}&query_place_id=${p.id}`,
        ...walkFrom(from, loc),
      };
    })
    .filter((p: NearbyPlace) => p.meters <= RADIUS_M * 1.6);
}

export async function fromOsm(type: PlaceType, from: { lat: number; lng: number }): Promise<NearbyPlace[]> {
  const around = `(around:${RADIUS_M},${from.lat},${from.lng})`;
  const q = `[out:json][timeout:20];(${OSM_FILTER[type].map((f) => `nwr${f}${around};`).join('')});out center tags 40;`;
  const r = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: 'data=' + encodeURIComponent(q),
  });
  if (!r.ok) throw new Error(`overpass ${r.status}`);
  const data: any = await r.json();
  return (data.elements || [])
    .map((e: any): NearbyPlace | null => {
      const t = e.tags || {};
      const lat = e.lat ?? e.center?.lat;
      const lng = e.lon ?? e.center?.lon;
      const name = t.name || t.brand || t.operator;
      if (!name || lat === undefined) return null;
      const street = [t['addr:street'], t['addr:housenumber']].filter(Boolean).join(', ');
      return {
        id: `osm-${e.type}-${e.id}`,
        name,
        address: street || undefined,
        phone: t.phone || t['contact:phone'],
        mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}${street ? ', ' + street : ''}, Sevilla`)}`,
        ...walkFrom(from, { lat, lng }),
      };
    })
    .filter(Boolean) as NearbyPlace[];
}

export async function onRequestGet(context: { request: Request; env: Env; waitUntil: (p: Promise<any>) => void }) {
  const { request, env, waitUntil } = context;
  const url = new URL(request.url);
  const type = url.searchParams.get('type') as PlaceType;
  const apartment = url.searchParams.get('apartment') || 'ibarra';
  if (!(type in GOOGLE_QUERY)) return json({ error: 'bad type' }, 400);
  const from = APARTMENTS[apartment] || APARTMENTS.ibarra;
  const source = env.GOOGLE_PLACES_API_KEY ? 'google' : 'osm';

  const cache = (caches as any).default as Cache;
  const cacheKey = new Request(`https://cache.local/places/v1/${source}/${apartment}/${type}`);
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  let places: NearbyPlace[];
  try {
    places = source === 'google' ? await fromGoogle(env.GOOGLE_PLACES_API_KEY!, type, from) : await fromOsm(type, from);
  } catch (e) {
    return json({ source, places: [], error: String(e) }, 502);
  }

  // Sin duplicados (mismo nombre a menos de 40 m) y por cercanía
  const out: NearbyPlace[] = [];
  for (const p of places.sort((a, b) => a.meters - b.meters)) {
    if (out.some((o) => o.name.toLowerCase() === p.name.toLowerCase() && Math.abs(o.meters - p.meters) < 40)) continue;
    out.push(p);
    if (out.length >= MAX_RESULTS) break;
  }

  const res = json({ source, places: out }, 200, 3600);
  waitUntil(cache.put(cacheKey, new Response(res.clone().body, {
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': `public, max-age=${CACHE_SECONDS}` },
  })));
  return res;
}
