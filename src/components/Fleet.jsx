import { useEffect, useRef, useState } from 'react';
import { Users, Briefcase, ChevronRight } from 'lucide-react';
import { FLEET } from '../data';
import ParallaxBg from './ParallaxBg';

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// Per-card image parallax — image shifts inside the card as you scroll
function ParallaxPhoto({ src, alt }) {
  return (
    <div className="relative h-64 overflow-hidden group bg-black">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'center',
        }}
        className="transition-[filter,transform] duration-300 group-hover:brightness-110 group-hover:scale-[1.02]"
      />

      {/* gold shimmer on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'linear-gradient(120deg,transparent 30%,rgba(245,166,35,0.07) 50%,transparent 70%)' }} />

      {/* bottom fade to card bg */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, var(--bg-surface) 0%, transparent 50%)' }} />
    </div>
  );
}

export default function Fleet({ onSelectVehicle }) {
  const [sectionRef, inView] = useInView();
  const [selected, setSelected] = useState(null);
  const [triggered, setTriggered] = useState(false);

  // Fire once when section enters view
  useEffect(() => {
    if (!inView || triggered) return;
    const timer = setTimeout(() => setTriggered(true), 0);
    return () => clearTimeout(timer);
  }, [inView, triggered]);

  const handleSelect = (vehicle) => {
    setSelected(vehicle.id);
    if (onSelectVehicle) onSelectVehicle(vehicle.name);
    document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="fleet" ref={sectionRef} className="relative py-24 overflow-hidden section-bg">
      <ParallaxBg factor={0.28} className="bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-gold-500/[0.04] blur-[110px]" />
      <ParallaxBg factor={0.18} className="-top-20 right-10 w-72 h-72 rounded-full bg-gold-500/[0.03] blur-[90px]" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-400">Our Fleet</p>
          <div className="section-divider mx-auto mt-6" />
        </div>

        {/* Fleet grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {FLEET.map((vehicle, i) => {
            const delay = i * 0.15;

            return (
              <div
                key={vehicle.id}
                style={{
                  animation: triggered
                    ? `revealCard 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s both`
                    : 'none',
                  opacity: triggered ? undefined : 0,
                  willChange: 'transform, opacity',
                }}
                className={`rounded-3xl overflow-hidden ${
                  selected === vehicle.id
                    ? 'border-2 border-gold-500/60 shadow-[0_0_50px_rgba(245,166,35,0.2)]'
                    : 'border border-theme hover:border-gold-500/30'
                } surface-bg`}
              >
                {/* Photo with per-card parallax */}
                <div className="relative">
                  <ParallaxPhoto src={vehicle.image} alt={vehicle.imageAlt} />

                  {vehicle.badge && (
                    <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full z-10 ${vehicle.badgeColor}`}>
                      {vehicle.badge}
                    </span>
                  )}
                  <div className="absolute bottom-4 right-4 glass-dark px-3 py-1.5 rounded-full z-10">
                    <span className="text-xs font-semibold text-theme tracking-wide">{vehicle.category}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-5">
                    <h3 className="text-xl font-bold text-theme mb-1">{vehicle.name}</h3>
                    <div className="h-px w-12 bg-gradient-to-r from-gold-500/60 to-transparent mt-2" />
                  </div>

                  <div className="flex gap-6 mb-6">
                    {[
                      { Icon: Users,    label: 'Passengers', val: vehicle.passengers },
                      { Icon: Briefcase,label: 'Luggage',    val: `${vehicle.luggage} bags` },
                    ].map(({ Icon, label, val }) => (
                      <div key={label} className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                          <Icon size={15} className="text-gold-400" />
                        </div>
                        <div>
                          <p className="text-[10px] text-theme-subtle uppercase tracking-widest">{label}</p>
                          <p className="text-sm font-bold text-theme">{val}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {vehicle.features.map((f) => (
                      <span key={f} className="text-xs px-3 py-1 rounded-full border border-theme text-theme-muted">
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="mb-6">
                    <p className="text-[10px] text-theme-subtle uppercase tracking-widest mb-2">Best for</p>
                    <div className="flex flex-wrap gap-2">
                      {vehicle.bestFor.map((s) => (
                        <span key={s} className="text-xs px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelect(vehicle)}
                    className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-colors duration-300 ${
                      selected === vehicle.id
                        ? 'bg-gold-500 text-black shadow-[0_4px_24px_rgba(245,166,35,0.4)]'
                        : 'btn-outline'
                    }`}
                  >
                    {selected === vehicle.id ? 'Selected — Continue Booking' : 'Select & Book'}
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
