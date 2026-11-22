import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Bus, Key, Wifi, MapPin, PartyPopper, Phone } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useTranslation } from '@/lib/i18n';

// Barra inferior fija (solo móvil) para saltar entre secciones sin volver al menú
export default function BottomNav() {
  const { language } = useApp();
  const t = useTranslation(language);
  const [location, setLocation] = useLocation();

  // Deja hueco al final de la página para que la barra no tape contenido
  useEffect(() => {
    document.body.classList.add('has-bottom-nav');
    return () => document.body.classList.remove('has-bottom-nav');
  }, []);

  const items = [
    { id: 'transport', icon: Bus, label: t.menu.transport },
    { id: 'checkin', icon: Key, label: t.menu.checkin },
    { id: 'wifi', icon: Wifi, label: t.menu.wifi },
    { id: 'tourism', icon: MapPin, label: t.menu.tourism },
    { id: 'events', icon: PartyPopper, label: t.menu.events },
    { id: 'contact', icon: Phone, label: t.menu.contact },
  ];

  return (
    <nav
      className="sm:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-t border-border shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Secciones"
      data-testid="bottom-nav"
    >
      <ul className="grid grid-cols-6">
        {items.map(({ id, icon: Icon, label }) => {
          const active = location === `/${id}`;
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => { if (!active) setLocation(`/${id}`); }}
                className={`w-full flex flex-col items-center justify-center gap-0.5 pt-2 pb-1.5 transition-colors ${
                  active ? 'text-primary' : 'text-muted-foreground active:text-primary'
                }`}
                aria-current={active ? 'page' : undefined}
                data-testid={`bottomnav-${id}`}
              >
                <span className={`flex items-center justify-center w-11 h-7 rounded-full transition-colors ${active ? 'bg-primary/15' : ''}`}>
                  <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
                </span>
                <span className={`text-[10px] leading-tight max-w-full px-0.5 truncate ${active ? 'font-bold' : 'font-medium'}`}>
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
