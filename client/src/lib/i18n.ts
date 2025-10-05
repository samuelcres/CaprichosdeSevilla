export type Language = 'es' | 'en' | 'fr' | 'de' | 'it';
export type Apartment = 'ibarra' | 'quevedo';

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
];

export const translations = {
  es: {
    welcome: {
      title: 'Bienvenido a',
      subtitle: 'Selecciona tu idioma preferido',
      continue: 'Continuar',
    },
    apartment: {
      title: 'Selecciona tu apartamento',
      ibarra: 'Capricho de Ibarra',
      quevedo: 'Capricho de Quevedo',
    },
    menu: {
      transport: 'Transporte',
      checkin: 'Check-in',
      wifi: 'Wi-Fi',
      tourism: 'Turismo',
      contact: 'Contacto',
    },
    transport: {
      title: 'Transporte',
      arrival: 'Llegada',
      departure: 'Salida',
      fromAirport: 'Desde el Aeropuerto de Sevilla (SVQ)',
      toAirport: 'Al Aeropuerto de Sevilla (SVQ)',
      bus: {
        title: 'Autobús Línea EA',
        price: 'Precio: 4€',
        schedule: 'Cada 30 min (aprox.)',
        stopIbarra: 'Parada: Puerta Jerez',
        stopQuevedo: 'Parada: Plaza Nueva',
        link: 'Más información TUSSAM',
      },
      taxi: {
        title: 'Taxi',
        price: 'Tarifa fija: 22-25€',
        addressIbarra: 'Dirección: Calle Conde de Ibarra, 11-13, 41004 Sevilla',
        addressQuevedo: 'Dirección: Calle Quevedo, 11, 41001 Sevilla',
      },
      vtc: {
        title: 'VTC (Uber/Cabify)',
        description: 'Servicios disponibles en el aeropuerto',
        uber: 'Abrir Uber',
        cabify: 'Abrir Cabify',
      },
      transfer: {
        title: 'Transfer Privado',
        description: 'Reserve un transfer privado',
        button: 'Reservar Transfer',
      },
      parking: {
        title: 'Parking',
        description: 'Reserve parking cercano',
        button: 'Reservar Parking',
      },
    },
    checkin: {
      title: 'Instrucciones de Check-in',
      step: 'Paso',
      ibarra: {
        step1: {
          title: 'Llegar a la dirección',
          description: 'Calle Conde de Ibarra, 11-13, Sevilla',
        },
        step2: {
          title: 'Acceso remoto',
          description: 'Recibirás un enlace por Email o WhatsApp para la apertura de puertas.',
        },
        step3: {
          title: 'Abrir portal',
          description: "Pulsa el botón 'Portal calle' en el enlace. Se activará a las 15:00h del día de llegada.",
        },
        step4: {
          title: 'Localizar apartamento',
          description: 'Apartamento 14, planta baja, al fondo a la izquierda.',
        },
        step5: {
          title: 'Abrir apartamento',
          description: "Frente a la puerta, pulsa 'Home door nº 14' en el enlace.",
        },
        step6: {
          title: 'Salida',
          description: 'Dentro encontrarás un botón para abrir la puerta manualmente.',
        },
      },
      quevedo: {
        step1: {
          title: 'Llegar a la dirección',
          description: 'Calle Quevedo, 11, Sevilla',
        },
        step2: {
          title: 'Acceso remoto',
          description: 'Recibirás un enlace por Email o WhatsApp para la apertura de puertas.',
        },
        step3: {
          title: 'Abrir portal',
          description: "Pulsa el botón 'Portal Calle' en el enlace. Se activará a las 15:00h del día de llegada.",
        },
        step4: {
          title: 'Localizar apartamento',
          description: 'Al entrar, gira a la derecha. Planta baja, puerta derecha.',
        },
        step5: {
          title: 'Abrir apartamento',
          description: "Frente a la puerta, pulsa 'Home door Low R' en el enlace.",
        },
        step6: {
          title: 'Salida',
          description: 'Dentro encontrarás un botón para abrir la puerta manualmente. Recuerda cerrar la puerta del portal.',
        },
      },
      warning: {
        title: 'Importante',
        description: 'El enlace es válido hasta las 11:00h del día de salida. No pulses el botón si no estás físicamente en la puerta.',
      },
    },
    wifi: {
      title: 'Conexión Wi-Fi',
      network: 'Red',
      password: 'Contraseña',
      copy: 'Copiar',
      copied: 'Copiado',
      scanQR: 'O escanea el código QR',
      ibarra: {
        ssid: 'CaprichoIbarra',
        password: '1113Ibarra1113',
      },
      quevedo: {
        ssid: 'vodafoneBA3017',
        password: 'KRNPAX7FXAXS55A5',
      },
    },
    tourism: {
      title: 'Turismo y Recomendaciones',
      activities: 'Visitas Recomendadas',
      map: 'Mapa con Recomendaciones',
      restaurants: 'Recomendaciones Gastronómicas',
      distance: 'min a pie',
      viewMap: 'Ver en mapa',
    },
    contact: {
      title: 'Contacto y Ayuda',
      description: '¿Necesitas ayuda? Estamos aquí para ti',
      whatsapp: 'WhatsApp',
      email: 'Email',
      whatsappText: 'Contactar por WhatsApp',
      emailText: 'Enviar Email',
    },
    common: {
      back: 'Volver',
      home: 'Inicio',
    },
  },
  en: {
    welcome: {
      title: 'Welcome to',
      subtitle: 'Select your preferred language',
      continue: 'Continue',
    },
    apartment: {
      title: 'Select your apartment',
      ibarra: 'Capricho de Ibarra',
      quevedo: 'Capricho de Quevedo',
    },
    menu: {
      transport: 'Transport',
      checkin: 'Check-in',
      wifi: 'Wi-Fi',
      tourism: 'Tourism',
      contact: 'Contact',
    },
    transport: {
      title: 'Transport',
      arrival: 'Arrival',
      departure: 'Departure',
      fromAirport: 'From Seville Airport (SVQ)',
      toAirport: 'To Seville Airport (SVQ)',
      bus: {
        title: 'Bus Line EA',
        price: 'Price: 4€',
        schedule: 'Every 30 min (approx.)',
        stopIbarra: 'Stop: Puerta Jerez',
        stopQuevedo: 'Stop: Plaza Nueva',
        link: 'More info TUSSAM',
      },
      taxi: {
        title: 'Taxi',
        price: 'Fixed rate: 22-25€',
        addressIbarra: 'Address: Calle Conde de Ibarra, 11-13, 41004 Seville',
        addressQuevedo: 'Address: Calle Quevedo, 11, 41001 Seville',
      },
      vtc: {
        title: 'VTC (Uber/Cabify)',
        description: 'Services available at the airport',
        uber: 'Open Uber',
        cabify: 'Open Cabify',
      },
      transfer: {
        title: 'Private Transfer',
        description: 'Book a private transfer',
        button: 'Book Transfer',
      },
      parking: {
        title: 'Parking',
        description: 'Book nearby parking',
        button: 'Book Parking',
      },
    },
    checkin: {
      title: 'Check-in Instructions',
      step: 'Step',
      ibarra: {
        step1: {
          title: 'Arrive at address',
          description: 'Calle Conde de Ibarra, 11-13, Seville',
        },
        step2: {
          title: 'Remote access',
          description: 'You will receive a link via Email or WhatsApp for door access.',
        },
        step3: {
          title: 'Open main door',
          description: "Press 'Portal calle' button in the link. Available from 3:00 PM on arrival day.",
        },
        step4: {
          title: 'Locate apartment',
          description: 'Apartment 14, ground floor, back left.',
        },
        step5: {
          title: 'Open apartment',
          description: "At the door, press 'Home door nº 14' in the link.",
        },
        step6: {
          title: 'Exit',
          description: 'Inside you will find a button to open the door manually.',
        },
      },
      quevedo: {
        step1: {
          title: 'Arrive at address',
          description: 'Calle Quevedo, 11, Seville',
        },
        step2: {
          title: 'Remote access',
          description: 'You will receive a link via Email or WhatsApp for door access.',
        },
        step3: {
          title: 'Open main door',
          description: "Press 'Portal Calle' button in the link. Available from 3:00 PM on arrival day.",
        },
        step4: {
          title: 'Locate apartment',
          description: 'Turn right after entering. Ground floor, right door.',
        },
        step5: {
          title: 'Open apartment',
          description: "At the door, press 'Home door Low R' in the link.",
        },
        step6: {
          title: 'Exit',
          description: 'Inside you will find a button to open the door manually. Remember to close the main door.',
        },
      },
      warning: {
        title: 'Important',
        description: 'The link is valid until 11:00 AM on departure day. Do not press the button if you are not physically at the door.',
      },
    },
    wifi: {
      title: 'Wi-Fi Connection',
      network: 'Network',
      password: 'Password',
      copy: 'Copy',
      copied: 'Copied',
      scanQR: 'Or scan QR code',
      ibarra: {
        ssid: 'CaprichoIbarra',
        password: '1113Ibarra1113',
      },
      quevedo: {
        ssid: 'vodafoneBA3017',
        password: 'KRNPAX7FXAXS55A5',
      },
    },
    tourism: {
      title: 'Tourism & Recommendations',
      activities: 'Recommended Activities',
      map: 'Map with Recommendations',
      restaurants: 'Restaurant Recommendations',
      distance: 'min walk',
      viewMap: 'View on map',
    },
    contact: {
      title: 'Contact & Help',
      description: 'Need help? We are here for you',
      whatsapp: 'WhatsApp',
      email: 'Email',
      whatsappText: 'Contact via WhatsApp',
      emailText: 'Send Email',
    },
    common: {
      back: 'Back',
      home: 'Home',
    },
  },
  fr: {
    welcome: {
      title: 'Bienvenue à',
      subtitle: 'Sélectionnez votre langue préférée',
      continue: 'Continuer',
    },
    apartment: {
      title: 'Sélectionnez votre appartement',
      ibarra: 'Capricho de Ibarra',
      quevedo: 'Capricho de Quevedo',
    },
    menu: {
      transport: 'Transport',
      checkin: 'Enregistrement',
      wifi: 'Wi-Fi',
      tourism: 'Tourisme',
      contact: 'Contact',
    },
    transport: {
      title: 'Transport',
      arrival: 'Arrivée',
      departure: 'Départ',
      fromAirport: "Depuis l'aéroport de Séville (SVQ)",
      toAirport: "Vers l'aéroport de Séville (SVQ)",
      bus: {
        title: 'Bus Ligne EA',
        price: 'Prix: 4€',
        schedule: 'Toutes les 30 min (env.)',
        stopIbarra: 'Arrêt: Puerta Jerez',
        stopQuevedo: 'Arrêt: Plaza Nueva',
        link: 'Plus d\'infos TUSSAM',
      },
      taxi: {
        title: 'Taxi',
        price: 'Tarif fixe: 22-25€',
        addressIbarra: 'Adresse: Calle Conde de Ibarra, 11-13, 41004 Séville',
        addressQuevedo: 'Adresse: Calle Quevedo, 11, 41001 Séville',
      },
      vtc: {
        title: 'VTC (Uber/Cabify)',
        description: 'Services disponibles à l\'aéroport',
        uber: 'Ouvrir Uber',
        cabify: 'Ouvrir Cabify',
      },
      transfer: {
        title: 'Transfer Privé',
        description: 'Réserver un transfer privé',
        button: 'Réserver Transfer',
      },
      parking: {
        title: 'Parking',
        description: 'Réserver un parking proche',
        button: 'Réserver Parking',
      },
    },
    checkin: {
      title: 'Instructions d\'enregistrement',
      step: 'Étape',
      ibarra: {
        step1: {
          title: 'Arriver à l\'adresse',
          description: 'Calle Conde de Ibarra, 11-13, Séville',
        },
        step2: {
          title: 'Accès à distance',
          description: 'Vous recevrez un lien par email ou WhatsApp pour l\'ouverture des portes.',
        },
        step3: {
          title: 'Ouvrir le portail',
          description: "Appuyez sur 'Portal calle' dans le lien. Disponible à partir de 15h le jour d'arrivée.",
        },
        step4: {
          title: 'Localiser l\'appartement',
          description: 'Appartement 14, rez-de-chaussée, au fond à gauche.',
        },
        step5: {
          title: 'Ouvrir l\'appartement',
          description: "Devant la porte, appuyez sur 'Home door nº 14' dans le lien.",
        },
        step6: {
          title: 'Sortie',
          description: 'À l\'intérieur, vous trouverez un bouton pour ouvrir la porte manuellement.',
        },
      },
      quevedo: {
        step1: {
          title: 'Arriver à l\'adresse',
          description: 'Calle Quevedo, 11, Séville',
        },
        step2: {
          title: 'Accès à distance',
          description: 'Vous recevrez un lien par email ou WhatsApp pour l\'ouverture des portes.',
        },
        step3: {
          title: 'Ouvrir le portail',
          description: "Appuyez sur 'Portal Calle' dans le lien. Disponible à partir de 15h le jour d'arrivée.",
        },
        step4: {
          title: 'Localiser l\'appartement',
          description: 'Tournez à droite en entrant. Rez-de-chaussée, porte de droite.',
        },
        step5: {
          title: 'Ouvrir l\'appartement',
          description: "Devant la porte, appuyez sur 'Home door Low R' dans le lien.",
        },
        step6: {
          title: 'Sortie',
          description: 'À l\'intérieur, vous trouverez un bouton pour ouvrir la porte manuellement. N\'oubliez pas de fermer le portail.',
        },
      },
      warning: {
        title: 'Important',
        description: 'Le lien est valide jusqu\'à 11h le jour du départ. N\'appuyez pas sur le bouton si vous n\'êtes pas physiquement à la porte.',
      },
    },
    wifi: {
      title: 'Connexion Wi-Fi',
      network: 'Réseau',
      password: 'Mot de passe',
      copy: 'Copier',
      copied: 'Copié',
      scanQR: 'Ou scanner le code QR',
      ibarra: {
        ssid: 'CaprichoIbarra',
        password: '1113Ibarra1113',
      },
      quevedo: {
        ssid: 'vodafoneBA3017',
        password: 'KRNPAX7FXAXS55A5',
      },
    },
    tourism: {
      title: 'Tourisme et Recommandations',
      activities: 'Activités Recommandées',
      map: 'Carte avec Recommandations',
      restaurants: 'Recommandations Gastronomiques',
      distance: 'min à pied',
      viewMap: 'Voir sur la carte',
    },
    contact: {
      title: 'Contact et Aide',
      description: 'Besoin d\'aide? Nous sommes là pour vous',
      whatsapp: 'WhatsApp',
      email: 'Email',
      whatsappText: 'Contacter via WhatsApp',
      emailText: 'Envoyer Email',
    },
    common: {
      back: 'Retour',
      home: 'Accueil',
    },
  },
  de: {
    welcome: {
      title: 'Willkommen bei',
      subtitle: 'Wählen Sie Ihre bevorzugte Sprache',
      continue: 'Weiter',
    },
    apartment: {
      title: 'Wählen Sie Ihre Wohnung',
      ibarra: 'Capricho de Ibarra',
      quevedo: 'Capricho de Quevedo',
    },
    menu: {
      transport: 'Transport',
      checkin: 'Check-in',
      wifi: 'WLAN',
      tourism: 'Tourismus',
      contact: 'Kontakt',
    },
    transport: {
      title: 'Transport',
      arrival: 'Ankunft',
      departure: 'Abreise',
      fromAirport: 'Vom Flughafen Sevilla (SVQ)',
      toAirport: 'Zum Flughafen Sevilla (SVQ)',
      bus: {
        title: 'Bus Linie EA',
        price: 'Preis: 4€',
        schedule: 'Alle 30 Min (ca.)',
        stopIbarra: 'Haltestelle: Puerta Jerez',
        stopQuevedo: 'Haltestelle: Plaza Nueva',
        link: 'Mehr Infos TUSSAM',
      },
      taxi: {
        title: 'Taxi',
        price: 'Festpreis: 22-25€',
        addressIbarra: 'Adresse: Calle Conde de Ibarra, 11-13, 41004 Sevilla',
        addressQuevedo: 'Adresse: Calle Quevedo, 11, 41001 Sevilla',
      },
      vtc: {
        title: 'VTC (Uber/Cabify)',
        description: 'Services am Flughafen verfügbar',
        uber: 'Uber öffnen',
        cabify: 'Cabify öffnen',
      },
      transfer: {
        title: 'Privater Transfer',
        description: 'Privattransfer buchen',
        button: 'Transfer buchen',
      },
      parking: {
        title: 'Parkplatz',
        description: 'Parkplatz in der Nähe buchen',
        button: 'Parkplatz buchen',
      },
    },
    checkin: {
      title: 'Check-in Anweisungen',
      step: 'Schritt',
      ibarra: {
        step1: {
          title: 'Zur Adresse kommen',
          description: 'Calle Conde de Ibarra, 11-13, Sevilla',
        },
        step2: {
          title: 'Fernzugang',
          description: 'Sie erhalten einen Link per E-Mail oder WhatsApp für den Türzugang.',
        },
        step3: {
          title: 'Haupttür öffnen',
          description: "Drücken Sie 'Portal calle' im Link. Verfügbar ab 15:00 Uhr am Anreisetag.",
        },
        step4: {
          title: 'Wohnung finden',
          description: 'Wohnung 14, Erdgeschoss, hinten links.',
        },
        step5: {
          title: 'Wohnung öffnen',
          description: "Vor der Tür drücken Sie 'Home door nº 14' im Link.",
        },
        step6: {
          title: 'Ausgang',
          description: 'Innen finden Sie einen Knopf zum manuellen Öffnen der Tür.',
        },
      },
      quevedo: {
        step1: {
          title: 'Zur Adresse kommen',
          description: 'Calle Quevedo, 11, Sevilla',
        },
        step2: {
          title: 'Fernzugang',
          description: 'Sie erhalten einen Link per E-Mail oder WhatsApp für den Türzugang.',
        },
        step3: {
          title: 'Haupttür öffnen',
          description: "Drücken Sie 'Portal Calle' im Link. Verfügbar ab 15:00 Uhr am Anreisetag.",
        },
        step4: {
          title: 'Wohnung finden',
          description: 'Nach dem Eingang rechts abbiegen. Erdgeschoss, rechte Tür.',
        },
        step5: {
          title: 'Wohnung öffnen',
          description: "Vor der Tür drücken Sie 'Home door Low R' im Link.",
        },
        step6: {
          title: 'Ausgang',
          description: 'Innen finden Sie einen Knopf zum manuellen Öffnen der Tür. Vergessen Sie nicht, die Haupttür zu schließen.',
        },
      },
      warning: {
        title: 'Wichtig',
        description: 'Der Link ist bis 11:00 Uhr am Abreisetag gültig. Drücken Sie den Knopf nicht, wenn Sie nicht physisch an der Tür sind.',
      },
    },
    wifi: {
      title: 'WLAN-Verbindung',
      network: 'Netzwerk',
      password: 'Passwort',
      copy: 'Kopieren',
      copied: 'Kopiert',
      scanQR: 'Oder QR-Code scannen',
      ibarra: {
        ssid: 'CaprichoIbarra',
        password: '1113Ibarra1113',
      },
      quevedo: {
        ssid: 'vodafoneBA3017',
        password: 'KRNPAX7FXAXS55A5',
      },
    },
    tourism: {
      title: 'Tourismus & Empfehlungen',
      activities: 'Empfohlene Aktivitäten',
      map: 'Karte mit Empfehlungen',
      restaurants: 'Gastronomie-Empfehlungen',
      distance: 'Min zu Fuß',
      viewMap: 'Auf Karte ansehen',
    },
    contact: {
      title: 'Kontakt & Hilfe',
      description: 'Brauchen Sie Hilfe? Wir sind für Sie da',
      whatsapp: 'WhatsApp',
      email: 'E-Mail',
      whatsappText: 'Per WhatsApp kontaktieren',
      emailText: 'E-Mail senden',
    },
    common: {
      back: 'Zurück',
      home: 'Startseite',
    },
  },
  it: {
    welcome: {
      title: 'Benvenuto a',
      subtitle: 'Seleziona la tua lingua preferita',
      continue: 'Continua',
    },
    apartment: {
      title: 'Seleziona il tuo appartamento',
      ibarra: 'Capricho de Ibarra',
      quevedo: 'Capricho de Quevedo',
    },
    menu: {
      transport: 'Trasporto',
      checkin: 'Check-in',
      wifi: 'Wi-Fi',
      tourism: 'Turismo',
      contact: 'Contatto',
    },
    transport: {
      title: 'Trasporto',
      arrival: 'Arrivo',
      departure: 'Partenza',
      fromAirport: 'Dall\'aeroporto di Siviglia (SVQ)',
      toAirport: 'All\'aeroporto di Siviglia (SVQ)',
      bus: {
        title: 'Autobus Linea EA',
        price: 'Prezzo: 4€',
        schedule: 'Ogni 30 min (circa)',
        stopIbarra: 'Fermata: Puerta Jerez',
        stopQuevedo: 'Fermata: Plaza Nueva',
        link: 'Maggiori info TUSSAM',
      },
      taxi: {
        title: 'Taxi',
        price: 'Tariffa fissa: 22-25€',
        addressIbarra: 'Indirizzo: Calle Conde de Ibarra, 11-13, 41004 Siviglia',
        addressQuevedo: 'Indirizzo: Calle Quevedo, 11, 41001 Siviglia',
      },
      vtc: {
        title: 'VTC (Uber/Cabify)',
        description: 'Servizi disponibili in aeroporto',
        uber: 'Apri Uber',
        cabify: 'Apri Cabify',
      },
      transfer: {
        title: 'Transfer Privato',
        description: 'Prenota un transfer privato',
        button: 'Prenota Transfer',
      },
      parking: {
        title: 'Parcheggio',
        description: 'Prenota un parcheggio vicino',
        button: 'Prenota Parcheggio',
      },
    },
    checkin: {
      title: 'Istruzioni Check-in',
      step: 'Passo',
      ibarra: {
        step1: {
          title: 'Arrivare all\'indirizzo',
          description: 'Calle Conde de Ibarra, 11-13, Siviglia',
        },
        step2: {
          title: 'Accesso remoto',
          description: 'Riceverai un link via email o WhatsApp per l\'apertura delle porte.',
        },
        step3: {
          title: 'Aprire il portone',
          description: "Premere 'Portal calle' nel link. Disponibile dalle 15:00 del giorno di arrivo.",
        },
        step4: {
          title: 'Trovare l\'appartamento',
          description: 'Appartamento 14, piano terra, in fondo a sinistra.',
        },
        step5: {
          title: 'Aprire l\'appartamento',
          description: "Davanti alla porta, premere 'Home door nº 14' nel link.",
        },
        step6: {
          title: 'Uscita',
          description: 'All\'interno troverai un pulsante per aprire la porta manualmente.',
        },
      },
      quevedo: {
        step1: {
          title: 'Arrivare all\'indirizzo',
          description: 'Calle Quevedo, 11, Siviglia',
        },
        step2: {
          title: 'Accesso remoto',
          description: 'Riceverai un link via email o WhatsApp per l\'apertura delle porte.',
        },
        step3: {
          title: 'Aprire il portone',
          description: "Premere 'Portal Calle' nel link. Disponibile dalle 15:00 del giorno di arrivo.",
        },
        step4: {
          title: 'Trovare l\'appartamento',
          description: 'Dopo l\'ingresso, girare a destra. Piano terra, porta destra.',
        },
        step5: {
          title: 'Aprire l\'appartamento',
          description: "Davanti alla porta, premere 'Home door Low R' nel link.",
        },
        step6: {
          title: 'Uscita',
          description: 'All\'interno troverai un pulsante per aprire la porta manualmente. Ricorda di chiudere il portone.',
        },
      },
      warning: {
        title: 'Importante',
        description: 'Il link è valido fino alle 11:00 del giorno di partenza. Non premere il pulsante se non sei fisicamente alla porta.',
      },
    },
    wifi: {
      title: 'Connessione Wi-Fi',
      network: 'Rete',
      password: 'Password',
      copy: 'Copia',
      copied: 'Copiato',
      scanQR: 'O scansiona il codice QR',
      ibarra: {
        ssid: 'CaprichoIbarra',
        password: '1113Ibarra1113',
      },
      quevedo: {
        ssid: 'vodafoneBA3017',
        password: 'KRNPAX7FXAXS55A5',
      },
    },
    tourism: {
      title: 'Turismo e Raccomandazioni',
      activities: 'Attività Raccomandate',
      map: 'Mappa con Raccomandazioni',
      restaurants: 'Raccomandazioni Gastronomiche',
      distance: 'min a piedi',
      viewMap: 'Vedi sulla mappa',
    },
    contact: {
      title: 'Contatto e Aiuto',
      description: 'Hai bisogno di aiuto? Siamo qui per te',
      whatsapp: 'WhatsApp',
      email: 'Email',
      whatsappText: 'Contatta via WhatsApp',
      emailText: 'Invia Email',
    },
    common: {
      back: 'Indietro',
      home: 'Home',
    },
  },
};

export function useTranslation(language: Language) {
  return translations[language];
}
