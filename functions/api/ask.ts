// Cloudflare Pages Function: POST /api/ask
// Body: { q: string, lang: 'es'|'en'|'fr'|'de'|'it'|'zh', apartment: 'ibarra'|'quevedo', context: {title,text}[] }
//
// Redacta una respuesta corta a la pregunta del huésped usando SOLO los
// fragmentos de la guía que el buscador de la app ya ha encontrado (context).
// Usa Workers AI (el mismo binding AI que /api/events). Sin binding responde
// { answer: null } y la app muestra solo los resultados de la guía.

type Lang = 'es' | 'en' | 'fr' | 'de' | 'it' | 'zh';

interface Env {
  AI?: { run: (model: string, input: unknown) => Promise<any> };
}

const LANG_NAME: Record<Lang, string> = {
  es: 'Spanish',
  en: 'English',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  zh: 'Simplified Chinese',
};

const APT_NAME: Record<string, string> = { ibarra: 'Capricho de Ibarra', quevedo: 'Capricho de Quevedo' };

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context;
  if (!env.AI) return json({ answer: null, source: 'none' });

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'bad-request' }, 400);
  }

  const q = typeof body?.q === 'string' ? body.q.trim().slice(0, 300) : '';
  const lang: Lang = (Object.keys(LANG_NAME) as Lang[]).includes(body?.lang) ? body.lang : 'en';
  const apartment = APT_NAME[body?.apartment] ? body.apartment : 'ibarra';
  const ctx: { title: string; text: string }[] = Array.isArray(body?.context)
    ? body.context
        .slice(0, 6)
        .filter((c: any) => c && typeof c.title === 'string' && typeof c.text === 'string')
        .map((c: any) => ({ title: c.title.slice(0, 120), text: c.text.slice(0, 900) }))
    : [];
  if (q.length < 2) return json({ error: 'empty' }, 400);

  const guide = ctx.length
    ? ctx.map((c, i) => `[${i + 1}] ${c.title}: ${c.text}`).join('\n')
    : '(no matching information in the guide)';

  const system =
    `You are the virtual assistant of the holiday apartment "${APT_NAME[apartment]}" (Caprichos de Sevilla) in Seville, Spain. ` +
    `Answer the guest's question in ${LANG_NAME[lang]} only, in at most 3 short sentences, friendly and concrete. ` +
    `Use ONLY the facts in the GUIDE below; copy names, times, prices, passwords and phone numbers exactly. ` +
    `Never invent information. If the GUIDE does not contain the answer, say briefly that you don't have that information ` +
    `and suggest writing to the host on WhatsApp. Do not mention the word GUIDE or the numbers in brackets.`;

  try {
    const out = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: `GUIDE:\n${guide}\n\nQUESTION: ${q}` },
      ],
      max_tokens: 220,
      temperature: 0.2,
    });
    const answer = typeof out?.response === 'string' ? out.response.trim() : '';
    return json({ answer: answer || null, source: answer ? 'ai' : 'none' });
  } catch {
    return json({ answer: null, source: 'error' });
  }
}
