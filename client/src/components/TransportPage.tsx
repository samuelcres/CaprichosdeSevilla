import { useState } from 'react';
import PageHeader from './PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bus, Car, Plane, ParkingCircle, ExternalLink } from 'lucide-react';
import { Apartment } from '@/lib/i18n';
import sevilleBgUrl from '@assets/plaza-espana-bg.png';

interface TransportPageProps {
  onBack: () => void;
  onHome: () => void;
  apartment: Apartment;
  t: any;
}

export default function TransportPage({ onBack, onHome, apartment, t }: TransportPageProps) {
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
      <PageHeader onBack={onBack} onHome={onHome} title={t.transport.title} />

      <div className="relative z-10 max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="arrival" data-testid="tab-arrival">
              {t.transport.arrival}
            </TabsTrigger>
            <TabsTrigger value="departure" data-testid="tab-departure">
              {t.transport.departure}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="arrival" className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t.transport.fromAirport}
            </h2>

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
          </TabsContent>

          <TabsContent value="departure" className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t.transport.toAirport}
            </h2>

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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
