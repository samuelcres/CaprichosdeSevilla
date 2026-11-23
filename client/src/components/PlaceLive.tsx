import { Star } from 'lucide-react';
import { LivePlaceInfo, liveText } from '@/lib/usePlaceInfo';

/** Valoración + nº de reseñas + estado (abierto/cerrado) con datos en vivo. */
export function LiveBadges({ info, fallbackRating, lang }: { info: LivePlaceInfo | null; fallbackRating?: number; lang: string }) {
  const T = liveText(lang);
  const rating = info?.rating ?? fallbackRating;
  return (
    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
      {rating !== undefined && (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 font-semibold" data-testid="live-rating">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          {rating.toFixed(1)}
          {info?.ratingCount ? <span className="font-normal text-amber-700/80">· {info.ratingCount.toLocaleString(lang === 'zh' ? 'zh-CN' : lang)} {T.reviews}</span> : null}
        </span>
      )}
      {info?.status === 'CLOSED_PERMANENTLY' ? (
        <span className="rounded-full bg-red-600 text-white px-2 py-0.5 font-semibold" data-testid="live-closed-forever">{T.closedForever}</span>
      ) : info?.status === 'CLOSED_TEMPORARILY' ? (
        <span className="rounded-full bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 font-semibold">{T.closedTemp}</span>
      ) : info?.openNow !== undefined ? (
        <span className={`rounded-full px-2 py-0.5 font-semibold border ${info.openNow ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-zinc-100 text-zinc-600 border-zinc-200'}`} data-testid="live-open">
          {info.openNow ? T.open : T.closed}
        </span>
      ) : null}
    </div>
  );
}

export function GoogleCredit({ info }: { info: LivePlaceInfo | null }) {
  if (!info) return null;
  return <span className="text-[10px] text-muted-foreground">Google Maps</span>;
}
