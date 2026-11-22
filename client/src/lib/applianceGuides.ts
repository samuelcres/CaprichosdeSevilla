// Guías rápidas de los aparatos del apartamento (Wi-Fi y Apartamento).
// Aire acondicionado: mando de pared Midea serie KJR-120.
// Lavadora: modelo WCV 6611 BC (resumen del manual del fabricante).
import { Apartment, Language } from '@/lib/i18n';

export type AcButton = 'power' | 'mode' | 'temp' | 'fan' | 'swing' | 'timer';

export interface AcGuide {
  tab: string;
  title: string;
  model: string;
  alertTitle: string;
  alert: string;
  buttonsTitle: string;
  buttons: Record<AcButton, { label: string; text: string }>;
  modesTitle: string;
  modes: string;
  tipsTitle: string;
  tips: string[];
  lockTitle: string;
  lock: string;
}

export interface WasherProgram {
  name: string;
  detail: string; // temperatura · duración · carga
  note: string;
}

export interface WasherGuide {
  tab: string;
  title: string;
  model: string;
  stepsTitle: string;
  steps: string[];
  drawerTitle: string;
  drawer: { tag: string; text: string }[];
  programsTitle: string;
  programs: WasherProgram[];
  tipsTitle: string;
  tips: string[];
}

export interface UiTexts {
  wifiTab: string;
  showQr: string;
  hideQr: string;
}

// Qué aparatos tienen guía en cada apartamento
export const APARTMENT_APPLIANCES: Record<Apartment, { ac: boolean; washer: boolean }> = {
  ibarra: { ac: true, washer: true },
  quevedo: { ac: false, washer: false },
};

export const UI: Record<Language, UiTexts> = {
  es: { wifiTab: 'Wi-Fi', showQr: 'Mostrar código QR', hideQr: 'Ocultar código QR' },
  en: { wifiTab: 'Wi-Fi', showQr: 'Show QR code', hideQr: 'Hide QR code' },
  fr: { wifiTab: 'Wi-Fi', showQr: 'Afficher le QR code', hideQr: 'Masquer le QR code' },
  de: { wifiTab: 'WLAN', showQr: 'QR-Code anzeigen', hideQr: 'QR-Code ausblenden' },
  it: { wifiTab: 'Wi-Fi', showQr: 'Mostra codice QR', hideQr: 'Nascondi codice QR' },
  zh: { wifiTab: 'Wi-Fi', showQr: '显示二维码', hideQr: '隐藏二维码' },
};

export const AC: Record<Language, AcGuide> = {
  es: {
    tab: 'Aire acondicionado',
    title: 'Aire acondicionado',
    model: 'Mando de pared Midea, serie KJR-120',
    alertTitle: '¿Se enciende o apaga solo? Está programado',
    alert: 'Si el aire tiene una programación activa, para usarlo en modo manual pulsa la tecla TIMER varias veces hasta que se oculten los iconos de programación de la pantalla. Después úsalo con normalidad.',
    buttonsTitle: 'Botones principales',
    buttons: {
      power: { label: 'Encender / apagar', text: 'Pulsa ⏻ una vez.' },
      mode: { label: 'Modo (M)', text: 'Cambia entre frío, calor, deshumidificar, ventilador y automático.' },
      temp: { label: 'Temperatura (∨ ∧)', text: 'Sube o baja la temperatura deseada.' },
      fan: { label: 'Ventilador', text: 'Cambia la velocidad del aire; AUTO la ajusta sola.' },
      swing: { label: 'Dirección del aire', text: 'Activa o detiene el movimiento de las lamas.' },
      timer: { label: 'TIMER', text: 'Programación. Púlsalo hasta que desaparezcan los iconos para usarlo en manual.' },
    },
    modesTitle: 'Iconos del modo',
    modes: '❄ COOL = frío · ☀ HEAT = calor · 💧 DRY = seco · ✣ FAN = solo ventilador · AUTO = automático',
    tipsTitle: 'Consejos',
    tips: [
      'Temperatura recomendada: 24–26 °C en verano y 20–22 °C en invierno.',
      'Mantén puertas y ventanas cerradas mientras funciona.',
      'Apágalo al salir del apartamento.',
    ],
    lockTitle: '¿No responde ningún botón?',
    lock: 'Puede estar activado el bloqueo (icono del candado). Mantén pulsadas a la vez TIMER y COPY durante 3 segundos para desbloquearlo.',
  },
  en: {
    tab: 'Air conditioning',
    title: 'Air conditioning',
    model: 'Midea wall controller, KJR-120 series',
    alertTitle: 'Does it switch on or off by itself? It is scheduled',
    alert: 'If a schedule is active, press the TIMER key repeatedly until the timer icons disappear from the display. The unit is then in manual mode and you can use it normally.',
    buttonsTitle: 'Main buttons',
    buttons: {
      power: { label: 'On / off', text: 'Press ⏻ once.' },
      mode: { label: 'Mode (M)', text: 'Switches between cool, heat, dry, fan only and auto.' },
      temp: { label: 'Temperature (∨ ∧)', text: 'Raises or lowers the set temperature.' },
      fan: { label: 'Fan', text: 'Changes the fan speed; AUTO adjusts it automatically.' },
      swing: { label: 'Air direction', text: 'Starts or stops the louvre movement.' },
      timer: { label: 'TIMER', text: 'Scheduling. Press until the icons disappear to use it manually.' },
    },
    modesTitle: 'Mode icons',
    modes: '❄ COOL · ☀ HEAT · 💧 DRY · ✣ FAN only · AUTO',
    tipsTitle: 'Tips',
    tips: [
      'Recommended temperature: 24–26 °C in summer and 20–22 °C in winter.',
      'Keep doors and windows closed while it is running.',
      'Switch it off when you leave the apartment.',
    ],
    lockTitle: 'No button responds?',
    lock: 'The child lock may be on (padlock icon). Hold TIMER and COPY together for 3 seconds to unlock.',
  },
  fr: {
    tab: 'Climatisation',
    title: 'Climatisation',
    model: 'Commande murale Midea, série KJR-120',
    alertTitle: 'Elle s’allume ou s’éteint toute seule ? Elle est programmée',
    alert: 'Si une programmation est active, appuyez plusieurs fois sur la touche TIMER jusqu’à ce que les icônes de programmation disparaissent de l’écran. Elle passe alors en mode manuel.',
    buttonsTitle: 'Touches principales',
    buttons: {
      power: { label: 'Marche / arrêt', text: 'Appuyez une fois sur ⏻.' },
      mode: { label: 'Mode (M)', text: 'Froid, chaud, déshumidification, ventilation et automatique.' },
      temp: { label: 'Température (∨ ∧)', text: 'Augmente ou baisse la température souhaitée.' },
      fan: { label: 'Ventilateur', text: 'Change la vitesse ; AUTO la règle automatiquement.' },
      swing: { label: 'Direction de l’air', text: 'Active ou arrête le mouvement des volets.' },
      timer: { label: 'TIMER', text: 'Programmation. Appuyez jusqu’à ce que les icônes disparaissent pour le mode manuel.' },
    },
    modesTitle: 'Icônes du mode',
    modes: '❄ COOL = froid · ☀ HEAT = chaud · 💧 DRY = sec · ✣ FAN = ventilation · AUTO',
    tipsTitle: 'Conseils',
    tips: [
      'Température conseillée : 24–26 °C en été et 20–22 °C en hiver.',
      'Gardez portes et fenêtres fermées pendant le fonctionnement.',
      'Éteignez-la en quittant l’appartement.',
    ],
    lockTitle: 'Aucune touche ne répond ?',
    lock: 'Le verrouillage est peut-être actif (icône cadenas). Maintenez TIMER et COPY ensemble 3 secondes pour déverrouiller.',
  },
  de: {
    tab: 'Klimaanlage',
    title: 'Klimaanlage',
    model: 'Midea-Wandbedienteil, Serie KJR-120',
    alertTitle: 'Schaltet sie sich von selbst ein oder aus? Sie ist programmiert',
    alert: 'Ist ein Zeitprogramm aktiv, drücken Sie die Taste TIMER mehrmals, bis die Timer-Symbole im Display verschwinden. Dann läuft das Gerät im manuellen Betrieb.',
    buttonsTitle: 'Wichtigste Tasten',
    buttons: {
      power: { label: 'Ein / Aus', text: 'Einmal ⏻ drücken.' },
      mode: { label: 'Modus (M)', text: 'Kühlen, Heizen, Entfeuchten, nur Lüften und Automatik.' },
      temp: { label: 'Temperatur (∨ ∧)', text: 'Erhöht oder senkt die Wunschtemperatur.' },
      fan: { label: 'Lüfter', text: 'Ändert die Lüfterstufe; AUTO regelt sie selbst.' },
      swing: { label: 'Luftrichtung', text: 'Startet oder stoppt die Lamellenbewegung.' },
      timer: { label: 'TIMER', text: 'Zeitprogramm. Drücken, bis die Symbole verschwinden, für manuellen Betrieb.' },
    },
    modesTitle: 'Modus-Symbole',
    modes: '❄ COOL = Kühlen · ☀ HEAT = Heizen · 💧 DRY = Entfeuchten · ✣ FAN = Lüften · AUTO',
    tipsTitle: 'Tipps',
    tips: [
      'Empfohlene Temperatur: 24–26 °C im Sommer und 20–22 °C im Winter.',
      'Türen und Fenster während des Betriebs geschlossen halten.',
      'Beim Verlassen der Wohnung ausschalten.',
    ],
    lockTitle: 'Reagiert keine Taste?',
    lock: 'Eventuell ist die Tastensperre aktiv (Schloss-Symbol). TIMER und COPY gleichzeitig 3 Sekunden gedrückt halten.',
  },
  it: {
    tab: 'Aria condizionata',
    title: 'Aria condizionata',
    model: 'Comando a parete Midea, serie KJR-120',
    alertTitle: 'Si accende o si spegne da solo? È programmato',
    alert: 'Se è attiva una programmazione, premi più volte il tasto TIMER finché le icone di programmazione spariscono dal display. Così funziona in modalità manuale.',
    buttonsTitle: 'Tasti principali',
    buttons: {
      power: { label: 'Accendi / spegni', text: 'Premi ⏻ una volta.' },
      mode: { label: 'Modalità (M)', text: 'Freddo, caldo, deumidificazione, solo ventilazione e automatico.' },
      temp: { label: 'Temperatura (∨ ∧)', text: 'Alza o abbassa la temperatura desiderata.' },
      fan: { label: 'Ventola', text: 'Cambia la velocità; AUTO la regola da sola.' },
      swing: { label: 'Direzione dell’aria', text: 'Avvia o ferma il movimento delle alette.' },
      timer: { label: 'TIMER', text: 'Programmazione. Premilo finché spariscono le icone per l’uso manuale.' },
    },
    modesTitle: 'Icone della modalità',
    modes: '❄ COOL = freddo · ☀ HEAT = caldo · 💧 DRY = deumidifica · ✣ FAN = ventola · AUTO',
    tipsTitle: 'Consigli',
    tips: [
      'Temperatura consigliata: 24–26 °C in estate e 20–22 °C in inverno.',
      'Tieni porte e finestre chiuse mentre è in funzione.',
      'Spegnilo quando esci dall’appartamento.',
    ],
    lockTitle: 'Nessun tasto risponde?',
    lock: 'Potrebbe essere attivo il blocco (icona lucchetto). Tieni premuti insieme TIMER e COPY per 3 secondi.',
  },
  zh: {
    tab: '空调',
    title: '空调',
    model: '美的（Midea）墙控器，KJR-120 系列',
    alertTitle: '空调自动开关？说明设置了定时',
    alert: '如果设置了定时程序，请反复按 TIMER 键，直到屏幕上的定时图标消失，即可切换为手动模式正常使用。',
    buttonsTitle: '主要按键',
    buttons: {
      power: { label: '开 / 关', text: '按一次 ⏻。' },
      mode: { label: '模式 (M)', text: '在制冷、制热、除湿、送风和自动之间切换。' },
      temp: { label: '温度 (∨ ∧)', text: '升高或降低设定温度。' },
      fan: { label: '风速', text: '调节风速；AUTO 为自动。' },
      swing: { label: '风向', text: '开启或停止导风板摆动。' },
      timer: { label: 'TIMER', text: '定时设置。按到图标消失即为手动模式。' },
    },
    modesTitle: '模式图标',
    modes: '❄ COOL 制冷 · ☀ HEAT 制热 · 💧 DRY 除湿 · ✣ FAN 送风 · AUTO 自动',
    tipsTitle: '小贴士',
    tips: ['建议温度：夏季 24–26 °C，冬季 20–22 °C。', '运行时请关闭门窗。', '离开公寓时请关闭空调。'],
    lockTitle: '按键没有反应？',
    lock: '可能开启了按键锁（锁形图标）。同时按住 TIMER 和 COPY 3 秒即可解锁。',
  },
};

export const WASHER: Record<Language, WasherGuide> = {
  es: {
    tab: 'Lavadora',
    title: 'Lavadora',
    model: 'Modelo WCV 6611 BC · carga máxima 6 kg',
    stepsTitle: 'Lavar en 6 pasos',
    steps: [
      'Mete la ropa (máx. 6 kg) y cierra bien la puerta.',
      'Echa el detergente en el cajetín (ver abajo).',
      'Gira el mando hasta el programa que quieras.',
      'Si quieres, baja el centrifugado con el botón de velocidad.',
      'Pulsa Inicio/Pausa (▶‖). La puerta se bloquea.',
      'Al terminar se enciende «End». Espera a que se apague la luz del candado, gira el mando a Off y saca la ropa.',
    ],
    drawerTitle: 'Cajetín del detergente',
    drawer: [
      { tag: 'I', text: 'Prelavado (solo programas con prelavado).' },
      { tag: 'II', text: 'Lavado principal: aquí va el detergente.' },
      { tag: '✿', text: 'Suavizante.' },
    ],
    programsTitle: 'Programas más útiles',
    programs: [
      { name: 'Mini 30° (Mini)', detail: '30 °C · 28 min', note: 'Ropa poco sucia, rápido.' },
      { name: 'Algodón 40° (Cottons)', detail: '40 °C · 180 min · 6 kg', note: 'Toallas, sábanas, ropa de diario.' },
      { name: 'Algodón Eco 40° (Cottons Eco)', detail: '40 °C · 178 min · 3 kg', note: 'Gasta menos energía.' },
      { name: 'Sintéticos 40° (Synthetics)', detail: '40 °C · 120 min · 2,5 kg', note: 'Camisetas, mezclas, ropa deportiva.' },
      { name: 'Camisas (Shirts)', detail: '40 °C · 80 min · 2,5 kg', note: 'Menos arrugas.' },
      { name: 'Lana / A mano (Wool)', detail: '40 °C · 65 min · 1,5 kg', note: 'Prendas delicadas.' },
      { name: 'Centrifugado + Desagüe (Spin + Pump)', detail: '—', note: 'Escurre la ropa o vacía el agua.' },
    ],
    tipsTitle: 'Bueno saber',
    tips: [
      'Para añadir ropa: pulsa Inicio/Pausa y espera a que se apague la luz del candado antes de abrir.',
      'Para cancelar: gira el mando a otro programa. El agua no se vacía; usa «Spin + Pump» para desaguar.',
      'Si los botones no responden, puede estar el bloqueo infantil: mantén pulsados a la vez velocidad e inicio diferido unos segundos.',
    ],
  },
  en: {
    tab: 'Washing machine',
    title: 'Washing machine',
    model: 'Model WCV 6611 BC · max. load 6 kg',
    stepsTitle: 'Washing in 6 steps',
    steps: [
      'Load the laundry (max. 6 kg) and close the door firmly.',
      'Add detergent to the drawer (see below).',
      'Turn the knob to the programme you want.',
      'Optionally lower the spin speed with the speed button.',
      'Press Start/Pause (▶‖). The door locks.',
      'When “End” lights up, wait for the lock light to go off, turn the knob to Off and take out the laundry.',
    ],
    drawerTitle: 'Detergent drawer',
    drawer: [
      { tag: 'I', text: 'Prewash (prewash programmes only).' },
      { tag: 'II', text: 'Main wash: put the detergent here.' },
      { tag: '✿', text: 'Fabric softener.' },
    ],
    programsTitle: 'Most useful programmes',
    programs: [
      { name: 'Mini 30°', detail: '30 °C · 28 min', note: 'Lightly soiled clothes, quick.' },
      { name: 'Cottons 40°', detail: '40 °C · 180 min · 6 kg', note: 'Towels, sheets, everyday clothes.' },
      { name: 'Cottons Eco 40°', detail: '40 °C · 178 min · 3 kg', note: 'Uses less energy.' },
      { name: 'Synthetics 40°', detail: '40 °C · 120 min · 2.5 kg', note: 'T-shirts, blends, sportswear.' },
      { name: 'Shirts', detail: '40 °C · 80 min · 2.5 kg', note: 'Fewer wrinkles.' },
      { name: 'Wool / Hand wash', detail: '40 °C · 65 min · 1.5 kg', note: 'Delicate garments.' },
      { name: 'Spin + Pump', detail: '—', note: 'Spins the laundry or drains the water.' },
    ],
    tipsTitle: 'Good to know',
    tips: [
      'To add laundry: press Start/Pause and wait for the lock light to go off before opening.',
      'To cancel: turn the knob to another programme. Water is not drained; use “Spin + Pump” to drain it.',
      'If the buttons do not respond, the child lock may be on: hold the speed and delayed-start buttons together for a few seconds.',
    ],
  },
  fr: {
    tab: 'Lave-linge',
    title: 'Lave-linge',
    model: 'Modèle WCV 6611 BC · charge max. 6 kg',
    stepsTitle: 'Laver en 6 étapes',
    steps: [
      'Chargez le linge (6 kg max.) et fermez bien la porte.',
      'Mettez la lessive dans le bac (voir ci-dessous).',
      'Tournez le bouton sur le programme souhaité.',
      'Si besoin, réduisez l’essorage avec la touche vitesse.',
      'Appuyez sur Départ/Pause (▶‖). La porte se verrouille.',
      'Quand « End » s’allume, attendez que le voyant cadenas s’éteigne, mettez le bouton sur Off et sortez le linge.',
    ],
    drawerTitle: 'Bac à lessive',
    drawer: [
      { tag: 'I', text: 'Prélavage (programmes avec prélavage seulement).' },
      { tag: 'II', text: 'Lavage principal : mettez la lessive ici.' },
      { tag: '✿', text: 'Adoucissant.' },
    ],
    programsTitle: 'Programmes les plus utiles',
    programs: [
      { name: 'Mini 30°', detail: '30 °C · 28 min', note: 'Linge peu sale, rapide.' },
      { name: 'Coton 40° (Cottons)', detail: '40 °C · 180 min · 6 kg', note: 'Serviettes, draps, linge courant.' },
      { name: 'Coton Eco 40° (Cottons Eco)', detail: '40 °C · 178 min · 3 kg', note: 'Consomme moins d’énergie.' },
      { name: 'Synthétiques 40° (Synthetics)', detail: '40 °C · 120 min · 2,5 kg', note: 'T-shirts, mélanges, sport.' },
      { name: 'Chemises (Shirts)', detail: '40 °C · 80 min · 2,5 kg', note: 'Moins de plis.' },
      { name: 'Laine / Main (Wool)', detail: '40 °C · 65 min · 1,5 kg', note: 'Linge délicat.' },
      { name: 'Essorage + Vidange (Spin + Pump)', detail: '—', note: 'Essore ou vide l’eau.' },
    ],
    tipsTitle: 'Bon à savoir',
    tips: [
      'Pour ajouter du linge : appuyez sur Départ/Pause et attendez que le voyant cadenas s’éteigne.',
      'Pour annuler : tournez le bouton sur un autre programme. L’eau n’est pas vidée ; utilisez « Spin + Pump ».',
      'Si les touches ne répondent pas, la sécurité enfant est peut-être active : maintenez vitesse et départ différé quelques secondes.',
    ],
  },
  de: {
    tab: 'Waschmaschine',
    title: 'Waschmaschine',
    model: 'Modell WCV 6611 BC · max. 6 kg',
    stepsTitle: 'Waschen in 6 Schritten',
    steps: [
      'Wäsche einfüllen (max. 6 kg) und Tür fest schließen.',
      'Waschmittel in die Schublade geben (siehe unten).',
      'Drehknopf auf das gewünschte Programm stellen.',
      'Bei Bedarf Schleuderdrehzahl mit der Drehzahltaste senken.',
      'Start/Pause (▶‖) drücken. Die Tür wird verriegelt.',
      'Wenn „End“ leuchtet, warten bis die Schloss-Lampe erlischt, Knopf auf Off drehen und Wäsche entnehmen.',
    ],
    drawerTitle: 'Waschmittelschublade',
    drawer: [
      { tag: 'I', text: 'Vorwäsche (nur Programme mit Vorwäsche).' },
      { tag: 'II', text: 'Hauptwäsche: hier das Waschmittel einfüllen.' },
      { tag: '✿', text: 'Weichspüler.' },
    ],
    programsTitle: 'Die nützlichsten Programme',
    programs: [
      { name: 'Mini 30°', detail: '30 °C · 28 Min.', note: 'Leicht verschmutzt, schnell.' },
      { name: 'Baumwolle 40° (Cottons)', detail: '40 °C · 180 Min. · 6 kg', note: 'Handtücher, Bettwäsche, Alltagskleidung.' },
      { name: 'Baumwolle Eco 40° (Cottons Eco)', detail: '40 °C · 178 Min. · 3 kg', note: 'Spart Energie.' },
      { name: 'Synthetik 40° (Synthetics)', detail: '40 °C · 120 Min. · 2,5 kg', note: 'T-Shirts, Mischgewebe, Sportkleidung.' },
      { name: 'Hemden (Shirts)', detail: '40 °C · 80 Min. · 2,5 kg', note: 'Weniger Falten.' },
      { name: 'Wolle / Handwäsche (Wool)', detail: '40 °C · 65 Min. · 1,5 kg', note: 'Empfindliche Wäsche.' },
      { name: 'Schleudern + Abpumpen (Spin + Pump)', detail: '—', note: 'Schleudert oder pumpt Wasser ab.' },
    ],
    tipsTitle: 'Gut zu wissen',
    tips: [
      'Wäsche nachlegen: Start/Pause drücken und warten, bis die Schloss-Lampe erlischt.',
      'Abbrechen: Knopf auf ein anderes Programm drehen. Das Wasser bleibt drin; mit „Spin + Pump“ abpumpen.',
      'Reagieren die Tasten nicht, ist evtl. die Kindersicherung aktiv: Drehzahl- und Startzeitvorwahl-Taste einige Sekunden gemeinsam halten.',
    ],
  },
  it: {
    tab: 'Lavatrice',
    title: 'Lavatrice',
    model: 'Modello WCV 6611 BC · carico max. 6 kg',
    stepsTitle: 'Lavare in 6 passi',
    steps: [
      'Carica il bucato (max. 6 kg) e chiudi bene l’oblò.',
      'Metti il detersivo nel cassetto (vedi sotto).',
      'Gira la manopola sul programma desiderato.',
      'Se vuoi, riduci la centrifuga con il tasto velocità.',
      'Premi Avvio/Pausa (▶‖). L’oblò si blocca.',
      'Quando si accende «End», aspetta che la spia del lucchetto si spenga, gira la manopola su Off e togli il bucato.',
    ],
    drawerTitle: 'Cassetto del detersivo',
    drawer: [
      { tag: 'I', text: 'Prelavaggio (solo programmi con prelavaggio).' },
      { tag: 'II', text: 'Lavaggio principale: qui va il detersivo.' },
      { tag: '✿', text: 'Ammorbidente.' },
    ],
    programsTitle: 'Programmi più utili',
    programs: [
      { name: 'Mini 30°', detail: '30 °C · 28 min', note: 'Capi poco sporchi, veloce.' },
      { name: 'Cotone 40° (Cottons)', detail: '40 °C · 180 min · 6 kg', note: 'Asciugamani, lenzuola, capi di tutti i giorni.' },
      { name: 'Cotone Eco 40° (Cottons Eco)', detail: '40 °C · 178 min · 3 kg', note: 'Consuma meno energia.' },
      { name: 'Sintetici 40° (Synthetics)', detail: '40 °C · 120 min · 2,5 kg', note: 'Magliette, misti, abbigliamento sportivo.' },
      { name: 'Camicie (Shirts)', detail: '40 °C · 80 min · 2,5 kg', note: 'Meno pieghe.' },
      { name: 'Lana / A mano (Wool)', detail: '40 °C · 65 min · 1,5 kg', note: 'Capi delicati.' },
      { name: 'Centrifuga + Scarico (Spin + Pump)', detail: '—', note: 'Centrifuga o scarica l’acqua.' },
    ],
    tipsTitle: 'Utile sapere',
    tips: [
      'Per aggiungere capi: premi Avvio/Pausa e aspetta che la spia del lucchetto si spenga.',
      'Per annullare: gira la manopola su un altro programma. L’acqua non viene scaricata; usa «Spin + Pump».',
      'Se i tasti non rispondono, può essere attivo il blocco bambini: tieni premuti insieme velocità e partenza ritardata per qualche secondo.',
    ],
  },
  zh: {
    tab: '洗衣机',
    title: '洗衣机',
    model: '型号 WCV 6611 BC · 最大洗涤量 6 公斤',
    stepsTitle: '六步完成洗衣',
    steps: [
      '放入衣物（最多 6 公斤），关紧机门。',
      '在洗涤剂盒中加入洗衣液（见下方）。',
      '旋转旋钮选择所需程序。',
      '如需要，用转速按键降低脱水转速。',
      '按启动/暂停（▶‖），机门会锁定。',
      '显示 “End” 后，等锁形指示灯熄灭，将旋钮转到 Off，取出衣物。',
    ],
    drawerTitle: '洗涤剂盒',
    drawer: [
      { tag: 'I', text: '预洗（仅用于带预洗的程序）。' },
      { tag: 'II', text: '主洗：洗衣液放在这里。' },
      { tag: '✿', text: '柔顺剂。' },
    ],
    programsTitle: '常用程序',
    programs: [
      { name: 'Mini 30°', detail: '30 °C · 28 分钟', note: '轻度脏污，快速。' },
      { name: '棉织物 40° (Cottons)', detail: '40 °C · 180 分钟 · 6 公斤', note: '毛巾、床单、日常衣物。' },
      { name: '棉织物节能 40° (Cottons Eco)', detail: '40 °C · 178 分钟 · 3 公斤', note: '更节能。' },
      { name: '化纤 40° (Synthetics)', detail: '40 °C · 120 分钟 · 2.5 公斤', note: 'T 恤、混纺、运动服。' },
      { name: '衬衫 (Shirts)', detail: '40 °C · 80 分钟 · 2.5 公斤', note: '减少褶皱。' },
      { name: '羊毛 / 手洗 (Wool)', detail: '40 °C · 65 分钟 · 1.5 公斤', note: '精细衣物。' },
      { name: '脱水 + 排水 (Spin + Pump)', detail: '—', note: '脱水或排空水。' },
    ],
    tipsTitle: '小贴士',
    tips: [
      '中途加衣：按启动/暂停，等锁形指示灯熄灭后再开门。',
      '取消程序：把旋钮转到其他程序。水不会自动排出，请用 “Spin + Pump” 排水。',
      '按键无反应时可能开启了童锁：同时按住转速键和预约键几秒钟。',
    ],
  },
};
