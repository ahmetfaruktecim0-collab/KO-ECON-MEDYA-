---
name: SBF Global Nexus
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3e4a3d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6e7a6c'
  outline-variant: '#bdcaba'
  surface-tint: '#006e2b'
  primary: '#006b2a'
  on-primary: '#ffffff'
  primary-container: '#008737'
  on-primary-container: '#f7fff2'
  inverse-primary: '#65de7c'
  secondary: '#545f73'
  on-secondary: '#ffffff'
  secondary-container: '#d5e0f8'
  on-secondary-container: '#586377'
  tertiary: '#545c72'
  on-tertiary: '#ffffff'
  tertiary-container: '#6c748b'
  on-tertiary-container: '#fefcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#82fc96'
  primary-fixed-dim: '#65de7c'
  on-primary-fixed: '#002108'
  on-primary-fixed-variant: '#00531f'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Work Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Work Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Work Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
  data-mono:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin: 48px
  widget-gap: 16px
---

## Brand & Style

The design system is engineered to bridge the gap between traditional academic prestige and the fast-paced world of global finance and political science. It targets students, faculty, and international researchers who require a high-density information environment that remains intuitive and authoritative.

The visual style is **Corporate Modern with Glassmorphism**. This approach uses semi-transparent surfaces to represent transparency in governance and "clarity" in economic data. The aesthetic is sophisticated and precise, evoking the atmosphere of a premium financial terminal while maintaining the institutional weight of Kocaeli University. Dynamic transitions—such as subtle parallax on scroll and smooth state changes in data widgets—ensure the interface feels alive and responsive to real-world shifts.

## Colors

The palette is rooted in the heritage of Kocaeli University, utilizing the signature **Institutional Green** as the primary action color. To establish the "financial atmosphere," this is paired with **Deep Navy (Secondary)** and **Obsidian (Tertiary)**, which provide the gravitas necessary for political and economic content.

Professional blues are introduced as functional accents for data visualization and hyperlinks, while a range of slate grays provides the structural scaffolding. The color system utilizes high-contrast pairings to ensure that critical financial indicators (e.g., market indices or faculty deadlines) are immediately legible.

## Typography

This design system employs a dual-font strategy for maximum clarity. **Work Sans** is used for headings to provide a bold, architectural presence that commands attention on large displays. Its geometric construction feels both modern and institutional.

**Inter** is utilized for body text and interface elements. It is optimized for screen readability, specifically for the dense data tables and long-form academic papers common in the Faculty of Political Sciences. A specific "Data-Mono" style is reserved for live ticker feeds and currency values, ensuring numbers align perfectly in vertical columns.

## Layout & Spacing

The design system utilizes a **12-column fixed grid** for primary content pages, centering the layout to provide a focused, premium reading experience. For data-heavy dashboards, a fluid variant is employed to maximize horizontal real estate.

The spacing rhythm is based on an 8px base unit. Wide margins (48px+) are used on landing pages to evoke a sense of "intellectual space" and prestige, while internal administrative screens use tighter packing (16px widget gaps) to minimize scrolling and keep live data "above the fold."

## Elevation & Depth

Hierarchy is established through **Glassmorphism and Tonal Layering**. Unlike standard material designs, depth here is achieved by varying the opacity and blur of surfaces.

- **Level 1 (Base):** Solid neutral background (#F8FAFC).
- **Level 2 (Widgets):** Semi-transparent white (80% opacity) with a 12px backdrop blur and a 1px soft border (#E2E8F0).
- **Level 3 (Overlays/Modals):** High-blur frosted glass (60% opacity) with a subtle outer glow in the primary green to indicate active focus.

Shadows are avoided in favor of "light-leak" borders—thin, luminous edges that define boundaries without adding visual "weight" or clutter to data-dense areas.

## Shapes

The shape language is **Soft and Precise**. A modest corner radius (0.25rem to 0.75rem) is applied to keep the interface feeling contemporary without losing its professional edge. 

Buttons and input fields use a consistent 4px (Soft) radius to maintain a structural, grid-aligned look. Cards and glass widgets use a slightly larger 12px radius to distinguish them as distinct containers of information. Circular elements are reserved strictly for user avatars and status indicators (e.g., "Live" data pulses).

## Components

### Buttons
Primary buttons use the university's green with white text, featuring a subtle gradient to add "pressable" depth. Secondary buttons are "Ghost" style with a 1px navy border. All buttons include a transition effect where the background blur increases on hover.

### Live Data Widgets
These are the signature components of the design system. They feature a glass background, a mono-spaced "Live" tag in the top right, and micro-sparklines in blue to show 24-hour trends.

### Input Fields
Fields are minimalist, using only a bottom border that expands into a full container highlight when focused. This keeps forms looking like elegant ledger entries rather than clunky digital boxes.

### Academic Cards
Used for faculty profiles and research papers. These utilize a vertical layout with a heavy Work Sans heading and a footer containing metadata (Date, Citation Count) in the secondary navy color.

### Navigation
A top-docked navigation bar uses a high-blur glass effect. On scroll, it transitions from transparent to 90% opacity, ensuring readability against dynamic page content.