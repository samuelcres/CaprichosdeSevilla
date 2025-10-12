import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, Key, Wifi, MapPin, Calendar, Phone, ChevronRight } from 'lucide-react';
import { Language } from '@/lib/i18n';

interface GuideDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  t: any;
  currentLanguage: Language;
}

const guideItems = [
  {
    key: 'transport',
    icon: Plane,
    color: 'text-blue-500',
  },
  {
    key: 'checkin',
    icon: Key,
    color: 'text-amber-500',
  },
  {
    key: 'wifi',
    icon: Wifi,
    color: 'text-cyan-500',
  },
  {
    key: 'tourism',
    icon: MapPin,
    color: 'text-green-500',
  },
  {
    key: 'events',
    icon: Calendar,
    color: 'text-purple-500',
  },
  {
    key: 'contact',
    icon: Phone,
    color: 'text-red-500',
  },
];

export default function GuideDialog({ open, onOpenChange, t, currentLanguage }: GuideDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="dialog-guide">
        <DialogHeader>
          <DialogTitle className="text-2xl" data-testid="title-guide">
            {t.guide.title}
          </DialogTitle>
          <DialogDescription data-testid="subtitle-guide">
            {t.guide.subtitle}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 mt-4">
          {guideItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.key} className="hover-elevate" data-testid={`card-guide-${item.key}`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-muted ${item.color}`}>
                      <Icon className="h-6 w-6" data-testid={`icon-guide-${item.key}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {t.guide[item.key].title}
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {t.guide[item.key].description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
