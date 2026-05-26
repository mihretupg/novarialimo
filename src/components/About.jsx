import { useEffect, useRef, useState } from 'react';
import { Shield, Clock, Award, Headphones } from 'lucide-react';
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

const VALUES = [
  { icon: Shield,     title: 'Safety First',    desc: 'Fully licensed, insured, and background-checked chauffeurs. Your safety is our top priority on every journey.' },
  { icon: Clock,      title: 'Always On Time',  desc: "We track flights, monitor traffic, and plan routes — so you're never late. Punctuality is a promise, not a goal." },
  { icon: Award,      title: 'Premium Quality', desc: 'Late-model luxury vehicles maintained to the highest standards. Every detail reflects the elegance you deserve.' },
  { icon: Headphones, title: '24/7 Support',    desc: "Round-the-clock customer care via WhatsApp and phone. We're always here when you need us." },
];

export default function About() {
  const [sectionRef, inView] = useInView();

  return (
    <section id="about" ref={sectionRef} className="relative py-24 overflow-hidden section-bg">
      <ParallaxBg factor={0.30} className="top-1/4 right-0 w-[520px] h-[520px] rounded-full bg-gold-500/[0.045] blur-[110px]" />
      <ParallaxBg factor={0.18} className="bottom-0 left-0 w-72 h-72 rounded-full bg-gold-500/[0.03] blur-[90px]" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left: visual card */}
          <div className={`relative transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative rounded-3xl overflow-hidden card-luxury">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-gold-900/5" />
              <div className="relative p-10 pb-16">
                <div className="text-8xl mb-8 animate-float">🏆</div>
                <h3 className="playfair text-3xl font-bold text-theme mb-4">
                  Dallas's Premier<br />
                  <span className="text-gradient-gold italic">Luxury Chauffeur</span>
                </h3>
                <p className="text-theme-muted leading-relaxed">
                  Founded on the principle that every journey deserves excellence. Novaria Limo has been serving Dallas and the DFW metroplex with uncompromising luxury and reliability.
                </p>
              </div>
              <div className="absolute bottom-6 right-6 glass rounded-2xl px-5 py-3 gold-border">
                <p className="text-xl font-black text-gold-400">5,000+</p>
                <p className="text-xs text-theme-subtle uppercase tracking-widest">Satisfied Clients</p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 glass rounded-2xl p-4 gold-border hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <span className="text-green-500 text-lg">✓</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-theme">Fully Insured</p>
                  <p className="text-[10px] text-theme-subtle">& Licensed in Texas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: copy + values */}
          <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-400 mb-4">About Novaria</p>
            <h2 className="playfair text-4xl font-bold text-theme mb-6">
              More Than a Ride.<br />An Experience.
            </h2>
            <p className="text-theme-muted leading-relaxed mb-12">
              We believe luxury transportation is about more than getting from A to B. It's about arriving composed, confident, and in style. Every vehicle in our fleet is meticulously maintained, and every chauffeur is trained to deliver a first-class experience.
            </p>

            <div className="grid grid-cols-2 gap-5">
              {VALUES.map((val, i) => (
                <div
                  key={val.title}
                  className={`card-luxury rounded-2xl p-5 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${400 + i * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-4">
                    <val.icon size={18} className="text-gold-400" />
                  </div>
                  <h4 className="text-sm font-bold text-theme mb-2">{val.title}</h4>
                  <p className="text-xs text-theme-muted leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
