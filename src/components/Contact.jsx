import { useEffect, useRef, useState } from 'react';
import { Phone, MessageSquare, MapPin, Clock, ArrowRight, Mail } from 'lucide-react';
import { EMAIL_ADDRESS, PHONE_DISPLAY, PHONE_NUMBER, WHATSAPP_NUMBER } from '../data';
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

const CARDS = [
  { icon: MessageSquare, title: 'SMS',      value: 'Text Us',        sub: 'Direct message',     action: () => window.open(`sms:${PHONE_NUMBER}?&body=Hi%20Novaria%2C%20I%27d%20like%20to%20book%20a%20ride.`, '_self'), highlight: true },
  { icon: WhatsAppIcon,  title: 'WhatsApp', value: 'Chat Now',       sub: 'Fastest response',   action: () => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank'), highlight: false },
  { icon: Phone,         title: 'Phone',    value: PHONE_DISPLAY,    sub: 'Call anytime',       action: () => window.open(`tel:+${PHONE_NUMBER}`),                         highlight: false },
  { icon: Mail,          title: 'Email',    value: EMAIL_ADDRESS,    sub: 'Write to us',        action: () => window.open(`mailto:${EMAIL_ADDRESS}`),                       highlight: false },
  { icon: MapPin,        title: 'Area',     value: 'Dallas, TX',     sub: 'DFW Metroplex',       action: null,                                                            highlight: false },
  { icon: Clock,         title: 'Hours',    value: '24 / 7',         sub: '365 days a year',     action: null,                                                            highlight: false },
];

function WhatsAppIcon({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L0 24l6.335-1.51A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.791 9.791 0 01-4.994-1.368l-.358-.213-3.76.897.947-3.666-.234-.376A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}

export default function Contact() {
  const [sectionRef, inView] = useInView();

  const scrollToBooking = () =>
    document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 overflow-hidden section-bg">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      <ParallaxBg factor={0.25} className="-bottom-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-gold-500/[0.04] blur-[120px]" />
      <ParallaxBg factor={0.40} className="top-10 right-1/4 w-64 h-64 rounded-full bg-gold-500/[0.025] blur-[80px]" />

      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-20 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-400 mb-4">Get In Touch</p>
          <p className="text-theme-muted max-w-xl mx-auto leading-relaxed">
            Reach us through WhatsApp, SMS, email, or phone. Our team is available 24/7 to assist with bookings, modifications, and questions.
          </p>
          <div className="section-divider mx-auto mt-8" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-16">
          {CARDS.map((item, i) => (
            <div
              key={item.title}
              onClick={item.action || undefined}
              className={`card-luxury rounded-3xl p-7 transition-all duration-700 ${item.action ? 'cursor-pointer' : ''} ${
                item.highlight ? 'border-gold-500/25 bg-gold-500/5' : ''
              } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${
                item.highlight ? 'bg-gold-500/20 border border-gold-500/30' : 'bg-black/[0.04] dark:bg-white/5 border border-theme'
              }`}>
                <item.icon size={20} className={item.highlight ? 'text-gold-400' : 'text-theme-muted'} />
              </div>
              <p className="text-xs text-theme-subtle uppercase tracking-widest mb-1">{item.title}</p>
              <p className={`text-lg font-bold mb-1 break-words ${item.highlight ? 'text-gold-400' : 'text-theme'}`}>{item.value}</p>
              <p className="text-xs text-theme-subtle">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className={`relative rounded-3xl overflow-hidden transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/15 via-gold-600/8 to-transparent" />
          <div className="absolute inset-0 border border-gold-500/20 rounded-3xl" />
          <div className="absolute inset-0 opacity-[0.035]"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg,#f5a623 0,#f5a623 1px,transparent 0,transparent 50%)', backgroundSize: '20px 20px' }} />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-10 md:p-14">
            <div>
              <h3 className="playfair text-3xl font-bold text-theme mb-3">Ready to Ride in Style?</h3>
              <p className="text-theme-muted max-w-md">First-class service, on-time guaranteed. Book your luxury transportation today.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <a href={`sms:${PHONE_NUMBER}?&body=Hi%20Novaria%2C%20I%27d%20like%20to%20book%20a%20ride.`}
                className="btn-outline flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-sm whitespace-nowrap">
                <MessageSquare size={16} />
                Text Us
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-sm whitespace-nowrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L0 24l6.335-1.51A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.791 9.791 0 01-4.994-1.368l-.358-.213-3.76.897.947-3.666-.234-.376A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
                WhatsApp Us
              </a>
              <button onClick={scrollToBooking}
                className="btn-primary flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm whitespace-nowrap">
                Book Your Ride <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
