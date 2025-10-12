import { useState } from 'react';
import PageHeader from './PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, ExternalLink, Navigation, Phone, Coffee, UtensilsCrossed, CupSoda, Moon, Clock, Euro } from 'lucide-react';
import { Apartment, Language } from '@/lib/i18n';
import { ibarraRestaurants, quevedoRestaurants } from '@/lib/restaurantData';
import { visitCategoryIds, visitDetails, Visit } from '@/lib/visitData';
import ibarraImageUrl from '@assets/FotoIbarra_1759702831594.webp';
import quevedoImageUrl from '@assets/FotoQuevedo_1759702831586.webp';
import mapsRecommendationsImage from '@assets/Captura de pantalla 2025-10-12 a las 14.42.30_1760272979443.png';

// Import stock images for restaurants
import img1 from '@assets/stock_images/traditional_spanish__a8531ed5.jpg';
import img2 from '@assets/stock_images/traditional_spanish__70149acc.jpg';
import img3 from '@assets/stock_images/traditional_spanish__f9018bb3.jpg';
import img4 from '@assets/stock_images/modern_brunch_cafe_a_e64d5442.jpg';
import img5 from '@assets/stock_images/modern_brunch_cafe_a_2fe8dd51.jpg';
import img6 from '@assets/stock_images/modern_brunch_cafe_a_e727f275.jpg';
import img7 from '@assets/stock_images/spanish_tapas_modern_a2f41932.jpg';
import img8 from '@assets/stock_images/spanish_tapas_modern_346e78d7.jpg';
import img9 from '@assets/stock_images/spanish_tapas_modern_fa802452.jpg';
import img10 from '@assets/stock_images/spanish_paella_seafo_53beca91.jpg';
import img11 from '@assets/stock_images/spanish_paella_seafo_e3d9edb9.jpg';
import img12 from '@assets/stock_images/spanish_paella_seafo_2e59c319.jpg';
import img13 from '@assets/stock_images/spanish_traditional__0221f1ec.jpg';
import img14 from '@assets/stock_images/spanish_traditional__b4291a21.jpg';
import img15 from '@assets/stock_images/spanish_traditional__5f2425d0.jpg';
import img16 from '@assets/stock_images/elegant_restaurant_f_f15dec49.jpg';
import img17 from '@assets/stock_images/elegant_restaurant_f_5086cc55.jpg';
import img18 from '@assets/stock_images/elegant_restaurant_f_95b165b2.jpg';
import img19 from '@assets/stock_images/spanish_traditional__310230e0.jpg';
import img20 from '@assets/stock_images/spanish_traditional__60fd4f05.jpg';
import img21 from '@assets/stock_images/seville_spain_touris_9ba3bc69.jpg';
import img22 from '@assets/stock_images/seville_spain_citysc_d2607192.jpg';
import img23 from '@assets/stock_images/airport_bus_public_t_f8c6b930.jpg';
import img24 from '@assets/stock_images/customer_service_sup_53d26c13.jpg';
import img25 from '@assets/stock_images/hotel_check-in_door__08a6987e.jpg';

// Import visit images
import imgCatedral from '@assets/stock_images/seville_cathedral_gi_af05f5f8.jpg';
import imgAlcazar from '@assets/stock_images/real_alcazar_seville_2ba22877.jpg';
import imgArchivo from '@assets/stock_images/archivo_general_de_i_b6f773b7.jpg';
import imgTorre from '@assets/stock_images/torre_del_oro_golden_b85ce120.jpg';
import imgMurallas from '@assets/stock_images/murallas_macarena_wa_31870249.jpg';
import imgBellasArtes from '@assets/stock_images/museo_bellas_artes_s_e858bbb3.jpg';
import imgCAAC from '@assets/stock_images/caac_monasterio_cart_7595e310.jpg';
import imgArqueologico from '@assets/stock_images/museo_arqueologico_s_ca9dc2cb.jpg';
import imgCostumbres from '@assets/stock_images/museo_artes_costumbr_024a987c.jpg';
import imgFlamencoMuseo from '@assets/stock_images/museo_baile_flamenco_a3281216.jpg';
import imgNaval from '@assets/stock_images/naval_museum_torre_d_0a944c8c.jpg';
import imgSanJorge from '@assets/stock_images/castillo_san_jorge_s_f02850a8.jpg';
import imgMariaLuisa from '@assets/stock_images/parque_maria_luisa_s_a5d78d89.jpg';
import imgJardinesMurillo from '@assets/stock_images/jardines_murillo_sev_33432d8d.jpg';
import imgGuadalquivir from '@assets/stock_images/rio_guadalquivir_sev_f9795354.jpg';
import imgCartuja from '@assets/stock_images/isla_cartuja_seville_0755dac0.jpg';
import imgSantaCruz from '@assets/stock_images/barrio_santa_cruz_se_31c1be3b.jpg';
import imgTriana from '@assets/stock_images/barrio_triana_sevill_22bf8537.jpg';
import imgMacarenaBarrio from '@assets/stock_images/barrio_macarena_sevi_9174b44a.jpg';
import imgArenal from '@assets/stock_images/barrio_arenal_sevill_430ab21c.jpg';
import imgPatios from '@assets/stock_images/seville_traditional__6594b4ce.jpg';
import imgRutaFlamenco from '@assets/stock_images/flamenco_performance_cfe2193e.jpg';
import imgRutaRomana from '@assets/stock_images/roman_ruins_ancient__bb6583ed.jpg';
import imgRutaArtistas from '@assets/stock_images/seville_artists_cerv_ac44d679.jpg';
import imgTablaos from '@assets/stock_images/flamenco_tablao_show_e674e1c1.jpg';
import imgTeatros from '@assets/stock_images/teatro_maestranza_se_45f14437.jpg';
import imgFestivales from '@assets/stock_images/seville_festivals_fe_023c1b1d.jpg';
import imgExperiencias from '@assets/stock_images/cultural_experiences_24121b88.jpg';
import imgBasilicaMacarena from '@assets/stock_images/basílica_macarena_se_42e6f2c2.jpg';
import imgSalvador from '@assets/stock_images/iglesia_salvador_sev_e5e736c6.jpg';
import imgSantaPaula from '@assets/stock_images/convento_santa_paula_37a86f4a.jpg';
import imgSanLuis from '@assets/stock_images/san_luis_franceses_c_88cd7e2f.jpg';
import imgToursPie from '@assets/stock_images/walking_tour_guide_s_95b1b7ca.jpg';
import imgToursBici from '@assets/stock_images/bicycle_tour_bike_se_04fd5384.jpg';
import imgCruceros from '@assets/stock_images/guadalquivir_river_c_7fa9aeba.jpg';
import imgToursTapas from '@assets/stock_images/tapas_tour_tasting_s_8201f2db.jpg';
import imgToursEspeciales from '@assets/stock_images/special_themed_tours_b434fc10.jpg';
import imgSetas from '@assets/stock_images/metropol_parasol_set_8cd25218.jpg';
import imgPlazaEspana from '@assets/stock_images/plaza_españa_seville_991d599b.jpg';
import imgAlamillo from '@assets/stock_images/puente_alamillo_brid_e7b05fc3.jpg';
import imgEstadios from '@assets/stock_images/ramon_sanchez_pizjua_4adb6587.jpg';
import imgMercados from '@assets/stock_images/mercado_triana_sevil_b65051c9.jpg';
import imgTalleres from '@assets/stock_images/cooking_class_worksh_7e4edbf3.jpg';
import imgBodegas from '@assets/stock_images/jerez_wine_cellar_bo_2687fb83.jpg';

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
  'seville_cathedral_gi_af05f5f8.jpg': imgCatedral,
  'real_alcazar_seville_2ba22877.jpg': imgAlcazar,
  'archivo_general_de_i_b6f773b7.jpg': imgArchivo,
  'torre_del_oro_golden_b85ce120.jpg': imgTorre,
  'murallas_macarena_wa_31870249.jpg': imgMurallas,
  'museo_bellas_artes_s_e858bbb3.jpg': imgBellasArtes,
  'caac_monasterio_cart_7595e310.jpg': imgCAAC,
  'museo_arqueologico_s_ca9dc2cb.jpg': imgArqueologico,
  'museo_artes_costumbr_024a987c.jpg': imgCostumbres,
  'museo_baile_flamenco_a3281216.jpg': imgFlamencoMuseo,
  'naval_museum_torre_d_0a944c8c.jpg': imgNaval,
  'castillo_san_jorge_s_f02850a8.jpg': imgSanJorge,
  'parque_maria_luisa_s_a5d78d89.jpg': imgMariaLuisa,
  'jardines_murillo_sev_33432d8d.jpg': imgJardinesMurillo,
  'rio_guadalquivir_sev_f9795354.jpg': imgGuadalquivir,
  'isla_cartuja_seville_0755dac0.jpg': imgCartuja,
  'barrio_santa_cruz_se_31c1be3b.jpg': imgSantaCruz,
  'barrio_triana_sevill_22bf8537.jpg': imgTriana,
  'barrio_macarena_sevi_9174b44a.jpg': imgMacarenaBarrio,
  'barrio_arenal_sevill_430ab21c.jpg': imgArenal,
  'seville_traditional__6594b4ce.jpg': imgPatios,
  'flamenco_performance_cfe2193e.jpg': imgRutaFlamenco,
  'roman_ruins_ancient__bb6583ed.jpg': imgRutaRomana,
  'seville_artists_cerv_ac44d679.jpg': imgRutaArtistas,
  'flamenco_tablao_show_e674e1c1.jpg': imgTablaos,
  'teatro_maestranza_se_45f14437.jpg': imgTeatros,
  'seville_festivals_fe_023c1b1d.jpg': imgFestivales,
  'cultural_experiences_24121b88.jpg': imgExperiencias,
  'basílica_macarena_se_42e6f2c2.jpg': imgBasilicaMacarena,
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
  'mercado_triana_sevil_b65051c9.jpg': imgMercados,
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

interface TourismPageProps {
  onBack: () => void;
  onHome: () => void;
  apartment: Apartment;
  t: any;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function TourismPage({ onBack, onHome, apartment, t, currentLanguage, onLanguageChange }: TourismPageProps) {
  const [activeTab, setActiveTab] = useState('activities');

  const restaurants = apartment === 'ibarra' ? ibarraRestaurants : quevedoRestaurants;
  const apartmentCoords = apartment === 'ibarra'
    ? '37.3878,-5.9932'
    : '37.3897,-5.9942';
  const apartmentBgUrl = apartment === 'ibarra' ? ibarraImageUrl : quevedoImageUrl;
  const apartmentName = apartment === 'ibarra' ? 'Capricho de Ibarra' : 'Capricho de Quevedo';

  return (
    <div className="min-h-screen bg-background relative">
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none"
        style={{ backgroundImage: `url(${apartmentBgUrl})` }}
      />
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-5">
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
        <div className="flex flex-col sm:flex-row gap-2 p-1 bg-muted rounded-md">
          <Button
            variant={activeTab === 'activities' ? 'default' : 'ghost'}
            className="w-full sm:flex-1 justify-center"
            onClick={() => setActiveTab('activities')}
            data-testid="tab-activities"
          >
            {t.tourism.activities}
          </Button>
          <Button
            variant={activeTab === 'map' ? 'default' : 'ghost'}
            className="w-full sm:flex-1 justify-center"
            onClick={() => setActiveTab('map')}
            data-testid="tab-map"
          >
            {t.tourism.map}
          </Button>
          <Button
            variant={activeTab === 'restaurants' ? 'default' : 'ghost'}
            className="w-full sm:flex-1 justify-center"
            onClick={() => setActiveTab('restaurants')}
            data-testid="tab-restaurants"
          >
            {t.tourism.restaurants}
          </Button>
          <Button
            variant={activeTab === 'visits' ? 'default' : 'ghost'}
            className="w-full sm:flex-1 justify-center"
            onClick={() => setActiveTab('visits')}
            data-testid="tab-visits"
          >
            {t.tourism.visits}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <div className="hidden">
            <TabsList>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="map">Map</TabsTrigger>
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
                    src="https://www.civitatis.com/widget-activities/?agencyId=40972&agencyUserId=44118&display=cosy&cant=6&lang=es&currency=EUR&destination=57&transfer=0&cmp=Widget_Sevilla_ES&width=100%&height=700px&hideButton=0&centerContent=1&typeSelection=all&color=325bdf&typography=Montserrat&removeBackground=1&showShadow=1&roundedButtons=1"
                    style={{ minHeight: '700px', maxWidth: '100%', height: '700px' }}
                    data-testid="iframe-civitatis"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="mt-6">
            <Card>
              <CardContent className="p-6">
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="restaurants" className="mt-6 space-y-6">
            <p className="text-muted-foreground text-center mb-6">
              {t.tourism.restaurantsIntro}
            </p>

            <Accordion type="multiple" className="space-y-4">
              {/* Desayunos */}
              <AccordionItem value="breakfast" className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline" data-testid="accordion-breakfast">
                  <div className="flex items-center gap-2">
                    <Coffee className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">{t.tourism.breakfast}</h3>
                    <Badge variant="secondary">{restaurants.filter(r => r.category === 'breakfast').length}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  {restaurants.filter(r => r.category === 'breakfast').map((restaurant, index) => {
                    const imageUrl = getImage(restaurant.photo);
                    const dishes = restaurant.dishesKey ? t.tourism.recommendedDishes[restaurant.dishesKey] : undefined;
                    
                    return (
                    <Card key={`breakfast-${index}`} data-testid={`card-restaurant-breakfast-${index}`} className="flex flex-row overflow-hidden">
                      {imageUrl && (
                        <div className="w-32 h-32 flex-shrink-0">
                          <img 
                            src={imageUrl} 
                            alt={restaurant.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {restaurant.description}
                            </CardDescription>
                            {dishes && (
                              <p className="mt-2 text-sm text-emerald-700 font-medium">
                                ✨ {dishes}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-2 items-end flex-shrink-0">
                            <Badge variant="secondary">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              {restaurant.rating}
                            </Badge>
                            {restaurant.priceLevel && (
                              <span className="text-sm font-semibold text-emerald-700" data-testid={`price-breakfast-${index}`}>
                                {getPriceIndicator(restaurant.priceLevel)}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Navigation className="w-4 h-4" />
                          <span>{restaurant.distance} {t.tourism.distance}</span>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(restaurant.mapsUrl, '_blank')}
                            data-testid={`button-map-breakfast-${index}`}
                          >
                            <MapPin className="w-4 h-4 mr-2" />
                            {t.tourism.viewMap}
                          </Button>
                          {restaurant.website && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(restaurant.website, '_blank')}
                              data-testid={`button-website-breakfast-${index}`}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Web
                            </Button>
                          )}
                          {restaurant.phone && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(`tel:${restaurant.phone}`, '_self')}
                              data-testid={`button-phone-breakfast-${index}`}
                            >
                              <Phone className="w-4 h-4 mr-2" />
                              {restaurant.phone}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>

              {/* Almuerzos / Comidas */}
              <AccordionItem value="lunch" className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline" data-testid="accordion-lunch">
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">{t.tourism.lunch}</h3>
                    <Badge variant="secondary">{restaurants.filter(r => r.category === 'lunch').length}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  {restaurants.filter(r => r.category === 'lunch').map((restaurant, index) => {
                    const imageUrl = getImage(restaurant.photo);
                    const dishes = restaurant.dishesKey ? t.tourism.recommendedDishes[restaurant.dishesKey] : undefined;
                    
                    return (
                    <Card key={`lunch-${index}`} data-testid={`card-restaurant-lunch-${index}`} className="flex flex-row overflow-hidden">
                      {imageUrl && (
                        <div className="w-32 h-32 flex-shrink-0">
                          <img 
                            src={imageUrl} 
                            alt={restaurant.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {restaurant.description}
                            </CardDescription>
                            {dishes && (
                              <p className="mt-2 text-sm text-emerald-700 font-medium">
                                ✨ {dishes}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-2 items-end flex-shrink-0">
                            <Badge variant="secondary">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              {restaurant.rating}
                            </Badge>
                            {restaurant.priceLevel && (
                              <span className="text-sm font-semibold text-emerald-700" data-testid={`price-lunch-${index}`}>
                                {getPriceIndicator(restaurant.priceLevel)}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Navigation className="w-4 h-4" />
                          <span>{restaurant.distance} {t.tourism.distance}</span>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(restaurant.mapsUrl, '_blank')}
                            data-testid={`button-map-lunch-${index}`}
                          >
                            <MapPin className="w-4 h-4 mr-2" />
                            {t.tourism.viewMap}
                          </Button>
                          {restaurant.website && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(restaurant.website, '_blank')}
                              data-testid={`button-website-lunch-${index}`}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Web
                            </Button>
                          )}
                          {restaurant.phone && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(`tel:${restaurant.phone}`, '_self')}
                              data-testid={`button-phone-lunch-${index}`}
                            >
                              <Phone className="w-4 h-4 mr-2" />
                              {restaurant.phone}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>

              {/* Cafeterías */}
              <AccordionItem value="cafeterias" className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline" data-testid="accordion-cafeterias">
                  <div className="flex items-center gap-2">
                    <CupSoda className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">{t.tourism.cafeterias}</h3>
                    <Badge variant="secondary">{restaurants.filter(r => r.category === 'cafeterias').length}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  {restaurants.filter(r => r.category === 'cafeterias').map((restaurant, index) => {
                    const imageUrl = getImage(restaurant.photo);
                    const dishes = restaurant.dishesKey ? t.tourism.recommendedDishes[restaurant.dishesKey] : undefined;
                    
                    return (
                    <Card key={`cafes-${index}`} data-testid={`card-restaurant-cafes-${index}`} className="flex flex-row overflow-hidden">
                      {imageUrl && (
                        <div className="w-32 h-32 flex-shrink-0">
                          <img 
                            src={imageUrl} 
                            alt={restaurant.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {restaurant.description}
                            </CardDescription>
                            {dishes && (
                              <p className="mt-2 text-sm text-emerald-700 font-medium">
                                ✨ {dishes}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-2 items-end flex-shrink-0">
                            <Badge variant="secondary">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              {restaurant.rating}
                            </Badge>
                            {restaurant.priceLevel && (
                              <span className="text-sm font-semibold text-emerald-700" data-testid={`price-cafes-${index}`}>
                                {getPriceIndicator(restaurant.priceLevel)}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Navigation className="w-4 h-4" />
                          <span>{restaurant.distance} {t.tourism.distance}</span>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(restaurant.mapsUrl, '_blank')}
                            data-testid={`button-map-cafes-${index}`}
                          >
                            <MapPin className="w-4 h-4 mr-2" />
                            {t.tourism.viewMap}
                          </Button>
                          {restaurant.website && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(restaurant.website, '_blank')}
                              data-testid={`button-website-cafes-${index}`}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Web
                            </Button>
                          )}
                          {restaurant.phone && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(`tel:${restaurant.phone}`, '_self')}
                              data-testid={`button-phone-cafes-${index}`}
                            >
                              <Phone className="w-4 h-4 mr-2" />
                              {restaurant.phone}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>

              {/* Cenas */}
              <AccordionItem value="dinner" className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline" data-testid="accordion-dinner">
                  <div className="flex items-center gap-2">
                    <Moon className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">{t.tourism.dinner}</h3>
                    <Badge variant="secondary">{restaurants.filter(r => r.category === 'dinner').length}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  {restaurants.filter(r => r.category === 'dinner').map((restaurant, index) => {
                    const imageUrl = getImage(restaurant.photo);
                    const dishes = restaurant.dishesKey ? t.tourism.recommendedDishes[restaurant.dishesKey] : undefined;
                    
                    return (
                    <Card key={`dinner-${index}`} data-testid={`card-restaurant-dinner-${index}`} className="flex flex-row overflow-hidden">
                      {imageUrl && (
                        <div className="w-32 h-32 flex-shrink-0">
                          <img 
                            src={imageUrl} 
                            alt={restaurant.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {restaurant.description}
                            </CardDescription>
                            {dishes && (
                              <p className="mt-2 text-sm text-emerald-700 font-medium">
                                ✨ {dishes}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-2 items-end flex-shrink-0">
                            <Badge variant="secondary">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              {restaurant.rating}
                            </Badge>
                            {restaurant.priceLevel && (
                              <span className="text-sm font-semibold text-emerald-700" data-testid={`price-dinner-${index}`}>
                                {getPriceIndicator(restaurant.priceLevel)}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Navigation className="w-4 h-4" />
                          <span>{restaurant.distance} {t.tourism.distance}</span>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(restaurant.mapsUrl, '_blank')}
                            data-testid={`button-map-dinner-${index}`}
                          >
                            <MapPin className="w-4 h-4 mr-2" />
                            {t.tourism.viewMap}
                          </Button>
                          {restaurant.website && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(restaurant.website, '_blank')}
                              data-testid={`button-website-dinner-${index}`}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Web
                            </Button>
                          )}
                          {restaurant.phone && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(`tel:${restaurant.phone}`, '_self')}
                              data-testid={`button-phone-dinner-${index}`}
                            >
                              <Phone className="w-4 h-4 mr-2" />
                              {restaurant.phone}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="visits" className="mt-6">
            <Accordion type="multiple" className="space-y-4">
              {visitCategoryIds.map((categoryId) => {
                const visitsInCategory = visitDetails.filter(v => v.category === categoryId);
                
                return (
                  <AccordionItem key={categoryId} value={categoryId} className="border rounded-lg px-6">
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
                        
                        const distance = apartment === 'ibarra' ? visitData.distanceIbarra : visitData.distanceQuevedo;
                        const image = getImage(visitData.photo);
                        
                        return (
                          <Card 
                            key={visitData.id}
                            className="overflow-hidden"
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
                                    {visitData.phone && (
                                      <div className="flex items-start gap-2">
                                        <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                        <div>
                                          <span className="font-medium">{t.tourism.phone}:</span>
                                          <a href={`tel:${visitData.phone}`} className="ml-1 hover:underline">{visitData.phone}</a>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="flex gap-2 flex-wrap pt-2">
                                    {visitData.mapsUrl && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => window.open(visitData.mapsUrl, '_blank', 'noopener,noreferrer')}
                                        data-testid={`button-map-visit-${categoryId}-${index}`}
                                      >
                                        <MapPin className="w-4 h-4 mr-2" />
                                        {t.tourism.location}
                                      </Button>
                                    )}
                                    {visitData.website && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => window.open(visitData.website, '_blank', 'noopener,noreferrer')}
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
