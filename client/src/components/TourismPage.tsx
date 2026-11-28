import { useState } from 'react';
import PageHeader from './PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, ExternalLink, Navigation, Phone, Coffee, UtensilsCrossed, CupSoda, Moon, Clock, Euro, Landmark, Map as MapIcon, Ticket, Sandwich, BookOpen, Store } from 'lucide-react';
import { Apartment, Language } from '@/lib/i18n';
import { ibarraRestaurants, quevedoRestaurants, restaurantText } from '@/lib/restaurantData';
import { ibarraFastFood, quevedoFastFood } from '@/lib/fastFoodData';
import FastFoodCard, { fastFoodLabels } from './FastFoodCard';
import { TicketsAndWalks, BarrioPanel } from './Extras';
import { BARRIO } from '@/lib/extrasI18n';
import { usePlaceInfo, placeQuery } from '@/lib/usePlaceInfo';
import { LiveBadges, GoogleCredit } from './PlaceLive';
import { visitCategoryIds, visitDetails, Visit } from '@/lib/visitData';
import ibarraImageUrl from '@assets/FotoIbarra_1759702831594.webp';
import quevedoImageUrl from '@assets/FotoQuevedo_1759702831586.webp';
import mapsRecommendationsImage from '@assets/Captura de pantalla 2025-10-12 a las 14.42.30_1760272979443.webp';

// Import stock images for restaurants
import img1 from '@assets/stock_images/traditional_spanish__a8531ed5.webp';
import img2 from '@assets/stock_images/traditional_spanish__70149acc.jpg';
import img3 from '@assets/stock_images/traditional_spanish__f9018bb3.webp';
import img4 from '@assets/stock_images/modern_brunch_cafe_a_e64d5442.jpg';
import img5 from '@assets/stock_images/modern_brunch_cafe_a_2fe8dd51.webp';
import img6 from '@assets/stock_images/modern_brunch_cafe_a_e727f275.jpg';
import img7 from '@assets/stock_images/spanish_tapas_modern_a2f41932.jpg';
import img8 from '@assets/stock_images/spanish_tapas_modern_346e78d7.jpg';
import img9 from '@assets/stock_images/spanish_tapas_modern_fa802452.jpg';
import img10 from '@assets/stock_images/spanish_paella_seafo_53beca91.webp';
import img11 from '@assets/stock_images/spanish_paella_seafo_e3d9edb9.webp';
import img12 from '@assets/stock_images/spanish_paella_seafo_2e59c319.webp';
import img13 from '@assets/stock_images/spanish_traditional__0221f1ec.webp';
import img14 from '@assets/stock_images/spanish_traditional__b4291a21.jpg';
import img15 from '@assets/stock_images/spanish_traditional__5f2425d0.jpg';
import img16 from '@assets/stock_images/elegant_restaurant_f_f15dec49.jpg';
import img17 from '@assets/stock_images/elegant_restaurant_f_5086cc55.jpg';
import img18 from '@assets/stock_images/elegant_restaurant_f_95b165b2.webp';
import img19 from '@assets/stock_images/spanish_traditional__310230e0.jpg';
import img20 from '@assets/stock_images/spanish_traditional__60fd4f05.webp';
import img21 from '@assets/stock_images/seville_spain_touris_9ba3bc69.webp';
import img22 from '@assets/stock_images/seville_spain_citysc_d2607192.webp';
import img23 from '@assets/stock_images/airport_bus_public_t_f8c6b930.jpg';
import img24 from '@assets/stock_images/customer_service_sup_53d26c13.jpg';
import img25 from '@assets/stock_images/hotel_check-in_door__08a6987e.jpg';

// Import visit images
import imgCatedral from '@assets/Catedral de Sevilla y Giralda _1760287285953.jpeg';
import imgAlcazar from '@assets/real_alcazar_sevilla_1760287300284.jpeg';
import imgArchivo from '@assets/archivo_indias_1760287312876.webp';
import imgTorre from '@assets/torre_oro_1760287326895.webp';
import imgMurallas from '@assets/stock_images/murallas_macarena_wa_31870249.webp';
import imgBellasArtes from '@assets/museo_bellas_artes_1760287361564.webp';
import imgCAAC from '@assets/stock_images/caac_monasterio_cart_7595e310.webp';
import imgArqueologico from '@assets/stock_images/museo_arqueologico_s_ca9dc2cb.webp';
import imgCostumbres from '@assets/stock_images/museo_artes_costumbr_024a987c.webp';
import imgFlamencoMuseo from '@assets/museo_baile_flamenco_1760288572604.webp';
import imgNaval from '@assets/stock_images/naval_museum_torre_d_0a944c8c.jpg';
import imgSanJorge from '@assets/stock_images/castillo_san_jorge_s_f02850a8.webp';
import imgMariaLuisa from '@assets/parque_maria_luisa_1760288454408.jpg';
import imgJardinesMurillo from '@assets/stock_images/jardines_murillo_sev_33432d8d.webp';
import imgGuadalquivir from '@assets/stock_images/rio_guadalquivir_sev_f9795354.webp';
import imgCartuja from '@assets/stock_images/isla_cartuja_seville_0755dac0.webp';
import imgSantaCruz from '@assets/stock_images/santa_cruz_neighborh_fd07e9ae.webp';
import imgTriana from '@assets/stock_images/barrio_triana_sevill_22bf8537.webp';
import imgMacarenaBarrio from '@assets/stock_images/barrio_macarena_sevi_9174b44a.webp';
import imgArenal from '@assets/stock_images/barrio_arenal_sevill_430ab21c.webp';
import imgPatios from '@assets/stock_images/seville_traditional__6594b4ce.webp';
import imgRutaFlamenco from '@assets/stock_images/flamenco_performance_cfe2193e.jpg';
import imgRutaRomana from '@assets/stock_images/roman_ruins_ancient__bb6583ed.webp';
import imgRutaArtistas from '@assets/stock_images/seville_artists_cerv_ac44d679.jpg';
import imgTablaos from '@assets/flamenco_tablao_1760287488007.jpg';
import imgTeatros from '@assets/stock_images/teatro_maestranza_se_45f14437.webp';
import imgFestivales from '@assets/stock_images/seville_festivals_fe_023c1b1d.jpg';
import imgExperiencias from '@assets/stock_images/cultural_experiences_24121b88.jpg';
import imgBasilicaMacarena from '@assets/basilica_macarena_1760287523847.webp';
import imgSalvador from '@assets/stock_images/iglesia_salvador_sev_e5e736c6.webp';
import imgSantaPaula from '@assets/stock_images/convento_santa_paula_37a86f4a.webp';
import imgSanLuis from '@assets/stock_images/san_luis_franceses_c_88cd7e2f.webp';
import imgToursPie from '@assets/stock_images/walking_tour_guide_s_95b1b7ca.webp';
import imgToursBici from '@assets/stock_images/bicycle_tour_bike_se_04fd5384.jpg';
import imgCruceros from '@assets/stock_images/guadalquivir_river_c_7fa9aeba.webp';
import imgToursTapas from '@assets/stock_images/tapas_tour_tasting_s_8201f2db.jpg';
import imgToursEspeciales from '@assets/stock_images/special_themed_tours_b434fc10.webp';
import imgSetas from '@assets/stock_images/metropol_parasol_set_8cd25218.webp';
import imgPlazaEspana from '@assets/stock_images/plaza_españa_seville_991d599b.webp';
import imgAlamillo from '@assets/stock_images/puente_alamillo_brid_e7b05fc3.jpg';
import imgEstadios from '@assets/stock_images/ramon_sanchez_pizjua_4adb6587.webp';
import imgMercados from '@assets/stock_images/traditional_spanish__d3ec19eb.webp';
import imgTalleres from '@assets/stock_images/cooking_class_worksh_7e4edbf3.webp';
import imgBodegas from '@assets/stock_images/jerez_wine_cellar_bo_2687fb83.webp';

// Map image filenames to imported images
const imageMap: Record<string, string> = {
  'traditional_spanish__a8531ed5.jpg': img1,
  'traditional_spanish__70149acc.jpg': img2,
  'traditional_spanish__f9018bb3.jpg': img3,
  'modern_brunch_cafe_a_e64d5442.jpg': img4,
  'modern_brunch_cafe_a_2fe8dd51.jpg': img5,
  'modern_brunch_cafe_a_e727f275.jpg': img6,
  'spanish_tapas_modern_a2f41932.jpg': img7,
  'spanish_tapas_modern_346e78d7.jpg': img8,
  'spanish_tapas_modern_fa802452.jpg': img9,
  'spanish_paella_seafo_53beca91.jpg': img10,
  'spanish_paella_seafo_e3d9edb9.jpg': img11,
  'spanish_paella_seafo_2e59c319.jpg': img12,
  'spanish_traditional__0221f1ec.jpg': img13,
  'spanish_traditional__b4291a21.jpg': img14,
  'spanish_traditional__5f2425d0.jpg': img15,
  'elegant_restaurant_f_f15dec49.jpg': img16,
  'elegant_restaurant_f_5086cc55.jpg': img17,
  'elegant_restaurant_f_95b165b2.jpg': img18,
  'spanish_traditional__310230e0.jpg': img19,
  'spanish_traditional__60fd4f05.jpg': img20,
  'seville_spain_touris_9ba3bc69.jpg': img21,
  'seville_spain_citysc_d2607192.jpg': img22,
  'airport_bus_public_t_f8c6b930.jpg': img23,
  'customer_service_sup_53d26c13.jpg': img24,
  'hotel_check-in_door__08a6987e.jpg': img25,
  // Visit images
  'Catedral de Sevilla y Giralda _1760287285953.jpeg': imgCatedral,
  'real_alcazar_sevilla_1760287300284.jpeg': imgAlcazar,
  'archivo_indias_1760287312876.jpg': imgArchivo,
  'torre_oro_1760287326895.webp': imgTorre,
  'murallas_macarena_wa_31870249.jpg': imgMurallas,
  'museo_bellas_artes_1760287361564.jpg': imgBellasArtes,
  'caac_monasterio_cart_7595e310.jpg': imgCAAC,
  'museo_arqueologico_s_ca9dc2cb.jpg': imgArqueologico,
  'museo_artes_costumbr_024a987c.jpg': imgCostumbres,
  'museo_baile_flamenco_1760288572604.jpg': imgFlamencoMuseo,
  'naval_museum_torre_d_0a944c8c.jpg': imgNaval,
  'castillo_san_jorge_s_f02850a8.jpg': imgSanJorge,
  'parque_maria_luisa_1760288454408.jpg': imgMariaLuisa,
  'jardines_murillo_sev_33432d8d.jpg': imgJardinesMurillo,
  'rio_guadalquivir_sev_f9795354.jpg': imgGuadalquivir,
  'isla_cartuja_seville_0755dac0.jpg': imgCartuja,
  'santa_cruz_neighborh_fd07e9ae.jpg': imgSantaCruz,
  'barrio_triana_sevill_22bf8537.jpg': imgTriana,
  'barrio_macarena_sevi_9174b44a.jpg': imgMacarenaBarrio,
  'barrio_arenal_sevill_430ab21c.jpg': imgArenal,
  'seville_traditional__6594b4ce.jpg': imgPatios,
  'flamenco_performance_cfe2193e.jpg': imgRutaFlamenco,
  'roman_ruins_ancient__bb6583ed.jpg': imgRutaRomana,
  'seville_artists_cerv_ac44d679.jpg': imgRutaArtistas,
  'flamenco_tablao_1760287488007.jpg': imgTablaos,
  'teatro_maestranza_se_45f14437.jpg': imgTeatros,
  'seville_festivals_fe_023c1b1d.jpg': imgFestivales,
  'cultural_experiences_24121b88.jpg': imgExperiencias,
  'basilica_macarena_1760287523847.jpg': imgBasilicaMacarena,
  'iglesia_salvador_sev_e5e736c6.jpg': imgSalvador,
  'convento_santa_paula_37a86f4a.jpg': imgSantaPaula,
  'san_luis_franceses_c_88cd7e2f.jpg': imgSanLuis,
  'walking_tour_guide_s_95b1b7ca.jpg': imgToursPie,
  'bicycle_tour_bike_se_04fd5384.jpg': imgToursBici,
  'guadalquivir_river_c_7fa9aeba.jpg': imgCruceros,
  'tapas_tour_tasting_s_8201f2db.jpg': imgToursTapas,
  'special_themed_tours_b434fc10.jpg': imgToursEspeciales,
  'metropol_parasol_set_8cd25218.jpg': imgSetas,
  'plaza_españa_seville_991d599b.jpg': imgPlazaEspana,
  'puente_alamillo_brid_e7b05fc3.jpg': imgAlamillo,
  'ramon_sanchez_pizjua_4adb6587.jpg': imgEstadios,
  'traditional_spanish__d3ec19eb.jpg': imgMercados,
  'cooking_class_worksh_7e4edbf3.jpg': imgTalleres,
  'jerez_wine_cellar_bo_2687fb83.jpg': imgBodegas,
};

// Helper function to get image from photo path
const getImage = (photoPath?: string) => {
  if (!photoPath) return undefined;
  const filename = photoPath.split('/').pop() || '';
  return imageMap[filename];
};

// Helper function to get price indicator
const getPriceIndicator = (priceLevel?: 'low' | 'medium' | 'high') => {
  switch (priceLevel) {
    case 'low':
      return '€';
    case 'medium':
      return '€€';
    case 'high':
      return '€€€';
    default:
      return '';
  }
};

function VisitCard({ visitData, visitInfo, index, categoryId, apartment, lang, t }: { visitData: Visit; visitInfo: any; index: number; categoryId: string; apartment: string; lang: string; t: any }) {
  // Solo lugares concretos (con enlace a Maps); las categorías genéricas no se consultan
  const live = usePlaceInfo(visitData.mapsUrl ? placeQuery(visitInfo.name, visitData.mapsUrl) : undefined, apartment);
  const distance = live?.walkMinutes ?? (apartment === 'ibarra' ? visitData.distanceIbarra : visitData.distanceQuevedo);
  const image = getImage(visitData.photo) || live?.photo;
  const phone = visitData.phone || live?.phone;
  const mapsUrl = live?.mapsUrl || visitData.mapsUrl;
  const website = visitData.website || live?.website;
  return (
    <Card 
        className={`overflow-hidden ${live?.status === 'CLOSED_PERMANENTLY' ? 'opacity-60' : ''}`}
      data-testid={`visit-item-${categoryId}-${index}`}
    >
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row gap-4 p-4">
          {image && (
            <div className="flex-shrink-0 w-full md:w-48">
              <img 
                src={image} 
                alt={visitInfo.name}
                className="w-full h-48 md:h-full object-cover rounded-md"
                data-testid={`img-visit-${categoryId}-${index}`}
              />
            </div>
          )}
          <div className="flex-1 min-w-0 space-y-3">
            <div>
              <h4 className="font-semibold text-lg text-foreground mb-1" data-testid={`text-visit-name-${categoryId}-${index}`}>
                {visitInfo.name}
              </h4>
              {live && <div className="mb-1.5"><LiveBadges info={live} lang={lang} /></div>}
      <p className="text-sm text-muted-foreground">{visitInfo.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {visitData.schedule && (
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">{t.tourism.schedule}:</span>
                    <span className="ml-1">{visitData.schedule}</span>
                  </div>
                </div>
              )}
              {visitData.price && (
                <div className="flex items-start gap-2">
                  <Euro className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">{t.tourism.price}:</span>
                    <span className="ml-1 text-emerald-700 font-semibold">{visitData.price}</span>
                  </div>
                </div>
              )}
              {distance && distance > 0 && (
                <div className="flex items-start gap-2">
                  <Navigation className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">{t.tourism.distance}:</span>
                    <span className="ml-1">{distance} min</span>
                  </div>
                </div>
              )}
              {phone && (
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">{t.tourism.phone}:</span>
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="ml-1 hover:underline">{phone}</a>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 flex-wrap pt-2">
              {mapsUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(mapsUrl, '_blank', 'noopener,noreferrer')}
                  data-testid={`button-map-visit-${categoryId}-${index}`}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {t.tourism.location}
                </Button>
              )}
              {website && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(website, '_blank', 'noopener,noreferrer')}
                  data-testid={`button-website-visit-${categoryId}-${index}`}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Web
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface RestaurantCardProps {
  restaurant: any;
  index: number;
  category: string;
  t: any;
  apartment: string;
  lang: string;
}

const MENU_LABEL: Record<string, string> = {
  es: 'Ver carta', en: 'See menu', fr: 'Voir la carte', de: 'Speisekarte', it: 'Vedi menù', zh: '查看菜单',
};

const RECOMMEND_LABEL: Record<string, string> = {
  es: 'Te recomendamos:',
  en: 'We recommend:',
  fr: 'Nous vous recommandons :',
  de: 'Unsere Empfehlung:',
  it: 'Ti consigliamo:',
  zh: '推荐：',
};

function RestaurantCard({ restaurant, index, category, t, apartment, lang }: RestaurantCardProps) {
  const live = usePlaceInfo(placeQuery(restaurant.name, restaurant.mapsUrl), apartment);
  // Dos fotos: el local y su plato típico. La foto propia (aportada o de Wikimedia) manda; si no hay, la de Google en vivo.
  const local = restaurant.localPhoto ?? (live?.photo ? { src: live.photo, credit: '' } : undefined);
  const dishPhoto: string | undefined = restaurant.photo;
  const phone = live?.phone || restaurant.phone;
  const mapsUrl = live?.mapsUrl || restaurant.mapsUrl;
  const minutes = live?.walkMinutes ?? restaurant.distance;
  const closedForever = live?.status === 'CLOSED_PERMANENTLY';
  const { description, dishes } = restaurantText(restaurant, lang);

  return (
    <Card data-testid={`card-restaurant-${category}-${index}`} className={`overflow-hidden ${closedForever ? 'opacity-60' : ''}`}>
      <div className="flex flex-col sm:flex-row">
        {(local || dishPhoto) && (
          <div className={`w-full h-44 sm:w-40 sm:h-auto flex-shrink-0 grid gap-0.5 ${local && dishPhoto ? 'grid-cols-2 sm:grid-cols-1 sm:grid-rows-2' : ''}`}>
            {local && (
              <div className="relative min-h-0 overflow-hidden">
                <img
                  src={local.src}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = 'none'; }}
                />
                {local.credit && (
                  <span className="absolute bottom-0 left-0 right-0 bg-black/45 text-white text-[9px] leading-tight px-1 py-0.5 truncate">{local.credit}</span>
                )}
              </div>
            )}
            {dishPhoto && (
              <div className="min-h-0 overflow-hidden">
                <img src={dishPhoto} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            )}
          </div>
        )}
        <div className="flex-1 p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-base text-foreground leading-tight">{restaurant.name}</h4>
            <div className="flex flex-col gap-1 items-end flex-shrink-0">
              {restaurant.priceLevel && (
                <span className="text-sm font-semibold text-emerald-700" data-testid={`price-${category}-${index}`}>
                  {getPriceIndicator(restaurant.priceLevel)}
                </span>
              )}
            </div>
          </div>

          <LiveBadges info={live} lang={lang} />

          <p className="text-sm text-muted-foreground">{description}</p>

          {dishes && (
            <p className="text-sm text-emerald-700 font-medium">
              ✨ <span className="font-semibold">{RECOMMEND_LABEL[lang] ?? RECOMMEND_LABEL.en}</span> {dishes}
            </p>
          )}

          <div className="space-y-2 pt-1 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
              <Navigation className="w-4 h-4 flex-shrink-0" />
              <span>{minutes} {t.tourism.distance}</span>
              {live?.address && <span className="truncate">· {live.address}</span>}
              <span className="ml-auto"><GoogleCredit info={live} /></span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(mapsUrl, '_blank')}
                data-testid={`button-map-${category}-${index}`}
              >
                <MapPin className="w-4 h-4 mr-2" />
                {t.tourism.viewMap}
              </Button>
              {restaurant.menuUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(restaurant.menuUrl, '_blank', 'noopener,noreferrer')}
                  data-testid={`button-menu-${category}-${index}`}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  {MENU_LABEL[lang] ?? MENU_LABEL.en}
                </Button>
              )}
              {restaurant.website && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(restaurant.website, '_blank')}
                  data-testid={`button-website-${category}-${index}`}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Web
                </Button>
              )}
              {phone && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`tel:${phone.replace(/\s/g, '')}`, '_self')}
                  data-testid={`button-phone-${category}-${index}`}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {phone}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

interface TourismPageProps {
  onBack: () => void;
  onHome: () => void;
  apartment: Apartment;
  t: any;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function TourismPage({ onBack, onHome, apartment, t, currentLanguage, onLanguageChange }: TourismPageProps) {
  const [activeTab, setActiveTab] = useState('restaurants');

  const restaurants = apartment === 'ibarra' ? ibarraRestaurants : quevedoRestaurants;
  const fastFood = apartment === 'ibarra' ? ibarraFastFood : quevedoFastFood;
  const apartmentCoords = apartment === 'ibarra'
    ? '37.3889,-5.9885'
    : '37.3954,-5.9930';
  const apartmentBgUrl = apartment === 'ibarra' ? ibarraImageUrl : quevedoImageUrl;
  const apartmentName = apartment === 'ibarra' ? 'Capricho de Ibarra' : 'Capricho de Quevedo';

  return (
    <div className="min-h-screen bg-background relative">
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-[0.12] pointer-events-none"
        style={{ backgroundImage: `url(${apartmentBgUrl})` }}
      />
      <div className="hidden sm:flex fixed inset-0 items-center justify-center pointer-events-none opacity-5">
        <p className="text-9xl font-bold text-foreground transform -rotate-45">
          {apartmentName}
        </p>
      </div>
      <PageHeader 
        onBack={onBack} 
        onHome={onHome} 
        title={t.tourism.title}
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
        changeLanguageLabel={t.common.changeLanguage}
        apartment={apartment}
        apartmentLabel={apartment === 'ibarra' ? t.apartment.ibarra : t.apartment.quevedo}
      />

      <div className="relative z-10 max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-2 sm:flex gap-1.5 sm:gap-2 p-1.5 bg-white/90 border border-border shadow-sm rounded-xl">
          <Button
            variant={activeTab === 'restaurants' ? 'default' : 'ghost'}
            className="w-full sm:flex-1 h-auto min-h-[4.5rem] sm:min-h-12 flex-col sm:flex-row gap-1.5 sm:gap-2 py-2.5 px-1 text-xs sm:text-sm whitespace-normal leading-tight text-center justify-center rounded-lg"
            onClick={() => setActiveTab('restaurants')}
            data-testid="tab-restaurants"
          >
            <UtensilsCrossed className="!w-8 !h-8 sm:!w-6 sm:!h-6 shrink-0" />
            {t.tourism.restaurants}
          </Button>
          <Button
            variant={activeTab === 'visits' ? 'default' : 'ghost'}
            className="w-full sm:flex-1 h-auto min-h-[4.5rem] sm:min-h-12 flex-col sm:flex-row gap-1.5 sm:gap-2 py-2.5 px-1 text-xs sm:text-sm whitespace-normal leading-tight text-center justify-center rounded-lg"
            onClick={() => setActiveTab('visits')}
            data-testid="tab-visits"
          >
            <Landmark className="!w-8 !h-8 sm:!w-6 sm:!h-6 shrink-0" />
            {t.tourism.visits}
          </Button>
          <Button
            variant={activeTab === 'barrio' ? 'default' : 'ghost'}
            className="w-full sm:flex-1 h-auto min-h-[4.5rem] sm:min-h-12 flex-col sm:flex-row gap-1.5 sm:gap-2 py-2.5 px-1 text-xs sm:text-sm whitespace-normal leading-tight text-center justify-center rounded-lg"
            onClick={() => setActiveTab('barrio')}
            data-testid="tab-barrio"
          >
            <Store className="!w-8 !h-8 sm:!w-6 sm:!h-6 shrink-0" />
            {(BARRIO[currentLanguage] || BARRIO.en).tab}
          </Button>
          <Button
            variant={activeTab === 'activities' ? 'default' : 'ghost'}
            className="w-full sm:flex-1 h-auto min-h-[4.5rem] sm:min-h-12 flex-col sm:flex-row gap-1.5 sm:gap-2 py-2.5 px-1 text-xs sm:text-sm whitespace-normal leading-tight text-center justify-center rounded-lg"
            onClick={() => setActiveTab('activities')}
            data-testid="tab-activities"
          >
            <Ticket className="!w-8 !h-8 sm:!w-6 sm:!h-6 shrink-0" />
            {t.tourism.activities}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <div className="hidden">
            <TabsList>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="barrio">Barrio</TabsTrigger>
              <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
              <TabsTrigger value="visits">Visits</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="activities" className="mt-6">
            <Card>
              <CardContent className="p-0">
                <div className="w-full">
                  <iframe
                    className="w-full rounded-lg"
                    frameBorder="0"
                    scrolling="yes"
                    src={`https://www.civitatis.com/widget-activities/?agencyId=40972&agencyUserId=44118&display=cosy&cant=6&lang=${currentLanguage === 'zh' ? 'en' : currentLanguage}&currency=EUR&destination=57&transfer=0&cmp=Widget_Sevilla_ES&width=100%&height=700px&hideButton=0&centerContent=1&typeSelection=all&color=325bdf&typography=Montserrat&removeBackground=1&showShadow=1&roundedButtons=1`}
                    loading="lazy"
                    title="Civitatis"
                    style={{ minHeight: '700px', maxWidth: '100%', height: '700px' }}
                    data-testid="iframe-civitatis"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="barrio" className="mt-4">
            <BarrioPanel apartment={apartment} lang={currentLanguage} />
          </TabsContent>

          <TabsContent value="restaurants" className="mt-4 space-y-4">

            <Accordion type="multiple" className="space-y-4">
              {/* Desayunos */}
              <AccordionItem value="breakfast" className="border rounded-xl px-4 sm:px-6 bg-card shadow-sm">
                <AccordionTrigger className="hover:no-underline" data-testid="accordion-breakfast">
                  <div className="flex items-center gap-2">
                    <Coffee className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">{t.tourism.breakfast}</h3>
                    <Badge variant="secondary">{restaurants.filter(r => r.category === 'breakfast').length}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  {restaurants.filter(r => r.category === 'breakfast').map((restaurant, index) => (
                    <RestaurantCard key={`breakfast-${index}`} restaurant={restaurant} index={index} category="breakfast" t={t} apartment={apartment} lang={currentLanguage} />
                  ))}
                </AccordionContent>
              </AccordionItem>

              {/* Almuerzos / Comidas */}
              <AccordionItem value="lunch" className="border rounded-xl px-4 sm:px-6 bg-card shadow-sm">
                <AccordionTrigger className="hover:no-underline" data-testid="accordion-lunch">
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">{t.tourism.lunch}</h3>
                    <Badge variant="secondary">{restaurants.filter(r => r.category === 'lunch').length}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  {restaurants.filter(r => r.category === 'lunch').map((restaurant, index) => (
                    <RestaurantCard key={`lunch-${index}`} restaurant={restaurant} index={index} category="lunch" t={t} apartment={apartment} lang={currentLanguage} />
                  ))}
                </AccordionContent>
              </AccordionItem>

              {/* Cafeterías */}
              <AccordionItem value="cafeterias" className="border rounded-xl px-4 sm:px-6 bg-card shadow-sm">
                <AccordionTrigger className="hover:no-underline" data-testid="accordion-cafeterias">
                  <div className="flex items-center gap-2">
                    <CupSoda className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">{t.tourism.cafeterias}</h3>
                    <Badge variant="secondary">{restaurants.filter(r => r.category === 'cafeterias').length}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  {restaurants.filter(r => r.category === 'cafeterias').map((restaurant, index) => (
                    <RestaurantCard key={`cafes-${index}`} restaurant={restaurant} index={index} category="cafes" t={t} apartment={apartment} lang={currentLanguage} />
                  ))}
                </AccordionContent>
              </AccordionItem>

              {/* Cenas */}
              <AccordionItem value="dinner" className="border rounded-xl px-4 sm:px-6 bg-card shadow-sm">
                <AccordionTrigger className="hover:no-underline" data-testid="accordion-dinner">
                  <div className="flex items-center gap-2">
                    <Moon className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">{t.tourism.dinner}</h3>
                    <Badge variant="secondary">{restaurants.filter(r => r.category === 'dinner').length}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  {restaurants.filter(r => r.category === 'dinner').map((restaurant, index) => (
                    <RestaurantCard key={`dinner-${index}`} restaurant={restaurant} index={index} category="dinner" t={t} apartment={apartment} lang={currentLanguage} />
                  ))}
                </AccordionContent>
              </AccordionItem>

              {/* Comida rápida cerca del apartamento */}
              <AccordionItem value="fastfood" className="border rounded-xl px-4 sm:px-6 bg-card shadow-sm">
                <AccordionTrigger className="hover:no-underline" data-testid="accordion-fastfood">
                  <div className="flex items-center gap-2">
                    <Sandwich className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">{t.tourism.fastFood}</h3>
                    <Badge variant="secondary">{fastFood.length}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground">{fastFoodLabels(currentLanguage).intro}</p>
                  {fastFood.map((place) => (
                    <FastFoodCard key={place.id} place={place} lang={currentLanguage} origin={apartmentCoords} apartment={apartment} />
                  ))}
                  <p className="text-[11px] text-muted-foreground text-center">{fastFoodLabels(currentLanguage).prices}</p>
                </AccordionContent>
              </AccordionItem>

              {/* Más recomendaciones (mapa de Google con nuestros favoritos) */}
              <AccordionItem value="more" className="border rounded-xl px-4 sm:px-6 bg-card shadow-sm">
                <AccordionTrigger className="hover:no-underline" data-testid="accordion-more">
                  <div className="flex items-center gap-2">
                    <MapIcon className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">{t.tourism.map}</h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="space-y-4">
                  <img 
                    src={mapsRecommendationsImage} 
                    alt="Mapa de recomendaciones"
                    className="w-full rounded-lg shadow-lg"
                    data-testid="img-recommendations-map"
                  />
                  <Button
                    className="w-full"
                    onClick={() => window.open('https://maps.app.goo.gl/vLTVmja9G4RWvX1i8', '_blank', 'noopener,noreferrer')}
                    data-testid="button-experience-recommendations"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    {t.tourism.experienceRecommendations}
                  </Button>
                </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="visits" className="mt-4 space-y-4">
            <TicketsAndWalks apartment={apartment} lang={currentLanguage} />
            <Accordion type="multiple" className="space-y-4">
              {visitCategoryIds.map((categoryId) => {
                const visitsInCategory = visitDetails.filter(v => v.category === categoryId);
                
                return (
                  <AccordionItem key={categoryId} value={categoryId} className="border rounded-xl px-4 sm:px-6 bg-card shadow-sm">
                    <AccordionTrigger className="hover:no-underline" data-testid={`accordion-visit-${categoryId}`}>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {t.tourism.visitCategories[categoryId]}
                        </h3>
                        <Badge variant="secondary">{visitsInCategory.length}</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-4">
                      {visitsInCategory.map((visitData, index) => {
                        const visitInfo = t.tourism.visitItems[visitData.id];
                        if (!visitInfo) return null;
                        return (
                          <VisitCard key={visitData.id} visitData={visitData} visitInfo={visitInfo} index={index} categoryId={categoryId} apartment={apartment} lang={currentLanguage} t={t} />
                        );
                      })}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
