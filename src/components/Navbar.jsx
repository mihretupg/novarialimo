import { useState, useEffect } from 'react';
import { Menu, X, MessageSquare } from 'lucide-react';
import { NAV_LINKS, PHONE_NUMBER, WHATSAPP_NUMBER } from '../data';

export default function Navbar({ user, onDashboard }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-theme py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex flex-col items-center leading-none focus:outline-none">
            <span className="text-xl font-black tracking-widest text-theme">NOVARIA</span>
            <span className="text-sm font-semibold tracking-[0.68em] text-gold-500 uppercase mt-1">Limo</span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button key={link.href} onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-theme-muted hover:text-gold-400 transition-colors duration-200 tracking-wide">
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href={`sms:${PHONE_NUMBER}?&body=Hi%20Novaria%2C%20I%27d%20like%20to%20book%20a%20ride.`}
              className="flex items-center gap-2 text-sm font-medium text-theme-muted hover:text-theme transition-colors">
              <MessageSquare size={14} /><span>SMS</span>
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-theme-muted hover:text-theme transition-colors">
              <WhatsAppIcon size={14} /><span>WhatsApp</span>
            </a>
            <button onClick={onDashboard || (() => { window.location.hash = '#login'; })}
              className="btn-outline px-4 py-2.5 rounded-full text-sm font-bold">
              {user ? 'Dashboard' : 'Login'}
            </button>
            <button onClick={() => handleNavClick('#booking')}
              className="btn-primary px-5 py-2.5 rounded-full text-sm font-bold">
              Book Now
            </button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button className="w-10 h-10 rounded-xl border border-theme text-theme-muted hover:text-gold-400 hover:border-gold-400/40 transition-colors flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-[60] transition-all duration-300 ${
        mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 dark:bg-black/45 bg-white/35 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-80 glass border-l border-theme p-8 flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        } dark:bg-black/55 bg-white/65 backdrop-blur-2xl`}>
          <div className="flex justify-between items-center mb-10">
            <div className="inline-flex flex-col items-center leading-none">
              <span className="text-gold-400 font-black tracking-widest">NOVARIA</span>
              <span className="text-xs font-semibold tracking-[0.58em] text-gold-400 uppercase mt-1">Limo</span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-11 h-11 rounded-xl border border-gold-500/50 bg-gold-500/10 text-gold-400 hover:bg-gold-500 hover:text-black transition-all flex items-center justify-center"
              aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <button key={link.href} onClick={() => handleNavClick(link.href)}
                className="text-left text-lg font-medium text-theme-muted hover:text-gold-400 transition-colors">
                {link.label}
              </button>
            ))}
          </nav>
          <div className="mt-7 grid gap-3">
            <div className="grid grid-cols-2 gap-3">
            <a href={`sms:${PHONE_NUMBER}?&body=Hi%20Novaria%2C%20I%27d%20like%20to%20book%20a%20ride.`}
              className="btn-outline w-full px-3 py-4 rounded-2xl text-sm font-bold justify-center flex-row whitespace-nowrap">
              <MessageSquare size={17} />
              <span>SMS</span>
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
              className="btn-outline w-full px-3 py-4 rounded-2xl text-sm font-bold justify-center flex-row whitespace-nowrap">
              <WhatsAppIcon size={17} />
              <span>WhatsApp</span>
            </a>
            </div>
            <button onClick={() => handleNavClick('#booking')}
              className="btn-primary w-full py-4 rounded-2xl text-base font-bold">
              Book Now
            </button>
            <button onClick={() => { setMobileOpen(false); (onDashboard || (() => { window.location.hash = '#login'; }))(); }}
              className="btn-outline w-full py-4 rounded-2xl text-base font-bold">
              {user ? 'Dashboard' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function WhatsAppIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L0 24l6.335-1.51A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.791 9.791 0 01-4.994-1.368l-.358-.213-3.76.897.947-3.666-.234-.376A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}
