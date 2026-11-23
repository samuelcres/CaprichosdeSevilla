import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { Search, Sparkles, ArrowRight, Loader2, X } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Language, Apartment } from '@/lib/i18n';
import { search, SearchHit, SearchSection } from '@/lib/search';
import { hostWhatsAppLink } from '@/lib/whatsapp';

const UI: Record<Language, {
  placeholder: string; title: string; hint: string; answer: string; results: string; open: string;
  none: string; askHost: string; examples: string[]; sections: Record<SearchSection, string>; clear: string;
}> = {
  es: {
    placeholder: '¿Qué necesitas saber?', title: 'Pregunta a la guía', hint: 'Escribe tu pregunta: Wi-Fi, check-out, farmacia, dónde cenar…',
    answer: 'Respuesta', results: 'En la guía', open: 'Abrir', none: 'No he encontrado nada sobre eso en la guía.', askHost: 'Pregúntanos por WhatsApp',
    examples: ['Contraseña del Wi-Fi', '¿A qué hora es el check-out?', 'Farmacia abierta', 'Cómo llegar desde el aeropuerto', 'Dónde cenar tapas'],
    sections: { transport: 'Transporte', checkin: 'Check-in', wifi: 'Wi-Fi y Apartamento', tourism: 'Comer y Visitar', events: 'Eventos', contact: 'Contacto' }, clear: 'Borrar',
  },
  en: {
    placeholder: 'What do you need to know?', title: 'Ask the guide', hint: 'Type your question: Wi-Fi, check-out, pharmacy, where to eat…',
    answer: 'Answer', results: 'In the guide', open: 'Open', none: "I couldn't find anything about that in the guide.", askHost: 'Ask us on WhatsApp',
    examples: ['Wi-Fi password', 'What time is check-out?', 'Pharmacy open now', 'Getting here from the airport', 'Where to eat tapas'],
    sections: { transport: 'Transport', checkin: 'Check-in', wifi: 'Wi-Fi & Apartment', tourism: 'Eat & Visit', events: 'Events', contact: 'Contact' }, clear: 'Clear',
  },
  fr: {
    placeholder: 'Que voulez-vous savoir ?', title: 'Demandez au guide', hint: 'Écrivez votre question : Wi-Fi, départ, pharmacie, où dîner…',
    answer: 'Réponse', results: 'Dans le guide', open: 'Ouvrir', none: "Je n'ai rien trouvé à ce sujet dans le guide.", askHost: 'Écrivez-nous sur WhatsApp',
    examples: ['Mot de passe Wi-Fi', 'À quelle heure est le départ ?', 'Pharmacie ouverte', "Venir depuis l'aéroport", 'Où manger des tapas'],
    sections: { transport: 'Transport', checkin: 'Check-in', wifi: 'Wi-Fi et Appartement', tourism: 'Manger et Visiter', events: 'Événements', contact: 'Contact' }, clear: 'Effacer',
  },
  de: {
    placeholder: 'Was möchten Sie wissen?', title: 'Fragen Sie den Guide', hint: 'Ihre Frage: WLAN, Check-out, Apotheke, wo essen…',
    answer: 'Antwort', results: 'Im Guide', open: 'Öffnen', none: 'Dazu habe ich im Guide nichts gefunden.', askHost: 'Fragen Sie uns per WhatsApp',
    examples: ['WLAN-Passwort', 'Wann ist Check-out?', 'Apotheke geöffnet', 'Anreise vom Flughafen', 'Wo Tapas essen'],
    sections: { transport: 'Verkehr', checkin: 'Check-in', wifi: 'WLAN & Apartment', tourism: 'Essen & Besuchen', events: 'Veranstaltungen', contact: 'Kontakt' }, clear: 'Löschen',
  },
  it: {
    placeholder: 'Cosa ti serve sapere?', title: 'Chiedi alla guida', hint: 'Scrivi la tua domanda: Wi-Fi, check-out, farmacia, dove cenare…',
    answer: 'Risposta', results: 'Nella guida', open: 'Apri', none: 'Non ho trovato nulla su questo nella guida.', askHost: 'Scrivici su WhatsApp',
    examples: ['Password del Wi-Fi', 'A che ora è il check-out?', 'Farmacia aperta', "Arrivare dall'aeroporto", 'Dove mangiare tapas'],
    sections: { transport: 'Trasporti', checkin: 'Check-in', wifi: 'Wi-Fi e Appartamento', tourism: 'Mangiare e Visitare', events: 'Eventi', contact: 'Contatti' }, clear: 'Cancella',
  },
  zh: {
    placeholder: '您想了解什么？', title: '向指南提问', hint: '输入您的问题：Wi-Fi、退房、药店、在哪里吃饭…',
    answer: '回答', results: '指南中的内容', open: '打开', none: '指南中没有找到相关信息。', askHost: '通过WhatsApp联系我们',
    examples: ['Wi-Fi密码', '几点退房？', '药店', '从机场怎么来', '在哪里吃tapas'],
    sections: { transport: '交通', checkin: '入住', wifi: 'Wi-Fi和公寓', tourism: '美食与游览', events: '活动', contact: '联系' }, clear: '清除',
  },
};

async function askAI(q: string, lang: Language, apartment: Apartment, hits: SearchHit[], signal: AbortSignal): Promise<string | null> {
  try {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ q, lang, apartment, context: hits.map((h) => ({ title: h.title, text: h.text })) }),
      signal,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data?.answer === 'string' && data.answer.trim() ? data.answer.trim() : null;
  } catch {
    return null;
  }
}

export default function SearchBox({ apartment, lang }: { apartment: Apartment; lang: Language }) {
  const T = UI[lang] ?? UI.es;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);
  const [, setLocation] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  // resultados de la guía mientras se escribe (instantáneo, sin conexión)
  const hits = useMemo(() => search(query, lang, apartment), [query, lang, apartment]);

  // respuesta redactada al enviar la pregunta
  useEffect(() => {
    if (!submitted) return;
    const ctrl = new AbortController();
    const context = search(submitted, lang, apartment);
    setAnswer(null);
    setThinking(true);
    askAI(submitted, lang, apartment, context, ctrl.signal).then((a) => {
      if (!ctrl.signal.aborted) {
        setAnswer(a);
        setThinking(false);
      }
    });
    return () => ctrl.abort();
  }, [submitted, lang, apartment]);

  const reset = () => {
    setQuery('');
    setSubmitted('');
    setAnswer(null);
    setThinking(false);
  };

  const ask = (q: string) => {
    setQuery(q);
    if (q.trim().length >= 2) setSubmitted(q.trim());
  };

  const goTo = (section: SearchSection) => {
    setOpen(false);
    setLocation(`/${section}`);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full max-w-md mx-auto flex items-center gap-2 rounded-full border border-border bg-white/95 dark:bg-card/95 shadow-sm px-4 py-2 text-left text-sm text-muted-foreground hover:border-primary transition-colors"
        data-testid="button-open-search"
        aria-label={T.title}
      >
        <Search className="w-4 h-4 text-primary shrink-0" />
        <span className="truncate">{T.placeholder}</span>
      </button>

      <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) reset(); }}>
        <DialogContent className="max-w-lg w-[calc(100%-1.5rem)] max-h-[85dvh] overflow-y-auto p-4 sm:p-6 top-4 translate-y-0 sm:top-[50%] sm:translate-y-[-50%] rounded-2xl">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="w-5 h-5 text-primary" />
            {T.title}
          </DialogTitle>
          <DialogDescription className="text-sm">{T.hint}</DialogDescription>

          <form
            onSubmit={(e) => { e.preventDefault(); ask(query); inputRef.current?.blur(); }}
            className="flex items-center gap-2 rounded-xl border-2 border-primary/40 focus-within:border-primary bg-background px-3 py-2"
          >
            <Search className="w-4 h-4 text-primary shrink-0" />
            <input
              ref={inputRef}
              autoFocus
              value={query}
              onChange={(e) => { setQuery(e.target.value); if (submitted) { setSubmitted(''); setAnswer(null); } }}
              placeholder={T.placeholder}
              className="flex-1 min-w-0 bg-transparent outline-none text-base"
              enterKeyHint="search"
              maxLength={200}
              data-testid="input-search"
            />
            {query && (
              <button type="button" onClick={reset} aria-label={T.clear} className="text-muted-foreground">
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-primary text-primary-foreground p-1.5 disabled:opacity-40"
              disabled={query.trim().length < 2}
              aria-label={T.title}
              data-testid="button-search-submit"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {!query && (
            <div className="flex flex-wrap gap-2">
              {T.examples.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => ask(ex)}
                  className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium hover:border-primary"
                >
                  {ex}
                </button>
              ))}
            </div>
          )}

          {submitted && (thinking || answer) && (
            <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-3" data-testid="search-answer">
              <p className="text-xs font-semibold text-primary flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" />{T.answer}
              </p>
              {thinking ? (
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
              ) : (
                <p className="text-sm leading-relaxed whitespace-pre-line">{answer}</p>
              )}
            </div>
          )}

          {query.trim().length >= 2 && hits.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{T.results}</p>
              {hits.map((h) => (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => goTo(h.section)}
                  className="w-full text-left rounded-xl border border-border bg-card p-3 hover:border-primary transition-colors"
                  data-testid={`search-hit-${h.id}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-sm leading-snug">{h.title}</p>
                    <span className="shrink-0 text-[11px] font-semibold text-primary flex items-center gap-0.5">
                      {T.sections[h.section]}<ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">{h.snippet}</p>
                </button>
              ))}
            </div>
          )}

          {query.trim().length >= 2 && hits.length === 0 && (
            <p className="text-sm text-muted-foreground">{T.none}</p>
          )}

          {query.trim().length >= 2 && (
            <a
              href={hostWhatsAppLink(apartment, lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-green-600 text-white text-sm font-semibold py-2.5"
            >
              <SiWhatsapp className="w-4 h-4" />{T.askHost}
            </a>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
