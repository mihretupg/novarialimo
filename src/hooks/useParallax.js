import { useEffect, useRef, useState } from 'react';

/**
 * Returns [ref, offsetPx].
 * The offset is how many px the element's background should shift
 * relative to its natural scroll position, creating a parallax feel.
 * factor 0.25 → moves at 25% of scroll speed (slower = deeper)
 */
export function useParallax(factor = 0.25) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // How far the element's centre is from the viewport centre
      const centreOffset = rect.top + rect.height / 2 - vh / 2;
      setOffset(centreOffset * factor);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [factor]);

  return [ref, offset];
}
