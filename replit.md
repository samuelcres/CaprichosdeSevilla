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

### October 9, 2025

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
- Check-in door image added for visual reference (Quevedo apartment only)
- All improvements translated across 6 languages maintaining technical terms consistency