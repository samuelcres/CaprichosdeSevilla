import { useEffect, useState } from 'react';

// Modo noche: se guarda en el dispositivo y se aplica antes de pintar la app.
const KEY = 'cs_theme';
type Theme = 'light' | 'dark';

function read(): Theme {
  try {
    const v = localStorage.getItem(KEY);
    if (v === 'dark' || v === 'light') return v;
  } catch { /* ignore */ }
  return 'light';
}

function apply(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#16120f' : '#ffffff');
}

if (typeof document !== 'undefined') apply(read());

const listeners = new Set<(t: Theme) => void>();

export function useNightMode() {
  const [theme, setTheme] = useState<Theme>(read);
  useEffect(() => {
    listeners.add(setTheme);
    return () => { listeners.delete(setTheme); };
  }, []);
  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(KEY, next); } catch { /* ignore */ }
    apply(next);
    listeners.forEach((l) => l(next));
  };
  return { night: theme === 'dark', toggle };
}

export const NIGHT_LABEL: Record<string, { night: string; day: string }> = {
  es: { night: 'Modo noche', day: 'Modo día' },
  en: { night: 'Night mode', day: 'Day mode' },
  fr: { night: 'Mode nuit', day: 'Mode jour' },
  de: { night: 'Nachtmodus', day: 'Tagmodus' },
  it: { night: 'Modalità notte', day: 'Modalità giorno' },
  zh: { night: '夜间模式', day: '日间模式' },
};
