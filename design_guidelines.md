# Design Guidelines: Caprichos de Sevilla Guest Web App

## Design Approach
**Selected Approach:** Design System (Material Design Principles)
**Justification:** This is a utility-focused, information-dense application where efficiency, clarity, and quick information access are paramount. Guests need to find critical information (check-in instructions, WiFi, transport) quickly on mobile devices. Material Design provides excellent patterns for content organization, mobile responsiveness, and clear visual hierarchy.

**Key Design Principles:**
- Mobile-first optimization (tourists primarily use phones)
- Information clarity over decoration
- Warm, welcoming hospitality aesthetic inspired by Seville
- Multilingual readability
- Quick access to critical guest information

## Color Palette

**Primary Colors (Light Mode):**
- Primary: 28 75% 55% (Warm terracotta/burnt orange - evokes Seville architecture)
- Primary Light: 28 75% 65%
- Primary Dark: 28 75% 45%

**Primary Colors (Dark Mode):**
- Primary: 28 70% 60%
- Background: 25 15% 12%
- Surface: 25 12% 18%

**Neutral Colors:**
- Background (Light): 35 20% 98% (warm off-white)
- Surface (Light): 0 0% 100%
- Text Primary: 25 25% 20%
- Text Secondary: 25 15% 45%

**Accent Colors:**
- Success/Info: 160 60% 45% (complementary teal for actions)
- Warning: 45 95% 60% (warm amber for important notices)

**Background (Dark Mode):** Maintain warm undertones with slight brown/orange tints rather than pure grays

## Typography

**Font Families:**
- Primary: 'Montserrat', sans-serif (specified in requirements, modern and highly legible)
- Body: 'Inter', sans-serif (excellent multilingual support and readability)

**Type Scale:**
- Headings (H1): 2rem (32px), font-weight 600
- Headings (H2): 1.5rem (24px), font-weight 600
- Headings (H3): 1.25rem (20px), font-weight 500
- Body Large: 1.125rem (18px), font-weight 400
- Body: 1rem (16px), font-weight 400
- Small/Caption: 0.875rem (14px), font-weight 400

**Line Heights:** 1.6 for body text, 1.3 for headings

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16 for consistent rhythm
- Component padding: p-4 to p-6
- Section spacing: py-8 to py-12
- Card spacing: p-6
- Button padding: px-6 py-3

**Container Widths:**
- Max width: max-w-4xl (optimal for mobile content)
- Content sections: max-w-2xl for readability
- Full-width only for maps and embedded widgets

**Grid System:**
- Single column on mobile (default)
- Two columns on tablet/desktop for transport options only
- Cards and navigation remain single-column stacked for clarity

## Component Library

**Navigation:**
- Fixed bottom navigation bar on mobile (thumb-friendly)
- Horizontal tab navigation on desktop
- Large, tappable menu items with icons (minimum 44px touch targets)
- Clear visual active state
- Back button always visible in top-left

**Cards:**
- Elevated cards with subtle shadows (shadow-md)
- Rounded corners (rounded-lg)
- Clear visual separation between sections
- Icon + Title + Description pattern for menu items
- Minimum height for tappable areas

**Buttons:**
- Primary: Filled with primary color, rounded-lg
- Secondary: Outlined with border
- Icon buttons: Circular for actions like copy
- Minimum size: h-12 for mobile accessibility

**Step-by-Step Instructions:**
- Numbered list with large, clear numbers
- Icon indicators for each step
- Progressive disclosure with expandable details if needed
- High contrast between steps

**Information Display:**
- QR codes: Centered, large enough to scan easily (min 200px)
- WiFi credentials: High contrast boxes with copy functionality
- Contact buttons: Full-width on mobile, prominent WhatsApp and Email

**Forms/Interactive Elements:**
- Language selector: Flag icons + text labels in grid
- Apartment selector: Large cards with apartment names and subtle images/icons
- Copy buttons: Toast notification on successful copy

## Animations

Use sparingly:
- Page transitions: Subtle slide (150ms ease-out)
- Button interactions: Scale on press (transform scale-95)
- Toast notifications: Slide-in from bottom
- No decorative animations

## Images

**Logo:** Display "Caprichos de Sevilla" logo in header across all pages (provided logoCS_1759701422984.png)

**QR Codes:** 
- WiFi section: Display QR codes prominently (QR Ibarra and QR Quevedo provided)
- Centered, min 200px x 200px for easy scanning
- White background with subtle border

**Icons:**
- Use Heroicons for consistent icon system
- Transport icons: bus, taxi, car for each transport option
- Navigation icons: map, wifi, key, phone, info
- Step numbers in circles for check-in instructions

**No Hero Image:** This utility app doesn't require a hero section. Open directly to language selection, then apartment selection with clean card-based interface.

## Accessibility & Responsiveness

- Minimum touch targets: 44px x 44px
- High contrast ratios (WCAG AA minimum)
- Focus indicators on all interactive elements
- Support for 5 languages with proper UTF-8 encoding
- Responsive breakpoints: sm (640px), md (768px), lg (1024px)
- Test with variable font sizes for accessibility

## Key UX Patterns

- **Progressive Disclosure:** Show critical info first (language → apartment → menu)
- **Persistent Navigation:** Bottom nav or hamburger always accessible
- **One-Tap Actions:** WhatsApp/Email open directly in native apps
- **Copy Functionality:** One-tap copy for WiFi passwords with confirmation
- **Embedded Content:** Civitatis widget and Google Maps embedded responsively
- **Contextual Help:** Important warnings (door access timing) highlighted in amber