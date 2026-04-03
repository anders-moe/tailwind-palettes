# GeoData Platform — "Dark Terrain"

## Design System Decisions

### Categorical Color Model
Every UI element maps to one of four semantic color categories. This is the core design principle — colors communicate **purpose**, not decoration:

| CSS Variable Prefix | Category | Meaning |
|---------------------|----------|---------|
| `--nav` | Navigation & Spatial | Where am I? Links, sidebar, spatial data |
| `--status` | Status & Data | What's the state? Active/complete, health |
| `--measure` | Measurements & Highlights | What are the values? Depth, counts, formations |
| `--action` | Actions & Alerts | What needs attention? Errors, warnings, critical ops |

When adding new UI elements, choose the color category by **what the element communicates**, not what looks nice.

### Color Source
All palette hex values are sourced from **Tailwind CSS's color system** — not custom-picked. Dark palettes use the 400 shade for base + 700 for dim. Light palettes use 500-700 for base (400s wash out on white). This is intentional: Tailwind's scales are perceptually tested and battle-proven.

### Each Color Has Four Variants
Every category color has four CSS variables: `--nav`, `--nav-dim`, `--nav-glow`, `--nav-bg`. These are computed from the base hex:
- **base**: Full-intensity text/stroke color
- **dim**: Deeper shade for borders, card accents
- **glow**: `rgba(base, 0.15)` — badge backgrounds, icon highlights
- **bg**: `rgba(base, 0.06)` — ultra-subtle fills for active nav items

Light mode uses slightly different opacities (glow: 0.14, bg: 0.07) for better contrast on white.

### Surface Depth System
Five graduated surface levels (`--surface-base` through `--surface-4`) instead of a single background. Cards sit on `surface-2`, headers on `surface-3`, hover states on `surface-hover`. This creates physical depth without heavy shadows.

### Palette Switching Architecture
- `PaletteSelector` imperatively sets CSS custom properties via `document.documentElement.style.setProperty()`
- It dispatches a `palette-change` custom event on `window` after every swap
- `useThemeColors` hook listens for this event, reads computed styles via `getComputedStyle()`, and triggers React re-renders
- This bridges CSS-driven elements (badges, borders — instant via variable cascade) with JS-driven elements (SVG chart strokes/fills — need re-render)
- SVG gradients use `useId()` to avoid ID collisions when multiple charts of the same color appear on one page

### Light vs Dark Mode Adjustments
When the palette mode is `'light'`, `applyPalette` also sets:
- `--shadow-card` / `--shadow-elevated` to lower opacity
- `--sidebar-edge-shadow` to near-transparent (dark mode uses `rgba(0,0,0,0.15)`)
- `--text-primary/secondary/tertiary` to dark-on-light values
- `--border-subtle/medium` to `rgba(0,0,0,...)` instead of `rgba(255,255,255,...)`

## Dev Notes

### Running
```bash
npm install
npx vite --port 5180
```

### Type Checking
```bash
npx tsc --noEmit
```

### No Routing Library
Section switching is pure React state (`useState` in `App.tsx`). No react-router — this is a demo, not a production app.

### No State Management
All data is hardcoded in section components. There's no API layer, no store, no context (except the event-based palette bridge). This is intentional for a style demo.

### Font Loading
Google Fonts (DM Sans + JetBrains Mono) are loaded via `<link>` in `index.html`. No local font files.
