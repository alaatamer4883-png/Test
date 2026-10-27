---
name: LUMEN Lifestyle
colors:
  surface: '#fbf8ff'
  surface-dim: '#dbd9e1'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2fb'
  surface-container: '#efecf5'
  surface-container-high: '#eae7ef'
  surface-container-highest: '#e4e1ea'
  on-surface: '#1b1b21'
  on-surface-variant: '#574239'
  inverse-surface: '#303036'
  inverse-on-surface: '#f2eff8'
  outline: '#8b7267'
  outline-variant: '#dec0b4'
  surface-tint: '#a04100'
  primary: '#9c3f00'
  on-primary: '#ffffff'
  primary-container: '#c05410'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb693'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e5e2e1'
  on-secondary-container: '#656464'
  tertiary: '#38654d'
  on-tertiary: '#ffffff'
  tertiary-container: '#507e65'
  on-tertiary-container: '#f6fff6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcb'
  primary-fixed-dim: '#ffb693'
  on-primary-fixed: '#341000'
  on-primary-fixed-variant: '#7a3000'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474646'
  tertiary-fixed: '#bceecf'
  tertiary-fixed-dim: '#a1d1b4'
  on-tertiary-fixed: '#002112'
  on-tertiary-fixed-variant: '#224f39'
  background: '#fbf8ff'
  on-background: '#1b1b21'
  surface-variant: '#e4e1ea'
typography:
  display-hero:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 52px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Bodoni Moda
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 26px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
  headline-sm:
    fontFamily: Bodoni Moda
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  title-editorial:
    fontFamily: Bodoni Moda
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 22px
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system mediates between high-fashion editorial restraint and conversion-driven mobile commerce ergonomics. The brand evokes curation, architectural clarity, and intentionality—reminiscent of contemporary luxury platforms while retaining the immediate, frictionless clarity necessary for premium retail. 

The aesthetic marries elevated editorial minimalism with tactile precision. Visual density is strictly curated: ample whitespace separates product stories, typography commands focal hierarchy with razor-sharp contrast, and accents of terracotta punctuate intentional actions. The experience prioritizes tactile responsiveness, typographic authority, and seamless transactional mechanics.

## Colors

The palette operates with strict structural intent:

- **Primary (`#C85A17`)**: High-chroma warm terracotta utilized deliberately for focal interaction drivers, bag additions, promotional flags, and direct conversion affordances.
- **Secondary (`#121212`)**: Deep onyx charcoal anchoring principal typography, structural boundaries, and full-bleed high-contrast buttons.
- **Tertiary (`#2D5A43`)**: Refined botanical sage reserved for reassurance metrics, ethical sourcing declarations, availability indicators, and quiet trust anchors.
- **Neutral Core (`#1E1E24`)**: Deep base text ensuring precise readability against soft canvas grounds.
- **Canvas & Surface System**: Ground layers lean on `#FAFAF9` (warm off-white) to soften visual glare, paired with `#FFFFFF` for product card planes and modal sheets. Boundaries rely on hairline dividers (`#E5E7EB` / `#F3F4F6`), avoiding harsh visual breaks while preserving optical balance.

## Typography

The typographical cadence balances Bodoni Moda’s razor-thin vertical serifs with the pragmatic legibility of Plus Jakarta Sans. 

- **Display & Headlines (Bodoni Moda)**: Injects an editorial gaze into category intros, curation modules, and product hero headers. Kerning sits slightly contracted to tighten display impact.
- **Body & Controls (Plus Jakarta Sans)**: Governs all conversion utilities, product metadata, pricing indicators, and interactive affordances. Numbers and tabular metrics use proportional lining figures to ensure clarity in pricing breakdowns.
- **Utility & Metadata**: Labels, badges, and uppercase category ribbons enforce slight positive tracking (`0.04em` to `0.06em`) for immediate scannability at small sizes.

## Layout & Spacing

The layout is built around a mobile-first responsive grid:

- **Mobile Viewports (Under 768px)**: 4-column layout with `margin-mobile: 1rem` and `gutter-mobile: 0.75rem`. Content stacks to elevate full-bleed editorial imagery, with dual-column product listings allowing rapid visual appraisal.
- **Tablet & Mid-tier (768px - 1024px)**: 8-column layout expanding margins to `1.5rem`, distributing modular cards across asymmetric split-rhythms.
- **Desktop (1024px+)**: 12-column architecture capped at 1320px maximum container width, centered with `margin: 2rem` or wider dynamic margins, framing spacious white borders.
- **Rhythm**: Element groupings apply strict spacing multipliers (`space-xs` through `space-xl`). All touch targets guarantee an uncompromised minimum height of 48px to prevent touch degradation during single-hand mobile interactions.

## Elevation & Depth

Visual hierarchy rejects exaggerated drop shadows in favor of architectural surfaces and low-contrast borders:

- **Level 0 (Base)**: Main body ground utilizing `#FAFAF9` with completely flat depth.
- **Level 1 (Card & Content Blocks)**: Pure `#FFFFFF` surfaces defined by a 1px solid hairline outline in `#E5E7EB`. Cast shadows are suppressed or replaced with ambient diffusion: `0 2px 8px rgba(18, 18, 18, 0.03)`.
- **Level 2 (Persistent Bars & Sticky Actions)**: Mobile sticky navigation, bottom purchase bars, and floating filtering triggers leverage soft white backing with backdrop blur (`backdrop-filter: blur(12px)`) and a delicate upper demarcation hairline (`#E5E7EB`).
- **Level 3 (Drawers & Modal Cart)**: Slide-over commerce drawers and quick-view modals introduce layered depth via deep 15% opacity onyx underlays (`rgba(18, 18, 18, 0.4)`) paired with directional smooth ambient shading: `0 12px 32px rgba(18, 18, 18, 0.1)`.

## Shapes

The design system embraces balanced roundedness (Value 2). Elements rely on 0.5rem (8px) base radii, while compound interactive panels, banners, and modal containers extend to 1rem (`rounded-lg`) and 1.5rem (`rounded-xl`).

This creates a warm, refined geometry: crisp enough to honor architectural rigor and high-fashion luxury, but softened sufficiently to provide comfortable touch ergonomics on handheld viewports. Badges, counter indicators, and pill tags employ full circular finishes when conveying isolated state markers.

## Components

### Buttons
- **Primary Action (Conversion CTA)**: Solid Terracotta (`#C85A17`) with crisp white label text. 52px height on mobile, 48px on desktop. Bold sans typography with slight tracking. Active state scales subtly (`scale(0.98)`).
- **Secondary Action (Brand Anchor)**: Solid Charcoal (`#121212`) or transparent background with a 1.5px Charcoal border. White or black text respectively.
- **Tertiary / Ghost**: Borderless with an animated bottom hairline on hover/focus, maintaining 48px hit areas through transparent padding.

### Chips & Attribute Selectors
- **Size & Fit Pills**: Crisp rectangular geometry with 8px radius (`roundedness: 2`). Unselected state presents `#FAFAF9` ground with `#E5E7EB` outline. Selected state swaps to solid `#121212` with pure white text. Out-of-stock variations feature a diagonal strike-through and reduced opacity (40%).
- **Curated Category Filters**: Horizontal scroll with hidden scrollbars. Semi-transparent background with quick toggle active states.

### Input Fields & Selectors
- **Form Controls**: Minimum 48px height. Subdued warm-white background (`#FAFAF9`) bounded by `#E5E7EB`. Upon focus, borders transition smoothly to `#121212` without glow effects. Error states invoke high-contrast crimson alongside inline micro-copy. Floating labels utilize `label-md` styling.

### Product Cards
- **Structure**: Aspect ratio strictly framed at 4:5 or 3:4 portrait orientation for garment focus. Clean `#FFFFFF` image container with a 1px hairline border. 
- **Metadata Layout**: Typographic hierarchy separates the creator or brand line (tiny tracked uppercase), product title in `body-md`, and numeric price pinned right or adjacent in medium charcoal. Badges (e.g., "Sustainable", "Archive") anchor to the top-left using `tertiary` sage green or deep onyx.

### Lists & Accordions
- **Collapsible Drawers (PDP Information)**: Minimal horizontal rules separating shipping, care, and composition details. Chevron indicators transition 180 degrees. Content expansions reveal unhurried `body-md` typography.

### Sticky Mobile Conversion Rail
- **Direct-to-Bag Footer**: Fixed bottom chassis on single product views. Houses immediate size selection alongside a prominent terracotta "Add to Bag" button. Background features high-translucency white (`rgba(255, 255, 255, 0.9)`) with a structural top hairline.