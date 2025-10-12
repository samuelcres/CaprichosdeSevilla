# Caprichos de Sevilla - Guest Web App

## Overview

Caprichos de Sevilla is a multilingual web application designed to serve as a virtual host for guests staying at two tourist apartments in Seville, Spain (Capricho de Ibarra and Capricho de Quevedo). It provides essential information on transportation, check-in procedures, WiFi access, local tourism recommendations, and emergency contacts in six languages (Spanish, English, French, German, Italian, and Chinese). The application features an apartment selection landing page (default multi-apartment mode) or can be configured for a single apartment. Key capabilities include interactive maps, detailed restaurant and tourist recommendations, and comprehensive check-in instructions. The project aims to enhance the guest experience by providing a centralized, accessible information hub, reducing the need for direct staff interaction for common queries.

## Recent Changes

**October 12, 2025:**
- Updated luggage storage options for Capricho de Ibarra apartment. Removed Naturanda (Calle Francos) and Safe Luggage. Added LOCK & enjoy! - Luggage Storage in Alfalfa (C. Águilas, 27) with 8 minutes walking distance and prices from €6/day. The Pink Lockers remains as the first option.
- Updated luggage storage options for Capricho de Quevedo apartment. Removed all Naturanda locations (Trajano, Alfonso XII, Francos). Added Lockers Sevilla (C. Regina, 13, 5 min walk, check website for pricing, https://lockersevilla.com/regina/) and Radical Storage Setas De Sevilla (Pl. de la Encarnación, 23, 7 min walk, €5/day).
- Added visual locker images to Check-in page. Each luggage storage option now displays a photo of lockers on the right side of the card, matching the layout of check-in step images. Images are responsive (full width on mobile, fixed width on desktop).
- Added external event resource buttons to Events page. Two buttons link to OnSevilla.com and VisitaSevilla.es for additional event information. Section titled "Más eventos en Sevilla" (translated in all 6 languages), buttons open in new tabs with responsive layout (stacked on mobile, side-by-side on desktop).
- Added Guide button and dialog to apartment selection page. Button positioned in header to the left of language selector. Dialog displays tree structure of all available app sections (Transport, Check-in, Wi-Fi, Tourism, Events, Contact) with color-coded icons and descriptions. Fully translated in all 6 languages.

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