import { useState, useEffect } from 'react';

type Accent = 'nav' | 'status' | 'measure' | 'action';

export function useThemeColors(): Record<Accent, string> {
  const [, tick] = useState(0);

  useEffect(() => {
    const handler = () => tick(n => n + 1);
    window.addEventListener('palette-change', handler);
    return () => window.removeEventListener('palette-change', handler);
  }, []);

  const style = getComputedStyle(document.documentElement);
  return {
    nav: style.getPropertyValue('--nav').trim(),
    status: style.getPropertyValue('--status').trim(),
    measure: style.getPropertyValue('--measure').trim(),
    action: style.getPropertyValue('--action').trim(),
  };
}
