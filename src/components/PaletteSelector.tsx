import { useState } from 'react';
import { Palette, ChevronDown, ChevronUp, Sun, Moon } from 'lucide-react';
import './PaletteSelector.css';

interface ColorSet {
  base: string;
  dim: string;
  glow: string;
  bg: string;
}

interface PaletteDef {
  name: string;
  description: string;
  mode: 'dark' | 'light';
  surface: { base: string; s1: string; s2: string; s3: string; s4: string; hover: string };
  text: { primary: string; secondary: string; tertiary: string };
  border: { subtle: string; medium: string };
  nav: ColorSet;
  status: ColorSet;
  measure: ColorSet;
  action: ColorSet;
}

function makeDarkColorSet(base: string, dim: string): ColorSet {
  const r = parseInt(base.slice(1, 3), 16);
  const g = parseInt(base.slice(3, 5), 16);
  const b = parseInt(base.slice(5, 7), 16);
  return {
    base,
    dim,
    glow: `rgba(${r}, ${g}, ${b}, 0.15)`,
    bg: `rgba(${r}, ${g}, ${b}, 0.06)`,
  };
}

function makeLightColorSet(base: string, dim: string): ColorSet {
  const r = parseInt(base.slice(1, 3), 16);
  const g = parseInt(base.slice(3, 5), 16);
  const b = parseInt(base.slice(5, 7), 16);
  return {
    base,
    dim,
    glow: `rgba(${r}, ${g}, ${b}, 0.14)`,
    bg: `rgba(${r}, ${g}, ${b}, 0.07)`,
  };
}

const darkText = { primary: '#e8e8ed', secondary: '#8a8a96', tertiary: '#5a5a66' };
const darkBorder = { subtle: 'rgba(255, 255, 255, 0.06)', medium: 'rgba(255, 255, 255, 0.1)' };

const palettes: PaletteDef[] = [
  // ── Dark Palettes ──
  {
    name: 'Tailwind Standard',
    description: 'Cyan / Emerald / Amber / Red',
    mode: 'dark',
    surface: { base: '#0a0a0c', s1: '#111115', s2: '#18181d', s3: '#1f1f26', s4: '#28282f', hover: '#2a2a33' },
    text: darkText, border: darkBorder,
    nav: makeDarkColorSet('#22d3ee', '#0e7490'),
    status: makeDarkColorSet('#34d399', '#047857'),
    measure: makeDarkColorSet('#fbbf24', '#b45309'),
    action: makeDarkColorSet('#f87171', '#b91c1c'),
  },
  {
    name: 'Ocean Shift',
    description: 'Sky / Teal / Orange / Rose',
    mode: 'dark',
    surface: { base: '#0a0b0e', s1: '#10121a', s2: '#161a22', s3: '#1c2028', s4: '#24282f', hover: '#282c36' },
    text: darkText, border: darkBorder,
    nav: makeDarkColorSet('#38bdf8', '#0369a1'),
    status: makeDarkColorSet('#2dd4bf', '#0f766e'),
    measure: makeDarkColorSet('#fb923c', '#c2410c'),
    action: makeDarkColorSet('#fb7185', '#be123c'),
  },
  {
    name: 'Electric Indigo',
    description: 'Indigo / Lime / Amber / Pink',
    mode: 'dark',
    surface: { base: '#09090b', s1: '#111114', s2: '#18181b', s3: '#1f1f23', s4: '#27272b', hover: '#2c2c32' },
    text: darkText, border: darkBorder,
    nav: makeDarkColorSet('#818cf8', '#4338ca'),
    status: makeDarkColorSet('#a3e635', '#4d7c0f'),
    measure: makeDarkColorSet('#fcd34d', '#b45309'),
    action: makeDarkColorSet('#f472b6', '#be185d'),
  },
  {
    name: 'Arctic Neon',
    description: 'Blue / Green / Yellow / Coral',
    mode: 'dark',
    surface: { base: '#060810', s1: '#0c0e18', s2: '#121620', s3: '#1a1e28', s4: '#222630', hover: '#282c38' },
    text: darkText, border: darkBorder,
    nav: makeDarkColorSet('#60a5fa', '#1d4ed8'),
    status: makeDarkColorSet('#4ade80', '#15803d'),
    measure: makeDarkColorSet('#facc15', '#a16207'),
    action: makeDarkColorSet('#fb7185', '#be123c'),
  },
  {
    name: 'Warm Ember',
    description: 'Violet / Emerald / Orange / Red',
    mode: 'dark',
    surface: { base: '#0c0a0a', s1: '#141111', s2: '#1c1818', s3: '#241f1f', s4: '#2e2828', hover: '#332c2c' },
    text: darkText, border: darkBorder,
    nav: makeDarkColorSet('#a78bfa', '#6d28d9'),
    status: makeDarkColorSet('#34d399', '#047857'),
    measure: makeDarkColorSet('#f97316', '#c2410c'),
    action: makeDarkColorSet('#ef4444', '#b91c1c'),
  },
  {
    name: 'Nordic Frost',
    description: 'Slate Blue / Mint / Gold / Salmon',
    mode: 'dark',
    surface: { base: '#0b0c0f', s1: '#12141a', s2: '#191c22', s3: '#20232a', s4: '#282b32', hover: '#2d3038' },
    text: darkText, border: darkBorder,
    nav: makeDarkColorSet('#93c5fd', '#1e40af'),
    status: makeDarkColorSet('#6ee7b7', '#047857'),
    measure: makeDarkColorSet('#fde047', '#a16207'),
    action: makeDarkColorSet('#fca5a5', '#dc2626'),
  },

  // ── Light Palettes ──
  {
    name: 'Coastal',
    description: 'Sky / Emerald / Amber / Rose',
    mode: 'light',
    surface: { base: '#f8fafc', s1: '#f1f5f9', s2: '#ffffff', s3: '#f8fafc', s4: '#e2e8f0', hover: '#f1f5f9' },
    text: { primary: '#0f172a', secondary: '#475569', tertiary: '#94a3b8' },
    border: { subtle: 'rgba(0, 0, 0, 0.06)', medium: 'rgba(0, 0, 0, 0.12)' },
    nav: makeLightColorSet('#0284c7', '#0369a1'),
    status: makeLightColorSet('#059669', '#047857'),
    measure: makeLightColorSet('#d97706', '#b45309'),
    action: makeLightColorSet('#e11d48', '#be123c'),
  },
  {
    name: 'Earthtone',
    description: 'Teal / Green / Orange / Red',
    mode: 'light',
    surface: { base: '#fafaf9', s1: '#f5f5f4', s2: '#ffffff', s3: '#fafaf9', s4: '#e7e5e4', hover: '#f5f5f4' },
    text: { primary: '#1c1917', secondary: '#57534e', tertiary: '#a8a29e' },
    border: { subtle: 'rgba(0, 0, 0, 0.06)', medium: 'rgba(0, 0, 0, 0.10)' },
    nav: makeLightColorSet('#0d9488', '#0f766e'),
    status: makeLightColorSet('#16a34a', '#15803d'),
    measure: makeLightColorSet('#ea580c', '#c2410c'),
    action: makeLightColorSet('#dc2626', '#b91c1c'),
  },
  {
    name: 'Studio',
    description: 'Indigo / Emerald / Yellow / Pink',
    mode: 'light',
    surface: { base: '#fafafa', s1: '#f4f4f5', s2: '#ffffff', s3: '#fafafa', s4: '#e4e4e7', hover: '#f4f4f5' },
    text: { primary: '#18181b', secondary: '#52525b', tertiary: '#a1a1aa' },
    border: { subtle: 'rgba(0, 0, 0, 0.06)', medium: 'rgba(0, 0, 0, 0.10)' },
    nav: makeLightColorSet('#4f46e5', '#4338ca'),
    status: makeLightColorSet('#10b981', '#059669'),
    measure: makeLightColorSet('#ca8a04', '#a16207'),
    action: makeLightColorSet('#ec4899', '#db2777'),
  },
  {
    name: 'Arctic',
    description: 'Blue / Teal / Amber / Red',
    mode: 'light',
    surface: { base: '#f9fafb', s1: '#f3f4f6', s2: '#ffffff', s3: '#f9fafb', s4: '#e5e7eb', hover: '#f3f4f6' },
    text: { primary: '#111827', secondary: '#4b5563', tertiary: '#9ca3af' },
    border: { subtle: 'rgba(0, 0, 0, 0.05)', medium: 'rgba(0, 0, 0, 0.10)' },
    nav: makeLightColorSet('#2563eb', '#1d4ed8'),
    status: makeLightColorSet('#0d9488', '#0f766e'),
    measure: makeLightColorSet('#d97706', '#b45309'),
    action: makeLightColorSet('#dc2626', '#b91c1c'),
  },
];

function applyPalette(p: PaletteDef) {
  const root = document.documentElement.style;

  // Surfaces
  root.setProperty('--surface-base', p.surface.base);
  root.setProperty('--surface-1', p.surface.s1);
  root.setProperty('--surface-2', p.surface.s2);
  root.setProperty('--surface-3', p.surface.s3);
  root.setProperty('--surface-4', p.surface.s4);
  root.setProperty('--surface-hover', p.surface.hover);

  // Text
  root.setProperty('--text-primary', p.text.primary);
  root.setProperty('--text-secondary', p.text.secondary);
  root.setProperty('--text-tertiary', p.text.tertiary);

  // Borders
  root.setProperty('--border-subtle', p.border.subtle);
  root.setProperty('--border-medium', p.border.medium);

  // Mode-specific adjustments
  if (p.mode === 'light') {
    root.setProperty('--shadow-card', '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.03)');
    root.setProperty('--shadow-elevated', '0 4px 16px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.04)');
    root.setProperty('--sidebar-edge-shadow', 'rgba(0,0,0,0.04)');
    root.setProperty('--scrollbar-thumb', '#c8c8d0');
  } else {
    root.setProperty('--shadow-card', '0 1px 3px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.15)');
    root.setProperty('--shadow-elevated', '0 4px 16px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.25)');
    root.setProperty('--sidebar-edge-shadow', 'rgba(0,0,0,0.15)');
    root.setProperty('--scrollbar-thumb', '#28282f');
  }

  // Category colors
  for (const [key, colors] of Object.entries({ nav: p.nav, status: p.status, measure: p.measure, action: p.action })) {
    root.setProperty(`--${key}`, colors.base);
    root.setProperty(`--${key}-dim`, colors.dim);
    root.setProperty(`--${key}-glow`, colors.glow);
    root.setProperty(`--${key}-bg`, colors.bg);
  }

  window.dispatchEvent(new Event('palette-change'));
}

export function PaletteSelector() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const darkPalettes = palettes.filter(p => p.mode === 'dark');
  const lightPalettes = palettes.filter(p => p.mode === 'light');

  const handleSelect = (index: number) => {
    setActive(index);
    applyPalette(palettes[index]);
  };

  const globalIndex = (list: PaletteDef[], localIdx: number) =>
    palettes.indexOf(list[localIdx]);

  return (
    <div className={`palette-selector ${open ? 'palette-selector--open' : ''}`}>
      <button className="palette-toggle" onClick={() => setOpen(!open)}>
        <Palette size={16} />
        <span>Palette</span>
        {open ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>

      {open && (
        <div className="palette-panel">
          <div className="palette-group-label">
            <Moon size={12} />
            <span>Dark</span>
          </div>
          {darkPalettes.map((p, i) => {
            const gi = globalIndex(darkPalettes, i);
            return (
              <button
                key={gi}
                className={`palette-option ${active === gi ? 'palette-option--active' : ''}`}
                onClick={() => handleSelect(gi)}
              >
                <div className="palette-swatches">
                  <span className="swatch" style={{ background: p.nav.base }} />
                  <span className="swatch" style={{ background: p.status.base }} />
                  <span className="swatch" style={{ background: p.measure.base }} />
                  <span className="swatch" style={{ background: p.action.base }} />
                </div>
                <div className="palette-info">
                  <div className="palette-name">{p.name}</div>
                  <div className="palette-desc">{p.description}</div>
                </div>
                {active === gi && <span className="palette-check">&#10003;</span>}
              </button>
            );
          })}

          <div className="palette-group-label palette-group-label--light">
            <Sun size={12} />
            <span>Light</span>
          </div>
          {lightPalettes.map((p, i) => {
            const gi = globalIndex(lightPalettes, i);
            return (
              <button
                key={gi}
                className={`palette-option ${active === gi ? 'palette-option--active' : ''}`}
                onClick={() => handleSelect(gi)}
              >
                <div className="palette-swatches palette-swatches--light">
                  <span className="swatch" style={{ background: p.nav.base }} />
                  <span className="swatch" style={{ background: p.status.base }} />
                  <span className="swatch" style={{ background: p.measure.base }} />
                  <span className="swatch" style={{ background: p.action.base }} />
                </div>
                <div className="palette-info">
                  <div className="palette-name">{p.name}</div>
                  <div className="palette-desc">{p.description}</div>
                </div>
                {active === gi && <span className="palette-check">&#10003;</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
