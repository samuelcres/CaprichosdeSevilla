// Cloudflare Pages Function: GET /api/place-info?q=Confiteria+La+Campana+Sevilla&apartment=ibarra
//
// Datos actualizados de UN lugar concreto (restaurante, comida rápida, monumento):
// foto real, valoración, nº de reseñas, teléfono, dirección, abierto ahora,
// si ha cerrado definitivamente y distancia a pie desde el apartamento.
// Requiere GOOGLE_PLACES_API_KEY; sin clave responde { source: 'none' } y la app
// sigue mostrando sus datos propios. Caché 7 días por consulta.

import { walkFrom } from './places';

interface Env {
  GOOGLE_PLACES_API_KEY?: string;
}

const APARTMENTS: Record<string, { lat: number; lng: number }> = {
  ibarra: { lat: 37.3889, lng: -5.9885 },
  quevedo: { lat: 37.3954, lng: -5.993 },
};

const CACHE_SECONDS = 7 * 24 * 3600;

function json(body: unknown, status = 200, maxAge = 0) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': maxAge ? `public, max-age=${maxAge}` : 'no-store',
    },
  });
}

export async function onRequestGet(context: { request: Request; env: Env; waitUntil: (p: Promise<any>) => void }) {
  const { request, env, waitUntil } = context;
  const url = new URL(request.url);
  const q = (url.searchParams.get('q') || '').trim().slice(0, 120);
  const apartment = url.searchParams.get('apartment') || 'ibarra';
  if (q.length < 3) return json({ error: 'bad q' }, 400);
  if (!env.GOOGLE_PLACES_API_KEY) return json({ source: 'none' }, 200, 3600);

  const from = APARTMENTS[apartment] || APARTMENTS.ibarra;
  const norm = q.toLowerCase().replace(/\s+/g, ' ');
  const cache = (caches as any).default as Cache;
  const cacheKey = new Request(`https://cache.local/place-info/v1/${apartment}/${encodeURIComponent(norm)}`);
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  let place: any;
  try {
    const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-Goog-Api-Key': env.GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': [
          'places.id', 'places.displayName', 'places.shortFormattedAddress', 'places.formattedAddress',
          'places.location', 'places.rating', 'places.userRatingCount', 'places.internationalPhoneNumber',
          'places.googleMapsUri', 'places.photos', 'places.currentOpeningHours.openNow',
          'places.businessStatus', 'places.websiteUri',
        ].join(','),
      },
      body: JSON.stringify({
        textQuery: /sevilla/i.test(q) ? q : `${q} Sevilla`,
        languageCode: 'es',
        regionCode: 'ES',
        pageSize: 1,
        locationBias: { circle: { center: { latitude: from.lat, longitude: from.lng }, radius: 3000 } },
      }),
    });
    if (!r.ok) throw new Error(`google ${r.status}`);
    const data: any = await r.json();
    place = data.places?.[0];
  } catch (e) {
    return json({ source: 'google', found: false, error: String(e) }, 502);
  }

  let body: any = { source: 'google', found: false };
  if (place?.location) {
    const loc = { lat: place.location.latitude, lng: place.location.longitude };
    const walk = walkFrom(from, loc);
    // Si el resultado está a más de ~4 km no es el sitio que buscamos
    if (walk.meters <= 5000) {
      const photoName = place.photos?.[0]?.name;
      body = {
        source: 'google',
        found: true,
        name: place.displayName?.text,
        address: place.shortFormattedAddress || place.formattedAddress,
        phone: place.internationalPhoneNumber,
        website: place.websiteUri,
        rating: place.rating,
        ratingCount: place.userRatingCount,
        openNow: place.currentOpeningHours?.openNow,
        status: place.businessStatus, // OPERATIONAL | CLOSED_TEMPORARILY | CLOSED_PERMANENTLY
        photo: photoName ? `/api/place-photo?name=${encodeURIComponent(photoName)}&w=480` : undefined,
        mapsUrl: place.googleMapsUri,
        ...walk,
      };
    }
  }

  const res = json(body, 200, 3600);
  waitUntil(cache.put(cacheKey, new Response(res.clone().body, {
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': `public, max-age=${CACHE_SECONDS}` },
  })));
  return res;
}
