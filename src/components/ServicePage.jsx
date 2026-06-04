import { ArrowRight, Home, Link as LinkIcon } from 'lucide-react';
import Footer from './Footer';
import Navbar from './Navbar';
import FAQSection from './FAQSection';
import { SERVICE_PAGES } from '../seoData';
import { navigateToRoute } from '../lib/navigation';

function scrollToBooking() {
  navigateToRoute('home');
  window.setTimeout(() => {
    document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
  }, 60);
}

export default function ServicePage({ page, user, onDashboard, onTitleChange }) {
  const relatedPages = page.related.map((slug) => SERVICE_PAGES[slug]).filter(Boolean);

  return (
    <div className="min-h-dvh section-bg">
      <Navbar user={user} onDashboard={onDashboard} onTitleChange={onTitleChange} />

      <main>
        <article className="relative overflow-hidden pt-28 sm:pt-36">
          <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-gold-500/10 to-transparent" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-14 sm:pb-20">
            <div className="max-w-4xl">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] sm:tracking-[0.3em] text-gold-400">{page.eyebrow}</p>
              <h1 className="playfair text-4xl font-bold leading-tight text-theme sm:text-5xl md:text-7xl break-words">{page.h1}</h1>
              <p className="mt-6 sm:mt-7 max-w-3xl text-base sm:text-lg leading-8 text-theme-muted">{page.summary}</p>
              <div className="mt-8 sm:mt-9 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
                <button onClick={scrollToBooking} className="btn-primary inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-6 sm:px-7 py-4 text-sm font-black">
                  Request a Quote <ArrowRight size={17} />
                </button>
                <button onClick={() => navigateToRoute('home')} className="btn-outline inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-6 sm:px-7 py-4 text-sm font-bold">
                  <Home size={17} /> Back to Home
                </button>
              </div>
            </div>
          </div>
        </article>

        <section className="section-bg pb-16">
          <div className="mx-auto grid max-w-7xl gap-8 sm:gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0 space-y-6 sm:space-y-8">
              <div className="surface-bg border border-theme p-5 sm:p-7 md:p-9">
                {page.intro.map((paragraph) => (
                  <p key={paragraph} className="mb-6 text-base leading-8 text-theme-muted last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>

              {page.sections.map((section) => (
                <section key={section.heading} className="surface-bg border border-theme p-5 sm:p-7 md:p-9">
                  <h2 className="mb-4 text-xl sm:text-2xl font-black text-theme">{section.heading}</h2>
                  <p className="text-base leading-8 text-theme-muted">{section.body}</p>
                </section>
              ))}
            </div>

            <aside className="h-fit surface-bg border border-theme p-5 sm:p-6 lg:sticky lg:top-28">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-theme-subtle">Related Services</p>
              <nav className="space-y-3" aria-label="Related service pages">
                {relatedPages.map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateToRoute(item.path.replace('/', ''));
                    }}
                    className="flex w-full items-center justify-between gap-4 border border-theme px-4 py-3 text-left text-sm font-bold text-theme-muted transition-colors hover:border-gold-500/40 hover:text-gold-400"
                  >
                    {item.title}
                    <LinkIcon size={15} />
                  </a>
                ))}
              </nav>

              <div className="mt-7 border-t border-theme pt-7">
                <p className="text-sm leading-6 text-theme-muted">
                  Serving DFW Airport, Dallas Love Field, Dallas, Fort Worth, and nearby North Texas communities.
                </p>
                <button onClick={scrollToBooking} className="btn-primary mt-5 w-full rounded-full px-5 py-3 text-sm font-black">
                  Book Transportation
                </button>
              </div>
            </aside>
          </div>
        </section>

        <FAQSection faqs={page.faqs} title={`${page.title} FAQ`} />
      </main>

      <Footer />
    </div>
  );
}
