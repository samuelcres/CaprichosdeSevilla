# Caprichos de Sevilla - Guest Web App

## Overview

Caprichos de Sevilla is a multilingual guest information web application for two tourist apartments in Seville, Spain (Capricho de Ibarra and Capricho de Quevedo). The app serves as a virtual host, providing guests with essential information about transportation, check-in procedures, WiFi access, tourism recommendations, and contact support in six languages (Spanish, English, French, German, Italian, and Chinese).

The application follows a simple navigation flow: apartment selection (main page) → main menu with five key sections. Language can be changed at any time via a globe icon dropdown available on all pages. Each section provides apartment-specific information tailored to the guest's chosen property.

**Recent Updates (October 2025):**
- Apartment selection is now the main landing page (/) - guests see apartment options immediately
- Language selector with globe icon added to both apartment selector and main menu pages
- WhatsApp direct contact button (+34 661 610 794) integrated in main menu header
- Seville watermark background images added to main screens (8% opacity with blur for subtle effect)
- Logo sizing optimized: h-12 md:h-14 on apartment page, h-14 md:h-16 on menu page

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