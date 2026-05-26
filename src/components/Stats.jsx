import { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data';
import ParallaxBg from './ParallaxBg';

function useInView(t = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: t });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [t]);
  return [ref, inView];
}

function AnimatedNumber({ target, suffix = '', inView }) {
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    // Non-numeric targets (like "4.9★", "24/7", "15min") just reveal with fade
    const num = parseFloat(target.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) {
      const revealTimer = setTimeout(() => setDisplay(target), 0);
      return () => clearTimeout(revealTimer);
    }

    const duration = 1400;
    const steps = 48;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(ease * num * 10) / 10;
      const formatted = Number.isInteger(current) ? current.toLocaleString() : current.toFixed(1);
      setDisplay(formatted + suffix);
      if (step >= steps) { clearInterval(timer); setDisplay(target); }
    }, interval);
    return () => clearInterval(timer);
  }, [inView, target, suffix]);

  return <span>{display}</span>;
}

const STATS = [
  { value: '5,000+', label: 'Rides Completed', suffix: '+', base: 5000 },
  { value: '4.9★',   label: 'Average Rating' },
  { value: '24/7',   label: 'Availability' },
  { value: '15min',  label: 'Avg. Response' },
];

export default function Stats() {
  const [sectionRef, inView] = useInView();

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden section-bg">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <ParallaxBg factor={0.20} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-gold-500/[0.035] blur-[130px]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Animated stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 110}ms` }}
            >
              <p className="playfair text-4xl md:text-5xl font-bold text-gradient-gold mb-2">
                <AnimatedNumber target={stat.value} inView={inView} />
              </p>
              <p className="text-xs text-theme-subtle uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials header */}
        <div className={`text-center mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-400 mb-4">Testimonials</p>
          <h2 className="playfair text-3xl md:text-4xl font-bold text-theme">What Our Clients Say</h2>
          <div className="section-divider mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`card-luxury rounded-3xl p-7 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${300 + i * 120}ms` }}
            >
              <div className="flex gap-1 mb-5">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={12} className="fill-gold-400 text-gold-400" />
                ))}
              </div>
              <p className="text-sm text-theme-muted leading-relaxed mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-5 border-t border-theme">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500/30 to-gold-600/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold-400 font-bold text-sm">{t.name[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-theme">{t.name}</p>
                  <p className="text-xs text-theme-subtle">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
