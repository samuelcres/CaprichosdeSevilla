import { MapPin, Phone, Globe, BookOpen, Navigation, Footprints, Bike, Beef, Pizza, Sandwich, Flame, ShoppingBag, MessageCircle, Soup } from 'lucide-react';
import { Language } from '@/lib/i18n';
import { FastFoodPlace, FastFoodKind } from '@/lib/fastFoodData';
import { usePlaceInfo, placeQuery } from '@/lib/usePlaceInfo';
import { LiveBadges } from './PlaceLive';

const LABELS: Record<Language, { order2: string; takeaway: string; walk: string; call: string; web: string; menu: string; route: string; delivery: string; order: string; intro: string; prices: string; kinds: Record<FastFoodKind, string> }> = {
  es: { order2: 'Pedir online', takeaway: 'Para llevar', walk: 'min a pie', call: 'Llamar', web: 'Web', menu: 'Carta', route: 'Cómo llegar', delivery: 'A domicilio', order: 'Qué pedir', intro: 'Para comer algo rápido sin alejarse del apartamento.', prices: 'Precios orientativos; pueden cambiar.', kinds: { burger: 'Hamburguesas', pizza: 'Pizza', montaditos: 'Montaditos', grill: 'Hamburguesas y brasa', mexican: 'Mexicana' } },
  en: { order2: 'Order online', takeaway: 'Takeaway', walk: 'min walk', call: 'Call', web: 'Website', menu: 'Menu', route: 'Directions', delivery: 'Delivery', order: 'What to order', intro: 'For a quick bite without straying far from the apartment.', prices: 'Prices are approximate and may change.', kinds: { burger: 'Burgers', pizza: 'Pizza', montaditos: 'Mini sandwiches', grill: 'Burgers & grill', mexican: 'Mexican' } },
  fr: { order2: 'Commander', takeaway: 'À emporter', walk: 'min à pied', call: 'Appeler', web: 'Site', menu: 'Carte', route: 'Itinéraire', delivery: 'Livraison', order: 'À commander', intro: 'Pour manger rapidement sans s’éloigner de l’appartement.', prices: 'Prix indicatifs, susceptibles de changer.', kinds: { burger: 'Burgers', pizza: 'Pizza', montaditos: 'Mini-sandwichs', grill: 'Burgers et grill', mexican: 'Mexicain' } },
  de: { order2: 'Online bestellen', takeaway: 'Zum Mitnehmen', walk: 'Min. zu Fuß', call: 'Anrufen', web: 'Website', menu: 'Speisekarte', route: 'Route', delivery: 'Lieferung', order: 'Empfehlung', intro: 'Für den schnellen Hunger ganz in der Nähe der Wohnung.', prices: 'Richtpreise, Änderungen möglich.', kinds: { burger: 'Burger', pizza: 'Pizza', montaditos: 'Mini-Sandwiches', grill: 'Burger & Grill', mexican: 'Mexikanisch' } },
  it: { order2: 'Ordina online', takeaway: 'Da asporto', walk: 'min a piedi', call: 'Chiama', web: 'Sito', menu: 'Menù', route: 'Indicazioni', delivery: 'A domicilio', order: 'Cosa ordinare', intro: 'Per mangiare qualcosa al volo senza allontanarsi dall’appartamento.', prices: 'Prezzi indicativi, possono variare.', kinds: { burger: 'Hamburger', pizza: 'Pizza', montaditos: 'Mini panini', grill: 'Hamburger e griglia', mexican: 'Messicano' } },
  zh: { order2: '在线点餐', takeaway: '外带', walk: '分钟步行', call: '致电', web: '网站', menu: '菜单', route: '路线', delivery: '外卖', order: '推荐', intro: '在公寓附近快速吃点东西。', prices: '价格仅供参考，可能变动。', kinds: { burger: '汉堡', pizza: '披萨', montaditos: '迷你三明治', grill: '汉堡和烧烤', mexican: '墨西哥菜' } },
};

const KIND_ICON: Record<FastFoodKind, typeof Beef> = { burger: Beef, pizza: Pizza, montaditos: Sandwich, grill: Flame, mexican: Soup };

export function fastFoodLabels(lang: Language) {
  return LABELS[lang] || LABELS.en;
}

// Fotos reales de los locales aportadas por Samuel (attached_assets/fastfood/<id>.webp)
const FF_PHOTOS = import.meta.glob('../../../attached_assets/fastfood/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
const ffPhoto = (id: string) => FF_PHOTOS[`../../../attached_assets/fastfood/${id}.webp`];

export default function FastFoodCard({ place: base, lang, origin, apartment = 'ibarra' }: { place: FastFoodPlace; lang: Language; origin: string; apartment?: string }) {
  const live = usePlaceInfo(placeQuery(base.name, undefined, base.address), apartment);
  const place = { ...base, phone: base.phone || live?.phone, walkMinutes: live?.walkMinutes ?? base.walkMinutes };
  const ownPhoto = ffPhoto(base.id);
  const L = fastFoodLabels(lang);
  const Icon = KIND_ICON[place.kind];
  const desc = (place.description as Record<string, string | undefined>)[lang] || place.description.en;
  const route = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${encodeURIComponent(`${place.name}, ${place.address}`)}&travelmode=walking`;
  const btn = 'inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-white text-sm font-semibold py-2.5 px-2';

  return (
    <article className="rounded-2xl bg-white border border-border shadow-sm overflow-hidden" data-testid={`fastfood-${place.id}`}>
      {ownPhoto && (
        <img src={ownPhoto} alt={place.name} loading="lazy" className="w-full h-44 object-cover bg-muted" data-testid={`fastfood-photo-${place.id}`} />
      )}
      <div className="p-4 space-y-3">
      <div className="flex items-start gap-3">
        {ownPhoto ? null : live?.photo ? (
          <img src={live.photo} alt={place.name} loading="lazy" className="shrink-0 w-16 h-16 rounded-xl object-cover bg-muted" />
        ) : (
          <span className="shrink-0 w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Icon className="h-6 w-6" />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-base leading-tight">{place.name}</h4>
          {live && <div className="mt-1"><LiveBadges info={live} lang={lang} /></div>}
          <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[11px]">
            <span className="rounded-full bg-muted px-2 py-0.5 font-medium">{L.kinds[place.kind]}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5">
              <Footprints className="h-3 w-3" />≈ {place.walkMinutes} {L.walk}
            </span>
            {place.delivery && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5">
                <Bike className="h-3 w-3" />{L.delivery}
              </span>
            )}
            {place.takeaway && (
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200 px-2 py-0.5">
                <ShoppingBag className="h-3 w-3" />{L.takeaway}
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">{desc}</p>

      <p className="flex items-start gap-1.5 text-sm">
        <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
        <span>{place.address}</span>
      </p>

      {place.menu.length > 0 && (
        <div className="rounded-xl bg-muted/50 p-3">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1.5">{L.order}</p>
          <ul className="space-y-1">
            {place.menu.map((m) => (
              <li key={m.name} className="flex items-baseline justify-between gap-3 text-sm">
                <span>{m.name}</span>
                {m.price && <span className="font-semibold whitespace-nowrap">{m.price}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 [&>*:last-child:nth-child(odd)]:col-span-2">
        {place.phone && (
          <a href={`tel:${place.phone.replace(/\s/g, '')}`} className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold py-2.5 px-2">
            <Phone className="h-4 w-4" />{L.call}
          </a>
        )}
        {place.whatsapp && (
          <a href={`https://wa.me/${place.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-green-600 text-white text-sm font-semibold py-2.5 px-2">
            <MessageCircle className="h-4 w-4" />WhatsApp
          </a>
        )}
        {place.orderUrl && (
          <a href={place.orderUrl} target="_blank" rel="noopener noreferrer" className={place.phone ? btn : 'inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold py-2.5 px-2'}>
            <ShoppingBag className={`h-4 w-4 ${place.phone ? 'text-primary' : ''}`} />{L.order2}
          </a>
        )}
        <a href={route} target="_blank" rel="noopener noreferrer" className={btn}>
          <Navigation className="h-4 w-4 text-primary" />{L.route}
        </a>
        {place.menuUrl && (
          <a href={place.menuUrl} target="_blank" rel="noopener noreferrer" className={btn}>
            <BookOpen className="h-4 w-4 text-primary" />{L.menu}
          </a>
        )}
        {place.website && place.website !== place.menuUrl && place.website !== place.orderUrl && (
          <a href={place.website} target="_blank" rel="noopener noreferrer" className={btn}>
            <Globe className="h-4 w-4 text-primary" />{L.web}
          </a>
        )}
      </div>
      {place.phone && <p className="text-xs text-muted-foreground text-center -mt-1">{place.phone}</p>}
      </div>
    </article>
  );
}
