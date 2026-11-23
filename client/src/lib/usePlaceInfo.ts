import { useEffect, useState } from 'react';

// Datos en vivo de un lugar (Google Places vía /api/place-info).
// Si no hay clave o falla, devuelve null y la tarjeta usa sus datos propios.
export interface LivePlaceInfo {
  found: boolean;
  name?: string;
  address?: string;
  phone?: string;
  website?: string;
  rating?: number;
  ratingCount?: number;
  openNow?: boolean;
  status?: 'OPERATIONAL' | 'CLOSED_TEMPORARILY' | 'CLOSED_PERMANENTLY';
  photo?: string;
  mapsUrl?: string;
  meters?: number;
  walkMinutes?: number;
}

const memory = new Map<string, Promise<LivePlaceInfo | null>>();
const SS_PREFIX = 'cs_pi_v1:';
const TTL = 6 * 3600 * 1000;

/** Extrae la búsqueda del enlace de Maps (?q=…) o usa el nombre + dirección. */
export function placeQuery(name: string, mapsUrl?: string, address?: string): string {
  if (mapsUrl) {
    try {
      const u = new URL(mapsUrl);
      const q = u.searchParams.get('q') || u.searchParams.get('query') || u.searchParams.get('destination');
      if (q) return q.replace(/\+/g, ' ');
    } catch { /* ignore */ }
  }
  return address ? `${name}, ${address}` : name;
}

function load(q: string, apartment: string): Promise<LivePlaceInfo | null> {
  const key = `${apartment}|${q.toLowerCase()}`;
  const cached = memory.get(key);
  if (cached) return cached;

  try {
    const raw = sessionStorage.getItem(SS_PREFIX + key);
    if (raw) {
      const { at, data } = JSON.parse(raw);
      if (Date.now() - at < TTL) {
        const p = Promise.resolve(data as LivePlaceInfo | null);
        memory.set(key, p);
        return p;
      }
    }
  } catch { /* ignore */ }

  const p = fetch(`/api/place-info?q=${encodeURIComponent(q)}&apartment=${apartment}`)
    .then((r) => (r.ok ? r.json() : null))
    .then((d: any) => {
      const data: LivePlaceInfo | null = d && d.source === 'google' && d.found ? d : null;
      try { sessionStorage.setItem(SS_PREFIX + key, JSON.stringify({ at: Date.now(), data })); } catch { /* ignore */ }
      return data;
    })
    .catch(() => null);
  memory.set(key, p);
  return p;
}

export function usePlaceInfo(q: string | undefined, apartment: string): LivePlaceInfo | null {
  const [info, setInfo] = useState<LivePlaceInfo | null>(null);
  useEffect(() => {
    if (!q) return;
    let alive = true;
    load(q, apartment).then((d) => alive && setInfo(d));
    return () => { alive = false; };
  }, [q, apartment]);
  return info;
}

const STATUS_TEXT: Record<string, { open: string; closed: string; closedForever: string; closedTemp: string; reviews: string }> = {
  es: { open: 'Abierto ahora', closed: 'Cerrado ahora', closedForever: 'Cerrado definitivamente', closedTemp: 'Cerrado temporalmente', reviews: 'reseñas' },
  en: { open: 'Open now', closed: 'Closed now', closedForever: 'Permanently closed', closedTemp: 'Temporarily closed', reviews: 'reviews' },
  fr: { open: 'Ouvert', closed: 'Fermé', closedForever: 'Fermé définitivement', closedTemp: 'Fermé temporairement', reviews: 'avis' },
  de: { open: 'Jetzt geöffnet', closed: 'Jetzt geschlossen', closedForever: 'Dauerhaft geschlossen', closedTemp: 'Vorübergehend geschlossen', reviews: 'Bewertungen' },
  it: { open: 'Aperto ora', closed: 'Chiuso ora', closedForever: 'Chiuso definitivamente', closedTemp: 'Chiuso temporaneamente', reviews: 'recensioni' },
  zh: { open: '营业中', closed: '已打烊', closedForever: '已永久停业', closedTemp: '暂停营业', reviews: '条评价' },
};
export function liveText(lang: string) {
  return STATUS_TEXT[lang] || STATUS_TEXT.en;
}
