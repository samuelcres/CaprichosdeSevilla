# Caprichos de Sevilla - Guest Web App

## Overview

Caprichos de Sevilla is a multilingual web application designed to serve as a virtual host for guests staying at two tourist apartments in Seville, Spain (Capricho de Ibarra and Capricho de Quevedo). It provides essential information on transportation, check-in procedures, WiFi access, local tourism recommendations, and emergency contacts in six languages (Spanish, English, French, German, Italian, and Chinese). The application features an apartment selection landing page (default multi-apartment mode) or can be configured for a single apartment. Key capabilities include interactive maps, detailed restaurant and tourist recommendations, and comprehensive check-in instructions. The project aims to enhance the guest experience by providing a centralized, accessible information hub, reducing the need for direct staff interaction for common queries.

## Recent Changes

**October 13, 2025:**
- Added URL parameter support for direct apartment access. Users can now access a specific apartment directly using URL parameters: `?apartment=ibarra` for Capricho de Ibarra or `?apartment=quevedo` for Capricho de Quevedo. Priority order: URL parameter > environment variable > apartment selector. This allows sharing direct links to specific apartments.

**October 12, 2025:**
- Added descriptive subtitles to all main menu options. Each menu card now displays a 2-3 word subtitle below the title describing the section's content (e.g., Transport: "Llegadas · Salidas · Movilidad" / "Arrivals · Departures · Mobility"). Subtitles are fully translated in all 6 languages and use muted-foreground color for visual hierarchy.
- Updated luggage storage options for Capricho de Ibarra apartment. Removed Naturanda (Calle Francos) and Safe Luggage. Updated The Pink Lockers booking URL to https://www.thepinklockers.com/booking-process/1. Updated LOCK & enjoy! - Luggage Storage in Alfalfa (C. Águilas, 27) booking URL to https://reserva.lockandenjoy.com/reserva/Sevilla/Alfalfa/elegir-fechas with language-specific parameters. Added real locker images for both locations.
- Updated luggage storage options for Capricho de Quevedo apartment. Removed all Naturanda locations (Trajano, Alfonso XII, Francos). Added Lockers Sevilla (C. Regina, 13, 5 min walk, check website for pricing, https://lockersevilla.com/regina/) and LOCK & enjoy! - Duque (C. Teniente Borges, 9, next to parking, 7 min walk, check website for pricing, https://reserva.lockandenjoy.com/reserva/Sevilla/Duque/elegir-fechas).
- Added visual locker images to Check-in page. Each luggage storage option now displays a photo of lockers on the right side of the card, matching the layout of check-in step images. Images are responsive (full width on mobile, fixed width on desktop).
- Added external event resource buttons to Events page. Two buttons link to OnSevilla.com and VisitaSevilla.es for additional event information. Section titled "Más eventos en Sevilla" (translated in all 6 languages), buttons open in new tabs with responsive layout (stacked on mobile, side-by-side on desktop).
- Added Guide button and dialog to apartment selection page and main menu pages. Button positioned in header alongside language selector. Dialog displays tree structure of all available app sections (Transport, Check-in, Wi-Fi, Tourism, Events, Contact) with color-coded icons and descriptions. Fully translated in all 6 languages. Available on both apartment selector page and main menu pages for Capricho de Ibarra and Capricho de Quevedo.
- Updated Google Maps iframe in Tourism page with new embed URL (https://www.google.com/maps?q=https://maps.app.goo.gl/vLTVmja9G4RWvX1i8&output=embed). Set fixed height to 450px with lazy loading. Added fallback link below map ("Ver en Google Maps" / "View on Google Maps" / etc.) that opens in new tab, fully translated in all 6 languages.
- Added personalized Google Maps recommendations section to Tourism page Map tab. Displays a screenshot image of Google Maps showing curated restaurant recommendations, along with a button labeled "Recomendaciones basadas en nuestra propia experiencia" (translated in all 6 languages) that links to https://maps.app.goo.gl/vLTVmja9G4RWvX1i8. The Map tab now shows only this personalized recommendations image and button, replacing the previous embedded Google Maps iframe. Available in both Capricho de Ibarra and Capricho de Quevedo sections.
- **Restructured Recommended Visits section based on PDF guide (Guía_de_Viaje_Sevilla).** Reduced from 43 generic visits to 13 curated key locations with complete, practical information extracted from the official guide:
  - **8 accordion categories:** Monumentos (4 visits), Museos (2), Naturaleza y Jardines (1), Barrios históricos (2), Iglesias (1), Arquitectura moderna (1), Gastronomía típica (1), Cultura y Tradiciones (1)
  - **13 curated locations:** Cathedral, Real Alcázar, Archive of Indies, Gold Tower, Fine Arts Museum, Flamenco Museum, María Luisa Park, Santa Cruz neighborhood, Triana, Macarena Basilica, Metropol Parasol (Las Setas), Traditional Markets, Flamenco Tablaos
  - **Complete visit details:** Each location displays photo (responsive layout), name, description, schedule (Clock icon), price (Euro icon), walking distance from apartment (Navigation icon), phone number (clickable tel: link), location button (opens Google Maps), and website button (when available)
  - **Data structure change:** Converted visitItems in i18n.ts from array-based to object-based with visit IDs as keys (e.g., catedral: {name, description}) for consistent multilingual access across all 6 languages
  - **New translation keys:** Added schedule, price, phone, location labels in all 6 languages for consistent UI labeling
  - **Updated with specific authentic images:** Replaced generic stock photos with location-specific images - 9 custom uploaded images: Seville Cathedral with Giralda tower, Real Alcázar royal palace, Archivo General de Indias historic building, Torre del Oro golden tower, Museo de Bellas Artes interior gallery, Museo del Baile Flamenco performance, Basílica de la Macarena facade, Parque de María Luisa with pavilion and pond, and flamenco tablao dance performance. All images are high-resolution and provide authentic visual representation of Seville landmarks

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

- **Framework:** React 18 with TypeScript, using Vite for development and build.
- **Routing:** Wouter.
- **UI/UX:** Mobile-first responsive design using Tailwind CSS. Utilizes `shadcn/ui` (New York style) built on Radix UI, with a custom Seville-inspired color palette (terracotta/burnt orange). Typography includes Montserrat (headings) and Inter (body). Supports light and dark modes.
- **State Management:** React Context API for global state (language, apartment), TanStack Query for server state, and React hooks for local component state.
- **Internationalization:** Custom implementation with translation objects for six languages, ensuring type-safe language and apartment selection.
- **Design Patterns:** Emphasizes component composition, wrapper components for routing and data fetching, separation of concerns (presentational/container), and consistent page header navigation.

### Backend

- **Server:** Express.js with TypeScript, integrated with Vite middleware for HMR in development and esbuild for production.
- **Storage:** Employs an in-memory `MemStorage` class, designed for future integration with persistent databases like PostgreSQL using Drizzle ORM.
- **Development Tools:** Custom Vite integration, request/response logging, and error handling middleware.

### Features

- **Deployment Modes:** Supports multi-apartment (default) and single-apartment modes via `VITE_APARTMENT` environment variable.
- **Content:** Includes dynamic check-in instructions with visual aids, luggage storage recommendations (accordion with nearby locker locations before check-in), comprehensive parking recommendations with Google Maps integration, detailed restaurant listings with category icons, and an interactive events calendar.
- **Navigation:** Global language selector, "scroll to top" on page navigation, apartment-specific backgrounds, watermarks, and visible apartment name/image in headers.
- **Emergency Contacts:** Dedicated section with critical local emergency numbers.

## External Dependencies

- **Database (configured for future use):** Drizzle ORM (for PostgreSQL), Neon Database serverless driver, `drizzle-kit`, `drizzle-zod`.
- **Third-Party Services:** Google Maps, YouTube embed, WhatsApp Business, external links to transportation services (e.g., TUSSAM).
- **Asset Management:** Various images (logos, QR codes, apartment photos, stock images), restaurant data in local TypeScript modules, real location photographs for tourist visits, and events data.
- **UI Libraries:** Radix UI primitives, Lucide React (iconography), Tailwind CSS, `date-fns`, Embla Carousel.