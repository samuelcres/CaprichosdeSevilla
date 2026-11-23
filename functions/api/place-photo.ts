// Cloudflare Pages Function: GET /api/place-photo?name=places/XXX/photos/YYY
// Sirve la foto de Google Places sin exponer la clave, pequeña (200 px, o 480 con w=480) y en caché 30 días.

interface Env {
  GOOGLE_PLACES_API_KEY?: string;
}

export async function onRequestGet(context: { request: Request; env: Env; waitUntil: (p: Promise<any>) => void }) {
  const { request, env, waitUntil } = context;
  const u = new URL(request.url);
  const name = u.searchParams.get('name') || '';
  const w = u.searchParams.get('w') === '480' ? 480 : 200;
  if (!env.GOOGLE_PLACES_API_KEY || !/^places\/[^/]+\/photos\/[^/]+$/.test(name)) {
    return new Response('not found', { status: 404 });
  }

  const cache = (caches as any).default as Cache;
  const cacheKey = new Request(`https://cache.local/place-photo/v1/${w}/${name}`);
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  const r = await fetch(
    `https://places.googleapis.com/v1/${name}/media?maxWidthPx=${w}&maxHeightPx=${w}&key=${env.GOOGLE_PLACES_API_KEY}`,
  );
  if (!r.ok) return new Response('not found', { status: 404 });

  const res = new Response(r.body, {
    headers: {
      'content-type': r.headers.get('content-type') || 'image/jpeg',
      'cache-control': 'public, max-age=2592000',
    },
  });
  waitUntil(cache.put(cacheKey, res.clone()));
  return res;
}
