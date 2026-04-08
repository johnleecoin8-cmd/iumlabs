# ium Labs Design System

> Inspired by Linear (dark surfaces, elevation, borders) + Kraken (purple accent scale, crypto patterns)

## 1. Visual Theme & Atmosphere

Dark-mode-native. Near-black canvas where content emerges through luminance hierarchy.
Premium, precise, crypto-industry professional. No visual noise — every element earns its place.

## 2. Color Palette

### Surfaces (Luminance Stepping)
| Token | Value | Use |
|-------|-------|-----|
| `--bg-deep` | `#0A0A0A` | Page background, deepest canvas |
| `--bg-panel` | `#0F0F0F` / `#111` | Section backgrounds, panels |
| `--bg-elevated` | `#1A1A1A` | Cards, elevated containers |
| `--bg-hover` | `#222` | Hover states on surfaces |

### Text
| Token | Value | Use |
|-------|-------|-----|
| `--text-primary` | `#F7F8F8` | Headlines, primary content (not pure white) |
| `--text-secondary` | `rgba(255,255,255,0.75)` | Body text, descriptions |
| `--text-muted` | `rgba(255,255,255,0.45)` | Captions, metadata, labels |
| `--text-subtle` | `rgba(255,255,255,0.25)` | Disabled, hints |

### Brand Accent (Purple)
| Token | Value | Use |
|-------|-------|-----|
| `--accent` | `#b48cde` | Primary accent, gradient start |
| `--accent-bright` | `#c084fc` | Gradient end, hover states |
| `--accent-muted` | `#a78bfa` | Gradient mid, links |
| `--accent-bg` | `rgba(180,140,222,0.08)` | Subtle accent backgrounds |
| `--accent-border` | `rgba(180,140,222,0.25)` | Accent borders |

### Borders
| Token | Value | Use |
|-------|-------|-----|
| `--border-subtle` | `rgba(255,255,255,0.06)` | Section wrappers, default |
| `--border-standard` | `rgba(255,255,255,0.10)` | Cards, inputs, dividers |
| `--border-emphasis` | `rgba(255,255,255,0.15)` | Interactive, hover borders |

### Status
| Token | Value | Use |
|-------|-------|-----|
| `--success` | `#10b981` | Active indicators, success |
| `--success-bg` | `rgba(16,185,129,0.16)` | Success badges |

## 3. Typography

### Font Stack
- **Primary**: `'DM Sans', 'Inter', system-ui, sans-serif`
- **Mono**: `'IBM Plex Mono', ui-monospace, monospace`
- **Korean**: `'Noto Sans KR', sans-serif`

### Hierarchy
| Role | Size | Weight | Letter Spacing | Line Height |
|------|------|--------|----------------|-------------|
| Display XL | clamp(2.8rem, 7vw, 5.5rem) | 800 | -0.03em | 1.05 |
| Display | clamp(2rem, 5vw, 4rem) | 700 | -0.02em | 1.1 |
| Heading 1 | text-2xl (1.5rem) | 700 | -0.01em | 1.2 |
| Heading 2 | text-xl (1.25rem) | 600 | normal | 1.3 |
| Body Large | text-lg (1.125rem) | 300 | normal | 1.75 |
| Body | text-base (1rem) | 400 | normal | 1.6 |
| Caption | text-sm (0.875rem) | 500 | normal | 1.5 |
| Label | text-xs (0.75rem) | 500 | 0.1em+ | 1.4 |
| Micro | text-[10px] | 400 | 0.2em+ | 1.4 |
| Mono Label | text-xs | 500 | 0.12em | uppercase |

### Principles
- Headlines: heavy weight (700-800) + negative tracking = compressed authority
- Body: light weight (300-400) for reading comfort on dark backgrounds
- Labels/Mono: uppercase + wide tracking for structural hierarchy
- Display gradient text: `bg-gradient-to-r from-[#b48cde] via-[#a78bfa] to-[#c084fc]` with `bg-clip-text`

## 4. Component Patterns

### Section Wrappers (Index page card sections)
```
container: sm:px-4 sm:pt-3
inner: sm:rounded-3xl overflow-hidden bg-[#111] border border-white/[0.06]
header: px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10
```

### Cards
- Background: `bg-zinc-900/80` or `rgba(255,255,255,0.03)`
- Border: `border border-white/[0.08]` → hover `border-white/[0.15]`
- Radius: `rounded-2xl` (16px) standard, `rounded-3xl` (24px) for sections
- Hover: `hover:-translate-y-1 transition-all duration-300`
- No box-shadow on dark — use border luminance for depth

### Buttons
**Primary CTA**
- `bg-white text-black font-semibold rounded-full px-6 py-3.5`
- Hover: `hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]`

**Ghost/Secondary**
- `border border-white/[0.1] text-white/50 rounded-full`
- Hover: `hover:border-white/[0.2] hover:text-white`

**Accent CTA (service pages)**
- Background: accent color, white text
- Hover: `hover:scale-105 transition-all duration-300`

### Stat Counters
- Value: `text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter`
- Label: `text-[11px] sm:text-base text-white/50 font-medium`
- Layout: grid with equal columns, no visible separators on transparent bg

### Logo Marquee Pills
```
flex items-center gap-1.5 sm:gap-3 mx-1 sm:mx-2 
px-3 sm:px-6 py-2 sm:py-3.5 
bg-zinc-900/80 rounded-full 
border border-white/15 hover:border-white/25 hover:bg-zinc-800/80
transition-all duration-300
```
Logo: `h-3.5 sm:h-7 object-contain`
Name: `text-white/75 text-[10px] sm:text-sm font-medium`

### Service Detail Hero (svc-detail pages)
- Full viewport height: `height: 100vh`
- Background image: `filter: brightness(.35)`
- Gradient overlay: `linear-gradient(180deg, rgba(8,8,8,.3) 0%, rgba(8,8,8,.15) 40%, rgba(8,8,8,.4) 85%, rgba(8,8,8,.3) 100%)`
- Stats bar: `position: absolute; bottom: 0; background: transparent; z-index: 3`
- Title: weight 800, gradient `strong` text

### Accordion Blocks (GTM services)
- Border-top dividers only
- Hover: subtle accent background `rgba(accent, 0.04)`
- Left accent bar on hover: `3px solid accent, scaleY animation`
- Number: large serif, faded, transitions to accent on hover

## 5. Layout Principles

### Spacing
- Section vertical padding: `py-8 sm:py-12 md:py-14` (compact) to `py-16 sm:py-24` (generous)
- Content max-width: `max-w-7xl` (1280px) or `max-w-[1400px]`
- Section horizontal padding: `px-4 sm:px-6 lg:px-10`

### Grid
- Stats: `grid-cols-2 md:grid-cols-5` (5 canonical stats)
- Services: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Team: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

### Elevation (No Shadows on Dark)
Depth is communicated through surface luminance stepping, not shadows:
1. `#0A0A0A` — deepest (page bg)
2. `#111` — panels, section bg
3. `#1A1A1A` — cards, elevated
4. `rgba(255,255,255,0.03-0.05)` — interactive surfaces

Border luminance also indicates elevation:
- `border-white/[0.06]` — default
- `border-white/[0.10]` — card level
- `border-white/[0.15]` — hover/interactive

## 6. Responsive Behavior

### Breakpoints (Tailwind defaults)
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <640px | Single column, compact padding, text scales down |
| sm | 640px | Section padding starts, rounded corners appear |
| md | 768px | Multi-column grids, larger text |
| lg | 1024px | Full desktop layout |
| xl | 1280px | Max content width reached |

### Mobile Patterns
- Sections lose `px-4 rounded-3xl` wrapper → full-bleed on mobile
- Stats: `grid-cols-2` with border-top on 3rd+ items
- Hero: reduced padding-bottom, stat bar `grid-cols-2`
- Marquee: smaller pills, smaller logos
- Service cards: single column stack

## 7. Canonical Stats (Source of Truth)

These numbers must be consistent across ALL pages:
| Stat | Value |
|------|-------|
| Client Valuation | $7B+ |
| KOL Network | 230+ |
| Korea Entries | 22+ |
| Revenue Generated | $30M+ |
| Events Hosted | 70+ |

## 8. Do's and Don'ts

### Do
- Use `#F7F8F8` for primary text, not pure `#ffffff`
- Use semi-transparent white borders (`rgba(255,255,255, 0.06-0.15)`) for structure
- Use luminance stepping for elevation (darker = deeper, lighter = elevated)
- Keep accent purple reserved for CTAs, highlights, gradient text
- Use `font-weight: 300` for body text on dark backgrounds (easier to read)
- Use negative letter-spacing on display headlines (-0.02em to -0.04em)
- Animate with `transition-all duration-300` as default

### Don't
- Don't use box-shadows for elevation on dark surfaces
- Don't use solid colored borders — always semi-transparent white
- Don't use pure white (#fff) for large text areas
- Don't mix accent colors — purple is the only chromatic color
- Don't use font-weight above 800
- Don't add visible dividers between sections — dark spacing is the separator
