
# Services Section Visual Refinement

## Current Issues
- Row height too compact (80-100px) making images and text feel cramped
- Image overlays and number watermarks look inconsistent across different service images
- Text content side feels bare and unstructured
- Alternating content direction (flex-row-reverse) for text side adds confusion rather than elegance
- No visual breathing room between the image and text halves
- Section lacks a cohesive, polished agency feel

## Refinement Plan

### 1. Increase Row Height for Visual Breathing Room
- Restore row height to `h-[140px] sm:h-[160px] md:h-[180px]` -- enough to let images breathe without being oversized
- Keep the 50/50 image-to-content ratio

### 2. Clean Up Image Side
- Keep the alternating left/right image placement (the zigzag)
- Add a consistent gradient overlay (bottom-to-top dark gradient) instead of flat black/30
- Make the number overlay larger and more intentional as a design element: semi-transparent, positioned consistently in the corner nearest the content
- Subtle zoom on hover (keep existing scale-110)

### 3. Polish Content Side
- Remove the reversed flex direction for text -- keep text always left-aligned for readability regardless of which side it's on
- Structure content vertically: small mono "SERVICE 01" label on top, title below, description under that
- Add a subtle vertical accent line on the border between image and content (the side facing the image)
- Arrow indicator stays at the far edge, vertically centered

### 4. Consistent Styling
- Add a thin `border-white/[0.06]` divider between rows (matching the site's design system)
- Content background: `bg-[#0A0A0A]` base with `hover:bg-[#111]` for subtle feedback
- Typography: title in `text-lg md:text-2xl font-bold tracking-tight`, description in `text-xs md:text-sm text-muted-foreground/50`

### 5. Animation Polish
- Keep the directional slide-in (left for even, right for odd)
- Reduce translate distance from 12 to 8 for subtlety
- Keep stagger delay at 80ms per item

## Technical Details
- Single file edit: `src/components/ServicesSection.tsx`
- No new dependencies needed
- All changes are CSS/layout adjustments within the existing component structure
