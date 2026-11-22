// Enlace de WhatsApp con un mensaje ya escrito: el anfitrión sabe al momento
// de qué apartamento le escriben y en qué idioma.
import { Apartment, Language } from '@/lib/i18n';

export const HOST_WHATSAPP = '34664602010';

const APT_NAME: Record<Apartment, string> = { ibarra: 'Capricho de Ibarra', quevedo: 'Capricho de Quevedo' };

const GREETING: Record<Language, (apt: string) => string> = {
  es: (a) => `Hola, soy huésped de ${a}. `,
  en: (a) => `Hello, I'm a guest at ${a}. `,
  fr: (a) => `Bonjour, je suis client à ${a}. `,
  de: (a) => `Hallo, ich bin Gast im ${a}. `,
  it: (a) => `Ciao, sono ospite al ${a}. `,
  zh: (a) => `您好，我是 ${a} 的住客。`,
};

export function hostWhatsAppLink(apartment: Apartment | null | undefined, lang: Language) {
  const name = apartment ? APT_NAME[apartment] : 'Caprichos de Sevilla';
  const text = (GREETING[lang] || GREETING.en)(name);
  return `https://wa.me/${HOST_WHATSAPP}?text=${encodeURIComponent(text)}`;
}
