import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { SERVICES, WHATSAPP_NUMBER } from '../data';
import { navigateToRoute } from '../lib/navigation';
import ParallaxBg from './ParallaxBg';

function useInView(t = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: t });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [t]);
  return [ref, inView];
}

export default function Services() {
  const [sectionRef, inView] = useInView();

  return (
    <section id="services" ref={sectionRef} className="relative py-16 sm:py-20 overflow-hidden section-bg">
      <ParallaxBg factor={0.22} className="top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-gold-500/[0.045] blur-[120px]" />
      <ParallaxBg factor={0.35} className="-bottom-20 left-10 w-80 h-80 rounded-full bg-gold-500/[0.03] blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs font-bold tracking-[0.22em] sm:tracking-[0.3em] uppercase text-gold-400">What We Offer</p>
          <h2 className="playfair mt-4 text-3xl sm:text-4xl font-bold text-theme">Luxury Transportation Services in Dallas-Fort Worth</h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-theme-muted">
            Novaria Transportation provides DFW airport transfers, executive car service, corporate transportation, hourly chauffeur service, and private rides for families and groups.
          </p>
          <div className="section-divider mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <div
              key={service.id}
              className={`card-luxury rounded-3xl p-5 sm:p-7 group transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-6 group-hover:bg-gold-500/18 group-hover:scale-110 transition-all duration-300">
                <span className="text-xs font-black tracking-widest text-gold-400">{service.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-theme mb-1">{service.title}</h3>
              <p className="text-xs font-medium text-gold-400/80 tracking-wide uppercase mb-3">{service.subtitle}</p>
              <p className="text-sm text-theme-muted leading-relaxed mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-xs text-theme-muted">
                    <div className="w-4 h-4 rounded-full bg-gold-500/15 flex items-center justify-center flex-shrink-0">
                      <Check size={9} className="text-gold-400" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              {service.pagePath && (
                <a
                  href={service.pagePath}
                  onClick={(event) => {
                    event.preventDefault();
                    navigateToRoute(service.pagePath.replace('/', ''));
                  }}
                  className="mt-6 inline-block text-left text-sm font-bold text-gold-400 transition-colors hover:text-gold-300"
                >
                  Learn more about {service.title}
                </a>
              )}
              <div className="mt-6 h-px w-0 group-hover:w-full bg-gradient-to-r from-gold-500/50 to-transparent transition-all duration-500" />
            </div>
          ))}

          <div className={`relative rounded-3xl p-5 sm:p-7 overflow-hidden transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '450ms' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/18 via-gold-600/8 to-transparent" />
            <div className="absolute inset-0 border border-gold-500/22 rounded-3xl" />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-xs font-black tracking-widest text-gold-400 mb-6 animate-float">DFW</div>
                <h3 className="text-lg font-bold text-theme mb-3">Need Something Custom?</h3>
                <p className="text-sm text-theme-muted leading-relaxed">
                  We handle unique transportation requests across Dallas-Fort Worth. Tell us your schedule, passenger count, and service needs.
                </p>
              </div>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Novaria%2C%20I%20have%20a%20custom%20request.`}
                target="_blank" rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-gold-400 text-sm font-semibold hover:text-gold-300 transition-colors">
                Chat with us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
