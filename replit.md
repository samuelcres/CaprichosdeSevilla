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