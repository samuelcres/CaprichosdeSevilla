import { useState } from 'react';
import PageHeader from './PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, ExternalLink, Navigation } from 'lucide-react';
import { Apartment } from '@/lib/i18n';
import { ibarraRestaurants, quevedoRestaurants } from '@/lib/restaurantData';
import { visitCategoryIds, visitDetails, Visit } from '@/lib/visitData';
import sevilleBgUrl from '@assets/plaza-espana-bg.png';

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
}

export default function TourismPage({ onBack, onHome, apartment, t }: TourismPageProps) {
  const [activeTab, setActiveTab] = useState('activities');

  const restaurants = apartment === 'ibarra' ? ibarraRestaurants : quevedoRestaurants;
  const apartmentCoords = apartment === 'ibarra'
    ? '37.3878,-5.9932'
    : '37.3897,-5.9942';

  return (
    <div className="min-h-screen bg-background relative">
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none"
        style={{ backgroundImage: `url(${sevilleBgUrl})` }}
      />
      <PageHeader onBack={onBack} onHome={onHome} title={t.tourism.title} />

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
              <CardContent className="p-0">
                <div className="aspect-video w-full rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0, minHeight: '500px' }}
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${apartmentCoords}&zoom=15`}
                    allowFullScreen
                    data-testid="iframe-google-maps"
                  />
                </div>
              </CardContent>
            </Card>
            <p className="text-sm text-muted-foreground text-center mt-4">
              {t.tourism.map}
            </p>
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
                    <h3 className="text-xl font-semibold text-foreground">{t.tourism.cafes}</h3>
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
                const items = t.tourism.visitItems[categoryId];
                
                return (
                  <AccordionItem key={categoryId} value={categoryId} className="border rounded-lg px-6">
                    <AccordionTrigger className="hover:no-underline" data-testid={`accordion-visit-${categoryId}`}>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {t.tourism.visitCategories[categoryId]}
                        </h3>
                        <Badge variant="secondary">{items.length}</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-4">
                      {visitDetails.filter(v => v.category === categoryId).map((visitData, index) => {
                        const item = items[index];
                        if (!item) return null;
                        
                        const distance = apartment === 'ibarra' ? visitData.distanceIbarra : visitData.distanceQuevedo;
                        const image = getImage(visitData.photo);
                        
                        return (
                          <Card 
                            key={visitData.id}
                            className="overflow-hidden"
                            data-testid={`visit-item-${categoryId}-${index}`}
                          >
                            <CardContent className="p-0">
                              <div className="flex gap-4 p-4">
                                {image && (
                                  <div className="flex-shrink-0">
                                    <img 
                                      src={image} 
                                      alt={item.name}
                                      className="w-32 h-32 object-cover rounded-md"
                                      data-testid={`img-visit-${categoryId}-${index}`}
                                    />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-foreground mb-1" data-testid={`text-visit-name-${categoryId}-${index}`}>
                                    {item.name}
                                  </h4>
                                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                                  
                                  {(visitData.schedule || visitData.price || distance) && (
                                    <div className="flex flex-wrap gap-2 text-sm mb-3">
                                      {visitData.schedule && (
                                        <Badge variant="outline" className="text-xs" data-testid={`badge-schedule-${categoryId}-${index}`}>
                                          {visitData.schedule}
                                        </Badge>
                                      )}
                                      {visitData.price && (
                                        <Badge variant="outline" className="text-xs text-emerald-700" data-testid={`badge-price-${categoryId}-${index}`}>
                                          {visitData.price}
                                        </Badge>
                                      )}
                                      {distance && distance > 0 && (
                                        <Badge variant="outline" className="text-xs" data-testid={`badge-distance-${categoryId}-${index}`}>
                                          {distance} {t.tourism.distance}
                                        </Badge>
                                      )}
                                    </div>
                                  )}
                                  
                                  <div className="flex gap-2 flex-wrap">
                                    {visitData.mapsUrl && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => window.open(visitData.mapsUrl, '_blank')}
                                        data-testid={`button-map-visit-${categoryId}-${index}`}
                                      >
                                        <MapPin className="w-4 h-4 mr-2" />
                                        {t.tourism.viewMap}
                                      </Button>
                                    )}
                                    {visitData.website && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => window.open(visitData.website, '_blank')}
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
