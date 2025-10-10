# Caprichos de Sevilla - Guest Web App

## Overview

Caprichos de Sevilla is a multilingual guest information web application for two tourist apartments in Seville, Spain. It acts as a virtual host, offering essential information on transportation, check-in, WiFi, tourism recommendations, and support in six languages (Spanish, English, French, German, Italian, and Chinese). The app features an apartment selection landing page, a main menu with five key sections, and a global language selector. Key capabilities include interactive maps, comprehensive restaurant recommendations with price levels, detailed tourist visit information with photos and practical details, and an emergency contact section.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing:**
- React 18 with TypeScript
- Wouter for routing
- Vite for development and build
- Mobile-first responsive design with Tailwind CSS

**UI Component System:**
- shadcn/ui (New York style) built on Radix UI
- Custom design system with Seville-inspired color palette (terracotta/burnt orange)
- Typography: Montserrat (headings), Inter (body)
- Light and dark mode support

**State Management:**
- React Context API for global state (language, apartment)
- TanStack Query for server state
- React hooks for local component state

**Internationalization:**
- Custom i18n implementation with translation objects for six languages
- Type-safe language and apartment selection

**Key Design Patterns:**
- Component composition
- Wrapper components for routing and data fetching
- Separation of concerns (presentational/container)
- Consistent page header navigation

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- Vite middleware for hot module replacement in development
- esbuild for production bundling

**Storage Layer:**
- In-memory storage (MemStorage class) with a design ready for swappable persistent databases.
- Prepared for PostgreSQL integration with Drizzle ORM.

**Development Tools:**
- Custom Vite integration
- Request/response logging
- Error handling middleware

### External Dependencies

**Database (Configured but not actively used):**
- Drizzle ORM for PostgreSQL
- Neon Database serverless driver
- drizzle-kit for migrations
- drizzle-zod for schema validation

**Third-Party Services:**
- Google Maps
- YouTube embed
- External links to transportation services (TUSSAM)
- WhatsApp Business integration

**Asset Management:**
- Logo images
- QR codes (WiFi)
- Apartment photos
- Stock images for backgrounds and visuals
- Restaurant data in local TypeScript modules
- Real location photographs for tourist visits

**UI Dependencies:**
- Radix UI primitives
- Lucide React for iconography
- Tailwind CSS
- date-fns
- Embla Carousel

## Recent Changes

### October 10, 2025

**Apartment Name Display in Headers:**
- Added apartment name badge to all section pages (Transport, Check-in, WiFi, Tourism, Events, Contact)
- Badge displays "Capricho de Ibarra" or "Capricho de Quevedo" based on selected apartment
- Positioned above page title in PageHeader component for consistent visibility
- Styled with outline variant and small text size for subtle, non-intrusive display
- Apartment name persists across language changes (names don't translate)
- All page wrappers enforce apartment selection before rendering content
- **Apartment Image in Navigation:** Added circular thumbnail image of the apartment alongside the name in the badge
  - Ibarra displays FotoIbarra image, Quevedo displays FotoQuevedo image
  - Image styled as small circular avatar (5x5, rounded-full) with proper spacing
  - Provides visual identification of selected apartment throughout navigation

**Apartment-Specific Backgrounds with Watermark:**
- Replaced Plaza de España background with apartment-specific photos once inside each apartment
- All section pages (Menu, Transport, Check-in, WiFi, Tourism, Events, Contact) now display the selected apartment's photo as background
- Background implementation:
  - Fixed positioning covering full screen (inset-0)
  - Apartment photo displayed at 30% opacity for subtle effect
  - Background uses bg-cover bg-center bg-no-repeat for proper image display
- Watermark overlay:
  - Apartment name displayed diagonally (rotated -45 degrees)
  - Very subtle opacity (5%) to not interfere with content
  - Centered on screen using flexbox
  - Text size: text-9xl for large, readable watermark
- Image assets:
  - Ibarra: FotoIbarra_1759702831594.webp
  - Quevedo: FotoQuevedo_1759702831586.webp
- Consistent z-index layering: background layer → watermark layer → content layer (z-10)
- All pages follow the same pattern for visual consistency and maintainability

**Updated Parking Configuration:**
- Both apartments now have exactly 2 parking options each for simplified guest experience
- Ibarra parking configuration:
  - Parking 1: Parking Cano y Cueto (Calle Cano y Cueto, 1, 41004 Sevilla) - 550m, €2.00/hour - €20/day
  - Parking 2: Aparcamiento Sevilla S.L. (Calle Cuesta del Rosario, 8, 41004 Sevilla) - 400m, €2.20/hour - €22/day
- Quevedo parking configuration (updated):
  - Parking 1: Parking Saba Plaza Concordia (Calle Concordia, 1, 41003 Sevilla) - 400m, €2.30/hour - €23/day
  - Parking 2: Parking Imagen (C. Sta. Angela de la Cruz, 2, Casco Antiguo, 41003 Sevilla) - 350m, €2.40/hour - €24/day
- Previous parking3 removed from both apartments in all tabs (Arrival and Departure)
- All 6 languages updated with new parking information across the application
- Walking directions and map buttons work correctly with updated addresses

**Improved Menu Button Distribution:**
- Optimized menu grid layout for better visual balance and user experience
- New responsive distribution:
  - Mobile (1 column): All 6 buttons in vertical layout
  - Tablet (2 columns): 3 rows with 2 buttons each
  - Desktop (3 columns): 2 rows with 3 buttons each (symmetric 2×3 grid)
- Previous layout had uneven distribution (3 buttons in first row, 3 in second row with different widths)
- Simplified code from two separate grids to single unified responsive grid
- Menu order preserved: Transport → Check-in → Wi-Fi → Tourism → Events → Contact
- All cards maintain same styling, hover effects, and navigation functionality

**Events Calendar Feature Added:**
- New Events section with interactive calendar showing cultural events in Seville
- Features include:
  - Interactive date picker highlighting days with events
  - Events database with 10+ major Seville cultural events for 2025
  - Event categories: Festival, Religious, Cultural, Sports, Music, Theater, Art
  - Color-coded badges for event type and pricing (free/paid)
  - Detailed event cards with descriptions, dates, locations, and website links
  - Monthly view showing all events for selected month
- Events data stored locally in eventsData.ts (Semana Santa, Feria de Abril, Bienal de Flamenco, etc.)
- Full translations in all 6 languages for event names, descriptions, and UI
- Menu order updated: Transport → Check-in → Wi-Fi → Tourism → Events → Contact
- PartyPopper icon used for Events button
- Plaza de España background consistent with other pages
- Localization enhancements:
  - date-fns locale integration for all 6 languages (es, enUS, fr, de, it, zhCN)
  - Event count translations (singular/plural) for all languages
  - All dates render in the appropriate language based on user selection

**Restaurant Category Icons:**
- Added visual icons to all restaurant categories in Tourism page
- Breakfast (Desayunos): Coffee icon ☕
- Lunch (Almuerzos): UtensilsCrossed icon 🍴
- Cafeterias (Cafeterías): CupSoda icon 🥤
- Dinner (Cenas): Moon icon 🌙
- Icons are displayed in primary color for consistent visual hierarchy
- Applied to both Ibarra and Quevedo apartments

**Parking Recommendations Feature:**
- New "By Car" section added to Transport page with parking recommendations for guests arriving by car
- Implemented in both Arrival and Departure tabs as accordion sections
- Parking options per apartment with complete details:
  - Ibarra apartment parkings (2): Cano y Cueto, Aparcamiento Sevilla S.L. (Cuesta del Rosario)
  - Quevedo apartment parkings (2): Parking Saba Plaza Concordia, Parking Imagen (C. Sta. Angela de la Cruz)
- Each parking card displays: name, address, phone number, approximate price (hourly/daily), and walking distance
- Dual Google Maps integration:
  - "View on Map" button: Opens parking location in Google Maps (outline variant)
  - "Walking Directions" button: Opens Google Maps with walking route from parking to apartment (default variant)
  - Arrival tab: Route from parking to apartment
  - Departure tab: Route from apartment to parking
- Full translations in all 6 languages including parking names, addresses, pricing, and button labels
- Consistent UI design with other transport options using Cards and ParkingCircle icons
- Test coverage: verified parking display, Google Maps location, and walking directions for both apartments

### October 9, 2025

**Scroll to Top Navigation:**
- All page wrappers now automatically scroll to top when navigating to a new page
- Ensures users always see content from the beginning when clicking menu buttons
- Applied to Tourism, Transport, Check-in, WiFi, and Contact pages

**Language Selector Globally Available:**
- Language selector implemented globally across all pages via PageHeader component
- DropdownMenu shows current language flag and name (e.g., 🇪🇸 Español, 🇬🇧 English)
- All page components (Tourism, Transport, Checkin, Wifi, Contact) updated to pass currentLanguage and onLanguageChange props
- Language changes persist across all pages through AppContext integration

**Emergency Contact Information Added:**
- New emergency assistance section added to Contact page with critical phone numbers for tourists
- 5 emergency contact cards fully translated across all 6 languages:
  - General Emergency: 112 (red theme)
  - National Police: 091 (blue theme)
  - Local Police: 092 (blue theme)
  - Civil Guard: 062 (green theme)
  - Tourist Police Office: 954 22 88 40 (amber theme, highlighted)
- Responsive grid layout (2 columns desktop, 1 column mobile)
- Color-coded icons and service descriptions for quick reference

**Enhanced Check-in Instructions for Quevedo:**
- Updated Quevedo apartment check-in procedure with detailed step-by-step instructions based on official documentation
- 6 steps expanded with comprehensive descriptions:
  1. Entrance to apartment at C/ Quevedo, 11 (Sevilla)
  2. Access link from Email, Booking, or WhatsApp
  3. Open main entrance using "Portal Calle" button
  4. Turn right - ground floor, right door
  5. Open apartment door using "Home door Low R" button
  6. Exit instructions with interior button location
- New schedule information card showing link availability (check-in 15:00h to check-out 11:00h)
- Enhanced warning message about not pressing door opening remotely
- All improvements translated across 6 languages maintaining technical terms consistency

**Visual Check-in Instructions for Ibarra:**
- Added step-specific images to Ibarra check-in page for enhanced guest guidance
- 6 visual aids positioned to the right of each step (desktop) or below text (mobile)
- Responsive layout: flex-column on mobile, flex-row on desktop with images at 256px width
- Image mapping for each step:
  - Step 1: Entrance door photo (1puerta_1760088503543.jpeg)
  - Step 2: WhatsApp link interface (2enlace_1760088503553.png)
  - Step 3: "Portal Calle" button interface (3puerta_1760088503553.png)
  - Step 4: Interior courtyard with directional arrow (4apartamento_1760088503552.png)
  - Step 5: Apartment door control screen (6apertura_1760088503551.png)
  - Step 6: Interior exit button (7aperturainterior_1760088503550.png)
- Images styled with rounded corners, object-cover, max height constraints for visual consistency
- Container expanded to max-w-6xl to accommodate the new two-column layout
- Images exclusive to Ibarra apartment (Quevedo check-in remains text-only)
- All images have proper data-testid attributes for testing (img-step-1 through img-step-6)