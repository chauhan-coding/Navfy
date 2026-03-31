# Navfy Ambassador Program - React Landing Page

A pixel-perfect, fully responsive React landing page featuring two main routes: a modern product showcase homepage and a dedicated Ambassador Program recruitment page. Built with React, Vite, React Router, Framer Motion, and Tailwind CSS.

## ðŸ“‹ Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Architecture & Design Patterns](#architecture--design-patterns)
- [Content & Localization](#content--localization)
- [Component Details](#component-details)
- [Deployment](#deployment)

---

## âœ¨ Features

### Core Features
- **Dual Route SPA**: Two fully functional pages (`/` home, `/ambassador` program page)
- **Pixel-Perfect UI**: Exact layout precision matching design specifications
- **Responsive Design**: Mobile-first approach with drawer navigation (mobile < 768px), carousel components on mobile, grid layouts on desktop
- **Smooth Animations**: Scroll-triggered animations, carousel transitions, page envelope effects powered by Framer Motion
- **Dark Mode Support**: System preference detection with manual override toggle
- **100% Text Localization**: All copy managed in dedicated data files; no hardcoded strings in components

### Home Page (`/`)
1. **Hero Section** â€” Gradient background, animated text stack, dual CTAs, hero visual
2. **Products Section** â€” 4-item product showcase with eyebrow, title, description
3. **Solutions Section** â€” 3 enterprise/automotive/government tabs with content switching
4. **API Section** â€” Side-by-side layout with 3 code block examples
5. **Stats Section** â€” Grid of 4 key metrics with animated counters
6. **Testimonials Section** â€” Carousel (desktop swipe, mobile pagination dots)
7. **Footer Section** â€” Multi-column footer with brand block, contact info, newsletter signup, copyright

### Ambassador Page (`/ambassador`)
1. **Hero Section** â€” Teal/navy gradient, animated text, character illustration
2. **What Is Ambassador** â€” Centered layout explaining program with campus building visual
3. **Why Join** â€” 3 benefit cards (leadership, skill, experience)
4. **Drive Section** â€” Split layout with benefit copy and illustrative characters
5. **How To Apply** â€” 4-step process with visual connectors
6. **Journey Section** â€” 3 progression tiers (explorer, navigator, pathfinder) with badge medals
7. **Unlock Section** â€” 3 benefit cards (desktop grid, mobile carousel)
8. **Questions Section** â€” Centered email inquiry CTA
9. **Download Section** â€” Platform-specific app download buttons (Android, iOS, Web)
10. **Footer Section** â€” Comprehensive footer with brand, contact sections, newsletter, bottom navigation

---

## ðŸ›  Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | React | 18.x | UI component library |
| **Build Tool** | Vite | 8.0.3 | Lightning-fast bundling, dev server, HMR |
| **Routing** | React Router DOM | 6.x | Client-side SPA routing |
| **Styling** | Tailwind CSS | 4.0 | Utility-first CSS with @theme custom properties |
| **Animations** | Framer Motion | Latest | Scroll triggers, carousel, page transitions |
| **Icons** | React Icons | Latest | SVG icon library (FiMenu, FiX, FiGithub, FiSmartphone, FiGlobe, etc.) |
| **Package Manager** | npm | Latest | Dependency management |

---

## ðŸ“‚ Project Structure

```
c:\Bold_Krishan\mmi
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ data/
â”‚   â”‚   â”œâ”€â”€ siteContent.js           # Home page localized copy & navigation
â”‚   â”‚   â””â”€â”€ ambassadorContent.js     # Ambassador page localized copy
â”‚   â”‚
â”‚   â”œâ”€â”€ sections/
â”‚   â”‚   â”œâ”€â”€ HeroSection.jsx
â”‚   â”‚   â”œâ”€â”€ ProductsSection.jsx
â”‚   â”‚   â”œâ”€â”€ SolutionsSection.jsx
â”‚   â”‚   â”œâ”€â”€ ApiSection.jsx
â”‚   â”‚   â”œâ”€â”€ StatsSection.jsx
â”‚   â”‚   â”œâ”€â”€ TestimonialsSection.jsx
â”‚   â”‚   â”œâ”€â”€ FooterSection.jsx
â”‚   â”‚   â”‚
â”‚   â”‚   â””â”€â”€ ambassador/              # Ambassador page sections
â”‚   â”‚       â”œâ”€â”€ AmbassadorNav.jsx
â”‚   â”‚       â”œâ”€â”€ AmbassadorHero.jsx
â”‚   â”‚       â”œâ”€â”€ WhatIsSection.jsx
â”‚   â”‚       â”œâ”€â”€ WhyJoinSection.jsx
â”‚   â”‚       â”œâ”€â”€ DriveSection.jsx
â”‚   â”‚       â”œâ”€â”€ HowToApplySection.jsx
â”‚   â”‚       â”œâ”€â”€ JourneySection.jsx
â”‚   â”‚       â”œâ”€â”€ UnlockSection.jsx
â”‚   â”‚       â”œâ”€â”€ QuestionsSection.jsx
â”‚   â”‚       â”œâ”€â”€ DownloadSection.jsx
â”‚   â”‚       â””â”€â”€ AmbassadorFooter.jsx
â”‚   â”‚
â”‚   â”œâ”€â”€ pages/
â”‚   â”‚   â”œâ”€â”€ HomePage.jsx             # Home page wrapper & header
â”‚   â”‚   â””â”€â”€ AmbassadorPage.jsx       # Ambassador page wrapper
â”‚   â”‚
â”‚   â”œâ”€â”€ assets/                      # Custom SVG illustrations
â”‚   â”‚   â”œâ”€â”€ amb-hero-chars.svg       # Hero characters (laptop + globe)
â”‚   â”‚   â”œâ”€â”€ amb-campus.svg           # Campus building illustration
â”‚   â”‚   â”œâ”€â”€ amb-drive-chars.svg      # Three diverse students
â”‚   â”‚   â”œâ”€â”€ badge-explorer.svg       # Tier 1 medal
â”‚   â”‚   â”œâ”€â”€ badge-navigator.svg      # Tier 2 medal
â”‚   â”‚   â””â”€â”€ badge-pathfinder.svg     # Tier 3 medal
â”‚   â”‚
â”‚   â”œâ”€â”€ App.jsx                      # Router setup
â”‚   â”œâ”€â”€ App.css                      # Global styles & theme variables
â”‚   â””â”€â”€ main.jsx                     # Vite entry point
â”‚
â”œâ”€â”€ public/                          # Static assets
â”œâ”€â”€ index.html                       # HTML template
â”œâ”€â”€ vite.config.js                   # Vite configuration
â”œâ”€â”€ tailwind.config.js               # Tailwind CSS configuration
â”œâ”€â”€ package.json                     # Dependencies & scripts
â”œâ”€â”€ package-lock.json
â””â”€â”€ README.md                        # This file
```

---

## ðŸš€ Getting Started

### Prerequisites
- **Node.js** 16+ (check with `node --version`)
- **npm** 7+ (check with `npm --version`)

### Installation

1. **Navigate to project directory**
   ```bash
   cd c:\Bold_Krishan\mmi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:5174/` with hot module reloading (HMR) enabled

### Verify Installation
- Home page loads at `http://localhost:5174/`
- Ambassador page accessible at `http://localhost:5174/ambassador`
- Console shows no errors; HMR active in terminal

---

## ðŸ“œ Available Scripts

### Development
```bash
npm run dev
```
Starts Vite dev server with HMR. Watches all file changes; hot-reloads components instantly.

### Production Build
```bash
npm run build
```
Creates optimized production build in `/dist/` directory (gzipped ~434 KB JS). Output includes:
- Minified JavaScript
- Optimized CSS bundles
- Asset optimization

### Preview Production Build Locally
```bash
npm run preview
```
Serves the production build from `/dist/` at `http://localhost:4173/` (read-only, no HMR).

---

## ðŸ— Architecture & Design Patterns

### Data-First Architecture
All text content, navigation items, section configurations, and CTAs are stored in dedicated data files:
- **`src/data/siteContent.js`** â€” Home page content (brand, header, products, solutions, APIs, stats, testimonials, footer)
- **`src/data/ambassadorContent.js`** â€” Ambassador page content (brand, navigation, all 10 sections, footer)

**Benefit**: Update copy without touching component code. Enables easy i18n (internationalization) by adding language keys.

### Component Patterns
- **Functional Components**: All components use React hooks (useState, useEffect)
- **Composition Over Inheritance**: Sections are independent, composable units
- **Single Responsibility**: Each component handles one conceptual section
- **Props-Driven**: Components receive config via props; no hardcoded UI values

### Styling System (Tailwind CSS v4)
- **Custom Properties (@theme)**: Theme colors, spacing defined as CSS variables in App.css
- **Dark Mode**: Automatic system preference detection; manual toggle via header button
- **Responsive**: `sm:`, `md:`, `lg:` breakpoints for mobile-first design
- **Animations**: Utility classes + inline Framer Motion for complex transitions

### Animation Strategy (Framer Motion)
- **Scroll Triggers**: Sections fade/slide in when scrolled into view
- **Carousel**: Custom carousel logic for testimonials (swipe on desktop, pagination dots on mobile)
- **Page Transitions**: Envelope effect on ambassador page load (scaleY 0â†’1)
- **Micro-interactions**: Button hover states, icon animations

---

## ðŸ“ Content & Localization

### Adding/Modifying Content

#### Home Page Content
Edit `src/data/siteContent.js`:
```javascript
export const navItems = [
  { label: 'Products', href: '#products' },
  // ... more items
];

export const heroContent = {
  eyebrow: 'Welcome',
  title: 'Build the Future',
  // ...
};
```

Then import and use in component imports (e.g., `ProductsSection.jsx`):
```jsx
import { products, sectionHeadings } from '../data/siteContent';
// Use data in JSX
```

#### Ambassador Page Content
Edit `src/data/ambassadorContent.js`:
```javascript
export const ambassadorHeaderContent = {
  activeLinkLabel: 'Ambassador',
  ctaLabel: 'Start Free',
  // ...
};

export const downloadData = {
  platforms: [
    { key: 'android', store: 'Google Play', preLabel: 'Get it on', href: '#' },
    // ...
  ]
};
```

### Best Practices
- âœ… Keep all user-facing text in data files
- âœ… Use meaningful keys (avoid generic names like `text1`, `text2`)
- âœ… Group related strings together (e.g., all footer links in one object)
- âœ… Example structure: `{ eyebrow: '...', title: '...', description: '...' }`
- âŒ Avoid hardcoding strings directly in JSX components

---

## ðŸ§© Component Details

### Key Components

#### Page Level
- **HomePage.jsx** â€” Renders responsive header (logo, nav, dark mode toggle) + all 7 home sections
- **AmbassadorPage.jsx** â€” Wrapper with Framer Motion page transition; orchestrates 10 ambassador sections

#### Navigation
- **HomePage Header** â€” Responsive navbar; desktop nav links, mobile hamburger drawer, CTA buttons, theme toggle
- **AmbassadorNav.jsx** â€” Dark-themed navbar with logo, nav items, CTA button, mobile drawer

#### Sections (All support responsive design)
- **HeroSection** â€” Large background gradient, animated text stack, hero image, dual CTAs
- **ProductsSection** â€” Maps `products` array; card grid with eyebrow/title/description
- **SolutionsSection** â€” 3-tab switcher (Enterprise, Automotive, Government)
- **ApiSection** â€” Split layout; left copy, right code blocks with copy-to-clipboard
- **StatsSection** â€” 4 metric cards with animated number counters
- **TestimonialsSection** â€” Scroll-triggered carousel; desktop swipe, mobile pagination dots
- **FooterSection** â€” Multi-column layout with brand block, footer columns, copyright

#### Ambassador Sections
- **AmbassadorHero** â€” Teal/navy gradient hero similar to home but with ambassador-specific copy
- **WhatIsSection** â€” Centered layout with campus building SVG; explains ambassador program
- **WhyJoinSection** â€” 3 benefit cards (leadership, skill, experience)
- **DriveSection** â€” Split layout; benefits text on left, character illustration on right
- **HowToApplySection** â€” 4-step grid with connecting lines showing application flow
- **JourneySection** â€” 3 tier badges (explorerâ†’navigatorâ†’pathfinder) with descriptions
- **UnlockSection** â€” Desktop: 3-column grid; Mobile: swipeable carousel with dot pagination
- **QuestionsSection** â€” Centered email inquiry CTA section
- **DownloadSection** â€” Maps `downloadData.platforms` array; renders platform-specific buttons
- **AmbassadorFooter** â€” Comprehensive footer with brand, contact sections, newsletter, copyright, bottom nav

---

## ðŸŽ¨ Design Tokens

### Colors (Tailwind + Custom Properties)
Defined in `App.css` as CSS custom properties:
```css
--bg: 0 0% 100%;           /* Background */
--accent: 6 80% 48%;       /* Primary accent (blue-ish) */
--accent-dark: 6 80% 38%;  /* Darker accent */
--text: 0 0% 20%;          /* Text color */
--text-light: 0 0% 50%;    /* Light text (secondary) */
--border: 0 0% 90%;        /* Border color */
--success: 120 100% 40%;   /* Success feedback */
```

Dark mode applies `dark:` prefixed colors when `dark` class is active on document root.

### Spacing
Standard Tailwind scale: `px`, `1`, `2`, `4`, `6`, `8`, `12`, `16`, `24`, `32`, `48`, etc.

---

## ðŸ“± Responsive Breakpoints

| Breakpoint | Width | Usage |
|-----------|-------|-------|
| **Mobile** | < 640px | Single column, stacked layout, drawer navigation, carousel |
| **Tablet (sm)** | â‰¥ 640px | 2-column grids start |
| **Desktop (md)** | â‰¥ 768px | 3-column grids, side-by-side layouts, full navigation |
| **Large (lg)** | â‰¥ 1024px | Full-width multi-column designs |

**Mobile Navigation**: Hamburger menu (FiMenu icon) opens drawer; FiX icon replaces menu when open.

**Carousels**: Desktop users can swipe; mobile shows pagination dots. UnlockSection and Testimonials use this pattern.

---

## ðŸš€ Deployment

### Preparing for Production

1. **Build optimized bundle**
   ```bash
   npm run build
   ```
   Output directory: `/dist/`
   - Contains index.html, JS bundles, CSS, optimized assets
   - Ready for serving on any static host or CDN

2. **Test production build locally**
   ```bash
   npm run preview
   ```
   Verifies build output at `http://localhost:4173/`

### Deployment Options

#### Option 1: Static Host (Recommended)
- **Vercel** (zero-config):
  ```bash
  npm i -g vercel
  vercel
  ```
- **Netlify**: Drag `/dist/` folder or connect Git
- **GitHub Pages**: Build + push `/dist/` to `gh-pages` branch
- **AWS S3 + CloudFront**: Upload `/dist/` files, configure as static site

#### Option 2: Node.js Server
Use Express to serve `/dist/`:
```bash
npm run build
# Then serve /dist/ with any static HTTP server
```

#### Option 3: Docker
Create `Dockerfile` in project root:
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

Build & run:
```bash
docker build -t Navfy .
docker run -p 3000:3000 Navfy
```

---

## ðŸ”§ Configuration Files

### `vite.config.js`
- Entry point: `src/main.jsx`
- Output: `/dist/`
- Dev server: port 5174, HMR enabled
- Resolves React JSX syntax

### `tailwind.config.js`
- Content sources: `src/**/*.{js,jsx}`
- Theme extends Tailwind defaults
- Dark mode: class-based toggle

### `package.json`
Contains all dependencies and build scripts for the project.

---

## ðŸ› Troubleshooting

| Issue | Solution |
|-------|----------|
| **HMR not working** | Ensure `http://localhost:5174/` (not 127.0.0.1); check firewall |
| **Build fails with JSX syntax error** | Verify JSX syntax and imports are correct |
| **Styles not applying** | Clear browser cache; run `npm install` to ensure Tailwind installed |
| **Components not rendering** | Check console for import errors; verify data file exports |
| **Dark mode not toggling** | Ensure `dark` class is added to document root |
| **Carousel not working** | Verify Framer Motion installed; check useState initialization |

---

## ðŸ“š Learning Resources

- **React Docs**: https://react.dev
- **Vite Guide**: https://vitejs.dev/guide/
- **React Router**: https://reactrouter.com/
- **Framer Motion**: https://www.framer.com/motion/
- **Tailwind CSS**: https://tailwindcss.com/docs/

---

## ðŸ“ž Next Steps

### Quick Enhancements
- [ ] Replace placeholder SVG illustrations with final designed assets
- [ ] Add real URLs to download links, social links, navigation hrefs
- [ ] Implement ambassador application form (currently email CTA)
- [ ] Add i18n (internationalization) support for multiple languages
- [ ] Integrate analytics tracking (Google Analytics, Mixpanel, etc.)

---

**Last Updated**: March 31, 2026  
**Dev Server**: Running at http://localhost:5174/  
**Build Status**: âœ… Passing (469 modules, 0 errors)

