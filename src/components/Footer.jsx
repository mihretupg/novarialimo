import { MessageSquare, Phone } from 'lucide-react';
import { PHONE_NUMBER, WHATSAPP_NUMBER, NAV_LINKS } from '../data';
import { SERVICE_PAGE_LINKS } from '../seoData';
import { navigateToRoute } from '../lib/navigation';

export default function Footer() {
  const scrollTo = (href) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    navigateToRoute('home');
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  return (
    <footer className="relative border-t border-theme py-12 sm:py-16 section-bg">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid gap-10 sm:gap-12 mb-12 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <button onClick={() => navigateToRoute('home')}
              className="inline-flex flex-col items-center leading-none mb-5">
              <span className="text-2xl font-black tracking-widest text-theme">NOVARIA</span>
              <span className="text-xs font-semibold tracking-[0.28em] text-gold-500 uppercase mt-1.5">Transportation</span>
            </button>
            <p className="text-sm text-theme-muted leading-relaxed max-w-sm">
              Luxury transportation, DFW airport transfers, executive car service, and private chauffeur service throughout Dallas-Fort Worth.
            </p>
            <div className="flex gap-3 mt-6">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-theme hover:border-gold-500/35 hover:bg-gold-500/8 flex items-center justify-center transition-all duration-200"
                aria-label="WhatsApp">
                <WhatsAppIcon />
              </a>
              <a href={`tel:${PHONE_NUMBER}`}
                className="w-10 h-10 rounded-full border border-theme hover:border-gold-500/35 hover:bg-gold-500/8 flex items-center justify-center transition-all duration-200"
                aria-label="Phone">
                <Phone size={15} className="text-theme-muted" />
              </a>
              <a href={`sms:${PHONE_NUMBER}?&body=Hi%20Novaria%2C%20I%27d%20like%20to%20book%20a%20ride.`}
                className="w-10 h-10 rounded-full border border-theme hover:border-gold-500/35 hover:bg-gold-500/8 flex items-center justify-center transition-all duration-200"
                aria-label="SMS">
                <MessageSquare size={15} className="text-theme-muted" />
              </a>
            </div>
          </div>

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

          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-theme-subtle mb-5">Service Pages</p>
            <ul className="space-y-3">
              {SERVICE_PAGE_LINKS.map((service) => (
                <li key={service.path}>
                  <a href={service.path}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateToRoute(service.path.replace('/', ''));
                    }}
                    className="text-sm text-theme-muted hover:text-gold-400 transition-colors">
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-theme flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-theme-subtle">Copyright {new Date().getFullYear()} Novaria Transportation. All rights reserved.</p>
          <p className="text-xs text-theme-subtle">Serving DFW Airport, Dallas Love Field, Dallas, Fort Worth, and North Texas.</p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-theme-muted" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L0 24l6.335-1.51A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.791 9.791 0 01-4.994-1.368l-.358-.213-3.76.897.947-3.666-.234-.376A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}
