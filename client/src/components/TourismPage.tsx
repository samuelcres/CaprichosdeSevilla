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
import { visitCategoryIds } from '@/lib/visitData';
import sevilleBgUrl from '@assets/plaza-espana-bg.png';

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
                <div className="aspect-video w-full">
                  <iframe
                    className="w-full h-full rounded-lg"
                    frameBorder="0"
                    scrolling="no"
                    src="https://www.civitatis.com/widget-activities/?agencyId=40972&agencyUserId=44118&display=cosy&cant=6&lang=es&currency=EUR&destination=57&transfer=0&cmp=Widget_Sevilla_ES&width=100%&height=700px&hideButton=0&centerContent=1&typeSelection=all&color=325bdf&typography=Montserrat&removeBackground=1&showShadow=1&roundedButtons=1"
                    style={{ minHeight: '700px', maxWidth: '100%', overflow: 'hidden' }}
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
                  {restaurants.filter(r => r.category === 'breakfast').map((restaurant, index) => (
                    <Card key={`breakfast-${index}`} data-testid={`card-restaurant-breakfast-${index}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {restaurant.description}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary" className="flex-shrink-0">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            {restaurant.rating}
                          </Badge>
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
                  ))}
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
                  {restaurants.filter(r => r.category === 'lunch').map((restaurant, index) => (
                    <Card key={`lunch-${index}`} data-testid={`card-restaurant-lunch-${index}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {restaurant.description}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary" className="flex-shrink-0">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            {restaurant.rating}
                          </Badge>
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
                  ))}
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
                  {restaurants.filter(r => r.category === 'dinner').map((restaurant, index) => (
                    <Card key={`dinner-${index}`} data-testid={`card-restaurant-dinner-${index}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {restaurant.description}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary" className="flex-shrink-0">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            {restaurant.rating}
                          </Badge>
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
                  ))}
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
                      {items.map((item: { name: string; description: string }, index: number) => (
                        <div 
                          key={`${categoryId}-${index}`} 
                          className="p-4 bg-muted/30 rounded-lg border border-border"
                          data-testid={`visit-item-${categoryId}-${index}`}
                        >
                          <h4 className="font-semibold text-foreground mb-1">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      ))}
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
