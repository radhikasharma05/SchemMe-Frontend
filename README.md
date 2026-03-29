# SchemMe — Frontend

link::::: https://schemme-teamprime.netlify.app


> **A premium React + Vite landing page** for *SchemMe*, an AI-powered platform that connects Indian citizens to government welfare schemes tailored to their profile.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Architecture](#architecture)
6. [Pages & Sections](#pages--sections)
7. [Components Reference](#components-reference)
8. [Styling System](#styling-system)
9. [Design Tokens & Color Palette](#design-tokens--color-palette)
10. [Typography](#typography)
11. [Dependencies](#dependencies)
12. [Assets](#assets)
13. [Configuration Files](#configuration-files)
14. [AI Context — Rules for Future Development](#ai-context--rules-for-future-development)

---

## Project Overview

**SchemMe** is a web application built as part of a Hackathon (`HACKRUST`). Its mission is to make Indian government welfare schemes discoverable, understandable, and accessible to every citizen through AI-based personalisation.

The **frontend** is a polished, single-page marketing/landing site that showcases the core value proposition. It includes:

- A full-screen hero section with animated wavy background lines and a horizontally scrolling scheme preview carousel
- A scheme card carousel displaying key government schemes
- A statistics strip, a step-by-step "How It Works" section
- A categorised grid of schemes (Agriculture, Healthcare, Education, etc.)
- A dark, multi-column footer
- A sticky dark-themed global navigation bar

The project has **no backend calls** in the current version; all data is hardcoded.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | **React** | 18.3.1 |
| Build Tool | **Vite** | 6.3.5 |
| Language | **TypeScript** (`.tsx`) | — |
| Styling | **Tailwind CSS v4** | 4.1.12 |
| Animation | **Motion (Framer Motion v12)** | 12.23.24 |
| Icons | **Lucide React** | 0.487.0 |
| UI Primitives | **Radix UI** (full suite) | Various |
| Component Library | **MUI (Material UI)** | 7.3.5 |
| Forms | **React Hook Form** | 7.55.0 |
| Charts | **Recharts** | 2.15.2 |
| Toasts | **Sonner** | 2.0.3 |
| DnD | **React DnD** | 16.0.1 |
| Carousel Engine | **Embla Carousel** | 8.6.0 |
| PostCSS | Handled automatically by `@tailwindcss/vite` | — |

---

## Project Structure

```
SchemMe-Frontend/
├── index.html                     # HTML shell — mounts React into #root
├── package.json                   # Dependencies, scripts, peer deps
├── vite.config.ts                 # Vite config: React + Tailwind plugins, @ alias
├── postcss.config.mjs             # PostCSS (empty — Tailwind handled by Vite plugin)
├── .gitignore
│
└── src/
    ├── main.tsx                   # Entry point — createRoot, mounts <App />
    │
    ├── styles/
    │   ├── index.css              # CSS entry: imports fonts, tailwind, theme
    │   ├── fonts.css              # Google Fonts import (DM Sans + Playfair Display)
    │   ├── tailwind.css           # Tailwind v4 source directive + tw-animate-css
    │   └── theme.css              # Full design token system (CSS custom properties)
    │
    ├── assets/
    │   ├── 7f5e0fee...504.png     # SchemeMe logo icon (used in Navbar & Footer)
    │   ├── c512d0fe...83c.png     # Figma asset (secondary image)
    │   └── ed00409f...0cc.png     # Figma asset (large background/hero image)
    │
    └── app/
        ├── App.tsx                # Root component — composes all page sections
        └── components/
            ├── Hero.tsx           # Full-screen hero with FloatingLines + image carousel
            ├── FloatingLines.tsx  # Canvas-based animated wavy line background
            ├── SchemeCarousel.tsx # Auto-scrolling scheme card marquee
            ├── Sections.tsx       # Navbar, StatsStrip, HowItWorks, CategoriesGrid, Footer
            │
            ├── figma/
            │   └── ImageWithFallback.tsx  # Image component with SVG error fallback
            │
            └── ui/                        # Full shadcn/Radix UI component library
                ├── accordion.tsx
                ├── alert-dialog.tsx
                ├── alert.tsx
                ├── aspect-ratio.tsx
                ├── avatar.tsx
                ├── badge.tsx
                ├── breadcrumb.tsx
                ├── button.tsx
                ├── calendar.tsx
                ├── card.tsx
                ├── carousel.tsx
                ├── chart.tsx
                ├── checkbox.tsx
                ├── collapsible.tsx
                ├── command.tsx
                ├── context-menu.tsx
                ├── dialog.tsx
                ├── drawer.tsx
                ├── dropdown-menu.tsx
                ├── form.tsx
                ├── hover-card.tsx
                ├── input-otp.tsx
                ├── input.tsx
                ├── label.tsx
                ├── menubar.tsx
                ├── navigation-menu.tsx
                ├── pagination.tsx
                ├── popover.tsx
                ├── progress.tsx
                ├── radio-group.tsx
                ├── resizable.tsx
                ├── scroll-area.tsx
                ├── select.tsx
                ├── separator.tsx
                ├── sheet.tsx
                ├── sidebar.tsx
                ├── skeleton.tsx
                ├── slider.tsx
                ├── sonner.tsx
                ├── switch.tsx
                ├── table.tsx
                ├── tabs.tsx
                ├── textarea.tsx
                ├── toggle-group.tsx
                ├── toggle.tsx
                ├── tooltip.tsx
                ├── use-mobile.ts   # Custom hook — returns boolean (isMobile via 768px breakpoint)
                └── utils.ts        # `cn()` utility — merges Tailwind classes (clsx + tailwind-merge)
```

---

## Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** (or pnpm — project has `pnpm.overrides` in `package.json`)

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server (Vite)
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Build

```bash
npm run build
```

---

## Architecture

### Entry Flow

```
index.html  →  src/main.tsx  →  src/app/App.tsx
```

1. `index.html` — bare HTML shell with `<div id="root">` and a `<script type="module">` pointing to `src/main.tsx`
2. `main.tsx` — calls `createRoot(...).render(<App />)`, imports `./styles/index.css`
3. `App.tsx` — the root React component, composes the full page layout

### App Layout (`App.tsx`)

The page is a single vertical scrolling layout:

```
<div>  ← min-h-screen, warm gradient background, DM Sans font, text-[#111827]
  <Navbar />           ← Fixed top navigation
  <main>
    <Hero />           ← Full-screen animated hero
    <SchemeCarousel /> ← Auto-scrolling scheme cards (marquee)
    <StatsStrip />     ← Key statistics (500+ schemes, 2.8Cr+ beneficiaries, etc.)
    <HowItWorks />     ← 4-step process section
    <CategoriesGrid /> ← 10-category grid
    <PersonalisationCTA /> ← (Currently returns null — placeholder for future)
  </main>
  <Footer />           ← Dark 4-column footer
</div>
```

**App-level gradient background:**
```css
background: linear-gradient(to bottom-right, #FFF9F0, #F0FDF4, #FEF3E2)
```

---

## Pages & Sections

### 1. Navbar
**File:** `src/app/components/Sections.tsx` → `export const Navbar`

- Fixed to top (`position: fixed, z-50`)
- Background: `#0B2545/95` (dark navy) with `backdrop-blur-md`
- Height: `80px`
- **Left:** `<SchemeLogo />` — logo image + "Scheme**Me**" wordmark (yellow "Me")
- **Center:** Search input bar (hidden on mobile) with orange gradient search button
- **Right:** Nav links (Home, Schemes, About) + Sign In + "Get Started" gradient button
- Nav links use an underline accent `after:` pseudo-element for the active "Home" link

### 2. Hero Section
**File:** `src/app/components/Hero.tsx` → `export const Hero`

- Full-screen (`min-h-screen`), centered flex column
- Custom warm gradient background: `150deg, #F5ECD8 → #EDD5B5 → #E8C49A → #D4E8CE → #C8D8E4 → #DDD0E8`
- **Background Layer:** `<FloatingLines />` canvas animation (see below)
- **Content (Framer Motion fade-in, y: 30→0, 0.8s):**
  - H1: "Find the **Right Scheme**, Made for You" — Playfair Display, 5xl–7xl, dark navy `#0B2545`; "Right Scheme" has gradient text (`#D94F20 → #D9A030`)
  - Subtitle: "Personalized Government Schemes at Your Fingertips" — DM Sans, bold
  - Two CTA buttons: "Explore Schemes" (orange gradient, rounded-full) and "Learn More" (green `#2E9F75`)
  - **Horizontally scrolling scheme image carousel** (CSS `scroll-left` animation, 40s, infinite) with 5 scheme cards duplicated for seamless loop: PM-KISAN, Scholarship (×2), Ayushman Bharat, PM Awas Yojana — all using Unsplash images
  - Tagline: "Connecting You to Government Benefits That Matter" with decorative vertical lines

### 3. SchemeCarousel
**File:** `src/app/components/SchemeCarousel.tsx` → `export const SchemeCarousel`

- Section background: `#F9FAFB`
- **3 animated background orbs** (Framer Motion infinite float): amber/20, emerald/20, navy/15
- **Infinite marquee** (CSS `infinite-scroll` animation, 40s, pauses on hover) of scheme cards
- **6 Schemes:**
  1. Ayushman Bharat (Healthcare) — HeartPulse icon — `featured: true`
  2. PM Kisan Samman Nidhi (Agriculture) — Leaf icon
  3. PM Awas Yojana (Housing) — Home icon
  4. Startup India (Business) — Rocket icon
  5. Mudra Yojana (Finance) — Wallet icon
  6. Beti Bachao Beti Padhao (Women & Child) — Baby icon
- Card design: white/60 glassmorphism, backdrop-blur-xl, rounded-[20px], hover: lift + shadow-xl

### 4. StatsStrip
**File:** `src/app/components/Sections.tsx` → `export const StatsStrip`

- Background: `white/80`, `backdrop-blur-sm`
- 4 statistics in a responsive grid (2-col mobile, 4-col desktop):
  - **500+** Schemes Available
  - **2.8Cr+** Beneficiaries
  - **100%** Verified Direct Benefits
  - **24/7** AI Support

### 5. HowItWorks
**File:** `src/app/components/Sections.tsx` → `export const HowItWorks`

- Warm gradient background (`FFF9F0 → F0FDF4 → FEF3E2`)
- Two animating background blobs (Framer Motion, continuous drift)
- 4-step process, responsive 1→2→4 column grid:
  1. **Enter Details** — FileText icon
  2. **AI Matching** — Cpu icon
  3. **Review Schemes** — Search icon
  4. **Apply Easily** — CheckCircle icon
- Card design: white/60 glassmorphism, group-hover icon scale

### 6. CategoriesGrid
**File:** `src/app/components/Sections.tsx` → `export const CategoriesGrid`

- Background: `white/50`, backdrop-blur
- Two large animated gradient blobs (slow rotate + scale)
- Header: "Browse by Category" + "View All →" button
- **10 Categories** in a 2→3→5 column grid:
  Agriculture, Healthcare, Education, Business, Housing, Women & Child, Infrastructure, Pension, Minority, Transport
- Each card: icon in green gradient square, hover: lift + green border
- Category counts are static (e.g. "32 Schemes" for Education)

### 7. PersonalisationCTA
**File:** `src/app/components/Sections.tsx` → `export const PersonalisationCTA`

> ⚠️ Currently returns `null` — this is a **placeholder** for a future personalization section.

### 8. Footer
**File:** `src/app/components/Sections.tsx` → `export const Footer`

- Background: `#0B2545` (dark navy)
- 4-column layout (1→2→4 col):
  - **Col 1:** Logo + tagline
  - **Col 2:** Navigation (Home, How it Works, All Schemes, About Us)
  - **Col 3:** Categories (Agriculture, Healthcare, Education, Business & Startups)
  - **Col 4:** Legal & Help (Privacy, Terms, Help Center, Contact Support)
- Bottom bar: © 2026 Schemme Inc. | "Made in India" badge | "Secure Platform" green badge

---

## Components Reference

### `FloatingLines.tsx`

**Canvas-based animated background** — the most complex component in the project.

#### Props Interface

| Prop | Type | Default | Description |
|---|---|---|---|
| `linesGradient` | `string[]` | required | Array of hex color stops for line coloring |
| `enabledWaves` | `('top' \| 'middle' \| 'bottom')[]` | `['top','middle','bottom']` | Which of the 3 wave groups to render |
| `lineCount` | `[number, number, number]` | `[12, 20, 12]` | Line count per wave group |
| `lineDistance` | `[number, number, number]` | `[3, 2.5, 3.5]` | Vertical spacing between lines per group |
| `topWavePosition` | `{x, y, rotate}` | `{x:9.0, y:0.55, rotate:-0.25}` | Position/rotation of the top wave group |
| `middleWavePosition` | `{x, y, rotate}` | `{x:4.5, y:0.0, rotate:0.12}` | Position/rotation of the middle wave group |
| `bottomWavePosition` | `{x, y, rotate}` | `{x:2.0, y:-0.65, rotate:-0.6}` | Position/rotation of the bottom wave group |
| `animationSpeed` | `number` | `0.35` | Speed of the flowing wave animation |
| `interactive` | `boolean` | `true` | Whether lines react to mouse position |
| `bendRadius` | `number` | `3.5` | Radius (×100px) of mouse influence area |
| `bendStrength` | `number` | `-0.25` | Intensity of line bending near mouse |
| `mouseDamping` | `number` | `0.025` | Smoothing factor for mouse tracking |
| `parallax` | `boolean` | `true` | Enable subtle parallax on mouse move |
| `parallaxStrength` | `number` | `0.08` | Parallax movement strength |
| `mixBlendMode` | `string` | `'normal'` | CSS mix-blend-mode for the canvas |

#### How It Works Internally

1. A `<canvas>` element fills its parent container
2. On mount, it sets up a `requestAnimationFrame` loop
3. Each frame: clears canvas → smoothly moves mouse position (lerp with `mouseDamping`) → increments `timeRef`
4. For each wave group, it draws `lineCount[n]` lines:
   - Each line is colored by interpolating across `linesGradient` based on its index
   - Line shape = sum of 3 sine waves with different frequencies and phases, creating organic flow
   - If `interactive`, lines near the mouse are bent away using distance-based influence
   - If `parallax`, the wave group shifts slightly as the mouse moves
5. Colors are interpolated between hex stops using `hexToRgb()` + linear interpolation

#### Usage in Hero

```tsx
<FloatingLines
  linesGradient={["#F5ECD8","#EDD5B5","#E8C49A","#EAD6C0","#D4E8CE","#C2DFC9","#DDD0E8","#C8D8E4"]}
  enabledWaves={['top', 'middle', 'bottom']}
  lineCount={[12, 20, 12]}
  lineDistance={[2.2, 1.8, 2.5]}
  topWavePosition={{ x: 9.0, y: 0.70, rotate: -0.25 }}
  middleWavePosition={{ x: 4.5, y: 0.15, rotate: 0.12 }}
  bottomWavePosition={{ x: 2.0, y: -0.50, rotate: -0.6 }}
  animationSpeed={0.35}
  interactive={true}
  bendRadius={3.5}
  bendStrength={-0.25}
  mouseDamping={0.025}
  parallax={true}
  parallaxStrength={0.08}
  mixBlendMode="normal"
/>
```

---

### `ImageWithFallback.tsx`

A wrapper around `<img>` that catches load errors and renders a gray placeholder SVG.

```tsx
<ImageWithFallback src="..." alt="..." className="..." />
```

---

### UI Components (`src/app/components/ui/`)

This is a **complete shadcn/ui component library** built on top of Radix UI primitives. All components are styled with Tailwind v4 and respect the theme CSS variables in `theme.css`.

Key utilities:
- **`utils.ts`** — exports `cn(...inputs)` = `twMerge(clsx(inputs))` for conditional class merging
- **`use-mobile.ts`** — exports `useIsMobile()` hook; returns `true` if `window.innerWidth < 768`

All `ui/` components are available and ready to use throughout the app. They are **not currently imported** in the main sections but are scaffolded for future feature development.

---

## Styling System

All CSS is loaded through a chain of imports:

```
src/main.tsx
  └── src/styles/index.css
        ├── @import './fonts.css'     ← Google Fonts
        ├── @import './tailwind.css'  ← Tailwind v4 + tw-animate-css
        └── @import './theme.css'     ← Design tokens + base typography
```

### Tailwind v4 Setup

Tailwind v4 is configured via the **Vite plugin** (`@tailwindcss/vite`), not `tailwind.config.js`. Sources are scanned from `src/**/*.{js,ts,jsx,tsx}`.

The `@` alias resolves to `./src`, so imports like `@/components/ui/button` work.

---

## Design Tokens & Color Palette

All design tokens are defined as CSS custom properties in `src/styles/theme.css`. They support both `:root` (light) and `.dark` modes.

### Brand Colors (used inline with Tailwind)

| Purpose | Color | Usage |
|---|---|---|
| Navy (primary dark) | `#0B2545` | Navbar BG, headings, footer |
| Emerald Green | `#2E9F75` | CTAs, highlights, accent |
| Orange Gradient Start | `#FF7A45` | CTA buttons (from) |
| Yellow Gradient End | `#FFD166` | CTA buttons (to), logo "Me" |
| Warm Cream | `#F5ECD8` | Hero gradient start |
| Soft Peach | `#EDD5B5` | Hero gradient mid |
| Warm Peach | `#E8C49A` | Hero gradient mid |
| Pale Mint | `#D4E8CE` | Hero gradient mid |
| Body Text | `#111827` | General text (Tailwind `gray-900`) |

### CSS Variables (shadcn/theme system)

| Variable | Light Value | Dark Value |
|---|---|---|
| `--background` | `#ffffff` | `oklch(0.145 0 0)` |
| `--foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `--primary` | `#030213` | `oklch(0.985 0 0)` |
| `--muted` | `#ececf0` | `oklch(0.269 0 0)` |
| `--muted-foreground` | `#717182` | `oklch(0.708 0 0)` |
| `--destructive` | `#d4183d` | `oklch(0.396 0.141 25.723)` |
| `--border` | `rgba(0,0,0,0.1)` | `oklch(0.269 0 0)` |
| `--radius` | `0.625rem` | same |
| `--font-size` | `16px` | same |

---

## Typography

### Fonts (loaded from Google Fonts)

| Font | Usage |
|---|---|
| **DM Sans** (variable 100–1000, italic) | Body text, UI labels, nav links, descriptions |
| **Playfair Display** (400–900, italic) | Headings (`h1`, `h2`, `h3`), scheme card titles, logo wordmark |

### Base Typography (`theme.css @layer base`)

| Element | Size | Weight | Line Height |
|---|---|---|---|
| `html` | 16px (var) | — | — |
| `h1` | `--text-2xl` | 500 | 1.5 |
| `h2` | `--text-xl` | 500 | 1.5 |
| `h3` | `--text-lg` | 500 | 1.5 |
| `h4` | `--text-base` | 500 | 1.5 |
| `label` | `--text-base` | 500 | 1.5 |
| `button` | `--text-base` | 500 | 1.5 |
| `input` | `--text-base` | 400 | 1.5 |

> ⚠️ These base sizes can be overridden with Tailwind utility classes (e.g., `text-7xl`).

---

## Dependencies

### Key Runtime Dependencies

| Package | Purpose |
|---|---|
| `react` + `react-dom` | Core UI framework |
| `motion` (v12) | Animations — `motion/react` import path |
| `lucide-react` | Icon library (Search, Leaf, Home, HeartPulse, etc.) |
| `@radix-ui/*` | Headless UI primitives for all `ui/` components |
| `@mui/material` + `@mui/icons-material` | Material Design components |
| `tailwind-merge` | Merge conflicting Tailwind classes |
| `clsx` | Conditional class name utility |
| `class-variance-authority` | Variant-based component styling |
| `embla-carousel-react` | Embla carousel engine (used in `ui/carousel.tsx`) |
| `react-router` | Client-side routing (v7) |
| `react-hook-form` | Form management |
| `recharts` | Data visualization charts |
| `sonner` | Toast notifications |
| `react-dnd` + `react-dnd-html5-backend` | Drag and drop |
| `react-resizable-panels` | Resizable panel layouts |
| `date-fns` | Date utility functions |
| `next-themes` | Dark/light theme switching |
| `canvas-confetti` | Confetti celebration animations |
| `vaul` | Bottom drawer component |
| `cmdk` | Command palette component |
| `input-otp` | OTP input component |

### Dev Dependencies

| Package | Purpose |
|---|---|
| `vite` | Build tool + dev server |
| `@vitejs/plugin-react` | React Fast Refresh + JSX transform |
| `tailwindcss` | Utility CSS framework |
| `@tailwindcss/vite` | Tailwind v4 Vite integration |

---

## Assets

All image assets are stored in `src/assets/` and imported using the Figma asset protocol (`figma:asset/<hash>.png`):

| File | Usage |
|---|---|
| `7f5e0fee18015700bb712cd959957fea12d80504.png` | SchemeMe logo icon (Navbar + Footer) |
| `c512d0fe078cfb783d5b5e125549a01da120883c.png` | Secondary Figma asset |
| `ed00409f87186415fd4cfe9d98c65547b16a72cc.png` | Large Figma asset (hero/background) |

Hero section scheme images are loaded from **Unsplash** via direct URL (crop=entropy, tinysrgb, max 1080px).

---

## Configuration Files

### `vite.config.ts`
- Plugins: `react()` + `tailwindcss()`
- Path alias: `@` → `./src`
- Raw asset support: `**/*.svg`, `**/*.csv`

### `postcss.config.mjs`
- Empty — Tailwind v4 handles PostCSS automatically via the Vite plugin. Do NOT add `tailwindcss` here.

### `package.json`
- `type: "module"` — full ESM
- Scripts: `dev` (vite), `build` (vite build)
- React and react-dom are `peerDependencies` (optional: true) — they are still required at runtime

---

## AI Context — Rules for Future Development

> This section is for AI assistants (like Antigravity/Gemini) analysing this codebase. Read this before making any changes.

### File Organization Rules
- Feature components live in `src/app/components/`
- Shared/primitive UI components live in `src/app/components/ui/` (shadcn-style)
- Figma-specific utilities live in `src/app/components/figma/`
- All CSS is in `src/styles/` — never add `<style>` blocks with global resets elsewhere
- The `@` alias resolves to `src/` — always use `@/` for imports within `src/`

### Styling Rules
- **Tailwind v4** — no `tailwind.config.js`; config is done via CSS `@theme` in `theme.css`
- Always prefer Tailwind utility classes; avoid raw `style={{}}` unless for dynamic/computed values
- Never add TailwindCSS `@import 'tailwindcss'` to `index.css` — it is already in `tailwind.css`
- Do not add `tailwindcss` or `autoprefixer` to `postcss.config.mjs`
- Custom keyframe animations can be injected via `<style dangerouslySetInnerHTML>` inside components if needed (pattern already used in Hero and SchemeCarousel)

### Animation Rules
- Use `motion` from `'motion/react'` (not `'framer-motion'`) — this is Motion v12
- Canvas animations use `requestAnimationFrame` with `useEffect` cleanup
- Always cancel animation frames in the `useEffect` return cleanup function

### Component Rules
- `cn()` from `@/app/components/ui/utils` is the standard class merging utility
- `useIsMobile()` from `@/app/components/ui/use-mobile` for responsive logic
- All `ui/` shadcn components use CSS variables from `theme.css` — never hardcode colors in them

### Data Rules
- All scheme/category data is currently **hardcoded** in the component files
- Future: extract to a `src/data/` directory or fetch from a backend API

### Current Placeholders / TODOs
- `PersonalisationCTA` component returns `null` — awaiting implementation
- No routing implemented yet — the entire app is a single landing page
- No authentication — "Sign In" and "Get Started" buttons are non-functional
- No backend API calls — all data is static

### Color Reference (quick access for AI)
```
Navy Dark:      #0B2545   (navbars, headings, footer)
Emerald:        #2E9F75   (primary green accent, CTAs)
Orange Warm:    #FF7A45   (button gradient start, icons)
Yellow Gold:    #FFD166   (button gradient end, logo accent)
Body Text:      #111827   (Tailwind gray-900)
Muted Text:     #111827/60 (60% opacity)
Hero Gradient:  linear-gradient(150deg, #F5ECD8 → #EDD5B5 → #E8C49A → #D4E8CE → #C8D8E4 → #DDD0E8)
App Background: linear-gradient(135deg, #FFF9F0 → #F0FDF4 → #FEF3E2)
```

### Typography Reference (quick access for AI)
```
Headings:    font-['Playfair_Display']
Body/UI:     font-['DM_Sans', sans-serif]
```
