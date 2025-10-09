# Caprichos de Sevilla - Guest Web App

## Overview

Caprichos de Sevilla is a multilingual guest information web application for two tourist apartments in Seville, Spain (Capricho de Ibarra and Capricho de Quevedo). The app serves as a virtual host, providing guests with essential information about transportation, check-in procedures, WiFi access, tourism recommendations, and contact support in six languages (Spanish, English, French, German, Italian, and Chinese).

The application follows a simple navigation flow: apartment selection (main page) → main menu with five key sections. Language can be changed at any time via a globe icon dropdown available on all pages. Each section provides apartment-specific information tailored to the guest's chosen property.

**Recent Updates (October 2025):**
- Apartment selection is now the main landing page (/) - guests see apartment options immediately
- Apartment addresses and neighborhood information fully translated across all 6 languages:
  - Spanish: "Calle Conde de Ibarra. Sevilla" / "Centro histórico. Barrio Arenal."
  - English: "Conde de Ibarra Street. Seville" / "Historic center. Arenal District."
  - French: "Rue Conde de Ibarra. Séville" / "Centre historique. Quartier Arenal."
  - German: "Conde de Ibarra Straße. Sevilla" / "Historisches Zentrum. Viertel Arenal."
  - Italian: "Via Conde de Ibarra. Siviglia" / "Centro storico. Quartiere Arenal."
  - Chinese: "Conde de Ibarra街. 塞维利亚" / "历史中心. Arenal区."
- Apartment selector texts dynamically change when language is switched
- White headers (bg-white) across all pages for clean, bright appearance
- Visual language selector: displays current language flag and name (e.g., 🇪🇸 Español, 🇬🇧 English) instead of simple globe icon
- WhatsApp direct contact button (+34 661 610 794) integrated in main menu header
- Plaza de España background image with orange trees now used consistently across ALL pages with transparency (30% opacity), covering the full screen (bg-cover bg-center)
- Logo sizing and positioning: h-20 md:h-24 centered in main content on apartment page with rounded corners, h-14 md:h-16 in header on menu page
- Main menu redesigned with elegant visual layout: 3 cards in first row, 2 centered in second row for better distribution
- Menu option cards feature emerald green gradient backgrounds (from-emerald-50 to-emerald-100) with verde carruaje icons (text-emerald-700)
- Larger, more prominent icons (w-11 h-11) in rounded containers (w-20 h-20) with shadow and hover scale effects
- Navigation system fixed: all routes now correctly navigate between Apartment Selector (/) → Menu (/menu) → Detail Pages, back arrow properly returns to previous page
- Fully translated menu subtitle ("Select an option") in all 6 supported languages
- Tourism page tabs redesigned for mobile: custom button-based tabs stack vertically on mobile devices, preventing overlap and text truncation issues
- Transport page expanded with third section "Moverse por Sevilla" (Move Around Seville): includes local public transport information with interactive maps for bus stops, Sevici bike stations, and electric scooters near each apartment
- Accessible tab pattern implemented across Tourism and Transport pages: custom visual buttons + hidden TabsList/TabsTrigger for keyboard navigation and ARIA semantics
- Restaurant recommendations reorganized into three categories: Desayunos (Breakfast), Almuerzos/Comidas (Lunch), and Cenas (Dinner) with 7 curated real locations per category for each apartment (21 total recommendations per apartment)
- Added introductory text to restaurant section translated across all 6 languages: "A continuación les presentamos las mejores recomendaciones gastronómicas con salida desde el propio apartamento"
- Added web buttons in "Moverse por Sevilla" section: direct links to Sevici website (https://www.sevici.es) and VOI scooters website (https://www.voi.com) with language-specific URLs adapting to current interface language
- Tourism page now has 4 tabs: Actividades (Civitatis), Mapa, Restaurantes (accordion-based), and Visitas Recomendadas (accordion-based)
- Implemented collapsible/expandable Accordion components for restaurant recommendations (breakfast, lunch, dinner sections) for better mobile UX
- New fourth tourism tab "Visitas Recomendadas" (Recommended Visits) with 9 accordion categories: monuments, museums, nature, neighborhoods, culture, churches, tours, modern spaces, and gastronomy tourism
- Comprehensive visit database with 44 visit items fully translated across all 6 languages (Spanish, English, French, German, Italian, Chinese)
- Refactored tourism data structure: visit content (names and descriptions) now stored in i18n.ts for complete multilingual support and maintainability
- visitData.ts simplified to only category IDs, all translatable content moved to centralized i18n translation system
- Restaurant cards redesigned with compact horizontal layout: small square images (128x128px) on left, content on right for better space efficiency
- Each restaurant now displays representative photos of the venue and recommended dishes fully translated in all 6 languages
- Compact restaurant card design allows approximately 3 recommendations visible on screen simultaneously for easier browsing
- **New Cafeterías category added** (October 9, 2025): 14 authentic Seville cafés (7 per apartment) integrated as fourth accordion section between Lunch and Dinner
- Price level system implemented across all 70 restaurants (breakfast, lunch, cafeterias, dinner): visual indicators (€, €€, €€€) displayed in emerald green
- Restaurant data structure enhanced with `priceLevel` field ('low', 'medium', 'high') for budget-conscious decision-making
- Cafetería specialties fully translated in all 6 languages: café de especialidad, tostadas gourmet, bollería artesanal, etc.
- **Tourist visit cards fully enhanced** (October 9, 2025): All 44 tourist visit recommendations now display with detailed information including photos, schedules, prices, apartment-specific walking distances, and direct links to Google Maps and official websites
- Visit data structure expanded with comprehensive fields: photo, schedule, price, distanceIbarra, distanceQuevedo, mapsUrl, website
- Visit cards follow same compact horizontal layout as restaurants: 128x128px square image on left, content on right with badges and action buttons
- Apartment-specific distances displayed correctly (e.g., Catedral shows 8 min for Ibarra, 7 min for Quevedo)
- Price badges for visits displayed in emerald-700 color matching restaurant price indicators
- All visit practical information (44 locations across 9 categories) fully integrated and tested
- **Real location photographs** (October 9, 2025): All 44 tourist visit recommendations now display authentic photographs of actual Seville locations instead of generic placeholders
- Visit images sourced from stock library and properly integrated: Cathedral with Giralda, Real Alcázar gardens, museums, parks, neighborhoods, churches, tour activities, modern architecture, gastronomic venues
- All 44 visit images imported in TourismPage.tsx and mapped via imageMap for proper rendering in both apartments
- **Transport page accordion implementation** (October 9, 2025): Airport and train station sections in both Arrival (Llegada) and Departure (Salida) tabs converted to collapsible accordions for better content organization
- Accordion structure allows multiple sections to be open simultaneously (type="multiple") for flexible browsing
- Each tab contains two AccordionItems: one for airport transport options and one for train station options
- All transport cards (bus, taxi, VTC, transfer, tram) properly nested within accordion content sections
- Data test IDs added to accordion triggers for testing: accordion-airport-arrival, accordion-train-arrival, accordion-airport-departure, accordion-train-departure
- **Transport page visual enhancements** (October 9, 2025): Removed airport code "(SVQ)" from all transport titles across all 6 languages for cleaner presentation
- Added intuitive visual icons to accordion headers: plane icon (w-6 h-6) for airport sections and train icon (w-6 h-6) for train station sections
- Icons displayed in primary color (text-primary) with proper spacing (gap-3) for professional appearance
- Visual improvements applied to both Arrival and Departure tabs for consistent user experience across all languages

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing:**
- React 18 with TypeScript for type-safe component development
- Wouter for lightweight client-side routing
- Vite as the build tool and development server
- Mobile-first responsive design using Tailwind CSS

**UI Component System:**
- shadcn/ui component library (New York style variant) built on Radix UI primitives
- Comprehensive set of accessible components (dialogs, dropdowns, cards, tabs, etc.)
- Custom design system with warm Seville-inspired color palette (terracotta/burnt orange primary colors)
- Typography using Montserrat for headings and Inter for body text
- Support for light and dark modes with warm undertones

**State Management:**
- React Context API for global application state (language and apartment selection)
- TanStack Query (React Query) for server state management and caching
- Local component state using React hooks

**Internationalization:**
- Custom i18n implementation with translation objects for six languages
- Language-specific content stored in structured translation dictionaries
- Type-safe language and apartment selection using TypeScript unions

**Key Design Patterns:**
- Component composition with prop-based configuration
- Wrapper components for route-level logic and data fetching
- Separation of presentational and container components
- Consistent page header navigation pattern

### Backend Architecture

**Server Framework:**
- Express.js for HTTP server and API routing
- TypeScript for type safety across the full stack
- Development mode with hot module replacement via Vite middleware
- Production build using esbuild for server bundling

**Storage Layer:**
- In-memory storage implementation (MemStorage class) as the base storage interface
- Designed to be swappable with persistent database implementations
- Prepared for PostgreSQL integration with Drizzle ORM configuration
- User schema defined but not actively used (prepared for future authentication)

**Development Tools:**
- Custom Vite integration for seamless full-stack development
- Request/response logging middleware for API debugging
- Error handling middleware for consistent error responses

### External Dependencies

**Database (Configured but not actively used):**
- Drizzle ORM configured for PostgreSQL dialect
- Neon Database serverless driver (@neondatabase/serverless)
- Migration system configured with drizzle-kit
- Schema validation using drizzle-zod

**Third-Party Services:**
- Google Maps integration for interactive maps and location services
- YouTube embed for tourism activity videos
- External links to transportation services (TUSSAM bus system)
- WhatsApp Business integration for guest communication

**Asset Management:**
- Logo images for branding
- QR codes for WiFi credentials (apartment-specific)
- Apartment photos for selection interface
- Stock images for backgrounds and visual enhancement
- Restaurant data stored in local TypeScript modules

**UI Dependencies:**
- Radix UI primitives for accessible component foundation
- Lucide React for consistent iconography
- Tailwind CSS for utility-first styling
- date-fns for date formatting and manipulation
- Embla Carousel for image carousels

**Development Dependencies:**
- Replit-specific plugins for development experience (cartographer, dev banner, runtime error overlay)
- TypeScript for static type checking
- PostCSS with Autoprefixer for CSS processing