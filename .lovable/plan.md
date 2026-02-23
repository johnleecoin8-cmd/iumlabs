

# Services Section (02) Visual Enhancement

## Goal
Add distinctive visual elements to the Services section to match the richness of the Cases section, while keeping the clean zigzag layout intact.

## What We'll Add

### 1. Background Visual Layer
- Subtle dot grid pattern (matching Cases section style)
- Faint scanline overlay for a techy/agency feel
- A soft radial glow centered behind the section

### 2. Hover Glow Effect per Row
- Each service row gets a subtle colored glow on hover (similar to how Cases cards have per-project color glows)
- Assign a unique accent color to each service (e.g., GTM = cyan, Branding = purple, SEO = green, etc.)
- On hover, a soft colored shadow/glow appears around or behind the row

### 3. Animated Accent Details
- A thin horizontal progress-like line at the bottom of each row that fills on hover (like the Cases progress bars)
- The "Service 0X" label gets a subtle typing/fade animation when scrolled into view

### 4. Floating Particles (Lightweight)
- 4-6 small floating dots in the section background, gently animating up/down with varying opacity (same pattern as Cases)
- Only rendered on desktop to keep mobile snappy

### 5. Section Edge Gradients
- Top and bottom fade gradients to blend the section edges smoothly into the dark background

## Technical Details

### File: `src/components/ServicesSection.tsx`
- Add a background effects container (dot grid, scanline, floating particles) using CSS + framer-motion
- Add a `color` property to each service object for per-row accent glow
- Add a bottom progress bar div to each `ServiceRow` that scales from 0 to 100% width on hover
- Add top/bottom gradient overlays to the section wrapper
- Import `motion` from framer-motion (already installed)

### No new files or dependencies needed
- framer-motion is already installed
- All changes contained within `ServicesSection.tsx`
