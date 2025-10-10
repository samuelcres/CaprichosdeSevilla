import { useState } from 'react';
import PageHeader from './PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Bus, Car, Plane, ParkingCircle, ExternalLink, Bike, Navigation, Train } from 'lucide-react';
import { Apartment, Language } from '@/lib/i18n';
import sevilleBgUrl from '@assets/plaza-espana-bg.png';

interface TransportPageProps {
  onBack: () => void;
  onHome: () => void;
  apartment: Apartment;
  t: any;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function TransportPage({ onBack, onHome, apartment, t, currentLanguage, onLanguageChange }: TransportPageProps) {
  const [activeTab, setActiveTab] = useState('arrival');

  const busStop = apartment === 'ibarra' ? t.transport.bus.stopIbarra : t.transport.bus.stopQuevedo;
  const address = apartment === 'ibarra'
    ? t.transport.taxi.addressIbarra
    : t.transport.taxi.addressQuevedo;

  return (
    <div className="min-h-screen bg-background relative">
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none"
        style={{ backgroundImage: `url(${sevilleBgUrl})` }}
      />
      <PageHeader 
        onBack={onBack} 
        onHome={onHome} 
        title={t.transport.title}
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
        changeLanguageLabel={t.common.changeLanguage}
        apartment={apartment}
        apartmentLabel={apartment === 'ibarra' ? t.apartment.ibarra : t.apartment.quevedo}
      />

      <div className="relative z-10 max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-2 md:gap-3">
          <Button
            variant={activeTab === 'arrival' ? 'default' : 'outline'}
            className="flex-1 justify-start md:justify-center"
            onClick={() => setActiveTab('arrival')}
            data-testid="tab-arrival"
          >
            <Plane className="w-4 h-4 mr-2" />
            {t.transport.arrival}
          </Button>
          <Button
            variant={activeTab === 'departure' ? 'default' : 'outline'}
            className="flex-1 justify-start md:justify-center"
            onClick={() => setActiveTab('departure')}
            data-testid="tab-departure"
          >
            <Plane className="w-4 h-4 mr-2" />
            {t.transport.departure}
          </Button>
          <Button
            variant={activeTab === 'movearound' ? 'default' : 'outline'}
            className="flex-1 justify-start md:justify-center"
            onClick={() => setActiveTab('movearound')}
            data-testid="tab-movearound"
          >
            <Navigation className="w-4 h-4 mr-2" />
            {t.transport.moveAround}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <div className="hidden">
            <TabsList>
              <TabsTrigger value="arrival">{t.transport.arrival}</TabsTrigger>
              <TabsTrigger value="departure">{t.transport.departure}</TabsTrigger>
              <TabsTrigger value="movearound">{t.transport.moveAround}</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="arrival" className="mt-6">
            <Accordion type="multiple" className="space-y-4">
              <AccordionItem value="airport" className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline" data-testid="accordion-airport-arrival">
                  <div className="flex items-center gap-3">
                    <Plane className="w-6 h-6 text-foreground" />
                    <h2 className="text-xl font-semibold text-foreground">
                      {t.transport.fromAirport}
                    </h2>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bus className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{t.transport.bus.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {t.transport.bus.price} • {t.transport.bus.schedule}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-foreground">{busStop}</p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open('https://www.tussam.es', '_blank')}
                  data-testid="button-tussam"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t.transport.bus.link}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Car className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{t.transport.taxi.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {t.transport.taxi.price}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">{address}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Car className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{t.transport.vtc.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {t.transport.vtc.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open('https://www.uber.com', '_blank')}
                  data-testid="button-uber"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t.transport.vtc.uber}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open('https://www.cabify.com', '_blank')}
                  data-testid="button-cabify"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t.transport.vtc.cabify}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Plane className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{t.transport.transfer.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {t.transport.transfer.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => window.open('https://www.book-online-transfers.com/es/baintex-airport-taxi', '_blank')}
                  data-testid="button-transfer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t.transport.transfer.button}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <ParkingCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{t.transport.parking.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {t.transport.parking.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => window.open('https://parclick.es/?affiliate=670e528a', '_blank')}
                  data-testid="button-parking"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t.transport.parking.button}
                </Button>
              </CardContent>
            </Card>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="trainstation" className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline" data-testid="accordion-train-arrival">
                  <div className="flex items-center gap-3">
                    <Train className="w-6 h-6 text-foreground" />
                    <h2 className="text-xl font-semibold text-foreground">
                      {t.transport.trainStation.fromStation}
                    </h2>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bus className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{t.transport.trainStation.busTitle}</CardTitle>
                    <CardDescription className="mt-1">
                      {t.transport.trainStation.busLine}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{t.transport.trainStation.busPrice} • {t.transport.trainStation.busSchedule}</p>
                <p className="text-sm text-foreground">
                  {apartment === 'ibarra' ? t.transport.trainStation.busStopIbarra : t.transport.trainStation.busStopQuevedo}
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open('https://www.tussam.es', '_blank')}
                  data-testid="button-train-bus"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t.transport.bus.link}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Train className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{t.transport.trainStation.tramTitle}</CardTitle>
                    <CardDescription className="mt-1">
                      {t.transport.trainStation.tramLine}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{t.transport.trainStation.tramPrice} • {t.transport.trainStation.tramSchedule}</p>
                <p className="text-sm text-foreground">
                  {apartment === 'ibarra' ? t.transport.trainStation.tramStopIbarra : t.transport.trainStation.tramStopQuevedo}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Car className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{t.transport.trainStation.taxiTitle}</CardTitle>
                    <CardDescription className="mt-1">
                      {t.transport.trainStation.taxiPrice}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">{t.transport.trainStation.taxiDuration}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {apartment === 'ibarra' ? t.transport.trainStation.walkingIbarra : t.transport.trainStation.walkingQuevedo}
                </p>
              </CardContent>
            </Card>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="car" className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline" data-testid="accordion-car-arrival">
                  <div className="flex items-center gap-3">
                    <Car className="w-6 h-6 text-foreground" />
                    <h2 className="text-xl font-semibold text-foreground">
                      {t.transport.byCar.title}
                    </h2>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground mb-4">{t.transport.byCar.subtitle}</p>
                  
                  {apartment === 'ibarra' ? (
                    <>
                      <Card>
                        <CardHeader>
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <ParkingCircle className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg">{t.transport.byCar.ibarra.parking1.name}</CardTitle>
                              <CardDescription className="mt-1">
                                {t.transport.byCar.ibarra.parking1.distance}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-2 text-sm">
                            <p><strong>{t.transport.byCar.address}:</strong> {t.transport.byCar.ibarra.parking1.address}</p>
                            <p><strong>{t.transport.byCar.phone}:</strong> {t.transport.byCar.ibarra.parking1.phone}</p>
                            <p><strong>{t.transport.byCar.price}:</strong> {t.transport.byCar.ibarra.parking1.price}</p>
                          </div>
                          <div className="space-y-2">
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(t.transport.byCar.ibarra.parking1.address)}`, '_blank')}
                              data-testid="button-parking1-map"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {t.transport.byCar.openMap}
                            </Button>
                            <Button
                              variant="default"
                              className="w-full"
                              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(t.transport.byCar.ibarra.parking1.address)}&destination=${encodeURIComponent('Calle Conde de Ibarra, 11-13, 41004 Sevilla')}&travelmode=walking`, '_blank')}
                              data-testid="button-parking1-route"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {t.transport.byCar.walkingRoute}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <ParkingCircle className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg">{t.transport.byCar.ibarra.parking2.name}</CardTitle>
                              <CardDescription className="mt-1">
                                {t.transport.byCar.ibarra.parking2.distance}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-2 text-sm">
                            <p><strong>{t.transport.byCar.address}:</strong> {t.transport.byCar.ibarra.parking2.address}</p>
                            <p><strong>{t.transport.byCar.phone}:</strong> {t.transport.byCar.ibarra.parking2.phone}</p>
                            <p><strong>{t.transport.byCar.price}:</strong> {t.transport.byCar.ibarra.parking2.price}</p>
                          </div>
                          <div className="space-y-2">
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(t.transport.byCar.ibarra.parking2.address)}`, '_blank')}
                              data-testid="button-parking2-map"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {t.transport.byCar.openMap}
                            </Button>
                            <Button
                              variant="default"
                              className="w-full"
                              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(t.transport.byCar.ibarra.parking2.address)}&destination=${encodeURIComponent('Calle Conde de Ibarra, 11-13, 41004 Sevilla')}&travelmode=walking`, '_blank')}
                              data-testid="button-parking2-route"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {t.transport.byCar.walkingRoute}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  ) : (
                    <>
                      <Card>
                        <CardHeader>
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <ParkingCircle className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg">{t.transport.byCar.quevedo.parking1.name}</CardTitle>
                              <CardDescription className="mt-1">
                                {t.transport.byCar.quevedo.parking1.distance}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-2 text-sm">
                            <p><strong>{t.transport.byCar.address}:</strong> {t.transport.byCar.quevedo.parking1.address}</p>
                            <p><strong>{t.transport.byCar.phone}:</strong> {t.transport.byCar.quevedo.parking1.phone}</p>
                            <p><strong>{t.transport.byCar.price}:</strong> {t.transport.byCar.quevedo.parking1.price}</p>
                          </div>
                          <div className="space-y-2">
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(t.transport.byCar.quevedo.parking1.address)}`, '_blank')}
                              data-testid="button-parking1-map"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {t.transport.byCar.openMap}
                            </Button>
                            <Button
                              variant="default"
                              className="w-full"
                              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(t.transport.byCar.quevedo.parking1.address)}&destination=${encodeURIComponent('Calle Quevedo, 11, 41001 Sevilla')}&travelmode=walking`, '_blank')}
                              data-testid="button-parking1-route"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {t.transport.byCar.walkingRoute}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <ParkingCircle className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg">{t.transport.byCar.quevedo.parking2.name}</CardTitle>
                              <CardDescription className="mt-1">
                                {t.transport.byCar.quevedo.parking2.distance}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-2 text-sm">
                            <p><strong>{t.transport.byCar.address}:</strong> {t.transport.byCar.quevedo.parking2.address}</p>
                            <p><strong>{t.transport.byCar.phone}:</strong> {t.transport.byCar.quevedo.parking2.phone}</p>
                            <p><strong>{t.transport.byCar.price}:</strong> {t.transport.byCar.quevedo.parking2.price}</p>
                          </div>
                          <div className="space-y-2">
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(t.transport.byCar.quevedo.parking2.address)}`, '_blank')}
                              data-testid="button-parking2-map"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {t.transport.byCar.openMap}
                            </Button>
                            <Button
                              variant="default"
                              className="w-full"
                              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(t.transport.byCar.quevedo.parking2.address)}&destination=${encodeURIComponent('Calle Quevedo, 11, 41001 Sevilla')}&travelmode=walking`, '_blank')}
                              data-testid="button-parking2-route"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {t.transport.byCar.walkingRoute}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="departure" className="mt-6">
            <Accordion type="multiple" className="space-y-4">
              <AccordionItem value="airport" className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline" data-testid="accordion-airport-departure">
                  <div className="flex items-center gap-3">
                    <Plane className="w-6 h-6 text-foreground" />
                    <h2 className="text-xl font-semibold text-foreground">
                      {t.transport.toAirport}
                    </h2>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bus className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{t.transport.bus.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {t.transport.bus.price} • {t.transport.bus.schedule}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-foreground">{busStop}</p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open('https://www.tussam.es', '_blank')}
                  data-testid="button-tussam-departure"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t.transport.bus.link}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Car className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{t.transport.taxi.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {t.transport.taxi.price}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Car className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{t.transport.vtc.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {t.transport.vtc.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open('https://www.uber.com', '_blank')}
                  data-testid="button-uber-departure"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t.transport.vtc.uber}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open('https://www.cabify.com', '_blank')}
                  data-testid="button-cabify-departure"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t.transport.vtc.cabify}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Plane className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{t.transport.transfer.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {t.transport.transfer.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => window.open('https://www.book-online-transfers.com/es/baintex-airport-taxi', '_blank')}
                  data-testid="button-transfer-departure"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t.transport.transfer.button}
                </Button>
              </CardContent>
            </Card>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="trainstation" className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline" data-testid="accordion-train-departure">
                  <div className="flex items-center gap-3">
                    <Train className="w-6 h-6 text-foreground" />
                    <h2 className="text-xl font-semibold text-foreground">
                      {t.transport.trainStation.toStation}
                    </h2>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bus className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{t.transport.trainStation.busTitle}</CardTitle>
                    <CardDescription className="mt-1">
                      {t.transport.trainStation.busLine}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{t.transport.trainStation.busPrice} • {t.transport.trainStation.busSchedule}</p>
                <p className="text-sm text-foreground">
                  {apartment === 'ibarra' ? t.transport.trainStation.busStopIbarra : t.transport.trainStation.busStopQuevedo}
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open('https://www.tussam.es', '_blank')}
                  data-testid="button-train-bus-departure"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t.transport.bus.link}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Train className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{t.transport.trainStation.tramTitle}</CardTitle>
                    <CardDescription className="mt-1">
                      {t.transport.trainStation.tramLine}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{t.transport.trainStation.tramPrice} • {t.transport.trainStation.tramSchedule}</p>
                <p className="text-sm text-foreground">
                  {apartment === 'ibarra' ? t.transport.trainStation.tramStopIbarra : t.transport.trainStation.tramStopQuevedo}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Car className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{t.transport.trainStation.taxiTitle}</CardTitle>
                    <CardDescription className="mt-1">
                      {t.transport.trainStation.taxiPrice}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">{t.transport.trainStation.taxiDuration}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {apartment === 'ibarra' ? t.transport.trainStation.walkingIbarra : t.transport.trainStation.walkingQuevedo}
                </p>
              </CardContent>
            </Card>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="car" className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline" data-testid="accordion-car-departure">
                  <div className="flex items-center gap-3">
                    <Car className="w-6 h-6 text-foreground" />
                    <h2 className="text-xl font-semibold text-foreground">
                      {t.transport.byCar.title}
                    </h2>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground mb-4">{t.transport.byCar.subtitle}</p>
                  
                  {apartment === 'ibarra' ? (
                    <>
                      <Card>
                        <CardHeader>
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <ParkingCircle className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg">{t.transport.byCar.ibarra.parking1.name}</CardTitle>
                              <CardDescription className="mt-1">
                                {t.transport.byCar.ibarra.parking1.distance}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-2 text-sm">
                            <p><strong>{t.transport.byCar.address}:</strong> {t.transport.byCar.ibarra.parking1.address}</p>
                            <p><strong>{t.transport.byCar.phone}:</strong> {t.transport.byCar.ibarra.parking1.phone}</p>
                            <p><strong>{t.transport.byCar.price}:</strong> {t.transport.byCar.ibarra.parking1.price}</p>
                          </div>
                          <div className="space-y-2">
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(t.transport.byCar.ibarra.parking1.address)}`, '_blank')}
                              data-testid="button-parking1-map-departure"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {t.transport.byCar.openMap}
                            </Button>
                            <Button
                              variant="default"
                              className="w-full"
                              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent('Calle Conde de Ibarra, 11-13, 41004 Sevilla')}&destination=${encodeURIComponent(t.transport.byCar.ibarra.parking1.address)}&travelmode=walking`, '_blank')}
                              data-testid="button-parking1-route-departure"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {t.transport.byCar.walkingRoute}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <ParkingCircle className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg">{t.transport.byCar.ibarra.parking2.name}</CardTitle>
                              <CardDescription className="mt-1">
                                {t.transport.byCar.ibarra.parking2.distance}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-2 text-sm">
                            <p><strong>{t.transport.byCar.address}:</strong> {t.transport.byCar.ibarra.parking2.address}</p>
                            <p><strong>{t.transport.byCar.phone}:</strong> {t.transport.byCar.ibarra.parking2.phone}</p>
                            <p><strong>{t.transport.byCar.price}:</strong> {t.transport.byCar.ibarra.parking2.price}</p>
                          </div>
                          <div className="space-y-2">
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(t.transport.byCar.ibarra.parking2.address)}`, '_blank')}
                              data-testid="button-parking2-map-departure"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {t.transport.byCar.openMap}
                            </Button>
                            <Button
                              variant="default"
                              className="w-full"
                              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent('Calle Conde de Ibarra, 11-13, 41004 Sevilla')}&destination=${encodeURIComponent(t.transport.byCar.ibarra.parking2.address)}&travelmode=walking`, '_blank')}
                              data-testid="button-parking2-route-departure"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {t.transport.byCar.walkingRoute}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  ) : (
                    <>
                      <Card>
                        <CardHeader>
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <ParkingCircle className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg">{t.transport.byCar.quevedo.parking1.name}</CardTitle>
                              <CardDescription className="mt-1">
                                {t.transport.byCar.quevedo.parking1.distance}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-2 text-sm">
                            <p><strong>{t.transport.byCar.address}:</strong> {t.transport.byCar.quevedo.parking1.address}</p>
                            <p><strong>{t.transport.byCar.phone}:</strong> {t.transport.byCar.quevedo.parking1.phone}</p>
                            <p><strong>{t.transport.byCar.price}:</strong> {t.transport.byCar.quevedo.parking1.price}</p>
                          </div>
                          <div className="space-y-2">
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(t.transport.byCar.quevedo.parking1.address)}`, '_blank')}
                              data-testid="button-parking1-map-departure"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {t.transport.byCar.openMap}
                            </Button>
                            <Button
                              variant="default"
                              className="w-full"
                              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent('Calle Quevedo, 11, 41001 Sevilla')}&destination=${encodeURIComponent(t.transport.byCar.quevedo.parking1.address)}&travelmode=walking`, '_blank')}
                              data-testid="button-parking1-route-departure"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {t.transport.byCar.walkingRoute}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <ParkingCircle className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg">{t.transport.byCar.quevedo.parking2.name}</CardTitle>
                              <CardDescription className="mt-1">
                                {t.transport.byCar.quevedo.parking2.distance}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-2 text-sm">
                            <p><strong>{t.transport.byCar.address}:</strong> {t.transport.byCar.quevedo.parking2.address}</p>
                            <p><strong>{t.transport.byCar.phone}:</strong> {t.transport.byCar.quevedo.parking2.phone}</p>
                            <p><strong>{t.transport.byCar.price}:</strong> {t.transport.byCar.quevedo.parking2.price}</p>
                          </div>
                          <div className="space-y-2">
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(t.transport.byCar.quevedo.parking2.address)}`, '_blank')}
                              data-testid="button-parking2-map-departure"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {t.transport.byCar.openMap}
                            </Button>
                            <Button
                              variant="default"
                              className="w-full"
                              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent('Calle Quevedo, 11, 41001 Sevilla')}&destination=${encodeURIComponent(t.transport.byCar.quevedo.parking2.address)}&travelmode=walking`, '_blank')}
                              data-testid="button-parking2-route-departure"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {t.transport.byCar.walkingRoute}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="movearound" className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t.transport.localTransport.title}
            </h2>
            
            <p className="text-muted-foreground mb-6">
              {apartment === 'ibarra' ? t.transport.localTransport.ibarraInfo : t.transport.localTransport.quevedoInfo}
            </p>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bus className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{t.transport.localTransport.busStops}</CardTitle>
                    <CardDescription className="mt-1">
                      {t.transport.localTransport.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    const coords = apartment === 'ibarra' 
                      ? '37.3878,-5.9932' 
                      : '37.3897,-5.9942';
                    window.open(`https://www.google.com/maps/search/bus+stop/@${coords},16z`, '_blank');
                  }}
                  data-testid="button-bus-stops-map"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t.transport.localTransport.viewOnMap}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bike className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{t.transport.localTransport.bikeStations}</CardTitle>
                    <CardDescription className="mt-1">
                      Sevici - {t.transport.localTransport.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    const coords = apartment === 'ibarra' 
                      ? '37.3878,-5.9932' 
                      : '37.3897,-5.9942';
                    window.open(`https://www.google.com/maps/search/sevici+bike+station/@${coords},16z`, '_blank');
                  }}
                  data-testid="button-bike-stations-map"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t.transport.localTransport.viewOnMap}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(t.transport.localTransport.seviciUrl, '_blank')}
                  data-testid="button-sevici-web"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t.transport.localTransport.seviciWebButton}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Navigation className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{t.transport.localTransport.scooters}</CardTitle>
                    <CardDescription className="mt-1">
                      {t.transport.localTransport.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    const coords = apartment === 'ibarra' 
                      ? '37.3878,-5.9932' 
                      : '37.3897,-5.9942';
                    window.open(`https://www.google.com/maps/search/electric+scooter/@${coords},16z`, '_blank');
                  }}
                  data-testid="button-scooters-map"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t.transport.localTransport.viewOnMap}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(t.transport.localTransport.scooterUrl, '_blank')}
                  data-testid="button-scooter-web"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t.transport.localTransport.scooterWebButton}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
