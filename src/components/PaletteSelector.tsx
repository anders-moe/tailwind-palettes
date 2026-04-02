import { useState } from 'react';
import { Palette, ChevronDown, ChevronUp } from 'lucide-react';
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
  surface: { base: string; s1: string; s2: string; s3: string; s4: string; hover: string };
  nav: ColorSet;
  status: ColorSet;
  measure: ColorSet;
  action: ColorSet;
}

function makeColorSet(base: string, dim: string): ColorSet {
  // Parse hex to rgb for glow/bg
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

const palettes: PaletteDef[] = [
  {
    name: 'Tailwind Standard',
    description: 'Cyan / Emerald / Amber / Red',
    surface: { base: '#0a0a0c', s1: '#111115', s2: '#18181d', s3: '#1f1f26', s4: '#28282f', hover: '#2a2a33' },
    nav: makeColorSet('#22d3ee', '#0e7490'),
    status: makeColorSet('#34d399', '#047857'),
    measure: makeColorSet('#fbbf24', '#b45309'),
    action: makeColorSet('#f87171', '#b91c1c'),
  },
  {
    name: 'Ocean Shift',
    description: 'Sky / Teal / Orange / Rose',
    surface: { base: '#0a0b0e', s1: '#10121a', s2: '#161a22', s3: '#1c2028', s4: '#24282f', hover: '#282c36' },
    nav: makeColorSet('#38bdf8', '#0369a1'),
    status: makeColorSet('#2dd4bf', '#0f766e'),
    measure: makeColorSet('#fb923c', '#c2410c'),
    action: makeColorSet('#fb7185', '#be123c'),
  },
  {
    name: 'Electric Indigo',
    description: 'Indigo / Lime / Amber / Pink',
    surface: { base: '#09090b', s1: '#111114', s2: '#18181b', s3: '#1f1f23', s4: '#27272b', hover: '#2c2c32' },
    nav: makeColorSet('#818cf8', '#4338ca'),
    status: makeColorSet('#a3e635', '#4d7c0f'),
    measure: makeColorSet('#fcd34d', '#b45309'),
    action: makeColorSet('#f472b6', '#be185d'),
  },
  {
    name: 'Arctic Neon',
    description: 'Blue / Green / Yellow / Coral',
    surface: { base: '#060810', s1: '#0c0e18', s2: '#121620', s3: '#1a1e28', s4: '#222630', hover: '#282c38' },
    nav: makeColorSet('#60a5fa', '#1d4ed8'),
    status: makeColorSet('#4ade80', '#15803d'),
    measure: makeColorSet('#facc15', '#a16207'),
    action: makeColorSet('#fb7185', '#be123c'),
  },
  {
    name: 'Warm Ember',
    description: 'Violet / Emerald / Orange / Red',
    surface: { base: '#0c0a0a', s1: '#141111', s2: '#1c1818', s3: '#241f1f', s4: '#2e2828', hover: '#332c2c' },
    nav: makeColorSet('#a78bfa', '#6d28d9'),
    status: makeColorSet('#34d399', '#047857'),
    measure: makeColorSet('#f97316', '#c2410c'),
    action: makeColorSet('#ef4444', '#b91c1c'),
  },
  {
    name: 'Nordic Frost',
    description: 'Slate Blue / Mint / Gold / Salmon',
    surface: { base: '#0b0c0f', s1: '#12141a', s2: '#191c22', s3: '#20232a', s4: '#282b32', hover: '#2d3038' },
    nav: makeColorSet('#93c5fd', '#1e40af'),
    status: makeColorSet('#6ee7b7', '#047857'),
    measure: makeColorSet('#fde047', '#a16207'),
    action: makeColorSet('#fca5a5', '#dc2626'),
  },
];

function applyPalette(p: PaletteDef) {
  const root = document.documentElement.style;
  root.setProperty('--surface-base', p.surface.base);
  root.setProperty('--surface-1', p.surface.s1);
  root.setProperty('--surface-2', p.surface.s2);
  root.setProperty('--surface-3', p.surface.s3);
  root.setProperty('--surface-4', p.surface.s4);
  root.setProperty('--surface-hover', p.surface.hover);

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

  const handleSelect = (index: number) => {
    setActive(index);
    applyPalette(palettes[index]);
  };

  return (
    <div className={`palette-selector ${open ? 'palette-selector--open' : ''}`}>
      <button className="palette-toggle" onClick={() => setOpen(!open)}>
        <Palette size={16} />
        <span>Palette</span>
        {open ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>

      {open && (
        <div className="palette-panel">
          {palettes.map((p, i) => (
            <button
              key={i}
              className={`palette-option ${active === i ? 'palette-option--active' : ''}`}
              onClick={() => handleSelect(i)}
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
              {active === i && <span className="palette-check">&#10003;</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
