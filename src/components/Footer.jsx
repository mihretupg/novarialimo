import { MessageSquare } from 'lucide-react';
import { PHONE_NUMBER, WHATSAPP_NUMBER, NAV_LINKS } from '../data';

export default function Footer() {
  const scrollTo = (href) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="relative border-t border-theme py-16 section-bg">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
              className="inline-flex flex-col items-center leading-none mb-5">
              <span className="text-2xl font-black tracking-widest text-theme">NOVARIA</span>
              <span className="text-base font-semibold tracking-[0.68em] text-gold-500 uppercase mt-1.5">Limo</span>
            </button>
            <p className="text-sm text-theme-muted leading-relaxed max-w-xs">
              Premium limo car service throughout Dallas and the DFW Metroplex. Available 24/7.
            </p>
            <div className="flex gap-3 mt-6">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-theme hover:border-gold-500/35 hover:bg-gold-500/8 flex items-center justify-center transition-all duration-200"
                aria-label="WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-theme-muted">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L0 24l6.335-1.51A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.791 9.791 0 01-4.994-1.368l-.358-.213-3.76.897.947-3.666-.234-.376A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                </svg>
              </a>
              <a href={`tel:+${PHONE_NUMBER}`}
                className="w-10 h-10 rounded-full border border-theme hover:border-gold-500/35 hover:bg-gold-500/8 flex items-center justify-center transition-all duration-200"
                aria-label="Phone">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-theme-muted">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </a>
              <a href={`sms:${PHONE_NUMBER}?&body=Hi%20Novaria%2C%20I%27d%20like%20to%20book%20a%20ride.`}
                className="w-10 h-10 rounded-full border border-theme hover:border-gold-500/35 hover:bg-gold-500/8 flex items-center justify-center transition-all duration-200"
                aria-label="SMS">
                <MessageSquare size={15} className="text-theme-muted" />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-theme-subtle mb-5">Navigation</p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button onClick={() => scrollTo(link.href)}
                    className="text-sm text-theme-muted hover:text-gold-400 transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-theme-subtle mb-5">Services</p>
            <ul className="space-y-3">
              {['Airport Transfer','Corporate Travel','Wedding & Events','Hourly Service','Group Transportation'].map((s) => (
                <li key={s}>
                  <button onClick={() => scrollTo('#services')}
                    className="text-sm text-theme-muted hover:text-gold-400 transition-colors">
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-theme flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-theme-subtle">© {new Date().getFullYear()} Novaria Limo. All rights reserved. Dallas, TX.</p>
          <p className="text-xs text-theme-subtle">Serving DFW Metroplex · Licensed & Insured</p>
        </div>
      </div>
    </footer>
  );
}
