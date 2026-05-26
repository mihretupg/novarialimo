import { useEffect, useRef, useState } from 'react';

/**
 * A decorative background element that drifts at a fraction of scroll speed.
 * Drop it inside any section to get a depth layer.
 */
export default function ParallaxBg({ className = '', style = {}, factor = 0.25 }) {
  const ref = useRef(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const fromCenter = rect.top + rect.height / 2 - vh / 2;
      setY(fromCenter * factor);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [factor]);

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute ${className}`}
      style={{ ...style, transform: `translateY(${y}px)`, willChange: 'transform' }}
    />
  );
}
